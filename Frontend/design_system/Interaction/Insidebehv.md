06 — INSIGHT BEHAVIOR

1. An Insight is a financial observation,
   not a generic notification.

2. Primary flow:

   Insight
     ↓
   Explanation
     ↓
   Recommendation
     ↓
   AI conversation

3. Home Insight cards remain compact.

4. Example:

   Spending
   ↑ 18% this month
   Understand →

5. "Understand" opens contextual
   Insight Details.

6. Desktop:
   Dialog.

7. Mobile:
   Drawer / Bottom Sheet.

8. Insight Details must answer:

   What changed?
   Why did it change?
   What can I do?

9. Show structured financial evidence
   before interpretation.

10. Separate:

    observation
    from
    inference

11. Never present unsupported
    AI speculation as financial fact.

12. Recommendations should be
    insight-specific.

13. Avoid generic "Learn more"
    actions where possible.

14. Ask Fermor is the final
    conversational continuation.

15. Ask Fermor receives the
    insight context automatically.

16. AI context should include:

    entryPoint
    insightType
    currentValue
    previousValue
    change
    contributors
    period

17. The AI should not generate
    arbitrary UI structure.

18. InsightDetails owns the
    presentation structure.

19. AI may provide:

    summary
    explanation
    recommendation

20. Data layer owns:

    financial values
    comparisons
    contributors
    timestamps
    confidence

21. Support multiple insight types:

    spending
    savings
    investments
    debt
    goals
    cash flow
    emergency fund

22. Support semantic states:

    positive
    attention
    neutral
    opportunity

23. Do not equate:
    increase = bad
    decrease = good

24. Use shared Skeleton for loading.

25. Preserve the original insight
    if detailed analysis fails.

26. Show data freshness when relevant.

27. Do not fabricate missing
    financial information.

28. Use calm motion.

29. Respect reduced motion.

30. Insight action must be
    keyboard accessible.

31. Dialog/Drawer focus must be
    managed correctly.

32. Closing details returns focus
    to the triggering action.

33. InsightCard owns:

    summary
    value
    action

34. InsightDetails owns:

    explanation
    breakdown
    recommendation
    AI entry

35. AI owns:

    contextual conversation

36. Financial data layer owns:

    observations
    calculations
    comparisons
    timestamps

06 — INSIGHT BEHAVIOR

Pattern:

Insight
  ↓
Explanation
  ↓
Recommendation
  ↓
AI

Home:

Spending
↑ 18% this month

Understand →

Details:

What changed?
Why did it change?
What can I do?

Then:

Ask Fermor ✦

Desktop:
Dialog

Mobile:
Drawer / Bottom Sheet

Important:

Observation ≠ inference.

Use financial data to establish
what happened.

Use interpretation to explain
likely causes.

Use recommendation to suggest
a useful next step.

Use AI for deeper exploration.

Principle:

An Insight should never end
with information.

It should provide a path
to understanding and action.