/**
 * Konami Code Easter Egg
 * Detects the legendary ↑↑↓↓←→←→BA sequence
 */

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export type KonamiCallback = () => void;

export class KonamiCodeDetector {
  private sequence: string[] = [];
  private callbacks: KonamiCallback[] = [];
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Add key to sequence
    this.sequence.push(event.code);

    // Keep only last 10 keys
    if (this.sequence.length > 10) {
      this.sequence.shift();
    }

    // Check if sequence matches Konami code
    if (this.isKonamiCode()) {
      this.triggerCallbacks();
      this.sequence = [];
    }

    // Reset sequence after 3 seconds of inactivity
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
    this.resetTimeout = setTimeout(() => {
      this.sequence = [];
    }, 3000);
  }

  private isKonamiCode(): boolean {
    if (this.sequence.length !== KONAMI_CODE.length) return false;
    return KONAMI_CODE.every((key, index) => key === this.sequence[index]);
  }

  private triggerCallbacks() {
    this.callbacks.forEach((callback) => callback());
  }

  onKonamiCode(callback: KonamiCallback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }
}

// Singleton instance
let konamiDetectorInstance: KonamiCodeDetector | null = null;

export function getKonamiDetector(): KonamiCodeDetector {
  if (!konamiDetectorInstance) {
    konamiDetectorInstance = new KonamiCodeDetector();
  }
  return konamiDetectorInstance;
}
