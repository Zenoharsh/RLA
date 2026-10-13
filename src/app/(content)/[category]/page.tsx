import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Footer from "@/components/Footer";
import PostGrid from "@/components/PostGrid";
import TrackerIssueCard from "@/components/TrackerIssueCard";
import {
  decodeEntities,
  fetchPageBySlug,
  fetchPostBySlug,
  fetchPostsPage,
  fetchTracker,
  resolveCategory,
  PostsPage,
  Tracker,
} from "@/lib/api";
import { COMING_SOON, POST_LISTINGS, TRACKERS } from "@/lib/site";

const PER_PAGE = 24;

type Resolved =
  | { kind: "tracker"; tracker: Tracker }
  | { kind: "listing"; title: string; eyebrow: string; total: number; result: PostsPage }
  | { kind: "coming-soon"; title: string; blurb: string }
  | { kind: "page"; title: string; html: string };

/**
 * Resolve a top-level slug to content, in priority order:
 * digest page with issues → mapped listing → WP category → known placeholder →
 * old WP post permalink (redirect) → plain WP page.
 */
async function resolve(slug: string, page: number): Promise<Resolved | null> {
  const tracker = await fetchTracker(slug);
  if (tracker && tracker.issues.length > 0) return { kind: "tracker", tracker };

  const listing = POST_LISTINGS[slug];
  if (listing) {
    let ids: number[] | undefined;
    if (listing.categories) {
      const resolved = await Promise.all(listing.categories.map(resolveCategory));
      ids = resolved.flatMap((r) => r?.ids ?? []);
    }
    const result = await listingPage(page, ids);
    return { kind: "listing", title: listing.title, eyebrow: listing.eyebrow, total: result.total, result };
  }

  const category = await resolveCategory(slug);
  if (category) {
    const result = await listingPage(page, category.ids);
    return {
      kind: "listing",
      title: decodeEntities(category.category.name),
      eyebrow: "INTELLIGENCE ARCHIVE",
      total: result.total || category.category.count,
      result,
    };
  }

  if (COMING_SOON[slug]) return { kind: "coming-soon", ...COMING_SOON[slug] };

  // Old WordPress post URLs were /<post-slug>/ — send them to the article route.
  const post = await fetchPostBySlug(slug);
  if (post) permanentRedirect(`/article/${post.slug}`);

  const wpPage = await fetchPageBySlug(slug); // deduped with the fetchTracker request above
  const html = wpPage?.content.rendered ?? "";
  if (wpPage && html.trim()) return { kind: "page", title: decodeEntities(wpPage.title.rendered), html };

  return null;
}

/** WP answers 400 for a page past the end; treat that as 404 rather than an error. */
async function listingPage(page: number, categories?: number[]) {
  try {
    return await fetchPostsPage({ perPage: PER_PAGE, page, categories });
  } catch (error) {
    if (page > 1) notFound();
    throw error;
  }
}

function pageNumber(raw?: string) {
  const n = Number(raw);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = await resolve(category, pageNumber((await searchParams).page));
  if (!resolved) return {};
  const title = resolved.kind === "tracker" ? resolved.tracker.title : resolved.title;
  const description = resolved.kind === "tracker" ? resolved.tracker.description : undefined;
  return { title: `${title} | Red Lantern Analytica`, description };
}

export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: slug } = await params;
  const page = pageNumber((await searchParams).page);
  const resolved = await resolve(slug, page);
  if (!resolved) notFound();

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {resolved.kind === "tracker" && <TrackerView tracker={resolved.tracker} />}

        {resolved.kind === "listing" && (
          <>
            <Header eyebrow={resolved.eyebrow} title={resolved.title}>
              {resolved.total > 0
                ? `${resolved.total} published ${resolved.total === 1 ? "analysis" : "analyses"}, newest first.`
                : "No publications in this section yet."}
            </Header>
            {resolved.result.posts.length > 0 ? (
              <PostGrid
                posts={resolved.result.posts}
                fallbackCategory={resolved.title.toUpperCase()}
                page={page}
                totalPages={resolved.result.totalPages}
                basePath={`/${slug}`}
                numberOffset={(page - 1) * PER_PAGE}
              />
            ) : (
              <EmptyState />
            )}
          </>
        )}

        {resolved.kind === "coming-soon" && (
          <>
            <Header eyebrow="IN PREPARATION" title={resolved.title}>
              {resolved.blurb}
            </Header>
            <EmptyState />
          </>
        )}

        {resolved.kind === "page" && (
          <>
            <Header eyebrow="RED LANTERN ANALYTICA" title={resolved.title} />
            <div
              className="wp-content max-w-4xl"
              dangerouslySetInnerHTML={{ __html: resolved.html }}
            />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

function Header({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-12 space-y-3">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">{eyebrow}</span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{title}</h1>
      {children && <p className="text-on-surface-variant font-body-md max-w-2xl leading-relaxed">{children}</p>}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-outline/30 p-10 text-center space-y-5">
      <p className="text-on-surface-variant">Explore the latest monthly digests while this section is being populated.</p>
      <div className="flex flex-wrap justify-center gap-2">
        {TRACKERS.slice(0, 6).map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="rounded-full bg-surface-container px-4 py-1.5 m3-label-md text-on-surface hover:bg-primary hover:text-white transition-colors"
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function TrackerView({ tracker }: { tracker: Tracker }) {
  const [latest, ...archive] = tracker.issues;
  const others = TRACKERS.filter((t) => t.slug !== tracker.slug);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
        <div className="lg:col-span-4 lg:order-2">
          <TrackerIssueCard issue={latest} trackerTitle={tracker.title} latest size="lg" />
        </div>
        <div className="lg:col-span-8 lg:order-1 space-y-6">
          <Header eyebrow="RLA BRIEFS · MONTHLY TRACKER" title={tracker.title}>
            {tracker.description}
          </Header>
          <dl className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { k: "Issues", v: String(tracker.issues.length) },
              { k: "Latest", v: latest.period || "—" },
              { k: "Oldest", v: tracker.issues[tracker.issues.length - 1].period || "—" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-surface-container-low p-4">
                <dt className="m3-label-sm uppercase tracking-widest text-on-surface-variant">{s.k}</dt>
                <dd className="m3-title-md text-on-surface mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={latest.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 m3-label-lg uppercase tracking-widest text-white hover:bg-primary/90 transition-colors"
          >
            Read the {latest.period || "latest"} issue
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>
      </div>

      {archive.length > 0 && (
        <section>
          <h2 className="m3-headline-sm text-on-surface mb-6">Previous issues</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {archive.map((issue) => (
              <TrackerIssueCard key={issue.pdf} issue={issue} trackerTitle={tracker.title} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-20 pt-10 border-t border-outline/10">
        <h2 className="m3-label-lg uppercase tracking-widest text-on-surface-variant mb-4">Other trackers</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="rounded-full bg-surface-container px-4 py-1.5 m3-label-md text-on-surface hover:bg-primary hover:text-white transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
