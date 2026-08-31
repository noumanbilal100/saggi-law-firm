import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { RevealBoot } from "@/components/ui/Reveal";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { siteConfig } from "@/lib/siteConfig";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.tagline} — ${siteConfig.name}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.lawyer.name ?? siteConfig.name }],
  keywords: [
    "criminal defence lawyer",
    "criminal lawyer Brampton",
    "criminal lawyer Toronto",
    "criminal lawyer GTA",
    "impaired driving lawyer",
    "DUI lawyer Brampton",
    "assault lawyer",
    "bail hearing lawyer",
    "Saggi Law Firm",
    "Mandeep Saggi",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.tagline} — ${siteConfig.name}`,
    description: siteConfig.description,
    images: [
      {
        url: "/logo.png",
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.tagline} — ${siteConfig.name}`,
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: siteConfig.url },
  verification: {
    /* Client will paste their Google Search Console token here later. */
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "legal services",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* `suppressHydrationWarning` on <body> silences the harmless React
          warning caused by browser extensions (ColorZilla, Grammarly,
          LastPass, Dark Reader, etc.) that inject attributes into the
          rendered body BEFORE React hydrates. Only the body's own
          attributes are suppressed — child elements still validate
          normally. Standard fix per the React / Next.js hydration docs. */}
      <body
        className="min-h-full flex flex-col pb-[76px] sm:pb-0"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <TopBar />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
        <RevealBoot />
      </body>
    </html>
  );
}
