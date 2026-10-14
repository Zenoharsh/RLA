"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 flex items-center justify-center shrink-0" />;
  }

  // resolvedTheme reflects the OS preference when the theme is "system"
  const isDark = resolvedTheme === "dark";

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")} className={className} aria-label="Toggle theme">
      <span className="material-symbols-outlined text-[20px]">{isDark ? "light_mode" : "dark_mode"}</span>
    </button>
  );
}
