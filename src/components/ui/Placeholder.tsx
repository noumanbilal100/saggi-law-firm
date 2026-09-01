import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  onDark?: boolean;
};

/**
 * Visible red-dashed chip that marks a value the client will supply.
 * Appears wherever verified content is not yet available so nothing is
 * silently invented and nothing is missed at content-review time.
 */
export function Placeholder({
  children,
  onDark = false,
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-block rounded font-mono font-semibold text-[0.86em] leading-snug border border-dashed py-[3px] px-[10px] normal-case tracking-normal";
  const light = "bg-maple/[0.06] text-maple border-maple";
  const dark = "bg-maple/[0.14] text-[#FFB4BE] border-maple/60";
  return (
    <span className={`${base} ${onDark ? dark : light} ${className}`} {...rest}>
      {children}
    </span>
  );
}

/** Block-level placeholder for longer text (bio, results, etc.) */
export function PlaceholderBlock({
  tag,
  children,
}: {
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block rounded-lg border border-dashed border-maple bg-maple/[0.04] px-6 py-5 text-muted">
      <span className="mb-2 inline-block text-[0.78rem] font-bold uppercase tracking-[0.14em] text-maple">
        {tag}
      </span>
      <div className="text-[1.02rem] leading-relaxed">{children}</div>
    </div>
  );
}
