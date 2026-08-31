import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Site-wide identity and defaults. Edit anything here and it updates across every page.",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, defaultValue: "Saggi Law Firm" },
    {
      name: "legalName",
      type: "text",
      defaultValue: "Saggi Law Firm Professional Corporation",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Criminal Defence Law Firm Brampton",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "Saggi Law Firm provides focused criminal defence services for individuals facing criminal matters in Brampton and throughout the Greater Toronto Area.",
    },
    { name: "url", type: "text", defaultValue: "https://saggilawfirm.com" },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Image shown when the site is shared on social media (1200×630).",
      },
    },
  ],
};
