import React from "react";
import Image from "next/image";
import { fetchPosts } from "@/lib/api";
import Link from "next/link";

export default async function PictureCarousel() {
  const posts = await fetchPosts(15);
  
  // Filter posts that actually have a featured image
  const galleryItems = posts
    .filter(post => post._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
    .map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      imageUrl: post._embedded!["wp:featuredmedia"]![0].source_url
    }))
    .slice(0, 8); // Keep 8 images for the carousel

  if (!galleryItems || galleryItems.length === 0) return null;

  return (
    <section className="w-full bg-surface-container-low py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline-md text-on-surface mb-8">Strategic Gallery</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {galleryItems.map(item => (
            <Link href={`/article/${item.slug}`} key={item.id} className="group min-w-[300px] sm:min-w-[400px] h-[250px] bg-surface-container-lowest rounded-2xl snap-center flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline/10 cursor-pointer">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 300px, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 text-left">
                <h3 className="font-title-md text-white line-clamp-2" dangerouslySetInnerHTML={{ __html: item.title }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
