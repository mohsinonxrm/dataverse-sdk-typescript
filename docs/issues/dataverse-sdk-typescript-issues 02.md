# dataverse-sdk-typescript — issues found while planning a browser (SPA) consumer

> **Purpose.** This file is the hand-off to a separate session that will (1) file these as GitHub issues in `mohsinonxrm/dataverse-sdk-typescript` and (2) fix them. Each issue is self-contained: summary, affected code, a reproduction with the **observed output**, the expected behaviour, the impact, a proposed fix, the tests to add and acceptance criteria.
>
> **Context.** Found while planning *Command Bar Studio for the web*: a React SPA hosted on Azure Static Web Apps that calls Dataverse directly from the browser with MSAL.js tokens. It will use `@mohsinonxrm/dataverse-sdk-core` and `@mohsinonxrm/dataverse-sdk-discovery`, and wants opt-in Application Insights telemetry. The issues are ranked by their effect on that kind of consumer, but most also affect Node.
>
> **Versions examined.**
> - Source: `dev` branch @ `f45e6fd7ba71f5950eff8e8392215b5454b511a2` (line numbers below refer to this commit).
> - Published: every package at **`1.0.0`** on npm. All repros below ran against the **published** `dist/` in Node 22 with an injected `fetchProvider`, so no network was needed. The scripts are in [Appendix A](#appendix-a--reproduction-scripts).
>
> **Not verified (no Dataverse org reachable from the analysis sandbox):** the live CORS behaviour in issue 3 and the live 400s in issue 6. Both are marked **verify live**.

---

## Index

| # | Sev. | Package | Title |
|---|---|---|---|
| 1 | P0 | appinsights, core | `ApplicationInsightsTelemetryClient` is an unimplemented stub, so every request fails once it is configured; the package is Node-only |
| 2 | P0 | core | `validateUrl` applies the 260-char *path segment* limit to the query string, so valid queries are rejected before they are sent |
| 3 | P0 (browser, verify live) | core | Every request carries non-standard headers (`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, `Retry-Attempt`), which forces CORS preflights that Dataverse may reject; not configurable |
| 4 | P1 | core | `RetryMiddleware` retries non-idempotent POST/PATCH/DELETE on 502/503/504 (duplicate side effects); waits up to 105 s; per-request retry options are ignored |
| 5 | P1 | core | A single middleware context is shared by every request of a client: one correlation id for the client's lifetime, plus races on `attempt` |
| 6 | P1 | functions (generator) | Function parameters are encoded wrongly: enums as `'All'`/`7` instead of `Microsoft.Dynamics.CRM.X'All'`, GUIDs quoted, strings not escaped; enums exported type-only |
| 7 | P1 | auth-msal-browser | Hard dependency on `@azure/msal-browser ^3` leads to duplicate MSAL copies and a broken `instanceof`; popups opened from inside the HTTP pipeline; weak multi-account/multi-tenant support |
| 8 | P1 | core | Auth: token fetched once per request, not per retry; 401 not handled; claims challenges (CAE/Conditional Access) are lost |
| 9 | P2 | core | Error objects: message drops the Dataverse error code; non-JSON bodies discarded; `x-ms-service-request-id` not captured; no `innererror` |
| 10 | P2 | core | With no logger configured, `ConsoleLogger.debug` prints every full request URL (PII in the browser console) |
| 11 | P2 | core | `DataverseClientOptions.defaultPrefer` is declared but never applied |
| 12 | P2 | core | `TelemetryMiddleware`: full URLs with query values (PII) sent to telemetry; no redaction hook; SDK version hard-coded `0.1.0`; telemetry errors break requests |
| 13 | P2 | discovery | Scopes hard-coded to the commercial cloud; uses global `fetch` (no pipeline, retry, logging, injection); filters not escaped; untyped errors |
| 14 | P3 | core | `getAll({ maxPages })` ignores `maxPages` |
| 15 | P3 | actions, functions (generator) | Typed operations use long positional constructors (alphabetical order), which are easy to misuse |
| 16 | P3 | core | Pipeline order: token acquired before the concurrency queue; semaphore slot held during retry sleeps; `x-ms-dop-hint` unreadable in browsers without CORS exposure |

Suggested labels: `bug`, `browser`, `security/privacy`, `breaking-change` (where noted), `generator`, plus a package label per issue.

Suggested fix order: **1 → 2 → 3 → 4 + 5 (same refactor) → 9 → 8 → 7 → 6 → 10–16.** Issues 4, 5, 8 and 12 all touch the pipeline/context design and are best done together in one "per-request context" change ([Appendix B](#appendix-b--suggested-pipeline-refactor-covers-4-5-8-12-16)).

---

## 1. `ApplicationInsightsTelemetryClient` is an unimplemented stub; every request fails once it is configured

**Packages:** `@mohsinonxrm/dataverse-sdk-appinsights@1.0.0`, `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P0. A documented, published integration turns every successful call into a rejection.

### Affected code
- `packages/dataverse-sdk-appinsights/src/ApplicationInsightsTelemetryClient.ts:21-50`: the constructor has `// TODO: Initialize @azure/monitor-opentelemetry`, and `trackEvent`, `trackDependency` and `trackException` all `throw new Error("… not implemented")`.
- `packages/dataverse-sdk-core/src/middleware/TelemetryMiddleware.ts:48-89`: `trackDependency` is called inside the `try` after a **successful** response. Its exception goes to the `catch`, which calls `trackDependency` again (it throws again) and rethrows, so the caller sees a failure for a 200 response.
- `packages/dataverse-sdk-appinsights/package.json`: depends on `@azure/monitor-opentelemetry ^1.0.0`. That package is **Node-only** and pulls in `@azure/identity`, `@azure/msal-node` and OpenTelemetry Node SDKs (`npm ls` shows `@azure/identity@4.14.1 → @azure/msal-node@7.1.2`). A browser app cannot use it.
- Doc comment `ApplicationInsightsTelemetryClient.ts:14-17` shows `new DataverseClient({ …, telemetryClient })`, but the option is named `telemetry` (`abstractions/options.ts`).

### Reproduction (published 1.0.0)
```js
const c = new DataverseClient({ baseUrl, fetchProvider: alwaysOk200, telemetry: new ApplicationInsightsTelemetryClient({ connectionString: "InstrumentationKey=…" }) });
await c.api("WhoAmI").get();
```
Observed:
```
T1: a successful (200) request rejected with: ApplicationInsightsTelemetryClient.trackDependency not implemented
```

### Expected
- Telemetry must never change the outcome of a request.
- A working Application Insights adapter for Node **and** one for browsers.

### Proposed fix
1. **Core (independent of the adapter):** in `TelemetryMiddleware`, wrap every `telemetry.*` call in `try/catch` and report failures to the logger at `warn`, at most once per client. Never rethrow telemetry errors. Move `trackDependency` out of the `try` that wraps `next()` so a telemetry failure can't be mistaken for a request failure.
2. **Split the adapter** (breaking for this package only, and it is non-functional today):
   - `@mohsinonxrm/dataverse-sdk-appinsights-web`, or a `/web` sub-export: accepts an **existing** `ApplicationInsights` instance from `@microsoft/applicationinsights-web` (peer dependency) and maps `trackDependency` to `appInsights.trackDependencyData({ id, name, target, type: "HTTP", responseCode, success, duration, properties })`, `trackEvent` to `trackEvent`, and `trackException` to `trackException({ exception })`. It does not create the instance itself, so the app keeps control of consent, sampling and cookies.
   - `@mohsinonxrm/dataverse-sdk-appinsights-node`, or a `/node` sub-export: same idea on top of `applicationinsights` v3 / `@azure/monitor-opentelemetry` (peer dependency). Or an OpenTelemetry-only story with `dataverse-sdk-otel`, documented with `useAzureMonitor()`.
   - Use `exports` conditions (`"browser"` / `"node"`) if keeping one package name.
3. Make Azure SDKs **peer** dependencies, not dependencies.
4. Fix the doc comment (`telemetry`, not `telemetryClient`) and the README telemetry section.

### Tests
- Core: a `TelemetryClient` whose methods all throw → requests still resolve/reject exactly as without telemetry; the logger gets one warning.
- Web adapter (jsdom + fake `ApplicationInsights`): the dependency payload has the expected fields; URL redaction applies (issue 12).
- Package test: importing the web adapter in a browser bundle (Vite/rollup build in CI) pulls in no `@azure/identity` / `msal-node` / `node:` modules.

### Acceptance criteria
- A 200 response resolves even when telemetry throws.
- A browser app can send SDK dependency telemetry to Application Insights without Node polyfills.
- The README example compiles.

---

## 2. `validateUrl` rejects valid queries: the 260-char segment limit is applied to the query string

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P0. Common real queries are rejected client-side before they are sent.

### Affected code
- `packages/dataverse-sdk-core/src/utils/validateUrl.ts:58`: `const segments = url.split("/").filter(...)` runs over the **entire URL including `?query`**. Line 61 then throws `DataverseUrlError` if any piece is longer than 260.
- Called for every builder request: `client/DataverseRequestBuilder.ts:327` (`validateUrl(fullUrl, this.urlValidationOptions)`).

The 260 limit in the Microsoft docs is for **path segments**. Query strings may be up to the 32 KB total. A `$filter` with a few `or` clauses, a `$select` listing many columns, or `@odata.nextLink` skiptokens easily goes over 260 characters.

### Reproduction (published 1.0.0)
```js
const ids = Array.from({ length: 40 }, (_, i) => `00000000-0000-0000-0000-${String(i).padStart(12, "0")}`);
const q = `EntityDefinitions?$select=LogicalName,DisplayName&$filter=${ids.map(id => `MetadataId eq ${id}`).join(" or ")}`;
await client.api(q).get();
```
Observed:
```
G1 long $filter (2214 chars)
DataverseUrlError: URL segment exceeds maximum length of 260 characters (actual: 2214). …  | fetch calls: 0

G1b query containing '/' (317 chars)   // webresourceset?$select=…&$filter=startswith(name,'new_/icons/') …
URL segment exceeds maximum length of 260 characters (actual: 317).

G1 workaround skipUrlValidation  → sent OK, url length 2577
```
A large `@odata.nextLink` passed back to `client.api(nextLink)` (as `PageIterator` does) can hit the same error.

### Expected
Only path segments are checked against 260. The whole URL is checked against 32 768.

### Proposed fix
```ts
export function validateUrl(url: string, options: UrlValidationOptions = {}): UrlValidationResult {
  if (options.skip) return { valid: true, totalLength: url.length, maxSegmentLength: 0, errors: [] };
  const errors: string[] = [];
  const totalLength = url.length;
  if (totalLength > URL_LIMITS.MAX_URL_LENGTH) { /* unchanged */ }
  let pathname: string;
  try { pathname = new URL(url).pathname; } catch { pathname = url.split(/[?#]/, 1)[0]; }
  const segments = pathname.split("/").filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch { return s; } });
  const maxSegmentLength = segments.length ? Math.max(...segments.map(s => s.length)) : 0;
  if (maxSegmentLength > URL_LIMITS.MAX_SEGMENT_LENGTH) { /* unchanged */ }
  return { valid: errors.length === 0, totalLength, maxSegmentLength, errors };
}
```
Also consider:
- Validating **after** `buildUrl()` (encoded form), because the 32 KB limit applies to the encoded URL.
- A function-call segment such as `RetrieveEntityRibbon(EntityName=@p1,RibbonLocationFilter=@p2)` is a real path segment. It is short when aliases are used, so the check stays meaningful there.
- Adding `$batch` guidance to the error message (issue tracked separately in the batch package, if wanted).

### Tests
- 40-GUID `or` filter (≈2.2 KB) → no throw.
- Query containing `/` inside a string literal → no throw.
- Path segment of 261 chars (e.g. long key-as-segment) → throws.
- URL of 32 769 chars → throws.
- A `PageIterator` following a long nextLink → no throw.

### Acceptance criteria
The repro sends one request without `skipUrlValidation()`.

---

## 3. Non-standard request headers force CORS preflights and may be rejected by Dataverse; not configurable

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P0 for browser use. **Verify live**: if Dataverse's preflight response doesn't list these headers in `Access-Control-Allow-Headers`, **every browser request fails** with a CORS error.

### Affected code
- `middleware/TelemetryMiddleware.ts:26`: `x-ms-sdk-version` on every request, telemetry configured or not.
- `middleware/TelemetryMiddleware.ts:29-30`: `x-ms-correlation-id` on every request.
- `middleware/TelemetryMiddleware.ts:38`: `x-ms-feature-usage` on every request.
- `middleware/RetryMiddleware.ts:41-43`: `Retry-Attempt` on retries.

### Reproduction (published 1.0.0)
Headers on a plain `GET` (with a token provider):
```
["accept","authorization","odata-maxversion","odata-version","x-ms-correlation-id","x-ms-feature-usage","x-ms-sdk-version"]
```
`x-ms-sdk-version` value: `dataverse-sdk-js/0.1.0`. The package is 1.0.0 (see issue 12).

### Why it matters
In a browser, any header outside the CORS "safelisted" set triggers a preflight `OPTIONS`. `authorization` and `odata-*` already do; Dataverse supports CORS for OAuth bearer calls and allows those. Whether it also allows **arbitrary** `x-ms-*` and `Retry-Attempt` headers is not documented. If it doesn't, nothing works from a SPA. Even if it does, there are side effects:
- `x-ms-feature-usage` and `x-ms-sdk-version` make the preflight cache key differ from other clients'. That's minor, but it's an extra round trip for every new header combination.
- The headers are undocumented, and Dataverse ignores `x-ms-correlation-id`: Dataverse's own correlation header is `x-ms-client-request-id` / `client-request-id`, and it returns `x-ms-service-request-id`.

### How to verify live (for the fixing session)
From a page on `https://localhost:5173` (or any origin) with a valid token:
```js
await fetch("https://<org>.crm.dynamics.com/api/data/v9.2/WhoAmI", { headers: { Authorization: `Bearer ${t}`, "OData-Version": "4.0", "OData-MaxVersion": "4.0", "x-ms-sdk-version": "x", "x-ms-correlation-id": crypto.randomUUID(), "x-ms-feature-usage": "0x0010", "Retry-Attempt": "1" } });
```
Look at the preflight response's `Access-Control-Allow-Headers` in DevTools. Repeat with `x-ms-client-request-id` to see whether Dataverse echoes it.

### Proposed fix
- New option `diagnosticHeaders?: boolean | { sdkVersion?: boolean; correlationId?: boolean; featureUsage?: boolean; retryAttempt?: boolean }`. Default `true` in Node and **`false` when `typeof window !== "undefined"`**, or false everywhere, which is safer and is a minor breaking change.
- Use `x-ms-client-request-id` (which Dataverse understands) per request (issue 5) instead of `x-ms-correlation-id`, or make the header name configurable.
- Document the CORS implications in the browser section of the README.

### Tests
- Browser-like environment (jsdom with `window`): default request has only `accept`, `authorization`, `odata-*`, `content-type` (when there is a body), `prefer` (when set), and `if-match` (when set).
- Node: headers present when enabled; absent when `diagnosticHeaders: false`.

### Acceptance criteria
A SPA using default options sends no non-standard headers, and the README says why.

---

## 4. `RetryMiddleware` re-sends non-idempotent requests, waits up to 105 s, and ignores per-request overrides

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P1. Duplicate side effects (solution imports, record creates, actions). Long hidden stalls.

### Affected code
- `middleware/RetryMiddleware.ts:9-14`: `DEFAULTS = { maxRetries: 6, baseDelayMs: 3000, maxDelayMs: 30000, jitter: true }`.
- `middleware/RetryMiddleware.ts:88-92`: `shouldRetry` = `[429, 502, 503, 504]` for **every method**.
- `middleware/RetryMiddleware.ts:27`: reads `ctx.middlewareOptions?.get("retry")`, but nothing ever sets `ctx.middlewareOptions`. `DataverseClient.send()` (`client/DataverseClient.ts:72-73`) always passes the shared `this.ctx`, and `DataverseRequestBuilder.send()` doesn't forward `RequestOptions.middlewareOptions`. Per-request overrides are dead code.
- `RetryOptions` in `abstractions/options.ts` lacks `retryableStatusCodes` / `shouldRetry`, but the middleware reads them, through `middleware/RequestOptions.ts:36-47`. That only works by accident through object spread and doesn't type-check for consumers.

### Reproduction (published 1.0.0)
```
G2 POST ImportSolution vs 503,503,204
fetch calls: 3; Retry-Attempt headers: -,1,2; same ImportJobId re-sent: true

G2b per-request middlewareOptions {retry:{maxRetries:0}}
RequestOptions class: function; fetch calls: 3 (expected 1 if honoured)

G2 workaround retryableStatusCodes:[429]
fetch calls: 1; error: DataverseODataError 503

G2 default policy
maxRetries 6, base 3000ms, max 30000ms => worst-case sleep ~ 105000 ms per request
```

### Why it matters
- 502/503/504 from a gateway (Azure Front Door, the Dataverse load balancer, a client proxy) **don't mean the server didn't process the request**. Re-sending `POST ImportSolution` (same `ImportJobId`), `POST accounts`, `POST <custom action>`, `POST $batch` with change sets, or `PATCH` with `If-Match` can duplicate work or fail confusingly. For example, "an import job with this id already exists" can arrive *after* the first import actually succeeded.
- `429` from Dataverse service protection means the request was not executed (documented), so it is safe to retry for every method.
- A 105 s silent stall per request defeats application-level UX (progress, "environment busy" messages, cancel).

### Proposed fix
- Default policy per method:
  - **GET / HEAD / OPTIONS:** retry on 429, 502, 503, 504, and network `TypeError`.
  - **POST / PATCH / PUT / DELETE:** retry **only on 429**. Opt in to more with `retry.retryNonIdempotent: true` or `retry.methods`.
  - A request can declare itself idempotent with `RequestOptions.idempotent = true`. For example, `PATCH` with `If-Match: <etag>`, or `PUT` to a single property.
- Lower defaults: `maxRetries: 3`, `maxDelayMs: 15000`, and an overall `maxElapsedMs` (default 60 000), so the total wait is bounded.
- Always honour `Retry-After` (seconds or HTTP date) for 429 (already parsed). Cap it at `maxElapsedMs`.
- Honour `request.signal` during the sleep (already passed to `sleep`). Make sure an aborted sleep rejects with `AbortError`.
- **Wire per-request options:** see issue 5 / [Appendix B](#appendix-b--suggested-pipeline-refactor-covers-4-5-8-12-16). Create a per-request context in `DataverseClient.send()` and copy `RequestOptions.middlewareOptions` into it. Forward `options.middlewareOptions` from `DataverseRequestBuilder.send()` and `DataverseClient.execute()`.
- Type `RetryOptions` (public) with `retryableStatusCodes?`, `shouldRetry?(status, method)`, `retryNonIdempotent?`, `maxElapsedMs?`.
- Add a retry callback `onRetry?(info: { attempt, delayMs, status, method, url })` so apps can show "Throttled, retrying in 12 s…".

### Tests
- POST + 503 → 1 call, error thrown (default).
- POST + 429 with `Retry-After: 0` → retried.
- GET + 503 → retried up to `maxRetries`.
- `retryNonIdempotent: true` → POST retried on 503.
- Per-request `middlewareOptions` retry override `{ maxRetries: 0 }` → 1 call.
- Abort during back-off → rejects promptly with `AbortError`.
- `maxElapsedMs` bounds the total time (fake timers).

### Acceptance criteria
The G2 repro makes **1** fetch call by default, and the G2b repro makes **1** call.

### Breaking-change note
This changes default behaviour for POST on 5xx. Call it out in the changeset (minor or major depending on versioning policy; the fix is a safety improvement).

---

## 5. One middleware context is shared by all requests of a client

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P1. Telemetry/correlation is wrong, and per-request options (issue 4) can't work.

### Affected code
- `client/DataverseClient.ts:34-37` builds `this.ctx = { logger, telemetry }` once. Lines 72-73 pass that same object to every `pipeline.execute`.
- `middleware/TelemetryMiddleware.ts:29`: `ctx.correlationId ??= generateUUID()`. It is set on the first request and **reused forever**.
- `middleware/RetryMiddleware.ts:38`: `ctx.attempt = attempt` is written on the shared object while other requests read it (`LoggingMiddleware.ts:18,22`, `TelemetryMiddleware.ts:62`).

### Reproduction (published 1.0.0)
```
G8 correlation ids across 3 requests (2 concurrent + 1 later)
["46598b10-…", "46598b10-…", "46598b10-…"]
```

### Proposed fix
In `DataverseClient.send(request, options?)`:
```ts
const ctx: MiddlewareContext = {
  logger: this.options.logger,
  telemetry: this.options.telemetry,
  correlationId: options?.correlationId ?? generateUUID(),
  middlewareOptions: options?.middlewareOptions,
  attempt: 0,
};
return this.pipeline.execute(request, ctx, (r, c) => this.adapter.send(r, c));
```
- Allow a caller-supplied `correlationId` (to group the requests of one user operation) through `RequestOptions.correlationId`.
- Thread `options` from `DataverseRequestBuilder.send()` and `DataverseClient.execute()` into `client.send()`.

### Tests
- Two concurrent requests get different correlation ids.
- A supplied `correlationId` is used.
- `attempt` reported by logging/telemetry matches each request's own retries under concurrency.

### Acceptance criteria
The G8 repro prints 3 distinct ids.

---

## 6. Function parameters are encoded incorrectly (enums, GUIDs, string escaping); enums are exported type-only

**Package:** `@mohsinonxrm/dataverse-sdk-functions@1.0.0` (generated) and the generator in `tools/` / `packages/dataverse-sdk-generator`
**Severity:** P1. Typed functions with these parameter types return HTTP 400. **Verify live** for each type; the RetrieveEntityRibbon case is already confirmed against a real org by Command Bar Studio, see below.

### Affected code
- Example: `packages/dataverse-sdk-functions/src/RetrieveEntityRibbonFunction.ts:30-45`. The pattern is the same in every generated function:
  ```ts
  params.append("@p1", typeof v === "string" ? `'${v}'` : String(v));
  ```
- `packages/dataverse-sdk-functions/src/types/RibbonLocationFilters.ts`: `export enum RibbonLocationFilters { Form = 1, HomepageGrid = 2, SubGrid = 4, All = 7 }`. It is re-exported with **`export type`** (`types/index.ts:2825`), so `RibbonLocationFilters.All` is `undefined` at runtime for consumers (`typeof fns.RibbonLocationFilters === "undefined"`).
- 61 enum types exist under `functions/src/types`. **9 generated functions take enum-typed parameters** and are affected:
  `InitializeFromFunction (TargetFieldType)`, `QueryMultipleSchedulesFunction (TimeCode)`, `QueryScheduleFunction (TimeCode)`, `RetrieveAllEntitiesFunction (EntityFilters)`, `RetrieveCurrentOrganizationFunction (EndpointAccessType)`, `RetrieveEntityFunction (EntityFilters)`, `RetrieveEntityRibbonFunction (RibbonLocationFilters)`, `RetrieveMetadataChangesFunction (DeletedMetadataFilters)`, `RollupFunction (RollupType)`.

### Reproduction (published 1.0.0; URLs decoded)
```
RetrieveEntityRibbonFunction("contact", "All")
…/RetrieveEntityRibbon(EntityName=@p1,RibbonLocationFilter=@p2)?@p1='contact'&@p2='All'

RetrieveEntityRibbonFunction("contact", 7)          // what the TS enum value would give
…?@p1='contact'&@p2=7

RetrieveCurrentOrganizationFunction(0)
…/RetrieveCurrentOrganization(AccessType=@p1)?@p1=0

RetrieveEntityFunction(EntityFilters, LogicalName, MetadataId: Guid, RetrieveAsIfPublished)
…?@p1=1&@p2='…'&@p3='<guid>'&@p4=false             // Guid sent quoted

RetrieveEntityRibbonFunction("o'brien", "All")
…?@p1='o'brien'&@p2='All'                            // quote not escaped → malformed literal
```

### Ground truth
Command Bar Studio ships a hand-built query, verified against live orgs and documented in `pptb-mxrm-commandbar-studio/src/services/dataverse/ribbonService.ts:146-172`:
> The Web API expects the value as a type-qualified enum literal, e.g. `RibbonLocationFilter=Microsoft.Dynamics.CRM.RibbonLocationFilters'All'`. Quoted (`'Microsoft…'All''`, `'All'`) or numeric (`7`), Dataverse answers 400. Omitting it causes `0x80060888: Resource not found for the segment 'RetrieveEntityRibbon'`.

Microsoft's Web API samples use the same form: `RetrieveCurrentOrganization(AccessType=@p1)?@p1=Microsoft.Dynamics.CRM.EndpointAccessType'Default'`, and `EntityFilters=Microsoft.Dynamics.CRM.EntityFilters'Entity'` for `RetrieveEntity`. Flag enums combine with commas: `Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'`. OData v4 GUID literals are **unquoted**: `@p=00000000-0000-0000-0000-000000000000`.

### Proposed fix (generator)
1. Use the CSDL type of each parameter (`$metadata`) to choose the literal format:
   - `Edm.String` → `'${v.replace(/'/g, "''")}'`, then URL-encode the alias value.
   - `Edm.Guid` → unquoted GUID (validate the format).
   - `Edm.Boolean` / numeric → `String(v)`.
   - `Edm.DateTimeOffset` → ISO 8601, unquoted.
   - `Microsoft.Dynamics.CRM.<EnumType>` → `Microsoft.Dynamics.CRM.<EnumType>'<MemberName>'`. For `[Flags]` enums, join member names with `,`.
   - Entity / complex / collection → JSON with `@odata.type`, URL-encoded (Web API supports JSON for complex aliases).
2. **Enum representation in TS:** emit enums as **string-literal unions** of member names plus a runtime `const` object, exported as values (not `export type`):
   ```ts
   export const RibbonLocationFilters = { Form: "Form", HomepageGrid: "HomepageGrid", SubGrid: "SubGrid", All: "All" } as const;
   export type RibbonLocationFilters = (typeof RibbonLocationFilters)[keyof typeof RibbonLocationFilters];
   ```
   For flags enums, accept `RibbonLocationFilters | RibbonLocationFilters[]`. If numeric TS enums must stay, keep a generated `value → name` map for encoding.
3. Add a shared helper in core, `formatODataLiteral(value, edmType)`, that the generated code calls, so the rules live in one place and are unit-tested.
4. Regenerate `dataverse-sdk-functions`. Check whether **actions** have enum-typed *body* properties too (JSON bodies use the member name as a string, or the numeric value? Verify per action).

### Tests
- Golden URL tests for the 9 functions above, plus a sample of string, guid, bool and datetime parameters.
- Escaping test: `o'brien` → `'o''brien'` (URL-encoded).
- Runtime-export test: `import { RibbonLocationFilters } from "@mohsinonxrm/dataverse-sdk-functions"` is defined.
- Optional live smoke (behind an env var): `RetrieveEntityRibbon(contact, All)` returns `CompressedEntityXml`.

### Acceptance criteria
`new RetrieveEntityRibbonFunction("contact", RibbonLocationFilters.All)` produces `…@p2=Microsoft.Dynamics.CRM.RibbonLocationFilters'All'` and works against a live org.

---

## 7. `dataverse-sdk-auth-msal-browser`: outdated hard MSAL dependency, duplicate copies, popups opened from inside the pipeline

**Package:** `@mohsinonxrm/dataverse-sdk-auth-msal-browser@1.0.0`
**Severity:** P1. Unusable alongside a current MSAL, which every modern SPA will have.

### Affected code
- `packages/dataverse-sdk-auth-msal-browser/package.json`: `"dependencies": { "@azure/msal-browser": "^3.0.0" }` (npm latest is **5.27.0**).
- `src/MsalBrowserTokenProvider.ts:172`: `if (error instanceof InteractionRequiredAuthError)`.
- `src/MsalBrowserTokenProvider.ts:191-226`: `acquireTokenInteractive()` calls `acquireTokenPopup` / `acquireTokenRedirect` **from inside `getToken()`**, which runs inside the HTTP pipeline.
- `src/MsalBrowserTokenProvider.ts:148, 234-244`: account = `options.account ?? getActiveAccount() ?? accounts[0]`. The silent request sets neither `authority` nor `loginHint`.

### Reproduction (npm install of the published package next to `@azure/msal-browser@5`)
```
+-- @azure/msal-browser@5.27.0          (the app's copy)
`-- @mohsinonxrm/dataverse-sdk-auth-msal-browser@1.0.0
    `-- @azure/msal-browser@3.30.0      (nested second copy, 13 MB installed)
        `-- @azure/msal-common@14.16.1
```

### Why it matters
- **Two MSAL copies.** The app passes its v5 `PublicClientApplication`. The provider imports `InteractionRequiredAuthError` from its own v3 copy, so the `instanceof` check is **always false** with an app-supplied instance. Silent failures never fall back to interactive and surface as `DataverseAuthenticationError`. Bundle size also doubles.
- **Popup from a non-user-gesture context.** Browsers block `window.open` outside a click handler. Inside the pipeline (often after `await`s) the popup is blocked (`BrowserAuthError: popup_window_error`).
- **Concurrent requests.** When a token expires, N parallel requests each start an interaction, and MSAL throws `interaction_in_progress` for N−1 of them.
- **Redirect from inside a request** navigates away mid-operation (for example during a solution import) and loses in-memory state.
- **Multi-tenant / guest accounts.** A Dataverse org in tenant B for an account whose home tenant is A needs `authority: https://login.microsoftonline.com/<tenantB>` on the silent request. Picking `accounts[0]` with several cached accounts can use the wrong identity.

### Proposed fix
- Make `@azure/msal-browser` a **`peerDependency`** (`">=3.0.0 <6"`), with a devDependency on the latest for tests.
- Detect interaction-required by **error code**, not `instanceof`:
  ```ts
  const INTERACTION_CODES = new Set(["interaction_required", "consent_required", "login_required", "invalid_grant", "no_tokens_found", "native_account_unavailable", "refresh_token_expired", "bad_token"]);
  const needsInteraction = (e: any) => e?.name === "InteractionRequiredAuthError" || INTERACTION_CODES.has(e?.errorCode);
  ```
- New option `interactionType: "popup" | "redirect" | "none"`, and **make `"none"` the recommended SPA mode**: throw a typed `InteractionRequiredError` (exported from core, carrying `scopes`, `claims`, `account`) so the **app** decides when to prompt, from a button click. Keep `"popup"` for backward compatibility.
- When interaction is allowed, de-duplicate it: share one in-flight interaction promise per provider; queued callers await it.
- Options `authority?: string` and `account?: AccountInfo | (() => AccountInfo | null)`. Pass `authority` and `account` on silent calls, and `loginHint` / `account` on interactive calls.
- Pass `claims` through from issue 8 (claims challenge).
- Don't call `logoutPopup` / `logoutRedirect` from a token provider; sign-out belongs to the app. Deprecate `signOut()` or move it to a helper.

### Tests (with a fake `IPublicClientApplication`)
- Silent success → token.
- Silent throws a v5-shaped `InteractionRequiredAuthError` (different class identity) → handled as interaction required.
- `"none"` mode → throws `InteractionRequiredError` with scopes and claims.
- 5 concurrent `getToken` calls that need interaction → one popup.
- `authority` and `account` forwarded.

### Acceptance criteria
`npm ls @azure/msal-browser` in an app with v5 shows a single copy. Interaction-required is detected with an app-supplied v5 instance.

---

## 8. Auth in the pipeline: one token per request (not per attempt), no 401 handling, claims challenges lost

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P1 for long sessions, Conditional Access and CAE tenants.

### Affected code
- `pipeline/DefaultMiddleware.ts:12-17`: the order is `Auth → ODataHeaders → Concurrency → Retry → Telemetry → Logging`. Auth runs once, **outside** Retry.
- `middleware/AuthMiddleware.ts:24`: `tp.getToken(scopes)`, with no `claims`, no `correlationId`, and no 401 handling.
- `errors/parseODataError.ts`: ignores the `WWW-Authenticate` header.

### Reproduction (published 1.0.0)
```
A1 token acquisitions for 1 request retried twice
getToken calls: 1; authorization per attempt: Bearer tok1, Bearer tok1, Bearer tok1

A2 401 then 200
failed after 1 call(s): DataverseODataError 401

A3 401 with claims challenge (WWW-Authenticate: Bearer error="insufficient_claims", claims="eyJ…")
{ "name": "DataverseODataError", "message": "", "status": 401, "hasClaims": false }
```

### Why it matters
- A retried request can sleep for up to 105 s (issue 4) and then retry with a token that expired in the meantime.
- A 401 caused by token expiry or revocation (CAE) is never retried with a fresh token.
- CAE / Conditional Access **claims challenges** (`WWW-Authenticate: Bearer … claims="<base64>"`) must be passed to MSAL (`acquireToken*({ claims })`). The SDK drops them, so apps can't handle step-up auth.

### Proposed fix
- Move token acquisition **inside** the retry loop, so it runs before each attempt. Either reorder to `ODataHeaders → Concurrency → Retry → Auth → Telemetry → Logging`, or have Retry call a `prepareAttempt` hook. Token providers cache, so the cost is negligible.
- On **401**: parse `WWW-Authenticate`. If it carries `claims=` → throw `DataverseClaimsChallengeError { claims (decoded JSON string), scopes, status: 401 }` without retrying; the app or provider must do interactive auth. Otherwise, retry **once** after `getToken(scopes, { forceRefresh: true })` (add `forceRefresh?: boolean` to `TokenOptions`).
- Pass `correlationId` (issue 5) into `TokenOptions`.
- Document that providers should cache tokens and refresh 5 minutes before expiry.

### Tests
- Retry with a token provider that returns `tok1` then `tok2` → the second attempt sends `tok2`.
- 401 without claims → one refresh-retry → success.
- 401 with claims → `DataverseClaimsChallengeError` with the decoded claims; no retry.
- Second consecutive 401 → error (no loop).

### Acceptance criteria
A1 shows one `getToken` call per attempt, A2 succeeds, and A3 throws a typed error that includes the claims.

---

## 9. Error objects lose information: no code in the message, non-JSON bodies discarded, wrong request-id header

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P2. Troubleshooting and error classification by consumers.

### Affected code
- `errors/parseODataError.ts:16-21`: `message = parsed?.error?.message ?? parsed?.message ?? \`HTTP ${status}\``; `code` is stored separately.
- `errors/parseODataError.ts:6`: `requestId = res.headers.get("x-ms-request-id") ?? res.headers.get("req-id")`. Dataverse returns **`x-ms-service-request-id`** (and `REQ_ID`).
- The raw text of non-JSON bodies (HTML from gateways, plain text) is kept only in `raw`. The message is just `HTTP 502`.
- `error.innererror` (with `message`, `type`, `stacktrace` on some orgs) and `@Microsoft.PowerApps.CDS.ErrorDetails.*` annotations are not surfaced.

### Reproduction (published 1.0.0)
```
G5 error shape
{ "name": "DataverseODataError", "message": "Cannot start another [Import] because there is a previous [Import] running at this moment.",
  "code": "0x80071151", "status": 400,
  "toString": "DataverseODataError: Cannot start another [Import] …" }      // code absent from message / toString

G5b non-JSON error (502 text/html "<html>Bad gateway</html>")
{ "name": "DataverseODataError", "message": "HTTP 502", "status": 502 }

E2 requestId from x-ms-service-request-id: (undefined)
```

### Why it matters
Consumers often log or show `err.message`, or match error codes in text (`0x80071151` environment busy, `0x80040220` privilege, `0x80060888` segment not found). Without the code in the message, logs and support tickets lose the most useful part. Without the request id, Microsoft support can't trace the call.

### Proposed fix
- Keep `message` as is (non-breaking), and add:
  - `DataverseError.prototype.toString()` → `` `${name}: ${code ? code + ": " : ""}${message}` ``.
  - `get detail(): string`, a one-line summary: `code: message (HTTP status, request id …)`.
  - `innerError?: { message?: string; type?: string; stacktrace?: string }`.
  - `serviceRequestId` from `x-ms-service-request-id` (fall back to `req_id`, `x-ms-request-id`).
  - `retryAfterMs` on all errors (not only 429).
  - `bodySnippet` (first 500 chars) for non-JSON bodies, used in the message: `HTTP 502: <title or first line>`.
- Export `formatDataverseError(err): string` and `isDataverseErrorCode(err, "0x80071151")`.
- Optional breaking alternative for the next major: `message = code ? \`${code}: ${msg}\` : msg`.

### Tests
- JSON OData error → `code`, `message`, `serviceRequestId`, `innerError`.
- HTML 502 → message includes a snippet; `raw` has the full body.
- 429 → `DataverseThrottleError` with `retryAfterMs` (already the case; keep).

### Acceptance criteria
E2 prints `abc-123`, and `formatDataverseError` of G5 starts with `0x80071151:`.

---

## 10. No logger configured → every request URL is logged to the console (PII)

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P2 (privacy/security): data appears in the browser console and in server logs.

### Affected code
- `middleware/LoggingMiddleware.ts:16`: `const logger = this.options.logger ?? ctx.logger ?? ConsoleLogger;`
- `utils/consoleLogger.ts:4-6`: `debug` → `console.debug`.
- `LoggingMiddleware.ts:18,21`: logs `${method} ${request.url}`, the **full URL including query values**, plus a `meta` object that prints as `[object Object]`.

### Reproduction (published 1.0.0)
```
L1 default logger (no logger configured) console.debug lines
"➡️ GET https://contoso.crm.dynamics.com/api/data/v9.2/contacts?$filter=emailaddress1 eq 'jane@contoso.com' [object Object]"
"⬅️ 200 GET https://contoso.crm.dynamics.com/api/data/v9.2/contacts?$filter=emailaddress1 eq 'jane@contoso.com' (0ms) [object Object]"
```
(Chrome hides `console.debug` unless "Verbose" is on. Node prints it, and log collectors capture it.)

### Proposed fix
- Default logger = **no-op**. `ConsoleLogger` stays exported for opt-in use.
- Log a **redacted URL** by default: origin + path, with key values and the query removed (`GET /api/data/v9.2/contacts?…`). Opt in to full URLs with `logging: { includeQuery: true }`.
- Never log request or response headers or bodies unless explicitly enabled. Always strip `authorization`.
- Fix the `[object Object]` meta formatting (use `console.debug(m, meta)`, not string concatenation, in any custom formatter).

### Tests
- No logger option → nothing on `console.*`.
- With `ConsoleLogger` → URL without query by default; full URL with `includeQuery: true`.

### Acceptance criteria
The L1 repro prints nothing.

---

## 11. `defaultPrefer` is declared but never applied

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P2. A silent no-op in the public API.

### Affected code
- `abstractions/options.ts:68`: `defaultPrefer?: PreferOption[]`. `grep -rn defaultPrefer packages/dataverse-sdk-core/src` finds **only** that declaration.

### Reproduction (published 1.0.0)
```
P1b defaultPrefer alone (POST accounts) -> prefer: (none)
P1  defaultPrefer + builder .preferRaw('odata.include-annotations="*"') -> prefer: odata.include-annotations="*"
```
(`defaultHeaders`, by comparison, is applied by `ODataHeadersMiddleware`: P2 → `1`.)

### Proposed fix
In `ODataHeadersMiddleware`, or better in the builder / `client.execute` when building headers, merge `options.defaultPrefer` with the request's `prefer`. De-duplicate by preference name (`return`, `odata.include-annotations`, `odata.maxpagesize`, `odata.continue-on-error`). When both specify the same preference, the request-level value wins.

### Tests
- `defaultPrefer` alone → header present.
- `defaultPrefer` + builder prefer → both present, de-duplicated.
- Conflicting `odata.maxpagesize` → request value wins.

---

## 12. `TelemetryMiddleware`: PII in URLs, no redaction hook, hard-coded version, can break requests

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P2 (privacy). Combined with issue 1 it is P0.

### Affected code
- `middleware/TelemetryMiddleware.ts:46, 52-64, 70-86`: sends `url: request.url` (full URL, query included) in `trackDependency` and `request.url` in `trackException` properties.
- `TelemetryMiddleware.ts:11`: `const SDK_VERSION = "0.1.0"; // TODO`. The package is 1.0.0 (observed header `dataverse-sdk-js/0.1.0`).
- `TelemetryMiddleware.ts:35`: `featureTracker.addFeature(TELEMETRY_ENABLED)` is marked even when no telemetry client is configured.
- No try/catch around telemetry calls (see issue 1).

### Proposed fix
- Option `telemetry: { client, redactUrl?: (url: URL) => string, includeQuery?: false }`. Keep accepting a bare `TelemetryClient` for compatibility. Default redaction: `origin + pathname`, with GUID key segments replaced by `{id}` (`/accounts({id})`) so dependency names group well, and no query.
- Dependency `name` = `METHOD /api/data/v9.2/<entityset or operation>` (low cardinality); `target` = host.
- Inject the version at build time (tsup `define: { __SDK_VERSION__: JSON.stringify(pkg.version) }`) and use it in the header (issue 3) and telemetry.
- Only mark `TELEMETRY_ENABLED` when a client is configured.
- Wrap telemetry calls (issue 1).

### Tests
- Default redaction removes the query and GUIDs.
- A custom `redactUrl` is used.
- The version equals `package.json` version.

---

## 13. Discovery client: commercial-only scopes, bypasses the pipeline, unescaped filters, untyped errors

**Package:** `@mohsinonxrm/dataverse-sdk-discovery@1.0.0`
**Severity:** P2 (sovereign clouds, robustness).

### Affected code
- `packages/dataverse-sdk-discovery/src/DiscoveryClient.ts:13`: `GLOBAL_DISCOVERY_URL = "https://globaldisco.crm.dynamics.com/api/discovery/v2.0"`.
- `DiscoveryClient.ts:18`: `DISCOVERY_SCOPES = ["https://globaldisco.crm.dynamics.com/.default"]`. These are used at line 114 **even when a custom `baseUrl` is passed**, so GCC High / DoD / China discovery gets a token for the wrong resource.
- `DiscoveryClient.ts:135`: calls the global `fetch` directly: no `fetchProvider` injection (hard to test), no retry/throttle handling, no logging or telemetry, no timeout/abort.
- `DiscoveryClient.ts:145-149`: throws a plain `Error("Discovery request failed: …")`, not a `DataverseError`.
- `getOrganization(uniqueName)` (`:177`) and `getOrganizationsByRegion(geo)` (`:202`) interpolate into `$filter` with **no quote escaping** (`UniqueName eq '${uniqueName}'`).

### Proposed fix
- Constructor options: `{ tokenProvider, cloud?: "public" | "usgov" | "usgovhigh" | "dod" | "china", baseUrl?, scopes?, fetchProvider?, logger?, telemetry?, retry? }`, with presets:

  | cloud | discovery base URL | scope resource |
  |---|---|---|
  | public | `https://globaldisco.crm.dynamics.com/api/discovery/v2.0` | `https://globaldisco.crm.dynamics.com` |
  | usgov (GCC) | `https://globaldisco.crm9.dynamics.com/api/discovery/v2.0` | same host |
  | usgovhigh | `https://globaldisco.crm.microsoftdynamics.us/api/discovery/v2.0` | same host |
  | dod | `https://globaldisco.crm.appsplatform.us/api/discovery/v2.0` | same host |
  | china | `https://globaldisco.crm.dynamics.cn/api/discovery/v2.0` | same host |

  (Verify each host against current Microsoft docs, "Discover the URL for your organization".)
- Derive the default scope from the base URL host (`https://<host>/.default`) unless `scopes` is given. For SPAs, document `https://<host>/user_impersonation`.
- Reuse core's pipeline (a small `DataverseClient` pointed at the discovery base URL) for retry, logging, telemetry and errors, or at least accept `fetchProvider` and throw `DataverseODataError` via `parseODataError`.
- Escape literals (`'` → `''`) and URL-encode them.
- Follow `@odata.nextLink` if present.

### Tests
- `cloud: "usgovhigh"` → correct URL and scope.
- Custom `baseUrl` → scope derived from it.
- A `uniqueName` with `'` → escaped.
- 503 then 200 → retried (GET).
- An error is a `DataverseODataError`.

---

## 14. `getAll({ maxPages })` ignores `maxPages`

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P3.

### Affected code
`client/DataverseRequestBuilder.ts:304-315`: `pages++` and the `maxPages` check are **after** the `for await` loop, so they run once at the end.

### Reproduction (published 1.0.0)
```
G7 getAll({maxPages:2}) over 5 pages → rows: 5, fetch calls: 5
```

### Proposed fix
Iterate pages, not items, so `maxPages` can stop before fetching the next page:
```ts
async getAll<T>(opts: { maxItems?: number; maxPages?: number } = {}): Promise<T[]> {
  const out: T[] = [];
  let page: PageResponse<T> | undefined = await this.getPage<T>();
  let pages = 0;
  while (page) {
    pages++;
    for (const item of page.value ?? []) { out.push(item); if (opts.maxItems && out.length >= opts.maxItems) return out; }
    if (opts.maxPages && pages >= opts.maxPages) return out;
    const next = page["@odata.nextLink"];
    page = next ? await this.client.api(next).skipUrlValidation().get<PageResponse<T>>() : undefined;
  }
  return out;
}
```
(The `skipUrlValidation()` becomes unnecessary once issue 2 is fixed.)

### Tests
`maxPages: 2` over 5 pages → 2 fetches; `maxItems: 3` → 3 rows, and fetching stops.

---

## 15. Typed operations: long positional constructors in alphabetical order

**Packages:** `@mohsinonxrm/dataverse-sdk-actions@1.0.0`, `@mohsinonxrm/dataverse-sdk-functions@1.0.0` (generator)
**Severity:** P3 (DX), but it leads directly to wrong requests.

### Affected code / examples
- `ImportSolutionAction` has **17** positional parameters: `(overwriteUnmanagedCustomizations, publishWorkflows, customizationFile, importJobId, convertToManaged, skipProductUpdateDependencies, holdingSolution, skipQueueRibbonJob, layerDesiredOrder, asyncRibbonProcessing, componentParameters, isTemplateMode, templateSuffix, solutionParameters, templateDisplayNamePrefix, stageAndUpgrade, schemaUpdatesOnly)`, all typed as required. Undefined values are dropped by `JSON.stringify`, so passing only the first 4 works at runtime but not in TypeScript.
- `AddSolutionComponentAction(componentId, componentType, solutionUniqueName, addRequiredComponents, doNotIncludeSubcomponents, includedComponentSettingsValues)`.
- `RetrieveEntityFunction(EntityFilters, LogicalName, MetadataId, RetrieveAsIfPublished)`: alphabetical order, so `LogicalName` comes before `MetadataId`. Swapping them is a silent bug (the repro did exactly that by accident: `@p2='<guid>'&@p3='contact'`).
- `ImportSolutionResponse` is an empty interface and `parseResponse` ignores the body. Fine for 204, but some actions return 200 with content.

### Proposed fix (generator)
- Generate an **options object** constructor with the CSDL `Nullable` flags: `new ImportSolutionAction({ CustomizationFile, ImportJobId, OverwriteUnmanagedCustomizations: true, PublishWorkflows: false })`. Required properties are required in the type and optional ones are optional (`?`). Keep CSDL names (PascalCase) so they map 1:1 to the docs.
- Omit `undefined` properties from bodies explicitly.
- Keep positional overloads for one major version with `@deprecated`.
- Generate `parseResponse` that returns the JSON body when the status is 200 and `{}` for 204.

### Tests
Snapshot of the generated `ImportSolutionAction` and `RetrieveEntityFunction` signatures and bodies; a type test (tsd) for required/optional properties.

---

## 16. Pipeline order and concurrency details

**Package:** `@mohsinonxrm/dataverse-sdk-core@1.0.0`
**Severity:** P3.

### Findings
- `pipeline/DefaultMiddleware.ts:12-17`: **Auth runs before Concurrency.** Under load, a token is acquired and then the request waits in the semaphore queue, so the token can get close to expiry before it is sent. Fixed by issue 8's reorder.
- **Retry runs inside Concurrency** (`ConcurrencyMiddleware.ts:70-85` holds the slot across `next()`, which includes retry sleeps of up to 30 s). Arguably correct back-pressure for 429, but document it, and consider releasing the slot during the sleep (re-acquire before the next attempt) so one throttled request doesn't stall unrelated reads.
- `ConcurrencyMiddleware.ts:47`: `DEFAULT_MAX_NODE = 8`, applied in browsers too. HTTP/2 to Dataverse makes 8 fine, but name and document it as a single default.
- `ConcurrencyMiddleware.ts:74`: reads `x-ms-dop-hint`. In browsers, response headers that are not CORS-safelisted are only readable if the server lists them in `Access-Control-Expose-Headers`. If Dataverse doesn't, adaptive concurrency is a no-op in SPAs. Document this, and verify live what Dataverse exposes. The same applies to `Retry-After` (needed by issue 4), `x-ms-service-request-id` (issue 9) and `OData-EntityId` (used to read created ids). Record the verified list in the README's browser section.

---

## Appendix A — Reproduction scripts

Run against the published packages (no network needed):
```bash
mkdir sdk-repro && cd sdk-repro && npm init -y
npm i @mohsinonxrm/dataverse-sdk-core@1.0.0 @mohsinonxrm/dataverse-sdk-functions@1.0.0 @mohsinonxrm/dataverse-sdk-actions@1.0.0 @mohsinonxrm/dataverse-sdk-discovery@1.0.0 @mohsinonxrm/dataverse-sdk-appinsights@1.0.0 @mohsinonxrm/dataverse-sdk-auth-msal-browser@1.0.0
node repro.mjs "$PWD" && node repro2.mjs "$PWD" && node repro3.mjs "$PWD"
npm ls @azure/msal-browser
```
Each script takes the folder that contains `node_modules` as its first argument. In the fixing session, convert these into Vitest cases (with `msw` or the same fake `fetchProvider`) under `packages/dataverse-sdk-core/test/regressions/`. Each case should fail before its fix and pass after.


### `repro.mjs`

```js
const base = process.argv[2] + "/node_modules/";
const core = await import(base + "@mohsinonxrm/dataverse-sdk-core/dist/index.js");
const fns = await import(base + "@mohsinonxrm/dataverse-sdk-functions/dist/index.js");
const { DataverseClient } = core;
const ORG = "https://contoso.crm.dynamics.com";
const log = (k, v) => console.log(`\n### ${k}\n${typeof v === "string" ? v : JSON.stringify(v, null, 2)}`);
const quiet = { debug(){}, info(){}, warn(){}, error(){} };

function fakeFetch(handler) {
  const calls = [];
  return { calls, provider: { fetch: async (url, init) => { calls.push({ url: String(url), method: init.method, headers: { ...init.headers }, body: init.body }); return handler(calls.length, String(url), init); } } };
}
const json = (status, body, headers = {}) => new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });

