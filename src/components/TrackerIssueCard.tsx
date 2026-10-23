import { TrackerIssue } from "@/lib/api";

/** Magazine-style cover card for one digest issue; opens the PDF in a new tab. */
export default function TrackerIssueCard({
  issue,
  trackerTitle,
  latest = false,
  size = "md",
}: {
  issue: TrackerIssue;
  trackerTitle: string;
  latest?: boolean;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={issue.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3"
      aria-label={`${trackerTitle} — ${issue.title} (PDF)`}
    >
      <div
        className={`relative aspect-[1/1.414] w-full overflow-hidden rounded-2xl bg-surface-container shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-outline/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.45)] ${
          size === "lg" ? "rounded-3xl" : ""
        }`}
      >
        {issue.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={issue.cover}
            alt={`${trackerTitle} cover — ${issue.title}`}
            loading="lazy"
            className="ken-burns absolute inset-0 h-full w-full object-cover text-transparent"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[40px] text-primary">picture_as_pdf</span>
            <span className="m3-title-md text-on-surface">{trackerTitle}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {latest && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 m3-label-sm uppercase tracking-widest text-white shadow">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Latest issue
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 m3-label-sm uppercase tracking-wider text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          Read PDF
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2 px-1">
        <span className={`${size === "lg" ? "m3-title-lg" : "m3-title-sm"} text-on-surface group-hover:text-primary transition-colors`}>
          {issue.title}
        </span>
        <span className="m3-label-sm uppercase tracking-widest text-on-surface-variant shrink-0">PDF</span>
      </div>
    </a>
  );
}
