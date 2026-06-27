"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Send, Loader2, Clock, CheckCircle2, Star, ArrowRight, Zap } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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

const testimonialSnippets = [
  {
    text: "The most professional team I've worked with.",
    name: "Sruti Pujari",
    role: "Founder",
    photo: "/assets/testimonials/sruti.png",
  },
  {
    text: "Impact was visible within the first week.",
    name: "Azad Arsalan",
    role: "Managing Director",
    photo: "/assets/testimonials/asralan.png",
  },
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
        toast.success("Message sent! We'll get back to you within 2 hours.");
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
        className="mx-auto max-w-6xl px-6"
      >
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Get Started</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Let&apos;s Build{" "}
            <span className="gradient-text">Your Product</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you how fast we can get it live.
          </p>
          {/* Urgency indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Responding now
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-warning" />
              3 spots left this month
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input id="name" name="name" required placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input id="email" name="email" type="email" required placeholder="jane@company.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone <span className="text-xs text-muted-foreground">(optional)</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Budget range <span className="text-xs text-muted-foreground">(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-20k">$10K – $20K</option>
                    <option value="20k-50k">$20K – $50K</option>
                    <option value="50k+">$50K+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    What are you building? <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Describe your project, the problem you're solving, and any timeline constraints..."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" disabled={loading} className="w-full glow">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  No spam. No sales pitch. Just a straight conversation about your project.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* What to expect */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold mb-4">What to Expect</h2>
              <ul className="space-y-3">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Average response: 2 hours</p>
                <p className="text-xs text-muted-foreground">During business hours (IST)</p>
              </div>
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Or reach us directly</p>
              <a
                href="https://wa.me/918899990966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-success/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Fastest response</p>
                </div>
              </a>
              <a
                href="tel:+917006009596"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-xs text-muted-foreground">+91-7006009596</p>
                </div>
              </a>
              <a
                href="mailto:info@northpeaktechnologies.com"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">info@northpeaktechnologies.com</p>
                </div>
              </a>
            </div>

            {/* Social proof near form */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From our clients</p>
              {testimonialSnippets.map((t) => (
                <div key={t.name} className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-2">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <Image src={t.photo} alt={t.name} width={24} height={24} className="rounded-full w-6 h-6 object-cover" />
                    <span className="text-xs font-medium">{t.name}</span>
                    <span className="text-xs text-muted-foreground">— {t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
