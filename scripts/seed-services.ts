/**
 * One-off migration: reads every MDX file in content/services/, converts
 * its body from markdown to Payload's Lexical JSON shape, and creates (or
 * updates) a matching entry in the `services` collection.
 *
 * After running:
 *   - Every service page appears in /admin → Services → Edit (WordPress-like)
 *   - The frontend continues to render from Payload first, MDX only as fallback
 *
 * Run once from the project root:
 *   npm run seed:services
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getPayload } from "payload";
import config from "../src/payload.config.ts";
import {
  services as servicesList,
  type ServiceCategory,
} from "../src/lib/services.ts";

/* ────────── minimal markdown → Lexical converter ─────────────────────── */

type LexicalNode = {
  type: string;
  version?: number;
  format?: string | number;
  indent?: number;
  direction?: "ltr" | "rtl" | null;
  [k: string]: unknown;
};

const textNode = (text: string, format = 0): LexicalNode => ({
  type: "text",
  detail: 0,
  format,
  mode: "normal",
  style: "",
  text,
  version: 1,
});

const paragraph = (children: LexicalNode[]): LexicalNode => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  textFormat: 0,
  textStyle: "",
  children,
});

const heading = (level: 1 | 2 | 3, children: LexicalNode[]): LexicalNode => ({
  type: "heading",
  tag: `h${level}`,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children,
});

const quote = (children: LexicalNode[]): LexicalNode => ({
  type: "quote",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children,
});

const list = (
  listType: "bullet" | "number",
  items: LexicalNode[][]
): LexicalNode => ({
  type: "list",
  listType,
  start: 1,
  tag: listType === "bullet" ? "ul" : "ol",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: items.map((itemChildren, i) => ({
    type: "listitem",
    value: i + 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    checked: undefined,
    children: itemChildren,
  })),
});

/**
 * Split inline text into Lexical text nodes, preserving **bold**, *italic*,
 * `code`, and [link text](url). Nested formatting is not preserved beyond
 * one level — good enough for a seed pass; the client can refine in admin.
 */
function parseInline(text: string): LexicalNode[] {
  const out: LexicalNode[] = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(textNode(text.slice(last, m.index)));
    if (m[2] !== undefined) out.push(textNode(m[2], 1)); /* bold */
    else if (m[4] !== undefined) out.push(textNode(m[4], 2)); /* italic */
    else if (m[6] !== undefined) out.push(textNode(m[6], 16)); /* code */
    else if (m[7] !== undefined) {
      /* link */
      out.push({
        type: "link",
        format: "",
        indent: 0,
        version: 3,
        direction: "ltr",
        fields: { linkType: "custom", url: m[9], newTab: false },
        children: [textNode(m[8])],
      });
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(textNode(text.slice(last)));
  if (out.length === 0) out.push(textNode(text));
  return out;
}

function markdownToLexical(md: string): { root: LexicalNode } {
  const children: LexicalNode[] = [];
  const lines = md.replace(/\r\n/g, "\n").split("\n");

  let buf: string[] = [];
  let listItems: LexicalNode[][] = [];
  let listType: "bullet" | "number" | null = null;
  let inCallout = false;
  let calloutBuf: string[] = [];
  let calloutLabel = "";

  const flushParagraph = () => {
    if (buf.length === 0) return;
    const text = buf.join(" ").trim();
    if (text) children.push(paragraph(parseInline(text)));
    buf = [];
  };
  const flushList = () => {
    if (listItems.length === 0 || !listType) return;
    children.push(list(listType, listItems));
    listItems = [];
    listType = null;
  };
  const flushCallout = () => {
    if (!inCallout) return;
    /* Represent Callout as a quote block with a bold label prefix. */
    const inner: LexicalNode[] = [];
    if (calloutLabel) {
      inner.push(paragraph([textNode(calloutLabel, 1)]));
    }
    const bodyText = calloutBuf.join(" ").trim();
    if (bodyText) inner.push(paragraph(parseInline(bodyText)));
    children.push(quote(inner));
    inCallout = false;
    calloutBuf = [];
    calloutLabel = "";
  };

  for (const rawLine of lines) {
    const line = rawLine;

    /* Callout open / close (MDX component) */
    const openC = line.match(/^<Callout(?:\s+label="([^"]*)")?\s*>\s*$/);
    if (openC) {
      flushParagraph();
      flushList();
      inCallout = true;
      calloutLabel = openC[1] ?? "";
      continue;
    }
    if (line.match(/^<\/Callout>\s*$/)) {
      flushCallout();
      continue;
    }
    if (inCallout) {
      if (line.trim() === "") calloutBuf.push("");
      else calloutBuf.push(line);
      continue;
    }

    /* Heading */
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      flushParagraph();
      flushList();
      const level = h[1].length as 1 | 2 | 3;
      children.push(heading(level, parseInline(h[2].trim())));
      continue;
    }

    /* Blockquote */
    const q = line.match(/^>\s?(.*)$/);
    if (q) {
      flushParagraph();
      flushList();
      children.push(quote([paragraph(parseInline(q[1]))]));
      continue;
    }

    /* Bullet list item */
    const b = line.match(/^\s*[-*]\s+(.+)$/);
    if (b) {
      flushParagraph();
      if (listType !== "bullet") {
        flushList();
        listType = "bullet";
      }
      listItems.push(parseInline(b[1]));
      continue;
    }

    /* Ordered list item */
    const n = line.match(/^\s*\d+\.\s+(.+)$/);
    if (n) {
      flushParagraph();
      if (listType !== "number") {
        flushList();
        listType = "number";
      }
      listItems.push(parseInline(n[1]));
      continue;
    }

    /* Blank line — paragraph / list break */
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    /* Otherwise a paragraph line */
    if (listType) flushList();
    buf.push(line);
  }

  flushParagraph();
  flushList();
  flushCallout();

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children,
    },
  };
}

