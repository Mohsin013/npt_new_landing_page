"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  spotlightEnabled?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 8,
  glareEnabled = true,
  spotlightEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 40 });

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightOpacity = useSpring(0, { stiffness: 200, damping: 40 });

  function handleMouse(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    x.set(relX - 0.5);
    y.set(relY - 0.5);
    glareOpacity.set(0.12);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
    spotlightOpacity.set(1);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
    spotlightOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 60%)`
            ),
            opacity: glareOpacity,
          }}
        />
      )}
      {spotlightEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
          style={{ opacity: spotlightOpacity }}
        >
          <motion.div
            className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotlightX,
              top: spotlightY,
              background:
                "radial-gradient(circle, hsl(263 70% 58% / 0.15) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
