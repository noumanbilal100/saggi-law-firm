import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Full-width "Why Saggi Law Firm" USP grid — sits between the At a
 * Glance strip and the deep article body. Four icon-driven value
 * propositions in a card grid so visitors see the firm's differentiators
 * before diving into the long-form content.
 */
export function WhyChooseUs() {
  const usps = [
    {
      icon: <FocusIcon />,
      title: "Focused Criminal Defence",
      body: "Not general practice. Only criminal matters — impaired driving, assault, drug offences, bail hearings, firearms, and related charges.",
    },
    {
      icon: <PhoneIcon />,
      title: "Direct Lawyer Contact",
      body: "You speak with a lawyer, not a paralegal or an intake team. Consultation calls are answered day, night, and weekends.",
    },
    {
      icon: <StrategyIcon />,
      title: "Case-Specific Strategy",
      body: "No template defence. Every strategy is built on the actual evidence, disclosure, and circumstances in your file — not a stock template.",
    },
    {
      icon: <MapIcon />,
      title: "Full GTA Coverage",
      body: "Brampton, Toronto, Mississauga, Vaughan, Newmarket, Milton — appearing daily across Peel and Greater Toronto Area courthouses.",
    },
  ];

  return (
    <section className="border-b border-rule bg-paper py-14 md:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mb-10 max-w-[720px]">
          <Eyebrow>Why work with us</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15]">
            Four reasons clients choose Saggi Law Firm
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u) => (
            <article
              key={u.title}
              className="group flex h-full flex-col gap-3 rounded-[12px] border border-rule bg-cream-warm/40 p-6 transition-all hover:-translate-y-1 hover:border-rust hover:bg-paper hover:shadow-brand-sm"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-[10px] bg-rust/[0.08] text-rust transition-colors group-hover:bg-rust group-hover:text-white"
              >
                {u.icon}
              </span>
              <h3 className="font-display text-[1.1rem] font-medium leading-[1.25] text-ink">
                {u.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.6] text-muted">
                {u.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SVG icons ────────────────────────────────────────────────────── */

function FocusIcon() {
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
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function StrategyIcon() {
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
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 21V9" />
      <path d="M9 6h9a3 3 0 0 1 3 3v6" />
    </svg>
  );
}

function MapIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
