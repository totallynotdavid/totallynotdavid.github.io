import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://totallynotdavid.github.io/',
  trailingSlash: 'never',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },

  markdown: {
    remarkRehype: {
      footnoteLabel: 'Footnotes', // if empty, it will still render a heading, kept to translate it later
      footnoteLabelTagName: 'h3', // added to avoid adding footnotes on the toc component (only counts h1 and h2)
      footnoteLabelProperties: { class: 'sr-only' },
      footnoteBackContent: '↩'
    }
  },

  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
    format: 'file'
  },

  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],

    build: {
      cssCodeSplit: true,

      // docs: https://rollupjs.org/configuration-options/
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
            components: [
              './src/components/blog/PostList.astro',
              './src/components/blog/TableOfContents.astro'
            ]
          },
          assetFileNames: assetInfo => {
            const name =
              assetInfo.originalFileNames?.[0] || assetInfo.names?.[0] || 'unknown';
            const ext = name.split('.').pop()?.toLowerCase() || '';

            if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'avif'].includes(ext)) {
              return 'assets/images/[name]-[hash:8][extname]';
            }
            if (['woff', 'woff2', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name]-[hash:8][extname]';
            }
            if (ext === 'css') {
              return 'assets/css/[name]-[hash:8][extname]';
            }
            return 'assets/[name]-[hash:8][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      }
    },

    ssr: {
      external: ['buffer', 'path', 'fs', 'os', 'crypto', 'async_hooks'].map(
        i => `node:${i}`
      )
    }
  }
});
