🤖 AI Implementation Rules
13 — SCROLL BEHAVIOR

1. Dashboard uses one primary
   vertical scrolling context.

2. Header:
   sticky.

3. Desktop sidebar:
   sticky.

4. Main:
   vertical scroll.

5. Prefer sticky over fixed for
   the initial AppShell implementation.

6. Avoid unnecessary fixed elements.

7. Don't create nested scroll areas
   for normal dashboard sections.

8. Only components that genuinely
   contain long lists may have their
   own internal scrolling.

9. Mobile:
   hide persistent desktop sidebar.

10. Mobile navigation:
    Drawer / Bottom Navigation.

11. Mobile header remains sticky.

12. Don't make individual dashboard
    sections sticky.

13. Keep scroll animations subtle.

14. Don't animate every card based
    on scroll position.

15. Preserve layout dimensions while
    loading to minimize scroll jumps.

16. Preserve scroll position when
    navigating back where appropriate.

17. Anchor scrolling can be added
    later if the dashboard needs it.

18. Scroll behavior should remain
    consistent across pages.

19. Avoid nested scroll containers
    unless there is a clear UX reason.

20. Financial dashboards should feel
    stable and calm, not animated.

21. Recommended shell:

    AppShell
      ├── Header (sticky)
      ├── Sidebar (sticky)
      └── Main (scroll)

22. The scroll system belongs to
    AppShell, not individual cards.

23. AI must not invent different
    scroll behaviors for individual
    dashboard components.
📝 Design File Note

Pattern: Dashboard Scroll System

AppShell
│
├── Header
│   └── Sticky
│
├── Sidebar
│   └── Sticky
│
└── Main
    └── Vertical Scroll
Desktop
Header  → Sticky
Sidebar → Sticky
Main    → Scroll
Mobile
Header → Sticky
Main   → Scroll
Nav    → Drawer / Bottom Navigation
Core rule

One page, one primary scroll context.

Don't let every card, section, and panel become its own scrolling surface.

Source

Use Tailwind CSS Position as the implementation reference for sticky, fixed, and positioning behavior.