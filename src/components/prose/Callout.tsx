import type { ReactNode } from "react";

export function Callout({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <aside className="not-prose my-8 rounded-r-lg border-l-4 border-rust bg-cream-warm px-6 py-5">
      {label && (
        <div className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
          {label}
        </div>
      )}
      <div className="font-display text-[1.15rem] font-normal leading-[1.55] text-ink">
        {children}
      </div>
    </aside>
  );
}
