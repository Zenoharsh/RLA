"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full bg-background min-h-[70vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-outline/20 bg-surface-container px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="m3-label-sm text-on-surface uppercase tracking-widest font-medium">Archive temporarily unavailable</span>
        </div>
        <h1 className="m3-headline-lg text-on-surface">We couldn&apos;t reach the publication archive</h1>
        <p className="text-on-surface-variant">
          Our content server is responding slowly. Please try again in a moment.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 m3-label-lg text-white hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-outline/30 px-6 py-3 m3-label-lg text-on-surface hover:border-primary hover:text-primary transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
