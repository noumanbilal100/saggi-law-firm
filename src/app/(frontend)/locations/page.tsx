import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mainLocations, alsoLocations } from "@/lib/locations";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Communities across Brampton, the Greater Toronto Area, and Southern Ontario served by Saggi Law Firm.",
  alternates: { canonical: "/locations" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteConfig.url}/locations` },
  ],
};

export default function LocationsPage() {
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
            <span>Service Areas</span>
          </nav>

          <Eyebrow>Service areas</Eyebrow>
          <h1 className="mt-4 max-w-[26ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Brampton and GTA Criminal Defence Lawyer Serving Multiple{" "}
            <em className="font-medium not-italic italic text-rust">Communities</em>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-[1.65] text-muted">
            Saggi Law Firm serves clients in Brampton and communities throughout the Greater Toronto Area and surrounding regions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-6">
            <h2 className="font-display text-[1.5rem] font-medium leading-tight">
              Main service areas
            </h2>
            <span className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {mainLocations.length} communities
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mainLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[10px] border border-rule bg-paper px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-rust hover:shadow-brand-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-[1rem] text-maple">🍁</span>
                  <span className="font-display text-[1.1rem] font-medium">{l.name}</span>
                </span>
                <span className="font-display text-[1.1rem] text-muted transition-all group-hover:translate-x-1 group-hover:text-rust">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-6">
            <h2 className="font-display text-[1.5rem] font-medium leading-tight">
              Also serving across Southern Ontario
            </h2>
            <span className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {alsoLocations.length} communities
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {alsoLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper px-4 py-2 text-[0.9rem] font-medium text-ink transition-all hover:border-rust hover:bg-rust hover:text-white"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-display text-[1.4rem] font-medium">Criminal Defence in Brampton</h3>
              <p className="text-[1rem] leading-[1.7] text-muted">
                Brampton is a primary service area for Saggi Law Firm. Individuals facing criminal charges in Brampton can seek legal advice regarding their allegations, court process, bail hearing, defence options, and representation.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-display text-[1.4rem] font-medium">Criminal Defence Across the GTA</h3>
              <p className="text-[1rem] leading-[1.7] text-muted">
                If you are located in Mississauga, Toronto, Vaughan, Etobicoke, Scarborough, Woodbridge, Milton, Newmarket, or another nearby community, contact Saggi Law Firm to discuss your criminal matter and determine how our legal services may assist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
