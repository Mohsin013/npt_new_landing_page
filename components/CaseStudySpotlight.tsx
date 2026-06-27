"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Users, Zap, Clock } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const metrics = [
  { icon: Users, value: "50000+", label: "Concurrent Users", suffix: "" },
  { icon: TrendingUp, value: "12x", label: "Scale Growth", suffix: "" },
  { icon: Clock, value: "4", label: "Weeks to Launch", suffix: "wk" },
  { icon: Zap, value: "0", label: "Downtime Events", suffix: "" },
];

export default function CaseStudySpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <SectionWrapper
      id="case-study"
      badge="Case Study"
      title="From 4K to 50,000 Concurrent Users"
      subtitle="How we scaled Smart LMS 12x in 4 weeks — with zero downtime."
    >
      <div ref={containerRef}>
        <motion.div
          style={{ scale, opacity }}
          variants={itemVariants}
          className="relative rounded-3xl border border-border bg-card overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Story */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Smart LMS — EdTech Platform
                </div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  They needed to handle{" "}
                  <span className="gradient-text">12x more students</span>{" "}
                  overnight. We made it happen.
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Smart LMS was serving 4,000 concurrent students when exam season hit.
                    They needed to scale to 50,000+ — in weeks, not months.
                  </p>
                  <p>
                    We re-architected their infrastructure on AWS, implemented Redis caching,
                    added push notifications, and deployed a real-time collaboration engine —
                    all while keeping the existing platform live.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["React", "Node.js", "AWS", "Redis", "Firebase", "WebSocket"].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-border bg-background/50 p-6 text-center"
                  >
                    <metric.icon className="h-5 w-5 text-primary mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-bold">
                      <AnimatedCounter value={metric.value} />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Before/After bar */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-destructive uppercase tracking-wider">Before</span>
                  <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "8%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-destructive/50"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">4,000 concurrent users — system at breaking point</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-success uppercase tracking-wider">After NorthPeak</span>
                  <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">50,000+ concurrent users — zero downtime, instant scale</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
