"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AudioPlayer, ARCADE_SOUNDS, getAudioPlayer } from "../../lib/audio/AudioPlayer";

interface AudioContextType {
  play: (soundName: string, volume?: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  isReady: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [audioPlayer] = useState<AudioPlayer>(() => getAudioPlayer());
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedVolume = localStorage.getItem("arcade-volume");
    const savedMuted = localStorage.getItem("arcade-muted");

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
      audioPlayer.setVolume(vol);
    }

    if (savedMuted === "true") {
      setIsMuted(true);
      audioPlayer.setMuted(true);
    }

    // Preload sounds
    audioPlayer.preloadSounds(ARCADE_SOUNDS).then(() => {
      setIsReady(true);
    });

    // Resume audio context on first user interaction
    const resumeAudio = () => {
      audioPlayer.resume();
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("keydown", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);
    document.addEventListener("keydown", resumeAudio);

    return () => {
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("keydown", resumeAudio);
    };
  }, [audioPlayer]);

  const play = (soundName: string, vol: number = 1.0) => {
    if (isReady) {
      audioPlayer.play(soundName, vol);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    audioPlayer.setVolume(newVolume);
    localStorage.setItem("arcade-volume", newVolume.toString());
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioPlayer.setMuted(newMuted);
    localStorage.setItem("arcade-muted", newMuted.toString());
  };

  return (
    <AudioContext.Provider value={{ play, volume, setVolume, isMuted, toggleMute, isReady }}>
      {children}

      {/* Floating audio controls */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-black/80 border-2 border-cyan-500 rounded-lg p-3 backdrop-blur-sm
                     hover:border-fuchsia-500 transition-colors"
          style={{
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
          }}
          aria-label="Audio controls"
        >
          {isMuted ? (
            <span className="text-2xl">🔇</span>
          ) : (
            <span className="text-2xl">🔊</span>
          )}
        </button>

        {showControls && (
          <div
            className="absolute bottom-full left-0 mb-2 bg-black/90 border-2 border-cyan-500
                       rounded-lg p-4 backdrop-blur-sm min-w-[200px]"
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
            }}
          >
            <div className="text-cyan-400 font-bold mb-3 text-sm" style={{ fontFamily: "monospace" }}>
              AUDIO CONTROLS
            </div>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="w-full bg-purple-950/50 border-2 border-fuchsia-500 rounded p-2 mb-3
                         hover:bg-purple-900/50 transition-colors text-white font-bold text-sm"
              style={{
                fontFamily: "Impact, sans-serif",
                boxShadow: "0 0 10px rgba(217, 70, 239, 0.4)",
              }}
            >
              {isMuted ? "UNMUTE" : "MUTE"}
            </button>

            {/* Volume slider */}
            <div className="mb-2">
              <label className="text-yellow-400 text-xs font-bold mb-1 block" style={{ fontFamily: "monospace" }}>
                VOLUME: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
                disabled={isMuted}
              />
            </div>

            {/* Status indicator */}
            <div
              className="text-xs mt-3 pt-2 border-t border-cyan-500/30"
              style={{ fontFamily: "monospace" }}
            >
              <span className="text-cyan-400">STATUS: </span>
              <span className={isReady ? "text-green-400" : "text-yellow-400"}>
                {isReady ? "READY" : "LOADING..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </AudioContext.Provider>
  );
}
