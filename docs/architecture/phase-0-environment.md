# Phase 0 · Environment & Tooling Guardrails

## Overview

Lay the groundwork for a productive Cursor + Claude workflow by scaffolding the TanStack Start project, enforcing git hygiene, and wiring AI/dev tooling. This phase produces a clean baseline so future phases can focus exclusively on feature delivery.

## Goals

- Spin up a TanStack Start + Convex-ready repository template.
- Configure Husky hooks for `pre-commit` (lint/format) and `pre-push` (typecheck placeholder) without introducing test runners yet.
- Establish shared developer tooling: Prettier, ESLint, CodeRabbit, Sentry DSN placeholder, Netlify CLI.
- Document workspace conventions for Cursor task execution.

## Deliverables

- Initialized TanStack Start project with TypeScript and streaming SSR defaults.
- Convex project bootstrap (`npx convex dev` ready) with `.env.local.example`.
- Husky hook scripts plus lint-staged configuration.
- CodeRabbit config file aligned with hackathon best practices.
- `docs/architecture/phase-0-checklist.md` (generated during execution) capturing completed setup commands.

## Prerequisites

- Node.js ≥ 20
- pnpm
- Netlify CLI installed globally (`pnpm install -g netlify-cli`)
- GitHub repository: [Repository URL]

## Task Queue (Cursor-friendly steps)

1. **Scaffold TanStack Start app**
   ```bash
   pnpm create @tanstack/start@latest [Project Name]-web
   ```
   Follow prompts for React, TypeScript, ESLint, and choose “Convex” template when available.[^tanstack-start][^convex]
2. **Install workspace dependencies**
   - `pnpm add -D husky lint-staged prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
   - Ensure Convex dev dependency is present (`pnpm add convex@latest`)
   - Install i18n dependencies for Phase 1 (verified TanStack Start SSR compatible):[^i18n]
     - `pnpm add i18next react-i18next@^13.0.0 i18next-browser-languagedetector`
     - Note: Use `react-i18next` v13+ for React 18 streaming SSR support required by TanStack Start
     - Optional: `i18next-http-backend` if loading translations from external endpoints (can defer)
3. **Configure Husky**
   - `pnpm dlx husky init`
   - `pre-commit`: run `pnpm lint` + `pnpm format:check`
   - `pre-push`: run Convex type generation (`pnpm convex codegen`) and `pnpm build` (placeholder for now).[^coderabbit]
4. **Set up lint-staged + scripts**  
   Update `package.json` with `lint`, `format`, `format:check`, and lint-staged config targeting `.ts`, `.tsx`, `.md`.
5. **Bootstrap Convex project**
   - `npx convex dev --once` to initialize.
   - Add `.env.local.example` with `CONVEX_DEPLOYMENT`, `CONVEX_SITE_URL`, placeholders.
6. **Establish CodeRabbit config**
   - Add `.coderabbit.yml` with rules for pull-request review scopes, enforce passing Husky hooks before PR merge.[^coderabbit]
7. **Prepare Netlify & Cloudflare placeholders**
   - Add `netlify.toml` referencing TanStack Start adapter.
   - Document required environment variables for upcoming phases.
8. **Seed Sentry integration scaffolding**
   - Install `@sentry/tanstack-start` (Phase 4 will complete wiring).
   - Add `.env.local.example` entry `SENTRY_DSN=`.[^sentry]
9. **Record outcomes**
   - Create `docs/architecture/phase-0-checklist.md` summarizing commands run, package versions, and decisions.
10. Create README file

## Integration Notes

- Convex project initialization must precede any schema authoring in Phase 2.[^convex]
- Husky hooks should remain fast (<5s) to avoid slowing Cursor iterations.
- CodeRabbit requires repository hooks or GitHub App installation prior to PR usage.[^coderabbit]

## Definition of Done

- `pnpm lint` and `pnpm build` succeed locally.
- Husky hooks execute automatically on commit/push.
- Convex dashboard accessible with local credentials (no data yet).
- Checklist document pushed to repo.

## Risks & Mitigations

- **Tooling drift**: Pin dependency versions in `package.json`.
- **Slow hooks**: Limit pre-commit to staged files via lint-staged, revisit when tests arrive.
- **Misconfigured Convex env**: Keep `.env.local.example` updated and referenced in onboarding docs.

[^tanstack-start]: https://tanstack.com/start/latest/docs/framework/react/overview

[^convex]: https://docs.convex.dev/quickstart/tanstack-start

[^coderabbit]: https://docs.coderabbit.ai/getting-started/quickstart

[^i18n]: https://react.i18next.com/ and https://www.i18next.com/overview/getting-started

[^sentry]: https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/
