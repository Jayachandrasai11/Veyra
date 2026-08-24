LIST + PROGRESS — IMPLEMENTATION RULES

1. Create a reusable ProgressListItem component.

2. Create a reusable ProgressList component
   for collections of progress items.

3. Do not name the primitive GoalProgress.

4. ProgressListItem must be reusable for:

   Goals
   Budgets
   Savings
   Debt repayment
   Investment targets
   Other financial targets

5. Structure:

   Identity
   Progress
   Percentage
   Amount

6. Identity may contain:

   Icon
   Name
   Optional supporting text

7. Percentage should be displayed
   as readable text.

8. Progress must not rely on the visual
   progress bar alone.

9. Always provide current and target
   financial values when applicable.

10. Recommended compact format:

    Name                 40%
    Progress bar
    ₹8L / ₹20L

11. Recommended variants:

    Compact
    Default
    Detailed

12. Do not create separate visual components
    for each financial use case.

13. GoalList, BudgetList, SavingsList,
    DebtList and InvestmentTargetList
    should reuse ProgressListItem.

14. Progress percentage and financial status
    are separate concepts.

15. Do not determine "good" or "bad"
    purely from percentage.

16. Status may include:

    On track
    At risk
    Behind
    Completed

17. Status must come from financial/business
    logic rather than UI assumptions.

18. Do not rely on color alone to communicate
    progress or status.

19. Progress bar should be visually restrained.

20. Avoid oversized or gamified progress bars.

21. Use Fermor global spacing tokens.

22. Use Fermor global typography tokens.

23. Use Fermor financial-number formatting.

24. Use Lucide Icons only.

25. Support loading states using the
    global Skeleton component.

26. Empty states must use the global
    Empty State pattern.

27. Do not put empty-state logic inside
    ProgressListItem.

28. Support responsive layouts.

29. On mobile, allow the progress bar
    to occupy the full available width.

30. Ensure screen readers receive the
    complete progress meaning.

31. Example accessible description:

    "Home goal is 40 percent complete.
    8 lakh rupees saved of a 20 lakh
    rupee target."

32. Keep the component compact,
    scannable and financially trustworthy.

33. Do not add unnecessary animations.

34. Progress animation, if used, should
    follow Fermor's global Motion system.

12 — LIST + PROGRESS PATTERN

Purpose:
Reusable pattern for tracking progress toward
a financial target.

Primary component:
ProgressListItem

Collection:
ProgressList

Structure:

ProgressListItem
├── Identity
│   ├── Icon
│   ├── Name
│   └── Optional supporting text
├── Percentage
├── Progress
└── Amount

Reusable for:

• Goals
• Budgets
• Savings
• Debt repayment
• Investment targets

Variants:

• Compact
• Default
• Detailed

Compact Home example:

Home                         40%
████████░░░░
₹8L / ₹20L

Important UX rules:

• Percentage must be readable as text.
• Progress bar must not be the only indicator.
• Show current and target values.
• Progress percentage and status are separate.
• Do not assume a percentage is good or bad.
• Status should come from business/financial logic.
• Do not rely on color alone.
• Keep the progress bar restrained.
• Avoid gamification.
• Use responsive behavior.
• Use Fermor financial-number formatting.
• Use Lucide Icons.
• Reuse the global Skeleton and Empty State patterns.