/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C9A84C',
        'primary-dark': '#8B6914',
        accent: '#1A5276',
        'accent-2': '#E74C3C',
        bg: '#0A0A0F',
        'bg-2': '#12121A',
        text: '#F5F5F0',
        spark: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(201, 168, 76, 0.35)',
        'glow-lg': '0 0 80px rgba(201, 168, 76, 0.45)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)',
        'radial-gold':
          'radial-gradient(circle at center, rgba(201,168,76,0.25) 0%, rgba(10,10,15,0) 65%)',
      },
    },
  },
  plugins: [],
}
