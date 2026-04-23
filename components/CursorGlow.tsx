"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!hasFinePointer || prefersReducedMotion) return;
      setEnabled(true);
    } catch {
      // matchMedia not available
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf: number;

    function onMove(e: MouseEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }
    }

    function onLeave() {
      visible.current = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    }

    function tick() {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-300"
      style={{
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        background:
          "radial-gradient(circle, hsl(263 70% 58% / 0.06) 0%, hsl(217 91% 53% / 0.03) 30%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
