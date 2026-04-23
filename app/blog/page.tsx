import type { Metadata } from "next";
import { getPosts } from "@/lib/get-posts";
import BlogContent from "./BlogContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Practical Advice for Builders & Founders",
  description:
    "Lessons from 50+ product launches. MVP development strategies, startup playbooks, and practical advice for founders building their first (or next) product.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogContent posts={posts} />;
}
