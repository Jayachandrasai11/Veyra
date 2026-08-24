07 — GOAL BEHAVIOR

1. Goal is a reusable progress-to-action
   pattern.

2. Home goal remains compact.

3. Example:

   Home
   40%
   ₹8L / ₹20L

4. Clicking the goal opens
   Goal Details.

5. Desktop:
   Dialog.

6. Mobile:
   Drawer / Bottom Sheet.

7. Goal Details should show:

   Current amount
   Target
   Progress
   Monthly contribution
   Estimated completion

8. Where useful, also show:

   Current pace
   Required pace
   Ahead / On track / Behind

9. Progress must not be the only
   measure of goal health.

10. Do not determine "at risk"
    from percentage alone.

11. Goal status should consider:

    progress
    time
    contribution pace
    target date

12. Goal supports:

    Not Started
    In Progress
    Near Target
    Completed
    Over Target
    Paused
    At Risk

13. Overfunded goals should not
    behave like ordinary progress bars.

14. Show:

    Target reached
    or
    Target exceeded

    when appropriate.

15. Primary goal action:

    Add money

16. Secondary actions:

    Edit goal
    Adjust target

17. AI action:

    Ask Fermor ✦

18. Ask Fermor must receive
    contextual goal data.

19. AI context should include:

    goal
    current amount
    target
    progress
    contribution
    target date
    projection
    pace

20. Do not open a blank AI chat
    from a Goal.

21. Goal Details should provide
    deterministic financial information
    before AI guidance.

22. Add Money should update the
    goal and trigger the same
    restrained value/progress animation.

23. Edit Goal and Adjust Target
    should be separate flows.

24. Adjust Target should preview
    the resulting progress.

25. View all goals navigates to
    the Goals experience.

26. Individual Goal interaction
    opens that goal's details.

27. Loading uses shared Skeleton.

28. Unknown data must not be
    represented as zero.

29. Preserve last-known data when
    appropriate during API failure.

30. Show freshness for stale data.

31. Use approximately 400ms motion
    for meaningful progress/value changes.

32. Do not animate progress merely
    because the component mounted.

33. Respect reduced motion.

34. GoalItem owns:

    identity
    compact progress
    amount
    trigger

35. GoalDetails owns:

    progress
    contribution
    projection
    pace
    actions

36. Goal forms own:

    editing
    adding money
    target adjustment

37. Data layer owns:

    goal state
    calculations
    projection
    pace
    status

38. AI owns:

    contextual planning
    explanation
    recommendations

07 — GOAL BEHAVIOR

Pattern:

Goal
  ↓
Goal Details
  ↓
Progress understanding
  ↓
Action
  ↓
AI guidance

Home:

Home
40%
₹8L / ₹20L

Click:

Goal Details

Show:

₹8L / ₹20L
40%

Target
₹20L

Monthly contribution
₹50,000

Estimated completion
March 2028

Optional:

Current pace
Required pace
Ahead / On track / Behind

Actions:

Add money
Edit goal
Adjust target
Ask Fermor ✦

Important:

Progress ≠ Goal Health

A goal can be 20% complete
and still be on track.

A goal can be 70% complete
and still be at risk.

Use:

progress
+
time
+
pace
+
target date

AI:

Goal Details
  ↓
Ask Fermor
  ↓
Contextual goal conversation

Never:

Goal
  ↓
Blank chatbot

Principle:

The Goal should answer:

"How close am I?"

Details should answer:

"Am I on track?"

Actions should answer:

"What can I do?"

AI should answer:

"How should I plan?"