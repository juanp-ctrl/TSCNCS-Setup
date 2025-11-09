# Technical Architecture Overview

## Purpose

[Project Description]

## Guiding Principles

- **One-task-at-a-time delivery**: Each phase is sliced into atomic, verifiable Cursor tasks to align with hackathon judging criteria around velocity and clarity.
- **End-to-end observability**: Bake in Sentry error tracing and Cloudflare analytics from the start to prove stability.[^sentry][^cloudflare]
- **Server-driven UX**: Lean on TanStack Start for streaming-first routes and Convex functions for real-time data mutations, deferring heavy client state until needed.[^tanstack-start][^convex]
- **Code quality automation**: Use CodeRabbit for AI-assisted PR reviews and enforce Husky git hooks with lint/format checks before pushes, avoiding test scaffolding until a later phase per requirements.[^coderabbit]

## Stack Summary


## Phase Map

1. **Phase 0 – Environment & Tooling Guardrails** (`phase-0-environment.md`)  
...

Each phase document follows a consistent template: goals, deliverables, prerequisites, detailed task queue, integration notes, definition of done, and risks.

## URL & i18n Strategy

- Locale-prefixed paths are the source of truth for public routes: `/{locale}/...` (e.g., `/es/explore`, `/en/foundations/{slug}`).
- Root `/` performs a server-side redirect to `/{locale}` using preference cookie → `Accept-Language` → fallback `es`.
- A `locale` cookie (1-year) is stored as a preference only; pages must not depend on cookies for localization.
- Language switcher updates the URL segment (navigates between `/es/...` and `/en/...`) and refreshes the preference cookie.
- SEO: emit `link rel="alternate" hreflang="es|en|x-default"` for localized pages; generate per-locale sitemaps with an index.
- Accessibility: set `<html lang>` from the route param and announce language changes.
- Caching: favor path-keyed variants at Cloudflare/Netlify; avoid `Vary: Cookie` for localized pages (OK for the root `/` redirect response only).

## Environment Strategy

- **Workspace**: Cursor with Claude Haiku/Sonnet for assisted coding; enforce Prettier/ESLint and Husky hooks to prevent regressions.
- **Secrets management**: `.env.local` for local Convex keys, Netlify environment variables for deploy pipeline.
- **Branches**: Feature commits in develop branch per phase milestone, merged via CodeRabbit-reviewed PRs to main.

## Deployment & Runtime

- **Netlify**: Use TanStack Start build adapter guide for SSR/Edge functions, with preview deploys for each PR.[^netlify]
- **Cloudflare**: Configure DNS + caching rules, leverage Turnstile or Firewall Rules if traffic filtering is needed for the demo.[^cloudflare]
- **Sentry**: Initialize with DSN in Phase 4, tag releases per Netlify deploy ID to correlate errors with builds.[^sentry]

## Security & Compliance


## Collaboration Model

- Maintain a running changelog per phase to guide the AI development process.
- Use Cursor TODOs to track atomic tasks derived from the phase documents.
- De-scope optional features if they threaten timeline; phases are prioritized per MVP order defined in `docs/Project_Definition.md`.

[^tanstack-start]: <https://tanstack.com/start/latest/docs/framework/react/overview>

[^tanstack-router]: <https://tanstack.com/router/latest/docs/framework/react/overview>

[^convex]: <https://docs.convex.dev/quickstart/tanstack-start>

[^coderabbit]: <https://docs.coderabbit.ai/getting-started/quickstart>

[^netlify]: <https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/>

[^sentry]: <https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/>
