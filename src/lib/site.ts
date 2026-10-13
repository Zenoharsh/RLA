/**
 * Site map shared by the navbar, footer, home page and the catch-all content route.
 * Slugs mirror the original WordPress permalinks so old links keep working.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Digest pages in WordPress (cover image + PDF per issue). Order = tab order on the home page. */
export const TRACKERS: { slug: string; label: string; short: string }[] = [
  { slug: "indias-diplomatic-digest", label: "India's Diplomatic Digest", short: "India Diplomacy" },
  { slug: "china-digest", label: "China Digest", short: "China" },
  { slug: "indian-ocean-region-digest", label: "Indian Ocean Region Digest", short: "Indian Ocean" },
  { slug: "tibet-brief", label: "Tibet Digest", short: "Tibet" },
  { slug: "neighbourhood-digest", label: "Neighbourhood Digest", short: "Neighbourhood" },
  { slug: "europe-digest", label: "Europe Digest", short: "Europe" },
  { slug: "africa-digest", label: "Africa Digest", short: "Africa" },
  { slug: "america-digest", label: "America Digest", short: "Americas" },
  { slug: "tech-ai-digest", label: "Tech & AI Digest", short: "Tech & AI" },
];

/**
 * Publication routes that are listings of WordPress posts.
 * `categories: null` means all posts.
 */
export const POST_LISTINGS: Record<string, { title: string; eyebrow: string; categories: string[] | null }> = {
  articles: { title: "Articles", eyebrow: "ALL PUBLICATIONS", categories: null },
  reports: { title: "Reports", eyebrow: "RESEARCH REPORTS", categories: ["report"] },
  "west-asia-digest": { title: "West Asia", eyebrow: "REGIONAL DESK", categories: ["west-asia"] },
};

/** Sections that exist in the menu but have no published content in WordPress yet. */
export const COMING_SOON: Record<string, { title: string; blurb: string }> = {
  "rla-events": {
    title: "Events & Press Releases",
    blurb: "Announcements of RLA roundtables, panel discussions and official press releases will be published here.",
  },
  "weekly-ir-magazine": {
    title: "Weekly IR Magazine",
    blurb: "RLA's weekly international-relations magazine is being prepared for its web edition. Meanwhile, browse the monthly regional digests.",
  },
  "tech-ai-digest": {
    title: "Tech & AI Digest",
    blurb: "A monthly tracker of technology policy, AI governance and the strategic contest over critical technologies.",
  },
};

export const ABOUT_LINKS: NavLink[] = [
  { label: "About RLA", href: "/about-rla" },
  { label: "Mentors", href: "/mentors" },
  { label: "Team", href: "/team" },
];

export const PUBLICATION_LINKS: NavLink[] = [
  { label: "Articles", href: "/articles" },
  { label: "Statements", href: "/statements" },
  { label: "Reports", href: "/reports" },
  { label: "Opinions", href: "/opinions" },
  { label: "Commentaries", href: "/commentaries" },
  { label: "Events & Press Release", href: "/rla-events" },
  { label: "Media Coverage", href: "/media-coverage" },
];

export const BRIEF_LINKS: NavLink[] = [
  ...TRACKERS.map((t) => ({ label: t.label, href: `/${t.slug}` })),
  { label: "Podcast", href: "/podcast" },
  { label: "Weekly IR Magazine", href: "/weekly-ir-magazine" },
];

export const CONTRIBUTE_LINKS: NavLink[] = [
  { label: "Submissions", href: "/submission" },
  { label: "Careers", href: "/careers" },
];
