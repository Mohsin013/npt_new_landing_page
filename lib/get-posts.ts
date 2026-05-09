import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem, type MediumPost } from "./blog-data";

export async function getPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(MEDIUM_FEED_URL, { cache: "no-store" });
    const xml = await res.text();
    const parser = new Parser({ customFields: { item: ["content:encoded"] } });
    const feed = await parser.parseString(xml);
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
