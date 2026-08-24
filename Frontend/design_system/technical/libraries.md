This should be the **master library list**.

```
# Fermor — Approved Libraries
```

\- React

\- TypeScript

\- Vite

\- Tailwind CSS

\## UI

\- shadcn/ui

\- Radix UI primitives

\## Icons

\- Lucide React

\## Animation

\- Motion

\## Charts / Data Visualization

\- Recharts

\## Forms

\- React Hook Form

\- Zod

\## AI Interface

\- AI SDK

\- shadcn/ui AI components where appropriate

\## Utilities

\- clsx

\- tailwind-merge

\- class-variance-authority

\## State Management

Prefer React state/context for local and simple application state.

Use Zustand only when global client state genuinely requires it.

\## Dates

\- date-fns

\## Testing

\- Vitest

\- Testing Library

\- Playwright

\## Accessibility

\- Radix accessibility primitives

\- Testing Library

\- axe-core / appropriate accessibility testing tooling

\## Rule

Do not introduce another library when an approved library already provides the required functionality.

## `technical/installation.md`

This tells the AI **what to install**.

```
# Fermor — Installation
```

\- tailwindcss

\- @tailwindcss/vite

\## UI

Install/configure:

\- shadcn/ui

\- radix-ui

Add only the shadcn components actually used by the application.

\## Icons

Install:

\- lucide-react

\## Utilities

Install:

\- clsx

\- tailwind-merge

\- class-variance-authority

\## Animation

Install:

\- motion

\## Forms

Install:

\- react-hook-form

\- zod

\- @hookform/resolvers

\## Charts

Install:

\- recharts

\## Dates

Install:

\- date-fns

\## State

Install:

\- zustand

Only use Zustand for state that genuinely needs shared client-side persistence.

\## Testing

Install development dependencies:

\- vitest

\- @testing-library/react

\- @testing-library/dom

\- @testing-library/user-event

\- playwright

\## AI

Install the AI SDK required by the selected Fermor AI architecture.

Do not install multiple competing AI SDKs.

\## Installation Rule

Before installing any package:

1\. Check whether the functionality already exists in the project.

2\. Check whether an approved dependency already handles it.

3\. Check the approved version in versions.md.

4\. Do not add an alternative package without documenting the reason.

## `technical/versions.md`

This is **very important**.

Don't let the AI blindly install `latest`.

```
# Fermor — Package Versions
```

The coding AI must respect the versions recorded in package.json / lockfile.

\## Rules

\- Do not automatically upgrade dependencies.

