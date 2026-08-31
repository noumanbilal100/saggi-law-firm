import type { Metadata } from "next";
import Image from "next/image";
import { getBranding } from "@/lib/branding";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Google-Ads landing page — Criminal Defence Legal Guidance in Brampton.
 *
 * Single-focus conversion page:
 *   - No site nav / footer / journal links to distract the click
 *   - Landing-page-specific tracked phone number (kept separate from
 *     the main site number so the client can measure Ads ROI directly)
 *   - Multiple call CTAs above / mid / below the fold
 *   - Sticky mobile call bar
 *   - Trust signals, benefits, case-representation grid, then close
 *
 * Content stays LSO-compliant — "types of representation" framing,
 * no fabricated outcome claims.
 */

/* Landing-page-specific contact — separate phone + email so the
   client can distinguish Google-Ads-driven leads from organic site
   leads directly in their tracking and inbox. */
const LP_PHONE_DISPLAY = "437-605-6573";
const LP_PHONE_HREF = "tel:+14376056573";
const LP_WHATSAPP_HREF = "https://wa.me/14376056573";
const LP_EMAIL = "Aman.usman.legal@gmail.com";
const LP_EMAIL_HREF = `mailto:${LP_EMAIL}`;

/* Office — Saggi Law Firm's headquarters. Shown at the bottom so the
   Ads visitor sees a real-world business presence. */
const OFFICE_STREET = "2250 Bovaird Dr E, Unit 401";
const OFFICE_CITY = "Brampton, ON L6R 0W3";
const OFFICE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=2250+Bovaird+Dr+E+Unit+401+Brampton+ON+L6R+0W3";

