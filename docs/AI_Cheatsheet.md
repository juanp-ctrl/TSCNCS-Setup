# [Project Name] - AI Implementation Cheatsheet (Source of Truth)

Purpose: Fast reference for AI/devs to know what exists, what’s next, and how to update status after each change. Keep this file current.

Last updated: [Date]

## 1) Project Snapshot

## 2) Implementation Status (High-Level)

- [List of implementation status]


## 3) Phase Checklist (Definition of Done Summary)



## 4) Open Decisions (resolve before building)



## 5) Environment & Commands

Prereqs:

- Node 20+, pnpm, Netlify CLI, Convex CLI

Core commands:

```bash
pnpm install
npx convex dev
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Env vars (phase-gated; keep `.env.local.example` current):

- VITE_CONVEX_URL (auto-set by `npx convex dev`, PUBLIC value used by client)
- CONVEX_DEPLOYMENT (PUBLIC - your Convex deployment URL, safe to appear in client bundle)
- CONVEX_DEPLOY_KEY (SECRET - required for Netlify builds, get from Convex Dashboard → Settings → Deploy Keys)
- SENTRY_DSN (PUBLIC - Phase 4+, safe to expose)

Note: `CONVEX_DEPLOYMENT` is excluded from Netlify secrets scanning via `SECRETS_SCAN_OMIT_KEYS` in `netlify.toml`

## 6) Update Policy (Required)

- After every implementation/edit, update:  
  - Section 2 (Implementation Status)
  - Relevant Phase status in Section 3
  - Close or add items in Section 4 if decisions changed
- Add PR/commit links next to updated bullets.
- If you add/remove features or deliverables, reflect that here and in the phase doc.

## 7) Pointers

- Vision & scope: `docs/Project_Definition.md`
- Architecture by phase: `docs/architecture/`
- Detailed design tokens & UX: `docs/Design.md`
- AI quick design reference: `docs/Design_AI_QuickRef.md`
- Tokens schema for programmatic consumption: `docs/design/tokens.schema.json`
- Setup guides: `docs/guides/` (CodeRabbit, API keys, Netlify deployment)
- Repo (external): [Repository URL]
