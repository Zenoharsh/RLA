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

const ICON_BUTTON =
  "items-center justify-center w-10 h-10 rounded-full transition-all border border-outline/20 text-on-surface hover:bg-surface-container overhero:border-transparent overhero:bg-black/25 overhero:text-white overhero:hover:bg-black/45 overhero:backdrop-blur-sm";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // The drawer remembers the path it was opened on, so navigating anywhere closes it.
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
  const isMobileMenuOpen = menuOpenedOn === pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-nav
      data-solid={isScrolled || isMobileMenuOpen}
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline/10 shadow-sm text-on-surface overhero:bg-transparent overhero:bg-gradient-to-b overhero:from-black/55 overhero:to-transparent overhero:border-transparent overhero:shadow-none overhero:backdrop-blur-none overhero:text-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 xl:gap-10">
          <Link
            className="flex items-center shrink-0 rounded-xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow"
            href="/"
            aria-label="Red Lantern Analytica home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-full.png" alt="Red Lantern Analytica" className="h-8 lg:h-9 w-auto object-contain" />
          </Link>
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-on-surface-variant overhero:text-white/90">
            <Link
              className="m3-label-lg font-medium transition-colors text-on-surface hover:text-primary overhero:text-white overhero:hover:text-white/70"
              href="/"
            >
              Home
            </Link>

            {MENUS.map((menu) => (
              <div key={menu.label} className="relative group py-2">
                <button
                  type="button"
                  className="transition-colors flex items-center gap-1 font-medium m3-label-lg hover:text-on-surface overhero:hover:text-white"
                >
                  {menu.label} <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                <div
                  className={`absolute left-0 top-full hidden group-hover:block group-focus-within:block rounded-xl shadow-lg border z-50 backdrop-blur-md bg-surface-container-lowest/95 border-outline/20 text-on-surface-variant overhero:bg-black/90 overhero:border-white/20 overhero:text-white ${
                    menu.wide ? "p-3 min-w-[480px]" : "py-2 min-w-[220px]"
                  }`}
                >
                  <ul className={menu.wide ? "grid grid-cols-2 gap-x-2 gap-y-0.5" : "flex flex-col"}>
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className={`block px-4 py-2 transition-colors text-[14px] ${menu.wide ? "rounded-lg" : ""} hover:bg-surface-container hover:text-primary overhero:hover:bg-white/10 overhero:hover:text-white ${
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
          <ThemeToggle className={`inline-flex shrink-0 ${ICON_BUTTON}`} />
          <Link href="/search" aria-label="Search" className={`hidden sm:inline-flex ${ICON_BUTTON}`}>
            <span className="material-symbols-outlined text-[18px]">search</span>
          </Link>
          <Link
            className="hidden sm:inline-flex px-6 py-2 rounded-full m3-label-lg font-medium transition-all shadow-sm bg-primary text-white hover:bg-primary/90 overhero:bg-white overhero:text-black overhero:hover:bg-white/90"
            href="/#dispatch-form"
          >
            Subscribe
          </Link>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all bg-surface-container text-on-surface overhero:bg-white/20 overhero:text-white overhero:backdrop-blur-sm"
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
