SECTION 07 — EXPLORE — IMPLEMENTATION RULES

1. Pattern:
   Quick Actions

2. Component:
   Explore

3. Architecture:

   Explore
   ├── SectionHeader
   └── QuickActions
       ├── QuickAction
       ├── QuickAction
       ├── QuickAction
       └── QuickAction

4. Reuse the global SectionHeader.

5. Reuse the global Button component.

6. Use compact action buttons.

7. Do NOT create four large cards.

8. Default layout:
   horizontal group.

9. Desktop:
   4 actions in one row.

10. Tablet:
    allow wrapping.

11. Mobile:
    2-column layout when practical.

12. QuickAction anatomy:

    Icon
    Label

13. Recommended icons:

    Plan → Map
    Compare → GitCompare
    Calculate → Calculator
    Learn → BookOpen

14. Use Lucide exclusively.

15. Icon size:
    18px.

16. Icon stroke:
    2px.

17. Icon/text gap:
    8px.

18. Use Button:
    Secondary / Outline style.

19. Do not use AI accent for
    normal Explore actions.

20. Reserve AI styling for:
    Ask Fermor
    AIInsight

21. Quick Actions should not
    depend on financial API data.

22. Prefer static routes/configuration.

23. Actions must be data-driven.

24. Do not hardcode individual
    button markup when rendering
    the action list.

25. Each action must have a clear
    destination.

26. Do not use icon-only controls.

27. Maintain minimum accessible
    touch target of 44px.

28. Provide visible focus states.

29. Loading is unnecessary when
    actions are static.

30. Empty Explore should generally
    be omitted rather than showing
    an empty state.

31. Use global motion tokens.

32. Respect reduced motion.

33. Use Fermor typography tokens.

34. Use Fermor spacing tokens.

35. Use Fermor color tokens.

36. Do not introduce arbitrary
    colors, shadows, radii or
    typography.

37. Keep this section visually
    quieter than Financial Health,
    Metrics and AI Insight.

38. Explore means:
    "What can I do next?"

39. It should not become:
    "Here are four more things
    competing for your attention."

SECTION 07 — EXPLORE

Pattern:
Quick Actions

Component:
Explore

Purpose:
Provide compact pathways from the
dashboard into useful financial actions.

Architecture:

Explore
│
├── SectionHeader
│
└── QuickActions
    ├── QuickAction
    ├── QuickAction
    ├── QuickAction
    └── QuickAction

Actions:

Plan
Compare
Calculate
Learn

Recommended icons:

Plan → Map
Compare → GitCompare
Calculate → Calculator
Learn → BookOpen

Desktop:

[ Plan ] [ Compare ] [ Calculate ] [ Learn ]

Tablet:

[ Plan ] [ Compare ]
[ Calculate ] [ Learn ]

Mobile:

[ Plan ]       [ Compare ]
[ Calculate ]  [ Learn ]

Style:

Compact
Secondary / Outline
Icon + Label

Principle:

Explore is a quick-action system,
not a card grid.

Keep it visually quieter than
the primary financial and AI
experiences.