# Deployment

GitHub Actions builds and publishes the site to GitHub Pages. The workflows are
in [`.github/workflows`](../.github/workflows).

## Checks

[`ci.yml`](../.github/workflows/ci.yml) runs on every pull request, every push
to `master`, and on demand. It installs the tools pinned in
[`mise.toml`](../mise.toml) and runs these commands, which you can run locally:

```sh
bun install --frozen-lockfile
bun run check
```

`check` runs Biome, the type check, the Markdown and YAML format check and the
site build. It writes no tracked file.

## Publishing

[`deploy.yml`](../.github/workflows/deploy.yml) runs on every push to `master`,
and on demand. The `build` job runs `bun install --frozen-lockfile` and
`bun run build`, then uploads `dist/` with `actions/upload-pages-artifact`. The
`deploy` job publishes it with `actions/deploy-pages` to the `github-pages`
environment.
