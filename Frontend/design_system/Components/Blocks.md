AI IMPLEMENTATION RULE
LIST IMPLEMENTATION


Create reusable:


FermorList
FermorListItem


Specialized variants:


GoalList
TransactionList
AccountList
InvestmentList
NotificationList


Use shadcn/ui primitives.


Use Fermor design tokens.


Use lucide-react exclusively.


Use 1px dividers.


Do not create a Card around every list item.


Use semantic HTML where appropriate.


Support:


Default
Hover
Active
Selected
Loading
Empty
Error


Responsive behavior must be
defined for each list type.
Final Version to Save
# 19 — Lists
Many columns
Comparison
Sorting
Filtering




────────────────────────


RESPONSIVE


Desktop:
Multi-column row


Tablet:
Reduced information


Mobile:
Stack primary and secondary
information.


Never force desktop columns
into mobile.




────────────────────────


MOTION


Hover:
120ms


Expand:
200ms


Insert/remove:
250ms


Use Motion.dev.


Avoid unnecessary animations.




────────────────────────


ACCESSIBILITY


Keyboard accessible.


Visible focus.


Accessible labels.


Clear actions.


Do not make complex rows
entirely clickable.




────────────────────────


IMPLEMENTATION


Use:


FermorList
FermorListItem


Create specialized:


GoalList
TransactionList
AccountList
InvestmentList
NotificationList


Use shadcn/ui primitives.


Use lucide-react.


Use Fermor design tokens.


Do not use a Card around every
list item.