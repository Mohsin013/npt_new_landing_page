"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Code,
  Smartphone,
  Wrench,
  Cloud,
  Zap,
  BarChart3,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const features = [
  {
    icon: Rocket,
    title: "4-Week Sprints",
    description: "Idea to production in 30 days. Not an estimate — a guarantee.",
    gradient: "from-purple-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-2",
    size: "large",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Custom LLMs, automation pipelines, and intelligent agents.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    span: "md:col-span-1",
    size: "small",
  },
  {
    icon: Zap,
    title: "Production-Grade",
    description: "Built to scale from day one. No rewrites later.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    span: "md:col-span-1",
    size: "small",
  },
  {
    icon: Code,
    title: "Full-Stack Web & SaaS",
    description: "Next.js, React, Node.js — the same stack behind Stripe and Vercel.",
    gradient: "from-cyan-500/20 to-emerald-500/20",
    span: "md:col-span-1",
    size: "small",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobile",
    description: "iOS + Android from one codebase. Flutter & React Native.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    span: "md:col-span-1",
    size: "small",
  },
  {
    icon: Wrench,
    title: "Project Rescue",
    description: "We fix broken codebases and eliminate technical debt so you can ship again.",
    gradient: "from-orange-500/20 to-red-500/20",
    span: "md:col-span-1 md:row-span-1",
    size: "small",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS, CI/CD, containers — automated pipelines that deploy with confidence.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    span: "md:col-span-1",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Analytics & Growth",
    description: "Data pipelines, dashboards, and growth systems built in from the start.",
    gradient: "from-pink-500/20 to-purple-500/20",
    span: "md:col-span-2",
    size: "wide",
  },
];

export default function BentoGrid() {
  return (
    <SectionWrapper
      id="services"
      badge="What We Build"
      title="Everything You Need to Ship"
      subtitle="Full-stack product engineering — from idea to scale."
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className={`group relative ${feature.span}`}
          >
            <div className="relative h-full rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ "--gradient-angle": "0deg" } as React.CSSProperties}>
                <div className="absolute inset-[-1px] rounded-2xl bg-[conic-gradient(from_var(--gradient-angle),hsl(263_70%_58%),hsl(217_91%_53%),hsl(142_71%_45%),hsl(263_70%_58%))] animate-gradient-rotate" />
                <div className="absolute inset-[1px] rounded-2xl bg-card" />
              </div>

              {/* Top gradient accent */}
              <div className={`h-px bg-gradient-to-r ${feature.gradient} opacity-60`} />

              <div className={`relative p-6 ${feature.size === "large" ? "md:p-8" : ""} flex flex-col h-full`}>
                <div className={`mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className={`font-semibold mb-2 ${feature.size === "large" ? "text-xl md:text-2xl" : "text-base"}`}>
                  {feature.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${feature.size === "large" ? "text-base" : "text-sm"}`}>
                  {feature.description}
                </p>

                {feature.size === "large" && (
                  <div className="mt-auto pt-6">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "50+", label: "Shipped" },
                        { value: "4wk", label: "Average" },
                        { value: "98%", label: "Satisfaction" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/30 border border-border/50">
                          <div className="text-lg font-bold gradient-text">{stat.value}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
