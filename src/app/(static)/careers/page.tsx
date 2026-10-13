import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Careers | Red Lantern Analytica" };

const TRACKS = [
  {
    icon: "travel_explore",
    title: "Research Internships",
    body: "Work alongside RLA analysts on the monthly regional digests — sourcing, verifying and summarising developments across a desk of your choice.",
  },
  {
    icon: "edit_note",
    title: "Contributing Analysts",
    body: "Write commentaries, policy reviews and long-form reports on nuclear issues, radicalisation, China and the wider Indo-Pacific.",
  },
  {
    icon: "design_services",
    title: "Design & Outreach",
    body: "Help produce the visual identity of RLA publications, from digest layouts to social media briefs and video explainers.",
  },
];

export default function CareersPage() {
  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <header className="space-y-4 mb-14 border-b border-surface-container-high pb-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">JOIN THE OBSERVATORY</span>
          </div>
          <h1 className="text-on-surface text-[36px] sm:text-[48px] tracking-tight leading-[1.1]">Careers</h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Red Lantern Analytica is an international affairs observer group based in New Delhi. We regularly open
            positions for researchers and contributors who want to work on the issues shaping India&apos;s strategic environment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TRACKS.map((t) => (
            <div key={t.title} className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-primary text-[28px]">{t.icon}</span>
              <h2 className="m3-title-lg text-on-surface">{t.title}</h2>
              <p className="text-on-surface-variant m3-body-md leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="m3-headline-sm text-on-surface">No fixed openings right now</h2>
            <p className="text-on-surface-variant max-w-xl">
              Send your CV, a writing sample and the desk you are interested in. We review applications on a rolling basis.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:Office@redlanternanalytica.com?subject=Application%20%E2%80%94%20Red%20Lantern%20Analytica"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 m3-label-lg text-white hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Apply by email
            </a>
            <Link
              href="/submission"
              className="inline-flex items-center justify-center rounded-full border border-outline/30 px-6 py-3 m3-label-lg text-on-surface hover:border-primary hover:text-primary transition-colors"
            >
              Submit an article
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
