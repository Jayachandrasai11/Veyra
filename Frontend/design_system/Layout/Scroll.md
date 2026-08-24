16 — AI Implementation Rules
12 — SCROLL RULES

1. Desktop uses independently scrolling
   main content.

2. Header remains visible.

3. Sidebar remains visible on desktop.

4. Header:
   sticky top-0

5. Header height:
   64px / h-16

6. Desktop sidebar:
   240px / w-60

7. Sidebar:
   sticky top-16

8. Sidebar height:
   calc(100vh - 64px)

9. Main:
   flex-1

10. Main:
    overflow-y-auto

11. Main:
    min-w-0

12. Avoid unnecessary nested scroll containers.

13. Mobile should not use the desktop
    persistent sidebar.

14. Mobile navigation:
    drawer or bottom navigation.

15. Use sticky before fixed for primary
    navigation.

16. Use fixed only for overlays,
    floating actions, and mobile drawers.

17. Don't create custom scrollbar behavior
    unless there is a product requirement.

18. Scrolling must not change the layout
    width of dashboard cards unexpectedly.
17 — Design File Record
# 12 — Scroll Behavior

Pattern:
Dashboard Scroll System


DESKTOP

Header:
sticky

Header height:
64px

Tailwind:
sticky top-0 h-16


Sidebar:
sticky

Sidebar width:
240px

Sidebar top:
64px

Sidebar height:
viewport - header

Tailwind:
sticky top-16 w-60
h-[calc(100vh-4rem)]


Main:
independently scrollable

Tailwind:
min-w-0 flex-1 overflow-y-auto


TABLET

Header:
sticky

Sidebar:
collapsible

Main:
scrollable


MOBILE

Header:
sticky

Navigation:
drawer / bottom navigation

Main:
vertical scroll


CORE PRINCIPLE

Header:
always accessible

Sidebar:
always accessible on desktop

Main:
primary scrolling surface


AVOID

Multiple nested vertical scroll areas.

Do not use fixed positioning for the
entire dashboard unless necessary.
Source