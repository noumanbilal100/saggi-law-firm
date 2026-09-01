import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";
import { getBranding } from "@/lib/branding";

const practiceLinks = [
  { href: "/criminal-lawyer", label: "Criminal Lawyer" },
  { href: "/impairedover-80-dui", label: "Impaired Driving & DUI" },
  { href: "/assault", label: "Assault" },
  { href: "/domestic-assault", label: "Domestic Assault" },
  { href: "/firearms-weapons", label: "Firearms & Weapons" },
  { href: "/white-collar", label: "White Collar Crime" },
  { href: "/services", label: "All practice areas" },
];
const firmLinks = [
  { href: "/about-us", label: "Meet the lawyer" },
  { href: "/#reviews", label: "Client reviews" },
  { href: "/location", label: "Service areas" },
  { href: "/other-services", label: "Other services" },
  { href: "/contact-us", label: "Contact" },
];

export async function Footer() {
  const { phone, phoneHref, whatsappHref, email, address, hours } =
    siteConfig.contact;
  const brand = await getBranding();
  return (
    <footer className="relative bg-[#05041A] px-6 pb-8 pt-16 text-cream md:pt-20">
      {/* Distinct top signature — a small gold-and-maple decorative
          motif that gives the Footer its own opening beat, so it never
          reads as a tail of the dark section above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="flex items-center gap-3 pt-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="grid h-7 w-7 place-items-center rounded-full border border-gold/30 bg-ink/60 text-[0.68rem] font-bold text-gold shadow-[0_2px_10px_rgba(211,181,116,0.15)]">
            ✦
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-5 inline-block"
              aria-label="Saggi Law Firm home"
            >
              {/* Client's logo — sourced from the Navigation global
                  when uploaded via admin, or the built-in /logo.png
                  fallback for first-run. */}
              <Image
                src={brand.src}
                alt={brand.alt}
                width={brand.width}
                height={brand.height}
                className="h-auto w-[240px]"
              />
            </Link>
            <div className="mb-4 inline-flex items-center gap-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="text-maple leading-none">🍁</span>
              Criminal Defence · Greater Toronto Area
            </div>
            <p className="max-w-[34ch] text-[0.9rem] leading-relaxed text-cream/60">
              Criminal defence representation throughout the Greater Toronto Area — headquartered in Brampton, appearing daily across Peel Region and the GTA courthouses.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Criminal Defence
            </h4>
            <ul className="flex flex-col gap-2.5">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.9rem] text-cream/70 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Firm
            </h4>
            <ul className="flex flex-col gap-2.5">
              {firmLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.9rem] text-cream/70 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Contact
            </h4>
            <div className="space-y-1 text-[0.9rem] leading-relaxed text-cream/70">
              <strong className="mb-1 block font-semibold text-cream">
                Call or WhatsApp
              </strong>
              {phone && phoneHref ? (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={phoneHref}
                    className="font-display text-[1.2rem] text-gold hover:text-cream"
                  >
                    {phone}
                  </a>
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Message us on WhatsApp"
                      className="inline-flex items-center gap-1 rounded-full border border-[#25D366]/60 bg-[#25D366]/10 px-2.5 py-1 font-body text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <Placeholder onDark>[Insert Verified Phone Number]</Placeholder>
              )}

              <strong className="mb-1 mt-3 block font-semibold text-cream">
                Email
              </strong>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="block break-all text-gold hover:text-cream"
                >
                  {email}
                </a>
              ) : (
                <Placeholder onDark>[Insert Email]</Placeholder>
              )}

              <strong className="mb-1 mt-3 block font-semibold text-cream">Office</strong>
              {address.street && address.postal ? (
                <>
                  {address.street}
                  <br />
                  {address.city}, {address.province === "Ontario" ? "ON" : address.province} {address.postal}
                </>
              ) : (
                <Placeholder onDark>[Insert Verified Office Address]</Placeholder>
              )}

              <strong className="mb-1 mt-3 block font-semibold text-cream">Hours</strong>
              {hours ? hours : <Placeholder onDark>[Insert Verified Office Hours]</Placeholder>}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-6 text-[0.82rem] text-cream/50">
          <div>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex gap-3">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-[0.9rem] text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  f
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-[0.9rem] text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  ▶
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-[0.9rem] text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  𝕏
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-[0.9rem] text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  in
                </a>
              )}
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gold">Privacy</Link>
              <Link href="/terms" className="hover:text-gold">Terms</Link>
              <Link href="/accessibility" className="hover:text-gold">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
