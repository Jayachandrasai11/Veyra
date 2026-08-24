AI IMPLEMENTATION RULES

Give these rules to your coding AI:

FINANCIAL HEALTH SUMMARY — IMPLEMENTATION RULES
   --success
   --warning
   --error
   --background


9. Use Lucide Icons exclusively.


10. Use TrendingUp for positive trend,
    TrendingDown for negative trend,
    and Minus for unchanged trend.


11. Do not use emoji.


12. Do not create a circular gauge or generic
    progress bar unless explicitly requested.


13. The score must have the strongest visual
    hierarchy.


14. Status must be visually secondary to the score.


15. Trend must communicate both direction and
    numerical change.


16. Do not rely on color alone for trend/status.


17. "See why" must be an accessible link/action
    that navigates to the Financial Health detail
    experience.


18. On mobile, stack the score, status, trend,
    explanation, and CTA vertically.


19. Provide loading/skeleton state.


20. Never display 0/100 as a placeholder while
    loading.


21. Provide a no-data state when financial health
    cannot be calculated.


22. Provide an error state when financial data
    cannot be retrieved.


23. Support dark mode using the same semantic
    tokens.


24. Do not add large gradients, glass effects,
    excessive shadows, glowing effects, or
    unnecessary animation.


25. Use Motion.dev only for subtle state/number
    transitions.


26. Ensure keyboard accessibility and visible
    focus states.


27. The component should work inside the Home
    dashboard and remain reusable elsewhere.


28. Keep business/scoring logic outside the
    component.


29. Do not invent score thresholds in the UI.


30. Maintain Fermor's visual language:
    calm, trustworthy, minimal, financial,
    explainable.
27 — FINAL COMPONENT SPECIFICATION
# 35 — Financial Health Summary ⭐
month, mainly because your savings
rate increased.


See why →




VARIANTS


Default
Loading
No Data
Error
Stale Data




ICONS


TrendingUp
TrendingDown
Minus


Lucide only.




CTA


See why →




DESIGN


Score = strongest hierarchy
Status = secondary
Trend = supporting
Explanation = contextual
CTA = navigation




DO NOT


Use generic Metric Card
Use emoji
Use giant gauges
Use excessive gradients
Use color as the only status signal
Calculate score inside component
Invent score thresholds




RESPONSIVE


Desktop → compact horizontal hierarchy
Mobile → vertical hierarchy




MOTION


Motion.dev
Subtle score/state transitions only.




ACCESSIBILITY


Semantic structure
Keyboard accessible
Visible focus
Meaningful screen-reader content
No color-only communication




PRIMARY UX PRINCIPLE


Don't just tell users their score.


Help them understand what it means
and give them a clear path to discover why.