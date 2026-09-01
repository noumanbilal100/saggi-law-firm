import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/services";
import { mainLocations, alsoLocations } from "@/lib/location";
import { caseResults } from "@/lib/case-results";
import { listBlogSlugs } from "@/lib/blog";
import { getPayloadInstance } from "@/lib/payload";

/**
 * Next.js discovers this and serves /sitemap.xml. Google crawls it
 * on every visit and the URL is referenced from robots.ts — the two
 * files together are what makes new pages index within hours instead
 * of weeks.
 *
 * Includes every URL that's actually reachable on the site:
 *   - Static routes                    (home, about, contact, etc.)
 *   - Services listing + every service (from services.ts + Payload)
 *   - Blog listing + every post        (Payload + MDX)
 *   - Locations listing + every city   (main + also-serving)
 *   - Custom Payload pages             (any /<slug> the client added)
 *
 * Any collection query that fails silently falls back to empty so a
 * broken DB never breaks the sitemap for the rest of the site.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/location`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  /* Case study detail pages. */
  const caseStudyRoutes: MetadataRoute.Sitemap = caseResults.map((r) => ({
    url: `${base}/case-studies/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /* Static services (services.ts) — always available even without DB. */
  const staticServices: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* Locations (main + also-serving) — link to per-location routes. */
  const locationRoutes: MetadataRoute.Sitemap = [
    ...mainLocations,
    ...alsoLocations,
  ].map((l) => ({
    url: `${base}/location/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  /* MDX-authored blog posts (content/blog/*.mdx). */
  let mdxBlog: MetadataRoute.Sitemap = [];
  try {
    const slugs = await listBlogSlugs();
    mdxBlog = slugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    /* Ignore — MDX loader is optional. */
  }

  /* Payload-authored blog posts + custom pages + Payload services.
     Only published (not draft) documents are added. */
  let payloadEntries: MetadataRoute.Sitemap = [];
  try {
    const payload = await getPayloadInstance();

    const [payloadServices, payloadBlog, payloadPages] = await Promise.all([
      payload.find({
        collection: "services",
        where: { _status: { equals: "published" } },
        limit: 500,
        depth: 0,
      }),
      payload.find({
        collection: "blog-posts",
        where: { _status: { equals: "published" } },
        limit: 500,
        depth: 0,
      }),
      payload.find({
        collection: "pages",
        where: { _status: { equals: "published" } },
        limit: 500,
        depth: 0,
      }),
    ]);

    const RESERVED = new Set([
      "services",
      "blog",
      "about",
      "contact",
      "booking",
      "location",
      "case-studies",
      "admin",
      "api",
    ]);

    const lastMod = (d: any) =>
      d.updatedAt ? new Date(d.updatedAt) : now;

    payloadEntries = [
      ...payloadServices.docs.map((d: any) => ({
        url: `${base}/${d.slug}`,
        lastModified: lastMod(d),
        changeFrequency: "monthly" as const,
        priority: 0.85,
      })),
      ...payloadBlog.docs.map((d: any) => ({
        url: `${base}/blog/${d.slug}`,
        lastModified: lastMod(d),
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
      ...payloadPages.docs
        .filter((d: any) => !RESERVED.has(String(d.slug).toLowerCase()))
        .map((d: any) => ({
          url: `${base}/${d.slug}`,
          lastModified: lastMod(d),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
    ];
  } catch {
    /* Payload can be unavailable at build time (e.g. during CI without a
       DB). The static portion of the sitemap still ships. */
  }

  /* Deduplicate by URL — Payload entries take priority over the
     static services list when slugs overlap (fresher lastModified). */
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    ...staticRoutes,
    ...staticServices,
    ...caseStudyRoutes,
    ...locationRoutes,
    ...mdxBlog,
    ...payloadEntries,
  ]) {
    byUrl.set(entry.url, entry);
  }
  return Array.from(byUrl.values());
}
