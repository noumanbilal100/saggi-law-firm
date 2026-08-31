import type { CollectionBeforeChangeHook } from "payload";
import { markdownToLexical } from "@/payload/lib/markdown";

/**
 * Collection-level hook: when the `markdownImport` field is filled, convert
 * it to Lexical JSON, put it in `body`, and clear the import field on save.
 *
 * Lets writers paste from ChatGPT / Google Docs / any markdown source and
 * have the headings, paragraphs, lists, quotes, and inline formatting
 * detected automatically — no manual re-formatting needed.
 */
export const importMarkdown: CollectionBeforeChangeHook = ({ data }) => {
  const raw = (data as { markdownImport?: string })?.markdownImport;
  if (typeof raw !== "string" || raw.trim().length === 0) return data;

  const body = markdownToLexical(raw);

  return {
    ...data,
    body,
    markdownImport: "",
  };
};
