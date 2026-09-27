# Writing posts

## Adding a post

Posts live in [`src/content/posts/en`](../src/content/posts/en) and
[`src/content/posts/es`](../src/content/posts/es), one `.mdx` file per post per
language. The English and Spanish files for the same post share the same
filename, for example:

```
src/content/posts/en/caefisica.mdx
src/content/posts/es/caefisica.mdx
```

Create both files to publish a post in both languages, or just one to publish in
a single language.

## Frontmatter

The `posts` collection schema in
[`src/content.config.ts`](../src/content.config.ts) accepts:

| Field           | Type       | Required | Notes                                     |
| --------------- | ---------- | -------- | ----------------------------------------- |
| `title`         | `string`   | yes      |                                           |
| `pubDate`       | date       | yes      | Coerced from a string, e.g. `2023-12-14`. |
| `updatedDate`   | date       | no       | Coerced the same way as `pubDate`.        |
| `description`   | `string`   | no       |                                           |
| `keywords`      | `string[]` | no       |                                           |
| `draft`         | `boolean`  | no       | Defaults to `false`.                      |
| `ogImage`       | `string`   | no       |                                           |
| `ogImageWidth`  | `string`   | no       |                                           |
| `ogImageHeight` | `string`   | no       |                                           |
| `ogImageType`   | `string`   | no       |                                           |
| `ogImageAlt`    | `string`   | no       |                                           |

A draft post (`draft: true`) is excluded from the home page's post list in
production, and shown there with a badge outside production
([`src/components/blog/PostList.astro`](../src/components/blog/PostList.astro)).

## Linking the two languages of a post

There is no frontmatter field connecting a post to its translation. The language
switcher and hreflang tags derive the other language's URL by taking the current
path, stripping the locale prefix, and prepending the target locale
([`src/components/ui/LanguagePicker.astro`](../src/components/ui/LanguagePicker.astro),
[`src/components/seo/HreflangLinks.astro`](../src/components/seo/HreflangLinks.astro)).
This assumes a file with the same slug exists under both `src/content/posts/en`
and `src/content/posts/es`: if only one language has the post, switching the
language on that page links to a page that doesn't exist.

## MDX components

These components are available to import inside post `.mdx` files.

### Annotation

[`src/components/mdx/Annotation.astro`](../src/components/mdx/Annotation.astro)
adds a side note next to the wrapped text, connected by an animated SVG bracket.
Below `mobileBreakpoint`, the bracket and note move underneath the text instead
of beside it.

```mdx
import Annotation from "@/components/mdx/Annotation.astro";

<Annotation>
  Main text shown inline.
  <Fragment slot="comment" set:text="Note shown next to the main text" />
</Annotation>
```

The default slot holds the annotated text; the `comment` slot holds the note.

| Prop                | Type      | Default          |
| ------------------- | --------- | ---------------- |
| `animationDuration` | `number`  | `650`            |
| `commentDelay`      | `number`  | `120`            |
| `strokeWidth`       | `number`  | `2`              |
| `bracketColor`      | `string`  | `'currentColor'` |
| `commentMaxWidth`   | `number`  | `260`            |
| `mobileBreakpoint`  | `number`  | `768`            |
| `disableAnimation`  | `boolean` | `false`          |
| `verticalSpacing`   | `number`  | `8`              |
| `horizontalSpacing` | `number`  | `10`             |

### MediaEmbed

[`src/components/mdx/MediaEmbed.astro`](../src/components/mdx/MediaEmbed.astro)
renders an image, video, or iframe with a loading placeholder and a retry button
on error. For a local image, import the file and pass it as `src`:

```mdx
import myImage from "@/assets/example-image.jpg";
import MediaEmbed from "@/components/mdx/MediaEmbed.astro";

<MediaEmbed src={myImage} alt="Descriptive alt text" aspectRatio="16/9" />
```

For a video or a remote file, pass a path or URL:

```mdx
<MediaEmbed
  src="/videos/example-video.mp4"
  caption="A short demo"
  controls
  loop
/>
```

`type` is inferred when omitted: an imported image object is always `'image'`;
otherwise the component reads the file extension from `src` (or, for URLs with
`origFormat` query parameters, that parameter) and falls back to `'iframe'` when
the extension matches neither an image nor a video.

| Prop          | Type                                                                                      | Default                                                                           |
| ------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `src`         | `string \| ImageMetadata`                                                                 | required                                                                          |
| `type`        | `'video' \| 'image' \| 'iframe'`                                                          | inferred from `src`                                                               |
| `poster`      | `string`                                                                                  | —                                                                                 |
| `alt`         | `string`                                                                                  | `''`                                                                              |
| `caption`     | `string`                                                                                  | —                                                                                 |
| `aspectRatio` | `'auto' \| 'square' \| '16/9' \| '16/10' \| '4/3' \| '21/9' \| '3/2' \| '1/1' \| 'video'` | `'auto'`                                                                          |
| `autoplay`    | `boolean`                                                                                 | `false`                                                                           |
| `muted`       | `boolean`                                                                                 | `true`                                                                            |
| `loop`        | `boolean`                                                                                 | `false`                                                                           |
| `controls`    | `boolean`                                                                                 | `true`                                                                            |
| `className`   | `string`                                                                                  | `''`                                                                              |
| `rounded`     | `boolean`                                                                                 | `true`                                                                            |
| `priority`    | `boolean`                                                                                 | `false`. When `true`, the media loads immediately instead of on scroll into view. |
| `preload`     | `'none' \| 'metadata' \| 'auto'`                                                          | `'metadata'`                                                                      |
| `sizes`       | `string`                                                                                  | —                                                                                 |
| `quality`     | `number`                                                                                  | `80`                                                                              |
| `formats`     | `('webp' \| 'avif' \| 'png' \| 'jpg')[]`                                                  | `['avif', 'webp']`                                                                |
| `width`       | `number`                                                                                  | —                                                                                 |
| `height`      | `number`                                                                                  | —                                                                                 |
| `densities`   | `number[]`                                                                                | `[1, 2]`                                                                          |

### Callout

[`src/components/mdx/Callout.astro`](../src/components/mdx/Callout.astro)
renders a bordered link box around its content, for pointing to an external
resource.

```mdx
import Callout from "@/components/mdx/Callout.astro";

<Callout href="https://example.com">
  <p>Explore this related resource.</p>
</Callout>
```

| Prop   | Type     | Default  |
| ------ | -------- | -------- |
| `href` | `string` | required |

### Mark

[`src/components/mdx/Mark.astro`](../src/components/mdx/Mark.astro) highlights
its content with a gradient background instead of a solid color.

```mdx
import Mark from "@/components/mdx/Mark.astro";

This is regular text with <Mark>highlighted content</Mark>.
```

| Prop    | Type               | Default                  |
| ------- | ------------------ | ------------------------ |
| `color` | `string`           | `'var(--color-mark-bg)'` |
| `as`    | `'mark' \| 'span'` | `'mark'`                 |
