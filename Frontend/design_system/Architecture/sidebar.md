03 — SIDEBAR — IMPLEMENTATION RULES

1. Create one reusable Sidebar component.

2. Sidebar belongs to AppShell.

3. Never recreate the Sidebar per page.

4. Structure:

   Sidebar
   ├── Logo
   ├── Primary Navigation
   ├── Spacer
   └── Secondary Navigation

5. Desktop width:
   248px

6. Collapsed width:
   72px

7. Desktop:
   Persistent

8. Tablet:
   Collapsible

9. Mobile:
   Drawer

10. Use Lucide Icons exclusively.

11. Never use emoji navigation icons.

12. Navigation icon:
   18px

13. Navigation item:
   40px visual height

14. Maintain minimum touch target
   requirements.

15. Navigation item padding:
   12px horizontal

16. Icon + label gap:
   10px

17. Navigation item gap:
   4px

18. Navigation group gap:
   24px

19. Active navigation must be visually
   distinguishable.

20. Never rely on color alone for
   active state.

21. Every icon-only navigation item
   requires an accessible label.

22. Collapsed items should provide
   tooltip/accessibility context.

23. Navigation state must reflect
   the current route.

24. Use the global Drawer for mobile.

25. Use the global motion tokens.

26. Respect reduced motion.

27. Support light and dark themes.

28. Do not introduce arbitrary colors.

29. Do not introduce arbitrary spacing.

30. Do not introduce a new navigation
   style without updating the design system.

31. Sidebar should remain visually
   secondary to financial content.

32. Keyboard navigation must work.

33. Focus states must remain visible.


03 — SIDEBAR

Pattern:
Sidebar Navigation

Purpose:
Primary application navigation.

Desktop:
248px
Persistent
Icon + Label

Tablet:
72px
Collapsed
Icon only

Mobile:
Drawer

Navigation item:
40px height
18px icon
10px icon/text gap
12px horizontal padding
MD radius

Navigation gap:
4px

Navigation group gap:
24px

Icons:
Lucide
18px
2px stroke

Visual:
Background
1px border-right
No heavy shadow

States:
Default
Hover
Active
Focus
Disabled

Responsive:
Desktop → Persistent
Tablet → Collapsible
Mobile → Drawer

Accessibility:
Keyboard navigation
Visible focus
Accessible icon labels
Active state not dependent on color