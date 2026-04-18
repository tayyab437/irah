export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0D0B14",
        "accent-pink": "#FFB7C5",
        "text-main": "#F5F3F7",
        "text-dim": "rgba(245, 243, 247, 0.6)",
        "glow-pink": "rgba(255, 183, 197, 0.3)",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Playfair Display", "serif"],
        script: ["Marck Script", "cursive"],
      },
    },
  },
  plugins: [],
};
