"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Eye, Clock, Rocket, Users, Code, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const founders = [
  {
    name: "Mohsin Iqbal",
    role: "Software Engineer & Co-Founder",
    focus: "Full-Stack & AI Systems",
    photo: "/assets/mohsin.jpeg",
    linkedin: "https://linkedin.com/in/mohsin-iqbal-424336237",
    description:
      "5+ years architecting production-grade systems that scale. Built AI-powered proctoring with real-time facial recognition for 1,000+ concurrent users, multi-AI adaptive learning platforms, and high-throughput data pipelines. Obsessed with clean architecture and shipping fast.",
    skills: ["React / Next.js", "Node.js", "TypeScript", "AI/LLMs", "Real-Time Systems", "AWS"],
  },
  {
    name: "Aamir Farooq",
    role: "Software Engineer & Co-Founder",
    focus: "Full-Stack & AI Systems",
    photo: "/assets/aamir.jpeg",
    linkedin: "https://linkedin.com/in/amir-bhat",
    description:
      "5+ years building full-stack production systems and AI-powered products. Specializes in end-to-end application architecture, LLM integrations, and scalable cloud infrastructure. Has delivered AI recruitment agents, adaptive learning platforms, and enterprise SaaS products from scratch.",
    skills: ["React / Next.js", "Node.js", "TypeScript", "AI/LLMs", "Cloud Infra", "AWS"],
  },
];

const stats = [
  { value: "50+", label: "Products Shipped", icon: Rocket },
  { value: "98%", label: "Client Satisfaction", icon: Users },
  { value: "4", label: "Weeks Avg. Delivery", icon: Zap },
  { value: "2+", label: "Years Building", icon: Code },
];

const values = [
  {
    icon: Shield,
    title: "Ownership",
    description: "We treat your product like it's ours. We don't disappear after handoff — we stay until it's running well.",
  },
  {
    icon: Eye,
    title: "Radical Clarity",
    description: "No jargon, no black boxes. You always know what's happening, what's next, and why we made each decision.",
  },
  {
    icon: Clock,
    title: "Long-Term Thinking",
    description: "We build for years, not sprints. Every architectural choice is made with scale and maintainability in mind.",
  },
];

const timeline = [
  { year: "2022", title: "Founded", description: "Started with a single client and a belief that product engineering should be transparent." },
  { year: "2023", title: "10 Products Shipped", description: "Expanded into AI/ML integrations. Built our first multi-agent system." },
  { year: "2024", title: "50+ Clients", description: "Grew to serve startups across 8+ countries. Launched our 4-week sprint model." },
  { year: "2025", title: "AI-First Studio", description: "Every new project gets AI capabilities by default. Expanded team and service depth." },
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

export default function AboutContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-6"
      >
        {/* Hero */}
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          variants={itemVariants}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4">About NorthPeak</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Engineers Who Ship{" "}
            <span className="gradient-text">Products That Matter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We&apos;re a product engineering studio that helps startups and growing businesses turn ambitious ideas into production-ready software — fast.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center group hover:border-primary/30 transition-colors duration-300">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl md:text-3xl font-bold mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Story — split layout */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight mb-4 lg:sticky lg:top-28">
                Why We <span className="gradient-text">Exist</span>
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                We started because we were tired of watching good ideas get buried in bad execution.
              </p>
              <p>
                Not because the teams weren&apos;t smart — but because building software is genuinely hard. The gap between &ldquo;we need to build this&rdquo; and &ldquo;this is actually working in production&rdquo; is where most products quietly fall apart.
              </p>
              <p>
                We&apos;d seen too many startups blow their runway on engineering that couldn&apos;t scale, and too many growing businesses stuck with systems that made every new feature feel like pulling teeth.
              </p>
              <p>
                So we built NorthPeak to do it differently — not just as developers, but as partners who care about the outcome as much as the output. We ask the hard questions most agencies skip. We push back when something doesn&apos;t make sense. And we tell you what we think — because a partner who just says yes isn&apos;t much of a partner.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
                >
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors duration-300">
                      <p className="text-xs font-bold text-primary mb-1">{item.year}</p>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30" />
                  <div className="hidden md:block flex-1" />
                  {/* Mobile */}
                  <div className="md:hidden pl-10">
                    <p className="text-xs font-bold text-primary mb-1">{item.year}</p>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-3">What We Value</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Three principles that guide every decision we make.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-border bg-card p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Manifesto quote */}
        <motion.div variants={itemVariants} className="mb-20 py-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl" />
          <div className="relative">
            <blockquote className="text-3xl md:text-4xl font-bold tracking-tight leading-snug max-w-3xl mx-auto">
              &ldquo;Build fast. Build right.{" "}
              <span className="gradient-text">Build for scale.</span>&rdquo;
            </blockquote>
            <p className="text-muted-foreground mt-4">
              That&apos;s not just a tagline. It&apos;s the priority order we&apos;ve learned actually works.
            </p>
          </div>
        </motion.div>

        {/* Founders */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-3">The Team Behind the Products</h2>
          <p className="text-muted-foreground text-center mb-10">Engineers first. Everything else second.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder) => (
              <motion.div
                key={founder.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={64}
                    height={64}
                    className="rounded-xl object-cover w-16 h-16"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{founder.name}</h3>
                    <p className="text-sm text-primary">{founder.role}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{founder.focus}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {founder.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {founder.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/50 p-8">
            <h3 className="text-xl font-bold mb-2">Let&apos;s Build Something Together</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Whether you&apos;re a startup looking to launch or an established business aiming to innovate — we&apos;re ready to be your engineering partner.
            </p>
            <MagneticButton>
              <Button asChild size="lg" className="glow">
                <Link href="/contact">
                  Start a Conversation
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
