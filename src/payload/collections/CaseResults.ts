import type { CollectionConfig } from "payload";

export const CaseResults: CollectionConfig = {
  slug: "case-results",
  labels: { singular: "Case Result", plural: "Case Results" },
  admin: {
    useAsTitle: "charge",
    defaultColumns: ["charge", "outcomeLabel", "jurisdiction", "year", "sample"],
    description:
      "Verified case outcomes. Every entry is visible on the home page results section; entries also appear on their linked service pages.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "charge",
      type: "text",
      required: true,
      admin: {
        description: "e.g. 'Over 80 (impaired driving)'.",
      },
    },
    {
      name: "outcome",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Full outcome sentence. Wrap the key verb in <em>…</em> for visual emphasis, e.g. 'Charges <em>withdrawn</em> following Charter application.'",
      },
    },
    {
      name: "outcomeTag",
      type: "select",
      required: true,
      defaultValue: "withdrawn",
      options: [
        { label: "Withdrawn", value: "withdrawn" },
        { label: "Acquitted", value: "acquitted" },
        { label: "Stayed", value: "stayed" },
        { label: "Reduced", value: "reduced" },
        { label: "Discharge", value: "discharge" },
        { label: "Peace bond", value: "peace-bond" },
        { label: "Diverted", value: "diverted" },
        { label: "Released", value: "released" },
      ],
    },
    {
      name: "outcomeLabel",
      type: "text",
      required: true,
      defaultValue: "Withdrawn",
    },
    {
      name: "jurisdiction",
      type: "text",
      admin: {
        description: "e.g. 'Brampton', 'Peel Region', 'Superior Court'.",
      },
    },
    {
      name: "year",
      type: "text",
      admin: {
        description: "e.g. '2025'.",
      },
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: {
        description:
          "Which service pages this outcome should appear on (auto-filter).",
      },
    },
    {
      name: "sample",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "When enabled, a visible SAMPLE banner shows in the UI and this entry is treated as placeholder content. UNCHECK ONLY for verified, client-consented outcomes.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 100,
      admin: { position: "sidebar" },
    },
  ],
};
