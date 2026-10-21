# david's portfolio [![deploy](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml)

The source of [totallynotdavid.github.io](https://totallynotdavid.github.io),
the personal website and blog of David Duran. It is a static site in English and
Spanish, built with [Astro](https://astro.build/),
[Tailwind CSS](https://tailwindcss.com/) and MDX, and published to GitHub Pages.
The repository is the site itself, not a theme: the author details, analytics ID
and page text are in the code.

## Run it

Install [mise](https://mise.jdx.dev/), then:

```sh
mise install
bun install
bun run dev
```

`mise install` installs the Bun and Node versions pinned in
[`mise.toml`](mise.toml).

Open <http://localhost:4321>. It redirects to `/en/`; the Spanish site is at
`/es/`.

## Commands

| Command             | What it does                                                             |
| ------------------- | ------------------------------------------------------------------------ |
| `bun run dev`       | Dev server on port 4321, localhost only.                                 |
| `bun run dev:host`  | Dev server on port 4321, reachable from the network.                     |
| `bun run build`     | Builds the static site into `dist/`.                                     |
| `bun run preview`   | Serves `dist/` after a build.                                            |
| `bun run typecheck` | Type-checks `.astro` and `.ts` files.                                    |
| `bun run lint`      | Checks code and formatting with Biome.                                   |
| `bun run lint:docs` | Checks Markdown and YAML formatting with oxfmt.                          |
| `bun run fix`       | Applies Biome's safe fixes and formats Markdown and YAML.                |
| `bun run check`     | Runs lint, typecheck and lint:docs. CI runs it on PRs and master pushes. |

## Features

- Posts written in MDX, one file per post per language, with a language switcher
  and `hreflang` links between translations.
- A home page per language, followed by the post list grouped by year.
- A table of contents on post pages, built from the post's headings.
- Footnotes, light and dark themes that follow the system setting, and
  `draft: true` posts that appear in the list only outside production.
- MDX components for side notes, highlights, link boxes and lazy-loaded media.
- Canonical URLs, Open Graph and Twitter tags, and JSON-LD structured data.
- [Umami](https://umami.is/) analytics in production builds.

## Documentation

The [manual](docs/readme.md) covers the [architecture](docs/architecture.md),
[writing posts](docs/writing-posts.md), the
[MDX components](docs/mdx-components.md) and [deployment](docs/deployment.md).
