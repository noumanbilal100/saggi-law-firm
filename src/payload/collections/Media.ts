import type { CollectionConfig } from "payload";

/**
 * Image / file library. Every upload lives on disk under /public/media
 * so it's served by Next.js without any extra config. Payload builds
 * responsive sizes automatically via `sharp`.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    description:
      "Photos, logos, and other files used across the site. Drag-drop to upload.",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 800 },
      { name: "hero", width: 1600 },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the image for screen readers and search engines (e.g., 'Mandeep Saggi at the Brampton courthouse').",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
