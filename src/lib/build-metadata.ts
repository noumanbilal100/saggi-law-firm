import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Shared helper that turns a Payload document's `seo` group (see
 * `src/payload/fields/seoFields.ts`) into a Next.js Metadata object
 * ready to return from `generateMetadata`. Falls back to the entry's
 * title / summary / featured image whenever an SEO field is empty.
 *
 * Every field is optional — the helper produces a fully-populated
 * metadata object even when the SEO tab has not been filled in.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Options = {
  /** Canonical path relative to siteConfig.url — e.g. `/services/dui`. */
  path: string;
  /** Entry's title (used as the default seoTitle + ogTitle). */
  title: string;
  /** Entry's summary / excerpt (used as the default seoDescription). */
  description?: string | null;
  /** The Payload document — usually has cover / heroImage + optional seo group. */
  doc?: Record<string, any> | null;
  /** Force the article publish/updated timestamps into OpenGraph. */
  article?: {
    publishedTime?: string | null;
    modifiedTime?: string | null;
    authors?: string[];
    section?: string | null;
    tags?: string[];
  };
};

type Media = { url?: string | null; alt?: string | null };

function pickImageUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as Media;
  return typeof m.url === "string" && m.url.length > 0 ? m.url : null;
}

export function buildMetadata({
  path,
  title,
  description,
  doc,
  article,
}: Options): Metadata {
  /* SEO fields live flat on the doc (no `seo` group) after the schema
     simplification — the shared `seoFields` are spread directly into
     each collection's SEO tab. */
  const featured =
    pickImageUrl(doc?.ogImage) ??
    pickImageUrl(doc?.cover) ??
    pickImageUrl(doc?.heroImage) ??
    null;

  const finalTitle = String(
    doc?.seoTitle ?? title ?? siteConfig.name
  ).trim();
  const finalDescription = String(
    doc?.seoDescription ?? description ?? siteConfig.description
  ).trim();

  const ogTitle = String(doc?.ogTitle ?? finalTitle).trim();
  const ogDescription = String(doc?.ogDescription ?? finalDescription).trim();

  const canonicalPath =
    (doc?.canonicalOverride as string | undefined) ?? path;

  const keywords =
    typeof doc?.keywords === "string" && doc.keywords.length > 0
      ? doc.keywords.split(",").map((s: string) => s.trim()).filter(Boolean)
      : undefined;

  const noindex = Boolean(doc?.noindex);
  const nofollow = Boolean(doc?.nofollow);

  const images = featured
    ? [{ url: featured, width: 1200, height: 630, alt: ogTitle }]
    : undefined;

  const meta: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords,
    alternates: { canonical: canonicalPath },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: article ? "article" : "website",
      url: `${siteConfig.url}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: ogTitle,
      description: ogDescription,
      images,
      ...(article
        ? {
            publishedTime: article.publishedTime ?? undefined,
            modifiedTime: article.modifiedTime ?? undefined,
            authors: article.authors,
            section: article.section ?? undefined,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: featured ? [featured] : undefined,
    },
  };

  return meta;
}
