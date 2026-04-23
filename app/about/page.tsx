import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NorthPeak Technologies is the engineering team behind 50+ successful product launches. Meet the founders and learn why startups and businesses trust us to build their most critical software.",
};

export default function AboutPage() {
  return <AboutContent />;
}
