import HeroSection from "@/components/HeroSection";
import TrackerShelf from "@/components/TrackerShelf";
import DynamicDossierSection from "@/components/DynamicDossierSection";
import LiveTelemetryDashboard from "@/components/LiveTelemetryDashboard";
import PictureCarousel from "@/components/PictureCarousel";
import MediaCoverage from "@/components/MediaCoverage";
import LatestVideos from "@/components/LatestVideos";
import EnrollmentForm from "@/components/EnrollmentForm";
import Footer from "@/components/Footer";
import { fetchCategories, fetchPostsByCategory, fetchPostsPage, fetchTracker, formatDate, stripHtml } from "@/lib/api";
import { TRACKERS } from "@/lib/site";

// Render per request instead of at build time: WordPress is too slow to prerender within the
// build's 60s limit. WP responses are still cached (each fetch sets its own revalidate).
export const revalidate = 0;

// Short-form output goes to the feed; everything else is a long-form dossier.
const SHORT_FORM = ["statements", "commentaries", "media-coverage", "opinions"];
const EMPTY = { posts: [], total: 0, totalPages: 0 };
const STAT_LABELS: Record<string, string> = { "nuclear-issues": "Nuclear", radicalisation: "Radicalisation", "media-coverage": "Media" };

export default async function Home() {
  const categories = await fetchCategories();
  const shortIds = categories.filter((c) => SHORT_FORM.includes(c.slug)).map((c) => c.id);

  const [latest, dossiers, feed, mediaPosts, trackers] = await Promise.all([
    fetchPostsPage({ perPage: 12 }),
    // Secondary sections degrade gracefully if WordPress is slow
    fetchPostsPage({ perPage: 6, exclude: shortIds }).catch(() => EMPTY),
    fetchPostsPage({ perPage: 5, categories: shortIds }).catch(() => EMPTY),
    fetchPostsByCategory("media-coverage", 6).catch(() => []),
    Promise.all(
      TRACKERS.map(async (t) => {
        const tracker = await fetchTracker(t.slug).catch(() => null);
        return tracker?.issues.length ? { ...tracker, short: t.short } : null;
      })
    ),
  ]);

  // Hero tags: the desks that published most recently, so they change as new content is posted
  const tagMap = new Map<string, string>();
  for (const post of latest.posts) {
    for (const term of post._embedded?.["wp:term"]?.[0] ?? []) {
      if (term.slug !== "uncategorized" && !tagMap.has(term.slug)) tagMap.set(term.slug, stripHtml(term.name));
    }
  }
  const heroTags = [...tagMap].slice(0, 5).map(([slug, label]) => ({ label, href: `/${slug}` }));

  const heroStats = Object.keys(STAT_LABELS)
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c) => c && c.count > 0)
    .map((c) => ({ label: STAT_LABELS[c!.slug], href: `/${c!.slug}`, count: c!.count }));

  const lead = latest.posts[0];
  const heroLatest = lead && {
    title: stripHtml(lead.title.rendered),
    href: `/article/${lead.slug}`,
    date: formatDate(lead.date),
    category: stripHtml(lead._embedded?.["wp:term"]?.[0]?.[0]?.name ?? ""),
  };

  const liveTrackers = trackers.filter((t) => t !== null);

  return (
    <main className="w-full bg-background">
      <div className="flex flex-col w-full">

        {/* SECTION 1: HERO */}
        <HeroSection tags={heroTags} stats={heroStats} latest={heroLatest} />

        {/* SECTION 2: MONTHLY TRACKERS — the magazines come first */}
        <TrackerShelf trackers={liveTrackers} />

        {/* SECTION 3: INTERACTIVE FILTER & DOSSIERS (long-form) */}
        <DynamicDossierSection initialPosts={dossiers.posts.length ? dossiers.posts : latest.posts.slice(0, 6)} />

        {/* SECTION 4: LATEST FEED (short-form) */}
        <LiveTelemetryDashboard posts={feed.posts} categories={categories} totalAnalyses={latest.total} />

        {/* SECTION 5: PICTURE CAROUSEL (Replaces Quote Banner) */}
        <PictureCarousel />

        {/* SECTION 6: MEDIA COVERAGE */}
        <MediaCoverage posts={mediaPosts} />

        {/* SECTION 7: LATEST VIDEOS */}
        <LatestVideos />

        {/* SECTION 8: ENROLLMENT */}
        <section className="w-full bg-surface-container-low py-16 lg:py-24" id="dispatch-form">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-reveal className="rounded-3xl bg-surface-container-lowest p-8 sm:p-12 lg:p-16 shadow-[0_16px_40px_-12px_rgba(27,42,50,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary-container/10 px-3.5 py-1 text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span className="font-label-caps text-label-caps uppercase font-semibold">ENCRYPTED DISPATCH STREAM</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Direct Access to Weekly Geopolitical Intelligence
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-xl leading-relaxed">
                    Curated exclusively for diplomatic staff, corporate risk officers, and strategic research fellows. Delivers unredacted analytical syntheses directly to your secure inbox.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <EnrollmentForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
