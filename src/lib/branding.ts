import { unstable_noStore as noStore } from "next/cache";
import { getPayloadInstance } from "@/lib/payload";

/**
 * Small server-only helper that returns the site's logo — pulled from
 * the Navigation global when the client has uploaded one in admin, or
 * the built-in `/logo.png` file as a fallback. Cached at request scope
 * by Next.js server components so the same call is not made twice per
 * render.
 */
export type Branding = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const FALLBACK: Branding = {
  src: "/logo.png",
  alt: "Saggi Law Firm — Barrister & Solicitor",
  width: 400,
  height: 140,
};

export async function getBranding(): Promise<Branding> {
  /* Opt out of Next.js's static/data cache — the branding global is
     edited from admin and every request should see the latest saved
     value without a build or a manual revalidate. */
  noStore();
  try {
    const payload = await getPayloadInstance();
    const nav = (await payload.findGlobal({
      slug: "navigation",
      depth: 1,
    })) as Record<string, unknown>;

    const logo = nav?.logo as
      | {
          url?: string | null;
          width?: number | null;
          height?: number | null;
          alt?: string | null;
        }
      | null
      | undefined;

    if (logo && typeof logo.url === "string" && logo.url.length > 0) {
      return {
        src: logo.url,
        alt:
          (typeof nav?.logoAlt === "string" && (nav.logoAlt as string).trim()) ||
          (typeof logo.alt === "string" && logo.alt) ||
          FALLBACK.alt,
        width:
          typeof logo.width === "number" && logo.width > 0
            ? logo.width
            : FALLBACK.width,
        height:
          typeof logo.height === "number" && logo.height > 0
            ? logo.height
            : FALLBACK.height,
      };
    }
  } catch {
    /* Payload not available at build time or DB not seeded — fall back. */
  }
  return FALLBACK;
}
