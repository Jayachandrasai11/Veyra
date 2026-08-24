AI IMPLEMENTATION RULE
ICON BUTTON IMPLEMENTATION


Use shadcn/ui Button with the icon variant.


Use lucide-react exclusively for icons.


Default icon button:
40 × 40px


Default icon:
20px


Small:
32 × 32px / 16px icon


Large:
44 × 44px / 20–24px icon


Touch target:
minimum 44 × 44px


Header icon buttons:
Ghost variant


Every icon-only button must include
an accessible aria-label.


Do not use emoji, Unicode symbols,
Font Awesome, or custom SVG icons.
Final Version to Save
# 12 — Icon Buttons
Ghost
Outline
Destructive


Header / Navigation:
Ghost


Destructive actions:
Destructive




────────────────────────


STATES


Default
Hover
Active
Focus
Disabled
Loading


Hover:
120ms / easeOut




────────────────────────


CORE ICONS


Notifications → Bell
More → MoreVertical
Back → ArrowLeft
Forward → ArrowRight
Add → Plus
Close → X
Dropdown → ChevronDown
Search → Search
Refresh → RefreshCw
Edit → Pencil
Delete → Trash2




────────────────────────


ACCESSIBILITY


Every icon-only button must have
an accessible name.


Use aria-label where required.




────────────────────────


IMPLEMENTATION


Foundation:
shadcn/ui Button


Icons:
lucide-react


Do not use emoji, Unicode symbols,
Font Awesome, or random SVG icons.