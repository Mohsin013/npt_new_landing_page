"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionWrapper, itemVariants } from "@/components/ui/section-wrapper";

const testimonials = [
  {
    name: "Anika Mistry",
    company: "Dev Minds Learning",
    role: "Founder",
    photo: "/assets/testimonials/anika.png",
    text: "NorthPeak built an AI platform that generates personalized learning modules for autistic and ADHD children. Their understanding of both the technology and our mission was exceptional — they didn't just execute, they made it better.",
    highlight: "AI-powered EdTech platform",
  },
  {
    name: "Sruti Pujari",
    company: "Feel Your Best Pvt. Ltd.",
    role: "Founder",
    photo: "/assets/testimonials/sruti.png",
    text: "From client-therapist matching to mobile apps and a full admin dashboard — NorthPeak delivered a complete, scalable solution. Everything was executed seamlessly. They're the most professional team I've worked with.",
    highlight: "Full-stack wellness platform",
  },
  {
    name: "Azad Arsalan",
    company: "Retrofire and Safety",
    role: "Managing Director",
    photo: "/assets/testimonials/asralan.png",
    text: "NorthPeak created a landing page that immediately started generating leads. The impact was visible within the first week. Professional work that directly affected our bottom line.",
    highlight: "High-converting landing page",
  },
  {
    name: "Dr. Suhaib Amin",
    company: "TruIntel Reform Organization",
    role: "Director",
    photo: "/assets/testimonials/suhaib.jpeg",
    text: "Website, lead funnel, backend systems, payment integration — all delivered flawlessly and on time. NorthPeak handles complexity without making it feel complex. Highly recommended.",
    highlight: "End-to-end digital system",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      title="What Our Clients Say"
      subtitle="Don't take our word for it. Here's what the founders and leaders we've worked with have to say."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="relative rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="text-xs text-primary font-medium mb-4 bg-primary/5 rounded-md px-2.5 py-1 inline-block">
              {t.highlight}
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <Image
                src={t.photo}
                alt={`${t.name}, ${t.role} at ${t.company}`}
                width={36}
                height={36}
                className="rounded-full object-cover w-9 h-9"
              />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
