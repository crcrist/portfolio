"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import GlassButton from "./GlassButton";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  delay?: number;
}

function ProjectCard({
  title,
  description,
  tags,
  demoUrl,
  githubUrl,
  imageUrl,
  delay = 0
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-glass backdrop-blur-lg rounded-2xl border border-glass-border
                 shadow-glass overflow-hidden hover:bg-glass-medium hover:shadow-rose
                 hover:-translate-y-2 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Project Image/Preview */}
      <div className="relative h-48 bg-gradient-to-br from-rose/10 to-coral/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-50">🚀</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-rose-coral opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-rose transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/70 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-glass-light rounded-full
                         border border-glass-border text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {demoUrl && (
            <GlassButton
              variant="secondary"
              size="sm"
              href={demoUrl}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </GlassButton>
          )}
          {githubUrl && (
            <GlassButton
              variant="ghost"
              size="sm"
              href={githubUrl}
              className="flex-1"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </GlassButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);
