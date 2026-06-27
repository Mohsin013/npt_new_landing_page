"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Rocket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const tiers = [
  {
    name: "Sprint",
    icon: Zap,
    price: "$12K",
    period: "one-time",
    description: "Perfect for MVPs, landing pages, and single-feature products.",
    features: [
      "4-week delivery",
      "Full-stack development",
      "UI/UX design included",
      "Production deployment",
      "2 weeks post-launch support",
    ],
    cta: "Start a Sprint",
    highlighted: false,
  },
  {
    name: "Growth",
    icon: Rocket,
    price: "$20K",
    period: "one-time",
    description: "For complex platforms, AI integrations, and multi-feature products.",
    features: [
      "Everything in Sprint",
      "AI/ML integration",
      "Mobile app (iOS + Android)",
      "Advanced analytics",
      "1 month post-launch support",
      "Priority communication",
    ],
    cta: "Build with Growth",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "scoped",
    description: "For large-scale systems, migrations, and ongoing partnerships.",
    features: [
      "Everything in Growth",
      "Dedicated team allocation",
      "Architecture consulting",
      "Legacy system migration",
      "Ongoing retainer options",
      "SLA guarantees",
    ],
    cta: "Talk to Us",
    highlighted: false,
  },
];

export default function PricingPreview() {
  return (
    <SectionWrapper
      id="pricing"
      badge="Investment"
      title="Transparent Pricing"
      subtitle="Fixed-price engagements. No hourly billing, no scope creep, no surprises."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={itemVariants}
            className="relative"
          >
            {tier.highlighted && (
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary via-accent to-primary opacity-50 blur-[1px]" />
            )}
            <div
              className={`relative h-full rounded-2xl border bg-card p-6 md:p-8 flex flex-col ${
                tier.highlighted
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tier.highlighted ? "bg-primary/20" : "bg-muted/50"}`}>
                    <tier.icon className={`h-5 w-5 ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  variant={tier.highlighted ? "default" : "outline"}
                  className={`w-full ${tier.highlighted ? "glow" : ""}`}
                >
                  <Link href="/contact">
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground mt-8">
        All plans include free consultation, daily updates, and full code ownership.
        <br />
        Need something custom?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Let&apos;s talk.
        </Link>
      </motion.p>
    </SectionWrapper>
  );
}
