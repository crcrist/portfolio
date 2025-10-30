"use client";
import { useEffect, useState } from "react";

export default function ServerRackHero() {
  const [time, setTime] = useState(new Date());
  const [cpuLoad, setCpuLoad] = useState(0);
  const [memLoad, setMemLoad] = useState(0);
  const [netLoad, setNetLoad] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 30) + 45);
      setMemLoad(Math.floor(Math.random() * 20) + 60);
      setNetLoad(Math.floor(Math.random() * 40) + 30);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto perspective-1000">
      {/* Main Server Rack */}
      <div className="relative">
        {/* Rack Frame */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl p-8 
                        border-4 border-slate-600 shadow-2xl"
             style={{
               boxShadow: `
                 inset 0 2px 0 rgba(255,255,255,0.1),
                 inset 0 -2px 0 rgba(0,0,0,0.5),
                 0 30px 60px rgba(0,0,0,0.5)
               `
             }}>
          
          {/* Metal texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] rounded-3xl pointer-events-none"
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
               }} />

          {/* Side vent holes */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-3 h-1 bg-slate-900 rounded-full opacity-50" />
            ))}
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-3 h-1 bg-slate-900 rounded-full opacity-50" />
            ))}
          </div>

          <div className="relative space-y-4">
            {/* Top Display Panel - Main Info */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700"
                 style={{
                   boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)'
                 }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-5xl font-bold text-slate-100 mb-2"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Connor Crist
                  </h1>
                  <p className="text-xl text-emerald-400 font-mono">
                    Full-Stack Developer & Systems Engineer
                  </p>
                </div>
                
                {/* Status LEDs */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse" />
                    <span className="text-xs text-slate-400 font-mono">PWR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)] animate-pulse"
                         style={{ animationDelay: '0.5s' }} />
                    <span className="text-xs text-slate-400 font-mono">NET</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                    <span className="text-xs text-slate-400 font-mono">ACT</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed mb-4">
                Building robust infrastructure and scalable applications. Specializing in full-stack 
                development, DevOps, and homelab automation.
              </p>

              {/* System Time */}
              <div className="flex items-center gap-4 text-emerald-400 font-mono text-sm">
                <span>SYS_TIME:</span>
                <span className="text-slate-300">
                  {time.toLocaleTimeString('en-US', { hour12: false })}
                </span>
              </div>
            </div>

            {/* Server Metrics Panel */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700"
                 style={{
                   boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)'
                 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  System Metrics
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* CPU Load */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                     style={{
                       boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)'
                     }}>
                  <div className="text-xs text-slate-400 font-mono mb-2">CPU</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mb-2">{cpuLoad}%</div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full
                                 shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all duration-500"
                      style={{ width: `${cpuLoad}%` }}
                    />
                  </div>
                </div>

                {/* Memory Load */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                     style={{
                       boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)'
                     }}>
                  <div className="text-xs text-slate-400 font-mono mb-2">MEM</div>
                  <div className="text-2xl font-bold text-blue-400 font-mono mb-2">{memLoad}%</div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full
                                 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-500"
                      style={{ width: `${memLoad}%` }}
                    />
                  </div>
                </div>

                {/* Network Load */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                     style={{
                       boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)'
                     }}>
                  <div className="text-xs text-slate-400 font-mono mb-2">NET</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono mb-2">{netLoad}%</div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full
                                 shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500"
                      style={{ width: `${netLoad}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Network Ports Panel */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700"
                 style={{
                   boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)'
                 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Network Interfaces
                </span>
              </div>

              <div className="grid grid-cols-8 gap-2">
                {[
                  { active: true, speed: '1G' },
                  { active: true, speed: '1G' },
                  { active: false, speed: '1G' },
                  { active: true, speed: '1G' },
                  { active: false, speed: '10G' },
                  { active: true, speed: '10G' },
                  { active: false, speed: '1G' },
                  { active: false, speed: '1G' },
                ].map((port, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex flex-col items-center gap-2"
                       style={{
                         boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)'
                       }}>
                    <div className={`w-3 h-3 rounded-sm ${
                      port.active 
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' 
                        : 'bg-slate-700'
                    }`} />
                    <span className="text-[10px] text-slate-500 font-mono">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <a
                href="#projects"
                className="flex-1 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600
                           text-white font-bold py-4 px-6 rounded-xl transition-all duration-200
                           border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5
                           shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.2),
                    0 4px 6px rgba(0,0,0,0.3)
                  `
                }}>
                View Projects
              </a>
              
              <a
                href="#contact"
                className="flex-1 bg-gradient-to-b from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600
                           text-white font-bold py-4 px-6 rounded-xl transition-all duration-200
                           border-b-4 border-slate-800 hover:border-slate-900 active:border-b-2 active:translate-y-0.5
                           shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.2),
                    0 4px 6px rgba(0,0,0,0.3)
                  `
                }}>
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Rack mounting holes */}
        <div className="absolute -left-6 top-1/4 space-y-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700"
                 style={{
                   boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                 }} />
          ))}
        </div>
        <div className="absolute -right-6 top-1/4 space-y-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700"
                 style={{
                   boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
