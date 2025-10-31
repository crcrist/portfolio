"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";
import GlassCard from "../glass/GlassCard";
import GlassButton from "../glass/GlassButton";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "connor@example.com",
    href: "mailto:connor@example.com",
    color: "rose"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/connorcrist",
    href: "https://linkedin.com/in/connorcrist",
    color: "coral"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@connorcrist",
    href: "https://github.com/connorcrist",
    color: "rose"
  },
  {
    icon: Calendar,
    label: "Schedule",
    value: "Book a call",
    href: "#",
    color: "coral"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 mb-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-rose-coral bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-rose-coral mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out!
          </p>
        </motion.div>

        <GlassCard className="p-8 md:p-12" glow="coral">
          {/* Contact Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-4 p-6 bg-glass-light rounded-xl border border-glass-border
                             hover:bg-glass-medium hover:border-rose transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="p-3 rounded-lg bg-rose/10 border border-rose/30
                                  group-hover:bg-rose/20 transition-colors">
                    <Icon className="w-6 h-6 text-rose" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{contact.label}</h4>
                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center pt-8 border-t border-glass-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-white/70 mb-6">
              Available for freelance projects and full-time opportunities
            </p>
            <GlassButton
              variant="primary"
              size="lg"
              href="mailto:connor@example.com"
            >
              Start a Conversation
            </GlassButton>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
