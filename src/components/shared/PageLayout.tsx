import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { EmbedHtml } from "@/components/ui/EmbedHtml";
import { GoogleReviewsStrip } from "@/components/shared/GoogleReviewsStrip";
import { AtAGlanceStrip } from "@/components/service/AtAGlanceStrip";
import { WhyChooseUs } from "@/components/service/WhyChooseUs";
import { First24Hours } from "@/components/service/First24Hours";
import { FaqAccordion } from "@/components/service/FaqAccordion";
import { MeetTheLawyer } from "@/components/home/MeetTheLawyer";
import { siteConfig } from "@/lib/siteConfig";
import {
  getRelatedServices,
  services as allServices,
} from "@/lib/services";
import { getCaseResultsForService, hasSampleResults } from "@/lib/case-results";
import { loadAllBlogPosts, getBlogPostsForService } from "@/lib/blog";
import { mainLocations, alsoLocations } from "@/lib/location";
import type { ServiceFaq } from "@/lib/extract-service-faq";

export type PageHero = {
  title: string;
  summary?: string | null;
  kicker?: string | null;
  icon?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
  breadcrumb: Array<{ label: string; href?: string }>;
};

type Props = {
  hero: PageHero;
  /** MDX / RichText rendered React tree for the article body. */
  children: React.ReactNode;
  /** When set, related services + case results are filtered by this slug. */
  serviceSlug?: string;
  /** Override the H2 shown in the closing dark CTA. */
  finalCtaTitle?: string;
  /**
   * Optional sticky right-column content beside the article body (e.g.
   * ServiceSidebar with the booking form). When provided, the article
   * area switches to a two-column desktop layout; on mobile the sidebar
   * stacks below the article.
   */
  sidebar?: React.ReactNode;
  /**
   * Optional charge-specific FAQs extracted from the article body.
   * When present, the FAQ accordion uses these; otherwise it falls
   * back to a universal firm-process FAQ set.
   */
  faqs?: ServiceFaq[];
  /**
   * Service pages render compact inline versions of Meet the Lawyer,
   * Recent Outcomes, and Client Reviews inside the article body. Set
   * this true to skip the full-height duplicates below the article —
   * avoids showing the same content twice in one scroll.
   */
  hasInlineEngagement?: boolean;
};

/**
 * The shared page shell used by every long-form page on the site:
 *   - /services/<slug>  (MDX body)
 *   - /<slug>           (Payload rich-text body)
 *
 * Composition (top to bottom, with alternating cream / warm grounds):
 *   1. Hero            — breadcrumb + kicker + title + summary + CTAs + visual
 *   2. Article + sidebar
 *   3. Meet the lawyer
 *   4. Recent outcomes (only when caseResults exist for the service)
 *   5. Client reviews  (Trustindex embed, when configured)
 *   6. Related practice areas (auto by category, or top services for custom pages)
 *   7. From the journal (auto related, or latest posts)
 *   8. Locations we serve
 *   9. Final CTA       (dark)
 */
