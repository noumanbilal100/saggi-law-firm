import type { CollectionConfig } from "payload";
import { richTextEditor } from "@/payload/richtext";
import { sanitizeSlug } from "@/payload/hooks/sanitizeSlug";
import { importMarkdown } from "@/payload/hooks/importMarkdown";
import { seoFields } from "@/payload/fields/seoFields";

/**
 * Arbitrary custom pages — Privacy, Terms, Fees, Team, Careers, etc.
 * Rendered at /<slug> by the [slug] catch-all route. Built-in routes
 * (/services, /blog, /about, /contact, /booking, /locations) always take
 * priority over CMS pages with the same slug.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "publishedAt"],
    description:
      "Custom pages (Privacy Policy, Terms, Fees, Team, etc.). Each becomes a page at /<slug>.",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}/${
          (data?.slug as string | undefined) ?? ""
        }`,
    },
  },
  access: { read: () => true },
  versions: { drafts: true },
  hooks: { beforeChange: [importMarkdown] },
  fields: [
    {
      name: "markdownImport",
      type: "textarea",
      admin: {
        description:
          "PASTE FROM CHATGPT / DOCS HERE — headings, bullets, numbered lists, quotes, and inline formatting are auto-detected. On save, this replaces the Body below and this field clears itself. Leave empty to edit the Body directly.",
        rows: 6,
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              hooks: { beforeValidate: [sanitizeSlug] },
              admin: {
                description:
                  "URL segment — a single word or hyphenated phrase. Slashes, spaces, and uppercase are auto-cleaned on save. Avoid these built-in slugs: services, blog, about, contact, booking, locations, admin, api.",
              },
            },
            {
              name: "heroKicker",
              type: "text",
              admin: {
                description: "Small label above the H1 (optional).",
              },
            },
            {
              name: "summary",
              type: "textarea",
              admin: {
                description: "Paragraph shown under the H1 (optional).",
              },
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Featured / hero image shown at the top of the page and used as the default social-share image. Recommended: 1600 × 900 or larger.",
              },
            },
            {
              name: "body",
              type: "richText",
              editor: richTextEditor,
              required: true,
              admin: {
                description:
                  "Page content. Toolbar above lets you change block type (H1–H6, paragraph, quote, list) and apply formatting.",
              },
            },
          ],
        },
        {
          label: "SEO & Sharing",
          description:
            "How this page appears in Google search results and when shared on Facebook, LinkedIn, WhatsApp, or X (Twitter). Every field is optional — leave anything blank to fall back to the page's own title, summary, and hero image.",
          fields: seoFields,
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      defaultValue: () => new Date(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "viewLive",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: "@/payload/components/ViewLiveButton#ViewLiveButton",
        },
      },
    },
  ],
};
