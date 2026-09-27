# Architecture

The code map for this Astro site: what each directory is responsible for, and
how a request for `/<lang>/<slug>` becomes a rendered post.

## `src/pages`

Astro's file-based router.

- [`src/pages/index.astro`](src/pages/index.astro) redirects `/` to `/en/` with
  a meta refresh and a `noindex` robots tag, for clients that ignore the
  `<script>` redirect.
- [`src/pages/[lang]/index.astro`](src/pages/%5Blang%5D/index.astro) renders the
  home page for each supported language: the matching `home.mdx` / `home.es.mdx`
  content, followed by the post list.
- [`src/pages/[lang]/[slug].astro`](src/pages/%5Blang%5D/%5Bslug%5D.astro)
  renders one page per post in the `posts` collection.

## `src/layouts`

- [`src/layouts/Layout.astro`](src/layouts/Layout.astro) is the HTML shell:
  fonts, meta tags, hreflang links, structured data, analytics, and the language
  picker.
- [`src/layouts/PostLayout.astro`](src/layouts/PostLayout.astro) wraps `Layout`
  for post pages, adding the post header and the table of contents, and
  conditionally loading footnote styles when a heading mentions "footnote".

## `src/components`

- [`src/components/mdx`](src/components/mdx) holds the interactive components
  authors import directly into post MDX: `Annotation`, `Callout`, `Mark`,
  `MediaEmbed`. Documented in [docs/writing-posts.md](docs/writing-posts.md).
- [`src/components/seo`](src/components/seo) builds hreflang alternate links and
  JSON-LD structured data from [`src/config/site.ts`](src/config/site.ts).
- [`src/components/blog`](src/components/blog) renders the post header, the
  year-grouped post list on the home page, and the table of contents.
- [`src/components/ui`](src/components/ui) holds the small elements used both
  directly in layouts and as the MDX element overrides in
  [`src/components/mdx.ts`](src/components/mdx.ts) (`a`, `h1`, `h2`, `hr`).
- [`src/components/Analytics.astro`](src/components/Analytics.astro) inlines the
  Umami tracking script, loaded only in production.

## `src/i18n`

- [`src/i18n/config.ts`](src/i18n/config.ts) lists the supported languages,
  their locale metadata, and the UI translation strings.
- [`src/i18n/utils.ts`](src/i18n/utils.ts) exposes `useTranslations` (look up a
  UI string for the current language, falling back to the default language) and
  `getOgLocale`.

## `src/config/site.ts`

[`src/config/site.ts`](src/config/site.ts) holds the site-wide constants used by
the layouts and SEO components: title, per-language description, site URL,
author metadata, the default Open Graph image, and the analytics website ID.

## `src/content.config.ts`

[`src/content.config.ts`](src/content.config.ts) defines the `posts` collection:
a glob loader over `src/content/posts`, and the Zod schema every post's
frontmatter must satisfy.

## `plugins/footnote-fixes.ts`

[`plugins/footnote-fixes.ts`](plugins/footnote-fixes.ts) is a hast plugin run
during Markdown processing. It strips the class remark-rehype adds to footnote
backreference links, and turns the `id="footnote-label"` `<h2>` into an `<h3>`
so it doesn't compete with the post's own heading levels.

## `astro.config.ts`

[`astro.config.ts`](astro.config.ts) wires the pieces together: the MDX and
Tailwind integrations, i18n routing (`en`/`es`, `en` prefixed), the Markdown
processor (`satteri`, with `footnote-fixes` registered as a hast plugin),
inlined build stylesheets, and viewport prefetching.

## Request flow: `/<lang>/<slug>` to a rendered post

1. Astro's i18n routing (configured in `astro.config.ts`) matches the `en` or
   `es` prefix to a locale.
2. At build time, `getStaticPaths` in
   [`src/pages/[lang]/[slug].astro`](src/pages/%5Blang%5D/%5Bslug%5D.astro)
   calls `getCollection('posts')` (backed by the glob loader in
   `src/content.config.ts`) and, for each entry, splits its id (for example
   `en/caefisica`) into `lang` and `slug` to generate one static route per post.
3. For the matching route, the page calls `render(post)` to get the compiled
   `Content` component and its `headings`, then passes them to `PostLayout`.
4. `PostLayout` renders `PostHeader` and `TableOfContents` from the headings,
   wraps the page in `Layout` for the HTML shell, and renders
   `<Content components={mdxComponents} />`. `mdxComponents`
   (`src/components/mdx.ts`) remaps the `a`, `h1`, `h2`, and `hr` Markdown
   elements to their `src/components/ui` equivalents; the `Annotation`,
   `Callout`, `Mark`, and `MediaEmbed` components only appear where a post
   imports them directly.
5. Before any of this, the post's Markdown/MDX has already passed through the
   `satteri` processor configured in `astro.config.ts`, which runs the
   `footnote-fixes` hast plugin over the generated HTML tree.
