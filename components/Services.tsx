"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Wrench,
  Code,
  Smartphone,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { MagneticButton } from "@/components/ui/magnetic-button";

const services = [
  {
    icon: Rocket,
    title: "4-Week MVP Development",
    problem: "Your idea is stuck in your head",
    outcome: "A live, functional product with real users — in 30 days.",
    description:
      "We handle strategy, design, development, and deployment so you can focus on your business. You get a production-ready product, not a prototype.",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    problem: "Manual processes are eating your margins",
    outcome: "Intelligent systems that work while you sleep.",
    description:
      "Custom LLM integrations, automated workflows, AI chatbots, and predictive analytics — tailored to your business, not off-the-shelf.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Code,
    title: "Web & SaaS Development",
    problem: "You need a platform that scales with you",
    outcome: "High-performance apps built for growth from day one.",
    description:
      "Full-stack web applications, SaaS platforms, and high-conversion landing pages using Next.js, React, and modern cloud infrastructure.",
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    problem: "Your users expect a native mobile experience",
    outcome: "Cross-platform apps that feel native on every device.",
    description:
      "iOS and Android apps built with Flutter and React Native. One codebase, two platforms, zero compromise on performance.",
    gradient: "from-emerald-500/20 to-yellow-500/20",
  },
  {
    icon: Wrench,
    title: "Project Rescue & Refactoring",
    problem: "Your current codebase is a liability",
    outcome: "Clean, stable code that your team can actually build on.",
    description:
      "We fix the bugs, eliminate technical debt, and refactor legacy systems so you can ship features again instead of fighting fires.",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    problem: "Deployments are manual, slow, and risky",
    outcome: "Automated pipelines that deploy with confidence.",
    description:
      "AWS infrastructure, CI/CD automation, containerization, and monitoring. We set up the systems so your team can ship without downtime.",
    gradient: "from-orange-500/20 to-purple-500/20",
  },
];

export default function Services() {
  return (
    <SectionWrapper
      id="services"
      badge="Services"
      title="What We Build"
      subtitle="Six core services. Each designed to solve a specific problem and deliver a measurable outcome."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <motion.div key={service.title} variants={itemVariants}>
            <TiltCard tiltAmount={6} className="h-full">
              <div className="h-full rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />
                <div className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-xs text-destructive/80 font-medium mb-1 uppercase tracking-wide">
                    {service.problem}
                  </p>
                  <p className="text-sm font-medium text-success mb-3">{service.outcome}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="text-center">
        <MagneticButton>
          <Button asChild size="lg">
            <Link href="/services">
              Explore All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </MagneticButton>
      </motion.div>
    </SectionWrapper>
  );
}
