🤖 AI Implementation Rules
10 — QUICK ACTIONS

1. Every Quick Action must have
   a meaningful destination.

2. Never use Quick Actions
   as decorative UI.

3. Plan → Planning.

4. Compare → Comparison.

5. Calculate → Financial Calculator.

6. Learn → Education.

7. Navigation actions should use
   semantic links.

8. Operational actions should use
   buttons.

9. Don't make every Quick Action
   a button automatically.

10. Every action needs:

    Default
    Hover
    Pressed
    Focus
    Disabled

11. Use one interaction language
    across all Quick Actions.

12. Don't create unique animations
    for individual actions.

13. Don't expose unfinished actions
    that lead to dead pages.

14. Quick Actions should remain
    compact on the Home page.

15. Don't turn four actions into
    four oversized dashboard cards.

16. Each action should have a stable
    route/action identifier.

17. Recommended model:

    QuickAction {
      id
      label
      icon
      destination
      type
    }

18. Example:

    {
      id: "calculate",
      label: "Calculate",
      destination: "/calculate",
      type: "navigation"
    }

19. The destination should be
    changeable without redesigning
    the component.

20. AI may eventually personalize
    or reorder Quick Actions,
    but must not invent destinations.

21. If an action isn't available,
    hide it or explicitly mark it
    as unavailable.

22. Accessibility:

    keyboard accessible
    visible focus
    meaningful label
    semantic navigation
📝 Design File Note

Pattern: Quick Actions

Purpose: Give users fast access to important Fermor tools.

QuickActions
│
├── Plan
│   └── /plan
│
├── Compare
│   └── /compare
│
├── Calculate
│   └── /calculate
│
└── Learn
    └── /learn
Component
QuickAction
├── Icon
├── Label
├── State
└── Destination