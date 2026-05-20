/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#000000',
          dark: '#050508',
          cyan: '#00f3ff',
          purple: '#8b5cf6',
          pink: '#ff007f',
          gray: '#12121e',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2s infinite alternate',
        'glow-purple': 'glowPurple 2s infinite alternate',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '100%': { boxShadow: '0 0 15px #00f3ff, 0 0 30px #00f3ff' }
        },
        glowPurple: {
          '0%': { boxShadow: '0 0 5px #8b5cf6, 0 0 10px #8b5cf6' },
          '100%': { boxShadow: '0 0 15px #8b5cf6, 0 0 30px #8b5cf6' }
        }
      }
    },
  },
  plugins: [],
}
