/** @type {import('tailwindcss').Config} */

// Green brand theme (client direction), built on the Section 12 structure:
// forest replaces Midnight Navy, leaf replaces Aqua Teal; tangerine, gold and
// pomegranate keep their roles (dry fruit, Dubai/export, India on the map).
// "dark" shades are the AA-contrast versions for text on light backgrounds.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1E4D2B', // primary: buttons, bands, headings
          dark: '#163B21',
          900: '#0F2E19', // map canvas
          800: '#1D4A2B', // map land on canvas
          600: '#3A6B47',
          100: '#E3EDE2',
        },
        leaf: {
          DEFAULT: '#8BC34A', // fresh-fruit highlights, icons on dark
          dark: '#3E7B22', // leaf text/links on light backgrounds
          light: '#EAF3DE',
        },
        sage: {
          DEFAULT: '#EEF2E6', // alternating light sections
          dark: '#DFE7D2',
        },
        pomegranate: {
          DEFAULT: '#C62839', // India on the map, small accents
          dark: '#A51F2F',
          light: '#FBE7E9',
        },
        tangerine: {
          DEFAULT: '#F28C28', // dry-fruit highlights
          dark: '#A4530A',
          light: '#FDEEDD',
        },
        gold: {
          DEFAULT: '#F5B83D', // Dubai and export highlights, CTA on dark
          dark: '#8A5D00',
          light: '#FDF3DC',
        },
        cream: {
          DEFAULT: '#FBF8F1', // page background
          light: '#FFFDF8',
          dark: '#F2EEE2',
        },
        ink: {
          DEFAULT: '#18231C', // body copy
          muted: '#56635A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.375rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }], // 38/44 mobile
        'h1-lg': ['4rem', { lineHeight: '4.25rem', letterSpacing: '-0.025em' }], // 64/68 desktop
        stat: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }], // 72px numerals
      },
      borderRadius: {
        btn: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(30, 77, 43, 0.04), 0 8px 24px -12px rgba(30, 77, 43, 0.16)',
        lift: '0 2px 4px rgba(30, 77, 43, 0.05), 0 18px 40px -16px rgba(30, 77, 43, 0.28)',
        header: '0 1px 0 rgba(30, 77, 43, 0.06), 0 8px 24px -16px rgba(30, 77, 43, 0.22)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-24' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'dash-flow': 'dash-flow 1.6s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
