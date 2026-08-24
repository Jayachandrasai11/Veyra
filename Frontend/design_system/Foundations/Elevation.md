# 06 — Elevation

Fermor uses:

Soft Shadows + Subtle Borders

The elevation system is restrained and primarily used
to communicate hierarchy and interaction.

────────────────────────

Level 0 — Flat

Shadow: none
Border: 1px

Used for:
Page background
Sections
Tables


Level 1 — Card

Shadow:
0 1px 3px rgba(15, 35, 55, 0.06)

Border:
1px solid var(--border)

Used for:
Dashboard cards
Goal cards
Insight cards


Level 2 — Raised

Shadow:
0 4px 12px rgba(15, 35, 55, 0.10)

Border:
1px solid var(--border)

Used for:
Hover states
Dropdowns
Popovers
Floating controls


Level 3 — Overlay

Shadow:
0 12px 32px rgba(15, 35, 55, 0.16)

Border:
1px solid var(--border)

Used for:
Modals
Dialogs
Large overlays


Dark Mode

Use surface hierarchy instead of strong shadows:

Level 0 → #010509
Level 1 → #07101a
Level 2 → #0b1622
Level 3 → #102030