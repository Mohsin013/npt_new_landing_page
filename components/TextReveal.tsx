"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`py-20 md:py-28 px-6 ${className}`}>
      <p className="mx-auto max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug text-center">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, [
    "hsl(220 15% 30%)",
    "hsl(0 0% 100%)",
  ]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}
