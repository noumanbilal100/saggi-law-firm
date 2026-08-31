/**
 * Service areas — communities Saggi Law Firm serves.
 *
 * Split into `main` (primary courts / most-common areas, featured on home
 * and Locations page) and `also` (extended reach across Southern Ontario).
 * Individual location pages live in `content/locations/<slug>.mdx`.
 */
export type Location = {
  slug: string;
  name: string;
  tier: "main" | "also";
};

export const locations: Location[] = [
  { slug: "brampton", name: "Brampton", tier: "main" },
  { slug: "mississauga", name: "Mississauga", tier: "main" },
  { slug: "toronto", name: "Toronto", tier: "main" },
  { slug: "vaughan", name: "Vaughan", tier: "main" },
  { slug: "etobicoke", name: "Etobicoke", tier: "main" },
  { slug: "scarborough", name: "Scarborough", tier: "main" },
  { slug: "woodbridge", name: "Woodbridge", tier: "main" },
  { slug: "milton", name: "Milton", tier: "main" },
  { slug: "newmarket", name: "Newmarket", tier: "main" },

  { slug: "oshawa", name: "Oshawa", tier: "also" },
  { slug: "hamilton", name: "Hamilton", tier: "also" },
  { slug: "kitchener", name: "Kitchener", tier: "also" },
  { slug: "markham", name: "Markham", tier: "also" },
  { slug: "richmond-hill", name: "Richmond Hill", tier: "also" },
  { slug: "ajax", name: "Ajax", tier: "also" },
  { slug: "pickering", name: "Pickering", tier: "also" },
  { slug: "whitby", name: "Whitby", tier: "also" },
  { slug: "oakville", name: "Oakville", tier: "also" },
  { slug: "burlington", name: "Burlington", tier: "also" },
  { slug: "orangeville", name: "Orangeville", tier: "also" },
  { slug: "caledon", name: "Caledon", tier: "also" },
  { slug: "bolton", name: "Bolton", tier: "also" },
  { slug: "waterloo", name: "Waterloo", tier: "also" },
  { slug: "cambridge", name: "Cambridge", tier: "also" },
  { slug: "guelph", name: "Guelph", tier: "also" },
  { slug: "aurora", name: "Aurora", tier: "also" },
  { slug: "halton-hills", name: "Halton Hills", tier: "also" },
  { slug: "king-city", name: "King City", tier: "also" },
  { slug: "north-york", name: "North York", tier: "also" },
  { slug: "east-york", name: "East York", tier: "also" },
];

export const mainLocations = locations.filter((l) => l.tier === "main");
export const alsoLocations = locations.filter((l) => l.tier === "also");

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
