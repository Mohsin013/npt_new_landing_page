"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, DollarSign, AlertTriangle, Scaling, ArrowRight } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";

const problems = [
  {
    icon: Clock,
    problem: "You've been planning for months but haven't shipped anything",
    cost: "Every week without a product is a week your competitors gain ground.",
    solution: "We get you from concept to live product in 4 weeks — not 4 months.",
  },
  {
    icon: DollarSign,
    problem: "Hiring a full engineering team burns runway fast",
    cost: "A senior dev, designer, and DevOps engineer can cost $30k+/month.",
    solution: "Get an entire product team on demand — for a fraction of the cost.",
  },
  {
    icon: AlertTriangle,
    problem: "Your existing product is broken and bleeding users",
    cost: "Legacy code, slow performance, and technical debt are killing growth.",
    solution: "We rescue failing codebases and turn them into assets that scale.",
  },
  {
    icon: Scaling,
    problem: "You need AI but don't know where to start",
    cost: "Off-the-shelf tools don't fit. Custom AI expertise is impossible to hire.",
    solution: "We build custom AI integrations tailored to your specific business logic.",
  },
];

export default function ProblemSolution() {
  return (
    <SectionWrapper
      badge="The Problem"
      title="Problems We Solve for Startups & Businesses"
      subtitle="These are the exact problems our clients had before they found us."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {problems.map((item) => (
          <motion.div
            key={item.problem}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
            className="group rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold leading-snug">{item.problem}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3 pl-14">
              {item.cost}
            </p>
            <p className="text-sm font-medium text-success pl-14">
              {item.solution}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">
            Tell Us Your Challenge
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
