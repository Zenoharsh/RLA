import { fetchPageBySlug } from "@/lib/api";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function PrivacyPage() {
  const page = await fetchPageBySlug("privacy-policy");

  if (!page) {
    notFound();
  }

  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        {/* Page Header */}
        <header className="space-y-4 mb-16 border-b border-surface-container-high pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">LEGAL COMPLIANCE</span>
          </div>
          <h1 
            className="text-on-surface font-display-hero text-[36px] sm:text-[48px] tracking-tight leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </header>

        {/* Page Body */}
        <div 
          className="prose prose-invert max-w-none prose-headings:font-headline-sm prose-p:font-body-md prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-container prose-li:text-on-surface-variant prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </div>

      <Footer />
    </main>
  );
}
