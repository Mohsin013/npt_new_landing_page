"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function SectionWrapper({
  children,
  className,
  badge,
  title,
  subtitle,
  id,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("relative py-20 md:py-28 lg:py-32 px-6", className)}
    >
      <div className="mx-auto max-w-7xl">
        {(badge || title || subtitle) && (
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 text-center">
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Badge variant="outline" className="mb-4">
                  {badge}
                </Badge>
              </motion.div>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}

export { containerVariants, itemVariants };
