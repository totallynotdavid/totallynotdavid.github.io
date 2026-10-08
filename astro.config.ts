import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import footnoteFixes from './plugins/footnote-fixes.ts';
import {
  DEFAULT_LANGUAGE,
  SITE_URL,
  SUPPORTED_LANGUAGES,
} from './src/config/site.ts';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [mdx()],
  site: SITE_URL,

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
    domains: [new URL(SITE_URL).hostname],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
