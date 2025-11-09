import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider } from "convex/react";
import * as Sentry from "@sentry/tanstackstart-react";
import { useEffect } from "react";
import { routeTree } from "./routeTree.gen";

function ErrorComponent({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
    // TODO: Replace with actual toast notification system (Phase 1.3)
    // toast.error(t('errors.unexpected'));
  }, [error]);

  // Temporary fallback UI until toast system is implemented
  return (
    <div role="alert" aria-live="assertive">
      <p>
        {/* TODO: Add localized error message, e.g., t('errors.unexpected') */}
        An unexpected error occurred. Our team has been notified.
      </p>
    </div>
  );
}

export function getRouter() {
  const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
  if (!CONVEX_URL) {
    console.error("missing envar CONVEX_URL");
  }
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        gcTime: 5000,
      },
    },
  });
  convexQueryClient.connect(queryClient);

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
      context: { queryClient },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0, // Let React Query handle all caching
      defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
      defaultNotFoundComponent: () => <p>not found</p>,
      Wrap: ({ children }) => (
        <ConvexProvider client={convexQueryClient.convexClient}>
          {children}
        </ConvexProvider>
      ),
    }),
    queryClient,
  );

  // Initialize Sentry on the client side (after router creation)
  if (!router.isServer) {
    const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
    if (!sentryDsn) {
      console.warn("Sentry DSN not configured. Error reporting disabled.");
      return router;
    }
    Sentry.init({
      dsn: sentryDsn,
      // Adds request headers and IP for users (GDPR/CCPA: see privacy docs)
      sendDefaultPii: true,
      environment: import.meta.env.MODE,
      // Optional: Add browser tracing integration for performance monitoring
      // integrations: [
      //   Sentry.tanstackRouterBrowserTracingIntegration(router),
      // ],
      // Optional: Set tracesSampleRate for performance monitoring
      // tracesSampleRate: 1.0,
    });
  }

  return router;
}
