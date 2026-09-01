import { Placeholder } from "@/components/ui/Placeholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/siteConfig";

export function FinalCta() {
  const { phone, phoneHref, bookingUrl } = siteConfig.contact;
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-[96px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at top, rgba(173,82,7,0.08), transparent 60%)" }}
      />
      {/* Bottom brand accent — rust → gold → maple gradient bar
          that separates this conversion block from the Footer's
          navigation info. The bar sits ON TOP of the section edge so
          the eye can find the seam even between two dark grounds. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(173,82,7,0.5) 15%, rgba(211,181,116,0.85) 50%, rgba(216,6,33,0.5) 85%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 text-center">
        <div className="reveal flex justify-center">
          <Eyebrow onDark>Get in touch</Eyebrow>
        </div>
        <h2 className="reveal d1 mt-4 font-display text-[clamp(2.1rem,4.2vw,3.2rem)] font-medium leading-[1.1] text-cream">
          Get Legal Advice About Your{" "}
          <em className="font-medium not-italic italic text-gold">Criminal Matter</em>
        </h2>
        <div className="reveal d2 mx-auto mt-6 flex flex-col gap-4">
          <p className="mx-auto max-w-[60ch] text-[1.02rem] leading-[1.7] text-cream/70">
            If you or someone close to you is facing criminal charges, do not rely on assumptions about what will happen next. Understanding the allegation, your rights, the court process, and your available legal options is an important first step.
          </p>
          <p className="mx-auto max-w-[60ch] text-[1.02rem] leading-[1.7] text-cream/70">
            Saggi Law Firm provides criminal defence representation throughout the Greater Toronto Area, including Toronto, Mississauga, Vaughan, Etobicoke, Scarborough, Woodbridge, Milton, Newmarket, Brampton, and surrounding communities.
          </p>
          <p className="mx-auto max-w-[60ch] font-display text-[1.15rem] italic font-normal leading-[1.6] text-cream">
            Contact Saggi Law Firm today to discuss your criminal matter and arrange a consultation.
          </p>
        </div>
        <div className="reveal d3 mt-10 flex flex-wrap justify-center gap-3.5">
          <a
            href={phoneHref ?? "tel:"}
            className="btn-shimmer inline-flex min-w-[240px] flex-col items-start rounded-md bg-rust px-6 py-3.5 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
          >
            <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
              Call Saggi Law Firm
            </span>
            <span className="font-display text-[1.15rem] font-medium leading-tight">
              {phone ?? <Placeholder onDark>[Insert Verified Phone Number]</Placeholder>}
            </span>
          </a>
          <a
            href={bookingUrl ?? "/contact-us"}
            className="inline-flex min-w-[240px] flex-col items-start rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
          >
            <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
              Book a Consultation
            </span>
            <span className="font-display text-[1.15rem] font-medium leading-tight">
              {bookingUrl ? "Book online →" : <Placeholder onDark>[Insert Verified Consultation Link]</Placeholder>}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
