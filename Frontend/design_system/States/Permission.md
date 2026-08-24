07.17.9 — Implementation Specification
PermissionDenied

Visual:
warning/attention treatment

Content:
resource name
clear explanation
impact statement
recovery action

Primary action:
Reconnect account

If cached data exists:
preserve previous value
show last updated timestamp
show permission warning

If no cached data exists:
show empty/permission state

After reconnect:
→ Processing
→ Syncing
→ Success
or
→ Permission Denied
Important

Permission Denied is a recoverable state, not a generic error.

The UI should always provide the user with a clear path:

Permission Denied
       ↓
Explain
       ↓
Reconnect
       ↓
Authorize
       ↓
Sync
       ↓
Success