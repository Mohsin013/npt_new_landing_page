"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[3px] z-50 hidden lg:block">
      <motion.div
        className="h-full w-full origin-top bg-gradient-to-b from-primary via-accent to-primary"
        style={{ scaleY }}
      />
    </div>
  );
}
