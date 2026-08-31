/**
 * Find the "Frequently Asked Questions" section inside a service
 * page's Lexical body, extract each Q → A pair, and return the body
 * with that section removed. The extracted FAQs power the accordion
 * at the bottom of the page — so the questions never appear twice.
 *
 * Detection is deliberately forgiving: an H2 whose text matches
 * /faq|frequently asked/i starts the section. Every H3/H4 that
 * follows is treated as a question, and every paragraph / list under
 * it is joined into the answer, until the next H2 (or the end).
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ServiceFaq = { q: string; a: string };
type LexicalRoot = { root: { children: any[]; [k: string]: any } };

function nodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return String(node.text ?? "");
  const kids = (node.children as any[] | undefined) ?? [];
  return kids.map(nodeText).join("");
}

function isHeading(node: any, tags: string[]): boolean {
  return (
    node?.type === "heading" && tags.includes(String(node.tag ?? "").toLowerCase())
  );
}

export function extractServiceFaq(body: LexicalRoot | null | undefined): {
  faqs: ServiceFaq[];
  bodyWithoutFaq: LexicalRoot | null | undefined;
} {
  if (!body?.root?.children) return { faqs: [], bodyWithoutFaq: body };
  const children: any[] = body.root.children;

  /* 1. Find the FAQ section start (H2 with matching text). */
  let start = -1;
  for (let i = 0; i < children.length; i += 1) {
    if (isHeading(children[i], ["h2"])) {
      const t = nodeText(children[i]).toLowerCase();
      if (/frequently\s+asked|^faq\b|questions and answers/.test(t)) {
        start = i;
        break;
      }
    }
  }
  if (start === -1) return { faqs: [], bodyWithoutFaq: body };

  /* 2. Find where the FAQ section ends (next H2 or end of body). */
  let end = children.length;
  for (let i = start + 1; i < children.length; i += 1) {
    if (isHeading(children[i], ["h2"])) {
      end = i;
      break;
    }
  }

  /* 3. Walk the FAQ range — every H3/H4 opens a new question, and
        subsequent paragraphs/lists join the answer text. */
  const range = children.slice(start + 1, end);
  const faqs: ServiceFaq[] = [];
  let currentQ = "";
  let currentA: string[] = [];

  const flush = () => {
    if (!currentQ) return;
    const a = currentA.join("\n\n").replace(/\s+\n/g, "\n").trim();
    if (a) faqs.push({ q: currentQ, a });
    currentQ = "";
    currentA = [];
  };

  for (const node of range) {
    if (isHeading(node, ["h3", "h4"])) {
      flush();
      currentQ = nodeText(node).trim();
      continue;
    }
    if (currentQ) {
      const t = nodeText(node).replace(/\s+/g, " ").trim();
      if (t) currentA.push(t);
    }
  }
  flush();

  /* 4. Return the body with the FAQ section snipped out so the
        article render doesn't repeat what the accordion now shows. */
  const bodyWithoutFaq: LexicalRoot = {
    root: {
      ...body.root,
      children: [...children.slice(0, start), ...children.slice(end)],
    },
  };

  return { faqs, bodyWithoutFaq };
}
