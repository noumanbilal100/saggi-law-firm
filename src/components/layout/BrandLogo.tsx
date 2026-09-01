/**
 * Saggi Law Firm wordmark — SVG replica of the silver-metallic
 * client mark. Two panels separated by a hair-line rule:
 *
 *   ┌────┬────┐  │  SAGGI
 *   │  S │  L │  │  LAW FIRM
 *   ├────┼────┤  │  ────────────────
 *   │  F │  ‖ │  │  BARRISTER │ SOLICITOR
 *   └────┴────┘
 *
 * The four quadrants carry S / L / F and a small Corinthian-style
 * column that represents the "law" iconography from the original
 * logo. Everything renders as pure SVG — no image file needed —
 * so the mark stays crisp at every size and every screen density.
 *
 * `tone="light"` uses a silver gradient for dark backgrounds
 * (nav pill, footer); `tone="dark"` inverts to a rust-ink treatment
 * for use on cream / paper grounds.
 */

type Tone = "light" | "dark";

type Props = {
  tone?: Tone;
  height?: number;
  withTagline?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function BrandLogo({
  tone = "light",
  height = 80,
  withTagline = true,
  className = "",
  ariaLabel = "Saggi Law Firm — Barrister & Solicitor",
}: Props) {
  const width = Math.round(height * 3.1);

  /* Palette per tone. Silver gradients are defined in <defs> below. */
  const palette =
    tone === "light"
      ? {
          quadStroke: "url(#slfSilver)",
          letter: "url(#slfSilver)",
          divider: "url(#slfSilver)",
          wordmark: "url(#slfSilver)",
          tagline: "url(#slfSilver)",
          column: "url(#slfSilver)",
        }
      : {
          quadStroke: "#16153F",
          letter: "#16153F",
          divider: "#B85320",
          wordmark: "#16153F",
          tagline: "#B85320",
          column: "#B85320",
        };

  return (
    <svg
      viewBox="0 0 620 200"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Silver metallic gradient — top-left highlight, dark middle,
            slight bottom sheen. Matches the polished look of the
            original silver mark. */}
        <linearGradient id="slfSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E5E5E5" />
          <stop offset="55%" stopColor="#9A9A9A" />
          <stop offset="80%" stopColor="#D2D2D2" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* ── 2×2 monogram panel — quadrants outlined by a single cross ── */}
      {/* Outer frame */}
      <rect
        x="10"
        y="20"
        width="160"
        height="160"
        fill="none"
        stroke={palette.quadStroke}
        strokeWidth="1.5"
      />
      {/* Cross dividers */}
      <line
        x1="90"
        y1="20"
        x2="90"
        y2="180"
        stroke={palette.quadStroke}
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="100"
        x2="170"
        y2="100"
        stroke={palette.quadStroke}
        strokeWidth="1.5"
      />

      {/* Quadrant letters — Fraunces serif for the S/L/F. */}
      <text
        x="50"
        y="80"
        textAnchor="middle"
        fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
        fontSize="56"
        fontWeight="600"
        fill={palette.letter}
      >
        S
      </text>
      <text
        x="130"
        y="80"
        textAnchor="middle"
        fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
        fontSize="56"
        fontWeight="600"
        fill={palette.letter}
      >
        L
      </text>
      <text
        x="50"
        y="160"
        textAnchor="middle"
        fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
        fontSize="56"
        fontWeight="600"
        fill={palette.letter}
      >
        F
      </text>

      {/* Bottom-right quadrant — small Corinthian-style column icon. */}
      <g transform="translate(130 130)" fill={palette.column}>
        {/* Capital (top) */}
        <rect x="-14" y="-30" width="28" height="4" />
        <rect x="-12" y="-26" width="24" height="3" />
        {/* Shaft with fluting lines */}
        <rect x="-9" y="-22" width="18" height="34" />
        <line
          x1="-5"
          y1="-20"
          x2="-5"
          y2="10"
          stroke="#0B0A1F"
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
        <line
          x1="0"
          y1="-20"
          x2="0"
          y2="10"
          stroke="#0B0A1F"
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
        <line
          x1="5"
          y1="-20"
          x2="5"
          y2="10"
          stroke="#0B0A1F"
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
        {/* Base */}
        <rect x="-12" y="12" width="24" height="3" />
        <rect x="-14" y="16" width="28" height="4" />
      </g>

      {/* ── Vertical divider between monogram and wordmark ── */}
      <line
        x1="195"
        y1="30"
        x2="195"
        y2="170"
        stroke={palette.divider}
        strokeWidth="1.5"
      />

      {/* ── Wordmark: SAGGI / LAW FIRM stacked ── */}
      <text
        x="215"
        y="90"
        fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
        fontSize="64"
        fontWeight="500"
        letterSpacing="4"
        fill={palette.wordmark}
      >
        SAGGI
      </text>
      <text
        x="215"
        y="150"
        fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
        fontSize="52"
        fontWeight="500"
        letterSpacing="3"
        fill={palette.wordmark}
      >
        LAW FIRM
      </text>

      {withTagline ? (
        <>
          {/* Rule above the tagline. */}
          <line
            x1="215"
            y1="168"
            x2="600"
            y2="168"
            stroke={palette.divider}
            strokeWidth="0.8"
          />
          <text
            x="215"
            y="188"
            fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
            fontSize="16"
            fontWeight="400"
            letterSpacing="6"
            fill={palette.tagline}
          >
            BARRISTER
          </text>
          <text
            x="376"
            y="188"
            fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
            fontSize="18"
            fontWeight="300"
            fill={palette.tagline}
          >
            |
          </text>
          <text
            x="393"
            y="188"
            fontFamily='"Fraunces", "Times New Roman", Georgia, serif'
            fontSize="16"
            fontWeight="400"
            letterSpacing="6"
            fill={palette.tagline}
          >
            SOLICITOR
          </text>
        </>
      ) : null}
    </svg>
  );
}
