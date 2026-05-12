"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Code,
  Smartphone,
  Wrench,
  Cloud,
  TestTube,
  Database,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Rocket,
    title: "4-Week MVP Development",
    tagline: "Go from idea to live product in 30 days.",
    description:
      "Our flagship service. We handle the full product lifecycle — strategy, design, development, and deployment — so you can focus on your business. You don't need a technical background. You need a technical partner.",
    includes: [
      "Product strategy & requirements",
      "UI/UX design & interactive prototype",
      "Full-stack development",
      "Cloud deployment & launch",
      "Post-launch support",
    ],
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    tagline: "Turn manual processes into intelligent systems.",
    description:
      "Custom AI integrations built for your specific business logic — not generic chatbots. We build LLM-powered features, automated workflows, intelligent analytics, and AI-driven customer support that actually work.",
    includes: [
      "Custom LLM & GPT integrations",
      "Automated content & data workflows",
      "AI-powered analytics & insights",
      "Intelligent chatbots & support",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Code,
    title: "Web & SaaS Development",
    tagline: "High-performance platforms built to scale.",
    description:
      "Full-stack web applications, SaaS products, admin dashboards, and high-converting marketing sites. Built with Next.js, React, and modern cloud infrastructure for speed and reliability.",
    includes: [
      "SaaS platform development",
      "High-conversion landing pages",
      "Admin dashboards & portals",
      "API development & integrations",
    ],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Native experience. Cross-platform efficiency.",
    description:
      "iOS and Android apps built with Flutter and React Native. One codebase, two platforms, zero compromise. From consumer apps to enterprise mobile tools.",
    includes: [
      "Cross-platform mobile apps",
      "Native iOS & Android",
      "Push notifications & offline support",
      "App Store submission & optimization",
    ],
    gradient: "from-emerald-500/20 to-yellow-500/20",
  },
  {
    icon: Wrench,
    title: "Project Rescue & Refactoring",
    tagline: "Fix what's broken. Scale what works.",
    description:
      "About 30% of our work is rescuing stalled or failing projects. We audit your codebase, fix critical bugs, eliminate technical debt, and refactor for scalability — so you can ship features again.",
    includes: [
      "Codebase audit & assessment",
      "Bug fixing & stabilization",
      "Performance optimization",
      "Architecture refactoring",
      "Test automation setup",
    ],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    tagline: "Deploy with confidence. Scale without headaches.",
    description:
      "AWS infrastructure, CI/CD pipelines, Docker containerization, and monitoring. We build the systems that let your team ship fast without breaking things.",
    includes: [
      "AWS architecture & setup",
      "CI/CD pipeline automation",
      "Docker & containerization",
      "Monitoring & alerting",
      "Cost optimization",
    ],
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: TestTube,
    title: "Quality Assurance",
    tagline: "Ship with confidence. Break nothing.",
    description:
      "Comprehensive functional testing from end-to-end validation to granular component testing. We catch the bugs before your users do.",
    includes: [
      "End-to-end testing",
      "Component testing",
      "Regression testing",
      "Test automation",
    ],
    gradient: "from-red-500/20 to-pink-500/20",
  },
  {
    icon: Database,
    title: "CMS Integration",
    tagline: "Content management without the headaches.",
    description:
      "Headless CMS implementation with Umbraco and Contentful for seamless content management. Your team edits content, the platform stays fast.",
    includes: [
      "Umbraco",
      "Contentful",
      "API integration",
      "Content modeling",
    ],
    gradient: "from-pink-500/20 to-purple-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ServicesContent() {
  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Ship & Scale</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eight core services. Each designed to solve a specific problem and deliver
            a measurable outcome. No fluff, no scope creep.
          </p>
        </motion.div>

        <div className="space-y-6 mb-16">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{service.title}</h2>
                        <p className="text-sm text-primary">{service.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-2">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which service fits? We&apos;ll help you figure it out.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
