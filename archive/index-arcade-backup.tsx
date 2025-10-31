"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ArcadeCabinet from "../components/ArcadeCabinet";
import ProjectCard from "../components/ProjectCard";
import Chatbot from "../components/Chatbot";
import CustomCursor from "../components/effects/CustomCursor";
import MatrixRain from "../components/effects/MatrixRain";
import ArcadeLoader from "../components/effects/ArcadeLoader";
import SmoothScroll from "../components/effects/SmoothScroll";
import ScrollProgress from "../components/effects/ScrollProgress";
import { useAchievements } from "../components/arcade/AchievementSystem";
import { useAudio } from "../components/arcade/AudioManager";

export default function Home() {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { manager } = useAchievements();
  const { play, isReady } = useAudio();

  // Track credits achievement
  useEffect(() => {
    manager.trackCredits(credits);
  }, [credits, manager]);

  // Play button sound on interactions
  useEffect(() => {
    if (!isReady) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        play("button", 0.3);
      }
      if (target.tagName === "A" || target.closest("a")) {
        play("menu-select", 0.2);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [play, isReady]);

  return (
    <>
      {/* Arcade Loader */}
      {isLoading && <ArcadeLoader onLoadComplete={() => setIsLoading(false)} duration={2500} />}

      {/* Main Content */}
      {!isLoading && (
        <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white relative overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain color="#00ffff" fontSize={12} speed={1.2} opacity={0.12} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Smooth Scroll */}
      <SmoothScroll />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Arcade carpet pattern background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               #ff0080 0px,
               #ff0080 10px,
               #00ffff 10px,
               #00ffff 20px,
               #ffff00 20px,
               #ffff00 30px
             )`,
             backgroundSize: '42px 42px'
           }} />

      {/* Neon glow ambient light */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] 
                        bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] 
                        bg-fuchsia-500/10 rounded-full blur-[120px]" />
      </div>

      <Navbar credits={credits} />

      {/* Hero - Arcade Cabinet */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-20">
        <ArcadeCabinet credits={credits} setCredits={setCredits} />
      </section>

      {/* Game Selection / Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Arcade marquee style header */}
          <div className="relative mb-16">
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-fuchsia-500 rounded-lg p-1 shadow-2xl"
                 style={{
                   boxShadow: '0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)'
                 }}>
              <div className="bg-black rounded-lg p-8">
                <h2 className="text-6xl font-black text-center mb-4 tracking-wider"
                    style={{
                      fontFamily: 'Impact, sans-serif',
                      background: 'linear-gradient(180deg, #ffff00 0%, #ff00ff 50%, #00ffff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
                      filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.8))'
                    }}>
                  GAME SELECT
                </h2>
                <p className="text-center text-cyan-400 font-bold tracking-widest"
                   style={{
                     fontFamily: 'monospace',
                     textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                   }}>
                  ▼ CHOOSE YOUR ADVENTURE ▼
                </p>
              </div>
            </div>
          </div>

          {/* Project Grid - Game Selection Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectCard
              title="BUDGET BLASTER"
              subtitle="Financial Management Simulator"
              description="Track expenses and blast through budget goals in this high-score chasing money manager!"
              difficulty="★★☆☆"
              players="1P"
              genre="STRATEGY"
            />
            <ProjectCard
              title="STOCK INVADERS"
              subtitle="Market Data Analytics"
              description="Defend your portfolio from volatile market swings! Real-time data and predictive algorithms."
              difficulty="★★★☆"
              players="1P"
              genre="ACTION"
            />
            <ProjectCard
              title="RECIPE QUEST"
              subtitle="Culinary Adventure RPG"
              description="Embark on a delicious journey! Random recipe generator meets Spotify soundtrack magic."
              difficulty="★★☆☆"
              players="1-2P"
              genre="ADVENTURE"
            />
            <ProjectCard
              title="HOMELAB HERO"
              subtitle="Infrastructure Management"
              description="Manage your server empire! Monitor resources, automate tasks, achieve 100% uptime!"
              difficulty="★★★★"
              players="1P"
              genre="SIMULATION"
            />
          </div>
        </div>
      </section>

      {/* About Section - High Score Style */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-2xl p-12 border-4 border-cyan-500 overflow-hidden"
               style={{
                 boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 60px rgba(34, 211, 238, 0.1)'
               }}>
            
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
                 }} />

            {/* CRT flicker */}
            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />

            <div className="relative z-10">
              {/* Retro header */}
              <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-r from-fuchsia-600 to-cyan-600 px-8 py-2 mb-6 
                                transform -skew-x-12"
                     style={{
                       boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
                     }}>
                  <span className="text-2xl font-black tracking-widest"
                        style={{ fontFamily: 'Impact, sans-serif' }}>
                    PLAYER PROFILE
                  </span>
                </div>
                <h2 className="text-5xl font-black mb-4"
                    style={{
                      fontFamily: 'Impact, sans-serif',
                      color: '#ffff00',
                      textShadow: '0 0 20px rgba(255, 255, 0, 0.8), 2px 2px 0 rgba(255, 0, 255, 0.5)'
                    }}>
                  CONNOR CRIST
                </h2>
                <p className="text-xl text-cyan-400 font-bold"
                   style={{
                     fontFamily: 'monospace',
                     textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                   }}>
                  FULL-STACK DEVELOPER • LEVEL 99
                </p>
              </div>

              {/* Stats display */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-950/50 border-2 border-fuchsia-500 rounded-lg p-6"
                     style={{
                       boxShadow: '0 0 20px rgba(217, 70, 239, 0.4)'
                     }}>
                  <div className="text-fuchsia-400 text-sm font-bold mb-2"
                       style={{ fontFamily: 'monospace' }}>
                    CLASS
                  </div>
                  <div className="text-2xl font-black text-white"
                       style={{ fontFamily: 'Impact, sans-serif' }}>
                    FULL-STACK WIZARD
                  </div>
                </div>
                
                <div className="bg-purple-950/50 border-2 border-cyan-500 rounded-lg p-6"
                     style={{
                       boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                     }}>
                  <div className="text-cyan-400 text-sm font-bold mb-2"
                       style={{ fontFamily: 'monospace' }}>
                    SPECIALIZATION
                  </div>
                  <div className="text-2xl font-black text-white"
                       style={{ fontFamily: 'Impact, sans-serif' }}>
                    INFRASTRUCTURE
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-black/80 border-2 border-yellow-400 rounded-lg p-8 mb-8"
                   style={{
                     boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                   }}>
                <p className="text-white leading-relaxed mb-4"
                   style={{ fontFamily: 'monospace' }}>
                  &gt; Building robust web applications and managing complex infrastructure
                </p>
                <p className="text-white leading-relaxed mb-4"
                   style={{ fontFamily: 'monospace' }}>
                  &gt; Passionate about automation, scalability, and homelab experimentation
                </p>
                <p className="text-white leading-relaxed"
                   style={{ fontFamily: 'monospace' }}>
                  &gt; Creating efficient workflows between development and operations
                </p>
              </div>

              {/* Tech Stack - Power-ups style */}
              <div>
                <h3 className="text-2xl font-black mb-6 text-center"
                    style={{
                      fontFamily: 'Impact, sans-serif',
                      color: '#ffff00',
                      textShadow: '0 0 20px rgba(255, 255, 0, 0.8)'
                    }}>
                  POWER-UPS COLLECTED
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "React", color: "cyan" },
                    { name: "Next.js", color: "fuchsia" },
                    { name: "TypeScript", color: "yellow" },
                    { name: "Node.js", color: "cyan" },
                    { name: "Python", color: "fuchsia" },
                    { name: "Docker", color: "yellow" },
                    { name: "Linux", color: "cyan" },
                    { name: "PostgreSQL", color: "fuchsia" }
                  ].map((tech) => (
                    <div key={tech.name}
                         className={`relative bg-black border-4 rounded-lg p-4 text-center
                                    transform hover:scale-110 transition-transform cursor-pointer
                                    ${tech.color === 'cyan' ? 'border-cyan-500' :
                                      tech.color === 'fuchsia' ? 'border-fuchsia-500' :
                                      'border-yellow-400'}`}
                         style={{
                           boxShadow: `0 0 20px ${
                             tech.color === 'cyan' ? 'rgba(34, 211, 238, 0.6)' :
                             tech.color === 'fuchsia' ? 'rgba(217, 70, 239, 0.6)' :
                             'rgba(251, 191, 36, 0.6)'
                           }`
                         }}>
                      <div className={`text-2xl font-black
                                      ${tech.color === 'cyan' ? 'text-cyan-400' :
                                        tech.color === 'fuchsia' ? 'text-fuchsia-400' :
                                        'text-yellow-400'}`}
                           style={{
                             fontFamily: 'Impact, sans-serif',
                             textShadow: `0 0 10px ${
                               tech.color === 'cyan' ? 'rgba(34, 211, 238, 0.8)' :
                               tech.color === 'fuchsia' ? 'rgba(217, 70, 239, 0.8)' :
                               'rgba(251, 191, 36, 0.8)'
                             }`
                           }}>
                        {tech.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Continue Screen */}
      <section id="contact" className="relative py-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-2xl border-4 border-fuchsia-500 overflow-hidden"
               style={{
                 boxShadow: '0 0 40px rgba(217, 70, 239, 0.6)'
               }}>
            
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, fuchsia 2px, fuchsia 4px)',
                 }} />

            <div className="relative z-10 p-16 text-center">
              <div className="mb-8">
                <div className="text-6xl font-black mb-6 animate-pulse"
                     style={{
                       fontFamily: 'Impact, sans-serif',
                       background: 'linear-gradient(180deg, #ff00ff 0%, #00ffff 100%)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                       textShadow: '0 0 30px rgba(255, 0, 255, 0.8)'
                     }}>
                  GAME OVER?
                </div>
                <div className="text-3xl font-black text-yellow-400 mb-8"
                     style={{
                       fontFamily: 'Impact, sans-serif',
                       textShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                     }}>
                  INSERT COIN TO CONTINUE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: "📧", label: "EMAIL", subtitle: "LEVEL 1", href: "mailto:your.email@example.com", color: "cyan" },
                  { icon: "💼", label: "LINKEDIN", subtitle: "LEVEL 2", href: "https://linkedin.com", color: "fuchsia" },
                  { icon: "💻", label: "GITHUB", subtitle: "LEVEL 3", href: "https://github.com", color: "yellow" }
                ].map((contact) => (
                  <a key={contact.label}
                     href={contact.href}
                     target={contact.href.startsWith('http') ? '_blank' : undefined}
                     rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                     className={`group bg-black border-4 rounded-xl p-8 
                                transform hover:scale-110 transition-all cursor-pointer
                                ${contact.color === 'cyan' ? 'border-cyan-500' :
                                  contact.color === 'fuchsia' ? 'border-fuchsia-500' :
                                  'border-yellow-400'}`}
                     style={{
                       boxShadow: `0 0 20px ${
                         contact.color === 'cyan' ? 'rgba(34, 211, 238, 0.6)' :
                         contact.color === 'fuchsia' ? 'rgba(217, 70, 239, 0.6)' :
                         'rgba(251, 191, 36, 0.6)'
                       }`
                     }}>
                    <div className="text-5xl mb-4">{contact.icon}</div>
                    <div className={`text-2xl font-black mb-2
                                    ${contact.color === 'cyan' ? 'text-cyan-400' :
                                      contact.color === 'fuchsia' ? 'text-fuchsia-400' :
                                      'text-yellow-400'}`}
                         style={{
                           fontFamily: 'Impact, sans-serif',
                           textShadow: `0 0 10px ${
                             contact.color === 'cyan' ? 'rgba(34, 211, 238, 0.8)' :
                             contact.color === 'fuchsia' ? 'rgba(217, 70, 239, 0.8)' :
                             'rgba(251, 191, 36, 0.8)'
                           }`
                         }}>
                      {contact.label}
                    </div>
                    <div className="text-sm text-white font-bold"
                         style={{ fontFamily: 'monospace' }}>
                      {contact.subtitle}
                    </div>
                  </a>
                ))}
              </div>

              <div className="text-cyan-400 font-bold animate-pulse"
                   style={{
                     fontFamily: 'monospace',
                     textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                   }}>
                PRESS START
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t-4 border-cyan-500 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-cyan-400 font-bold"
             style={{
               fontFamily: 'monospace',
               textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
             }}>
            © 2025 CONNOR CRIST • HIGH SCORE: 999999 • CREDITS: {credits}
          </p>
        </div>
      </footer>

      {/* Player 2 Chatbot */}
      <Chatbot />
    </main>
      )}
    </>
  );
}
