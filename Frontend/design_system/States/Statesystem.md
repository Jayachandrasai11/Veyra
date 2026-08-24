07.1 — STATE SYSTEM

1. Use the global Fermor state vocabulary.

2. Do not invent new state names when an
   existing state applies.

3. Components must only implement states
   that are semantically relevant.

4. Button:
   Default
   Hover
   Focus
   Active
   Disabled
   Loading

5. Financial Data:
   Loading
   Success
   Partial
   Stale
   Error
   Offline
   Reconnecting

6. Account Connection:
   Default
   Processing
   Success
   Error
   Reconnecting
   Permission Denied

7. Loading and Processing are different.

8. Disabled and Loading are different.

9. Empty and Error are different.

10. Partial data should remain visible where
    safe and useful.

11. Stale data must communicate its freshness.

12. Offline must not be represented as a
    generic application error.

13. Errors must provide recovery.

14. Permission problems must explain the
    required action.

15. Don't rely on color alone to communicate
    state.

16. Use icon + label + supporting text where
    appropriate.

17. State transitions must be predictable.

18. Use the same state semantics across the
    entire application.

19. Do not invent unique loading animations
    per component.

20. AI-generated UI must consume these states
    rather than creating its own state system.
# 07.1 — State System

Global State Vocabulary

INTERACTION
Default
Hover
Focus
Active
Selected

AVAILABILITY
Disabled
Loading
Processing
Reconnecting

OUTCOME
Success
Warning
Error

DATA
Empty
Partial
Stale

CONNECTIVITY / ACCESS
Offline
Permission Denied


CORE RULE

Every component declares the subset of states
that applies to it.

Never implement every global state on every
component.

State meaning must remain consistent across
Fermor.

Color must never be the only state indicator.