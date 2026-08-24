# 01 — App Shell

Purpose:
The App Shell is the structural foundation
of the Fermor application.

All authenticated pages use the same shell.

────────────────────────────────────────

STRUCTURE

AppShell
│
├── Header
├── Sidebar
└── Main Content

────────────────────────────────────────

DESKTOP LAYOUT

Viewport:
≥ 1280px

Sidebar:
Width → 248px
Position → Fixed
Height → 100vh

Header:
Height → 64px
Position → Sticky
Top → 0
Z-index → 40

Main:
Margin-left → 248px
Min-height → 100vh
Overflow → Auto

Content container:
Max-width → 1440px
Horizontal padding → 32px

────────────────────────────────────────

TABLET LAYOUT

Viewport:
768px – 1279px

Sidebar:
Width → 72px
Mode → Collapsed

Header:
Height → 64px

Main:
Margin-left → 72px
Horizontal padding → 24px

────────────────────────────────────────

MOBILE LAYOUT

Viewport:
< 768px

Sidebar:
Hidden

Navigation:
→ Mobile Drawer

Header:
Height → 56px

Main:
Margin-left → 0
Horizontal padding → 16px

────────────────────────────────────────

HEADER

Height:
Desktop → 64px
Tablet → 64px
Mobile → 56px

Structure:

Header
│
├── Left
│   ├── Mobile menu
│   └── Page context
│
└── Right
    ├── Notifications
    ├── Ask Fermor
    └── Profile

Horizontal padding:
Desktop → 24px
Mobile → 16px

────────────────────────────────────────

SIDEBAR

Desktop width:
248px

Collapsed width:
72px

Height:
100vh

Position:
Fixed

Structure:

Sidebar
│
├── Logo
├── Navigation
│
├── Spacer
│
├── Ask Fermor
└── Settings

Navigation item:

Height → 40px
Horizontal padding → 12px
Icon → 18px
Icon/Text gap → 10px
Radius → MD

Navigation group gap:
24px

Navigation item gap:
4px

────────────────────────────────────────

MAIN CONTENT

Desktop:

Padding:
32px

Maximum width:
1440px

Section gap:
32px

Tablet:

Padding:
24px

Section gap:
24px

Mobile:

Padding:
16px

Section gap:
24px

────────────────────────────────────────

CONTENT ALIGNMENT

All primary page content should align
to the same content container.

Do not create independent arbitrary
left/right margins for individual sections.

────────────────────────────────────────

VISUAL HIERARCHY

App Shell:
Low visual emphasis

Main Content:
Primary visual focus

Sidebar:
Navigation focus

Header:
Utility focus

The shell must not compete with
financial information.

────────────────────────────────────────

BORDERS

Sidebar:
1px border-right

Header:
1px border-bottom

Use:
--border

Avoid heavy borders.

────────────────────────────────────────

ELEVATION

App Shell:
No strong shadow.

Header:
Use border instead of shadow.

Sidebar:
Use border instead of shadow.

────────────────────────────────────────

RESPONSIVE BEHAVIOR

Desktop:
Sidebar expanded

Tablet:
Sidebar collapsed

Mobile:
Sidebar → Drawer

Desktop:
3-column dashboard grids allowed

Tablet:
2-column grids

Mobile:
1-column grids

────────────────────────────────────────

SCROLLING

Preferred:

Header → Sticky
Sidebar → Fixed
Main → Scrollable

Avoid unnecessary nested scrolling.

────────────────────────────────────────

ACCESSIBILITY

Keyboard navigation required.

Visible focus states required.

Navigation must have accessible labels.

Icon-only controls require tooltips
or accessible aria-labels.

Do not rely on color alone for
active navigation state.

────────────────────────────────────────

MOTION

Sidebar collapse:
Fast

Mobile drawer:
Normal

Use Fermor motion tokens.

Respect:
prefers-reduced-motion

────────────────────────────────────────

ICONS

Library:
Lucide

Default:
18px

Navigation:
18px

Header controls:
20px

Do not use emoji.

────────────────────────────────────────

THEMES

Support:

Light mode
Dark mode

Use Fermor color tokens.

Never hardcode arbitrary colors.

────────────────────────────────────────

REUSABILITY

Create:

AppShell
Header
Sidebar
SidebarItem
MobileDrawer
MainContent

Do not recreate shell structure
inside individual pages.

────────────────────────────────────────

IMPLEMENTATION RULE

When creating any Fermor page:

Page
↓
AppShell
↓
Page Content

Never:

Page
├── Custom Header
├── Custom Sidebar
└── Custom Main

────────────────────────────────────────