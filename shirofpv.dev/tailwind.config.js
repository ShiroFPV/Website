/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-deep': '#0d0916',
        'purple-dark': '#160b26',
        'purple-primary': '#b48bff',
        'purple-light': '#d7b7ff',
        'indigo-accent': '#9bb4ff',
        'pink-accent': '#ff8fd4',
        'pink-bright': '#ff5fbf',
        'pink-vivid': '#ff3fb4',
        'blue-light': '#bfe9ff',
        'blue-sky': '#7dd3ff',
        'blue-cyan': '#77f2ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #9bb4ff 0%, #b48bff 50%, #ff8fd4 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0d0916 0%, #160b26 50%, #0d0916 100%)',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
