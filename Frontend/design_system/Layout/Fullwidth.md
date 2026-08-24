09 — Dashboard Layout Rules for AI
11 — DASHBOARD LAYOUT RULES

1. Dashboard uses the global Container.

2. Container:
   w-full
   max-w-7xl
   mx-auto
   px-4
   sm:px-6
   lg:px-8

3. Dashboard sections use:
   space-y-8

4. Default section gap:
   32px

5. Default grid gap:
   16px

6. Financial Health:
   Full Width

7. Account Connection:
   Full Width

8. Metrics:
   1 → 2 → 3 columns

9. Insights:
   1 → 2 columns

10. Goals:
    Full-width list

11. AI Thought:
    Full Width

12. Explore:
    Full-width action group

13. Don't create arbitrary widths for
    individual sections.

14. Don't create arbitrary margins between
    individual sections.

15. Use the shared Container, Grid,
    TwoColumn and FullWidth patterns.

16. Layout hierarchy should communicate
    product priority.

17. Mobile should stack content naturally.
10 — Design File Record
# 11 — Dashboard Layout

Pattern:
Dashboard Layout

CONTAINER

max-width:
1280px

Tailwind:
max-w-7xl

horizontal alignment:
mx-auto

padding:
16px mobile
24px tablet
32px desktop

Tailwind:
px-4 sm:px-6 lg:px-8


SECTION SPACING

32px

Tailwind:
space-y-8


GRID GAP

16px

Tailwind:
gap-4


LAYOUT ORDER

01 Welcome
02 Account Connection
03 Financial Health
04 Metrics
05 Fermor Noticed
06 Goals
07 Thought From Fermor
08 Explore


SECTION TYPES

Account Connection:
Full Width

Financial Health:
Full Width

Metrics:
3-column responsive grid

Fermor Noticed:
2-column responsive grid

Goals:
Full-width list

Thought From Fermor:
Full Width

Explore:
Full-width action group


RESPONSIVE

Mobile:
single-column composition

Tablet:
two-column grids where applicable

Desktop:
three-column metrics
two-column insights


CORE RULE

Container controls page width.

Dashboard controls vertical composition.

Grid controls columns.

TwoColumn controls proportional columns.

FullWidth controls full available width.

CardLayout controls card dimensions.

Card controls visual appearance.