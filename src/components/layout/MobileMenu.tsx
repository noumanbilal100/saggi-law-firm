"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

/**
 * Mobile drawer for the top nav — mirrors the desktop header exactly,
 * just laid out for tap targets. Hidden at lg+ where the desktop nav
 * shows its links inline. A fullscreen slide-in panel with big touch
 * targets, body-scroll lock while open, Escape-to-close, and respects
 * prefers-reduced-motion by shortening transitions.
 *
 * The drawer only carries the header's navigation + a single
 * "Consultation" CTA — matching what the desktop nav shows. The
 * always-visible bottom sticky bar (`MobileCta`) already handles the
 * Call / WhatsApp / Book actions, so duplicating them inside the
 * drawer just added noise.
 */
export function MobileMenu({
  links,
  bookingUrl = "/contact-us",
}: {
  links: NavLink[];
  bookingUrl?: string;
  /** Kept in the props for backwards compat with the Nav call site,
      but no longer rendered inside the drawer. */
  phone?: string | null;
  phoneHref?: string | null;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink bg-ink text-cream shadow-brand-sm transition-all hover:-translate-y-px hover:border-rust hover:bg-rust lg:hidden"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden
        >
          <path
            d="M3.5 5.5h15M3.5 11h15M3.5 16.5h15"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Backdrop + panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-brand-lg transition-transform duration-250 motion-reduce:transition-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header — mirrors the tagline strip the desktop nav
              carries next to the logo, so the drawer reads as an
              extension of the header rather than a separate menu. */}
          <div className="flex items-center justify-between border-b border-rule bg-paper px-5 py-4">
            <span className="inline-flex items-center gap-1.5 font-body text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
              <span className="text-maple leading-none">🍁</span>
              Criminal Defence · GTA
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-md text-muted transition-colors hover:bg-rust/10 hover:text-rust"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links — same set the desktop nav shows inline, just
              stacked with generous tap targets. */}
          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col divide-y divide-rule">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-[1.2rem] font-medium text-ink transition-colors hover:text-rust"
                  >
                    {l.label}
                    <span aria-hidden className="text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Single "Consultation" CTA — the same button the desktop
              nav shows in the top-right corner, matched here so the
              drawer stays in step with the header. */}
          <div className="border-t border-rule bg-paper px-5 py-5">
            <Link
              href={bookingUrl}
              onClick={() => setOpen(false)}
              className="btn-shimmer flex items-center justify-center gap-2 rounded-md bg-rust px-4 py-3.5 font-body text-[1rem] font-bold tracking-[0.02em] text-white shadow-[0_4px_14px_rgba(184,83,32,0.32)] transition-all hover:-translate-y-px hover:bg-rust-hover hover:shadow-[0_6px_18px_rgba(184,83,32,0.42)]"
            >
              Consultation
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
