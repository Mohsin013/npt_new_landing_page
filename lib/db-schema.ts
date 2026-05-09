import { neon } from "@neondatabase/serverless";

function getDb() {
  const sql = neon(process.env.POSTGRES_URL!);
  return sql;
}

export async function ensureSchema() {
  const sql = getDb();

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
}

export { getDb };
