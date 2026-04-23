"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Palette,
  Code,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const weeks = [
  {
    week: 1,
    title: "Strategy + Wireframes",
    icon: ClipboardList,
    quote: "Defining product roadmap, user flows, and core architecture.",
    deliverables: [
      "Product requirements document",
      "User journey mapping",
      "Wireframe designs",
    ],
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    week: 2,
    title: "Design + Prototype",
    icon: Palette,
    quote: "High-fidelity UI design and interactive clickable prototypes.",
    deliverables: [
      "UI/UX design system",
      "Interactive prototypes",
      "Design handoff files",
    ],
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    week: 3,
    title: "Development",
    icon: Code,
    quote: "Coding the frontend, backend, and integrating essential APIs.",
    deliverables: [
      "Frontend development",
      "Backend API development",
      "Third-party integrations",
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    week: 4,
    title: "Testing + Launch",
    icon: CheckCircle2,
    quote: "Rigorous QA, bug fixing, and deployment to production.",
    deliverables: [
      "Quality assurance testing",
      "Bug fixing & optimization",
      "Production deployment",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
];

export default function TimelineSection() {
  return (
    <SectionWrapper
      badge="4 Weeks to Launch"
      title="How 4 Week MVP Works"
      subtitle="A battle-tested process designed for speed and quality."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weeks.map((item) => (
          <motion.div
            key={item.week}
            variants={itemVariants}
            className={`group relative rounded-xl border ${item.border} bg-card p-6 hover:-translate-y-2 transition-all duration-300`}
          >
            <div className={`inline-flex items-center gap-2 ${item.bg} ${item.color} rounded-full px-3 py-1 text-xs font-semibold mb-4`}>
              <item.icon className="h-3.5 w-3.5" />
              Week {item.week}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground italic mb-4 border-l-2 border-border pl-3">
              {item.quote}
            </p>
            <ul className="space-y-2">
              {item.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className={`h-4 w-4 ${item.color} shrink-0 mt-0.5`} />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 gradient-bg rounded-full px-6 py-3 text-white font-semibold shadow-lg shadow-primary/20">
          <Rocket className="h-4 w-4" />
          Your MVP is ready to launch!
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
