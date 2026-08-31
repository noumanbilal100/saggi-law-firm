"use client";

import { useDocumentInfo } from "@payloadcms/ui";

/**
 * Admin sidebar button that opens the live public URL for the current
 * document. Only renders once the document has been saved and has a slug.
 *
 * The URL prefix per collection lives in `URL_PATHS` — add a new entry
 * here when a new user-facing collection is created.
 */
const URL_PATHS: Record<string, string> = {
  services: "/services",
  "blog-posts": "/blog",
  pages: "",
};

export function ViewLiveButton() {
  const { collectionSlug, savedDocumentData } = useDocumentInfo();

  const slug =
    (savedDocumentData as { slug?: string } | undefined)?.slug ?? "";
  if (!collectionSlug || !slug) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.help}>
          <strong style={styles.helpTitle}>View live page</strong>
          <span style={styles.helpText}>
            Save the page first — the live URL will appear here.
          </span>
        </div>
      </div>
    );
  }

  const basePath = URL_PATHS[collectionSlug];
  if (basePath === undefined) return null;

  const path = `${basePath}/${slug}`;
  /* Use a relative href — the browser resolves it against the current
     origin, and it stays identical between SSR and client render so
     React doesn't flag a hydration mismatch. */

  return (
    <div style={styles.wrapper}>
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        View live page
        <span aria-hidden style={styles.arrow}>
          ↗
        </span>
      </a>
      <div style={styles.pathHint} title={path}>
        {path}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1.25rem",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.7rem 1rem",
    background: "#AD5207",
    color: "#FFFFFF",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.82rem",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 12px rgba(173,82,7,0.28)",
    transition: "background 160ms ease, transform 160ms ease",
    width: "100%",
    boxSizing: "border-box",
  },
  arrow: {
    fontSize: "1rem",
    lineHeight: 1,
  },
  pathHint: {
    fontFamily:
      "ui-monospace, 'SF Mono', Consolas, monospace",
    fontSize: "0.72rem",
    color: "var(--theme-elevation-500, #888)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  help: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    padding: "0.7rem 0.9rem",
    background: "var(--theme-elevation-50, #f5f5f5)",
    border: "1px dashed var(--theme-elevation-300, #ccc)",
    borderRadius: "6px",
  },
  helpTitle: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "var(--theme-elevation-800, #333)",
  },
  helpText: {
    fontSize: "0.75rem",
    color: "var(--theme-elevation-600, #666)",
    lineHeight: 1.4,
  },
};
