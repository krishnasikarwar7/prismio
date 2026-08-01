/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: 'var(--color-bg)',
          sidebar: 'var(--color-sidebar)',
          surface: 'var(--color-surface)',
          card: 'var(--color-card)',
          input: 'var(--color-input)',
          border: 'var(--color-border)',
          hover: 'var(--color-hover)',
        },
        accent: {
          DEFAULT: '#A35E47',
          hover: '#B56E56',
          muted: 'rgba(163, 94, 71, 0.12)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.2)',
        elevated: '0 12px 32px -8px rgba(0,0,0,0.2), 0 4px 16px -4px rgba(0,0,0,0.1)',
        glow: '0 0 0 1px rgba(163,94,71,0.2), 0 0 24px -4px rgba(163,94,71,0.2)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
