import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { locations } from "@/lib/location";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return locations.map((l) => ({ slug: l.slug }));
}

function findLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const loc = findLocation(slug);
  if (!loc) return {};
  const title = `Criminal Defence Lawyer in ${loc.name} — ${siteConfig.name}`;
  const description = `Saggi Law Firm provides criminal defence representation in ${loc.name} and across the Greater Toronto Area — bail hearings, impaired driving, assault, drug offences and more.`;
  return {
    title,
    description,
    alternates: { canonical: `/location/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/location/${slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const loc = findLocation(slug);
  if (!loc) notFound();

  const { phone, phoneHref, bookingUrl } = siteConfig.contact;

  /* Structured data — LegalService with areaServed = this city. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${siteConfig.name} — Criminal Defence Lawyer in ${loc.name}`,
    url: `${siteConfig.url}/location/${slug}`,
    description: `Criminal defence representation in ${loc.name} and across the Greater Toronto Area.`,
    areaServed: { "@type": "City", name: loc.name },
    provider: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.contact.phone,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteConfig.url}/location` },
      { "@type": "ListItem", position: 3, name: loc.name, item: `${siteConfig.url}/location/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.85rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <Link href="/location" className="hover:text-rust">Locations</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span>{loc.name}</span>
          </nav>

          <Eyebrow>Service area</Eyebrow>
          <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Criminal Defence Lawyer in{" "}
            <em className="not-italic italic text-rust">{loc.name}</em>
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.1rem] leading-[1.6] text-muted">
            Saggi Law Firm represents individuals facing criminal charges in{" "}
            {loc.name} and across the Greater Toronto Area. From bail hearings
            and impaired driving to assault, drug offences and beyond — legal
            representation built around the facts of your case.
          </p>

          <div className="mt-8 flex flex-wrap items-stretch gap-3.5">
            <a
              href={phoneHref ?? "tel:"}
              className="inline-flex min-w-[210px] flex-col items-start rounded-md bg-rust px-5 py-3 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Call from {loc.name}
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                {phone ?? "[Phone]"}
              </span>
            </a>
            <Link
              href={bookingUrl ?? "/contact"}
              className="inline-flex min-w-[210px] flex-col items-start rounded-md border-[1.5px] border-rule bg-transparent px-5 py-3 text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
            >
              <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Consultation
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                Book online →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- INTRO PROSE ---------- */}
      <section className="border-t border-rule py-14 md:py-16">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15]">
            Serving {loc.name} and the surrounding communities
          </h2>
          <div className="prose-brand mt-6">
            <p>
              A criminal charge — whether laid in {loc.name}, at a nearby
              courthouse, or elsewhere in the Greater Toronto Area — can
              affect your record, employment, immigration status, and future.
              Saggi Law Firm provides focused criminal defence representation
              for people facing these matters, from the first police contact
              through bail, disclosure review, resolution discussions, and
              trial if the matter proceeds.
            </p>
            <p>
              The firm's approach begins with understanding the specific
              circumstances of your case: the allegation, the evidence
              disclosed by the Crown, the applicable Criminal Code provisions,
              and the practical consequences you are facing. From there, a
              defence strategy is built on the facts of your file — not a
              template.
            </p>
            <p>
              If you have been arrested, charged, or contacted by police in{" "}
              {loc.name}, speaking with a criminal defence lawyer early can
              help you understand your options and avoid decisions that limit
              them later.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES OFFERED ---------- */}
      <section className="bg-cream-warm/60 py-14 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 max-w-[720px]">
            <Eyebrow>Practice areas served in {loc.name}</Eyebrow>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15]">
              Criminal defence matters we handle
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 12).map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-center gap-3 rounded-[10px] border border-rule bg-paper p-4 transition-all hover:-translate-y-px hover:border-rust hover:shadow-brand-sm"
              >
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-rust/[0.08] font-display text-[0.9rem] font-semibold text-rust">
                  {s.icon}
                </span>
                <span className="font-display text-[0.98rem] font-medium leading-[1.25]">
                  {s.title}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-rust transition-transform group-hover:translate-x-1"
                >
                  →
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
          <Eyebrow onDark>Speak with a lawyer</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.15] text-cream">
            Facing a criminal charge in{" "}
            <em className="not-italic italic text-gold">{loc.name}</em>?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[1.02rem] leading-[1.7] text-cream/70">
            Every matter is different. The most useful first step is a short
            conversation about the specific circumstances of your case.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href={phoneHref ?? "tel:"}
              className="inline-flex min-w-[220px] flex-col items-start rounded-md bg-rust px-6 py-3.5 text-white transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Direct line
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                {phone ?? "[Phone]"}
              </span>
            </a>
            <Link
              href={bookingUrl ?? "/contact"}
              className="inline-flex min-w-[220px] flex-col items-start rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
            >
              <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Book online
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                Free consultation →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