\- Do not use \`latest\` as an installation strategy.

\- Do not replace a library because another library is newer.

\- Keep the lockfile committed.

\- Dependency upgrades require an explicit technical decision.

\## Source of Truth

package.json

↓

lockfile

↓

versions.md

If versions.md conflicts with package.json,

package.json and lockfile are authoritative until versions.md is updated.

---

# Per-Library Documentation (Rule 17)

> Generated from `Fin/Frontend/package.json`. Every entry records the reason,
> where it is used, why it was chosen, and the alternative that was rejected.

## Core Stack (Rule 01 — mandatory)

### React — `^19.2.8`
- **Purpose:** UI library / component model.
- **Where used:** Every `.tsx` page, component, and hook.
- **Why chosen:** Mandatory core stack.
- **Alternative rejected:** None — required.

### react-dom — `^19.2.8`
- **Purpose:** DOM renderer for React.
- **Where used:** `main.tsx` root render.
- **Why chosen:** Mandatory core stack.
- **Alternative rejected:** None — required.

### TypeScript — `~6.0.2`
- **Purpose:** Static type safety.
- **Where used:** Entire codebase (`tsc -b`).
- **Why chosen:** Mandatory core stack.
- **Alternative rejected:** None — required.

### Vite — `^8.2.0`
- **Purpose:** Dev server + production bundler.
- **Where used:** `npm run dev` / `build`.
- **Why chosen:** Mandatory core stack.
- **Alternative rejected:** Webpack/CJS-based tooling (slower, heavier).

### @vitejs/plugin-react — `^6.0.4`
- **Purpose:** React fast-refresh + JSX transform for Vite.
- **Where used:** `vite.config.ts`.
- **Why chosen:** Required to run React under Vite.
- **Alternative rejected:** None — required by Vite + React.

### Tailwind CSS — `^4.3.3`
- **Purpose:** Primary styling system.
- **Where used:** Every component via utility classes + CSS-variable tokens.
- **Why chosen:** Mandatory (Rule 06).
- **Alternative rejected:** Bootstrap / MUI / Chakra / Ant / Emotion / styled-components (forbidden, Rule 06).

### @tailwindcss/vite — `^4.3.3`
- **Purpose:** Tailwind v4 Vite plugin.
- **Where used:** `vite.config.ts`.
- **Why chosen:** Required to use Tailwind v4 with Vite.
- **Alternative rejected:** PostCSS-only setup (project standardized on the Vite plugin).

## UI System (Rule 02, 14)

### shadcn — `^4.19.0`
- **Purpose:** Reusable UI primitive foundation (Card, Button, Dialog, etc.).
- **Where used:** `src/components/ui/*`.
- **Why chosen:** Mandated UI system (Rule 02).
- **Alternative rejected:** Hand-rolling primitives / other component libraries.

### radix-ui — `^1.6.7`
- **Purpose:** Accessible headless primitives behind shadcn.
- **Where used:** Dialog, Dropdown, Tabs, Tooltip, etc.
- **Why chosen:** Required by shadcn (Rule 14).
- **Alternative rejected:** Independently installed Radix packages (only the set shadcn needs).

## Icons (Rule 03)

### lucide-react — `^1.33.0`
- **Purpose:** Interface icons.
- **Where used:** Sidebar, pages, components, empty/alert states.
- **Why chosen:** Mandated "Lucide only" rule.
- **Alternative rejected:** Font Awesome / Material / Heroicons / emoji.

## Charts (Rule 04)

### recharts — `^3.10.1`
- **Purpose:** Financial data visualization (Line/Area/Bar/Donut/Sparkline).
- **Where used:** Chart components / insights surfaces.
- **Why chosen:** Specified by `Components/Charts.md`.
- **Alternative rejected:** Do not introduce another charting library.

## Routing (Rule 05)

### react-router — `^8.3.0`
- **Purpose:** Application routing.
- **Where used:** `App.tsx` → `routes.tsx`, all pages under `AppShell`.
- **Why chosen:** Mandated router.
- **Alternative rejected:** None — required; do not add another router.

## Class Utilities (Rule 07)

### class-variance-authority — `^0.7.1`
- **Purpose:** Component variant definitions.
- **Where used:** Button, Alert, Badge, etc.
- **Why chosen:** Supports shadcn variant system.
- **Alternative rejected:** Manual conditional strings.

### clsx — `^2.1.1`
- **Purpose:** Conditional class composition.
- **Where used:** `lib/cn.ts` and components.
- **Why chosen:** Standard shadcn utility.
- **Alternative rejected:** template-literal concatenation.

### tailwind-merge — `^3.6.0`
- **Purpose:** Conflict-free Tailwind class merging.
- **Where used:** `lib/cn.ts`.
- **Why chosen:** Standard shadcn utility.
- **Alternative rejected:** None.

## Animation (Rule 12)

### motion — `^13.1.1`
- **Purpose:** Advanced/interaction animation.
- **Where used:** Where the design system requires motion.
- **Why chosen:** Mandated motion library (Rule 12).
- **Alternative rejected:** Multiple animation libraries / decorative-only libs.

## State (Rule 10)

### zustand — `^5.0.15`
- **Purpose:** Shared client-side state where React state/context is insufficient.
- **Where used:** Global client stores.
- **Why chosen:** Permitted by `installation.md` for genuinely shared state.
- **Alternative rejected:** Redux / MobX / Jotai (heavier; not required for foundation).
- **Note:** Confirm it is used only for shared, persistent client state — not as a default global store (Rule 10).

## Forms (Rule 09)

### react-hook-form — `^7.86.0`
- **Purpose:** Complex form state (goals, connect, settings).
- **Where used:** Form-heavy pages.
- **Why chosen:** Mandated for complex forms.
- **Alternative rejected:** Plain React state for simple forms only.

### zod — `^4.4.3`
- **Purpose:** Schema validation.
- **Where used:** Form + API shape validation.
- **Why chosen:** Mandated validation (Rule 08/09).
- **Alternative rejected:** Manual validation.

### @hookform/resolvers — `^5.9.1`
- **Purpose:** Bridge React Hook Form ↔ Zod.
- **Where used:** Form components.
- **Why chosen:** Required to use Zod with RHF.
- **Alternative rejected:** None.

## Utilities (Rule 08)

### date-fns — `^4.4.0`
- **Purpose:** Date parsing/formatting.
- **Where used:** Date displays (goal target dates, etc.).
- **Why chosen:** Approved date utility (Rule 08).
- **Alternative rejected:** moment.js / day.js (not in approved set).

## Typography / Fonts

### @fontsource-variable/inter — `^5.3.0`
- **Purpose:** Inter variable font (Fermor typeface).
- **Where used:** `globals.css` import.
- **Why chosen:** Matches design-system typography (Inter).
- **Alternative rejected:** None.

### @fontsource-variable/geist — `^5.3.0`  ⚠️ FLAGGED
- **Purpose:** Geist variable font.
- **Where used:** Not referenced by the design system.
- **Why chosen:** Not justified — the design system specifies **Inter only**.
- **Alternative rejected:** Should use `@fontsource-variable/inter`.
- **Action:** Candidate for removal (Rule 08/16 — do not add libraries not required). Confirm before deleting.

## Testing (Rule testing)

### vitest — `^4.1.11`
- **Purpose:** Unit/component test runner.
- **Where used:** `*.test.tsx`.
- **Why chosen:** Approved test runner.
- **Alternative rejected:** Jest (project standardized on Vitest).

### @testing-library/react — `^16.3.2`
- **Purpose:** Component testing.
- **Where used:** Tests.
- **Why chosen:** Approved testing lib.
- **Alternative rejected:** None.

### @testing-library/dom — `^10.4.1`
- **Purpose:** DOM testing utilities.
- **Where used:** Tests.
- **Why chosen:** Approved testing lib.
- **Alternative rejected:** None.

### @testing-library/user-event — `^14.6.6`
- **Purpose:** Simulated user interactions in tests.
- **Where used:** Tests.
- **Why chosen:** Approved testing lib.
- **Alternative rejected:** None.

### @playwright/test — `^1.62.1`
- **Purpose:** End-to-end browser testing.
- **Where used:** E2E specs.
- **Why chosen:** Approved E2E tool.
- **Alternative rejected:** Cypress (not in approved set).

### oxlint — `^1.75.0`
- **Purpose:** Linting.
- **Where used:** `npm run lint`.
- **Why chosen:** Project linter.
- **Alternative rejected:** ESLint (project chose oxlint).

### @types/node — `^24.13.3`
- **Purpose:** Node type definitions.
- **Where used:** Build tooling.
- **Why chosen:** Required for TS Node context.
- **Alternative rejected:** None.

### @types/react — `^19.2.17`
- **Purpose:** React type definitions.
- **Where used:** All components.
- **Why chosen:** Required for typed React.
- **Alternative rejected:** None.

### @types/react-dom — `^19.2.3`
- **Purpose:** React DOM type definitions.
- **Where used:** Rendering.
- **Why chosen:** Required.
- **Alternative rejected:** None.

## Animation utility (note)

### tw-animate-css — `^1.4.0`  ⚠️ FLAGGED
- **Purpose:** Tailwind v4 animation utilities used by shadcn animations.
- **Where used:** `globals.css` import.
- **Why chosen:** Supports shadcn/Tailwind animation; not in the approved master list.
- **Alternative rejected:** Hand-written keyframes.
- **Action:** Document; confirm it is the minimal solution for shadcn animation (Rule 15).

---

# Final Dependency Check (Rule 21)

- [x] `package.json` inspected
- [x] Existing dependencies reused (no re-implementation of token/styling)
- [x] No duplicate libraries (single icon / chart / styling / state system)
- [x] No unnecessary UI library (shadcn only, per Rule 02)
- [x] No duplicate icon library (Lucide only)
- [x] No duplicate chart library (Recharts only)
- [x] No duplicate styling system (Tailwind only)
- [x] Versions follow Fermor docs (`package.json` is authoritative)
- [x] Dependencies documented (this file)
- [x] Build succeeds (`npm run build` → ✓)
- [x] TypeScript succeeds (`tsc -b` → exit 0)
- [x] Application runs successfully (dev server / build verified)

## Open items to confirm
1. **`@fontsource-variable/geist`** — not referenced by the design system (Inter only). Recommend removal.
2. **`tw-animate-css`** — present but not in the approved master list; confirm it is the minimal shadcn animation solution.
3. **`zustand`** — ensure usage is limited to genuinely shared client state (Rule 10).
