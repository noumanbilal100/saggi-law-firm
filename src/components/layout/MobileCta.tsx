import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/** Sticky bottom bar on mobile — Call + Consultation. */
export function MobileCta() {
  const { phoneHref } = siteConfig.contact;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-rule bg-paper px-4 py-2.5 shadow-[0_-4px_20px_rgba(11,10,31,0.1)] sm:hidden">
      <a
        href={phoneHref ?? "tel:"}
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-[0.92rem] font-bold text-cream transition-all hover:bg-ink-soft"
      >
        ✆ Call
      </a>
      <Link
        href="/contact-us"
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-rust px-4 py-3 text-[0.92rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:bg-rust-hover"
      >
        Consultation
      </Link>
    </div>
  );
}
