```
# Fermor — Accessibility
```

\## Requirements

All interactive UI must be keyboard accessible.

\## Keyboard

TAB

→ next interactive element

SHIFT + TAB

→ previous interactive element

ENTER

→ activate

SPACE

→ activate appropriate controls

ESC

→ close modal/drawer/menu

ARROW KEYS

→ navigate menus/tabs where appropriate

\## Focus

Every interactive element needs a visible focus state.

Never remove focus indicators without providing an equivalent.

\## Color

Never communicate state using color alone.

Example:

Bad:

Green = positive

Red = negative

Better:

↑ 6.2% Increased

↓ 3.1% Decreased

\## Touch

Interactive targets must be appropriately sized for touch.

\## Screen Readers

Use semantic HTML.

Use ARIA only where necessary.

Do not use ARIA to compensate for incorrect HTML structure.

\## Motion

Respect prefers-reduced-motion.

\## Dialogs

Dialogs must:

\- trap focus appropriately

\- restore focus

\- support Escape where appropriate

\- have accessible names
