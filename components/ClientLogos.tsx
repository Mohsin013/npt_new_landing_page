"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "DevMinds Learning", initials: "DM" },
  { name: "Feel Your Best", initials: "FYB" },
  { name: "Retrofire & Safety", initials: "RS" },
  { name: "TruIntel Reform", initials: "TR" },
  { name: "Copper Proctoring", initials: "CP" },
  { name: "Veda AI", initials: "VA" },
  { name: "Insta Insights", initials: "II" },
  { name: "Smart LMS", initials: "SL" },
  { name: "AI Counsellor", initials: "AC" },
  { name: "Blended Learning", initials: "BL" },
];

export default function ClientLogos() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-8 border-b border-border/50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Trusted by innovative companies
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-8 animate-marquee-slow hover:[animation-play-state:paused]">
            {doubled.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex items-center gap-3 shrink-0 opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {client.initials}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
