import { RichText } from "@payloadcms/richtext-lexical/react";
import { jsxConverters } from "@/components/service/lexical-converters";
import type { CodedSection } from "@/lib/extract-coded-sections";

/**
 * Coded article sections — each `[#code]` gets its own distinct
 * layout so the reader sees a clear section change, not just tinted
 * background. All three "light" sections are minimal — no shadows,
 * no rounded cards, no heavy borders — but each carries a different
 * structural signature:
 *
 *   [#covers]    → two-column definition panel
 *   [#defense]   → left rust rail (strategic callout)
 *   [#process]   → timeline with rust dots on every sub-heading
 *   [#penalties] → dark ink weight section (kept for contrast)
 */

type Props = { section: CodedSection };

/* ────────── 1. [#covers] — two-column definition panel ─────────────── */

export function CoversSection({ section }: Props) {
  return (
    <section className="coded-section relative my-16 border-t border-rule pt-10 md:pt-14">
      {/* Subtle background wash tinted to the cream-warm tone —
          enough to signal "distinct section" without breaking the
          continuous prose reading rhythm the reader is used to. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(211,181,116,0.10) 0%, transparent 100%)",
        }}
      />
      <div className="relative">
        <div className="not-prose">
          <BandEyebrow icon={<BookIcon />} label="What it covers" />
        </div>
        <div className="prose-brand mt-6 max-w-none">
          <RichText
            /* @ts-expect-error — Lexical data shape is dynamic */
            data={section.body}
            converters={jsxConverters}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────── 2. [#penalties] — dark weight card ──────────────────────── */

export function PenaltiesSection({ section }: Props) {
  return (
    <section className="coded-section relative my-16 overflow-hidden bg-ink p-8 text-cream sm:p-10 md:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 85% 15%, rgba(216,6,33,0.08), transparent 60%), radial-gradient(ellipse 60% 100% at 15% 85%, rgba(173,82,7,0.10), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="not-prose">
          <BandEyebrow icon={<WarningIcon />} label="What's at stake" onDark />
        </div>
        <div className="prose-brand prose-brand--on-dark mt-8 max-w-none">
          <RichText
            /* @ts-expect-error — Lexical data shape is dynamic */
            data={section.body}
            converters={jsxConverters}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────── 3. [#defense] — left rust rail, callout ─────────────────── */

export function DefenseSection({ section }: Props) {
  return (
    <section className="coded-section relative my-16">
      <div className="border-l-[3px] border-rust pl-6 sm:pl-10 md:pl-14">
        <div className="not-prose">
          <BandEyebrow icon={<ShieldIcon />} label="Our approach" />
        </div>
        <div className="prose-brand mt-8 max-w-none">
          <RichText
            /* @ts-expect-error — Lexical data shape is dynamic */
            data={section.body}
            converters={jsxConverters}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────── 4. [#process] — timeline with rust dots ─────────────────── */

export function ProcessSection({ section }: Props) {
  return (
    <section className="coded-section my-16 border-t border-rule pt-10 md:pt-14">
      <div className="not-prose">
        <BandEyebrow icon={<TimelineIcon />} label="What happens next" />
      </div>
      <div className="relative mt-8 pl-8 sm:pl-12">
        {/* Dashed vertical rail down the left. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-2 top-0 w-px sm:left-4"
          style={{
            background:
              "repeating-linear-gradient(to bottom, var(--color-rust) 0 6px, transparent 6px 14px)",
          }}
        />
        <div className="prose-brand prose-brand--timeline max-w-none">
          <RichText
            /* @ts-expect-error — Lexical data shape is dynamic */
            data={section.body}
            converters={jsxConverters}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────── shared helpers ──────────────────────────────────────────── */

/**
 * Return a copy of the section body with its leading H2 removed —
 * used when the section wrapper already renders the heading in a
 * side panel and the prose column should start with the intro paragraph.
 */
function stripLeadingH2(body: {
  root: { children: any[]; [k: string]: any };
}) {
  const kids = body?.root?.children ?? [];
  const first = kids[0];
  if (first?.type === "heading" && first?.tag === "h2") {
    return { root: { ...body.root, children: kids.slice(1) } };
  }
  return body;
}

function BandEyebrow({
  icon,
  label,
  onDark = false,
}: {
  icon: React.ReactNode;
  label: string;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className={onDark ? "text-gold" : "text-rust"}>
        {icon}
      </span>
      <span
        className={`font-body text-[0.8rem] font-bold uppercase tracking-[0.22em] ${
          onDark ? "text-gold" : "text-rust"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ── SVG icons ────────────────────────────────────────────────────── */

function BookIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function WarningIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="17" />
    </svg>
  );
}
