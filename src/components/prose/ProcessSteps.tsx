import type { ReactNode } from "react";

export function ProcessSteps({ children }: { children: ReactNode }) {
  return (
    <div className="ps-grid not-prose my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

/** One card inside <ProcessSteps>. Number auto-increments via CSS counter. */
export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="ps-step rounded-[10px] border border-rule bg-paper p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand-sm">
      <span className="ps-num mb-4 block font-display text-[2.4rem] font-normal leading-none tracking-[-0.03em] text-rust" />
      <h4 className="mb-2 font-body text-[1rem] font-bold leading-tight text-ink">
        {title}
      </h4>
      <div className="text-[1rem] leading-[1.6] text-muted">{children}</div>
    </div>
  );
}
