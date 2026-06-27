"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = sessionStorage.getItem("exit-intent-dismissed");
    if (dismissed) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5 && !hasFired) {
        setShow(true);
        setHasFired(true);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasFired]);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[101] mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-primary/10"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">
                Wait — Get a Free Project Roadmap
              </h3>
              <p className="text-sm text-muted-foreground">
                Before you go, let us send you a personalized roadmap for your
                project. No commitment, no sales pitch — just a clear plan to
                get you from idea to launch.
              </p>
              <div className="pt-2 space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact" onClick={dismiss}>
                    Get My Free Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <button
                  onClick={dismiss}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  No thanks, I&apos;ll figure it out myself
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
