import { neon } from "@neondatabase/serverless";
import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem, type MediumPost } from "./blog-data";

const parser = new Parser({ customFields: { item: ["content:encoded"] } });

function rowToPost(row: Record<string, unknown>): MediumPost {
  return {
    slug: row.slug as string,
    title: row.title as string,
    link: row.link as string,
    date: row.date instanceof Date ? row.date.toISOString() : (row.date as string),
    categories: (row.categories as string[]) ?? [],
    thumbnail: (row.thumbnail as string) ?? "",
    excerpt: (row.excerpt as string) ?? "",
    author: (row.author as string) ?? "NorthPeak Technologies",
    readTime: (row.read_time as string) ?? "",
    content: (row.content as string) ?? "",
  };
}

async function getPostsFromDB(): Promise<MediumPost[] | null> {
  if (!process.env.POSTGRES_URL) return null;
  try {
    const sql = neon(process.env.POSTGRES_URL);
    const rows = await sql`
      SELECT slug, title, link, date, categories, thumbnail, excerpt, author, read_time, content
      FROM posts
      ORDER BY date DESC
    `;
    if (rows.length === 0) return null;
    return rows.map(rowToPost);
  } catch (e) {
    console.error("Failed to query posts from DB:", e);
    return null;
  }
}

async function getPostFromDBBySlug(slug: string): Promise<MediumPost | null> {
  if (!process.env.POSTGRES_URL) return null;
  try {
    const sql = neon(process.env.POSTGRES_URL);
    const rows = await sql`
      SELECT slug, title, link, date, categories, thumbnail, excerpt, author, read_time, content
      FROM posts
      WHERE slug = ${slug}
      LIMIT 1
    `;
    if (rows.length === 0) return null;
    return rowToPost(rows[0]);
  } catch (e) {
    console.error("Failed to query post by slug from DB:", e);
    return null;
  }
}

async function getPostsFromRSS(): Promise<MediumPost[]> {
  try {
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    return parseMediumFeed(feed.items as unknown as RSSItem[]);
  } catch (e) {
    console.error("Failed to fetch Medium feed:", e);
    return [];
  }
}

export async function getPosts(): Promise<MediumPost[]> {
  const dbPosts = await getPostsFromDB();
  if (dbPosts !== null) return dbPosts;
  return getPostsFromRSS();
}

export async function getPostBySlug(slug: string): Promise<MediumPost | undefined> {
  const dbPost = await getPostFromDBBySlug(slug);
  if (dbPost !== null) return dbPost;
  const posts = await getPostsFromRSS();
  return posts.find((p) => p.slug === slug);
}
