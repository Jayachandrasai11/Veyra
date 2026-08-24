7 — AI Implementation Rules
08 — CARD LAYOUT RULES

1. Card width is normally:
   w-full

2. Grid determines card width.

3. Do not hard-code normal card widths.

4. Metric cards:
   min-h-[120px]
   p-5

5. Insight cards:
   min-h-[140px]
   p-5

6. Financial Health:
   min-h-[180px]
   p-6

7. AI Thought:
   min-h-[180px]
   p-6

8. Account Connection:
   min-h-[200px]
   p-6

9. Default card height:
   auto

10. Use h-full only when cards need to
    stretch to equal grid-row height.

11. Use flex-col for vertical card layouts.

12. Use mt-auto when an action needs to
    remain anchored at the bottom.

13. Cards inherit width from their grid cell.

14. Do not create individual card widths.

15. Use the established CardLayout variants.

16. Don't mix Card visual styling with
    Card layout rules.

17. Use responsive Grid rules rather than
    manually changing card widths.
18 — Design File Record
# 08 — Card Layout

Pattern:
Card Layout

Purpose:
Controls how Card components occupy space.

DEFAULT

Width:
100%

Height:
auto

Grid:
Determines width

Alignment:
stretch when required


METRIC

Width:
100%

Min-height:
120px

Padding:
20px

Tailwind:
w-full min-h-[120px] p-5


INSIGHT

Width:
100%

Min-height:
140px

Padding:
20px

Tailwind:
w-full min-h-[140px] p-5


FINANCIAL HEALTH

Width:
100%

Min-height:
180px

Padding:
24px

Tailwind:
w-full min-h-[180px] p-6


AI FEATURED

Width:
100%

Min-height:
180px

Padding:
24px

Tailwind:
w-full min-h-[180px] p-6


ACCOUNT CONNECTION

Width:
100%

Min-height:
200px

Padding:
24px

Tailwind:
w-full min-h-[200px] p-6


RESPONSIVE

Mobile:
Cards occupy 100% width of grid cell.

Tablet:
Cards occupy 100% width of grid cell.

Desktop:
Cards occupy 100% width of grid cell.


RELATIONSHIP

Grid:
Controls columns + gaps.

Card Layout:
Controls card dimensions.

Card Component:
Controls visual appearance.