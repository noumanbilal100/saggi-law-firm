import { z } from "zod";

/**
 * Shape shared by the client form + server API route so both validate the
 * same fields with the same rules.
 */
export const bookingMatters = [
  "Bail hearing",
  "Impaired driving / DUI",
  "Assault or domestic assault",
  "Drug offences",
  "Firearms & weapons",
  "Theft, robbery, mischief, B&E",
  "Criminal harassment",
  "Fraud / white collar",
  "Young offender matter",
  "Attestation / Commissioner of Oaths",
  "Other criminal matter",
] as const;

export type BookingMatter = (typeof bookingMatters)[number];

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach.")
    .max(30),
  email: z.string().trim().email("Please enter a valid email address."),
  matter: z.enum(bookingMatters),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /* Simple honeypot — a real user leaves this blank. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/**
 * Map a service page slug to the closest booking-matter option so the
 * sidebar form can pre-select the right value when a visitor lands on
 * a service page. Falls back to "Other criminal matter" for anything
 * that doesn't map cleanly, and undefined for non-service contexts so
 * the caller can leave the dropdown on its own default.
 */
export function matterForService(slug: string | undefined | null): BookingMatter | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();

  if (s.startsWith("other-services")) return "Attestation / Commissioner of Oaths";
  if (s === "young-offenders") return "Young offender matter";
  if (s.includes("impaired") || s.includes("dui") || s.includes("over-80"))
    return "Impaired driving / DUI";
  if (s.includes("bail")) return "Bail hearing";
  if (s.includes("firearm") || s.includes("weapon")) return "Firearms & weapons";
  if (s.includes("assault") || s.includes("domestic")) return "Assault or domestic assault";
  if (s.includes("harassment")) return "Criminal harassment";
  if (
    s.includes("white-collar") ||
    s.includes("proceeds-of-crime") ||
    s.includes("fraud")
  )
    return "Fraud / white collar";
  if (
    s.includes("theft") ||
    s.includes("robbery") ||
    s.includes("mischief") ||
    s.includes("breaking-and-entering") ||
    s.includes("break-and-enter")
  )
    return "Theft, robbery, mischief, B&E";
  if (s.includes("drug")) return "Drug offences";

  return "Other criminal matter";
}
