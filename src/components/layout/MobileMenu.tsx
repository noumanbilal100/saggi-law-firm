"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

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
  const whatsappHref = siteConfig.contact.whatsappHref;
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
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <span className="font-body text-[0.8rem] font-bold uppercase tracking-[0.14em] text-rust">
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
                className="flex items-center justify-between rounded-md bg-ink px-4 py-3.5 text-cream transition-all hover:bg-ink-soft"
              >
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gold">
                    Call now · 24/7
                  </span>
                  <span className="mt-1 font-display text-[1.08rem] font-medium">
                    {phone}
                  </span>
                </span>
                <span aria-hidden className="text-[1.3rem]">✆</span>
              </a>
            )}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md bg-[#25D366] px-4 py-3.5 text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] transition-all hover:bg-[#1FB855]"
              >
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white/90">
                    WhatsApp us
                  </span>
                  <span className="mt-1 font-display text-[1.08rem] font-medium">
                    Message a lawyer
                  </span>
                </span>
                <svg
                  aria-hidden
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 6.9 3.8z" />
                </svg>
              </a>
            )}
            <Link
              href={bookingUrl}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md bg-rust px-4 py-3.5 font-bold text-white shadow-[0_4px_14px_rgba(184,83,32,0.32)] transition-all hover:bg-rust-hover"
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
