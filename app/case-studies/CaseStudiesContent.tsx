"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    icon: Brain,
    title: "DevMinds Learning",
    tagline: "AI Adaptive Learning Platform",
    industry: "EdTech",
    challenge:
      "Special-needs children require personalized learning paths that adapt in real time — something off-the-shelf LMS platforms can't deliver. The client needed a system that could assess ability, adjust difficulty, and serve content from multiple AI providers without latency bottlenecks.",
    solution:
      "We architected a multi-AI system integrating Claude, Gemini, and OpenAI behind a unified orchestration layer. An adaptive difficulty engine adjusts across 4 proficiency levels in real time based on learner performance. BullMQ-powered job queues handle 1,000+ module processing tasks daily with fault tolerance.",
    results: [
      "Multi-AI architecture with seamless provider failover",
      "Adaptive difficulty engine across 4 proficiency levels",
      "1,000+ modules processed daily via BullMQ pipelines",
      "Personalized learning paths for special-needs children",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "Redis"],
    gradient: "from-purple-500/20 to-blue-500/20",
    color: "text-purple-400",
    border: "border-purple-500/10",
  },
  {
    icon: Stethoscope,
    title: "Feel Your Best",
    tagline: "Full-Stack Wellness Platform",
    industry: "HealthTech",
    challenge:
      "A wellness company needed a unified platform spanning a patient-facing app, provider dashboard, admin portal, and marketing site — all sharing a single codebase. The existing setup was fragmented, slow, and had no role-based access control.",
    solution:
      "We built a 78,000+ LOC monorepo serving all 4 applications with shared business logic. A 4-tier RBAC system handles patients, providers, admins, and super-admins. Real-time booking, Razorpay payment integration, and push notifications were built from scratch.",
    results: [
      "78,000+ LOC monorepo serving 4 applications",
      "4-tier RBAC with granular permission control",
      "Razorpay payments with 99.9% transaction success rate",
      "40% faster API response times after optimization",
    ],
    tech: ["React Native", "Expo", "Node.js", "TypeScript", "MongoDB"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "text-blue-400",
    border: "border-blue-500/10",
  },
  {
    icon: Shield,
    title: "Copper",
    tagline: "AI-Powered Online Proctoring",
    industry: "EdTech / Security",
    challenge:
      "Online exams were being compromised at scale. The client needed a proctoring solution that could detect cheating in real time across 1,000+ concurrent sessions — without requiring manual human reviewers for every flag.",
    solution:
      "We built a real-time proctoring engine combining facial recognition with behavioral analytics. The system monitors 50+ data points per session — gaze tracking, tab switches, audio anomalies, and multi-angle video feeds — and flags suspicious behavior automatically.",
    results: [
      "Real-time facial recognition + behavioral analytics",
      "Automated flagging across 50+ data points per session",
      "1,000+ concurrent users with multi-angle video feeds",
      "80% reduction in manual review time",
    ],
    tech: ["React", "React Native", "Node.js", "AI/ML", "WebRTC"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
    color: "text-cyan-400",
    border: "border-cyan-500/10",
  },
  {
    icon: Users,
    title: "Veda",
    tagline: "AI Recruitment Agent",
    industry: "HR Tech",
    challenge:
      "A growing company was spending 60+ hours per week on manual resume screening, interview scheduling, and candidate communication. They needed an AI system that could handle the top of the hiring funnel autonomously.",
    solution:
      "We designed a multi-agent architecture with 12+ specialized LLM sub-agents — each handling a discrete hiring task: resume parsing, skill extraction, fit scoring, interview scheduling, and candidate communication. The system integrates directly with Calendar, Slack, and email.",
    results: [
      "12+ specialized LLM sub-agents working in concert",
      "Automated screening with intelligent fit scores",
      "Calendar + Slack + email integration",
      "80% reduction in manual hiring workload",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Node.js", "PostgreSQL"],
    gradient: "from-emerald-500/20 to-yellow-500/20",
    color: "text-emerald-400",
    border: "border-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Insta Insights",
    tagline: "Instagram Reels Analysis",
    industry: "Creator Economy",
    challenge:
      "Content creators and brands had no way to deeply analyze what makes a Reel perform well. Surface-level metrics like views and likes don't explain why content resonates — or how to replicate success.",
    solution:
      "We built an analysis engine combining GPT-4 with custom ML models to break down Reels across engagement patterns, hook effectiveness, pacing, and audience retention signals. The system processes 25+ reels per session and generates new scripts in the creator's own tone and style.",
    results: [
      "GPT-4 + custom ML for multi-dimensional content analysis",
      "25+ reels analyzed per session at 95%+ accuracy",
      "Script generation matching the creator's voice and tone",
      "Deep engagement insights beyond surface-level metrics",
    ],
    tech: ["Next.js", "GPT-4", "AWS", "BullMQ", "Redis"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    color: "text-yellow-400",
    border: "border-yellow-500/10",
  },
  {
    icon: BookOpen,
    title: "Smart LMS",
    tagline: "Enterprise Learning System",
    industry: "EdTech / Enterprise",
    challenge:
      "An existing LMS built for 4,000 students was buckling under growth. Page loads exceeded 8 seconds, the real-time collaboration features were broken, and the platform couldn't handle concurrent usage beyond a few hundred sessions.",
    solution:
      "We re-architected the entire platform for horizontal scalability — introducing Redis-backed caching, database query optimization, and a CDN strategy. Real-time collaboration was rebuilt on WebSockets, and push notifications were unified across web, iOS, and Android.",
    results: [
      "Scaled from 4,000 to 50,000+ concurrent students",
      "Rich text editor with real-time collaboration",
      "Unified push notifications across all platforms",
      "12x scale increase with zero downtime",
    ],
    tech: ["React", "Node.js", "AWS", "Redis", "Firebase"],
    gradient: "from-orange-500/20 to-purple-500/20",
    color: "text-orange-400",
    border: "border-orange-500/10",
  },
  {
    icon: HeartHandshake,
    title: "AI Counsellor",
    tagline: "AI-Powered Counselling System",
    industry: "HealthTech / AI",
    challenge:
      "Counselling services were entirely dependent on human availability, creating long wait times and high operational costs. The organisation needed a way to handle routine counselling sessions at scale without sacrificing the quality of interaction.",
    solution:
      "We built an AI counselling system powered by GPT-4 with real-time speech recognition via Azure Cognitive Services. A Retrieval-Augmented Generation (RAG) pipeline using Pinecone and OpenAI embeddings ensures contextually precise responses. WebSocket-based streaming delivers sub-second response times, and an admin dashboard provides session analytics and template management.",
    results: [
      "70% reduction in human counsellor workload",
      "77% cost reduction in counselling operations",
      "Sub-second response times via WebSocket streaming",
      "RAG pipeline with Pinecone for contextual precision",
    ],
    tech: ["React", "TypeScript", "Bun", "Elysia.js", "GPT-4", "Pinecone", "MongoDB", "Redis"],
    gradient: "from-pink-500/20 to-rose-500/20",
    color: "text-pink-400",
    border: "border-pink-500/10",
  },
  {
    icon: GraduationCap,
    title: "Blended Learning",
    tagline: "AI Lecture Engine",
    industry: "EdTech / AI",
    challenge:
      "An educational institution needed to deliver lectures at scale but was bottlenecked by instructor availability. Creating video content manually was slow, expensive, and couldn't keep pace with a growing student base of 10,000+.",
    solution:
      "We designed an end-to-end automated lecture generation pipeline. Whisper handles text-to-speech, OpenAI LLMs generate lecture content, RVC clones instructor voices, and SADTalker animates avatar presentations. Reveal.js automates slide generation with dynamic styling. The entire pipeline runs on AWS for scalable delivery.",
    results: [
      "80% reduction in dependency on human instructors",
      "Scalable lecture delivery to 10,000+ students",
      "End-to-end pipeline: Whisper, LLM, RVC, SADTalker",
      "Automated presentations with dynamic styling via Reveal.js",
    ],
    tech: ["React", "Node.js", "OpenAI API", "SADTalker", "RVC", "AWS", "Prisma", "GraphQL"],
    gradient: "from-rose-500/20 to-violet-500/20",
    color: "text-rose-400",
    border: "border-rose-500/10",
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

export default function CaseStudiesContent() {
  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Case Studies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Real Projects.{" "}
            <span className="gradient-text">Real Impact.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A closer look at the products we&apos;ve architected, built, and
            shipped — and the problems they solved.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {caseStudies.map((study) => (
            <motion.div
              key={study.title}
              variants={itemVariants}
              className={`rounded-xl border ${study.border} bg-card overflow-hidden hover:border-primary/20 transition-all duration-300`}
            >
              <div className={`h-1 bg-gradient-to-r ${study.gradient}`} />
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center ${study.color}`}
                    >
                      <study.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{study.title}</h2>
                      <p className="text-sm text-primary">{study.tagline}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {study.industry}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      The Challenge
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Our Solution
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Key Results
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {study.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 mt-0.5 ${study.color}`}
                        />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground"
                      >
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
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-muted-foreground mb-4">
            Have a project in mind? Let&apos;s talk about what we can build
            together.
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
