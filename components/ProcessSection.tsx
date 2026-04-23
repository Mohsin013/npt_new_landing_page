"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Palette,
  Code,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";

const phases = [
  {
    week: "Week 1",
    title: "Strategy & Architecture",
    icon: Target,
    description:
      "We define what to build and why. Product requirements, user flows, wireframes, and technical architecture — all validated before a single line of code.",
    deliverables: ["Product roadmap", "User journey maps", "Wireframes", "Technical spec"],
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    glow: "shadow-purple-400/5",
  },
  {
    week: "Week 2",
    title: "Design & Prototype",
    icon: Palette,
    description:
      "High-fidelity designs you can click through and test. You'll see exactly what your users will see — before we write code.",
    deliverables: ["UI/UX design system", "Interactive prototype", "Design handoff"],
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    glow: "shadow-blue-400/5",
  },
  {
    week: "Week 3",
    title: "Development & Integration",
    icon: Code,
    description:
      "Frontend, backend, APIs, and third-party integrations. Built with production-grade code and daily progress updates.",
    deliverables: ["Full-stack development", "API integrations", "Database setup"],
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    glow: "shadow-cyan-400/5",
  },
  {
    week: "Week 4",
    title: "Testing & Launch",
    icon: Rocket,
    description:
      "Rigorous QA, performance optimization, and deployment to production. Your product goes live with real users.",
    deliverables: ["QA & testing", "Performance tuning", "Production deployment"],
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "shadow-emerald-400/5",
  },
];

export default function ProcessSection() {
  return (
    <SectionWrapper
      id="process"
      badge="How It Works"
      title="From Idea to Launch in 4 Weeks"
      subtitle="A battle-tested process designed for speed without sacrificing quality. Every step is transparent — you'll never wonder what's happening."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {phases.map((phase, i) => (
          <motion.div key={phase.week} variants={itemVariants}>
            <TiltCard tiltAmount={5} className="h-full">
              <div className={`relative h-full rounded-xl border ${phase.border} bg-card p-6 shadow-lg ${phase.glow}`}>
                <div className={`inline-flex items-center gap-2 ${phase.bg} ${phase.color} rounded-full px-3 py-1 text-xs font-semibold mb-4`}>
                  <phase.icon className="h-3.5 w-3.5" />
                  {phase.week}
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {phase.description}
                </p>
                <ul className="space-y-1.5">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={`w-1 h-1 rounded-full ${phase.color.replace("text-", "bg-")}`} />
                      {d}
                    </li>
                  ))}
                </ul>
                {i < phases.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
          <Rocket className="h-4 w-4" />
          You get a live product — not a slide deck.
        </div>
        <div className="pt-2">
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">
                Start Your 4-Week Sprint
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </MagneticButton>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
