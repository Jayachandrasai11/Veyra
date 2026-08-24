AI IMPLEMENTATION RULE
ALERT / FEEDBACK IMPLEMENTATION


Size:
18px




ALERT STRUCTURE:


Icon
Title
Description
Action
Close




TOAST:


Keep messages short.


Success:
3–4 seconds


Information:
4–5 seconds


Important errors:
Persistent or longer-lived.




POSITION:


Desktop:
Bottom-right


Mobile:
Bottom




IMPORTANT:


Do not use a toast for
critical financial errors.


Use a persistent Alert.




ACCOUNT ERRORS:


Explain:


What happened
What is affected
What the user can do




MOTION:


150–200ms
easeOut


Use Motion.dev.




ACCESSIBILITY:


Semantic roles
Keyboard support
Visible focus
Screen reader support
Do not rely on color alone.
Final Version to Save
# 26 — Alerts / Feedback
TOAST


Keep messages concise.


Success:
3–4 seconds


Information:
4–5 seconds


Action-required errors:
Persistent / longer duration




────────────────────────


POSITION


Desktop:
Bottom-right


Mobile:
Bottom




────────────────────────


ACCOUNT ERRORS


Always communicate:


What happened
What is affected
What the user can do




────────────────────────


SYNC


Background sync:
Show status in context.


User-triggered sync:
Optional success toast.




────────────────────────


ACCESSIBILITY


Semantic roles
Keyboard support
Visible focus
Screen reader support
Do not rely on color alone.




────────────────────────


MOTION


150–200ms
easeOut


Use Motion.dev.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Alert.


Use shadcn/ui Sonner.


Use Lucide Icons.


Use Fermor semantic tokens.


Do not create a separate
feedback color system.

