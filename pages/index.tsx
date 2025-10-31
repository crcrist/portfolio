"use client";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";
import GlassChatbot from "../components/glass/GlassChatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background-light to-background-lighter text-white relative overflow-x-hidden">
      {/* Background lava lamp orbs - organic multi-directional movement */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-crimson/8 rounded-full blur-3xl animate-lava-lamp-1" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-ruby/6 rounded-full blur-3xl animate-lava-lamp-2" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-crimson-dark/7 rounded-full blur-3xl animate-lava-lamp-3" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-ruby-light/5 rounded-full blur-3xl animate-lava-lamp-4" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Chatbot */}
      <GlassChatbot />
    </div>
  );
}
