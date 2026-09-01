"use client";

import { useState } from "react";
import { bookingMatters, bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { siteConfig } from "@/lib/siteConfig";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

const inputBase =
  "w-full rounded-md border border-rule bg-cream px-3.5 py-3 font-body text-[1.02rem] text-ink transition-colors focus:border-rust focus:bg-paper focus:outline focus:outline-2 focus:outline-rust";
const labelBase =
  "mb-1.5 block font-body text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted";
const errorText = "mt-1 text-[0.92rem] font-medium text-maple";

export function BookingForm({
  defaultMatter,
}: {
  /** Pre-select a Matter option — e.g. the sidebar on a service page
      passes the matter the visitor is actively reading about. */
  defaultMatter?: BookingInput["matter"];
} = {}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [issues, setIssues] = useState<Partial<Record<keyof BookingInput, string>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: BookingInput = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      matter: String(fd.get("matter") ?? "") as BookingInput["matter"],
      preferredTime: String(fd.get("preferredTime") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const first: Partial<Record<keyof BookingInput, string>> = {};
      (Object.keys(flat) as Array<keyof BookingInput>).forEach((k) => {
        const msgs = flat[k];
        if (msgs && msgs.length) first[k] = msgs[0];
      });
      setIssues(first);
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      return;
    }

    setIssues({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus({ kind: "ok" });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  if (status.kind === "ok") {
    return (
      <div className="rounded-[10px] border border-rule bg-paper p-8 text-center shadow-brand-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10">
          <svg
            width="36"
            height="36"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="text-success"
          >
            <circle
              cx="26"
              cy="26"
              r="23"
              className="check-circle-draw"
            />
            <path d="M14 27 l8 8 l16 -18" className="check-draw" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-[1.5rem] font-medium text-ink">
          Your request is with us.
        </h3>
        <p className="mt-3 text-[1rem] leading-[1.65] text-muted">
          Thank you. We&apos;ve received your consultation request and will be in touch shortly. For urgent matters, you can reach {siteConfig.name} directly at{" "}
          <a href={siteConfig.contact.phoneHref ?? "#"} className="font-semibold text-rust underline underline-offset-2">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-transparent px-5 py-2.5 text-[1.02rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* honeypot — hidden from users, bots often fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="bk-name" className={labelBase}>Your name</label>
        <input id="bk-name" name="name" type="text" required autoComplete="name" placeholder="First and last" className={inputBase} />
        {issues.name && <p className={errorText}>{issues.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-phone" className={labelBase}>Phone</label>
          <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(647) 555-0100" className={inputBase} />
          {issues.phone && <p className={errorText}>{issues.phone}</p>}
        </div>
        <div>
          <label htmlFor="bk-email" className={labelBase}>Email</label>
          <input id="bk-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputBase} />
          {issues.email && <p className={errorText}>{issues.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bk-matter" className={labelBase}>Matter</label>
        <select
          id="bk-matter"
          name="matter"
          required
          defaultValue={defaultMatter ?? bookingMatters[0]}
          className={inputBase}
        >
          {bookingMatters.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        {issues.matter && <p className={errorText}>{issues.matter}</p>}
      </div>

      <div>
        <label htmlFor="bk-time" className={labelBase}>
          Preferred time to reach you <span className="normal-case tracking-normal font-normal text-muted">(optional)</span>
        </label>
        <input id="bk-time" name="preferredTime" type="text" placeholder="e.g. Weekday mornings, or 6–8pm any day" className={inputBase} />
      </div>

      <div>
        <label htmlFor="bk-message" className={labelBase}>
          Briefly, what happened? <span className="normal-case tracking-normal font-normal text-muted">(optional)</span>
        </label>
        <textarea id="bk-message" name="message" rows={5} placeholder="Arrested at…, charge sheet says…, court date on…" className={`${inputBase} min-h-[120px] resize-y`} />
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="btn-shimmer mt-2 inline-flex items-center justify-center gap-2.5 rounded-md bg-rust px-8 py-4 font-body text-[1.02rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover hover:shadow-[0_8px_22px_rgba(173,82,7,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:transform-none"
      >
        {status.kind === "sending" ? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Sending…
          </>
        ) : (
          <>Request my consultation <span className="arrow-slide">→</span></>
        )}
      </button>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md border border-maple/40 bg-maple/[0.06] px-4 py-3 text-[1.02rem] text-maple">
          {status.message}
        </p>
      )}

      <p className="mt-1 text-[0.85rem] leading-[1.55] text-muted">
        Your message is protected by solicitor–client privilege from the first contact. By submitting, you agree to be contacted at the phone or email you provide.
      </p>
    </form>
  );
}
