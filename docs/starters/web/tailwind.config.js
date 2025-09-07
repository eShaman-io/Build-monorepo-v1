/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          primary700: "var(--brand-primary-700)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
          bg: "var(--brand-neutral-50)",
          fg: "var(--brand-neutral-900)",
        },
      },
    },
  },
  plugins: [],
};
