/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F0E0D',
          surface: '#181615',
          elevated: '#211E1C',
          border: '#2A2623',
          'border-light': '#3D3834',
          muted: '#969087',
          light: '#F8F6F1',
          cream: '#EDE7DC',
          accent: '#C05A3E',
          'accent-hover': '#AB4B31',
          gold: '#D4A359',
          olive: '#6E7557',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.08em',
        widest: '0.18em',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
