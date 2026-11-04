# Issues for `mohsinonxrm/dataverse-sdk-typescript`

**Source:** a code review of `main` at `f45e6fd` (2026-02-10). Every package is `1.0.0`, as published to npm on 2026-02-11.
**Reviewed for:** using the SDK in a browser SPA hosted as an Azure Static Web App. The first consumer is Dataverse Request Studio (DRS); see `docs/azure-static-web-app-plan.md` in the DRS repo.
**Date:** 2026-11-04

**How to read this file**
- Every finding was checked against the source, and each one cites the file and line.
- A finding that depends on live Dataverse behaviour is marked **⚠ Verify**: confirm it against a real org before fixing. None of these were run against a live environment.

---

## Part 0: Instructions for the session that creates these issues

1. **Create these labels first**, if they don't already exist:

   | Label | Colour | Meaning |
   |---|---|---|
   | `bug` | `d73a4a` | Something is broken |
   | `enhancement` | `a2eeef` | New capability |
   | `security` | `b60205` | Security-relevant |
   | `breaking-change` | `5319e7` | Needs a major version bump, or an opt-in |
   | `browser` | `fbca04` | Affects browser/SPA use |
   | `docs` | `0075ca` | Documentation |
   | `ci` | `cfd3d7` | CI/build/test infrastructure |
   | `needs-verification` | `e4e669` | Confirm against a live org before fixing |
   | `pkg:core` `pkg:auth-msal-browser` `pkg:discovery` `pkg:batch` `pkg:files` `pkg:metadata` `pkg:actions` `pkg:functions` `pkg:generator` `pkg:samples` `pkg:repo` | `c5def5` | Package scope |
   | `P0` `P1` `P2` `P3` | `b60205` / `d93f0b` / `fbca04` / `c2e0c6` | Priority |

2. **Create these milestones:**
   - `v1.1.0`: browser and SPA readiness; blocks DRS.
   - `v1.2.0`: correctness and hardening.
   - `Backlog`.
3. **Create the tracking issue (SDK-00) first.** Then create SDK-01 to SDK-52 in order.
4. Each issue below starts with a `## SDK-NN · <title>` heading:
   - use the text after `·` as the **issue title**;
   - use the `Labels` and `Milestone` lines as metadata;
   - use everything from **Summary** up to the next `---` as the **issue body**.
5. Wherever a body says `SDK-NN`, replace it with the real issue number (`#123`) once it exists. Update the tracking issue's checklist the same way.
6. Do **not** fix anything in that session. This file only creates issues.
7. End every issue body with the repository's attribution footer, if that session requires one.

**Priority meaning**

| Priority | Meaning |
|---|---|
| **P0** | Blocks browser or SPA use, or a security problem |
| **P1** | Wrong behaviour, likely to hit real users |
| **P2** | Correctness or ergonomics gap with a workaround |
| **P3** | Polish |

---

## Summary table

| # | Title (short) | Pkg | Pri | Milestone | Needed by DRS |
|---|---|---|---|---|---|
| 00 | Tracking: browser/SPA readiness | repo | — | v1.1.0 | — |
| 01 | Request bodies are always JSON-stringified | core | P0 | v1.1.0 | ✅ |
| 02 | Bearer token sent to any absolute URL | core | P0 | v1.1.0 | ✅ |
| 03 | Case-sensitive header handling sends duplicate headers | core | P0 | v1.1.0 | ✅ |
| 04 | URL validator rejects long query strings as a "segment" | core | P1 | v1.1.0 | ✅ |
| 05 | Per-request middleware options never reach middleware | core | P1 | v1.1.0 | ✅ |
| 06 | One `MiddlewareContext` shared by all requests | core | P1 | v1.1.0 | ✅ |
| 07 | Telemetry headers can't be turned off | core | P1 | v1.1.0 | ✅ |
| 08 | Retry: uncapped `Retry-After`, jitter off, conflicting option types | core | P1 | v1.1.0 | ✅ |
| 09 | Retry replays non-idempotent requests on 5xx | core | P1 | v1.1.0 | ✅ |
| 10 | No retry/throttle hook for consumers | core | P2 | v1.1.0 | ✅ |
| 11 | Pipeline can't be customised; declared options ignored | core | P1 | v1.1.0 | ✅ |
| 12 | `send()` only takes absolute URLs | core | P2 | v1.1.0 | ✅ |
| 13 | Fluent builder assumes JSON; no access to status or headers | core | P1 | v1.1.0 | ✅ |
| 14 | Two different `DataverseError` classes; errors lose headers | core | P1 | v1.1.0 | ✅ |
| 15 | Default logger logs every request to the console | core | P2 | v1.1.0 | ✅ |
| 16 | `serializeContent` sends the whole buffer for typed-array views | core | P2 | v1.1.0 | ✅ |
| 17 | Retried responses are never consumed or cancelled | core | P2 | v1.2.0 | — |
| 18 | Concurrency slot held while sleeping between retries | core | P2 | v1.2.0 | — |
| 19 | Timeout is per attempt; abort listeners leak | core | P2 | v1.2.0 | — |
| 20 | `bindMany` uses `new Function` (breaks under CSP) | core | P2 | v1.1.0 | ✅ |
| 21 | No 401 handling (token refresh / claims challenge) | core | P2 | v1.2.0 | ✅ |
| 22 | `getAll({ maxPages })` never stops; `iterate()` fires eagerly | core | P2 | v1.2.0 | — |
| 23 | `impersonate()` only supports `MSCRMCallerID` | core | P3 | v1.2.0 | — |
| 24 | Query encoding via `URLSearchParams` (`+` for space) | core | P3 | Backlog | — |
| 25 | `@azure/msal-browser ^3` hard dependency | auth-msal-browser | P0 | v1.1.0 | ✅ |
| 26 | Interactive fallback gaps (no account, no `loginHint`, concurrent popups) | auth-msal-browser | P1 | v1.1.0 | ✅ |
| 27 | Stale account, `tenantId` ignored, MSAL error details lost | auth-msal-browser | P2 | v1.1.0 | ✅ |
| 28 | Missing SPA helpers (init/redirect, scopes, sovereign authority) | auth-msal-browser | P2 | v1.1.0 | ✅ |
| 29 | `OrganizationDetail` doesn't match the real GDS response | discovery | P1 | v1.1.0 | ✅ |
| 30 | Commercial endpoint and scope hard-coded | discovery | P1 | v1.1.0 | ✅ |
| 31 | Discovery bypasses the pipeline (global fetch, no abort, plain `Error`) | discovery | P2 | v1.1.0 | ✅ |
| 32 | `BatchRequestBuilder.execute()` broken against the real core | batch | P1 | v1.2.0 | — |
| 33 | Batch encoder: missing terminators, no part Content-Type, colliding Content-IDs | batch | P1 | v1.2.0 | — |
| 34 | Batch decoder drops independent responses; case-sensitive parsing | batch | P1 | v1.2.0 | — |
| 35 | Batch: throws despite `continueOnError`; no auto-split; internals not exported | batch | P2 | v1.2.0 | — |
| 36 | Files: unguarded `Buffer` crashes browsers | files | P1 | v1.2.0 | — |
| 37 | Files: documented constructor argument doesn't exist; default `baseUrl` invalid | files | P1 | v1.2.0 | — |
| 38 | Files: upload `Target` uses an entity set name as the logical name | files | P1 | v1.2.0 | — |
| 39 | Files: upload/commit/delete responses never checked | files | P1 | v1.2.0 | — |
| 40 | Files: missing PATCH-chunk route, ranged download, abort, streaming | files | P2 | Backlog | — |
| 41 | Metadata: `RetrieveMetadataChanges` sent as POST | metadata | P1 | v1.2.0 | — |
| 42 | Metadata: create methods expect a body that may not come back | metadata | P1 | v1.2.0 | — |
| 43 | OData string literals not escaped (`'` in keys/params) | metadata, discovery, functions, xrm | P2 | v1.2.0 | ✅ |
| 44 | Metadata: no type-cast queries, CSDL fetch, or solution header | metadata | P2 | Backlog | — |
| 45 | Generator emits `"Content-Type"` in 1,356 actions | actions, generator | P1 | v1.1.0 | — |
| 46 | `test:integration` doesn't exist; no live tests | repo | P1 | v1.1.0 | ✅ |
| 47 | No browser-environment tests or bundle smoke test | repo | P1 | v1.1.0 | ✅ |
| 48 | CI: Node 18 EOL, no typecheck, unpinned actions, no `engines` | repo | P2 | v1.1.0 | — |
| 49 | Docs describe APIs that don't exist; no CORS guidance | docs | P2 | v1.1.0 | ✅ |
| 50 | SPA sample has corrupted literals and placeholder auth | samples | P2 | v1.2.0 | — |
| 51 | Hard-coded `SDK_VERSION = "0.1.0"` | core | P3 | v1.1.0 | — |
| 52 | Batch tests mock away the code under test | batch, repo | P2 | v1.2.0 | — |

---

## SDK-00 · Tracking: browser and SPA readiness for v1.1.0

**Labels:** `enhancement`, `browser`, `pkg:repo` · **Milestone:** v1.1.0

**Summary**
This issue tracks the fixes needed for the SDK to back a browser SPA that composes and sends arbitrary Dataverse Web API requests. The first consumer is Dataverse Request Studio, hosted on Azure Static Web Apps. That app needs to:
- send exact bytes (JSON text, multipart `$batch`, binary);
- read the real status, headers and body;
- control retries per request;
- never leak tokens;
- run under a strict CSP.

**Checklist (v1.1.0 blockers)**
- [ ] SDK-01 Raw request bodies
- [ ] SDK-02 Bearer token only to the client's own origin
- [ ] SDK-03 Case-insensitive headers
- [ ] SDK-04 URL validation of query strings
- [ ] SDK-05 Per-request middleware options
- [ ] SDK-06 Per-request middleware context
- [ ] SDK-07 Opt-out telemetry headers
- [ ] SDK-08 Retry fixes
- [ ] SDK-09 Idempotency-aware retry
- [ ] SDK-10 `onRetry` hook
- [ ] SDK-11 Pipeline customisation
- [ ] SDK-12 Relative URLs in `send()`
- [ ] SDK-13 Raw response access from the builder
- [ ] SDK-14 Single error hierarchy
- [ ] SDK-15 Quiet default logger
- [ ] SDK-16 Typed-array serialisation
- [ ] SDK-20 No `new Function`
- [ ] SDK-25 MSAL as peer dependency
- [ ] SDK-26 Interactive fallback fixes
- [ ] SDK-27 Account, tenant and error details
- [ ] SDK-28 SPA helpers
- [ ] SDK-29 Discovery response shape
- [ ] SDK-30 Discovery clouds
- [ ] SDK-31 Discovery through the pipeline
- [ ] SDK-45 Generated `Content-Type` casing
- [ ] SDK-46 Integration tests
- [ ] SDK-47 Browser tests
- [ ] SDK-48 CI hygiene
- [ ] SDK-49 Docs
- [ ] SDK-51 SDK version

**Definition of done**
- `@mohsinonxrm/dataverse-sdk-core`, `-auth-msal-browser` and `-discovery` `1.1.0` are published.
- A browser test sends each of these through `DataverseClient.send()` and gets back an unmodified `Response`:
  - a JSON object;
  - a raw JSON string;
  - a multipart `$batch` string;
  - a `Uint8Array`.
