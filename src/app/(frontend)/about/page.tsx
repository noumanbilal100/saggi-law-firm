import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/services";
import { mainLocations } from "@/lib/locations";

export const metadata: Metadata = {
  title: siteConfig.lawyer.name
    ? `${siteConfig.lawyer.name} — Criminal Defence Lawyer, Brampton`
    : "About the Lawyer",
  description: siteConfig.lawyer.bio ?? "About the lawyer at Saggi Law Firm.",
  alternates: { canonical: "/about" },
};

const personJsonLd = (() => {
  const l = siteConfig.lawyer;
  if (!l.name) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: l.name,
    jobTitle: l.title ?? l.role,
    ...(l.photoSrc ? { image: `${siteConfig.url}${l.photoSrc}` } : {}),
    worksFor: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(l.languages ? { knowsLanguage: l.languages } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    url: `${siteConfig.url}/about`,
  };
})();

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "About the Lawyer", item: `${siteConfig.url}/about` },
  ],
};

export default function AboutPage() {
  const l = siteConfig.lawyer;
  const { phone, phoneHref, email } = siteConfig.contact;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {personJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      )}

      {/* HERO */}
      <section className="relative overflow-hidden pb-12 pt-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-36 -left-36 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,181,116,0.15), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-[0.85rem] text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span>About the Lawyer</span>
          </nav>

          <div className="grid gap-14 md:grid-cols-[1fr_1.35fr] md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-rule bg-gradient-to-br from-ink to-[#14112B] shadow-brand-lg">
              <div
                aria-hidden
                className="absolute inset-0 z-[1]"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(211,181,116,0.15), transparent 60%)" }}
              />
              {l.photoSrc ? (
                <Image
                  src={l.photoSrc}
                  alt={l.photoAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 900px) 100vw, 40vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 z-[2] grid place-items-center p-6 text-center">
                  <div>
                    <div className="font-display text-[8rem] leading-none text-gold/35">☉</div>
                    <div className="mt-4">
                      <Placeholder onDark>[Insert Verified Lawyer Photo]</Placeholder>
                    </div>
                  </div>
                </div>
              )}
              {(l.name || l.title) && l.photoSrc && (
                <div className="absolute bottom-5 left-5 z-[3] rounded-lg border-l-[3px] border-gold bg-ink/75 px-3.5 py-2.5 font-body text-[0.82rem] text-cream backdrop-blur-md">
                  <strong className="block font-display text-[1.1rem] font-medium text-cream">
                    {l.name}
                  </strong>
                  {l.title && (
                    <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/85">
                      {l.title}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <Eyebrow>Meet the lawyer</Eyebrow>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                {l.name ?? <Placeholder>[Insert Lawyer Name]</Placeholder>}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9rem] text-muted">
                {l.title && (
                  <span className="font-semibold uppercase tracking-[0.12em]">{l.title}</span>
                )}
                {l.title && <span aria-hidden className="text-rule">•</span>}
                <span>{l.role}</span>
                {l.languages && (
                  <>
                    <span aria-hidden className="text-rule">•</span>
                    <span>{l.languages.join(" · ")}</span>
                  </>
                )}
              </div>

              {l.tagline && (
                <div className="mt-6 font-display text-[1.35rem] font-medium italic text-rust">
                  {l.tagline}
                </div>
              )}

              {l.bio && (
                <p className="mt-6 font-display text-[1.2rem] font-normal italic leading-[1.5] text-ink">
                  &ldquo;{l.bio}&rdquo;
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={phoneHref ?? "tel:"}
                  className="inline-flex min-w-[210px] flex-col items-start rounded-md bg-rust px-5 py-3 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
                >
                  <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                    Direct line
                  </span>
                  <span className="font-display text-[1.15rem] font-medium leading-tight">
                    {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
                  </span>
                </a>
                <Link
                  href="/booking"
                  className="inline-flex min-w-[210px] flex-col items-start rounded-md border-[1.5px] border-rule bg-transparent px-5 py-3 text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
                >
                  <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Book online
                  </span>
                  <span className="font-display text-[1.15rem] font-medium leading-tight">
                    Free consultation →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO — long form */}
      {l.bioParagraphs.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[880px] px-6">
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
              Practising criminal defence in Brampton since 2009.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.08rem] leading-[1.75] text-ink">
              {l.bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {l.award && (
              <div className="mt-8 inline-flex items-start gap-3 rounded-lg border border-gold-soft bg-gold/10 px-5 py-4 text-[0.95rem] text-ink">
                <span aria-hidden className="mt-0.5 text-[1.2rem] leading-none text-rust">★</span>
                <span className="leading-[1.55]">{l.award}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CREDENTIALS */}
      {l.credentials.length > 0 && (
        <section className="bg-cream-warm py-16 md:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-10 max-w-[720px]">
              <Eyebrow>Credentials</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-medium leading-[1.15]">
                Education, admissions and memberships.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {l.credentials.map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 rounded-[10px] border border-rule border-l-[3px] border-l-rust bg-paper p-6"
                >
                  <span aria-hidden className="mt-0.5 font-display text-[1.5rem] leading-none text-rust">§</span>
                  <div>
                    <h4 className="mb-1 font-body text-[0.95rem] font-bold text-ink">
                      {c.title}
                    </h4>
                    <p className="text-[0.9rem] leading-[1.5] text-muted">{c.detail}</p>
                  </div>
                </div>
              ))}
              {l.languages && (
                <div className="flex items-start gap-4 rounded-[10px] border border-rule border-l-[3px] border-l-rust bg-paper p-6">
                  <span aria-hidden className="mt-0.5 font-display text-[1.5rem] leading-none text-rust">§</span>
                  <div>
                    <h4 className="mb-1 font-body text-[0.95rem] font-bold text-ink">Languages</h4>
                    <p className="text-[0.9rem] leading-[1.5] text-muted">
                      {l.languages.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PRACTICE AREAS */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-10 max-w-[720px]">
            <Eyebrow>Areas of practice</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-medium leading-[1.15]">
              Practising criminal defence only.
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.7] text-muted">
              Every hour in a courtroom is a criminal one. Below are the matters {l.name ?? "Mandeep"} handles most often.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-4 py-2 text-[0.9rem] font-medium text-ink transition-all hover:border-rust hover:bg-rust hover:text-white"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-cream-warm py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mb-8 max-w-[720px]">
            <Eyebrow>Where {l.name?.split(" ")[0] ?? "the lawyer"} appears</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-medium leading-[1.15]">
              Brampton, the GTA, and Southern Ontario.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {mainLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[0.88rem] transition-all ${
                  loc.slug === "brampton"
                    ? "border-rust bg-rust text-white font-semibold"
                    : "border-rule bg-paper text-ink hover:border-rust hover:text-rust"
                }`}
              >
                <span className="text-[0.85rem] text-maple">🍁</span>
                {loc.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[0.95rem] leading-[1.65] text-muted">
            <Link href="/locations" className="text-rust underline underline-offset-2 hover:text-rust-hover">
              See the full list of communities served →
            </Link>
          </p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-ink py-20 text-cream md:py-24">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6 text-center">
          <div className="flex justify-center">
            <Eyebrow onDark>Speak with the lawyer</Eyebrow>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] text-cream">
            Confidential. Direct. From the first call.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem] leading-[1.7] text-cream/70">
            Every matter is different. The most useful first step is a short conversation about the specific circumstances of your case.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            {phone && phoneHref && (
              <a
                href={phoneHref}
                className="inline-flex min-w-[220px] flex-col items-start rounded-md bg-rust px-6 py-3.5 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
              >
                <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                  Direct line
                </span>
                <span className="font-display text-[1.15rem] font-medium leading-tight">
                  {phone}
                </span>
              </a>
            )}
            <Link
              href="/booking"
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
          {email && (
            <p className="mt-6 text-[0.9rem] text-cream/60">
              Or email{" "}
              <a href={`mailto:${email}`} className="text-gold underline underline-offset-2">
                {email}
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
