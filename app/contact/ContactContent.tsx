"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Send, Loader2, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const expectations = [
  "Free 30-minute consultation",
  "Honest assessment of your project",
  "Clear timeline and fixed-price quote",
  "No obligations, no pressure",
];

export default function ContactContent() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Get Started
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s Talk About{" "}
            <span className="gradient-text">Your Project</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you how fast we can get it live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <Input id="firstName" name="firstName" required placeholder="Jane" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Input id="lastName" name="lastName" required placeholder="Smith" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input id="email" name="email" type="email" required placeholder="jane@company.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    City
                  </label>
                  <Input id="city" name="city" placeholder="San Francisco" />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  What are you building? <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Describe your project, the problem you're solving, and any timeline or budget constraints..."
                  rows={5}
                />
              </div>

              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">What to Expect</h2>
              <ul className="space-y-3">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              We respond within 24 hours
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Prefer to Talk Directly?</h2>
              <a
                href="tel:+917006009596"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">+91-7006009596</p>
                </div>
              </a>
              <a
                href="https://wa.me/918899990966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-success/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+91-8899990966</p>
                </div>
              </a>
              <a
                href="mailto:info@northpeaktechnologies.com"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">info@northpeaktechnologies.com</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
