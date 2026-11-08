# Using the SDK in the browser

This guide covers what a single-page application (SPA) needs in order to call Dataverse with the SDK: the app registration, MSAL setup, how CORS affects what the SDK can see, the Content-Security-Policy, logging and telemetry, and the known limits.

The browser-facing packages are `@mohsinonxrm/dataverse-sdk-core`, `-auth-msal-browser`, `-discovery`, `-batch`, `-files` and `-metadata`. The browser smoke tests in [`packages/dataverse-sdk-browser-tests`](../packages/dataverse-sdk-browser-tests) bundle each of them with Vite, with no Node polyfills, and load them in Chromium.

## 1. App registration (SPA)

In Microsoft Entra ID, register an application for the SPA:

1. **Platform**: add a **Single-page application** platform, and add your app's URLs as redirect URIs, for example `https://app.contoso.com/` and, for development, `http://localhost:5173/`. Use the SPA platform, not "Web": MSAL in the browser uses the authorization code flow with PKCE, which needs it. A SPA has no client secret.
2. **API permissions**: add **Dynamics CRM** → **Delegated permissions** → **`user_impersonation`**, then grant consent (an admin can grant it for the tenant).
3. The signed-in user must be a user of the Dataverse environment, with a security role there. The app calls Dataverse as that user.

The token scope for an environment is `https://<org>.crm.dynamics.com/user_impersonation`. `scopesForEnvironment(url)` builds it from the environment URL.

## 2. MSAL setup

Install the SDK, the browser token provider, and MSAL itself. `@azure/msal-browser` is a **peer dependency** (`^3.30.0 || ^4.0.0 || ^5.0.0`), so the app, `@azure/msal-react` (if used) and the SDK share one MSAL copy and one token cache.

```bash
pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-browser @azure/msal-browser
```

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import {
  authorityFor,
  createMsalBrowserProvider,
  initializeMsal,
  scopesForEnvironment,
} from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const environmentUrl = "https://contoso.crm.dynamics.com";

const pca = new PublicClientApplication({
  auth: {
    clientId: "<application (client) id>",
    authority: authorityFor("public", "contoso.onmicrosoft.com"),
    redirectUri: window.location.origin,
  },
  cache: { cacheLocation: "sessionStorage" },
});

// On every page load: initialize(), handleRedirectPromise(), and set the active account.
await initializeMsal(pca);

// Scopes are derived from environmentUrl: ["https://contoso.crm.dynamics.com/user_impersonation"].
const tokenProvider = createMsalBrowserProvider(pca, { environmentUrl });
const client = new DataverseClient({ baseUrl: environmentUrl, tokenProvider });

// From a "Sign in" button's click handler:
await pca.loginPopup({ scopes: scopesForEnvironment(environmentUrl) });

const me = await client.api("WhoAmI").get<{ UserId: string }>();
```

- `createMsalBrowserProvider(pca, options)` returns a `MsalBrowserTokenProvider`. It takes the provider's options, with `environmentUrl` (and optionally `scopeKind: ".default"`) in place of `scopes`.
- Tokens are acquired silently. When MSAL needs interaction, the provider opens a popup (`interactionType: "popup"`, the default) or redirects (`"redirect"`). With `fallbackToRedirect: true`, a blocked popup turns into a redirect; without it, `getToken()` rejects with `MsalBrowserAuthenticationError` (`code: "popup_blocked"`).
- `authorityFor(cloud, tenant)` builds the authority for `public`, `usgov`, `usgovdod` or `china`.

The [package README](../packages/dataverse-sdk-auth-msal-browser/README.md) covers React, account switching and error handling.

## 3. CORS

Dataverse accepts cross-origin Web API calls that carry a bearer token: its responses include `Access-Control-Allow-Origin`, so the SPA can call the environment directly from its own origin, with no proxy.

### Preflight

Every SDK request sends `Authorization`, `OData-MaxVersion` and `OData-Version`. None of them is a CORS-safelisted header, so the browser sends a preflight (`OPTIONS`) before requests, as it would for any bearer-token call.

The SDK also sends its own diagnostic headers: `x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, and `retry-attempt` on retries. Dataverse's preflight allows them. With a telemetry client that provides trace context, it also sends `traceparent` and `tracestate` (see [Logging and telemetry](#6-logging-and-telemetry)). To send none of them (for example when a gateway in front of Dataverse rejects unknown headers), turn them off:

```typescript
const client = new DataverseClient({ baseUrl, tokenProvider, diagnosticHeaders: false });
// Or one by one: diagnosticHeaders: { featureUsage: false }
```

Telemetry still records the correlation id when the header is off. Headers you add yourself (`defaultHeaders`, `.header()`) must also be allowed by the preflight, or the browser blocks the request before it reaches Dataverse.

### Which response headers the SDK can read

A browser lets script read only the CORS-safelisted response headers (such as `Content-Type`) and the ones the server lists in `Access-Control-Expose-Headers`. Dataverse exposes exactly these:

