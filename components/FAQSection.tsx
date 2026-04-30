"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { faqs } from "@/components/StructuredData";

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
