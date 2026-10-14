import IntelligenceFeedItem from "./IntelligenceFeedItem";
import { WPPost, WPCategory, stripHtml, formatDate } from "@/lib/api";
import Link from "next/link";

const REGION_SLUGS = ["afghanistan", "asia", "china", "west-asia"];

export default function LiveTelemetryDashboard({
  posts,
  categories,
  totalAnalyses,
}: {
  posts: WPPost[];
  categories: WPCategory[];
  totalAnalyses: number;
}) {
  const desks = categories
    .filter((c) => c.slug !== "uncategorized" && c.count > 0)
    .sort((a, b) => b.count - a.count);
  const regions = REGION_SLUGS.map((slug) => desks.find((c) => c.slug === slug)).filter((c): c is WPCategory => !!c);

  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24" id="live-telemetry">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                STATEMENTS · COMMENTARIES · MEDIA
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Latest Intelligence Feeds
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {posts[0] && (
              <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-caps text-label-caps shadow-sm">
                UPDATED {formatDate(posts[0].date)}
              </span>
            )}
            {totalAnalyses > 0 && (
              <span className="px-3.5 py-1.5 rounded-full bg-primary-container/15 text-primary font-label-caps text-label-caps font-semibold">
                {totalAnalyses} ANALYSES ON RECORD
              </span>
            )}
          </div>
        </div>

        {/* Two columns: feed list + stats panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Feed list — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post, index) => {
                const categoryObj = post._embedded?.["wp:term"]?.[0]?.[0];
                const categoryName = categoryObj ? stripHtml(categoryObj.name) : "Intelligence";
                const colors = ["text-primary", "text-secondary", "text-error", "text-primary", "text-tertiary"];
                return (
                  <Link href={`/article/${post.slug}`} key={post.id} data-reveal style={{ "--i": index } as React.CSSProperties} className="block">
                    <IntelligenceFeedItem
                      category={categoryName}
                      categoryColorClass={colors[index % colors.length]}
                      date={formatDate(post.date)}
                      title={stripHtml(post.title.rendered)}
                      summary={stripHtml(post.excerpt.rendered)}
                    />
                  </Link>
                );
              })
            ) : (
              <p className="text-on-surface-variant font-body-sm py-8 text-center">No recent statements or commentaries.</p>
            )}
            <Link
              href="/articles"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full border border-outline/30 py-3 font-body-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Browse all publications
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </Link>
          </div>

          {/* Stats panel — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Active theatres count */}
            <div data-reveal className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-headline-sm text-headline-sm text-on-surface">Research Desks</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">ANALYSES PUBLISHED</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {desks.slice(0, 6).map(item => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="group flex flex-col gap-1 rounded-2xl bg-surface-container p-4 hover:bg-surface-container-high transition-colors"
                  >
                    <span className="font-label-numeric text-[28px] font-extralight text-primary leading-none">
                      {item.count}
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase group-hover:text-primary transition-colors">
                      {stripHtml(item.name)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse categories CTA */}
            <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="rounded-3xl bg-primary p-7 shadow-sm flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-on-primary/70 uppercase">BROWSE BY REGION</span>
              <h3 className="font-headline-sm text-on-primary leading-snug">
                Explore all {desks.length} research desks
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {regions.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="rounded-full border border-on-primary/30 px-3 py-1 font-label-caps text-label-caps text-on-primary/90 hover:bg-on-primary/10 transition-colors"
                  >
                    {stripHtml(cat.name)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
