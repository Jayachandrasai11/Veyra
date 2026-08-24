AI IMPLEMENTATION RULE
DIALOG / MODAL IMPLEMENTATION
Secondary action
Primary action




DESTRUCTIVE:


Use semantic error/destructive
styling only for the destructive
action.




CLOSE:


Lucide X


Icon:
20px


Touch target:
44 × 44px minimum




MOBILE:


Use responsive width.


For complex mobile interactions,
consider Sheet / bottom-sheet patterns.




RULE:


Dialog:
Short focused interaction.


Page:
Complex workflow.




LOADING:


Disable submit action.


Show contextual loading:


Connecting...
Saving...
Creating goal...




ACCESSIBILITY:


Focus trapping
Keyboard navigation
Escape
Focus restoration
Screen reader support
Visible focus




MOTION:


150–200ms
easeOut


Use Motion.dev.




COLORS:


Use Fermor design tokens.


Do not create a separate
Dialog color system.
Final Version to Save
# 29 — Dialog / Modal
Keyboard navigation
Escape to close
Focus restoration
Screen reader support
Visible focus




────────────────────────


LOADING


Use contextual loading:


Connecting...
Saving...
Creating goal...
Updating...


Disable duplicate submissions.




────────────────────────


COLORS


Use Fermor design tokens.


Do not create a separate
Dialog color system.




────────────────────────


MOTION


150–200ms
easeOut


Use Motion.dev.


Keep transitions subtle.




────────────────────────


IMPORTANT


Never use vague confirmation
messages for financial actions.


Explain the consequence before
the user confirms.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Dialog as
the technical foundation.


Customize the visual design
to match Fermor.