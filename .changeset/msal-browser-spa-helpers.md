---
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": minor
---

New SPA helpers (#27). They are framework-free, and the package still doesn't depend on React:

- `initializeMsal(pca)`: runs `initialize()` and `handleRedirectPromise()`, then sets the active account: the redirect result's account, or, with no result and no active account, the only cached account. It never picks one of several cached accounts. It returns the redirect result or `null`.
- `scopesForEnvironment(url, kind = "user_impersonation")`: returns `["https://<host>/user_impersonation"]` or `["https://<host>/.default"]`, and rejects non-`https` URLs.
- `authorityFor(cloud, tenant = "organizations")`: returns the authority URL for `public`, `usgov`, `usgovdod` or `china`. The tenant is validated.
- `createMsalBrowserProvider(pca, options)`: creates a `MsalBrowserTokenProvider`, deriving `scopes` from `environmentUrl` (and `scopeKind`) when they aren't given.

Also exported: `AUTHORITY_HOSTS` and the types `EntraCloud`, `DataverseScopeKind` and `CreateMsalBrowserProviderOptions`.
