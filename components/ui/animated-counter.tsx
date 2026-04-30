"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const targetNum = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;
  const isNumeric = numericMatch !== null;
  const targetStr = numericMatch ? numericMatch[1] : "0";

  // Initialize with the real value so SSR/crawlers see correct numbers instead of "0"
  const [display, setDisplay] = useState(targetStr);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || !isNumeric || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const startTime = performance.now();
    const isFloat = targetNum % 1 !== 0;

    setDisplay(isFloat ? "0.0" : "0");

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetNum;
      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, targetNum, isNumeric]);

  if (!isNumeric) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
