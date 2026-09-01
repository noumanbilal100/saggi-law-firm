import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/siteConfig";
import type { ServiceFaq } from "@/lib/extract-service-faq";

/**
 * Frequently-asked-questions accordion for service pages. Uses native
 * <details>/<summary> for zero-JS interactivity and accessibility.
 *
 * When the page passes `faqs` extracted from the article body, those
 * charge-specific questions are shown. Otherwise falls back to a
 * universal set about the firm's process — so the section is always
 * useful even for pages that didn't ship with a FAQ block.
 */
export function FaqAccordion({
  faqs: providedFaqs,
  heading,
  eyebrow,
  description,
}: {
  faqs?: ServiceFaq[];
  heading?: string;
  eyebrow?: string;
  description?: string;
} = {}) {
  const { phone, phoneHref } = siteConfig.contact;

  const universalFaqs: ServiceFaq[] = [
    {
      q: "What happens after I contact Saggi Law Firm?",
      a: "We begin with a confidential consultation to understand the circumstances of your matter — the arrest, any release conditions, the disclosed evidence, and any upcoming court dates. From there, we can outline the applicable legal framework and possible next steps.",
    },
    {
      q: "How much does an initial consultation cost?",
      a: "The initial consultation is free and confidential. It gives you a chance to explain your situation and to receive general legal information about the charge before deciding how to proceed. Nothing you share is used against you.",
    },
    {
      q: "Do I need a lawyer if I intend to plead guilty?",
      a: "Yes. Even where a person is considering a resolution, legal advice matters — the wording of the plea, the facts read in, the sentencing position, and the collateral consequences (record, immigration, licensing, travel) can all be affected by how the matter is handled in court.",
    },
    {
      q: "Can I be released on bail?",
      a: "In most cases, yes — but the process varies. A bail hearing may be required, and the terms of release can include conditions, supervision, or proposed sureties. Preparing properly for the bail hearing is often the single most important step early in a case.",
    },
    {
      q: "How long will my case take?",
      a: "Criminal matters can take anywhere from a few months to well over a year, depending on the charge, the complexity of the disclosure, court scheduling, and the defence strategy. Saggi Law Firm can give you a realistic estimate once we have reviewed your file.",
    },
    {
      q: "Will a conviction stay on my record forever?",
      a: "A criminal conviction stays on your record until a formal record suspension (pardon) is granted, and the waiting period depends on the offence and sentence. This is why avoiding a conviction — where the evidence and circumstances allow — is often a critical objective.",
    },
    {
      q: "Do you represent clients throughout the Greater Toronto Area?",
      a: "Yes. Based in Brampton, Saggi Law Firm appears across GTA and Southern Ontario courthouses — Toronto, Mississauga, Vaughan, Newmarket, Milton, and every court in between — for criminal matters, bail hearings, and related legal proceedings.",
    },
    {
      q: "Is what I share with a lawyer confidential?",
      a: "Yes. Solicitor–client privilege attaches from your very first contact — including the initial consultation. Nothing you share can be used against you, and it cannot be disclosed to anyone else without your instruction, subject to narrow legal exceptions.",
    },
  ];

  const hasCustom = providedFaqs && providedFaqs.length > 0;
  const faqs = hasCustom ? providedFaqs! : universalFaqs;

  const resolvedEyebrow =
    eyebrow ?? (hasCustom ? "Frequently asked" : "Frequently asked");
  const resolvedHeading =
    heading ??
    (hasCustom
      ? "Questions about this charge"
      : "Working with Saggi Law Firm");
  const resolvedDescription =
    description ??
    (hasCustom
      ? "Common questions clients ask about this practice area — answered plainly, without legal jargon."
      : "Common questions about the process, cost, timeline, and working with our firm — beyond the charge-specific information above.");

  return (
    <section className="border-t border-rule bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          {/* Left column — heading + still-have-questions CTA */}
          <div className="md:sticky md:top-24 md:self-start">
            <Eyebrow>{resolvedEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
              {resolvedHeading}
            </h2>
            <p className="mt-4 max-w-[42ch] text-[1rem] leading-[1.65] text-muted">
              {resolvedDescription}
            </p>

            <div className="mt-6 rounded-[12px] border border-rule bg-paper p-5 shadow-brand-sm">
              <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-rust">
                Still have questions?
              </span>
              <p className="mt-2 text-[0.9rem] leading-[1.55] text-muted">
                The fastest way to get answers specific to your matter
                is a short confidential call.
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {phone && (
                  <a
                    href={phoneHref ?? "tel:"}
                    className="inline-flex items-center gap-1.5 rounded-md bg-rust px-3.5 py-2 font-body text-[0.82rem] font-bold text-white transition-all hover:bg-rust-hover"
                  >
                    <span aria-hidden>✆</span>
                    {phone}
                  </a>
                )}
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1 rounded-md border-[1.5px] border-rule bg-transparent px-3.5 py-2 font-body text-[0.82rem] font-bold text-ink transition-all hover:border-rust hover:text-rust"
                >
                  Contact us
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column — accordion */}
          <div className="flex flex-col">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="group border-b border-rule py-5 [&[open]>summary]:text-rust"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 font-display text-[1.05rem] font-medium leading-[1.35] text-ink transition-colors hover:text-rust sm:text-[1.15rem]">
                  <span
                    aria-hidden
                    className="font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{f.q}</span>
                  <span
                    aria-hidden
                    className="ml-auto grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-rule bg-paper text-rust transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 max-w-[70ch] pl-[52px] text-[0.98rem] leading-[1.65] text-muted animate-faq-open">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
