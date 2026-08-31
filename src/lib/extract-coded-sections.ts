/**
 * Extract sections marked with `[#code]` in their H2 heading text.
 *
 * Convention: the writer ends an H2 with a bracketed hash-code, e.g.
 *   ## Penalties [#penalties]
 *
 * The extractor:
 *   1. Finds every H2 whose text ends in ` [#code]`.
 *   2. Groups the H2 + everything up to the next H2 (coded or uncoded)
 *      into a "section" keyed by `code`.
 *   3. Strips the ` [#code]` marker from the heading text so it never
 *      renders on the live page.
 *   4. Returns the body with all coded sections removed — the "remainder"
 *      is whatever was before the first coded H2 (typically intro
 *      paragraphs) plus any uncoded H2 sections in between.
 *
 * Downstream: the service page renders each recognised code with a
 * dedicated designed section component. Sections without a code fall
 * through into the article prose as before, so the system is fully
 * backwards-compatible.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type CodedSection = {
  code: string;
  heading: any; /* Lexical heading node, with [#code] stripped */
  headingText: string;
  body: { root: { children: any[]; [k: string]: any } };
};

type LexicalRoot = { root: { children: any[]; [k: string]: any } };

function nodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return String(node.text ?? "");
  const kids = (node.children as any[] | undefined) ?? [];
  return kids.map(nodeText).join("");
}

/** Strip ` [#code]` suffix from the last text node in a heading. */
function stripCodeMarker(heading: any, code: string): any {
  const kids = ((heading.children as any[]) ?? []).map((k) => ({ ...k }));
  const marker = new RegExp(
    `\\s*\\[#${code.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\]\\s*$`
  );
  for (let i = kids.length - 1; i >= 0; i -= 1) {
    if (kids[i].type === "text" && typeof kids[i].text === "string") {
      const cleaned = kids[i].text.replace(marker, "");
      if (cleaned !== kids[i].text) {
        kids[i] = { ...kids[i], text: cleaned };
        break;
      }
    }
  }
  return { ...heading, children: kids };
}

export function extractCodedSections(body: LexicalRoot | null | undefined): {
  sections: Record<string, CodedSection>;
  bodyRemainder: LexicalRoot | null | undefined;
} {
  if (!body?.root?.children) {
    return { sections: {}, bodyRemainder: body };
  }
  const children: any[] = body.root.children;

  const sections: Record<string, CodedSection> = {};
  const remainder: any[] = [];

  let currentCode: string | null = null;
  let currentHeading: any = null;
  let currentBody: any[] = [];

  const flush = () => {
    if (!currentCode || !currentHeading) {
      currentCode = null;
      currentHeading = null;
      currentBody = [];
      return;
    }
    const cleanedHeading = stripCodeMarker(currentHeading, currentCode);
    sections[currentCode] = {
      code: currentCode,
      heading: cleanedHeading,
      headingText: nodeText(cleanedHeading).trim(),
      body: {
        root: { ...body.root, children: [cleanedHeading, ...currentBody] },
      },
    };
    currentCode = null;
    currentHeading = null;
    currentBody = [];
  };

  for (const node of children) {
    const isH2 =
      node?.type === "heading" && String(node?.tag ?? "").toLowerCase() === "h2";

    if (isH2) {
      /* Any H2 ends the previous coded section. */
      flush();

      const text = nodeText(node);
      const match = text.match(/\[#([a-zA-Z0-9_-]+)\]\s*$/);

      if (match) {
        currentCode = match[1].toLowerCase();
        currentHeading = node;
        currentBody = [];
        continue;
      }
      /* Uncoded H2 → stays in the remainder. */
      remainder.push(node);
      continue;
    }

    if (currentCode) {
      currentBody.push(node);
    } else {
      remainder.push(node);
    }
  }
  flush();

  const bodyRemainder: LexicalRoot = {
    root: { ...body.root, children: remainder },
  };

  return { sections, bodyRemainder };
}
