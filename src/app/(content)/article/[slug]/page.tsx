import { fetchPostBySlug, fetchPostsByCategory, formatDate, stripHtml } from "@/lib/api";
import Footer from "@/components/Footer";
import DossierCard from "@/components/DossierCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const authorObj = post._embedded?.author?.[0];
  const authorName = authorObj ? authorObj.name : "Red Lantern Analytica";
  const authorInitials = authorName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  
  const categoryObj = post._embedded?.['wp:term']?.[0]?.[0];
  const categoryName = categoryObj ? categoryObj.name : "Strategic Brief";
  const categorySlug = categoryObj ? categoryObj.slug : "reports";

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Fetch related posts, excluding current post
  const rawRelated = await fetchPostsByCategory(categorySlug, 4);
  const relatedPosts = rawRelated.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      
      {/* Optional Featured Image Header */}
      {featuredImage && (
        <div className="w-full h-[40vh] min-h-[300px] max-h-[500px] relative mt-16 lg:mt-20">
          <Image 
            src={featuredImage} 
            alt="Featured" 
            fill
            priority
            className="object-cover" 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>
      )}

      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${featuredImage ? '-mt-32 relative z-10' : 'py-16 lg:py-24'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar (Sticky Share) */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32 flex flex-col items-center gap-6 text-on-surface-variant">
              <span className="font-label-caps text-[10px] uppercase tracking-widest font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>Share Dispatch</span>
              <div className="w-px h-12 bg-outline/20"></div>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(`https://redlanternanalytica.com/article/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-outline/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://redlanternanalytica.com/article/${post.slug}`)}&title=${encodeURIComponent(post.title.rendered)}`} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-outline/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title.rendered)}&body=${encodeURIComponent(`Read this dispatch from Red Lantern Analytica: https://redlanternanalytica.com/article/${post.slug}`)}`} className="h-10 w-10 rounded-full border border-outline/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </a>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="col-span-1 lg:col-span-8">
            <header className="space-y-6 mb-12 border-b border-surface-container-high pb-12">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <Link href={`/category/${categorySlug}`} className="rounded-full bg-primary-container/10 px-3 py-1 font-label-caps text-[11px] uppercase text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                  {categoryName}
                </Link>
                <time className="font-label-caps text-label-caps">{formatDate(post.date)}</time>
              </div>
              
              <h1 
                className="text-on-surface font-display-hero text-[36px] sm:text-[48px] lg:text-[56px] tracking-tight leading-[1.1] font-semibold"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-surface-container flex items-center justify-center font-headline-sm text-on-surface">
                    {authorInitials}
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface font-semibold">{authorName}</p>
                    <p className="font-label-caps text-on-surface-variant uppercase">Directorate of Intelligence</p>
                  </div>
                </div>
                
                {/* Mobile Share */}
                <div className="flex lg:hidden items-center gap-3">
                  <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">Share:</span>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(`https://redlanternanalytica.com/article/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full border border-outline/20 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://redlanternanalytica.com/article/${post.slug}`)}&title=${encodeURIComponent(post.title.rendered)}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full border border-outline/20 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                </div>
              </div>
            </header>

            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-headline-sm prose-headings:font-semibold prose-p:font-body-md prose-p:text-on-surface-variant prose-p:leading-[1.8] prose-a:text-primary hover:prose-a:text-primary-container prose-img:rounded-2xl prose-blockquote:border-primary prose-blockquote:bg-surface-container-lowest prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </div>
      </div>

      {/* Related Intelligence */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-surface-container-low py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-headline-sm text-on-surface mb-8">Related Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, index) => {
                const rpAuthorObj = rp._embedded?.author?.[0];
                const rpAuthorName = rpAuthorObj ? rpAuthorObj.name : "Red Lantern Analytica";
                const rpAuthorInitials = rpAuthorName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
                
                return (
                  <Link href={`/article/${rp.slug}`} key={rp.id} className="block group h-full">
                    <DossierCard
                      category={categoryName.toUpperCase()}
                      date={formatDate(rp.date)}
                      number={String(index + 1).padStart(2, "0")}
                      title={rp.title.rendered}
                      summary={stripHtml(rp.excerpt.rendered)}
                      authorInitials={rpAuthorInitials}
                      authorName={rpAuthorName}
                      authorTitle="Analyst"
                      colSpanClass="h-full"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
