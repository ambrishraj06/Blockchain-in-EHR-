/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e6fff9",
          100: "#b3ffee",
          200: "#80ffe3",
          300: "#4dffd8",
          400: "#1affcd",
          500: "#00d4aa",
          600: "#00a88a",
          700: "#007d66",
          800: "#005244",
          900: "#002922",
        },
        accent: {
          cyan: "#06b6d4",
          blue: "#3b82f6",
          purple: "#8b5cf6",
        },
        surface: {
          DEFAULT: "#0f172a",
          50: "rgba(255, 255, 255, 0.05)",
          100: "rgba(255, 255, 255, 0.08)",
          200: "rgba(255, 255, 255, 0.12)",
        },
        dark: {
          DEFAULT: "#0a0f1c",
          100: "#0f172a",
          200: "#1e293b",
          300: "#334155",
        },
      },
      backgroundColor: {
        "custom-teal": "#00d4aa",
      },
      textColor: {
        "custom-blue": "#CDF5FD",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 212, 170, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 212, 170, 0.4)",
        "glow-xl": "0 8px 40px rgba(0, 212, 170, 0.25)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        premium: "0 20px 60px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        xs: "4px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-move": "gradientMove 4s ease infinite",
      },
    },
  },
  plugins: [],
};
