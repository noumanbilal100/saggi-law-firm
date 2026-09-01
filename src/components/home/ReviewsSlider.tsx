"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ManualReview } from "@/lib/manualReviews";

/**
 * Google-embed-styled reviews carousel.
 *
 * Native CSS scroll-snap track (no library, no swipe polyfill) with
 * accessible prev/next buttons and dot indicators. Cards mirror the
 * Google Business Profile embed: coloured avatar with initial,
 * name + credentials, source "G" mark, `#FBBC04` stars, review text.
 *
 * Client-side because the dot state and button scroll depend on
 * runtime measurements; the parent `Reviews` section stays a server
 * component and passes reviews in via props.
 */

/**
 * Google-material palette for avatar backgrounds — the same tones
 * Google's own embed picks from when a reviewer has no photo. Kept
 * deterministic (indexed by initial char code) so a reviewer's tile
 * doesn't flip colour on every render.
 */
const AVATAR_COLORS = [
  "#DB4437", // red
  "#4285F4", // blue
  "#0F9D58", // green
  "#F4B400", // yellow
  "#AB47BC", // purple
  "#00ACC1", // cyan
  "#FF7043", // deep orange
  "#7986CB", // indigo
];

function avatarColor(name: string): string {
  const code = name.charCodeAt(0) || 0;
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

/** Milliseconds between auto-slide advances. Long enough to read a
    short review at a glance; hover, keyboard focus, and off-screen
    all pause the timer. */
const AUTOPLAY_INTERVAL = 5500;

export function ReviewsSlider({
  reviews,
  googleUrl,
}: {
  reviews: ManualReview[];
  /** Where each card links to. Google doesn't expose stable per-review
      deep links, so every card opens the same GBP reviews page — the
      reader lands one scroll away from the review they clicked. */
  googleUrl: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* Scroll to a specific card by index. `advanceOrLoop` wraps past
     the end back to the start so the slider never dead-ends. */
  const scrollToIdx = useCallback((idx: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-review-card]")[idx];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  /* Scroll by one card width + the gap, in whichever direction. */
  const scrollByOne = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const gap = 24; // matches the `gap-6` on the track
    const step = card ? card.offsetWidth + gap : 400;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  /* Update dot + button state as the user scrolls, using the DOM as
     the source of truth so keyboard / touch / mouse-wheel scrolling
     all agree with the button-driven state. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-review-card]"),
      );
      if (cards.length === 0) return;

      const trackRect = track.getBoundingClientRect();
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);
      setCanPrev(track.scrollLeft > 4);
      setCanNext(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
      );
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reviews]);

  const goTo = (i: number) => scrollToIdx(i);

  /* Track visibility so autoplay only runs when the section is on
     screen — a slider ticking off-screen wastes cycles and moves
     focus/scroll state the reader isn't looking at. */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    obs.observe(wrapper);
    return () => obs.disconnect();
  }, []);

  /* Autoplay. Advances one card every AUTOPLAY_INTERVAL ms, wraps
     back to card 0 when we reach the end, and honours reduced-motion,
     hover / focus pause, and off-screen pause. */
  useEffect(() => {
    if (isPaused || !isVisible) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByOne(1);
      }
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [isPaused, isVisible, scrollByOne]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Chevron buttons — hidden on the narrowest phones where the
          finger-swipe on a touch surface is the natural interaction. */}
      <button
        type="button"
        aria-label="Previous reviews"
        onClick={() => scrollByOne(-1)}
        disabled={!canPrev}
        className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule bg-paper text-ink shadow-brand-sm transition-all hover:border-rust hover:text-rust disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink sm:grid sm:h-11 sm:w-11 md:-translate-x-1/3 lg:-translate-x-1/2"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next reviews"
        onClick={() => scrollByOne(1)}
        disabled={!canNext}
        className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule bg-paper text-ink shadow-brand-sm transition-all hover:border-rust hover:text-rust disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink sm:grid sm:h-11 sm:w-11 md:translate-x-1/3 lg:translate-x-1/2"
      >
        <ChevronRight />
      </button>

      {/* Track. `scroll-snap-mandatory` locks cards to the left edge;
          the scrollbar is hidden but keyboard / wheel / touch all
          still work. */}
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews from Google"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-rust/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-warm"
      >
        {reviews.map((review, i) => (
          <ReviewCard
            key={`${review.author_name}-${i}`}
            review={review}
            googleUrl={googleUrl}
          />
        ))}
      </div>

      {/* Dot indicators. Active dot is a rust pill, inactive dots are
          small rule-coloured circles that grow to muted on hover. */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review ${i + 1} of ${reviews.length}`}
            aria-current={activeIdx === i ? "true" : undefined}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIdx === i
                ? "w-7 bg-rust"
                : "w-2 bg-rule hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- card ---------------------------- */

function ReviewCard({
  review,
  googleUrl,
}: {
  review: ManualReview;
  googleUrl: string;
}) {
  const initial = (review.author_name.trim().charAt(0) || "?").toUpperCase();
  const bg = avatarColor(review.author_name);

  /* Whole card is a link — Google doesn't expose a per-review URL,
     so every card opens the GBP reviews page. `group` lets nested
     bits (footer hint, border) react to hover / focus without extra
     JS state. */
  return (
    <a
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read this review from ${review.author_name} on Google (opens in a new tab)`}
      data-review-card
      className="group flex w-[calc(100vw-3.5rem)] max-w-[380px] shrink-0 snap-start flex-col gap-4 rounded-[14px] border border-rule bg-paper p-6 no-underline shadow-brand-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rust/40 hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-warm sm:w-[380px] md:w-[400px]"
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden
          className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full font-body text-[1.05rem] font-medium text-white"
          style={{ background: bg }}
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate font-body text-[0.98rem] font-bold text-ink">
            {review.author_name}
          </div>
          <div className="truncate text-[0.78rem] text-muted">
            {review.credentials}
          </div>
        </div>
        <GoogleG />
      </header>

      <div className="flex items-center gap-2 text-[0.82rem] text-muted">
        <StarRow rating={review.rating} />
        <span aria-hidden>·</span>
        <span>{review.relative_time_description}</span>
      </div>

      <blockquote className="whitespace-pre-line text-[0.94rem] leading-[1.65] text-ink">
        {review.text}
      </blockquote>

      {/* Hover hint — kept subtle (mt-auto pins it to card bottom).
          Only visible on hover / focus so at rest the card reads
          like a plain testimonial card, not a busy link. */}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.78rem] font-semibold text-rust opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Read on Google
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </a>
  );
}

/* ------------------------- decorations ------------------------- */

function StarRow({ rating }: { rating: number }) {
  const rounded = Math.round(Math.max(0, Math.min(5, rating)));
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-0.5 text-[1rem] leading-none tracking-[0.06em]"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          style={{ color: i < rounded ? "#FBBC04" : "#DADCE0" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <span
      aria-label="Sourced from Google"
      title="Sourced from Google"
      className="flex-shrink-0 font-display text-[1.1rem] font-bold leading-none"
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

function ChevronLeft() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
