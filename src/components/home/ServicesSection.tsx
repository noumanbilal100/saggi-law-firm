import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services, otherServicesNote } from "@/lib/services";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-12">
          <div className="max-w-[720px]">
            <Eyebrow>Criminal defence services</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
              Criminal Defence Services
            </h2>
          </div>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-muted">
            Saggi Law Firm provides legal representation across a range of criminal offences and related legal matters. Criminal cases can involve different procedures, evidence, potential penalties, and defence strategies, which is why it is important to obtain advice specific to your circumstances.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className={`reveal group relative flex flex-col gap-3 rounded-[10px] border border-rule bg-paper p-7 text-ink no-underline transition-all duration-300 hover:-translate-y-1 hover:border-rust hover:shadow-brand ${
                i % 2 === 1 ? "d1" : ""
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-lg bg-rust/[0.08] font-display text-[1.15rem] font-semibold leading-none text-rust">
                  {s.icon}
                </div>
                <h3 className="mt-1 flex-1 font-display text-[1.2rem] font-medium leading-[1.25]">
                  {s.title}
                </h3>
                <span className="mt-1.5 flex-shrink-0 font-display text-[1.3rem] leading-none text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rust">
                  ↗
                </span>
              </div>
              <p className="text-[1rem] leading-[1.6] text-muted">{s.summary}</p>
            </Link>
          ))}
          <div className="reveal col-span-full rounded-[10px] border border-dashed border-rule bg-cream-warm px-7 py-6 text-[0.95rem] leading-[1.65] text-muted">
            <strong className="mb-1.5 block font-display text-[1.05rem] font-medium text-ink">
              {otherServicesNote.title}
            </strong>
            {otherServicesNote.body}
          </div>
        </div>
      </div>
    </section>
  );
}
