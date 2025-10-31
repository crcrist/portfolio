"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type NavbarProps = {
  credits: number;
};

export default function Navbar({ credits }: NavbarProps) {
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-sm border-b-4 border-cyan-500 shadow-xl"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        boxShadow: '0 4px 30px rgba(34, 211, 238, 0.6)'
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-cyan-600 rounded-lg 
                            flex items-center justify-center font-black text-2xl border-4 border-yellow-400
                            transform group-hover:scale-110 transition-transform"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                 }}>
              CC
            </div>
            <span className="text-2xl font-black text-yellow-400 hidden md:inline"
                  style={{
                    fontFamily: 'Impact, sans-serif',
                    textShadow: '0 0 15px rgba(251, 191, 36, 0.8)'
                  }}>
              PORTFOLIO ARCADE
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {["projects", "about", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`capitalize transition-all duration-200 px-4 py-2 rounded-lg 
                           font-black text-sm border-4 transform hover:scale-105
                           ${activeSection === id
                  ? "bg-gradient-to-r from-fuchsia-600 to-cyan-600 border-yellow-400 text-white"
                  : "bg-black border-cyan-500 text-cyan-400 hover:border-fuchsia-500"
                }`}
                style={{
                  fontFamily: 'Impact, sans-serif',
                  textShadow: activeSection === id ? '0 0 10px rgba(255, 255, 255, 0.8)' : '0 0 10px rgba(34, 211, 238, 0.6)',
                  boxShadow: activeSection === id ? '0 0 20px rgba(251, 191, 36, 0.6)' : 'none'
                }}
              >
                {id}
              </a>
            ))}

            {/* Credits display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-black border-4 border-yellow-400 rounded-lg"
                 style={{
                   boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                 }}>
              <div className="text-yellow-400 font-black text-sm"
                   style={{
                     fontFamily: 'Impact, sans-serif',
                     textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                   }}>
                CREDITS:
              </div>
              <div className="text-white font-black text-xl"
                   style={{
                     fontFamily: 'Impact, sans-serif',
                     textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                   }}>
                {credits}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
