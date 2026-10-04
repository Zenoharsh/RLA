import HeroSection from "@/components/HeroSection";
import DynamicDossierSection from "@/components/DynamicDossierSection";
import LiveTelemetryDashboard from "@/components/LiveTelemetryDashboard";
import PictureCarousel from "@/components/PictureCarousel";
import MediaCoverage from "@/components/MediaCoverage";
import LatestVideos from "@/components/LatestVideos";
import EnrollmentForm from "@/components/EnrollmentForm";
import Footer from "@/components/Footer";
import { fetchPosts, fetchPostsByCategory } from "@/lib/api";

export default async function Home() {
  // Fetch data in parallel for performance
  const [allLatestPosts, mediaPosts] = await Promise.all([
    fetchPosts(30),
    fetchPostsByCategory("media-coverage", 6),
  ]);

  // Semantically split the posts so Dossiers and Feed do not overlap
  // Telemetry Feed gets short-form/rapid content
  const feedCategories = ['brief', 'statement', 'digest', 'media-coverage'];
  const feedPosts = allLatestPosts.filter(p => {
    const terms = p._embedded?.["wp:term"]?.[0] || [];
    return terms.some(t => feedCategories.some(fc => t.slug.includes(fc)));
  }).slice(0, 5);

  // Dossiers get long-form content (everything else)
  const dossierPosts = allLatestPosts.filter(p => !feedPosts.includes(p)).slice(0, 6);

  return (
    <main className="w-full bg-background">
      <div className="flex flex-col w-full">

        {/* SECTION 1: HERO */}
        <HeroSection />

        {/* SECTION 2 & 3: INTERACTIVE FILTER & DOSSIERS */}
        <DynamicDossierSection initialPosts={dossierPosts} />

        {/* SECTION 4: LIVE TELEMETRY (Short-form updates) */}
        <LiveTelemetryDashboard posts={feedPosts} />

        {/* SECTION 5: PICTURE CAROUSEL (Replaces Quote Banner) */}
        <PictureCarousel />

        {/* SECTION 6: MEDIA COVERAGE */}
        <MediaCoverage posts={mediaPosts} />

        {/* SECTION 7: LATEST VIDEOS */}
        <LatestVideos />

        {/* SECTION 8: ENROLLMENT */}
        <section className="w-full bg-surface-container-low py-16 lg:py-24" id="dispatch-form">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-surface-container-lowest p-8 sm:p-12 lg:p-16 shadow-[0_16px_40px_-12px_rgba(27,42,50,0.06)]">
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
