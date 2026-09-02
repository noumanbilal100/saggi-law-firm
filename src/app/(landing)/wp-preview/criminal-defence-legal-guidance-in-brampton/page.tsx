import type { Metadata } from "next";

/**
 * WordPress preview — renders the original page-5845 body from the
 * retired WP `wpq5_posts` table inside an <iframe> pointed at a
 * standalone static HTML doc under /wp-preview/…html.
 *
 * Loading the WP HTML directly into a React tree caused the site's
 * global CSS (Tailwind preflight, body/heading resets, Poppins font
 * cascade) to bleed into the Elementor-scoped .saggi-service-page
 * styles and break the design. An iframe is a clean isolation
 * boundary: the static HTML doc owns its own <head>, its own body,
 * and none of the site chrome can leak in.
 */

export const metadata: Metadata = {
  title:
    "WP Preview — Criminal Defence Legal Guidance in Brampton",
  description:
    "As-was preview of the original WordPress page for design comparison only.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
};

const PREVIEW_SRC = "/wp-preview/criminal-defence-legal-guidance-in-brampton.html";

export default function WpPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Snapshot marker so the URL never gets confused with the
          live production landing. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e6ea] bg-[#fff8ea] px-6 py-3 text-[13px] text-[#3d4a57]">
        <strong className="font-semibold text-[#0d1b2a]">
          WordPress preview · as-was snapshot
        </strong>
        <a
          href={PREVIEW_SRC}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#b08d3f] underline decoration-1 underline-offset-2 hover:text-[#8f7130]"
        >
          Open the raw HTML in a new tab →
        </a>
      </div>

      {/* Isolated iframe — the WP HTML gets its own document so the
          Elementor CSS renders without the site's Tailwind + globals
          interfering. `flex-1` lets it stretch to fill remaining
          viewport height under the marker strip. */}
      <iframe
        src={PREVIEW_SRC}
        title="Criminal Defence Legal Guidance in Brampton — WordPress preview"
        className="flex-1 w-full border-0"
        style={{ minHeight: "calc(100vh - 48px)" }}
      />
    </div>
  );
}
