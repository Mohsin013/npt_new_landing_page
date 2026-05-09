import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { parseMediumFeed, MEDIUM_FEED_URL, type RSSItem } from "@/lib/blog-data";
import { ensureSchema, getDb } from "@/lib/db-schema";

const parser = new Parser({ customFields: { item: ["content:encoded"] } });

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureSchema();

    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    const posts = parseMediumFeed(feed.items as unknown as RSSItem[]);

    if (posts.length === 0) {
      return NextResponse.json({ message: "No posts in feed", inserted: 0 });
    }

    const sql = getDb();
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

    return NextResponse.json({
      message: "Sync complete",
      total_in_feed: posts.length,
      already_existed: existingSlugs.size,
      inserted,
    });
  } catch (error) {
    console.error("Cron sync-posts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
