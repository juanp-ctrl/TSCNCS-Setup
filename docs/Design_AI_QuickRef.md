# [Project Name] - Design Quick Reference for AI

Purpose: Normative, compact subset of `docs/Design.md` for fast AI retrieval. Treat this as the implementation contract. For details and visuals, see `docs/Design.md`.

Last updated: (set on each edit)

## A) Foundations (Tokens and Breakpoints)

- Typography: [Typography] (regular/500/600/700). Base body 15px; headings per scale below.
- Breakpoints (fixed):
  - mobile: 320–767px
  - tablet: 768–1023px
  - desktop: 1024–1439px
  - wide: 1440px+
- Design Tokens (families; values live in Design.md and must be mapped to CSS vars):
  - colors: primary (50–900), neutral (50–900), success, warning, error, surface/background
  - spacing: xs → 4xl (8px rhythm)
  - radius: sm, md, lg, xl, 2xl, 3xl, full
  - shadows: sm, md, lg, xl, card (orange tint)
  - typography: font family Work Sans; sizes for H1–H6, body, caption

Tailwind mapping (required):

- Map CSS variables from `app/styles/tokens.css` into `tailwind.config theme.extend`:
  - colors.primary._, colors.neutral._, colors.status.\*, shadows.card
  - spacing scale, borderRadius scale, fontFamily.sans = Work Sans

Accessibility invariants:

- Hit area ≥ 44×44px for all interactive elements
- Focus-visible outlines at 3:1 minimum contrast
- Keyboard navigation for menus, chips, dialogs, language switcher

## B) Type Scale (Normative)

- H1: 48px/56px, weight 700, letter-spacing -0.02em
- H2: 36px/44px, weight 700, letter-spacing -0.01em
- H3: 28px/36px, weight 700
- H4: 24px/32px, weight 700
- Body: 15px/1.6 (default body text)
- Small: 14px/1.5
- Caption: 12–13px/1.5

Implement via CSS variables and Tailwind utilities; do not hardcode raw pixel values inside components.

## C) Core Components (Contracts)

Use shadcn/ui primitives and adapt styles to tokens. Do not change API surface without updating this contract.

Button

- Variants: primary, secondary, outline, ghost, destructive
- Sizes: sm, md, lg (hit area ≥ 44px height)
- States: hover, active, disabled, loading
- Icon slots: leading/trailing (16–20px icons)

Chip

- Variants: filter (selectable), badge (static)
- States: default, active, focus-visible
- Size: md by default; horizontal scroll in filter bars on mobile

Card

- Variants: default, skeleton, interactive
- Shadow: `shadow-card` by default; hover → `shadow-lg`, translateY(-2px)
- Elements: media (rounded), body (title, meta, actions)

Avatar

- Sizes: sm (24), md (32), lg (40), xl (64)
- Fallback initials; rounded-full

Badge

- Variants: neutral, success, warning
- Size: sm/md; uppercase optional; rounded-full

Language Switcher

- ES/EN toggle; persists cookie 1 year; SSR must match hydration
- Accessible labels; no page reload on toggle

## D) Explore Page (Phase 1 target)

- Hero: headline + CTA; responsive typographic scale
- Filter bar: horizontal chips; sticky header pattern
- Post grid: skeleton cards first; real data in Phase 2

## E) Events vs Activities

- Events are posts with `kind: 'event'`; fields: `startsAt`, `endsAt?`, `location?`, `registrationUrl?`
- Activities are separate timeline records (badges, stars, donations, memberships)

## F) Internationalization

- Locales: es, en
- Strategy: cookie-only; use Accept-Language only for first-visit default
- All UI text must use translation keys; do not hardcode strings

## G) Don’t Hardcode — Use Tokens

- Never hardcode color hex, spacing, radius, shadows, fonts in components
- Always read from CSS variables and Tailwind theme utilities

## H) Quick Checks (Definition of Done – UI)

- Responsive across breakpoints with container widths per spec
- Focus management and keyboard nav pass axe checks
- Lighthouse mobile ≥ 90 on skeleton pages
- Token parity: Tailwind utilities resolve to CSS variables from tokens file
