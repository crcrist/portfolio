"use client";
import { useAchievements } from "./arcade/AchievementSystem";

type ProjectCardProps = {
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  players: string;
  genre: string;
};

export default function ProjectCard({ title, subtitle, description, difficulty, players, genre }: ProjectCardProps) {
  const { manager } = useAchievements();

  const handleHover = () => {
    manager.trackProjectView(title.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <div onMouseEnter={handleHover}
         className="group relative bg-black rounded-xl border-4 border-cyan-500 overflow-hidden
                    transform hover:scale-105 hover:border-fuchsia-500 transition-all duration-300 cursor-pointer"
         style={{
           boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)'
         }}>
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
           }} />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-transparent to-cyan-600/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-8">
        {/* Game Title Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-fuchsia-500 p-1 rounded-lg mb-6"
             style={{
               boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
             }}>
          <div className="bg-black p-4 rounded-lg">
            <h3 className="text-3xl font-black text-center mb-2"
                style={{
                  fontFamily: 'Impact, sans-serif',
                  background: 'linear-gradient(180deg, #ffff00 0%, #ff00ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(255, 255, 0, 0.6)'
                }}>
              {title}
            </h3>
            <p className="text-center text-cyan-400 font-bold text-sm"
               style={{
                 fontFamily: 'monospace',
                 textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
               }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white leading-relaxed mb-6 text-sm"
           style={{ fontFamily: 'monospace' }}>
          {description}
        </p>

        {/* Game Info */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-purple-950/50 border-2 border-fuchsia-500 rounded-lg p-3 text-center"
               style={{
                 boxShadow: '0 0 15px rgba(217, 70, 239, 0.4)'
               }}>
            <div className="text-xs text-fuchsia-400 font-bold mb-1"
                 style={{ fontFamily: 'monospace' }}>
              DIFFICULTY
            </div>
            <div className="text-yellow-400 font-black"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                 }}>
              {difficulty}
            </div>
          </div>

          <div className="bg-purple-950/50 border-2 border-cyan-500 rounded-lg p-3 text-center"
               style={{
                 boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
               }}>
            <div className="text-xs text-cyan-400 font-bold mb-1"
                 style={{ fontFamily: 'monospace' }}>
              PLAYERS
            </div>
            <div className="text-white font-black"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                 }}>
              {players}
            </div>
          </div>

          <div className="bg-purple-950/50 border-2 border-yellow-400 rounded-lg p-3 text-center"
               style={{
                 boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)'
               }}>
            <div className="text-xs text-yellow-400 font-bold mb-1"
                 style={{ fontFamily: 'monospace' }}>
              GENRE
            </div>
            <div className="text-white font-black text-xs"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                 }}>
              {genre}
            </div>
          </div>
        </div>

        {/* Action button */}
        <button className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-fuchsia-500 
                          text-black font-black text-xl py-4 rounded-lg border-4 border-yellow-300
                          hover:scale-105 active:scale-95 transition-transform"
                style={{
                  fontFamily: 'Impact, sans-serif',
                  boxShadow: '0 0 25px rgba(251, 191, 36, 0.8)'
                }}>
          [START GAME]
        </button>

        {/* Flashing "INSERT COIN" indicator */}
        <div className="text-center mt-4">
          <span className="text-yellow-400 text-sm font-bold animate-pulse"
                style={{
                  fontFamily: 'monospace',
                  textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                }}>
            ▶ PRESS TO PLAY ◀
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-yellow-400" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-yellow-400" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-yellow-400" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-yellow-400" />
    </div>
  );
}
