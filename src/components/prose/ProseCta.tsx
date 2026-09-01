import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function ProseCta({
  title = "Speak with a criminal defence lawyer today.",
  subtitle = "Confidential from the first word. Answered by a lawyer, not a call centre.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const { phone, phoneHref, bookingUrl } = siteConfig.contact;
  return (
    <aside className="not-prose relative my-10 overflow-hidden rounded-[14px] bg-ink p-8 text-cream md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(211,181,116,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(173,82,7,0.30), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[36ch]">
          <div className="mb-2 inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-gold">
            <span className="inline-block h-px w-6 bg-gold" />
            Free consultation
          </div>
          <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-medium leading-[1.2] text-cream">
            {title}
          </h3>
          <p className="mt-2 text-[1rem] leading-[1.55] text-cream/70">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <a
            href={phoneHref ?? "tel:"}
            className="inline-flex items-center gap-3 rounded-md bg-rust px-5 py-3 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
          >
            <span aria-hidden>✆</span>
            <span className="flex flex-col items-start leading-none">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] opacity-80">
                Call now
              </span>
              <span className="mt-1 font-display text-[1.05rem] font-medium">
                {phone ?? "Call the office"}
              </span>
            </span>
          </a>
          <Link
            href={bookingUrl ?? "/contact-us"}
            className="inline-flex items-center gap-3 rounded-md border-[1.5px] border-white/25 px-5 py-3 text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
          >
            <span className="flex flex-col items-start leading-none">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] opacity-70">
                Or book online
              </span>
              <span className="mt-1 font-display text-[1rem] font-medium">
                Free consultation →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
