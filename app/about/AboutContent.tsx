"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Eye, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const founders = [
  {
    name: "Mohsin Iqbal",
    role: "Software Engineer & Co-Founder",
    focus: "Full-Stack & AI Systems",
    photo: "/assets/mohsin.jpeg",
    linkedin: "https://linkedin.com/in/mohsin-iqbal-424336237",
    description:
      "5+ years architecting production-grade systems that scale. Built AI-powered proctoring with real-time facial recognition for 1,000+ concurrent users, multi-AI adaptive learning platforms integrating Claude, Gemini, and OpenAI, and high-throughput data pipelines processing thousands of jobs daily. Obsessed with clean architecture and shipping fast.",
    skills: ["React / Next.js", "Node.js / Express", "TypeScript", "DBMS", "AI Integration (LLMs)", "Real-Time Systems", "Data Pipelines", "AWS"],
  },
  {
    name: "Aamir Farooq",
    role: "Software Engineer & Co-Founder",
    focus: "Full-Stack & AI Systems",
    photo: "/assets/aamir.jpeg",
    linkedin: "https://linkedin.com/in/amir-bhat",
    description:
      "5+ years building full-stack production systems and AI-powered products. Specializes in end-to-end application architecture, LLM integrations, and scalable cloud infrastructure. Has delivered AI recruitment agents, adaptive learning platforms, and enterprise SaaS products from scratch.",
    skills: ["React / Next.js", "Node.js / Express", "TypeScript", "DBMS", "AI Integration (LLMs)", "Scalable Architecture", "Cloud Infrastructure", "AWS"],
  },
];

const atAGlance = [
  { label: "Specialisation", value: "Web, AI & Cloud" },
  { label: "Client focus", value: "Startups & SMBs" },
  { label: "Engagement type", value: "End-to-end delivery" },
  { label: "Approach", value: "Partner, not vendor" },
];

const values = [
  {
    icon: Shield,
    title: "Ownership",
    description:
      "We treat your product like it’s ours — because until it’s running well, it might as well be.",
  },
  {
    icon: Eye,
    title: "Clarity",
    description:
      "No jargon, no black boxes. You always know what’s happening and why.",
  },
  {
    icon: Clock,
    title: "Long-term thinking",
    description:
      "We’d rather build something that works for years than something that ships fast and breaks quietly.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
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
  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl px-6"
      >
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Who We <span className="gradient-text">Are</span>
          </h1>
        </motion.div>

        {/* Who We Are */}
        <motion.div variants={itemVariants} className="space-y-6 mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            NorthPeak Technologies is a technology and product consultancy that helps startups and growing businesses turn ideas into real, production-ready software. We specialise in modern web development, AI-powered solutions, and cloud infrastructure &mdash; working as an embedded partner, not just a vendor.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our team has shipped products across industries &mdash; from early-stage MVPs to enterprise-scale platforms &mdash; and we bring that breadth of experience to every client engagement. We don&apos;t just write code. We think about the product, the business model, the user, and the long-term architecture from day one.
          </p>
        </motion.div>

        {/* At a Glance */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">At a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {atAGlance.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Story */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold mb-6">The Story</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We started because we were tired of watching good ideas get buried in bad execution.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not because the teams weren&apos;t smart &mdash; but because building software is genuinely hard, and the gap between &ldquo;we need to build this&rdquo; and &ldquo;this is actually working in production&rdquo; is where most products quietly fall apart.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              NorthPeak started from that frustration. We&apos;d seen too many startups blow their runway on engineering that couldn&apos;t scale, and too many growing businesses stuck with systems that made every new feature feel like pulling teeth. So we set out to do it differently &mdash; not just as developers, but as partners who care about the outcome as much as the output.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we work with startups and growing businesses on modern web products, AI-powered tools, and cloud infrastructure. But the honest version of what we do is simpler: we help you figure out what to build, build it well, and make sure it doesn&apos;t become a liability the moment it grows.
            </p>
          </div>
        </motion.div>

        {/* How We Work */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold mb-6">How We Work</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A big part of what we do is asking questions most agencies skip. Not just how to build something &mdash; but should we build it, what should it actually do, and how does it move the needle for your business? We&apos;ve found that the best products come from getting those answers right before a single line of code is written.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That means we&apos;ll push back when something doesn&apos;t make sense. We&apos;ll flag risk early instead of quietly absorbing it. And we&apos;ll tell you what we think &mdash; because a partner who just says yes isn&apos;t much of a partner.
            </p>
          </div>
        </motion.div>

        {/* What We Value */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">What We Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-8 text-center hover:border-primary/30 transition-all duration-300"
              >
                <value.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <blockquote className="text-2xl md:text-3xl font-bold tracking-tight">
            &ldquo;Build fast. Build right. Build for scale.&rdquo;
          </blockquote>
          <p className="text-muted-foreground mt-4">
            That&apos;s not just a tagline. It&apos;s the order of priority we&apos;ve learned actually works.
          </p>
        </motion.div>

        {/* Founders */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-bold text-center">The Team Behind the Products</h2>
          <p className="text-muted-foreground text-center mt-2">Engineers first. Everything else second.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              variants={itemVariants}
              className="flex flex-col rounded-xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
                <div>
                  <h3 className="text-lg font-semibold">{founder.name}</h3>
                  <p className="text-sm text-primary">{founder.role}</p>
                </div>
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {founder.focus}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {founder.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {founder.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-auto pt-6 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Connect on LinkedIn
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            Whether you&apos;re a startup looking to launch quickly or an established business aiming to innovate, we work as an extension of your team &mdash; committed to your growth, your vision, and your success.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
