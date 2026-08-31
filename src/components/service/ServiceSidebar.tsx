import { BookingForm } from "@/components/booking/BookingForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";
import { matterForService } from "@/lib/booking-schema";

/**
 * Sticky right-column sidebar on service pages — a compact booking form
 * plus a phone / trust strip so the conversion CTA stays in view as the
 * reader scrolls the article body on the left.
 *
 * When rendered on a service page, `serviceSlug` should be passed so
 * the form's Matter dropdown pre-selects the option that matches the
 * page (e.g. DUI page → "Impaired driving / DUI").
 */
export function ServiceSidebar({
  serviceSlug,
}: {
  serviceSlug?: string;
} = {}) {
  const { phone, phoneHref, whatsappHref } = siteConfig.contact;
  const defaultMatter = matterForService(serviceSlug);

  return (
    <div className="flex flex-col gap-6">
      {/* Call + WhatsApp band — one big phone display, two clearly-
          clickable buttons in their brand colours (rust for call,
          WhatsApp green for chat) so viewers see them as CTAs at a
          glance, not as text on a dark card. */}
      <div className="overflow-hidden rounded-[12px] border border-rule bg-ink text-cream shadow-brand-sm">
        <div className="relative px-5 py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(173,82,7,0.15), transparent 70%)",
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
              <span aria-hidden className="live-dot" />
              Direct line · Available 24/7
            </span>
            <div className="mt-1.5 font-display text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-cream">
              {phone ?? <Placeholder onDark>[Phone]</Placeholder>}
            </div>
            <div className="mt-0.5 text-[0.72rem] text-cream/60">
              Call or WhatsApp — answered by a lawyer
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-ink p-2 pt-0">
          <a
            href={phoneHref ?? "tel:"}
            className="btn-shimmer btn-pulse-rust group flex items-center justify-center gap-2 rounded-[8px] bg-rust px-3 py-3 text-[0.88rem] font-bold text-white shadow-[0_4px_12px_rgba(173,82,7,0.35)] transition-all hover:-translate-y-px hover:bg-rust-hover hover:shadow-[0_6px_16px_rgba(173,82,7,0.45)]"
          >
            <PhoneGlyph />
            Call
          </a>
          <a
            href={whatsappHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pulse-whatsapp group flex items-center justify-center gap-2 rounded-[8px] bg-[#25D366] px-3 py-3 text-[0.88rem] font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-px hover:bg-[#1FB855] hover:shadow-[0_6px_16px_rgba(37,211,102,0.45)]"
          >
            <WhatsAppGlyph />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-[12px] border border-rule bg-paper p-6 shadow-brand-sm">
        <Eyebrow>Free consultation</Eyebrow>
        <h3 className="mt-3 font-display text-[1.35rem] font-medium leading-[1.2] text-ink">
          Request a call from a lawyer
        </h3>
        <p className="mt-2 text-[0.9rem] leading-[1.55] text-muted">
          Confidential from the first word. Answered by a lawyer, not a call
          centre.
        </p>
        <div className="mt-5">
          <BookingForm defaultMatter={defaultMatter} />
        </div>
      </div>

      {/* Trust bar */}
      <ul className="flex flex-col gap-3 rounded-[12px] border border-rule bg-cream-warm p-5 text-[0.85rem] leading-[1.5]">
        <li className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rust"
          />
          <span>
            <strong className="font-semibold text-ink">Solicitor–client privilege</strong>
            <span className="text-muted"> from the first contact.</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rust"
          />
          <span>
            <strong className="font-semibold text-ink">14+ years</strong>
            <span className="text-muted"> defending criminal charges in Ontario.</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rust"
          />
          <span>
            <strong className="font-semibold text-ink">Available day, night</strong>
            <span className="text-muted"> &amp; weekends across the GTA.</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}
