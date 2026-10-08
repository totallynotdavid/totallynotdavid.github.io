# MDX components

Four components in [`src/components/mdx`](../src/components/mdx) are available
to post `.mdx` files. Import each one where you use it, with the `@/` alias for
`src/`.

## Annotation

[`Annotation.astro`](../src/components/mdx/Annotation.astro) puts a side note
next to the wrapped text, joined to it by a hand-drawn SVG bracket that draws
itself in. The bracket and note move below the text when the viewport is at most
`mobileBreakpoint` pixels wide, or when there is no room to their right.

```mdx
import Annotation from "@/components/mdx/Annotation.astro";

<Annotation>
  Main text shown inline.
  <Fragment slot="comment" set:text="Note shown next to the main text" />
</Annotation>
```

The default slot holds the annotated text. The `comment` slot holds the note.

| Prop                | Type      | Default          | Notes                          |
| ------------------- | --------- | ---------------- | ------------------------------ |
| `animationDuration` | `number`  | `650`            | Ignored.                       |
| `commentDelay`      | `number`  | `120`            | Ignored.                       |
| `strokeWidth`       | `number`  | `2`              |                                |
| `bracketColor`      | `string`  | `'currentColor'` |                                |
| `commentMaxWidth`   | `number`  | `260`            |                                |
| `mobileBreakpoint`  | `number`  | `768`            |                                |
| `disableAnimation`  | `boolean` | `false`          | Also off under reduced motion. |
| `verticalSpacing`   | `number`  | `8`              |                                |
| `horizontalSpacing` | `number`  | `10`             |                                |

## MediaEmbed

[`MediaEmbed.astro`](../src/components/mdx/MediaEmbed.astro) renders an image, a
video or an iframe. It shows a placeholder until the media loads and a retry
button if loading fails. Media loads when it scrolls near the viewport; with
`priority` it loads at once. For a local image, import the file and pass it as
`src`:

```mdx
import pics from "@/assets/pics.jpeg";
import MediaEmbed from "@/components/mdx/MediaEmbed.astro";

<MediaEmbed src={pics} alt="Descriptive alt text" aspectRatio="16/9" />
```

For a video or a remote file, pass a path under `public/` or a URL:

```mdx
<MediaEmbed
  src="/videos/example-video.mp4"
  caption="A short demo"
  controls
  loop
/>
```

`type` is inferred when omitted. An imported image is always `'image'`. For a
string `src`, the component reads the file extension, or the `origFormat` query
parameter when the URL carries `?origWidth=` and `&origFormat=`. It falls back
to `'iframe'` when the extension is neither an image nor a video.

| Prop          | Type                                                                                      | Default                                                                           |
| ------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `src`         | `string \| ImageMetadata`                                                                 | required                                                                          |
| `type`        | `'video' \| 'image' \| 'iframe'`                                                          | inferred from `src`                                                               |
| `poster`      | `string`                                                                                  | —                                                                                 |
| `alt`         | `string`                                                                                  | `''`                                                                              |
| `caption`     | `string`                                                                                  | —                                                                                 |
| `aspectRatio` | `'auto' \| 'square' \| '16/9' \| '16/10' \| '4/3' \| '21/9' \| '3/2' \| '1/1' \| 'video'` | `'auto'`                                                                          |
| `autoplay`    | `boolean`                                                                                 | `false`. A video autoplays only when `muted` is also `true`.                      |
| `muted`       | `boolean`                                                                                 | `true`                                                                            |
| `loop`        | `boolean`                                                                                 | `false`                                                                           |
| `controls`    | `boolean`                                                                                 | `true`                                                                            |
| `className`   | `string`                                                                                  | `''`                                                                              |
| `rounded`     | `boolean`                                                                                 | `true`                                                                            |
| `priority`    | `boolean`                                                                                 | `false`. When `true`, the media loads immediately instead of on scroll into view. |
| `preload`     | `'none' \| 'metadata' \| 'auto'`                                                          | `'metadata'`                                                                      |
| `sizes`       | `string`                                                                                  | `'(max-width: 768px) 100vw, 800px'` for imported images                           |
| `quality`     | `number`                                                                                  | `80`                                                                              |
| `formats`     | `('webp' \| 'avif' \| 'png' \| 'jpg')[]`                                                  | `['avif', 'webp']`. Used for imported images only.                                |
| `width`       | `number`                                                                                  | —. A string `src` image defaults to `1200`.                                       |
| `height`      | `number`                                                                                  | —. A string `src` image defaults to `675`.                                        |
| `densities`   | `number[]`                                                                                | `[1, 2]`                                                                          |

## Callout

[`Callout.astro`](../src/components/mdx/Callout.astro) renders a bordered link
box around its content and opens the link in a new tab. Use it to point to an
external resource.

```mdx
import Callout from "@/components/mdx/Callout.astro";

<Callout href="https://example.com">
  <p>Explore this related resource.</p>
</Callout>
```

| Prop   | Type     | Default  |
| ------ | -------- | -------- |
| `href` | `string` | required |

## Mark

[`Mark.astro`](../src/components/mdx/Mark.astro) highlights its content with a
gradient background instead of a solid color.

```mdx
import Mark from "@/components/mdx/Mark.astro";

This is regular text with <Mark>highlighted content</Mark>.
```

| Prop    | Type               | Default                  |
| ------- | ------------------ | ------------------------ |
| `color` | `string`           | `'var(--color-mark-bg)'` |
| `as`    | `'mark' \| 'span'` | `'mark'`                 |
