---
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": patch
---

`MsalBrowserTokenProvider`: configured claims no longer bypass MSAL's token cache, a silent iframe timeout starts the interactive flow, and `tenantId` works with `azureCloudOptions` (#382).

- **Configured `claims`.** MSAL skips its token cache for a silent request with `claims`, and the provider sent the `claims` option on every silent call, so every Dataverse request went to Entra ID. They are now sent only when the request goes to Entra ID anyway: the interactive flow, the first silent call for each account, scope set and tenant, and a forced refresh. A claims challenge (`TokenOptions.claims`) is still always sent.
- **`monitor_window_timeout`.** When the refresh token has expired and the browser blocks third-party cookies, MSAL's silent iframe times out, and the provider threw instead of prompting. It now starts the configured interaction (popup or redirect), as Microsoft recommends. MSAL 3 and 4 report it as `errorCode` `monitor_window_timeout`, MSAL 5 as `timed_out` with `subError` `monitor_window_timeout`; other `timed_out` errors still throw.
- **`tenantId` with `azureCloudOptions`.** When the MSAL configuration uses `azureCloudOptions`, MSAL ignores a request's `authority`, so `TokenOptions.tenantId` had no effect. The request now carries `azureCloudOptions` for that tenant too, and the authority uses the `azureCloudOptions` cloud.
