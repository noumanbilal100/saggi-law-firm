import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
  {
    n: "01",
    t: "Initial Consultation",
    b: "The first step is to understand what happened and what legal issue you are facing. During an initial consultation, you can provide information about the allegations, court documents, arrest, release conditions, police interaction, or other relevant circumstances.",
  },
  {
    n: "02",
    t: "Review of the Criminal Matter",
    b: "The next step is to assess the available information and explain the legal process. Where appropriate, relevant disclosure and case materials can be reviewed to identify important factual and legal issues.",
  },
  {
    n: "03",
    t: "Defence Strategy and Legal Representation",
    b: "Once the circumstances of the case are understood, legal options and potential defence strategies can be discussed. The appropriate approach depends on the allegations, evidence, procedural history, and objectives of the client.",
  },
  {
    n: "04",
    t: "Ongoing Representation",
    b: "Criminal matters can take time and may involve multiple court appearances or legal steps. Saggi Law Firm provides representation throughout the applicable stages of the case and keeps clients informed about important developments.",
  },
];

export function Process() {
  return (
    <section className="py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-12 max-w-[720px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
            How Our Criminal Defence Process Works
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal rounded-[10px] border border-rule bg-paper p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand-sm ${
                i === 1 ? "d1" : i === 2 ? "d2" : i === 3 ? "d3" : ""
              }`}
            >
              <span className="mb-4 block font-display text-[3rem] font-normal leading-none tracking-[-0.03em] text-rust">
                {s.n}
              </span>
              <h3 className="mb-3 font-body text-[1.15rem] font-semibold leading-tight tracking-normal">
                {s.t}
              </h3>
              <p className="text-[1rem] leading-[1.65] text-muted">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
