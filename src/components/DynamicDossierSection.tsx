"use client";
import { useState, useEffect } from "react";
import RegionalStreamFilter from "./RegionalStreamFilter";
import FeaturedDossiers from "./FeaturedDossiers";
import { WPPost } from "@/lib/api";

interface DynamicDossierSectionProps {
  initialPosts: WPPost[];
}

export default function DynamicDossierSection({ initialPosts }: DynamicDossierSectionProps) {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  async function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    if (slug === "all") {
      setPosts(initialPosts);
      return;
    }
    
    setLoading(true);
    try {
      // Fetch from our new internal API route
      const res = await fetch(`/api/posts?category=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.slice(0, 6)); // ensure max 6
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <RegionalStreamFilter onCategoryChange={handleCategoryChange} />
      <div className={`transition-opacity duration-500 ${loading ? "opacity-40" : "opacity-100"}`}>
        <FeaturedDossiers posts={posts} activeCategory={activeCategory} />
      </div>
    </>
  );
}
