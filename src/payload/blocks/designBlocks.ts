import type { Block } from "payload";

/**
 * Design blocks that admins can drop into any Lexical rich-text field
 * (Services, Blog Posts, Pages). Each block mirrors an MDX component so
 * Payload-authored content and MDX-authored content produce visually
 * identical output. Field admin.description tags each block so the
 * admin's block picker reads clearly.
 */

export const StatsGridBlock: Block = {
  slug: "statsGrid",
  labels: { singular: "Stats Grid", plural: "Stats Grids" },
  admin: {
    group: "Design blocks",
  },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 4,
      admin: {
        description: "2 – 4 stat cards shown side-by-side.",
      },
      fields: [
        {
          name: "number",
          type: "text",
          required: true,
          admin: { description: "e.g. 14+, 400+, 24/7, 4.9★" },
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export const IconCardsBlock: Block = {
  slug: "iconCards",
  labels: { singular: "Icon Cards", plural: "Icon Cards" },
  admin: { group: "Design blocks" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 6,
      admin: {
        description: "2 – 6 icon + title + body cards. 3 works best.",
      },
      fields: [
        {
          name: "icon",
          type: "text",
          required: true,
          admin: {
            description:
              "Single letter, digit, or short glyph shown in the icon circle (1, 2, 3 or A, B, C).",
          },
        },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const KeyPointsBlock: Block = {
  slug: "keyPoints",
  labels: { singular: "Key Points (dark)", plural: "Key Points" },
  admin: { group: "Design blocks" },
  fields: [
    {
      name: "title",
      type: "text",
      admin: { description: "Optional heading above the key points." },
    },
    {
      name: "items",
      type: "array",
      minRows: 2,
      admin: {
        description:
          "Each item becomes a numbered point in the dark section. 2 – 6 works best.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const ProcessStepsBlock: Block = {
  slug: "processSteps",
  labels: { singular: "Process Steps", plural: "Process Steps" },
  admin: { group: "Design blocks" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 6,
      admin: {
        description: "2 – 6 numbered step cards. 3 or 4 works best.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const ProseCtaBlock: Block = {
  slug: "proseCta",
  labels: { singular: "Inline CTA", plural: "Inline CTAs" },
  admin: { group: "Design blocks" },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Speak with a criminal defence lawyer today.",
    },
    {
      name: "subtitle",
      type: "textarea",
      defaultValue:
        "Confidential from the first word. Answered by a lawyer, not a call centre.",
    },
  ],
};

export const CalloutBlock: Block = {
  slug: "callout",
  labels: { singular: "Callout Box", plural: "Callout Boxes" },
  admin: { group: "Design blocks" },
  fields: [
    {
      name: "label",
      type: "text",
      admin: {
        description:
          "Small uppercase label above the callout — e.g. 'In plain language'.",
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
  ],
};

export const StatBlockBlock: Block = {
  slug: "statBlock",
  labels: { singular: "Big Stat", plural: "Big Stats" },
  admin: { group: "Design blocks" },
  fields: [
    { name: "number", type: "text", required: true },
    { name: "label", type: "text", required: true },
    { name: "detail", type: "text" },
  ],
};

export const designBlocks: Block[] = [
  StatsGridBlock,
  IconCardsBlock,
  KeyPointsBlock,
  ProcessStepsBlock,
  ProseCtaBlock,
  CalloutBlock,
  StatBlockBlock,
];
