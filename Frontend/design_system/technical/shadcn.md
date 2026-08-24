Since you're using shadcn, this deserves its own rules.

```
# Fermor — shadcn/ui Rules
```

\## Purpose

Use shadcn/ui as the base UI component system.

\## Approved Components

Use shadcn components where appropriate:

\- Button

\- Card

\- Badge

\- Input

\- Label

\- Dialog

\- Alert Dialog

\- Dropdown Menu

\- Sheet

\- Sidebar

\- Skeleton

\- Spinner

\- Tooltip

\- Tabs

\- Select

\- Popover

\- Command

\- Toast / Sonner where selected

\- Progress

\- Separator

\- Scroll Area

\## Rules

Do not create a custom implementation when an approved shadcn component already solves the requirement.

Do not blindly install every shadcn component.

Install components when they are actually required.

\## Customization

shadcn components may be customized to match Fermor's design system.

Do not change:

\- accessibility behavior

\- keyboard behavior

\- semantic structure

without a documented reason.

\## Visual Consistency

All shadcn components must use Fermor:

\- colors

\- spacing

\- radius

\- typography

\- borders

\- shadows

\- focus states

\- motion rules

Do not accept shadcn's default visual appearance as the final Fermor design.
