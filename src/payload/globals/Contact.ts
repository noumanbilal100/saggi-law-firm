import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact & Office",
  admin: {
    description:
      "Phone, email, address, hours, and booking link. Used everywhere across the site — change it once, updates everywhere.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "phone",
      type: "text",
      required: true,
      defaultValue: "647-983-6720",
      admin: { description: "Displayed as-is. E.g. '647-983-6720'." },
    },
    {
      name: "phoneHref",
      type: "text",
      required: true,
      defaultValue: "tel:+16479836720",
      admin: {
        description:
          "Click-to-call URL. Include country code. E.g. 'tel:+16479836720'.",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      defaultValue: "mandeep@saggilawfirm.com",
      admin: {
        description:
          "Primary contact email — receives all form submissions and appears across the site.",
      },
    },
    {
      name: "address",
      type: "group",
      fields: [
        { name: "street", type: "text", defaultValue: "2250 Bovaird Dr E, Unit 401" },
        { name: "city", type: "text", defaultValue: "Brampton" },
        { name: "province", type: "text", defaultValue: "Ontario" },
        { name: "postal", type: "text", defaultValue: "L6R 0W3" },
        { name: "country", type: "text", defaultValue: "Canada" },
      ],
    },
    {
      name: "hours",
      type: "text",
      admin: {
        description:
          "Free-form hours line. E.g. 'Mon–Fri 9am–6pm · 24/7 emergency line'.",
      },
    },
    {
      name: "bookingUrl",
      type: "text",
      defaultValue: "/booking",
      admin: {
        description:
          "Where 'Book Consultation' buttons point. Use '/booking' for the built-in form, or paste a Calendly / external URL.",
      },
    },
    {
      name: "mapsUrl",
      type: "text",
      admin: {
        description: "Full Google Maps link to the office.",
      },
    },
  ],
};
