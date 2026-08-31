/**
 * Undo: removes every design-block node (statsGrid / iconCards / keyPoints /
 * processSteps / proseCta / callout / statBlock) from every service body,
 * restoring the plain-prose state before `apply:design` was run.
 *
 * KeyPoints / IconCards / ProcessSteps blocks were converted from bullet
 * lists — this script re-materialises them as bullet lists so no content
 * is lost.
 *
 *   npm run strip:design
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type LexicalNode = { type: string; [k: string]: any };

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

const bulletList = (items: Array<{ title: string; body: string }>): LexicalNode => ({
  type: "list",
  listType: "bullet",
  start: 1,
  tag: "ul",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: items.map((it, i) => ({
    type: "listitem",
    value: i + 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    checked: undefined,
    children: [
      textNode(it.title, 1),
      textNode(it.body ? ` — ${it.body}` : ""),
    ],
  })),
});

const DESIGN_BLOCK_TYPES = new Set([
  "statsGrid",
  "iconCards",
  "keyPoints",
  "processSteps",
  "proseCta",
  "callout",
  "statBlock",
]);

function stripBody(body: any): { changed: boolean; body: any } {
  const root = body?.root;
  if (!root || !Array.isArray(root.children)) {
    return { changed: false, body };
  }
  const out: LexicalNode[] = [];
  let removed = 0;

  for (const node of root.children as LexicalNode[]) {
    if (node.type !== "block") {
      out.push(node);
      continue;
    }
    const bt = node.fields?.blockType;
    if (!DESIGN_BLOCK_TYPES.has(bt)) {
      /* Unknown block — leave it alone. */
      out.push(node);
      continue;
    }

    removed += 1;

    /* Restore lists that were converted from bullet points. */
    if (bt === "keyPoints" || bt === "processSteps" || bt === "iconCards") {
      const items: Array<{ title: string; body: string }> =
        node.fields?.items ?? [];
      if (items.length > 0) {
        out.push(bulletList(items));
      }
      continue;
    }

    /* statsGrid, proseCta, callout, statBlock — just delete. */
  }

  return { changed: removed > 0, body: { ...body, root: { ...root, children: out } } };
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
    const stripped = stripBody((svc as any).body);
    if (!stripped.changed) {
      console.log(`  · skipped  ${svc.slug}  (no design blocks)`);
      continue;
    }
    await payload.update({
      collection: "services",
      id: svc.id,
      data: { body: stripped.body },
    });
    console.log(`  ✓ stripped ${svc.slug}`);
    updated += 1;
  }

  console.log(`\nDone. Stripped ${updated}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
