import { getServiceBySlug } from "@/lib/services";

/**
 * "At a glance" quick-facts strip — sits immediately under the hero
 * on service pages. Four short columns give the visitor a legal
 * snapshot (type of matter, framework, forum, first step) in ~5
 * seconds, before they commit to reading the long-form article.
 *
 * Content stays intentionally factual and universal so it never
 * misrepresents outcomes or specific penalties — safer than
 * inventing per-service sentencing ranges.
 */
export function AtAGlanceStrip({ serviceSlug }: { serviceSlug?: string }) {
  const svc = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const chargeLabel = svc?.title ?? "Criminal matter";
  const isOther = serviceSlug?.startsWith("other-services");

  const rows = isOther
    ? [
        {
          icon: <DocIcon />,
          label: "Type of matter",
          value: chargeLabel,
        },
        {
          icon: <SectionIcon />,
          label: "Legal framework",
          value: "Ontario law · Regulatory & administrative",
        },
        {
          icon: <BuildingIcon />,
          label: "Where handled",
          value: "On-site · Brampton office",
        },
        {
          icon: <ArrowIcon />,
          label: "How we start",
          value: "Book a short appointment",
        },
      ]
    : [
        {
          icon: <ScaleIcon />,
          label: "Type of matter",
          value: chargeLabel,
        },
        {
          icon: <SectionIcon />,
          label: "Legal framework",
          value: "Criminal Code of Canada",
        },
        {
          icon: <BuildingIcon />,
          label: "Where matters are heard",
          value: "Ontario Court of Justice · Superior Court",
        },
        {
          icon: <ArrowIcon />,
          label: "First step with us",
          value: "Free confidential consultation",
        },
      ];

  return (
    <section
      aria-label="Quick facts about this matter"
      className="border-y border-rule bg-cream-warm/60"
    >
      <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-center gap-3">
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent via-rule to-transparent"
          />
          <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">
            At a Glance
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent via-rule to-transparent"
          />
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-rule">
          {rows.map((r) => (
            <li
              key={r.label}
              className="flex flex-col gap-2 sm:px-5 sm:first:pl-0 sm:last:pr-0"
            >
              <span aria-hidden className="text-rust">
                {r.icon}
              </span>
              <span className="font-body text-[0.66rem] font-bold uppercase tracking-[0.12em] leading-[1.3] text-muted">
                {r.label}
              </span>
              <span className="font-display text-[1rem] font-medium leading-[1.35] text-ink sm:text-[1.05rem]">
                {r.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── SVG icons, 20×20 line-art ────────────────────────────────────── */

function ScaleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v18" />
      <path d="M5 21h14" />
      <path d="M6 6h12" />
      <path d="M6 6L3 13a3 3 0 0 0 6 0L6 6z" />
      <path d="M18 6l-3 7a3 3 0 0 0 6 0L18 6z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function SectionIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <line x1="9" y1="9" x2="9" y2="9" />
      <line x1="9" y1="12" x2="9" y2="12" />
      <line x1="9" y1="15" x2="9" y2="15" />
      <line x1="9" y1="18" x2="9" y2="18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 8 16 12 12 16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
