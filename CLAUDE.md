# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Raffaele Longo Elia — a terminal-themed interactive portfolio built with Nuxt 4 (Vue 3), Tailwind CSS v4, Pinia, `@nuxt/ui`, and `@nuxtjs/i18n` (English + Italian).

## Commands

```bash
npm run dev          # Start dev server (Nuxt DevTools enabled)
npm run build        # Production build → .nuxt/
npm run generate     # Static site → .output/public/ (deployed via FTP)
npm run preview      # Preview production build via Nitro server
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
node --test tests                        # Run all tests
node --test tests/path/to/file.test.mjs  # Run a single test file
```

Use `npm ci` in CI; `npm install` locally. `postinstall` runs `nuxt prepare` automatically.

## Architecture

The app is a single-page portfolio (`app/pages/index.vue`) with a terminal emulator UI. Nuxt 4 uses the `app/` directory convention.

**Core composables (business logic lives here):**
- `app/composables/useTerminal.ts` — terminal command parser/executor, simulated filesystem (`~`, `~/projects`), GitHub API integration (fetches repos for `keteraf`), i18n language switching, and command history/state.
- `app/composables/useTime.ts` — real-time clock (updates every second), exposed as `rprompt`.

**Terminal commands implemented:** `help`, `whoami`, `ls`, `cd`, `pwd`, `cat`, `contact`, `projects`, `echo`, `date`, `clear`, `lang`

**Components:** `TerminalWindow` wraps `TerminalUser`, `TerminalPrompt`, and `TerminalOutput`. `HeroSection` is the initial landing screen.

**i18n:** Default locale is `en`; `it` is also supported. Locale files are in `i18n/locales/`. Strategy is `no_prefix` (no URL prefix).

**Deployment:** GitHub Actions on push to `master` or `v*.*.*` tags — runs `npm run generate` and FTP-deploys `./dist/` (symlink to `.output/public/`) to OVH.

## Code Style

ESLint via `@nuxt/eslint` enforces:
- Single quotes
- No semicolons
- 4-space indentation

Use `<script setup>` in all Vue SFCs. Run `npm run lint:fix` before committing.

## Key Constraints

- **Tailwind CSS v4**: no `tailwind.config.js`; configured via `@tailwindcss/vite` plugin in `nuxt.config.ts`. Use v4 patterns for custom utilities.
- **ESM project**: `package.json` has `"type": "module"`. Tests must use `import` syntax (`.test.mjs`).
- **Static generation**: runtime-only secrets must stay server-side; verify compatibility with `npm run generate` when adding server logic.
- **`compatibilityDate: '2025-07-15'`** set in `nuxt.config.ts` — check for gated breaking changes when upgrading Nuxt or plugins.
- **Environment vars**: use `NUXT_`-prefixed variables and Nuxt runtime config (not hardcoded).
