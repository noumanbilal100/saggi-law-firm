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
 * Data sources for a service page, checked in this order:
 *   1. Payload CMS   — an entry in the `services` collection (admin panel).
 *                       Wins whenever a published entry with the slug exists.
 *   2. MDX file      — `content/services/<slug>.mdx` (dev-authored).
 *   3. services.ts   — a bare summary entry with a "coming soon" body.
 *
 * Adding a service via any of the three routes above makes a page appear
 * at /services/<slug>. Editing in Payload always overrides an MDX file
 * of the same slug — this is how the admin panel takes ownership of a
 * page that started life as MDX.
 */

type Params = { slug: string };

type HeroImageRelation = { url?: string | null; alt?: string | null };

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

export async function generateStaticParams() {
  const mdxSlugs = await listServiceSlugs();
  const listSlugs = services.map((s) => s.slug);
  let payloadSlugs: string[] = [];
  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "services",
      where: { _status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    payloadSlugs = result.docs.map((d) => String(d.slug));
  } catch {
    payloadSlugs = [];
  }
  const all = Array.from(
    new Set([...payloadSlugs, ...mdxSlugs, ...listSlugs])
  );
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;

  const payloadDoc = await findPayloadService(slug);
  if (payloadDoc) {
    return buildMetadata({
      path: `/services/${slug}`,
      title: (payloadDoc.title as string) ?? slug,
      description: (payloadDoc.summary as string) ?? null,
      doc: payloadDoc as any,
    });
  }

  const loaded = await loadServiceMdx(slug);
  const svc = getServiceBySlug(slug);
  const title =
    loaded?.frontmatter.seoTitle ?? loaded?.frontmatter.title ?? svc?.title;
  const description =
    loaded?.frontmatter.seoDescription ??
    loaded?.frontmatter.summary ??
    svc?.summary;
  if (!title) return { title: "Service" };
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
  };
}

function placeholderBody(title: string, summary: string) {
  return `> **Content coming soon.** A detailed page for **${title}** is being prepared. In the meantime, the summary below reflects what this practice area covers.

${summary}

## What to do next

If you or someone close to you is dealing with this kind of allegation, contact Saggi Law Firm to discuss the circumstances of the case and understand the options available.
`;
}

export default async function ServicePage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;

  const breadcrumbJsonLd = (title: string) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Criminal Defence", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: title, item: `${siteConfig.url}/services/${slug}` },
    ],
  });
  const serviceJsonLd = (title: string, summary: string) => ({
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${title} — ${siteConfig.name}`,
    url: `${siteConfig.url}/services/${slug}`,
    description: summary,
    provider: { "@type": "LegalService", name: siteConfig.name, url: siteConfig.url },
  });

  /* ---------- 1. Payload takes priority ---------- */
  const payloadDoc = await findPayloadService(slug);
  if (payloadDoc) {
    const title = payloadDoc.title as string;
    const summary = (payloadDoc.summary as string) ?? "";
    const kicker = (payloadDoc.heroKicker as string) ?? "Criminal defence";
    const heroImage =
      (payloadDoc.heroImage as HeroImageRelation | null | undefined) ?? null;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(title)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(title, summary)) }}
        />
        <PageLayout
          hero={{
            title,
            summary,
            kicker,
            icon: (payloadDoc.icon as string) ?? "§",
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
          faqs={extractServiceFaq(payloadDoc.body as any).faqs}
          hasInlineEngagement
        >
          {(() => {
            /* Pull FAQ + coded sections out of the body first so the
               article doesn't repeat what these dedicated blocks now
               render. The remainder (intro paragraphs before the
               first coded H2, plus any uncoded H2 sections) still
               renders as regular prose — split into 5 segments with
               4 interstitials so the engagement rhythm stays. */
            const { bodyWithoutFaq } = extractServiceFaq(payloadDoc.body as any);
            const { sections, bodyRemainder } = extractCodedSections(
              bodyWithoutFaq as any
            );
            const hasCoded = Object.keys(sections).length > 0;
            const remainderSegments = splitLexicalBody(bodyRemainder as any, 5);

            return (
              <>
                {/* Small "Overview" eyebrow signals the start of the
                    deep-read after the First 24 Hours checklist above. */}
                <div className="not-prose mb-4">
                  <Eyebrow>Overview</Eyebrow>
                </div>

                {/* @ts-expect-error — Lexical data shape is dynamic */}
                <RichText data={remainderSegments[0]} converters={jsxConverters} />

                {sections.covers && <CoversSection section={sections.covers} />}

                <InlineMeetLawyer />

                {sections.penalties && (
                  <PenaltiesSection section={sections.penalties} />
                )}

                {/* @ts-expect-error — Lexical data shape is dynamic */}
                <RichText data={remainderSegments[1]} converters={jsxConverters} />
                <InlineCta />

                {sections.defense && (
                  <DefenseSection section={sections.defense} />
                )}

                {/* @ts-expect-error — Lexical data shape is dynamic */}
                <RichText data={remainderSegments[2]} converters={jsxConverters} />
                <InlineOutcomes serviceSlug={slug} />

                {sections.process && (
                  <ProcessSection section={sections.process} />
                )}

                {/* @ts-expect-error — Lexical data shape is dynamic */}
                <RichText data={remainderSegments[3]} converters={jsxConverters} />
                <InlineReviews />
                {/* @ts-expect-error — Lexical data shape is dynamic */}
                <RichText data={remainderSegments[4]} converters={jsxConverters} />

                {/* Nothing coded? Return the segment split verbatim
                    so existing pages continue rendering as before. */}
                {!hasCoded && null}
              </>
            );
          })()}
        </PageLayout>
      </>
    );
  }

  /* ---------- 2 + 3. MDX file or services.ts fallback ---------- */
  const loaded = await loadServiceMdx(slug);
  const svc = getServiceBySlug(slug);
  if (!loaded && !svc) notFound();

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
          __html: JSON.stringify(breadcrumbJsonLd(frontmatter.title)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(frontmatter.title, frontmatter.summary)),
        }}
      />
      <ServicePageLayout frontmatter={frontmatter} body={body} />
    </>
  );
}
