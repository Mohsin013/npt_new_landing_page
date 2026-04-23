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
import { StructuredData, faqSchema } from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData data={faqSchema} />
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
