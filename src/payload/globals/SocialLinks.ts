import type { GlobalConfig } from "payload";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  label: "Social Links",
  admin: {
    description: "Social profile URLs shown in the footer. Leave blank to hide an icon.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "facebook",
      type: "text",
      defaultValue:
        "https://www.facebook.com/Criminal-Lawyer-In-Brampton-1548075515513329/",
    },
    {
      name: "youtube",
      type: "text",
      defaultValue: "https://www.youtube.com/channel/UCr399MNvzktaHD41qxo-6zA/",
    },
    {
      name: "twitter",
      type: "text",
      defaultValue: "https://twitter.com/BramptonLawyers",
    },
    {
      name: "linkedin",
      type: "text",
      defaultValue: "https://www.linkedin.com/company/saggi-law-firm/",
    },
    { name: "instagram", type: "text" },
  ],
};
