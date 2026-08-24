30 — IMPLEMENTATION RULE
DATA DISPLAY
Investments
Connected Accounts
Detailed Financial Data




RESPONSIVE:


Desktop:
Table


Tablet:
Reduced columns


Mobile:
Simplified data list




FINANCIAL NUMBERS:


Right aligned


Use:
Sign + Label + Color
where appropriate.




DENSITY:


Default:
Comfortable


Avoid financial-terminal density.




STATES:


Loading
Empty
Error
Default
Hover
Selected




INTERACTION:


Clickable rows where useful.


Mobile row details:
Drawer.




ACCESSIBILITY:


Semantic tables
Keyboard support
Screen reader support
Visible focus
Accessible sorting




IMPORTANT:


Don't use tables everywhere.


Use tables for structured,
comparable information.


Use cards and lists for
higher-level dashboard content.
Final version to save
# 32 — Data Display


Example:


No transactions found


Try changing your filters.


[ Clear filters ]




────────────────────────


ERROR


Couldn't load transactions.


[ Try again ]




────────────────────────


DENSITY


Default:


Comfortable


Avoid financial-terminal
visual density.




────────────────────────


VISUAL STYLE


Subtle borders
Clear spacing
Quiet headers
Strong financial values


Avoid excessive boxes.




────────────────────────


ACCESSIBILITY


Semantic table
Keyboard navigation
Screen reader support
Visible focus
Accessible sorting
Accessible selection




────────────────────────


AI INTEGRATION


Data Display
+
Ask Fermor


Users should be able to
understand the data without
losing access to the underlying
financial information.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Data Table
for the UI foundation.


Use TanStack Table for
advanced table behavior.


Customize the visual design
to match Fermor.