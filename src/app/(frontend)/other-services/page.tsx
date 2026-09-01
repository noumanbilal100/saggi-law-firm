import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { additionalServices } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";

/**
 * "Other services" page — the non-criminal-defence work Saggi Law
 * Firm handles: attestations, affidavits, Commissioner of Oaths,
 * sponsorship letters. Kept as its own root-level page so it can be
 * linked directly (Nav "Other Services" menu, footer, business
 * cards) instead of being buried as an anchor on /services.
 */

export const metadata: Metadata = {
  title: "Other Services — Attestations, Affidavits, Commissioner of Oaths",
  description:
    "In addition to criminal defence, Saggi Law Firm provides document services in Brampton — attestations, affidavits, statutory declarations, sponsorship letters, and on-site Commissioner of Oaths.",
  alternates: { canonical: "/other-services" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Other Services",
      item: `${siteConfig.url}/other-services`,
    },
  ],
};

export default function OtherServicesPage() {
  const { phone, phoneHref } = siteConfig.contact;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184,83,32,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav
            className="mb-6 flex items-center gap-2 text-[0.9rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              ›
            </span>
            <span>Other Services</span>
          </nav>

          <div className="max-w-[720px]">
            <Eyebrow>Other services</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              Document services alongside our criminal defence practice.
            </h1>
            <p className="mt-5 text-[1.1rem] leading-[1.65] text-muted">
              In addition to criminal defence representation, Saggi Law
              Firm provides certain document and legal services —
              attestations, statutory declarations, sponsorship letters,
              affidavits, and on-site Commissioner of Oaths services —
              from our Brampton office.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-cream-warm py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Available services</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15]">
                What we handle
              </h2>
            </div>
            <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">
              {additionalServices.length} services
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {additionalServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group relative flex flex-col gap-3 rounded-[10px] border border-rule bg-paper p-7 text-ink no-underline transition-all duration-300 hover:-translate-y-1 hover:border-rust hover:shadow-brand"
              >
                <div className="flex items-start gap-3.5">
                  <div className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-lg bg-rust/[0.08] font-display text-[1.15rem] font-semibold leading-none text-rust">
                    {s.icon}
                  </div>
                  <h3 className="mt-1 flex-1 font-display text-[1.2rem] font-medium leading-[1.25]">
                    {s.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1.5 flex-shrink-0 font-display text-[1.3rem] leading-none text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rust"
                  >
                    ↗
                  </span>
                </div>
                <p className="text-[1rem] leading-[1.6] text-muted">
                  {s.summary}
                </p>
                {s.lead && (
                  <span className="mt-2 inline-flex w-fit rounded-full border border-rust bg-rust/[0.08] px-2.5 py-1 font-body text-[0.66rem] font-bold uppercase tracking-[0.08em] text-rust">
                    Lead service
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <div className="mx-auto max-w-[820px] px-4 text-center sm:px-6">
          <Eyebrow>Need one of these services?</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15] text-cream">
            Get in touch with the firm today.
          </h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[1rem] leading-[1.65] text-cream/70">
            Call directly to confirm availability and pricing for the
            service you need. Most document services are handled on-site
            at our Brampton office by appointment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={phoneHref ?? "tel:"}
              className="inline-flex items-center gap-2 rounded-md bg-rust px-6 py-3.5 font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(184,83,32,0.32)] transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              <span aria-hidden>✆</span>
              {phone ?? "Call the firm"}
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-cream/25 bg-transparent px-6 py-3.5 font-body text-[0.95rem] font-bold text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
            >
              Contact page →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
