SECTION 05 — YOUR GOALS — IMPLEMENTATION RULES

1. Pattern:
   Goal Tracking

2. Component:
   Goals

3. Structure:

   Goals
   ├── SectionHeader
   └── GoalList
       ├── GoalItem
       └── GoalItem

4. Reuse the global SectionHeader.

5. Reuse the global Progress component.

6. Reuse the global Arrow Link.

7. Use Lucide Icons exclusively.

8. Goal icons:
   Home → House
   Emergency → ShieldCheck
   Car → Car
   Education → GraduationCap
   Travel → Plane
   Custom → Plus

9. Default goal icon:
   20px.

10. Default stroke:
    2px.

11. Do not use emoji.

12. GoalItem structure:

    Icon
    Name
    Percentage
    ProgressBar
    Amount

13. GoalItem top row:

    Icon + Name + Percentage

14. Progress appears below the
    top row.

15. Amount appears below progress.

16. Progress height:
    8px.

17. Progress track uses the global
    secondary surface token.

18. Progress fill uses --primary.

19. Goal percentage must be available
    as text.

20. Never communicate progress
    using the bar alone.

21. Amount format:

    Current / Target

22. Financial values must use the
    shared financial formatting utility.

23. Do not hardcode goal values.

24. Goals should be data-driven.

25. Home should show approximately
    3–4 relevant active goals.

26. Do not render the entire goal list
    on the Home page.

27. Use "View all →" to reach
    the Goals page.

28. Progress should be clamped visually
    between 0 and 100%.

29. A completed goal may display 100%
    while retaining its actual amount.

30. Support goal status:

    active
    completed
    paused
    at-risk

31. Do not overuse status badges.

32. Loading uses global Skeleton.

33. Empty uses global Empty State + CTA.

34. Error uses global Error + Recovery.

35. Preserve layout during loading.

36. Support:
    desktop
    tablet
    mobile.

37. Mobile:
    1-column compact list.

38. Use Fermor spacing tokens.

39. Use Fermor typography tokens.

40. Use Fermor color tokens.

41. Do not introduce arbitrary:
    colors
    spacing
    radius
    shadows
    typography.

42. Keep the Home version compact.

43. Detailed goal editing belongs to
    the Goals experience.

44. Goal data should be independent
    from presentation.

45. Do not create separate visual
    components for every goal type.

46. New goal types should use the same
    GoalItem with a different icon/data.

47. Support keyboard navigation for
    interactive goal items.

48. Respect reduced motion.
SECTION 05 — YOUR GOALS — IMPLEMENTATION RULES

1. Pattern:
   Goal Tracking

2. Component:
   Goals

3. Structure:

   Goals
   ├── SectionHeader
   └── GoalList
       ├── GoalItem
       └── GoalItem

4. Reuse the global SectionHeader.

5. Reuse the global Progress component.

6. Reuse the global Arrow Link.

7. Use Lucide Icons exclusively.

8. Goal icons:
   Home → House
   Emergency → ShieldCheck
   Car → Car
   Education → GraduationCap
   Travel → Plane
   Custom → Plus

9. Default goal icon:
   20px.

10. Default stroke:
    2px.

11. Do not use emoji.

12. GoalItem structure:

    Icon
    Name
    Percentage
    ProgressBar
    Amount

13. GoalItem top row:

    Icon + Name + Percentage

14. Progress appears below the
    top row.

15. Amount appears below progress.

16. Progress height:
    8px.

17. Progress track uses the global
    secondary surface token.

18. Progress fill uses --primary.

19. Goal percentage must be available
    as text.

20. Never communicate progress
    using the bar alone.

21. Amount format:

    Current / Target

22. Financial values must use the
    shared financial formatting utility.

23. Do not hardcode goal values.

24. Goals should be data-driven.

25. Home should show approximately
    3–4 relevant active goals.

26. Do not render the entire goal list
    on the Home page.

27. Use "View all →" to reach
    the Goals page.

28. Progress should be clamped visually
    between 0 and 100%.

29. A completed goal may display 100%
    while retaining its actual amount.

30. Support goal status:

    active
    completed
    paused
    at-risk

31. Do not overuse status badges.

32. Loading uses global Skeleton.

33. Empty uses global Empty State + CTA.

34. Error uses global Error + Recovery.

35. Preserve layout during loading.

36. Support:
    desktop
    tablet
    mobile.

37. Mobile:
    1-column compact list.

38. Use Fermor spacing tokens.

39. Use Fermor typography tokens.

40. Use Fermor color tokens.

41. Do not introduce arbitrary:
    colors
    spacing
    radius
    shadows
    typography.

42. Keep the Home version compact.

43. Detailed goal editing belongs to
    the Goals experience.

44. Goal data should be independent
    from presentation.

45. Do not create separate visual
    components for every goal type.

46. New goal types should use the same
    GoalItem with a different icon/data.

47. Support keyboard navigation for
    interactive goal items.

48. Respect reduced motion.