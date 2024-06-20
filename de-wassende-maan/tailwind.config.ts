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
        /// default dark color "most used in text"
        'primary-black': '#1F1F1F',
        'primary': '#48b170',
        'primary-dark': '#0e4039',

        /// input colors
        'input-focus-primary': '#48b170',
        'input-focus-secondary': '#0e4039',

        /// button colors
        'button-primary-hover': '#48b170',
        'button-primary': '#0e4039',

        
        'button-secondary': '#A0A0A0',
        
        'button-trinary': '#d0df90',

        'button-ghost': '#48b170',
        'button-ghost-text': '#48b170',

        'button-outlined-border': '#0e4039',
        'button-outlined-hover': '#48b170',
        'button-outlined-text': '#0e4039',

        /// badge colors for news & events & recipes & jobs... most used in cards
        'badge-primary':'#D2EF9A',
        'badge-secondary':'#696C70',
        'badge-danger':'#DB4444',
        'badge-warning':'#fa8f2e',
        'badge-info':'#a3ccee',
        'badge-success':'#48b170',
        'badge-light':'#F7F7F7',
        'badge-dark':'#1F1F1F',

        /// footer colors
        'footer-bg': '#F7F7F7',
        'footer-text': '#0e4039',
        'footer-link-up': '#0e4039',
        'footer-link-down': '#48b170',

        /// link colors
        'link-underlined': '#48b170',
        'link-hover-2': '#48b170',
        'link-hover': '#1F1F1F',
        'link-text': '#1F1F1F',

        /// paragraph colors
        'paragraph-primary': '#1F1F1F',
        'paragraph-secondary': '#696C70',
        'paragraph-tertiary': '#0e4039',

        /// heading text colors
        'heading-primary': '#1F1F1F',
        'heading-secondary': '#0e4039',

        /// call to action card
        'call-to-action-dark': '#0e4039',
        'call-to-action-light': '#d0df90',

        // 'primary-green': '#48b170',
        // 'primary-green-light-dwm': '#48b170',
        // 'primary-green-dark-dwm': '#0e4039',
        // 'primary-secondary': '#696C70',
        // 'primary-secondary2': '#A0A0A0',
        // 'primary-white': '#ffffff',
        // 'primary-surface': '#F7F7F7',
        // 'primary-lime': '#d0df90',
        // 'primary-lime2': '#D2EF9A',
        // 'primary-light-lime': '#f6f8ee',
        // 'primary-eggshell': '#e1a883',
        // 'primary-yellow': '#f8df7e',
        // 'primary-blue-sky': '#a3ccee',
        // 'primary-rose': '#fad1ce',
        // 'primary-rose-light': '#F7F5F0',
        // 'primary-orange': '#eb5b25',
        // 'primary-light-orange': '#fa8f2e',
        // 'primary-red': '#DB4444',
        // 'primary-purple': '#8684D4',
      },
      boxShadow: {
        "bottom": '0px 5px 25px rgba(72, 177, 112, 0.08)',
        "bottom-right": '0px 5px 20px rgba(72, 177, 112, 0.15), 5px 5px 20px rgba(72, 177, 112, 0.15)',
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
