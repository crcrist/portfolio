"use client";
import { memo } from "react";
import { motion } from "framer-motion";

interface SkillPillProps {
  name: string;
  icon?: string;
  delay?: number;
}

function SkillPill({ name, icon, delay = 0 }: SkillPillProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 bg-glass-light backdrop-blur-md
                 border border-glass-border rounded-full text-sm font-medium text-white
                 hover:bg-glass-medium hover:border-rose hover:shadow-rose transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{name}</span>
    </motion.div>
  );
}

export default memo(SkillPill);
