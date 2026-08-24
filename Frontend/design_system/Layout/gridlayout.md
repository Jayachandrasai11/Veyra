17 — AI Implementation Rules
07 — GRID RULES

1. Use CSS Grid through Tailwind.

2. Base grid gap:
   16px / gap-4

3. Metric grid:
   1 column mobile
   2 columns tablet
   3 columns desktop

4. Insight grid:
   1 column mobile
   2 columns tablet/desktop

5. Grid width:
   100% of its parent.

6. Cards should normally use:
   width: 100%

7. Cards should normally use:
   height: auto

8. Use h-full only when equal-height
   grid cards are required.

9. Do not hard-code card widths.

10. Do not create arbitrary breakpoints.

11. Reuse the Fermor grid variants.

12. Grid sits inside the global Container.

13. Use gap-4 as the default grid gap.

14. Use responsive Tailwind classes rather
    than custom media queries.

15. Do not create a new grid system for
    individual pages.
18 — Design File Record
# 07 — Grid Layouts

Pattern:
Fermor Grid System

BASE:

Grid gap:
16px

Tailwind:
gap-4


METRIC GRID:

Mobile:
1 column

Tablet:
2 columns

Desktop:
3 columns

Tailwind:
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4


INSIGHT GRID:

Mobile:
1 column

Tablet:
2 columns

Desktop:
2 columns

Tailwind:
grid-cols-1
md:grid-cols-2
gap-4


SINGLE GRID:

grid-cols-1


CARD:

Width:
100%

Height:
auto

Alignment:
stretch


RESPONSIVE:

Mobile:
1 column

Tablet:
2 columns

Desktop:
3 columns for metrics
2 columns for insights


TOKENS:

grid.gap = 16px

grid.metrics.mobile = 1
grid.metrics.tablet = 2
grid.metrics.desktop = 3

grid.insights.mobile = 1
grid.insights.tablet = 2
grid.insights.desktop = 2
Source

Tailwind CSS Grid Template Columns

Tailwind CSS Gap