const TITLE = "Criminal Defence Lawyer in Brampton — Free Confidential Consultation";
const DESCRIPTION =
  "Charged with a criminal offence in Brampton or the GTA? Talk to a criminal defence lawyer directly — free, confidential, 24/7. Bail, DUI, assault, drug, and firearms matters.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/criminal-defence-legal-guidance-in-brampton" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/criminal-defence-legal-guidance-in-brampton`,
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default async function LandingPage() {
  const brand = await getBranding();

  return (
    <>
      {/* ═════════════ SLIM DARK HEADER (logo + phone only) ═════════════ */}
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink text-cream shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Image
            src={brand.src}
            alt={brand.alt}
            width={brand.width}
            height={brand.height}
            priority
            className="h-9 w-auto sm:h-10 md:h-11"
          />
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={LP_EMAIL_HREF}
              className="hidden items-center gap-1.5 font-body text-[0.85rem] text-cream/75 transition-colors hover:text-gold md:inline-flex"
            >
              <MailGlyph />
              {LP_EMAIL}
            </a>
            <a
              href={LP_PHONE_HREF}
              className="btn-shimmer btn-pulse-rust hidden items-center gap-2 rounded-md bg-rust px-4 py-2.5 font-body text-[0.9rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.4)] transition-all hover:-translate-y-px hover:bg-rust-hover sm:inline-flex"
            >
              <PhoneGlyph />
              {LP_PHONE_DISPLAY}
            </a>
            <a
              href={LP_PHONE_HREF}
              className="btn-pulse-rust inline-flex items-center gap-1.5 rounded-md bg-rust px-3 py-2 font-body text-[0.82rem] font-bold text-white sm:hidden"
            >
              <PhoneGlyph />
              Call
            </a>
          </div>
        </div>
        <div
          aria-hidden
          className="h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(173,82,7,0.6) 15%, rgba(211,181,116,0.95) 40%, rgba(216,6,33,0.7) 60%, rgba(173,82,7,0.6) 85%, transparent 100%)",
          }}
        />
      </header>

      {/* ═════════════ HERO — dark, urgent, big CTA ═════════════ */}
      <section className="relative overflow-hidden bg-ink py-14 text-cream md:py-20">
        {/* Ambient warm glows + subtle grid — depth without an image
            so the hero loads instantly on mobile. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 15% 20%, rgba(173,82,7,0.20), transparent 60%), radial-gradient(ellipse 60% 100% at 85% 80%, rgba(211,181,116,0.14), transparent 60%), radial-gradient(ellipse 40% 60% at 50% 100%, rgba(216,6,33,0.10), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(211,181,116,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(211,181,116,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Gold corner accents — architectural editorial feel. */}
        <div aria-hidden className="pointer-events-none absolute left-6 top-6 h-16 w-16 border-l-2 border-t-2 border-gold/40" />
        <div aria-hidden className="pointer-events-none absolute right-6 top-6 h-16 w-16 border-r-2 border-t-2 border-gold/40" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/[0.04] px-3.5 py-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">
                <span aria-hidden className="live-dot" />
                Free · Confidential · Available 24/7
              </span>

              <h1 className="mt-5 max-w-[22ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-cream">
                Facing a Criminal Charge in{" "}
                <em className="not-italic italic text-gold">Brampton</em>?
              </h1>
              <p className="mt-5 max-w-[52ch] text-[1.1rem] leading-[1.55] text-cream/80">
                Speak directly with a criminal defence lawyer today — not a
                paralegal, not a call centre. Bail hearings, impaired driving,
                assault, drug offences, firearms &amp; more.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <a
                  href={LP_PHONE_HREF}
                  className="btn-shimmer btn-pulse-rust group inline-flex items-center justify-center gap-3 rounded-md bg-rust px-6 py-4 font-body text-[1rem] font-bold text-white shadow-[0_6px_20px_rgba(173,82,7,0.45)] transition-all hover:-translate-y-0.5 hover:bg-rust-hover"
                >
                  <PhoneGlyph />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-80">
                      Call or WhatsApp
                    </span>
                    <span className="mt-1 font-display text-[1.35rem] font-medium">
                      {LP_PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
                <a
                  href={LP_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pulse-whatsapp inline-flex items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-6 py-4 font-body text-[0.95rem] font-bold text-white shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#1FB855]"
                >
                  <WhatsAppGlyph />
                  WhatsApp Now
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-3 text-[0.85rem] sm:grid-cols-4">
                {[
                  "Free consult",
                  "24/7 · Weekends",
                  "Direct to lawyer",
                  "Full GTA coverage",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-cream/80">
                    <CheckGlyph />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: LIVE CALL panel. Replaces the form — the goal
                here is that the visitor's ONLY reasonable next step
                is to tap the phone number. Big number, live-now
                indicator, direct-lawyer attribution, and reasons to
                call before scrolling. */}
            <aside className="relative overflow-hidden rounded-[18px] border border-gold/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-brand-lg backdrop-blur-sm sm:p-8">
              {/* Ambient rust + gold glows inside the panel. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(173,82,7,0.18), transparent 60%), radial-gradient(ellipse 90% 40% at 50% 100%, rgba(211,181,116,0.12), transparent 60%)",
                }}
              />
              {/* Gold corner ticks — architectural framing. */}
              <div aria-hidden className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-gold/60" />
              <div aria-hidden className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-gold/60" />
              <div aria-hidden className="pointer-events-none absolute left-4 bottom-4 h-8 w-8 border-b-2 border-l-2 border-gold/60" />
              <div aria-hidden className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-b-2 border-r-2 border-gold/60" />

              <div className="relative">
                {/* Live availability pill */}
                <span className="inline-flex items-center gap-2 rounded-full border border-maple/40 bg-maple/[0.12] px-3 py-1.5 font-body text-[0.66rem] font-bold uppercase tracking-[0.16em] text-cream">
                  <span aria-hidden className="live-dot" />
                  Live now · A lawyer is available
                </span>

                <p className="mt-6 font-body text-[0.75rem] font-bold uppercase tracking-[0.2em] text-gold">
                  Speak with counsel now
                </p>

                {/* HUGE phone number as the panel's centrepiece. */}
                <a
                  href={LP_PHONE_HREF}
                  className="mt-2 block font-display text-[clamp(2.4rem,4.5vw,3.4rem)] font-medium leading-none tracking-[-0.03em] text-cream transition-colors hover:text-gold"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {LP_PHONE_DISPLAY}
                </a>
                <p className="mt-3 text-[0.9rem] leading-[1.5] text-cream/65">
                  Direct line to a criminal defence lawyer.<br />
                  Answered 24 hours a day — including weekends.
                </p>

                {/* Twin CTA buttons */}
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <a
                    href={LP_PHONE_HREF}
                    className="btn-shimmer btn-pulse-rust group flex items-center justify-center gap-2 rounded-md bg-rust px-4 py-3.5 font-body text-[0.9rem] font-bold text-white shadow-[0_6px_18px_rgba(173,82,7,0.45)] transition-all hover:-translate-y-0.5 hover:bg-rust-hover"
                  >
                    <PhoneGlyph />
                    Call now
                  </a>
                  <a
                    href={LP_WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pulse-whatsapp group flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3.5 font-body text-[0.9rem] font-bold text-white shadow-[0_6px_18px_rgba(37,211,102,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#1FB855]"
                  >
                    <WhatsAppGlyph />
                    WhatsApp
                  </a>
                </div>

                {/* Trust-guarantee bullets — reasons to call BEFORE
                    the visitor scrolls further. */}
                <ul className="mt-7 flex flex-col gap-2.5 border-t border-gold/15 pt-6">
                  {[
                    "Answered in under 30 seconds",
                    "Confidential from the first word",
                    "No obligation to retain",
                    "Free assessment of your matter",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-[0.9rem] text-cream/80"
                    >
                      <span
                        aria-hidden
                        className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-gold text-ink"
                      >
                        <CheckGlyph />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═════════════ TRUST BAR ═════════════ */}
      <section className="border-y border-rule bg-cream-warm/40 py-6 md:py-8">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <ul className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              { n: "14+", l: "Years defending criminal charges" },
              { n: "24/7", l: "Direct line — day, night, weekends" },
              { n: "4.9★", l: "207+ Google reviews" },
              { n: "GTA", l: "Brampton · Toronto · Peel · Beyond" },
            ].map((t) => (
              <li key={t.n}>
                <div className="font-display text-[clamp(1.6rem,2.6vw,2rem)] font-medium leading-none tracking-[-0.02em] text-rust">
                  {t.n}
                </div>
                <div className="mt-1.5 text-[0.78rem] leading-[1.4] text-muted">
                  {t.l}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════ WHAT WE HELP WITH ═════════════ */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 max-w-[720px]">
            <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rust">
              Practice areas
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15]">
              Every criminal matter, one number to call.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Impaired driving & DUI",
                d: "Over 80, refusal, care-and-control, first-offence, licence and MELT timelines.",
              },
              {
                t: "Bail hearings",
                d: "Same-day preparation, surety selection, release-plan drafting.",
              },
              {
                t: "Assault & domestic",
                d: "Simple, bodily-harm, aggravated; peace-bond track for suitable files.",
              },
              {
                t: "Drug offences",
                d: "Possession, trafficking, production — Charter and disclosure-focused.",
              },
              {
                t: "Firearms & weapons",
                d: "Storage, possession, prohibited/restricted; regulatory reductions.",
              },
              {
                t: "White collar",
                d: "Fraud, breach of trust, proceeds of crime, diversion applications.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[10px] border border-rule bg-cream-warm/40 p-5 transition-colors hover:border-rust hover:bg-paper"
              >
                <h3 className="font-display text-[1.05rem] font-medium leading-[1.3] text-ink">
                  {c.t}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.55] text-muted">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ WHY US ═════════════ */}
      <section className="bg-cream py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 max-w-[720px]">
            <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rust">
              Why choose us
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15]">
              What you get when you call this number.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "A lawyer, not a call centre.",
                d: "Every call is answered by counsel — no intake screening, no transfers.",
              },
              {
                t: "Free & confidential.",
                d: "Solicitor–client privilege from the first word. No obligation to retain.",
              },
              {
                t: "Same-day bail work.",
                d: "Release plan, surety interviews, and hearing prep in a single day when needed.",
              },
              {
                t: "Every GTA courthouse.",
                d: "Brampton, Toronto, Mississauga, Newmarket, Milton — daily appearances.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[10px] border border-rule bg-paper p-5 shadow-brand-sm"
              >
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-rust/[0.08] text-rust">
                  <CheckGlyph />
                </div>
                <h3 className="font-display text-[1rem] font-medium leading-[1.3] text-ink">
                  {c.t}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-[1.55] text-muted">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ MID-PAGE CTA STRIP ═════════════ */}
      <section className="relative overflow-hidden bg-ink py-14 text-cream md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 80% 30%, rgba(173,82,7,0.20), transparent 60%), radial-gradient(ellipse 60% 100% at 20% 70%, rgba(211,181,116,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/[0.04] px-3.5 py-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">
            <span aria-hidden className="live-dot" />
            Available 24/7 · Even Weekends
          </span>
          <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-[1.15] text-cream">
            Don't guess. Talk to a criminal defence lawyer{" "}
            <em className="not-italic italic text-gold">now</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[1rem] leading-[1.6] text-cream/70">
            Every hour after a charge matters. Get clear advice on your rights,
            the process, and your options — in one confidential call.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LP_PHONE_HREF}
              className="btn-shimmer btn-pulse-rust inline-flex items-center justify-center gap-3 rounded-md bg-rust px-7 py-4 font-body text-[1rem] font-bold text-white shadow-[0_6px_22px_rgba(173,82,7,0.45)] transition-all hover:-translate-y-0.5 hover:bg-rust-hover"
            >
              <PhoneGlyph />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] opacity-85">
                  Call now
                </span>
                <span className="mt-1 font-display text-[1.35rem] font-medium">
                  {LP_PHONE_DISPLAY}
                </span>
              </span>
            </a>
            <a
              href={LP_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pulse-whatsapp inline-flex items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-6 py-4 font-body text-[0.95rem] font-bold text-white shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#1FB855]"
            >
              <WhatsAppGlyph />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═════════════ HOW IT WORKS ═════════════ */}
      <section className="bg-cream-warm/40 py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-10 max-w-[720px]">
            <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rust">
              How the call works
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15]">
              A simple, confidential first conversation.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "You call.",
                d: "The line goes directly to a criminal defence lawyer — day, night, or weekend.",
              },
              {
                t: "We listen.",
                d: "Circumstances of the arrest, charge, release conditions, upcoming court dates.",
              },
              {
                t: "You get clarity.",
                d: "Plain-language answers on what the charge means, what happens next, and your options.",
              },
            ].map((s, i) => (
              <li
                key={s.t}
                className="rounded-[10px] border border-rule bg-paper p-6 shadow-brand-sm"
              >
                <div
                  className="mb-3 font-display text-[2.2rem] font-medium leading-none tracking-[-0.03em] text-rust"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-[1.15rem] font-medium leading-[1.3] text-ink">
                  {s.t}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-[1.6] text-muted">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════════ OFFICE / LOCATION SECTION ═════════════ */}
      <section className="border-y border-rule bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 font-body text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rust">
                <span aria-hidden className="text-maple">🍁</span>
                Visit or contact
              </span>
              <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.1] text-ink">
                Meet us at our{" "}
                <em className="not-italic italic text-rust">Brampton</em>{" "}
                office.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.65] text-muted">
                Our office is a short drive from the Brampton Courthouse and
                the Peel Region court complex — walk-ins by appointment, and
                after-hours reachable on the number above.
              </p>

              <dl className="mt-8 divide-y divide-rule border-y border-rule">
                <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-5">
                  <dt className="font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-rust">
                    Office
                  </dt>
                  <dd className="font-display text-[1.05rem] font-medium leading-[1.4] text-ink">
                    {OFFICE_STREET}
                    <span className="mt-1 block font-body text-[0.85rem] font-normal text-muted">
                      {OFFICE_CITY}
                    </span>
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-5">
                  <dt className="font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-rust">
                    Phone
                  </dt>
                  <dd className="font-display text-[1.05rem] font-medium leading-[1.4] text-ink">
                    <a
                      href={LP_PHONE_HREF}
                      className="hover:text-rust"
                    >
                      {LP_PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-5">
                  <dt className="font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-rust">
                    Email
                  </dt>
                  <dd className="font-display text-[1.05rem] font-medium leading-[1.4] text-ink">
                    <a href={LP_EMAIL_HREF} className="hover:text-rust break-all">
                      {LP_EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-5">
                  <dt className="font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-rust">
                    Hours
                  </dt>
                  <dd className="font-display text-[1.05rem] font-medium leading-[1.4] text-ink">
                    Available 24/7
                    <span className="mt-1 block font-body text-[0.85rem] font-normal text-muted">
                      Weekends &amp; holidays included
                    </span>
                  </dd>
                </div>
              </dl>

              <a
                href={OFFICE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-transparent px-5 py-3 font-body text-[0.9rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
              >
                Open in Google Maps
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Illustrated map card — no external map API dependency,
                loads instantly, uses brand palette. */}
            <div
              className="relative min-h-[440px] overflow-hidden rounded-[18px] border border-rule shadow-brand-lg"
              style={{
                background:
                  "linear-gradient(180deg, #F4EFDD 0%, #FBF9ED 60%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(11,10,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,10,31,0.05) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 55% 45%, transparent 100px, rgba(251,249,237,0.5) 260px)",
                }}
              />

              <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-md border border-rule bg-paper px-2.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
                <span className="text-[0.9rem] text-maple">🍁</span>{" "}
                Brampton, ON
              </span>

              {/* Roads */}
              <div className="absolute left-[5%] right-[5%] top-[42%] h-[3px] -rotate-2 bg-ink/[0.08]" />
              <div className="absolute bottom-[8%] left-[48%] top-[8%] w-[3px] bg-ink/[0.08]" />
              <div className="absolute left-[10%] right-[30%] top-[68%] h-[2px] rotate-[15deg] bg-ink/[0.08]" />

              {/* Pin pulse ring */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[42%] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maple opacity-0 animate-[map-pulse_2.4s_ease-out_infinite]"
              />
              {/* Pin */}
              <div className="absolute left-1/2 top-[42%] z-[2] -translate-x-1/2 -translate-y-full">
                <div
                  className="grid h-12 w-12 place-items-center rounded-[50%_50%_50%_0] bg-maple shadow-[0_10px_20px_rgba(216,6,33,0.45)] animate-[map-drop_700ms_cubic-bezier(0.2,0.7,0.2,1)]"
                  style={{ transform: "rotate(-45deg)" }}
                >
                  <span
                    className="text-[1.2rem] leading-none text-white"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    🍁
                  </span>
                </div>
              </div>

              {/* Address card */}
              <div className="absolute inset-x-6 bottom-6 z-[3] rounded-[12px] border border-rule bg-paper p-5 shadow-brand">
                <strong className="mb-2 block font-display text-[1.05rem] font-medium text-ink">
                  Saggi Law Firm
                </strong>
                <span className="mb-3 block text-[0.85rem] leading-[1.5] text-muted">
                  {OFFICE_STREET}
                  <br />
                  {OFFICE_CITY}
                </span>
                <a
                  href={OFFICE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-rust hover:underline"
                >
                  Open in Google Maps
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ FINAL CTA ═════════════ */}
      <section className="relative overflow-hidden bg-ink py-16 text-cream md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(173,82,7,0.20), transparent 60%), radial-gradient(ellipse at bottom, rgba(211,181,116,0.14), transparent 60%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute left-6 bottom-6 h-16 w-16 border-b-2 border-l-2 border-gold/40" />
        <div aria-hidden className="pointer-events-none absolute right-6 bottom-6 h-16 w-16 border-b-2 border-r-2 border-gold/40" />

        <div className="relative mx-auto max-w-[900px] px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">
            <span aria-hidden className="live-dot" />
            The line is open right now
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] text-cream">
            One call. Free. Confidential.{" "}
            <em className="not-italic italic text-gold">Answered.</em>
          </h2>
          <a
            href={LP_PHONE_HREF}
            className="btn-shimmer btn-pulse-rust group mt-10 inline-flex items-center justify-center gap-3 rounded-md bg-rust px-8 py-5 font-body text-[1.05rem] font-bold text-white shadow-[0_8px_28px_rgba(173,82,7,0.5)] transition-all hover:-translate-y-0.5 hover:bg-rust-hover"
          >
            <PhoneGlyph />
            <span className="flex flex-col items-start leading-none">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-85">
                Call the lawyer now
              </span>
              <span
                className="mt-1 font-display text-[1.7rem] font-medium leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {LP_PHONE_DISPLAY}
              </span>
            </span>
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.85rem] text-cream/60">
            <a href={LP_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-gold">
              <WhatsAppGlyph /> WhatsApp: {LP_PHONE_DISPLAY}
            </a>
            <a href={LP_EMAIL_HREF} className="inline-flex items-center gap-1.5 hover:text-gold">
              <MailGlyph /> {LP_EMAIL}
            </a>
          </div>
          <p className="mt-6 text-[0.85rem] text-cream/50">
            Available 24 hours a day, 7 days a week — including weekends and
            statutory holidays.
          </p>
        </div>
      </section>

      {/* ═════════════ MINIMAL FOOTER — legal disclaimer only ═════════════ */}
      <footer className="bg-[#05041A] px-6 py-8 text-cream/60">
        <div className="mx-auto max-w-[820px] text-center text-[0.75rem] leading-[1.6]">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. The
            information on this page is provided for general information only
            and is not legal advice. Contacting Saggi Law Firm does not create
            a solicitor–client relationship. Every criminal matter is
            different — outcomes depend on the specific facts and applicable
            law.
          </p>
        </div>
      </footer>

      {/* ═════════════ STICKY MOBILE CALL BAR ═════════════ */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-gold/20 bg-ink p-2 shadow-[0_-6px_20px_rgba(0,0,0,0.4)] sm:hidden">
        <a
          href={LP_PHONE_HREF}
          className="btn-pulse-rust flex flex-1 items-center justify-center gap-2 rounded-md bg-rust px-3 py-3 font-body text-[0.9rem] font-bold text-white"
        >
          <PhoneGlyph />
          Call {LP_PHONE_DISPLAY}
        </a>
        <a
          href={LP_WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pulse-whatsapp flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 font-body text-[0.9rem] font-bold text-white"
        >
          <WhatsAppGlyph />
        </a>
      </div>
    </>
  );
}

/* ─── Glyphs used across the CTAs ─────────────────────────────────── */

function PhoneGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
