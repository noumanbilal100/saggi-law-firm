import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

/**
 * WordPress preview — renders the original page-5845 body from the
 * retired WP `wpq5_posts` table verbatim, wrapped in the Elementor
 * scoped `.saggi-service-page` container the WP theme wired to it.
 * Lives under the (landing) layout so nothing on the site chrome
 * pushes the CSS around; the whole point is to see the WP output
 * as-was for side-by-side comparison against the Next port.
 */

const HTML_PATH = path.join(
  process.cwd(),
  "content",
  "wp-preview",
  "criminal-defence-legal-guidance-in-brampton.html",
);

export const metadata: Metadata = {
  title:
    "WP Preview — Criminal Defence Legal Guidance in Brampton",
  description:
    "As-was preview of the original WordPress page rendered from the retired wpq5_posts row, for design comparison only.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
};

export default async function WpPreviewPage() {
  const html = await fs.readFile(HTML_PATH, "utf8");

  return (
    <>
      {/* Small marker so it's obvious this is a preview snapshot,
          not the live production landing. Positioned above the WP
          content so it doesn't affect the WP layout. */}
      <div className="border-b border-[#e2e6ea] bg-[#fff8ea] px-6 py-2.5 text-center text-[13px] text-[#3d4a57]">
        <strong className="font-semibold text-[#0d1b2a]">
          WordPress preview
        </strong>{" "}
        — as-was snapshot of the original page for design comparison.
      </div>

      {/* Elementor-scoped class the WP CSS keys off. Content includes
          its own <style> block so no additional CSS import is needed. */}
      <div
        className="saggi-service-page"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
