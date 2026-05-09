import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const POSTS_DIR = path.resolve(__dirname, "../posts");

function extractTitle(html: string): string {
  const match = html.match(/<h1 class="p-name">([\s\S]*?)<\/h1>/);
  return match?.[1]?.trim() ?? "Untitled";
}

function extractDate(html: string): string {
  const match = html.match(/datetime="([^"]+)"/);
  return match?.[1] ?? new Date().toISOString();
}

function extractCanonicalLink(html: string): string {
  const match = html.match(/href="([^"]*)" class="p-canonical"/);
  return match?.[1] ?? "";
}

function extractAuthor(html: string): string {
  const match = html.match(/class="p-author h-card">([^<]+)<\/a>/);
  return match?.[1] ?? "NorthPeak Technologies";
}

function extractBody(html: string): string {
  const match = html.match(/<section data-field="body" class="e-content">([\s\S]*?)<\/section>\s*<footer>/);
  return match?.[1]?.trim() ?? "";
}

function extractImage(html: string): string {
  const body = extractBody(html);
  const match = body.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1] ?? "";
}

function extractExcerpt(html: string): string {
  const body = extractBody(html);
  const text = body
    .replace(/<figure>[\s\S]*?<\/figure>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  const words = text.split(/\s+/).slice(0, 30).join(" ");
  return words + (text.split(/\s+/).length > 30 ? "..." : "");
}

function estimateReadTime(html: string): string {
  const body = extractBody(html);
  const text = body.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
}

function extractCategories(filename: string): string[] {
  // Medium export filenames don't contain categories, return empty
  return [];
}

async function seed() {
  if (!process.env.POSTGRES_URL) {
    console.error("POSTGRES_URL environment variable is required");
    process.exit(1);
  }

  const sql = neon(process.env.POSTGRES_URL);

  console.log("Dropping and recreating posts table...");
  await sql`DROP TABLE IF EXISTS posts`;
  await sql`
    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(80) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      link TEXT NOT NULL,
      date TIMESTAMPTZ NOT NULL,
      categories JSONB NOT NULL DEFAULT '[]'::jsonb,
      thumbnail TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT 'NorthPeak Technologies',
      read_time VARCHAR(20) NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX idx_posts_slug ON posts(slug)`;
  await sql`CREATE INDEX idx_posts_date ON posts(date DESC)`;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".html"));
  console.log(`Found ${files.length} post files`);

  for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    const html = fs.readFileSync(filepath, "utf-8");

    const title = extractTitle(html);
    const slug = slugify(title);
    const date = extractDate(html);
    const link = extractCanonicalLink(html);
    const author = extractAuthor(html);
    const content = extractBody(html);
    const thumbnail = extractImage(html);
    const excerpt = extractExcerpt(html);
    const readTime = estimateReadTime(html);
    const categories = extractCategories(file);

    await sql`
      INSERT INTO posts (slug, title, link, date, categories, thumbnail, excerpt, author, read_time, content)
      VALUES (
        ${slug},
        ${title},
        ${link},
        ${date}::timestamptz,
        ${JSON.stringify(categories)}::jsonb,
        ${thumbnail},
        ${excerpt},
        ${author},
        ${readTime},
        ${content}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`  ✓ ${slug}`);
  }

  console.log(`\nSeed complete! ${files.length} posts inserted.`);
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
