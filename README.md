# TSCNCS Setup · TanStack Start + Convex + Netlify + CodeRabbit + Sentry

A production-ready starter template for building modern web applications with a carefully integrated stack of best-in-class tools. This template provides a clean foundation for anyone interested in this specific stack or learning how to integrate these tools correctly.

## 🎯 What's Included

This template provides a complete, production-ready setup with:

- **TanStack Start** - React framework with streaming SSR, file-based routing, and excellent DX
- **Convex** - Real-time backend with type-safe queries, mutations, and actions
- **Netlify** - Deployment configuration with preview deploys and Convex integration
- **CodeRabbit** - AI-powered code review automation for PRs
- **Sentry** - Error tracking and performance monitoring (client + server)
- **TypeScript** - Strict mode with full type safety
- **Tailwind CSS v4** - Utility-first styling with design token support
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks for pre-commit linting and pre-push validation
- **i18next** - Internationalization infrastructure (ready for ES/en)

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm (package manager)
- Netlify CLI (optional, for local testing)
- Convex account (free tier works)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd TSCNCS-Setup

# Install dependencies
pnpm install

# Start Convex development server (first time setup)
npx convex dev
# Follow prompts to create/connect a Convex project

# In a separate terminal, start the dev server
pnpm dev
```

Visit `http://localhost:3000` to see your app running.

## 📁 Important Files & Configuration

### Core Application Files

- **`src/router.tsx`** - TanStack Router configuration with Convex provider, Sentry initialization, and error boundaries
- **`src/routes/`** - File-based routing (TanStack Start convention)
  - **`src/routes/index.tsx`** - Example home page with Convex integration demo and Sentry test button
- **`src/lib/sentry.ts`** - Sentry utilities for error logging and user context
- **`convex/schema.ts`** - Convex database schema definitions
- **`convex/myFunctions.ts`** - Example Convex functions (queries, mutations, actions)

### Configuration Files

- **`vite.config.ts`** - Vite configuration with TanStack Start, Netlify, Tailwind, and Sentry plugins
- **`netlify.toml`** - Netlify deployment config with Convex deploy integration
- **`.coderabbit.yml`** - CodeRabbit AI review configuration with project-specific rules
- **`eslint.config.mjs`** - ESLint config with TanStack and Convex plugins
- **`tailwind.config.js`** - Tailwind CSS v4 configuration (ready for design tokens)
- **`tsconfig.json`** - TypeScript strict mode configuration
- **`package.json`** - All dependencies and npm scripts

### Development Tools

- **`instrument.server.mjs`** - Sentry server-side instrumentation
- **`.gitignore`** - Comprehensive ignore patterns for build outputs, env vars, and IDE files
- **`.env.local.example`** - Template for required environment variables (see setup below)

### Documentation

- **`docs/AI_Cheatsheet.md`** - Implementation status and quick reference
- **`docs/Project_Definition.md`** - Project vision and scope
- **`docs/architecture/`** - Phase-by-phase implementation guides
- **`docs/guides/`** - Setup guides for API keys, CodeRabbit, and Netlify deployment

## 🔧 Environment Variables

Create a `.env.local` file (see `.env.local.example` for template):

```bash
# Convex (Required)
CONVEX_DEPLOYMENT=your-deployment-url  # From Convex dashboard
VITE_CONVEX_URL=your-deployment-url    # Auto-set by `npx convex dev`

# Sentry (Optional - Phase 4)
VITE_SENTRY_DSN=your-sentry-dsn
SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Future phases (not required yet)
# FIRECRAWL_API_KEY=...  # Phase 2
# AUTUMN_API_KEY=...     # Phase 3
```

**For Netlify deployment**, add these in Netlify dashboard → Environment variables:
- `CONVEX_DEPLOY_KEY` (secret) - Get from Convex Dashboard → Settings → Deploy Keys
- `CONVEX_DEPLOYMENT` (public) - Your Convex deployment URL
- `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` (if using Sentry)

See `docs/guides/API_KEYS_GUIDE.md` for detailed setup instructions.

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start Convex + web dev server concurrently
pnpm dev:web          # Start only web dev server
pnpm dev:convex       # Start only Convex dev server

# Building
pnpm build            # Build for production (runs Convex codegen + Vite build)
pnpm start            # Start production server (after build)

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without changes
pnpm typecheck        # TypeScript type checking
pnpm convex:codegen    # Generate Convex TypeScript types
```

## 🛠️ Key Integrations

### TanStack Start + Convex

The router (`src/router.tsx`) integrates Convex with TanStack Query:
- Convex client provider wraps the app
- React Query configured with Convex query functions
- Type-safe queries and mutations via Convex codegen

### Sentry Integration

- **Client-side**: Initialized in `src/router.tsx` with error boundary integration
- **Server-side**: Instrumented via `instrument.server.mjs` for server-side error tracking
- **Source maps**: Configured in `vite.config.ts` for readable stack traces
- **Error boundaries**: Default error component captures exceptions automatically

### Netlify Deployment

- **Build command**: `npx convex deploy --cmd 'pnpm build'` (deploys Convex functions + builds app)
- **Preview deploys**: Configured for PR previews (requires Convex Pro for preview deploy keys)
- **Environment detection**: Automatically uses correct Convex deploy key per context

### CodeRabbit Setup

- **Auto-review**: Enabled for all PRs (except drafts)
- **Path-specific rules**: TypeScript strictness, React accessibility, Convex best practices
- **Tool integration**: ESLint and Prettier checks run automatically
- See `docs/guides/CODERABBIT_SETUP.md` for activation steps

### Git Hooks (Husky)

- **Pre-commit**: Runs `lint-staged` (ESLint + Prettier on staged files)
- **Pre-push**: Runs `convex:codegen` + `pnpm build` to catch type errors before push
- **Setup**: Husky hooks are automatically initialized when you run `pnpm install` (via the `prepare` script)

## 🎓 Learning Resources

This setup demonstrates:

1. **TanStack Start SSR** - File-based routing, streaming SSR, nested layouts
2. **Convex Integration** - Type-safe backend with real-time subscriptions
3. **Netlify Deployment** - CI/CD with preview deploys and environment management
4. **Sentry Setup** - Client + server error tracking with source maps
5. **Code Quality** - ESLint, Prettier, Husky hooks, and automated reviews
6. **TypeScript** - Strict mode with path aliases and Convex codegen

## 📚 Documentation

- **`docs/architecture/phase-0-checklist.md`** - Complete Phase 0 setup checklist
- **`docs/guides/API_KEYS_GUIDE.md`** - Step-by-step API key setup
- **`docs/guides/CODERABBIT_SETUP.md`** - CodeRabbit activation guide
- **`docs/guides/NETLIFY_DEPLOYMENT.md`** - Netlify deployment and preview setup
- **`docs/AI_Cheatsheet.md`** - Implementation status and quick reference

## 🤝 Contributing

This is a starter template, but improvements are welcome! If you find issues or have suggestions for better integration patterns, please open an issue or PR.

## 📝 License

See `LICENSE` file for details.

## 🙏 Acknowledgments

- Built with [TanStack Start](https://tanstack.com/start)
- Backend powered by [Convex](https://convex.dev)
- Deployed on [Netlify](https://netlify.com)
- Code reviews by [CodeRabbit](https://coderabbit.ai)
- Error tracking by [Sentry](https://sentry.io)

---

**Ready to build?** Start with `pnpm install && npx convex dev` and check out the documentation in `docs/` for detailed setup guides.

