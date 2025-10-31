"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ArcadeLoaderProps {
  onLoadComplete?: () => void;
  duration?: number;
}

export default function ArcadeLoader({ onLoadComplete, duration = 3000 }: ArcadeLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onLoadComplete?.();
          }, 500);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)",
        }}
      />

      {/* CRT flicker */}
      <motion.div
        className="absolute inset-0 bg-cyan-500/5 pointer-events-none"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />

      <div className="relative z-10 text-center px-8">
        {/* INSERT COIN animation */}
        <motion.div
          className="mb-12"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="text-6xl md:text-8xl font-black mb-4"
            style={{
              fontFamily: "Impact, sans-serif",
              background: "linear-gradient(180deg, #ffff00 0%, #ff00ff 50%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 255, 0, 0.6)",
              filter: "drop-shadow(0 0 20px rgba(255, 0, 255, 0.8))",
            }}
          >
            INSERT COIN
          </div>
          <div
            className="text-2xl md:text-3xl text-cyan-400 font-bold"
            style={{
              fontFamily: "monospace",
              textShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
            }}
          >
            LOADING PORTFOLIO...
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div
            className="relative h-8 border-4 border-cyan-500 rounded-lg overflow-hidden mb-4"
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(34, 211, 238, 0.1)",
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-400"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
              }}
              transition={{ duration: 0.1 }}
            />

            {/* Animated stripes */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)",
                animation: "slide 1s linear infinite",
              }}
            />
          </div>

          {/* Percentage */}
          <div
            className="text-3xl font-black text-yellow-400"
            style={{
              fontFamily: "Impact, sans-serif",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
            }}
          >
            {Math.floor(progress)}%
          </div>

          {/* Loading messages */}
          <motion.div
            className="mt-6 text-sm text-white/80"
            style={{ fontFamily: "monospace" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {progress < 25 && "> INITIALIZING ARCADE CABINET..."}
            {progress >= 25 && progress < 50 && "> LOADING GAME CARTRIDGE..."}
            {progress >= 50 && progress < 75 && "> CALIBRATING JOYSTICK..."}
            {progress >= 75 && progress < 100 && "> STARTING GAME..."}
            {progress >= 100 && "> READY PLAYER ONE!"}
          </motion.div>
        </div>

        {/* Pixel art decoration */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {["▲", "▼", "◄", "►"].map((symbol, i) => (
            <div
              key={i}
              className="text-4xl"
              style={{
                color: i % 2 === 0 ? "#00ffff" : "#ff00ff",
                textShadow: `0 0 10px ${i % 2 === 0 ? "rgba(0, 255, 255, 0.8)" : "rgba(255, 0, 255, 0.8)"}`,
              }}
            >
              {symbol}
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>
    </motion.div>
  );
}
