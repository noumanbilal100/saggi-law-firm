import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: { singular: "Location", plural: "Locations" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "tier", "order"],
    description:
      "Communities the firm serves. 'Main' locations show as featured chips; 'Also' locations show in the extended list.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "tier",
      type: "select",
      required: true,
      defaultValue: "also",
      options: [
        { label: "Main service area", value: "main" },
        { label: "Also serving", value: "also" },
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
