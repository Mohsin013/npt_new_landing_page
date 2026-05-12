import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    has_postgres_url: !!process.env.POSTGRES_URL,
    has_cron_secret: !!process.env.CRON_SECRET,
    node_version: process.version,
  });
}
