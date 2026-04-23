import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/get-posts";
import { StructuredData } from "@/components/StructuredData";
import BlogPostContent from "./BlogPostContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.categories,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.categories,
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail || undefined,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "NorthPeak Technologies",
    },
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <BlogPostContent post={post} />
    </>
  );
}
