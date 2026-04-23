"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  PenTool,
  Palette,
  Code,
  Rocket,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const steps = [
  {
    step: 1,
    icon: Lightbulb,
    phase: "Idea Validation",
    week: "Week 1",
    description: "We refine your concept and define the core features that matter.",
  },
  {
    step: 2,
    icon: PenTool,
    phase: "Wireframing",
    week: "Week 1",
    description: "Mapping out the user journey with low-fidelity blueprints.",
  },
  {
    step: 3,
    icon: Palette,
    phase: "Design & Prototype",
    week: "Week 2",
    description: "Creating a high-fidelity, interactive UI that looks premium.",
  },
  {
    step: 4,
    icon: Code,
    phase: "MVP Development",
    week: "Week 3",
    description: "Building the functional product using modern tech stacks.",
  },
  {
    step: 5,
    icon: Rocket,
    phase: "Launch",
    week: "Week 4",
    description: "Deploying your product to the world and gathering feedback.",
  },
];

export default function SolutionSection() {
  return (
    <SectionWrapper
      id="process"
      badge="Our Process"
      title="A Startup Studio for Non-Technical Founders"
      subtitle="We don't just write code. We act as your technical co-founder, guiding you through every step of the product lifecycle."
    >
      <motion.div
        variants={itemVariants}
        className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
      >
        <div className="gradient-bg rounded-full px-6 py-2 text-sm font-semibold text-white">
          All within 4 weeks
        </div>
        <span className="text-muted-foreground text-sm">
          Speed is our competitive advantage.
        </span>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />

        <div className="space-y-8">
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="relative flex gap-6 items-start"
            >
              <div className="relative z-10 shrink-0 hidden md:flex">
                <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                  {item.step}
                </div>
              </div>

              <div className="flex-1 group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="md:hidden w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs">
                    {item.step}
                  </div>
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {item.week}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.phase}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
