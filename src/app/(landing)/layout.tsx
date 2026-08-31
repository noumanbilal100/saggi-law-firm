import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "../(frontend)/globals.css";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Minimal shell for Google-Ads landing pages. No site header, no site
 * footer, no top bar — a single-focus conversion page that lives at
 * its own URL and burns all of the visitor's attention on one CTA:
 * call the tracked landing-page phone number.
 */

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-CA"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-cream"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
