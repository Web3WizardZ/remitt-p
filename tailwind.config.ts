import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        remi: {
          950: "#0b0614",
          900: "#140a24",
          800: "#1e0e36",
          700: "#2a124c",
          600: "#3a1970",
          500: "#5030ba", // deep purple
          400: "#6d2eb4",
          300: "#8b31ae",
          200: "#ad38a7",
          100: "#d2459e", // magenta
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(210,69,158,0.25), 0 12px 40px rgba(80,48,186,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
