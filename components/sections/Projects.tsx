"use client";
import { motion } from "framer-motion";
import ProjectCard from "../glass/ProjectCard";

const projects = [
  {
    title: "CustomGPT Actions Test",
    description: "Testing with API deployed through Google Cloud Run + Google Auth using JavaScript and hitting from CustomGPT actions.",
    tags: ["JavaScript", "Google Cloud Run", "Google Auth", "CustomGPT"],
    githubUrl: "https://github.com/crcrist/customgpt-actions-test",
    githubRepo: "crcrist/customgpt-actions-test",
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
