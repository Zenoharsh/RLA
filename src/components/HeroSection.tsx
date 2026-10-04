"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="relative w-full overflow-hidden -mt-16 lg:-mt-20">
      {/* Container — tall enough to breathe, not absurdly full-screen */}
      <div className="relative w-full min-h-[700px] lg:min-h-[780px] flex flex-col p-6 sm:p-8 lg:px-12 lg:py-8 pt-24 lg:pt-32">

        {/* ── Background image with gentle zoom ── */}
        <motion.img
          src="/scenic mountain.jpg"
          alt="Strategic landscape"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

        {/* ── Adaptive Dynamic Overlays ── 
            Reduced opacity so the mountain is clearly visible.
        */}
        <div className="absolute inset-0 bg-surface/10 dark:bg-black/30 transition-colors duration-700 pointer-events-none" />
        
        {/* Bottom fade that elegantly blends into the page background */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none transition-colors duration-700" />

        {/* ── Hero content — Middle section (Forced White Text for contrast against mountain) ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full py-12 dark text-white">

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md px-4 py-1.5 mb-7 shadow-sm"
            initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="m3-label-sm text-white/90 uppercase tracking-[0.15em] font-semibold">
              Red Lantern Analytica
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
              textShadow: "0 2px 10px rgba(0,0,0,0.3)" // Added drop shadow to ensure readability on 50% light gradient
            }}
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Strategic Foresight &amp; <br className="hidden sm:block" /> Faultlines
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            className="text-white/90 max-w-2xl mx-auto mb-10 font-light"
            style={{ 
              fontSize: "17px", 
              lineHeight: "28px",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)" // Added drop shadow for contrast
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Synthesizing maritime flashpoints, critical mineral supply bottlenecks,
            and Eurasian power shifts for leading diplomatic councils.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            className="w-full max-w-xl mx-auto mb-10 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle glow behind search bar */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-black/40 backdrop-blur-2xl rounded-full p-1.5 pl-5 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all">
              <span className="material-symbols-outlined text-[20px] text-white/70 shrink-0">search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-[15px] outline-none placeholder:text-white/50 px-4 py-3"
                placeholder="Search dossiers, regions, or analysis..."
                type="text"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-primary px-7 py-3 m3-label-lg text-white uppercase tracking-widest hover:bg-primary/90 hover:shadow-md transition-all"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Quick links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {[
              { label: "Nuclear Issues", href: "/category/nuclear-issues" },
              { label: "China", href: "/category/china-digest" },
              { label: "Radicalisation", href: "/category/radicalisation" },
              { label: "Media Coverage", href: "/category/media-coverage" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="m3-label-sm text-white/80 uppercase tracking-[0.1em] hover:text-white transition-colors flex items-center gap-1.5"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
              >
                <span className="w-1 h-1 rounded-full bg-white/40" />
                {item.label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* ── Telemetry bar — Bottom section (Adaptive text because it sits on the page background fade) ── */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-outline/10 text-on-surface-variant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="m3-label-sm uppercase tracking-widest font-medium text-on-surface">GSAT-7R Telemetry Active</span>
            <span className="opacity-40 mx-1">/</span>
            <span className="m3-label-sm uppercase tracking-widest">New Delhi Observatory</span>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <Link href="/nuclear-issues" className="m3-label-sm uppercase tracking-widest hover:text-on-surface transition-colors">Nuclear (208)</Link>
            <span className="opacity-30">/</span>
            <Link href="/radicalisation" className="m3-label-sm uppercase tracking-widest hover:text-on-surface transition-colors">Radicalisation (110)</Link>
            <span className="opacity-30">/</span>
            <Link href="/media-coverage" className="m3-label-sm uppercase tracking-widest hover:text-on-surface transition-colors">Media (84)</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
