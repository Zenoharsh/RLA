"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The red-lantern eye as a persistent "home" widget. It drops in at the bottom-left once the
 * navbar wordmark has scrolled away, keeping the brand mark on screen at all times.
 */
export default function HomeBeacon() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goHome() {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goHome}
          aria-label="Back to Red Lantern Analytica home"
          className="group fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-50 flex items-center gap-0 rounded-full bg-white pl-2.5 pr-2.5 py-2 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/5 hover:pr-4 hover:gap-2 transition-[padding,gap] duration-300"
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-eye.png" alt="" className="h-8 w-auto" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 group-hover:max-w-[60px]">
            Home
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
