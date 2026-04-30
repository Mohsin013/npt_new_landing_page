"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { SiMedium } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { MediumPost } from "@/lib/blog-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function BlogPostContent({ post }: { post: MediumPost }) {
  return (
      <div className="pt-28 pb-20">
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl px-6"
        >
          <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiMedium size={16} className="shrink-0" />
              View on Medium
              <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>

          <motion.header variants={itemVariants} className="mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.categories.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {post.thumbnail && (
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-8 border border-border">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/assets/company_logo.png"
                  alt={`Author: ${post.author}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <motion.div variants={itemVariants} className="mt-14 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {cat.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <SiMedium size={16} className="shrink-0" />
                Read on Medium
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl border border-primary/30 bg-card overflow-hidden text-center glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Ready to Build Your Product?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Book a free consultation. We&apos;ll review your idea and give you
                a clear roadmap to launch — in 4 weeks, not 4 months.
              </p>
              <MagneticButton>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.article>
      </div>
  );
}
