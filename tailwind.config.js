/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Crimson/Ruby palette - darker, more dramatic red
        crimson: {
          light: '#c41e3a',   // Vibrant crimson
          DEFAULT: '#a0141e', // Deep crimson red
          dark: '#7a0c1a',    // Dark blood red
        },
        ruby: {
          light: '#d32f2f',   // Bright ruby
          DEFAULT: '#b71c1c', // Deep ruby
          dark: '#8b0000',    // Dark ruby
        },
        // Legacy aliases for backwards compatibility
        rose: {
          light: '#c41e3a',
          DEFAULT: '#a0141e',
          dark: '#7a0c1a',
        },
        coral: {
          light: '#d32f2f',
          DEFAULT: '#b71c1c',
          dark: '#8b0000',
        },
        // Glass surfaces
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.18)',
          border: 'rgba(255, 255, 255, 0.15)',
        },
        // Background (from PRD)
        background: {
          DEFAULT: '#0f0a0e',
          light: '#1a1014',
          lighter: '#2a1420',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-rose': 'linear-gradient(135deg, #c41e3a 0%, #7a0c1a 100%)',
        'gradient-coral': 'linear-gradient(135deg, #d32f2f 0%, #8b0000 100%)',
        'gradient-rose-coral': 'linear-gradient(135deg, #c41e3a 0%, #7a0c1a 100%)',
        'gradient-crimson': 'linear-gradient(135deg, #c41e3a 0%, #7a0c1a 100%)',
        'gradient-ruby': 'linear-gradient(135deg, #d32f2f 0%, #8b0000 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'lava-lamp-1': 'lava-lamp-1 18s ease-in-out infinite',
        'lava-lamp-2': 'lava-lamp-2 22s ease-in-out infinite',
        'lava-lamp-3': 'lava-lamp-3 20s ease-in-out infinite',
        'lava-lamp-4': 'lava-lamp-4 16s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'lava-lamp-1': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.8',
          },
          '25%': {
            transform: 'translate(100px, -80px) scale(1.1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translate(60px, -120px) scale(0.95)',
            opacity: '0.9',
          },
          '75%': {
            transform: 'translate(-40px, -60px) scale(1.05)',
            opacity: '0.7',
          },
        },
        'lava-lamp-2': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1) rotate(0deg)',
            opacity: '0.6',
          },
          '33%': {
            transform: 'translate(-120px, 80px) scale(1.15) rotate(120deg)',
            opacity: '0.8',
          },
          '66%': {
            transform: 'translate(-80px, -100px) scale(0.9) rotate(240deg)',
            opacity: '0.7',
          },
        },
        'lava-lamp-3': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.7',
          },
          '20%': {
            transform: 'translate(-80px, 60px) scale(1.08)',
            opacity: '0.85',
          },
          '40%': {
            transform: 'translate(40px, 100px) scale(0.92)',
            opacity: '0.65',
          },
          '60%': {
            transform: 'translate(100px, 40px) scale(1.12)',
            opacity: '0.75',
          },
          '80%': {
            transform: 'translate(20px, -40px) scale(0.98)',
            opacity: '0.8',
          },
        },
        'lava-lamp-4': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.5',
          },
          '30%': {
            transform: 'translate(90px, -70px) scale(1.1)',
            opacity: '0.7',
          },
          '70%': {
            transform: 'translate(-60px, 90px) scale(0.95)',
            opacity: '0.6',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 40px rgba(196, 30, 58, 0.3)',
        'rose': '0 0 40px rgba(196, 30, 58, 0.35)',
        'coral': '0 0 40px rgba(211, 47, 47, 0.3)',
        'crimson': '0 0 40px rgba(196, 30, 58, 0.35)',
        'ruby': '0 0 40px rgba(211, 47, 47, 0.3)',
      },
    },
  },
  plugins: [],
};
