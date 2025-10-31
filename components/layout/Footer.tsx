"use client";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 px-6 border-t border-glass-border bg-glass-light/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-white/60 text-sm">
            © {currentYear} Connor Crist. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="flex items-center gap-2 text-white/60 text-sm">
            Made with
            <Heart className="w-4 h-4 text-rose fill-rose animate-pulse-slow" />
            using Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
