05 — FINANCIAL HEALTH BEHAVIOR

1. Financial Health is a signature
   Fermor pattern.

2. It is not a generic metric card.

3. Dashboard presentation:

   Score
   Status
   Trend
   See why

4. Example:

   78 / 100
   Healthy
   ↑ 4 points this month
   See why →

5. "See why" opens contextual
   Financial Health Details.

6. Desktop:
   Dialog.

7. Mobile:
   Drawer / Bottom Sheet.

8. Do not immediately open AI
   when "See why" is clicked.

9. Details architecture:

   Score Summary
   Contributors
   Ask Fermor

10. Contributors explain the
    score change.

11. Example:

    Savings       +12
    Spending       -4
    Investments   +8
    Debt           +2

12. Contribution direction and
    financial sentiment are
    separate concepts.

13. Never infer sentiment
    from the sign alone.

14. Score is not a generic
    progress percentage.

15. Do not use a normal Progress
    component to represent
    78 / 100 unless explicitly
    designed as a score visualization.

16. Ask Fermor is the conversational
    continuation of the details view.

17. Ask Fermor receives contextual
    financial-health data.

18. AI context should include:

    score
    status
    change
    period
    contributors
    entry point

19. Clicking Ask Fermor should
    open a contextual AI experience,
    not a blank chat.

20. Contributors are informational
    by default.

21. Do not make every contributor
    clickable.

22. Loading uses shared Dashboard
    Skeleton components.

23. Error state provides recovery.

24. Preserve the last-known score
    when appropriate if fresh details
    fail.

25. Never represent unavailable
    financial data as zero.

26. Display data freshness when
    financial information may be stale.

27. Dialog/Drawer content should
    share the same component architecture.

28. Desktop and mobile should not
    have separate business logic.

29. Use global Fermor motion tokens.

30. Respect reduced motion.

31. Closing the Dialog/Drawer should
    return focus to "See why".

32. Escape should close the Dialog.

33. Mobile Drawer should support
    appropriate sheet dismissal.

34. FinancialHealth owns:

    score presentation
    status
    trend
    details trigger

35. FinancialHealthDetails owns:

    explanation
    contributors
    AI entry point

36. Data layer owns:

    score calculation
    contributor calculation
    freshness
    API state

37. AI layer owns:

    contextual conversation
    explanation
    recommendations

38. Do not put scoring logic inside
    the presentation component.
05 — FINANCIAL HEALTH BEHAVIOR

1. Financial Health is a signature
   Fermor pattern.

2. It is not a generic metric card.

3. Dashboard presentation:

   Score
   Status
   Trend
   See why

4. Example:

   78 / 100
   Healthy
   ↑ 4 points this month
   See why →

5. "See why" opens contextual
   Financial Health Details.

6. Desktop:
   Dialog.

7. Mobile:
   Drawer / Bottom Sheet.

8. Do not immediately open AI
   when "See why" is clicked.

9. Details architecture:

   Score Summary
   Contributors
   Ask Fermor

10. Contributors explain the
    score change.

11. Example:

    Savings       +12
    Spending       -4
    Investments   +8
    Debt           +2

12. Contribution direction and
    financial sentiment are
    separate concepts.

13. Never infer sentiment
    from the sign alone.

14. Score is not a generic
    progress percentage.

15. Do not use a normal Progress
    component to represent
    78 / 100 unless explicitly
    designed as a score visualization.

16. Ask Fermor is the conversational
    continuation of the details view.

17. Ask Fermor receives contextual
    financial-health data.

18. AI context should include:

    score
    status
    change
    period
    contributors
    entry point

19. Clicking Ask Fermor should
    open a contextual AI experience,
    not a blank chat.

20. Contributors are informational
    by default.

21. Do not make every contributor
    clickable.

22. Loading uses shared Dashboard
    Skeleton components.

23. Error state provides recovery.

24. Preserve the last-known score
    when appropriate if fresh details
    fail.

25. Never represent unavailable
    financial data as zero.

26. Display data freshness when
    financial information may be stale.

27. Dialog/Drawer content should
    share the same component architecture.

28. Desktop and mobile should not
    have separate business logic.

29. Use global Fermor motion tokens.

30. Respect reduced motion.

31. Closing the Dialog/Drawer should
    return focus to "See why".

32. Escape should close the Dialog.

33. Mobile Drawer should support
    appropriate sheet dismissal.

34. FinancialHealth owns:

    score presentation
    status
    trend
    details trigger

35. FinancialHealthDetails owns:

    explanation
    contributors
    AI entry point

36. Data layer owns:

    score calculation
    contributor calculation
    freshness
    API state

37. AI layer owns:

    contextual conversation
    explanation
    recommendations

38. Do not put scoring logic inside
    the presentation component.

