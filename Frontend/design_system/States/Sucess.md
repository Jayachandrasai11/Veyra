26 — AI Implementation Rules
07.10 — SUCCESS STATE

1. Success means an operation completed successfully.

2. Do not silently change important financial data.

3. Confirm what happened.

4. Explain what changed when useful.

5. Show updated data immediately.

6. Use the appropriate feedback level:
   ├── Silent
   ├── Inline
   ├── Toast
   ├── Confirmation
   └── Full Success State

7. Important financial actions should provide
   stronger confirmation than trivial actions.

8. Account connection and financial-data sync
   are separate states.

9. Do not claim financial data is updated
   until it actually is.

10. Goal changes should update the Goal UI
    immediately after successful persistence.

11. AI success should usually reveal the
    insight itself rather than saying
    "AI completed."

12. Preserve:
    AI Insight
    +
    Action
    +
    Ask Fermor

13. Success indicators must not rely only on color.

14. Use subtle success animation only when
    it improves feedback.

15. Success feedback should not unnecessarily
    block the user.

16. Background operations may surface success
    through Notifications.

17. Dynamic success messages should be
    accessible to assistive technology.

18. Every Processing state must have a defined
    Success outcome.

19. Reuse the global Fermor Success pattern.

20. Success should create confidence:
    the user knows what happened,
    what changed, and what they can do next.
Design File Record
# 07.10 — Success State

PURPOSE

Confirm that an operation completed
successfully and communicate what changed.


CORE FLOW

User Action
   ↓
Processing
   ↓
✓ Success
   ↓
Updated UI


ANATOMY

Success
├── Status indicator
├── Title
├── Explanation
├── Updated result
└── Optional action


EXAMPLE

✓ Account connected

Chase account is now connected.


GOAL

✓ Goal updated

Your Home goal is now ₹20L.


FEEDBACK LEVELS

Low importance
→ Silent / Inline

Medium importance
→ Toast

High importance
→ Confirmation / Full success state


ACCOUNT CONNECTION

Connected
≠
Financial data synced

Possible flow:

✓ Account connected
      ↓
Syncing financial data
      ↓
✓ Financial data updated


AI

Do not show:

✓ AI completed

Instead show:

✦ Fermor noticed

Your spending increased 18%.

[See what changed] [Ask Fermor]


UPDATED UI

Success feedback must be accompanied
by the new persisted state where appropriate.


ACCESSIBILITY

Use:

✓ + text

Do not rely only on color.

Dynamic feedback:
aria-live="polite"
role="status"


ANIMATION

Optional:
subtle checkmark / fade / scale

Avoid:
confetti
large celebrations
blocking animations


CORE RULE

Success should answer:

What happened?
What changed?
What can I do next?

Then get out of the user's way.