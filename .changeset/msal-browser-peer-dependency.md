---
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": minor
---

`@azure/msal-browser` is now a **peer dependency** (`^3.30.0 || ^4.0.0 || ^5.0.0`) instead of a bundled `^3` dependency (#24).

Before, an app on MSAL 4 or 5 got a second, nested MSAL 3 copy. The provider checked `error instanceof InteractionRequiredAuthError` against its own copy, so an "interaction required" error from the app's MSAL never matched: the popup/redirect fallback silently never ran and the call failed with `TokenAcquisitionFailed`. Types from the two copies also clashed.

- The package now imports only types from `@azure/msal-browser`; nothing from MSAL is bundled or loaded at runtime.
- Interaction-required errors are detected by `name === "InteractionRequiredAuthError"` or by MSAL `errorCode` (`interaction_required`, `consent_required`, `login_required`, `bad_token`, `ui_not_allowed`, `interrupted_user`, `no_tokens_found`, `native_account_unavailable`, `refresh_token_expired`). This works with errors from any MSAL copy or major.
- New exports: `isInteractionRequiredError(error)`, `getMsalErrorCode(error)` and `INTERACTION_REQUIRED_ERROR_CODES`.

**Migration:** if your app did not list `@azure/msal-browser` itself and relied on the copy this package brought in, add it:

```bash
npm install @azure/msal-browser
```

Apps that already depend on `@azure/msal-browser` (every app that creates a `PublicClientApplication` does) need no change, and now get a single MSAL copy (`npm ls @azure/msal-browser`).
