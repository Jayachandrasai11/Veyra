18 — AI Implementation Rules
13 — RESPONSIVE LAYOUT RULES

1. Responsive design means recompose,
   not simply shrink.

2. Use the shared Tailwind breakpoint system.

3. Primary layout breakpoints:
   md → tablet
   lg → desktop

4. Mobile:
   single-column dashboard.

5. Tablet:
   two-column metrics.

6. Desktop:
   three-column metrics.

7. Insights:
   mobile = 1
   tablet = 1
   desktop = 2

8. Full-width components remain full width.

9. Goals remain a list at every breakpoint.

10. Desktop sidebar:
    persistent.

11. Tablet sidebar:
    collapsible.

12. Mobile sidebar:
    drawer or bottom navigation.

13. Header remains sticky.

14. Main remains the primary scrolling surface.

15. Use the global Container.

16. Don't create page-specific breakpoints.

17. Don't create arbitrary card widths.

18. Don't use absolute positioning to
    solve responsive layout.

19. Don't simply scale down desktop UI.

20. Preserve hierarchy and touch usability
    on smaller screens.
19 — Design File Record
# 13 — Responsive Layout

Pattern:
Responsive Dashboard

BREAKPOINTS

Mobile:
< 640px

Tablet:
640px–1023px

Desktop:
≥ 1024px


MAIN TRANSITIONS

md:
tablet layout

lg:
desktop layout


SIDEBAR

Mobile:
drawer / bottom navigation

Tablet:
collapsible

Desktop:
persistent 240px


METRICS

Mobile:
1 column

Tablet:
2 columns

Desktop:
3 columns

Tailwind:
grid-cols-1
md:grid-cols-2
lg:grid-cols-3


INSIGHTS

Mobile:
1 column

Tablet:
1 column

Desktop:
2 columns

Tailwind:
grid-cols-1
lg:grid-cols-2


CONTAINER

Mobile:
16px padding

Tablet:
24px padding

Desktop:
32px padding

Tailwind:
px-4 sm:px-6 lg:px-8


FULL WIDTH

Account Connection
Financial Health
AI Thought
Charts

All:
w-full


GOALS

All:
single-column list


QUICK ACTIONS

Mobile:
2 columns

Desktop:
4 columns


CORE PRINCIPLE

Mobile:
single-column composition

Tablet:
reduced density

Desktop:
full dashboard composition


IMPLEMENTATION

Use Tailwind responsive utilities.

Do not create arbitrary breakpoints.

Do not create arbitrary widths.

Do not shrink desktop layouts mechanically.

Recompose the layout according to
content priority.
Source

Tailwind CSS Responsive Design