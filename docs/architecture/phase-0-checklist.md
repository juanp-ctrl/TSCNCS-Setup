# Phase 0 Implementation Checklist

**Status:** To Do  
**Date:** 

## Overview

This document outlines the setup tasks to complete for Phase 0: Environment & Tooling Guardrails. It serves as a checklist for implementation details and decisions to be made during the initial project setup.

## Tasks to Complete

### 1. Git Repository Initialization

- Initialize git repository with `git init`
- Connect remote repository: `remote repository URL`
- Create comprehensive `.gitignore` file

### 2. TanStack Start + Convex Project Scaffold

- Use official Convex TanStack Start template
- Command: `npm create convex@latest -- -t tanstack-start`
- Project structure should include:
  - `src/` directory with TanStack Start routing
  - `convex/` directory with initial schema
  - `public/` directory with static assets
  - `docs/` directory with documentation
  - `package.json` with dependencies and scripts
  - `pnpm-lock.yaml` with dependency lock file
  - `tsconfig.json` with TypeScript configuration
  - `vite.config.ts` with Vite configuration
  - `tailwind.config.js` with Tailwind CSS configuration
  - Pre-configured streaming SSR setup
  - File-based routing structure

### 3. Install Core Dependencies

**Production Dependencies:**

- `@convex-dev/react-query` ^0.0.0-alpha.11
- `@tanstack/react-query` ^5.89.0
- `@tanstack/react-router` ^1.132.2
- `@tanstack/react-router-with-query` ^1.130.17
- `@tanstack/react-start` ^1.132.2
- `convex` ^1.28.0
- `react` ^19.1.1
- `react-dom` ^19.1.1
- `i18next` ^25.6.1
- `react-i18next` ^13.5.0 (React 18 streaming SSR compatible)
- `i18next-browser-languagedetector` ^8.2.0
- `@sentry/react` ^10.23.0

**Dev Dependencies:**

- `husky` ^9.1.7
- `lint-staged` ^16.2.6
- `prettier` ^3.6.2
- `@typescript-eslint/eslint-plugin` ^8.46.3
- `@typescript-eslint/parser` ^8.46.3
- `tailwindcss` ^4.1.13
- `@tailwindcss/vite` ^4.1.13
- `postcss` ^8.5.6
- `autoprefixer` ^10.4.21
- TypeScript ^5.9.2
- Vite ^7.1.5

### 4. Configure Husky Git Hooks

**Pre-commit Hook (`.husky/pre-commit`):**

```bash
#!/bin/sh
pnpm lint-staged
```

**Pre-push Hook (`.husky/pre-push`):**

```bash
#!/bin/sh
pnpm convex:codegen
pnpm build
```

**Package.json Scripts to Add:**

- `format`: Format all TypeScript, Markdown, and JSON files
- `format:check`: Check formatting without changes
- `lint`: ESLint with TypeScript extensions
- `typecheck`: TypeScript type checking
- `convex:codegen`: Convex type generation

**lint-staged Configuration:**

- TypeScript files: ESLint + Prettier
- Markdown/JSON files: Prettier only

### 5. Bootstrap Convex Project

- Ensure Convex directory structure is in place from template
- Create initial schema file: `convex/schema.ts`
- Create sample functions file: `convex/myFunctions.ts`
- **Activate Convex deployment**: Run `npx convex dev`, connect deployment, and configure `CONVEX_DEPLOYMENT` in `.env.local`
- Verify development server can be started with `npx convex dev` or `pnpm dev`

### 6. Setup Environment Variables

**Files to Create:**

- `.env.local.example` - Template with all required variables
- `.env.local` - Local environment with required API keys

**Variables to Document:**

- `CONVEX_DEPLOYMENT` - From Convex dashboard
- `CONVEX_SITE_URL` - Application URL
- `FIRECRAWL_API_KEY` - Content ingestion (Phase 2)
- `AUTUMN_API_KEY` - Pricing/billing (Phase 3)
- `CLERK_PUBLISHABLE_KEY` - Authentication (Phase 2)
- `CLERK_SECRET_KEY` - Authentication (Phase 2)
- `SENTRY_DSN` - Error monitoring (Phase 4)
- `SENTRY_AUTH_TOKEN` - Sentry API access (Phase 4)
- `NETLIFY_SITE_ID` - Deployment (Phase 4)

