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
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const projects = [
  {
    title: "DevMinds Learning",
    tagline: "AI Adaptive Learning Platform",
    icon: Brain,
    highlights: [
      "Multi-AI architecture — Claude, Gemini, and OpenAI",
      "Adaptive difficulty engine across 4 levels",
      "1,000+ modules processed daily via BullMQ",
    ],
    tech: ["React 19", "TypeScript", "Node.js", "MongoDB", "Redis"],
    outcome: "Personalized learning for special-needs children",
    gradient: "from-purple-500/20 to-blue-500/20",
    color: "text-purple-400",
    border: "border-purple-500/10",
  },
  {
    title: "Feel Your Best",
    tagline: "Full-Stack Wellness Platform",
    icon: Stethoscope,
    highlights: [
      "78,000+ LOC monorepo serving 4 applications",
      "Real-time booking with 4-tier RBAC",
      "Razorpay payments with 99.9% success rate",
    ],
    tech: ["React Native", "Expo", "Node.js", "TypeScript", "MongoDB"],
    outcome: "40% faster API response times",
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "text-blue-400",
    border: "border-blue-500/10",
  },
  {
    title: "Copper",
    tagline: "AI-Powered Online Proctoring",
    icon: Shield,
    highlights: [
      "Real-time facial recognition + behavioral analytics",
      "Automated flagging on 50+ data points",
      "1,000+ concurrent users, multi-angle feeds",
    ],
    tech: ["React", "React Native", "Node.js", "AI/ML", "WebRTC"],
    outcome: "80% less manual review time",
    gradient: "from-cyan-500/20 to-emerald-500/20",
    color: "text-cyan-400",
    border: "border-cyan-500/10",
  },
  {
    title: "Veda",
    tagline: "AI Recruitment Agent",
    icon: Users,
    highlights: [
      "12+ specialized LLM sub-agents",
      "Automated screening with fit scores",
      "Calendar + Slack + email integration",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Node.js", "PostgreSQL"],
    outcome: "80% less manual hiring work",
    gradient: "from-emerald-500/20 to-yellow-500/20",
    color: "text-emerald-400",
    border: "border-emerald-500/10",
  },
  {
    title: "Insta Insights",
    tagline: "Instagram Reels Analysis",
    icon: BarChart3,
    highlights: [
      "GPT-4 + custom ML for content analysis",
      "25+ reels/session at 95%+ accuracy",
      "Script generation in influencer's tone",
    ],
    tech: ["Next.js", "GPT-4", "AWS", "BullMQ", "Redis"],
    outcome: "Deep engagement insights for creators",
    gradient: "from-yellow-500/20 to-orange-500/20",
    color: "text-yellow-400",
    border: "border-yellow-500/10",
  },
  {
    title: "Smart LMS",
    tagline: "Enterprise Learning System",
    icon: BookOpen,
    highlights: [
      "Scaled from 4K to 50,000+ concurrent students",
      "Rich text editor with real-time collaboration",
      "Push notifications across all platforms",
    ],
    tech: ["React", "Node.js", "AWS", "Redis", "Firebase"],
    outcome: "12x scale, zero downtime",
    gradient: "from-orange-500/20 to-purple-500/20",
    color: "text-orange-400",
    border: "border-orange-500/10",
  },
];

export default function Portfolio() {
  return (
    <SectionWrapper
      id="work"
      badge="Our Work"
      title="Real Projects. Real Impact."
      subtitle="Products we've architected, built, and shipped — used by thousands in production today."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <TiltCard tiltAmount={4}>
              <div className={`h-full rounded-2xl border ${project.border} bg-card overflow-hidden hover:border-primary/20 transition-all duration-300`}>
                <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-7 md:p-8 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center ${project.color}`}>
                      <project.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.tagline}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${project.color}`} />
                        <span className="text-sm text-muted-foreground leading-relaxed">{h}</span>
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

                  <div className="flex items-center gap-2 pt-1 text-sm font-medium text-success">
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    {project.outcome}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
