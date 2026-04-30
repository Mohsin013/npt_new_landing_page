import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import {
  StructuredData,
  faqSchema,
  serviceSchema,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  description:
    "NorthPeak Technologies builds production-ready MVPs, AI solutions, and web & mobile apps in 4 weeks. Trusted by 50+ founders. Get a free consultation today.",
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <Hero />
      <TechMarquee />
      <ProblemSolution />
      <Services />
      <ProcessSection />
      <Portfolio />
      <Testimonials />
      <WhyChooseUs />
      <FAQSection />
      <CTASection />
    </>
  );
}
