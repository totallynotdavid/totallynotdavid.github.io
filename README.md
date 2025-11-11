# [web] david's portfolio [![deploy](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml)

This repo contains the source code for my personal website. The site is built with
[Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/) and MDX. You can
view the live site at [totallynotdavid.github.io](https://totallynotdavid.github.io).

The site is a place for my writing and a playground for building things I find
interesting.

## Getting started

To run the project locally, you'll need Bun. If you don't have Bun installed, grab it from
[bun.sh](https://bun.sh/) or use npm/pnpm/yarn as alternatives.

First, clone the repository:

```bash
git clone https://github.com/totallynotdavid/totallynotdavid.github.io.git
cd totallynotdavid.github.io
```

Install dependencies and run the development server:

```bash
bun install
bun dev
```

The site will be available at `http://localhost:4321`.

## Custom MDX components

This site uses custom interactive components within MDX content. Here's how to use each
one:

### Annotation

Add contextual side notes to your text, similar to margin notes in academic papers. On
desktop, annotations appear alongside the text with animated SVG brackets. On mobile, they
adapt to display underneath the annotated content.

```mdx
import Annotation from "@/components/mdx/Annotation.astro";

<Annotation>
  This is the main text that readers will see inline.
  <Fragment
    slot="comment"
    set:text="This annotation provides additional context or commentary"
  />
</Annotation>
```

Configuration:

- `commentMaxWidth` - Maximum width of the comment box in pixels (default: 260)
- `mobileBreakpoint` - Screen width threshold for mobile layout (default: 768px)
- `disableAnimation` - Set to `true` to disable the drawing animation

### MediaEmbed

Embed images, videos, and iframes with lazy loading, skeleton placeholders, and error
handling. The component automatically detects media types based on file extensions.

For images (especially local assets), import the file directly:

```mdx
---
import myImage from '@/assets/example-image.jpg';
---

import MediaEmbed from "@/components/mdx/MediaEmbed.astro";

<MediaEmbed
  src={myImage}
  alt="Descriptive alt text for accessibility"
  caption="Optional caption that appears below the media"
  aspectRatio="16/9"
/>
```

For video content:

```mdx
<MediaEmbed
  src="/videos/example-video.mp4"
  caption="Video demonstrating a concept"
  controls
  loop
/>
```

Configuration:

- `aspectRatio` - Prevents layout shift during loading ('16/9', '4/3', 'square', etc.)
- `priority` - Set to `true` for above-the-fold content that should load immediately
- Standard HTML video attributes (`controls`, `loop`, `muted`, `autoplay`) are supported

### Callout

Create visually distinct blocks that draw attention to important links or external
resources. Perfect for highlighting references, related content, or calls to action.

```mdx
import Callout from "@/components/mdx/Callout.astro";

<Callout href="https://example.com">
  <p>
    Explore this related resource.
    <span class="pl-1 text-gray-500">Visit example.com</span>
  </p>
</Callout>
```

The component requires only an `href` prop. Content can include any HTML or Markdown
elements.

### Mark

Apply subtle highlighter effects to text using CSS gradients for a more natural appearance
than solid backgrounds.

```mdx
import Mark from "@/components/mdx/Mark.astro";

This is regular text with <Mark>highlighted content</Mark> for emphasis.
```

Configuration:

- `color` - Custom highlight color (any valid CSS color value)
- `as` - Change the HTML element (default: `<mark>`, alternative: `<span>`)
