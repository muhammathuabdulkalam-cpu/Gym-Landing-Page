/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#030303",
        card: "rgba(15, 15, 20, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#A855F7", // Neon Purple
          dark: "#7C3AED",
          glow: "rgba(168, 85, 247, 0.15)",
        },
        secondary: {
          DEFAULT: "#00F0FF", // Electric Cyan
          dark: "#00C2CC",
          glow: "rgba(0, 240, 255, 0.15)",
        },
        accent: {
          DEFAULT: "#8B5CF6", // Purple
          pink: "#EC4899",
          orange: "#F97316",
        },
        dark: {
          900: "#030303",
          800: "#09090B",
          700: "#121214",
          600: "#1C1C1F",
          500: "#2A2A30",
          400: "#3F3F46",
          300: "#71717A",
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-glow': '0 8px 32px 0 rgba(168, 85, 247, 0.1)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/assets/noise.png')",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
