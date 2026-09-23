import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#12121A',
        border: '#232330',
        foreground: '#F5F5F7',
        muted: '#9CA3AF',
        accent: {
          from: '#6366F1',
          to: '#A855F7',
          // AA-compliant (~6.62:1 on #0A0A0F) alternative to accent.from for
          // small text (e.g. text-xs uppercase eyebrows), which fails AA at
          // accent.from's ~4.42:1. Do not use for large/gradient text or
          // decorative borders/glows — those keep accent.from/accent.to.
          text: '#818CF8',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        caret: 'caret 1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
