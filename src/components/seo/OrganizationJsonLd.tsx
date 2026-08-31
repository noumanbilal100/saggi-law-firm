import { siteConfig } from "@/lib/siteConfig";

/**
 * Organization + LegalService + LocalBusiness structured data.
 * Rendered once at the root so every page carries it — helps Google
 * populate the Knowledge Panel, show the firm in local search, and
 * classify pages as legal-services content.
 */
export function OrganizationJsonLd() {
  const { name, legalName, url, description, contact, lawyer, social, google } =
    siteConfig;

  const sameAs = [
    social.facebook,
    social.youtube,
    social.twitter,
    social.linkedin,
    social.instagram,
    google.reviewsUrl,
    google.knowledgePanelUrl,
  ].filter(Boolean);

  const address = contact.address;
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.province,
    postalCode: address.postal,
    addressCountry: address.country,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "LocalBusiness"],
        "@id": `${url}#business`,
        name,
        legalName,
        url,
        description,
        image: `${url}/logo.png`,
        logo: `${url}/logo.png`,
        telephone: contact.phone,
        email: contact.email,
        priceRange: "$$",
        address: postalAddress,
        areaServed: [
          { "@type": "State", name: "Ontario" },
          { "@type": "City", name: "Brampton" },
          { "@type": "City", name: "Toronto" },
          { "@type": "City", name: "Mississauga" },
          { "@type": "City", name: "Vaughan" },
        ],
        sameAs,
        founder: lawyer.name
          ? { "@type": "Person", name: lawyer.name, jobTitle: lawyer.role }
          : undefined,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "207",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name,
        publisher: { "@id": `${url}#business` },
        inLanguage: "en-CA",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
