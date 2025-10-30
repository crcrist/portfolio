"use client";
import { useEffect, useState } from "react";

type CRTMonitorProps = {
  powerOn: boolean;
  setPowerOn: (value: boolean) => void;
  screenColor: "green" | "amber";
};

export default function CRTMonitor({ powerOn, setPowerOn, screenColor }: CRTMonitorProps) {
  const [time, setTime] = useState(new Date());
  const [bootSequence, setBootSequence] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullText = "CONNOR CRIST • FULL-STACK DEVELOPER";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursor = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    if (powerOn && bootSequence) {
      let index = 0;
      const typing = setInterval(() => {
        if (index <= fullText.length) {
          setTypingText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typing);
        }
      }, 80);
      return () => clearInterval(typing);
    }
  }, [powerOn, bootSequence]);

  const handlePowerOn = () => {
    if (!powerOn) {
      setPowerOn(true);
      setBootSequence(true);
      setTypingText("");
    }
  };

  const glowColor = screenColor === 'green' 
    ? 'rgba(52, 211, 153, 0.8)' 
    : 'rgba(251, 191, 36, 0.8)';

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* CRT Monitor Housing */}
      <div className="relative bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 rounded-3xl p-12 
                      shadow-2xl"
           style={{
             boxShadow: `
               inset 0 -8px 16px rgba(0,0,0,0.3),
               inset 0 8px 16px rgba(255,255,255,0.4),
               0 30px 60px rgba(0,0,0,0.6)
             `
           }}>
        
        {/* Monitor Brand Label */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gray-600 font-bold text-sm tracking-wider">
          CONNORTECH SYSTEMS
        </div>

        {/* Screen Bezel */}
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl p-8
                        shadow-inner"
             style={{
               boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.8)'
             }}>
          
          {/* CRT Screen */}
          <div className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-500
                          ${powerOn ? 'opacity-100' : 'opacity-0'}`}
               style={{
                 background: powerOn ? '#000' : '#111',
                 boxShadow: powerOn ? `0 0 80px ${glowColor}, inset 0 0 40px ${glowColor}` : 'none'
               }}>
            
            {/* Curved screen effect */}
            <div className="absolute inset-0"
                 style={{
                   background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)'
                 }} />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)',
                 }} />

            {/* Screen flicker */}
            {powerOn && (
              <div className="absolute inset-0 pointer-events-none animate-flicker opacity-5"
                   style={{
                     background: 'linear-gradient(180deg, transparent 0%, white 50%, transparent 100%)',
                     animation: 'flicker 0.15s infinite'
                   }} />
            )}

            {/* Content */}
            {powerOn && (
              <div className="relative h-full p-8 font-mono overflow-y-auto scrollbar-thin"
                   style={{
                     color: screenColor === 'green' ? '#4ade80' : '#fbbf24',
                     textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`
                   }}>
                
                {bootSequence && (
                  <div className="space-y-2 text-sm mb-8">
                    <p>&gt; SYSTEM BOOT SEQUENCE INITIATED...</p>
                    <p>&gt; Loading BIOS version 4.2.0</p>
                    <p>&gt; Memory test: 64MB OK</p>
                    <p>&gt; Initializing display drivers...</p>
                    <p>&gt; System ready.</p>
                    <p className="mt-4">_________________________________</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="text-3xl font-bold mb-6">
                    {typingText}
                    {cursorVisible && bootSequence && <span className="animate-pulse">█</span>}
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>&gt; SPECIALIZATION: Full-Stack Development</p>
                    <p>&gt; EXPERTISE: Infrastructure & DevOps</p>
                    <p>&gt; PASSION: Homelab Automation</p>
                  </div>

                  <div className="mt-8 p-4 border-2 rounded"
                       style={{
                         borderColor: screenColor === 'green' ? '#4ade80' : '#fbbf24'
                       }}>
                    <p className="text-xs mb-2">SYSTEM_INFO:</p>
                    <div className="space-y-1 text-xs">
                      <p>TIME: {time.toLocaleTimeString('en-US', { hour12: false })}</p>
                      <p>DATE: {time.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                      <p>STATUS: OPERATIONAL</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2 text-sm">
                    <p>&gt; Press SCROLL to explore portfolio</p>
                    <p>&gt; Click CHAT ICON for terminal interface</p>
                    <p>&gt; Toggle GREEN/AMBER in navigation</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`px-6 py-3 border-2 rounded font-bold text-sm
                                 hover:bg-opacity-20 transition-all duration-200
                                 ${screenColor === 'green' 
                                   ? 'border-emerald-400 hover:bg-emerald-400' 
                                   : 'border-amber-400 hover:bg-amber-400'}`}>
                      [VIEW_PROJECTS]
                    </button>
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`px-6 py-3 border-2 rounded font-bold text-sm
                                 hover:bg-opacity-20 transition-all duration-200
                                 ${screenColor === 'green' 
                                   ? 'border-emerald-400 hover:bg-emerald-400' 
                                   : 'border-amber-400 hover:bg-amber-400'}`}>
                      [CONTACT]
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Power off screen */}
            {!powerOn && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-600 text-xl font-mono animate-pulse">
                  [ NO SIGNAL ]
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Monitor Controls */}
        <div className="absolute bottom-6 right-12 flex gap-3">
          {/* Power Button */}
          <button
            onClick={handlePowerOn}
            className={`w-12 h-12 rounded-full border-4 border-gray-600 
                       transition-all duration-200 relative
                       ${powerOn 
                         ? 'bg-gradient-to-b from-green-500 to-green-600 shadow-[0_0_20px_rgba(52,211,153,0.8)]' 
                         : 'bg-gradient-to-b from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500'}`}
            style={{
              boxShadow: powerOn 
                ? 'inset 0 -2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(52,211,153,0.8)' 
                : 'inset 0 -2px 4px rgba(0,0,0,0.5)'
            }}>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
              ⏻
            </div>
          </button>

          {/* Brightness/Contrast dials (decorative) */}
          <div className="flex gap-2">
            {[...Array(2)].map((_, i) => (
              <div key={i}
                   className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-600 to-gray-700 
                             border-2 border-gray-800 relative"
                   style={{
                     boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                   }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               w-1 h-4 bg-gray-300 rounded-full"
                     style={{
                       transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                     }} />
              </div>
            ))}
          </div>
        </div>

        {/* Brand label on bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 font-bold text-xs tracking-widest">
          MODEL: CT-2025 • SERIAL: CC-001
        </div>
      </div>

      {/* Monitor stand */}
      <div className="relative mt-6 mx-auto w-48 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-lg"
           style={{
             boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.4)'
           }} />
      <div className="relative mx-auto w-64 h-4 bg-gradient-to-b from-gray-500 to-gray-600 rounded-b-xl"
           style={{
             boxShadow: '0 4px 6px rgba(0,0,0,0.4)'
           }} />
    </div>
  );
}
