"use client";
import { motion } from "framer-motion";
import GlassButton from "../glass/GlassButton";
import dynamic from "next/dynamic";

// Dynamically import 3D scene to avoid SSR issues
const Scene = dynamic(() => import("../3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse-slow text-rose/50">Loading...</div>
    </div>
  ),
});

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <Scene />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Greeting */}
          <motion.p
            className="text-coral text-lg md:text-xl font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 bg-gradient-rose-coral bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Connor Crist
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Full-Stack Developer & Creative Technologist
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Crafting elegant digital experiences with modern web technologies.
            Passionate about clean code, innovative solutions, and beautiful design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <GlassButton
              variant="primary"
              size="lg"
              onClick={scrollToProjects}
            >
              View My Work
            </GlassButton>
            <GlassButton
              variant="ghost"
              size="lg"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </GlassButton>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