// G1 validateUrl on query
{
  const ids = Array.from({ length: 40 }, (_, i) => `00000000-0000-0000-0000-${String(i).padStart(12, "0")}`);
  const q = `EntityDefinitions?$select=LogicalName,DisplayName&$filter=${ids.map((id) => `MetadataId eq ${id}`).join(" or ")}`;
  const f = fakeFetch(() => json(200, { value: [] }));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet });
  try { await c.api(q).get(); log("G1 long $filter (" + q.length + " chars)", "sent OK"); }
  catch (e) { log("G1 long $filter (" + q.length + " chars)", `${e.name}: ${e.message}  | fetch calls: ${f.calls.length}`); }
  const q2 = "webresourceset?$select=webresourceid,name,displayname,description,webresourcetype,modifiedon,ismanaged&$orderby=name asc&$filter=" + encodeURIComponent("startswith(name,'new_/icons/') and webresourcetype eq 11 and ismanaged eq false and (name eq 'new_/icons/a.svg' or name eq 'new_/icons/b.svg')");
  try { await c.api(q2).get(); log("G1b query containing '/' (" + q2.length + " chars)", "sent OK"); } catch (e) { log("G1b", e.message); }
  const f3 = fakeFetch(() => json(200, { value: [] }));
  const c3 = new DataverseClient({ baseUrl: ORG, fetchProvider: f3.provider, logger: quiet });
  await c3.api(q).skipUrlValidation().get(); log("G1 workaround skipUrlValidation", "sent OK, url length " + f3.calls[0].url.length);
}

