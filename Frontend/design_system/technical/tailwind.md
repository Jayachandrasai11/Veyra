This is where your **actual design sizes** belong.

```
# Fermor — Tailwind Rules
```

\## Source of Truth

Tailwind configuration and CSS variables define the design system.

Do not invent arbitrary values throughout components.

\## Rules

Prefer existing design tokens.

Good:

p-4

gap-6

rounded-lg

text-sm

Better when Fermor tokens exist:

var(--spacing-card)

var(--radius-card)

\## Avoid

Do not randomly use:

mt-[13px]

px-[27px]

w-[417px]

unless the dimension is explicitly part of the design specification.

\## Container

Use one global container system.

Do not create different max-widths for different pages without a documented layout requirement.

\## Responsive

Use the approved Fermor breakpoints.

Do not create custom breakpoints inside individual components.

\## Grid

Use predefined layout patterns:

\- 1 column

\- 2 columns

\- 3 columns

\- main + secondary

\- full width

\## Component Dimensions

Card width, height, padding, gap and min-height should come from the layout specification.

Do not let the AI guess dimensions.
