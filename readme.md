# david's portfolio [![deploy](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/totallynotdavid/totallynotdavid.github.io/actions/workflows/deploy.yml)

The source of [totallynotdavid.github.io](https://totallynotdavid.github.io),
the personal website and blog of David Duran. It is a static site in English and
Spanish, built with [Astro](https://astro.build/),
[Tailwind CSS](https://tailwindcss.com/) and MDX, and published to GitHub Pages.
The repository is the site itself, not a theme: the author details, analytics ID
and page text are in the code.

## Run it

You need [Bun](https://bun.sh/) 1.4.2. `mise install` installs the versions
pinned in [`mise.toml`](mise.toml).

```sh
bun install
bun dev
```

Open <http://localhost:4321>. It redirects to `/en/`; the Spanish site is at
`/es/`.

`bun dev` passes `--host`, so the server also listens on your network addresses.
`bun start` listens on localhost only.

## Commands

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `bun dev`              | Dev server on port 4321, reachable from the network.         |
| `bun start`            | Dev server on port 4321, localhost only.                     |
| `bun run build`        | Builds the static site into `dist/`.                         |
| `bun run preview`      | Serves `dist/` after a build.                                |
| `bun run astro check`  | Type-checks `.astro` and `.ts` files.                        |
| `bun run format`       | Formats code with Biome and Markdown and YAML with Prettier. |
| `bun run format:check` | Checks the same formatting without writing.                  |

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
