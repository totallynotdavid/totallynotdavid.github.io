import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        'link-color': 'var(--color-link)',
        'border-color': 'var(--color-border)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        cursive: ['Caveat', 'cursive'],
        mono: [
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'Courier New',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '-.0025rem' }],
        sm: [
          '0.875rem',
          { lineHeight: '1.25rem', letterSpacing: '-.00563rem' },
        ],
        base: ['0.875rem', { lineHeight: '1.6', letterSpacing: '-0.011em' }],
      },
      maxWidth: {
        520: '32.5rem',
      },
      aspectRatio: {
        '16/10': '16 / 10',
        '4/3': '4 / 3',
        '21/9': '21 / 9',
        '3/2': '3 / 2',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text-secondary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-links': 'var(--color-link)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-text-primary)',
            '--tw-prose-quote-borders': 'var(--color-border)',
            '--tw-prose-captions': 'var(--color-text-secondary)',
            '--tw-prose-invert-body': 'var(--color-text-secondary)',
            '--tw-prose-invert-headings': 'var(--color-text-primary)',
            '--tw-prose-invert-links': 'var(--color-link)',
            '--tw-prose-invert-bold': 'var(--color-text-primary)',

            fontSize: '.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '-.00563rem',
            maxWidth: 'none',
            fontWeight: '460',

            li: {
              color: 'var(--color-text-primary)',
            },

            p: {
              color: 'var(--color-text-primary)',
              marginTop: '0',
              marginBottom: '0',
              paddingTop: '1rem',
              fontWeight: '480',
            },

            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--color-text-primary)',
              textWrap: 'balance',
              lineHeight: '1.25rem',
              letterSpacing: '-.00563rem',
              fontSize: '0.875rem',
              margin: '0',
            },

            h1: {
              fontWeight: '600',
            },

            h2: {
              fontWeight: '560',
            },

            code: {
              fontSize: '0.875rem',
              fontWeight: '500',
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              border: '1px solid var(--color-border)',
            },

            'code::before': { content: '""' },
            'code::after': { content: '""' },

            time: {
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color:
                'color-mix(in srgb, var(--color-text-secondary), transparent 40%)',
              fontWeight: '460',
              letterSpacing: '-.00563rem',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
