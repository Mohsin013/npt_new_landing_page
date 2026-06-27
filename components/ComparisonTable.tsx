"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

type CellValue = "yes" | "no" | "partial" | string;

interface Row {
  feature: string;
  northpeak: CellValue;
  agency: CellValue;
  freelancer: CellValue;
  inhouse: CellValue;
}

const rows: Row[] = [
  { feature: "Time to launch", northpeak: "4 weeks", agency: "3–6 months", freelancer: "2–4 months", inhouse: "4–8 months" },
  { feature: "Production-grade code", northpeak: "yes", agency: "partial", freelancer: "no", inhouse: "yes" },
  { feature: "Full product team included", northpeak: "yes", agency: "yes", freelancer: "no", inhouse: "yes" },
  { feature: "Fixed price, no surprises", northpeak: "yes", agency: "no", freelancer: "partial", inhouse: "no" },
  { feature: "AI & automation expertise", northpeak: "yes", agency: "partial", freelancer: "partial", inhouse: "partial" },
  { feature: "Post-launch support", northpeak: "yes", agency: "partial", freelancer: "no", inhouse: "yes" },
  { feature: "Daily progress updates", northpeak: "yes", agency: "no", freelancer: "partial", inhouse: "yes" },
  { feature: "You own 100% of the code", northpeak: "yes", agency: "partial", freelancer: "yes", inhouse: "yes" },
  { feature: "Cost (monthly)", northpeak: "$12–20K", agency: "$30–80K", freelancer: "$8–15K", inhouse: "$40K+" },
];

function CellContent({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-success" />
        </div>
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <X className="h-3.5 w-3.5 text-destructive" />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
          <Minus className="h-3.5 w-3.5 text-warning" />
        </div>
      </div>
    );
  }
  return <span className="text-sm text-muted-foreground">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <SectionWrapper
      id="comparison"
      badge="Why Us"
      title="NorthPeak vs The Alternatives"
      subtitle="See how we stack up against agencies, freelancers, and hiring in-house."
    >
      <motion.div variants={itemVariants} className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Header */}
          <div className="grid grid-cols-5 gap-px mb-2">
            <div className="p-4" />
            <div className="p-4 text-center rounded-t-xl bg-primary/10 border border-primary/20 border-b-0">
              <span className="text-sm font-bold text-primary">NorthPeak</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">Agency</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">Freelancer</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">In-House</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-5 gap-px ${i % 2 === 0 ? "bg-muted/20" : ""} rounded-lg`}
            >
              <div className="p-4 flex items-center">
                <span className="text-sm font-medium">{row.feature}</span>
              </div>
              <div className="p-4 flex items-center justify-center bg-primary/5 border-x border-primary/10">
                <CellContent value={row.northpeak} />
              </div>
              <div className="p-4 flex items-center justify-center">
                <CellContent value={row.agency} />
              </div>
              <div className="p-4 flex items-center justify-center">
                <CellContent value={row.freelancer} />
              </div>
              <div className="p-4 flex items-center justify-center">
                <CellContent value={row.inhouse} />
              </div>
            </div>
          ))}

          {/* Bottom border for NorthPeak column */}
          <div className="grid grid-cols-5 gap-px">
            <div />
            <div className="h-1 rounded-b-xl bg-gradient-to-r from-primary to-accent" />
            <div />
            <div />
            <div />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
