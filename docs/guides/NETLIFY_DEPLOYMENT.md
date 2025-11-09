# Netlify Deployment Guide

## Overview

This guide explains how to properly configure Netlify deployments for [Project Name], including handling different Convex deploy keys for production vs. preview environments.

## The Deploy Preview Issue

If you're seeing this error in Netlify build logs:

```
✖ Detected a non-production build environment and "CONVEX_DEPLOY_KEY" for a production Convex deployment.
This is probably unintentional.
```

**What's happening:** You're using your **production** Convex deploy key for **deploy previews**. Convex detects this as a security risk because preview builds should use a separate preview deployment, not your production database.

## Solutions

Convex supports different deploy keys for different environments:

- **Production Deploy Key** → Production deployments only (available on all plans)
- **Preview Deploy Key** → Deploy previews, branch deploys, and non-production builds (requires Convex Pro plan)

**Choose your solution based on your Convex plan:**

### Option 1: Use Preview Deploy Key (Requires Convex Pro Plan)

This is the safest approach and what Convex recommends, but requires a paid plan.

#### Step 1: Get Your Preview Deploy Key

1. Go to your Convex dashboard: [https://dashboard.convex.dev](https://dashboard.convex.dev)
2. Select your project
3. Go to **Settings** → **Deploy Keys**
4. You'll see two keys:
   - **Production Deploy Key** (for main/production)
   - **Preview Deploy Key** (for previews/branches) only available on the Pro plan
5. Copy the **Preview Deploy Key**

#### Step 2: Update Netlify Environment Variables

Go to Netlify: **Site settings** → **Environment variables** → `CONVEX_DEPLOY_KEY`

Set different values for different contexts:

| Deploy Context                      | Key to Use            | Notes                             |
| ----------------------------------- | --------------------- | --------------------------------- |
| **Production**                      | Production Deploy Key | Your main production deployment   |
| **Deploy Previews**                 | Preview Deploy Key    | ✅ Use preview key                |
| **Branch deploys**                  | Preview Deploy Key    | ✅ Use preview key                |
| **Preview Server & Agent Runners**  | Preview Deploy Key    | ✅ Use preview key                |
| **Local development (Netlify CLI)** | (Empty)               | Not needed - use `npx convex dev` |


#### Step 3: Verify Configuration

After updating, your next PR will trigger a deploy preview that should succeed.

---

### Option 2: Disable Deploy Previews (Recommended for Free Convex Plan)

**Important:** Convex Preview Deploy Keys are only available on the Convex Pro plan. If you're on the free plan, you should disable deploy previews to avoid build failures.

#### How to Disable in Netlify UI

1. Go to your Netlify site dashboard
2. Navigate to **Project configuration** → **Build & deploy**
3. Scroll to **Branches and deploy contexts** section
4. Click **Configure**
5. Find **Deploy Previews** and select **Don't deploy pull requests**
6. Optionally disable **Branch deploys** as well (Deploy only the production branch)
7. Click **Save**

**Result:** Netlify will stop attempting to create preview deployments for PRs, preventing the "non-production build environment" error.

**Trade-off:** You lose the ability to preview changes before merging to main. You'll need to merge to `main` to see changes deployed.

---

## Understanding Deploy Contexts

Netlify has different contexts for different types of deployments:

| Context                            | When It Runs                      | Environment            |
| ---------------------------------- | --------------------------------- | ---------------------- |
| **Production**                     | Push to `main` branch             | Production (live site) |
| **Deploy Previews**                | Pull Requests                     | Preview (temporary)    |
| **Branch deploys**                 | Push to non-main branches         | Preview (temporary)    |
| **Preview Server & Agent Runners** | Internal Netlify preview features | Preview (temporary)    |
| **Local development**              | Using Netlify CLI (`netlify dev`) | Local (your machine)   |

---

## Best Practices

### 1. Use Separate Deploy Keys

✅ **Do:** Use preview key for previews, production key for production  
❌ **Don't:** Use production key everywhere

### 2. Never Commit Deploy Keys

✅ **Do:** Store in Netlify environment variables  
❌ **Don't:** Put in `.env.local` or commit to git

### 3. Keep CONVEX_DEPLOYMENT Public

`CONVEX_DEPLOYMENT` is your Convex deployment URL (e.g., `https://your-project.convex.cloud`). This is **public** and safe to expose in your client bundle.

We've already excluded it from Netlify's secrets scanning:

```toml
[build.environment]
  SECRETS_SCAN_OMIT_KEYS = "CONVEX_DEPLOYMENT"
```

### 4. Test Preview Deploys

After setting up preview keys:

1. Create a test branch
2. Open a PR
3. Wait for Netlify to deploy
4. Verify the preview works correctly

---

## Common Issues

### Issue: "CONVEX_DEPLOY_KEY is not set"

**Cause:** Deploy key missing for the current context  
**Fix:** Add the key in Netlify environment variables for that context

### Issue: "Detected a non-production build environment"

**Cause:** Using production key for preview/branch deploys  
**Fix:** Use preview deploy key (see Option 1 above)

### Issue: Deploy preview fails but production works

**Cause:** Different keys or missing keys for preview context  
**Fix:** Ensure preview deploy key is set for "Deploy Previews" context

---

## Pricing Note

### Netlify Pricing

**Deploy previews are FREE on Netlify's free tier!** You don't need Netlify Pro for this feature.

However, be aware of build minutes limits:

- Free tier: 300 build minutes/month
- Pro tier: 25,000 build minutes/month

Each PR creates a preview deploy, which uses build minutes.

### Convex Pricing

**Preview Deploy Keys require Convex Pro plan.**

- **Free Plan:** Only production deploy keys available
- **Pro Plan:** Both production and preview deploy keys available

If you're on the free Convex plan, you must disable deploy previews in Netlify (see Option 2 above).

---

## Configuration Reference

### netlify.toml

```toml
[build]
  command = "npx convex deploy --cmd 'pnpm build'"
  publish = "dist/client"

[build.environment]
  NODE_VERSION = "20"
  SECRETS_SCAN_OMIT_KEYS = "CONVEX_DEPLOYMENT"

# Preview deploy configuration
[context.deploy-preview]
  command = "npx convex deploy --cmd 'pnpm build'"

# Production deploy configuration
[context.production]
  command = "npx convex deploy --cmd 'pnpm build'"
```

The `npx convex deploy` command automatically:

1. Detects which environment it's running in
2. Uses the appropriate `CONVEX_DEPLOY_KEY`
3. Deploys your Convex functions
4. Runs your build command (`pnpm build`)

---

## Getting Help

- **Convex Deploy Keys:** [Convex Docs - Deploy Keys](https://docs.convex.dev/production/hosting/netlify)
- **Netlify Environment Variables:** [Netlify Docs](https://docs.netlify.com/environment-variables/overview/)
- **Build Contexts:** [Netlify Docs - Deploy Contexts](https://docs.netlify.com/site-deploys/overview/#deploy-contexts)

---

## Summary

### If You Have Convex Pro Plan

1. **Get preview deploy key** from Convex dashboard
2. **Update Netlify env vars** to use preview key for non-production contexts
3. **Test with a PR** to verify preview deploys work
4. **Use production key only for production** context

This ensures:

- ✅ Preview builds don't affect production data
- ✅ Security best practices
- ✅ Proper separation of environments

### If You Have Convex Free Plan (Recommended)

1. **Disable deploy previews** in Netlify (Site settings → Build & deploy → Deploy contexts)
2. **Keep production deploy key** for main branch only
3. **Test changes locally** before merging to main
4. **Merge to main** to see changes in production

This ensures:

- ✅ No build failures from missing preview keys
- ✅ Simpler deployment workflow
- ✅ Production-only deployments work correctly
