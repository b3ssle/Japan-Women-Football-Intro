/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nadeshiko: "#E91E63",
        "nadeshiko-light": "#ff3d96",
      },
    },
  },
  plugins: [require("daisyui")],
};
