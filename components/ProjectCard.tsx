type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  screenColor: "green" | "amber";
};

export default function ProjectCard({ title, description, link, screenColor }: ProjectCardProps) {
  const glowColor = screenColor === 'green' 
    ? 'rgba(52, 211, 153, 0.8)' 
    : 'rgba(251, 191, 36, 0.8)';

  return (
    <div className={`group relative rounded-xl border-2 p-6 transition-all duration-300
                    hover:scale-[1.02] cursor-pointer
                    ${screenColor === 'green'
                      ? 'bg-emerald-950/30 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/50'
                      : 'bg-amber-950/30 border-amber-500/30 hover:border-amber-500 hover:bg-amber-950/50'}`}
         style={{
           boxShadow: `0 0 20px ${glowColor.replace('0.8', '0.2')}`
         }}>
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 rounded-xl"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
           }} />

      <div className="relative z-10">
        {/* Title with status indicator */}
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-xl font-bold font-mono flex-1
                         ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
              style={{
                textShadow: `0 0 10px ${glowColor}`
              }}>
            &gt; {title}
          </h3>
          
          {/* Running indicator */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded border
                          ${screenColor === 'green'
                            ? 'bg-emerald-950/50 border-emerald-500/50'
                            : 'bg-amber-950/50 border-amber-500/50'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse
                            ${screenColor === 'green' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                 style={{
                   boxShadow: `0 0 8px ${glowColor}`
                 }} />
            <span className={`text-xs font-mono
                             ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                  style={{
                    textShadow: `0 0 5px ${glowColor}`
                  }}>
              RUN
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`font-mono text-sm leading-relaxed mb-6
                      ${screenColor === 'green' ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
          {description}
        </p>

        {/* Action link */}
        <a 
          href={link} 
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 
                     font-mono font-bold text-sm transition-all duration-200
                     group-hover:translate-x-1
                     ${screenColor === 'green'
                       ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black'
                       : 'border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black'}`}
          style={{
            boxShadow: `0 0 15px ${glowColor.replace('0.8', '0.3')}`,
            textShadow: `0 0 10px ${glowColor}`
          }}
        >
          [EXECUTE]
          <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
        </a>

        {/* File info footer */}
        <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono
                        ${screenColor === 'green'
                          ? 'border-emerald-500/20 text-emerald-400/50'
                          : 'border-amber-500/20 text-amber-400/50'}`}>
          <span>TYPE: APPLICATION</span>
          <span>SIZE: 2.4MB</span>
          <span>STATUS: ACTIVE</span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{
             boxShadow: `inset 0 0 30px ${glowColor.replace('0.8', '0.2')}, 0 0 40px ${glowColor.replace('0.8', '0.2')}`
           }} />
    </div>
  );
}
