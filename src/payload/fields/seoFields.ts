import type { Field } from "payload";

/**
 * Shared SEO fields used on every content collection (Services,
 * Blog Posts, Pages). Kept flat (no collapsibles / groups) so
 * Payload's SQLite auto-migration handles them cleanly.
 *
 * Every field is optional — the frontend's `buildMetadata` helper
 * falls back to the entry's own title, summary, and hero image when
 * an SEO field is empty.
 */
export const seoFields: Field[] = [
  {
    name: "seoTitle",
    type: "text",
    admin: {
      description:
        "Google search-result title. Leave blank to use the entry's title. 50–60 chars is ideal.",
    },
  },
  {
    name: "seoDescription",
    type: "textarea",
    admin: {
      description:
        "Meta description shown under the title in Google. Leave blank to use the entry's summary. 150–160 chars is ideal.",
      rows: 3,
    },
  },
  {
    name: "keywords",
    type: "text",
    admin: {
      description:
        "Comma-separated keywords (e.g. \"impaired driving, Brampton lawyer, over 80\"). Optional.",
    },
  },
  {
    name: "ogImage",
    type: "upload",
    relationTo: "media",
    admin: {
      description:
        "Preview image shown when this page is shared on Facebook / LinkedIn / WhatsApp / X. Recommended: 1200 × 630. If empty, the entry's featured / hero image is used.",
    },
  },
  {
    name: "ogTitle",
    type: "text",
    admin: {
      description:
        "Optional social-share title. Leave blank to reuse the SEO title.",
    },
  },
  {
    name: "ogDescription",
    type: "textarea",
    admin: {
      description:
        "Optional social-share description. Leave blank to reuse the SEO description.",
      rows: 2,
    },
  },
  {
    name: "canonicalOverride",
    type: "text",
    admin: {
      description:
        "Only set this when this content lives at a different URL you want Google to prefer. Otherwise leave blank.",
    },
  },
  {
    name: "noindex",
    type: "checkbox",
    defaultValue: false,
    admin: {
      description:
        "Hide this page from Google. Keep OFF unless you have a reason to hide it.",
    },
  },
  {
    name: "nofollow",
    type: "checkbox",
    defaultValue: false,
    admin: {
      description:
        "Tell search engines NOT to follow this page's links. Rarely needed — keep OFF.",
    },
  },
];
