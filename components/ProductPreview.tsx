"use client";

import { motion } from "framer-motion";

export default function ProductPreview() {
  return (
    <section className="relative py-12 px-6 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-3xl blur-xl" />

          <div className="relative rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-sm h-5 rounded-md bg-muted/50 border border-border/50 flex items-center px-3">
                  <span className="text-[10px] text-muted-foreground">app.devmindslearning.com/dashboard</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-6 w-48 rounded bg-muted/50" />
                  <div className="h-4 w-32 rounded bg-muted/30" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-md bg-primary/20" />
                  <div className="h-8 w-20 rounded-md bg-muted/40" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Users", value: "2,847", color: "bg-primary/20" },
                  { label: "Modules Processed", value: "12,493", color: "bg-success/20" },
                  { label: "Completion Rate", value: "94.2%", color: "bg-accent/20" },
                  { label: "Satisfaction", value: "4.9/5", color: "bg-warning/20" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-xl ${stat.color} border border-border/30 p-4`}
                  >
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-xl border border-border/30 bg-muted/20 p-4 h-40 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 95, 75, 88, 92].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="w-full rounded-t bg-gradient-to-t from-primary/60 to-primary/30"
                      />
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-3">
                  {[
                    { label: "AI Processing", progress: 92 },
                    { label: "Content Generation", progress: 87 },
                    { label: "User Engagement", progress: 95 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/50">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
