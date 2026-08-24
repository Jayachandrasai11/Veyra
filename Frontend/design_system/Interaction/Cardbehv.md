03 — CARD BEHAVIOR — IMPLEMENTATION RULES

1. Card does NOT automatically mean clickable.

2. Every Card must explicitly define:

   static
   interactive
   actionable

3. Static cards:
   display information.

4. Static cards:
   no pointer cursor.

5. Static cards:
   no interactive hover elevation.

6. Interactive cards:
   entire surface represents a destination.

7. Interactive cards:
   use subtle hover elevation.

8. Interactive cards:
   support pressed state.

9. Interactive cards:
   support keyboard focus.

10. Interactive cards should use
    semantic links/buttons where appropriate.

11. Never use a clickable div when
    a semantic interactive element works.

12. Actionable cards:
    contain explicit actions.

13. If a card contains multiple actions,
    do NOT make the entire card clickable.

14. Example:

    AI Card
    ├── See what changed
    └── Ask Fermor

    Card itself = container
    Actions = interactive elements.

15. Card hover behavior must be global.

16. Do not invent hover animations
    for individual cards.

17. Default card motion:
    subtle.

18. Do not use:
    bounce
    rotation
    excessive scale
    glow
    dramatic shadow.

19. Interactive card:
    cursor pointer.

20. Static card:
    cursor default.

21. Actionable card:
    card remains non-clickable unless
    explicitly configured otherwise.

22. Use one global card radius token.

23. Use one global card elevation system.

24. Card states:

    rest
    hover
    active
    focus

25. Static cards generally only need
    the rest state.

26. Interactive cards require:
    rest
    hover
    active
    focus.

27. Actionable cards require:
    rest
    plus states on their
    internal actions.

28. Do not create separate Card components
    for every page.

29. Create one Card foundation.

30. Compose specialized patterns from it:

    FinancialHealthCard
    FinancialMetric
    InsightCard
    GoalCard
    AIInsightCard
    CTA Card

31. Specialized cards should not reinvent
    interaction behavior.

32. Card component owns:

    radius
    border
    surface
    elevation
    transition
    focus treatment

33. Feature component owns:

    content
    data
    action meaning

34. Page owns:

    routing
    business logic
    API state

35. Respect reduced motion.

03 — CARD BEHAVIOR

Pattern:
Card Interaction System

Types:

Static
Interactive
Actionable

STATIC
Information only.

Hover:
None or extremely subtle.

Click:
None.

INTERACTIVE
Entire card represents a destination.

Hover:
Subtle elevation.

Active:
Small pressed feedback.

Focus:
Visible focus state.

Cursor:
Pointer.

ACTIONABLE
Card contains explicit actions.

Card:
Container.

Button/Link:
Interaction.

Do not make the entire card clickable
when multiple actions exist.

Examples:

Metric:
Static / Interactive

Insight:
Interactive

Goal:
Interactive

AI Insight:
Actionable

CTA:
Actionable

Empty State:
Actionable

Global behavior:

One radius
One elevation system
One transition system
One focus system

Never invent card behavior
per screen.

Principle:

A card is a container.