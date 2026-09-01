import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";

export function ContactSection() {
  const { phone, phoneHref, email, address, hours, mapsUrl } = siteConfig.contact;

  return (
    <section id="contact" className="bg-cream py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:gap-14 md:grid-cols-[1fr_1.15fr] md:items-stretch">
          <div className="reveal flex flex-col">
            <Eyebrow>Office &amp; contact</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
              Office and{" "}
              <em className="font-medium not-italic italic text-rust">Contact</em> Information
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.7] text-muted">
              Saggi Law Firm welcomes inquiries from individuals seeking criminal defence representation and related legal services.
            </p>

            <dl className="mt-9 divide-y divide-rule border-y border-rule">
              <div className="grid grid-cols-[90px_1fr] items-baseline gap-5 py-5">
                <dt className="font-body text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
                  Office
                </dt>
                <dd className="font-display text-[1.15rem] font-medium leading-[1.4] text-ink">
                  {address.street && address.postal ? (
                    <>
                      {address.street}
                      <span className="mt-1 block font-body text-[0.98rem] font-normal text-muted">
                        {address.city}, {address.province === "Ontario" ? "ON" : address.province} {address.postal}
                      </span>
                    </>
                  ) : (
                    <Placeholder>[Insert Verified Office Address]</Placeholder>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] items-baseline gap-5 py-5">
                <dt className="font-body text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
                  Phone
                </dt>
                <dd className="font-display text-[1.15rem] font-medium leading-[1.4] text-ink">
                  {phone && phoneHref ? (
                    <a href={phoneHref} className="hover:text-rust">
                      {phone}
                    </a>
                  ) : (
                    <Placeholder>[Insert Verified Phone Number]</Placeholder>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] items-baseline gap-5 py-5">
                <dt className="font-body text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
                  Email
                </dt>
                <dd className="font-display text-[1.15rem] font-medium leading-[1.4] text-ink">
                  {email ? (
                    <a href={`mailto:${email}`} className="hover:text-rust">
                      {email}
                    </a>
                  ) : (
                    <Placeholder>[Insert Verified Email Address]</Placeholder>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] items-baseline gap-5 py-5">
                <dt className="font-body text-[0.78rem] font-bold uppercase tracking-[0.14em] text-rust">
                  Hours
                </dt>
                <dd className="font-display text-[1.15rem] font-medium leading-[1.4] text-ink">
                  {hours ?? <Placeholder>[Insert Verified Office Hours]</Placeholder>}
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-[1.02rem] leading-[1.7] text-muted">
              If you have received a criminal charge, have an upcoming court date, need representation for a bail hearing, or are unsure about your legal options, contacting a criminal defence lawyer as early as possible can help you understand the next steps.
            </p>
          </div>

          <div
            className="reveal d2 relative min-h-[480px] overflow-hidden rounded-[18px] border border-dashed border-maple shadow-brand"
            style={{ background: "linear-gradient(180deg, #F4EFDD 0%, #FBF9ED 60%)" }}
            aria-label="Office location map placeholder"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,10,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,10,31,0.05) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 55% 45%, transparent 100px, rgba(251,249,237,0.4) 250px)" }}
            />

            <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-md border border-rule bg-paper px-2.5 py-1.5 text-[0.76rem] font-bold uppercase tracking-[0.1em] text-muted">
              <span className="text-[1.02rem] text-maple">🍁</span> Brampton, ON
            </div>

            {/* Roads */}
            <div className="absolute left-[5%] right-[5%] top-[42%] h-[3px] -rotate-2 bg-ink/[0.08]" />
            <div className="absolute bottom-[8%] left-[48%] top-[8%] w-[3px] bg-ink/[0.08]" />
            <div className="absolute left-[10%] right-[30%] top-[68%] h-[2px] rotate-[15deg] bg-ink/[0.08]" />

            {/* Pin pulse */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[42%] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maple opacity-0 animate-[map-pulse_2.4s_ease-out_infinite]"
            />
            {/* Pin */}
            <div className="absolute left-1/2 top-[42%] z-[2] -translate-x-1/2 -translate-y-full">
              <div
                className="grid h-11 w-11 place-items-center rounded-[50%_50%_50%_0] bg-maple shadow-[0_8px_16px_rgba(216,6,33,0.4)] animate-[map-drop_700ms_cubic-bezier(0.2,0.7,0.2,1)]"
                style={{ transform: "rotate(-45deg)" }}
              >
                <span className="text-[1.15rem] leading-none text-white" style={{ transform: "rotate(45deg)" }}>
                  🍁
                </span>
              </div>
            </div>

            {/* Address card */}
            <div className="absolute inset-x-6 bottom-6 z-[3] rounded-[10px] border border-rule bg-paper p-5 shadow-brand">
              <strong className="mb-2 block font-display text-[1.05rem] font-medium text-ink">
                Saggi Law Firm
              </strong>
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.98rem] text-rust hover:underline"
                >
                  Open in Google Maps →
                </a>
              ) : (
                <Placeholder>[Insert Verified Google Maps/Office Map]</Placeholder>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
