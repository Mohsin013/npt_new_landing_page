import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind 50+ product launches. Learn why startups and businesses trust NorthPeak to build their most critical software.",
  alternates: {
    canonical: "https://northpeaktechnologies.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
