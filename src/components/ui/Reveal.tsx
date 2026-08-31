"use client";

import { useEffect } from "react";

/**
 * Reveal enhancement is now a pure-CSS scroll-driven animation
 * (see `.reveal` rules in globals.css) — no JS required, and content
 * is always visible for crawlers by default. This component is kept
 * as a no-op for backwards-compatibility with existing imports.
 */
export function RevealBoot() {
  return null;
}

/**
 * Shadow-on-scroll for the sticky nav. Toggles a `scrolled` class on
 * the given selector after scrollY exceeds 8px.
 */
export function NavShadowBoot({ selector = "#mainNav" }: { selector?: string }) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    const on = () => {
      if (window.scrollY > 8) el.classList.add("scrolled");
      else el.classList.remove("scrolled");
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, [selector]);
  return null;
}
