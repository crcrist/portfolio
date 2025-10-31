"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
}

function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = ""
}: GlassButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl";

  const variantStyles = {
    primary: "bg-gradient-rose-coral text-white hover:shadow-rose hover:scale-105",
    secondary: "bg-glass-medium backdrop-blur-md border border-glass-border text-rose hover:bg-glass-strong hover:shadow-rose",
    ghost: "bg-transparent border-2 border-rose text-rose hover:bg-glass-light hover:shadow-rose"
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default memo(GlassButton);
