"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Clock, TrendingUp } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiDocker,
  SiPython,
  SiFlutter,
  SiMongodb,
  SiRedis,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const metrics = [
  { icon: Rocket, value: "50+", label: "Products Launched" },
  { icon: Users, value: "98%", label: "Client Satisfaction" },
  { icon: Clock, value: "4 Weeks", label: "Average Time to Launch" },
  { icon: TrendingUp, value: "2+ Years", label: "Shipping Production Code" },
];

const technologies = [
  { name: "React", color: "#61DAFB", Icon: SiReact },
  { name: "Next.js", color: "#ffffff", Icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
  { name: "Node.js", color: "#339933", Icon: SiNodedotjs },
  { name: "AWS", color: "#FF9900", Icon: FaAws },
  { name: "OpenAI", color: "#412991", Icon: SiOpenai },
  { name: "PostgreSQL", color: "#4169E1", Icon: SiPostgresql },
  { name: "Docker", color: "#2496ED", Icon: SiDocker },
  { name: "Python", color: "#3776AB", Icon: SiPython },
  { name: "Flutter", color: "#02569B", Icon: SiFlutter },
  { name: "MongoDB", color: "#47A248", Icon: SiMongodb },
  { name: "Redis", color: "#DC382D", Icon: SiRedis },
];

export default function TechMarquee() {
  const doubled = [...technologies, ...technologies];

  return (
    <section id="tech-stack" className="border-y border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-6 py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <metric.icon className="h-5 w-5 text-primary mx-auto" />
              <AnimatedCounter
                value={metric.value}
                className="text-2xl md:text-3xl font-bold gradient-text block"
              />
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="py-6 overflow-hidden border-t border-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {doubled.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-secondary/30 border border-border/50 shrink-0 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <tech.Icon
                  className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap group-hover:text-foreground transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
