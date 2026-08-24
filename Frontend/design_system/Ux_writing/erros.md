# Error Copy

## Purpose

Errors must explain what happened and provide recovery.

## Error Structure

What happened?
+
What does it affect?
+
What can the user do?

## Example

We couldn't update your investment data.

Your previous information is still available.

[Try again]

## Account Error

We couldn't connect your account.

Your existing financial data hasn't changed.

[Try again]

## Technical Errors

Never expose raw technical errors to normal users.

Avoid:

ERROR 500

NullPointerException

API request failed

Connection refused

## Recovery

Whenever recovery is possible, provide an action.

Examples:

Try again

Reconnect account

Retry

Contact support

## Error Tone

Errors must be:

- Calm
- Specific
- Helpful
- Non-blaming

Avoid:

Something went terribly wrong!

You failed to connect your account.

Fatal error!!!

## Data Integrity

If old data remains available, tell the user.

Example:

"Your previous information is still available."

Never imply data has been updated if the update failed.