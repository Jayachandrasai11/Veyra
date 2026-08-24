# 11 — Buttons

Fermor uses shadcn/ui Button as the foundation for
all button interactions.

────────────────────────

FOUNDATION

Library:
shadcn/ui

Component:
Button

Installation:
npx shadcn@latest add button


────────────────────────

VARIANTS

Primary
Secondary
Outline
Ghost
Link
Destructive
Icon
AI / Brand


────────────────────────

SIZES

Small:
32px height

Medium:
40px height

Large:
48px height

Default:
Medium


────────────────────────

STATES

Default
Hover
Active
Focus
Disabled
Loading


────────────────────────

ICON

Small:
16px

Medium:
18px

Large:
20px

Icon + text gap:
8px

Icon button:
40 × 40px

Touch target:
44 × 44px minimum


────────────────────────

HIERARCHY

Primary
→ Highest emphasis

Secondary
→ Medium emphasis

Outline
→ Secondary visible action

Ghost
→ Low emphasis

Link
→ Inline navigation

Destructive
→ Dangerous actions

AI / Brand
→ Fermor AI actions


────────────────────────

AI / BRAND

Used for:

Ask Fermor
Ask Fermor about this
Ask Fermor ✦

Color:
--accent


────────────────────────

MOTION

Hover:
120ms / easeOut

Active:
120ms

Follow Fermor Motion tokens.


────────────────────────

ACCESSIBILITY

Visible keyboard focus.

Icon-only buttons require accessible labels.

Minimum touch target:
44 × 44px.

Do not rely on color alone for states.


────────────────────────

AI IMPLEMENTATION

Use shadcn/ui Button as the single button foundation.

Do not create arbitrary button styles.

Extend shadcn/ui using Fermor design tokens.

Use lucide-react for icons.

Use Fermor color, typography, spacing, radius,
and motion tokens.


AI IMPLEMENTATION

Since your workflow is React → AI → browser, add this:

AI IMPLEMENTATION RULE


Use the shadcn/ui Button component as the single
foundation for Fermor buttons.


Extend the component using the Fermor design tokens
and variants.


Do not create arbitrary button styles.


Use these variants:


primary
secondary
outline
ghost
link
destructive
icon
ai


Use these sizes:


sm
md
lg


Use the Fermor-defined states:


default
hover
active
focus
disabled
loading


Use lucide-react for icons.


Use Motion only where motion is specified by the
Fermor Motion system.

1. Use shadcn/ui Button as the foundation.

2. Do not create separate button components for every
   screen.

3. Extend the base Button with Fermor variants.

4. Use the defined color tokens.

5. Use the defined typography tokens.

6. Use the defined radius tokens.

7. Use the defined spacing tokens.

8. Use Lucide React icons.

9. Use the Fermor motion tokens.

10. Maintain minimum 44px touch targets on touch devices.

11. Every icon-only button must have an accessible label.

12. Do not use emoji as button icons.