// G2 retry POST on 503 + per-request override ignored
{
  const f = fakeFetch((n) => n < 3 ? json(503, { error: { code: "0x80040216", message: "busy" } }) : new Response(null, { status: 204 }));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet, retry: { baseDelayMs: 1, maxDelayMs: 2, jitter: false } });
  await c.api("ImportSolution").post({ CustomizationFile: "UEsDB...", ImportJobId: "11111111-1111-1111-1111-111111111111" });
  log("G2 POST ImportSolution vs 503,503,204", `fetch calls: ${f.calls.length}; Retry-Attempt headers: ${f.calls.map(c => c.headers["Retry-Attempt"] ?? "-").join(",")}; same ImportJobId re-sent: ${f.calls.every(x => x.body.includes("1111"))}`);
  const f2 = fakeFetch((n) => n < 3 ? json(503, {}) : json(200, {}));
  const c2 = new DataverseClient({ baseUrl: ORG, fetchProvider: f2.provider, logger: quiet, retry: { baseDelayMs: 1, maxDelayMs: 2, jitter: false } });
  let opts;
  try { opts = new core.MiddlewareRequestOptions(); opts.set?.("retry", { maxRetries: 0 }); } catch (e) { opts = undefined; }
  await c2.api("WhoAmI").get({ middlewareOptions: opts });
  log("G2b per-request middlewareOptions {retry:{maxRetries:0}}", `RequestOptions class: ${typeof core.MiddlewareRequestOptions}; fetch calls: ${f2.calls.length} (expected 1 if honoured)`);
  const f3 = fakeFetch((n) => n < 3 ? json(503, {}) : new Response(null, { status: 204 }));
  const c3 = new DataverseClient({ baseUrl: ORG, fetchProvider: f3.provider, logger: quiet, retry: { baseDelayMs: 1, maxDelayMs: 2, jitter: false, retryableStatusCodes: [429] } });
  try { await c3.api("ImportSolution").post({}); log("G2 workaround retryableStatusCodes:[429]", "no error?"); } catch (e) { log("G2 workaround retryableStatusCodes:[429]", `fetch calls: ${f3.calls.length}; error: ${e.name} ${e.status}`); }
  // default delays
  log("G2 default policy", "maxRetries 6, base 3000ms, max 30000ms => worst-case sleep ~ " + [0,1,2,3,4,5].map(a=>Math.min(30000,3000*2**a)).reduce((a,b)=>a+b) + " ms per request");
}

