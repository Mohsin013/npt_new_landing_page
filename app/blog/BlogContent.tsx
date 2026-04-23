"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import { SiMedium } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";
import type { MediumPost } from "@/lib/blog-data";
import { MEDIUM_PROFILE_URL } from "@/lib/blog-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function shortDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function BlogContent({ posts }: { posts: MediumPost[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.categories))
  ).slice(0, 12);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const filteredPosts = activeTag
    ? posts.filter((p) => p.categories.includes(activeTag))
    : null;

  if (posts.length === 0) {
    return (
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Badge variant="outline" className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Practical Advice for{" "}
            <span className="gradient-text">Builders & Founders</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-8">
            Posts are loading. Check back shortly or visit our{" "}
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Medium page
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <Badge variant="outline" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Practical Advice for{" "}
            <span className="gradient-text">Builders & Founders</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lessons from 50+ product launches. No theory — just what works when
            you&apos;re building a product from scratch.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 mx-auto w-fit rounded-full border border-border bg-card px-6 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
          >
            <SiMedium size={20} className="shrink-0 text-foreground" />
            <span className="text-sm font-medium">Follow us on Medium</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </motion.div>

        {allTags.length > 0 && (
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by topic</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                  activeTag === null
                    ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    activeTag === tag
                      ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {tag.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {!activeTag && featuredPost && (
          <motion.div variants={itemVariants} className="mb-12">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <TiltCard tiltAmount={3}>
                <div className="relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <div className="h-1.5 gradient-bg" />
                  <div className="flex flex-col lg:flex-row">
                    {featuredPost.thumbnail && (
                      <div className="relative lg:w-2/5 aspect-[16/9] lg:aspect-auto overflow-hidden">
                        <Image
                          src={featuredPost.thumbnail}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 lg:to-card" />
                      </div>
                    )}
                    <div className="flex-1 p-8 md:p-10">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <Badge className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          Latest
                        </Badge>
                        {featuredPost.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-[10px]">
                            {cat.replace(/-/g, " ")}
                          </Badge>
                        ))}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Read article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {(filteredPosts ?? otherPosts).map((post) => (
            <motion.article key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="h-full rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                  {post.thumbnail && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {post.categories.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-[10px]">
                          {cat.replace(/-/g, " ")}
                        </Badge>
                      ))}
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {shortDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-primary/30 bg-card overflow-hidden text-center glow"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Build Your Product?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get a free consultation and a clear roadmap for turning your idea
              into a live product in 4 weeks.
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
      </motion.div>
    </div>
  );
}
