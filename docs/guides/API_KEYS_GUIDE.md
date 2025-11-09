# API Keys Setup Guide

This guide walks you through obtaining all the API keys and credentials needed for development and deployment.

**Last Updated:** 

---

## Overview

The project requires several third-party services throughout its development phases. This guide is organized by phase to help you set up credentials as needed.

## Phase 0 & 1 Requirements

### 1. Convex (Required Immediately)

**Purpose:** Real-time database and backend functions

**Setup Steps:**

1. Visit [Convex Dashboard](https://dashboard.convex.dev)
2. Sign up or log in (supports GitHub, Google, or email)
3. Run `npx convex dev` in your project directory
4. Follow the interactive prompts to:
   - Create a new project or select existing
   - Choose a deployment name
   - Generate your deployment URL
5. Copy the generated values to your `.env.local`:
   ```bash
   CONVEX_DEPLOYMENT=your-deployment-url
   CONVEX_SITE_URL=http://localhost:3000
   ```

**For CI/CD Deployment (Netlify):**

Netlify builds require a deploy key to run `convex codegen`. Get your deploy key:

1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. Select your project
3. Navigate to **Settings** → **Deploy Keys**
4. Click **"Generate Deploy Key"** or copy existing key
5. Add to **Netlify**:
   - Go to your site's **Site settings** → **Build & deploy** → **Environment variables**
   - Click **"Add a variable"**
   - Key: `CONVEX_DEPLOY_KEY`
   - Value: `prod:xxxxx` (paste your deploy key)
   - **Mark as secret:** ✅ (this IS sensitive)
   - **Important:** Also add `CONVEX_DEPLOYMENT` with your deployment URL
   - Key: `CONVEX_DEPLOYMENT`
   - Value: `your-deployment-url` (e.g., `https://your-project.convex.cloud`)
   - **Mark as secret:** ❌ (this is PUBLIC - clients need this to connect)
6. Redeploy your site

**Note:** `CONVEX_DEPLOYMENT` will appear in your client bundle and that's expected. The `netlify.toml` file includes `SECRETS_SCAN_OMIT_KEYS` to prevent false-positive security warnings.

**Documentation:** [Convex Quickstart](https://docs.convex.dev/quickstart) | [Convex CI/CD](https://docs.convex.dev/production/hosting/netlify)

**Cost:** Free tier available with generous limits

---
### 2. Sentry
**Purpose:** Frontend and backend error tracking, performance monitoring

**Setup Steps:**

1. Visit [Sentry.io](https://sentry.io)
2. Sign up or log in
3. Click "Create Project"
4. Select:
   - Platform: "React"
   - Alert frequency: Your preference
   - Project name: "[Project Name]-frontend"
5. Copy the DSN from the project settings
6. Create an auth token:
   - Go to Settings → Account → API → Auth Tokens
   - Click "Create New Token"
   - Scopes: `project:read`, `project:write`, `project:releases`
   - Copy the token
7. Add to `.env.local`:
   ```bash
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

**Configuration:**

- Set up release tracking
- Configure source maps upload
- Enable performance monitoring
- Set up alerts for error thresholds

**Documentation:** [Sentry React Setup](https://docs.sentry.io/platforms/javascript/guides/react/)

**Cost:** Free tier includes 5,000 errors/month and 10,000 performance units

---

### 3. Netlify (Hosting & Deployment)

**Purpose:** Deploy TanStack Start application with SSR support

**Setup Steps:**

1. Visit [Netlify](https://www.netlify.com)
2. Sign up or log in (supports GitHub login)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository: [GitHub Organization/Account]/[Project Name]
5. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.output/public`
   - Node version: 20
6. After creation, go to Site settings → General
7. Copy your Site ID
8. Add to `.env.local`:
   ```bash
   NETLIFY_SITE_ID=your-site-id
   ```

**Environment Variables in Netlify:**

Go to Site settings → Build & deploy → Environment variables and add:

- `CONVEX_DEPLOYMENT`
- `FIRECRAWL_API_KEY`
- `AUTUMN_API_KEY`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

**Documentation:** [Netlify TanStack Start Guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/)

**Cost:** Free tier includes 100GB bandwidth/month

---

### 4. Cloudflare (CDN & Security)

**Purpose:** CDN, caching, WAF, and DDoS protection

**Setup Steps:**

1. Visit [Cloudflare](https://www.cloudflare.com)
2. Sign up or log in
3. Add your domain (if you have one)
4. Update nameservers at your domain registrar
5. Configure DNS records:
   - CNAME record pointing to your Netlify domain
   - Enable proxy (orange cloud)
6. Go to SSL/TLS → Overview
   - Set to "Full" or "Full (strict)" mode
7. Optional: Configure additional features:
   - Page Rules for caching
   - Firewall Rules
   - Bot Fight Mode
   - Web Application Firewall (WAF)

**For Development:**

If you don't have a domain yet:

- Use Netlify's provided `.netlify.app` subdomain
- Add Cloudflare later when you have a custom domain

**Documentation:** [Cloudflare Developers](https://developers.cloudflare.com/)

**Cost:** Free tier includes CDN, DDoS protection, and basic features

---

## Security Best Practices

### Environment Variables

1. **Never commit** `.env.local` to git (already in `.gitignore`)
2. **Always use** `.env.local.example` to document required variables
3. **Rotate keys** if accidentally exposed
4. **Use different keys** for development, staging, and production

### Key Management

- Store production keys in:
  - Netlify environment variables (for frontend)
  - Convex environment variables (for backend)
  - Never in code or git
- Use separate accounts/projects for:
  - Development environment
  - Production environment


---

## Troubleshooting

### Convex Connection Issues

**Problem:** `npx convex dev` fails to connect

**Solutions:**

1. Check your internet connection
2. Verify you're logged in: `npx convex login`
3. Check firewall settings (allow Convex domains)
4. Try clearing Convex cache: `rm -rf .convex`

### Convex Auth Errors

**Problem:** Authentication fails or redirects incorrectly

**Solutions:**

1. Verify OAuth redirect URLs match your configuration
2. Check that OAuth provider credentials are correct in `.env.local`
3. Ensure `convex/auth.config.ts` is properly configured
4. Check Convex function logs for authentication errors
5. Clear browser cookies and try again

### API Rate Limits

**Problem:** Firecrawl or other APIs return rate limit errors

**Solutions:**

1. Implement exponential backoff in your code
2. Cache responses to reduce API calls
3. Upgrade to paid tier if needed for production
4. Use request queuing to avoid burst limits

### Build Failures on Netlify

**Problem:** Deployment fails during build

**Solutions:**

1. Check that all environment variables are set
2. Verify Node version matches (20)
3. Check build logs for specific errors
4. Test build locally: `pnpm build`
5. Ensure pnpm is enabled in Netlify settings

---

## Support & Resources

- **Convex:** [Discord Community](https://discord.gg/convex)
- **Convex Auth:** [Documentation](https://labs.convex.dev/auth)
- **Sentry:** [Community Forum](https://forum.sentry.io)
- **Netlify:** [Support Docs](https://docs.netlify.com)
- **Cloudflare:** [Community](https://community.cloudflare.com)

---

Once all services are configured, verify your `.env.local` file matches the template in `.env.local.example` with all values filled in.

**Happy building! 🚀**
