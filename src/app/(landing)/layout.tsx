import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../(frontend)/globals.css";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Minimal shell for Google-Ads landing pages. No site header, no site
 * footer, no top bar — a single-focus conversion page that lives at
 * its own URL and burns all of the visitor's attention on one CTA:
 * call the tracked landing-page phone number.
 */

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
      className={`${poppins.variable} h-full antialiased`}
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
