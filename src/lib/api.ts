// WP_API_URL lets local development point at a mirror/mock when the origin is unreachable.
const API_URL = process.env.WP_API_URL || "https://redlanternanalytica.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  categories?: number[];
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  author: number;
  _embedded?: {
    author?: Array<{
      name: string;
      description?: string;
    }>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: { width: number; height: number };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent?: number;
}

export interface PostsPage {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

// Only embed what the UI uses (full _embed also pulls replies etc. and is much slower on WP).
const EMBED = "author,wp:term,wp:featuredmedia";
// Pages are only used for their title and content.
const PAGE_FIELDS = "id,slug,title,content,date,modified";

/**
 * Fetch from the WP REST API with a timeout, retrying once at runtime.
 *
 * At runtime it throws on failure on purpose: during ISR a thrown error keeps the last good
 * page online, whereas returning [] would replace it with an empty page / 404. Callers that can
 * live without the data should `.catch()` with a fallback.
 *
 * During `next build` it never throws: WordPress is often too slow for the build's time limit,
 * so pages are generated with empty data and fill in on their first background revalidation.
 */
async function wpFetch(path: string, init: RequestInit & { next?: { revalidate?: number } }): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < (IS_BUILD ? 1 : 2); attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        ...init,
        signal: AbortSignal.timeout(IS_BUILD ? 50_000 : 55_000), // build: stay under the 60s per-page limit
      });
      if (res.ok) return res;
      lastError = new Error(`WP ${path} responded ${res.status}`);
      if (res.status < 500) break; // 4xx won't improve on retry
    } catch (error) {
      lastError = error;
    }
  }
  if (IS_BUILD) {
    console.warn(`WordPress unavailable during build (${path}); using empty data`, lastError);
    return new Response("[]", { headers: { "content-type": "application/json", "x-wp-total": "0", "x-wp-totalpages": "0" } });
  }
  throw lastError;
}

// Media lives on the WordPress host, which some visitors' networks can't reach. Point every
// uploads URL at our own domain instead; next.config rewrites /wp-content/uploads/* to WordPress,
// so browsers only ever talk to this site. Matches both plain and JSON-escaped (\/) forms.
const MEDIA_ORIGIN = /https?:(\\?\/)\\?\/(?:www\.)?redlanternanalytica\.com\\?\/wp-content\\?\/uploads\\?\//g;

/** Rewrite WordPress media URLs in any string (HTML, JSON text) to same-origin paths. */
export function proxyMedia(text: string) {
  return text.replace(MEDIA_ORIGIN, (_m, slash: string) =>
    slash === "\\/" ? "\\/wp-content\\/uploads\\/" : "/wp-content/uploads/"
  );
}

/** Parse a WP REST response with media URLs already pointed at this site. */
async function wpJson<T>(res: Response): Promise<T> {
  return JSON.parse(proxyMedia(await res.text())) as T;
}

/**
 * Paginated post query. `categories` / `exclude` are WP category IDs.
 */
export async function fetchPostsPage({
  perPage = 12,
  page = 1,
  categories,
  exclude,
}: {
  perPage?: number;
  page?: number;
  categories?: number[];
  exclude?: number[];
} = {}): Promise<PostsPage> {
  const params = new URLSearchParams({ per_page: String(perPage), page: String(page), _embed: EMBED });
  if (categories?.length) params.set("categories", categories.join(","));
  if (exclude?.length) params.set("categories_exclude", exclude.join(","));
  const res = await wpFetch(`/posts?${params}`, { next: { revalidate: 1800 } });
  return {
    posts: await wpJson<WPPost[]>(res),
    total: Number(res.headers.get("x-wp-total") ?? 0),
    totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
  };
}

export async function fetchPosts(limit = 5): Promise<WPPost[]> {
  return (await fetchPostsPage({ perPage: limit })).posts;
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const res = await wpFetch(`/categories?per_page=100`, { next: { revalidate: 86400 } });
  return wpJson<WPCategory[]>(res);
}

/**
 * Resolve a category by exact slug. Sub-categories (e.g. china under asia) are
 * returned in `ids` so a parent archive also lists its children's posts.
 */
