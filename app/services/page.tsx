import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "MVP development, AI solutions, web & mobile apps, project rescue, and cloud infrastructure. Six focused services designed to get your product shipped and scaled.",
  alternates: {
    canonical: "https://northpeaktechnologies.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
