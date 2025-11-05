"use client";
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import GlassButton from "./GlassButton";

interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  githubRepo?: string;
  imageUrl?: string;
  delay?: number;
}

function ProjectCard({
  title,
  description,
  tags,
  demoUrl,
  githubUrl,
  githubRepo,
  imageUrl,
  delay = 0
}: ProjectCardProps) {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Fetch GitHub stats if githubRepo is provided
  useEffect(() => {
    if (!githubRepo) return;

    const fetchStats = async () => {
      setIsLoadingStats(true);
      try {
        const response = await fetch(`/api/github/repo?repo=${encodeURIComponent(githubRepo)}`);
        if (response.ok) {
          const data = await response.json();
          setGithubStats({
            stars: data.stars,
            forks: data.forks,
            language: data.language,
          });
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, [githubRepo]);

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
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* GitHub Stats */}
        {githubStats && (
          <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{githubStats.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{githubStats.forks}</span>
            </div>
            {githubStats.language && (
              <div className="px-2 py-0.5 bg-glass-light rounded-full text-xs">
                {githubStats.language}
              </div>
            )}
          </div>
        )}

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
