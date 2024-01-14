/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      listStyleType: {},
    },
    screens: {
      mm: "450px",
      antd: "575px",
      sm: "640px",
      md: "768px",
      mg: "950px",
      antdlg: "992px",
      lg: "1024px",
      xl: "1280px",
    },
    listStyleType: "disc",
  },
  plugins: [],
};
