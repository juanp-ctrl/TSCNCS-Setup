# [Project Name] · Project Definition

## GOAL STATEMENT

[Project Description]

---

## SCOPE DEFINITION

### CORE FEATURES (MVP)

[List of core features]

---

## TECHNICAL ARCHITECTURE

### Tech Stack

[List of technologies]

### Design System

- **Color Palette:** [Color Palette]
- **Typography:** [Typography]
- **Spacing & Layout:** [Spacing & Layout]
- **UI Primitives:** [UI Primitives]

---

## DEVELOPMENT PHASES

### Phase 0: Environment & Tooling Guardrails

**Goals:**

[List of goals]

**Deliverables:**

- Initialized TanStack Start project with TypeScript and streaming SSR
- Convex project bootstrap with `.env.local.example`
- Husky hook scripts plus lint-staged configuration
- [List of deliverables]

**Definition of Done:**

- `pnpm lint` and `pnpm build` succeed locally
- Husky hooks execute automatically on commit/push
- Convex dashboard accessible with local credentials
- First successful Netlify deploy

---

## SECURITY & COMPLIANCE

### Data Protection


### Authentication & Authorization


### Infrastructure Security

- **Environment Variables:** `.env.local` for local, Netlify environment variables for deploy
- **Cloudflare WAF:** Traffic filtering and bot mitigation for demo
- **SSL/TLS:** Netlify-managed certificates with Cloudflare in proxied mode

---

## COLLABORATION & QUALITY

### Code Quality

- **Linting:** ESLint with TypeScript rules
- **Formatting:** Prettier with workspace-specific config
- **Type Safety:** TypeScript strict mode with Convex codegen
- **Git Hooks:** Husky pre-commit (lint/format) and pre-push (typecheck/build)
- **AI Code Review:** CodeRabbit for PR reviews

### Development Workflow

- **Branch Strategy:** Feature branches per phase milestone, merged via CodeRabbit-reviewed PRs to `main`
- **CI/CD:** Netlify preview deploys for each PR, production deploys from `main`
- **Documentation:** Architecture decision logs per phase (`phase-*-decisions.md`)

### Testing Strategy

- **Manual QA:** Smoke-test notes aligned with definition of done per phase
- **Performance:** Lighthouse CLI for automated performance audits
- **Accessibility:** axe-core CLI for accessibility compliance
- **Observability:** Sentry error tracking with release health monitoring

---

## ENVIRONMENT SETUP

### Required Tools

- Node.js ≥ 20
- pnpm (package manager)
- Netlify CLI (`pnpm install -g netlify-cli`)
- Convex CLI (via `npx convex dev`)

### Environment Variables

See `.env.local.example` for required variables:

- `CONVEX_DEPLOYMENT`
- `CONVEX_SITE_URL`
- `NETLIFY_SITE_ID`
- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`
- [List of environment variables]

### Local Development

```bash
# Install dependencies
pnpm install

# Start Convex dev server
npx convex dev

# Start TanStack Start dev server
pnpm dev

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Build for production
pnpm build
```

---

## PROJECT STRUCTURE

```
[Project Name]/
├── app/                    # TanStack Start application
│   ├── routes/            # File-based routing
│   ├── lib/               # Utilities and adapters
│   │   ├── i18n/         # Internationalization config
│   │   ├── api.ts        # Convex client adapters
│   └── styles/           # Global styles and Tailwind config
├── convex/                # Convex backend
│   ├── schema.ts         # Database schema definitions
│   ├── functions/        # Queries, mutations, actions
│   ├── auth.ts           # Authentication middleware
├── docs/                  # Documentation
│   ├── architecture/     # Phase documentation
│   └── Project_Definition.md  # This file
└── netlify.toml          # Netlify deployment config
```
---

**Last Updated:**  
**Platform:** [Project Name]  
**Repository:** [Repository URL]
