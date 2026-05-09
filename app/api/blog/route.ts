import { NextResponse } from "next/server";
import { getPosts } from "@/lib/get-posts";

export const revalidate = 600;

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
