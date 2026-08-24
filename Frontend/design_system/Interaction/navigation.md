SECTION 01 — NAVIGATION BEHAVIOR — IMPLEMENTATION RULES

1. Use shadcn Sidebar as the foundation.

2. Reference:
   shadcn sidebar-07

3. Do NOT use the default visual styling
   without customization.

4. Fermor navigation should have:
   subtle active surface
   primary active icon
   primary active text
   restrained active indicator

5. Desktop expanded width:
   240px.

6. Desktop collapsed width:
   72px.

7. Navigation items:

   Home
   Insights
   Goals
   Explore

8. Icons:

   Home → House
   Insights → ChartLine
   Goals → Target
   Explore → Compass

9. Icon size:
   18–20px.

10. Icon stroke:
    2px.

11. Use Lucide exclusively.

12. Active state must be visible.

13. Active state should not rely
    on color alone.

14. Hover:
    subtle surface change.

15. Do not use:
    glow
    scale
    excessive animation
    oversized active backgrounds.

16. URL is the source of truth for
    active navigation.

17. Do not manage active state with
    arbitrary local React state.

18. Support nested routes.

19. Example:

    /insights
    /insights/spending

    both keep Insights active.

20. Navigation should be generated
    from configuration.

21. Do not duplicate NavItem markup.

22. Collapsed mode:
    icons only.

23. Collapsed mode must preserve
    active indication.

24. Collapsed icons need tooltips.

25. Desktop:
    persistent sidebar.

26. Tablet:
    collapsible sidebar.

27. Mobile:
    Sheet / Drawer.

28. Reuse the same NavItem component
    inside mobile Drawer.

29. Do not create a separate visual
    language for mobile navigation.

30. Do not use Bottom Navigation
    initially unless product research
    requires it.

31. Mobile drawer must contain:

    Primary navigation
    Secondary navigation
    User/settings actions

32. Navigation items must be
    keyboard accessible.

33. Focus state must be visible.

34. Minimum interactive target:
    44px.

35. Sidebar transitions should be
    fast and subtle.

36. Respect reduced motion.

37. Use Fermor tokens for:
    color
    spacing
    typography
    radius
    motion.

38. Do not introduce arbitrary
    navigation colors.

39. Navigation should remain visually
    quieter than primary dashboard
    actions.

40. The navigation system should
    communicate hierarchy:

    Primary
       ↓
    Secondary
       ↓
    Account

01 — NAVIGATION BEHAVIOR

Pattern:
Persistent + Collapsible Navigation

Foundation:
shadcn Sidebar

Reference:
sidebar-07

Desktop:
Persistent

Expanded:
240px

Collapsed:
72px

Mobile:
Sheet / Drawer

Primary:

Home
Insights
Goals
Explore

Icons:

Home → House
Insights → ChartLine
Goals → Target
Explore → Compass

NavItem:

Icon
Label
Active Indicator

Active:

Subtle surface
+
Primary icon
+
Primary text
+
Small accent indicator

Hover:

Subtle surface transition

Routing:

URL controls active state.

Nested routes keep the
parent navigation active.

Implementation:

Navigation should be configuration-driven.

Mobile:

Reuse NavItem inside Drawer.

Avoid Bottom Navigation initially.

Principle:

Navigation should feel like
a quiet structural system,
not a visually dominant component.