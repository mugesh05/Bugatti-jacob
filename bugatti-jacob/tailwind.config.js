/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03050A',
        cobalt: '#075BFF',
        electric: '#168BFF',
        silver: '#C9D0DC',
        muted: '#8C95A5',
        ice: '#EAF4FF',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Didot', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.28em', wider3: '0.42em' },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        pulseGlow: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
        scrollDot: { '0%': { transform: 'translateY(0)', opacity: '0' }, '30%': { opacity: '1' }, '100%': { transform: 'translateY(22px)', opacity: '0' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        scrollDot: 'scrollDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
