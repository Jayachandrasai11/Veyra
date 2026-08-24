30 — Core Error Rules
07.12 — ERROR STATE

1. Error means an operation failed or
   required data is unavailable.

2. Never show raw technical errors to
   normal users.

3. Every important error should answer:

   What happened?
   What does it affect?
   What can I do?

4. Use:
   Problem
   +
   Explanation
   +
   Impact
   +
   Recovery

5. Preserve valid previous financial data
   whenever possible.

6. Do not replace usable stale data with
   a blank error state.

7. Scope errors to the failed resource.

8. Don't turn one failed card into a
   full-dashboard error.

9. Use full-page errors only when the
   page genuinely cannot function.

10. Retry actions must transition:

    Error
      ↓
    Processing
      ↓
    Success / Error

11. Prevent duplicate retry requests.

12. After repeated failures, provide
    additional context or another recovery
    path.

13. For sensitive financial operations,
    never claim an action failed or succeeded
    unless the system can confirm it.

14. Account connection failure and
    data-sync failure are different errors.

15. AI errors should preserve access to
    Fermor where possible.

16. Don't force AI into technical errors
    where a direct recovery action is clearer.

17. Don't rely only on red/color.

18. Use consistent error iconography.

19. Keep error animations subtle.

20. Make error messages accessible.

21. Use shared Fermor Error components.

22. Core principle:

    ERROR =
    "Something didn't work.
     Here's what happened.
     Here's what it affects.
     Here's what you can do."
Design File Record
# 07.12 — Error State

PURPOSE

Explain failed operations and provide
a clear path to recovery.


CORE FLOW

Action
  ↓
Processing
  ↓
Error
  ↓
Explanation
  ↓
Recovery


ANATOMY

Error
├── Problem
├── Explanation
├── Impact
├── Recovery action
└── Optional secondary action


STANDARD EXAMPLE

We couldn't update your financial data.

Your previous data is still available.

[Try again]


THREE QUESTIONS

What happened?
→ We couldn't update your financial data.

What does it affect?
→ Your previous data is still available.

What can I do?
→ Try again.


FINANCIAL DATA

Existing valid data:
→ Keep it visible

Show:
⚠ Couldn't update
Last updated 2 hours ago.

[Try again]


ACCOUNT

We couldn't connect your account.

Your bank requires you to sign in again.

[Reconnect account]


GOAL

We couldn't update your goal.

Your previous goal settings are unchanged.

[Try again]


AI

Fermor couldn't complete this analysis.

[Try again] [Ask Fermor]


CRITICAL ACTION

If completion cannot be confirmed:

We couldn't confirm whether this action
completed.

Please check your account before trying again.


SCOPING

Card error
→ Card-level

Section error
→ Section-level

Page unavailable
→ Page-level


VISUAL

Success → ✓
Warning → ⚠
Error   → ✕
Info    → i


CORE RULE

Never just say:

ERROR 500

Always communicate:

Problem
+
Impact
+
Recovery