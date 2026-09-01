import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";
import { getCaseResultsForService } from "@/lib/case-results";

/**
 * Compact engagement blocks inserted BETWEEN chunks of a service
 * page's article body. They live inside the prose article, so each
 * uses .not-prose to opt out of prose typography — and each is
 * styled distinctly so it reads as an interstitial, not a paragraph.
 *
 * The full-height versions of Meet the Lawyer / Recent Outcomes /
 * Client Reviews still sit BELOW the article for readers who scroll
 * all the way; these inline ones give shorter readers an engagement
 * moment before they leave.
 */

/* ────────── 1. Meet the lawyer — humanising interstitial ───────────── */

export function InlineMeetLawyer() {
  const { name, title, photoSrc, headshotSrc, photoAlt } = siteConfig.lawyer;
  /* Prefer the tight headshot for this small circular slot — a full
     portrait ends up cropping off the face in a 120px circle. */
  const avatarSrc = headshotSrc ?? photoSrc;

  return (
    <aside className="not-prose my-14 overflow-hidden rounded-[14px] border border-rule bg-cream-warm shadow-brand-sm">
      <div className="grid gap-6 p-6 sm:grid-cols-[120px_1fr] sm:items-center sm:gap-8 sm:p-8">
        <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-gold shadow-brand-sm sm:mx-0">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={photoAlt}
              fill
              className="object-cover"
              sizes="120px"
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center bg-ink font-display text-[3rem] font-medium text-gold"
              style={{
                background:
                  "linear-gradient(160deg, #252449 0%, #16153F 100%)",
              }}
            >
              {name ? name.charAt(0) : "M"}
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-rust">
            <span aria-hidden className="text-maple">🍁</span>
            Meet the lawyer
          </span>
          <h3 className="mt-2 font-display text-[1.35rem] font-medium leading-[1.2] text-ink sm:text-[1.5rem]">
            {name ?? <Placeholder>[Lawyer Name]</Placeholder>}
            {title && (
              <span className="ml-2 font-body text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-muted">
                · {title}
              </span>
            )}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-[1.6] text-muted">
            Called to the Ontario Bar in 2013. Focused criminal defence
            practice serving the Greater Toronto Area — bail hearings,
            impaired driving, assault, drug offences, and more.
          </p>
          <Link
            href="/about-us"
            className="mt-4 inline-flex items-center gap-2 font-body text-[0.95rem] font-bold text-rust transition-transform hover:translate-x-1"
          >
            Read Mandeep's full profile
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* ────────── 2. Mid-article conversion CTA ──────────────────────────── */

export function InlineCta() {
  const { phone, phoneHref, bookingUrl } = siteConfig.contact;

  return (
    <aside className="not-prose relative my-14 overflow-hidden rounded-[14px] border border-ink bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 100% 50%, rgba(173,82,7,0.22), transparent 60%), radial-gradient(ellipse 60% 100% at 0% 50%, rgba(211,181,116,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-5 p-8 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:p-9 md:text-left">
        <div className="max-w-[38ch]">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/[0.04] px-3 py-1 font-body text-[0.66rem] font-bold uppercase tracking-[0.14em] text-gold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-maple shadow-[0_0_0_4px_rgba(216,6,33,0.18)]"
            />
            Free · Confidential · 24/7
          </span>
          <h3 className="mt-3 font-display text-[1.5rem] font-medium leading-[1.2] text-cream md:text-[1.7rem]">
            Speak with a criminal defence lawyer{" "}
            <em className="font-medium not-italic italic text-gold">today</em>.
          </h3>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
          <a
            href={phoneHref ?? "tel:"}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-rust px-5 py-3.5 font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.32)] transition-all hover:-translate-y-px hover:bg-rust-hover"
          >
            <span aria-hidden>✆</span>
            {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
          </a>
          <Link
            href={bookingUrl ?? "/contact-us"}
            className="inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] border-white/25 bg-white/[0.03] px-5 py-3.5 font-body text-[0.95rem] font-bold text-cream backdrop-blur-sm transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
          >
            Book online
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* ────────── 3. Recent outcomes — social proof interstitial ─────────── */

export function InlineOutcomes({ serviceSlug }: { serviceSlug?: string }) {
  const results = serviceSlug
    ? getCaseResultsForService(serviceSlug, 6)
    : [];

  if (results.length < 2) return null;

  return (
    <aside className="not-prose my-14 rounded-[14px] border border-rule bg-paper p-6 shadow-brand-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-rust">
            Recent representation
          </span>
          <h3 className="mt-2 font-display text-[1.35rem] font-medium leading-[1.2] text-ink sm:text-[1.5rem]">
            Types of cases we defend in this practice area
          </h3>
        </div>
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-rust transition-transform hover:translate-x-1"
        >
          All case studies <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.slice(0, 6).map((r, i) => (
          <Link
            key={i}
            href={`/case-studies/${r.slug}`}
            className="group flex flex-col gap-2 rounded-[10px] border border-rule bg-cream-warm/40 p-4 transition-all hover:-translate-y-0.5 hover:border-rust hover:bg-paper hover:shadow-brand-sm"
          >
            <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
              {r.charge}
            </span>
            <span className="inline-flex w-fit rounded-full border border-rust bg-rust/[0.08] px-2.5 py-1 font-body text-[0.66rem] font-bold uppercase tracking-[0.08em] text-rust">
              {r.outcomeLabel}
            </span>
            {r.jurisdiction && (
              <span className="pt-1 text-[0.72rem] text-muted">
                {r.jurisdiction}
                {r.year && ` · ${r.year}`}
              </span>
            )}
            <span
              aria-hidden
              className="mt-auto inline-flex items-center gap-1 pt-1 text-[0.72rem] font-semibold text-rust transition-transform group-hover:translate-x-1"
            >
              Read case study →
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* ────────── 4. Client reviews — social proof interstitial ──────────── */

export function InlineReviews() {
  const { reviewsUrl } = siteConfig.google;

  return (
    <aside className="not-prose my-14 overflow-hidden rounded-[14px] border border-rule bg-paper shadow-brand-sm">
      <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
        {/* Left: rating summary */}
        <div className="border-b border-rule p-6 sm:p-8 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} />
            ))}
            <span className="ml-2 font-display text-[1.6rem] font-medium leading-none tracking-[-0.02em] text-ink">
              4.9
            </span>
          </div>
          <p className="mt-3 font-body text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Across 207+ Google reviews
          </p>
          <h3 className="mt-4 font-display text-[1.35rem] font-medium leading-[1.25] text-ink sm:text-[1.5rem]">
            What clients say about working with Saggi Law Firm
          </h3>
        </div>

        {/* Right: CTA + reassurance */}
        <div className="flex flex-col justify-center gap-4 bg-cream-warm/40 p-6 sm:p-8">
          <p className="text-[0.95rem] leading-[1.6] text-muted">
            Real reviews from clients across Brampton, Toronto, Mississauga
            and the wider GTA — verified through Google.
          </p>
          {reviewsUrl ? (
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-rust px-5 py-3 font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              Read all Google reviews
              <span aria-hidden>→</span>
            </a>
          ) : (
            <Placeholder>[Google reviews URL]</Placeholder>
          )}
        </div>
      </div>
    </aside>
  );
}

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden
      className="text-gold"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="currentColor"
      />
    </svg>
  );
}
