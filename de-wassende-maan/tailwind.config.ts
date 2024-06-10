import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#48b170',
        'primary-green-light-dwm': '#48b170',
        'primary-green-dark-dwm': '#0e4039',
        'primary-black': '#1F1F1F',
        'primary-secondary': '#696C70',
        'primary-secondary2': '#A0A0A0',
        'primary-white': '#ffffff',
        'primary-surface': '#F7F7F7',
        'primary-lime': '#d0df90',
        'primary-lime2': '#D2EF9A',
        'primary-light-lime': '#f6f8ee',
        'primary-eggshell': '#e1a883',
        'primary-yellow': '#f8df7e',
        'primary-blue-sky': '#a3ccee',
        'primary-rose': '#fad1ce',
        'primary-rose-light': '#F7F5F0',
        'primary-orange': '#eb5b25',
        'primary-light-orange': '#fa8f2e',
        'primary-red': '#DB4444',
        'primary-purple': '#8684D4',
      },
      boxShadow: {
        "green-bottom": '0px 5px 25px rgba(72, 177, 112, 0.08)',
        "green-bottom-right": '0px 5px 20px rgba(72, 177, 112, 0.15), 5px 5px 20px rgba(72, 177, 112, 0.15)',
        "card-border": "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        "card-shadow-border": "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      },
      fontFamily: {
        "instrument-sans": ['var(--font-instrument-sans)'],
      },
      backgroundImage: {
        'newsletter': 'url("/images/bg-newsletter-lime.png")',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};
export default config;
