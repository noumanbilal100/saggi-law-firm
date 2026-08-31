import { Eyebrow } from "@/components/ui/Eyebrow";
import { EmbedHtml } from "@/components/ui/EmbedHtml";
import { siteConfig } from "@/lib/siteConfig";
import { fetchGoogleReviews, type GoogleReview } from "@/lib/googleReviews";

/**
 * Client reviews (Google Business Profile).
 *
 * Rendering priority:
 *   1. widgetEmbed             — script embed (Elfsight/Trustindex).
 *   2. Live Places API data    — brand-styled cards from real reviews.
 *   3. reviewsUrl / knowledge  — "See reviews on Google" CTA card.
 *   4. Nothing configured      — reserved-space placeholder.
 *
 * This component never displays fabricated testimonials.
 */
export async function Reviews() {
  const { widgetEmbed, reviewsUrl, knowledgePanelUrl } = siteConfig.google;

  if (widgetEmbed) {
    return (
      <ReviewsSection>
        <EmbedHtml
          html={widgetEmbed}
          className="reveal d2 [&_iframe]:w-full [&>*]:mx-auto"
        />
        {reviewsUrl && (
          <div className="mt-6 text-center text-[0.9rem] text-muted">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-rust"
            >
              Read all reviews on Google →
            </a>
          </div>
        )}
      </ReviewsSection>
    );
  }

  const data = await fetchGoogleReviews();

  if (data && data.reviews.length > 0) {
    return (
      <ReviewsSection>
        <div className="reveal d2 flex flex-col gap-8">
          <ReviewsSummary
            average={data.rating}
            total={data.user_ratings_total}
            googleUrl={data.url}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.slice(0, 6).map((r, i) => (
              <ReviewCard key={`${r.time}-${i}`} review={r} />
            ))}
          </div>
          <div className="text-center">
            <a
              href={reviewsUrl ?? data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-paper px-5 py-3 font-body text-[0.92rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
            >
              Read all Google reviews →
            </a>
          </div>
          <GoogleAttribution />
        </div>
      </ReviewsSection>
    );
  }

  if (reviewsUrl) {
    return (
      <ReviewsSection>
        <div className="reveal d2 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[18px] border border-ink bg-ink p-8 text-cream md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold">
              <GoogleG /> Google Business Profile
            </div>
            <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] text-cream">
              Read every review, straight from Google.
            </h3>
            <p className="mt-4 text-[1rem] leading-[1.65] text-cream/70">
              Reviews are hosted on the verified Saggi Law Firm Google Business Profile — click through to see the full history, star ratings, and reviewer names.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-rust px-6 py-3.5 font-body text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
              >
                <GoogleG /> See our reviews on Google →
              </a>
              {knowledgePanelUrl && (
                <a
                  href={knowledgePanelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 font-body text-[0.95rem] font-bold text-cream transition-all hover:-translate-y-px hover:border-gold hover:text-gold"
                >
                  Open on Google Search →
                </a>
              )}
            </div>
          </div>

          <div className="rounded-[18px] border border-dashed border-maple bg-paper p-8">
            <span className="inline-block rounded bg-maple/[0.08] px-2.5 py-1 font-mono text-[0.82em] font-bold uppercase tracking-[0.06em] text-maple">
              On-page embed pending
            </span>
            <h4 className="mt-3 font-display text-[1.15rem] font-medium text-ink">
              Native cards render here once the API key is set.
            </h4>
            <p className="mt-3 text-[0.9rem] leading-[1.6] text-muted">
              Place ID is wired. Add <code className="rounded bg-cream-warm px-1.5 py-0.5 font-mono text-[0.85em] text-rust">GOOGLE_PLACES_API_KEY</code> in <code className="rounded bg-cream-warm px-1.5 py-0.5 font-mono text-[0.85em] text-rust">.env.local</code> (dev) or Vercel Environment Variables (prod), then rebuild. Reviews will refresh every 24 hours.
            </p>
          </div>
        </div>
      </ReviewsSection>
    );
  }

  return (
    <ReviewsSection>
      <div className="reveal d2 rounded-[10px] border border-dashed border-maple bg-paper p-10 text-center md:p-12">
        <span className="inline-block rounded bg-maple/[0.08] px-2.5 py-1 font-mono text-[0.82em] font-bold uppercase tracking-[0.06em] text-maple">
          [Reserved space for Google Business Profile reviews]
        </span>
        <h3 className="mt-3 font-display text-[1.35rem] font-medium text-ink">
          Real Google reviews load here.
        </h3>
        <p className="mx-auto mt-3 max-w-[60ch] text-[0.95rem] leading-[1.65] text-muted">
          This section will display genuine reviews from the Saggi Law Firm Google Business Profile — only authentic, verifiable client reviews.
        </p>
      </div>
    </ReviewsSection>
  );
}

/* ------------------- helpers ------------------- */

function ReviewsSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="reviews" className="bg-cream-warm py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="reveal mb-4 max-w-[720px]">
          <Eyebrow>Client reviews</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-medium leading-[1.15]">
            Client Reviews
          </h2>
        </div>
        <p className="reveal d1 mb-10 max-w-[720px] text-[1.05rem] leading-[1.7] text-muted">
          Choosing a criminal defence law firm is a significant decision, and feedback from previous clients can help people understand the experience of working with a legal professional.
        </p>
        {children}
      </div>
    </section>
  );
}

