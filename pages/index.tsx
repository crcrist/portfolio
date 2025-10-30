"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CRTMonitor from "../components/CRTMonitor";
import ProjectCard from "../components/ProjectCard";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const [powerOn, setPowerOn] = useState(true);
  const [screenColor, setScreenColor] = useState<"green" | "amber">("green");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white relative overflow-x-hidden">
      <Navbar screenColor={screenColor} setScreenColor={setScreenColor} />
      
      {/* Ambient room lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                        ${screenColor === 'green' ? 'bg-emerald-500/20' : 'bg-amber-500/20'} 
                        rounded-full blur-[150px] transition-colors duration-1000`} />
      </div>

      {/* Hero Section - CRT Monitor */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
        <CRTMonitor powerOn={powerOn} setPowerOn={setPowerOn} screenColor={screenColor} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Retro terminal header */}
          <div className="mb-16">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 mb-6
                            ${screenColor === 'green' 
                              ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400' 
                              : 'bg-amber-950/50 border-amber-500/30 text-amber-400'}`}
                 style={{
                   boxShadow: `0 0 20px ${screenColor === 'green' ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}`,
                   textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                 }}>
              <span className="font-mono text-sm animate-pulse">▸</span>
              <span className="font-mono text-sm uppercase tracking-wider">
                ls /projects
              </span>
            </div>
            
            <h2 className={`text-5xl font-bold mb-4 font-mono
                           ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                style={{
                  textShadow: `0 0 20px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                }}>
              PROJECT_PORTFOLIO.exe
            </h2>
            <p className={`font-mono ${screenColor === 'green' ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
              &gt; Displaying active programs and applications...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectCard
              title="BUDGET_TRACKER.app"
              description="Financial management system with real-time data processing and visualization dashboards."
              link="#"
              screenColor={screenColor}
            />
            <ProjectCard
              title="STOCK_MANAGER.exe"
              description="High-performance analytics platform for market data aggregation and predictive modeling."
              link="#"
              screenColor={screenColor}
            />
            <ProjectCard
              title="RECIPE_RANDOM.app"
              description="Content recommendation engine integrating culinary databases with Spotify API integration."
              link="#"
              screenColor={screenColor}
            />
            <ProjectCard
              title="HOMELAB_DASH.sys"
              description="Comprehensive monitoring suite for server infrastructure and resource utilization tracking."
              link="#"
              screenColor={screenColor}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`rounded-2xl p-12 border-2 relative overflow-hidden
                          ${screenColor === 'green' 
                            ? 'bg-emerald-950/30 border-emerald-500/30' 
                            : 'bg-amber-950/30 border-amber-500/30'}`}
               style={{
                 boxShadow: `0 0 40px ${screenColor === 'green' ? 'rgba(52,211,153,0.2)' : 'rgba(251,191,36,0.2)'}`
               }}>
            
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
                 }} />

            <div className="relative z-10">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 mb-8
                              ${screenColor === 'green' 
                                ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400' 
                                : 'bg-amber-950/50 border-amber-500/30 text-amber-400'}`}
                   style={{
                     boxShadow: `0 0 20px ${screenColor === 'green' ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}`,
                     textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                   }}>
                <span className="font-mono text-sm animate-pulse">▸</span>
                <span className="font-mono text-sm uppercase tracking-wider">
                  cat /about.txt
                </span>
              </div>

              <h2 className={`text-4xl font-bold mb-6 font-mono
                             ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                  style={{
                    textShadow: `0 0 20px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                  }}>
                SYSTEM_ADMINISTRATOR.profile
              </h2>

              <div className={`space-y-4 leading-relaxed mb-10 font-mono
                              ${screenColor === 'green' ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
                <p>&gt; Full-stack developer and infrastructure enthusiast</p>
                <p>&gt; Specializing in automation, scalability, and performance</p>
                <p>&gt; Passionate about homelab experiments and container orchestration</p>
                <p>&gt; Building efficient workflows between development and operations</p>
              </div>

              {/* Tech stack with retro styling */}
              <div className={`rounded-xl p-6 border-2
                              ${screenColor === 'green' 
                                ? 'bg-black/50 border-emerald-500/20' 
                                : 'bg-black/50 border-amber-500/20'}`}>
                <h3 className={`font-mono uppercase tracking-wider mb-6 flex items-center gap-2
                               ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                    style={{
                      textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                    }}>
                  <span className="animate-pulse">▸</span>
                  TECH_STACK.sys
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "React", "Next.js", "TypeScript", "Node.js",
                    "Python", "Docker", "Linux", "PostgreSQL"
                  ].map((tech, i) => (
                    <div key={tech} 
                         className={`group px-4 py-3 rounded-lg border-2 font-mono text-sm font-bold
                                    transition-all duration-300 cursor-pointer
                                    ${screenColor === 'green'
                                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/50 hover:border-emerald-500/50'
                                      : 'bg-amber-950/30 border-amber-500/30 text-amber-400 hover:bg-amber-950/50 hover:border-amber-500/50'}`}
                         style={{
                           textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.6)' : 'rgba(251,191,36,0.6)'}`,
                           animationDelay: `${i * 0.1}s`
                         }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-2xl overflow-hidden border-2
                          ${screenColor === 'green' 
                            ? 'bg-emerald-950/30 border-emerald-500/30' 
                            : 'bg-amber-950/30 border-amber-500/30'}`}
               style={{
                 boxShadow: `0 0 40px ${screenColor === 'green' ? 'rgba(52,211,153,0.2)' : 'rgba(251,191,36,0.2)'}`
               }}>
            
            {/* Terminal header */}
            <div className={`px-6 py-4 border-b-2 flex items-center justify-between
                            ${screenColor === 'green' 
                              ? 'bg-emerald-950/50 border-emerald-500/30' 
                              : 'bg-amber-950/50 border-amber-500/30'}`}>
              <span className={`font-mono text-sm
                               ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                    style={{
                      textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                    }}>
                C:\CONTACT&gt;_
              </span>
              <div className="flex gap-2">
                <div className={`w-3 h-3 rounded-full animate-pulse
                                ${screenColor === 'green' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                     style={{
                       boxShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.8)' : 'rgba(251,191,36,0.8)'}`
                     }} />
              </div>
            </div>

            <div className="p-10 font-mono text-sm">
              <div className={`space-y-2 mb-8
                              ${screenColor === 'green' ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
                <p>&gt; SYSTEM: Connection interface initialized</p>
                <p>&gt; STATUS: Ready to receive transmission</p>
                <p>&gt; Select communication protocol:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: "📧", label: "EMAIL.exe", href: "mailto:your.email@example.com" },
                  { icon: "💼", label: "LINKEDIN.lnk", href: "https://linkedin.com" },
                  { icon: "💻", label: "GITHUB.git", href: "https://github.com" }
                ].map((contact) => (
                  <a key={contact.label}
                     href={contact.href}
                     target={contact.href.startsWith('http') ? '_blank' : undefined}
                     rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                     className={`group px-6 py-8 rounded-lg border-2 text-center
                                transition-all duration-300 cursor-pointer
                                ${screenColor === 'green'
                                  ? 'bg-emerald-950/30 border-emerald-500/30 hover:bg-emerald-950/50 hover:border-emerald-500/50'
                                  : 'bg-amber-950/30 border-amber-500/30 hover:bg-amber-950/50 hover:border-amber-500/50'}`}
                     style={{
                       boxShadow: `0 0 20px ${screenColor === 'green' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)'}`
                     }}>
                    <div className="text-4xl mb-3">{contact.icon}</div>
                    <div className={`font-bold
                                    ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                         style={{
                           textShadow: `0 0 10px ${screenColor === 'green' ? 'rgba(52,211,153,0.6)' : 'rgba(251,191,36,0.6)'}`
                         }}>
                      {contact.label}
                    </div>
                  </a>
                ))}
              </div>

              <div className={`mt-8 flex items-center gap-2
                              ${screenColor === 'green' ? 'text-emerald-400/60' : 'text-amber-400/60'}`}>
                <span>&gt;</span>
                <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative py-8 px-6 border-t-2
                         ${screenColor === 'green' 
                           ? 'border-emerald-500/30 bg-emerald-950/20' 
                           : 'border-amber-500/30 bg-amber-950/20'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`font-mono text-sm
                        ${screenColor === 'green' ? 'text-emerald-400/60' : 'text-amber-400/60'}`}>
            © 2025 Connor Crist | SYSTEM_STATUS: ONLINE | UPTIME: 99.9%
          </p>
        </div>
      </footer>

      {/* Retro Chatbot */}
      <Chatbot screenColor={screenColor} />
    </main>
  );
}
