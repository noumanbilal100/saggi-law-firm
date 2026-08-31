import { siteConfig } from "@/lib/siteConfig";

/**
 * Server-side fetch of Google Business Profile reviews via the Places
 * Details API (legacy endpoint — stable, well-documented, returns reviews
 * out of the box when the Place is a Google Business Profile).
 *
 * Cached with Next's `revalidate` for 24 hours so the home page renders
 * near-instant and we stay well within the free tier (~30 requests/mo
 * per deployment). Never fires from the browser — the API key stays
 * server-side.
 *
 * Returns null when either the Place ID or the API key is missing, when
 * the API responds with an error, or when the response has no reviews.
 * Callers must handle null and render a graceful fallback.
 */

export type GoogleReview = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
};

export type GoogleReviewsData = {
  name: string;
  rating: number;
  user_ratings_total: number;
  url: string;
  reviews: GoogleReview[];
};

type PlacesDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: GoogleReview[];
  };
};

const ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";
const FIELDS = "name,rating,user_ratings_total,url,reviews";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 hours

export async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const placeId = siteConfig.google.placeId;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  const url = `${ENDPOINT}?place_id=${encodeURIComponent(
    placeId
  )}&fields=${encodeURIComponent(FIELDS)}&reviews_sort=newest&language=en&key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.warn(`[google-reviews] HTTP ${res.status} from Places API`);
      return null;
    }
    const data = (await res.json()) as PlacesDetailsResponse;
    if (data.status !== "OK" || !data.result) {
      console.warn(
        `[google-reviews] status=${data.status} message=${data.error_message ?? ""}`
      );
      return null;
    }
    const r = data.result;
    if (!r.reviews || r.reviews.length === 0) return null;
    return {
      name: r.name ?? siteConfig.name,
      rating: r.rating ?? 0,
      user_ratings_total: r.user_ratings_total ?? 0,
      url: r.url ?? siteConfig.google.reviewsUrl ?? siteConfig.url,
      reviews: r.reviews,
    };
  } catch (err) {
    console.warn("[google-reviews] fetch failed:", err);
    return null;
  }
}
