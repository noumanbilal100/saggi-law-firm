import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Next.js serves this at /robots.txt. Points Google (and everything
 * else) at the dynamic sitemap and disallows crawler traffic on the
 * admin + API routes that hold no public value.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next/", "/*.json$"],
      },
      /* AI training scrapers — allow crawling but not use for training. */
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
