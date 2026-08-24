04 — FINANCIAL METRIC BEHAVIOR

1. FinancialMetric is a reusable
   component independent from Card.

2. Structure:

   Label
   Value
   Trend
   Supporting Text

3. Value is the primary visual hierarchy.

4. When a value changes, use a subtle
   number transition.

5. Recommended number transition:
   approximately 300–500ms.

6. Target approximately 400ms.

7. Do not animate every render.

8. Animate only when the previous
   value differs from the new value.

9. Do not animate initial data loading.

10. Do not use bounce, flash, glow,
    or dramatic counting animations.

11. Use shared financial formatting.

12. Do not hardcode currency formatting
    inside individual metric components.

13. Trend supports:

    up
    down
    neutral

14. Trend also supports:

    positive
    negative
    neutral

15. Direction and sentiment are
    separate concepts.

16. Never infer financial sentiment
    only from numerical direction.

17. Example:

    Net Worth ↑
    can be positive.

    Spending ↑
    can be negative.

18. Trend must communicate meaning
    using icon + text + color.

19. Never rely on color alone.

20. Positive example:

    ↑ 6.2% Increased

21. Negative example:

    ↓ 3.1% Decreased

22. Neutral example:

    — 0.0% No change

23. Use Lucide icons only.

24. Trend period must be data-driven.

25. Do not hardcode:
    "this month"

26. Metric API should expose
    semantic trend data.

27. Loading uses shared Skeleton.

28. Unknown data must NOT be represented
    as zero.

29. Error state should communicate
    unavailable data.

30. Metric updates should avoid
    unnecessary layout shift.

31. Maintain consistent number formatting
    before and after updates.

32. Respect reduced motion.

33. The metric component owns:

    value presentation
    trend presentation
    value transition

34. The data layer owns:

    current value
    previous value
    trend calculation
    sentiment
    period

35. Card owns:

    surface
    radius
    elevation
    interaction

36. FinancialMetric must work inside
    Static, Interactive, and Actionable
    cards.

37. Never put Card-specific behavior
    inside FinancialMetric.

04 — FINANCIAL METRIC BEHAVIOR

Component:
FinancialMetric

Structure:

Label
Value
Trend
Supporting Text

Value behavior:

Initial:
Static

Changed:
Subtle number transition

Duration:
~400ms

Do not:
Flash
Bounce
Glow
Over-animate

Trend:

Positive
Negative
Neutral

Direction:

Up
Down
Neutral

IMPORTANT:

Direction ≠ Sentiment

Example:

Net Worth
↑ 6.2% Increased
→ Positive

Spending
↑ 18% Increased
→ Negative

Never rely on color alone.

Always communicate trend through:

Icon
+
Value
+
Text

Examples:

↑ 6.2% Increased
↓ 3.1% Decreased
— 0.0% No change

Loading:
Shared Skeleton

Error:
Show unavailable state.
Never treat unavailable data
as zero.

Motion:
~400ms for meaningful value changes.

Reduced motion:
Disable value animation.

Principle:

The metric communicates
financial meaning, not just
numerical change.