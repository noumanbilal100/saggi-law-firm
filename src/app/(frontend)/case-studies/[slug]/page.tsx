import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  caseResults,
  getCaseResultBySlug,
  hasSampleResults,
} from "@/lib/case-results";
import { services, getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return caseResults.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const r = getCaseResultBySlug(slug);
  if (!r) return {};
  const title = `${r.charge} — Case Study — ${siteConfig.name}`;
  const description = r.detail.summary;
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/case-studies/${slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const r = getCaseResultBySlug(slug);
  if (!r) notFound();

  const { phone, phoneHref, whatsappHref } = siteConfig.contact;

  const relatedServices = r.services
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<ReturnType<typeof getServiceBySlug>> =>
      Boolean(s)
    );

  const related = caseResults
    .filter((c) => c.slug !== r.slug)
    .filter((c) => c.services.some((s) => r.services.includes(s)))
    .slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${siteConfig.url}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: r.charge,
        item: `${siteConfig.url}/case-studies/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pb-10 pt-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.85rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              ›
            </span>
            <Link href="/case-studies" className="hover:text-rust">
              Case Studies
            </Link>
            <span aria-hidden className="opacity-50">
              ›
            </span>
            <span>{r.charge}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Case study</Eyebrow>
            <span className="inline-flex items-center rounded-full border border-rust bg-rust/[0.08] px-3 py-1 font-body text-[0.68rem] font-bold uppercase tracking-[0.1em] text-rust">
              {r.outcomeLabel}
            </span>
          </div>

          <h1 className="mt-4 max-w-[28ch] font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {r.charge}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.15rem] leading-[1.55] text-ink">
            {r.detail.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.85rem] text-muted">
            {r.jurisdiction && (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-rust"
                />
                {r.jurisdiction}
              </span>
            )}
            {r.year && (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-rust"
                />
                {r.year}
              </span>
            )}
            {relatedServices.length > 0 && (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-rust"
                />
                Practice area:{" "}
                {relatedServices.map((s, i) => (
                  <span key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="text-rust hover:underline"
                    >
                      {s.title}
                    </Link>
                    {i < relatedServices.length - 1 && ", "}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </section>

      {hasSampleResults && r.sample && (
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div
            role="note"
            className="mb-6 inline-flex items-start gap-3 rounded border-l-[3px] border-maple bg-maple/[0.05] px-4 py-2.5 text-[0.85rem] text-ink"
          >
            <span className="rounded bg-maple px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
              Template
            </span>
            <span>
              Design preview — will be replaced with a verified case study
              before publishing.
            </span>
          </div>
        </div>
      )}

      {/* ---------- BODY (2-col with sidebar) ---------- */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 lg:items-start">
            <article className="min-w-0">
              <StudySection eyebrow="Background" title="The situation">
                {r.detail.background.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </StudySection>

              <StudySection eyebrow="Legal question" title="What the case turned on">
                {r.detail.legalQuestion.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </StudySection>

              <StudySection eyebrow="Approach" title="How the file was worked">
                {r.detail.approach.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </StudySection>

              <StudySection
                eyebrow="Key considerations"
                title="Legal issues in play"
              >
                <ul>
                  {r.detail.considerations.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </StudySection>

              <StudySection
                eyebrow="What it means"
                title="For similar matters"
              >
                {r.detail.whatItMeans.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </StudySection>

              <div className="mt-10 rounded-[10px] border-l-[3px] border-rust bg-cream-warm/60 px-5 py-4 text-[0.85rem] leading-[1.6] text-muted">
                <strong className="mb-1 block font-semibold text-ink">
                  A note on this study
                </strong>
                This piece describes the defence approach in a representative
                file of this kind. Nothing in it guarantees a particular
                result. Outcomes depend on the specific facts, the
                disclosure, and the applicable law in each individual case.
              </div>
            </article>

            {/* Sidebar CTA */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-[12px] border border-rule bg-ink text-cream shadow-brand-sm">
                <div className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-maple shadow-[0_0_0_4px_rgba(216,6,33,0.18)]"
                    />
                    Direct line · 24/7
                  </span>
                  {phone && (
                    <div className="mt-1.5 font-display text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-cream">
                      {phone}
                    </div>
                  )}
                  <div className="mt-0.5 text-[0.72rem] text-cream/60">
                    Call or WhatsApp — answered by a lawyer
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 pt-0">
                  <a
                    href={phoneHref ?? "tel:"}
                    className="flex items-center justify-center gap-2 rounded-[8px] bg-rust px-3 py-3 text-[0.85rem] font-bold text-white shadow-[0_4px_12px_rgba(173,82,7,0.35)] transition-all hover:-translate-y-px hover:bg-rust-hover"
                  >
                    Call
                  </a>
                  <a
                    href={whatsappHref ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-[8px] bg-[#25D366] px-3 py-3 text-[0.85rem] font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-px hover:bg-[#1FB855]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div className="mt-5 rounded-[12px] border border-rule bg-paper p-5 shadow-brand-sm">
                  <Eyebrow>Practice area</Eyebrow>
                  <ul className="mt-3 flex flex-col gap-2">
                    {relatedServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${s.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-[0.9rem] font-medium text-ink transition-colors hover:bg-cream-warm/60 hover:text-rust"
                        >
                          <span>{s.title}</span>
                          <span
                            aria-hidden
                            className="text-rust transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- RELATED STUDIES ---------- */}
      {related.length > 0 && (
        <section className="border-t border-rule bg-cream-warm/30 py-14 md:py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <Eyebrow>Related case studies</Eyebrow>
                <h2 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15]">
                  Similar files in this practice area
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 font-body text-[0.85rem] font-semibold text-rust transition-transform hover:translate-x-1"
              >
                All case studies <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-[10px] border border-rule bg-paper p-5 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
                >
                  <span className="font-body text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted">
                    {c.charge}
                  </span>
                  <span className="inline-flex w-fit items-center rounded-full border border-rust bg-rust/[0.08] px-2 py-0.5 font-body text-[0.6rem] font-bold uppercase tracking-[0.08em] text-rust">
                    {c.outcomeLabel}
                  </span>
                  <h3 className="font-display text-[1rem] font-medium leading-[1.3] text-ink">
                    {c.detail.summary}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[0.78rem] font-semibold text-rust transition-transform group-hover:translate-x-1">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden bg-ink py-16 text-cream md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(173,82,7,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 text-center">
          <Eyebrow onDark>Facing a similar file?</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.15] text-cream">
            Every file is different — talk to us about yours.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {phone && (
              <a
                href={phoneHref ?? "tel:"}
                className="inline-flex items-center gap-2 rounded-md bg-rust px-6 py-3.5 font-body text-[0.95rem] font-bold text-white transition-all hover:-translate-y-px hover:bg-rust-hover"
              >
                Call or WhatsApp {phone}
              </a>
            )}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 font-body text-[0.95rem] font-bold text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
            >
              Book online →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Small labeled block inside a case-study article. Each section gets a
 * consistent eyebrow + H2 + prose treatment so the study reads as one
 * document, not five detached tiles.
 */
function StudySection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-rust">
          {eyebrow}
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-rust/25 to-transparent"
        />
      </div>
      <h2 className="mb-4 font-display text-[clamp(1.4rem,2.4vw,1.75rem)] font-medium leading-[1.2] text-ink">
        {title}
      </h2>
      <div className="prose-brand max-w-none">{children}</div>
    </div>
  );
}
