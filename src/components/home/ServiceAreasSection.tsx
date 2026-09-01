import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mainLocations, alsoLocations } from "@/lib/location";

export function ServiceAreasSection() {
  return (
    <section id="areas" className="bg-ink py-24 text-cream md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-10 max-w-[720px]">
          <Eyebrow onDark>Service areas</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15] text-cream">
            Criminal Defence Lawyer Serving the Greater Toronto Area
          </h2>
          <p className="mt-5 text-[1.02rem] leading-[1.7] text-cream/70">
            Saggi Law Firm appears daily across Greater Toronto Area courthouses and serves clients throughout Peel, York, Halton, and the wider GTA.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-[10px] border border-gold/20 bg-white/[0.03] p-7">
            <h4 className="mb-5 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Main service areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {mainLocations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/location/${l.slug}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.86rem] transition-all ${
                    l.slug === "brampton"
                      ? "border-gold bg-gold font-semibold text-ink"
                      : "border-gold/20 bg-white/[0.05] text-cream hover:border-gold hover:bg-gold hover:text-ink"
                  }`}
                >
                  <span className="text-[0.82rem] text-maple">🍁</span>
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="reveal d1 rounded-[10px] border border-gold/20 bg-white/[0.03] p-7">
            <h4 className="mb-5 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Also serving
            </h4>
            <div className="flex flex-wrap gap-2">
              {alsoLocations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/location/${l.slug}`}
                  className="inline-flex items-center rounded-full border border-gold/20 bg-white/[0.05] px-3.5 py-2 text-[0.86rem] text-cream transition-all hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 border-t border-gold/15 pt-10 md:grid-cols-2">
          <div className="reveal">
            <h3 className="mb-3 font-display text-[1.35rem] font-medium text-cream">
              Criminal Defence in Brampton
            </h3>
            <p className="text-[0.96rem] leading-[1.7] text-cream/70">
              Brampton is a primary service area for Saggi Law Firm. Individuals facing criminal charges in Brampton can seek legal advice regarding their allegations, court process, bail hearing, defence options, and representation.
            </p>
          </div>
          <div className="reveal d1">
            <h3 className="mb-3 font-display text-[1.35rem] font-medium text-cream">
              Criminal Defence Across the GTA
            </h3>
            <p className="text-[0.96rem] leading-[1.7] text-cream/70">
              If you are located in Mississauga, Toronto, Vaughan, Etobicoke, Scarborough, Woodbridge, Milton, Newmarket, or another nearby community, contact Saggi Law Firm to discuss your criminal matter and determine how our legal services may assist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
