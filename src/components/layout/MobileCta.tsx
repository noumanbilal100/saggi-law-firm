import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Sticky bottom bar on mobile — three co-equal conversion actions
 * so a visitor can start the call, the WhatsApp chat, or the booking
 * form without scrolling back up. Hidden on sm+ where the site
 * header CTAs stay in view.
 */
export function MobileCta() {
  const { phoneHref, whatsappHref } = siteConfig.contact;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-rule bg-paper px-3 py-2.5 shadow-[0_-4px_20px_rgba(22,21,63,0.12)] sm:hidden">
      <a
        href={phoneHref ?? "tel:"}
        aria-label="Call the firm"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-ink px-2 py-3 text-[0.95rem] font-bold text-cream transition-all hover:bg-ink-soft"
      >
        <PhoneIcon />
        Call
      </a>
      <a
        href={whatsappHref ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message the firm on WhatsApp"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#25D366] px-2 py-3 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] transition-all hover:bg-[#1FB855]"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <Link
        href="/contact-us"
        aria-label="Open the consultation booking page"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-rust px-2 py-3 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(184,83,32,0.32)] transition-all hover:bg-rust-hover"
      >
        <CalendarIcon />
        Book
      </Link>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 6.9 3.8z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
