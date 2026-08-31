import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/siteConfig";

/**
 * "First 24 Hours" action checklist — a compact, urgent card showing
 * six practical steps a newly-charged person should take. High
 * perceived value for arrested visitors and a natural gateway into
 * a consultation call.
 */
export function First24Hours() {
  const { phone, phoneHref } = siteConfig.contact;

  const steps = [
    {
      title: "Say as little as possible to police",
      body: "Beyond confirming your identity, you generally do not have to answer questions. Politely say you want to speak with a lawyer first.",
    },
    {
      title: "Ask for a lawyer immediately",
      body: "You have the right to consult counsel without delay. Use it before making any statement or agreeing to any procedure.",
    },
    {
      title: "Write down what happened while it's fresh",
      body: "Note the time, location, officers involved, what was said and asked, and the sequence of events. Small details often matter later.",
    },
    {
      title: "Do not discuss the case publicly",
      body: "No social media posts, group chats, or text-message venting. Anything you say or write can end up in the prosecution's disclosure.",
    },
    {
      title: "Preserve anything that may be evidence",
      body: "Photos, texts, receipts, dashcam footage, medical records — save them. Do not delete or edit anything on your phone or laptop.",
    },
    {
      title: "Call Saggi Law Firm for a confidential consultation",
      body: "Free, direct-to-a-lawyer, and privileged from the first word. The sooner you get advice, the more options you keep open.",
    },
  ];

  return (
    <section className="bg-cream py-14 md:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
          {/* Left column — headline + CTA */}
          <div>
            <Eyebrow>Just been charged?</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
              What to do in the first 24 hours
            </h2>
            <p className="mt-4 max-w-[42ch] text-[1rem] leading-[1.65] text-muted">
              The choices you make immediately after being arrested or
              charged can shape the rest of your case. Six practical
              steps &mdash; taken from experience defending criminal
              matters across Ontario.
            </p>

            <div className="mt-7 rounded-[12px] border-l-[3px] border-rust bg-paper px-5 py-4 shadow-brand-sm">
              <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-rust">
                Reach a lawyer now
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {phone && (
                  <a
                    href={phoneHref ?? "tel:"}
                    className="inline-flex items-center gap-2 rounded-md bg-rust px-4 py-2.5 font-body text-[0.9rem] font-bold text-white transition-all hover:-translate-y-px hover:bg-rust-hover"
                  >
                    <span aria-hidden>✆</span>
                    {phone}
                  </a>
                )}
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-transparent px-4 py-2.5 font-body text-[0.9rem] font-bold text-ink transition-all hover:border-rust hover:text-rust"
                >
                  Book online
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column — checklist */}
          <ol className="not-prose grid gap-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[46px_1fr] gap-4 rounded-[10px] border border-rule bg-paper px-5 py-4 shadow-brand-sm"
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full bg-rust text-cream"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <span className="font-display text-[1rem] font-medium leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-[1.02rem] font-medium leading-[1.3] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.55] text-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
