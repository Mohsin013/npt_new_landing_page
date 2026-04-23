export interface MediumPost {
  slug: string;
  title: string;
  link: string;
  date: string;
  categories: string[];
  thumbnail: string;
  excerpt: string;
  author: string;
  readTime: string;
  content: string;
}

export const MEDIUM_FEED_URL = "https://medium.com/feed/@info_69552";
export const MEDIUM_PROFILE_URL = "https://medium.com/@info_69552";

function extractImage(html: string): string {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1] ?? "";
}

function extractExcerpt(html: string): string {
  const text = html
    .replace(/<figure>[\s\S]*?<\/figure>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  const words = text.split(/\s+/).slice(0, 30).join(" ");
  return words + (text.split(/\s+/).length > 30 ? "..." : "");
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, "");
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

function sanitizeContent(html: string): string {
  let stripped = html.replace(/<figure>[\s\S]*?<\/figure>/, "");
  return stripped
    .replace(/<img([^>]*)>/g, (_, attrs) => {
      return `<img${attrs} loading="lazy" decoding="async">`;
    })
    .replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
}

export function parseMediumFeed(items: RSSItem[]): MediumPost[] {
  return items.map((item) => {
    const raw = item["content:encoded"] ?? item.content ?? "";
    return {
      slug: slugify(item.title ?? "untitled"),
      title: item.title ?? "Untitled",
      link: item.link ?? "",
      date: item.pubDate ?? item.isoDate ?? "",
      categories: item.categories ?? [],
      thumbnail: extractImage(raw),
      excerpt: extractExcerpt(raw),
      author: item.creator ?? "NorthPeak Technologies",
      readTime: estimateReadTime(raw),
      content: sanitizeContent(raw),
    };
  });
}

export interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  categories?: string[];
  content?: string;
  "content:encoded"?: string;
}