- An opt-in live integration run passes against a dev org.

---

## SDK-01 · core: request bodies are always JSON-stringified, so raw strings, binary and multipart bodies are corrupted

**Labels:** `bug`, `browser`, `pkg:core`, `P0` · **Milestone:** v1.1.0

**Summary**
`FetchRequestAdapter` passes every body through `JSON.stringify`, whatever its type. Because of this, the SDK can't send:
- raw JSON text (a string becomes a quoted, escaped JSON string);
- a multipart `$batch` body;
- a FetchXML or XML body;
- binary content (`ArrayBuffer`, `Uint8Array`, `Blob`), which becomes `{}` or an index map.

**Evidence**
`packages/dataverse-sdk-core/src/pipeline/FetchRequestAdapter.ts:21-26`:
```ts
const init: RequestInit = {
  method: request.method,
  headers: request.headers,
  body: request.body === undefined ? undefined : JSON.stringify(request.body),
  signal,
};
```
- A correct serialiser already exists but is never called: `serializeContent()` in `packages/dataverse-sdk-core/src/utils/HeaderUtils.ts:180-232`.
- A custom `fetchProvider` can't work around this, because it receives the already-stringified body.

**Impact**
- Breaks `$batch`. See SDK-32: the batch package passes a multipart string, which becomes `"--batch_…\r\n…"` with JSON escaping.
- Breaks file and image uploads through PATCH, and any caller that serialises JSON itself (for example, to keep key order, or to send a body exactly as shown to a user).

**Proposed fix**
- Choose serialisation by type:
  - `undefined` → no body;
  - `string`, `Blob`, `ArrayBuffer`, `ArrayBufferView`, `FormData`, `URLSearchParams`, `ReadableStream` → pass through. For a view, slice to its `byteOffset`/`byteLength`; see SDK-16;
  - plain object or array → `JSON.stringify`.
- Only set the default `content-type: application/json; charset=utf-8` when the SDK serialised the body itself (see SDK-03).
- Note that `ReadableStream` bodies can't be replayed. The retry middleware must not retry them, or must buffer them; document which. A fetch with a stream body also needs `duplex: 'half'`.

**Acceptance criteria**
- [ ] A string body reaches `fetch` byte-for-byte.
- [ ] `Uint8Array`, `ArrayBuffer` and `Blob` bodies reach `fetch` unchanged.
- [ ] An object body is JSON with `content-type: application/json; charset=utf-8`.
- [ ] A caller-supplied `Content-Type` is never replaced.
- [ ] Unit tests for each type, using a fake `fetchProvider` that records `init.body`.

**Breaking?** No. String bodies that used to be double-encoded were always broken.

---

## SDK-02 · core: the bearer token is attached to any absolute URL (token leakage)

**Labels:** `bug`, `security`, `browser`, `pkg:core`, `P0` · **Milestone:** v1.1.0

**Summary**
`AuthMiddleware` adds `authorization: Bearer <token>` to every request, whatever its host. Absolute URLs are accepted in three places:
- `client.api("https://…")`;
- `client.send({ url })`;
- the `PageIterator`, which follows `@odata.nextLink`.

A URL from user input, a pasted link, a crafted `@odata.nextLink`, or a bug in the consumer therefore sends a Dataverse access token to an arbitrary host.

**Evidence**
- `packages/dataverse-sdk-core/src/middleware/AuthMiddleware.ts:15-26`: no URL check before `request.headers = { ...request.headers, authorization: \`Bearer ${token}\` }`.
- `packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:416-422`: `resolveUrl()` returns any `https?://` URL unchanged.
- `packages/dataverse-sdk-core/src/paging/PageIterator.ts:19`: `this.client.api(this.nextLink).getPage()` follows whatever link the response contained.

**Impact**
Delegated Dataverse tokens grant the user's full data access. In a browser tool where users paste URLs, this is a direct exfiltration path.

**Proposed fix**
- By default, attach the token only when `new URL(url).origin === new URL(baseUrl).origin`.
- Add `allowedTokenOrigins?: string[]` for deliberate multi-origin use.
- Requests to any other origin go out **without** the token. Alternatively, throw a typed `DataverseInvalidRequestError("Refusing to send token to <origin>")`; the refusal should be configurable (`onForeignOrigin: 'strip' | 'throw'`, default `'throw'`).
- `PageIterator` checks that `@odata.nextLink` has the same origin before following it.
- Reject `http:` (non-TLS) unless explicitly allowed. Reject URLs with userinfo (`https://a@b`).

**Acceptance criteria**
- [ ] A request to another host, a subdomain look-alike (`contoso.crm.dynamics.com.evil.com`), an `http:` URL, or a URL with userinfo is never sent with `authorization`.
- [ ] A same-origin nextLink still works.
- [ ] Tests cover IDN/punycode and case differences in the host.

**Breaking?** Only for callers who relied on sending the token to other origins. They can use `allowedTokenOrigins`.

---

## SDK-03 · core: headers are handled case-sensitively, so fetch receives duplicate (combined) headers

**Labels:** `bug`, `browser`, `pkg:core`, `P0`, `needs-verification` · **Milestone:** v1.1.0

**Summary**
Headers are plain objects merged by key, and different parts of the SDK use different casing:
- `ODataHeadersMiddleware` lower-cases `defaultHeaders` but not the request's own headers;
- it checks only `headers["content-type"]` before adding a default;
- `AuthMiddleware` writes `authorization`;
- the builder's `header()` lower-cases names, while `applyOptions()` keeps the caller's casing;
- generated actions use `"Content-Type"` (SDK-45).

