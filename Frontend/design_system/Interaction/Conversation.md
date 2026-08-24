08 — ASK FERMOR BEHAVIOR

1. Ask Fermor is the primary
   AI interaction in Fermor.

2. It is not a generic chatbot.

3. Header trigger:

   ✦ Ask Fermor

4. Desktop:

   Large AI panel / Dialog

5. Mobile:

   Full-height Drawer

6. Never open to a completely
   blank interface.

7. Initial state includes
   contextual financial suggestions.

8. Suggestions must be
   financial-product specific.

9. Suggestions can change based
   on the user's current context.

10. Clicking a suggestion should
    submit it directly.

11. Use a multi-line,
    auto-growing prompt input.

12. Support:

    Default
    Focused
    Typing
    Submitting
    Streaming
    Disabled
    Error

13. Use streaming responses
    when supported.

14. Show a calm thinking/loading
    state.

15. Do not use exaggerated
    chatbot animations.

16. Fermor responses should use
    Fermor's visual identity.

17. Do not make Fermor look like
    a generic chat bubble system.

18. Ask Fermor must understand
    its entry point.

19. Possible entry points:

    header
    financial-health
    insight
    goal
    metric
    explore

20. Context should be passed
    automatically.

21. Example:

    Goal
      ↓
    Ask Fermor
      ↓
    Fermor already knows
    which Goal is being discussed.

22. Never make the user repeat
    available financial context.

23. AI must not invent financial
    values.

24. Financial calculations and
    account data come from the
    financial data layer.

25. AI interprets and explains
    supplied data.

26. Financial claims should be
    traceable to available data.

27. Recommendations should lead
    to useful product actions
    where appropriate.

28. Example:

    "Set a spending target?"

    [Set target]

29. AI must not silently perform
    consequential financial actions.

30. Explicit confirmation is
    required before such actions.

31. After an AI response,
    provide useful follow-up
    suggestions where appropriate.

32. Ask Fermor can become a
    conversation entry point from:

    Insights
    Goals
    Financial Health
    Metrics

33. Contextual AI should preserve
    the originating screen context.

34. Closing the AI panel returns
    focus to its triggering action.

35. Keyboard navigation must work.

36. Support:

    Enter → send
    Shift + Enter → newline

37. Use accessible labels and
    focus management.

38. Preserve conversation state
    while the panel remains open.

39. Handle:

    loading
    streaming
    error
    retry

40. Do not claim current financial
    information when data is stale
    or unavailable.

41. Initial release should focus on
    text conversation.

42. Attachments / voice should only
    be introduced when a clear
    Fermor use case exists.

43. Keep AI UI components separate
    from financial business logic.

44. AI components own:

    conversation
    prompt
    messages
    suggestions
    streaming state

45. Financial data layer owns:

    accounts
    transactions
    metrics
    goals
    calculations

46. Context layer connects the two.

47. Use AI Elements for AI primitives,
    but customize their visual styling
    to Fermor.

48. Do not blindly copy the default
    AI Elements appearance.
08 — ASK FERMOR

Pattern:

✦ Ask Fermor
     ↓
AI Interface
     ↓
Suggestions
     ↓
Prompt
     ↓
Conversation
     ↓
Action

Desktop:
Large right-side panel / spacious dialog

Mobile:
Full-height drawer

Initial:

How can I help with your finances?

[How am I doing?]
[Why did my spending increase?]
[Can I afford a house?]

Input:

Ask anything about your finances... ↑

Context:

Header
    → General Fermor

Financial Health
    → Financial Health context

Insight
    → Insight context

Goal
    → Goal context

Metric
    → Metric context

Important:

Never open a blank chatbot
when contextual suggestions
can be provided.

Never make the user repeat
financial information Fermor
already has.

Never let AI invent financial
numbers.

Financial data
    ↓
AI interpretation
    ↓
Recommendation
    ↓
Action / conversation

AI is the intelligence layer.

It is not the source of truth.