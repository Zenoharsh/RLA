import DossierCard from "./DossierCard";
import { WPPost, stripHtml, formatDate } from "@/lib/api";
import Link from "next/link";

function getCardMeta(post: WPPost, index: number) {
  const categoryObj = post._embedded?.["wp:term"]?.[0]?.[0];
  const categoryName = categoryObj ? categoryObj.name.toUpperCase() : "STRATEGIC BRIEF";
  const categorySlug = categoryObj ? categoryObj.slug : "";
  const authorObj = post._embedded?.author?.[0];
  const authorName = authorObj ? authorObj.name : "Red Lantern Analytica";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  const numberString = String(index + 1).padStart(2, "0");
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? undefined;
  return { categoryName, categorySlug, authorName, authorInitials, numberString, featuredImage };
}

export default function FeaturedDossiers({ posts, activeCategory = "all" }: { posts: WPPost[], activeCategory?: string }) {
  if (!posts || posts.length === 0) return null;

  // First post is the hero/lead card — full width
  const [lead, ...rest] = posts;
  const leadMeta = getCardMeta(lead, 0);

  const archiveLink = activeCategory === "all" ? "/archives" : `/category/${activeCategory}`;

  return (
    <section className="w-full bg-background py-16 lg:py-24" id="featured-dossiers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                CORE RESEARCH COMMUNIQUE
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Critical Analyses &amp; Declassified Inquiries
            </h2>
          </div>
          <Link
            href={archiveLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2 font-label-caps text-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-all shrink-0"
          >
            View All Archives
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </Link>
        </div>

        {/* Lead card — spans full width */}
        <div className="mb-8">
          <Link href={`/article/${lead.slug}`} className="block group">
            <article className="relative rounded-3xl bg-surface-container-lowest shadow-[0_4px_24px_-4px_rgba(27,42,50,0.07)] hover:shadow-[0_16px_40px_-8px_rgba(27,42,50,0.13)] transition-all duration-300 overflow-hidden flex flex-col md:flex-row md:min-h-[280px]">
              {/* Left accent bar */}
              <div className="w-full md:w-1.5 h-1.5 md:h-auto bg-primary shrink-0" />
              <div className="flex flex-col flex-1 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rounded-full bg-surface-container px-3 py-1 font-label-caps text-label-caps uppercase text-primary font-semibold tracking-wider">
                    {leadMeta.categoryName}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    {formatDate(lead.date)}
                  </span>
                  <span className="ml-auto font-label-numeric text-[40px] font-extralight text-on-surface-variant/20 group-hover:text-primary transition-colors">
                    01
                  </span>
                </div>
                <h3 className="font-headline-lg text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-4" style={{ fontSize: "28px", lineHeight: "36px" }}>
                  {lead.title.rendered}
                </h3>
                <p className="font-body-md text-on-surface-variant font-light leading-relaxed line-clamp-2 mb-6">
                  {stripHtml(lead.excerpt.rendered)}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center font-body-sm font-bold text-on-surface text-[12px]">
                      {leadMeta.authorInitials}
                    </div>
                    <span className="font-body-sm font-semibold text-on-surface">{leadMeta.authorName}</span>
                  </div>
                  <span className="h-9 w-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>

        {/* 3-column uniform grid for remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.slice(0, 5).map((post, i) => {
            const meta = getCardMeta(post, i + 1);
            return (
              <Link href={`/article/${post.slug}`} key={post.id} className="block group h-full">
                <DossierCard
                  category={meta.categoryName}
                  date={formatDate(post.date)}
                  number={meta.numberString}
                  title={post.title.rendered}
                  summary={stripHtml(post.excerpt.rendered)}
                  authorInitials={meta.authorInitials}
                  authorName={meta.authorName}
                  authorTitle="Research Analyst"
                  featuredImage={meta.featuredImage}
                  colSpanClass="h-full"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
