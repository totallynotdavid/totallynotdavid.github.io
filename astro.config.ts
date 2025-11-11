import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// To change the default language, update both this file and src/i18n/config.ts
const DEFAULT_LANGUAGE = 'en' as const;
const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [mdx()],
  site: 'https://totallynotdavid.github.io/',

  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: [...SUPPORTED_LANGUAGES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  markdown: {
    remarkRehype: {
      footnoteLabel: 'Footnotes', // if empty, it will still render a heading, kept to translate it later
      footnoteLabelTagName: 'h3', // added to avoid adding footnotes on the toc component (only counts h1 and h2)
      footnoteLabelProperties: { class: 'sr-only' },
      footnoteBackContent: '↩',
    },
  },

  build: {
    inlineStylesheets: 'always',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  image: {
    domains: ['totallynotdavid.github.io'],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
