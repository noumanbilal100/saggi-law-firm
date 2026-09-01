import type { ReactNode } from "react";

export function KeyPoints({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose relative my-10 overflow-hidden rounded-[14px] bg-ink p-8 text-cream md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(211,181,116,0.14), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(173,82,7,0.22), transparent 65%)",
        }}
      />
      <div className="relative">
        {title && (
          <h3 className="mb-6 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium leading-[1.15] text-cream">
            {title}
          </h3>
        )}
        <div className="grid gap-6 sm:grid-cols-2">{children}</div>
      </div>
    </aside>
  );
}

/** One entry inside <KeyPoints>. The number auto-increments via CSS counter. */
export function KeyPoint({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="key-point flex flex-col gap-2">
      <div className="kp-num font-display text-[1.6rem] font-normal leading-none tracking-[-0.02em] text-gold" />
      <h4 className="font-body text-[1.02rem] font-bold text-cream">
        {title}
      </h4>
      <div className="text-[1.02rem] leading-[1.6] text-cream/70">{children}</div>
    </div>
  );
}
