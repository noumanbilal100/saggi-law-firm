"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

/**
 * Mobile drawer for the top nav. Hidden at lg+ (nav links show inline
 * there). Uses a fullscreen slide-in panel with big touch targets, a
 * body-scroll lock while open, Escape-to-close, and respects
 * prefers-reduced-motion by shortening transitions.
 */
export function MobileMenu({
  links,
  bookingUrl = "/contact-us",
  phone,
  phoneHref,
}: {
  links: NavLink[];
  bookingUrl?: string;
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
        className="grid h-11 w-11 place-items-center rounded-md border border-rule bg-paper text-ink transition-colors hover:border-rust hover:text-rust lg:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.75"
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
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-rust">
              Menu
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

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col divide-y divide-rule">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-[1.15rem] font-medium text-ink transition-colors hover:text-rust"
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

          <div className="flex flex-col gap-2 border-t border-rule bg-paper px-5 py-5">
            {phone && phoneHref && (
              <a
                href={phoneHref}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md bg-ink px-4 py-3 text-cream transition-all hover:bg-ink-soft"
              >
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold">
                    Call now · 24/7
                  </span>
                  <span className="mt-1 font-display text-[1.05rem] font-medium">
                    {phone}
                  </span>
                </span>
                <span aria-hidden>✆</span>
              </a>
            )}
            <Link
              href={bookingUrl}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md bg-rust px-4 py-3 font-bold text-white transition-all hover:bg-rust-hover"
            >
              Book free consultation
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
