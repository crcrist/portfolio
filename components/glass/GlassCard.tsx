"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'rose' | 'coral' | 'none';
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glow = 'none'
}: GlassCardProps) {
  const glowClass = {
    rose: 'hover:shadow-rose',
    coral: 'hover:shadow-coral',
    none: ''
  }[glow];

  return (
    <motion.div
      className={`
        bg-glass backdrop-blur-lg rounded-2xl border border-glass-border
        shadow-glass
        ${hover ? 'hover:bg-glass-medium hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300' : ''}
        ${glowClass}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
