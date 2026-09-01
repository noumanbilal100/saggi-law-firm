import { Eyebrow } from "@/components/ui/Eyebrow";

const items = [
  {
    icon: "§",
    title: "Clear Legal Guidance",
    body:
      "Criminal law can involve unfamiliar terminology, court procedures, deadlines, release conditions, disclosure, and legal decisions that may have significant consequences. We work to explain the process in understandable terms so clients can make informed decisions.",
  },
  {
    icon: "¶",
    title: "Defence Strategy Based on the Case",
    body:
      "A criminal defence strategy should be based on the specific allegations and available evidence. Factors such as the circumstances of the arrest, statements, searches, identification, testing, disclosure, witness evidence, and other case-specific issues may be relevant.",
  },
  {
    icon: "∮",
    title: "Representation Throughout the Process",
    body:
      "A criminal case can involve multiple stages. Depending on the circumstances, legal representation may be required for bail proceedings, court appearances, negotiations, applications, trial preparation, or other stages of the criminal justice process.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-6 max-w-[720px]">
          <Eyebrow>Why choose us</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
            Why Choose Saggi Law Firm?
          </h2>
        </div>

        <div className="reveal d1 mb-11 flex flex-col gap-4 text-[1.05rem] leading-[1.7] text-muted">
          <p>
            Choosing a criminal defence lawyer is an important decision. When your freedom, reputation, employment, family circumstances, or future may be affected by a criminal allegation, you need legal advice that is focused on your circumstances rather than a one-size-fits-all approach.
          </p>
          <p>
            Saggi Law Firm focuses on criminal defence and related legal services, giving clients an opportunity to discuss their circumstances directly and understand the legal process. We aim to communicate clearly, explain the available options, and provide representation appropriate to the nature of the matter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className={`reveal rounded-[10px] border border-rule border-t-[3px] border-t-rust bg-paper p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-brand-sm ${
                i === 1 ? "d1" : i === 2 ? "d2" : ""
              }`}
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-[1.3rem] font-semibold text-gold">
                {it.icon}
              </div>
              <h3 className="mb-3 font-display text-[1.25rem] font-medium">{it.title}</h3>
              <p className="text-[1.02rem] leading-[1.65] text-muted">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
