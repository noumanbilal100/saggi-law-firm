import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { PageLayout } from "@/components/shared/PageLayout";
import { ServicePageLayout } from "@/components/service/ServicePageLayout";
import { ServiceSidebar } from "@/components/service/ServiceSidebar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  InlineMeetLawyer,
  InlineCta,
  InlineOutcomes,
  InlineReviews,
} from "@/components/service/InlineInterstitials";
import { jsxConverters } from "@/components/service/lexical-converters";
import { splitLexicalBody } from "@/lib/split-lexical-body";
import { extractServiceFaq } from "@/lib/extract-service-faq";
import { extractCodedSections } from "@/lib/extract-coded-sections";
import { buildMetadata } from "@/lib/build-metadata";
import {
  CoversSection,
  PenaltiesSection,
  DefenseSection,
  ProcessSection,
} from "@/components/service/CodedSections";
import {
  loadServiceMdx,
  listServiceSlugs,
  type ServiceFrontmatter,
} from "@/lib/mdx";
import { getPayloadInstance } from "@/lib/payload";
import { services, getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Root-level catch-all for services AND CMS pages.
 *
 * When the client's WordPress site went live, service URLs sat at the
 * root ( /assault, /firearms-weapons, /bail-hearing-brampton ) rather
 * than under a /services/ prefix. Preserving those URLs keeps the
 * inbound SEO / ad / backlink traffic pointed at real, up-to-date
 * pages instead of 301-chaining through a fresh URL space, so the
 * rebuild adopts the same flat structure.
 *
 * Resolution order for a slug:
 *   1. Payload `services` collection    — the primary source for
 *      practice-area pages. Whenever a published entry exists at the
 *      slug, it wins and renders through the ServicePage template.
 *   2. MDX file / `services.ts` list    — dev-authored fallback so
 *      preview content can ship before an admin entry is created.
 *   3. Payload `pages` collection       — everything else the admin
 *      publishes (marketing, location, informational pages).
 *   4. Otherwise                        — notFound().
 *
 * `RESERVED` guards route names that already have their own file
 * (/services index, /blog, /about, /contact, /booking, /locations,
 * /admin, /api) so the catch-all never shadows them.
 */

type Params = { slug: string };
type HeroImageRelation = { url?: string | null; alt?: string | null };

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

/* ────────────────────────── lookups ──────────────────────────── */

async function findPayloadService(slug: string) {
  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "services",
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
  } catch {
    return null;
  }
}

async function findCmsPage(slug: string) {
  try {
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
  } catch {
    return null;
  }
}

