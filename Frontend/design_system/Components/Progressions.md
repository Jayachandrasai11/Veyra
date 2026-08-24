AI IMPLEMENTATION RULE
PROGRESS IMPLEMENTATION


Use shadcn/ui Progress as the functional foundation.


Do not use the default visual styling directly.


Create a reusable:


GoalProgress


component.


Structure:


Progress
├── ProgressLabel
├── ProgressValue
├── ProgressTrack
│   └── ProgressIndicator
└── Optional Status


Default height:
8px


Track:
--secondary


Indicator:
--primary


Radius:
Full


Percentage:
14px / 600


Label:
16px / 600


Value:
14px


Animation:
400ms / easeOut


Use Motion.dev for value transitions.


Use Lucide React for status icons.


Do not use gradients, glow, shimmer,
or continuous animation by default.
Final Version to Save
# 17 — Progress




────────────────────────


STATES


0%
In progress
100%
Completed




────────────────────────


MOTION


Value transition:
400ms


Easing:
easeOut


No shimmer.
No glow.
No continuous animation.




────────────────────────


ACCESSIBILITY


Expose:


Current value
Minimum
Maximum
Accessible label


Example:


Home goal progress:
40 percent




────────────────────────


RESPONSIVE


Desktop:
Full available width


Mobile:
Full width


Keep label, percentage and
financial value visible.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Progress.


Create reusable GoalProgress.


Use Fermor color, typography,
spacing and radius tokens.


Use Motion.dev for progress transitions.


Use lucide-react for status icons.


Do not use the default shadcn
visual styling directly.