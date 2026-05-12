import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem } from "@/lib/blog-data";

const parser = new Parser({ customFields: { item: ["content:encoded"] } });

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      { error: "POSTGRES_URL environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS posts (
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
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC)`;

    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    const posts = parseMediumFeed(feed.items as unknown as RSSItem[]);

    if (posts.length === 0) {
      return NextResponse.json({ message: "No posts in feed", inserted: 0 });
    }

    const existing = await sql`SELECT slug FROM posts`;
    const existingSlugs = new Set(existing.map((r) => r.slug));

    const newPosts = posts.filter((p) => !existingSlugs.has(p.slug));

    let inserted = 0;
    for (const post of newPosts) {
      await sql`
        INSERT INTO posts (slug, title, link, date, categories, thumbnail, excerpt, author, read_time, content)
        VALUES (
          ${post.slug},
          ${post.title},
          ${post.link},
          ${post.date}::timestamptz,
          ${JSON.stringify(post.categories)}::jsonb,
          ${post.thumbnail},
          ${post.excerpt},
          ${post.author},
          ${post.readTime},
          ${post.content}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      inserted++;
    }

    if (inserted > 0) {
      revalidatePath("/blog");
      revalidatePath("/api/blog");
      for (const post of newPosts) {
        revalidatePath(`/blog/${post.slug}`);
      }
    }

    return NextResponse.json({
      message: "Sync complete",
      total_in_feed: posts.length,
      already_existed: existingSlugs.size,
      inserted,
      revalidated: inserted > 0,
    });
  } catch (error) {
    console.error("Cron sync-posts error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
