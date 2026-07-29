/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a',
        darkCard: 'rgba(30, 41, 59, 0.6)',
        neonBlue: '#2563EB',
        neonCyan: '#38BDF8',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'waveform': 'waveform 1.5s ease-in-out infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '36px' },
        }
      }
    },
  },
  plugins: [],
}
