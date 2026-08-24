AI IMPLEMENTATION RULE
LINK IMPLEMENTATION


Use the Fermor Link system for navigation
and contextual actions.


Use shadcn/ui / Tailwind-based link styling.


Use lucide-react for link icons.


Use ArrowRight for Fermor arrow links.


Use ExternalLink for external destinations.


Do not use Unicode arrows in the actual UI
when a Lucide icon is available.


Do not use a button when a simple navigation
link is more appropriate.


Use Fermor color, typography, spacing and
motion tokens.


Every link must have a visible focus state.
Final Version to Save
# 13 — Links
120ms / easeOut




────────────────────────


NAVIGATION LINK


Used for:


Home
Insights
Goals
Explore


States:


Default
Hover
Active
Focus




────────────────────────


EXTERNAL LINK


Icon:
ExternalLink


Icon size:
14–16px


Gap:
4–6px


Use when leaving Fermor.




────────────────────────


STATES


Default
Hover
Active
Focus
Visited
Disabled




────────────────────────


BUTTON VS LINK


BUTTON:
Changes something or performs an action.


LINK:
Navigates somewhere or reveals related
information.




────────────────────────


ACCESSIBILITY


Every link must have a visible focus state.


Use semantic <a> elements for navigation
whenever appropriate.


Do not use buttons styled as links when a
semantic link is the correct element.




────────────────────────


IMPLEMENTATION


Use Fermor typography and color tokens.


Use lucide-react for icons.


Use Fermor Motion tokens.


Do not use Unicode arrows when a Lucide
icon is available.