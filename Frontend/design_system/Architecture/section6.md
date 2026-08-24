SECTION 06 — THOUGHT FROM FERMOR — IMPLEMENTATION RULES

1. Pattern:
   AI Recommendation

2. Component:
   AIInsight

3. This is NOT a chat component.

4. This is NOT a generic notification.

5. Pattern:

   Observation
       ↓
   Explanation
       ↓
   Action
       ↓
   Ask Fermor

6. Reuse the global Card foundation.

7. AI identity uses:
   --accent

8. Use Lucide Sparkles.

9. Sparkles:
   20px
   2px stroke

10. AI label:
    A THOUGHT FROM FERMOR

11. Insight is the primary content.

12. Explanation is optional.

13. Primary action:
    See what changed →

14. Primary action uses Arrow Link.

15. Secondary AI action:
    Ask Fermor ✦

16. Ask Fermor uses the AI / Brand
    button variant.

17. Ask Fermor must receive context
    from the originating insight.

18. Never open an uncontextualized
    generic AI conversation when the
    user came from an insight.

19. AI generates structured data,
    not UI markup.

20. AI cannot choose arbitrary:
    colors
    spacing
    typography
    layout
    components

21. React controls presentation.

22. Insight types are data-driven.

23. Supported types may include:
    spending
    saving
    goals
    investments
    emergency-fund
    credit
    debt
    cash-flow

24. Do not fabricate an insight when
    no meaningful observation exists.

25. Empty AI state should generally
    render nothing.

26. Loading uses global Skeleton.

27. Errors use global Error + Recovery.

28. Preserve the previous insight when
    possible if a refresh fails.

29. Desktop actions:
    horizontal.

30. Mobile actions:
    may stack.

31. Do not force actions onto one line
    when they become cramped.

32. Avoid chatbot visual patterns.

33. Avoid excessive AI gradients.

34. Avoid glowing AI borders.

35. Avoid decorative AI animations.

36. Use subtle entrance motion only.

37. Respect reduced motion.

38. Use Fermor tokens exclusively.

39. Maintain semantic article structure.

40. Make all actions keyboard accessible.

41. AI output must remain within
    the design system constraints.

42. The component should be reusable
    across Home, Insights and Goals.


SECTION 06 — A THOUGHT FROM FERMOR

Pattern:
AI Recommendation

Component:
AIInsight

Purpose:
Surface a proactive financial observation
and provide a clear next step.

Architecture:

AIInsight
│
├── AILabel
├── Insight
├── Explanation
└── Actions
    ├── See What Changed
    └── Ask Fermor

Core model:

Observation
    ↓
Explanation
    ↓
Action
    ↓
Ask AI

AI identity:

✦ A THOUGHT FROM FERMOR

AI icon:
Sparkles

AI color:
--accent

Primary action:
Arrow Link

AI action:
AI / Brand Button

Important distinction:

AIInsight ≠ Chat

AIInsight ≠ Notification

AIInsight =
Financial observation +
Explanation +
Action

AI principle:

AI provides structured intelligence.
React provides the UI.

Never allow AI-generated content
to directly control visual design.

States:

Meaningful insight → Render
No insight → Don't render
Loading → Skeleton
Error → Recovery

Ask Fermor:

Must carry context from the
originating insight.