import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem, type MediumPost } from "./blog-data";

let cached: { posts: MediumPost[]; ts: number } | null = null;
const TTL = 60 * 60 * 1000;

export async function getPosts(): Promise<MediumPost[]> {
  if (cached && Date.now() - cached.ts < TTL) return cached.posts;

  try {
    const parser = new Parser({ customFields: { item: ["content:encoded"] } });
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    const posts = parseMediumFeed(feed.items as unknown as RSSItem[]);
    cached = { posts, ts: Date.now() };
    return posts;
  } catch (e) {
    console.error("Failed to fetch Medium feed:", e);
    return cached?.posts ?? [];
  }
}

export async function getPostBySlug(slug: string): Promise<MediumPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}
