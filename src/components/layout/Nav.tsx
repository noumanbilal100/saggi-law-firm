import Link from "next/link";
import Image from "next/image";
import { NavShadowBoot } from "@/components/ui/Reveal";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteConfig } from "@/lib/siteConfig";
import { getBranding } from "@/lib/branding";

const links = [
  { href: "/services", label: "Criminal Defence" },
  { href: "/other-services", label: "Other Services" },
  { href: "/about-us", label: "About" },
  { href: "/location", label: "Locations" },
  { href: "/blog", label: "Journal" },
  { href: "/contact-us", label: "Contact" },
];

export async function Nav() {
  const { phone, phoneHref, bookingUrl } = siteConfig.contact;
  const brand = await getBranding();
  return (
    <>
      <NavShadowBoot />
      <nav
        id="mainNav"
        className="sticky top-0 z-40 border-b border-rule bg-cream/95 text-ink backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200 [&.scrolled]:shadow-[0_4px_20px_rgba(22,21,63,0.08)]"
      >
        <div className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          <Link
            href="/"
            aria-label="Saggi Law Firm home"
            className="inline-flex items-center gap-3"
          >
            {/* Logo — designed for a light ground; sits on the cream
                nav so its navy wordmark reads at full contrast. Source
                from Payload Navigation global, with /logo.png fallback. */}
            <Image
              src={brand.src}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
              priority
              className="h-10 w-auto sm:h-11 md:h-12"
            />
            <span className="hidden items-center gap-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-rust md:inline-flex">
              <span className="text-maple leading-none">🍁</span>
              Criminal Defence · Greater Toronto Area
            </span>
          </Link>

          {/* Desktop links (lg+) — ink text on cream, rust underline on hover */}
          <div className="hidden items-center gap-7 text-[0.92rem] font-medium text-ink lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative py-1.5 transition-colors hover:text-rust"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-rust transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={bookingUrl ?? "/contact-us"}
              className="btn-shimmer hidden items-center gap-2 rounded-md bg-rust px-4 py-2.5 text-[0.85rem] font-bold tracking-[0.02em] text-white shadow-[0_4px_12px_rgba(173,82,7,0.35)] transition-all duration-150 hover:-translate-y-px hover:bg-rust-hover hover:shadow-[0_6px_18px_rgba(173,82,7,0.45)] sm:inline-flex sm:px-5 sm:py-3 sm:text-[0.88rem]"
            >
              <span>Consultation</span>
              <span aria-hidden>→</span>
            </Link>
            <MobileMenu
              links={links}
              bookingUrl={bookingUrl ?? "/contact-us"}
              phone={phone}
              phoneHref={phoneHref}
            />
          </div>
        </div>

        {/* Bottom accent — a slim rust-through-gold gradient bar that
            visually separates the nav from the page below and adds a
            signature brand touch immediately under the logo. Tuned for
            a light nav ground so the strokes read without shouting. */}
        <div
          aria-hidden
          className="relative h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(184,83,32,0.5) 12%, rgba(201,164,106,0.85) 38%, rgba(196,54,27,0.55) 62%, rgba(184,83,32,0.5) 88%, transparent 100%)",
          }}
        />
      </nav>
    </>
  );
}
