# Architecture

The code map of this Astro site: what each directory is responsible for, and how
a request for `/<lang>/<slug>` becomes a rendered post.

## `src/pages`

Astro's file-based router.

- [`src/pages/index.astro`](../src/pages/index.astro) redirects `/` to `/en/`.
  It sets a `noindex` robots tag and a canonical link, and redirects with a
  script and, for clients that ignore scripts, a meta refresh.
- [`src/pages/[lang]/index.astro`](../src/pages/%5Blang%5D/index.astro) renders
  the home page for each supported language: the `src/content/home/<lang>.mdx`
  entry of the `home` collection, followed by the post list. The build fails
  when a supported language has no home entry.
- [`src/pages/[lang]/[slug].astro`](../src/pages/%5Blang%5D/%5Bslug%5D.astro)
  renders one page per post that [`getPosts`](../src/lib/posts.ts) returns.

## `src/layouts`

- [`Layout.astro`](../src/layouts/Layout.astro) is the HTML shell: fonts, meta
  tags, hreflang links, structured data, analytics and the language picker.
- [`PostLayout.astro`](../src/layouts/PostLayout.astro) wraps `Layout` for post
  pages. It adds the post header, the table of contents and the footnote styles.

## `src/components`

- [`mdx`](../src/components/mdx) holds the components authors import into post
  MDX: `Annotation`, `Callout`, `Mark` and `MediaEmbed`. See
  [mdx-components.md](mdx-components.md).
- [`seo`](../src/components/seo) builds the hreflang alternate links and the
  JSON-LD structured data from [`src/config/site.ts`](../src/config/site.ts).
- [`blog`](../src/components/blog) renders the post header, the year-grouped
  post list on the home page, and the table of contents.
- [`ui`](../src/components/ui) holds small elements: the language picker, and
  the elements that replace Markdown output through
  [`mdx.ts`](../src/components/mdx.ts) (`a`, `h1`, `h2`, `hr`).
- [`Analytics.astro`](../src/components/Analytics.astro) inlines the Umami
  tracking script. `Layout` includes it in production builds only.

## `src/i18n`

- [`config.ts`](../src/i18n/config.ts) maps each supported language to its
  locale and holds the UI translation strings.
- [`utils.ts`](../src/i18n/utils.ts) exposes `useTranslations`, which looks up a
  UI string for a language and uses the default language for an unknown one, and
  `getLocale` and `getOgLocale`.

## `src/lib`

- [`posts.ts`](../src/lib/posts.ts) loads the `posts` collection. Production
  builds leave out posts with `draft: true`.
- [`alternates.ts`](../src/lib/alternates.ts) lists the languages a page exists
  in. The language picker and the hreflang links both use it.

## `src/config/site.ts`

[`site.ts`](../src/config/site.ts) holds the site-wide constants used by the
layouts and the SEO components: title, per-language description, site URL,
supported languages, author details and the analytics website ID.

## `src/content.config.ts`

[`content.config.ts`](../src/content.config.ts) defines the `posts` collection:
a glob loader over `src/content/posts` and the Zod schema that every post's
frontmatter must satisfy. See [writing-posts.md](writing-posts.md).

## `src/styles` and `tailwind.config.ts`

[`global.css`](../src/styles/global.css) imports Tailwind and loads
[`tailwind.config.ts`](../tailwind.config.ts).
[`toc.css`](../src/styles/toc.css) styles the table of contents.
[`footnotes.css`](../src/styles/footnotes.css) styles the footnotes section and
is only imported by `PostLayout`.

## `public`

Static files served as-is from the site root.

## `plugins/footnote-fixes.ts`

[`footnote-fixes.ts`](../plugins/footnote-fixes.ts) is a hast plugin that runs
during Markdown processing. It removes the class that remark-rehype adds to
footnote backreference links, and turns the `<h2 id="footnote-label">` into an
`<h3>` so it does not compete with the post's own heading levels.

## `astro.config.ts`

[`astro.config.ts`](../astro.config.ts) wires the pieces together: the MDX and
Tailwind integrations, i18n routing (`en` and `es`, with `en` also prefixed),
the `satteri` Markdown processor with `footnote-fixes` registered as a hast
plugin, always-inlined stylesheets, and viewport prefetching.

## From `/<lang>/<slug>` to a rendered post

1. During the build, the `satteri` processor configured in `astro.config.ts`
   compiles each post's MDX and runs `footnote-fixes` over the resulting HTML
   tree.
2. `getStaticPaths` in
   [`[slug].astro`](../src/pages/%5Blang%5D/%5Bslug%5D.astro) calls `getPosts`,
   which reads the `posts` collection that the glob loader in
   `content.config.ts` backs. It splits each entry id, for example
   `en/caefisica`, into `lang` and `slug`, and generates one static route per
   post.
3. For each route, the page calls `render(post)` to get the compiled `Content`
   component and its `headings`, and passes them to `PostLayout`.
4. `PostLayout` renders `PostHeader` and `TableOfContents` from the headings,
   wraps the page in `Layout`, and renders
   `<Content components={mdxComponents} />`. `mdxComponents`
   ([`mdx.ts`](../src/components/mdx.ts)) maps the `a`, `h1`, `h2` and `hr`
   Markdown elements to their `ui` components. `Annotation`, `Callout`, `Mark`
   and `MediaEmbed` appear only where a post imports them.
5. `Layout` reads the language from `Astro.currentLocale`, which Astro derives
   from the `i18n` settings in `astro.config.ts`, and uses it for the translated
   UI strings, the hreflang links and the structured data.
