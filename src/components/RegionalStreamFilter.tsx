"use client";
import { useState } from "react";

const STREAMS = [
  { id: "all",            label: "All Streams" },
  { id: "nuclear-issues", label: "Nuclear Issues" },
  { id: "radicalisation", label: "Radicalisation" },
  { id: "china",          label: "China" },
  { id: "media-coverage", label: "Media Coverage" },
  { id: "commentaries",   label: "Commentaries" },
  { id: "afghanistan",    label: "Afghanistan" },
  { id: "west-asia",      label: "West Asia" },
  { id: "statements",     label: "Statements" },
];

interface RegionalStreamFilterProps {
  onCategoryChange?: (slug: string) => void;
}

export default function RegionalStreamFilter({ onCategoryChange }: RegionalStreamFilterProps) {
  const [active, setActive] = useState("all");

  function handleClick(stream: typeof STREAMS[0]) {
    setActive(stream.id);
    if (onCategoryChange) {
      onCategoryChange(stream.id);
    }
  }

  return (
    <section className="w-full bg-surface-container-low/80 py-4 sticky top-0 z-40 backdrop-blur-xl border-b border-outline/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-0.5 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {STREAMS.map(stream => {
              const isActive = active === stream.id;
              return (
                <button
                  key={stream.id}
                  onClick={() => handleClick(stream)}
                  className={`stream-pill px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {stream.label}
                </button>
              );
            })}
          </div>
          <div className="hidden lg:flex items-center gap-2 pl-4 text-on-surface-variant font-label-caps text-label-caps min-w-max border-l border-outline/20 ml-2">
            <span className="material-symbols-outlined text-[15px] text-primary">filter_list</span>
            <span>SORTED BY STRATEGIC WEIGHT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
