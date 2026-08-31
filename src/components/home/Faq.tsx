import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeFaq } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="bg-cream-warm py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1fr_1.8fr] md:items-start">
          <div className="reveal">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.7] text-muted">
              Common questions about working with a criminal defence lawyer — if yours isn&apos;t here, contact Saggi Law Firm.
            </p>
          </div>

          <div className="reveal d1">
            {homeFaq.map((item, i) => (
              <details
                key={i}
                open={i === 0}
                className={`group py-[22px] ${i === 0 ? "border-t" : ""} border-b border-rule`}
              >
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-[1.12rem] font-medium leading-[1.4] text-ink transition-colors hover:text-rust [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="flex-shrink-0 font-display text-[1.8rem] font-normal leading-none text-rust transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3.5 max-w-[68ch] text-[0.96rem] leading-[1.7] text-muted animate-[faq-open_300ms_cubic-bezier(0.2,0.7,0.2,1)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
