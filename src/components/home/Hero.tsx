import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";
import { mainLocations } from "@/lib/location";

export function Hero() {
  const { phone, phoneHref, bookingUrl } = siteConfig.contact;

  return (
    <section className="relative overflow-hidden py-14 md:py-[88px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-36 -left-36 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(211,181,116,0.15), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-16">
        <div>
          <div className="reveal in mb-6 inline-flex items-center gap-2.5 rounded-full border border-rule bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.85rem] font-semibold shadow-brand-sm">
            <span className="rounded-full bg-ink px-2.5 py-1 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-gold">
              GTA
            </span>
            <span>Criminal defence across the Greater Toronto Area</span>
          </div>

          <h1 className="reveal in d1 font-display text-[clamp(1.9rem,5vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance">
            Criminal Defence Law Firm{" "}
            <em className="font-medium not-italic text-rust italic">Greater Toronto Area</em>
          </h1>

          <div className="reveal in d2 mt-6 flex flex-col gap-4 text-muted">
            <p className="max-w-[58ch] text-[1.05rem] leading-[1.65]">
              When you are facing a criminal charge, having the right legal representation can make a significant difference in how you understand your situation and how your case moves forward. Saggi Law Firm provides focused criminal defence services for individuals facing criminal matters throughout the Greater Toronto Area — from Toronto and Mississauga to Vaughan, Milton, Newmarket, and every court in between. Our approach is built around understanding the allegations, explaining your legal options, protecting your rights, and developing a defence strategy based on the specific facts of your case.
            </p>
            <p className="max-w-[58ch] text-[1.05rem] leading-[1.65]">
              If you have been charged with a criminal offence, are preparing for a bail hearing, have been contacted by police, or need advice about a potential criminal matter, speaking with a criminal defence lawyer early can help you make informed decisions. Contact Saggi Law Firm to discuss your situation and arrange a consultation.
            </p>
          </div>

          <div className="reveal in d3 mt-9 flex flex-wrap items-stretch gap-3.5">
            <a
              href={phoneHref ?? "tel:"}
              className="btn-shimmer inline-flex min-w-[210px] flex-col items-start rounded-md bg-rust px-5 py-3 text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
            >
              <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                Call or WhatsApp
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                {phone ?? <Placeholder onDark>[Insert Verified Phone Number]</Placeholder>}
              </span>
            </a>
            <a
              href={bookingUrl ?? "/contact-us"}
              className="inline-flex min-w-[210px] flex-col items-start rounded-md border-[1.5px] border-rule bg-transparent px-5 py-3 text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
            >
              <span className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Consultation
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-tight">
                {bookingUrl ? "Book online →" : <Placeholder>[Insert Consultation CTA/Booking Link]</Placeholder>}
              </span>
            </a>
          </div>

          <div className="reveal in d4 mt-7 inline-flex items-center gap-2 rounded-full border border-maple-soft bg-maple/[0.06] px-3 py-1.5 text-[0.82rem] font-semibold">
            <span className="text-maple">🍁</span> Greater Toronto Area · Ontario
            <span className="mx-1 inline-block h-px w-3 bg-maple/40" />
            Practising since 2013
          </div>
        </div>

        <aside className="reveal in d3 relative rounded-[18px] border border-rule bg-paper p-6 sm:p-8 shadow-brand">
          <span
            aria-hidden
            className="absolute -top-3 right-8 h-1 w-[60px] rounded-sm"
            style={{ background: "linear-gradient(90deg, #D3B574 0 40px, #D80621 40px 60px)" }}
          />
          <h3 className="mb-2 font-display text-[1.3rem] font-medium">
            Serving the Greater Toronto Area
          </h3>
          <p className="mb-6 text-[1.02rem] text-muted">
            Saggi Law Firm appears daily across GTA courthouses and represents clients in the following communities.
          </p>
          <ul className="flex flex-wrap gap-2">
            {mainLocations.map((loc) => (
              <li
                key={loc.slug}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.98rem] font-medium ${
                  loc.slug === "brampton"
                    ? "border-rust bg-rust/[0.08] font-bold text-rust"
                    : "border-rule bg-cream text-ink"
                }`}
              >
                <span className="text-maple leading-none">🍁</span>
                {loc.name}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-rule pt-6 text-[0.98rem] leading-[1.6] text-muted">
            … as well as communities throughout the surrounding GTA and Ontario.{" "}
            <a href="/location" className="font-semibold text-rust underline underline-offset-2">
              See full list →
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
