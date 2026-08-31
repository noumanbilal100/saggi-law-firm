/**
 * Site-wide configuration for Saggi Law Firm.
 *
 * Fields left as `null` render as visible "to-fill" chips in the UI.
 * Values below are verified from the client's live site or supplied
 * directly by the client — never invented.
 */
export type ContactInfo = {
  phone: string | null;
  phoneHref: string | null;
  /** Same digits as `phone`, wrapped in a wa.me link that opens WhatsApp. */
  whatsappHref: string | null;
  email: string | null;
  address: {
    street: string | null;
    city: string;
    province: string;
    postal: string | null;
    country: string;
  };
  hours: string | null;
  bookingUrl: string;
  mapsUrl: string | null;
};

export type LawyerInfo = {
  name: string | null;
  title: string | null;
  role: string;
  photoSrc: string | null;
  photoAlt: string;
  profileUrl: string;
  bio: string | null;
  bioParagraphs: string[];
  credentials: Array<{ title: string; detail: string }>;
  award: string | null;
  languages: string[] | null;
  tagline: string | null;
};

export type SocialLinks = {
  facebook: string | null;
  youtube: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
};

export const siteConfig = {
  name: "Saggi Law Firm",
  legalName: "Saggi Law Firm Professional Corporation",
  tagline: "Criminal Defence Law Firm — Greater Toronto Area",
  description:
    "Saggi Law Firm provides focused criminal defence services for individuals facing criminal matters throughout the Greater Toronto Area.",
  url: "https://saggilawfirm.com",
  locale: "en-CA",
  /** Supported UI locales. FR content is supplied by the client per page. */
  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const,

  contact: {
    phone: "647-983-6720",
    phoneHref: "tel:+16479836720",
    /** Same number, deep-linked to WhatsApp so the CTA can offer both
        a direct call and a WhatsApp chat side-by-side. */
    whatsappHref: "https://wa.me/16479836720",
    /** Primary firm email — used for all form leads and contact links. */
    email: "mandeep@saggilawfirm.com",
    address: {
      street: "2250 Bovaird Dr E, Unit 401",
      city: "Brampton",
      province: "Ontario",
      postal: "L6R 0W3",
      country: "Canada",
    },
    hours: "Available 24/7 — including weekends and holidays",
    bookingUrl: "/booking",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2250+Bovaird+Dr+E+Unit+401+Brampton+ON+L6R+0W3",
  } satisfies ContactInfo,

  lawyer: {
    name: "Mandeep Saggi",
    title: "Barrister & Solicitor",
    role: "Criminal Defence Lawyer",
    photoSrc: "/lawyer.jpg",
    photoAlt: "Mandeep Saggi, Criminal Defence Lawyer — Brampton",
    profileUrl: "/about",
    bio: "Since 2009, Mandeep Saggi has built a reputation as a criminal defence lawyer in Brampton who vigorously fights for his clients' rights.",
    bioParagraphs: [
      "He has successfully defended clients against criminal cases in the Ontario Court of Justice and the Superior Court of Justice, and makes daily appearances at the Brampton Courthouse.",
      "Mandeep has been involved in high-profile criminal cases and represents clients in matters ranging from smaller-scale to complex criminal charges. Known for speedy responses, he keeps a direct line available 24/7.",
    ],
    credentials: [
      {
        title: "Called to the Ontario Bar",
        detail: "Law Society of Ontario — 2009",
      },
      {
        title: "Bachelor of Laws (LL.B Hons.)",
        detail: "University of Leicester, UK — 2009",
      },
      {
        title: "Bachelor of Arts (B.A.)",
        detail: "York University — 2007",
      },
      {
        title: "Articling",
        detail: "Toronto criminal law firm",
      },
    ],
    award:
      "Rated in the top 3 by Three Best Rated® — Best Criminal Defence Lawyers in Brampton.",
    languages: ["English", "French"],
    tagline: "Strategy. Advocacy. Experience.",
  } satisfies LawyerInfo,

  social: {
    facebook:
      "https://www.facebook.com/Criminal-Lawyer-In-Brampton-1548075515513329/",
    youtube: "https://www.youtube.com/channel/UCr399MNvzktaHD41qxo-6zA/",
    twitter: "https://twitter.com/BramptonLawyers",
    linkedin:
      "https://www.linkedin.com/company/saggi-law-firm/",
    instagram: null,
  } satisfies SocialLinks,

  google: {
    /* Native Places-API embed. Requires GOOGLE_PLACES_API_KEY at runtime. */
    placeId: "ChIJi5zmlM00K4gREAUsVB09yGE",
    /* Public share link for the GMB listing — resolves to the knowledge panel
       with reviews visible. Used as the "See reviews on Google" CTA. */
    reviewsUrl: "https://share.google/CJywoW10G515Qad1B",
    /* Knowledge-graph MID pulled from the share URL. */
    kgmid: "/g/1z44bc5tv",
    /* Alternate CTA URL that opens Google Search knowledge panel directly. */
    knowledgePanelUrl:
      "https://www.google.com/search?kgmid=/g/1z44bc5tv&hl=en-CA&q=Saggi+Law+Firm+Brampton",
    /* Trustindex widget — pulls all 207+ Google reviews as a carousel.
       Takes priority over the Places-API path when set. */
    widgetEmbed:
      "<script defer async src='https://cdn.trustindex.io/loader.js?0ea6eef790a8876e5b3643117dd'></script>" as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
