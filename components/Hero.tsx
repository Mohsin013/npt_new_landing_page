"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";

const taglines = [
  "Production-Ready MVPs",
  "AI-Powered Products",
  "Scalable Cloud Systems",
  "High-Converting Platforms",
];

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const current = taglines[currentIndex];

    if (!isDeleting) {
      if (displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(current.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        return;
      }
    }
  }, [currentIndex, displayText, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(animate, speed);
    return () => clearTimeout(timer);
  }, [animate, isDeleting]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="cursor-blink text-primary">|</span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradient mesh background — pure CSS, GPU-accelerated */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary orb */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-primary/20 blur-[80px] sm:blur-[120px] animate-hero-orb-1" />
        {/* Secondary orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-accent/15 blur-[60px] sm:blur-[100px] animate-hero-orb-2" />
        {/* Tertiary accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary/10 blur-[100px] sm:blur-[150px] animate-hero-orb-3" />
      </motion.div>

      {/* Subtle grid overlay */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-20" />

      {/* Noise texture for depth */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(222_47%_7%/0.4)_70%)] pointer-events-none" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="space-y-8 animate-fade-in-up">
          <Badge variant="outline" className="text-sm">
            Trusted by 50+ Founders and Businesses
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]">
            Ship Your Product{" "}
            <br className="hidden sm:block" />
            in <span className="gradient-text">4 Weeks</span>, Not 4 Months
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold h-12 sm:h-14">
            We Build <TypewriterText />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            NorthPeak is the engineering team behind 50+ successful launches. We turn
            startup ideas into scalable products — and rescue the ones that stalled.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up [animation-delay:300ms]">
            <MagneticButton>
              <Button asChild size="lg" className="text-base glow hover:shadow-[0_0_30px_hsl(263_70%_58%/0.3),0_0_80px_hsl(263_70%_58%/0.15)] transition-shadow duration-300">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="lg" className="text-base hover:border-primary/50 hover:shadow-[0_0_20px_hsl(263_70%_58%/0.1)] transition-all duration-300">
                <Link href="/#work">
                  See Our Work
                </Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground animate-fade-in-up [animation-delay:500ms]">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-1.5">4.9/5 rating</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span>98% client satisfaction</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
