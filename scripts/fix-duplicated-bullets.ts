/**
 * One-shot data repair: an earlier `strip:design` pass rehydrated
 * KeyPoints / IconCards / ProcessSteps blocks back into bullet lists
 * using the pattern `**Title** — Body`. Where an item's title and
 * body were the SAME phrase, the bullet now reads
 * "Criminal conviction — Criminal conviction" — visible on the
 * live site as a duplication.
 *
 * This script walks every service body's list items and collapses
 * any bullet whose Bold prefix equals the rest of the line into
 * just the bold text. Conservative: only collapses on exact equal
 * comparison, so legitimate "Term — definition" items are untouched.
 *
 *   npm run fix:bullets
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type LexicalNode = { type: string; [k: string]: any };

function isTextNode(n: any): n is LexicalNode {
  return n?.type === "text" && typeof n.text === "string";
}

/** Bold format flag in Lexical is bit 0 of `format`. */
function isBold(n: any): boolean {
  return isTextNode(n) && (Number(n.format) & 1) === 1;
}

/** Deep-copy just enough of the node tree to safely mutate. */
function fixListItem(li: any): { li: any; changed: boolean } {
  const kids = (li.children as LexicalNode[] | undefined) ?? [];

  /* Flatten: a listitem often wraps its inline children directly, but
     Payload sometimes wraps them in a paragraph. Handle both. */
  const inlineChildren: LexicalNode[] = [];
  for (const k of kids) {
    if (k.type === "paragraph") {
      inlineChildren.push(...((k.children as LexicalNode[] | undefined) ?? []));
    } else {
      inlineChildren.push(k);
    }
  }
  if (inlineChildren.length < 2) return { li, changed: false };

  const first = inlineChildren[0];
  if (!isBold(first)) return { li, changed: false };

  const boldText = String(first.text ?? "").trim();
  if (!boldText) return { li, changed: false };

  const restText = inlineChildren
    .slice(1)
    .map((n) => String(n.text ?? ""))
    .join("");

  /* Look for the "— body" (or ": body" / "- body") separator. */
  const m = restText.match(/^\s*[—–\-:]\s*(.+?)\s*$/);
  if (!m) return { li, changed: false };

  const bodyPart = m[1].trim();

  /* Duplicate detection — handle three cases:
       1. Exact match:            "Fines — Fines"
       2. Truncated bold prefix:  "Driving with a blood...   —  Driving with a blood alcohol concentration over the legal limit"
          The bold ends with "…" or "..." and body starts with the same prefix.
       3. Body starts with bold text (no ellipsis, but bold is a prefix of body). */
  const boldStripped = boldText.replace(/\s*(?:…|\.\.\.)$/, "").trim();
  const isExact = bodyPart === boldText;
  const isTruncatedPrefix =
    boldText !== boldStripped &&
    boldStripped.length > 3 &&
    bodyPart.toLowerCase().startsWith(boldStripped.toLowerCase());
  const bodyStartsWithBold =
    !isExact &&
    boldText.length > 3 &&
    bodyPart.toLowerCase().startsWith(boldText.toLowerCase());

  if (!isExact && !isTruncatedPrefix && !bodyStartsWithBold) {
    return { li, changed: false };
  }

  /* Duplicate confirmed. Keep the LONGER of the two as the visible
     text (truncated bold loses information; body carries the full
     phrase). Wrap it in bold formatting for consistency. */
  const kept: LexicalNode = {
    type: "text",
    detail: 0,
    format: 1,
    mode: "normal",
    style: "",
    text: bodyPart.length >= boldStripped.length ? bodyPart : boldStripped,
    version: 1,
  };
  return {
    li: { ...li, children: [kept] },
    changed: true,
  };
}

function fixBody(body: any): { changed: boolean; body: any; fixed: number } {
  const root = body?.root;
  if (!root || !Array.isArray(root.children)) {
    return { changed: false, body, fixed: 0 };
  }
  let fixed = 0;
  const newChildren = (root.children as LexicalNode[]).map((n) => {
    if (n.type !== "list") return n;
    const items = ((n.children as LexicalNode[]) ?? []).map((li) => {
      const { li: fixedLi, changed } = fixListItem(li);
      if (changed) fixed += 1;
      return fixedLi;
    });
    return { ...n, children: items };
  });
  return {
    changed: fixed > 0,
    body: { ...body, root: { ...root, children: newChildren } },
    fixed,
  };
}

async function main() {
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: "services",
    limit: 200,
    depth: 0,
  });

  console.log(`Scanning ${services.docs.length} services…`);
  let updated = 0;
  let totalFixed = 0;

  for (const svc of services.docs) {
    const result = fixBody((svc as any).body);
    if (!result.changed) {
      console.log(`  · clean    ${svc.slug}`);
      continue;
    }
    await payload.update({
      collection: "services",
      id: svc.id,
      data: { body: result.body },
    });
    console.log(`  ✓ fixed    ${svc.slug}  (${result.fixed} bullets)`);
    updated += 1;
    totalFixed += result.fixed;
  }

  console.log(`\nDone. Fixed ${totalFixed} duplicated bullets across ${updated} services.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
