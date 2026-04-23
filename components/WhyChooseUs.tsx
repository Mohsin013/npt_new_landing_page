"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users, Eye, Code, Headphones } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const differentiators = [
  {
    icon: Zap,
    title: "4-Week Delivery, Guaranteed",
    description: "Not an estimate. A commitment. You get a live, functional product in 30 days or we keep working at no extra cost.",
  },
  {
    icon: Shield,
    title: "Production-Grade From Day One",
    description: "We don't build throwaway prototypes. Every line of code is written to scale — because rebuilding later costs 10x more.",
  },
  {
    icon: Users,
    title: "Your Technical Co-Founder",
    description: "We don't just take orders. We challenge assumptions, suggest better approaches, and help you make product decisions that matter.",
  },
  {
    icon: Eye,
    title: "Full Transparency, Daily Updates",
    description: "No disappearing for weeks. You get daily progress updates, access to the codebase, and a direct line to your engineering team.",
  },
  {
    icon: Code,
    title: "Modern Stack, No Lock-In",
    description: "React, Next.js, Node.js, AWS — the same tools powering Stripe and Vercel. You own everything. Take it anywhere.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    description: "Launch is just the beginning. We stay on for iteration, scaling, and support so you're never left on your own.",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper
      badge="Why NorthPeak"
      title="What Makes Us Different"
      subtitle="We've worked with 50+ founders and businesses. Here's why they chose us over agencies, freelancers, and in-house teams."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {differentiators.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
