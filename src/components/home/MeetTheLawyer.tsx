import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Placeholder, PlaceholderBlock } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";

export function MeetTheLawyer() {
  const {
    name,
    title,
    role,
    photoSrc,
    photoAlt,
    profileUrl,
    bio,
    bioParagraphs,
    credentials,
    award,
    languages,
    tagline,
  } = siteConfig.lawyer;

  return (
    <section id="lawyer" className="bg-cream-warm py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[18px] border border-rule bg-gradient-to-br from-ink to-[#14112B] shadow-brand-lg">
            <div
              aria-hidden
              className="absolute inset-0 z-[1]"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(211,181,116,0.15), transparent 60%)" }}
            />
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={photoAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 900px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 z-[2] grid place-items-center p-6 text-center">
                <div>
                  <div className="font-display text-[8rem] leading-none text-gold/35">☉</div>
                  <div className="mt-4">
                    <Placeholder onDark>[Insert Verified Lawyer Photo]</Placeholder>
                  </div>
                </div>
              </div>
            )}
            {(name || title) && photoSrc && (
              <div className="absolute bottom-5 left-5 z-[3] rounded-lg border-l-[3px] border-gold bg-ink/75 px-3.5 py-2.5 font-body text-[0.82rem] text-cream backdrop-blur-md">
                <strong className="block font-display text-[1.1rem] font-medium text-cream">
                  {name}
                </strong>
                {title && (
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/85">
                    {title}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="reveal d2">
            <Eyebrow>Meet the lawyer</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
              Meet the <em className="font-medium not-italic italic text-rust">Lawyer</em>
            </h2>
            <p className="mt-5 text-[1rem] leading-[1.7] text-muted">
              Your legal matter deserves personal attention from a qualified legal professional. This section introduces the lawyer representing clients through Saggi Law Firm.
            </p>

            <div className="mt-8 rounded-r-lg border-l-[3px] border-rust bg-paper px-6 py-5 shadow-brand-sm">
              <div className="flex flex-wrap items-baseline gap-x-3 font-display text-[1.4rem] font-medium text-ink">
                {name ?? <Placeholder>[Insert Lawyer Name]</Placeholder>}
                {title && (
                  <span className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {title}
                  </span>
                )}
              </div>
              <span className="mt-1.5 block font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-rust">
                {role}
              </span>
              {tagline && (
                <div className="mt-4 font-display text-[1.1rem] italic text-gold/90">
                  {tagline}
                </div>
              )}
              <div className="mt-4">
                {bio ? (
                  <p className="font-display text-[1.15rem] font-normal italic leading-[1.5] text-ink">
                    &ldquo;{bio}&rdquo;
                  </p>
                ) : (
                  <PlaceholderBlock tag="Verified bio">
                    [Insert verified professional biography, Law Society of Ontario membership information, education, years of experience, professional credentials, and criminal defence experience.]
                  </PlaceholderBlock>
                )}
                {bioParagraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-[0.98rem] leading-[1.7] text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {credentials.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {credentials.map((c) => (
                  <div key={c.title} className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-[1.3rem] leading-none text-rust">§</span>
                    <div>
                      <h4 className="mb-0.5 font-body text-[0.9rem] font-bold text-ink">
                        {c.title}
                      </h4>
                      <p className="text-[0.85rem] leading-[1.5] text-muted">{c.detail}</p>
                    </div>
                  </div>
                ))}
                {languages && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-[1.3rem] leading-none text-rust">§</span>
                    <div>
                      <h4 className="mb-0.5 font-body text-[0.9rem] font-bold text-ink">Languages</h4>
                      <p className="text-[0.85rem] leading-[1.5] text-muted">{languages.join(", ")}</p>
                    </div>
                  </div>
                )}
                {!languages && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-[1.3rem] leading-none text-rust">§</span>
                    <div>
                      <h4 className="mb-0.5 font-body text-[0.9rem] font-bold text-ink">Languages</h4>
                      <div className="mt-1">
                        <Placeholder>[Insert Languages Spoken]</Placeholder>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {award && (
              <div className="mt-6 inline-flex items-start gap-3 rounded-lg border border-gold-soft bg-gold/10 px-4 py-3 text-[0.9rem] text-ink">
                <span aria-hidden className="mt-0.5 text-[1.1rem] leading-none text-rust">★</span>
                <span className="leading-[1.55]">{award}</span>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={profileUrl ?? "/about-us"}
                className="inline-flex items-center gap-2.5 rounded-md bg-rust px-6 py-[15px] font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
              >
                Learn More About the Lawyer →
              </Link>
              {!profileUrl && (
                <span className="text-[0.85rem] text-muted">
                  <Placeholder>[Insert dedicated profile page URL]</Placeholder>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
