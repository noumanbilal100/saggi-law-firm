import { Eyebrow } from "@/components/ui/Eyebrow";

const paragraphs = [
  "Being charged with a criminal offence can be stressful and confusing. You may be concerned about going to court, speaking with police, your employment, immigration or family circumstances, your reputation, financial consequences, or the possibility of a criminal record. You may also be unsure about what happens next or whether you should plead guilty, contest the allegations, or seek another resolution.",
  "A criminal charge is an allegation, and the legal process provides accused individuals with important rights and procedural protections. A criminal lawyer can help you understand the allegations against you, explain the applicable criminal law, review the available evidence, and identify the legal options that may be available.",
  "At Saggi Law Firm, we provide criminal defence representation designed around the circumstances of each client. Whether your matter involves a first allegation, a serious offence, a bail hearing, or an ongoing criminal case, our goal is to provide clear legal guidance and dedicated representation at every appropriate stage of the criminal justice process.",
];

export function Facing() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-[96px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(211,181,116,0.10), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 -top-36 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(216,6,33,0.10), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal">
          <Eyebrow onDark>Facing criminal charges?</Eyebrow>
          <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] text-cream">
            Facing Criminal Charges in the{" "}
            <em className="font-medium not-italic italic text-gold">GTA</em>?
          </h2>
        </div>
        <div className="reveal d2 mt-8 grid gap-8 md:grid-cols-3">
          {paragraphs.map((p, i) => (
            <div key={i}>
              <div className="mb-3 font-display text-[1.4rem] font-normal text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[1.02rem] leading-[1.7] text-cream/70">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
