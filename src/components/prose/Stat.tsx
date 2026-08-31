import type { ReactNode } from "react";

export function Stat({
  number,
  label,
  detail,
}: {
  number: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[10px] border border-rule border-t-[3px] border-t-rust bg-paper px-5 py-5 text-center">
      <div
        className="font-display text-[2rem] font-medium leading-none tracking-[-0.02em] text-rust"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {number}
      </div>
      <div className="mt-2 text-[0.82rem] leading-[1.4] text-muted">
        {label}
      </div>
      {detail && (
        <div className="mt-1 text-[0.72rem] leading-[1.4] text-muted/70">
          {detail}
        </div>
      )}
    </div>
  );
}

/**
 * Wrap `<Stat>` children in a responsive grid. Column count auto-picks
 * (2 → sm-2, 3 → sm-3, 4 → sm-2 md-4) from the number of children.
 */
export function StatsGrid({ children }: { children: ReactNode }) {
  const count = countChildren(children);
  const cols =
    count === 2
      ? "sm:grid-cols-2"
      : count === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 md:grid-cols-4";
  return (
    <div className={`not-prose my-8 grid gap-3 ${cols}`}>{children}</div>
  );
}

function countChildren(children: ReactNode): number {
  if (Array.isArray(children)) {
    return children.filter(
      (c) => c !== null && c !== undefined && c !== false
    ).length;
  }
  return children ? 1 : 0;
}

/** One big prominent stat, standalone. */
export function StatBlock({
  number,
  label,
  detail,
}: {
  number: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="not-prose my-8 rounded-[12px] border-l-[3px] border-rust bg-cream-warm px-7 py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
        <div
          className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-medium leading-none tracking-[-0.03em] text-rust"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {number}
        </div>
        <div className="flex-1">
          <div className="font-display text-[1.1rem] font-medium leading-[1.35] text-ink">
            {label}
          </div>
          {detail && (
            <div className="mt-1 text-[0.85rem] leading-[1.5] text-muted">
              {detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
