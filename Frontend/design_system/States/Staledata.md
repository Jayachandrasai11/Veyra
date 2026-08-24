Visual Specification

For the implementation file, define this explicitly:

StaleDataIndicator

Display:
last updated timestamp

Fresh:
no indicator

Aging:
muted metadata

Stale:
warning indicator + timestamp

Refresh available:
refresh action

Refreshing:
spinner + "Updating..."

Failure:
error feedback + retry

Previous value:
remain visible during refresh
Tailwind-oriented rule
Timestamp
→ text-sm

Status indicator
→ inline-flex
→ gap-1.5

Refresh action
→ compact button
→ min-height: 36px

Card
→ do not change dimensions between
  Fresh / Aging / Stale states