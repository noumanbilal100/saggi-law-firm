import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BookingForm } from "@/components/booking/BookingForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: `Request a consultation with ${siteConfig.name}. Confidential from the first contact.`,
  alternates: { canonical: "/booking" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Book a Consultation", item: `${siteConfig.url}/booking` },
  ],
};

export default function BookingPage() {
  const { phone, phoneHref, email, address } = siteConfig.contact;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden pb-8 pt-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-[0.85rem] text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span>Book a Consultation</span>
          </nav>

          <Eyebrow>Consultation</Eyebrow>
          <h1 className="mt-4 max-w-[22ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Book a{" "}
            <em className="font-medium not-italic italic text-rust">Consultation</em>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-[1.65] text-muted">
            Fill in the form and we&apos;ll contact you to arrange a consultation about your criminal matter. Your message is confidential from the first contact and reaches {siteConfig.lawyer.name ?? "the lawyer"} directly.
          </p>
        </div>
      </section>

      <section className="pb-24 pt-8 md:pb-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="rounded-[18px] border border-rule bg-paper p-8 shadow-brand md:p-10">
              <BookingForm />
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[18px] border border-ink bg-ink p-8 text-cream">
                <Eyebrow onDark>Prefer to call?</Eyebrow>
                <h3 className="mt-3 font-display text-[1.4rem] font-medium text-cream">
                  Speak with {siteConfig.lawyer.name ?? "a lawyer"} directly.
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-[1.65] text-cream/70">
                  For urgent matters, call the office directly. Confidential from the first word.
                </p>
                {phone && phoneHref && (
                  <a
                    href={phoneHref}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-rust px-5 py-3.5 font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
                  >
                    ✆ Call {phone}
                  </a>
                )}
                <div className="mt-7 space-y-4 text-[0.9rem] leading-[1.6] text-cream/75">
                  {email && (
                    <div>
                      <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">Email</span>
                      <a href={`mailto:${email}`} className="font-display text-[1.05rem] text-cream hover:text-gold">
                        {email}
                      </a>
                    </div>
                  )}
                  {address.street && address.postal && (
                    <div>
                      <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">Office</span>
                      <span className="font-display text-[1.05rem] text-cream">
                        {address.street}
                      </span>
                      <span className="mt-1 block text-[0.85rem] text-cream/60">
                        {address.city}, {address.province === "Ontario" ? "ON" : address.province} {address.postal}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-gold-soft bg-gold/10 px-5 py-4 text-[0.88rem] leading-[1.6] text-ink">
                <strong className="mb-1 block font-display text-[0.95rem] font-medium">Solicitor–client privilege</strong>
                Anything you share with us — through this form, by phone, or by email — is confidential from the first contact.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
