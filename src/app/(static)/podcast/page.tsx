import Footer from "@/components/Footer";
import LatestVideos from "@/components/LatestVideos";

export const metadata = { title: "Podcast | Red Lantern Analytica" };

export default function PodcastPage() {
  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">RLA BRIEFS · AUDIO &amp; VIDEO</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Podcast</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Conversations and explainers from Red Lantern Analytica analysts and mentors, published on our YouTube channel.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <LatestVideos limit={12} title="Latest episodes" />
      </div>
      <Footer />
    </main>
  );
}