// G3 RetrieveEntityRibbon enum quoting
{
  const r = new fns.RetrieveEntityRibbonFunction("contact", "All").toRequestInformation(ORG + "/api/data/v9.2");
  log("G3 RetrieveEntityRibbonFunction URL", decodeURIComponent(r.url));
  const r2 = new fns.RetrieveEntityRibbonFunction("o'brien", "All").toRequestInformation(ORG + "/api/data/v9.2");
  log("G3b quote escaping for name with apostrophe", decodeURIComponent(r2.url));
}

// G5 error message
{
  const f = fakeFetch(() => json(400, { error: { code: "0x80071151", message: "Cannot start another [Import] because there is a previous [Import] running at this moment." } }));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet, retry: { maxRetries: 0 } });
  try { await c.api("ImportSolution").post({}); } catch (e) { log("G5 error shape", { name: e.name, message: e.message, code: e.code, status: e.status, toString: String(e) }); }
  const f2 = fakeFetch(() => new Response("<html>Bad gateway</html>", { status: 502, headers: { "content-type": "text/html" } }));
  const c2 = new DataverseClient({ baseUrl: ORG, fetchProvider: f2.provider, logger: quiet, retry: { maxRetries: 0 } });
  try { await c2.api("WhoAmI").get(); } catch (e) { log("G5b non-JSON error", { name: e.name, message: e.message, status: e.status }); }
  const f3 = fakeFetch(() => json(401, { error: { code: "", message: "" } }, { "www-authenticate": 'Bearer error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnt9fQ=="' }));
  const c3 = new DataverseClient({ baseUrl: ORG, fetchProvider: f3.provider, logger: quiet, retry: { maxRetries: 0 } });
  try { await c3.api("WhoAmI").get(); } catch (e) { log("A3 401 with claims challenge", { name: e.name, message: e.message, status: e.status, hasClaims: JSON.stringify(e).includes("claims") }); }
}

