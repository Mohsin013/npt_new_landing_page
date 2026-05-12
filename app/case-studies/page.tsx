import type { Metadata } from "next";
import CaseStudiesContent from "./CaseStudiesContent";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real projects, real results. See how NorthPeak Technologies has helped startups and businesses ship production-ready software across AI, web, mobile, and cloud.",
  alternates: {
    canonical: "https://northpeaktechnologies.com/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
