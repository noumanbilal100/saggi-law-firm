import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
};

/**
 * Small uppercase-tracked label with a leading rule. Sets the section's
 * tone before the H2. Rule + text swap to gold on dark grounds.
 */
export function Eyebrow({ children, className = "", onDark = false }: Props) {
  const color = onDark ? "text-gold" : "text-rust";
  const rule = onDark ? "bg-gold" : "bg-rust";
  return (
    <span
      className={`font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] inline-flex items-center gap-2.5 ${color} ${className}`}
    >
      <span className={`inline-block h-px w-6 ${rule}`} aria-hidden />
      {children}
    </span>
  );
}
