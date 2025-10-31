/**
 * Audio Player Utility for Arcade Sound Effects
 * Manages sound effect playback with Web Audio API
 */

export interface SoundEffect {
  name: string;
  url: string;
  volume?: number;
}

export class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private soundBuffers: Map<string, AudioBuffer> = new Map();
  private masterVolume: number = 0.5;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Preload sound effects into memory
   */
  async preloadSounds(sounds: SoundEffect[]): Promise<void> {
    if (!this.audioContext) return;

    const loadPromises = sounds.map(async (sound) => {
      try {
        const response = await fetch(sound.url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        this.soundBuffers.set(sound.name, audioBuffer);
      } catch (error) {
        console.warn(`Failed to load sound: ${sound.name}`, error);
      }
    });

    await Promise.all(loadPromises);
  }

  /**
   * Play a preloaded sound effect
   */
  play(soundName: string, volume: number = 1.0): void {
    if (!this.audioContext || this.isMuted) return;

    const buffer = this.soundBuffers.get(soundName);
    if (!buffer) {
      console.warn(`Sound not found: ${soundName}`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    gainNode.gain.value = this.masterVolume * volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start(0);
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current volume
   */
  getVolume(): number {
    return this.masterVolume;
  }

  /**
   * Mute/unmute all sounds
   */
  setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  /**
   * Check if muted
   */
  isMutedState(): boolean {
    return this.isMuted;
  }

  /**
   * Resume audio context (required for autoplay policies)
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }
}

/**
 * Default arcade sound effects configuration
 * Note: Sound files should be placed in /public/sounds/
 */
export const ARCADE_SOUNDS: SoundEffect[] = [
  { name: "coin", url: "/sounds/coin.mp3", volume: 0.6 },
  { name: "button", url: "/sounds/button.mp3", volume: 0.4 },
  { name: "laser", url: "/sounds/laser.mp3", volume: 0.5 },
  { name: "explosion", url: "/sounds/explosion.mp3", volume: 0.7 },
  { name: "achievement", url: "/sounds/achievement.mp3", volume: 0.8 },
  { name: "level-up", url: "/sounds/level-up.mp3", volume: 0.7 },
  { name: "game-over", url: "/sounds/game-over.mp3", volume: 0.6 },
  { name: "menu-select", url: "/sounds/menu-select.mp3", volume: 0.3 },
  { name: "powerup", url: "/sounds/powerup.mp3", volume: 0.5 },
];

// Singleton instance
let audioPlayerInstance: AudioPlayer | null = null;

export function getAudioPlayer(): AudioPlayer {
  if (!audioPlayerInstance) {
    audioPlayerInstance = new AudioPlayer();
  }
  return audioPlayerInstance;
}
