import type { FieldHook } from "payload";

/**
 * Field-level hook that normalises a user-entered slug into a URL-safe
 * single segment: lowercase, hyphenated, ASCII-only. Strips leading and
 * trailing slashes, collapses inner slashes / spaces / underscores into
 * hyphens, drops anything that isn't a-z, 0-9 or `-`.
 *
 * Attach to the slug field on any collection whose entries render at a
 * single-segment URL — Services, Blog Posts, Pages.
 *
 *   sanitizeSlug("Criminal-Law/Impaired-Driving/") → "criminal-law-impaired-driving"
 *   sanitizeSlug("My Page Title ")                 → "my-page-title"
 *   sanitizeSlug("/foo//bar/")                     → "foo-bar"
 */
export const sanitizeSlug: FieldHook = ({ value }) => {
  if (typeof value !== "string") return value;
  const cleaned = value
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[\s_/\\]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || value;
};
