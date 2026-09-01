import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation & Footer",
  admin: {
    description:
      "The site logo, header, and footer link lists. Upload a new logo and it appears in the top nav and the footer automatically. Add / remove / reorder to change what appears in the site nav.",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      /* Fire Next.js revalidation for every path so the new logo /
         nav-link changes appear immediately after Save without any
         cache staleness. Wrapped in a try so a revalidation failure
         never blocks the admin write. */
      async () => {
        try {
          revalidatePath("/", "layout");
        } catch {
          /* ignore — revalidation is best-effort in dev. */
        }
      },
    ],
  },
  fields: [
    {
      name: "logo",
      label: "Site logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Uploaded here → shown in the top navigation bar AND the footer. Ideally a transparent PNG or SVG, roughly 3:1 or wider, at least 400 px tall. Leave empty to fall back to the built-in /logo.png.",
      },
    },
    {
      name: "logoAlt",
      label: "Logo alt text",
      type: "text",
      defaultValue: "Saggi Law Firm — Barrister & Solicitor",
      admin: {
        description:
          "Read aloud by screen readers and used by Google when the logo image cannot load. Keep it short and descriptive.",
      },
    },
    {
      name: "header",
      label: "Header links",
      type: "array",
      admin: { description: "Shown in the top navigation bar." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, admin: { description: "e.g. /services or https://…" } },
      ],
      defaultValue: [
        { label: "Criminal Defence", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Locations", href: "/location" },
        { label: "Journal", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      name: "footerPractice",
      label: "Footer — Practice column",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "footerFirm",
      label: "Footer — Firm column",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
