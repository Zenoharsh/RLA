import { WPPost, stripHtml, formatDate } from "@/lib/api";
import Link from "next/link";

interface Props {
  posts: WPPost[];
}

export default function MediaCoverage({ posts }: Props) {
  // Fall back to static entries if no WP posts found
  const staticItems = [
    {
      category: "SECURITY COUNCIL REVIEWS",
      date: "AUG 20, 2026",
      title: "India's Call for Transparency in UNSC Terror Listings Deserves Global Support",
      summary: "Cited in multilateral deliberations concerning procedural vetoes and algorithmic counter-terrorism monitoring.",
      citationSource: "CITED IN GLOBAL PRESS WIRE",
    },
    {
      category: "SPECIAL SUMMIT REPORT",
      date: "SEP 16, 2026",
      title: "BRICS 2026 & The New Delhi Declaration",
      summary: "Widely disseminated analysis on bilateral currency swaps and strategic autonomy across Indo-Pacific channels.",
      citationSource: "POLICY MEMO SYNDICATION",
    },
    {
      category: "CYBER FORENSICS REPORT",
      date: "AUG 3, 2026",
      title: "Red Lantern Analytica Releases Report on Chinese Cyber Narrative Operations",
      summary: "Featured across national broadcast media addressing cognitive defense protocols and non-kinetic digital warfare.",
      citationSource: "TECH DIPLOMACY FORUM",
    },
  ];

  const hasRealPosts = posts && posts.length > 0;

  return (
    <section className="w-full bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-semibold">
                EXTERNAL RECOGNITION
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Media Coverage &amp; Multilateral Citations
            </h2>
          </div>
          <Link
            href="/media-coverage"
            className="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-all shrink-0"
          >
            All Coverage
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hasRealPosts
            ? posts.slice(0, 3).map((post) => {
                const categoryObj = post._embedded?.["wp:term"]?.[0]?.[0];
                const categoryName = categoryObj ? categoryObj.name.toUpperCase() : "MEDIA COVERAGE";
                return (
                  <Link href={`/article/${post.slug}`} key={post.id} className="block group h-full">
                    <article className="h-full rounded-3xl bg-surface-container-lowest p-7 shadow-sm flex flex-col hover:shadow-md transition-all">
                      <div className="flex items-center justify-between text-on-surface-variant mb-3">
                        <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">{categoryName}</span>
                        <span className="font-label-caps text-label-caps">{formatDate(post.date)}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-3">
                        {post.title.rendered}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 flex-1">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="pt-5 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps mt-auto">
                        <span className="uppercase">MEDIA COVERAGE</span>
                        <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">verified</span>
                      </div>
                    </article>
                  </Link>
                );
              })
            : staticItems.map((item) => (
                <article key={item.title} className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm flex flex-col hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-on-surface-variant mb-3">
                    <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">{item.category}</span>
                    <span className="font-label-caps text-label-caps">{item.date}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug line-clamp-2 mb-3">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 flex-1">{item.summary}</p>
                  <div className="pt-5 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps mt-auto">
                    <span className="uppercase">{item.citationSource}</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
