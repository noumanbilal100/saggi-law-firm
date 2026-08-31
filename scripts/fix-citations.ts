/**
 * Convert raw Markdown citation references — `[Text][N]` and bare
 * `[N]` — that survived the WordPress / ChatGPT import into proper
 * Lexical link nodes so they render as clickable source links.
 *
 * The URL each citation points to is derived from the visible label
 * ("Department of Justice Canada" → Criminal Code, "CanLII" → CanLII,
 * etc.). Where no label survives (bare `[3]`), the link points to
 * the same URL as the last labeled citation in the same paragraph;
 * failing that, the Criminal Code root URL.
 *
 * Content is preserved — only markup changes. Idempotent: text nodes
 * that no longer contain citation syntax are left untouched.
 *
 *   npm run fix:citations
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type LexicalNode = { type: string; [k: string]: any };

/* ── URL map — keyed by lowercased trimmed label ──────────────────── */

const URL_MAP: Record<string, string> = {
  "department of justice canada":
    "https://laws-lois.justice.gc.ca/eng/acts/C-46/",
  "criminal code": "https://laws-lois.justice.gc.ca/eng/acts/C-46/",
  "criminal code of canada": "https://laws-lois.justice.gc.ca/eng/acts/C-46/",
  canlii: "https://www.canlii.org/",
  "statistics canada": "https://www.statcan.gc.ca/",
  "ontario court of justice": "https://www.ontariocourts.ca/ocj/",
  "ontario superior court of justice": "https://www.ontariocourts.ca/scj/",
  "ontario ministry of the attorney general":
    "https://www.ontario.ca/page/ministry-attorney-general",
  "law society of ontario": "https://lso.ca/",
  "supreme court of canada": "https://www.scc-csc.ca/",
  "public prosecution service of canada": "https://www.ppsc-sppc.gc.ca/",
  "government of canada": "https://www.canada.ca/",
  "government of ontario": "https://www.ontario.ca/",
  "youth criminal justice act":
    "https://laws-lois.justice.gc.ca/eng/acts/Y-1.5/",
  "canadian charter of rights and freedoms":
    "https://laws-lois.justice.gc.ca/eng/const/page-12.html",
};

const FALLBACK_URL = "https://laws-lois.justice.gc.ca/eng/acts/C-46/";

function urlFor(label: string): string {
  const norm = label.trim().toLowerCase();
  return URL_MAP[norm] ?? FALLBACK_URL;
}

/* ── Lexical node constructors ────────────────────────────────────── */

function makeTextNode(text: string, format = 0): LexicalNode {
  return {
    type: "text",
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function makeLinkNode(url: string, children: LexicalNode[]): LexicalNode {
  return {
    type: "link",
    format: "",
    indent: 0,
    version: 3,
    direction: "ltr",
    fields: { linkType: "custom", url, newTab: true },
    children,
  };
}

/* ── Text-node splitter — turns raw citation markup into link nodes ── */

/**
 * Split one Lexical text node into an ordered list of text + link
 * nodes, replacing every citation pattern with a proper link. If the
 * text contains no citations, returns [node] unchanged.
 */
function processTextNode(
  node: LexicalNode,
  lastLabeledUrl: { current: string | null }
): LexicalNode[] {
  const raw = String(node.text ?? "");
  if (!raw) return [node];

  const format = Number(node.format ?? 0);

  /* Combined regex:
       group 1  →  full `[label][num]` match
         group 2 = label
         group 3 = num
       group 4  →  full bare `[num]` match
         group 5 = num
     The labeled form is placed first so it wins over the bare form
     that would otherwise match its trailing `[num]`. */
  const re =
    /(\[([^\][\n]{2,120})\]\[([0-9]{1,3})\])|(\[([0-9]{1,3})\])/g;

  const out: LexicalNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let changed = false;

  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      out.push({ ...node, text: raw.slice(last, m.index) });
    }

    if (m[1]) {
      /* Labeled reference: [Label][N]. Render `Label` as the link. */
      const label = m[2].trim();
      const url = urlFor(label);
      lastLabeledUrl.current = url;
      out.push(makeLinkNode(url, [makeTextNode(label, format)]));
    } else {
      /* Bare `[N]` — inline superscript-style number pointing to the
         most recent labeled URL in the paragraph, or the fallback. */
      const num = m[5];
      const url = lastLabeledUrl.current ?? FALLBACK_URL;
      out.push(makeLinkNode(url, [makeTextNode(num, format)]));
    }
    changed = true;
    last = re.lastIndex;
  }

  if (last < raw.length) {
    out.push({ ...node, text: raw.slice(last) });
  }
  return changed ? out : [node];
}

/* ── Recursive walk — process every text node in the tree ─────────── */

function walkNode(
  node: LexicalNode,
  lastLabeledUrl: { current: string | null }
): { node: LexicalNode; changed: boolean } {
  if (!node || typeof node !== "object") return { node, changed: false };
  const kids = node.children as LexicalNode[] | undefined;
  if (!Array.isArray(kids) || kids.length === 0) {
    return { node, changed: false };
  }

  /* Track labeled URLs per PARAGRAPH — reset the pointer as we enter
     a fresh block-level node so bare citations don't leak across
     paragraph boundaries. */
  const isBlock =
    node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "quote" ||
    node.type === "listitem";
  const scope = isBlock ? { current: null as string | null } : lastLabeledUrl;

  const newKids: LexicalNode[] = [];
  let changed = false;
  for (const child of kids) {
    if (child?.type === "text") {
      const parts = processTextNode(child, scope);
      if (parts.length !== 1 || parts[0] !== child) changed = true;
      newKids.push(...parts);
    } else if (child?.type === "link") {
      /* Don't rewrite text inside an existing link — leave it alone. */
      newKids.push(child);
    } else {
      const w = walkNode(child, scope);
      if (w.changed) changed = true;
      newKids.push(w.node);
    }
  }

  return { node: { ...node, children: newKids }, changed };
}

function fixBody(body: any): { body: any; changed: boolean } {
  if (!body?.root) return { body, changed: false };
  const w = walkNode(body.root, { current: null });
  return { body: { ...body, root: w.node }, changed: w.changed };
}

/* ── Runner ───────────────────────────────────────────────────────── */

async function main() {
  const payload = await getPayload({ config });

  const collections = ["services", "blog-posts", "pages"] as const;
  let totalDocs = 0;
  let totalChanged = 0;

  for (const collection of collections) {
    const result = await payload.find({
      collection,
      limit: 500,
      depth: 0,
      draft: true as any,
    } as any);
    console.log(`\n${collection}: scanning ${result.docs.length}…`);

    for (const doc of result.docs as any[]) {
      totalDocs += 1;
      const fixed = fixBody(doc.body);
      if (!fixed.changed) {
        console.log(`  · clean    ${doc.slug}`);
        continue;
      }
      await (payload.update as any)({
        collection,
        id: doc.id,
        data: { body: fixed.body },
      });
      console.log(`  ✓ linked   ${doc.slug}`);
      totalChanged += 1;
    }
  }

  console.log(
    `\nDone. Rewrote citations in ${totalChanged} / ${totalDocs} documents.`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
