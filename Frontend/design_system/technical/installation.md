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
