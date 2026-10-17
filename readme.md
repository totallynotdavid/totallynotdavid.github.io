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
mise run install
mise run dev
```

`mise install` installs the Bun and Node versions pinned in
[`mise.toml`](mise.toml).

Open <http://localhost:4321>. It redirects to `/en/`; the Spanish site is at
`/es/`.

## Commands

| Command              | What it does                                                         |
| -------------------- | -------------------------------------------------------------------- |
| `mise run dev`       | Dev server on port 4321, localhost only.                             |
| `mise run dev:host`  | Dev server on port 4321, reachable from the network.                 |
| `mise run build`     | Builds the static site into `dist/`.                                 |
| `mise run preview`   | Serves `dist/` after a build.                                        |
| `mise run typecheck` | Type-checks `.astro` and `.ts` files.                                |
| `mise run lint`      | Checks code with Biome and Markdown and YAML with oxfmt.             |
| `mise run fix`       | Applies Biome's safe fixes and formats Markdown and YAML.            |
| `mise run check`     | Runs lint, typecheck and build. CI runs it on PRs and master pushes. |

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
