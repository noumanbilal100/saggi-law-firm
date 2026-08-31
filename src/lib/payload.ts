import "server-only";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Cached Payload instance for use in server components / server actions.
 * The local API is faster than HTTP and shares the same request context.
 */
let cached: Payload | null = null;

export async function getPayloadInstance(): Promise<Payload> {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}

/**
 * Absolute URL used by admin "View live" links.
 * In dev, respects the port the current server is running on; in prod,
 * falls back to siteConfig.url.
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://saggilawfirm.com");
  const withProto = base.startsWith("http") ? base : `https://${base}`;
  return `${withProto}${path.startsWith("/") ? path : `/${path}`}`;
}
