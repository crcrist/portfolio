"use client";
import { useEffect } from "react";

/**
 * Smooth Scroll Component with Scroll Snap
 * Enhances scroll behavior with smooth animations
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        const targetId = href?.substring(1);

        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