**⚠️ Important Note for AI Agents:**

- **Environment variables need to be configured**: Create the `.env.local` file with the necessary keys for development. AI agents do NOT have access to `.env.local` (it's gitignored), but should verify setup status by checking this checklist section 6.
- **Convex needs to be activated**: Run `npx convex dev` to connect deployment and set the `CONVEX_DEPLOYMENT` variable in `.env.local`.
- **Verify environment variable setup**: Check this checklist section 6 to confirm current status before proceeding with development.

### 7. Configure CodeRabbit

**File:** `.coderabbit.yml`

**Features to Enable:**

- Auto-review on PRs (excluding drafts)
- High-level summaries
- Path-specific instructions for:
  - TypeScript files: Strict mode compliance
  - React components: Accessibility and i18n
  - Convex files: Schema validation and auth
  - Documentation: Up-to-date checks
- ESLint and Prettier tool integration
- Auto-reply in chat

**Status: To Activate**

- Create and commit configuration file
- Connect GitHub repository to CodeRabbit service
- Enable automatic PR reviews
- See `docs/guides/CODERABBIT_SETUP.md` for configuration details

### 8. Configure Netlify

**File:** `netlify.toml`

**Configuration to Set:**

- Build command: `pnpm build`
- Publish directory: `.output/public`
- Node version: 20
- Configure SPA redirects
- Set up context-specific builds for:
  - Production
  - Preview deploys
  - Branch deploys

### 9. Configure Tailwind CSS

**Files to Create:**

- `tailwind.config.js` - Main configuration with content paths
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer

**Setup to Complete:**

- Configure content paths to point to `src/**/*.{ts,tsx}`
- Prepare theme extend section for Phase 1 design tokens
- Set up plugins array for future extensions

### 10. Create Sentry Scaffolding

**File:** `src/lib/sentry.ts`

**Placeholder Functions to Create:**

- `initSentry()` - Application initialization
- `logError()` - Error capture utility

**Documentation to Include:**

- Phase 4 implementation notes
- Environment variable requirements
- PII redaction reminders
- Performance monitoring placeholders

### 11. Create Project Documentation

**This File:** `docs/architecture/phase-0-checklist.md`

**Additional Files to Create:**

- `docs/guides/API_KEYS_GUIDE.md` - API key generation guide
- `docs/guides/CODERABBIT_SETUP.md` - CodeRabbit activation guide
- `docs/guides/NETLIFY_DEPLOYMENT.md` - Netlify deployment and preview setup

### 12. Create Repository README

**File:** `README.md`

**Sections to Include:**

- Project overview
- Quick start instructions
- Development commands
- Environment setup
- Documentation links

## Package Manager

**Choice:** pnpm v10.20.0

**Rationale:**

- Faster than npm/yarn
- Efficient disk space usage
- Better monorepo support for future scaling
- Official Convex template support

## Technology Versions

| Package        | Version | Notes            |
| -------------- | ------- | ---------------- |
| Node.js        | ≥20     | Required         |
| pnpm           | 10.20.0 | Package manager  |
| React          | 19.1.1  | Latest stable    |
| TypeScript     | 5.9.2   | Strict mode      |
| TanStack Start | 1.132.2 | SSR framework    |
| Convex         | 1.28.0  | Realtime backend |
| Tailwind CSS   | 4.1.13  | Latest v4        |
| Vite           | 7.1.5   | Build tool       |

## Directory Structure to Create

```
/[Project Name]/
├── .git/                      # Git repository
├── .husky/                    # Git hooks
│   ├── pre-commit            # Lint-staged
│   └── pre-push              # Build validation
├── src/                       # TanStack Start application
│   ├── lib/                  # Utilities
│   │   └── sentry.ts        # Sentry placeholder
│   ├── routes/               # File-based routing
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Home page
│   │   └── anotherPage.tsx  # Example page
│   ├── styles/               # Global styles
│   │   └── app.css          # Application CSS
│   ├── router.tsx            # Router configuration
│   └── routeTree.gen.ts     # Generated route tree
├── convex/                    # Convex backend
│   ├── _generated/           # Generated types
│   ├── schema.ts            # Database schema
│   ├── myFunctions.ts       # Sample functions
│   └── tsconfig.json        # Convex TypeScript config
├── docs/                      # Documentation
│   ├── architecture/         # Phase docs
│   │   └── phase-0-checklist.md  # This file
│   ├── Design.md             # Design system
│   └── API_KEYS_GUIDE.md    # API key setup
├── public/                    # Static assets
│   └── *.png, *.ico         # Favicons
├── .coderabbit.yml           # CodeRabbit config
├── .env.local                # Local environment (gitignored)
├── .env.local.example        # Environment template
├── .gitignore                # Git ignore rules
├── eslint.config.mjs         # ESLint configuration
├── netlify.toml              # Netlify config
├── package.json              # Dependencies and scripts
├── pnpm-lock.yaml            # Dependency lock file
├── postcss.config.js         # PostCSS config
├── README.md                 # Project README
├── tailwind.config.js        # Tailwind config
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite configuration
```

## Phase 0 Setup Status

**Phase 0 tasks to complete:**

- Activate and connect Convex deployment
- Configure environment variables in `.env.local`
- Activate CodeRabbit and enable automatic PR reviews
  - Connect to GitHub repository
  - Enable automatic PR reviews
  - See `docs/guides/CODERABBIT_SETUP.md` for configuration details

**⚠️ Important Note for AI Agents:**

- **Convex and environment variables need setup**: Both need to be configured and activated. Check this checklist to verify setup status before proceeding.
- The `.env.local` file will be gitignored (AI agents cannot read it). Use this checklist to track setup progress.

### 3. Verify Installation

```bash
# Install dependencies (if not already done)
pnpm install

# Check linting
pnpm lint

# Check formatting
pnpm format:check

# Verify build
pnpm build
```

### 4. Start Development

```bash
# Terminal 1: Start Convex dev server
npx convex dev

# Terminal 2: Start web dev server
pnpm dev
```

Or use the combined command:

```bash
pnpm dev
```

## Definition of Done - Phase 0

- [ ] `pnpm install` succeeds without errors
- [ ] `pnpm lint` ready to run (requires running dev server first)
- [ ] `pnpm build` configured correctly
- [ ] Husky hooks installed and executable
- [ ] Convex directory structure in place
- [ ] `.env.local.example` documents all required keys
- [ ] Git repository connected to remote
- [ ] CodeRabbit activated and reviewing PRs
- [ ] Phase 0 checklist document created
- [ ] AI Cheatsheet updated
- [ ] Setup guides organized in `docs/guides/`

## Known Issues / Notes

1. **TypeScript Peer Dependency Warning:** The `@convex-dev/eslint-plugin` has peer dependency warnings with TypeScript 5.9.3. This is non-blocking and will be addressed if it causes issues.

2. **Convex Interactive Setup:** The `npx convex dev` command requires interactive terminal input for login. User must complete this step manually.

3. **Tailwind v4:** The template uses Tailwind CSS v4 which has different tooling than v3. Configuration is prepared for Phase 1 token implementation.

4. **Deprecated Dependencies:** The template includes deprecated subdependencies (lucia@3.2.2, oslo@1.2.1). These are indirect dependencies and will be updated by the Convex template maintainers.

5. **Netlify Deploy Previews:** Requires Convex preview deploy key (Convex Pro plan only). For free plan users, disable deploy previews in Netlify to avoid build failures. See `docs/guides/NETLIFY_DEPLOYMENT.md` for instructions.

## References

- [Convex TanStack Start Template](https://github.com/get-convex/templates/tree/main/template-tanstack-start)
- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [Convex Documentation](https://docs.convex.dev)
- [CodeRabbit Documentation](https://docs.coderabbit.ai/overview/introduction)
- [Netlify Documentation](https://docs.netlify.com)
- [Convex Deploy Keys](https://docs.convex.dev/production/hosting/netlify)

---

**Phase 0 Status:** To Do  
**Ready for Phase 1:** No  
**Blockers:** None