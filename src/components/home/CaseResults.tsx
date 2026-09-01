import { Eyebrow } from "@/components/ui/Eyebrow";
import { caseResults, hasSampleResults, type Outcome } from "@/lib/case-results";

const outcomeStyles: Record<Outcome, { border: string; text: string; bg: string }> = {
  withdrawn: { border: "border-success", text: "text-success", bg: "bg-success/8" },
  acquitted: { border: "border-success", text: "text-success", bg: "bg-success/8" },
  stayed: { border: "border-success", text: "text-success", bg: "bg-success/8" },
  released: { border: "border-success", text: "text-success", bg: "bg-success/8" },
  diverted: { border: "border-rust", text: "text-rust", bg: "bg-rust/8" },
  "peace-bond": { border: "border-rust", text: "text-rust", bg: "bg-rust/8" },
  reduced: { border: "border-rust", text: "text-rust", bg: "bg-rust/8" },
  discharge: { border: "border-rust", text: "text-rust", bg: "bg-rust/8" },
};

export function CaseResults() {
  return (
    <section id="results" className="py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-8 max-w-[720px]">
          <Eyebrow>Practice case studies</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
            How we defend criminal matters
          </h2>
          <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-[1.65] text-muted">
            A snapshot of the types of matters we take on and the legal approaches we bring to them. Every case turns on its own facts — these are practice descriptions, not outcome guarantees.
          </p>
        </div>

        {hasSampleResults && (
          <div
            role="note"
            aria-label="Sample content"
            className="reveal d1 mb-8 flex flex-wrap items-start gap-4 rounded-[10px] border-l-[3px] border-maple bg-maple/[0.05] px-5 py-4"
          >
            <span className="mt-0.5 inline-block rounded bg-maple px-2.5 py-1 font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white">
              Sample content
            </span>
            <div className="flex-1 text-[1.02rem] leading-[1.6] text-ink">
              <strong className="mb-1 block font-body font-bold text-maple">
                Design preview — pending replacement with verified content.
              </strong>
              Placeholder entries. Ontario RPC 4.2-1 requires that any client-facing outcome claim be verifiable — replace with real, consented content before publishing.
            </div>
          </div>
        )}

        <div className="reveal d2 border-t border-rule">
          {caseResults.map((r, i) => {
            const style = outcomeStyles[r.outcomeTag];
            return (
              <div
                key={i}
                className="group grid items-center gap-6 border-b border-rule py-6 transition-all duration-200 hover:bg-rust/[0.03] md:grid-cols-[180px_1fr_auto] md:gap-8 md:px-2 md:hover:px-4"
              >
                <div className="flex flex-col">
                  <span className="font-body text-[0.85rem] font-bold uppercase tracking-[0.06em] text-muted">
                    {r.charge}
                  </span>
                  {(r.jurisdiction || r.year) && (
                    <span className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-muted/80">
                      {r.jurisdiction}
                      {r.jurisdiction && r.year && <span aria-hidden>·</span>}
                      {r.year}
                    </span>
                  )}
                </div>

                <div
                  className="font-body text-[1rem] font-normal leading-[1.55] text-ink [&>em]:not-italic [&>em]:italic [&>em]:text-rust"
                  dangerouslySetInnerHTML={{ __html: r.outcome }}
                />

                <span
                  className={`inline-flex whitespace-nowrap justify-self-start rounded-full border px-3 py-1.5 font-body text-[0.78rem] font-bold uppercase tracking-[0.08em] md:justify-self-end ${style.border} ${style.text} ${style.bg}`}
                >
                  {r.outcomeLabel}
                </span>
              </div>
            );
          })}
        </div>

        <p className="reveal d3 mt-8 max-w-[68ch] text-[1.02rem] leading-[1.65] text-muted">
          Past results do not guarantee future outcomes. Every criminal case depends on its own facts, evidence, applicable law, and procedural circumstances. Contact Saggi Law Firm to discuss the specific circumstances of your matter.
        </p>
      </div>
    </section>
  );
}
