import { fetchPosts, stripHtml, formatDate } from "@/lib/api";
import Footer from "@/components/Footer";
import DossierCard from "@/components/DossierCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArchivesPage() {
  const posts = await fetchPosts(50); // Fetch a large batch of latest posts

  if (!posts || posts.length === 0) notFound();

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Archive header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
              GLOBAL INTELLIGENCE ARCHIVE
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            All Archives
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            {posts.length} latest declassified reports, diplomatic analyses, and strategic syntheses across all categories.
          </p>
        </div>

        {/* Uniform 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const authorObj = post._embedded?.author?.[0];
            const authorName = authorObj ? authorObj.name : "Red Lantern Analytica";
            const authorInitials = authorName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            const catObj = post._embedded?.["wp:term"]?.[0]?.[0];
            const catName = catObj ? catObj.name.toUpperCase() : "STRATEGIC BRIEF";

            return (
              <Link href={`/article/${post.slug}`} key={post.id} className="block group h-full">
                <DossierCard
                  category={catName}
                  date={formatDate(post.date)}
                  number={String(index + 1).padStart(2, "0")}
                  title={post.title.rendered}
                  summary={stripHtml(post.excerpt.rendered)}
                  authorInitials={authorInitials}
                  authorName={authorName}
                  authorTitle="Analyst"
                  colSpanClass="h-full"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