export async function resolveCategory(
  slug: string
): Promise<{ category: WPCategory; ids: number[] } | null> {
  const categories = await fetchCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const ids = [category.id, ...categories.filter((c) => c.parent === category.id).map((c) => c.id)];
  return { category, ids };
}

export async function fetchPostsByCategory(slug: string, limit = 20): Promise<WPPost[]> {
  const resolved = await resolveCategory(slug);
  if (!resolved) return [];
  return (await fetchPostsPage({ perPage: limit, categories: resolved.ids })).posts;
}

/** Returns null when no post has this slug; throws when WordPress can't be reached. */
export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&_embed=${EMBED}`, { next: { revalidate: 3600 } });
  const posts = await wpJson<WPPost[]>(res);
  return posts[0] ?? null;
}

/** Returns null when no page has this slug; throws when WordPress can't be reached. */
export async function fetchPageBySlug(slug: string): Promise<WPPost | null> {
  const res = await wpFetch(`/pages?slug=${encodeURIComponent(slug)}&_fields=${PAGE_FIELDS}`, { next: { revalidate: 3600 } });
  const pages = await wpJson<WPPost[]>(res);
  return pages[0] ?? null;
}

export async function searchPosts(query: string, limit = 20): Promise<WPPost[]> {
  try {
    const res = await wpFetch(`/posts?search=${encodeURIComponent(query)}&per_page=${limit}&_embed=${EMBED}`, {
      cache: "no-store", // Search results shouldn't be cached aggressively
    });
    return await wpJson<WPPost[]>(res);
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  hellip: "\u2026", ndash: "\u2013", mdash: "\u2014",
  lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201C", rdquo: "\u201D",
};

/**
 * Decode HTML entities (WP titles arrive as e.g. "India&#8217;s"). Safe to render as text.
 */
export function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/**
 * Utility function to strip HTML tags from a string
 */
export function stripHtml(html: string) {
  return decodeEntities(html.replace(/<[^>]*>?/gm, ""))
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------------------------------------------ */
/* Trackers (digests)                                                  */
/* ------------------------------------------------------------------ */

export interface TrackerIssue {
  title: string;
  period: string;
  cover?: string;
  pdf: string;
}

export interface Tracker {
  slug: string;
  title: string;
  description: string;
  issues: TrackerIssue[];
  modified?: string;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/**
 * Derive a human period ("February 2026", "1\u201315 August 2025") from a PDF file name.
 * When the name has no year, the upload folder (/uploads/YYYY/MM/) is used to infer it.
 */
function issuePeriod(pdfUrl: string): string {
  const file = decodeURIComponent(pdfUrl.split("/").pop() || "").replace(/\.pdf$/i, "").toLowerCase();
  const words = file.split(/[^a-z0-9]+/).filter(Boolean);

  let month = -1;
  for (const w of words) {
    // Abbreviations ("feb", "sept") or near-misspellings ("janurary"), but not words like "decision"
    const idx = MONTHS.findIndex(
      (m) =>
        (w.length >= 3 && m.startsWith(w)) ||
        (w.length > 4 && m.slice(0, 4) === w.slice(0, 4) && Math.abs(m.length - w.length) <= 1)
    );
    if (idx !== -1) { month = idx; break; }
  }
  const yearMatch = file.match(/20\d\d/);
  let year = yearMatch ? Number(yearMatch[0]) : undefined;

  if (!year && month !== -1) {
    const upload = pdfUrl.match(/uploads\/(20\d\d)\/(\d\d)\//);
    if (upload) {
      year = Number(upload[1]);
      if (month + 1 > Number(upload[2])) year -= 1;
    }
  }

  const range = file.match(/(?:^|[^0-9])(\d{1,2})(?:st|nd|rd|th)?[- ](?:to|t0)?-?(\d{1,2})(?:st|nd|rd|th)?(?=[^0-9])/);
  const dayRange = range && Number(range[1]) <= 31 && Number(range[2]) <= 31 ? `${Number(range[1])}\u2013${Number(range[2])} ` : "";

  if (month === -1) return year ? String(year) : "";
  const monthName = MONTHS[month][0].toUpperCase() + MONTHS[month].slice(1);
  return `${dayRange}${monthName}${year ? ` ${year}` : ""}`;
}

/** Pick the widest srcset candidate up to `maxWidth`, falling back to src. */
function bestImage(tag: string, maxWidth = 1100): string | undefined {
  const src = tag.match(/\ssrc=["']([^"']+)["']/i)?.[1];
  const srcset = tag.match(/\ssrcset=["']([^"']+)["']/i)?.[1];
  if (!srcset) return src;
  const candidates = srcset
    .split(",")
    .map((c) => c.trim().split(/\s+/))
    .map(([url, w]) => ({ url, w: parseInt(w, 10) || 0 }))
    .filter((c) => c.w && c.w <= maxWidth)
    .sort((a, b) => b.w - a.w);
  return candidates[0]?.url ?? src;
}

/**
 * Digest pages in WordPress are Elementor layouts of (cover image -> "View More" PDF button)
 * pairs. Walk the markup in document order and pair each PDF link with the image before it.
 */
export function parseTrackerHtml(html: string): Omit<Tracker, "slug" | "title"> {
  const issues: TrackerIssue[] = [];
  const seen = new Set<string>();
  let pendingCover: string | undefined;

  const tagRe = /<img\b[^>]*>|<a\b[^>]*href=["']([^"']+\.pdf)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html))) {
    if (m[0].toLowerCase().startsWith("<img")) {
      pendingCover = bestImage(m[0]);
      continue;
    }
    const pdf = m[1];
    if (seen.has(pdf)) continue;
    seen.add(pdf);
    const period = issuePeriod(pdf);
    issues.push({ pdf, cover: pendingCover, period, title: period || "Issue" });
    pendingCover = undefined;
  }

  // First meaningful paragraph (skip "Home / ..." breadcrumbs) is the tracker's description.
  const description =
    [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((p) => stripHtml(p[1]))
      .find((t) => t.length > 60 && !/^home\s*\//i.test(t)) ?? "";

  return { description, issues };
}

export async function fetchTracker(slug: string): Promise<Tracker | null> {
  const page = await fetchPageBySlug(slug);
  if (!page) return null;
  const parsed = parseTrackerHtml(page.content.rendered);
  return { slug, title: decodeEntities(page.title.rendered), modified: page.modified ?? page.date, ...parsed };
}

/**
 * Format a WP date string into a more readable format
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
}

export async function fetchYouTubeVideos(channelId: string, limit = 4): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error("Failed to fetch YT RSS");
    const xml = await res.text();
    
    // We can use simple regex matching to extract entry fields since RSS XML structure from YT is very stable
    const entries: YouTubeVideo[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    
    while ((match = entryRegex.exec(xml)) !== null && entries.length < limit) {
      const entryStr = match[1];
      const idMatch = entryStr.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entryStr.match(/<title>([^<]+)<\/title>/);
      const linkMatch = entryStr.match(/<link rel="alternate" href="([^"]+)"/);
      const pubMatch = entryStr.match(/<published>([^<]+)<\/published>/);
      
      if (idMatch && titleMatch) {
        entries.push({
          id: idMatch[1],
          title: titleMatch[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
          link: linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${idMatch[1]}`,
          thumbnail: `https://i.ytimg.com/vi/${idMatch[1]}/maxresdefault.jpg`, // Using maxresdefault or hqdefault
          published: pubMatch ? pubMatch[1] : new Date().toISOString()
        });
      }
    }
    
    return entries;
  } catch (err) {
    console.error("Error fetching YT videos:", err);
    return [];
  }
}

/**
 * Fetch several digest pages in a single request (WP accepts a comma-separated slug list),
 * returned in the order given. Pages that are missing or have no issues are left out.
 */
export async function fetchTrackers(slugs: string[]): Promise<Tracker[]> {
  const res = await wpFetch(
    `/pages?slug=${slugs.map(encodeURIComponent).join(",")}&per_page=${slugs.length}&_fields=${PAGE_FIELDS}`,
    { next: { revalidate: 3600 } }
  );
  const pages = await wpJson<WPPost[]>(res);
  return slugs.flatMap((slug) => {
    const page = pages.find((p) => p.slug === slug);
    if (!page) return [];
    const parsed = parseTrackerHtml(page.content.rendered);
    return parsed.issues.length
      ? [{ slug, title: decodeEntities(page.title.rendered), modified: page.modified ?? page.date, ...parsed }]
      : [];
  });
}
