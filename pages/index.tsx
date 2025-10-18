"use client";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import PlaygroundParticles from "../components/PlaygroundParticles";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroCanvas = dynamic(() => import("../components/HeroCanvas"), { ssr: false });

export default function Home() {
  const { scrollYProgress } = useScroll();

  // text fades + scales as you scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1f1a] via-[#0e3b2f] to-[#1a5944] text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-6 overflow-hidden"
      >
        <PlaygroundParticles />
        <HeroCanvas />

        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-emerald-100 z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Connor Crist</h1>
          <p className="text-lg md:text-xl text-emerald-200 max-w-2xl">
            Building intelligent, data-driven, and beautiful experiences.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="bg-[#0e3b2f]/60 backdrop-blur-md py-20 px-10 relative z-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10 max-w-6xl mx-auto">
          <ProjectCard
            title="Budget Tracker"
            description="A personal finance app for visualizing spending."
            link="#"
          />
          <ProjectCard
            title="Stock Data Manager"
            description="Historical data fetcher and analytics dashboard."
            link="#"
          />
          <ProjectCard
            title="Recipe Randomizer"
            description="Spotify-powered recipe and music randomizer."
            link="#"
          />
        </div>
      </section>
    </main>
  );
}
