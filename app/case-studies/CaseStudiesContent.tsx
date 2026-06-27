"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Stethoscope,
  Shield,
  Users,
  BarChart3,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const industries = ["All", "EdTech", "HealthTech", "HR Tech", "Creator Economy", "Security"];

const caseStudies = [
  {
    icon: Brain,
    title: "DevMinds Learning",
    tagline: "AI Adaptive Learning Platform",
    industry: "EdTech",
    heroMetric: "1000+",
    heroMetricLabel: "modules/day",
    challenge:
      "Special-needs children require personalized learning paths that adapt in real time — something off-the-shelf LMS platforms can't deliver.",
    solution:
      "Multi-AI system integrating Claude, Gemini, and OpenAI behind a unified orchestration layer. Adaptive difficulty engine across 4 proficiency levels. BullMQ-powered job queues handle 1,000+ module tasks daily.",
    results: [
      "Multi-AI architecture with seamless provider failover",
      "Adaptive difficulty engine across 4 proficiency levels",
      "1,000+ modules processed daily via BullMQ pipelines",
      "Personalized learning paths for special-needs children",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "Redis"],
    gradient: "from-purple-500 to-blue-500",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Stethoscope,
    title: "Feel Your Best",
    tagline: "Full-Stack Wellness Platform",
    industry: "HealthTech",
    heroMetric: "78000+",
    heroMetricLabel: "lines of code",
    challenge:
      "A wellness company needed a unified platform spanning a patient-facing app, provider dashboard, admin portal, and marketing site — all from a single codebase.",
    solution:
      "78,000+ LOC monorepo serving all 4 applications with shared business logic. 4-tier RBAC, real-time booking, Razorpay payments, and push notifications built from scratch.",
    results: [
      "78,000+ LOC monorepo serving 4 applications",
      "4-tier RBAC with granular permission control",
      "Razorpay payments with 99.9% transaction success rate",
      "40% faster API response times after optimization",
    ],
    tech: ["React Native", "Expo", "Node.js", "TypeScript", "MongoDB"],
    gradient: "from-blue-500 to-cyan-500",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Copper",
    tagline: "AI-Powered Online Proctoring",
    industry: "Security",
    heroMetric: "80%",
    heroMetricLabel: "less manual review",
    challenge:
      "Online exams compromised at scale. Needed real-time proctoring for 1,000+ concurrent sessions without manual reviewers for every flag.",
    solution:
      "Real-time proctoring engine combining facial recognition with behavioral analytics. Monitors 50+ data points per session — gaze tracking, tab switches, audio anomalies, multi-angle video.",
    results: [
      "Real-time facial recognition + behavioral analytics",
      "Automated flagging across 50+ data points per session",
      "1,000+ concurrent users with multi-angle video feeds",
      "80% reduction in manual review time",
    ],
    tech: ["React", "React Native", "Node.js", "AI/ML", "WebRTC"],
    gradient: "from-cyan-500 to-emerald-500",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Users,
    title: "Veda",
    tagline: "AI Recruitment Agent",
    industry: "HR Tech",
    heroMetric: "80%",
    heroMetricLabel: "less manual hiring",
    challenge:
      "60+ hours per week on manual resume screening, interview scheduling, and candidate communication. Needed AI to handle the top of the funnel autonomously.",
    solution:
      "Multi-agent architecture with 12+ specialized LLM sub-agents handling resume parsing, skill extraction, fit scoring, scheduling, and communication. Direct Calendar, Slack, and email integration.",
    results: [
      "12+ specialized LLM sub-agents working in concert",
      "Automated screening with intelligent fit scores",
      "Calendar + Slack + email integration",
      "80% reduction in manual hiring workload",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Node.js", "PostgreSQL"],
    gradient: "from-emerald-500 to-yellow-500",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Insta Insights",
    tagline: "Instagram Reels Analysis",
    industry: "Creator Economy",
    heroMetric: "95%+",
    heroMetricLabel: "accuracy",
    challenge:
      "No way to deeply analyze what makes a Reel perform well. Surface-level metrics don't explain why content resonates — or how to replicate success.",
    solution:
      "Analysis engine combining GPT-4 with custom ML models. Breaks down Reels across engagement patterns, hook effectiveness, pacing, and retention. Generates scripts in the creator's tone.",
    results: [
      "GPT-4 + custom ML for multi-dimensional analysis",
      "25+ reels analyzed per session at 95%+ accuracy",
      "Script generation matching the creator's voice",
      "Deep engagement insights beyond surface metrics",
    ],
    tech: ["Next.js", "GPT-4", "AWS", "BullMQ", "Redis"],
    gradient: "from-yellow-500 to-orange-500",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: BookOpen,
    title: "Smart LMS",
    tagline: "Enterprise Learning System",
    industry: "EdTech",
    heroMetric: "12x",
    heroMetricLabel: "scale increase",
    challenge:
      "Existing LMS for 4,000 students was buckling under growth. Page loads exceeded 8 seconds. Couldn't handle concurrent usage beyond a few hundred sessions.",
    solution:
      "Re-architected for horizontal scalability — Redis caching, query optimization, CDN strategy. Real-time collaboration rebuilt on WebSockets. Unified push notifications across web, iOS, Android.",
    results: [
      "Scaled from 4,000 to 50,000+ concurrent students",
      "Rich text editor with real-time collaboration",
      "Unified push notifications across all platforms",
      "12x scale increase with zero downtime",
    ],
    tech: ["React", "Node.js", "AWS", "Redis", "Firebase"],
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: HeartHandshake,
    title: "AI Counsellor",
    tagline: "AI-Powered Counselling System",
    industry: "HealthTech",
    heroMetric: "77%",
    heroMetricLabel: "cost reduction",
    challenge:
      "Counselling entirely dependent on human availability — long wait times and high operational costs. Needed to handle routine sessions at scale.",
    solution:
      "AI system powered by GPT-4 with real-time speech recognition via Azure Cognitive Services. RAG pipeline using Pinecone + OpenAI embeddings. WebSocket streaming for sub-second responses.",
    results: [
      "70% reduction in human counsellor workload",
      "77% cost reduction in operations",
      "Sub-second response times via WebSocket streaming",
      "RAG pipeline with Pinecone for contextual precision",
    ],
    tech: ["React", "TypeScript", "Bun", "GPT-4", "Pinecone"],
    gradient: "from-pink-500 to-rose-500",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: GraduationCap,
    title: "Blended Learning",
    tagline: "AI Lecture Engine",
    industry: "EdTech",
    heroMetric: "10000+",
    heroMetricLabel: "students reached",
    challenge:
      "Bottlenecked by instructor availability. Creating video content manually was slow and couldn't keep pace with 10,000+ students.",
    solution:
      "End-to-end automated lecture pipeline: Whisper for speech, LLMs for content, RVC for voice cloning, SADTalker for avatar animation. Reveal.js for auto-generated slides. AWS for delivery.",
    results: [
      "80% reduction in dependency on human instructors",
      "Scalable delivery to 10,000+ students",
      "End-to-end pipeline: Whisper, LLM, RVC, SADTalker",
      "Automated presentations with dynamic styling",
    ],
    tech: ["React", "Node.js", "OpenAI", "SADTalker", "AWS"],
    gradient: "from-rose-500 to-violet-500",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
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

export default function CaseStudiesContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter((s) => s.industry === activeFilter);

  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Case Studies</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Real Projects.{" "}
            <span className="gradient-text">Real Impact.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A deeper look at the products we&apos;ve built — the challenges, our solutions, and the results that followed.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <Filter className="h-4 w-4 text-muted-foreground mr-2" />
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === industry
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-border/50"
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Case study cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 mb-16"
          >
            {filtered.map((study) => (
              <motion.div
                key={study.title}
                layout
                variants={itemVariants}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-all duration-300"
              >
                <div className={`h-[2px] bg-gradient-to-r ${study.gradient}`} />
                <div className="p-6 md:p-8">
                  {/* Header with metric */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${study.bg} flex items-center justify-center`}>
                        <study.icon className={`h-6 w-6 ${study.color}`} />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold">{study.title}</h2>
                        <p className={`text-sm font-medium ${study.color}`}>{study.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{study.industry}</Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          <AnimatedCounter value={study.heroMetric} />
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{study.heroMetricLabel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-5">
                      <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-2">Challenge</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="rounded-xl bg-success/5 border border-success/10 p-5">
                      <p className="text-xs font-bold text-success uppercase tracking-wider mb-2">Our Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Key Results</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${study.color}`} />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech + Shipped */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tech.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-success shrink-0 ml-4">
                      <TrendingUp className="h-4 w-4" />
                      Shipped
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/50 p-8">
            <h3 className="text-xl font-bold mb-2">Your project could be next</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Let&apos;s talk about what we can build together. Free consultation, no obligations.
            </p>
            <MagneticButton>
              <Button asChild size="lg" className="glow">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
