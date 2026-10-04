import React from 'react';
import Link from 'next/link';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="w-full bg-surface-container-lowest min-h-[60vh] flex flex-col items-center justify-center py-24 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-outline/20 bg-surface-container px-4 py-1.5 mb-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="m3-label-sm text-on-surface uppercase tracking-widest font-medium">Under Construction</span>
        </div>
        <h1 className="font-headline-lg text-4xl sm:text-5xl text-on-surface tracking-tight mb-4">
          {title}
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto">
          We are currently crafting this section to meet our high standards for geopolitical intelligence. Check back soon.
        </p>
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm m3-label-lg tracking-wide uppercase"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Return to Observatory
          </Link>
        </div>
      </div>
    </div>
  );
}
