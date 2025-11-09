import * as Sentry from "@sentry/tanstackstart-react";

if (!process.env.SENTRY_DSN) {
  console.warn("SENTRY_DSN not configured - error tracking disabled");
} else {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // Adds request headers and IP for users
    sendDefaultPii: true,
    // Use Netlify's CONTEXT for accurate environment detection
    environment: process.env.CONTEXT || process.env.NODE_ENV || "development",
    // Optional: Set tracesSampleRate for performance monitoring
    // tracesSampleRate: 1.0,
  });
}