/* ──────────────────── generateStaticParams ───────────────────── */

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = new Set<string>();
  try {
    const payload = await getPayloadInstance();
    const svc = await payload.find({
      collection: "services",
      where: { _status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    svc.docs.forEach((d) => slugs.add(String(d.slug)));

    const pages = await payload.find({
      collection: "pages",
      where: { _status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    pages.docs.forEach((d) => slugs.add(String(d.slug)));
  } catch {
    /* Payload not available at build time — fall through to
       file-based fallbacks. Pages will still render on request. */
  }

  const mdxSlugs = await listServiceSlugs().catch(() => [] as string[]);
  mdxSlugs.forEach((s) => slugs.add(s));
  services.forEach((s) => slugs.add(s.slug));

  return Array.from(slugs)
    .filter((s) => !RESERVED.has(s.toLowerCase()))
    .map((slug) => ({ slug }));
}

/* ────────────────────── generateMetadata ─────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED.has(slug.toLowerCase())) return {};

  const serviceDoc = await findPayloadService(slug);
  if (serviceDoc) {
    return buildMetadata({
      path: `/${slug}`,
      title: (serviceDoc.title as string) ?? slug,
      description: (serviceDoc.summary as string) ?? null,
      doc: serviceDoc as never,
    });
  }

  const loaded = await loadServiceMdx(slug);
  const svc = getServiceBySlug(slug);
  if (loaded || svc) {
    const title =
      loaded?.frontmatter.seoTitle ?? loaded?.frontmatter.title ?? svc?.title;
    const description =
      loaded?.frontmatter.seoDescription ??
      loaded?.frontmatter.summary ??
      svc?.summary;
    if (title) {
      return { title, description, alternates: { canonical: `/${slug}` } };
    }
  }

  const page = await findCmsPage(slug);
  if (page) {
    return buildMetadata({
      path: `/${slug}`,
      title: (page.title as string) ?? slug,
      description: (page.summary as string) ?? null,
      doc: page as never,
    });
  }

  return {};
}

/* ──────────────────────── render helpers ─────────────────────── */

function placeholderBody(title: string, summary: string) {
  return `> **Content coming soon.** A detailed page for **${title}** is being prepared. In the meantime, the summary below reflects what this practice area covers.\n\n${summary}\n\n## What to do next\n\nIf you or someone close to you is dealing with this kind of allegation, contact Saggi Law Firm to discuss the circumstances of the case and understand the options available.\n`;
}

function serviceJsonLd(title: string, summary: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${title} — ${siteConfig.name}`,
    url: `${siteConfig.url}/${slug}`,
    description: summary,
    provider: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

function serviceBreadcrumbJsonLd(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Criminal Defence",
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteConfig.url}/${slug}`,
      },
    ],
  };
}

function pageBreadcrumbJsonLd(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${siteConfig.url}/${slug}`,
      },
    ],
  };
}

/* ───────────────────────── default export ────────────────────── */

export default async function ServiceOrCmsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug.toLowerCase())) notFound();

  /* Priority 1: Payload service — the primary path for every
     practice-area page. */
  const serviceDoc = await findPayloadService(slug);
  if (serviceDoc) {
    const title = serviceDoc.title as string;
    const summary = (serviceDoc.summary as string) ?? "";
    const kicker = (serviceDoc.heroKicker as string) ?? "Criminal defence";
    const heroImage =
      (serviceDoc.heroImage as HeroImageRelation | null | undefined) ?? null;

    const { bodyWithoutFaq, faqs } = extractServiceFaq(serviceDoc.body as never);
    const { sections, bodyRemainder } = extractCodedSections(
      bodyWithoutFaq as never,
    );
    const hasCoded = Object.keys(sections).length > 0;
    const remainderSegments = splitLexicalBody(bodyRemainder as never, 5);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceBreadcrumbJsonLd(title, slug)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd(title, summary, slug)),
          }}
        />
        <PageLayout
          hero={{
            title,
            summary,
            kicker,
            icon: (serviceDoc.icon as string) ?? "§",
            imageSrc: heroImage?.url ?? null,
            imageAlt: heroImage?.alt ?? null,
            breadcrumb: [
              { label: "Home", href: "/" },
              { label: "Criminal Defence", href: "/services" },
              { label: title },
            ],
          }}
          serviceSlug={slug}
          finalCtaTitle={`Facing a ${title.toLowerCase()} charge?`}
          sidebar={<ServiceSidebar serviceSlug={slug} />}
          faqs={faqs}
          hasInlineEngagement
        >
          <div className="not-prose mb-4">
            <Eyebrow>Overview</Eyebrow>
          </div>
          <RichText data={remainderSegments[0] as never} converters={jsxConverters} />
          {sections.covers && <CoversSection section={sections.covers} />}
          <InlineMeetLawyer />
          {sections.penalties && (
            <PenaltiesSection section={sections.penalties} />
          )}
          <RichText data={remainderSegments[1] as never} converters={jsxConverters} />
          <InlineCta />
          {sections.defense && <DefenseSection section={sections.defense} />}
          <RichText data={remainderSegments[2] as never} converters={jsxConverters} />
          <InlineOutcomes serviceSlug={slug} />
          {sections.process && <ProcessSection section={sections.process} />}
          <RichText data={remainderSegments[3] as never} converters={jsxConverters} />
          <InlineReviews />
          <RichText data={remainderSegments[4] as never} converters={jsxConverters} />
          {!hasCoded && null}
        </PageLayout>
      </>
    );
  }

  /* Priority 2: MDX file / services.ts fallback — dev-authored
     practice-area content ships before it's authored in admin. */
  const loaded = await loadServiceMdx(slug);
  const svc = getServiceBySlug(slug);
  if (loaded || svc) {
    const frontmatter: ServiceFrontmatter = loaded?.frontmatter ?? {
      slug,
      title: svc!.title,
      summary: svc!.summary,
      icon: svc!.icon,
      order: svc!.order,
    };
    const body = loaded?.body ?? placeholderBody(svc!.title, svc!.summary);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceBreadcrumbJsonLd(frontmatter.title, slug),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceJsonLd(frontmatter.title, frontmatter.summary, slug),
            ),
          }}
        />
        <ServicePageLayout frontmatter={frontmatter} body={body} />
      </>
    );
  }

  /* Priority 3: Payload CMS page (marketing / info / location). */
  const page = await findCmsPage(slug);
  if (!page) notFound();

  const heroImage =
    (page.heroImage as HeroImageRelation | null | undefined) ?? null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageBreadcrumbJsonLd(page.title as string, slug)),
        }}
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
        <RichText data={page.body as never} converters={jsxConverters} />
      </PageLayout>
    </>
  );
}
