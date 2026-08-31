import type { CollectionConfig } from "payload";

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  labels: { singular: "FAQ Item", plural: "FAQ Items" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "location", "order"],
    description:
      "Frequently-asked questions shown on the home page and (optionally) on service pages.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
    {
      name: "location",
      type: "select",
      hasMany: true,
      defaultValue: ["home"],
      options: [
        { label: "Home page", value: "home" },
        { label: "Booking page", value: "booking" },
        { label: "Contact page", value: "contact" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 100,
      admin: { position: "sidebar" },
    },
  ],
};
