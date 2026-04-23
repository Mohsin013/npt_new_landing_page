import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your project with NorthPeak Technologies. Book a free consultation, get a clear roadmap and fixed-price quote. We respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
