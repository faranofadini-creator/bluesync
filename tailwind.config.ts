import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2342",
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#102A43",
          900: "#0A2342",
        },
        ocean: {
          DEFAULT: "#1A6B8A",
          light: "#2A8BAE",
          dark: "#124C62",
        },
        teal: {
          DEFAULT: "#0D9488",
          light: "#14B8A6",
          dark: "#0F766E",
        },
        green: {
          DEFAULT: "#16A34A",
          light: "#22C55E",
          dark: "#15803D",
        },
        orange: {
          DEFAULT: "#EA580C",
          light: "#F97316",
          dark: "#C2410C",
        },
        red: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
        },
        yellow: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          dark: "#B45309",
        },
      },
      fontFamily: {
        sans: ["Inter", "Calibri", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
