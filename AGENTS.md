# AGENTS.md

Guidance for coding agents working in this repository.

## Project summary

- **Name:** Crosspost Markdown
- **Type:** GitHub Action written in TypeScript
- **Entry point:** `src/main.ts`
- **Published artifact:** `dist/index.js` (bundled with `@vercel/ncc`)

## Local setup

1. Install dependencies:
   - `npm install`
2. Run checks:
   - `npm run build`
   - `npm run lint`
   - `npm test`

## Common commands

- `npm run build` — compile TypeScript
- `npm run lint` — run ESLint on `src/**/*.ts`
- `npm run test` — run Jest test suite
- `npm run package` — bundle action into `dist/index.js`
- `npm run all` — run build, format, lint, package, and tests

## Repository layout

- `src/` — action implementation
  - `publish/` — publisher integrations (dev.to, medium)
- `__tests__/` — shared/fixture-driven tests
- `action.yml` — action metadata and inputs
- `dist/` — generated bundle committed for GitHub Actions runtime

## Dependency updates

- Use npm for dependency management.
- Update direct dependencies in `package.json`, then regenerate lockfile with `npm install`.
- After dependency changes, run `npm run build && npm run lint && npm test`.
- If runtime code changes are introduced, regenerate `dist/` with `npm run package`.

## Safety notes

- Do not commit secrets or API tokens.
- Treat `dist/` as generated output; keep it in sync with runtime changes.
