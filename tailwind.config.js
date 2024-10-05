const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#ef4444', // Red 500
        },
        'primary-lightgreen': '#48BB78', // Add your custom color here
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
});
