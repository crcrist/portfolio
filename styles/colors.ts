/**
 * Rose & Coral Color System
 * Elegant, warm, sophisticated palette
 */

export const colors = {
  // Background - Deep navy with subtle warmth
  background: {
    base: '#0a0e27',
    start: '#0a0e27',
    mid: '#1a1d3a',
    end: '#2a2550',
  },

  // Rose & Coral Accents
  accent: {
    rose: {
      light: '#ffb3d9',    // Soft rose
      DEFAULT: '#ff6ba9',   // Vibrant rose
      dark: '#d94484',      // Deep rose
    },
    coral: {
      light: '#ffa895',     // Soft coral
      DEFAULT: '#ff7657',   // Vibrant coral
      dark: '#e55a3c',      // Deep coral
    },
  },

  // Glass surfaces
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    DEFAULT: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.18)',
    border: 'rgba(255, 255, 255, 0.15)',
  },

  // Text colors
  text: {
    primary: '#f0f2f5',
    secondary: '#b8bcc8',
    muted: '#8a8f9e',
    accent: '#ff6ba9',
  },

  // Gradients
  gradient: {
    rose: 'linear-gradient(135deg, #ff6ba9 0%, #d94484 100%)',
    coral: 'linear-gradient(135deg, #ff7657 0%, #e55a3c 100%)',
    roseCoral: 'linear-gradient(135deg, #ff6ba9 0%, #ff7657 100%)',
    subtle: 'linear-gradient(180deg, rgba(255, 107, 169, 0.1) 0%, rgba(255, 118, 87, 0.1) 100%)',
  },

  // Glow effects
  glow: {
    rose: 'rgba(255, 107, 169, 0.3)',
    coral: 'rgba(255, 118, 87, 0.25)',
    soft: 'rgba(255, 107, 169, 0.15)',
  },
} as const;

export type Colors = typeof colors;