export async function PageLayout({
  hero,
  children,
  serviceSlug,
  finalCtaTitle,
  sidebar,
  faqs,
  hasInlineEngagement = false,
}: Props) {
  const { phone, phoneHref, bookingUrl, email } = siteConfig.contact;

  const relatedServices = serviceSlug
    ? getRelatedServices(serviceSlug, 4)
    : allServices.slice(0, 4);

  const caseResults = serviceSlug ? getCaseResultsForService(serviceSlug, 4) : [];

  const relatedPosts = serviceSlug
    ? await getBlogPostsForService(serviceSlug, 3)
    : (await loadAllBlogPosts()).slice(0, 3);

  const widgetEmbed = siteConfig.google.widgetEmbed;
  const reviewsUrl = siteConfig.google.reviewsUrl;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pt-20">
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
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.98rem] text-muted"
            aria-label="Breadcrumb"
          >
            {hero.breadcrumb.map((item, i) => {
              const isLast = i === hero.breadcrumb.length - 1;
              return (
                <span key={i} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="opacity-50">›</span>}
                  {isLast || !item.href ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link href={item.href} className="hover:text-rust">
                      {item.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>

          <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              {hero.kicker && <Eyebrow>{hero.kicker}</Eyebrow>}
              <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(1.75rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                {hero.title}
              </h1>
              {hero.summary && (
                <p className="mt-5 max-w-[58ch] text-[1.1rem] leading-[1.6] text-muted">
                  {hero.summary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-stretch gap-3.5">
                <a
                  href={phoneHref ?? "tel:"}
                  className="btn-shimmer inline-flex min-w-[210px] flex-col items-start rounded-md bg-rust px-5 py-3 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
                >
                  <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                    Call or WhatsApp
                  </span>
                  <span className="font-display text-[1.15rem] font-medium leading-tight">
                    {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
                  </span>
                </a>
                <Link
                  href={bookingUrl ?? "/contact-us"}
                  className="inline-flex min-w-[210px] flex-col items-start rounded-md border-[1.5px] border-rule bg-transparent px-5 py-3 text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
                >
                  <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Consultation
                  </span>
                  <span className="font-display text-[1.15rem] font-medium leading-tight">
                    Book online →
                  </span>
                </Link>
              </div>

              {/* Trust badges — above-the-fold social proof. Four
                  cells: small ink SVG icon, big Fraunces number, small
                  caps label. Vertical rule dividers on desktop for
                  editorial polish. 2×2 grid on mobile. */}
              <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-rule pt-6 sm:grid-cols-4 sm:divide-x sm:divide-rule sm:gap-0">
                <TrustBadge
                  icon={<ScaleIcon />}
                  number="10+"
                  label="Years defending criminal charges"
                />
                <TrustBadge
                  icon={<PhoneIcon />}
                  number="24/7"
                  label="Direct line — a lawyer answers"
                />
                <TrustBadge
                  icon={<StarIcon />}
                  number="4.9"
                  suffix="★"
                  label="207+ Google reviews"
                />
                <TrustBadge
                  icon={<ShieldIcon />}
                  number="100%"
                  label="Solicitor–client privileged"
                />
              </ul>
            </div>

            {hero.imageSrc ? (
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-rule shadow-brand-lg"
                style={{
                  background:
                    "linear-gradient(160deg, #252449 0%, #16153F 60%, #0E0D2D 100%)",
                }}
              >
                {/* `object-contain` guarantees the full image is visible
                    (no crop). The dark gradient behind fills any letterbox
                    area with brand ink so it looks intentional. */}
                <Image
                  src={hero.imageSrc}
                  alt={hero.imageAlt ?? hero.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  style={{
                    filter:
                      "brightness(0.88) saturate(0.72) sepia(0.15) contrast(1.03)",
                  }}
                />
                {/* Warm ink veil — softens the image and pushes it into
                    the cream/rust/ink palette without hiding content. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,5,24,0.06) 0%, rgba(7,5,24,0.20) 100%)",
                  }}
                />
                {/* Gold rim highlight top for editorial finish. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(211,181,116,0.14), transparent 60%)",
                  }}
                />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-ink/70 px-3 py-1 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur">
                  <span className="text-maple">🍁</span> Brampton, ON
                </span>
              </div>
            ) : (
              <HeroVisual icon={hero.icon ?? "§"} kicker={hero.kicker} />
            )}
          </div>
        </div>
      </section>

      {/* ---------- GOOGLE REVIEWS SOCIAL PROOF STRIP ---------- */}
      {/* Dark full-width band immediately below hero — 5 gold stars +
          Google G + link to the firm's Google reviews. Acts as a fast
          trust anchor before readers dive into the long-form article. */}
      <GoogleReviewsStrip />

      {/* ---------- AT A GLANCE — legal snapshot strip ---------- */}
      {/* Cream-warm band with 4 quick-fact columns (type of matter,
          framework, forum, first step). Gives a visitor the legal
          orientation they need before committing to the deep read. */}
      {serviceSlug && <AtAGlanceStrip serviceSlug={serviceSlug} />}

      {/* ---------- WHY SAGGI LAW FIRM — 4-card USP grid ---------- */}
      {/* Four value-proposition cards (focused practice, direct lawyer
          contact, case-specific strategy, GTA coverage) so visitors
          see the firm's differentiators before the deep read. */}
      {serviceSlug && <WhyChooseUs />}

      {/* ---------- FIRST 24 HOURS — action checklist ---------- */}
      {/* Two-column card: left = urgent-CTA panel, right = 6-step
          practical checklist for anyone who has just been charged.
          High perceived value + strong entry point into a call. */}
      {serviceSlug && <First24Hours />}

      {/* ---------- ARTICLE (+ optional sticky sidebar) ---------- */}
      {/* Article spans the full 1240px container. When a `sidebar` prop is
          provided (service pages), the row becomes a two-column grid with
          the prose on the left and a sticky booking form / trust card on
          the right; on mobile the sidebar stacks below the article. */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          {sidebar ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 lg:items-start">
              <article className="prose-brand min-w-0">{children}</article>
              {/* Sticky sidebar. `max-h` + internal scroll ensures a tall
                  sidebar (form + trust bar) still visibly sticks even on
                  laptop-height viewports — otherwise a sidebar taller
                  than the viewport just scrolls with the page. */}
              <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 [scrollbar-width:thin]">
                {sidebar}
              </aside>
            </div>
          ) : (
            <article className="prose-brand">{children}</article>
          )}
        </div>
      </section>

      {/* ---------- FAQ ACCORDION — charge-specific questions ---------- */}
      {/* Sits directly after the article body. Uses charge-specific
          FAQs extracted from the article body when available;
          otherwise falls back to universal firm-process questions.
          Native <details> — zero JS, keyboard accessible. */}
      {serviceSlug && <FaqAccordion faqs={faqs} />}

      {/* ---------- CONSULTATION STRIP (post-article conversion) ---------- */}
      {/* Sits right after the article body. Centered composition with a
          static, universally-appropriate headline — deliberately avoids
          piping in the service title so long/marketing titles never break
          the layout. Trust line under the buttons closes the ask. */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(211,181,116,0.10), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 40% 100% at 50% 100%, rgba(173,82,7,0.28), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gold/25 bg-white/[0.03] px-4 py-1.5 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-gold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-maple shadow-[0_0_0_4px_rgba(216,6,33,0.18)]"
            />
            Free consultation · Available 24/7
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-cream text-balance">
            Speak with a criminal defence lawyer{" "}
            <em className="font-medium not-italic italic text-gold">today</em>.
          </h3>
          <p className="mx-auto mt-4 max-w-[54ch] text-[1rem] leading-[1.6] text-cream/70">
            Confidential from the first word. Answered by a lawyer, not a call centre.
          </p>

          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
            <a
              href={phoneHref ?? "tel:"}
              className="btn-shimmer group inline-flex min-w-[240px] items-center justify-center gap-3 rounded-md bg-rust px-6 py-4 text-white shadow-[0_6px_18px_rgba(173,82,7,0.32)] transition-all hover:-translate-y-0.5 hover:bg-rust-hover hover:shadow-[0_10px_24px_rgba(173,82,7,0.4)]"
            >
              <span aria-hidden className="text-lg">✆</span>
              <span className="flex flex-col items-start leading-none">
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] opacity-85">
                  Call or WhatsApp
                </span>
                <span className="mt-1 font-display text-[1.15rem] font-medium">
                  {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
                </span>
              </span>
            </a>
            <Link
              href={bookingUrl ?? "/contact-us"}
              className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-md border-[1.5px] border-white/25 bg-white/[0.03] px-6 py-4 text-cream backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-white/[0.06] hover:text-gold"
            >
              <span className="flex flex-col items-start leading-none">
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] opacity-70">
                  Or book online
                </span>
                <span className="mt-1 font-display text-[1.1rem] font-medium">
                  Free consultation
                </span>
              </span>
              <span aria-hidden className="text-lg">→</span>
            </Link>
          </div>

          {email && (
            <p className="mt-6 text-[0.98rem] text-cream/50">
              Or email{" "}
              <a
                href={`mailto:${email}`}
                className="text-gold underline underline-offset-2 hover:text-cream"
              >
                {email}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ---------- MEET THE LAWYER ---------- */}
      {/* Skipped when the article body already carried an inline
          Meet the Lawyer card (service pages) — avoids showing the
          same block twice in one scroll. */}
      {!hasInlineEngagement && <MeetTheLawyer />}

      {/* ---------- RECENT OUTCOMES (only when filtered by service) ---------- */}
      {/* Skipped when inline outcomes card already appeared inside
          the article body — the reader has seen these already. */}
      {!hasInlineEngagement && caseResults.length > 0 && (
        <section className="border-t border-rule py-20 md:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-8 max-w-[720px]">
              <Eyebrow>Recent outcomes</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
                Related results in this practice area
              </h2>
              <p className="mt-3 max-w-[62ch] text-[1rem] leading-[1.65] text-muted">
                A selection of past matters similar in charge type. Every case turns on its own facts.
              </p>
            </div>

            {hasSampleResults && (
              <div
                role="note"
                className="mb-6 inline-flex items-start gap-3 rounded border-l-[3px] border-maple bg-maple/[0.05] px-4 py-2.5 text-[0.98rem] text-ink"
              >
                <span className="rounded bg-maple px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
                  Sample
                </span>
                <span>
                  Design preview — replace with verified outcomes before publishing.
                </span>
              </div>
            )}

            <div className="border-t border-rule">
              {caseResults.map((r, i) => (
                <div
                  key={i}
                  className="grid items-center gap-6 border-b border-rule py-5 md:grid-cols-[180px_1fr_auto] md:gap-8"
                >
                  <div className="flex flex-col">
                    <span className="font-body text-[0.85rem] font-bold uppercase tracking-[0.06em] text-muted">
                      {r.charge}
                    </span>
                    {(r.jurisdiction || r.year) && (
                      <span className="mt-1 text-[0.8rem] text-muted/80">
                        {r.jurisdiction}
                        {r.jurisdiction && r.year && " · "}
                        {r.year}
                      </span>
                    )}
                  </div>
                  <div
                    className="font-display text-[1.1rem] font-medium leading-[1.4] text-ink [&>em]:not-italic [&>em]:italic [&>em]:text-rust"
                    dangerouslySetInnerHTML={{ __html: r.outcome }}
                  />
                  <span className="inline-flex whitespace-nowrap justify-self-start rounded-full border border-rust bg-rust/8 px-3 py-1.5 font-body text-[0.78rem] font-bold uppercase tracking-[0.08em] text-rust md:justify-self-end">
                    {r.outcomeLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- CLIENT REVIEWS (Trustindex) ---------- */}
      {/* Skipped when inline reviews card already appeared inside
          the article body — the reader has seen social proof twice. */}
      {!hasInlineEngagement && widgetEmbed && (
        <section className="bg-cream-warm py-20 md:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-8 max-w-[720px]">
              <Eyebrow>Client reviews</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
                What clients say about working with Saggi Law Firm
              </h2>
            </div>
            <EmbedHtml
              html={widgetEmbed}
              className="[&_iframe]:w-full [&>*]:mx-auto"
            />
            {reviewsUrl && (
              <div className="mt-6 text-center text-[1.02rem] text-muted">
                <a
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-rust"
                >
                  Read all reviews on Google →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- TRUST STATS STRIP (mid-scroll authority) ---------- */}
      {/* A hard-numbers moment after reviews and before people move on to
          exploring other services. Builds authority at the point where
          they might otherwise bounce. */}
      <section className="border-y border-rule bg-cream py-8 md:py-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            <div className="text-center md:text-left">
              <div
                className="font-display text-[clamp(2.2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.03em] text-rust"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                14<sup className="text-[0.5em] font-normal">+</sup>
              </div>
              <div className="mt-2 text-[0.95rem] font-body leading-[1.4] text-muted">
                Years defending<br />criminal charges
              </div>
            </div>
            <div className="text-center md:text-left">
              <div
                className="font-display text-[clamp(2.2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.03em] text-rust"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                1,200<sup className="text-[0.5em] font-normal">+</sup>
              </div>
              <div className="mt-2 text-[0.95rem] font-body leading-[1.4] text-muted">
                Cases handled<br />across the GTA
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-display text-[clamp(2.2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.03em] text-rust">
                24/7
              </div>
              <div className="mt-2 text-[0.95rem] font-body leading-[1.4] text-muted">
                Availability day,<br />night &amp; weekends
              </div>
            </div>
            <div className="text-center md:text-left">
              <div
                className="font-display text-[clamp(2.2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.03em] text-rust"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                4.9<sup className="text-[0.5em] font-normal">★</sup>
              </div>
              <div className="mt-2 text-[0.95rem] font-body leading-[1.4] text-muted">
                Rating from<br />207+ Google reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- RELATED PRACTICE AREAS ---------- */}
      <section className="border-t border-rule py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[720px]">
              <Eyebrow>Practice areas</Eyebrow>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15]">
                {serviceSlug ? "Also relevant to this charge" : "Explore our practice areas"}
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-paper px-5 py-3 font-body text-[1.02rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
            >
              View all services →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex h-full flex-col gap-3 rounded-[10px] border border-rule bg-paper p-6 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-rust/[0.08] font-display text-[1.05rem] font-semibold leading-none text-rust">
                  {s.icon}
                </div>
                <h3 className="font-display text-[1.05rem] font-medium leading-[1.25]">
                  {s.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[0.95rem] font-semibold text-rust transition-transform group-hover:translate-x-1">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- RELATED BLOG POSTS ---------- */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream-warm py-14 md:py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[720px]">
                <Eyebrow>From the journal</Eyebrow>
                <h2 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15]">
                  {serviceSlug ? "Related reading" : "Latest from the journal"}
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-paper px-5 py-3 font-body text-[1.02rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
              >
                All articles →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => {
                const date = new Date(post.frontmatter.date);
                return (
                  <Link
                    key={post.frontmatter.slug}
                    href={`/blog/${post.frontmatter.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-[10px] border border-rule bg-paper p-6 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
                  >
                    <div className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.12em]">
                      <span className="text-rust">{post.frontmatter.category}</span>
                      {post.frontmatter.sample && (
                        <span className="rounded bg-maple/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-maple">
                          sample
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-[1.15rem] font-medium leading-[1.3]">
                      {post.frontmatter.title}
                    </h3>
                    <p className="line-clamp-3 text-[1rem] leading-[1.55] text-muted">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-3 text-[0.85rem] text-muted">
                      <time dateTime={post.frontmatter.date}>
                        {date.toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post.frontmatter.readTime && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{post.frontmatter.readTime}</span>
                        </>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold text-rust transition-transform group-hover:translate-x-1">
                      Read →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- LOCATIONS SERVED (condensed) ---------- */}
      <section className="border-t border-rule py-10 md:py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <Eyebrow>Where we appear</Eyebrow>
              <span className="font-body text-[0.98rem] text-muted">
                Serving Brampton, the GTA &amp; Southern Ontario
              </span>
            </div>
            <Link
              href="/location"
              className="inline-flex items-center gap-1.5 font-body text-[0.98rem] font-semibold text-rust transition-transform hover:translate-x-1"
            >
              All locations <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {mainLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/location/${l.slug}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.98rem] transition-all ${
                  l.slug === "brampton"
                    ? "border-rust bg-rust font-semibold text-white"
                    : "border-rule bg-paper text-ink hover:border-rust hover:text-rust"
                }`}
              >
                <span className="text-[0.92rem] text-maple">🍁</span>
                {l.name}
              </Link>
            ))}
            {alsoLocations.slice(0, 10).map((l) => (
              <Link
                key={l.slug}
                href={`/location/${l.slug}`}
                className="inline-flex items-center rounded-full border border-rule bg-paper px-3 py-1.5 text-[0.92rem] text-muted transition-all hover:border-rust hover:text-rust"
              >
                {l.name}
              </Link>
            ))}
            {alsoLocations.length > 10 && (
              <Link
                href="/location"
                className="inline-flex items-center rounded-full border border-dashed border-rule bg-transparent px-3 py-1.5 text-[0.92rem] font-semibold text-rust hover:bg-rust hover:text-white"
              >
                +{alsoLocations.length - 10} more →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden bg-ink py-16 text-cream md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(173,82,7,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 text-center">
          <div className="flex justify-center">
            <Eyebrow onDark>Speak with us</Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] text-cream">
            {finalCtaTitle ?? `Have a question about ${hero.title}?`}
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem] leading-[1.7] text-cream/70">
            Every matter is different. The most useful first step is a short conversation about the specific circumstances of your case.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href={phoneHref ?? "tel:"}
              className="btn-shimmer inline-flex min-w-[220px] flex-col items-start rounded-md bg-rust px-6 py-3.5 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Direct line · Call or WhatsApp
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
              </span>
            </a>
            <Link
              href={bookingUrl ?? "/contact-us"}
              className="inline-flex min-w-[220px] flex-col items-start rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
            >
              <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Book online
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                Free consultation →
              </span>
            </Link>
          </div>
          <div className="mt-8 text-[1.02rem] text-cream/60">
            Or browse{" "}
            <Link
              href="/services"
              className="text-gold underline underline-offset-2 hover:text-cream"
            >
              all {allServices.length} practice areas →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Compact trust cell shown in the hero above-the-fold row.
 * Editorial vertical layout: hairline icon → big Fraunces number
 * → small-caps label. Restrained, law-firm palette (ink + rust).
 */
function TrustBadge({
  icon,
  number,
  suffix,
  label,
}: {
  icon: React.ReactNode;
  number: string;
  suffix?: string;
  label: string;
}) {
  return (
    <li className="flex flex-col gap-2.5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
      <span aria-hidden className="text-rust">
        {icon}
      </span>
      <span
        className="font-display text-[1.6rem] font-medium leading-none tracking-[-0.03em] text-ink"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {number}
        {suffix && (
          <span className="ml-0.5 align-[0.15em] text-[0.65em] text-rust">
            {suffix}
          </span>
        )}
      </span>
      <span className="font-body text-[0.76rem] font-semibold uppercase tracking-[0.08em] leading-[1.4] text-muted">
        {label}
      </span>
    </li>
  );
}

/* ── Inline SVG icons — 22×22, 1.5 stroke, editorial line-art ─────── */

function ScaleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v18" />
      <path d="M5 21h14" />
      <path d="M6 6h12" />
      <path d="M6 6L3 13a3 3 0 0 0 6 0L6 6z" />
      <path d="M18 6l-3 7a3 3 0 0 0 6 0L18 6z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/**
 * Fallback hero visual when no image is provided — dark card with the
 * service icon rendered large in gold, layered gold + rust radial glows,
 * a subtle grid, and a small maple-leaf badge.
 */
function HeroVisual({ icon, kicker }: { icon: string; kicker?: string | null }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-ink bg-ink shadow-brand-lg lg:aspect-[3/4]"
      style={{
        background:
          "linear-gradient(160deg, #252449 0%, #16153F 60%, #0E0D2D 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(211,181,116,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(211,181,116,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(211,181,116,0.28), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(173,82,7,0.32), transparent 70%)",
        }}
      />
      <div className="absolute left-6 top-6 h-16 w-16 border-l-2 border-t-2 border-gold/40" />
      <div className="absolute bottom-6 right-6 h-16 w-16 border-b-2 border-r-2 border-gold/40" />
      <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-ink/70 px-3 py-1 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-gold backdrop-blur">
        <span className="text-maple">🍁</span> Brampton
      </span>
      <div className="relative flex h-full items-center justify-center">
        <span
          className="font-display font-medium leading-none text-gold"
          style={{ fontSize: "clamp(11rem, 22vw, 17rem)", letterSpacing: "-0.05em" }}
        >
          {icon}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gold/15 bg-ink/60 px-6 py-4 backdrop-blur-sm">
        <div className="font-body text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold">
          Saggi Law Firm
        </div>
        {kicker && (
          <div className="mt-1 font-display text-[1.02rem] font-normal italic text-cream/85">
            {kicker}
          </div>
        )}
      </div>
    </div>
  );
}
