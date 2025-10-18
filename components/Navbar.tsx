"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#0a1f1a]/70 shadow-lg shadow-emerald-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-emerald-200 text-lg font-semibold hover:text-emerald-100 transition">
          Connor Crist
        </Link>
        <div className="flex space-x-8 text-sm font-medium">
          {["projects", "about", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`capitalize transition ${
                activeSection === id
                  ? "text-emerald-100 border-b border-emerald-400 pb-1"
                  : "text-emerald-300 hover:text-emerald-100"
              }`}
            >
              {id}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
