import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem, type MediumPost } from "./blog-data";

const parser = new Parser({ customFields: { item: ["content:encoded"] } });

export async function getPosts(): Promise<MediumPost[]> {
  try {
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    return parseMediumFeed(feed.items as unknown as RSSItem[]);
  } catch (e) {
    console.error("Failed to fetch Medium feed:", e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<MediumPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}
