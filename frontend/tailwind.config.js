/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // Dark mode toggle karein
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Sare files include karein
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: "#1D4ED8", // Primary color
        secondary: "#9333EA", // Secondary color
        accent: "#FACC15", // Accent color
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [tailwindcssAnimate], // Plugin ko import karein
};