/**
 * Hand-curated Google reviews for the home page Reviews section.
 *
 * Rendered by `ReviewsSlider` on the home page when `manualReviews`
 * has entries — takes priority over the Places-API path and the
 * "See reviews on Google" fallback in `Reviews.tsx`. The Trustindex
 * widget was retired when its 7-day trial expired; this replaces it
 * with real reviews copied by hand from the Google Business Profile.
 *
 * To edit: keep the shape below. Add new reviews at the top of the
 * array (newest first). Twelve is the sweet spot for a slider; more
 * is fine, the carousel just gets longer.
 */

export type ManualReview = {
  /** Reviewer's display name as shown on Google. */
  author_name: string;
  /**
   * Google-embed sub-line under the name — e.g.
   * "Local Guide · 9 reviews · 1 photo" or "3 reviews".
   * Copy this verbatim from Google so the card reads authentic.
   */
  credentials: string;
  /** 1–5 stars — Google reviews are integer ratings. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Full review text. Newlines are preserved inside the card. */
  text: string;
  /**
   * Google-style relative timestamp — "a week ago", "2 months ago",
   * "a year ago". Copy this exactly from the Google review so the
   * card matches what viewers see if they click through.
   */
  relative_time_description: string;
};

/**
 * Aggregate stats shown in the summary strip above the slider —
 * matched to the live Google Business Profile as of 2026-09-01.
 * Update these together with the array below.
 */
export const manualReviewsSummary = {
  average: 4.8,
  total: 93,
};

/**
 * Real reviews from the Saggi Law Firm Google Business Profile.
 * Newest first. Twelve selected across five years to show sustained
 * quality (not just a burst of recent posts).
 */
export const manualReviews: ManualReview[] = [
  {
    author_name: "LAKHVEER SINGH",
    credentials: "2 reviews",
    rating: 5,
    text: "Mr. Saggi is a very good lawyer. Very hardworking. He listens very politely and available all the time whenever you need to ask something he will be answer you everything. He helped me to dropped charges of assault with weapon. He is the best lawyer in Ontario.",
    relative_time_description: "a month ago",
  },
  {
    author_name: "Paramdip Chhokar",
    credentials: "Local Guide · 9 reviews · 1 photo",
    rating: 5,
    text: "I had a great experience with Saggi Law Firm. The team was professional, knowledgeable, and always took the time to explain everything clearly throughout the process. They were responsive, supportive, and made me feel confident that my case was in the right hands.",
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Kiran Dhaliwal",
    credentials: "Local Guide · 17 reviews · 3 photos",
    rating: 5,
    text: "TRUST HIM BLINDLY, HE WILL NOT LET YOU DOWN.\n\nI am extremely grateful to Mandeep S. Saggi and Saggi Law Firm for handling my case with outstanding professionalism and dedication. Mr. Saggi gave me a new lease on life.",
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Jesse James",
    credentials: "Local Guide · 83 reviews · 33 photos",
    rating: 5,
    text: "I was referred to Mr. Saggi through a friend after I was charged criminally. He was knowledgeable and prompt with his replies the whole time. He sped up the proceedings and got the whole thing taken care of within a few months.",
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Gagan Kang",
    credentials: "Local Guide · 15 reviews",
    rating: 5,
    text: "Mr. Saggi provided outstanding support with my friend's case. His expertise, professionalism, and attention to detail truly set him apart. He made a difficult situation much easier to navigate. I highly recommend him to anyone looking for a reliable and highly skilled lawyer.",
    relative_time_description: "5 months ago",
  },
  {
    author_name: "Mohammed Khan",
    credentials: "16 reviews",
    rating: 5,
    text: "Recently I got a stunt driving ticket and it made my situation very bad. I didn't know what to do in that moment because it's my 1st traffic conviction in Canada. I contacted Manny sir from Saggi Law Firm — he handled my situation very well and helped me to fight my ticket. Thank you so much sir.",
    relative_time_description: "6 months ago",
  },
  {
    author_name: "puneet arora",
    credentials: "Local Guide · 21 reviews",
    rating: 5,
    text: "I heard about Mr Saggi a while ago as he helped my friend for his case. So I didn't even think once before hiring him. He is the best lawyer with a positive attitude. Throughout the entire process he was professional, supportive and always available.",
    relative_time_description: "a year ago",
  },
  {
    author_name: "Amit Meet",
    credentials: "Local Guide · 18 reviews · 6 photos",
    rating: 5,
    text: "Mr. Saggi is the best lawyer in Brampton. I found myself in a very difficult situation with serious charges from my wife. From our first meeting, Mr. Saggi demonstrated a deep understanding of the law and a genuine commitment to my case.",
    relative_time_description: "2 years ago",
  },
  {
    author_name: "jaspreet singh",
    credentials: "Local Guide · 12 reviews",
    rating: 5,
    text: "Mandeep Saggi is the best criminal lawyer. I had a careless driving charge on me. Before I hired Mandeep I was a bit nervous about my case. I did not think that anyone would be able to solve my case — even Mandeep also said there would be some difficulty — but he won it for me.",
    relative_time_description: "2 years ago",
  },
  {
    author_name: "Abhinav Soni",
    credentials: "3 reviews",
    rating: 5,
    text: "Mr. Saggi is an amazing lawyer and very professional. He is always in touch and keeps you informed about the case. He helped me a lot to get my charges dropped. I highly recommend him as he is one of the best lawyers.",
    relative_time_description: "2 years ago",
  },
  {
    author_name: "Aman Dhinsa",
    credentials: "8 reviews",
    rating: 5,
    text: "Mandeep is an excellent criminal lawyer, hands down! He went above and beyond his duties as a criminal lawyer. I surely recommend him to anyone who is seeking a lawyer.",
    relative_time_description: "2 years ago",
  },
  {
    author_name: "Yashdeep Singh",
    credentials: "3 reviews",
    rating: 5,
    text: "Mandeep Saggi is the best lawyer you can hire. He helped withdraw my charges in a very short period of time. Moreover he is very courteous and well informed about the law. I would definitely recommend him. Thanks again Mr. Saggi for helping me out.",
    relative_time_description: "4 years ago",
  },
];
