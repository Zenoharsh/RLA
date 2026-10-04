import React from "react";
import Image from "next/image";

export interface DossierCardProps {
  category: string;
  date: string;
  number: string;
  title: string;
  summary: string;
  authorInitials: string;
  authorName: string;
  authorTitle: string;
  featuredImage?: string;
  colSpanClass?: string;
  headerColorClass?: string;
  children?: React.ReactNode;
}

export default function DossierCard({
  category,
  date,
  number,
  title,
  summary,
  authorInitials,
  authorName,
  authorTitle,
  featuredImage,
  colSpanClass = "lg:col-span-4",
  headerColorClass = "text-secondary",
  children,
}: DossierCardProps) {
  return (
    <article
      className={`${colSpanClass} flex flex-col rounded-3xl bg-surface-container-lowest shadow-[0_2px_16px_rgba(27,42,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,42,50,0.12)] transition-all duration-300 group overflow-hidden`}
    >
      {/* Thumbnail — only shown if a featured image URL exists */}
      {featuredImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 to-transparent" />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 space-y-3">
        {/* Category + date row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span
              className={`shrink-0 rounded-full bg-surface-container px-3 py-1 m3-label-sm uppercase ${headerColorClass} font-semibold tracking-[0.1em]`}
            >
              {category}
            </span>
            <span className="m3-label-sm text-on-surface-variant truncate">{date}</span>
          </div>
          {number && (
            <span
              className="shrink-0 ml-2 text-on-surface-variant/20 group-hover:text-primary transition-colors"
              style={{ fontSize: "28px", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {number}
            </span>
          )}
        </div>

        {/* Title — M3 Title Large, clamped to 2 lines */}
        <h3
          className="m3-title-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Summary — M3 Body Medium, clamped to 3 lines */}
        <p className="m3-body-md text-on-surface-variant font-light leading-relaxed line-clamp-3 flex-1">
          {summary}
        </p>

        {children}
      </div>

      {/* Footer — pinned to bottom */}
      <div className="flex items-center justify-between px-6 sm:px-7 py-4 border-t border-surface-container mt-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center m3-label-md font-bold text-on-surface shrink-0">
            {authorInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="m3-label-lg font-semibold text-on-surface truncate">{authorName}</span>
            <span className="m3-label-sm text-on-surface-variant uppercase tracking-wider">{authorTitle}</span>
          </div>
        </div>
        <span className="h-9 w-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary-container group-hover:text-on-primary-container transition-all shrink-0">
          <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
        </span>
      </div>
    </article>
  );
}