| Exposed header                                                                                           | What the SDK uses it for                                                      |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `OData-EntityId`, `Location`                                                                             | The id of a created record (`entityIdFromResponse()`)                         |
| `Retry-After`                                                                                            | How long to wait before retrying a 429, 502, 503 or 504 response              |
| `REQ_ID`                                                                                                 | `DataverseError.requestId`, the id Microsoft support asks for                 |
| `ETag`, `Preference-Applied`, `OData-Version`, `Content-Encoding`, `Transfer-Encoding`, `Content-Length` | Not read by the SDK; readable by the app on a `Response` from `client.send()` |

Any other response header is hidden from script in a browser. That changes three things compared with Node.js:

- **`WWW-Authenticate` can't be read**, so a claims challenge (Conditional Access, continuous access evaluation) is invisible to the SDK. After a 401, the SDK's recovery (`refreshTokenOn401`, on by default) therefore always calls `getToken()` with `forceRefresh: true` and resends the request once. `MsalBrowserTokenProvider` passes `forceRefresh` on to MSAL's `acquireTokenSilent`, so the resend gets a new token rather than the cached one ([#167](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/167)).
- **`x-ms-service-request-id` can't be read**, so `DataverseError.requestId` falls back to `REQ_ID`.
- **`x-ms-dop-hint` can't be read**, so adaptive concurrency has nothing to adapt to: the limit stays at `concurrency.maxConcurrentRequests` (default 8).

`DataverseError.headers` likewise contains only the readable headers.

## 4. Content-Security-Policy

The SDK works under a strict policy with `script-src 'self'` and no `'unsafe-eval'`: its code uses no `eval` and no `new Function`, which the lint rules `no-eval`, `no-new-func` and `@typescript-eslint/no-implied-eval` enforce. The browser smoke tests (`packages/dataverse-sdk-browser-tests`) build an app with Vite in production mode and serve it with:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self' https://contoso.crm.dynamics.com
```

They check that every browser package loads with no errors or CSP violations, that the bundle contains no `eval(` or `new Function(`, that a request runs through the real client pipeline, and that `bindMany()` works.

For your app, `connect-src` must list each Dataverse environment origin the app calls. MSAL has its own requirements: it calls the authority (for example `https://login.microsoftonline.com`) with `fetch`, so add that to `connect-src`, and if it uses a hidden iframe for silent sign-in, to `frame-src` as well. See the MSAL.js documentation for details.

## 5. Security of the token

The client attaches the bearer token only to requests for its own `baseUrl` origin. A request to another origin is rejected with `DataverseInvalidRequestError` before anything is sent (`onForeignOrigin: "throw"`, the default), or sent without the token (`"strip"`). List other origins that may receive the token in `allowedTokenOrigins`.

## 6. Logging and telemetry

- **Silent by default.** With no `logger`, the SDK writes nothing to the console. The smoke tests check this. To see its diagnostics:

  ```typescript
  import { ConsoleLogger, DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

  const client = new DataverseClient({
    baseUrl,
    tokenProvider,
    logger: new ConsoleLogger({ level: "warn" }),
  });
  ```

- **Redacted URLs.** Logs and telemetry report request URLs through `redactUrl`, by default `defaultRedactUrl`: the origin and path, with GUID keys shown as `({id})`, other keys as `(…)` and the query as `?…`. Filters, record ids and alternate keys stay out of logs and telemetry. `logging: { fullUrls: true }` logs full URLs; a custom `redactUrl` changes what both logs and telemetry report.
- **Telemetry.** For Application Insights, use `@mohsinonxrm/dataverse-sdk-appinsights/browser`: `new ApplicationInsightsBrowserTelemetryClient({ appInsights })` on your app's `ApplicationInsights` instance from `@microsoft/applicationinsights-web` ([README](../packages/dataverse-sdk-appinsights/README.md#browser-entry-point)); the smoke tests load it under the strict CSP. Or pass your own `TelemetryClient` (`trackEvent`, `startDependency`, `trackException`) as `telemetry`. `@mohsinonxrm/dataverse-sdk-otel` works in browsers too, but is not covered by the smoke tests.
- **Trace context and CORS.** A telemetry client can give each request a W3C `traceparent` (and `tracestate`). In a browser these are part of the CORS preflight, so the Dataverse origin must allow them: the App Insights browser adapter sends them only with `propagateTraceContext: true`; with the OpenTelemetry adapter, check the preflight or turn them off with `diagnosticHeaders: { traceContext: false }`.

## 7. Known limits

| Limit                                                                                                                                                                                                                     | Tracking                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Claims challenges can't be read (`WWW-Authenticate` isn't exposed); 401 recovery is a forced refresh                                                                                                                      | Dataverse CORS behaviour                                                |
| File uploads with `method: "patch-chunked"` read the `x-ms-chunk-size` and `Location` response headers, which a browser sees only if Dataverse's CORS policy exposes them; use the default `"actions"` route in a browser | [files README](../packages/dataverse-sdk-files/README.md#upload-routes) |

> > > >
