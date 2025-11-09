# i18n Routing Skeleton (TanStack Start)

This skeleton demonstrates the locale-prefixed path strategy `/{locale}/...` with a root redirect, a preference cookie, and SEO/UX helpers. Use it as a starting point; adjust names/paths to your project.

## File layout (example)

- `app/routes/index.tsx` → Root redirect `/` → `/{locale}` (cookie → Accept-Language → fallback `es`)
- `app/routes/$locale/_layout.tsx` → Layout sets active locale from route param, updates `<html lang>`, and renders a language switcher
- `app/routes/$locale/index.tsx` → Example localized page
- `app/lib/i18n/config.ts` → i18n setup (i18next or your lib of choice)
- `app/lib/i18n/detect.ts` → Helpers for cookie/Accept-Language detection
- `app/lib/i18n/locales/en.json`, `app/lib/i18n/locales/es.json` → Minimal translation files
- `app/components/LanguageSwitcher.tsx` → Switches locale by changing the `/{locale}` segment and sets the preference cookie

## Root redirect (`/`)

```tsx
// app/routes/index.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { detectDefaultLocale } from "../lib/i18n/detect";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const request = context?.request as Request | undefined;
    const cookie = request?.headers.get("cookie") ?? "";
    const acceptLanguage = request?.headers.get("accept-language") ?? "";
    const locale = detectDefaultLocale({ cookie, acceptLanguage }); // 'es' | 'en'
    throw redirect({
      to: "/$locale",
      params: { locale },
    });
  },
  component: () => null,
});
```

## `$locale` layout with switcher

```tsx
// app/routes/$locale/_layout.tsx
import {
  Outlet,
  createFileRoute,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { I18nProvider } from "../../lib/i18n/config";
import { useEffect } from "react";

function setLocaleCookie(locale: "es" | "en") {
  document.cookie = `locale=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
}

function LanguageSwitcher() {
  const { locale } = useParams({ from: "/$locale" }) as { locale: "es" | "en" };
  const router = useRouter();
  const switchTo = (next: "es" | "en") => {
    if (next === locale) return;
    setLocaleCookie(next);
    router.navigate({ to: "/$locale", params: { locale: next } });
  };
  return (
    <div role="group" aria-label="Language switcher">
      <button aria-pressed={locale === "es"} onClick={() => switchTo("es")}>
        ES
      </button>
      <button aria-pressed={locale === "en"} onClick={() => switchTo("en")}>
        EN
      </button>
    </div>
  );
}

export const Route = createFileRoute("/$locale")({
  component: () => {
    const { locale } = useParams({ from: "/$locale" }) as {
      locale: "es" | "en";
    };

    // Ensure <html lang> reflects the active locale.
    useEffect(() => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = locale;
      }
    }, [locale]);

    return (
      <I18nProvider locale={locale}>
        <header>
          <LanguageSwitcher />
        </header>
        <main>
          <Outlet />
        </main>
      </I18nProvider>
    );
  },
});
```

## Example localized page

```tsx
// app/routes/$locale/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "../../lib/i18n/config";

export const Route = createFileRoute("/$locale/")({
  component: () => {
    const { t } = useTranslation();
    return (
      <section>
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
      </section>
    );
  },
});
```

## i18n setup (minimal shape)

```ts
// app/lib/i18n/config.ts
import i18next from 'i18next'
import { initReactI18next, useTranslation as useReactI18n } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

let initialized = false

export function initI18n(locale: 'es' | 'en') {
  if (initialized) return
  i18next
    .use(initReactI18next)
    .init({
      resources: { es: { translation: es }, en: { translation: en } },
      lng: locale,
      fallbackLng: 'es',
      interpolation: { escapeValue: false },
    })
  initialized = true
}

export function I18nProvider({ locale, children }: { locale: 'es' | 'en'; children: React.ReactNode }) {
  initI18n(locale)
  i18next.changeLanguage(locale)
  return <>{children}</>
}

export function useTranslation() {
  return useReactI18n()
}
```

```json
// app/lib/i18n/locales/es.json
{
  "hero": {
    "title": "Explora fundaciones y dona con confianza",
    "subtitle": "Historias de impacto verificadas en Colombia"
  }
}
```

```json
// app/lib/i18n/locales/en.json
{
  "hero": {
    "title": "Discover foundations and donate with confidence",
    "subtitle": "Verified impact stories from Colombia"
  }
}
```

## Cookie and Accept-Language detection

```ts
// app/lib/i18n/detect.ts
function parseCookie(cookie: string): Record<string, string> {
  return Object.fromEntries(
    cookie
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf("=");
        return [
          decodeURIComponent(c.slice(0, idx)),
          decodeURIComponent(c.slice(idx + 1)),
        ];
      }),
  );
}

function detectFromAcceptLanguage(
  acceptLanguage: string,
): "es" | "en" | undefined {
  const val = acceptLanguage.toLowerCase();
  if (val.includes("es")) return "es";
  if (val.includes("en")) return "en";
  return undefined;
}

export function detectDefaultLocale(args: {
  cookie: string;
  acceptLanguage: string;
}): "es" | "en" {
  const fromCookie = parseCookie(args.cookie)["locale"];
  if (fromCookie === "es" || fromCookie === "en") return fromCookie;
  const fromAccept = detectFromAcceptLanguage(args.acceptLanguage);
  return fromAccept ?? "es";
}
```

## SEO: `hreflang` alternates

Add per-locale `hreflang` links. In TanStack Start you can attach head elements in the route’s head/meta solution; if unavailable, render in your layout/head component.

```tsx
// Example head snippet (pseudo)
function HreflangAlternates({
  pathname,
  origin,
}: {
  pathname: string;
  origin: string;
}) {
  const esHref = new URL(`/es${pathname}`, origin).toString();
  const enHref = new URL(`/en${pathname}`, origin).toString();
  return (
    <>
      <link rel="alternate" hrefLang="es" href={esHref} />
      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="x-default" href={esHref} />
    </>
  );
}
```

## Caching & headers

- Do not vary localized pages on cookies. Path is the cache key.
- Root `/` may optionally use `Vary: Accept-Language` on the redirect response only.
- Set the preference cookie with `SameSite=Lax; Path=/; Max-Age=31536000`.

## Checklist

- `/{locale}` is the source of truth for language.
- `/` performs a 302 to `/{locale}` via cookie → Accept-Language → fallback `es`.
- Language switcher navigates by changing the `/{locale}` segment and sets the cookie.
- `<html lang>` reflects the active locale.
- `hreflang` alternates rendered for SEO; per-locale sitemaps recommended.
- No `Vary: Cookie` on localized pages.
