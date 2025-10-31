"use client";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Achievement,
  AchievementManager,
  getAchievementManager,
  UserStats,
} from "../../lib/achievements/achievementManager";
import { getKonamiDetector } from "../../lib/achievements/konamiCode";
import AchievementToast from "./AchievementToast";

interface AchievementContextType {
  manager: AchievementManager;
  achievements: Achievement[];
  stats: UserStats;
  showModal: () => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within AchievementProvider");
  }
  return context;
}

interface AchievementProviderProps {
  children: ReactNode;
}

export function AchievementProvider({ children }: AchievementProviderProps) {
  const [manager] = useState(() => getAchievementManager());
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<UserStats>(manager.getStats());
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load initial achievements
    setAchievements(manager.getAchievements());

    // Listen for achievement unlocks
    const unsubscribe = manager.onAchievementUnlocked((achievement) => {
      setAchievements(manager.getAchievements());
      setStats(manager.getStats());

      // Queue toast notification
      setToastQueue((prev) => [...prev, achievement]);
    });

    // Setup Konami code detector
    const konamiDetector = getKonamiDetector();
    const unsubscribeKonami = konamiDetector.onKonamiCode(() => {
      const unlocked = manager.unlock("konami-code");
      if (unlocked) {
        // Trigger special effect
        triggerKonamiEffect();
      }
    });

    // Track time spent
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      manager.trackTimeSpent(1);
      setStats(manager.getStats());
    }, 1000);

    // Track section visibility with Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            manager.trackSectionVisit(entry.target.id);
            setStats(manager.getStats());
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      unsubscribe();
      unsubscribeKonami();
      clearInterval(timeInterval);
      observer.disconnect();
    };
  }, [manager]);

  // Toast queue management
  useEffect(() => {
    if (!currentToast && toastQueue.length > 0) {
      setCurrentToast(toastQueue[0]);
      setToastQueue((prev) => prev.slice(1));
    }
  }, [currentToast, toastQueue]);

  const triggerKonamiEffect = () => {
    // Full screen neon flash effect
    const flash = document.createElement("div");
    flash.className = "fixed inset-0 z-[9998] pointer-events-none";
    flash.style.background = "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 0.3s ease";
    document.body.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
      flash.style.opacity = "0";
    }, 300);

    setTimeout(() => {
      document.body.removeChild(flash);
    }, 600);

    // Play victory sound if audio is available
    // (Will be integrated with AudioManager)
  };

  const showModal = () => {
    setIsModalOpen(true);
    manager.unlock("audio-enthusiast");
  };

  return (
    <AchievementContext.Provider value={{ manager, achievements, stats, showModal }}>
      {children}

      {/* Achievement Toast */}
      <AchievementToast
        achievement={currentToast}
        onDismiss={() => setCurrentToast(null)}
      />

      {/* Achievement Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              className="relative z-10 bg-black/95 border-4 border-cyan-500 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 50px rgba(34, 211, 238, 0.8)",
              }}
            >
              {/* Header */}
              <div
                className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 p-6 border-b-4 border-fuchsia-500"
                style={{
                  boxShadow: "0 4px 20px rgba(217, 70, 239, 0.5)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: "Impact, sans-serif",
                        textShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      🏆 ACHIEVEMENTS
                    </h2>
                    <div
                      className="text-white/90"
                      style={{ fontFamily: "monospace" }}
                    >
                      {manager.getUnlockedCount()} / {achievements.length} UNLOCKED • {manager.getTotalPoints()} PTS
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-4xl text-white/80 hover:text-white transition-colors leading-none"
                    aria-label="Close achievements"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Achievement Grid */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        achievement.unlocked
                          ? "border-cyan-500 bg-cyan-950/20"
                          : "border-gray-700 bg-gray-900/20 opacity-60"
                      }`}
                      style={{
                        boxShadow: achievement.unlocked
                          ? "0 0 15px rgba(34, 211, 238, 0.3)"
                          : "none",
                      }}
                    >
                      {/* Icon */}
                      <div className="text-5xl mb-3 text-center">
                        {achievement.unlocked ? achievement.icon : "🔒"}
                      </div>

                      {/* Rarity badge */}
                      <div
                        className="text-xs text-center mb-2 font-bold tracking-wider"
                        style={{
                          fontFamily: "monospace",
                          color:
                            achievement.rarity === "legendary"
                              ? "#ffff00"
                              : achievement.rarity === "epic"
                              ? "#9333ea"
                              : achievement.rarity === "rare"
                              ? "#ff00ff"
                              : "#00ffff",
                        }}
                      >
                        {achievement.rarity.toUpperCase()}
                      </div>

                      {/* Name */}
                      <h3
                        className="text-lg font-black text-center mb-2 text-white"
                        style={{ fontFamily: "Impact, sans-serif" }}
                      >
                        {achievement.unlocked ? achievement.name : "???"}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-xs text-white/80 text-center mb-3"
                        style={{ fontFamily: "monospace" }}
                      >
                        {achievement.unlocked ? achievement.description : "Locked"}
                      </p>

                      {/* Points */}
                      <div className="text-center">
                        <span
                          className="inline-block px-3 py-1 border rounded text-xs font-bold"
                          style={{
                            borderColor: achievement.unlocked ? "#00ffff" : "#666",
                            color: achievement.unlocked ? "#00ffff" : "#666",
                            fontFamily: "Impact, sans-serif",
                          }}
                        >
                          {achievement.points} PTS
                        </span>
                      </div>

                      {/* Unlock date */}
                      {achievement.unlocked && achievement.unlockedAt && (
                        <div
                          className="text-[10px] text-white/50 text-center mt-2"
                          style={{ fontFamily: "monospace" }}
                        >
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating achievement button */}
      <button
        onClick={showModal}
        className="fixed bottom-24 left-6 z-50 bg-black/80 border-2 border-fuchsia-500 rounded-lg p-3
                   backdrop-blur-sm hover:border-cyan-500 transition-colors"
        style={{
          boxShadow: "0 0 20px rgba(217, 70, 239, 0.4)",
        }}
        aria-label="View achievements"
      >
        <div className="text-2xl">🏆</div>
        <div
          className="text-[10px] text-cyan-400 font-bold mt-1 text-center"
          style={{ fontFamily: "monospace" }}
        >
          {manager.getUnlockedCount()}/{achievements.length}
        </div>
      </button>
    </AchievementContext.Provider>
  );
}
