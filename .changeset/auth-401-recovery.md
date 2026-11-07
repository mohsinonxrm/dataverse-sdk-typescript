---
"@mohsinonxrm/dataverse-sdk-core": minor
---

401 handling and a token per attempt (#21).

- **A token per attempt.** `AuthMiddleware` now runs inside `RetryMiddleware`, so every attempt gets a current token from the provider. A retry after a long wait can no longer send an expired token. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging (Retry moved outside Concurrency in #44).
- **One recovery after a 401.** The client gets a new token and resends the request once. A Conditional Access / CAE claims challenge in `WWW-Authenticate` is decoded and passed as `getToken(scopes, { claims })`; otherwise `getToken(scopes, { forceRefresh: true })` is called. A second 401 is returned as the error. Turn this off with `refreshTokenOn401: false`.
- **Browsers.** Dataverse doesn't expose `WWW-Authenticate` to browsers, so there the recovery is always a forced refresh.
- **New API.** `TokenOptions.forceRefresh` is new, and `getToken` now also receives the request's `correlationId`. `parseClaimsChallenge(header)` is exported.