// Headers sent (CORS preflight relevance) + shared ctx correlation id
{
  const f = fakeFetch(() => json(200, { value: [] }));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet, tokenProvider: { getToken: async () => "tok" } });
  await Promise.all([c.api("accounts").get(), c.api("contacts").get()]);
  await c.api("systemusers").get();
  log("H1 headers on a plain GET", Object.keys(f.calls[0].headers).sort());
  log("G8 correlation ids across 3 requests", f.calls.map(x => x.headers["x-ms-correlation-id"]));
  log("H2 sdk version header", f.calls[0].headers["x-ms-sdk-version"]);
}

// default logger is console
{
  const f = fakeFetch(() => json(200, { value: [] }));
  const orig = console.debug; const seen = []; console.debug = (...a) => seen.push(a.join(" "));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider });
  await c.api("contacts?$filter=emailaddress1 eq 'jane@contoso.com'").get();
  console.debug = orig;
  log("L1 default logger (no logger configured) console.debug lines", seen);
}

// Auth token not refreshed on retry / 401 not retried
{
  let n = 0; const tokens = [];
  const f = fakeFetch((k) => k < 3 ? json(429, {}, { "retry-after": "0" }) : json(200, {}));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet, retry: { baseDelayMs: 1, maxDelayMs: 2 }, tokenProvider: { getToken: async () => { n++; return "tok" + n; } } });
  await c.api("WhoAmI").get();
  log("A1 token acquisitions for 1 request retried twice", `getToken calls: ${n}; authorization per attempt: ${f.calls.map(x => x.headers.authorization).join(", ")}`);
  const f2 = fakeFetch((k) => k === 1 ? json(401, { error: { code: "0x80042f09", message: "token expired" } }) : json(200, {}));
  let m = 0;
  const c2 = new DataverseClient({ baseUrl: ORG, fetchProvider: f2.provider, logger: quiet, tokenProvider: { getToken: async () => "t" + (++m) } });
  try { await c2.api("WhoAmI").get(); log("A2 401 then 200", "succeeded"); } catch (e) { log("A2 401 then 200", `failed after ${f2.calls.length} call(s): ${e.name} ${e.status}`); }
}

