"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({ count = 20, className }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * -20,
        opacity: 0.1 + Math.random() * 0.2,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: `hsl(263 70% 58% / ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px hsl(263 70% 58% / ${p.opacity * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
