"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.05, rootMargin = "0px 0px -25px 0px", disabled = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      if (el && !el.classList.contains("revealed")) {
        el.classList.add("revealed");
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold, rootMargin, disabled]);

  return ref;
}
