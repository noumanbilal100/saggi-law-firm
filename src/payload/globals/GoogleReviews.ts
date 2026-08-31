import type { GlobalConfig } from "payload";

export const GoogleReviews: GlobalConfig = {
  slug: "google-reviews",
  label: "Google Reviews",
  admin: {
    description:
      "How the Client Reviews section pulls data. Trustindex embed takes priority, then Places API (Place ID), then a plain 'See on Google' link.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "widgetEmbed",
      type: "textarea",
      defaultValue:
        "<script defer async src='https://cdn.trustindex.io/loader.js?0ea6eef790a8876e5b3643117dd'></script>",
      admin: {
        description:
          "Trustindex or Elfsight <script> embed. Highest priority — when set, this widget renders directly.",
      },
    },
    {
      name: "placeId",
      type: "text",
      defaultValue: "ChIJi5zmlM00K4gREAUsVB09yGE",
      admin: {
        description:
          "Google Business Profile Place ID (starts with ChIJ…). Used by the Places-API path when the widget is not set.",
      },
    },
    {
      name: "reviewsUrl",
      type: "text",
      defaultValue: "https://share.google/CJywoW10G515Qad1B",
      admin: {
        description:
          "Public share link to the GMB profile. Used for the 'See reviews on Google' CTA.",
      },
    },
  ],
};
