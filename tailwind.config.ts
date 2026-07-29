import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'Arial', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'Arial', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1A3A70',
          50: '#E8EDF5',
          100: '#C5D1E6',
          200: '#9AB0D2',
          300: '#6F8FBE',
          400: '#4A6FA8',
          500: '#2B5590',
          600: '#1A3A70',
          700: '#16305B',
          800: '#102545',
          900: '#0A1A30',
          950: '#050F1C',
        },
        gold: {
          DEFAULT: '#9C7331',
          50: '#FAF4EA',
          100: '#F0E0C5',
          200: '#E1C78E',
          300: '#CFA95A',
          400: '#B88E3E',
          500: '#9C7331',
          600: '#856029',
          700: '#6D4D22',
          800: '#553A1A',
          900: '#3E2813',
        },
        deepnavy: '#0A195F',
        darknavy: '#253763',
        midnavy: '#20336D',
        white: '#FFFFFF',
        lightgray: '#E5E7EB',
        textgray: '#374151',
        blacktext: '#000000',
      },
      maxWidth: {
        'site': '1152px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
