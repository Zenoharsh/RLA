import Link from "next/link";
import DossierCard from "./DossierCard";
import { WPPost, stripHtml, formatDate } from "@/lib/api";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

/** Uniform 3-column grid of post cards with optional pagination. */
export default function PostGrid({
  posts,
  fallbackCategory = "STRATEGIC BRIEF",
  page = 1,
  totalPages = 1,
  basePath,
  numberOffset = 0,
}: {
  posts: WPPost[];
  fallbackCategory?: string;
  page?: number;
  totalPages?: number;
  basePath?: string;
  numberOffset?: number;
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const authorName = post._embedded?.author?.[0]?.name ?? "Red Lantern Analytica";
          const catObj = post._embedded?.["wp:term"]?.[0]?.[0];
          return (
            <Link
              href={`/article/${post.slug}`}
              key={post.id}
              data-reveal
              style={{ "--i": index % 3 } as React.CSSProperties}
              className="block group h-full"
            >
              <DossierCard
                category={catObj ? stripHtml(catObj.name).toUpperCase() : fallbackCategory}
                date={formatDate(post.date)}
                number={String(numberOffset + index + 1).padStart(2, "0")}
                title={post.title.rendered}
                summary={stripHtml(post.excerpt.rendered)}
                authorInitials={initials(authorName)}
                authorName={authorName}
                authorTitle="Analyst"
                featuredImage={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                colSpanClass="h-full"
              />
            </Link>
          );
        })}
      </div>

      {basePath && totalPages > 1 && (
        <nav className="mt-14 flex items-center justify-center gap-3" aria-label="Pagination">
          {page > 1 && (
            <Link
              href={page === 2 ? basePath : `${basePath}/page/${page - 1}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2 m3-label-lg text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Newer
            </Link>
          )}
          <span className="m3-label-md text-on-surface-variant uppercase tracking-widest px-3">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`${basePath}/page/${page + 1}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2 m3-label-lg text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Older
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
