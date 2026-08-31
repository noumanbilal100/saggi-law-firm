import type { CollectionConfig } from "payload";
import { richTextEditor } from "@/payload/richtext";
import { sanitizeSlug } from "@/payload/hooks/sanitizeSlug";
import { importMarkdown } from "@/payload/hooks/importMarkdown";
import { seoFields } from "@/payload/fields/seoFields";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    description:
      "Articles for the journal. Each becomes a page at /blog/<slug> and appears on related service pages automatically.",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}/blog/${
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
                  "URL segment — a single word or hyphenated phrase. Slashes, spaces, and uppercase are auto-cleaned on save.",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: {
                description:
                  "1–2 sentence summary shown on cards and in search results. 150–250 chars.",
              },
            },
            {
              name: "cover",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Featured image — shown on the article card, on the hero at the top of the post, and as the default social-share image. Recommended: 1600 × 900 or larger.",
              },
            },
            {
              name: "body",
              type: "richText",
              editor: richTextEditor,
              admin: {
                description:
                  "Full article. Toolbar above lets you change block type (H1–H6, paragraph, quote, list) and apply formatting.",
              },
            },
          ],
        },
        {
          label: "Taxonomy",
          fields: [
            {
              name: "category",
              type: "text",
              required: true,
              defaultValue: "Criminal defence",
              admin: {
                description: "e.g. 'Bail', 'Charter', 'Domestic', 'Sentencing'.",
              },
            },
            {
              name: "services",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              admin: {
                description:
                  "Related practice areas. This post will appear on those service pages.",
              },
            },
            {
              name: "tags",
              type: "array",
              fields: [{ name: "tag", type: "text" }],
              admin: {
                description: "Free-form tags (e.g., 'arrest', 'first-24-hours').",
              },
            },
            {
              name: "readTime",
              type: "text",
              admin: {
                description: "e.g. '6 min read'. Leave blank to omit.",
              },
            },
          ],
        },
        {
          label: "SEO & Sharing",
          description:
            "How this post appears in Google search results and when shared on Facebook, LinkedIn, WhatsApp, or X (Twitter). Every field is optional — leave anything blank to fall back to the post's own title, excerpt, and featured image.",
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
