"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ isTransparent = false }: { isTransparent?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 flex items-center justify-center shrink-0" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all shrink-0 ${
        !isTransparent 
          ? "border border-outline/20 text-on-surface hover:bg-surface-container" 
          : "border-transparent bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
      }`}
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-[20px]">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
