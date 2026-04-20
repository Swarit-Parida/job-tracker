/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0d0f1a',
          card: '#13162a',
          elevated: '#1a1e35',
          border: '#1f2440',
        },
        accent: {
          violet: '#7c6ff7',
          purple: '#9b6dfa',
          pink: '#f06292',
          cyan: '#22d3ee',
          green: '#4ade80',
          amber: '#fbbf24',
          red: '#f87171',
        },
        text: {
          primary: '#e8eaf6',
          secondary: '#8b92b8',
          muted: '#4a5080',
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-violet': '0 0 20px rgba(124, 111, 247, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.2)',
        'glow-pink': '0 0 20px rgba(240, 98, 146, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #7c6ff7, #9b6dfa)',
        'gradient-cyan': 'linear-gradient(135deg, #22d3ee, #818cf8)',
        'gradient-pink': 'linear-gradient(135deg, #f06292, #ba68c8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}
