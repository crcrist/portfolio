/**
 * Achievement System Manager
 * Tracks user interactions and unlocks achievements
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  unlocked: boolean;
  unlockedAt?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-visit",
    name: "First Steps",
    description: "Welcome to the arcade!",
    icon: "🎮",
    rarity: "common",
    points: 10,
    unlocked: false,
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Visit all sections of the portfolio",
    icon: "🗺️",
    rarity: "common",
    points: 25,
    unlocked: false,
  },
  {
    id: "high-roller",
    name: "High Roller",
    description: "Earn 100 credits in Space Shooter",
    icon: "💰",
    rarity: "rare",
    points: 50,
    unlocked: false,
  },
  {
    id: "chatterbox",
    name: "Chatterbox",
    description: "Send 10 messages to the chatbot",
    icon: "💬",
    rarity: "common",
    points: 30,
    unlocked: false,
  },
  {
    id: "konami-code",
    name: "Konami Master",
    description: "Enter the legendary Konami code",
    icon: "🎯",
    rarity: "legendary",
    points: 100,
    unlocked: false,
  },
  {
    id: "speed-runner",
    name: "Speed Runner",
    description: "Complete site tour in under 60 seconds",
    icon: "⚡",
    rarity: "epic",
    points: 75,
    unlocked: false,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Visit the site at midnight",
    icon: "🦉",
    rarity: "rare",
    points: 40,
    unlocked: false,
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Unlock all achievements",
    icon: "👑",
    rarity: "legendary",
    points: 200,
    unlocked: false,
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Click all contact links",
    icon: "🦋",
    rarity: "common",
    points: 20,
    unlocked: false,
  },
  {
    id: "tech-savvy",
    name: "Tech Savvy",
    description: "Hover over all tech stack items",
    icon: "💻",
    rarity: "rare",
    points: 35,
    unlocked: false,
  },
  {
    id: "game-master",
    name: "Game Master",
    description: "Play Space Shooter 5 times",
    icon: "🎲",
    rarity: "epic",
    points: 60,
    unlocked: false,
  },
  {
    id: "project-viewer",
    name: "Project Viewer",
    description: "Hover over all project cards",
    icon: "📁",
    rarity: "common",
    points: 15,
    unlocked: false,
  },
  {
    id: "arcade-addict",
    name: "Arcade Addict",
    description: "Spend 10 minutes on the site",
    icon: "🕹️",
    rarity: "rare",
    points: 45,
    unlocked: false,
  },
  {
    id: "coin-collector",
    name: "Coin Collector",
    description: "Insert 5 coins to play games",
    icon: "🪙",
    rarity: "common",
    points: 25,
    unlocked: false,
  },
  {
    id: "audio-enthusiast",
    name: "Audio Enthusiast",
    description: "Toggle audio settings",
    icon: "🔊",
    rarity: "common",
    points: 10,
    unlocked: false,
  },
];

const STORAGE_KEY = "arcade-achievements";
const STATS_KEY = "arcade-stats";

export interface UserStats {
  creditsEarned: number;
  gamesPlayed: number;
  messagesSent: number;
  sectionsVisited: Set<string>;
  projectsViewed: Set<string>;
  techStackHovered: Set<string>;
  contactLinksClicked: Set<string>;
  coinsInserted: number;
  timeSpent: number;
  firstVisit: number;
}

export class AchievementManager {
  private achievements: Achievement[] = [];
  private stats: UserStats;
  private listeners: Array<(achievement: Achievement) => void> = [];

  constructor() {
    this.achievements = this.loadAchievements();
    this.stats = this.loadStats();
    this.checkAutoUnlocks();
  }

  private loadAchievements(): Achievement[] {
    if (typeof window === "undefined") return [...ACHIEVEMENTS];

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedAchievements = JSON.parse(saved);
        return ACHIEVEMENTS.map((achievement) => {
          const saved = savedAchievements.find((a: Achievement) => a.id === achievement.id);
          return saved ? { ...achievement, ...saved } : achievement;
        });
      } catch (error) {
        console.error("Failed to load achievements", error);
      }
    }
    return [...ACHIEVEMENTS];
  }

  private loadStats(): UserStats {
    if (typeof window === "undefined") {
      return this.getDefaultStats();
    }

    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          sectionsVisited: new Set(parsed.sectionsVisited || []),
          projectsViewed: new Set(parsed.projectsViewed || []),
          techStackHovered: new Set(parsed.techStackHovered || []),
          contactLinksClicked: new Set(parsed.contactLinksClicked || []),
        };
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    }
    return this.getDefaultStats();
  }

  private getDefaultStats(): UserStats {
    return {
      creditsEarned: 0,
      gamesPlayed: 0,
      messagesSent: 0,
      sectionsVisited: new Set(),
      projectsViewed: new Set(),
      techStackHovered: new Set(),
      contactLinksClicked: new Set(),
      coinsInserted: 0,
      timeSpent: 0,
      firstVisit: Date.now(),
    };
  }

  private saveAchievements() {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.achievements));
  }

  private saveStats() {
    if (typeof window === "undefined") return;
    const statsToSave = {
      ...this.stats,
      sectionsVisited: Array.from(this.stats.sectionsVisited),
      projectsViewed: Array.from(this.stats.projectsViewed),
      techStackHovered: Array.from(this.stats.techStackHovered),
      contactLinksClicked: Array.from(this.stats.contactLinksClicked),
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(statsToSave));
  }

  private checkAutoUnlocks() {
    // Check time-based achievements
    const hour = new Date().getHours();
    if (hour === 0) {
      this.unlock("night-owl");
    }

    // First visit
    if (!this.stats.firstVisit) {
      this.unlock("first-visit");
    }
  }

  unlock(achievementId: string): boolean {
    const achievement = this.achievements.find((a) => a.id === achievementId);
    if (!achievement || achievement.unlocked) return false;

    achievement.unlocked = true;
    achievement.unlockedAt = Date.now();

    this.saveAchievements();

    // Notify listeners
    this.listeners.forEach((listener) => listener(achievement));

    // Check for completionist
    if (achievementId !== "completionist") {
      this.checkCompletionist();
    }

    return true;
  }

  private checkCompletionist() {
    const allUnlocked = this.achievements
      .filter((a) => a.id !== "completionist")
      .every((a) => a.unlocked);

    if (allUnlocked) {
      this.unlock("completionist");
    }
  }

  getAchievements(): Achievement[] {
    return [...this.achievements];
  }

  getStats(): UserStats {
    return { ...this.stats };
  }

  // Stat tracking methods
  trackCredits(amount: number) {
    this.stats.creditsEarned += amount;
    this.saveStats();

    if (this.stats.creditsEarned >= 100) {
      this.unlock("high-roller");
    }
  }

  trackGamePlayed() {
    this.stats.gamesPlayed += 1;
    this.saveStats();

    if (this.stats.gamesPlayed >= 5) {
      this.unlock("game-master");
    }
  }

  trackMessage() {
    this.stats.messagesSent += 1;
    this.saveStats();

    if (this.stats.messagesSent >= 10) {
      this.unlock("chatterbox");
    }
  }

  trackSectionVisit(sectionId: string) {
    this.stats.sectionsVisited.add(sectionId);
    this.saveStats();

    const requiredSections = ["hero", "projects", "about", "contact"];
    const allVisited = requiredSections.every((s) => this.stats.sectionsVisited.has(s));
    if (allVisited) {
      this.unlock("explorer");
    }
  }

  trackProjectView(projectId: string) {
    this.stats.projectsViewed.add(projectId);
    this.saveStats();

    if (this.stats.projectsViewed.size >= 4) {
      this.unlock("project-viewer");
    }
  }

  trackTechHover(techName: string) {
    this.stats.techStackHovered.add(techName);
    this.saveStats();

    if (this.stats.techStackHovered.size >= 8) {
      this.unlock("tech-savvy");
    }
  }

  trackContactClick(contactType: string) {
    this.stats.contactLinksClicked.add(contactType);
    this.saveStats();

    if (this.stats.contactLinksClicked.size >= 3) {
      this.unlock("social-butterfly");
    }
  }

  trackCoinInsert() {
    this.stats.coinsInserted += 1;
    this.saveStats();

    if (this.stats.coinsInserted >= 5) {
      this.unlock("coin-collector");
    }
  }

  trackTimeSpent(seconds: number) {
    this.stats.timeSpent += seconds;
    this.saveStats();

    if (this.stats.timeSpent >= 600) {
      this.unlock("arcade-addict");
    }

    if (this.stats.timeSpent >= 60 && this.stats.sectionsVisited.size >= 4) {
      this.unlock("speed-runner");
    }
  }

  onAchievementUnlocked(callback: (achievement: Achievement) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  getTotalPoints(): number {
    return this.achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  }

  getUnlockedCount(): number {
    return this.achievements.filter((a) => a.unlocked).length;
  }
}

// Singleton instance
let achievementManagerInstance: AchievementManager | null = null;

export function getAchievementManager(): AchievementManager {
  if (!achievementManagerInstance) {
    achievementManagerInstance = new AchievementManager();
  }
  return achievementManagerInstance;
}
