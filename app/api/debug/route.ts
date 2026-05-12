import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, string> = {
    ok: "true",
    has_postgres_url: String(!!process.env.POSTGRES_URL),
    has_cron_secret: String(!!process.env.CRON_SECRET),
    node_version: process.version,
  };

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);
    const rows = await sql`SELECT COUNT(*) as count FROM posts`;
    results.db = `connected, ${rows[0].count} posts`;
  } catch (e) {
    results.db = `error: ${String(e)}`;
  }

  try {
    await import("@/lib/blog-data");
    results.blog_data = "loaded ok";
  } catch (e) {
    results.blog_data = `error: ${String(e)}`;
  }

  return NextResponse.json(results);
}
