"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MobileControlsProps {
  onMove: (direction: { x: number; y: number }) => void;
  onFire: () => void;
  visible: boolean;
}

export default function MobileControls({ onMove, onFire, visible }: MobileControlsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
  }, []);

  const handleJoystickStart = (e: React.TouchEvent) => {
    setIsActive(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!isActive || !joystickRef.current) return;

    const touch = e.touches[0];
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = rect.width / 2;

    const clampedDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(deltaY, deltaX);

    const clampedX = Math.cos(angle) * clampedDistance;
    const clampedY = Math.sin(angle) * clampedDistance;

    setJoystickPosition({ x: clampedX, y: clampedY });

    // Normalize direction
    const normalizedX = clampedX / maxDistance;
    const normalizedY = clampedY / maxDistance;

    onMove({ x: normalizedX, y: normalizedY });
  };

  const handleJoystickEnd = () => {
    setIsActive(false);
    setJoystickPosition({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };

  if (!isMobile || !visible) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Virtual Joystick - Left Side */}
      <div className="absolute bottom-8 left-8 pointer-events-auto">
        <div
          ref={joystickRef}
          className="relative w-32 h-32 rounded-full border-4 border-cyan-500/50 bg-black/40 backdrop-blur-sm"
          style={{
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)",
          }}
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
        >
          {/* Directional indicators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-2 text-cyan-400 text-xs opacity-50">▲</div>
            <div className="absolute bottom-2 text-cyan-400 text-xs opacity-50">▼</div>
            <div className="absolute left-2 text-cyan-400 text-xs opacity-50">◄</div>
            <div className="absolute right-2 text-cyan-400 text-xs opacity-50">►</div>
          </div>

          {/* Joystick knob */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border-4 border-cyan-500 bg-gradient-to-br from-cyan-600 to-fuchsia-600"
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.8), inset 0 0 10px rgba(0, 0, 0, 0.5)",
              x: joystickPosition.x,
              y: joystickPosition.y,
            }}
            animate={{
              scale: isActive ? 0.9 : 1,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
              🕹️
            </div>
          </motion.div>
        </div>

        {/* Label */}
        <div
          className="text-center mt-2 text-xs text-cyan-400 font-bold"
          style={{ fontFamily: "monospace", textShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
        >
          MOVE
        </div>
      </div>

      {/* Fire Button - Right Side */}
      <div className="absolute bottom-8 right-8 pointer-events-auto">
        <motion.button
          className="w-24 h-24 rounded-full border-4 border-fuchsia-500 bg-gradient-to-br from-fuchsia-600 to-yellow-600 active:scale-90 transition-transform"
          style={{
            boxShadow: "0 0 30px rgba(217, 70, 239, 0.8), inset 0 0 10px rgba(0, 0, 0, 0.5)",
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            onFire();
          }}
          whileTap={{ scale: 0.85 }}
        >
          <div className="text-white text-3xl font-black" style={{ fontFamily: "Impact, sans-serif" }}>
            FIRE
          </div>
        </motion.button>

        {/* Label */}
        <div
          className="text-center mt-2 text-xs text-fuchsia-400 font-bold"
          style={{ fontFamily: "monospace", textShadow: "0 0 10px rgba(217, 70, 239, 0.8)" }}
        >
          SHOOT
        </div>
      </div>
    </div>
  );
}