// G7 getAll maxPages
{
  let page = 0;
  const f = fakeFetch(() => { page++; return json(200, { value: [{ i: page }], "@odata.nextLink": page < 5 ? `${ORG}/api/data/v9.2/accounts?$skiptoken=${page}` : undefined }); });
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet });
  const rows = await c.api("accounts").getAll({ maxPages: 2 });
  log("G7 getAll({maxPages:2}) over 5 pages", `rows: ${rows.length}, fetch calls: ${f.calls.length}`);
}

// Prefer merge: defaultPrefer + per-call prefer
{
  const f = fakeFetch(() => json(200, { value: [] }));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet, defaultPrefer: [core.Prefer.returnRepresentation()] });
  await c.api("accounts").preferRaw('odata.include-annotations="*"').get();
  log("P1 defaultPrefer + builder prefer => prefer header", f.calls[0].headers.prefer ?? "(none)");
  const f2 = fakeFetch(() => json(200, {}));
  const c2 = new DataverseClient({ baseUrl: ORG, fetchProvider: f2.provider, logger: quiet, defaultHeaders: { "x-custom": "1" } });
  await c2.api("accounts").get();
  log("P2 defaultHeaders applied", f2.calls[0].headers["x-custom"] ?? "(missing)");
}

// URL normalisation of pre-encoded alias query
{
  const f = fakeFetch(() => json(200, {}));
  const c = new DataverseClient({ baseUrl: ORG, fetchProvider: f.provider, logger: quiet });
  await c.api("RetrieveEntityRibbon(EntityName=@e,RibbonLocationFilter=@f)?@e='contact'&@f=Microsoft.Dynamics.CRM.RibbonLocationFilters'All'").get();
  log("U1 raw alias path as sent", f.calls[0].url);
  await c.api("accounts?$select=name&$top=1").select("accountid").get().catch(e => log("U2", e.message));
  log("U2 path with ?query + .select() as sent", f.calls[1]?.url);
}
```

### `repro2.mjs`

```js
const base = process.argv[2] + "/node_modules/";
const core = await import(base + "@mohsinonxrm/dataverse-sdk-core/dist/index.js");
const fns = await import(base + "@mohsinonxrm/dataverse-sdk-functions/dist/index.js");
const acts = await import(base + "@mohsinonxrm/dataverse-sdk-actions/dist/index.js");
const B = "https://contoso.crm.dynamics.com/api/data/v9.2";
console.log("RibbonLocationFilters runtime export:", typeof fns.RibbonLocationFilters);
console.log("G3c enum numeric 7:", decodeURIComponent(new fns.RetrieveEntityRibbonFunction("contact", 7).toRequestInformation(B).url));
console.log("RetrieveCurrentOrganization(0):", decodeURIComponent(new fns.RetrieveCurrentOrganizationFunction(0).toRequestInformation(B).url));
console.log("RetrieveEntity:", decodeURIComponent(new fns.RetrieveEntityFunction(1, "00000000-0000-0000-0000-000000000000", "contact", false).toRequestInformation(B).url));
const imp = new acts.ImportSolutionAction(false, false, "UEsD", "11111111-1111-1111-1111-111111111111");
console.log("G9 ImportSolutionAction with 4 args body:", JSON.stringify(imp.toRequestInformation(B).body));
const pub = new acts.PublishXmlAction("<importexportxml/>");
console.log("PublishXml:", pub.toRequestInformation(B).url, JSON.stringify(pub.toRequestInformation(B).body));
const add = acts.AddSolutionComponentAction.toString().match(/constructor\(([^)]*)\)/)?.[1];
console.log("AddSolutionComponentAction ctor:", add);
const wr = new fns.RetrieveApplicationRibbonFunction().toRequestInformation(B);
console.log("RetrieveApplicationRibbon:", wr.url);
// defaultPrefer alone
const calls = [];
const c = new core.DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", logger: { debug(){}, info(){}, warn(){}, error(){} }, defaultPrefer: [core.Prefer.returnRepresentation()], fetchProvider: { fetch: async (u, i) => { calls.push(i.headers); return new Response("{}", { status: 200 }); } } });
await c.api("accounts").post({ name: "x" });
console.log("P1b defaultPrefer alone -> prefer:", calls[0].prefer ?? "(none)");
// execute() path for functions: applies prefer? headers casing duplicates
await c.execute(new fns.WhoAmIFunction());
console.log("H3 execute() headers:", JSON.stringify(calls[1]));
// ImportSolution parseResponse with 200 + body
```

### `repro3.mjs`

```js
const base = process.argv[2] + "/node_modules/";
const core = await import(base + "@mohsinonxrm/dataverse-sdk-core/dist/index.js");
const ai = await import(base + "@mohsinonxrm/dataverse-sdk-appinsights/dist/index.js");
const quiet = { debug(){}, info(){}, warn(){}, error(){} };
const ok = { fetch: async () => new Response('{"UserId":"1"}', { status: 200, headers: { "content-type": "application/json" } }) };
const c = new core.DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", fetchProvider: ok, logger: quiet, telemetry: new ai.ApplicationInsightsTelemetryClient({ connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000" }) });
try { await c.api("WhoAmI").get(); console.log("T1: request succeeded"); } catch (e) { console.log("T1: a successful (200) request rejected with:", e.message); }
const err = { fetch: async () => new Response('{"error":{"code":"0x80040217","message":"Not found"}}', { status: 404, headers: { "content-type": "application/json", "x-ms-service-request-id": "abc-123", "REQ_ID": "abc-123" } }) };
const c2 = new core.DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", fetchProvider: err, logger: quiet });
try { await c2.api("accounts(00000000-0000-0000-0000-000000000000)").get(); } catch (e) { console.log("E2: requestId from x-ms-service-request-id:", e.requestId ?? "(undefined)"); }
```

### Observed output (published 1.0.0, Node 22)

```text

