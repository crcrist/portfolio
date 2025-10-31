"use client";
import { useState, useEffect, useRef } from "react";
import SpaceShooterGame from "./SpaceShooterGame";
import { useAchievements } from "./arcade/AchievementSystem";
import { useAudio } from "./arcade/AudioManager";

type ArcadeCabinetProps = {
  credits: number;
  setCredits: (value: number | ((prev: number) => number)) => void;
};

export default function ArcadeCabinet({ credits, setCredits }: ArcadeCabinetProps) {
  const [gameActive, setGameActive] = useState(false);
  const [showInsertCoin, setShowInsertCoin] = useState(true);
  const [highScore, setHighScore] = useState<string>('0');
  const { manager } = useAchievements();
  const { play, isReady } = useAudio();

  // Load high score on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHighScore(localStorage.getItem('highScore') || '0');
    }
  }, []);

  const insertCoin = () => {
    setCredits(prev => prev + 1);
    setShowInsertCoin(false);
    manager.trackCoinInsert();
    if (isReady) {
      play("coin", 0.8);
    }
  };

  const startGame = () => {
    if (credits > 0) {
      setCredits(prev => prev - 1);
      setGameActive(true);
      manager.trackGamePlayed();
      if (isReady) {
        play("powerup", 0.6);
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Arcade Cabinet */}
      <div className="relative">
        {/* Top Marquee */}
        <div className="relative bg-gradient-to-r from-yellow-400 via-red-500 to-fuchsia-500 rounded-t-3xl p-2"
             style={{
               boxShadow: '0 0 60px rgba(251, 191, 36, 0.8), 0 0 80px rgba(236, 72, 153, 0.6)'
             }}>
          <div className="bg-black rounded-t-2xl p-8 relative overflow-hidden">
            {/* Animated bulbs */}
            <div className="absolute top-2 left-0 right-0 flex justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i}
                     className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"
                     style={{
                       animationDelay: `${i * 0.2}s`,
                       boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)'
                     }} />
              ))}
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-center tracking-wider mt-4"
                style={{
                  fontFamily: 'Impact, sans-serif',
                  background: 'linear-gradient(180deg, #ffff00 0%, #ff00ff 50%, #00ffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.8))'
                }}>
              PORTFOLIO
            </h1>
            <div className="text-center text-2xl font-black text-cyan-400 tracking-widest"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 15px rgba(34, 211, 238, 0.8)'
                 }}>
              SPACE EDITION
            </div>
          </div>
        </div>

        {/* Main Cabinet Body */}
        <div className="relative bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-950 p-8 rounded-b-3xl"
             style={{
               boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.9)'
             }}>
          
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-10 rounded-b-3xl pointer-events-none"
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   90deg,
                   rgba(139, 69, 19, 0.3) 0px,
                   rgba(101, 67, 33, 0.3) 10px,
                   rgba(139, 69, 19, 0.3) 20px
                 )`
               }} />

          {/* Screen Bezel */}
          <div className="relative bg-black rounded-2xl p-6 mb-8"
               style={{
                 boxShadow: 'inset 0 8px 20px rgba(0,0,0,0.9)'
               }}>
            
            {/* CRT Screen */}
            <div className="relative aspect-[4/3] bg-black rounded-xl overflow-hidden border-4 border-gray-900"
                 style={{
                   boxShadow: 'inset 0 0 60px rgba(34, 211, 238, 0.3)'
                 }}>
              
              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-20"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)',
                   }} />

              {/* CRT curve effect */}
              <div className="absolute inset-0 pointer-events-none z-20"
                   style={{
                     background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)'
                   }} />

              {/* Screen content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {!gameActive ? (
                  /* Attract Mode */
                  <div className="text-center px-8">
                    {showInsertCoin && (
                      <div className="mb-8 animate-pulse">
                        <div className="text-5xl font-black mb-4"
                             style={{
                               fontFamily: 'Impact, sans-serif',
                               color: '#ffff00',
                               textShadow: '0 0 20px rgba(255, 255, 0, 0.8), 0 0 40px rgba(255, 255, 0, 0.6)'
                             }}>
                          INSERT COIN
                        </div>
                        <div className="text-2xl text-cyan-400 font-bold"
                             style={{
                               fontFamily: 'monospace',
                               textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                             }}>
                          TO START
                        </div>
                      </div>
                    )}

                    {credits > 0 && (
                      <button
                        onClick={startGame}
                        className="bg-gradient-to-r from-yellow-400 to-red-500 text-black font-black text-3xl 
                                   px-12 py-6 rounded-lg border-4 border-yellow-300
                                   hover:scale-110 transition-transform animate-pulse"
                        style={{
                          fontFamily: 'Impact, sans-serif',
                          boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)'
                        }}>
                        PRESS START
                      </button>
                    )}

                    <div className="mt-8">
                      <div className="text-fuchsia-400 font-bold mb-4"
                           style={{
                             fontFamily: 'monospace',
                             textShadow: '0 0 10px rgba(217, 70, 239, 0.8)'
                           }}>
                        CREDITS: {credits}
                      </div>
                      
                      <div className="space-y-2 text-sm text-cyan-400"
                           style={{
                             fontFamily: 'monospace',
                             textShadow: '0 0 8px rgba(34, 211, 238, 0.6)'
                           }}>
                        <p>← → ARROWS: MOVE</p>
                        <p>SPACE: FIRE</p>
                        <p>DESTROY ALL INVADERS!</p>
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="text-yellow-400 text-2xl font-black mb-4"
                           style={{
                             fontFamily: 'Impact, sans-serif',
                             textShadow: '0 0 15px rgba(251, 191, 36, 0.8)'
                           }}>
                        HIGH SCORE
                      </div>
                      <div className="text-white text-4xl font-black"
                           style={{
                             fontFamily: 'Impact, sans-serif',
                             textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                           }}>
                        {highScore}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Game */
                  <SpaceShooterGame onGameOver={() => setGameActive(false)} />
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-gradient-to-b from-red-900 to-red-950 rounded-2xl p-8"
               style={{
                 boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.8)'
               }}>
            <div className="flex items-center justify-center gap-12">
              {/* Joystick */}
              <div className="relative">
                <div className="text-center mb-2 text-yellow-400 text-xs font-bold">
                  JOYSTICK
                </div>
                <div className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center"
                     style={{
                       boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)'
                     }}>
                  <div className="w-12 h-12 bg-gradient-to-b from-red-600 to-red-800 rounded-full"
                       style={{
                         boxShadow: '0 4px 8px rgba(0,0,0,0.8), inset 0 -2px 4px rgba(0,0,0,0.5)'
                       }}>
                    <div className="w-full h-full rounded-full border-4 border-red-900" />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                <div className="text-center mb-2 text-yellow-400 text-xs font-bold">
                  ACTION BUTTONS
                </div>
                <div className="flex gap-4">
                  {[
                    { label: 'A', color: 'from-red-500 to-red-700' },
                    { label: 'B', color: 'from-yellow-500 to-yellow-700' },
                    { label: 'C', color: 'from-blue-500 to-blue-700' }
                  ].map((btn) => (
                    <button key={btn.label}
                            className={`w-16 h-16 rounded-full bg-gradient-to-b ${btn.color}
                                       border-4 border-black font-black text-white text-2xl
                                       shadow-2xl active:translate-y-1 transition-transform`}
                            style={{
                              boxShadow: '0 6px 12px rgba(0,0,0,0.8), inset 0 -3px 6px rgba(0,0,0,0.5)'
                            }}>
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Insert Coin Button */}
              <div className="relative">
                <div className="text-center mb-2 text-yellow-400 text-xs font-bold animate-pulse">
                  INSERT COIN
                </div>
                <button
                  onClick={insertCoin}
                  className="w-32 h-16 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600
                             rounded-lg border-4 border-yellow-700 font-black text-2xl
                             hover:scale-105 active:translate-y-1 transition-all
                             shadow-2xl relative overflow-hidden"
                  style={{
                    boxShadow: '0 6px 12px rgba(0,0,0,0.8), 0 0 30px rgba(251, 191, 36, 0.6)',
                    fontFamily: 'Impact, sans-serif'
                  }}>
                  <span className="relative z-10 text-black drop-shadow-lg">COIN</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </button>
              </div>
            </div>

            {/* Start/Select buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <button className="px-8 py-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full
                                 text-white font-bold border-4 border-gray-600 text-sm
                                 shadow-lg active:translate-y-0.5 transition-transform"
                      style={{
                        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5)'
                      }}>
                1 PLAYER START
              </button>
              <button className="px-8 py-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full
                                 text-white font-bold border-4 border-gray-600 text-sm
                                 shadow-lg active:translate-y-0.5 transition-transform"
                      style={{
                        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5)'
                      }}>
                2 PLAYER START
              </button>
            </div>
          </div>

          {/* Speaker grills */}
          <div className="flex justify-between mt-6 px-8">
            {[...Array(2)].map((_, i) => (
              <div key={i}
                   className="w-32 h-32 bg-black rounded-lg grid grid-cols-6 gap-1 p-2"
                   style={{
                     boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)'
                   }}>
                {[...Array(36)].map((_, j) => (
                  <div key={j} className="bg-gray-800 rounded-full" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Cabinet base */}
        <div className="h-8 bg-gradient-to-b from-purple-950 to-black rounded-b-lg mx-4"
             style={{
               boxShadow: '0 8px 16px rgba(0,0,0,0.9)'
             }} />
      </div>
    </div>
  );
}
