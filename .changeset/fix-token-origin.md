---
"@mohsinonxrm/dataverse-sdk-core": minor
---

**Security:** the bearer token is now attached only to requests for the client's own origin (#8). Before, `AuthMiddleware` added `authorization: Bearer …` to every request, including absolute URLs passed to `client.api()` / `client.send()` and any `@odata.nextLink`. A pasted URL, a crafted nextLink or a consumer bug could therefore send the user's Dataverse token to another host.

- By default, a request to another origin (another host, a look-alike subdomain, plain `http:`, another port) or to a URL containing user info is rejected with `DataverseInvalidRequestError` (`name: "TokenOriginRefused"`), before any token is acquired or request is sent. That includes paging that follows a foreign `@odata.nextLink`.
- New option `allowedTokenOrigins: string[]` lets other origins receive the token on purpose.
- New option `onForeignOrigin: "strip"` sends foreign requests without the `authorization` header, instead of throwing.

This is a behaviour change only for callers who sent the client's token to another origin on purpose; they should set `allowedTokenOrigins`.
