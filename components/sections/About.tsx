"use client";
import { motion } from "framer-motion";
import GlassCard from "../glass/GlassCard";
import SkillPill from "../glass/SkillPill";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Three.js", icon: "🎨" },
  { name: "TailwindCSS", icon: "💨" },
  { name: "Git", icon: "🔧" },
  { name: "Linux", icon: "🐧" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-rose-coral bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-rose-coral mx-auto rounded-full" />
        </motion.div>

        <GlassCard className="p-8 md:p-12" glow="rose">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image Placeholder */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-64 h-64 mx-auto">
                {/* Glass frame */}
                <div className="absolute inset-0 rounded-full bg-gradient-rose-coral p-1">
                  <div className="w-full h-full rounded-full bg-background-light flex items-center justify-center overflow-hidden">
                    {/* Placeholder - replace with actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-rose/20 to-coral/20 flex items-center justify-center">
                      <span className="text-6xl">👨‍💻</span>
                    </div>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-rose-coral opacity-20 blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-6">
                Full-Stack Developer & Infrastructure Specialist
              </h3>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with a love for building elegant,
                  scalable web applications. My expertise spans modern frontend frameworks,
                  robust backend systems, and cloud infrastructure.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open source, or experimenting with homelab setups.
                  I believe in writing clean, maintainable code and creating delightful user experiences.
                </p>
                <p>
                  Currently focused on React ecosystems, TypeScript, and building performant,
                  accessible web applications that make a difference.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            className="mt-12 pt-12 border-t border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-display font-semibold text-white mb-6 text-center">
              Technologies & Tools
            </h4>

            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <SkillPill
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
