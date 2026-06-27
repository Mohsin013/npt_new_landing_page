"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Lightweight gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[100px] animate-hero-orb-2" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[80px] animate-hero-orb-1" />
      </div>
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Build{" "}
            <span className="gradient-text">Something That Matters?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a free 30-minute consultation. We&apos;ll review your idea, identify
            the fastest path to launch, and give you a clear roadmap — no strings attached.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            We respond within 2 hours
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton>
              <Button asChild size="lg" className="text-base glow hover:shadow-[0_0_30px_hsl(263_70%_58%/0.3),0_0_80px_hsl(263_70%_58%/0.15)] transition-shadow duration-300">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="lg" className="text-base">
                <a href="https://wa.me/918899990966" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <a
              href="tel:+917006009596"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              +91-7006009596
            </a>
            <a
              href="mailto:info@northpeaktechnologies.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              info@northpeaktechnologies.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
