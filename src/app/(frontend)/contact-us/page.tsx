import type { Metadata } from "next";
import Image from "next/image";
import { ContactSection } from "@/components/home/ContactSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Saggi Law Firm to arrange a consultation.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  const { address, hours, mapsUrl } = siteConfig.contact;
  const fullAddress = [
    address.street,
    `${address.city}, ${address.province}${address.postal ? ` ${address.postal}` : ""}`,
    address.country,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <ContactSection />

      {/* Visit the office — a physical-presence signal for clients
          weighing which firm to walk into. Dark-ground section so it
          reads as a separate beat from the form above. */}
      <section className="bg-ink py-20 text-cream md:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] border border-cream/10 shadow-brand-lg">
            <Image
              src="/office.jpg"
              alt="Saggi Law Firm office — 2250 Bovaird Dr E, Unit 401, Brampton"
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 60vw"
            />
          </div>

          <div>
            <Eyebrow>Visit us</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-medium leading-[1.1] text-cream">
              Our Brampton office.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-[1.65] text-cream/70">
              Consultations are held in person at our office by
              appointment. The firm serves the Greater Toronto Area from
              a central Brampton location on Bovaird Drive East.
            </p>

            <dl className="mt-8 grid gap-6">
              <div>
                <dt className="font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
                  Address
                </dt>
                <dd className="mt-2 whitespace-pre-line font-body text-[1rem] leading-[1.55] text-cream">
                  {address.street ? `${address.street}\n` : ""}
                  {address.city}, {address.province}
                  {address.postal ? ` ${address.postal}` : ""}
                  {"\n"}
                  {address.country}
                </dd>
              </div>
              {hours && (
                <div>
                  <dt className="font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
                    Hours
                  </dt>
                  <dd className="mt-2 font-body text-[1rem] leading-[1.55] text-cream">
                    {hours}
                  </dd>
                </div>
              )}
            </dl>

            {mapsUrl && (
              <div className="mt-8">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-cream/25 bg-transparent px-5 py-3 font-body text-[0.92rem] font-bold text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
                  aria-label={`Open ${fullAddress} in Google Maps`}
                >
                  <span aria-hidden>📍</span>
                  Get directions →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
