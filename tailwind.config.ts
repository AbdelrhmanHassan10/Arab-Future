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
        primary: "#E63329",
        "primary-dark": "#C42A22",
        navy: "#2B2D42",
        "navy-light": "#3D4060",
        "navy-dark": "#1A1B2E",
        "navy-deeper": "#12131F",
        cream: "#F5F3EF",
        "cream-dark": "#EDE9E3",
        "warm-gray": "#6B6B70",
        "off-white": "#FAFAF8",
        "section-gray": "#F7F8FA",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-arabic)", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.2" }],
        "display": ["clamp(1.85rem, 3.5vw, 3rem)", { lineHeight: "1.35" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.2rem)", { lineHeight: "1.4" }],
        "headline": ["clamp(1.2rem, 1.8vw, 1.5rem)", { lineHeight: "1.5" }],
        "subhead": ["clamp(0.95rem, 1.15vw, 1.05rem)", { lineHeight: "1.9" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.9" }],
        "caption": ["0.8rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "micro": ["0.7rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "card": "20px",
        "btn": "50px",
        "input": "12px",
        "img": "20px",
      },
      boxShadow: {
        "card": "0 4px 24px rgba(0,0,0,0.05)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.12)",
        "soft": "0 2px 12px rgba(0,0,0,0.04)",
        "glass": "0 8px 32px rgba(0,0,0,0.06)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3)",
        "glow": "0 0 40px rgba(230,51,41,0.15)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      animation: {
        "reveal": "reveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
