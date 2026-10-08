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
[`src/content/home.mdx`](../src/content/home.mdx) for English and
[`src/content/home.es.mdx`](../src/content/home.es.mdx) for Spanish.

## Frontmatter

The `posts` collection schema in
[`src/content.config.ts`](../src/content.config.ts) accepts:

| Field           | Type       | Required | Effect                                                                                                |
| --------------- | ---------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `title`         | `string`   | yes      | Page title, post header, list entry, and structured-data headline.                                    |
| `pubDate`       | date       | yes      | Shown in the header and the list, which groups by its year. Coerced from a string, e.g. `2023-12-14`. |
| `updatedDate`   | date       | no       | Structured-data `dateModified` only. Coerced like `pubDate`.                                          |
| `description`   | `string`   | no       | Meta, Open Graph and Twitter description, and structured data. An omitted description is empty.       |
| `keywords`      | `string[]` | no       | Structured-data keywords. No `keywords` meta tag is written.                                          |
| `draft`         | `boolean`  | no       | Defaults to `false`. See below.                                                                       |
| `ogImage`       | `string`   | no       | Path or URL of the social preview image. Defaults to `ogImage` in `src/config/site.ts`.               |
| `ogImageWidth`  | `string`   | no       | Validated, not read by any template.                                                                  |
| `ogImageHeight` | `string`   | no       | Validated, not read by any template.                                                                  |
| `ogImageType`   | `string`   | no       | Validated, not read by any template.                                                                  |
| `ogImageAlt`    | `string`   | no       | Validated, not read by any template.                                                                  |

The layout always declares the preview image as a 1200 by 630 JPEG.

`draft: true` hides the post from the home page's list in production builds. In
other modes the list shows it with a badge
([`PostList.astro`](../src/components/blog/PostList.astro)). The build still
writes the post's page, so its URL works in production.

## Linking the two languages of a post

No frontmatter field connects a post to its translation. The language picker and
the hreflang tags build the other language's URL by taking the current path,
removing the locale prefix and adding the target locale
([`LanguagePicker.astro`](../src/components/ui/LanguagePicker.astro),
[`HreflangLinks.astro`](../src/components/seo/HreflangLinks.astro)). Both
translations therefore need the same slug. If only one language has the post,
the picker on that page links to a page that does not exist.
