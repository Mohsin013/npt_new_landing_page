"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Users,
  Building2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

const services = [
  {
    id: "mvp",
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
      "Post-launch support (2 weeks)",
    ],
    idealFor: ["Non-technical founders", "Pre-seed startups", "Idea-stage products"],
    caseStudy: {
      client: "DevMinds Learning",
      result: "AI-powered EdTech platform processing 1,000+ modules/day",
      metric: "30 days",
    },
    gradient: "from-purple-500 to-blue-500",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Automation Solutions",
    tagline: "Turn manual processes into intelligent systems.",
    description:
      "Custom AI integrations built for your specific business logic — not generic chatbots. We build LLM-powered features, automated workflows, intelligent analytics, and AI-driven customer support that actually work.",
    includes: [
      "Custom LLM & GPT integrations",
      "RAG pipelines & knowledge systems",
      "Automated content & data workflows",
      "AI-powered analytics & insights",
      "Intelligent chatbots & support agents",
    ],
    idealFor: ["SaaS companies", "Data-heavy businesses", "Customer support teams"],
    caseStudy: {
      client: "AI Counsellor",
      result: "77% cost reduction in counselling operations via GPT-4 + RAG",
      metric: "77% savings",
    },
    gradient: "from-blue-500 to-cyan-500",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: "web",
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
      "Real-time features & collaboration",
    ],
    idealFor: ["SaaS founders", "Growing businesses", "Enterprise teams"],
    caseStudy: {
      client: "Feel Your Best",
      result: "78,000+ LOC monorepo serving 4 applications with 99.9% uptime",
      metric: "4 apps, 1 team",
    },
    gradient: "from-cyan-500 to-emerald-500",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Native experience. Cross-platform efficiency.",
    description:
      "iOS and Android apps built with Flutter and React Native. One codebase, two platforms, zero compromise. From consumer apps to enterprise mobile tools.",
    includes: [
      "Cross-platform mobile apps (Flutter/RN)",
      "Native iOS & Android optimization",
      "Push notifications & offline support",
      "App Store submission & ASO",
      "In-app purchases & subscriptions",
    ],
    idealFor: ["Consumer apps", "Enterprise mobile", "Healthcare & wellness"],
    caseStudy: {
      client: "Feel Your Best",
      result: "Full client + therapist mobile apps with real-time booking",
      metric: "2 apps, 4 weeks",
    },
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: "rescue",
    icon: Wrench,
    title: "Project Rescue & Refactoring",
    tagline: "Fix what's broken. Scale what works.",
    description:
      "About 30% of our work is rescuing stalled or failing projects. We audit your codebase, fix critical bugs, eliminate technical debt, and refactor for scalability — so you can ship features again.",
    includes: [
      "Codebase audit & assessment",
      "Critical bug fixing & stabilization",
      "Performance optimization",
      "Architecture refactoring",
      "Test automation setup",
    ],
    idealFor: ["Stalled projects", "Post-agency handoffs", "Legacy systems"],
    caseStudy: {
      client: "Smart LMS",
      result: "Scaled from 4K to 50,000+ concurrent users with zero downtime",
      metric: "12x scale",
    },
    gradient: "from-yellow-500 to-orange-500",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    tagline: "Deploy with confidence. Scale without headaches.",
    description:
      "AWS infrastructure, CI/CD pipelines, Docker containerization, and monitoring. We build the systems that let your team ship fast without breaking things.",
    includes: [
      "AWS architecture & setup",
      "CI/CD pipeline automation",
      "Docker & Kubernetes",
      "Monitoring, alerting & logging",
      "Cost optimization & right-sizing",
    ],
    idealFor: ["Scaling startups", "DevOps-less teams", "Cost-conscious companies"],
    caseStudy: {
      client: "Copper",
      result: "1,000+ concurrent video feeds with real-time AI processing",
      metric: "99.9% uptime",
    },
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    id: "qa",
    icon: TestTube,
    title: "Quality Assurance",
    tagline: "Ship with confidence. Break nothing.",
    description:
      "Comprehensive testing from end-to-end validation to component testing. We catch the bugs before your users do — and automate it so they never come back.",
    includes: [
      "End-to-end testing (Cypress/Playwright)",
      "Unit & component testing",
      "Regression test suites",
      "CI-integrated test automation",
      "Performance & load testing",
    ],
    idealFor: ["Teams shipping fast", "Pre-launch products", "Regulated industries"],
    caseStudy: {
      client: "Copper Proctoring",
      result: "Automated flagging on 50+ data points with 80% less manual review",
      metric: "80% less QA",
    },
    gradient: "from-red-500 to-pink-500",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    id: "cms",
    icon: Database,
    title: "CMS Integration",
    tagline: "Content management without the headaches.",
    description:
      "Headless CMS implementation for seamless content management. Your team edits content, the platform stays fast. No developer required for content updates.",
    includes: [
      "Headless CMS setup (Contentful/Sanity)",
      "Content modeling & migration",
      "API integration with frontend",
      "Preview & draft workflows",
      "Editor training & documentation",
    ],
    idealFor: ["Content-heavy sites", "Marketing teams", "Multi-language platforms"],
    caseStudy: {
      client: "TruIntel Reform",
      result: "Full content pipeline with automated publishing workflows",
      metric: "0 dev needed",
    },
    gradient: "from-pink-500 to-purple-500",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function ServiceCard({ service, isExpanded, onToggle }: {
  service: (typeof services)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-colors duration-300"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ "--gradient-angle": "0deg" } as React.CSSProperties}>
        <div className="absolute inset-[-1px] rounded-2xl bg-[conic-gradient(from_var(--gradient-angle),hsl(263_70%_58%),hsl(217_91%_53%),hsl(142_71%_45%),hsl(263_70%_58%))] animate-gradient-rotate opacity-40" />
        <div className="absolute inset-[1px] rounded-2xl bg-card" />
      </div>

      {/* Top gradient line */}
      <div className={`h-[2px] bg-gradient-to-r ${service.gradient} opacity-60`} />

      <div className="relative">
        {/* Header — always visible */}
        <button
          onClick={onToggle}
          className="w-full text-left p-6 md:p-8 flex items-start gap-5 cursor-pointer"
        >
          <div className={`shrink-0 w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            <service.icon className={`h-6 w-6 ${service.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">{service.title}</h2>
                <p className={`text-sm font-medium ${service.color}`}>{service.tagline}</p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 mt-1"
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </div>
            {/* Ideal for tags — always visible */}
            <div className="flex flex-wrap gap-2 mt-3">
              {service.idealFor.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-0">
                <div className="border-t border-border/50 pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Description */}
                    <div className="lg:col-span-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* What's included */}
                    <div className="lg:col-span-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        What&apos;s Included
                      </p>
                      <ul className="space-y-2.5">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${service.color}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mini case study */}
                    <div className="lg:col-span-1">
                      <div className={`rounded-xl ${service.bg} border border-border/50 p-5`}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Real Result
                        </p>
                        <p className="text-sm font-medium mb-2">{service.caseStudy.client}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {service.caseStudy.result}
                        </p>
                        <div className={`inline-flex items-center gap-1.5 text-sm font-bold ${service.color}`}>
                          <TrendingUp className="h-3.5 w-3.5" />
                          {service.caseStudy.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ServicesContent() {
  const [expandedId, setExpandedId] = useState<string | null>("mvp");
  const servicesRef = useRef<HTMLDivElement>(null);

  function handleToggle(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div className="pt-28 pb-20">
      {/* Hero section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            Services
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Ship & Scale</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Eight focused services. Each solves a specific problem and delivers a measurable outcome. No fluff, no scope creep — just results.
          </p>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8 mb-16 py-6 border-y border-border/50">
          {[
            { icon: Rocket, value: "50+", label: "Products Shipped" },
            { icon: Users, value: "98%", label: "Client Satisfaction" },
            { icon: Lightbulb, value: "8", label: "Core Services" },
            { icon: Building2, value: "4 Weeks", label: "Avg. Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="h-4 w-4 text-primary" />
              <div>
                <span className="text-lg font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground ml-1.5">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Desktop layout: sticky nav + service cards */}
        <div className="flex gap-8" ref={servicesRef}>
          {/* Sticky side nav — desktop only */}
          <motion.nav
            variants={itemVariants}
            className="hidden lg:block w-56 shrink-0"
          >
            <div className="sticky top-28 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Jump to
              </p>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setExpandedId(service.id);
                    document.getElementById(`service-${service.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    expandedId === service.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <service.icon className="h-3.5 w-3.5" />
                    <span className="truncate">{service.title.replace("4-Week ", "").replace(" & Automation Solutions", "").replace(" Infrastructure & DevOps", "")}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Service cards */}
          <div className="flex-1 space-y-4">
            {services.map((service) => (
              <div key={service.id} id={`service-${service.id}`}>
                <ServiceCard
                  service={service}
                  isExpanded={expandedId === service.id}
                  onToggle={() => handleToggle(service.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/50 p-8">
            <h3 className="text-xl font-bold mb-2">Not sure which service fits?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Book a free 30-minute consultation. We&apos;ll assess your project and recommend the right approach — no pressure, no obligations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton>
                <Button asChild size="lg" className="glow">
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <span className="text-xs text-muted-foreground">
                We respond within 2 hours
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
