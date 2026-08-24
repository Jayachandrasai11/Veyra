14 — EMPTY STATE + CTA — IMPLEMENTATION RULES

1. Create a reusable EmptyState component.

2. Structure:

   Icon / Illustration
   Title
   Description
   Optional supporting text
   Primary CTA

3. Always explain why the state is empty
   when the reason is useful to the user.

4. Provide one clear primary action.

5. Do not overload empty states with
   multiple competing CTAs.

6. EmptyState should support variants:

   FirstTime
   NoData
   NoResults
   Error
   Restricted
   Completed

7. Do not use "No data" as the only message
   when a more useful explanation is possible.

8. First-time empty states should guide
   the user toward the next meaningful action.

9. No accounts:
   Primary CTA → Connect accounts

10. No goals:
    Primary CTA → Create goal

11. No investments:
    Primary CTA → Connect account

12. No search results:
    Primary CTA → Clear filters / modify search

13. Do not automatically include
    Ask Fermor in every empty state.

14. Use Lucide Icons only.

15. Use Fermor typography tokens.

16. Use Fermor spacing tokens.

17. Use Fermor button system.

18. Support light and dark themes.

19. Keep empty states visually calm.
    Avoid excessive illustration, gradients,
    animation or decoration.

20. Empty states should be responsive.

21. Ensure the empty state communicates
    meaning without relying on color.

22. Use the global motion system only for
    subtle entrance or interaction animation.

23. EmptyState must remain independent from
    page-specific business logic.

24. The parent page determines:
    - why the state is empty
    - which variant to use
    - which CTA to display
14 — EMPTY STATE + CTA

Purpose:
Help users understand an unavailable,
missing or not-yet-created experience
and provide the clearest next action.

Structure:

EmptyState
├── Icon / Illustration
├── Title
├── Description
├── Optional supporting text
└── Primary CTA

Core principle:

Explain the state
        ↓
Explain the value
        ↓
Provide one clear action

Primary Fermor example:

No financial accounts connected

Connect your accounts to see
your complete financial picture.

[ Connect accounts ]

Variants:

• First-time
• No data
• No results
• Error
• Restricted
• Completed

Visual direction:

Quiet
Clear
Minimal
Action-oriented
Financially trustworthy

Avoid:

• Generic "No data"
• Multiple competing CTAs
• Excessive illustrations
• Unnecessary AI actions
• Excessive animation