const API_URL = "https://redlanternanalytica.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
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
}

export async function fetchPosts(limit = 5): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts?per_page=${limit}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${API_URL}/categories?per_page=100`, {
      next: { revalidate: 86400 }, // Cache for a day
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchPostsByCategory(slug: string, limit = 20): Promise<WPPost[]> {
  try {
    // First resolve the slug to an ID
    const categories = await fetchCategories();
    
    // Exact match first
    let category = categories.find(c => c.slug === slug);
    
    // If not found, try fuzzy matching (e.g. mapping /china-digest to 'china', /reports to 'report')
    if (!category) {
      const cleanSlug = slug.replace(/-digest|-brief|-region/g, '').replace(/s$/, ''); // removes suffixes and trailing 's' (reports -> report)
      category = categories.find(c => 
        c.slug === cleanSlug || slug.includes(c.slug) || c.name.toLowerCase().includes(cleanSlug.toLowerCase())
      );
    }

    if (!category) {
      console.warn(`Category not found for slug: ${slug}`);
      return [];
    }

    const res = await fetch(`${API_URL}/posts?categories=${category.id}&per_page=${limit}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch category posts");
    return res.json();
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function fetchPageBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const pages = await res.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

export async function searchPosts(query: string, limit = 20): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts?search=${encodeURIComponent(query)}&per_page=${limit}&_embed`, {
      cache: "no-store", // Search results shouldn't be cached aggressively
    });
    if (!res.ok) throw new Error("Failed to search posts");
    return res.json();
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}

/**
 * Utility function to strip HTML tags from a string
 */
export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
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
