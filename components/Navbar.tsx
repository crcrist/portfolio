"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type NavbarProps = {
  screenColor: "green" | "amber";
  setScreenColor: (color: "green" | "amber") => void;
};

export default function Navbar({ screenColor, setScreenColor }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "projects", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let id of sections) {
        const section = document.getElementById(id);
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glowColor = screenColor === 'green' 
    ? 'rgba(52, 211, 153, 0.8)' 
    : 'rgba(251, 191, 36, 0.8)';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `${screenColor === 'green' ? 'bg-emerald-950/90' : 'bg-amber-950/90'} backdrop-blur-sm border-b-2 ${screenColor === 'green' ? 'border-emerald-500/50' : 'border-amber-500/50'}`
          : "bg-transparent"
      }`}
      style={scrolled ? {
        boxShadow: `0 4px 20px ${glowColor}`
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center gap-3 group font-mono font-bold text-xl
                       ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
            style={{
              textShadow: `0 0 10px ${glowColor}`
            }}
          >
            <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center
                           transition-all duration-300
                           ${screenColor === 'green'
                             ? 'bg-emerald-950 border-emerald-500'
                             : 'bg-amber-950 border-amber-500'}`}
                 style={{
                   boxShadow: `0 0 15px ${glowColor}`
                 }}>
              CC
            </div>
            <span className="hidden md:inline">CONNOR.SYS</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {["projects", "about", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`capitalize transition-all duration-200 px-4 py-2 rounded-lg 
                           font-mono font-bold text-sm border-2
                           ${activeSection === id
                  ? `${screenColor === 'green'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-amber-500/20 border-amber-500 text-amber-400'}`
                  : `${screenColor === 'green'
                      ? 'border-emerald-500/30 text-emerald-400/70 hover:bg-emerald-500/10 hover:border-emerald-500'
                      : 'border-amber-500/30 text-amber-400/70 hover:bg-amber-500/10 hover:border-amber-500'}`
                }`}
                style={{
                  textShadow: activeSection === id ? `0 0 10px ${glowColor}` : 'none',
                  boxShadow: activeSection === id ? `0 0 15px ${glowColor}` : 'none'
                }}
              >
                {id}
              </a>
            ))}

            {/* Color Toggle Switch */}
            <button
              onClick={() => setScreenColor(screenColor === 'green' ? 'amber' : 'green')}
              className={`relative px-4 py-2 rounded-lg border-2 font-mono font-bold text-xs
                         transition-all duration-300 hover:scale-105
                         ${screenColor === 'green'
                           ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                           : 'bg-amber-950 border-amber-500 text-amber-400'}`}
              style={{
                boxShadow: `0 0 15px ${glowColor}`,
                textShadow: `0 0 10px ${glowColor}`
              }}
              title="Toggle screen color">
              {screenColor === 'green' ? 'GREEN' : 'AMBER'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
