/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        civic: {
          dark: '#050811',
          navy: '#0b1120',
          surface: '#0f172a',
          surfaceLight: '#1e293b',
          border: '#1e293b',
          borderLight: '#334155',
          cyan: '#00f0ff',
          cyanGlow: '#00f0ff40',
          orange: '#ff6b35',
          orangeGlow: '#ff6b3540',
          critical: '#ff3366',
          high: '#ff7849',
          medium: '#facc15',
          resolved: '#00e599',
          bedrock: '#a855f7',
          bedrockGlow: '#a855f740',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glowCyan: '0 0 25px -5px rgba(0, 240, 255, 0.3)',
        glowOrange: '0 0 25px -5px rgba(255, 107, 53, 0.35)',
        glowBedrock: '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        glowCritical: '0 0 25px -5px rgba(255, 51, 102, 0.4)',
        glowEmerald: '0 0 25px -5px rgba(0, 229, 153, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        flowLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'flow-line': 'flowLine 3s linear infinite',
        'scan': 'scanline 8s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
