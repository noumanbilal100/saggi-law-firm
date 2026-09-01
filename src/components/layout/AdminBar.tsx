"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Admin edit bar — WordPress-style toolbar at the top of every
 * frontend page, but ONLY for a logged-in Payload admin. Renders
 * absolutely nothing (no bar, no DOM) for public visitors so the
 * layout is untouched for the site's actual audience.
 *
 * How it works
 *   1. On mount / route change, ask `/api/admin-bar?path=<current>`
 *      whether there's a valid session and what the current URL's
 *      backing doc is.
 *   2. If yes, render a fixed-top strip with an "Edit this page"
 *      deep-link into the Payload admin panel, plus a "New" shortcut
 *      for the same collection and a dashboard link.
 *   3. Shifts the sticky nav and body content down by the bar height
 *      via the `.has-admin-bar` class on <html> (see globals.css).
 */

type AdminBarInfo = {
  user: { email: string; id: string | number } | null;
  editUrl: string | null;
  label: string | null;
  createUrl: string | null;
  createLabel: string | null;
};

export function AdminBar() {
  const pathname = usePathname() ?? "/";
  const [info, setInfo] = useState<AdminBarInfo | null>(null);

  /* Skip the bar entirely on /admin — Payload has its own chrome
     and rendering a second toolbar inside its iframe would be noise. */
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setInfo(null);
      return;
    }
    const controller = new AbortController();
    fetch(`/api/admin-bar?path=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
      credentials: "same-origin",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: AdminBarInfo | null) => {
        if (!data || !data.user) {
          setInfo(null);
          return;
        }
        setInfo(data);
      })
      .catch(() => {
        /* Ignore aborts and network errors; the bar just won't show. */
      });
    return () => controller.abort();
  }, [pathname, isAdminRoute]);

  /* Toggle a body-level class so global CSS can shift the sticky nav
     down by the bar's height. Cleaned up when the component unmounts
     or the user signs out. */
  useEffect(() => {
    const root = document.documentElement;
    if (info?.user) {
      root.classList.add("has-admin-bar");
    } else {
      root.classList.remove("has-admin-bar");
    }
    return () => {
      root.classList.remove("has-admin-bar");
    };
  }, [info?.user]);

  if (!info?.user) return null;

  const initial = (info.user.email.charAt(0) || "?").toUpperCase();

  return (
    <div
      role="toolbar"
      aria-label="Admin toolbar"
      className="fixed inset-x-0 top-0 z-[70] flex h-10 items-center gap-3 border-b border-cream/10 bg-ink px-3 text-[0.8rem] text-cream shadow-brand-sm sm:gap-4 sm:px-4"
    >
      {/* Left: user identity */}
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden
          className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gold text-[0.72rem] font-bold text-ink"
        >
          {initial}
        </span>
        <span className="hidden truncate text-cream/75 sm:inline">
          Signed in as{" "}
          <span className="font-medium text-cream">{info.user.email}</span>
        </span>
      </div>

      {/* Right: actions */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {info.editUrl && (
          <Link
            href={info.editUrl}
            className="inline-flex items-center gap-1.5 rounded bg-rust px-2.5 py-1 font-semibold text-white shadow-brand-sm transition-all hover:-translate-y-px hover:bg-rust-hover sm:px-3 sm:py-1.5"
          >
            <PencilIcon />
            <span className="hidden sm:inline">
              Edit {info.label ?? "this page"}
            </span>
            <span className="sm:hidden">Edit</span>
          </Link>
        )}
        {info.createUrl && (
          <Link
            href={info.createUrl}
            className="hidden items-center gap-1.5 rounded border border-cream/25 px-2.5 py-1 font-medium text-cream transition-colors hover:border-gold hover:text-gold sm:inline-flex sm:px-3 sm:py-1.5"
          >
            <PlusIcon />
            {info.createLabel ?? "New"}
          </Link>
        )}
        <Link
          href="/admin"
          className="rounded border border-cream/25 px-2.5 py-1 font-medium text-cream transition-colors hover:border-gold hover:text-gold sm:px-3 sm:py-1.5"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
