# Writing posts

## Adding a post

Posts live in [`src/content/posts/en`](../src/content/posts/en) and
[`src/content/posts/es`](../src/content/posts/es), one `.mdx` file per post per
language. The English and Spanish files of the same post share a filename:

```text
src/content/posts/en/caefisica.mdx
src/content/posts/es/caefisica.mdx
```

The filename without its extension is the slug, so `en/caefisica.mdx` is served
at `/en/caefisica`. The loader reads `.md` and `.mdx` files and skips files
whose name starts with `_`.

Create both files to publish in both languages, or one to publish in a single
language. A minimal post:

```mdx
---
title: "Rebuilding this site with Astro"
pubDate: 2025-08-13
description: "A technical look at how I rebuilt my personal website."
---

The post body, in Markdown.
```

Posts can import the [MDX components](mdx-components.md).

The home page of each language is a separate file,
[`src/content/home/en.mdx`](../src/content/home/en.mdx) for English and
[`src/content/home/es.mdx`](../src/content/home/es.mdx) for Spanish.

## Frontmatter

The `posts` collection schema in
[`src/content.config.ts`](../src/content.config.ts) accepts:

| Field         | Type       | Required | Effect                                                                                                             |
| ------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `title`       | `string`   | yes      | Page title, post header, list entry, and structured-data headline.                                                 |
| `pubDate`     | date       | yes      | Shown in the header and the list, which groups by its year. Coerced from a string, e.g. `2023-12-14`.              |
| `updatedDate` | date       | no       | Structured-data `dateModified` only. Coerced like `pubDate`.                                                       |
| `description` | `string`   | no       | Meta, Open Graph and Twitter description, and structured data. An omitted description uses the site description.   |
| `keywords`    | `string[]` | no       | Structured-data keywords. No `keywords` meta tag is written.                                                       |
| `draft`       | `boolean`  | no       | Defaults to `false`. See below.                                                                                    |
| `ogImage`     | image path | no       | Social preview image: a path to a file in the repository, relative to the post or with the `@/` alias. No default. |

`draft: true` leaves the post out of a production build: the page is not written
and the home page's list omits it. The dev server builds the post and shows it
in the list with a badge
([`PostList.astro`](../src/components/blog/PostList.astro)).

## Linking the two languages of a post

No frontmatter field connects a post to its translation. The language picker and
the hreflang tags look for a post with the same slug in each other language
([`alternates.ts`](../src/lib/alternates.ts),
[`LanguagePicker.astro`](../src/components/ui/LanguagePicker.astro),
[`HreflangLinks.astro`](../src/components/seo/HreflangLinks.astro)). Both
translations therefore need the same slug. If only one language has the post,
the page shows no picker and lists only its own language in the hreflang tags.
