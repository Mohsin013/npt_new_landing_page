"use client";

import { motion } from "framer-motion";
import { Brain, Workflow, MessageSquare, BarChart3 } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const features = [
  {
    icon: Brain,
    title: "Custom LLM & GPT Integrations",
    description:
      "Integrate powerful language models into your products for intelligent text generation, analysis, and understanding.",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    icon: Workflow,
    title: "Automated Content Generation Workflows",
    description:
      "Streamline your content creation with AI-powered workflows that generate, edit, and publish at scale.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: MessageSquare,
    title: "Intelligent Customer Support Bots",
    description:
      "Deploy AI chatbots that understand context, handle complex queries, and escalate when needed.",
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "AI-Driven Data Analytics & Insights",
    description:
      "Transform raw data into actionable insights with automated analysis and predictive modeling.",
    gradient: "from-emerald-500/20 to-purple-500/20",
  },
];

export default function AIProminence() {
  return (
    <SectionWrapper
      badge="AI-Powered"
      title="Supercharge Your Business with AI Automations"
      subtitle="We don't just build apps; we build intelligent systems. From custom LLM integrations to automated customer support and data processing, we help you leverage the power of AI to save time and increase efficiency."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="group relative rounded-xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-bg/10 bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
