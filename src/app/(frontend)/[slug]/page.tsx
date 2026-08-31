import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { PageLayout } from "@/components/shared/PageLayout";
import { jsxConverters } from "@/components/service/lexical-converters";
import { getPayloadInstance } from "@/lib/payload";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/build-metadata";

type Params = { slug: string };

/** Slugs Next.js already owns — CMS pages with these are unreachable. */
const RESERVED = new Set([
  "services",
  "blog",
  "about",
  "contact",
  "booking",
  "locations",
  "admin",
  "api",
]);

async function findPage(slug: string) {
  if (RESERVED.has(slug.toLowerCase())) return null;
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "pages",
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: "published" } },
      ],
    },
    limit: 1,
    depth: 2,
  });
  return result.docs[0] ?? null;
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "pages",
      where: { _status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    return result.docs
      .map((p) => ({ slug: String(p.slug) }))
      .filter(({ slug }) => !RESERVED.has(slug.toLowerCase()));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return {};
  return buildMetadata({
    path: `/${slug}`,
    title: (page.title as string) ?? slug,
    description: (page.summary as string) ?? null,
    doc: page as any,
  });
}

type HeroImageRelation = {
  url?: string | null;
  alt?: string | null;
};

export default async function CmsPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) notFound();

  const heroImage =
    (page.heroImage as HeroImageRelation | null | undefined) ?? null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${siteConfig.url}/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageLayout
        hero={{
          title: page.title as string,
          summary: (page.summary as string) ?? null,
          kicker: (page.heroKicker as string) ?? null,
          icon: (page.title as string).charAt(0).toUpperCase(),
          imageSrc: heroImage?.url ?? null,
          imageAlt: heroImage?.alt ?? null,
          breadcrumb: [
            { label: "Home", href: "/" },
            { label: page.title as string },
          ],
        }}
        finalCtaTitle={`Questions about ${page.title as string}?`}
      >
        {/* Prose styling comes from `.prose-brand` on the parent article. */}
        <RichText data={page.body as never} converters={jsxConverters} />
      </PageLayout>
    </>
  );
}
