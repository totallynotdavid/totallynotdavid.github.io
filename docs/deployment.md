# Deployment

GitHub Actions builds and publishes the site to GitHub Pages. The workflows are
in [`.github/workflows`](../.github/workflows).

## Pull requests

[`pr-build.yml`](../.github/workflows/pr-build.yml) runs on every pull request
to `master`, and on demand. It runs these commands, which you can run locally:

```sh
bun install --frozen-lockfile
bun run format:check
bun astro check
bun run build
```

It then checks that `dist/` exists and that the run left no tracked file
modified.

## Publishing

[`deploy.yml`](../.github/workflows/deploy.yml) runs on a push to `master`, and
on demand. A push starts it only when it changes one of:

- `src/`
- `public/`
- `package.json`
- `astro.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`

The `build` job uses the `withastro/action` action. The `deploy` job publishes
its output with `actions/deploy-pages` to the `github-pages` environment.

To publish after a change to any other file, run the workflow from the Actions
tab.
