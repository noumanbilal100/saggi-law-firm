import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Facing } from "@/components/home/Facing";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AdditionalServices } from "@/components/home/AdditionalServices";
import { WhyChoose } from "@/components/home/WhyChoose";
import { MeetTheLawyer } from "@/components/home/MeetTheLawyer";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { CaseResults } from "@/components/home/CaseResults";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/siteConfig";
import { homeFaq } from "@/lib/faq";

export const metadata: Metadata = {
  title: `${siteConfig.tagline} — ${siteConfig.name}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/**
 * FAQPage JSON-LD for rich results. Rendered inline via <script>.
 * Only questions on this page — service page FAQs get their own block.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/**
 * LegalService JSON-LD — enriched with contact fields once they exist.
 * Fields marked null in siteConfig are omitted so we never publish
 * unverified structured data.
 */
const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  areaServed: [
    { "@type": "City", name: "Brampton" },
    { "@type": "City", name: "Mississauga" },
    { "@type": "City", name: "Toronto" },
    { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  ...(siteConfig.contact.address.street && siteConfig.contact.address.postal
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.city,
          addressRegion: siteConfig.contact.address.province,
          postalCode: siteConfig.contact.address.postal,
          addressCountry: siteConfig.contact.address.country,
        },
      }
    : {}),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <Facing />
      <ServicesSection />
      <AdditionalServices />
      <WhyChoose />
      <MeetTheLawyer />
      <Process />
      <Reviews />
      <CaseResults />
      <ServiceAreasSection />
      <ContactSection />
      <Faq />
      <FinalCta />
    </>
  );
}
