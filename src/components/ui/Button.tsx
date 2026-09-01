import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md font-body font-bold tracking-[0.01em] border-0 cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.2,0.7,0.2,1)]";

const sizes: Record<Size, string> = {
  md: "px-6 py-[15px] text-[1.02rem]",
  lg: "px-8 py-[18px] text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-rust text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] hover:bg-rust-hover hover:-translate-y-px hover:shadow-[0_8px_22px_rgba(173,82,7,0.35)]",
  ghost:
    "bg-transparent text-ink border-[1.5px] border-rule hover:border-rust hover:text-rust hover:-translate-y-px",
  dark: "bg-ink text-cream hover:bg-ink-soft hover:-translate-y-px",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _c; void _ch;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