### G1 long $filter (2214 chars)
DataverseUrlError: URL segment exceeds maximum length of 260 characters (actual: 2214). Consider shortening filter expressions or entity set names.  | fetch calls: 0

### G1b
URL segment exceeds maximum length of 260 characters (actual: 317). Consider shortening filter expressions or entity set names.

### G1 workaround skipUrlValidation
sent OK, url length 2577

### G2 POST ImportSolution vs 503,503,204
fetch calls: 3; Retry-Attempt headers: -,1,2; same ImportJobId re-sent: true

### G2b per-request middlewareOptions {retry:{maxRetries:0}}
RequestOptions class: function; fetch calls: 3 (expected 1 if honoured)

### G2 workaround retryableStatusCodes:[429]
fetch calls: 1; error: DataverseODataError 503

### G2 default policy
maxRetries 6, base 3000ms, max 30000ms => worst-case sleep ~ 105000 ms per request

### G3 RetrieveEntityRibbonFunction URL
https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveEntityRibbon(EntityName=@p1,RibbonLocationFilter=@p2)?@p1='contact'&@p2='All'

### G3b quote escaping for name with apostrophe
https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveEntityRibbon(EntityName=@p1,RibbonLocationFilter=@p2)?@p1='o'brien'&@p2='All'

### G5 error shape
{
  "name": "DataverseODataError",
  "message": "Cannot start another [Import] because there is a previous [Import] running at this moment.",
  "code": "0x80071151",
  "status": 400,
  "toString": "DataverseODataError: Cannot start another [Import] because there is a previous [Import] running at this moment."
}

