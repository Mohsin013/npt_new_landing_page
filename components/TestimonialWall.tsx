"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const testimonials = [
  {
    name: "Anika Mistry",
    company: "Dev Minds Learning",
    role: "Founder",
    photo: "/assets/testimonials/anika.png",
    text: "NorthPeak built an AI platform that generates personalized learning modules for autistic and ADHD children. Their understanding of both the technology and our mission was exceptional.",
  },
  {
    name: "Sruti Pujari",
    company: "Feel Your Best",
    role: "Founder",
    photo: "/assets/testimonials/sruti.png",
    text: "From client-therapist matching to mobile apps and a full admin dashboard — NorthPeak delivered a complete, scalable solution. The most professional team I've worked with.",
  },
  {
    name: "Azad Arsalan",
    company: "Retrofire and Safety",
    role: "Managing Director",
    photo: "/assets/testimonials/asralan.png",
    text: "NorthPeak created a landing page that immediately started generating leads. The impact was visible within the first week.",
  },
  {
    name: "Dr. Suhaib Amin",
    company: "TruIntel Reform",
    role: "Director",
    photo: "/assets/testimonials/suhaib.jpeg",
    text: "Website, lead funnel, backend systems, payment integration — all delivered flawlessly and on time. Highly recommended.",
  },
  {
    name: "Anika Mistry",
    company: "Dev Minds Learning",
    role: "Founder",
    photo: "/assets/testimonials/anika.png",
    text: "They didn't just execute, they made it better. NorthPeak challenged assumptions and suggested approaches we hadn't considered.",
  },
  {
    name: "Sruti Pujari",
    company: "Feel Your Best",
    role: "Founder",
    photo: "/assets/testimonials/sruti.png",
    text: "Everything was executed seamlessly. The timeline was tight, and they delivered every milestone on schedule without compromising quality.",
  },
  {
    name: "Dr. Suhaib Amin",
    company: "TruIntel Reform",
    role: "Director",
    photo: "/assets/testimonials/suhaib.jpeg",
    text: "NorthPeak handles complexity without making it feel complex. Their technical depth is matched only by their communication skills.",
  },
  {
    name: "Azad Arsalan",
    company: "Retrofire and Safety",
    role: "Managing Director",
    photo: "/assets/testimonials/asralan.png",
    text: "Professional work that directly affected our bottom line. We saw ROI within the first month of launch.",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="shrink-0 w-[320px] rounded-2xl border border-border bg-card p-5 hover:border-primary/20 transition-colors duration-300">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
        <Image
          src={t.photo}
          alt={t.name}
          width={32}
          height={32}
          className="rounded-full object-cover w-8 h-8"
        />
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            {t.role}, {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialWall() {
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <SectionWrapper
      id="testimonials"
      badge="Wall of Love"
      title="What Our Clients Say"
      subtitle="Don't take our word for it — hear from the founders and leaders we've worked with."
    >
      <motion.div variants={itemVariants} className="space-y-4 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-testimonial-scroll-left hover:[animation-play-state:paused]">
            {doubled1.map((t, i) => (
              <TestimonialCard key={`row1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-testimonial-scroll-right hover:[animation-play-state:paused]">
            {doubled2.map((t, i) => (
              <TestimonialCard key={`row2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
