import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13233F",
        body: "#3D4A5C",
        muted: "#6B7684",
        rule: "#DCE1E8",
        wash: "#F4F6F9",
        accent: "#1E5F9E",
      },
      fontFamily: {
        serif: ["var(--font-institutional)", "Georgia", "serif"],
        rounded: [
          "var(--font-jakarta)",
          "Plus Jakarta Sans",
          "system-ui",
          "sans-serif",
        ],
        headline: ["var(--font-headline)", "system-ui", "sans-serif"],
      },
      keyframes: {
        bouncey: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        bouncey: "bouncey 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
