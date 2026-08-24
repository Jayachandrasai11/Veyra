14 — AI Implementation Rules
11 — DASHBOARD LAYOUT RULES

1. Dashboard must use the shared AppShell.

2. Main content must use the global Container.

3. Container:
   max-w-7xl
   mx-auto
   w-full
   px-4 sm:px-6 lg:px-8

4. Dashboard section spacing:
   space-y-8

5. Section gap:
   32px

6. Grid gap:
   16px / gap-4

7. Account Connection:
   Full Width

8. Financial Health:
   Full Width

9. Metrics:
   1 → 2 → 3 columns

10. Insights:
    1 → 2 columns

11. Goals:
    Full-width list

12. AI Thought:
    Full Width

13. Explore:
    Quick Action group

14. Do not invent new layout patterns
    for individual sections.

15. Do not create arbitrary widths.

16. Do not create arbitrary margins.

17. Use the established:
    Container
    FullWidth
    TwoColumn
    Grid
    CardLayout
    Section
    patterns.

18. Preserve the dashboard section order.

19. Mobile must naturally stack content.

20. Layout hierarchy should communicate
    product priority.
15 — Design File Record
# 11 — Dashboard Layout

Pattern:
Dashboard Layout

PURPOSE:
Master composition pattern for Fermor Home.


STRUCTURE:

AppShell
├── Header
├── Sidebar
└── Main
    └── Container
        └── Dashboard
            ├── Welcome
            ├── AccountConnection
            ├── MoneyOverview
            │   ├── FinancialHealth
            │   └── MetricsGrid
            ├── Insights
            ├── Goals
            ├── AIInsight
            └── Explore


PAGE ORDER:

01 Welcome
02 Account Connection
03 Money at a Glance
04 Fermor Noticed
05 Your Goals
06 Thought From Fermor
07 Explore


CONTAINER:

max-width:
1280px

Tailwind:
max-w-7xl

Padding:
mobile 16px
tablet 24px
desktop 32px

Tailwind:
px-4 sm:px-6 lg:px-8


SECTION SPACING:

32px

Tailwind:
space-y-8


GRID GAP:

16px

Tailwind:
gap-4


METRIC GRID:

mobile:
1

tablet:
2

desktop:
3


INSIGHT GRID:

mobile:
1

tablet:
2

desktop:
2


FULL WIDTH:

Account Connection
Financial Health
AI Thought


GOALS:

Full-width list


CORE PRINCIPLE:

Container
→ controls page width

Dashboard
→ controls page composition

Section
→ controls vertical grouping

Grid
→ controls columns

TwoColumn
→ controls proportional columns

FullWidth
→ controls full available width

CardLayout
→ controls component dimensions

Card
→ controls visual appearance