/* ────────── seed runner ─────────────────────────────────────────────── */

async function main() {
  const payload = await getPayload({ config });
  const dir = path.join(process.cwd(), "content", "services");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));

  console.log(`Seeding ${files.length} services from ${dir}`);

  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { content, data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    const listMeta = servicesList.find((s) => s.slug === slug);
    const bodyLexical = markdownToLexical(content);

    const doc = {
      title: (data.title as string) ?? slug,
      slug,
      icon: (data.icon as string) ?? listMeta?.icon ?? "§",
      heroKicker: (data.heroKicker as string) ?? "",
      summary: (data.summary as string) ?? listMeta?.summary ?? "",
      body: bodyLexical,
      order: (data.order as number) ?? listMeta?.order ?? 999,
      category: (listMeta?.category ??
        "general") as ServiceCategory,
      universal: listMeta?.universal ?? false,
      seoTitle: (data.seoTitle as string) ?? "",
      seoDescription: (data.seoDescription as string) ?? "",
      _status: "published" as const,
    };

    /* Upsert by slug */
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data: doc,
      });
      console.log(`  ✓ updated  ${slug}`);
    } else {
      await payload.create({ collection: "services", data: doc });
      console.log(`  ✓ created  ${slug}`);
    }
  }

  /* Also create entries for services listed in services.ts but with no MDX. */
  const seededSlugs = new Set(files.map((f) => f.replace(/\.mdx$/, "")));
  for (const s of servicesList) {
    if (seededSlugs.has(s.slug)) continue;
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) continue;

    await payload.create({
      collection: "services",
      data: {
        title: s.title,
        slug: s.slug,
        icon: s.icon,
        summary: s.summary,
        body: markdownToLexical(
          `${s.summary}\n\n## What to do next\n\nContact Saggi Law Firm to discuss the specific circumstances of your matter.`
        ),
        order: s.order,
        category: s.category,
        universal: s.universal ?? false,
        _status: "published" as const,
      },
    });
    console.log(`  ✓ created  ${s.slug}  (from services.ts)`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
