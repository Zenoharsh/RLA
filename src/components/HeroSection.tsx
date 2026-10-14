"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface HeroTag {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  href: string;
  count: number;
}

export interface HeroLatest {
  title: string;
  href: string;
  date: string;
  category: string;
}

export default function HeroSection({
  tags,
  stats,
  latest,
}: {
  /** Desks with the most recent publications — refreshes as new posts are published. */
  tags: HeroTag[];
  /** Archive size per desk. */
  stats: HeroStat[];
  latest?: HeroLatest;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section id="home-hero" className="relative w-full overflow-hidden -mt-16 lg:-mt-20 bg-black">
      <div className="relative w-full min-h-[700px] lg:min-h-[780px] flex flex-col p-6 sm:p-8 lg:px-12 lg:py-8 pt-24 lg:pt-32">

        {/* ── Background image with slow zoom, toned down so text and the red accents carry ── */}
        <motion.img
          src="/hero-mountains.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55] saturate-[0.85] contrast-[1.05]"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Darkening layers: overall tint, vignette, and shade at the top (navbar) and bottom (status bar) */}
        <div className="absolute inset-0 bg-[#0a1118]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full py-12 dark text-white">

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-1.5 mb-7 shadow-sm"
            initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="m3-label-sm text-white/90 uppercase tracking-[0.15em] font-semibold">
              International Affairs Observer · New Delhi
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-white mb-6"
            style={{
              fontSize: "clamp(42px, 7vw, 76px)",
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Strategic Foresight &amp; <br className="hidden sm:block" /> Faultlines
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            className="text-white/85 max-w-2xl mx-auto mb-10 font-light"
            style={{ fontSize: "17px", lineHeight: "28px", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Independent research and monthly trackers on nuclear issues, radicalisation, China and
            India&apos;s neighbourhood — from Red Lantern Analytica.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            className="w-full max-w-xl mx-auto mb-10 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-black/45 backdrop-blur-2xl rounded-full p-1.5 pl-5 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all">
              <span className="material-symbols-outlined text-[20px] text-white/70 shrink-0">search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white text-[15px] outline-none placeholder:text-white/50 px-4 py-3"
                placeholder="Search analyses, regions, or digests..."
                type="text"
                aria-label="Search the archive"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-primary px-6 sm:px-7 py-3 m3-label-lg text-white uppercase tracking-widest hover:bg-primary/90 hover:shadow-md transition-all"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Content tags — the desks that published most recently */}
          {tags.length > 0 && (
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <span className="m3-label-sm text-white/55 uppercase tracking-[0.15em]">Recently published in</span>
              {tags.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="m3-label-sm text-white/90 uppercase tracking-[0.1em] hover:text-white transition-colors flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:border-primary hover:bg-primary/20"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Status bar: latest dispatch + archive size per desk ── */}
        <motion.div
          className="dark relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-5 border-t border-white/15 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          {latest && (
            <Link href={latest.href} className="group flex items-center gap-3 min-w-0 max-w-full lg:max-w-[60%]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="m3-label-sm uppercase tracking-widest font-semibold text-primary shrink-0">Latest dispatch</span>
              <span className="m3-label-sm uppercase tracking-widest shrink-0 hidden sm:inline">{latest.date}</span>
              <span className="opacity-40 shrink-0">/</span>
              <span className="m3-label-md text-on-surface truncate group-hover:text-primary transition-colors">{latest.title}</span>
            </Link>
          )}
          {stats.length > 0 && (
            <div className="hidden md:flex items-center gap-4">
              <span className="m3-label-sm uppercase tracking-widest opacity-70">Analyses on record:</span>
              {stats.map((s, i) => (
                <span key={s.href} className="flex items-center gap-4">
                  {i > 0 && <span className="opacity-30">/</span>}
                  <Link href={s.href} className="m3-label-sm uppercase tracking-widest hover:text-primary transition-colors">
                    {s.label} <span className="text-on-surface font-semibold">{s.count}</span>
                  </Link>
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
