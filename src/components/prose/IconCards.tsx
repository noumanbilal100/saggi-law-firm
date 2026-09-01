import type { ReactNode } from "react";

export function IconCards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  );
}

/** One card inside <IconCards>. */
export function IconCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[10px] border border-rule border-t-[3px] border-t-rust bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brand-sm">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-[1.2rem] font-semibold text-gold">
        {icon}
      </div>
      <h4 className="mb-2 font-display text-[1.1rem] font-medium leading-tight text-ink">
        {title}
      </h4>
      <div className="text-[0.92rem] leading-[1.6] text-muted">{children}</div>
    </div>
  );
}
