/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px"
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px"
    },
    extend: {
      colors: {
        accent: "#d99605", // Your primary accent color
        "accent-dark": "#d99605" // A darker shade for hover
      },

      animation: {
        "spin-slow": "spin 6s linear infinite"
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, "sans-serif"],
        sora: [`var(--font-sora)`, "sans-serif"]
      }
    }
  },
  container: {
    padding: {
      DEFAULT: "15px"
    }
  }
  /* plugins: [require("tailwind-scrollbar")] */
};
