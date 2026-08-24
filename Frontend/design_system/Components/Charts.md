AI IMPLEMENTATION RULE
CHART IMPLEMENTATION
FermorAreaChart
FermorBarChart
FermorDonutChart
FermorSparkline
FermorComparisonChart




CHART TYPES:


Line
Area
Bar
Donut
Sparkline
Comparison




USE CASES:


Line:
Trends over time


Area:
Magnitude / accumulation


Bar:
Category comparison


Donut:
Composition / allocation


Sparkline:
Compact trend


Comparison:
Compare values




IMPORTANT:


Do not finalize chart styling yet.


Data visualization tokens will be
defined in the Data Visualization
section.




REQUIRED:


Title
Context
Period where relevant
Values
Tooltip when interactive
Loading state
Empty state
Error state
Responsive behavior
Accessibility




NUMBER FORMAT:


Use Fermor financial number
formatting consistently.




IMPLEMENTATION:


Use shadcn/ui Charts.


Use existing Fermor design tokens.


Do not invent a separate
chart color system yet.
Final Version to Save
# 25 — Charts
No data ≠ zero.


Never display fake financial
data as placeholder content.




────────────────────────


RESPONSIVE


Desktop
Tablet
Mobile


Charts must remain readable
without overlapping labels.




────────────────────────


ACCESSIBILITY


Titles
Labels
Values
Tooltips
Accessible descriptions
Data representation where required




────────────────────────


NUMBER FORMAT


Use Fermor's global
financial number system.


Examples:


₹18.4L
₹82K
₹48.5K
₹48,500




────────────────────────


VISUAL STYLE


Do NOT finalize chart styling yet.


Define later under:


DATA VISUALIZATION


Including:


Chart colors
Series colors
Gridlines
Axes
Stroke
Fill
Tooltip
Legend
Data points
Positive / negative states




────────────────────────


IMPLEMENTATION


Use shadcn/ui Charts.


Use Fermor design tokens.


Do not create a separate
chart color system yet.