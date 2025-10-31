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
        // Rose Coral palette (from PRD)
        rose: {
          light: '#e17c6b',
          DEFAULT: '#e17c6b', // Primary rose coral
          dark: '#d4615e', // Deeper coral
        },
        coral: {
          light: '#e17c6b',
          DEFAULT: '#e17c6b',
          dark: '#d4615e',
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
        'gradient-rose': 'linear-gradient(135deg, #e17c6b 0%, #d4615e 100%)',
        'gradient-coral': 'linear-gradient(135deg, #e17c6b 0%, #d4615e 100%)',
        'gradient-rose-coral': 'linear-gradient(135deg, #e17c6b 0%, #d4615e 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
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
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 40px rgba(225, 124, 107, 0.25)',
        'rose': '0 0 40px rgba(225, 124, 107, 0.3)',
        'coral': '0 0 40px rgba(225, 124, 107, 0.25)',
      },
    },
  },
  plugins: [],
};
