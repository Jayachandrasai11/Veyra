28 — AI Implementation Rules
07.11 — WARNING STATE

1. Warning means the system is functioning,
   but something deserves attention.

2. Warning is different from Error.

3. Do not hide valid data just because
   it is stale.

4. Show existing data + warning when possible.

5. Explain:
   ├── What happened?
   ├── What does it affect?
   └── What can the user do?

6. Use warning states for:
   ├── Stale data
   ├── Account attention
   ├── Goal risk
   ├── Unusual spending
   ├── Delayed market data
   ├── Partial data
   └── Other non-blocking concerns.

7. Use stronger visual treatment for
   higher-severity warnings.

8. Do not make every warning a full-page alert.

9. Place warnings as close as possible
   to the affected information.

10. Warning should generally not block
    normal navigation or usage.

11. Don't rely only on color.

12. Use a consistent warning icon.

13. Avoid continuous warning animations.

14. Provide an action when a meaningful
    recovery or next step exists.

15. Don't use AI language for technical
    account warnings unless it adds value.

16. Financial warnings should preserve
    user confidence and avoid unnecessary alarm.

17. Warning conditions should be represented
    in the global state system.

18. Warnings must work across:
    Desktop
    Tablet
    Mobile.

19. Warning components should be reusable.

20. Core principle:

    Warning =
    "Fermor is working, but
     you should know about this."
Design File Record
# 07.11 — Warning State

PURPOSE

Communicate that something needs attention
while the system remains functional.


CORE DIFFERENCE

Warning
→ Working, but concern exists.

Error
→ Operation failed / unavailable.


ANATOMY

Warning
├── Icon
├── Title
├── Explanation
├── Impact
└── Optional Action


EXAMPLE

⚠ Your investment data is from yesterday.

Your account is connected, but the latest
data hasn't synced yet.

[Refresh data]


COMMON FERMOR WARNINGS

├── Data hasn't synced recently
├── Account needs attention
├── Goal may be behind schedule
├── Spending unusually high
├── Market data delayed
├── Partial financial data
└── Offline / cached data


STALE DATA

Show:

₹11.2L

⚠ Updated yesterday

Do not replace valid stale data
with a loading skeleton.


ACCOUNT

⚠ Account needs attention

Your connection requires
re-authentication.

[Reconnect account]


GOAL

⚠ You're behind your target pace.

[Adjust plan]


SPENDING

⚠ Spending is unusually high.

You've spent 18% more than your
usual monthly pace.

[See what changed] [Ask Fermor]


WARNING RULE

Warning
+
Explanation
+
Optional Action


VISUAL

Success → ✓
Warning → ⚠
Error → ✕
Info → i


COLOR

Never rely on color alone.


ANIMATION

Subtle appearance only.
No continuous flashing or pulsing.


CORE RULE

A warning should make the user
more informed — not more anxious.