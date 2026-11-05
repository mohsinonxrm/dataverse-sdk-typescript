---
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": minor
---

Fix the interactive fallback of `MsalBrowserTokenProvider` (#25):

- **No signed-in account now signs in.** With no cached account (or a silent `no_account_error`), `getToken()` failed with `TokenAcquisitionFailed`. It now opens the popup (or starts the redirect). `login_required` is also treated as interaction required.
- **Interactive requests keep the account.** Popup and redirect requests now carry `account` and `loginHint`. The user is no longer shown the account picker, and can no longer switch accounts by accident, on consent or MFA step-up.
- **Active account after sign-in.** The account returned by the popup becomes MSAL's active account.
- **Single-flight.** Concurrent `getToken()` calls that need interaction share one popup, instead of N popups where N−1 fail with `interaction_in_progress`. A call for other scopes waits for the running popup, then tries silently before prompting.
- **Blocked popup.** When the browser blocks the popup (`popup_window_error`, `empty_window_error`), the new option `fallbackToRedirect: true` starts a redirect instead. Without it, `getToken()` throws the new `MsalBrowserAuthenticationError` (`name: "PopupBlocked"`, `code: "popup_blocked"`, the MSAL error as `cause`). It is still a `DataverseAuthenticationError`.

New exports: `MsalBrowserAuthenticationError`, `isPopupBlockedError`, `POPUP_BLOCKED_ERROR_CODES`.
