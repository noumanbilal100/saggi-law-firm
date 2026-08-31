/**
 * Auto-apply `[#code]` markers to H2 headings across every service
 * so the coded-section design system activates on pages whose bodies
 * were imported before the code convention existed.
 *
 * Matching:
 *   H2 text containing "what does … cover" / "what is …"     → [#covers]
 *   H2 text containing "penalt(y|ies)" / "consequences"      → [#penalties]
 *   H2 text containing "how … defend" / "our approach"        → [#defense]
 *   H2 text containing "what happens" / "after you contact"   → [#process]
 *
 *   FAQ H2s are left alone — the FAQ extractor already routes those
 *   to the accordion.
 *
 * Idempotent: skips any H2 that already ends with a `[#code]` marker.
 *
 *   npm run apply:codes
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type LexicalNode = { type: string; [k: string]: any };

const RULES: Array<{ test: RegExp; code: string }> = [
  { test: /what.*(charge|offence|does).*(cover|include)/i, code: "covers" },
  { test: /^what\s+is\b/i, code: "covers" },
  { test: /^what\s+are\b.*(charge|offence)/i, code: "covers" },
  { test: /penalt(y|ies)/i, code: "penalties" },
  { test: /consequences/i, code: "penalties" },
  { test: /(how|our).*(defend|defence|approach)/i, code: "defense" },
  { test: /(what\s+happens|after.*contact|initial\s+consultation|the\s+process)/i, code: "process" },
];

function nodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return String(node.text ?? "");
  const kids = (node.children as any[] | undefined) ?? [];
  return kids.map(nodeText).join("");
}

function endsWithCode(text: string): boolean {
  return /\[#[a-zA-Z0-9_-]+\]\s*$/.test(text);
}

function appendCode(heading: LexicalNode, code: string): LexicalNode {
  const kids = ((heading.children as any[]) ?? []).map((k) => ({ ...k }));
  /* Append the marker to the LAST text-node child so it stays inline. */
  for (let i = kids.length - 1; i >= 0; i -= 1) {
    if (kids[i].type === "text" && typeof kids[i].text === "string") {
      kids[i] = { ...kids[i], text: `${kids[i].text} [#${code}]` };
      return { ...heading, children: kids };
    }
  }
  /* No text child — add a fresh one. */
  kids.push({
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text: ` [#${code}]`,
    version: 1,
  });
  return { ...heading, children: kids };
}

function classify(text: string): string | null {
  for (const r of RULES) if (r.test.test(text)) return r.code;
  return null;
}

function tagBody(body: any): { changed: boolean; body: any; hits: Record<string, number> } {
  const root = body?.root;
  if (!root || !Array.isArray(root.children)) {
    return { changed: false, body, hits: {} };
  }
  const out: LexicalNode[] = [];
  const hits: Record<string, number> = {};
  let changed = false;
  const seen = new Set<string>();

  for (const node of root.children as LexicalNode[]) {
    if (
      node.type === "heading" &&
      String((node as any).tag ?? "").toLowerCase() === "h2"
    ) {
      const text = nodeText(node);
      if (endsWithCode(text)) {
        out.push(node);
        continue;
      }
      const code = classify(text);
      /* Only tag the FIRST occurrence per code — prevents accidental
         double-tagging when a body repeats similar section names. */
      if (code && !seen.has(code)) {
        seen.add(code);
        hits[code] = (hits[code] ?? 0) + 1;
        out.push(appendCode(node, code));
        changed = true;
        continue;
      }
    }
    out.push(node);
  }
  return { changed, body: { ...body, root: { ...root, children: out } }, hits };
}

async function main() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    limit: 200,
    depth: 0,
  });

  console.log(`Scanning ${result.docs.length} services…`);
  let updated = 0;

  for (const svc of result.docs) {
    const tagged = tagBody((svc as any).body);
    if (!tagged.changed) {
      console.log(`  · skipped  ${svc.slug}  (no matching H2s or already tagged)`);
      continue;
    }
    await payload.update({
      collection: "services",
      id: svc.id,
      data: { body: tagged.body },
    });
    const summary = Object.entries(tagged.hits)
      .map(([k, v]) => `${k}×${v}`)
      .join(", ");
    console.log(`  ✓ tagged   ${svc.slug}  (${summary})`);
    updated += 1;
  }

  console.log(`\nDone. Tagged ${updated} services.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
