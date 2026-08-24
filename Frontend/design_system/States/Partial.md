28 — Core Partial Data Rules
07.14 — PARTIAL DATA STATE

1. Partial means some financial data exists,
   but the financial picture is incomplete.

2. Never pretend partial data is complete.

3. Never interpret missing data as zero.

4. Show available information normally
   when it is valid.

5. Clearly identify missing information.

6. Tell the user how the missing data
   affects the financial picture.

7. Provide a contextual connection action.

8. Financial Health should communicate
   its data coverage when relevant.

9. Net Worth should not imply completeness
   when required assets/liabilities are missing.

10. AI insights must account for
    incomplete financial context.

11. Don't repeat "partial data" on every card.

12. Communicate coverage at the appropriate
    section or dashboard level.

13. Partial data should not disable unrelated
    features.

14. Missing investments should not prevent
    the user from viewing bank data.

15. Missing credit should not make valid
    goal data disappear.

16. Use MissingDataCard for unavailable
    account categories.

17. Partial state should work with:
    Loading
    Error
    Warning
    Stale
    Offline.

18. Preserve existing valid data if another
    data source is unavailable.

19. Use consistent responsive layouts.

20. Core principle:

    PARTIAL =
    "Fermor knows some of your picture,
     but not all of it yet."
Design File Record
# 07.14 — Partial Data State

PURPOSE

Represent a financial picture where
some data is available but important
data is still missing.


EXAMPLE

YOUR MONEY AT A GLANCE

Financial Health
72 / 100

Based on 1 connected account.


AVAILABLE

Net Worth
₹18.4L
✓


MISSING

Investments
Not connected
[Connect]


Credit
Not connected
[Connect]


CORE DIFFERENCE

Empty
→ Nothing exists.

Partial
→ Some data exists.

Complete
→ Expected data is available.


NEVER

Missing investments
→ ₹0 investments

Instead:

Investments
→ Not connected


COVERAGE

1 of 3 account types connected.


ACCOUNT COVERAGE

✓ Bank
+ Investments
+ Credit


AI

Insights must reflect available
financial context.

Example:

Your spending increased 18%.

Based on your connected bank account.

[See what changed] [Ask Fermor]


COMPONENTS

PartialData
MissingDataCard
DataCoverage
FinancialMetric


STATE MODEL

FinancialMetric
├── Loading
├── Available
├── Partial
├── Stale
├── Error
├── Empty
└── Offline


RESPONSIVE

Mobile → 1 column
Tablet → 2 columns
Desktop → 3 columns


CORE RULE

Show what Fermor knows.

Clearly show what Fermor doesn't know.

Never pretend the picture is complete.

This state is worth treating as a core Fermor product pattern, not merely a visual variation. It directly affects the correctness and trustworthiness of the financial dashboard.