"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Tracker } from "@/lib/api";
import TrackerIssueCard from "./TrackerIssueCard";

/**
 * Home-page shelf of the RLA monthly digests: one uniform tab per tracker, each showing the
 * latest issue cover up front and the previous issues beside it. New issues added to the
 * WordPress digest pages appear here automatically.
 */
export default function TrackerShelf({ trackers }: { trackers: (Tracker & { short: string })[] }) {
  const [active, setActive] = useState(trackers[0]?.slug);
  if (trackers.length === 0) return null;
  const current = trackers.find((t) => t.slug === active) ?? trackers[0];
  const [latest, ...previous] = current.issues;

  return (
    <section className="w-full bg-background py-16 lg:py-24" id="trackers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                RLA BRIEFS · MONTHLY TRACKERS
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">The Digests</h2>
          </div>
          <p className="text-on-surface-variant max-w-md md:text-right m3-body-md">
            {trackers.length} regional trackers, {trackers.reduce((n, t) => n + t.issues.length, 0)} issues published.
            Select a tracker to browse its issues.
          </p>
        </div>

        {/* Uniform tabs, one per tracker */}
        <div role="tablist" aria-label="Trackers" className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {trackers.map((t) => {
            const selected = t.slug === current.slug;
            return (
              <button
                key={t.slug}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(t.slug)}
                className={`shrink-0 flex flex-col items-start rounded-2xl px-4 py-2.5 text-left transition-all border ${
                  selected
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container-low text-on-surface border-transparent hover:bg-surface-container-high"
                }`}
              >
                <span className="m3-label-lg font-semibold whitespace-nowrap">{t.short}</span>
                <span className={`m3-label-sm uppercase tracking-wider whitespace-nowrap ${selected ? "text-on-primary/75" : "text-on-surface-variant"}`}>
                  {t.issues[0]?.period || `${t.issues.length} issues`}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            <div className="lg:col-span-4 space-y-5 lg:pt-4">
              <h3 className="m3-headline-md text-on-surface">{current.title}</h3>
              <p className="text-on-surface-variant m3-body-md leading-relaxed line-clamp-6">{current.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={latest.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 m3-label-lg text-white hover:bg-primary/90 transition-colors"
                >
                  Read {latest.period || "latest issue"}
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
                <Link
                  href={`/${current.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-5 py-2.5 m3-label-lg text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                >
                  All {current.issues.length} issues
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-5 items-end">
              <div className="col-span-3 sm:col-span-2 max-w-[340px] w-full mx-auto sm:max-w-none">
                <TrackerIssueCard issue={latest} trackerTitle={current.title} latest size="lg" />
              </div>
              {previous.slice(0, 3).map((issue) => (
                <div key={issue.pdf} className="col-span-1">
                  <TrackerIssueCard issue={issue} trackerTitle={current.title} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
