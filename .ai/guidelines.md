### Project-specific development guidelines

This project is a Nuxt 4 app using Vue 3, Tailwind CSS v4 (via the `@tailwindcss/vite` plugin), Pinia, `@nuxt/ui`, and `@nuxtjs/i18n`. ESLint is integrated via `@nuxt/eslint` with opinionated stylistic defaults.

Key files to be aware of:
- `nuxt.config.ts` — Nuxt config: modules, Tailwind Vite plugin, ESLint stylistic overrides, i18n locales, compatibility date.
- `package.json` — scripts and dependency versions; project is ESM (`"type": "module"`).
- `app/pages/**` — file-based routing (Nuxt 4 uses the `app/` directory).

Node version observed during validation: 22.20.0

---

### 1) Build and configuration instructions (project-specific)

- Install deps
  - Use the existing lockfile. Node 18+ works; Node 22 is confirmed.
  - `npm ci` for clean installs in CI; `npm install` locally is fine.
  - Post-install runs `nuxt prepare` automatically (from `postinstall`).

- Development server
  - `npm run dev`
  - Nuxt DevTools are enabled (`devtools: { enabled: true }`). Open the DevTools tab in the browser or press the Nuxt icon.

- Production build
  - `npm run build` to generate `.nuxt` and build artifacts.
  - `npm run preview` to locally preview the production build (Nitro server).

- Static generation (if deploying as static)
  - `npm run generate` creates a static site under `.output/public`.
  - Note: verify that any server-only code or runtime config is compatible with prerender.

- Tailwind CSS v4
  - The project uses `@tailwindcss/vite` in `nuxt.config.ts` under `vite.plugins`.
  - Tailwind v4 is mostly config-less; avoid adding legacy `tailwind.config.js` unless needed.
  - If you need custom themes/utilities, prefer the new Tailwind v4 patterns.

- ESLint integrated via `@nuxt/eslint`
  - `nuxt.config.ts` sets stylistic preferences:
    - quotes: single
    - semi: false
    - indent: 4 spaces
  - Run lints with `npm run lint` or auto-fix with `npm run lint:fix`.

- i18n
  - Enabled locales: `en` (default) and `it`.
  - Update `nuxt.config.ts > i18n.locales` and provide translation messages as you introduce them.

- Pinia
  - Registered via `@pinia/nuxt`. Create stores in `stores/` or `~/stores` and import via auto-imports.

- Compatibility date
  - `compatibilityDate: '2025-07-15'` is set. When upgrading Nuxt or Vite plugins, check for breaking behavior gated by this date.

---

### 2) Testing information

This repository does not include a test framework dependency by default. The fastest zero-dependency option is Node’s built-in test runner, which works with ESM out of the box here.

- Run a single test file
  - `node --test path/to/file.test.mjs`

- Run all tests under a directory
  - `node --test tests` (Node will discover `*.test.mjs|cjs|js` files by default).

- Writing tests
  - Use ESM (`import`) since the project is ESM (`package.json` has `"type": "module"`).
  - Example unit test (validated locally):
    ```js
    // save as tests/sanity.test.mjs
    import test from 'node:test'
    import assert from 'node:assert/strict'

    test('sanity: math works', () => {
      assert.equal(2 + 2, 4)
    })
    ```
  - Run it with: `node --test tests/sanity.test.mjs` or `node --test tests`.

- Adding component tests in the future
  - If you need Vue component unit tests, consider adding Vitest + Vue Test Utils:
    - `npm i -D vitest @vitejs/plugin-vue @vue/test-utils vue` (Vue is already a dep here)
    - Configure Vitest in `vite.config.ts` or `nuxt.config.ts` (Nuxt 4 + Vitest generally works via Vite config). Use Nuxt’s `nuxt/test-utils` for SSR/app integration tests if needed.
  - For end-to-end testing, consider Playwright: `npm i -D playwright @playwright/test` and scaffold with `npx playwright install`.

Notes:
- The above Node test example was executed and passed on this codebase using Node 22.20.0 to ensure instructions are correct.

---

### 3) Additional development information

- Code style
  - Prefer `<script setup>` in Vue SFCs (the repo follows this, e.g., `app/pages/index.vue`).
  - Follow ESLint stylistic rules configured in `nuxt.config.ts`: single quotes, no semicolons, 4-space indent.
  - Run `npm run lint:fix` before committing to keep a consistent style.

- Project layout specifics
  - Nuxt 4 with `app/` directory: routes live under `app/pages`. Layouts and app shell are in `app/app.vue` and `app/app.config.ts`.
  - Using `@nuxt/ui`: prefer its components and composables when possible for consistent UI.
  - i18n default locale is `en`; add Italian translations as features are localized.

- Environment configuration
  - Prefer Nuxt runtime config via `nuxt.config.ts` and `.env` files. Use `NUXT_`-prefixed variables for public exposure.
  - When generating static output, ensure any runtime-only secrets remain server-side and not inlined.

- Common gotchas
  - Tailwind v4: do not mix legacy configuration patterns unnecessarily; the Vite plugin handles most setup.
  - When upgrading Nuxt or `@nuxt/ui`, check their changelogs for Nuxt 4 compatibility.
  - If you introduce SSR-only logic, verify both `npm run preview` and `npm run generate` flows.

- Recommended workflows
  - Development: `npm run dev` with DevTools enabled.
  - Quality gate: `npm run lint` and a quick Node test sweep: `node --test tests`.
  - Production check: `npm run build` followed by `npm run preview`.
