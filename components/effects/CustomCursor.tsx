"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);

      // Add trail particle
      const newTrail: Trail = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setTrails((prev) => [...prev.slice(-15), newTrail]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, [cursorX, cursorY, isMobile]);

  // Auto-remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-10));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: trail.x,
            top: trail.y,
            width: "8px",
            height: "8px",
            background: `radial-gradient(circle, rgba(0, 255, 255, ${0.8 - index * 0.05}) 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: "32px",
          height: "32px",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Outer neon ring */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: isHovering ? "#ff00ff" : "#00ffff",
            boxShadow: isHovering
              ? "0 0 20px rgba(255, 0, 255, 0.8), inset 0 0 10px rgba(255, 0, 255, 0.5)"
              : "0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.5)",
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: isHovering ? "#ff00ff" : "#00ffff",
            boxShadow: isHovering
              ? "0 0 10px rgba(255, 0, 255, 1)"
              : "0 0 10px rgba(0, 255, 255, 1)",
          }}
        />

        {/* Pulsing ring on hover */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-fuchsia-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              boxShadow: "0 0 20px rgba(255, 0, 255, 0.6)",
            }}
          />
        )}
      </motion.div>
    </>
  );
}
