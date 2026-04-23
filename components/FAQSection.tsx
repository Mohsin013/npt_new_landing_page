"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const faqs = [
  {
    question: "Can you really build a product in 4 weeks?",
    answer:
      "Yes. Our process is optimized for speed without cutting corners. We focus on the core features that validate your idea and get you to market. After launch, we iterate based on real user feedback. Over 50 products have been built and shipped using this exact timeline.",
  },
  {
    question: "What if I'm not technical? How involved do I need to be?",
    answer:
      "You don't need any technical background. We act as your technical co-founder — you bring the vision and domain expertise, we handle the architecture, design, and development. You'll get daily updates and approve every major decision, but you won't need to write or read a single line of code.",
  },
  {
    question: "How much does it cost to build an MVP?",
    answer:
      "It depends on scope, but our 4-week MVP builds are a fraction of what you'd spend hiring even one senior developer for the same period. We'll give you a clear, fixed quote after a free consultation — no surprises, no hourly billing games.",
  },
  {
    question: "What tech stack do you use and will I own the code?",
    answer:
      "We build with React, Next.js, Node.js, and cloud infrastructure like AWS — the same tools behind Stripe, Vercel, and Notion. You own 100% of the code and IP. No lock-in, no proprietary frameworks. You can take it to any team.",
  },
  {
    question: "Can you fix or take over my existing project?",
    answer:
      "Absolutely. About 30% of our work is project rescue — fixing bugs, resolving performance issues, refactoring technical debt, and getting stalled products back on track. We'll audit your codebase and give you an honest assessment before committing.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is step one, not the finish line. We offer ongoing support packages for iteration, feature development, scaling, and maintenance. Most of our clients continue working with us after their initial launch because they trust our team and process.",
  },
];

export default function FAQSection() {
  return (
    <SectionWrapper
      badge="FAQ"
      title="Common Questions"
      subtitle="Straight answers to the questions we hear most."
    >
      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left" aria-label={faq.question}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </SectionWrapper>
  );
}