When both `Content-Type` and `content-type` reach `fetch`, the `Headers` constructor *appends* them. The server receives `Content-Type: application/json, application/json; charset=utf-8`. The same happens for `Accept`, `Authorization` (a caller-set `Authorization` plus the SDK's), and any `defaultHeaders` key.

**Evidence**
- `packages/dataverse-sdk-core/src/middleware/ODataHeadersMiddleware.ts:15-30`:
  ```ts
  const headers = { "odata-maxversion": "4.0", "odata-version": "4.0",
                    ...lowercaseKeys(this.options.defaultHeaders), ...request.headers };
  if (!headers.accept && !headers.Accept) headers.accept = "application/json";
  if (request.body !== undefined && !headers["content-type"]) headers["content-type"] = "application/json; charset=utf-8";
  ```
  - `defaultHeaders: { Accept: … }` plus `request.headers: { Accept: … }` gives two keys.
  - A request `Content-Type` isn't detected, so a lower-case duplicate is added.
- `packages/dataverse-sdk-core/src/middleware/AuthMiddleware.ts:25` adds lower-case `authorization` next to any caller `Authorization`.
- `packages/dataverse-sdk-core/src/client/DataverseClient.ts:77-89` (`applyOptions`) merges `opt.headers` as given, and then checks `req.headers.prefer || req.headers.Prefer`.
- `packages/dataverse-sdk-actions/src/*Action.ts` (1,356 files) set `"Content-Type": "application/json"`.

**⚠ Verify**
Capture what `fetch` sends (msw, or a local echo server), and check how Dataverse responds to a combined `Content-Type`. It may return 415, or ignore the duplicate.

**Proposed fix**
- Normalise headers once at pipeline entry into a `Headers` instance, or a lower-cased record.
- Middleware should use `has` / `set` semantics; never write both casings.
- A caller's value always wins over SDK defaults, except `authorization`. That is owned by the auth middleware and must not be overridable unless the caller opts out of auth.

**Acceptance criteria**
- [ ] For every combination of caller casing and default, `fetch` receives exactly one `content-type`, `accept`, `authorization` and `prefer` header.
- [ ] Generated actions send one `content-type`.
- [ ] Tests use `new Headers(init.headers)` to assert single values.

---

## SDK-04 · core: `validateUrl` treats the query string as a path segment, so filters longer than 260 characters are rejected

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
The builder validates the **full URL including the query string** (`DataverseRequestBuilder.ts:288-290`). `validateUrl` splits that URL on `/` and enforces a 260-character limit on each piece. Everything after the last `/` counts as one "segment": the entity set plus `?$select=…&$filter=…&$expand=…`. Any realistic query with more than about 260 characters of query options therefore throws `DataverseUrlError`, unless the caller remembers `.skipUrlValidation()`.

**Evidence**
- `packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:287-290`:
  ```ts
  const fullUrl = hasQuery ? buildUrl({ url, query, method: "GET", headers: {} }) : url;
  validateUrl(fullUrl, this.urlValidationOptions);
  ```
- `packages/dataverse-sdk-core/src/utils/validateUrl.ts:57-68`:
  ```ts
  const segments = url.split("/").filter((s) => s.length > 0);
  const maxSegmentLength = Math.max(...segments.map((s) => s.length));
  if (maxSegmentLength > URL_LIMITS.MAX_SEGMENT_LENGTH) { … throw new DataverseUrlError(…) }
  ```
- `/` inside a filter value (for example a URL, or a `$filter` path like `primarycontactid/fullname`) splits differently, so the result is also inconsistent.

**Proposed fix**
- Apply the segment check to `new URL(url).pathname` segments only. The 260 limit is IIS's `UrlSegmentMaxLength` for path segments.
- Check the total length (32,768) against the full URL. Count the encoded length, since that's what travels.
- Note `GET` + `$batch` as the escape hatch in the error message (already partly there).

**Acceptance criteria**
- [ ] A 2,000-character `$filter` passes validation.
- [ ] A 300-character path segment (for example an alternate-key literal) still fails.
- [ ] A 40,000-character URL fails on total length.

---

## SDK-05 · core: per-request middleware options are declared but never reach the middleware

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
`RequestOptions.middlewareOptions` and `MiddlewareContext.middlewareOptions` exist, and `RetryMiddleware` reads `ctx.middlewareOptions?.get("retry")`. But nothing ever copies a request's options into the context:
- `DataverseClient.send()` passes the client-wide `this.ctx`;
- `applyOptions()` ignores `middlewareOptions`;
- the builder's `send()` ignores it too.

Per-request retry, concurrency, telemetry and logging overrides are all dead code.

**Evidence**
- `packages/dataverse-sdk-core/src/abstractions/options.ts:41-52`: `RequestOptions.middlewareOptions?: …RequestOptions`.
- `packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:27`: `const perRequestOptions = ctx.middlewareOptions?.get("retry")`.
- `packages/dataverse-sdk-core/src/client/DataverseClient.ts:72-74`: `send(request)` takes no options and uses `this.ctx`.
- `packages/dataverse-sdk-core/src/client/DataverseClient.ts:77-89`: `applyOptions` copies only headers, timeout, signal and prefer.
- `packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:312-331`: the builder copies only `timeoutMs` and `signal`.
- `grep -rn "middlewareOptions" packages/dataverse-sdk-core/src` shows no writer.
- `ConcurrencyOptions.bypass`, `TelemetryOptions.disable` and `LoggingOptions.disable` (`middleware/RequestOptions.ts`) are never read by any middleware.

**Impact**
There's no way to say "don't retry this request" (for example, a UI that wants to show a 429) or "retry this one harder" (background metadata loads). The only workaround is a second client instance.

**Proposed fix**
- `send(request, options?: RequestOptions)` builds a per-request context (see SDK-06) that includes `middlewareOptions`.
- The builder gains `.options(new RequestOptions([...]))`, as documented in `RequestOptions.ts:2`, and forwards them.
- Implement `bypass` in `ConcurrencyMiddleware` and `disable` in `TelemetryMiddleware` / `LoggingMiddleware`, or remove those options.

**Acceptance criteria**
- [ ] `client.send(req, { middlewareOptions: new RequestOptions([{ type: 'retry', maxRetries: 0 }]) })` returns the first 429 without retrying.
- [ ] The same works through the builder and `execute()`.
- [ ] Every declared per-request option is read by its middleware, or removed.

---

## SDK-06 · core: one `MiddlewareContext` is shared by every request from a client

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
`DataverseClient` creates `this.ctx` once, in its constructor, and passes the same object to every request. Middleware mutates it:
- `TelemetryMiddleware` sets `ctx.correlationId ??= uuid`, so **every request from a client carries the same `x-ms-correlation-id`, forever**;
- `RetryMiddleware` sets `ctx.attempt = attempt`, so concurrent requests overwrite each other's attempt numbers in logs and telemetry.

**Evidence**
- `packages/dataverse-sdk-core/src/client/DataverseClient.ts:34-37, 72-74`.
- `packages/dataverse-sdk-core/src/middleware/TelemetryMiddleware.ts:29-30`.
- `packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:38`.
- `getGlobalFeatureTracker()` (`TelemetryMiddleware.ts:33`) is process-global, so feature flags leak between unrelated clients.

**Proposed fix**
- Create a fresh context per `send()`: `{ ...this.baseCtx, correlationId: options.correlationId ?? uuid(), attempt: 0, middlewareOptions }`.
- Allow the caller to pass a correlation ID.
- Make the feature tracker per client.

**Acceptance criteria**
- [ ] Two sequential requests get different correlation IDs, unless the caller passes one.
- [ ] Concurrent requests log their own attempt numbers.

---

## SDK-07 · core: SDK telemetry headers can't be turned off, and they trigger CORS preflights

**Labels:** `enhancement`, `browser`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
`TelemetryMiddleware` always adds three headers, and `RetryMiddleware` adds one on retries:
- `x-ms-sdk-version: dataverse-sdk-js/0.1.0`;
- `x-ms-correlation-id`;
- `x-ms-feature-usage`;
- `Retry-Attempt` (on retries).

There's no option to suppress them. In browsers, custom request headers force a CORS preflight. Whether Dataverse's preflight response allows them is unverified, so they risk breaking requests outright. They also pollute "the exact request that was sent", which request-inspection tools need to show.

**Evidence**
- `packages/dataverse-sdk-core/src/middleware/TelemetryMiddleware.ts:26-38`: unconditional `request.headers[...] = ...`.
- `packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:40-43`: `request.headers["Retry-Attempt"]`, which also mutates the caller's request object.

**⚠ Verify**
Send a browser `fetch` with these headers to `https://<org>.crm.dynamics.com/api/data/v9.2/WhoAmI` and record the preflight response's `Access-Control-Allow-Headers`.

**Proposed fix**
- Add `DataverseClientOptions.telemetryHeaders?: boolean | { sdkVersion?: boolean; correlationId?: boolean; featureUsage?: boolean; retryAttempt?: boolean }`.
- Default `true` in Node and `false` in browsers, or `true` everywhere with clear docs.
- Don't mutate the caller's `RequestInformation`. Clone it per attempt.

**Acceptance criteria**
- [ ] With `telemetryHeaders: false`, `fetch` receives none of the four headers.
- [ ] The caller's request object is unchanged after `send()`.

---

## SDK-08 · core: retry waits for an uncapped `Retry-After`, never applies jitter, and has two conflicting option types

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
1. **`Retry-After` is not capped.** `delay = retryAfterMs ?? backoff(...)`, and `maxDelayMs` only caps the computed backoff. Dataverse can return `Retry-After` of several minutes, and a request will then sleep that long, six times over, with no visibility.
2. **Jitter is effectively off.** It applies only `if (opt.useExponentialBackoff && opt.jitter)`. `useExponentialBackoff` isn't in `DEFAULTS` and only exists on the per-request type, which never arrives (SDK-05). Meanwhile backoff is *always* exponential (`base * 2 ** attempt`).
3. **There are two `RetryOptions` types with different fields and documented defaults:**
   - `abstractions/options.ts:14-19`: `{ maxRetries, baseDelayMs, maxDelayMs, jitter }`;
   - `middleware/RequestOptions.ts:17-46`: `{ maxRetries (@default 3), delay (@default 1000), useExponentialBackoff, retryableStatusCodes (@default [429, 503, 504]), shouldRetry }`.

   The real defaults are `maxRetries: 6, baseDelayMs: 3000, maxDelayMs: 30000`, and codes `[429, 502, 503, 504]` (`RetryMiddleware.ts:9-14, 88-92`). The per-request `delay` is never read.
4. There are **two `Retry-After` parsers**:
   - `utils/HeaderUtils.ts` `parseRetryAfter` (`parseInt`);
   - `errors/parseODataError.ts:59-72` `parseRetryAfterMs` (`Number`).

   They behave differently for values like `"1.5"`.

**Evidence**
`packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:9-14, 27-31, 67-72, 94-97`.

**Proposed fix**
- Use one `RetryOptions` type: `{ maxRetries, baseDelayMs, maxDelayMs, maxRetryAfterMs, jitter, retryableStatusCodes, retryableMethods (SDK-09), shouldRetry }`. Document the real defaults.
- When `retryAfterMs > maxRetryAfterMs` (default 30–60 s), **return the response**; don't sleep.
- Apply jitter whenever `jitter` is true (default true).
- Use one `parseRetryAfter`, supporting delta-seconds (including decimals) and HTTP-date.

**Acceptance criteria**
- [ ] A 429 with `Retry-After: 300` and the default config returns immediately.
- [ ] Jitter can be seen in tests with a seeded RNG.
- [ ] One exported `RetryOptions` type.
- [ ] The docs match the code.

---

## SDK-09 · core: retry replays non-idempotent requests (POST/PATCH) after 502/503/504

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
`RetryMiddleware` retries any method on `[429, 502, 503, 504]`.
- **429 is safe:** Dataverse rejected the request without doing anything.
- **5xx is not:** a 502 or 504 often means a gateway timed out *after* the server received and possibly processed the request. Replaying a `POST` (create, action) or a `PATCH` without `If-Match` can create duplicates or apply side effects twice. This includes `$batch` (POST) and custom actions.

**Evidence**
`packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:56-62, 88-92`: no method check.

**Proposed fix**
- Add `retryableMethods` with this default:
  - 429 → all methods;
  - 502/503/504 → `GET`, `PUT`, `DELETE`, and `PATCH` only when `If-Match` is present.
- Let callers override it per request (SDK-05).
- Document the duplicate-write risk.

**Acceptance criteria**
- [ ] A POST that gets a 504 is not retried by default.
- [ ] A GET that gets a 504 is retried.
- [ ] A POST that gets a 429 is retried.

---

## SDK-10 · core: no hook for consumers to observe retries and throttling

**Labels:** `enhancement`, `pkg:core`, `P2` · **Milestone:** v1.1.0

**Summary**
Retries happen silently. The only signal is `TelemetryClient.trackDependency`, which fires per attempt because Telemetry sits inside Retry in the pipeline. UIs can't show "Throttled by Dataverse, retrying in 12 s (2/6)", and callers can't count attempts.

**Evidence**
- `packages/dataverse-sdk-core/src/pipeline/DefaultMiddleware.ts:10-19` (order: Auth → OData → Concurrency → Retry → Telemetry → Logging).
- `RetryMiddleware.ts:74-82`: retries only `logger.debug`.

**Proposed fix**
- Add `RetryOptions.onRetry?: (info: { attempt: number; status: number; delayMs: number; retryAfterMs?: number; request: RequestInformation }) => void`, at both client and request level.
- Optionally expose an attempt summary on the returned `Response`, using a `WeakMap<Response, AttemptInfo[]>` or a `getAttempts(res)` helper.

**Acceptance criteria**
- [ ] `onRetry` fires once per retry with the right delay.
- [ ] The attempt history can be read after `send()`.

---

## SDK-11 · core: the pipeline can't be customised, and several client options are ignored

**Labels:** `enhancement`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
The middleware list is fixed (`buildDefaultMiddleware`). `Pipeline`, `FetchRequestAdapter`, `buildDefaultMiddleware` and the built-in middleware classes aren't exported. So consumers can't:
- add a middleware (for example, to capture the final request headers, or to time requests);
- remove one (for example, telemetry or logging);
- reorder them.

Several `DataverseClientOptions` fields are declared, and so look supported, but nothing reads them:
- `circuitBreaker`;
- `bulkhead`;
- `defaultPrefer`.

**Evidence**
- `packages/dataverse-sdk-core/src/pipeline/DefaultMiddleware.ts:10-19`.
- `packages/dataverse-sdk-core/src/index.ts` (no pipeline exports).
- `packages/dataverse-sdk-core/src/abstractions/options.ts:30-40, 55-69`.
- `grep -rn "circuitBreaker\|bulkhead\|defaultPrefer" packages/dataverse-sdk-core/src` returns only the type declarations.
- `docs/v1-implementation-review.md` §7 lists circuit breaker and bulkhead as not implemented.

**Proposed fix**
- Add `DataverseClientOptions.middleware?: { prepend?: Middleware[]; append?: Middleware[]; replace?: (defaults: Middleware[]) => Middleware[] }`.
- Export the built-in middleware classes and `Pipeline`.
- Implement `defaultPrefer` (merge into `prefer` when the caller hasn't set it). Remove `circuitBreaker` / `bulkhead` from the public type until they're implemented, or mark them `@deprecated not implemented`.

**Acceptance criteria**
- [ ] A test middleware added with `append` sees the final headers, including `authorization`.
- [ ] `replace` can drop Logging.
- [ ] `defaultPrefer` is applied.
- [ ] No declared option is a no-op.

---

## SDK-12 · core: `send()` only takes absolute URLs, and the API version is fixed at `v9.2`

**Labels:** `enhancement`, `pkg:core`, `P2` · **Milestone:** v1.1.0

**Summary**
`DataverseClient.send(request)` calls `new URL(request.url)` (`utils/url.ts:11-19`), so a relative URL throws `TypeError: Invalid URL`. Callers using the low-level API must rebuild the base URL themselves, although the client already knows it. `resolveUrl` is private to the builder. `apiVersion` is typed as the literal `"v9.2"`.

**Evidence**
- `packages/dataverse-sdk-core/src/utils/url.ts:11-12`.
- `packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:416-422`.
- `packages/dataverse-sdk-core/src/abstractions/options.ts:57`.

**Proposed fix**
- `send()` resolves relative URLs against `getBaseUrl()`, with or without a leading `/`, and absolute ones go through the SDK-02 origin check.
- Export `client.resolveUrl(path)`.
- Widen `apiVersion` to `` `v${number}.${number}` ``.

**Acceptance criteria**
- [ ] `send({ method: 'GET', url: 'WhoAmI', headers: {} })` works.
- [ ] `apiVersion: 'v9.1'` builds `/api/data/v9.1`.

---

## SDK-13 · core: the fluent builder assumes JSON responses, and gives no access to status or headers

**Labels:** `bug`, `enhancement`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
- `get()` always calls `res.json()`. It **throws** on:
  - `204 No Content`;
  - an empty body;
  - `$metadata` (XML);
  - `$value` (binary or text);
  - any `text/plain` response.
- `post`/`patch`/`put`/`delete` `JSON.parse` any non-empty text, so they also throw on non-JSON.
- None of them expose the response's status or headers, which callers need to:
  - read `OData-EntityId` after a create without `return=representation` (the default Dataverse behaviour);
  - read `ETag` for concurrency;
  - read `Preference-Applied`;
  - read `x-ms-service-request-id` for support tickets.
- `getPage()` is just `get()`.

**Evidence**
`packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:240-286`.

**Proposed fix**
- Add `.send(method, body?, options?)` (public) returning the raw `Response`, or `.getResponse()` / `.postResponse()` …
- Add `{ data, status, headers, etag, entityId }` variants (for example `.getWithResponse()`).
- Make `get()` honour `Content-Type`:
  - JSON → parsed;
  - empty / 204 → `undefined`;
  - otherwise text, or throw a typed error that tells the caller to use `.text()` / `.blob()`.
- Add `.text()`, `.blob()` and `.arrayBuffer()` terminal methods.
- Add a convenience `createAndGetId()` that parses `OData-EntityId`.

**Acceptance criteria**
- [ ] `client.api('$metadata').header('accept','application/xml').text()` returns XML.
- [ ] A create without `return=representation` returns the new id through `entityId`.
- [ ] `get()` on a 204 doesn't throw.

---

## SDK-14 · core: there are two different `DataverseError` classes, and errors lose the response headers

**Labels:** `bug`, `pkg:core`, `P1` · **Milestone:** v1.1.0

**Summary**
Two unrelated classes are both named `DataverseError`:
- **`errors/DataverseError.ts`** — exported through `errors/index.ts`. Fields: `status`, `code`, `requestId`, `correlationId`, `raw`. Extended by `DataverseODataError`, `DataverseThrottleError` and `DataverseDuplicateError`.
- **`errors/NamedErrors.ts:9`** — not exported under that name. Fields: `statusCode`, `requestId`, `date`, `body`, `headers`. Extended by `DataverseAuthenticationError`, `DataverseInvalidRequestError`, `DataverseServiceError` and `DataverseNetworkError`, which *are* exported.

Consequences:
- `err instanceof DataverseError` (the exported one) is `false` for authentication and invalid-request errors.
- Field names differ (`status` vs `statusCode`).
- The errors that `parseODataError` actually throws carry **no response headers**.
- `requestId` reads `x-ms-request-id` / `req-id`; Dataverse's own request id header is `x-ms-service-request-id` (⚠ Verify).
- `correlationId` is never set.
- Network, CORS and abort failures surface as raw `TypeError` / `DOMException`.
- `DataverseServiceError.fromResponse` is never used internally.

**Evidence**
- `packages/dataverse-sdk-core/src/errors/DataverseError.ts:1-26`.
- `packages/dataverse-sdk-core/src/errors/NamedErrors.ts:9-40`.
- `packages/dataverse-sdk-core/src/errors/parseODataError.ts:4-39`.
- `packages/dataverse-sdk-core/src/index.ts` (exports both families).

**Proposed fix**
- One base class `DataverseError extends Error` with:
  - `status?`;
  - `code?` (Dataverse `0x8…` code);
  - `message`;
  - `headers?: Record<string,string>`;
  - `body?` (parsed JSON or text);
  - `requestId?` (`x-ms-service-request-id` → `req-id` → `x-ms-request-id`);
  - `correlationId?`;
  - `cause?`.
- Every SDK error extends it.
- Wrap fetch failures in `DataverseNetworkError` (with `cause`), and aborts in `DataverseAbortError`.
- Keep `statusCode` as a deprecated getter alias for one minor version.

**Acceptance criteria**
- [ ] `instanceof DataverseError` is true for every SDK error.
- [ ] HTTP errors expose `headers` and `body`.
- [ ] A CORS failure becomes a `DataverseNetworkError`.

---

## SDK-15 · core: the default logger writes every request to the console

**Labels:** `bug`, `browser`, `pkg:core`, `P2` · **Milestone:** v1.1.0

**Summary**
With no `logger` option, `LoggingMiddleware` uses `ConsoleLogger` and calls `console.debug` twice per request with the full URL. In browsers this is noisy, and the URLs contain filters and record ids, so data ends up in console logs and screenshots.

**Evidence**
- `packages/dataverse-sdk-core/src/middleware/LoggingMiddleware.ts:14-23`: `this.options.logger ?? ctx.logger ?? ConsoleLogger`.
- `packages/dataverse-sdk-core/src/utils/consoleLogger.ts`.

**Proposed fix**
Default to a no-op logger. Alternatively, default to `level: 'warn'` and add `logLevel` to the options. Document how to enable debug logging.

**Acceptance criteria**
- [ ] With the default config, a request writes nothing to the console.

---

## SDK-16 · core: `serializeContent` sends the whole underlying buffer for typed-array views

**Labels:** `bug`, `pkg:core`, `P2` · **Milestone:** v1.1.0

**Summary**
`serializeContent` converts a typed array with `Buffer.from(content.buffer)` or `content.buffer`. This ignores `byteOffset` and `byteLength`, so a `subarray` / `slice` view of a larger buffer sends **the entire underlying buffer**. That's wrong data, and it may leak unrelated bytes. It matters once SDK-01 starts using this function. The function also detects types by `constructor.name`, which is fragile across realms and with subclasses.

**Evidence**
`packages/dataverse-sdk-core/src/utils/HeaderUtils.ts:200-222`.

**Proposed fix**
- Use `ArrayBuffer.isView(x)`, then `new Uint8Array(x.buffer, x.byteOffset, x.byteLength)`; fetch accepts views directly.
- Use `instanceof` checks, guarded by `typeof Blob !== 'undefined'` and so on.

**Acceptance criteria**
- [ ] `new Uint8Array(buf, 10, 5)` sends exactly 5 bytes.

---

## SDK-17 · core: retried responses are never consumed or cancelled

**Labels:** `bug`, `pkg:core`, `P2` · **Milestone:** v1.2.0

**Summary**
When `RetryMiddleware` decides to retry, it drops the previous `Response` without reading or cancelling its body. In Node (undici), unconsumed bodies keep the connection busy until garbage collection, which can exhaust the pool under sustained throttling. Browsers are less affected, but it's still wasteful.

**Evidence**
`packages/dataverse-sdk-core/src/middleware/RetryMiddleware.ts:45, 82-84`: `res` is discarded before `await sleep(...)`.

**Proposed fix**
Call `await res.body?.cancel()` inside a try block before sleeping. Alternatively, read the body when it's needed for diagnostics.

**Acceptance criteria**
- [ ] A test with a mocked stream body checks that `cancel` is called on every discarded attempt.

---

## SDK-18 · core: the concurrency slot is held while sleeping between retries

**Labels:** `bug`, `pkg:core`, `P2` · **Milestone:** v1.2.0

**Summary**
`ConcurrencyMiddleware` wraps `RetryMiddleware`, so a request holds its semaphore slot during every retry sleep. With the defaults (8 slots, 6 retries, up to 30 s or more each), a throttling burst can block every slot for minutes. Requests that would succeed (other users or orgs, or non-throttled endpoints) stall behind them.

**Evidence**
`packages/dataverse-sdk-core/src/pipeline/DefaultMiddleware.ts:13-14` (Concurrency before Retry); `ConcurrencyMiddleware.ts:22-37`.

**Proposed fix**
Either:
- put Retry outside Concurrency, so each attempt acquires and releases its own slot; or
- release and re-acquire around the sleep.

Keep `x-ms-dop-hint` adaptation.

**Acceptance criteria**
- [ ] While one request sleeps on a `Retry-After`, others can use the slot.

---

## SDK-19 · core: the timeout applies per attempt, and abort listeners leak

**Labels:** `bug`, `pkg:core`, `P2` · **Milestone:** v1.2.0

**Summary**
- `timeoutMs` is turned into an `AbortController` inside `FetchRequestAdapter`, so it covers **one attempt**. With retries, a "10 s timeout" can take more than 3 minutes.
- Retry sleeps listen only to `request.signal`, not to the timeout.
- `mergeSignals` adds listeners to both signals with `{ once: true }`, but never removes them when the request completes. A long-lived caller signal accumulates one listener per request.

**Evidence**
- `packages/dataverse-sdk-core/src/pipeline/FetchRequestAdapter.ts:14-20, 36-48`.
- `RetryMiddleware.ts:82` (`sleep(delay, request.signal)`).

**Proposed fix**
- Start the overall deadline at `send()` entry. Use `AbortSignal.any([caller, AbortSignal.timeout(ms)])`, where available, with a fallback.
- Make retries respect it.
- Remove listeners in `finally`.
- Optionally add `attemptTimeoutMs`.

**Acceptance criteria**
- [ ] `timeoutMs: 1000` with a server that always returns 429 fails within about 1 s.
- [ ] No listener growth on a shared signal across 1,000 requests.

---

## SDK-20 · core: `bindMany` uses `new Function`, so it fails under a strict Content-Security-Policy

**Labels:** `bug`, `browser`, `security`, `pkg:core`, `P2` · **Milestone:** v1.1.0

**Summary**
`DataverseRequestBuilder.bindMany` loads the batch package with `new Function("return import('@mohsinonxrm/dataverse-sdk-batch')")`. This has three problems:
- it needs `script-src 'unsafe-eval'`, so it throws `EvalError` in any SPA with a strict CSP (Azure Static Web Apps guidance, enterprise policies);
- bundlers can't see the import, so the batch package is never bundled, and the import fails at runtime even when the package is installed;
- it depends on the broken batch builder (SDK-32).

**Evidence**
`packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:196-229`.

**Proposed fix**
Choose one:
- move `bindMany` into the batch package, for example `associateMany(client, …)`;
- accept a `BatchRequestBuilder` constructor as a parameter;
- implement it as sequential or parallel `$ref` POSTs.

In all cases, remove `new Function`. Add a lint rule (`no-new-func`, `no-implied-eval` as an error, not disabled).

**Acceptance criteria**
- [ ] `grep -rn "new Function" packages/*/src` returns nothing.
- [ ] `bindMany` (or its replacement) works in a Vite build under `script-src 'self'`.

---

## SDK-21 · core: no 401 handling (token refresh or Conditional Access claims challenge)

**Labels:** `enhancement`, `pkg:core`, `P2` · **Milestone:** v1.2.0

**Summary**
`AuthMiddleware` gets a token once per request, outside the retry loop, and never reacts to a `401`. These cases surface as plain errors with no recovery:
- **Expiry:** a token expires during long retry sleeps.
- **Revocation:** the token is revoked.
- **Claims challenge:** Conditional Access returns `WWW-Authenticate: Bearer … error="insufficient_claims", claims="…"`.

`TokenOptions.claims` exists, but nothing ever passes it.

**Evidence**
- `packages/dataverse-sdk-core/src/middleware/AuthMiddleware.ts:15-26`.
- `abstractions/http.ts:23-27` (`TokenOptions`).

**Proposed fix**
- On a `401`, parse `WWW-Authenticate`. If it carries `claims`, call `getToken(scopes, { claims })`; otherwise call `getToken(scopes, { forceRefresh: true })`, adding `forceRefresh` to `TokenOptions`.
- Retry once.
- Move token acquisition inside the retry loop, or refresh it when it's close to expiry.

**⚠ Verify**
Check whether Dataverse's CORS policy exposes `WWW-Authenticate` to browsers. If it doesn't, document that claims challenges can't be detected in a browser.

**Acceptance criteria**
- [ ] A mocked 401 with claims triggers exactly one re-acquisition with those claims, then one retry.

---

## SDK-22 · core: `getAll({ maxPages })` never stops early, and `iterate()` sends its first request eagerly

**Labels:** `bug`, `pkg:core`, `P2` · **Milestone:** v1.2.0

**Summary**
- `getAll` increments `pages` **after** the `for await` loop finishes, so `maxPages` has no effect. Only `maxItems` stops early.
- `iterate()` calls `this.getPage()` immediately, before anyone iterates. If the iterator is never consumed, the request still goes out, and a failure becomes an unhandled promise rejection.
- `PageIterator` follows `@odata.nextLink` without the same-origin check (SDK-02). It doesn't forward the original `Prefer: odata.maxpagesize` / impersonation headers, so later pages can differ from the first: a different page size, or running as a different user.

**Evidence**
- `packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:258-282`.
- `packages/dataverse-sdk-core/src/paging/PageIterator.ts:13-22`.

**Proposed fix**
- Count pages inside the iterator and stop at `maxPages`.
- Start the first request lazily on the first `next()`.
- Carry the original request's headers (except `authorization`) onto nextLink requests.

**Acceptance criteria**
- [ ] `getAll({ maxPages: 2 })` sends two requests.
- [ ] `iterate()` sends nothing until iterated.
- [ ] Page 2 carries the same `Prefer` and `CallerObjectId` as page 1.

---

## SDK-23 · core: `impersonate()` only supports `MSCRMCallerID`

**Labels:** `enhancement`, `pkg:core`, `P3` · **Milestone:** v1.2.0

**Summary**
`impersonate(userId)` sets `mscrmcallerid` (a `systemuserid`). Microsoft's guidance prefers `CallerObjectId` (the user's Microsoft Entra object id), which works across environments. There's no helper for it.

**Evidence**
`packages/dataverse-sdk-core/src/client/DataverseRequestBuilder.ts:93-96, 306-308`.

**Proposed fix**
Add `impersonate(id, { by: 'systemuserid' | 'aadObjectId' })`, which sets `MSCRMCallerID` or `CallerObjectId`. Alternatively, add a separate `impersonateByObjectId(oid)`. Throw if both are set.

**Acceptance criteria**
- [ ] Each form sends exactly one header.

---

## SDK-24 · core: query options are encoded with `URLSearchParams`, which turns spaces into `+`

**Labels:** `enhancement`, `pkg:core`, `P3`, `needs-verification` · **Milestone:** Backlog

**Summary**
`buildUrl` uses `URLSearchParams.set`, which encodes:
- spaces as `+`;
- `$`, `'`, `(`, `)` and `,` as `%XX`.

Dataverse appears to accept this. But the URLs are hard to read in logs, and they differ from Microsoft's documented examples. Whether `+` is reliably decoded as a space inside every OData literal, including function parameter aliases, hasn't been checked. Generated functions use the same approach (`dataverse-sdk-functions/src/*Function.ts`, `params.toString()`).

**Evidence**
- `packages/dataverse-sdk-core/src/utils/url.ts:11-19`.
- `packages/dataverse-sdk-functions/src/CalculateRollupFieldFunction.ts:24-47`.

**⚠ Verify**
`$filter=name eq 'a b'` and a function alias `@p1='a b'` with `+` encoding against a live org.

**Proposed fix**
- Encode with `encodeURIComponent`, then decode the characters OData allows literally: `$ ' ( ) , / : @ =`, and space as `%20`.
- Keep it behind a single helper shared by core and the generator.

---

## SDK-25 · auth-msal-browser: `@azure/msal-browser ^3` is a hard dependency, and the interaction check uses `instanceof`

**Labels:** `bug`, `browser`, `breaking-change`, `pkg:auth-msal-browser`, `P0` · **Milestone:** v1.1.0

**Summary**
The package declares `"@azure/msal-browser": "^3.0.0"` under `dependencies`, and imports `InteractionRequiredAuthError` as a **value**. An app using a current MSAL major (v4 or v5, as `@azure/msal-react` requires) gets two MSAL copies:
- **Bundle size:** larger bundles.
- **Type clashes:** `IPublicClientApplication` from different versions conflict.
- **Broken fallback:** the app's MSAL throws its own `InteractionRequiredAuthError`, so `error instanceof InteractionRequiredAuthError` from the provider's copy is `false`. The popup/redirect fallback **silently never runs**; the user just gets `TokenAcquisitionFailed`.

**Evidence**
- `packages/dataverse-sdk-auth-msal-browser/package.json:35-38`.
- `packages/dataverse-sdk-auth-msal-browser/src/MsalBrowserTokenProvider.ts:14, 171-174`.

**Proposed fix**
- Move `@azure/msal-browser` to `peerDependencies`, with the range the tests cover (for example `>=3.0.0 <6`). Keep it in `devDependencies` for tests.
- Import types only (`import type`).
- Detect interaction-required by `error.name === 'InteractionRequiredAuthError'`, or by `errorCode` in `['interaction_required','consent_required','login_required','no_account_error', …]`.
- Run CI against each supported MSAL major.

**Acceptance criteria**
- [ ] In an app with msal-browser v4 or v5, `npm ls @azure/msal-browser` shows one copy.
- [ ] A silent failure with `consent_required` from the app's MSAL triggers the configured interactive flow.

**Breaking?** Yes for installs that relied on the transitive MSAL. Document it in the changeset; consumers already need their own MSAL instance.

---

## SDK-26 · auth-msal-browser: interactive fallback gaps (no account, no `loginHint`, concurrent popups, popup blocked)

**Labels:** `bug`, `browser`, `pkg:auth-msal-browser`, `P1` · **Milestone:** v1.1.0

**Summary**
1. **No account → no interaction.** With no cached account, `acquireTokenSilent` throws a non-interaction error (`no_account_error`). It's wrapped as `TokenAcquisitionFailed`, so the provider never prompts.
2. **Interactive requests omit `account` / `loginHint`.** Users with several accounts get the account picker on every new resource. For example, a second Dataverse environment prompts again, even when SSO would succeed.
3. **No single-flight.** Two parallel `getToken` calls that both need interaction open two popups. The second fails with `interaction_in_progress`, which is common when a page loads several resources at once.
4. **Popup blocked** (`popup_window_error`, `empty_window_error`): no fallback to redirect, and no actionable error.

**Evidence**
`packages/dataverse-sdk-auth-msal-browser/src/MsalBrowserTokenProvider.ts:135-226`, especially 148-150 (silent request), 191-195 and 210-214 (interactive requests with no account or loginHint).

**Proposed fix**
- Treat no account, `no_account_error` and `login_required` as interaction-required.
- Pass `account` and `loginHint: account?.username` to popup and redirect requests.
- Keep one in-flight interactive promise per scope set, and have later callers await it.
- On popup-blocked, if `interactionType: 'popup'` and `fallbackToRedirect: true`, start the redirect. Otherwise throw `DataverseAuthenticationError` with `code: 'popup_blocked'`.

**Acceptance criteria**
- [ ] Tests with a mocked `IPublicClientApplication` cover each of the four cases.

---

## SDK-27 · auth-msal-browser: stale account, ignored `tenantId`, and lost MSAL error details

**Labels:** `bug`, `pkg:auth-msal-browser`, `P2` · **Milestone:** v1.1.0

**Summary**
- `options.account` is captured at construction (`this.options.account ?? this.getAccount()`), so after "switch account" the provider keeps using the old one.
- `TokenOptions.tenantId` (`core abstractions/http.ts:25`) is ignored. Guest users who need a tenant-specific authority can't get one.
- Wrapping keeps only `error.message`. MSAL's `errorCode` (`consent_required`), `subError` and the AADSTS code (for example `AADSTS65001`: admin consent needed) are lost, so apps can't show "ask your admin to consent".

**Evidence**
`MsalBrowserTokenProvider.ts:146, 176-180`.

**Proposed fix**
- Resolve the account on every call: active account → `options.account` → first account. Alternatively, accept `account: () => AccountInfo | null`.
- Map `tenantId` to `authority: https://login.microsoftonline.com/<tenantId>` on the request.
- Pass the original error as `cause`, and copy `errorCode`, `subError` and `correlationId` onto the `DataverseAuthenticationError` (see SDK-14).

**Acceptance criteria**
- [ ] After `setActiveAccount(b)`, tokens are for `b`.
- [ ] `err.cause.errorCode === 'consent_required'` can be read.

---

## SDK-28 · auth-msal-browser: missing SPA helpers (init and redirect handling, scopes per environment, sovereign authorities)

**Labels:** `enhancement`, `browser`, `pkg:auth-msal-browser`, `P2` · **Milestone:** v1.1.0

**Summary**
Every SPA writes the same boilerplate, and some of it is subtle. `docs/v1-api-surface.md:92` documents `createMsalBrowserProvider(...)`, which doesn't exist.

**Proposed additions**
- `initializeMsal(pca): Promise<AuthenticationResult | null>`: runs `initialize()` and `handleRedirectPromise()`, then sets the active account from the result or the cache.
- `scopesForEnvironment(url: string, kind: 'user_impersonation' | '.default' = 'user_impersonation'): string[]` → `["https://<origin>/user_impersonation"]`.
- `authorityFor(cloud: 'public' | 'usgov' | 'usgovdod' | 'china', tenant = 'organizations')`: `login.microsoftonline.com`, `login.microsoftonline.us`, `login.partner.microsoftonline.cn`.
- `createMsalBrowserProvider(pca, options)`: implement it, or remove it from the docs.
- Optional React helper, `useDataverseClient(envUrl)`, in a separate subpath so the core package doesn't depend on React.

**Acceptance criteria**
- [ ] The helpers are exported, documented and unit-tested.
- [ ] The SPA sample (SDK-50) uses them.

---

## SDK-29 · discovery: `OrganizationDetail` doesn't match the real Global Discovery Service v2 response

**Labels:** `bug`, `pkg:discovery`, `P1`, `needs-verification` · **Milestone:** v1.1.0

**Summary**
The types assume `Endpoints: { WebApiUrl, WebApplicationUrl }`, `State: string` ("Enabled") and `Geo`. Microsoft's documented response for `GET https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances` is **flat**: `Url`, `ApiUrl`, `State` (an integer, 0 = enabled), `Version`, `UrlName`, `UniqueName`, `FriendlyName`, `Region`, `EnvironmentId`, `TenantId`, `LastUpdated`, `OrganizationType`, `IsUserSysAdmin`, `DatacenterId`, `TrialExpirationDate`, `Purpose`, `SchemaType` …

So:
- `org.Endpoints.WebApiUrl` throws (`Endpoints` is undefined);
- `getEnabledOrganizations()` (filter `State eq 'Enabled'`) probably returns a 400 or nothing;
- the JSDoc examples (`org.Geo`, `select: ['Endpoints']`) mislead.

The tests only mock the SDK's assumed shape (`test/DiscoveryClient.test.ts:14-60`).

**Evidence**
- `packages/dataverse-sdk-discovery/src/types.ts:8-78`.
- `packages/dataverse-sdk-discovery/src/DiscoveryClient.ts` (JSDoc examples, `getEnabledOrganizations`).

**⚠ Verify**
Call the endpoint with a real token and save the JSON as a test fixture.

**Proposed fix**
- Type `OrganizationDetail` from the captured response, keeping the original property names.
- Add a computed helper `toEnvironment(org) → { url, webApiUrl, name, uniqueName, enabled, version, region, environmentId }`.
- Fix the `getEnabledOrganizations` filter (`State eq 0`), and add `getOrganizationByUrl(url)`.

**Acceptance criteria**
- [ ] The tests use the recorded real response.
- [ ] `getEnabledOrganizations()` works against a live org (integration test, SDK-46).

---

## SDK-30 · discovery: the commercial endpoint and scope are hard-coded

**Labels:** `bug`, `pkg:discovery`, `P1` · **Milestone:** v1.1.0

**Summary**
`baseUrl` can be overridden, but `DISCOVERY_SCOPES` is always `https://globaldisco.crm.dynamics.com/.default`. A sovereign-cloud discovery endpoint therefore gets a token for the wrong audience and fails. The JSDoc says the SDK supports "Commercial cloud" only.

**Evidence**
`packages/dataverse-sdk-discovery/src/DiscoveryClient.ts:13, 18, 72-75, 107`.

**Proposed fix**
- `new DiscoveryClient(tokenProvider, { cloud?: 'public' | 'gcc' | 'usg' | 'dod' | 'china'; baseUrl?; scopes? })`.
- A built-in map of endpoint and scope per cloud (⚠ Verify each from Microsoft's "Discover user organizations" documentation).
- Keep the `(tokenProvider, baseUrl)` signature as an overload.

**Acceptance criteria**
- [ ] Each cloud selects its endpoint and its scope.
- [ ] Custom `baseUrl` plus `scopes` works.

---

## SDK-31 · discovery: bypasses the pipeline (global `fetch`, no abort, retry or logging; plain `Error`)

**Labels:** `enhancement`, `pkg:discovery`, `P2` · **Milestone:** v1.1.0

**Summary**
`listOrganizations` has these problems:
- it calls the global `fetch` directly, so callers can't inject fetch for tests, proxies or Node polyfills;
- it has no `AbortSignal`, no retry on 429/503, and no logging or telemetry;
- it throws a plain `Error` with the status and text pasted in;
- `$select` values aren't encoded;
- `getOrganization(uniqueName)` puts `uniqueName` into `'…'` without escaping (SDK-43).

**Evidence**
`packages/dataverse-sdk-discovery/src/DiscoveryClient.ts:94-130, 148-154`.

**Proposed fix**
- Build discovery on a `DataverseClient` pointed at the discovery base URL. Alternatively, accept `{ fetchProvider, signal }` and map errors through `parseODataError`.
- Encode every query option, and escape literals.

**Acceptance criteria**
- [ ] Discovery can be tested with an injected fetch.
- [ ] An abort cancels the request.
- [ ] A 401 throws a `DataverseError` with `status`.

---

## SDK-32 · batch: `BatchRequestBuilder.execute()` doesn't work against the real core

**Labels:** `bug`, `pkg:batch`, `P1` · **Milestone:** v1.2.0

**Summary**
`executeSingleBatch` calls `this.client.api("/$batch").post(batchBody, headers)`, which has four problems:
- the headers map is passed as the builder's second parameter, which is `RequestOptions`. Its keys (`"Content-Type"`, `"Prefer"`) are not `RequestOptions` fields: the builder only reads `options.headers` and `options.prefer`. So `Content-Type: multipart/mixed; boundary=…` and `Prefer: odata.continue-on-error` are silently dropped, and the request goes out as `application/json`;
- the multipart string body is JSON-stringified (SDK-01);
- `.post()` returns `JSON.parse(text)`, **not** a `Response`, so `response.headers.get(...)` throws, and a multipart response fails `JSON.parse` before that anyway;
- a non-2xx `$batch` response throws a generic `DataverseODataError` from the builder.

The unit tests mock `client.api().post()` to return a fake Response, which hides all of this (SDK-52).

**Evidence**
`packages/dataverse-sdk-batch/src/BatchRequestBuilder.ts:262-292`:
```ts
const headers = { "Content-Type": `multipart/mixed; boundary=${boundary}`, ...(options.headers ?? {}) };
if (options.continueOnError) headers.Prefer = "odata.continue-on-error";
const response = (await this.client.api("/$batch").post(batchBody, headers)) as { headers: Headers; text: () => Promise<string> };
```

**Proposed fix**
Send through `client.send({ method: 'POST', url: resolve('$batch'), headers, body: batchBody })` once SDK-01 and SDK-12 are done. Then read `res.headers.get('content-type')` and `await res.text()`, and parse.

**Acceptance criteria**
- [ ] An msw-backed test intercepts the real HTTP request.
- [ ] It asserts the `Content-Type` boundary, the `Prefer` header and a byte-exact body.
- [ ] It parses a real recorded Dataverse batch response.

---

## SDK-33 · batch: encoder omits terminators and part Content-Type, and Content-IDs collide

**Labels:** `bug`, `pkg:batch`, `P1`, `needs-verification` · **Milestone:** v1.2.0

**Summary**
`encoding.ts` has several protocol problems:
1. **No blank line after a body-less request.** A GET or DELETE part ends right after its headers. The next `--boundary` line follows without the empty line that ends the HTTP headers.
2. **No `Content-Type` for JSON bodies.** An object body is stringified, but no `Content-Type: application/json; type=entry` header is added to the part. Dataverse requires it for POST and PATCH inside change sets (⚠ Verify the exact failure).
3. **Content-ID only inside change sets.** Each change set is numbered `1..n` (`String(i + 1)`), so IDs **collide across change sets**. The caller's `id` from `addRequest(id, …)` is never used.
4. **`dependsOn` is ignored.** It's stored but never used to emit `$<contentId>` references.
5. **Relative URLs.** Request URLs go out exactly as given. A relative `accounts` or `/accounts` must be either absolute or relative to the service root, as Dataverse expects (⚠ Verify which forms Dataverse accepts).

**Evidence**
- `packages/dataverse-sdk-batch/src/encoding.ts:32-70` (`encodeRequest`), `79-93` (`encodeChangeset`: `encodeRequest(requests[i], String(i + 1))`).
- `BatchRequestBuilder.ts:85-108` (`dependsOn` stored, unused).

**Proposed fix**
- Always end the header block with CRLF CRLF.
- Add `Content-Type: application/json; type=entry` to parts with an object body, unless the caller set one.
- Use caller-supplied Content-IDs, unique across the batch, or auto-number globally.
- Support `$ref` placeholders by `dependsOn`, or remove the parameter.
- Normalise URLs to the service-root-relative form.
- Golden-file tests against Microsoft's documented examples.

**Acceptance criteria**
- [ ] The encoder output matches the documented batch examples byte for byte.
- [ ] Dataverse accepts a mixed batch (GET + change set with create, then update `$1`) in a live test.

---

## SDK-34 · batch: decoder drops every response outside a change set, and parses case-sensitively

**Labels:** `bug`, `pkg:batch`, `P1` · **Milestone:** v1.2.0

**Summary**
`decodeBatchResponse` only keeps parts that have a `Content-ID`. Independent (non-change-set) requests have no Content-ID in the response, so **all their responses are dropped**. A batch of GETs returns an empty map.

Parsing is fragile:
- change-set detection uses `part.includes("Content-Type: multipart/mixed")` and its regex is case-sensitive, with the exact spacing `; boundary=`;
- `extractBoundary` doesn't strip quotes (`boundary="…"`);
- splitting requires exact `\r\n` and an exact boundary line, so trailing whitespace or LF-only line endings break it;
- the part header map preserves casing, so `headers['content-type']` lookups are inconsistent;
- the body is `.trim()`-ed, which alters text bodies.

**Evidence**
`packages/dataverse-sdk-batch/src/decoding.ts:13-16, 25-52, 60-73, 117-136, 169-215`.

**Proposed fix**
- Return an **ordered array** of parts (`{ contentId?, status, statusText, headers (lower-cased), body, bodyText }`), plus a `Map` by Content-ID for convenience.
- Parse case-insensitively.
- Handle quoted boundaries, optional whitespace and LF-only line endings.
- Never trim bodies; only strip the final CRLF before the boundary.

**Acceptance criteria**
- [ ] Recorded real responses parse correctly:
  - a GET-only batch;
  - a change-set success;
  - a change-set failure;
  - a continue-on-error mix.

---

## SDK-35 · batch: throws despite `continueOnError`, auto-split is missing, and internals aren't exported

**Labels:** `bug`, `enhancement`, `pkg:batch`, `P2` · **Milestone:** v1.2.0

**Summary**
- `buildResult` throws `DataverseBatchError` whenever any part fails, **even with `continueOnError: true`**. The comment at line 351 says otherwise.
- More than 1,000 requests throws "split manually" (`executeWithSplit`). The README advertises "auto-split".
- `encodeBatchRequest` and `decodeBatchResponse` aren't exported, and package `exports` blocks deep imports. Tools that build their own multipart bodies, or display them, can't reuse the codec.

**Evidence**
- `packages/dataverse-sdk-batch/src/BatchRequestBuilder.ts:302-311, 320-369`.
- `packages/dataverse-sdk-batch/src/index.ts`.
- Root `README.md`: "auto-split".

**Proposed fix**
- With `continueOnError`, return the result. Otherwise throw, but keep the full result on the error.
- Implement splitting (keeping change sets whole), or fix the README.
- Export `encodeBatchRequest`, `decodeBatchResponse`, `generateBoundary` and the types.

**Acceptance criteria**
- [ ] `continueOnError` never throws for per-part failures.
- [ ] A 2,500-request batch runs as 3 batches, or the README states the limit.
- [ ] The codec is exported.

---

## SDK-36 · files: unguarded `Buffer.isBuffer` crashes in browsers

**Labels:** `bug`, `browser`, `pkg:files`, `P1` · **Milestone:** v1.2.0

**Summary**
`fileToUint8Array` calls `Buffer.isBuffer(file)` with no `typeof Buffer` guard. In a browser without a Buffer polyfill, every `upload()` throws `ReferenceError: Buffer is not defined`. The README says the package works in "Node.js and browsers". `download()` also references `Buffer` in its Node branch, but that path is guarded by `typeof Blob`.

**Evidence**
`packages/dataverse-sdk-files/src/FileColumnClient.ts:260-268, 185-191`.

**Proposed fix**
- Use `typeof Buffer !== 'undefined' && Buffer.isBuffer(file)`.
- Or better: accept `Blob | ArrayBuffer | ArrayBufferView` and treat a Node `Buffer` as a `Uint8Array`, which it is.

**Acceptance criteria**
- [ ] `upload()` runs in a browser test (SDK-47) without polyfills.

---

## SDK-37 · files: the documented constructor argument (`client.requestAdapter`) doesn't exist, and the default `baseUrl` is invalid

**Labels:** `bug`, `docs`, `pkg:files`, `P1` · **Milestone:** v1.2.0

**Summary**
The README and ADR show `new FileColumnClient(client.requestAdapter)`. `DataverseClient` has no public `requestAdapter`; the adapter is `private`. Callers must pass `{ send: (r) => client.send(r) }` plus `client.getBaseUrl()`. The default `baseUrl = ""` produces relative URLs, which `new URL()` rejects (SDK-12).

**Evidence**
- `packages/dataverse-sdk-files/README.md:39, 176`.
- `docs/adr/0005-file-image-operations.md:40`.
- `packages/dataverse-sdk-files/src/FileColumnClient.ts:56-59`.
- `packages/dataverse-sdk-core/src/client/DataverseClient.ts:19`.

**Proposed fix**
`new FileColumnClient(client: DataverseClient)`, which uses `client.send` and `client.getBaseUrl()`. Keep `(adapter, baseUrl)` as an overload. Fix the docs.

**Acceptance criteria**
- [ ] The README example compiles and runs.

---

## SDK-38 · files: `InitializeFileBlocksUpload` `Target` uses an entity set name as the logical name

**Labels:** `bug`, `pkg:files`, `P1`, `needs-verification` · **Milestone:** v1.2.0

**Summary**
`upload(entitySetName, …)` builds `Target: { "@odata.type": "Microsoft.Dynamics.CRM.EntityReference", logicalName: entitySetName, id }`. An `EntityReference` needs the table's **logical name** (`account`), not the entity set name (`accounts`). With the API as documented, the call fails, or targets the wrong table.

**Evidence**
`packages/dataverse-sdk-files/src/FileColumnClient.ts:92-100`.

**⚠ Verify**
The exact `Target` shape expected by `InitializeFileBlocksUpload` (the docs show `"Target": { "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`).

**Proposed fix**
Take `entityLogicalName` (and the primary key name), or resolve them from metadata, and build the typed entity reference the docs show.

**Acceptance criteria**
- [ ] A live upload of a 10 MB file to a file column succeeds (SDK-46).

---

## SDK-39 · files: upload, commit and delete responses are never checked

**Labels:** `bug`, `pkg:files`, `P1` · **Milestone:** v1.2.0

**Summary**
- `upload()` never checks `ok` on the `UploadBlock` or `CommitFileBlocksUpload` responses.
- `delete()` doesn't check its response either.
- Whether `initAction.parseResponse` fails on non-2xx depends on the generated action. A failed chunk or commit therefore resolves as success.

**Evidence**
`packages/dataverse-sdk-files/src/FileColumnClient.ts:102-103, 121, 146, 215`.

**Proposed fix**
Check `res.ok` after every request, and throw `parseODataError(res)`. Add `upload` options for `signal` and per-chunk retry.

**Acceptance criteria**
- [ ] A mocked 400 on chunk 3 rejects `upload()` with a `DataverseError` that includes `status: 400`.

---

## SDK-40 · files: missing PATCH chunked route, ranged download, image sizes, abort and streaming

**Labels:** `enhancement`, `pkg:files`, `P2`, `needs-verification` · **Milestone:** Backlog

**Summary**
Gaps compared with the documented file and image APIs:
- **Upload:**
  - no single-request `PATCH …/<col>` with `x-ms-file-name`;
  - no chunked `PATCH` (`x-ms-transfer-mode: chunked` → `Location` + `x-ms-chunk-size` → `Content-Range` chunks);
  - the whole file is loaded into memory (`fileToUint8Array`);
  - chunk size isn't validated (the `UploadBlock` maximum is 4 MB).
- **Download:**
  - only a single `GET …/$value`, which is limited for large files;
  - no `Range` / `x-ms-file-size` chunked download;
  - no `InitializeFileBlocksDownload` / `DownloadBlock`;
  - no `?size=full` for images;
  - no progress reporting.
- **Delete:** uses `PATCH { col: null }`. The documented way is `DELETE …/<col>` (⚠ Verify both).
- **General:** no `AbortSignal`; `normalizeGuid` is duplicated inline.

**Evidence**
`packages/dataverse-sdk-files/src/FileColumnClient.ts` (whole file); `docs/adr/0005` (stream approach deferred).

**Proposed fix**
- Implement the documented routes behind `method: 'auto' | 'actions' | 'patch-chunked' | 'single'`.
- Read from a `Blob` slice by slice, never all at once.
- Report progress for download as well as upload.
- Add `signal`.
- **Browser note:** the PATCH-chunked route depends on reading the `Location` and `x-ms-chunk-size` response headers. These may not be exposed by Dataverse's CORS policy (⚠ Verify), so `auto` should prefer the actions route in browsers.

---

## SDK-41 · metadata: `RetrieveMetadataChanges` is sent as POST, but it's a function

**Labels:** `bug`, `pkg:metadata`, `P1`, `needs-verification` · **Milestone:** v1.2.0

**Summary**
`retrieveMetadataChanges` sends `POST /RetrieveMetadataChanges` with a JSON body. In the Web API reference, `RetrieveMetadataChanges` is a **function**: `GET /RetrieveMetadataChanges(Query=@p1,ClientVersionStamp=@p2,…)?@p1=<json>`. A POST should fail with 404 or 405.

**Evidence**
`packages/dataverse-sdk-metadata/src/MetadataClient.ts:836-860`.

**⚠ Verify**
Against a live org, and against the CSDL (`<Function Name="RetrieveMetadataChanges">`).

**Proposed fix**
Send a GET with parameter aliases: JSON-serialised `Query` and `DeletedMetadataFilters`, and `ClientVersionStamp` as a string literal. Consider reusing the generated `RetrieveMetadataChangesFunction` from `dataverse-sdk-functions`.

**Acceptance criteria**
- [ ] A live test retrieves changes, then re-queries with the returned `ServerVersionStamp`.

---

## SDK-42 · metadata: create methods depend on a response body that Dataverse may not return

**Labels:** `bug`, `pkg:metadata`, `P1`, `needs-verification` · **Milestone:** v1.2.0

**Summary**
`createEntityDefinition` (and similar `create*`) send `Prefer: return=representation` and read `response.MetadataId` from the body. Dataverse metadata creates usually return `204 No Content` with an `OData-EntityId` header. They may not honour `return=representation` on `EntityDefinitions` (⚠ Verify). If not:
- `post()` returns `undefined`, so `response.MetadataId` throws a `TypeError`;
- or the explicit `throw new Error("Failed to retrieve entity metadata ID")` fires.

Because the builder hides headers (SDK-13), there's no fallback.

Related:
- `update*` methods use `PUT`, which **replaces** the definition. The types are named `*Update`, which suggests a partial update. Sending a partial object can reset properties. Document this, or offer a retrieve-merge-put helper.
- There's no `MSCRM.SolutionUniqueName` option to create components in a solution.

**Evidence**
`packages/dataverse-sdk-metadata/src/MetadataClient.ts:140-166, 231-270, 291-310, 449-500, 580-620`.

**Proposed fix**
- Read `OData-EntityId` from the response header (needs SDK-13), and fall back to the body.
- Add `options?: { solutionUniqueName?: string }` to every create and update.
- Document PUT semantics, and add `mergeAndUpdateEntityDefinition()`.

**Acceptance criteria**
- [ ] A live test creates and deletes a temporary table, then reads its MetadataId from the header.

---

## SDK-43 · OData string literals are not escaped (`'` in keys and parameters breaks queries)

**Labels:** `bug`, `security`, `pkg:metadata`, `pkg:discovery`, `pkg:functions`, `P2` · **Milestone:** v1.2.0

**Summary**
Values are put inside single-quoted OData literals without doubling embedded `'`. A value containing `'` produces a broken URL. A value from user input can change the query: a filter or key injection, limited to what the user can already access, but still a correctness and safety bug. Examples:
- `EntityDefinitions(LogicalName='${logicalName}')`, `SchemaName='${schemaName}'` (metadata);
- `UniqueName eq '${uniqueName}'` (discovery);
- function parameter aliases `'${this.privilegeName}'` (functions, generated).

**Evidence**
- `packages/dataverse-sdk-metadata/src/MetadataClient.ts:108, 161, 172, 187, 214, 236, 260, 278, 400, 475, 491, 503, …`.
- `packages/dataverse-sdk-discovery/src/DiscoveryClient.ts:148-154`.
- `packages/dataverse-sdk-functions/src/RetrieveUserPrivilegeByPrivilegeNameFunction.ts:31-38` (template used across all generated functions).
- `packages/dataverse-sdk-functions/src/CalculateRollupFieldFunction.ts:38-43`.

**Proposed fix**
- Add `odataLiteral.string(v) => "'" + v.replace(/'/g, "''") + "'"`, plus helpers for `guid`, `int`, `bool`, `datetime` and `enum`, in core.
- Use them everywhere, including the generator templates (`tools/generate-sdk-types`, `packages/dataverse-sdk-generator`).
- Regenerate.

**Acceptance criteria**
- [ ] A test with `O'Brien` in a filter and in a function parameter produces a valid URL.
- [ ] Grepping for `` `'${ `` in `src/` finds only helper usage.

---

## SDK-44 · metadata: no type-cast attribute queries, `$metadata` CSDL fetch, or option-set expansion

**Labels:** `enhancement`, `pkg:metadata`, `P2` · **Milestone:** Backlog

**Summary**
The metadata client can't retrieve:
- **Type-cast attributes**, which are needed for anything beyond basic attribute properties. For example:
  - `EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$expand=OptionSet,GlobalOptionSet`;
  - `…/Microsoft.Dynamics.CRM.LookupAttributeMetadata?$select=Targets`;
  - `StringAttributeMetadata` → `MaxLength`, `Format`.

  The base `AttributeMetadata` `$select` rejects these properties with `0x80060888`.
- **The `$metadata` CSDL document** (XML). This is useful for listing actions, functions and Custom APIs with their parameters. Only the Node-only generator fetches it.
- **Image attribute details** (`ImageAttributeMetadata`) and **file attribute `MaxSizeInKB`**.

**Evidence**
`packages/dataverse-sdk-metadata/src/MetadataClient.ts:183-225` (no cast support); `packages/dataverse-sdk-generator/src/metadata-service.ts:28-45` (the only CSDL fetch).

**Proposed fix**
- `getAttributesOfType(entity, 'PicklistAttributeMetadata', { select, expand })`.
- `getCsdlDocument(): Promise<string>`, needing SDK-13 for text responses.
- Typed helpers for the common casts.

---

## SDK-45 · actions / generator: generated actions set `"Content-Type"`, which duplicates the core's lower-case header

**Labels:** `bug`, `pkg:actions`, `pkg:generator`, `P1` · **Milestone:** v1.1.0

**Summary**
Every generated action's `toRequestInformation` sets `headers: { "Content-Type": "application/json" }`. Because of SDK-03, the core also adds `content-type: application/json; charset=utf-8`, and `fetch` sends a combined value on **every action call**.

**Evidence**
- `packages/dataverse-sdk-actions/src/*Action.ts`: 1,356 files. For example, `RemoveCertificateCredentialAction.ts:31-37`.
- `grep -rln "Content-Type" packages/dataverse-sdk-actions/src | wc -l` → 1356.

**Proposed fix**
- Fix SDK-03, which makes the casing irrelevant.
- **Also** change the generator template to emit lower-case `content-type` (or no header at all, relying on the core default). Regenerate the actions, functions and messages packages.

**Acceptance criteria**
- [ ] A captured action request has exactly one `content-type`.

---

## SDK-46 · repo: `test:integration` doesn't exist, so nothing has been run against a live org

**Labels:** `ci`, `pkg:repo`, `P1` · **Milestone:** v1.1.0

**Summary**
`.github/workflows/integration-tests.yml` runs `pnpm turbo run test:integration`, but **no package defines a `test:integration` script** and `turbo.json` has no such task. The workflow runs nothing. Every test uses msw or vi mocks shaped by the SDK's own assumptions. That's how SDK-01, SDK-29 and SDK-32 to SDK-34 shipped as "100% coverage, production ready" (`docs/v1-implementation-review.md`).

**Evidence**
- `.github/workflows/integration-tests.yml`.
- `turbo.json` (tasks: build, test, lint, typecheck, clean, `generate:metadata-types`).
- `grep -rn "test:integration" packages/*/package.json` → none.

**Proposed fix**
1. Add an `integration/` workspace, or per-package `test/integration/*.int.test.ts`, gated on env vars: `DATAVERSE_URL`, and `DATAVERSE_TOKEN` or the client-credential variables `TENANT_ID` / `CLIENT_ID` / `CLIENT_SECRET`.
2. Cover these flows:
   - WhoAmI;
   - a create/retrieve/update/delete round trip on a scratch table row;
   - `$batch` with a change set and continue-on-error;
   - `$metadata` text;
   - a file upload and download;
   - discovery;
   - throttling, if a safe way to provoke it exists;
   - metadata create and delete of a temp table (optional, slow).
3. Add a `test:integration` task to turbo and to the root `package.json`.
4. Record real responses as fixtures for the unit tests (SDK-29, SDK-34).

**Acceptance criteria**
- [ ] A manual `workflow_dispatch` run against a dev org passes, and fails visibly if a step fails.

---

## SDK-47 · repo: no browser-environment tests and no bundle smoke test

**Labels:** `ci`, `browser`, `pkg:repo`, `P1` · **Milestone:** v1.1.0

**Summary**
`vitest.config.ts` runs everything with `environment: "node"`. Nothing checks that the packages work in a browser bundle. A browser run would have caught:
- the unguarded `Buffer` (SDK-36);
- `new Function` under CSP (SDK-20);
- dual MSAL copies (SDK-25);
- the console logging (SDK-15).

**Evidence**
`vitest.config.ts:1-15`.

**Proposed fix**
- Add a vitest project with Vitest browser mode (Playwright Chromium) for `core`, `auth-msal-browser`, `discovery`, `batch`, `files` and `metadata`, or `happy-dom` as a cheaper first step.
- Add a `samples/bundle-smoke` Vite app that:
  - imports each browser package;
  - builds with a strict CSP meta tag (`script-src 'self'`);
  - runs a Playwright check for console errors and CSP violations.
- Add a CI check that the production bundle has no `Buffer`, `process.` or `new Function` references.

**Acceptance criteria**
- [ ] The CI job fails if any browser package throws on import or on a basic `send()` in Chromium.

---

## SDK-48 · CI: Node 18 (EOL), no typecheck, unpinned actions, no `permissions`, no `engines`

**Labels:** `ci`, `pkg:repo`, `P2` · **Milestone:** v1.1.0

**Summary**
- `ci.yml` and `integration-tests.yml` use **Node 18**, which reached end of life in April 2025. The README says "Node 18+".
- No package declares `engines`.
- CI never runs `pnpm typecheck`; `ci.yml` runs only format, build, lint and test.
- Actions are referenced by tag (`actions/checkout@v4`, `pnpm/action-setup@v4`, `actions/setup-node@v4`), not by commit SHA.
- There is no top-level `permissions:` block (least privilege).
- vitest is `^1.6.0`, several majors behind.

**Evidence**
- `.github/workflows/ci.yml`.
- `.github/workflows/integration-tests.yml`.
- `package.json` and `packages/*/package.json` (no `engines`).

**Proposed fix**
- Test matrix: Node 20, 22 and 24.
- `engines: { node: ">=20" }`.
- Add a `pnpm typecheck` step.
- Pin actions by SHA (with a Dependabot `github-actions` ecosystem).
- `permissions: { contents: read }`, widened only where the release job needs `id-token: write` for provenance.
- Upgrade vitest.

**Acceptance criteria**
- [ ] CI is green on all three Node versions, with typecheck.

---

## SDK-49 · docs describe APIs that don't exist, and there's no browser/CORS guidance

**Labels:** `docs`, `browser`, `pkg:repo`, `P2` · **Milestone:** v1.1.0

**Summary**
- `docs/v1-api-surface.md` lists APIs that don't exist:
  - `createMsalBrowserProvider` (§2.2, line 92);
  - batch types `BatchRequest`, `ChangeSet`, `BatchResponsePart` (the real class is `BatchRequestBuilder`).
- `packages/dataverse-sdk-files/README.md` and `docs/adr/0005` use `client.requestAdapter` (SDK-37).
- `DiscoveryClient` JSDoc uses `org.Endpoints.WebApiUrl` and `org.Geo` (SDK-29).
- The root README advertises batch "auto-split" (SDK-35).
- `docs/v1-implementation-review.md` says "435/435 tests, 100% coverage, PRODUCTION READY, no blockers". That isn't accurate given this list.
- `RequestOptions.ts` JSDoc defaults (`maxRetries 3`, `delay 1000`, codes `[429, 503, 504]`) don't match the code (SDK-08).
- Nothing in `docs/` mentions **CORS**. Browser apps need to know:
  - Dataverse allows cross-origin calls with bearer tokens;
  - which response headers are exposed (⚠ Verify the list);
  - which custom request headers trigger preflights;
  - how to set up a SPA app registration (redirect URIs, `user_impersonation`).

**Proposed fix**
- Correct each doc.
- Mark the implementation review as historical, or update it.
- Add `docs/browser.md` (or ADR 0007, "Browser and CORS") covering:
  - SPA app registration;
  - MSAL setup;
  - CORS behaviour and exposed headers;
  - the CSP needed;
  - the limits (headers, binary routes).

---

## SDK-50 · samples/spa-fluentui-v9: corrupted literals, placeholder auth and SDK bypass

**Labels:** `bug`, `docs`, `pkg:samples`, `P2` · **Milestone:** v1.2.0

**Summary**
It looks like an automated refactor inserted `as any` casts into string literals:
- `"https://(globaldisco as any).crm.(dynamics as any).com/api/discovery/(v2 as any).0/Instances"` (`pages/Discovery/index.tsx:85, 239-255, 281`);
- `"OData-MaxVersion": "(4 as any).0"` (`pages/BatchOperations/index.tsx:180-181`);
- `--url "https://(org as any).crm.(dynamics as any).com"` (`pages/TypeSafety/index.tsx:310`).

Other problems:
- The Discovery page returns the placeholder token `"YOUR_ACCESS_TOKEN"` (`pages/Discovery/index.tsx:115`).
- The Batch page skips the SDK and calls raw `fetch` with no `Authorization` header.
- The sample pins `@azure/msal-browser ^3.7.1` and `@azure/msal-react ^2.0.16`.
- `IMPLEMENTATION_STATUS.md` describes the SDK as "Phase 0-1".

**Proposed fix**
- Fix the literals. Find the others with a grep for `as any)` inside string literals across `samples/`.
- Wire Discovery and Batch through the SDK (after SDK-29 to SDK-35).
- Move to current MSAL (after SDK-25), using the SDK-28 helpers.
- Add the sample to the SDK-47 bundle smoke test.

**Acceptance criteria**
- [ ] The sample builds, signs in, lists environments, runs a query and runs a batch against a dev org.

---

## SDK-51 · core: `SDK_VERSION` is hard-coded to `"0.1.0"`

**Labels:** `bug`, `pkg:core`, `P3` · **Milestone:** v1.1.0

**Summary**
`TelemetryMiddleware` sends `x-ms-sdk-version: dataverse-sdk-js/0.1.0` and reports `sdk.version: 0.1.0` in telemetry, while the package is `1.0.0`. The source has a `TODO: Auto-generate from package.json during build`.

**Evidence**
`packages/dataverse-sdk-core/src/middleware/TelemetryMiddleware.ts:8`.

**Proposed fix**
Inject the version at build time, through a tsup `define: { __SDK_VERSION__: JSON.stringify(pkg.version) }`. Alternatively, generate a `version.ts` during `changeset version`. Add a test that it matches `package.json`.

---

## SDK-52 · batch / repo: batch tests mock away the code under test

**Labels:** `bug`, `ci`, `pkg:batch`, `pkg:repo`, `P2` · **Milestone:** v1.2.0

**Summary**
`test/BatchRequestBuilder.test.ts` mocks `client.api().post()` to return a Response-like object, which the real `post()` never returns. The tests pass while the integration with core is broken (SDK-32). Several other packages' tests mock the `DataverseClient` surface the same way, instead of using msw at the HTTP layer.

**Evidence**
`packages/dataverse-sdk-batch/test/BatchRequestBuilder.test.ts:7-21`.

**Proposed fix**
- Use a real `DataverseClient` with an msw handler, or a fake `fetchProvider`, in all package tests.
- Assert on the actual HTTP request (method, URL, headers, body bytes).
- Add a lint or test convention: no `vi.mock` of `@mohsinonxrm/dataverse-sdk-core` in other packages' tests.

**Acceptance criteria**
- [ ] Batch tests fail on today's `main`, which reproduces SDK-32, and pass after the fix.

---

## Appendix: dependency order for fixing

```
SDK-03 (headers) ─┬─► SDK-01 (bodies) ─► SDK-32/33/34/35 (batch) ─► SDK-52
                  │                    └► SDK-36..40 (files)
                  └─► SDK-45 (generated Content-Type)
SDK-06 (per-request ctx) ─► SDK-05 (per-request options) ─► SDK-08/09/10 (retry) ─► SDK-17/18/19
SDK-12 (relative send) ─► SDK-13 (raw response) ─► SDK-42/44 (metadata) ; SDK-37 (files ctor)
SDK-14 (errors) ─► SDK-27 (auth error details), SDK-31 (discovery errors), SDK-39
SDK-02 (origin guard) ─► SDK-22 (nextLink)
SDK-25 (MSAL peer) ─► SDK-26/27/28 ─► SDK-50 (sample)
SDK-29/30 (discovery) ─► SDK-31
SDK-46/47 (tests) — start early; every fix above should land with a test from them
```

## Appendix: not reviewed in depth

These packages were only skimmed; their logic hasn't been audited.

**Audited only where they affect browser use:** `dataverse-sdk-xrm` (`OrganizationService`), `dataverse-sdk-messages`, `dataverse-sdk-entities-runtime`.

**Not checked for browser use:**
- `dataverse-sdk-generator` and `tools/generate-sdk-types` (Node CLIs), apart from the template issues in SDK-43 and SDK-45;
- `dataverse-sdk-auth-msal-node`, `dataverse-sdk-auth-azure-identity`, `dataverse-sdk-otel` and `dataverse-sdk-appinsights`.

A follow-up review of the `xrm` facade is worth doing, because it's built on the same builder (SDK-03, SDK-13 and SDK-43 likely apply).
