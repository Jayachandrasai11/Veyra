# 36 — Money-at-a-Glance Pattern ⭐

Purpose:

Provide a fast overview of the user's
current financial condition.

This is a Dashboard Summary pattern,
not a collection of unrelated cards.


────────────────────────

REFERENCE

shadcn/ui Dashboard Blocks
https://ui.shadcn.com/blocks

Tailwind Plus Application UI
https://tailwindcss.com/plus/ui-blocks/application-ui

shadcn/ui Charts
https://ui.shadcn.com/charts


────────────────────────

STRUCTURE

Money Overview
│
├── Section Header
├── Primary Financial Health
└── KPI Grid
    ├── Net Worth
    ├── Investments
    └── Savings Rate


────────────────────────

HIERARCHY

Financial Health
        ↓
Net Worth
Investments
Savings Rate
        ↓
Detailed Insights


────────────────────────

DEFAULT

YOUR MONEY AT A GLANCE


Financial Health

78 / 100
● Healthy

↑ 4 points this month

See why →


₹18.4L
Net Worth
↑ 6.2%


₹11.2L
Investments
↑ 8.4%


24%
Savings Rate
↑ 3 pts


────────────────────────

DESKTOP

Financial Health:
Full width

KPI:
3-column grid


────────────────────────

TABLET

Adapt KPI grid between
2–3 columns.


────────────────────────

MOBILE

Stack content vertically
or use 2-column KPI grid
when space allows.


────────────────────────

COMPONENTS

FinancialOverview
FinancialHealthSummary
FinancialMetric


────────────────────────

STATES

Loading
Available
Partial Data
Unavailable
Error
Disconnected


────────────────────────

DATA RULE

Never use fake 0 values
for unavailable financial data.


────────────────────────

ICONS

Lucide Icons only.


────────────────────────

COLOR

Use Fermor semantic tokens.

--text
--text-secondary
--primary
--accent
--success
--warning
--error
--background


────────────────────────

MOTION

Motion.dev.

Subtle transitions only.


────────────────────────

AVOID

Generic card collection
Duplicate Financial Health UI
Unclear "Saved" metric
Large charts
Excessive shadows
Gradients
Glass effects
Decorative animation
Emoji


────────────────────────

PRIMARY UX PRINCIPLE

The user should understand
their financial situation
within a few seconds.

Financial Health is the primary
summary.

KPIs provide supporting context.

Detailed analysis belongs in Insights.
MONEY-AT-A-GLANCE — IMPLEMENTATION RULES

1. Create a reusable FinancialOverview pattern.

2. The Home-specific implementation may be named
   MoneyAtAGlance.

3. Do not implement the section as four unrelated
   generic Cards.

4. Use FinancialHealthSummary as the primary
   financial-health component.

5. Reuse the existing FinancialMetric component
   for Net Worth, Investments, and Savings Rate.

6. Do not create a second Financial Health design.

7. The visual hierarchy must be:
   Section title
   → Financial Health
   → KPI grid.

8. Financial Health must visually dominate the
   three supporting KPIs.

9. Use CSS Grid for the KPI layout.

10. Desktop:
    3 KPI columns.

11. Tablet:
    adapt between 2 and 3 columns depending
    on available width.

12. Mobile:
    stack or use a 2-column KPI grid only
    when there is enough space.

13. Do not hardcode colors.

14. Use Fermor semantic design tokens.

15. Use Lucide Icons exclusively.

16. Do not use emoji.

17. Do not create new icon styles specifically
    for this section.

18. Net Worth must use currency formatting.

19. Investments must clearly represent
    portfolio value.

20. Savings must explicitly identify whether
    it is Savings Rate or Saved Amount.

21. Never show ₹0 as a placeholder for missing
    financial data.

22. Distinguish between:
    loading
    zero
    unavailable
    disconnected
    error.

23. Support independent loading/error states
    for individual metrics.

24. Do not make every metric clickable unless
    a meaningful destination exists.

25. Use subtle hover states only.

26. Do not use large shadows, gradients,
    glass effects, or card animations.

27. Use Motion.dev only for meaningful,
    subtle state transitions.

28. Financial data freshness may be displayed
    once at the section level.

29. Do not repeat sync timestamps on every KPI.

30. The section must work in light and dark mode.

31. Ensure accessible headings and labels.

32. Do not calculate financial values inside
    presentational components.

33. Financial/business calculations must come
    from the application data/business layer.

34. Keep the component reusable for future:
    Investment Overview
    Spending Overview
    Debt Overview.

35. Maintain Fermor's design principle:
    calm, trustworthy, clear, data-first.