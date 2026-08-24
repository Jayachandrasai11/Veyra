AI IMPLEMENTATION RULE
LOADING / SKELETON IMPLEMENTATION


Connecting
Saving
Creating
Updating
Reconnecting




IMPORTANT:


Skeleton:
Content is loading.


Loader:
Action is processing.




RULE:


Match skeleton dimensions
to final component dimensions.


Prevent layout shift.




PROGRESSIVE LOADING:


Independent sections can
load independently.


Do not block the entire
dashboard unnecessarily.




STATES:


Loading
Loaded
Error
Empty




ANIMATION:


Subtle pulse / shimmer


Duration:
1.5–2 seconds


Respect reduced motion.




COLORS:


Use Fermor design tokens.


Do not hardcode separate
Skeleton colors.




ACCESSIBILITY:


Appropriate loading status
aria-busy where required
Do not expose skeleton
as real financial data.
Final Version to Save
# 27 — Loading / Skeleton




────────────────────────


ANIMATION


Subtle pulse / shimmer


Duration:
1.5–2 seconds


Respect:


prefers-reduced-motion




────────────────────────


COLORS


Use Fermor design tokens.


Do not create a separate
Skeleton color system.




────────────────────────


ERROR


Loading
↓
Error


Example:


Couldn't load your financial data.


[ Try again ]




Never leave a Skeleton
indefinitely.




────────────────────────


ACCESSIBILITY


Appropriate loading status
aria-busy where required
Keyboard accessible actions
Do not expose Skeleton
as real financial data.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Skeleton.


Use Fermor design tokens.


Use Motion.dev only where
animation is required.


Create reusable loading
components rather than
rebuilding Skeletons for
each page.