---
"@mohsinonxrm/dataverse-sdk-auth-msal-node": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": patch
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": patch
---

The token providers act on `TokenOptions.forceRefresh` (#167), which the core client sets after a 401 (#21). Before, the 401 retry could receive the same cached token again.

- **msal-node:** passes `skipCache: true` for client credentials, and `forceRefresh` in the silent flow.
- **msal-browser:** passes `forceRefresh: true` to `acquireTokenSilent`.
- **azure-identity:** `@azure/identity` has no refresh option, so the provider ignores `forceRefresh` and leaves caching to each credential; this is documented. A claims challenge is still passed on.
