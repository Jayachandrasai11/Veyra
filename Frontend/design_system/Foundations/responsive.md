# 09 — Responsive Breakpoints

Fermor uses a mobile-first responsive system.

────────────────────────

BREAKPOINTS

Mobile
< 768px

Tablet
768px – 1199px

Desktop
≥ 1200px


────────────────────────

MOBILE

Navigation:
Bottom navigation + menu/drawer

Primary navigation:
Home
Insights
Goals
Explore

Secondary:
Ask Fermor
Settings
Profile

Grid:
4 columns

Page padding:
16px

Grid gap:
16px

Cards:
1 column

Touch target:
44 × 44px minimum


────────────────────────

TABLET

Navigation:
Collapsed sidebar

Grid:
8 columns

Page padding:
24px

Grid gap:
20px

Cards:
2 columns where appropriate


────────────────────────

DESKTOP

Navigation:
Full sidebar

Sidebar:
240px

Grid:
12 columns

Page padding:
32px

Grid gap:
24px

Snapshot:
3 columns

Insights:
2 columns


────────────────────────

RESPONSIVE PRINCIPLE

Desktop → 3 cards
Tablet → 2 cards
Mobile → 1 card

Desktop → Sidebar
Tablet → Collapsed sidebar
Mobile → Bottom navigation / drawer

Desktop → Full data
Tablet → Adapted data
Mobile → Prioritized data


────────────────────────

AI IMPLEMENTATION

Build mobile-first.

Use the defined Fermor breakpoints.

Do not invent arbitrary breakpoints.

Use CSS Grid for primary layouts.

Do not use absolute positioning for primary
page structure.

Preserve readability and accessibility at every
screen size.