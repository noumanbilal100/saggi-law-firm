/**
 * Convert markdown into Payload's Lexical JSON structure — headings,
 * paragraphs, bullets, numbered lists, blockquotes, and inline
 * **bold** / *italic* / `code` / [link](url).
 *
 * Used by the `markdownImport` field on Services / Blog Posts / Pages —
 * a writer pastes markdown (from ChatGPT or Google Docs) and the
 * `importMarkdown` hook converts it to Lexical for the body field.
 */

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

const heading = (
  level: 1 | 2 | 3 | 4 | 5 | 6,
  children: LexicalNode[]
): LexicalNode => ({
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

function parseInline(text: string): LexicalNode[] {
  const out: LexicalNode[] = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(textNode(text.slice(last, m.index)));
    if (m[2] !== undefined) out.push(textNode(m[2], 1));
    else if (m[4] !== undefined) out.push(textNode(m[4], 2));
    else if (m[6] !== undefined) out.push(textNode(m[6], 16));
    else if (m[7] !== undefined) {
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

export function markdownToLexical(md: string): { root: LexicalNode } {
  const children: LexicalNode[] = [];
  const lines = md.replace(/\r\n/g, "\n").split("\n");

  let buf: string[] = [];
  let listItems: LexicalNode[][] = [];
  let listType: "bullet" | "number" | null = null;

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

  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      flushParagraph();
      flushList();
      const level = h[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      children.push(heading(level, parseInline(h[2].trim())));
      continue;
    }

    const q = line.match(/^>\s?(.*)$/);
    if (q) {
      flushParagraph();
      flushList();
      children.push(quote([paragraph(parseInline(q[1]))]));
      continue;
    }

    const b = line.match(/^\s*[-*+]\s+(.+)$/);
    if (b) {
      flushParagraph();
      if (listType !== "bullet") {
        flushList();
        listType = "bullet";
      }
      listItems.push(parseInline(b[1]));
      continue;
    }

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

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (listType) flushList();
    buf.push(line);
  }

  flushParagraph();
  flushList();

  if (children.length === 0) {
    children.push(paragraph([textNode("")]));
  }

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
