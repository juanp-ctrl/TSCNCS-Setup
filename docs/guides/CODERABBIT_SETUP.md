# CodeRabbit Setup Guide

## Overview

CodeRabbit is an AI-powered code review service that automatically reviews Pull Requests on GitHub. It's already configured in this project via `.coderabbit.yml`, but you need to connect it to your GitHub repository to activate it.

## What CodeRabbit Does

- 🔍 **Automated PR Reviews**: Reviews every pull request automatically
- 💬 **Context-Aware Analysis**: Understands your codebase architecture and patterns
- 🎯 **Custom Rules**: Uses `.coderabbit.yml` to apply project-specific guidelines
- 🤖 **Interactive Chat**: Reply to CodeRabbit comments to refine reviews
- 🔧 **Tool Integration**: Runs ESLint, Prettier, and other linters
- 📊 **Summaries**: Provides PR summaries, walkthroughs, and diagrams

## Current Configuration

Your `.coderabbit.yml` is already set up with [Project Name]-specific rules:

```yaml
language: "en-US"
reviews:
  auto_review:
    enabled: true
    drafts: false
  request_changes_workflow: false
  high_level_summary: true
  poem: false
  review_status: true
  collapse_walkthrough: false
  path_instructions:
    - path: "**/*.ts"
      instructions: "Ensure TypeScript strict mode compliance and proper type safety"
    - path: "**/*.tsx"
      instructions: "Verify accessibility, responsive design, and i18n translation key usage"
    - path: "convex/**"
      instructions: "Check schema validation, index usage, and auth guards"
    - path: "docs/**"
      instructions: "Ensure documentation is up-to-date with implementation changes"
  tools:
    eslint:
      enabled: true
    prettier:
      enabled: true
chat:
  auto_reply: true
```

## Setup Steps

### 1. Sign Up for CodeRabbit

1. Go to [https://coderabbit.ai](https://coderabbit.ai)
2. Click **"Sign up"** or **"Get Started"**
3. Choose **"Sign in with GitHub"**
4. Authorize CodeRabbit to access your GitHub account

### 2. Connect Your Repository

1. Once signed in, you'll see your GitHub organizations/accounts
2. Select the organization or account where [Project Name] repository lives ([GitHub Organization/Account])
3. Choose **"Add Repository"** or **"Configure"**
4. Select the [Project Name] repository
5. Grant CodeRabbit permissions:
   - ✅ Read access to code
   - ✅ Write access to pull requests (for comments)
   - ✅ Read access to metadata

### 3. Verify Configuration

1. CodeRabbit will automatically detect your `.coderabbit.yml` file
2. No additional configuration needed—it's ready to use!
3. You can review/modify settings at [https://app.coderabbit.ai](https://app.coderabbit.ai)

### 4. Test the Integration

Create a test Pull Request to verify CodeRabbit is working:

```bash
# Create a new branch
git checkout -b test-coderabbit-[Project Name]

# Make a small change (e.g., add a comment to README.md)
echo "# Testing CodeRabbit integration" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CodeRabbit integration"
git push origin test-coderabbit
```

Then:

1. Go to GitHub and create a Pull Request from `test-coderabbit` to `main`
2. Wait 1-2 minutes
3. CodeRabbit should post a review comment with:
   - Summary of changes
   - File-by-file walkthrough
   - Any suggestions or issues found

### 5. Interact with CodeRabbit

Once CodeRabbit posts a review, you can:

- **Reply to comments** to ask questions or provide context
- **Give feedback** like "Use 2-space indentation" and it will remember
- **Request changes** by asking "Can you suggest a better way?"
- **Apply suggestions** if it provides committable code fixes

## Pricing

- **Open Source (Public Repos)**: Free Pro tier features ✅
- **Private Repos**:
  - Free tier: Unlimited summaries
  - Pro tier: Full features (check pricing at [coderabbit.ai/pricing](https://coderabbit.ai/pricing))

## When CodeRabbit Runs

CodeRabbit automatically reviews when:

- ✅ A new Pull Request is opened
- ✅ New commits are pushed to an existing PR
- ❌ Draft PRs (disabled in our config)
- ❌ Direct pushes to `main` (no PR = no review)

## Best Practices

### 1. Always Work in Branches

```bash
# Good: Work in a feature branch
git checkout -b feature/add-button
# Make changes
git push origin feature/add-button
# Create PR → CodeRabbit reviews ✅

# Bad: Push directly to main
git checkout main
git push origin main  # No PR, no CodeRabbit review ❌
```

### 2. Create Meaningful PRs

CodeRabbit works best with:

- ✅ Focused changes (one feature or fix per PR)
- ✅ Clear PR descriptions
- ✅ Linked issues (if applicable)
- ❌ Avoid huge PRs with 50+ files

### 3. Respond to Feedback

If CodeRabbit suggests something you disagree with:

- Reply explaining your reasoning
- CodeRabbit learns from your feedback
- It will adjust future reviews accordingly

### 4. Use CodeRabbit Commands

You can use commands in PR comments:

- `@coderabbitai pause` - Pause reviews for this PR
- `@coderabbitai resume` - Resume reviews
- `@coderabbitai review` - Trigger a new review
- `@coderabbitai help` - Show available commands

## Troubleshooting

### CodeRabbit Isn't Reviewing

1. **Check permissions**: Ensure CodeRabbit has access to the repository
2. **Check PR status**: Draft PRs are skipped (by our config)
3. **Wait a moment**: Reviews can take 1-3 minutes
4. **Trigger manually**: Comment `@coderabbitai review` on the PR

### CodeRabbit Comments Are Too Noisy

You can adjust in `.coderabbit.yml`:

```yaml
reviews:
  request_changes_workflow: true # Request changes instead of just comments
  collapse_walkthrough: true # Collapse the walkthrough section
```

### Want to Disable for a Specific PR

Comment on the PR:

```bash
@coderabbitai pause
```

## Integration with CI/CD

CodeRabbit runs **before** your CI checks:

1. You push code → GitHub creates PR
2. CodeRabbit reviews the code (1-2 min)
3. GitHub Actions run (lint, build, tests)
4. Netlify creates preview deploy

This means you get AI feedback **immediately**, before waiting for CI.

## Learning Resources

- [CodeRabbit Documentation](https://docs.coderabbit.ai)
- [Configuration Reference](https://docs.coderabbit.ai/configure/configuration-reference)
- [Best Practices](https://docs.coderabbit.ai/best-practices/setup)

## Summary

| Task                     | Status   | Action                                          |
| ------------------------ | -------- | ----------------------------------------------- |
| `.coderabbit.yml` config | ✅ Done  | Already in repo                                 |
| Sign up for CodeRabbit   | ⏳ To Do | Visit [coderabbit.ai](https://coderabbit.ai)    |
| Connect GitHub repo      | ⏳ To Do | Authorize in CodeRabbit dashboard               |
| Test with a PR           | ⏳ To Do | Create test PR to verify                        |
| Start using              | ⏳ Ready | Reviews happen automatically on all future PRs! |

---

**Next Steps:**

1. Go to [https://coderabbit.ai](https://coderabbit.ai) and sign up with GitHub
2. Connect the [GitHub Organization/Account]/[Project Name] repository
3. Create a test PR to verify it's working
4. From now on, work in branches and create PRs—CodeRabbit handles the rest!
