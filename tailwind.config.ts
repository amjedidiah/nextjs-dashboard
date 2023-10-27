import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1464px",
      },
    },
    extend: {
      backgroundColor: {
        "id-1": "#543212",
        "id-2": "#073c41",
      },
      colors: {
        blue: {
          100: "#272E71",
          200: "#374151",
          300: "#6B7280",
        },
        slate: {
          100: "#E5E7EB",
          200: "#F9FAFB",
          300: "#D1D5D8",
        },
      },
      fontFamily: {
        "open-sans": ["var(--font-open-sans)"],
      },
      screens: {
        mdx: "992px",
      },
    },
  },
  plugins: [],
};
export default config
