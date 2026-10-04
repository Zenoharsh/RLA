import React from "react";
import Image from "next/image";
import { fetchYouTubeVideos } from "@/lib/api";

export default async function LatestVideos() {
  const channelId = "UCGgSZ7FE7jgUdpRNPQCzELQ"; // @RedLanternAnalytica
  const videos = await fetchYouTubeVideos(channelId, 4);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="w-full bg-background py-16 lg:py-24 border-t border-outline/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Latest Videos
            </h2>
          </div>
          <a href="https://www.youtube.com/@RedLanternAnalytica" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
            View Channel
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map(video => (
            <a href={video.link} target="_blank" rel="noopener noreferrer" key={video.id} className="group relative bg-surface-container-lowest rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 border border-outline/10 flex flex-col h-full">
              <div className="aspect-video bg-surface-container flex items-center justify-center relative overflow-hidden shrink-0">
                <Image 
                  src={video.thumbnail} 
                  alt={video.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient overlays for cinematic effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Premium Glassmorphic Play Button */}
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full flex items-center justify-center absolute z-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-[28px] -ml-[2px]">play_arrow</span>
                </div>
                
                {/* Watch Now Badge (appears on hover) */}
                <div className="absolute bottom-3 left-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-label-caps uppercase tracking-widest text-white bg-primary/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Watch Now
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1 bg-gradient-to-b from-surface-container-lowest to-surface-container-low/30">
                <h3 className="font-title-md font-semibold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center gap-2 text-on-surface-variant/60 font-body-sm">
                  <span className="material-symbols-outlined text-[16px]">smart_display</span>
                  <span>Red Lantern Analytica</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
