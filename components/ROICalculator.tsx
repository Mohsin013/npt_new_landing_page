"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

function formatUSD(num: number): string {
  if (num >= 1000) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return num.toString();
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(3);
  const [monthsDelayed, setMonthsDelayed] = useState(3);

  const avgSalary = 8000;
  const opportunityCostPerMonth = 15000;
  const costOfDelay =
    teamSize * avgSalary * monthsDelayed +
    opportunityCostPerMonth * monthsDelayed;
  const northPeakCost = 12000;
  const savings = costOfDelay - northPeakCost;

  return (
    <SectionWrapper
      id="roi-calculator"
      badge="ROI Calculator"
      title="How Much Is Delay Costing You?"
      subtitle="See the real cost of not shipping — and how much you save by working with us."
    >
      <motion.div
        variants={itemVariants}
        className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8"
      >
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Team size needed</label>
                <span className="text-sm font-bold text-primary">{teamSize} people</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Months delayed so far</label>
                <span className="text-sm font-bold text-primary">{monthsDelayed} months</span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={monthsDelayed}
                onChange={(e) => setMonthsDelayed(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>12</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Cost of delay</span>
              </div>
              <span className="text-xl font-bold text-destructive">
                ${formatUSD(costOfDelay)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">NorthPeak 4-week sprint</span>
              </div>
              <span className="text-xl font-bold text-primary">
                ~${formatUSD(northPeakCost)}
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">You save</span>
              <span className="text-2xl font-bold text-success">
                ${savings > 0 ? formatUSD(savings) : "—"}
              </span>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button asChild size="lg">
              <Link href="/contact">
                Stop Burning Money — Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Based on avg. $8K/month per developer + $15K/month opportunity cost
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
