FINANCIAL INSIGHT FEED — IMPLEMENTATION RULES

1. Name the pattern FinancialInsightFeed.

2. Name individual items FinancialInsight.

3. Do not call these NotificationCards.

4. These components represent financial
   observations generated from financial data.

5. Each insight should communicate:
   Observation → Context → Action.

6. Use a maximum of one primary action
   per insight.

7. Do not make every insight red/yellow/green.

8. Use semantic insight types:
   positive
   attention
   opportunity
   milestone
   informational.

9. Color must never be the only way to
   communicate meaning.

10. Do not create fake insights when
    insufficient data is available.

11. AI-generated observations must be
    traceable to actual financial data.

12. Never make unsupported financial claims.

13. Prefer factual language:
    "Spending increased 18%"
    instead of
    "You're spending too much."

14. Detailed reasoning should be available
    on the destination page.

15. Use FinancialInsightFeed on Home.

16. Reuse the same FinancialInsight component
    in future Insights pages where appropriate.

17. Desktop may use a responsive grid.

18. Mobile should stack insights vertically.

19. Do not force equal card heights when
    content differs.

20. Do not use social-feed visual patterns.

21. No avatars, likes, timestamps everywhere,
    notification dots, or social interactions.

22. Use Lucide Icons exclusively.

23. Do not use emoji.

24. Use Fermor semantic color tokens.

25. Use existing Button/Link components
    for insight actions.

26. Do not create a custom button style
    inside the insight component.

27. Support:
    loading
    empty
    partial data
    error.

28. Use skeleton loading states that preserve
    the final layout.

29. Do not add dismiss controls initially.

30. Ask Fermor should be used selectively,
    not as a repeated CTA on every insight.

31. Use subtle hover states only.

32. Avoid excessive animation.

33. Motion.dev may be used for subtle
    entrance/state transitions.

34. FinancialInsightFeed should be responsive.

35. Maintain Fermor's visual personality:
    calm, intelligent, trustworthy,
    analytical, and non-alarming.


    DESIGN NOTES

• Financial Insight Feed ≠ Notification Feed.

• These are financial observations,
  not generic alerts.

• The purpose is:
  What changed?
  Why does it matter?
  What can I do?

• Avoid creating financial anxiety.

• Do not treat every negative change
  as a warning.

• Use factual data-driven language.

• One insight = one clear idea.

• One primary action per insight.

• Don't overload the Home page with
  explanations.

• Home provides the observation.
  Insights provides the analysis.

• Ask Fermor provides deeper explanation
  when useful.

• Insights must be explainable and
  traceable to source financial data.