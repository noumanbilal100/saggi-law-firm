import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { caseResults } from "@/lib/case-results";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Case Studies — ${siteConfig.name}`,
  description:
    "Types of criminal-defence matters Saggi Law Firm handles — Charter challenges, bail preparation, DUI defences, assault-file resolutions, firearms and white-collar work. Each study describes the defence approach, not a guaranteed outcome.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesIndex() {
  const { phone, phoneHref } = siteConfig.contact;

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
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.9rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              ›
            </span>
            <span>Case Studies</span>
          </nav>

          <Eyebrow>Recent representation</Eyebrow>
          <h1 className="mt-4 max-w-[26ch] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Types of criminal defence matters we{" "}
            <em className="not-italic italic text-rust">work</em>.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-[1.6] text-muted">
            Each study below describes the defence <em>approach</em> — the
            legal questions, the disclosure work, the strategy — for a
            representative file in the practice area. Outcomes turn on the
            specific facts and evidence of each individual case.
          </p>
        </div>
      </section>

      {/* ---------- LIST ---------- */}
      <section className="border-t border-rule bg-cream-warm/30 py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">
              {caseResults.length} case studies
            </span>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-rust transition-transform hover:translate-x-1"
            >
              All practice areas <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseResults.map((r) => (
              <Link
                key={r.slug}
                href={`/case-studies/${r.slug}`}
                className="group flex h-full flex-col gap-3 rounded-[12px] border border-rule bg-paper p-6 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">
                    {r.charge}
                  </span>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full border border-rust bg-rust/[0.08] px-2 py-0.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.08em] text-rust">
                    {r.outcomeLabel}
                  </span>
                </div>
                <h2 className="font-display text-[1.15rem] font-medium leading-[1.3] text-ink">
                  {r.detail.summary}
                </h2>
                {r.jurisdiction && (
                  <span className="text-[0.75rem] text-muted">
                    {r.jurisdiction}
                    {r.year && ` · ${r.year}`}
                  </span>
                )}
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[0.88rem] font-semibold text-rust transition-transform group-hover:translate-x-1">
                  Read case study →
                </span>
              </Link>
            ))}
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
              "radial-gradient(ellipse at top, rgba(173,82,7,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 text-center">
          <Eyebrow onDark>Every file is different</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.15] text-cream">
            Ready to talk about your file?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[1.02rem] leading-[1.7] text-cream/70">
            The most useful first step is a short confidential conversation
            about the specific circumstances of your matter.
          </p>
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
