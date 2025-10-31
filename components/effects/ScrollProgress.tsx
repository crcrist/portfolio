"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", updateVisibility);
    updateVisibility();

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-400 origin-left z-[9999]"
        style={{
          scaleX,
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
        }}
      />

      {/* Scroll to top button */}
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full border-4 border-cyan-500
                     bg-black/80 backdrop-blur-sm hover:border-fuchsia-500 transition-colors"
          style={{
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <div
            className="text-2xl text-cyan-400"
            style={{ textShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
          >
            ▲
          </div>
        </motion.button>
      )}
    </>
  );
}
