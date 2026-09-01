import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadInstance } from "@/lib/payload";

/**
 * Backing endpoint for the frontend admin bar.
 *
 * The client component asks "am I logged in, and if so, what should
 * the Edit button do for this URL?" — this route answers by reading
 * the Payload auth cookie, resolving the doc that backs the current
 * path, and handing back the deep link into the admin panel.
 *
 * Never renders to unauthenticated visitors: any request without a
 * valid session gets `{ user: null }`, which the bar treats as
 * "render nothing". Doc lookup is only done after auth succeeds so
 * public traffic doesn't do extra DB work.
 */

/** Reserved routing prefixes we should never try to resolve into a
    document — they either belong to Next.js internals or to the
    admin/API themselves. */
const NEVER_RESOLVE = ["/admin", "/api", "/_next"];

/** Slugs that resolve to their own dedicated file-based route rather
    than to a collection document — mirrors the RESERVED set in
    `[slug]/page.tsx` so the bar's "Edit this page" link doesn't try
    to point at a page that doesn't exist in a collection. */
const RESERVED_ROOT = new Set([
  "services",
  "other-services",
  "blog",
  "about-us",
  "contact-us",
  "booking",
  "location",
  "case-studies",
  "admin",
  "api",
]);

/** Paths whose content is hardcoded in the repo (file-based pages,
    not backed by a CMS collection). The bar shows a small
    "code-managed page" chip on these instead of an Edit button that
    would land the client on an empty collection listing. */
const CODE_MANAGED = new Set([
  "/about-us",
  "/contact-us",
  "/other-services",
  "/booking",
  "/location",
  "/case-studies",
]);

type EditInfo = {
  editUrl: string | null;
  label: string | null;
  createUrl: string | null;
  createLabel: string | null;
  /** When set, the bar renders a passive "This page is code-managed"
      chip instead of the Edit button. */
  codeManaged?: boolean;
};

const nothing: EditInfo = {
  editUrl: null,
  label: null,
  createUrl: null,
  createLabel: null,
};

async function resolveEditInfo(path: string): Promise<EditInfo> {
  if (!path || path === "" || NEVER_RESOLVE.some((p) => path.startsWith(p))) {
    return nothing;
  }

  const payload = await getPayloadInstance();
  const clean = path.split("?")[0].split("#")[0];
  const segments = clean.split("/").filter(Boolean);

  /* Code-managed pages first — no CMS doc backs them. */
  if (CODE_MANAGED.has(clean)) {
    return { ...nothing, codeManaged: true };
  }

  /* /blog/<slug> — blog detail page. */
  if (segments[0] === "blog" && segments[1]) {
    const slug = segments[1];
    try {
      const res = await payload.find({
        collection: "blog-posts",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const doc = res.docs[0];
      if (doc) {
        return {
          editUrl: `/admin/collections/blog-posts/${doc.id}`,
          label: "this post",
          createUrl: "/admin/collections/blog-posts/create",
          createLabel: "New post",
        };
      }
    } catch {
      /* fall through to collection listing */
    }
    return {
      editUrl: `/admin/collections/blog-posts`,
      label: null,
      createUrl: "/admin/collections/blog-posts/create",
      createLabel: "New post",
    };
  }

  /* /blog — blog index page. */
  if (segments[0] === "blog" && segments.length === 1) {
    return {
      editUrl: "/admin/collections/blog-posts",
      label: "the blog",
      createUrl: "/admin/collections/blog-posts/create",
      createLabel: "New post",
    };
  }

  /* /services — services listing page. */
  if (segments[0] === "services" && segments.length === 1) {
    return {
      editUrl: "/admin/collections/services",
      label: "services",
      createUrl: "/admin/collections/services/create",
      createLabel: "New service",
    };
  }

  /* /location/* and /case-studies/* — the entire tree is file-based
     (reads from src/lib/location.ts and src/lib/case-results.ts).
     The DB collections exist but aren't wired to the frontend, so
     linking into them would mislead. */
  if (segments[0] === "location" || segments[0] === "case-studies") {
    return { ...nothing, codeManaged: true };
  }

  /* Home page — no single collection doc; link to the navigation
     global so the client can edit header/footer branding from the bar. */
  if (segments.length === 0) {
    return {
      editUrl: "/admin/globals/navigation",
      label: "site branding",
      createUrl: null,
      createLabel: null,
    };
  }

  /* Root-level catch-all: /<slug> — service first, then page. */
  if (segments.length === 1) {
    const slug = segments[0];
    if (RESERVED_ROOT.has(slug.toLowerCase())) return nothing;

    try {
      const svc = await payload.find({
        collection: "services",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const svcDoc = svc.docs[0];
      if (svcDoc) {
        return {
          editUrl: `/admin/collections/services/${svcDoc.id}`,
          label: "this service",
          createUrl: "/admin/collections/services/create",
          createLabel: "New service",
        };
      }
    } catch {
      /* fall through to pages */
    }

    try {
      const pg = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const pgDoc = pg.docs[0];
      if (pgDoc) {
        return {
          editUrl: `/admin/collections/pages/${pgDoc.id}`,
          label: "this page",
          createUrl: "/admin/collections/pages/create",
          createLabel: "New page",
        };
      }
    } catch {
      /* fall through */
    }
  }

  return nothing;
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";

  const payload = await getPayloadInstance();
  const headersList = await headers();

  let user: { email: string; id: string | number } | null = null;
  try {
    const authResult = await payload.auth({ headers: headersList });
    if (authResult.user) {
      user = {
        email: (authResult.user as { email?: string }).email ?? "admin",
        id: (authResult.user as { id: string | number }).id,
      };
    }
  } catch {
    /* No valid session; the bar just won't render. */
  }

  if (!user) {
    return NextResponse.json(
      { user: null, ...nothing },
      /* Short cache so hop across pages doesn't spam the endpoint,
         but stale auth resolves within a few seconds if the visitor
         signs in mid-session. */
      { headers: { "Cache-Control": "private, max-age=5" } },
    );
  }

  const info = await resolveEditInfo(path);

  return NextResponse.json(
    { user, ...info },
    { headers: { "Cache-Control": "private, max-age=5" } },
  );
}
