26 — Core Empty State Rules
07.13 — EMPTY STATE

1. Empty means no data exists.

2. Empty is different from:
   Loading
   Error
   Warning
   Stale
   Zero

3. Explain why the state is empty.

4. Give the user a useful next action.

5. The primary CTA should directly
   resolve the empty state.

6. Never show fake financial values
   when real data doesn't exist.

7. Don't show an empty state while
   data is still loading.

8. Don't show an error when the
   correct state is simply empty.

9. Support partial empty states.

10. Don't hide useful existing data
    because another data source is empty.

11. Empty insights should never
    fabricate AI observations.

12. Empty goals should guide users
    toward creating their first goal.

13. Search/filter empty states should
    provide a way to clear or change
    the current filter.

14. Completed empty states can communicate
    that everything is currently okay.

15. Keep empty-state copy concise.

16. Use a shared EmptyState component.

17. Define consistent Tailwind sizing,
    padding, spacing and alignment.

18. Make the primary CTA keyboard accessible.

19. Preserve the same visual pattern
    across desktop, tablet and mobile.

20. Core principle:

    EMPTY =
    "Nothing exists here yet.
     Here's why.
     Here's what you can do next."
Design File Record
# 07.13 — Empty State

PURPOSE

Communicate that no data exists and
give the user a useful next step.


DIFFERENCE

Loading
→ Data is coming.

Error
→ Something failed.

Warning
→ Something needs attention.

Empty
→ No data exists.


ANATOMY

EmptyState
├── Visual
├── Title
├── Description
├── Primary Action
└── Optional Secondary Action


HOME

YOUR MONEY AT A GLANCE

No financial accounts connected.

Connect your accounts to see
your financial picture.

[Connect accounts]


GOALS

YOUR GOALS

You haven't created a financial goal yet.

Create a goal to start tracking
your progress.

[Create a goal]


INSIGHTS

FERMOR NOTICED

No insights yet.

Connect more accounts to give
Fermor a clearer picture.

[Connect accounts]


IMPORTANT

No fake financial values.

No fabricated AI insights.

No empty state while data is loading.


TAILWIND LAYOUT

Large:
min-height: 280px
padding: 40px
content max-width: 420px

Card:
min-height: 180px
padding: 24px


PATTERN

Empty
 ↓
Explanation
 ↓
CTA
 ↓
Setup
 ↓
Processing
 ↓
Success / Error


CORE RULE

Empty state should never feel like
a dead end.

It should tell the user what to do next.