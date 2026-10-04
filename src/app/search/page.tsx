import { searchPosts, stripHtml, formatDate } from "@/lib/api";

import Footer from "@/components/Footer";
import DossierCard from "@/components/DossierCard";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const posts = query ? await searchPosts(query, 50) : [];

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">


      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">SEARCH ARCHIVE</span>
          </div>
          <h1 className="text-white font-display-hero text-[42px] tracking-tight leading-[1.1]">
            {query ? `Results for "${query}"` : "Search the Intelligence Archive"}
          </h1>
          
          <form action="/search" method="GET" className="max-w-3xl relative group mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-surface-container-low border border-outline/20 rounded-full p-2 pl-6 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
              <span className="material-symbols-outlined text-[24px] text-on-surface-variant shrink-0">search</span>
              <input
                name="q"
                defaultValue={query}
                autoFocus={!query}
                className="flex-1 bg-transparent text-on-surface text-[16px] outline-none placeholder:text-on-surface-variant/60 px-4 py-3"
                placeholder="Search dossiers, regional analyses, strategic reports..."
                type="text"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-primary px-8 py-3 m3-label-lg text-white uppercase tracking-widest hover:bg-primary/90 shadow-sm transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {query && (
            <p className="text-on-surface-variant font-body-md max-w-2xl pt-2">
              {posts.length} intelligence briefs and reports found.
            </p>
          )}
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const authorObj = post._embedded?.author?.[0];
              const authorName = authorObj ? authorObj.name : "Red Lantern Analytica";
              const authorInitials = authorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              
              const categoryObj = post._embedded?.['wp:term']?.[0]?.[0];
              const categoryName = categoryObj ? categoryObj.name.toUpperCase() : "STRATEGIC BRIEF";

              return (
                <Link href={`/article/${post.slug}`} key={post.id} className="block group h-full">
                  <DossierCard
                    category={categoryName}
                    date={formatDate(post.date)}
                    number=""
                    title={post.title.rendered}
                    summary={stripHtml(post.excerpt.rendered)}
                    authorInitials={authorInitials}
                    authorName={authorName}
                    authorTitle="Analyst"
                    colSpanClass="col-span-1 h-full"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          query && (
            <div className="py-20 text-center text-on-surface-variant font-body-lg">
              No declassified materials found matching your query.
            </div>
          )
        )}
      </div>

      <Footer />
    </main>
  );
}
