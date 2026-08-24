AI IMPLEMENTATION RULE
DIVIDER IMPLEMENTATION


Foundation:


shadcn/ui Separator


Create:


FermorSeparator




Types:


Horizontal
Vertical




Default:


1px


Color:


--border




Primary use:


Content grouping
Card sections
Settings groups
Account sections
Transaction groups




Avoid:


Separating every card
Separating every paragraph
Using dividers instead of spacing




Hierarchy rule:


Spacing first.


Divider second.




Horizontal:


Primary




Vertical:


Use sparingly.




Motion:


None by default.




Accessibility:


Use semantic separator behavior.


Decorative separators should not
create unnecessary screen-reader noise.
Final Version to Save
# 23 — Divider / Separator


────────────────────────


IMPORTANT UX RULE


Use spacing first.


Use dividers when a clear
content boundary is required.


Do not use dividers between
every card or every piece of content.




────────────────────────


CARDS


Do not automatically divide:


Header
Content
Footer


Use spacing when sufficient.


Use a divider only when
the separation improves scanning.




────────────────────────


COLORS


Use:


--border


Do not hardcode black or white
for every divider.




────────────────────────


MOTION


None by default.




────────────────────────


ACCESSIBILITY


Use shadcn/Radix separator behavior.


Decorative separators should not
create unnecessary screen-reader noise.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Separator.


Create:


FermorSeparator


Customize with Fermor design tokens.