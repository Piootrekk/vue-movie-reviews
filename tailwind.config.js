/** @type {import('tailwindcss').Config} */
export const content = ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    keyframes: {
      popp: {
        from: {
          opacity: 0,
          transform: 'translateY(3rem)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'popping-up': 'popp 1s ease-out forwards',
    },
  },
};
export const plugins = [];