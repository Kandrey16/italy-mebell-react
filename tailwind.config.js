/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'ms': '320px',
      'mm': '375px',
      'ml': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        'colorPrimary': '#1e40af',
        'colorPrimaryHover': '#1e40af',
        'colorBackground': '#F0F8FF',
        'colorGray': 'B9B9B9',
        // purple: {
        //   950: '#24226D',
        // },
      },
      fontFamily: {
        main: ["Montserrat", 'sans-serif'],
      }
    },
  },
  plugins: [],
});
