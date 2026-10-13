"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ABOUT_LINKS, BRIEF_LINKS, CONTRIBUTE_LINKS, NavLink, PUBLICATION_LINKS } from "@/lib/site";

const MENUS: { label: string; links: NavLink[]; wide?: boolean }[] = [
  { label: "About Us", links: ABOUT_LINKS },
  { label: "Publications", links: PUBLICATION_LINKS },
  { label: "RLA Briefs", links: BRIEF_LINKS, wide: true },
  { label: "Contribute", links: CONTRIBUTE_LINKS },
];

/** Full wordmark; swaps to the light-text variant on dark backgrounds (hero overlay or dark theme). */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full.png" alt="Red Lantern Analytica" className={`${className} block dark:hidden`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full-light.png" alt="Red Lantern Analytica" className={`${className} hidden dark:block`} />
    </>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // The drawer remembers the path it was opened on, so navigating anywhere closes it.
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
  const isMobileMenuOpen = menuOpenedOn === pathname;
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomepage && !isScrolled && !isMobileMenuOpen;
  const itemHover = isTransparent ? "hover:bg-white/10 hover:text-white" : "hover:bg-surface-container hover:text-primary";

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        !isTransparent
          ? "bg-surface/90 dark:bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline/10 shadow-sm text-on-surface"
          : "bg-gradient-to-b from-black/50 to-transparent border-b-0 border-transparent text-white dark"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 xl:gap-10">
          <Link className="flex items-center hover:opacity-90 transition-opacity shrink-0" href="/" aria-label="Red Lantern Analytica — Home">
            <Wordmark className="h-10 lg:h-12 w-auto object-contain" />
          </Link>
          <nav className={`hidden lg:flex items-center gap-5 xl:gap-6 ${!isTransparent ? "text-on-surface-variant" : "text-white/90"}`}>
            <Link
              className={`m3-label-lg font-medium transition-colors ${!isTransparent ? "text-on-surface hover:text-primary" : "text-white hover:text-white/70"}`}
              href="/"
            >
              Home
            </Link>

            {MENUS.map((menu) => (
              <div key={menu.label} className="relative group py-2">
                <button
                  type="button"
                  className={`transition-colors flex items-center gap-1 font-medium m3-label-lg ${!isTransparent ? "hover:text-on-surface" : "hover:text-white"}`}
                >
                  {menu.label} <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                <div
                  className={`absolute left-0 top-full hidden group-hover:block group-focus-within:block rounded-xl shadow-lg border z-50 ${
                    menu.wide ? "p-3 min-w-[480px]" : "py-2 min-w-[220px]"
                  } ${
                    isTransparent
                      ? "bg-black/90 backdrop-blur-md border-white/20 text-white"
                      : "bg-surface-container-lowest/95 backdrop-blur-md border-outline/20 text-on-surface-variant"
                  }`}
                >
                  <ul className={menu.wide ? "grid grid-cols-2 gap-x-2 gap-y-0.5" : "flex flex-col"}>
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className={`block px-4 py-2 transition-colors text-[14px] ${menu.wide ? "rounded-lg" : ""} ${itemHover} ${
                            pathname === link.href ? "text-primary" : ""
                          }`}
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle isTransparent={isTransparent} />
          <Link
            href="/search"
            aria-label="Search"
            className={`hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              !isTransparent
                ? "border border-outline/20 text-on-surface hover:bg-surface-container"
                : "border-transparent bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
          </Link>
          <Link
            className={`hidden sm:inline-flex px-6 py-2 rounded-full m3-label-lg font-medium transition-all shadow-sm ${
              !isTransparent ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-black hover:bg-white/90"
            }`}
            href="/#dispatch-form"
          >
            Subscribe
          </Link>

          <button
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              !isTransparent ? "bg-surface-container text-on-surface" : "bg-white/20 text-white backdrop-blur-sm"
            }`}
            onClick={() => setMenuOpenedOn(isMobileMenuOpen ? null : pathname)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full h-[calc(100dvh-64px)] bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline/10 text-on-surface overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-6">
            <Link className="font-headline-sm hover:text-primary transition-colors" href="/">
              Home
            </Link>

            {MENUS.map((menu) => (
              <div key={menu.label} className="space-y-3">
                <span className="font-label-caps text-primary uppercase tracking-widest text-[12px]">{menu.label}</span>
                <ul className="flex flex-col gap-3 pl-4 border-l border-outline/20">
                  {menu.links.map((link) => (
                    <li key={link.href}>
                      <Link className="font-title-md hover:text-primary transition-colors" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pt-6 mt-2 border-t border-outline/10 flex flex-col gap-4">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 justify-center w-full py-3 rounded-full border border-outline/20 font-label-lg font-medium hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search Archives
              </Link>
              <Link
                href="/#dispatch-form"
                onClick={() => setMenuOpenedOn(null)}
                className="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-white font-label-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe to Dispatch
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
