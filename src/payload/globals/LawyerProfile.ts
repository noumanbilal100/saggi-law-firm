import type { GlobalConfig } from "payload";
import { richTextEditor } from "@/payload/richtext";

export const LawyerProfile: GlobalConfig = {
  slug: "lawyer-profile",
  label: "Lawyer Profile",
  admin: {
    description:
      "Mandeep Saggi's profile — photo, bio, credentials, award. Used on the Meet the Lawyer section and the /about-us page.",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, defaultValue: "Mandeep Saggi" },
    { name: "title", type: "text", defaultValue: "Barrister & Solicitor" },
    { name: "role", type: "text", defaultValue: "Criminal Defence Lawyer" },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Portrait photo. Portrait aspect (4:5 or similar) works best.",
      },
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Strategy. Advocacy. Experience.",
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description:
          "Short quote / lede shown prominently under the name (1–2 sentences).",
      },
    },
    {
      name: "bioLong",
      type: "richText",
      editor: richTextEditor,
      admin: {
        description: "Longer bio shown on the /about-us page.",
      },
    },
    {
      name: "credentials",
      type: "array",
      admin: {
        description: "Degrees, admissions, memberships, languages.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "detail", type: "text", required: true },
      ],
      defaultValue: [
        { title: "Called to the Ontario Bar", detail: "Law Society of Ontario — 2009" },
        { title: "Bachelor of Laws (LL.B Hons.)", detail: "University of Leicester, UK — 2009" },
        { title: "Bachelor of Arts (B.A.)", detail: "York University — 2007" },
        { title: "Articling", detail: "Toronto criminal law firm" },
      ],
    },
    {
      name: "award",
      type: "textarea",
      admin: {
        description: "Recognition line shown as a highlighted badge.",
      },
      defaultValue:
        "Rated in the top 3 by Three Best Rated® — Best Criminal Defence Lawyers in Brampton.",
    },
    {
      name: "languages",
      type: "array",
      fields: [{ name: "language", type: "text" }],
      defaultValue: [{ language: "English" }, { language: "French" }],
    },
    {
      name: "profileUrl",
      type: "text",
      defaultValue: "/about-us",
      admin: {
        description: "Where 'Learn More About the Lawyer' links to.",
      },
    },
  ],
};
