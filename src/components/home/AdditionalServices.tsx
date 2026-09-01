import { Eyebrow } from "@/components/ui/Eyebrow";
import { additionalServices } from "@/lib/services";

export function AdditionalServices() {
  return (
    <section id="additional" className="bg-cream-warm py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-12">
          <div className="max-w-[720px]">
            <Eyebrow>Also offered</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
              Attestation and Commissioner of Oaths Services
            </h2>
          </div>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-muted">
            In addition to criminal defence representation, Saggi Law Firm provides certain document and legal services, including attestations, statutory declarations, sponsorship letters, affidavits, on-site Commissioner of Oaths services, and powers of attorney.
          </p>
          <p className="mt-3 text-[1.05rem] leading-[1.65] text-muted">
            These services may be required for personal, administrative, legal, immigration-related, or other documentation purposes. Requirements can vary depending on the document and the organization requesting it, so clients should confirm the applicable requirements before arranging an appointment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
          {additionalServices.map((s, i) => (
            <div
              key={s.slug}
              className={`reveal rounded-[10px] border p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand-sm ${
                s.lead
                  ? "border-ink bg-ink text-cream"
                  : "border-rule bg-paper text-ink"
              } ${i === 1 ? "d1" : i === 2 ? "d2" : ""}`}
            >
              <div
                className={`mb-5 grid h-11 w-11 place-items-center rounded-lg font-display text-[1.3rem] font-semibold ${
                  s.lead ? "bg-gold/15 text-gold" : "bg-rust/[0.08] text-rust"
                }`}
              >
                {s.icon}
              </div>
              <h3
                className={`mb-3 font-display text-[1.25rem] font-medium ${
                  s.lead ? "text-cream" : "text-ink"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`text-[1rem] leading-[1.65] ${
                  s.lead ? "text-cream/70" : "text-muted"
                }`}
              >
                {s.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
