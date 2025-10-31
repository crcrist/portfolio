"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "../../lib/achievements/achievementManager";

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  if (!achievement) return null;

  const rarityColors = {
    common: { border: "#00ffff", glow: "rgba(0, 255, 255, 0.6)", bg: "rgba(0, 100, 100, 0.3)" },
    rare: { border: "#ff00ff", glow: "rgba(255, 0, 255, 0.6)", bg: "rgba(100, 0, 100, 0.3)" },
    epic: { border: "#9333ea", glow: "rgba(147, 51, 234, 0.6)", bg: "rgba(100, 0, 150, 0.3)" },
    legendary: { border: "#ffff00", glow: "rgba(255, 255, 0, 0.6)", bg: "rgba(150, 150, 0, 0.3)" },
  };

  const colors = rarityColors[achievement.rarity];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-24 right-6 z-[9999] max-w-sm"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div
          className="bg-black/95 border-4 rounded-xl overflow-hidden backdrop-blur-lg"
          style={{
            borderColor: colors.border,
            boxShadow: `0 0 30px ${colors.glow}, inset 0 0 20px ${colors.bg}`,
          }}
        >
          {/* Rarity banner */}
          <div
            className="py-1 px-4 text-center text-xs font-black tracking-widest"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.bg}, transparent)`,
              borderBottom: `2px solid ${colors.border}`,
              fontFamily: "Impact, sans-serif",
              color: colors.border,
              textShadow: `0 0 10px ${colors.glow}`,
            }}
          >
            {achievement.rarity.toUpperCase()} ACHIEVEMENT
          </div>

          <div className="p-6 relative">
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.border} 2px, ${colors.border} 4px)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon with animation */}
              <motion.div
                className="text-6xl mb-4 text-center"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.2, 0.4, 0.6, 0.8],
                }}
              >
                {achievement.icon}
              </motion.div>

              {/* Achievement unlocked text */}
              <div
                className="text-center mb-2 text-xs font-bold tracking-wider"
                style={{
                  fontFamily: "monospace",
                  color: colors.border,
                  textShadow: `0 0 10px ${colors.glow}`,
                }}
              >
                🏆 ACHIEVEMENT UNLOCKED 🏆
              </div>

              {/* Achievement name */}
              <h3
                className="text-2xl font-black text-center mb-2"
                style={{
                  fontFamily: "Impact, sans-serif",
                  color: colors.border,
                  textShadow: `0 0 15px ${colors.glow}, 2px 2px 0 rgba(0, 0, 0, 0.5)`,
                }}
              >
                {achievement.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-white text-center mb-4 opacity-90"
                style={{ fontFamily: "monospace" }}
              >
                {achievement.description}
              </p>

              {/* Points */}
              <div className="text-center">
                <span
                  className="inline-block px-4 py-2 border-2 rounded-lg font-black text-lg"
                  style={{
                    borderColor: colors.border,
                    background: colors.bg,
                    color: colors.border,
                    fontFamily: "Impact, sans-serif",
                    boxShadow: `0 0 15px ${colors.glow}`,
                    textShadow: `0 0 10px ${colors.glow}`,
                  }}
                >
                  +{achievement.points} POINTS
                </span>
              </div>

              {/* Sparkle effects */}
              {achievement.rarity === "legendary" && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 2) * 70}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-2 right-2 text-white/60 hover:text-white text-xl leading-none
                         w-6 h-6 flex items-center justify-center transition-colors"
              aria-label="Dismiss achievement"
            >
              ×
            </button>
          </div>

          {/* Progress bar showing auto-dismiss */}
          <motion.div
            className="h-1"
            style={{ backgroundColor: colors.border }}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            onAnimationComplete={onDismiss}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
