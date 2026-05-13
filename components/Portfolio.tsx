"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Stethoscope,
  Shield,
  Users,
  BarChart3,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const projects = [
  {
    title: "DevMinds Learning",
    tagline: "AI Adaptive Learning Platform",
    icon: Brain,
    stat: "1000+",
    statLabel: "modules/day",
    highlights: [
      "Multi-AI architecture — Claude, Gemini, and OpenAI",
      "Adaptive difficulty engine across 4 levels",
      "1,000+ modules processed daily via BullMQ",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "Redis"],
    outcome: "Personalized learning for special-needs children",
    featured: true,
  },
  {
    title: "Feel Your Best",
    tagline: "Full-Stack Wellness Platform",
    icon: Stethoscope,
    stat: "78000+",
    statLabel: "lines of code",
    highlights: [
      "78,000+ LOC monorepo serving 4 applications",
      "Real-time booking with 4-tier RBAC",
      "Razorpay payments with 99.9% success rate",
    ],
    tech: ["React Native", "Expo", "Node.js", "TypeScript", "MongoDB"],
    outcome: "40% faster API response times",
    featured: true,
  },
  {
    title: "Copper",
    tagline: "AI-Powered Online Proctoring",
    icon: Shield,
    stat: "80%",
    statLabel: "less review time",
    highlights: [
      "Real-time facial recognition + behavioral analytics",
      "Automated flagging on 50+ data points",
      "1,000+ concurrent users, multi-angle feeds",
    ],
    tech: ["React", "React Native", "Node.js", "AI/ML", "WebRTC"],
    outcome: "80% less manual review time",
  },
  {
    title: "Veda",
    tagline: "AI Recruitment Agent",
    icon: Users,
    stat: "12+",
    statLabel: "LLM sub-agents",
    highlights: [
      "12+ specialized LLM sub-agents",
      "Automated screening with fit scores",
      "Calendar + Slack + email integration",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Node.js", "PostgreSQL"],
    outcome: "80% less manual hiring work",
  },
  {
    title: "Insta Insights",
    tagline: "Instagram Reels Analysis",
    icon: BarChart3,
    stat: "95%+",
    statLabel: "accuracy",
    highlights: [
      "GPT-4 + custom ML for content analysis",
      "25+ reels/session at 95%+ accuracy",
      "Script generation in influencer's tone",
    ],
    tech: ["Next.js", "GPT-4", "AWS", "BullMQ", "Redis"],
    outcome: "Deep engagement insights for creators",
  },
  {
    title: "Smart LMS",
    tagline: "Enterprise Learning System",
    icon: BookOpen,
    stat: "50000+",
    statLabel: "concurrent students",
    highlights: [
      "Scaled from 4K to 50,000+ concurrent students",
      "Rich text editor with real-time collaboration",
      "Push notifications across all platforms",
    ],
    tech: ["React", "Node.js", "AWS", "Redis", "Firebase"],
    outcome: "12x scale, zero downtime",
  },
  {
    title: "AI Counsellor",
    tagline: "AI-Powered Counselling System",
    icon: HeartHandshake,
    stat: "77%",
    statLabel: "cost reduction",
    highlights: [
      "GPT-4 + real-time speech recognition via Azure Cognitive Services",
      "RAG pipeline with Pinecone + OpenAI embeddings",
      "77% cost reduction in counselling operations",
    ],
    tech: ["React", "TypeScript", "Bun", "Elysia.js", "GPT-4", "Pinecone"],
    outcome: "70% reduction in human counsellor workload",
  },
  {
    title: "Blended Learning",
    tagline: "AI Lecture Engine",
    icon: GraduationCap,
    stat: "10000+",
    statLabel: "students reached",
    highlights: [
      "End-to-end AI lecture pipeline: Whisper, LLM, RVC, SADTalker",
      "Automated presentations via Reveal.js with dynamic styling",
      "Scalable delivery to 10,000+ students",
    ],
    tech: ["React", "Node.js", "OpenAI API", "SADTalker", "RVC", "AWS"],
    outcome: "80% less dependency on human instructors",
  },
];

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[number];
  featured?: boolean;
}) {
  return (
    <TiltCard tiltAmount={featured ? 3 : 5} className="h-full">
      <div className="group relative h-full rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="p-6 md:p-7 space-y-5">
          <div
            className={`flex ${featured ? "flex-row items-start justify-between" : "flex-col"} gap-4`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <project.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className={`${featured ? "text-right" : ""} shrink-0`}>
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter value={project.stat} />
              </div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {project.statLabel}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium text-success">
              <TrendingUp className="h-4 w-4 shrink-0" />
              {project.outcome}
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Portfolio() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      id="work"
      badge="Our Work"
      title="Real Projects. Real Impact."
      subtitle="Products we've architected, built, and shipped — used by thousands in production today."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard project={project} featured />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
