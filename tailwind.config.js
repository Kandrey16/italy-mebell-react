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
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      
    },
    extend: {
      colors: {
        'colorPrimary': '#1e40af',
        'colorPrimaryHover': '#1e40af',
        'colorBackground': '#F0F0F9',
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
