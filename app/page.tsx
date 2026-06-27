import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import ProductPreview from "@/components/ProductPreview";
import TechMarquee from "@/components/TechMarquee";
import TextReveal from "@/components/TextReveal";
import ProblemSolution from "@/components/ProblemSolution";
import BentoGrid from "@/components/BentoGrid";
import ProcessSection from "@/components/ProcessSection";
import ROICalculator from "@/components/ROICalculator";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import Portfolio from "@/components/Portfolio";
import ComparisonTable from "@/components/ComparisonTable";
import TestimonialWall from "@/components/TestimonialWall";
import PricingPreview from "@/components/PricingPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import CredibilityBar from "@/components/CredibilityBar";
import CTASection from "@/components/CTASection";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofToast from "@/components/SocialProofToast";
import InlineCTA from "@/components/InlineCTA";
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
      <ClientLogos />
      <ProductPreview />
      <TechMarquee />
      <TextReveal text="We don't just build software. We build the products that become your competitive advantage — shipped fast, built to scale, owned entirely by you." />
      <ProblemSolution />
      <BentoGrid />
      <InlineCTA
        text="Have a project in mind?"
        buttonText="Get a Free Estimate"
        testimonial={{
          quote: "NorthPeak delivered a complete, scalable solution. They're the most professional team I've worked with.",
          name: "Sruti Pujari",
          role: "Founder, Feel Your Best",
        }}
      />
      <ProcessSection />
      <ROICalculator />
      <CaseStudySpotlight />
      <Portfolio />
      <InlineCTA
        text="Want results like these?"
        buttonText="Start Your Project Today"
        testimonial={{
          quote: "The impact was visible within the first week. Professional work that directly affected our bottom line.",
          name: "Azad Arsalan",
          role: "MD, Retrofire and Safety",
        }}
      />
      <ComparisonTable />
      <TestimonialWall />
      <PricingPreview />
      <WhyChooseUs />
      <FAQSection />
      <CredibilityBar />
      <CTASection />
      <FloatingCTA />
      <ExitIntentPopup />
      <SocialProofToast />
    </>
  );
}
