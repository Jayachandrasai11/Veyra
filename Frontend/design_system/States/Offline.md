07.16.9 — Offline State Machine

This should be saved explicitly for the AI:

┌──────────┐
│  ONLINE  │
└────┬─────┘
     │ connection lost
     ↓
┌──────────┐
│ OFFLINE  │
└────┬─────┘
     │ connection detected
     ↓
┌──────────────┐
│ RECONNECTING │
└────┬─────────┘
     │
     ↓
┌──────────┐
│ SYNCING  │
└────┬─────┘
     │
     ├──────────────→ SUCCESS → ONLINE
     │
     └──────────────→ FAILURE → STALE + ERROR
07.16.10 — Offline Rules
RULE 01
Never destroy existing content because of network loss.

RULE 02
Show the user that the information is cached.

RULE 03
Show freshness information for financial data.

RULE 04
Don't present cached data as live data.

RULE 05
Allow read-only functionality wherever possible.

RULE 06
Disable or explain actions that require connectivity.

RULE 07
Automatically attempt recovery when connectivity returns.

RULE 08
Keep previous valid data visible if synchronization fails.

RULE 09
Don't use a full-screen error for ordinary connectivity loss.

RULE 10
Offline → Reconnecting → Syncing → Success/Failure
must be visually understandable.
07.16.11 — Implementation Specification
OfflineState

Banner:
position: below header
width: 100%
min-height: 40px
padding-inline: 16px

Content:
max-width: same as application container

Status:
Offline
Reconnecting
Syncing
Success
Error

Financial data:
preserve cached value

Freshness:
always display last successful update
when offline

Actions:
network-dependent actions disabled
or show connection-required explanation

Recovery:
automatic reconnect
automatic sync
manual retry available after failure
Important sizing rule

Use the same container, spacing, typography, and state tokens already defined in the Fermor system.

Do not create separate arbitrary values for the offline state.

Final behavior

The ideal Fermor experience is:

User is viewing dashboard
        ↓
Internet disappears
        ↓
Dashboard remains intact
        ↓
"You're offline"
        ↓
Cached financial data remains visible
        ↓
User continues browsing
        ↓
Internet returns
        ↓
"Reconnecting..."
        ↓
"Syncing..."
        ↓
"✓ Updated just now"
        ↓
Normal dashboard

This makes the application feel resilient rather than fragile, which is particularly important for a financial product.