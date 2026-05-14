/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0f4fe',
          100: '#dde6fd',
          200: '#c2d1fb',
          300: '#98b1f8',
          400: '#6787f3',
          500: '#4460ed',
          600: '#2f3fe2',
          700: '#272dcf',
          800: '#2527a7',
          900: '#242684',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8f9fc',
          tertiary: '#f1f3f9',
          dark: '#0f1117',
          'dark-secondary': '#161b27',
          'dark-tertiary': '#1c2333',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        }
      }
    }
  },
  plugins: [],
}
