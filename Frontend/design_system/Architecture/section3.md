SECTION 03 — MONEY AT A GLANCE — IMPLEMENTATION RULES

1. Create a reusable MoneyOverview component.

2. Structure:

   MoneyOverview
   ├── SectionHeader
   ├── FinancialHealth
   └── MetricsGrid

3. Reuse the existing SectionHeader.

4. Reuse the existing FinancialHealth pattern.

5. Reuse the existing FinancialMetric component.

6. Do not create a new Card primitive.

7. Financial Health is the primary
   information block.

8. Financial Health spans the full
   available content width.

9. Metrics appear below Financial Health.

10. Desktop metrics:
    3 columns.

11. Tablet metrics:
    2 columns.

12. Mobile metrics:
    1 column.

13. Metric grid gap:
    16px.

14. Financial Health → Metrics:
    16px.

15. Section Header → Financial Health:
    16px.

16. Use Financial Number typography
    for financial values.

17. Do not hardcode financial values
    inside the component.

18. Receive financial data through props,
    state or API data.

19. Use shared financial formatting
    utilities for currency and percentages.

20. Do not assume that every metric
    is currency.

21. Currency, percentage and score
    must support different units.

22. Financial Health trend must support:
    positive
    negative
    neutral

23. Trend must communicate:
    direction
    value
    period

24. Never use color alone to communicate
    financial status.

25. "See why" is an Arrow Link,
    not a primary button.

26. Use Lucide ArrowRight for the link.

27. Financial Health uses the global
    Card foundation.

28. Metrics use the reusable
    FinancialMetric pattern.

29. Loading uses global Skeleton.

30. Empty data uses the global
    Empty State + CTA pattern.

31. API failure uses the global
    Error + Recovery pattern.

32. Do not display fake zero values
    when financial data is unavailable.

33. Preserve layout during loading.

34. Prevent horizontal overflow.

35. Support:
    light mode
    dark mode

36. Use Fermor design tokens only.

37. Do not introduce arbitrary:
    colors
    spacing
    typography
    radius
    shadows

38. Keep Financial Health visually
    more prominent than individual metrics.

39. Do not turn this section into a
    marketing hero.

40. The component must remain reusable
    for future:
    Investment Overview
    Spending Overview
    Debt Overview
    Savings Overview

SECTION 03 — MONEY AT A GLANCE

Pattern:
Money Overview

Component:
MoneyOverview

Purpose:
Give the user an immediate summary
of their financial position.

Architecture:

MoneyOverview
│
├── SectionHeader
│
├── FinancialHealth
│
└── MetricsGrid
    ├── NetWorth
    ├── Investments
    └── Savings

Hierarchy:

Financial Health
        ↓
Net Worth
Investments
Savings

Financial Health:

Score
Status
Trend
Explanation
CTA

Example:

78 / 100
Healthy
↑ 4 points this month
See why →

Metrics:

₹18.4L
Net Worth

₹11.2L
Investments

24%
Saved

Grid:

Desktop → 3 columns
Tablet → 2 columns
Mobile → 1 column

Grid gap:
16px

Header → Health:
16px

Health → Metrics:
16px

Financial numbers:
Financial Number token

States:

Default
Loading
Empty
Error

Loading:
Global Skeleton

Empty:
Empty State + CTA

Error:
Error + Recovery

Principle:

Financial Health is the primary
summary. Metrics provide supporting
financial KPIs.