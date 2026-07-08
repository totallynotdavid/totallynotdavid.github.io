import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import footnoteFixes from './plugins/footnote-fixes.ts';

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
    processor: satteri({
      hastPlugins: [footnoteFixes],
    }),
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
