import { siteConfig } from "@/lib/siteConfig";

/**
 * Dark full-width social-proof strip: 5 gold stars, Google G logo, and
 * a CTA to the firm's Google reviews page. Sits directly under the hero
 * on service pages so social proof is visible above the fold on all but
 * the tallest hero images.
 */
export function GoogleReviewsStrip() {
  const reviewsUrl = siteConfig.google.reviewsUrl;
  if (!reviewsUrl) return null;

  return (
    <section aria-label="Google reviews" className="relative bg-ink text-cream">
      {/* Warm gold + rust glows for depth without adding an image. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 20% 50%, rgba(211,181,116,0.10), transparent 60%), radial-gradient(ellipse 50% 100% at 80% 50%, rgba(173,82,7,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(211,181,116,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(211,181,116,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-3.5 px-4 py-5 sm:px-6 sm:py-4 md:flex-row md:gap-6">
        <div
          className="flex items-center gap-1"
          aria-label="5 out of 5 stars"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} />
          ))}
        </div>

        <span
          aria-hidden
          className="hidden h-6 w-px bg-cream/20 md:inline-block"
        />

        <div className="flex items-center gap-2.5">
          <GoogleGIcon />
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-body text-[0.98rem] font-medium tracking-[0.005em] text-cream transition-colors hover:text-gold"
          >
            <span>
              Read our{" "}
              <span className="font-semibold text-gold">207+</span>{" "}
              <span className="font-semibold">5-star Google reviews</span>
            </span>
            <span
              aria-hidden
              className="text-gold transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── SVG icons ────────────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden
      className="drop-shadow-[0_1px_2px_rgba(211,181,116,0.4)]"
    >
      <defs>
        <linearGradient id="star-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0CE7E" />
          <stop offset="100%" stopColor="#D3B574" />
        </linearGradient>
      </defs>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="url(#star-gold)"
      />
    </svg>
  );
}

/**
 * Multi-colour Google G logo — the recognisable brand mark. Colours
 * are Google's official brand values so the strip reads immediately
 * as "Google reviews" without any text.
 */
function GoogleGIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 48 48"
      aria-hidden
      className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
    >
      <path
        fill="#4285F4"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#34A853"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
