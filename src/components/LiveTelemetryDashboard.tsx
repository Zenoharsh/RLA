import IntelligenceFeedItem from "./IntelligenceFeedItem";
import { WPPost, stripHtml, formatDate } from "@/lib/api";
import Link from "next/link";

export default function LiveTelemetryDashboard({ posts }: { posts: WPPost[] }) {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24" id="live-telemetry">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                GEOSPATIAL SITUATIONAL AWARENESS
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Latest Intelligence Feeds
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-caps text-label-caps shadow-sm">
              GRID INTERVAL: 15 MIN
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-primary-container/15 text-primary font-label-caps text-label-caps font-semibold">
              ENCRYPTED TELEMETRY
            </span>
          </div>
        </div>

        {/* Two columns: feed list + stats panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Feed list — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post, index) => {
                const categoryObj = post._embedded?.["wp:term"]?.[0]?.[0];
                const categoryName = categoryObj ? categoryObj.name : "Intelligence";
                const categorySlug = categoryObj ? categoryObj.slug : "";
                const colors = ["text-primary", "text-secondary", "text-error", "text-primary", "text-tertiary"];
                return (
                  <Link href={`/article/${post.slug}`} key={post.id} className="block">
                    <IntelligenceFeedItem
                      category={categoryName}
                      categoryColorClass={colors[index % colors.length]}
                      date={formatDate(post.date)}
                      title={post.title.rendered}
                      summary={stripHtml(post.excerpt.rendered)}
                    />
                  </Link>
                );
              })
            ) : (
              <p className="text-on-surface-variant font-body-sm py-8 text-center">Loading intelligence feed...</p>
            )}
            <Link
              href="/nuclear-issues"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full border border-outline/30 py-3 font-body-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Access Complete Feed Archives
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </Link>
          </div>

          {/* Stats panel — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Active theatres count */}
            <div className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-headline-sm text-headline-sm text-on-surface">Coverage Map</span>
                <span className="font-label-caps text-label-caps text-primary font-bold">LIVE</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Nuclear Issues", count: "208", slug: "nuclear-issues" },
                  { label: "Radicalisation", count: "110", slug: "radicalisation" },
                  { label: "Media Coverage", count: "84", slug: "media-coverage" },
                  { label: "Commentaries", count: "29", slug: "commentaries" },
                  { label: "Afghanistan", count: "74", slug: "afghanistan" },
                  { label: "Statements", count: "6", slug: "statements" },
                ].map(item => (
                  <Link
                    key={item.slug}
                    href={`/category/${item.slug}`}
                    className="group flex flex-col gap-1 rounded-2xl bg-surface-container p-4 hover:bg-surface-container-high transition-colors"
                  >
                    <span className="font-label-numeric text-[28px] font-extralight text-primary leading-none">
                      {item.count}
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse categories CTA */}
            <div className="rounded-3xl bg-primary p-7 shadow-sm flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-on-primary/70 uppercase">BROWSE BY REGION</span>
              <h3 className="font-headline-sm text-on-primary leading-snug">
                Explore All 14 Active Intelligence Theaters
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Afghanistan", "Asia", "West Asia", "Reports"].map(cat => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="rounded-full border border-on-primary/30 px-3 py-1 font-label-caps text-label-caps text-on-primary/90 hover:bg-on-primary/10 transition-colors"
                  >
                    {cat}
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
