/**
 * Split a Payload Lexical rich-text body into N segments so engagement
 * sections (Meet the Lawyer, CTA, case results, reviews) can be
 * interleaved between chunks — instead of the reader having to scroll
 * past a 3,000-word article to reach any social proof.
 *
 * Cuts snap to the nearest H2 boundary so no section is ever split
 * mid-heading; if the body doesn't have enough H2s (short pages), cuts
 * fall back to even node-count splits.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LexicalRoot = { root: { children: any[]; [k: string]: any } };

export function splitLexicalBody(
  body: LexicalRoot | null | undefined,
  segments: number
): LexicalRoot[] {
  const empty = (): LexicalRoot => ({
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [],
    },
  });

  if (segments <= 1 || !body?.root?.children) {
    return body ? [body] : [empty()];
  }

  const kids: any[] = body.root.children;
  const total = kids.length;
  if (total === 0) return Array(segments).fill(empty());

  /* Collect indices of H2 headings — natural chapter boundaries.
     Skip the very first one if the body opens with a title so we
     never emit an empty first segment. */
  const h2Indices: number[] = [];
  for (let i = 0; i < kids.length; i += 1) {
    const n = kids[i];
    if (n?.type === "heading" && n?.tag === "h2") h2Indices.push(i);
  }

  const cuts: number[] = [];
  if (h2Indices.length >= segments - 1) {
    const step = h2Indices.length / segments;
    for (let i = 1; i < segments; i += 1) {
      const idx = Math.floor(i * step);
      cuts.push(h2Indices[Math.min(idx, h2Indices.length - 1)]);
    }
  } else {
    /* Fall back to even node splits when there aren't enough H2s. */
    for (let i = 1; i < segments; i += 1) {
      cuts.push(Math.floor((i * total) / segments));
    }
  }

  /* Deduplicate and enforce monotonic order (in case two cuts landed
     on the same H2 in a small body). */
  const sorted = Array.from(new Set(cuts)).sort((a, b) => a - b);
  while (sorted.length < segments - 1) sorted.push(total);

  const out: LexicalRoot[] = [];
  let start = 0;
  for (const cut of sorted) {
    const c = Math.min(Math.max(cut, start), total);
    out.push({
      root: { ...body.root, children: kids.slice(start, c) },
    });
    start = c;
  }
  out.push({
    root: { ...body.root, children: kids.slice(start) },
  });
  return out;
}

/**
 * Split a Lexical body into CHAPTERS — one per H2 section — so the
 * article can be rendered as a series of numbered chapter cards
 * rather than one long prose blob. The first chapter carries every
 * intro node before the first H2 (or the whole body if there are no
 * H2s at all).
 */
export function splitByH2Chapters(
  body: LexicalRoot | null | undefined
): LexicalRoot[] {
  if (!body?.root?.children) return [];
  const kids: any[] = body.root.children;
  if (kids.length === 0) return [];

  const chapters: LexicalRoot[] = [];
  let current: any[] = [];

  const push = () => {
    if (current.length === 0) return;
    chapters.push({
      root: { ...body.root, children: current },
    });
    current = [];
  };

  for (const node of kids) {
    if (node?.type === "heading" && node?.tag === "h2" && current.length > 0) {
      push();
    }
    current.push(node);
  }
  push();
  return chapters;
}

/**
 * True when the given chapter starts with an H2 (i.e. it's a numbered
 * body chapter, not the pre-H2 intro block).
 */
export function chapterStartsWithH2(chapter: LexicalRoot): boolean {
  const first = chapter?.root?.children?.[0];
  return first?.type === "heading" && first?.tag === "h2";
}

