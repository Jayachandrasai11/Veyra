SECTION 04 — FERMOR NOTICED — IMPLEMENTATION RULES

1. Pattern:
   Financial Insight Feed

2. Component:
   Insights

3. Structure:

   Insights
   ├── SectionHeader
   └── InsightGrid
       └── InsightCard

4. Reuse the global SectionHeader.

5. Reuse the global Card foundation.

6. Reuse the global Arrow Link pattern.

7. Do not create a notification-card component.

8. InsightCard represents a financial
   observation, not a generic notification.

9. Desktop:
   2-column grid.

10. Tablet:
    2-column grid when space permits.

11. Mobile:
    1-column grid.

12. Grid gap:
    16px.

13. Card padding:
    20px.

14. Card radius:
    Global LG radius.

15. Card border:
    1px global border.

16. Use Financial Number typography
    for financial values.

17. InsightCard must support:

    type
    title
    value
    description
    severity
    action

18. Prefer a stable typed data model.

19. AI generates structured insight data.

20. AI must never generate HTML,
    CSS or component structure.

21. React controls presentation.

22. Severity values must be predefined:

    positive
    neutral
    attention
    critical

23. UI maps severity to semantic tokens.

24. AI cannot directly choose arbitrary
    colors.

25. AI cannot directly choose arbitrary
    font sizes.

26. AI cannot directly modify layout.

27. AI cannot inject arbitrary UI markup.

28. Each insight has one primary action.

29. Use Arrow Link for insight actions.

30. Do not use primary buttons inside
    every insight card.

31. Home should display only the most
    relevant 3–4 insights.

32. Do not fabricate insights when
    there are none.

33. Empty state uses the global
    Empty State pattern.

34. Loading uses global Skeleton.

35. Errors use global Error + Recovery.

36. Preserve previous insights when
    possible if fresh analysis fails.

37. Support light and dark mode.

38. Use Fermor design tokens only.

39. Respect reduced motion.

40. Insight content must remain readable
    at all responsive widths.

41. Use semantic article structure.

42. Severity must never depend on color alone.

43. Actions must be keyboard accessible.

44. Future insight types should be
    data-driven rather than requiring
    new card components.

SECTION 04 — FERMOR NOTICED

Pattern:
Financial Insight Feed

Component:
Insights

Purpose:
Surface meaningful financial observations
and give the user a clear next action.

Architecture:

Insights
│
├── SectionHeader
│
└── InsightGrid
    ├── InsightCard
    ├── InsightCard
    └── InsightCard

Insight:

InsightCard
├── Type / Category
├── Title
├── Value
├── Description
├── Severity
└── Action

Data:

id
type
title
value
description
severity
action

Severity:

positive → --success
neutral → --text-secondary
attention → --warning
critical → --error

Grid:

Desktop → 2 columns
Tablet → 2 columns
Mobile → 1 column

Gap:
16px

Card padding:
20px

States:

Default
Loading
Empty
Error

AI principle:

Financial Data
↓
AI / Intelligence
↓
Structured Insight Data
↓
React
↓
InsightCard

AI provides DATA.
React provides UI.

AI cannot directly control:
color
spacing
typography
layout
markup