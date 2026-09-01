import type { CollectionConfig } from "payload";
import { richTextEditor } from "@/payload/richtext";
import { sanitizeSlug } from "@/payload/hooks/sanitizeSlug";
import { importMarkdown } from "@/payload/hooks/importMarkdown";
import { seoFields } from "@/payload/fields/seoFields";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "order", "publishedAt"],
    description:
      "Criminal defence practice areas. Each entry becomes a page at /<slug> (root-level, matching the old WordPress URLs). Reorder by dragging or by editing the Order field.",
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
          "PASTE FROM CHATGPT / DOCS HERE — headings (##), bullets (-), numbered lists (1.), quotes (>), **bold**, *italic*, and [links](url) are auto-detected. On save, this replaces the Body below and this field clears itself. Leave empty to edit the Body directly.",
        rows: 6,
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              hooks: { beforeValidate: [sanitizeSlug] },
              admin: {
                description:
                  "URL segment — a single word or hyphenated phrase. E.g. 'impaired-driving-dui'. Slashes, spaces, and uppercase are auto-cleaned on save.",
              },
            },
            {
              name: "icon",
              type: "text",
              required: true,
              defaultValue: "§",
              admin: {
                description:
                  "Single letter or glyph shown in the icon square (B, D, A, etc.).",
              },
            },
            {
              name: "heroKicker",
              type: "text",
              admin: {
                description:
                  "Small label above the H1 (e.g., 'Impaired driving · Over 80 · Refusal').",
              },
            },
            {
              name: "summary",
              type: "textarea",
              required: true,
              admin: {
                description: "One-paragraph lede shown under the H1. 200–350 chars.",
              },
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Optional hero image. When empty, a branded visual is generated automatically.",
              },
            },
            {
              name: "body",
              type: "richText",
              editor: richTextEditor,
              admin: {
                description:
                  "Main article body. Use the toolbar to change block type (paragraph, H1–H6, quote, list) and apply inline formatting.",
              },
            },
          ],
        },
        {
          label: "Taxonomy",
          fields: [
            {
              name: "order",
              type: "number",
              defaultValue: 999,
              admin: {
                description: "Sort order in listings. Lower = appears first.",
              },
            },
            {
              name: "category",
              type: "select",
              required: true,
              defaultValue: "general",
              options: [
                { label: "General / hub", value: "general" },
                { label: "Impaired driving", value: "impaired" },
                { label: "Personal / assault", value: "personal" },
                { label: "Drugs", value: "drugs" },
                { label: "Weapons", value: "weapons" },
                { label: "Property", value: "property" },
                { label: "Financial", value: "financial" },
                { label: "Sexual", value: "sexual" },
                { label: "Youth", value: "youth" },
                { label: "Bail", value: "bail" },
              ],
              admin: {
                description:
                  "Used to auto-suggest related services on each service page.",
              },
            },
            {
              name: "universal",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description:
                  "If enabled, this service is shown as related on EVERY other service page (use for Bail Hearings, Criminal Lawyer).",
              },
            },
          ],
        },
        {
          label: "SEO & Sharing",
          description:
            "How this page appears in Google search results and when shared on Facebook, LinkedIn, WhatsApp, or X (Twitter). Every field is optional — leave anything blank to fall back to the entry's own title, summary, and hero image.",
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
