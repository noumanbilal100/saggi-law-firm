"use client";

import { useEffect, useRef } from "react";

type Props = { html: string; className?: string };

/**
 * Injects an arbitrary HTML fragment — including <script> tags — into the
 * DOM after mount. React's `dangerouslySetInnerHTML` sets innerHTML, which
 * browsers deliberately DO NOT execute scripts from; this component walks
 * the injected fragment and re-creates each <script> element so third-party
 * loaders (Trustindex, Elfsight, etc.) actually run.
 *
 * Runs once per unique `html` value. Reruns if `html` changes.
 */
export function EmbedHtml({ html, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = html;
    const scripts = Array.from(container.querySelectorAll("script"));
    for (const old of scripts) {
      const next = document.createElement("script");
      for (const attr of Array.from(old.attributes)) {
        next.setAttribute(attr.name, attr.value);
      }
      if (old.textContent) next.text = old.textContent;
      old.parentNode?.replaceChild(next, old);
    }
  }, [html]);

  return <div ref={ref} className={className} />;
}
