---
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": minor
---

`AzureIdentityTokenProvider` caches tokens (#86). The SDK asks for a token on every request, and the provider called `credential.getToken` every time, so with `AzureCliCredential`, `AzurePowerShellCredential` or `AzureDeveloperCliCredential` **every Dataverse request started an `az` / `pwsh` / `azd` process**. `DefaultAzureCredential` also walked its whole chain on every request.

- Tokens are kept in memory per scope set and tenant until 5 minutes before they expire (new option `refreshMarginMs`, default `DEFAULT_REFRESH_MARGIN_MS`), or until the credential's `refreshAfterTimestamp` if that is earlier. Tokens that live less than twice the margin are refreshed at half their lifetime. Tokens without a usable expiry are not cached.
- Concurrent requests that need a new token share one credential call.
- If a refresh fails while the cached token is still valid, the cached token is returned and the next call tries again.
- `TokenOptions.forceRefresh` (sent by the SDK after a 401) now skips this cache and calls the credential. Before, it was ignored. A claims challenge also skips the cache, and the token it returns replaces the cached one.
- New option `cacheTokens: false` turns the cache off. The new method `clearTokenCache()` empties it.
- Credential errors are kept as `cause` on the `DataverseAuthenticationError`, through the error constructor.
- `package.json` `exports` lists `types` first, with `default` instead of `import`, so TypeScript always resolves the types.