### G5b non-JSON error
{
  "name": "DataverseODataError",
  "message": "HTTP 502",
  "status": 502
}

### A3 401 with claims challenge
{
  "name": "DataverseODataError",
  "message": "",
  "status": 401,
  "hasClaims": false
}

### H1 headers on a plain GET
[
  "accept",
  "authorization",
  "odata-maxversion",
  "odata-version",
  "x-ms-correlation-id",
  "x-ms-feature-usage",
  "x-ms-sdk-version"
]

### G8 correlation ids across 3 requests
[
  "fabeda3d-c018-47f2-a1a1-1c96ddbc7a75",
  "fabeda3d-c018-47f2-a1a1-1c96ddbc7a75",
  "fabeda3d-c018-47f2-a1a1-1c96ddbc7a75"
]

### H2 sdk version header
dataverse-sdk-js/0.1.0

### L1 default logger (no logger configured) console.debug lines
[
  "➡️ GET https://contoso.crm.dynamics.com/api/data/v9.2/contacts?$filter=emailaddress1 eq 'jane@contoso.com' [object Object]",
  "⬅️ 200 GET https://contoso.crm.dynamics.com/api/data/v9.2/contacts?$filter=emailaddress1 eq 'jane@contoso.com' (0ms) [object Object]"
]

### A1 token acquisitions for 1 request retried twice
getToken calls: 1; authorization per attempt: Bearer tok1, Bearer tok1, Bearer tok1

### A2 401 then 200
failed after 1 call(s): DataverseODataError 401

### G7 getAll({maxPages:2}) over 5 pages
rows: 5, fetch calls: 5

### P1 defaultPrefer + builder prefer => prefer header
odata.include-annotations="*"

### P2 defaultHeaders applied
1

### U1 raw alias path as sent
https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveEntityRibbon(EntityName=@e,RibbonLocationFilter=@f)?@e=%27contact%27&@f=Microsoft.Dynamics.CRM.RibbonLocationFilters%27All%27

### U2 path with ?query + .select() as sent
https://contoso.crm.dynamics.com/api/data/v9.2/accounts?%24select=accountid&%24top=1
RibbonLocationFilters runtime export: undefined
G3c enum numeric 7: https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveEntityRibbon(EntityName=@p1,RibbonLocationFilter=@p2)?@p1='contact'&@p2=7
RetrieveCurrentOrganization(0): https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveCurrentOrganization(AccessType=@p1)?@p1=0
RetrieveEntity: https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveEntity(EntityFilters=@p1,LogicalName=@p2,MetadataId=@p3,RetrieveAsIfPublished=@p4)?@p1=1&@p2='00000000-0000-0000-0000-000000000000'&@p3='contact'&@p4=false
G9 ImportSolutionAction with 4 args body: {"OverwriteUnmanagedCustomizations":false,"PublishWorkflows":false,"CustomizationFile":"UEsD","ImportJobId":"11111111-1111-1111-1111-111111111111"}
PublishXml: https://contoso.crm.dynamics.com/api/data/v9.2/PublishXml {"ParameterXml":"<importexportxml/>"}
AddSolutionComponentAction ctor: componentId, componentType, solutionUniqueName, addRequiredComponents, doNotIncludeSubcomponents, includedComponentSettingsValues
RetrieveApplicationRibbon: https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveApplicationRibbon
P1b defaultPrefer alone -> prefer: (none)
H3 execute() headers: {"odata-maxversion":"4.0","odata-version":"4.0","Accept":"application/json","x-ms-sdk-version":"dataverse-sdk-js/0.1.0","x-ms-correlation-id":"13313ecf-0e8a-4bbc-a3eb-5c07755efe45","x-ms-feature-usage":"0x0010"}
T1: a successful (200) request rejected with: ApplicationInsightsTelemetryClient.trackDependency not implemented
E2: requestId from x-ms-service-request-id: (undefined)
```

> Correlation ids are random per run; the point is that all three are identical.

---

## Appendix B — Suggested pipeline refactor (covers 4, 5, 8, 12, 16)

One coherent change instead of five patches:

```ts
// client/DataverseClient.ts
async send(request: RequestInformation, options?: SendOptions): Promise<Response> {
  const ctx: MiddlewareContext = {
    logger: this.options.logger ?? NoopLogger,                 // issue 10
    telemetry: this.options.telemetry,
    correlationId: options?.correlationId ?? generateUUID(),   // issue 5
    middlewareOptions: options?.middlewareOptions,             // issue 4
    idempotent: options?.idempotent ?? isIdempotent(request),  // issue 4: GET/HEAD/OPTIONS, or caller-declared
    attempt: 0,
  };
  return this.pipeline.execute(request, ctx, (r, c) => this.adapter.send(r, c));
}

// pipeline/DefaultMiddleware.ts — new order
//   ODataHeaders → Concurrency → Retry → Auth → Telemetry → Logging → adapter
// Retry re-runs Auth per attempt (fresh token), handles 401 refresh/claims (issue 8),
// releases the concurrency slot while sleeping (issue 16), and enforces maxElapsedMs (issue 4).
// Telemetry never throws (issues 1, 12) and redacts URLs (issue 12).
// Diagnostic headers are added only when options.diagnosticHeaders allows (issue 3).
```

`DataverseRequestBuilder.send()` and `DataverseClient.execute()` must forward `RequestOptions` (`timeoutMs`, `signal`, `middlewareOptions`, `correlationId`, `idempotent`) to `client.send()`.

Regression tests: every "Observed" block in this document becomes a Vitest case asserting the **expected** behaviour.

---

## Appendix C — Context for the fixing session

- The consumer that motivated this (Command Bar Studio web) will work around issues 2, 4, 6, 7 and 9 locally at first: `skipUrlValidation()`, a write client with `retryableStatusCodes: [429]`, hand-built function URLs, an app-local MSAL token provider, and error normalisation. Fixing them upstream lets those workarounds go. Issues **1 and 3** have no clean consumer-side workaround: telemetry has to bypass the SDK adapter, and the diagnostic headers can only be stripped with a custom `fetchProvider` wrapper, so prioritise them.
- Keep everything ESM-only, `sideEffects: false`, and free of Node built-ins in `core` (verified today: `core` only touches `Buffer` behind `typeof Buffer !== "undefined"`).
- Use changesets. Issues 4 (POST retry default), 6 (enum representation), 7 (peer dependency, interaction mode), 10 (silent default logger) and 15 (constructor shape) change behaviour or API. Group them into one minor (if pre-1.x semantics are accepted) or a **2.0.0** with a migration note.
