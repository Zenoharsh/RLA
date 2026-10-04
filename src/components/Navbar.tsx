"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { WPCategory } from "@/lib/api";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  categories: WPCategory[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const briefs = categories.filter(c => c.slug.includes('-digest') || c.slug.includes('-brief') || c.slug === 'nuclear-issues' || c.slug === 'radicalisation');
  const publications = categories.filter(c => !briefs.includes(c) && !['uncategorized'].includes(c.slug)).slice(0, 8);

  const isTransparent = isHomepage && !isScrolled;

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      !isTransparent 
        ? "bg-surface/90 dark:bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline/10 shadow-sm text-on-surface" 
        : "bg-transparent border-b-0 border-transparent text-white dark"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            className={`flex items-center justify-center hover:opacity-90 transition-opacity ${isTransparent ? 'bg-white rounded-lg p-1' : ''}`}
            href="/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Red Lantern Logo"
              className="h-9 w-auto object-contain transition-all"
              src="/RLA-Logo.png"
            />
          </Link>
          <nav className={`hidden lg:flex items-center gap-6 ${!isTransparent ? "text-on-surface-variant" : "text-white/90"}`}>
            <Link className={`m3-label-lg font-medium transition-colors ${!isTransparent ? "text-on-surface hover:text-primary" : "text-white hover:text-white/70"}`} href="/">Home</Link>
            
            {/* About Us Dropdown */}
            <div className="relative group py-2">
              <span className={`transition-colors flex items-center gap-1 cursor-pointer font-medium m3-label-lg ${!isTransparent ? "hover:text-on-surface" : "hover:text-white"}`}>
                About Us <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <ul className={`absolute left-0 top-full hidden group-hover:flex flex-col rounded-xl shadow-lg border py-2 overflow-hidden z-50 min-w-max ${
                isTransparent 
                  ? "bg-black/90 backdrop-blur-md border-white/20 text-white" 
                  : "bg-surface-container-lowest/95 backdrop-blur-md border-outline/20 text-on-surface-variant"
              }`}>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/about-rla">About RLA</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/mentors">Mentors</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/team">Team</Link></li>
              </ul>
            </div>

            {/* Publications Dropdown (Static mapping matching original site) */}
            <div className="relative group py-2">
              <span className={`transition-colors flex items-center gap-1 cursor-pointer font-medium m3-label-lg ${!isTransparent ? "hover:text-on-surface" : "hover:text-white"}`}>
                Publications <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <ul className={`absolute left-0 top-full hidden group-hover:flex flex-col rounded-xl shadow-lg border py-2 overflow-hidden z-50 min-w-[200px] ${
                isTransparent 
                  ? "bg-black/90 backdrop-blur-md border-white/20 text-white" 
                  : "bg-surface-container-lowest/95 backdrop-blur-md border-outline/20 text-on-surface-variant"
              }`}>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/articles">Articles</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/statements">Statements</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/reports">Reports</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/opinions">Opinions</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/events-press-release">Events & Press Release</Link></li>
              </ul>
            </div>
            
            {/* RLA Briefs Dropdown (Static mapping matching original site) */}
            <div className="relative group py-2">
              <span className={`transition-colors flex items-center gap-1 cursor-pointer font-medium m3-label-lg ${!isTransparent ? "hover:text-on-surface" : "hover:text-white"}`}>
                Intelligence Briefs <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <div className={`absolute left-0 top-full hidden group-hover:block rounded-xl shadow-lg border p-4 z-50 min-w-[500px] ${
                isTransparent 
                  ? "bg-black/90 backdrop-blur-md border-white/20 text-white" 
                  : "bg-surface-container-lowest/95 backdrop-blur-md border-outline/20 text-on-surface-variant"
              }`}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {[
                    { label: "India's Diplomatic Digest", href: "/indias-diplomatic-digest" },
                    { label: "Indian Ocean Region Digest", href: "/indian-ocean-region-digest" },
                    { label: "Tibet Digest", href: "/tibet-digest" },
                    { label: "China Digest", href: "/china" },
                    { label: "Africa Digest", href: "/africa-digest" },
                    { label: "Europe Digest", href: "/europe-digest" },
                    { label: "America Digest", href: "/america-digest" },
                    { label: "Neighbourhood Digest", href: "/neighbourhood-digest" },
                    { label: "Tech & AI Digest", href: "/tech-ai-digest" },
                    { label: "West Asia Digest", href: "/west-asia" },
                    { label: "Podcast", href: "/podcast" },
                    { label: "Weekly IR Magazine", href: "/weekly-ir-magazine" }
                  ].map(cat => (
                    <Link key={cat.href} className={`block px-3 py-2 rounded-lg transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href={cat.href}>
                      <span className="text-[14px]">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contribute Dropdown */}
            <div className="relative group py-2">
              <span className={`transition-colors flex items-center gap-1 cursor-pointer font-medium m3-label-lg ${!isTransparent ? "hover:text-on-surface" : "hover:text-white"}`}>
                Contribute <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <ul className={`absolute left-0 top-full hidden group-hover:flex flex-col rounded-xl shadow-lg border py-2 overflow-hidden z-50 min-w-max ${
                isTransparent 
                  ? "bg-black/90 backdrop-blur-md border-white/20 text-white" 
                  : "bg-surface-container-lowest/95 backdrop-blur-md border-outline/20 text-on-surface-variant"
              }`}>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/submission">Submissions</Link></li>
                <li><Link className={`block px-4 py-2 transition-colors ${isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary"}`} href="/careers">Careers</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle isTransparent={isTransparent} />
          <Link href="/search" className={`hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${!isTransparent ? "border border-outline/20 text-on-surface hover:bg-surface-container" : "border-transparent bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"}`}>
            <span className="material-symbols-outlined text-[18px]">search</span>
          </Link>
          <a className={`hidden sm:inline-flex px-6 py-2 rounded-full m3-label-lg font-medium transition-all shadow-sm ${!isTransparent ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-black hover:bg-white/90"}`} href="/#dispatch-form">
            Subscribe
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all ${!isTransparent ? "bg-surface-container text-on-surface" : "bg-white/20 text-white backdrop-blur-sm"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full h-[calc(100vh-72px)] bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline/10 text-on-surface overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-6">
            <Link className="font-headline-sm hover:text-primary transition-colors" href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            
            <div className="space-y-3">
              <span className="font-label-caps text-primary uppercase tracking-widest text-[12px]">About Us</span>
              <ul className="flex flex-col gap-3 pl-4 border-l border-outline/20">
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/about-rla" onClick={() => setIsMobileMenuOpen(false)}>About RLA</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/mentors" onClick={() => setIsMobileMenuOpen(false)}>Mentors</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/team" onClick={() => setIsMobileMenuOpen(false)}>Team</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-label-caps text-primary uppercase tracking-widest text-[12px]">Publications</span>
              <ul className="flex flex-col gap-3 pl-4 border-l border-outline/20">
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/articles" onClick={() => setIsMobileMenuOpen(false)}>Articles</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/statements" onClick={() => setIsMobileMenuOpen(false)}>Statements</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/reports" onClick={() => setIsMobileMenuOpen(false)}>Reports</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/opinions" onClick={() => setIsMobileMenuOpen(false)}>Opinions</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <span className="font-label-caps text-primary uppercase tracking-widest text-[12px]">Intelligence Briefs</span>
              <ul className="flex flex-col gap-3 pl-4 border-l border-outline/20">
                {[
                  { label: "India's Diplomatic Digest", href: "/indias-diplomatic-digest" },
                  { label: "Indian Ocean Region Digest", href: "/indian-ocean-region-digest" },
                  { label: "Tibet Digest", href: "/tibet-digest" },
                  { label: "China Digest", href: "/china" },
                  { label: "Africa Digest", href: "/africa-digest" },
                  { label: "Europe Digest", href: "/europe-digest" },
                  { label: "America Digest", href: "/america-digest" },
                  { label: "Neighbourhood Digest", href: "/neighbourhood-digest" },
                  { label: "Tech & AI Digest", href: "/tech-ai-digest" },
                  { label: "West Asia Digest", href: "/west-asia" },
                  { label: "Podcast", href: "/podcast" },
                  { label: "Weekly IR Magazine", href: "/weekly-ir-magazine" }
                ].map(cat => (
                  <li key={cat.href}>
                    <Link className="font-title-md hover:text-primary transition-colors" href={cat.href} onClick={() => setIsMobileMenuOpen(false)}>
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <span className="font-label-caps text-primary uppercase tracking-widest text-[12px]">Contribute</span>
              <ul className="flex flex-col gap-3 pl-4 border-l border-outline/20">
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/submission" onClick={() => setIsMobileMenuOpen(false)}>Submissions</Link></li>
                <li><Link className="font-title-md hover:text-primary transition-colors" href="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link></li>
              </ul>
            </div>

            <div className="pt-6 mt-2 border-t border-outline/10 flex flex-col gap-4">
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center gap-2 justify-center w-full py-3 rounded-full border border-outline/20 font-label-lg font-medium hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search Archives
              </Link>
              <a href="/#dispatch-form" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-white font-label-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe to Dispatch
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
