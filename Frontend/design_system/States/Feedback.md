07.20.9 — Feedback Decision Rule ⭐

Give the AI this decision tree:

Is the feedback tied to a specific component?
        │
       YES
        ↓
     INLINE
Is it a temporary confirmation?
        │
       YES
        ↓
      TOAST
Does it affect the current page/account
and require ongoing awareness?
        │
       YES
        ↓
      BANNER
Does the user need focused interaction?
        │
       YES
        ↓
      MODAL
Does the user need to confirm
a sensitive/destructive action?
        │
       YES
        ↓
     DIALOG
Is it supplementary information?
        │
       YES
        ↓
    TOOLTIP
Does the state need to remain visible?
        │
       YES
        ↓
 STATUS INDICATOR
07.20.10 — Fermor Feedback Matrix
Situation	Feedback	Persistence	Action
Goal updated	Toast	Temporary	Optional
Account connected	Toast + Status	Toast temporary / status persistent	View
Account needs attention	Banner + Status	Persistent	Reconnect
Data is stale	Banner / Inline	Persistent	Update
Offline	Banner	Until reconnect	None
Invalid amount	Inline	Until corrected	Fix input
Financial Health details	Modal	Until closed	Ask Fermor
Delete account	Dialog	Until decision	Confirm / Cancel
Unknown metric term	Tooltip	Temporary	None
Account syncing	Status + Inline	During sync	None
AI thinking	Inline AI status	During generation	Optional stop
AI error	Inline + action	Until resolved	Retry
Permission denied	Inline/Banner	Persistent	Reconnect
07.20.11 — Feedback Priority

When multiple feedback types could work, prefer:

Least disruptive
        ↓
Status Indicator
        ↓
Inline
        ↓
Toast
        ↓
Banner
        ↓
Modal
        ↓
Dialog
Most disruptive

But importance matters more than the hierarchy.

For example, a security-related action should not become a simple toast merely because toasts are less disruptive.

07.20.12 — Important Fermor Rule ⭐

Never communicate an important financial state through visual styling alone.

Bad:

Investment card
→ yellow background

Better:

Investment account

⚠ Needs attention

Your account needs to be reconnected.

[Reconnect account]

The UI should communicate:

State
 ↓
Meaning
 ↓
Impact
 ↓
Action

This becomes the common feedback language across the entire Fermor product.