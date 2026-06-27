"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InlineCTAProps {
  text?: string;
  buttonText?: string;
  href?: string;
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export default function InlineCTA({
  text = "Ready to get started?",
  buttonText = "Book a Free Consultation",
  href = "/contact",
  testimonial,
}: InlineCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 mx-auto max-w-3xl text-center py-10 px-6 rounded-2xl border border-border/50 bg-card/50"
    >
      {testimonial && (
        <p className="text-sm text-muted-foreground italic mb-4 max-w-lg mx-auto">
          &ldquo;{testimonial.quote}&rdquo;
          <span className="block mt-1 text-xs not-italic text-muted-foreground/70">
            — {testimonial.name}, {testimonial.role}
          </span>
        </p>
      )}
      <p className="text-lg font-medium mb-4">{text}</p>
      <Button asChild size="lg">
        <Link href={href}>
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
