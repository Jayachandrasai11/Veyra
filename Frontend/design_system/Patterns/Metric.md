21 — 🤖 AI IMPLEMENTATION RULES

Save this directly:

METRIC + TREND — IMPLEMENTATION RULES
8. Never display a trend when comparison
   data does not exist.


9. Never display fake 0% comparison data.


10. Always provide comparison context when
    a trend is displayed.


11. Examples:
    "↑ 6.2% this month"
    "↓ 4.1% vs last month"


12. Use Lucide icons for trend indicators.


13. Recommended icons:
    TrendingUp
    TrendingDown
    Minus


14. Do not rely on color alone to communicate
    trend meaning.


15. Use direction icons and text values
    in addition to semantic color.


16. Trend direction and trend meaning must
    be separate data properties.


17. Do not assume:
    up = positive
    down = negative


18. Example:
    Spending ↑ 18% may represent attention,
    not positive financial progress.


19. FinancialMetric must support different
    financial number formats.


20. Do not hard-code the rupee symbol
    inside the component.


21. Use the global Fermor financial-number
    formatting system.


22. Support:
    loading
    error
    no-comparison
    normal states.


23. Never display ₹0 as a fallback when
    financial data failed to load.


24. Use existing Fermor typography tokens.


25. Use existing Fermor spacing tokens.


26. Support limited size variants:
    sm
    md
    lg


27. Do not create excessive metric variants.


28. The financial value should have the
    strongest visual hierarchy.


29. Label should be visually secondary.


30. Trend should be visually smaller than
    the primary financial value.


31. FinancialTrend should be reusable
    independently when appropriate.


32. Ensure accessible labels communicate
    the full trend meaning.


33. Do not make financial interpretation
    dependent on color.


34. Keep the pattern compact and scannable.


35. Maintain Fermor's calm, trustworthy,
    data-focused visual language.
22 — 📝 DESIGN NOTES

Save this in your design-system file:

METRIC + TREND — DESIGN NOTES


• Structure:


  Label
  Value
  Trend


• Trend contains:


  Direction
  Value
  Period
  Meaning


• Supported states:


  Positive
  Negative
  Neutral
  No comparison


• Always explain the comparison period.


• Do not show fake trend data.


• Do not show 0% when comparison data
  is unavailable.


• Trend direction and financial meaning
  are separate concepts.


• An increase is not always financially positive.


Examples:


  Net Worth ↑ → generally positive


  Savings ↑ → generally positive


  Spending ↑ → may require attention


• Never rely on color alone.


• Use Lucide trend icons.


• Use:
  TrendingUp
  TrendingDown
  Minus


• The financial value is the strongest
  visual element.


• Use Fermor's Financial Number typography.


• Currency should not be hard-coded
  into the component.


• Support loading and error states.


• Never represent failed financial data
  as ₹0.


• Keep the component compact.


• Use a small number of size variants.


• FinancialMetric should be reusable across:


  Net Worth
  Investments
  Savings
  Spending
  Income
  Cash Flow
  Debt
  Other financial KPIs