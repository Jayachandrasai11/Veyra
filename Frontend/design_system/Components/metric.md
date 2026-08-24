AI IMPLEMENTATION RULE
FINANCIAL METRIC IMPLEMENTATION


Create a reusable:


FinancialMetric


component.


Structure:


Label
Value
Currency / Unit
Trend Icon
Trend Value
Supporting Text


Variants:


default
compact
featured


Use Fermor Financial Number typography.


Default value:
32px


Compact value:
28px


Label:
14px


Supporting text:
12–14px


Trend icon:
14–16px


Use Lucide React.


Do not add decorative icons by default.


Do not add sparklines by default.


Do not determine positive/negative state
solely from whether the number went up
or down.


Use semantic trend states:


positive
negative
neutral


Make the comparison period explicit
where possible.
Final Version to Save
# 18 — Metric / Financial Metric
Use icons only when they communicate
meaning.




────────────────────────


SPARKLINES


Do not use sparklines by default.


Home:
Clean FinancialMetric


Insights:
Use charts/sparklines where trend
shape provides useful information.




────────────────────────


RESPONSIVE


Desktop:
3-column metric grid


Tablet:
2-column grid


Mobile:
1-column stack




────────────────────────


ACCESSIBILITY


Metric must remain understandable
without color or icons.


Example:


Net Worth.
₹18.4 lakh.
Up 6.2 percent this month.




────────────────────────


IMPLEMENTATION


Create reusable:


FinancialMetric


Use Fermor typography tokens.


Use Financial Number typography.


Use Lucide React.


Use semantic trend states.


Do not use decorative icons by default.


Do not use sparklines by default.