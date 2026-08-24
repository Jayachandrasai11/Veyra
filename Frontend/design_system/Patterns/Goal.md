GOALS PROGRESS — IMPLEMENTATION RULES

1. Name the overall pattern GoalProgressSection.

2. Name each individual item GoalProgressRow.

3. Use the compact-list pattern on Home.

4. Do not use large goal cards on the Home dashboard.

5. Show a maximum of 2–3 goals on Home.

6. The full Goals page should contain the
   complete goal collection.

7. Goal Detail should contain deeper
   financial information and scenarios.

8. Each Home goal row should contain:
   icon
   goal name
   progress percentage
   progress track
   current amount
   target amount.

9. Use Lucide Icons exclusively.

10. Do not use emoji.

11. Do not hardcode goal progress.

12. Progress values must come from
    application/business data.

13. Presentational components must not
    perform financial calculations.

14. Use a thin progress track.

15. Progress track should use semantic
    Fermor design tokens.

16. Use full radius for the progress track.

17. Do not use the default shadcn Progress
    visual appearance without customization.

18. Do not show "On Track" on every normal
    Home goal unless it provides meaningful
    additional information.

19. Goal status must never rely on color alone.

20. Support:
    loading
    empty
    unavailable
    error
    completed.

21. Never use 0% as a placeholder for
    unavailable data.

22. A goal row may be clickable when it has
    a meaningful Goal Detail destination.

23. Do not create multiple competing CTAs
    inside one goal row.

24. Use subtle hover states.

25. No excessive animation.

26. Motion.dev may be used for subtle
    progress/state transitions.

27. Support responsive behavior.

28. Desktop:
    compact vertical list.

29. Tablet:
    maintain compact list.

30. Mobile:
    stack goal rows vertically.

31. Keep Home focused on summary.

32. Do not expose advanced goal scenarios
    inside the Home goal section.

33. Use "View all goals →" to reach
    the complete Goals experience.

34. Maintain Fermor's visual language:
    calm, clean, trustworthy,
    progress-focused, not gamified.

    DESIGN NOTES

• Home uses Goal Progress as a compact list.

• Goals Page provides the complete collection.

• Goal Detail provides deep analysis and
  scenario planning.

• Don't turn Home goals into large cards.

• Show only 2–3 important goals on Home.

• Progress should be immediately scannable.

• Percentage + progress + current/target
  should form one information unit.

• Use thin progress tracks.

• Don't overuse status labels.

• Don't communicate status through color alone.

• Never show fake 0% for unavailable data.

• Completed goals need explicit completion
  treatment.

• Goal progress is not the same semantic
  as Financial Health.

• Keep Home simple; move complexity to
  Goal Detail.

• Avoid gamification.

• Fermor should feel like a financial planning
  product, not a habit-tracking app.