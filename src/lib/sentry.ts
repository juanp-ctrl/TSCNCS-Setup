/**
 * Sentry initialization
 *
 * Sentry is initialized in src/router.tsx (client-side) and can be initialized
 * in server functions as needed. This utility file provides helper functions
 * for manual error reporting.
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/
 */

import * as Sentry from "@sentry/tanstackstart-react";

/**
 * Log error to Sentry with optional context
 * Use this for manual error reporting when needed
 */
export function logError(error: Error, context?: Record<string, unknown>) {
  if (!Sentry.getClient()) {
    console.error("Sentry not initialized. Error not captured:", error);
    return;
  }
  Sentry.captureException(error, {
    contexts: {
      custom: context || {},
    },
  });
}

/**
 * Set user context for Sentry
 * Call this after user authentication to associate errors with users
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  if (!Sentry.getClient()) {
    console.warn("Sentry not initialized. User context not set.");
    return;
  }
  Sentry.setUser({
    id: user.id,
    // Note: Email is PII. Ensure user consent per GDPR/CCPA before calling.
    email: user.email,
    username: user.username,
  });
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUserContext() {
  if (!Sentry.getClient()) return;
  Sentry.setUser(null);
}
