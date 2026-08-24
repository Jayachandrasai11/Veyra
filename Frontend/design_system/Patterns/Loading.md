15 — LOADING CONTENT — IMPLEMENTATION RULES

1. Create one reusable global Skeleton primitive.

2. Build dashboard loading compositions
   from the global Skeleton primitive.

3. Do not create independent loading
   animations for each card.

4. Required patterns:

   HeaderSkeleton
   CTA/Skeleton
   FinancialHealthSkeleton
   MetricSkeleton
   InsightSkeleton
   GoalSkeleton

5. Skeleton dimensions should approximate
   the final content dimensions.

6. Avoid layout shift between loading
   and loaded states.

7. Do not display fake financial values
   while loading.

8. Never use realistic financial numbers
   as placeholders.

9. Use subtle motion only.

10. Use one consistent Skeleton animation
    across Fermor.

11. Recommended shimmer/pulse duration:
    approximately 1.2–1.6 seconds.

12. Respect prefers-reduced-motion.

13. Do not block the entire dashboard while
    one financial section is loading.

14. Allow sections to resolve independently
    when API architecture supports it.

15. Skeleton must support:

    Light mode
    Dark mode

16. Use Fermor design tokens for:

    Background
    Skeleton color
    Border radius
    Spacing

17. Skeleton is not an error state.

18. If loading fails, transition to the
    appropriate Error State.

19. Prevent indefinite loading.

20. Reuse the same Skeleton components
    across Home, Insights, Goals and Explore.

21. Do not add unnecessary skeleton
    decoration that doesn't represent
    actual content.

22. Keep loading visually quiet and
    trustworthy.
15 — LOADING CONTENT PATTERN

Purpose:
Provide visual feedback while financial
data is being retrieved.

Primary primitive:
Skeleton

Dashboard loading:

├── Header Skeleton
├── Account CTA Skeleton
├── Financial Health Skeleton
├── Metric Skeleton
├── Insight Skeleton
└── Goal Skeleton

Principles:

• Preserve layout dimensions
• Prevent layout shift
• Don't show fake financial data
• Use one Skeleton language
• Use subtle animation
• Respect reduced motion
• Allow independent sections to load
• Transition to Error State when loading fails
• Never leave Skeleton indefinitely

Visual direction:

Quiet
Subtle
Stable
Non-distracting