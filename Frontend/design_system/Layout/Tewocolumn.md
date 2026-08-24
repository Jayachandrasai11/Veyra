14 — AI Implementation Rules
09 — TWO-COLUMN RULES

1. Two-column layouts stack to one column
   on mobile.

2. Default ratio:
   50 / 50

3. Default gap:
   16px / gap-4

4. 60 / 40:
   grid-cols-[3fr_2fr]

5. 70 / 30:
   grid-cols-[7fr_3fr]

6. Use 50 / 50 when both areas have
   approximately equal importance.

7. Use 60 / 40 when one area is primary.

8. Use 70 / 30 when one area is strongly
   dominant.

9. Don't hard-code column pixel widths.

10. Columns should normally use:
    w-full

11. Use items-stretch when cards should
    have equal row height.

12. Use h-full on cards only when required.

13. Default mobile behavior:
    stacked.

14. Don't create custom media queries
    for individual layouts.

15. Reuse the TwoColumn pattern across
    the application.
15 — Design File Record
# 09 — Two-Column Layout

Pattern:
Two Column Layout

Architecture:
TwoColumn
├── Main
└── Secondary


DEFAULT:
50 / 50

Tailwind:
grid-cols-1 md:grid-cols-2


PRIMARY:
60 / 40

Tailwind:
grid-cols-1 md:grid-cols-[3fr_2fr]


DOMINANT:
70 / 30

Tailwind:
grid-cols-1 md:grid-cols-[7fr_3fr]


GAP:
16px

Tailwind:
gap-4


MOBILE:
1 column

TABLET:
2 columns

DESKTOP:
2 columns


WIDTH:
w-full


HEIGHT:
auto

Equal-height variant:
items-stretch + h-full


RULE:
Grid controls column width.
Card controls internal layout.