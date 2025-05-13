"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function ArticleProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(scrollPercent * 100);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (!pathname.startsWith("/post/")) return <div></div>;
  return (
    <div className="fixed top-[64px] left-0 right-0 h-2 bg-gray-200 z-50 mt-5">
      <div
        className="h-full bg-purple-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
