import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services, additionalServices, otherServicesNote } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Criminal Defence Services",
  description:
    "The full list of criminal defence services offered by Saggi Law Firm — bail hearings, impaired driving, assault, drug offences, firearms, and more.",
  alternates: { canonical: "/services" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Criminal Defence Services", item: `${siteConfig.url}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-[0.85rem] text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span>Criminal Defence Services</span>
          </nav>

          <Eyebrow>Criminal defence services</Eyebrow>
          <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Criminal Defence{" "}
            <em className="font-medium not-italic italic text-rust">Services</em>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-[1.65] text-muted">
            Saggi Law Firm provides legal representation across a range of criminal offences and related legal matters. Every charge has its own procedure, evidence, potential penalties, and defence strategy — click any service to learn more.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium leading-tight">
              Criminal Defence
            </h2>
            <span className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {services.length} practice areas
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col gap-3 rounded-[10px] border border-rule bg-paper p-7 text-ink no-underline transition-all duration-300 hover:-translate-y-1 hover:border-rust hover:shadow-brand"
              >
                <div className="flex items-start gap-3.5">
                  <div className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-lg bg-rust/[0.08] font-display text-[1.15rem] font-semibold leading-none text-rust">
                    {s.icon}
                  </div>
                  <h3 className="mt-1 flex-1 font-display text-[1.2rem] font-medium leading-[1.25]">
                    {s.title}
                  </h3>
                  <span className="mt-1.5 flex-shrink-0 font-display text-[1.3rem] leading-none text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rust">
                    ↗
                  </span>
                </div>
                <p className="text-[0.94rem] leading-[1.6] text-muted">{s.summary}</p>
              </Link>
            ))}
            <div className="col-span-full rounded-[10px] border border-dashed border-rule bg-cream-warm px-7 py-6 text-[0.95rem] leading-[1.65] text-muted">
              <strong className="mb-1.5 block font-display text-[1.05rem] font-medium text-ink">
                {otherServicesNote.title}
              </strong>
              {otherServicesNote.body}
            </div>
          </div>
        </div>
      </section>

      <section id="additional" className="bg-cream-warm py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-10 max-w-[720px]">
            <Eyebrow>Also offered</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
              Attestation and Commissioner of Oaths Services
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1rem] leading-[1.65] text-muted">
              In addition to criminal defence representation, Saggi Law Firm provides certain document and legal services, including attestations, statutory declarations, sponsorship letters, affidavits, on-site Commissioner of Oaths services, and powers of attorney.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
            {additionalServices.map((s) => (
              <div
                key={s.slug}
                className={`rounded-[10px] border p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand-sm ${
                  s.lead ? "border-ink bg-ink text-cream" : "border-rule bg-paper text-ink"
                }`}
              >
                <div
                  className={`mb-5 grid h-11 w-11 place-items-center rounded-lg font-display text-[1.3rem] font-semibold ${
                    s.lead ? "bg-gold/15 text-gold" : "bg-rust/[0.08] text-rust"
                  }`}
                >
                  {s.icon}
                </div>
                <h3 className={`mb-3 font-display text-[1.25rem] font-medium ${s.lead ? "text-cream" : "text-ink"}`}>
                  {s.title}
                </h3>
                <p className={`text-[0.94rem] leading-[1.65] ${s.lead ? "text-cream/70" : "text-muted"}`}>
                  {s.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
