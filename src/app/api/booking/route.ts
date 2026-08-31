import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/booking-schema";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Booking form submission handler.
 *
 * Delivery strategy (first match wins):
 *   1. Resend       — if RESEND_API_KEY is set (requires verified domain
 *                     in production; on the free tier before domain is
 *                     verified, from must be onboarding@resend.dev).
 *   2. FormSubmit   — zero-config fallback; the first submission triggers
 *                     a one-time email confirmation for the recipient.
 *   3. Dev log      — if neither is available, log to server console so
 *                     nothing is silently dropped in local development.
 */

export const runtime = "nodejs";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(input: {
  name: string;
  phone: string;
  email: string;
  matter: string;
  preferredTime?: string;
  message?: string;
}): { subject: string; html: string; text: string } {
  const subject = `New consultation request — ${input.name} (${input.matter})`;
  const lines: string[] = [
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `Matter: ${input.matter}`,
  ];
  if (input.preferredTime) lines.push(`Preferred time: ${input.preferredTime}`);
  if (input.message) {
    lines.push("");
    lines.push("Message:");
    lines.push(input.message);
  }
  const text = lines.join("\n");
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0B0A1F; line-height: 1.6;">
      <h2 style="font-family: Georgia, serif; color: #AD5207; margin: 0 0 16px;">New consultation request</h2>
      <p style="margin: 0 0 16px;"><strong>${escapeHtml(input.name)}</strong> submitted a booking request via saggilawfirm.com.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
        <tr><td style="padding: 8px 12px; background: #F5EFDB; font-weight: 600; width: 120px;">Name</td><td style="padding: 8px 12px; background: #FBF9ED;">${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding: 8px 12px; background: #F5EFDB; font-weight: 600;">Phone</td><td style="padding: 8px 12px; background: #FBF9ED;"><a href="tel:${escapeHtml(input.phone)}" style="color: #AD5207;">${escapeHtml(input.phone)}</a></td></tr>
        <tr><td style="padding: 8px 12px; background: #F5EFDB; font-weight: 600;">Email</td><td style="padding: 8px 12px; background: #FBF9ED;"><a href="mailto:${escapeHtml(input.email)}" style="color: #AD5207;">${escapeHtml(input.email)}</a></td></tr>
        <tr><td style="padding: 8px 12px; background: #F5EFDB; font-weight: 600;">Matter</td><td style="padding: 8px 12px; background: #FBF9ED;">${escapeHtml(input.matter)}</td></tr>
        ${input.preferredTime ? `<tr><td style="padding: 8px 12px; background: #F5EFDB; font-weight: 600;">Preferred time</td><td style="padding: 8px 12px; background: #FBF9ED;">${escapeHtml(input.preferredTime)}</td></tr>` : ""}
      </table>
      ${input.message ? `<div style="margin-top: 20px; padding: 16px; background: #FBF9ED; border-left: 3px solid #AD5207;"><strong style="display: block; margin-bottom: 8px;">Message</strong>${escapeHtml(input.message).replace(/\n/g, "<br>")}</div>` : ""}
      <p style="margin: 24px 0 0; font-size: 12px; color: #6B5D46;">Sent from the booking form at ${siteConfig.url}/booking</p>
    </div>
  `;
  return { subject, html, text };
}

async function sendViaResend(payload: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false as const };
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });
  if (error) throw new Error(error.message ?? "Resend send failed");
  return { sent: true as const, via: "resend" as const };
}

async function sendViaFormSubmit(payload: {
  to: string;
  subject: string;
  fields: Record<string, string>;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(payload.to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: payload.subject,
      _template: "table",
      _captcha: "false",
      ...payload.fields,
    }),
  });
  if (!res.ok) throw new Error(`FormSubmit failed: HTTP ${res.status}`);
  const json = (await res.json()) as { success?: string };
  return { sent: true as const, via: "formsubmit" as const, raw: json };
}

export async function POST(req: Request) {
  const to = siteConfig.contact.email;
  if (!to) {
    return NextResponse.json(
      { ok: false, error: "Recipient email is not configured." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form fields.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }
  /* Honeypot triggered — silently accept, do not send. */
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { subject, html, text } = renderEmail(parsed.data);

  try {
    const resendResult = await sendViaResend({
      to,
      replyTo: parsed.data.email,
      subject,
      html,
      text,
    });
    if (resendResult.sent) {
      return NextResponse.json({ ok: true, via: resendResult.via });
    }

    const formSubmitResult = await sendViaFormSubmit({
      to,
      subject,
      fields: {
        Name: parsed.data.name,
        Phone: parsed.data.phone,
        Email: parsed.data.email,
        Matter: parsed.data.matter,
        "Preferred time": parsed.data.preferredTime || "—",
        Message: parsed.data.message || "—",
      },
    });
    return NextResponse.json({ ok: true, via: formSubmitResult.via });
  } catch (err) {
    /* Last-resort: never lose a submission in dev — log to server console. */
    if (process.env.NODE_ENV !== "production") {
      console.error("[booking] delivery failed, dumping submission:", parsed.data, err);
      return NextResponse.json({ ok: true, via: "dev-log" });
    }
    return NextResponse.json(
      { ok: false, error: "Sorry — the message could not be delivered. Please call the office directly." },
      { status: 502 }
    );
  }
}
