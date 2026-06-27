"use client";

import { motion } from "framer-motion";
import { Award, Shield, Zap, Globe } from "lucide-react";

const credentials = [
  { icon: Award, label: "Top Rated on Upwork" },
  { icon: Shield, label: "SOC 2 Practices" },
  { icon: Zap, label: "4-Week Delivery Guarantee" },
  { icon: Globe, label: "Clients in 8+ Countries" },
];

export default function CredibilityBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6"
    >
      <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {credentials.map((cred) => (
          <div
            key={cred.label}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <cred.icon className="h-4 w-4 text-primary/70" />
            <span className="text-sm font-medium">{cred.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
