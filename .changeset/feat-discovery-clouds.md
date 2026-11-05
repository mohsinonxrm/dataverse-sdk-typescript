---
"@mohsinonxrm/dataverse-sdk-discovery": minor
---

`DiscoveryClient` now supports every Global Discovery Service cloud (#29). `new DiscoveryClient(tokenProvider, { cloud })` with `cloud` set to `"public"` (default), `"gcc"`, `"usg"` (GCC High), `"dod"` or `"china"` selects that cloud's endpoint and requests a token for its `https://<host>/.default` scope. Before, the token scope was always the Commercial one, even with a sovereign `baseUrl`, so the token had the wrong audience. A custom `baseUrl` now gets a scope derived from its host, `scopes` overrides the scope, and a host-only `baseUrl` gets `/api/discovery/v2.0` appended. The `(tokenProvider, baseUrl)` signature still works. New exports: `DISCOVERY_CLOUDS`, `DiscoveryCloud`, `DiscoveryCloudEndpoint`, `DiscoveryClientOptions`, and `getBaseUrl()` / `getScopes()` on the client.
