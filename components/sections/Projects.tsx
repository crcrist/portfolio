"use client";
import { motion } from "framer-motion";
import ProjectCard from "../glass/ProjectCard";

const projects = [
  {
    title: "Budget Blaster",
    description: "Full-stack financial management app with real-time expense tracking, budget goals, and insightful analytics. Built with React, Node.js, and PostgreSQL.",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Stock Invaders",
    description: "Market data analytics platform with real-time stock monitoring, predictive algorithms, and portfolio management. Features WebSocket integration for live updates.",
    tags: ["Next.js", "Python", "WebSocket", "TensorFlow"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Recipe Quest",
    description: "Interactive recipe discovery app with random recipe generation, Spotify integration for cooking playlists, and meal planning features.",
    tags: ["React", "Spotify API", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Homelab Hero",
    description: "Infrastructure management dashboard for monitoring server resources, automating tasks, and maintaining 100% uptime. Built with Docker and Kubernetes.",
    tags: ["Docker", "Kubernetes", "Grafana", "Prometheus"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio v2",
    description: "This portfolio! Built with Next.js 15, Three.js for 3D graphics, and glassmorphism design. Features a morphing blob and smooth animations.",
    tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
    githubUrl: "#",
  },
  {
    title: "RAG Chatbot",
    description: "AI-powered chatbot using Retrieval-Augmented Generation with Google Cloud Vertex AI. Provides context-aware responses about portfolio projects.",
    tags: ["Next.js", "Vertex AI", "RAG", "GCP"],
    demoUrl: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-rose-coral bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-rose-coral mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A collection of my recent work, showcasing full-stack development,
            infrastructure management, and creative problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
