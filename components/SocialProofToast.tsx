"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const notifications = [
  { city: "Dubai", action: "started a project", time: "2 hours ago" },
  { city: "London", action: "booked a consultation", time: "4 hours ago" },
  { city: "New York", action: "launched their MVP", time: "1 day ago" },
  { city: "Mumbai", action: "signed up for a sprint", time: "3 hours ago" },
  { city: "Singapore", action: "completed their project", time: "5 hours ago" },
  { city: "Berlin", action: "started a project", time: "6 hours ago" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialDelay = setTimeout(() => {
      setCurrent(0);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (current === null || dismissed) return;

    const hideTimer = setTimeout(() => {
      setCurrent(null);
    }, 4000);

    const nextTimer = setTimeout(() => {
      setCurrent((prev) => {
        if (prev === null) return null;
        const next = (prev + 1) % notifications.length;
        return next;
      });
    }, 12000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current, dismissed]);

  if (dismissed) return null;

  const notification = current !== null ? notifications[current] : null;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs"
        >
          <div
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-lg cursor-pointer"
            onClick={() => setDismissed(true)}
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium">
                Someone in {notification.city}
              </p>
              <p className="text-xs text-muted-foreground">
                {notification.action} — {notification.time}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
