import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Saggi Law Firm to arrange a consultation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection />;
}
