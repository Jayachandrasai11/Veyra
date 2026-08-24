This one is **extremely useful for AI coding**.

```
# Fermor — Forbidden Technical Patterns
```

\- emotion

\- CSS-in-JS libraries

unless explicitly approved.

\## Animation

Do not introduce:

\- GSAP

\- Framer Motion alongside Motion

\- random animation packages

Use the approved Motion library.

\## State

Do not introduce Redux unless explicitly required.

Prefer the existing state architecture.

\## Forms

Do not introduce Formik if React Hook Form is already approved.

\## Charts

Do not introduce multiple chart libraries.

Use the approved chart library.

\## CSS

Do not create arbitrary one-off design systems inside components.

Do not hard-code repeated values.

Bad:

padding: 23px;

border-radius: 17px;

Good:

Use Fermor design tokens.

\## Components

Do not create duplicate components.

Before creating a component:

1\. Search existing components.

2\. Search shadcn components.

3\. Search existing patterns.

4\. Reuse when possible.

\## Dependencies

Do not install a package simply because it makes one small task easier.

Every new dependency must have a reason.