function ReviewsSummary({
  average,
  total,
  googleUrl,
}: {
  average: number;
  total: number;
  googleUrl: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-[14px] border border-rule bg-paper px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="font-display text-[3rem] font-medium leading-none tracking-[-0.02em] text-ink tabular-nums">
          {average.toFixed(1)}
        </div>
        <div>
          <StarRow rating={average} size="lg" />
          <div className="mt-1 text-[0.85rem] text-muted">
            {total.toLocaleString("en-CA")} Google review{total === 1 ? "" : "s"}
          </div>
        </div>
      </div>
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center gap-2 rounded-md border border-rule bg-cream px-3 py-2 font-body text-[0.82rem] font-semibold text-muted transition-colors hover:border-rust hover:text-rust"
      >
        <GoogleG /> View on Google
      </a>
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = (review.author_name || "?").charAt(0).toUpperCase();
  return (
    <article className="flex flex-col gap-4 rounded-[10px] border border-rule bg-paper p-7 shadow-brand-sm">
      <div className="flex items-center justify-between gap-3">
        <StarRow rating={review.rating} />
        <span aria-label="From Google" title="From Google">
          <GoogleG />
        </span>
      </div>
      <blockquote className="line-clamp-6 flex-1 text-[0.98rem] leading-[1.6] text-ink">
        {review.text || " "}
      </blockquote>
      <cite className="mt-auto flex items-center gap-3 border-t border-rule pt-4 not-italic">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-ink font-display font-medium text-gold">
          {initial}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-body text-[0.92rem] font-bold text-ink">
            {review.author_name}
          </span>
          <span className="block text-[0.78rem] text-muted">
            {review.relative_time_description}
          </span>
        </span>
      </cite>
    </article>
  );
}

function StarRow({ rating, size = "md" }: { rating: number; size?: "md" | "lg" }) {
  const rounded = Math.round(Math.max(0, Math.min(5, rating)));
  const cls = size === "lg" ? "text-[1.05rem]" : "text-[0.95rem]";
  return (
    <span
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      className={`inline-flex items-center gap-0.5 leading-none tracking-[0.05em] text-rust ${cls}`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} aria-hidden className={i < rounded ? "" : "text-rule"}>
          ★
        </span>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <span
      aria-hidden
      className="font-display text-[1rem] font-bold leading-none"
      style={{
        background:
          "linear-gradient(90deg, #4285F4, #EA4335 34%, #FBBC05 67%, #34A853)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      G
    </span>
  );
}

function GoogleAttribution() {
  return (
    <p className="text-center text-[0.78rem] text-muted">
      Reviews sourced directly from Google Business Profile via the Places API — refreshes every 24 hours.
    </p>
  );
}
