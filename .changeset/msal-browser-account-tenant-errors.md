---
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": minor
---

`MsalBrowserTokenProvider`: the account follows the app, `tenantId` is honoured, and MSAL's error details are kept (#26).

- **Account resolved on every call.** The order is: the `account` function's result, then MSAL's active account, then a configured `account` object, then the first cached account. After `setActiveAccount(b)`, on the MSAL instance or the provider, tokens are for `b`. Before, a configured `account` always won, so the provider kept using the old account after an account switch.
  - **Behaviour change:** a configured `AccountInfo` is now a default for when MSAL has no active account. To pin a provider to one account whatever the active account is, pass a function: `account: () => myAccount`.
- **`TokenOptions.tenantId`** is now sent as the request `authority` (`https://login.microsoftonline.com/<tenantId>`, on the host of the MSAL configuration's authority), for silent and interactive requests. Guest users can get a token from the Dataverse organization's tenant. A value that is not a tenant id or domain is rejected with `DataverseInvalidRequestError` (`name: "InvalidTenantId"`).
- **Error details kept.** Every token failure now rejects with `MsalBrowserAuthenticationError`, a `DataverseAuthenticationError` with `name: "TokenAcquisitionFailed"`, carrying `code`, MSAL's `errorCode`, `subError`, `correlationId`, `errorNo` (for example `65001` for AADSTS65001), and the original error as `cause`. So `err.cause.errorCode === "consent_required"` can now be read.
  - **Behaviour change:** popup and redirect failures (for example `user_cancelled`) used to be the raw MSAL error. They are now wrapped too; the MSAL error is the `cause`.
