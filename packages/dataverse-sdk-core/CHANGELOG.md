# @mohsinonxrm/dataverse-sdk-core

## 2.0.1

### Patch Changes

- 17f85cf: `CircuitBreakerMiddleware` treats a 429 and other 4xx responses (400, 401, 403, 404, 409, 412...) as neutral: they no longer reset the count of failures in a row. Before, a 429 counted as a success, so a run of 503s interleaved with 429s never opened the circuit while the service was struggling. Now only a 2xx or 3xx resets the count, and a probe answered with a 429 or another 4xx leaves the circuit half-open so the next request probes. A custom `isFailure` still decides what is a failure; a response it doesn't count is a success below 400 and neutral from 400 up (#470).
- 3204963: Two retry fixes (#469, #471).

  - **`shouldRetry` no longer turns off the idempotency guard (#469).** `retry.shouldRetry` now only picks which statuses (and network errors) are worth retrying. A POST, or a PATCH without `If-Match`, is still not replayed after a 5xx or a dropped connection, and a `$batch` POST whose 429 response has per-request results is still handed back, unless `retryNonIdempotent: true`. Before, any `shouldRetry` skipped those checks, so `shouldRetry: (s) => s >= 500` could create a record twice when a gateway answered 502 after Dataverse applied the create. **Behaviour change:** if you relied on `shouldRetry` to replay creates or actions, add `retryNonIdempotent: true`.
  - **A `Retry-After` past the deadline fails at once (#471).** With `timeoutMs`, a retry whose wait (`Retry-After` or the computed backoff) would end after the deadline is no longer started. The response comes back at once: a 429 rejects with `DataverseThrottleError` and its `retryAfterMs`, and a 502/503/504 rejects with its own error (`send()` returns the response). A network error is thrown as `ConnectionFailed`. Before, the SDK slept until the deadline and rejected with `DataverseNetworkError` named `RequestTimeout`, so in this case the error type changes. `onRetry` and the `dataverse.retry` telemetry event fire only for retries that happen. `MiddlewareContext` has a new optional `deadline` (ms since the epoch) for custom middleware.

## 2.0.0

### Major Changes

- c262ad7: **Breaking.** `concurrency` settings now do what they say (#356):

  - `maxConcurrentRequests` is used exactly. Before, it was clamped to `min`/`max` (2 and 16 by default), so `maxConcurrentRequests: 1` still sent 2 requests at once and `32` sent 16.
  - When `maxConcurrentRequests` is set, `max` defaults to it, so the `x-ms-dop-hint` header can lower your limit but no longer raise it. Set `max` as well to let the hint raise it. Without `maxConcurrentRequests`, nothing changes: the limit starts at 8 and follows the hint within 2..16.
  - Settings that aren't whole numbers of at least 1, or don't fit `min <= maxConcurrentRequests <= max`, throw `DataverseInvalidRequestError` when the client is created.
  - The per-request `maxConcurrent` option (`MiddlewareConcurrencyOptions`), which was never read, is removed; `bypass` stays.

- 4c62fee: **Breaking.** Paging, telemetry and pipeline fixes (#378):

  - `search()` is removed: Dataverse's Web API doesn't support `$search`, so the request failed. Use Dataverse search (the `searchquery` message) for full-text search, or `$filter` with `contains()`.
  - `getAll()` and `iterate()` take `RequestOptions` (plus `maxItems` / `maxPages` for `getAll()`), and every page gets them: `signal`, `timeoutMs` and `attemptTimeoutMs` per page, `correlationId`, `middlewareOptions`, `headers` and `prefer`. Before, only `signal` was accepted. `getAll({ maxItems: 0 })` returns `[]` instead of everything.
  - `new PageIterator(client, firstPage, options)` takes request options as its third argument; it was a signal (and a fourth argument for headers).
  - Telemetry reports a 304 (and any status below 400) as a successful dependency, so `If-None-Match` reads no longer count as failures.
  - After a 401, the response body is released even when getting the new token throws.
  - `RequestInformation.idempotent` marks a request that can be replayed whatever its method. The FetchXML query that is sent as a `$batch` (a POST carrying one GET) uses it, so it is retried after a 502/503/504 or a dropped connection like the GET itself.

- d9eebf3: **2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

  - **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
  - **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
  - **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
  - **core, timeouts:** `timeoutMs` covers the whole request.
  - **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
  - **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
  - **core, removed options:** `RetryOptions.delay` and `useExponentialBackoff`, `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are gone (#285).
  - **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
  - **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
  - **xrm:** record ids must be GUIDs, and entity sets come from metadata. `execute()` infers its result from the request, and records are `EntityRecord` instead of `any`.
  - **discovery:** `OrganizationDetail` matches the v2.0 response.
  - **actions, functions, messages:**
    - constructors take one object with the parameters by name; a bound operation's record id or entity set comes first, and bulk operations take the entity set first (#96);
    - each binding of an overloaded operation has its own class, and the plain-name classes of bound-only operations are removed (#286);
    - one `EntityReference` for the whole SDK: `createEntityReference` returns the Web API shape and takes an options object (#295);
    - `client.execute()` resolves the operation's value, not the OData envelope: the entity (`null` for a 204), the array, the primitive, or nothing (#300);
    - `toRequestBody()` is removed.

  See each package's CHANGELOG for the full list.

- 3d4614d: **Breaking.** `$skip` is gone, because Dataverse doesn't support it: a request with `$skip` fails with 400 (#357).

  - core: `DataverseRequestBuilder.skip()` and `QueryState.$skip` are removed. Page with `@odata.nextLink`: `iterate()`, `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.
  - xrm: `RetrieveMultipleOptions.skip` is replaced by `maxPageSize` (`Prefer: odata.maxpagesize`). Follow the result's `@odata.nextLink` for the next page.

- ff655da: **Breaking.** Telemetry events and W3C trace context (#97).

  - **`TelemetryClient.trackDependency` is replaced by `startDependency(name, data)`** (core). The SDK calls it before each request attempt and calls `end(data)` on the `DependencyHandle` it returns once the attempt is done, with `durationMs`, `success` and `resultCode`. The handle can carry `headers` (`traceparent`, `tracestate`), which the SDK sends with the attempt, and `run(fn)`, which makes the dependency the active span while the attempt runs. A custom client moves its `trackDependency` body into `end` (see the 2.0 migration guide). Each retry and each resend after a 401 is its own dependency, started in the caller's context.
  - **Trace context goes to Dataverse.** Only a valid `traceparent` and its `tracestate` are sent, only to origins that may receive the access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or the new `diagnosticHeaders: { traceContext: false }` turns it off.
  - **Events.** `trackEvent` now receives `dataverse.throttle` (each 429, with the limit hit, `Retry-After` and `x-ms-dop-hint`), `dataverse.retry` (before each retry wait), `dataverse.concurrency.wait` (a request waited for a slot) and `dataverse.concurrency.limit` (`x-ms-dop-hint` changed the limit). The names are exported as `TelemetryEvents`. A request with telemetry turned off sends none.
  - **`DataverseClient.trackEvent(name, props, measurements)`** sends an event to the client's telemetry, guarded like the SDK's own calls. The batch package uses it to report `dataverse.batch` for each `$batch` (requests, succeeded, failed, duration, status, correlation id); `execute()` now generates the `$batch` correlation id itself when you don't pass one.
  - **otel and appinsights:** `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` implement `startDependency`: the CLIENT span starts with the active context, is active while the attempt runs (so `fetch` auto-instrumentation spans are its children), carries `http.request.resend_count` on retries, and its context is injected with the registered propagator, so the request carries its `traceparent`. `trackDependency` is removed from both.

### Minor Changes

- 9bb1db9: `AdaptiveThrottlingMiddleware`: slow down before Dataverse throttles, from its service-protection headers (#309). It is opt-in: add it with `middleware: { append: [new AdaptiveThrottlingMiddleware()] }`.

  - **Spacing.** It reads `x-ms-ratelimit-burst-remaining-xrm-requests` (requests left in the 5-minute window, e.g. `7999`) and `x-ms-ratelimit-time-remaining-xrm-requests` (execution time left, e.g. `1,200.00`) from every response. When either falls below `threshold` (0.2) of its full value (the highest seen, or `requestBudget` / `timeBudget`), request starts are spaced out by up to `maxSpacingMs` (2 s) as the budget nears empty.
  - **Pause after a 429.** A 429 with `Retry-After` holds every new request until the wait has passed (`pauseOnRetryAfter`, default on, capped by `maxPauseMs`, 30 s).
  - `status` reports the budgets, the pressure and the current spacing; `onDelay` is told about each request held back.
  - Microsoft documents the headers as being for debugging and each web server counts on its own, so this is a soft brake: the retry middleware still handles 429s. In browsers the headers aren't readable, so only the pause after a 429 applies.

- ca11ddf: 401 handling and a token per attempt (#21).

  - **A token per attempt.** `AuthMiddleware` now runs inside `RetryMiddleware`, so every attempt gets a current token from the provider. A retry after a long wait can no longer send an expired token. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging (Retry moved outside Concurrency in #44).
  - **One recovery after a 401.** The client gets a new token and resends the request once. A Conditional Access / CAE claims challenge in `WWW-Authenticate` is decoded and passed as `getToken(scopes, { claims })`; otherwise `getToken(scopes, { forceRefresh: true })` is called. A second 401 is returned as the error. Turn this off with `refreshTokenOn401: false`.
  - **Browsers.** Dataverse doesn't expose `WWW-Authenticate` to browsers, so there the recovery is always a forced refresh.
  - **New API.** `TokenOptions.forceRefresh` is new, and `getToken` now also receives the request's `correlationId`. `parseClaimsChallenge(header)` is exported.

- aec5a48: `bindMany()` works without the batch package, and `associate()` works against Dataverse (#20).

  - **`bindMany()` without an executor.** The executor argument is now optional. Without it, `bindMany()` sends one `POST …/{nav}/$ref` per id, in order, through the client's pipeline, and stops at the first failure. Pass `createBindManyExecutor()` to send a single `$batch` instead. No `eval` or `new Function` is involved, so it works under a strict CSP, and the browser smoke test checks that.
  - **`associate()` sends an absolute `@odata.id`.** Dataverse rejected the relative `/contacts(id)` it used to send with "the odata.context annotation is missing from the payload", so `associate()`, and with it `bindMany()`, never worked live. The batch package's `createBindManyExecutor()` gets the same fix.
  - **Lint.** `no-eval`, `no-new-func` and `@typescript-eslint/no-implied-eval` are now errors.

- 83f2256: `ChaosMiddleware`: fault injection for testing how an app copes with throttling and outages, modelled on the Microsoft Graph SDK's `ChaosHandler` (#308). It is opt-in and never part of the default pipeline: add it with `middleware: { append: [new ChaosMiddleware(options)] }`.

  - **Faults.** It answers a share of requests itself (`percentage`, default 10) with a fault picked from `faults` (default 429 with `Retry-After: 1`, 502, 503, 504), without sending them. A fault is `{ status, retryAfterSeconds?, headers?, body? }`; `status: "network"` throws a `DataverseNetworkError` named `ConnectionFailed`, as a dropped connection does. The default body is a Dataverse error body (for a 429, the service-protection error `0x80072322`).
  - **Choosing requests.** `match` (a `RegExp` tested against the full URL, or a function) limits it to some requests; `script(request, { requestIndex, attempt })` decides per request instead of the percentage; `random` takes a seeded generator; `onFault` is told about each fault.
  - **Per request.** `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])` or `{ type: "chaos", fault }` (`ChaosRequestOptions`).

- f780438: Opt-in circuit breaker and bulkhead middleware (#343). Neither is in the default pipeline; add them with the `middleware` option.

  - **`CircuitBreakerMiddleware`.** After `failureThreshold` (5) failures in a row (a status of 500 or more, or a `DataverseNetworkError`), it refuses requests with the new `DataverseCircuitOpenError` (`retryAfterMs`) for `breakDurationMs` (30 s), without sending them. Then it lets one probe through: success closes the circuit, failure opens it again. A 429, another 4xx, or a request its caller aborted is not a failure. `isFailure` replaces the rule. `state`, `consecutiveFailures`, `onStateChange` and `reset()` expose it for telemetry. Added with `middleware.append`, once the circuit opens, retries stop at once.
  - **`BulkheadMiddleware`.** It limits requests in flight per category, on top of the client's concurrency limit: `limits` (e.g. `{ read: 8, write: 2 }`; GET and HEAD are `"read"`, the rest `"write"`), `defaultLimit`, and `categorize(request)` for your own categories (e.g. per entity set). Requests over the limit wait (abortable). Beyond `maxQueue` waiting, they are refused with the new `DataverseBulkheadRejectedError`. Per request: `{ type: "bulkhead", category }` or `{ type: "bulkhead", bypass: true }` (`BulkheadRequestOptions`).
  - `CircuitBreakerOptions` and `BulkheadOptions` reuse the names of the 1.x no-op option types removed in #285, with new fields.

- 9d1e26d: Request builder ergonomics (#49).

  - **`prefer()` keeps the chain.** The `PreferBuilder` that `prefer()` returns has `done()`, which returns the request builder: `client.api("accounts").prefer().allAnnotations().done().get()`. `prefer((p) => p.allAnnotations().maxPageSize(50))` configures it in a callback and returns the request builder. Calling `prefer()` again adds to the same preferences.
  - **`expand()` takes options.** An `ExpandOptions` object (`select`, `filter`, `orderBy`, `top`, nested `expand`) after a navigation property gives that expansion its options: `.expand("primarycontactid", { select: ["fullname"] })` sends `primarycontactid($select=fullname)`. Before, the object was stringified to `[object Object]`.
  - **`expand()` calls add up.** Each call now adds to `$expand` instead of replacing it, so xrm's one call per expansion keeps them all.

- 78e7716: Impersonation by Microsoft Entra object id (#48). `impersonate(id, { by: "aadObjectId" })` and `impersonateByObjectId(objectId)` send `CallerObjectId`, which Microsoft recommends because the object id is the same in every environment. `impersonate(id)` still sends `MSCRMCallerID` with a `systemuserid`. Exactly one of the two headers is sent: a later call replaces an earlier one, and a request that would carry both, for example one added with `.header()`, is refused with `DataverseInvalidRequestError` before it is sent.
- a32fd68: A caller's `AbortSignal.timeout()` now rejects with an SDK error (#282).

  - **Reported like `timeoutMs`.** When the `signal` you pass times out, the request rejects with `DataverseNetworkError` named `RequestTimeout`, the same error as the client's own `timeoutMs` deadline. It carries the request's `correlationId`, and the signal's `TimeoutError` is its `cause`. Before, the `TimeoutError` from `fetch` came through as a raw `DOMException`, and a timeout during a retry wait or the wait for a concurrency slot was reported as `DataverseAbortError`.
  - **Every wait.** Retry waits and the wait for a concurrency slot now reject with the signal's `TimeoutError`, as `fetch` does. A fetch provider that rejects with a plain `AbortError` is recognised by the signal's reason.
  - `DataverseNetworkError.timeout(timeoutMs?, cause?)`: both arguments are optional. Without `timeoutMs` the message is `"Request timed out"`.
  - A plain `abort()` is still a `DataverseAbortError`.

- e606f24: Change tracking (#319).

  - **`trackChanges()`** on the request builder sends `Prefer: odata.track-changes`, follows `@odata.nextLink` through every page and returns `TrackedChanges<T>`: `changed` rows, `deleted` rows (`{ id, reason }`, from the `$deletedEntity` entries) and the `deltaLink` to save. `$filter`, `$orderby`, `$expand` and `$top`, which Dataverse doesn't support with change tracking, reject before anything is sent; a response without a delta link (change tracking off for the table) rejects with `NoDeltaLink`.
  - **`client.changesSince(deltaLink)`** returns what changed since an earlier sync, across every page, and the next delta link (the same one when Dataverse returns none).
  - **Page by page.** `iterateChanges()` and `client.iterateChangesSince(deltaLink)` yield one `TrackedChangesPage<T>` at a time, lazily; the last page carries the delta link. `maxPageSize` sets `odata.maxpagesize`.
  - **`isDeltaLinkExpired(err)`** recognises `ExpiredVersionStamp` (`0x80044352`), Dataverse's answer to a delta link older than the org keeps changes (7 days by default): run `trackChanges()` again.

- afb5242: `createAndGetId()` no longer hangs, and works with `Prefer: return=representation` (#289).

  - **No hang.** It released the response body with `await res.body?.cancel()`. When middleware (such as a logger that reads bodies) had tee'd the body, that cancel never settled, so the call never returned. The body is now released without waiting, as #241 did in metadata.
  - **`return=representation`.** Such a create is answered `201 Created` with the record in the body and no `OData-EntityId` or `Location` header. New `primaryIdAttribute` option (`CreateAndGetIdOptions`, which extends `RequestOptions`): `createAndGetId(body, { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" })` reads the id from the body. The headers win when both are present. Without the option, such a create rejects with `DataverseInvalidRequestError`, and the message says to pass `primaryIdAttribute`. The name matches `entityIdFromBatchResponse(part, { primaryIdAttribute })` in the batch package.
  - `entityIdFromResponse()` throws a `DataverseInvalidRequestError` whose message explains that a `return=representation` response has the id in its body. Before, it was a `MissingParameter` error.

- 7096f24: FetchXML queries (#51).

  - **`fetchXml()`** on the request builder and the client (`client.fetchXml("accounts", xml)`) runs a FetchXML query and returns one `FetchXmlPage<T>`: `value`, `pagingCookie`, `moreRecords`, `totalRecordCount`, `totalRecordCountLimitExceeded` and `nextLink`. It sends `Prefer: odata.include-annotations="*"` by default, so records carry formatted values; `annotations` asks for less, and `Microsoft.Dynamics.CRM.*` is always included so the paging annotations come back. The query is encoded with `encodeURIComponent`.
  - **Long queries.** A query whose GET URL would be longer than `maxUrlLength` (default 32,768 characters) is sent as a `POST $batch` that carries the GET, and returns the same page.
  - **Views.** `savedQuery(id)` and `userQuery(id)` run a system or personal view as one page.
  - **Paging helpers.** `parsePagingCookie(annotation)` reads the page number and decodes the cookie; `buildPagedFetchXml(xml, { page, pagingCookie, count })` sets them on the `<fetch>` element. Both are pure.

- 08efbd7: OData literal helpers (#53).

  - **`odataLiteral`** formats values for keys, function parameters and filters: `string` (wraps in `'` and doubles every embedded `'`), `guid` (unquoted; anything but a GUID throws), `int`, `number`, `bool`, `datetime`, `date`, `enum` (including flags) and `value` (picks one from the JavaScript type). A value that doesn't fit throws `DataverseInvalidRequestError` (`InvalidParameter`) instead of producing a broken URL.
  - **`odataKey(key)`** formats a record key: a GUID (braces removed), or an alternate key object such as `{ accountnumber: "O'Brien" }` → `accountnumber='O''Brien'`, percent-encoded so it is safe in a URL path. Other strings are used as written.
  - **Core uses them.** `bind()`, `client.bind()`, `associate()` and `disassociate()` accept an alternate key object as well as a GUID, and format the key with `odataKey`. The `odata` filter helpers write their values with `odataLiteral`: `eq`/`ne`/`gt`/`ge`/`lt`/`le` also take a `Date`, and a non-finite number now throws instead of producing `NaN` in the filter.

- 63ee065: `timeoutMs` now limits the whole request, and abort listeners no longer leak (#46).

  - **A deadline for the whole request.** `timeoutMs` starts when the request is sent and covers every attempt, every retry wait (including `Retry-After`) and the wait for a concurrency slot. Before, it applied to each attempt, so a "10 s timeout" with retries could take minutes. When it passes, the request rejects with `DataverseNetworkError` (`RequestTimeout`).
  - **`attemptTimeoutMs`** (new, on `RequestOptions` and `RequestInformation`) limits a single attempt. A timed-out attempt is not retried.
  - **Waiting for a slot can be cancelled.** A request queued for a concurrency slot now leaves the queue when its signal aborts or its deadline passes. An already-aborted request no longer reaches `fetch`.
  - **No listener leaks.** Signals are combined with `AbortSignal.any()` where it exists, and otherwise detached when the attempt ends. Retry waits remove their abort listener when they finish. A long-lived signal shared by many requests no longer gains a listener per request.

- 39b3917: New `diagnosticHeaders` client option (#13). The SDK's own request headers (`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, and `retry-attempt` on retries) were always sent. They are still sent by default; `diagnosticHeaders: false` turns all of them off, and an object (`{ sdkVersion, correlationId, featureUsage, retryAttempt }`) turns them off one by one. Telemetry keeps the correlation id when its header is off. The README's browser section explains the CORS side.
- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- 2bb4ed3: The fluent builder can now read any response, not only JSON (#11).

  - `get()`, `post()`, `patch()`, `put()` and `delete()` resolve `undefined` for `204 No Content` or an empty body; before, `get()` threw `SyntaxError: Unexpected end of JSON input`. A non-JSON body rejects with `DataverseInvalidRequestError` (`name: "UnexpectedContentType"`), which points at the new methods below.
  - New terminals: `text()`, `blob()` and `arrayBuffer()` for `$metadata`, `$value` and other non-JSON content.
  - New `response(method?, body?, options?)` returns the raw `Response` (status, `ETag`, `OData-EntityId`, `Preference-Applied`, `x-ms-service-request-id`) and doesn't reject on non-2xx.
  - New `createAndGetId(body)` returns the new record's id from `OData-EntityId`, without needing `Prefer: return=representation`.
  - New export: `entityIdFromResponse(res)`.

- 7b1ef12: `DataverseClient.send()` now accepts URLs relative to the Web API root, such as `"WhoAmI"`, `"/accounts(…)"` or `"$batch"`; absolute `http(s)://` URLs are unchanged (#31). Before, a relative URL threw `TypeError: Invalid URL`. New public `client.resolveUrl(path)` returns the absolute URL that `send()` and the fluent builder use. `apiVersion` now accepts any `vX.Y` version (for example `"v9.1"`), not just `"v9.2"`. New type export: `ApiVersion`.
- 0bfa5fe: **Behaviour change:** retries no longer replay non-idempotent requests after 502, 503 or 504 (#12). A gateway error can arrive after Dataverse has already applied the request, so retrying a create, an action, a `$batch` or an unconditional PATCH could apply it twice. These requests are retried after a server error:

  - GET, HEAD, OPTIONS, PUT and DELETE;
  - PATCH that carries `If-Match`.

  A **429 is still retried for every method**, because Dataverse rejects a throttled request before doing any work. To restore the old behaviour, set `retry: { retryNonIdempotent: true }` on the client, or `{ type: "retry", retryNonIdempotent: true }` per request.

- 02038b3: Per-request middleware options now reach the middleware (#16). `RequestOptions.middlewareOptions` was declared, and `RetryMiddleware` read `ctx.middlewareOptions`, but nothing ever passed the option through, so every per-request override was ignored. Pass `middlewareOptions: new MiddlewareRequestOptions([...])` to builder terminals or `execute()`, or set it on the `RequestInformation` given to `send()`:

  - `{ type: "retry", maxRetries, baseDelayMs, retryableStatusCodes }` overrides the client's retry settings for that request. Fields you leave out keep the client's value.
  - `{ type: "concurrency", bypass: true }` skips the concurrency queue.
  - `{ type: "telemetry", disable: true }` sends no diagnostic headers and tracks nothing; `customProperties` are added to the tracked dependency.
  - `{ type: "logging", disable: true }` (or a `logLevel` above `debug`) keeps the request out of the logger.

- 7e13e73: Every request now gets its own middleware context (#15). Before, a `DataverseClient` created one context and shared it across all requests, so every request from a client carried the **same `x-ms-correlation-id` for the client's lifetime**, and concurrent requests overwrote each other's retry-attempt numbers in logs and telemetry. Each request now has a fresh correlation id, which stays the same across its retries. Feature-usage flags are tracked per client instead of in a process-wide tracker. You can pass your own correlation id with the new `correlationId` field on `RequestInformation` (for `send()`) and on `RequestOptions` (for builder terminals and `execute()`).
- ac42045: **Security:** the bearer token is now attached only to requests for the client's own origin (#8). Before, `AuthMiddleware` added `authorization: Bearer …` to every request, including absolute URLs passed to `client.api()` / `client.send()` and any `@odata.nextLink`. A pasted URL, a crafted nextLink or a consumer bug could therefore send the user's Dataverse token to another host.

  - By default, a request to another origin (another host, a look-alike subdomain, plain `http:`, another port) or to a URL containing user info is rejected with `DataverseInvalidRequestError` (`name: "TokenOriginRefused"`), before any token is acquired or request is sent. That includes paging that follows a foreign `@odata.nextLink`.
  - New option `allowedTokenOrigins: string[]` lets other origins receive the token on purpose.
  - New option `onForeignOrigin: "strip"` sends foreign requests without the `authorization` header, instead of throwing.

  This is a behaviour change only for callers who sent the client's token to another origin on purpose; they should set `allowedTokenOrigins`.

- 1ca3a58: Function-backed, CRUD and batch messages (#344).

  - **A message for each Web API function** of the platform, Sales and Customer Service: `WhoAmIRequest`, `RetrieveEntityRequest`, `RetrieveUserPrivilegesRequest`, `RetrievePrincipalAccess_systemuserRequest`, … (209 of them; the `$filter` query functions such as `LastXDays` aren't messages). Each sends the same `GET` with parameter aliases as the functions package's class, takes its parameters as one object kept in `Parameters`, and `response.result` is the function's value, as for the action-backed messages. Where a complex type has the name of a function message's response or result (`CalculateTotalTimeIncidentResponse`, `ValidateFetchXmlExpressionResult`), the package root exports the message's type under that name.
  - **CRUD messages:** `CreateRequest` (`response.id`), `RetrieveRequest` (`response.Entity`), `UpdateRequest` (with `If-Match`, so it never creates), `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and `RetrieveMultipleRequest` (a FetchXML query; `response.EntityCollection`). A record is an `EntityReference`; a new record is the Web API payload with `@odata.type`. An Associate or Disassociate of several records is one `$batch` change set.
  - **`ExecuteMultipleRequest` and `ExecuteTransactionRequest`**, over `$batch`: ExecuteMultiple sends one part per request (`Settings.ContinueOnError` sends `Prefer: odata.continue-on-error`) and resolves an item per request that ran, with its `Response` or its `Fault`, and `IsFaulted`; ExecuteTransaction sends one change set, resolves each request's response in order, and rejects with the failed request's error. Any message, action or function class can be one of their `Requests`. The messages package now depends on `@mohsinonxrm/dataverse-sdk-batch` for the `$batch` codec.
  - **core:** `Executable` has an optional `parsesErrorResponses` flag. When it's `true`, `client.execute()` passes an error response (status 400 or more) to `parseResponse` instead of rejecting with the error read from it: Dataverse answers a `$batch` that stopped at a failure with that failure's status, and the body still holds the responses of the requests that ran.

- 254a8ec: No `any` in the public API. **Breaking for TypeScript callers.**

  - **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
  - **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
  - **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
  - **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.

- dd2acd8: One `DataverseBatchError`. Core now holds the class (with `partErrors`, `requestErrors`, `result` and the request helpers) and the batch package re-exports it, so `err instanceof DataverseBatchError` is true whichever package it is imported from. `execute()` still throws it with `result`, and now also fills `partErrors`. Core's constructor accepts both its old short form and the batch form.
- 652ad75: One OData literal serializer (#254).

  - **Core** adds `odataLiteral.parameter(value, odataType, kind?)`, which writes an operation parameter from its OData type, and the helpers it needs: `odataLiteral.json` (record references become `@odata.id`), `odataLiteral.reference`, `odataLiteral.recordPath`, `odataLiteral.duration` and `odataLiteral.binary`. `odataLiteral.enum` also splits a string on commas (`"Entity, Attributes"`). New types: `ODataParameterKind`, `ODataRecordReference`.
  - **entities-runtime** `formatParameterAlias` and `formatRecordPath`, and the generated `internal/odataLiteral.ts` in the functions package, now call core instead of holding their own copies. Their names and signatures are unchanged.
  - Values the Web API can't read now throw `DataverseInvalidRequestError` before the request instead of being written through: a GUID that isn't one (the Web API answered 500), `NaN` or `Infinity` (written as `null`), a fraction for an integer type, a date-time without a zone, an enum member with a quote, an invalid duration or base64 text. A `bigint` for `Edm.Int64` is written in full (it used to throw a `TypeError`).

- 329c0b0: The middleware pipeline can be customised, and `defaultPrefer` works (#18).

  - New client option `middleware: { prepend?, append?, replace? }`. `replace` receives the built-in middleware list and returns the one to use (for example without `LoggingMiddleware`). `prepend` runs first; `append` runs last, right before `fetch`, so it sees the final headers including `authorization`.
  - `Pipeline`, `FetchRequestAdapter`, `buildDefaultMiddleware` and the built-in middleware classes (`AuthMiddleware`, `ODataHeadersMiddleware`, `ConcurrencyMiddleware`, `RetryMiddleware`, `TelemetryMiddleware`, `LoggingMiddleware`) are exported.
  - `defaultPrefer` was declared but never applied. It is now added to every request's `Prefer` header. Preferences are matched by name, and a request's own value for the same preference wins.
  - The README's middleware docs now show the real option, signature and order.

- 365ceca: Remove the deprecated and no-op options (#285). Passing any of them is now a type error.

  - **core, retries:** `RetryOptions.delay` is removed: use `baseDelayMs`. `RetryOptions.useExponentialBackoff` is removed: it had no effect, because backoff is always exponential.
  - **core, client options:** `circuitBreaker` and `bulkhead` are removed, with their `CircuitBreakerOptions` and `BulkheadOptions` types. They were never implemented and only logged a warning. Circuit breaker and bulkhead middleware are planned in #100; until then, add your own through the `middleware` option.
  - **core, errors:** `DataverseError.statusCode` is removed: read `status`.
  - **otel:** `OpenTelemetryConfig.serviceName` is removed. It was ignored. `service.name` is a resource attribute: set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).

- 61bd4aa: Retry controls now work as documented (#17).

  - **`Retry-After` is capped.** New `retry.maxRetryAfterMs` (default: `maxDelayMs`, 30 s). When the server asks for a longer wait, the response is returned at once instead of sleeping (a 429 throws `DataverseThrottleError` with `retryAfterMs`), so the caller decides whether to wait. Set `Infinity` to keep the old behaviour. A `Retry-After` within the cap is waited out exactly, without jitter.
  - **Jitter is applied** (±20%) to the computed backoff whenever `jitter` is true (the default). Before, it needed an option the client options could not set.
  - **One `RetryOptions` type** for the client and per request: `maxRetries`, `baseDelayMs`, `maxDelayMs`, `maxRetryAfterMs`, `jitter`, `retryableStatusCodes`, `retryNonIdempotent`, `retryNetworkErrors`, `shouldRetry`.
  - **One `Retry-After` parser** (`parseRetryAfter`), used by the retry middleware and by the error parser: delta-seconds including decimals (`"1.5"` is 1500 ms) and HTTP-dates. Values like `"-5"` or `"12abc"` are now ignored instead of being read as numbers.
  - **Network errors:** when `fetch` rejects with a `TypeError` (DNS, TLS, dropped connection, CORS), the SDK now throws `DataverseNetworkError` named `ConnectionFailed`, with the original error as `cause`. With the new `retry.retryNetworkErrors: true`, idempotent requests are retried with backoff. Aborts and timeouts are never retried.

- 4e804b4: Retries can be observed (#32). New `retry.onRetry(info)` (client or per request) runs once before each retry with the attempt number, `maxRetries`, the status (0 for a network error), the delay, `retryAfterMs`, the correlation id and the request, so a UI can show "Throttled, retrying in 12 s (2/6)". An error thrown by the hook is logged and ignored. New `getRetryAttempts(res)` returns the attempt history behind a response from `send()` or `response()`.
- b040687: Idempotent requests are retried after a dropped connection by default (#351). **Breaking.**

  When `fetch` itself fails (a `DataverseNetworkError` named `ConnectionFailed`, such as a reset socket), GET, HEAD, OPTIONS, PUT, DELETE, and PATCH with `If-Match` are now retried with the same backoff and `maxRetries` as a 503. Before, the error was thrown at once unless `retry.retryNetworkErrors` was `true`.

  - POST and other PATCHes still aren't retried after a network error, because the connection can drop after Dataverse applied the request. `retryNonIdempotent: true` alone doesn't change that. They are retried only when `retryNetworkErrors: true` is set as well.
  - `retry: { retryNetworkErrors: false }` restores the 1.x behaviour (the error is thrown at once), for the client or for one request.
  - Aborts, timeouts and requests with a stream body are never retried.
  - The files client's `UploadBlock` requests are resent after a dropped connection only when the client sets `retryNetworkErrors: true`, as before.

- 496b4cb: Land the repository review fixes.

  - `DataverseClient` now rejects non-HTTPS base URLs with `DataverseInvalidRequestError` (`InvalidBaseUrl`). Plain `http://` is still allowed for `localhost`, `127.0.0.1` and `[::1]`.
  - `getAll({ maxPages })` now stops after `maxPages` requests (previously the limit was ignored), and `maxItems` stops paging as soon as it is reached.
  - A request that exceeds `timeoutMs` now rejects with `DataverseNetworkError` (`RequestTimeout`) instead of a raw `AbortError`.
  - `iterate()` and `getPage()` accept a `signal`, which is passed to every follow-up page request.
  - New `odata` filter helper (`odata.eq`, `contains`, `and`, …) that escapes single quotes in string literals.
  - `AccessTokenProvider.getToken()` now declares `scopes` as optional, which matches every built-in provider.
  - **Behaviour change:** `bindMany()` no longer loads the batch package with `new Function("import(...)")`, which failed under a strict Content-Security-Policy and in bundlers. To send the associations as one `$batch`, pass an executor: `bindMany(nav, entitySet, ids, createBindManyExecutor())`, using the new `createBindManyExecutor` from `@mohsinonxrm/dataverse-sdk-batch`. Without an executor, `bindMany()` sends one request per id (#20).

- d3a1a01: The SDK no longer writes to the console by default (#33). Without a `logger` option, nothing is logged. Before, every request wrote two `console.debug` lines with its full URL, including filters and record ids.

  - `ConsoleLogger` is now an exported class: `new ConsoleLogger()` (or `new ConsoleLogger({ level: "warn" })`) opts in to console output. It passes the meta object as its own argument, so the console shows the object instead of `[object Object]`.
  - Request logs show URLs as origin and path, with key values in parentheses as `(…)` and the query as `?…`. Set the new `logging: { fullUrls: true }` client option to log full URLs.
  - The request log meta is now structured: `{ attempt, status, durationMs }`, with `attempt` as a number.

- 2d4323f: Small API additions (#274):

  - core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
  - discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
  - batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.

- e237826: Telemetry is redacted, guarded and reports the real SDK version (#35, #36).

  - **Redacted URLs.** `trackDependency` and `trackException` used to receive the full request URL, including filters, record ids and alternate keys. They now get origin and path, with GUID keys as `({id})`, other keys as `(…)` and the query as `?…`. Request logs use the same redaction. The new client option `redactUrl: (url: URL) => string` replaces it, and `defaultRedactUrl` is exported. Dependencies now also carry `target` (the host).
  - **Never throws.** A telemetry client whose `trackDependency` or `trackException` throws no longer fails the request or replaces its error. The failure is logged with `logger.warn` and dropped.
  - **`TELEMETRY_ENABLED`** in `x-ms-feature-usage` is now set only when a telemetry client is configured.
  - **`SDK_VERSION`** is injected from `package.json` at build time and exported. `x-ms-sdk-version` and the `sdk.version` telemetry property used to report `0.1.0`.

- a464f3a: One error model (#19). There were two unrelated `DataverseError` classes, so `err instanceof DataverseError` was false for authentication, invalid-request and network errors. Now every error the SDK throws extends the exported `DataverseError`.

  - **Base fields.** `DataverseError` has `status`, `code`, `message`, `headers` (lower-cased names), `body` (parsed JSON or text; also `raw`), `innerError` (`message`, `type`, `stacktrace`), `requestId`, `correlationId`, `cause` and `date`.
  - **HTTP errors** (`DataverseODataError`, `DataverseThrottleError`) now carry the response headers, Dataverse's `innererror`, and the correlation id the SDK sent.
  - **`requestId`** is read from `x-ms-service-request-id`, then `REQ_ID`, then the older `req-id` / `x-ms-request-id`.
  - **Aborts.** A cancelled request, including one cancelled during a retry wait, now throws `DataverseAbortError` instead of a raw `DOMException`. Its `name` is still `"AbortError"`, and the original error is its `cause`. Network failures were already `DataverseNetworkError` (#17), and every SDK error from `send()` now carries the request's `correlationId`.
  - **Cleanup.** The unused duplicate `DataverseBatchError` inside `NamedErrors` is removed (the exported one is unchanged). The README's error section uses the real property names and hierarchy.

- b1bd587: `waitForAsyncOperation(client, job, options?)` waits for a system job (`asyncoperation`): bulk delete, `ExecuteWorkflow`, `ImportSolutionAsync`, data import and so on (#318).

  - **Input.** The job's id, or the response that names it: `{ JobId }`, `{ AsyncOperationId }` or the `asyncoperation` record. `null` and values that aren't GUIDs throw `DataverseInvalidRequestError` before anything is sent.
  - **Polling.** It reads `asyncoperations(<id>)` through the client (so retry, concurrency and auth apply): at once, then after `intervalMs` (2 s), each wait `backoff` (1.5) times longer, up to `maxIntervalMs` (30 s). `onProgress` sees every read; `select` adds columns; `requestOptions` apply to every read.
  - **Outcome.** It resolves with the job when it succeeds. A failed or canceled job rejects with the new `DataverseAsyncOperationError` (`reason` `"failed"` or `"canceled"`, the job's `friendlymessage` as the message, its `errorcode` in hex as `code`, and the job as `operation`). `timeoutMs` rejects with `reason: "timeout"`, and `signal` with `DataverseAbortError`; the job itself keeps running.
  - `AsyncOperationStateCode` and `AsyncOperationStatusCode` name the job's `statecode` and `statuscode` values.

### Patch Changes

- f900b0c: A `$batch` POST answered with HTTP 429 and a `multipart/mixed` body is no longer replayed (#211). A 429 is normally safe to retry, because Dataverse rejects a throttled request before doing any work. A multipart body, though, carries per-request results, so some parts may already have run, and replaying the batch would run them again. The response is handed back instead. A 429 with the usual JSON error body is still retried. `retryNonIdempotent: true` or a custom `shouldRetry` restores the old behaviour.
- b1f2738: The retry middleware now cancels the body of every response it retries (#45). Before, a 429 or 5xx response that was retried was dropped unread, and in Node.js (undici) an unread body keeps its connection busy until garbage collection, which can exhaust the connection pool under sustained throttling. The response handed back to the caller is left unread, as before.
- eb27877: A request waiting to be retried no longer holds a concurrency slot (#44). `RetryMiddleware` now runs outside `ConcurrencyMiddleware`, so each attempt takes a slot and releases it when its response arrives. Before, a request sleeping on `Retry-After` or a backoff kept its slot for the whole wait, so with the defaults a throttling burst could block every slot for minutes while other requests queued behind it. `x-ms-dop-hint` adaptation is unchanged. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging; a `middleware.replace` callback receives the defaults in that order.
- 60ccef3: With `.detectDuplicates()`, only a duplicate-detection 412 is a `DataverseDuplicateError` (#50). Before, every 412 was, so an optimistic-concurrency failure (`.ifMatch()` with a stale etag, code `0x80060882`) was reported as a duplicate. A duplicate is now recognised by Dataverse's code `0x80040333` (checked live), or by `innererror.duplicaterecords` when present; any other 412 is the usual `DataverseODataError` with its code. A 412 body that isn't JSON no longer makes the error handling itself throw.
- 6b0dc00: Paging fixes (#47).

  - **`iterate()` is lazy.** It sends nothing until the first `next()`. Before, the first request went out as soon as `iterate()` was called, so an iterable that was never consumed still sent a request and could leave an unhandled rejection.
  - **Later pages carry the first request's headers.** Pages after the first, from `iterate()`, `getAll()` or `PageIterator`, are requested with the first request's `Prefer`, impersonation and custom headers. `odata.maxpagesize`, formatted values and `MSCRMCallerID` now hold on every page; before, page 2 onward came back at the default page size, without annotations, and as the calling user. `If-Match` / `If-None-Match` are sent with the first page only.
  - **Other additions.** `getAll()` accepts a `signal`. `PageIterator` takes an optional fourth `headers` argument.

- 1848068: Query options are encoded with `encodeURIComponent` semantics, and a caller's own query string is left as written (#52). `buildUrl` used `URLSearchParams`, which wrote spaces as `+` and `$`, `,`, `:` and `@` as `%XX`, and re-serialized the whole query string, including the part the caller had already encoded. Now builder options read like Microsoft's examples (`$filter=name%20eq%20'x'`), and a query string in the path is kept exactly; only an option the builder sets again replaces the one there. Dataverse accepted both forms (checked live), so requests that worked keep working; URLs in logs are easier to read.
- c3337f8: `text()`, `blob()` and `arrayBuffer()` now send `Accept: */*` unless the caller set an `Accept` header (#210). They used to inherit the default `Accept: application/json`, so `client.api("$metadata").text()` failed with HTTP 415 ("A supported MIME type could not be found"). JSON terminals still send `application/json`.
- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- c426eac: Fix duplicated request headers (#9). Header names are now lower-cased once, when `DataverseClient.send()` is called, and in `execute()` option merging. A caller's `Content-Type`, `Accept`, `Prefer` or `Authorization` therefore replaces the SDK's default instead of being sent next to it. Before, `fetch` combined the two casings into one value, for example `Content-Type: application/json, application/json; charset=utf-8`, and **Dataverse rejected those requests with HTTP 400 `0x80048d19`**. That included every generated action call. `send()` also no longer mutates the caller's `RequestInformation`. New export: `normalizeHeaders()`.
- 4f96909: Fix request bodies being JSON-stringified whatever their type (#7). Plain objects and arrays are still serialised to JSON. Strings, `ArrayBuffer`, typed arrays and `DataView`, `Blob`, `FormData`, `URLSearchParams` and `ReadableStream` now reach `fetch` unchanged, so raw JSON text, multipart `$batch` bodies, XML and binary file content are sent byte for byte. A typed-array view sends only its own bytes. The default `content-type: application/json; charset=utf-8` is added only for JSON-serialised bodies and strings, and never overrides the caller's. Stream bodies are sent half-duplex and never retried. New type export: `RawBody`.
- e3dcff1: Fix `validateUrl` rejecting valid queries (#10). The 260-character segment limit now applies to URL **path** segments only, and percent-encoded segments are measured by their decoded length. Before, everything after the last `/` counted as one segment, including the whole query string, so a long `$filter`, `$select`, FetchXML or nextLink threw `DataverseUrlError` unless the caller used `.skipUrlValidation()`. The 32,768-character limit on the whole URL still applies.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 608d915: URL redaction for logs and telemetry (`defaultRedactUrl`) now runs in linear time. Its regex could backtrack polynomially on a path such as `((((…`, so a crafted URL could stall the request thread (CodeQL js/polynomial-redos). The results are unchanged.
- 9728b8c: `associate()`, `disassociate()` and `bindMany()` now send their `$ref` requests with the builder's impersonation (`MSCRMCallerID` / `CallerObjectId`) and custom headers (#355). Before, `client.api(…).impersonate(userId).associate(…)` ran as the calling identity. They also take request options (`signal`, `timeoutMs`, `headers`, `correlationId`, …) as a last argument.

  A `BindManyExecutor` receives those headers and options as a sixth argument, and `createBindManyExecutor()` from the batch package sends them on its `$batch`. It also does nothing for an empty list (it used to throw "Cannot execute empty batch"), associates an id listed twice once, and formats keys the way `associate()` does (`odataKey`).

- 6df2528: `serializeContent()` sends only a typed-array view's own bytes (#34). It used to send the view's whole underlying buffer (`Buffer.from(view.buffer)`), so `new Uint8Array(buf, 10, 5)` or a `subarray()` sent every byte of `buf`: wrong data, and possibly unrelated bytes. It now uses the same rules as the client's request bodies, and detects types with `instanceof` / `ArrayBuffer.isView` instead of `constructor.name`. Its return type is now `BodyInit`.

## 2.0.0-beta.1

### Major Changes

- ff655da: **Breaking.** Telemetry events and W3C trace context (#97).

  - **`TelemetryClient.trackDependency` is replaced by `startDependency(name, data)`** (core). The SDK calls it before each request attempt and calls `end(data)` on the `DependencyHandle` it returns once the attempt is done, with `durationMs`, `success` and `resultCode`. The handle can carry `headers` (`traceparent`, `tracestate`), which the SDK sends with the attempt, and `run(fn)`, which makes the dependency the active span while the attempt runs. A custom client moves its `trackDependency` body into `end` (see the 2.0 migration guide). Each retry and each resend after a 401 is its own dependency, started in the caller's context.
  - **Trace context goes to Dataverse.** Only a valid `traceparent` and its `tracestate` are sent, only to origins that may receive the access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or the new `diagnosticHeaders: { traceContext: false }` turns it off.
  - **Events.** `trackEvent` now receives `dataverse.throttle` (each 429, with the limit hit, `Retry-After` and `x-ms-dop-hint`), `dataverse.retry` (before each retry wait), `dataverse.concurrency.wait` (a request waited for a slot) and `dataverse.concurrency.limit` (`x-ms-dop-hint` changed the limit). The names are exported as `TelemetryEvents`. A request with telemetry turned off sends none.
  - **`DataverseClient.trackEvent(name, props, measurements)`** sends an event to the client's telemetry, guarded like the SDK's own calls. The batch package uses it to report `dataverse.batch` for each `$batch` (requests, succeeded, failed, duration, status, correlation id); `execute()` now generates the `$batch` correlation id itself when you don't pass one.
  - **otel and appinsights:** `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` implement `startDependency`: the CLIENT span starts with the active context, is active while the attempt runs (so `fetch` auto-instrumentation spans are its children), carries `http.request.resend_count` on retries, and its context is injected with the registered propagator, so the request carries its `traceparent`. `trackDependency` is removed from both.

### Minor Changes

- 9bb1db9: `AdaptiveThrottlingMiddleware`: slow down before Dataverse throttles, from its service-protection headers (#309). It is opt-in: add it with `middleware: { append: [new AdaptiveThrottlingMiddleware()] }`.

  - **Spacing.** It reads `x-ms-ratelimit-burst-remaining-xrm-requests` (requests left in the 5-minute window, e.g. `7999`) and `x-ms-ratelimit-time-remaining-xrm-requests` (execution time left, e.g. `1,200.00`) from every response. When either falls below `threshold` (0.2) of its full value (the highest seen, or `requestBudget` / `timeBudget`), request starts are spaced out by up to `maxSpacingMs` (2 s) as the budget nears empty.
  - **Pause after a 429.** A 429 with `Retry-After` holds every new request until the wait has passed (`pauseOnRetryAfter`, default on, capped by `maxPauseMs`, 30 s).
  - `status` reports the budgets, the pressure and the current spacing; `onDelay` is told about each request held back.
  - Microsoft documents the headers as being for debugging and each web server counts on its own, so this is a soft brake: the retry middleware still handles 429s. In browsers the headers aren't readable, so only the pause after a 429 applies.

- 83f2256: `ChaosMiddleware`: fault injection for testing how an app copes with throttling and outages, modelled on the Microsoft Graph SDK's `ChaosHandler` (#308). It is opt-in and never part of the default pipeline: add it with `middleware: { append: [new ChaosMiddleware(options)] }`.

  - **Faults.** It answers a share of requests itself (`percentage`, default 10) with a fault picked from `faults` (default 429 with `Retry-After: 1`, 502, 503, 504), without sending them. A fault is `{ status, retryAfterSeconds?, headers?, body? }`; `status: "network"` throws a `DataverseNetworkError` named `ConnectionFailed`, as a dropped connection does. The default body is a Dataverse error body (for a 429, the service-protection error `0x80072322`).
  - **Choosing requests.** `match` (a `RegExp` tested against the full URL, or a function) limits it to some requests; `script(request, { requestIndex, attempt })` decides per request instead of the percentage; `random` takes a seeded generator; `onFault` is told about each fault.
  - **Per request.** `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])` or `{ type: "chaos", fault }` (`ChaosRequestOptions`).

- f780438: Opt-in circuit breaker and bulkhead middleware (#343). Neither is in the default pipeline; add them with the `middleware` option.

  - **`CircuitBreakerMiddleware`.** After `failureThreshold` (5) failures in a row (a status of 500 or more, or a `DataverseNetworkError`), it refuses requests with the new `DataverseCircuitOpenError` (`retryAfterMs`) for `breakDurationMs` (30 s), without sending them. Then it lets one probe through: success closes the circuit, failure opens it again. A 429, another 4xx, or a request its caller aborted is not a failure. `isFailure` replaces the rule. `state`, `consecutiveFailures`, `onStateChange` and `reset()` expose it for telemetry. Added with `middleware.append`, once the circuit opens, retries stop at once.
  - **`BulkheadMiddleware`.** It limits requests in flight per category, on top of the client's concurrency limit: `limits` (e.g. `{ read: 8, write: 2 }`; GET and HEAD are `"read"`, the rest `"write"`), `defaultLimit`, and `categorize(request)` for your own categories (e.g. per entity set). Requests over the limit wait (abortable). Beyond `maxQueue` waiting, they are refused with the new `DataverseBulkheadRejectedError`. Per request: `{ type: "bulkhead", category }` or `{ type: "bulkhead", bypass: true }` (`BulkheadRequestOptions`).
  - `CircuitBreakerOptions` and `BulkheadOptions` reuse the names of the 1.x no-op option types removed in #285, with new fields.

- e606f24: Change tracking (#319).

  - **`trackChanges()`** on the request builder sends `Prefer: odata.track-changes`, follows `@odata.nextLink` through every page and returns `TrackedChanges<T>`: `changed` rows, `deleted` rows (`{ id, reason }`, from the `$deletedEntity` entries) and the `deltaLink` to save. `$filter`, `$orderby`, `$expand` and `$top`, which Dataverse doesn't support with change tracking, reject before anything is sent; a response without a delta link (change tracking off for the table) rejects with `NoDeltaLink`.
  - **`client.changesSince(deltaLink)`** returns what changed since an earlier sync, across every page, and the next delta link (the same one when Dataverse returns none).
  - **Page by page.** `iterateChanges()` and `client.iterateChangesSince(deltaLink)` yield one `TrackedChangesPage<T>` at a time, lazily; the last page carries the delta link. `maxPageSize` sets `odata.maxpagesize`.
  - **`isDeltaLinkExpired(err)`** recognises `ExpiredVersionStamp` (`0x80044352`), Dataverse's answer to a delta link older than the org keeps changes (7 days by default): run `trackChanges()` again.

- 1ca3a58: Function-backed, CRUD and batch messages (#344).

  - **A message for each Web API function** of the platform, Sales and Customer Service: `WhoAmIRequest`, `RetrieveEntityRequest`, `RetrieveUserPrivilegesRequest`, `RetrievePrincipalAccess_systemuserRequest`, … (209 of them; the `$filter` query functions such as `LastXDays` aren't messages). Each sends the same `GET` with parameter aliases as the functions package's class, takes its parameters as one object kept in `Parameters`, and `response.result` is the function's value, as for the action-backed messages. Where a complex type has the name of a function message's response or result (`CalculateTotalTimeIncidentResponse`, `ValidateFetchXmlExpressionResult`), the package root exports the message's type under that name.
  - **CRUD messages:** `CreateRequest` (`response.id`), `RetrieveRequest` (`response.Entity`), `UpdateRequest` (with `If-Match`, so it never creates), `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and `RetrieveMultipleRequest` (a FetchXML query; `response.EntityCollection`). A record is an `EntityReference`; a new record is the Web API payload with `@odata.type`. An Associate or Disassociate of several records is one `$batch` change set.
  - **`ExecuteMultipleRequest` and `ExecuteTransactionRequest`**, over `$batch`: ExecuteMultiple sends one part per request (`Settings.ContinueOnError` sends `Prefer: odata.continue-on-error`) and resolves an item per request that ran, with its `Response` or its `Fault`, and `IsFaulted`; ExecuteTransaction sends one change set, resolves each request's response in order, and rejects with the failed request's error. Any message, action or function class can be one of their `Requests`. The messages package now depends on `@mohsinonxrm/dataverse-sdk-batch` for the `$batch` codec.
  - **core:** `Executable` has an optional `parsesErrorResponses` flag. When it's `true`, `client.execute()` passes an error response (status 400 or more) to `parseResponse` instead of rejecting with the error read from it: Dataverse answers a `$batch` that stopped at a failure with that failure's status, and the body still holds the responses of the requests that ran.

- b1bd587: `waitForAsyncOperation(client, job, options?)` waits for a system job (`asyncoperation`): bulk delete, `ExecuteWorkflow`, `ImportSolutionAsync`, data import and so on (#318).

  - **Input.** The job's id, or the response that names it: `{ JobId }`, `{ AsyncOperationId }` or the `asyncoperation` record. `null` and values that aren't GUIDs throw `DataverseInvalidRequestError` before anything is sent.
  - **Polling.** It reads `asyncoperations(<id>)` through the client (so retry, concurrency and auth apply): at once, then after `intervalMs` (2 s), each wait `backoff` (1.5) times longer, up to `maxIntervalMs` (30 s). `onProgress` sees every read; `select` adds columns; `requestOptions` apply to every read.
  - **Outcome.** It resolves with the job when it succeeds. A failed or canceled job rejects with the new `DataverseAsyncOperationError` (`reason` `"failed"` or `"canceled"`, the job's `friendlymessage` as the message, its `errorcode` in hex as `code`, and the job as `operation`). `timeoutMs` rejects with `reason: "timeout"`, and `signal` with `DataverseAbortError`; the job itself keeps running.
  - `AsyncOperationStateCode` and `AsyncOperationStatusCode` name the job's `statecode` and `statuscode` values.

### Patch Changes

- f988456: README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.

## 2.0.0-beta.0

### Major Changes

- c262ad7: **Breaking.** `concurrency` settings now do what they say (#356):

  - `maxConcurrentRequests` is used exactly. Before, it was clamped to `min`/`max` (2 and 16 by default), so `maxConcurrentRequests: 1` still sent 2 requests at once and `32` sent 16.
  - When `maxConcurrentRequests` is set, `max` defaults to it, so the `x-ms-dop-hint` header can lower your limit but no longer raise it. Set `max` as well to let the hint raise it. Without `maxConcurrentRequests`, nothing changes: the limit starts at 8 and follows the hint within 2..16.
  - Settings that aren't whole numbers of at least 1, or don't fit `min <= maxConcurrentRequests <= max`, throw `DataverseInvalidRequestError` when the client is created.
  - The per-request `maxConcurrent` option (`MiddlewareConcurrencyOptions`), which was never read, is removed; `bypass` stays.

- 4c62fee: **Breaking.** Paging, telemetry and pipeline fixes (#378):

  - `search()` is removed: Dataverse's Web API doesn't support `$search`, so the request failed. Use Dataverse search (the `searchquery` message) for full-text search, or `$filter` with `contains()`.
  - `getAll()` and `iterate()` take `RequestOptions` (plus `maxItems` / `maxPages` for `getAll()`), and every page gets them: `signal`, `timeoutMs` and `attemptTimeoutMs` per page, `correlationId`, `middlewareOptions`, `headers` and `prefer`. Before, only `signal` was accepted. `getAll({ maxItems: 0 })` returns `[]` instead of everything.
  - `new PageIterator(client, firstPage, options)` takes request options as its third argument; it was a signal (and a fourth argument for headers).
  - Telemetry reports a 304 (and any status below 400) as a successful dependency, so `If-None-Match` reads no longer count as failures.
  - After a 401, the response body is released even when getting the new token throws.
  - `RequestInformation.idempotent` marks a request that can be replayed whatever its method. The FetchXML query that is sent as a `$batch` (a POST carrying one GET) uses it, so it is retried after a 502/503/504 or a dropped connection like the GET itself.

- d9eebf3: **2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

  - **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
  - **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
  - **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
  - **core, timeouts:** `timeoutMs` covers the whole request.
  - **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
  - **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
  - **core, removed options:** `RetryOptions.delay` and `useExponentialBackoff`, `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are gone (#285).
  - **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
  - **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
  - **xrm:** record ids must be GUIDs, and entity sets come from metadata. `execute()` infers its result from the request, and records are `EntityRecord` instead of `any`.
  - **discovery:** `OrganizationDetail` matches the v2.0 response.
  - **actions, functions, messages:**
    - constructors take one object with the parameters by name; a bound operation's record id or entity set comes first, and bulk operations take the entity set first (#96);
    - each binding of an overloaded operation has its own class, and the plain-name classes of bound-only operations are removed (#286);
    - one `EntityReference` for the whole SDK: `createEntityReference` returns the Web API shape and takes an options object (#295);
    - `client.execute()` resolves the operation's value, not the OData envelope: the entity (`null` for a 204), the array, the primitive, or nothing (#300);
    - `toRequestBody()` is removed.

  See each package's CHANGELOG for the full list.

- 3d4614d: **Breaking.** `$skip` is gone, because Dataverse doesn't support it: a request with `$skip` fails with 400 (#357).

  - core: `DataverseRequestBuilder.skip()` and `QueryState.$skip` are removed. Page with `@odata.nextLink`: `iterate()`, `getAll()`, or `getPage()` and then `client.api(nextLink).getPage()`, with `.prefer().maxPageSize(n)` for the page size.
  - xrm: `RetrieveMultipleOptions.skip` is replaced by `maxPageSize` (`Prefer: odata.maxpagesize`). Follow the result's `@odata.nextLink` for the next page.

### Minor Changes

- ca11ddf: 401 handling and a token per attempt (#21).

  - **A token per attempt.** `AuthMiddleware` now runs inside `RetryMiddleware`, so every attempt gets a current token from the provider. A retry after a long wait can no longer send an expired token. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging (Retry moved outside Concurrency in #44).
  - **One recovery after a 401.** The client gets a new token and resends the request once. A Conditional Access / CAE claims challenge in `WWW-Authenticate` is decoded and passed as `getToken(scopes, { claims })`; otherwise `getToken(scopes, { forceRefresh: true })` is called. A second 401 is returned as the error. Turn this off with `refreshTokenOn401: false`.
  - **Browsers.** Dataverse doesn't expose `WWW-Authenticate` to browsers, so there the recovery is always a forced refresh.
  - **New API.** `TokenOptions.forceRefresh` is new, and `getToken` now also receives the request's `correlationId`. `parseClaimsChallenge(header)` is exported.

- aec5a48: `bindMany()` works without the batch package, and `associate()` works against Dataverse (#20).

  - **`bindMany()` without an executor.** The executor argument is now optional. Without it, `bindMany()` sends one `POST …/{nav}/$ref` per id, in order, through the client's pipeline, and stops at the first failure. Pass `createBindManyExecutor()` to send a single `$batch` instead. No `eval` or `new Function` is involved, so it works under a strict CSP, and the browser smoke test checks that.
  - **`associate()` sends an absolute `@odata.id`.** Dataverse rejected the relative `/contacts(id)` it used to send with "the odata.context annotation is missing from the payload", so `associate()`, and with it `bindMany()`, never worked live. The batch package's `createBindManyExecutor()` gets the same fix.
  - **Lint.** `no-eval`, `no-new-func` and `@typescript-eslint/no-implied-eval` are now errors.

- 9d1e26d: Request builder ergonomics (#49).

  - **`prefer()` keeps the chain.** The `PreferBuilder` that `prefer()` returns has `done()`, which returns the request builder: `client.api("accounts").prefer().allAnnotations().done().get()`. `prefer((p) => p.allAnnotations().maxPageSize(50))` configures it in a callback and returns the request builder. Calling `prefer()` again adds to the same preferences.
  - **`expand()` takes options.** An `ExpandOptions` object (`select`, `filter`, `orderBy`, `top`, nested `expand`) after a navigation property gives that expansion its options: `.expand("primarycontactid", { select: ["fullname"] })` sends `primarycontactid($select=fullname)`. Before, the object was stringified to `[object Object]`.
  - **`expand()` calls add up.** Each call now adds to `$expand` instead of replacing it, so xrm's one call per expansion keeps them all.

- 78e7716: Impersonation by Microsoft Entra object id (#48). `impersonate(id, { by: "aadObjectId" })` and `impersonateByObjectId(objectId)` send `CallerObjectId`, which Microsoft recommends because the object id is the same in every environment. `impersonate(id)` still sends `MSCRMCallerID` with a `systemuserid`. Exactly one of the two headers is sent: a later call replaces an earlier one, and a request that would carry both, for example one added with `.header()`, is refused with `DataverseInvalidRequestError` before it is sent.
- a32fd68: A caller's `AbortSignal.timeout()` now rejects with an SDK error (#282).

  - **Reported like `timeoutMs`.** When the `signal` you pass times out, the request rejects with `DataverseNetworkError` named `RequestTimeout`, the same error as the client's own `timeoutMs` deadline. It carries the request's `correlationId`, and the signal's `TimeoutError` is its `cause`. Before, the `TimeoutError` from `fetch` came through as a raw `DOMException`, and a timeout during a retry wait or the wait for a concurrency slot was reported as `DataverseAbortError`.
  - **Every wait.** Retry waits and the wait for a concurrency slot now reject with the signal's `TimeoutError`, as `fetch` does. A fetch provider that rejects with a plain `AbortError` is recognised by the signal's reason.
  - `DataverseNetworkError.timeout(timeoutMs?, cause?)`: both arguments are optional. Without `timeoutMs` the message is `"Request timed out"`.
  - A plain `abort()` is still a `DataverseAbortError`.

- afb5242: `createAndGetId()` no longer hangs, and works with `Prefer: return=representation` (#289).

  - **No hang.** It released the response body with `await res.body?.cancel()`. When middleware (such as a logger that reads bodies) had tee'd the body, that cancel never settled, so the call never returned. The body is now released without waiting, as #241 did in metadata.
  - **`return=representation`.** Such a create is answered `201 Created` with the record in the body and no `OData-EntityId` or `Location` header. New `primaryIdAttribute` option (`CreateAndGetIdOptions`, which extends `RequestOptions`): `createAndGetId(body, { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" })` reads the id from the body. The headers win when both are present. Without the option, such a create rejects with `DataverseInvalidRequestError`, and the message says to pass `primaryIdAttribute`. The name matches `entityIdFromBatchResponse(part, { primaryIdAttribute })` in the batch package.
  - `entityIdFromResponse()` throws a `DataverseInvalidRequestError` whose message explains that a `return=representation` response has the id in its body. Before, it was a `MissingParameter` error.

- 7096f24: FetchXML queries (#51).

  - **`fetchXml()`** on the request builder and the client (`client.fetchXml("accounts", xml)`) runs a FetchXML query and returns one `FetchXmlPage<T>`: `value`, `pagingCookie`, `moreRecords`, `totalRecordCount`, `totalRecordCountLimitExceeded` and `nextLink`. It sends `Prefer: odata.include-annotations="*"` by default, so records carry formatted values; `annotations` asks for less, and `Microsoft.Dynamics.CRM.*` is always included so the paging annotations come back. The query is encoded with `encodeURIComponent`.
  - **Long queries.** A query whose GET URL would be longer than `maxUrlLength` (default 32,768 characters) is sent as a `POST $batch` that carries the GET, and returns the same page.
  - **Views.** `savedQuery(id)` and `userQuery(id)` run a system or personal view as one page.
  - **Paging helpers.** `parsePagingCookie(annotation)` reads the page number and decodes the cookie; `buildPagedFetchXml(xml, { page, pagingCookie, count })` sets them on the `<fetch>` element. Both are pure.

- 08efbd7: OData literal helpers (#53).

  - **`odataLiteral`** formats values for keys, function parameters and filters: `string` (wraps in `'` and doubles every embedded `'`), `guid` (unquoted; anything but a GUID throws), `int`, `number`, `bool`, `datetime`, `date`, `enum` (including flags) and `value` (picks one from the JavaScript type). A value that doesn't fit throws `DataverseInvalidRequestError` (`InvalidParameter`) instead of producing a broken URL.
  - **`odataKey(key)`** formats a record key: a GUID (braces removed), or an alternate key object such as `{ accountnumber: "O'Brien" }` → `accountnumber='O''Brien'`, percent-encoded so it is safe in a URL path. Other strings are used as written.
  - **Core uses them.** `bind()`, `client.bind()`, `associate()` and `disassociate()` accept an alternate key object as well as a GUID, and format the key with `odataKey`. The `odata` filter helpers write their values with `odataLiteral`: `eq`/`ne`/`gt`/`ge`/`lt`/`le` also take a `Date`, and a non-finite number now throws instead of producing `NaN` in the filter.

- 63ee065: `timeoutMs` now limits the whole request, and abort listeners no longer leak (#46).

  - **A deadline for the whole request.** `timeoutMs` starts when the request is sent and covers every attempt, every retry wait (including `Retry-After`) and the wait for a concurrency slot. Before, it applied to each attempt, so a "10 s timeout" with retries could take minutes. When it passes, the request rejects with `DataverseNetworkError` (`RequestTimeout`).
  - **`attemptTimeoutMs`** (new, on `RequestOptions` and `RequestInformation`) limits a single attempt. A timed-out attempt is not retried.
  - **Waiting for a slot can be cancelled.** A request queued for a concurrency slot now leaves the queue when its signal aborts or its deadline passes. An already-aborted request no longer reaches `fetch`.
  - **No listener leaks.** Signals are combined with `AbortSignal.any()` where it exists, and otherwise detached when the attempt ends. Retry waits remove their abort listener when they finish. A long-lived signal shared by many requests no longer gains a listener per request.

- 39b3917: New `diagnosticHeaders` client option (#13). The SDK's own request headers (`x-ms-sdk-version`, `x-ms-correlation-id`, `x-ms-feature-usage`, and `retry-attempt` on retries) were always sent. They are still sent by default; `diagnosticHeaders: false` turns all of them off, and an object (`{ sdkVersion, correlationId, featureUsage, retryAttempt }`) turns them off one by one. Telemetry keeps the correlation id when its header is off. The README's browser section explains the CORS side.
- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- 2bb4ed3: The fluent builder can now read any response, not only JSON (#11).

  - `get()`, `post()`, `patch()`, `put()` and `delete()` resolve `undefined` for `204 No Content` or an empty body; before, `get()` threw `SyntaxError: Unexpected end of JSON input`. A non-JSON body rejects with `DataverseInvalidRequestError` (`name: "UnexpectedContentType"`), which points at the new methods below.
  - New terminals: `text()`, `blob()` and `arrayBuffer()` for `$metadata`, `$value` and other non-JSON content.
  - New `response(method?, body?, options?)` returns the raw `Response` (status, `ETag`, `OData-EntityId`, `Preference-Applied`, `x-ms-service-request-id`) and doesn't reject on non-2xx.
  - New `createAndGetId(body)` returns the new record's id from `OData-EntityId`, without needing `Prefer: return=representation`.
  - New export: `entityIdFromResponse(res)`.

- 7b1ef12: `DataverseClient.send()` now accepts URLs relative to the Web API root, such as `"WhoAmI"`, `"/accounts(…)"` or `"$batch"`; absolute `http(s)://` URLs are unchanged (#31). Before, a relative URL threw `TypeError: Invalid URL`. New public `client.resolveUrl(path)` returns the absolute URL that `send()` and the fluent builder use. `apiVersion` now accepts any `vX.Y` version (for example `"v9.1"`), not just `"v9.2"`. New type export: `ApiVersion`.
- 0bfa5fe: **Behaviour change:** retries no longer replay non-idempotent requests after 502, 503 or 504 (#12). A gateway error can arrive after Dataverse has already applied the request, so retrying a create, an action, a `$batch` or an unconditional PATCH could apply it twice. These requests are retried after a server error:

  - GET, HEAD, OPTIONS, PUT and DELETE;
  - PATCH that carries `If-Match`.

  A **429 is still retried for every method**, because Dataverse rejects a throttled request before doing any work. To restore the old behaviour, set `retry: { retryNonIdempotent: true }` on the client, or `{ type: "retry", retryNonIdempotent: true }` per request.

- 02038b3: Per-request middleware options now reach the middleware (#16). `RequestOptions.middlewareOptions` was declared, and `RetryMiddleware` read `ctx.middlewareOptions`, but nothing ever passed the option through, so every per-request override was ignored. Pass `middlewareOptions: new MiddlewareRequestOptions([...])` to builder terminals or `execute()`, or set it on the `RequestInformation` given to `send()`:

  - `{ type: "retry", maxRetries, baseDelayMs, retryableStatusCodes }` overrides the client's retry settings for that request. Fields you leave out keep the client's value.
  - `{ type: "concurrency", bypass: true }` skips the concurrency queue.
  - `{ type: "telemetry", disable: true }` sends no diagnostic headers and tracks nothing; `customProperties` are added to the tracked dependency.
  - `{ type: "logging", disable: true }` (or a `logLevel` above `debug`) keeps the request out of the logger.

- 7e13e73: Every request now gets its own middleware context (#15). Before, a `DataverseClient` created one context and shared it across all requests, so every request from a client carried the **same `x-ms-correlation-id` for the client's lifetime**, and concurrent requests overwrote each other's retry-attempt numbers in logs and telemetry. Each request now has a fresh correlation id, which stays the same across its retries. Feature-usage flags are tracked per client instead of in a process-wide tracker. You can pass your own correlation id with the new `correlationId` field on `RequestInformation` (for `send()`) and on `RequestOptions` (for builder terminals and `execute()`).
- ac42045: **Security:** the bearer token is now attached only to requests for the client's own origin (#8). Before, `AuthMiddleware` added `authorization: Bearer …` to every request, including absolute URLs passed to `client.api()` / `client.send()` and any `@odata.nextLink`. A pasted URL, a crafted nextLink or a consumer bug could therefore send the user's Dataverse token to another host.

  - By default, a request to another origin (another host, a look-alike subdomain, plain `http:`, another port) or to a URL containing user info is rejected with `DataverseInvalidRequestError` (`name: "TokenOriginRefused"`), before any token is acquired or request is sent. That includes paging that follows a foreign `@odata.nextLink`.
  - New option `allowedTokenOrigins: string[]` lets other origins receive the token on purpose.
  - New option `onForeignOrigin: "strip"` sends foreign requests without the `authorization` header, instead of throwing.

  This is a behaviour change only for callers who sent the client's token to another origin on purpose; they should set `allowedTokenOrigins`.

- 254a8ec: No `any` in the public API. **Breaking for TypeScript callers.**

  - **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
  - **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
  - **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
  - **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.

- dd2acd8: One `DataverseBatchError`. Core now holds the class (with `partErrors`, `requestErrors`, `result` and the request helpers) and the batch package re-exports it, so `err instanceof DataverseBatchError` is true whichever package it is imported from. `execute()` still throws it with `result`, and now also fills `partErrors`. Core's constructor accepts both its old short form and the batch form.
- 652ad75: One OData literal serializer (#254).

  - **Core** adds `odataLiteral.parameter(value, odataType, kind?)`, which writes an operation parameter from its OData type, and the helpers it needs: `odataLiteral.json` (record references become `@odata.id`), `odataLiteral.reference`, `odataLiteral.recordPath`, `odataLiteral.duration` and `odataLiteral.binary`. `odataLiteral.enum` also splits a string on commas (`"Entity, Attributes"`). New types: `ODataParameterKind`, `ODataRecordReference`.
  - **entities-runtime** `formatParameterAlias` and `formatRecordPath`, and the generated `internal/odataLiteral.ts` in the functions package, now call core instead of holding their own copies. Their names and signatures are unchanged.
  - Values the Web API can't read now throw `DataverseInvalidRequestError` before the request instead of being written through: a GUID that isn't one (the Web API answered 500), `NaN` or `Infinity` (written as `null`), a fraction for an integer type, a date-time without a zone, an enum member with a quote, an invalid duration or base64 text. A `bigint` for `Edm.Int64` is written in full (it used to throw a `TypeError`).

- 329c0b0: The middleware pipeline can be customised, and `defaultPrefer` works (#18).

  - New client option `middleware: { prepend?, append?, replace? }`. `replace` receives the built-in middleware list and returns the one to use (for example without `LoggingMiddleware`). `prepend` runs first; `append` runs last, right before `fetch`, so it sees the final headers including `authorization`.
  - `Pipeline`, `FetchRequestAdapter`, `buildDefaultMiddleware` and the built-in middleware classes (`AuthMiddleware`, `ODataHeadersMiddleware`, `ConcurrencyMiddleware`, `RetryMiddleware`, `TelemetryMiddleware`, `LoggingMiddleware`) are exported.
  - `defaultPrefer` was declared but never applied. It is now added to every request's `Prefer` header. Preferences are matched by name, and a request's own value for the same preference wins.
  - The README's middleware docs now show the real option, signature and order.

- 365ceca: Remove the deprecated and no-op options (#285). Passing any of them is now a type error.

  - **core, retries:** `RetryOptions.delay` is removed: use `baseDelayMs`. `RetryOptions.useExponentialBackoff` is removed: it had no effect, because backoff is always exponential.
  - **core, client options:** `circuitBreaker` and `bulkhead` are removed, with their `CircuitBreakerOptions` and `BulkheadOptions` types. They were never implemented and only logged a warning. Circuit breaker and bulkhead middleware are planned in #100; until then, add your own through the `middleware` option.
  - **core, errors:** `DataverseError.statusCode` is removed: read `status`.
  - **otel:** `OpenTelemetryConfig.serviceName` is removed. It was ignored. `service.name` is a resource attribute: set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).

- 61bd4aa: Retry controls now work as documented (#17).

  - **`Retry-After` is capped.** New `retry.maxRetryAfterMs` (default: `maxDelayMs`, 30 s). When the server asks for a longer wait, the response is returned at once instead of sleeping (a 429 throws `DataverseThrottleError` with `retryAfterMs`), so the caller decides whether to wait. Set `Infinity` to keep the old behaviour. A `Retry-After` within the cap is waited out exactly, without jitter.
  - **Jitter is applied** (±20%) to the computed backoff whenever `jitter` is true (the default). Before, it needed an option the client options could not set.
  - **One `RetryOptions` type** for the client and per request: `maxRetries`, `baseDelayMs`, `maxDelayMs`, `maxRetryAfterMs`, `jitter`, `retryableStatusCodes`, `retryNonIdempotent`, `retryNetworkErrors`, `shouldRetry`.
  - **One `Retry-After` parser** (`parseRetryAfter`), used by the retry middleware and by the error parser: delta-seconds including decimals (`"1.5"` is 1500 ms) and HTTP-dates. Values like `"-5"` or `"12abc"` are now ignored instead of being read as numbers.
  - **Network errors:** when `fetch` rejects with a `TypeError` (DNS, TLS, dropped connection, CORS), the SDK now throws `DataverseNetworkError` named `ConnectionFailed`, with the original error as `cause`. With the new `retry.retryNetworkErrors: true`, idempotent requests are retried with backoff. Aborts and timeouts are never retried.

- 4e804b4: Retries can be observed (#32). New `retry.onRetry(info)` (client or per request) runs once before each retry with the attempt number, `maxRetries`, the status (0 for a network error), the delay, `retryAfterMs`, the correlation id and the request, so a UI can show "Throttled, retrying in 12 s (2/6)". An error thrown by the hook is logged and ignored. New `getRetryAttempts(res)` returns the attempt history behind a response from `send()` or `response()`.
- b040687: Idempotent requests are retried after a dropped connection by default (#351). **Breaking.**

  When `fetch` itself fails (a `DataverseNetworkError` named `ConnectionFailed`, such as a reset socket), GET, HEAD, OPTIONS, PUT, DELETE, and PATCH with `If-Match` are now retried with the same backoff and `maxRetries` as a 503. Before, the error was thrown at once unless `retry.retryNetworkErrors` was `true`.

  - POST and other PATCHes still aren't retried after a network error, because the connection can drop after Dataverse applied the request. `retryNonIdempotent: true` alone doesn't change that. They are retried only when `retryNetworkErrors: true` is set as well.
  - `retry: { retryNetworkErrors: false }` restores the 1.x behaviour (the error is thrown at once), for the client or for one request.
  - Aborts, timeouts and requests with a stream body are never retried.
  - The files client's `UploadBlock` requests are resent after a dropped connection only when the client sets `retryNetworkErrors: true`, as before.

- 496b4cb: Land the repository review fixes.

  - `DataverseClient` now rejects non-HTTPS base URLs with `DataverseInvalidRequestError` (`InvalidBaseUrl`). Plain `http://` is still allowed for `localhost`, `127.0.0.1` and `[::1]`.
  - `getAll({ maxPages })` now stops after `maxPages` requests (previously the limit was ignored), and `maxItems` stops paging as soon as it is reached.
  - A request that exceeds `timeoutMs` now rejects with `DataverseNetworkError` (`RequestTimeout`) instead of a raw `AbortError`.
  - `iterate()` and `getPage()` accept a `signal`, which is passed to every follow-up page request.
  - New `odata` filter helper (`odata.eq`, `contains`, `and`, …) that escapes single quotes in string literals.
  - `AccessTokenProvider.getToken()` now declares `scopes` as optional, which matches every built-in provider.
  - **Behaviour change:** `bindMany()` no longer loads the batch package with `new Function("import(...)")`, which failed under a strict Content-Security-Policy and in bundlers. To send the associations as one `$batch`, pass an executor: `bindMany(nav, entitySet, ids, createBindManyExecutor())`, using the new `createBindManyExecutor` from `@mohsinonxrm/dataverse-sdk-batch`. Without an executor, `bindMany()` sends one request per id (#20).

- d3a1a01: The SDK no longer writes to the console by default (#33). Without a `logger` option, nothing is logged. Before, every request wrote two `console.debug` lines with its full URL, including filters and record ids.

  - `ConsoleLogger` is now an exported class: `new ConsoleLogger()` (or `new ConsoleLogger({ level: "warn" })`) opts in to console output. It passes the meta object as its own argument, so the console shows the object instead of `[object Object]`.
  - Request logs show URLs as origin and path, with key values in parentheses as `(…)` and the query as `?…`. Set the new `logging: { fullUrls: true }` client option to log full URLs.
  - The request log meta is now structured: `{ attempt, status, durationMs }`, with `attempt` as a number.

- 2d4323f: Small API additions (#274):

  - core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
  - discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
  - batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.

- e237826: Telemetry is redacted, guarded and reports the real SDK version (#35, #36).

  - **Redacted URLs.** `trackDependency` and `trackException` used to receive the full request URL, including filters, record ids and alternate keys. They now get origin and path, with GUID keys as `({id})`, other keys as `(…)` and the query as `?…`. Request logs use the same redaction. The new client option `redactUrl: (url: URL) => string` replaces it, and `defaultRedactUrl` is exported. Dependencies now also carry `target` (the host).
  - **Never throws.** A telemetry client whose `trackDependency` or `trackException` throws no longer fails the request or replaces its error. The failure is logged with `logger.warn` and dropped.
  - **`TELEMETRY_ENABLED`** in `x-ms-feature-usage` is now set only when a telemetry client is configured.
  - **`SDK_VERSION`** is injected from `package.json` at build time and exported. `x-ms-sdk-version` and the `sdk.version` telemetry property used to report `0.1.0`.

- a464f3a: One error model (#19). There were two unrelated `DataverseError` classes, so `err instanceof DataverseError` was false for authentication, invalid-request and network errors. Now every error the SDK throws extends the exported `DataverseError`.

  - **Base fields.** `DataverseError` has `status`, `code`, `message`, `headers` (lower-cased names), `body` (parsed JSON or text; also `raw`), `innerError` (`message`, `type`, `stacktrace`), `requestId`, `correlationId`, `cause` and `date`.
  - **HTTP errors** (`DataverseODataError`, `DataverseThrottleError`) now carry the response headers, Dataverse's `innererror`, and the correlation id the SDK sent.
  - **`requestId`** is read from `x-ms-service-request-id`, then `REQ_ID`, then the older `req-id` / `x-ms-request-id`.
  - **Aborts.** A cancelled request, including one cancelled during a retry wait, now throws `DataverseAbortError` instead of a raw `DOMException`. Its `name` is still `"AbortError"`, and the original error is its `cause`. Network failures were already `DataverseNetworkError` (#17), and every SDK error from `send()` now carries the request's `correlationId`.
  - **Cleanup.** The unused duplicate `DataverseBatchError` inside `NamedErrors` is removed (the exported one is unchanged). The README's error section uses the real property names and hierarchy.

### Patch Changes

- f900b0c: A `$batch` POST answered with HTTP 429 and a `multipart/mixed` body is no longer replayed (#211). A 429 is normally safe to retry, because Dataverse rejects a throttled request before doing any work. A multipart body, though, carries per-request results, so some parts may already have run, and replaying the batch would run them again. The response is handed back instead. A 429 with the usual JSON error body is still retried. `retryNonIdempotent: true` or a custom `shouldRetry` restores the old behaviour.
- b1f2738: The retry middleware now cancels the body of every response it retries (#45). Before, a 429 or 5xx response that was retried was dropped unread, and in Node.js (undici) an unread body keeps its connection busy until garbage collection, which can exhaust the connection pool under sustained throttling. The response handed back to the caller is left unread, as before.
- eb27877: A request waiting to be retried no longer holds a concurrency slot (#44). `RetryMiddleware` now runs outside `ConcurrencyMiddleware`, so each attempt takes a slot and releases it when its response arrives. Before, a request sleeping on `Retry-After` or a backoff kept its slot for the whole wait, so with the defaults a throttling burst could block every slot for minutes while other requests queued behind it. `x-ms-dop-hint` adaptation is unchanged. The default order is now ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging; a `middleware.replace` callback receives the defaults in that order.
- 60ccef3: With `.detectDuplicates()`, only a duplicate-detection 412 is a `DataverseDuplicateError` (#50). Before, every 412 was, so an optimistic-concurrency failure (`.ifMatch()` with a stale etag, code `0x80060882`) was reported as a duplicate. A duplicate is now recognised by Dataverse's code `0x80040333` (checked live), or by `innererror.duplicaterecords` when present; any other 412 is the usual `DataverseODataError` with its code. A 412 body that isn't JSON no longer makes the error handling itself throw.
- 6b0dc00: Paging fixes (#47).

  - **`iterate()` is lazy.** It sends nothing until the first `next()`. Before, the first request went out as soon as `iterate()` was called, so an iterable that was never consumed still sent a request and could leave an unhandled rejection.
  - **Later pages carry the first request's headers.** Pages after the first, from `iterate()`, `getAll()` or `PageIterator`, are requested with the first request's `Prefer`, impersonation and custom headers. `odata.maxpagesize`, formatted values and `MSCRMCallerID` now hold on every page; before, page 2 onward came back at the default page size, without annotations, and as the calling user. `If-Match` / `If-None-Match` are sent with the first page only.
  - **Other additions.** `getAll()` accepts a `signal`. `PageIterator` takes an optional fourth `headers` argument.

- 1848068: Query options are encoded with `encodeURIComponent` semantics, and a caller's own query string is left as written (#52). `buildUrl` used `URLSearchParams`, which wrote spaces as `+` and `$`, `,`, `:` and `@` as `%XX`, and re-serialized the whole query string, including the part the caller had already encoded. Now builder options read like Microsoft's examples (`$filter=name%20eq%20'x'`), and a query string in the path is kept exactly; only an option the builder sets again replaces the one there. Dataverse accepted both forms (checked live), so requests that worked keep working; URLs in logs are easier to read.
- c3337f8: `text()`, `blob()` and `arrayBuffer()` now send `Accept: */*` unless the caller set an `Accept` header (#210). They used to inherit the default `Accept: application/json`, so `client.api("$metadata").text()` failed with HTTP 415 ("A supported MIME type could not be found"). JSON terminals still send `application/json`.
- c426eac: Fix duplicated request headers (#9). Header names are now lower-cased once, when `DataverseClient.send()` is called, and in `execute()` option merging. A caller's `Content-Type`, `Accept`, `Prefer` or `Authorization` therefore replaces the SDK's default instead of being sent next to it. Before, `fetch` combined the two casings into one value, for example `Content-Type: application/json, application/json; charset=utf-8`, and **Dataverse rejected those requests with HTTP 400 `0x80048d19`**. That included every generated action call. `send()` also no longer mutates the caller's `RequestInformation`. New export: `normalizeHeaders()`.
- 4f96909: Fix request bodies being JSON-stringified whatever their type (#7). Plain objects and arrays are still serialised to JSON. Strings, `ArrayBuffer`, typed arrays and `DataView`, `Blob`, `FormData`, `URLSearchParams` and `ReadableStream` now reach `fetch` unchanged, so raw JSON text, multipart `$batch` bodies, XML and binary file content are sent byte for byte. A typed-array view sends only its own bytes. The default `content-type: application/json; charset=utf-8` is added only for JSON-serialised bodies and strings, and never overrides the caller's. Stream bodies are sent half-duplex and never retried. New type export: `RawBody`.
- e3dcff1: Fix `validateUrl` rejecting valid queries (#10). The 260-character segment limit now applies to URL **path** segments only, and percent-encoded segments are measured by their decoded length. Before, everything after the last `/` counted as one segment, including the whole query string, so a long `$filter`, `$select`, FetchXML or nextLink threw `DataverseUrlError` unless the caller used `.skipUrlValidation()`. The 32,768-character limit on the whole URL still applies.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 608d915: URL redaction for logs and telemetry (`defaultRedactUrl`) now runs in linear time. Its regex could backtrack polynomially on a path such as `((((…`, so a crafted URL could stall the request thread (CodeQL js/polynomial-redos). The results are unchanged.
- 9728b8c: `associate()`, `disassociate()` and `bindMany()` now send their `$ref` requests with the builder's impersonation (`MSCRMCallerID` / `CallerObjectId`) and custom headers (#355). Before, `client.api(…).impersonate(userId).associate(…)` ran as the calling identity. They also take request options (`signal`, `timeoutMs`, `headers`, `correlationId`, …) as a last argument.

  A `BindManyExecutor` receives those headers and options as a sixth argument, and `createBindManyExecutor()` from the batch package sends them on its `$batch`. It also does nothing for an empty list (it used to throw "Cannot execute empty batch"), associates an id listed twice once, and formats keys the way `associate()` does (`odataKey`).

- 6df2528: `serializeContent()` sends only a typed-array view's own bytes (#34). It used to send the view's whole underlying buffer (`Buffer.from(view.buffer)`), so `new Uint8Array(buf, 10, 5)` or a `subarray()` sent every byte of `buf`: wrong data, and possibly unrelated bytes. It now uses the same rules as the client's request bodies, and detects types with `instanceof` / `ArrayBuffer.isView` instead of `constructor.name`. Its return type is now `BodyInit`.

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

## 1.0.0

### Major Changes

- # v1.0.0 - Initial Release 🎉

  The first stable release of the Dataverse SDK for TypeScript! This modern, type-safe SDK provides comprehensive access to Microsoft Dataverse (Power Platform) with two complementary front doors:
  1. **HTTP/OData Fluent API** - Microsoft Graph-inspired request builder pattern
  2. **OrganizationService** - C#-familiar interface for Dataverse developers

  ## 🚀 Key Features

  ### Core Infrastructure
  - **Middleware Pipeline** - Extensible request/response processing with auth, retry, concurrency, and telemetry
  - **Automatic Retries** - Smart retry logic honors `Retry-After` headers (429, 502+)
  - **Adaptive Concurrency** - Respects `x-ms-dop-hint` for optimal throughput
  - **Type-Safe** - Strict TypeScript throughout with 1,356+ generated message types
  - **ESM-Only** - Modern, tree-shakeable ES Modules for optimal bundle sizes

  ### Authentication
  - **MSAL Browser** - SPA/browser authentication with token caching
  - **MSAL Node** - CLI/daemon auth (device code, client credentials)
  - **Azure Identity** - Modern Azure authentication library support

  ### Operations
  - **$batch Operations** - Auto-splitting at 1,000 requests, change sets, error handling
  - **Typed Actions** - 1,356 generated action classes with full type safety
  - **Typed Functions** - 229 generated function classes
  - **Typed Messages** - 1,356 message request/response pairs (direct exports, no namespaces)
  - **Bulk Operations** - CreateMultiple, UpdateMultiple, UpsertMultiple, DeleteMultiple
  - **File Operations** - Chunked upload/download for file and image columns (4MB default chunks)

  ### Metadata
  - **Strict Typing** - Generated from Dataverse v9.2 metadata (Sales + Customer Service)
  - **Read/Create/Update Split** - Separate types prevent invalid writes
  - **Metadata Client** - Type-safe operations for EntityDefinitions, RelationshipDefinitions, etc.
  - **RetrieveMetadataChanges** - Efficient incremental metadata queries

  ### Developer Experience
  - **Two Front Doors** - Choose HTTP fluent API OR OrganizationService patterns
  - **Comprehensive Samples** - Node CLI, daemon, batch ops, file ops, metadata, messages
  - **Fluent Builders** - Chainable OData query building (select, filter, expand, orderby, etc.)
  - **Prefer Headers** - Type-safe helper for returnRepresentation, includeAnnotations, etc.
  - **Paging** - get(), getPage(), iterate(), getAll() with configurable limits

  ### Telemetry & Observability
  - **Application Insights** - Optional adapter package
  - **OpenTelemetry** - Optional adapter package
  - **Custom Telemetry** - Implement TelemetryClient interface
  - **Correlation IDs** - Automatic x-ms-client-request-id propagation

  ## 📦 Packages

  All packages published under `@mohsinonxrm` scope:

  **Foundation:**
  - `dataverse-sdk-core` - Pipeline, middleware, fluent API, request builder
  - `dataverse-sdk-entities-runtime` - Runtime for generated entities

  **Authentication:**
  - `dataverse-sdk-auth-msal-browser` - MSAL browser token provider
  - `dataverse-sdk-auth-msal-node` - MSAL node token provider
  - `dataverse-sdk-auth-azure-identity` - Azure Identity token provider

  **Core Operations:**
  - `dataverse-sdk-batch` - $batch operations with change sets
  - `dataverse-sdk-xrm` - OrganizationService facade
  - `dataverse-sdk-discovery` - Global Discovery Service (Commercial)

  **Typed Operations:**
  - `dataverse-sdk-actions` - 1,356 typed Web API actions
  - `dataverse-sdk-functions` - 229 typed Web API functions
  - `dataverse-sdk-messages` - 1,356 typed messages (direct exports)

  **Advanced:**
  - `dataverse-sdk-metadata` - Metadata operations + strict typing
  - `dataverse-sdk-files` - File/image column operations with chunking

  **Tooling:**
  - `dataverse-sdk-generator` - Early-bound entity generator

  **Telemetry (Optional):**
  - `dataverse-sdk-appinsights` - Application Insights adapter
  - `dataverse-sdk-otel` - OpenTelemetry adapter

  ## 🔄 Breaking Changes from Pre-Release

  ### Direct Exports (No Namespaces)

  **Previous (Pre-Release):**

  ```typescript
  import { XrmSdkMessages, CrmSdkMessages } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new XrmSdkMessages.WhoAmIRequest();
  ```

  **Now (v1.0):**

  ```typescript
  import { ExecuteWorkflowRequest, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  ```

  **Rationale:** Direct named exports enable better tree-shaking, simpler imports, and align with modern ESM practices.

  ### Constructor Signatures

  Auto-generated message/action/function classes use positional constructor parameters rather than options objects. Refer to package READMEs and IntelliSense for specific signatures.

  ## 📚 Documentation
  - **ADRs:** Comprehensive architecture decision records in `docs/adr/`
  - **Mapping Docs:** Web API action/function/message mappings in `docs/mapping/`
  - **Samples:** 7 working samples demonstrating key patterns
  - **Package READMEs:** Installation and usage for each package

  ## ⚡ Quick Start

  ```bash
  # Install core + auth
  pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

  # For OrganizationService pattern
  pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-messages

  # For batch operations
  pnpm add @mohsinonxrm/dataverse-sdk-batch

  # For file operations
  pnpm add @mohsinonxrm/dataverse-sdk-files
  ```

  **Fluent API Example:**

  ```typescript
  import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
  import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

  const client = new DataverseClient({
    baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
    tokenProvider: new MsalNodeTokenProvider(msalConfig),
  });

  const accounts = await client
    .api("/accounts")
    .select(["name", "revenue"])
    .filter("revenue gt 100000")
    .top(10)
    .get();
  ```

  **OrganizationService Example:**

  ```typescript
  import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
  import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

  const service = new OrganizationService(client);

  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  const response = await service.execute(request);
  ```

  ## ⚠️ Known Limitations
  1. **Integration Tests:** Unit tests comprehensive; integration tests require live Dataverse environment (deferred to v1.0.1)
  2. **Actions Package Tests:** 18 test failures due to constructor signature mismatches with auto-generated classes (functionality confirmed working in samples)
  3. **SPA Sample:** Skeleton only (deferred to v1.0.1)

  ## 🔮 Roadmap

  **v1.0.1 - Polish Release** (Planned: +2 weeks)
  - Complete SPA Fluent UI v9 sample
  - Enhanced package READMEs
  - Migration guides
  - Troubleshooting documentation
  - Fix actions package test implementation

  **v1.1 - Fast-Follow** (Planned: +3 months)
  - Duplicate detection package
  - Stream-based file operations
  - Elastic table partial success handling
  - Expanded messages coverage
  - Integration tests against live Dataverse

  **v1.2+ - Enterprise Features** (2027+)
  - Circuit breaker middleware
  - Bulk head isolation
  - Audit operations package
  - Async operation polling
  - FetchXML query builder

  ## 📄 License

  GNU Affero General Public License v3.0 (AGPL-3.0)

  ## 🙏 Acknowledgments

  Built with inspiration from:
  - Microsoft Graph SDK for TypeScript/JavaScript
  - dataverse-gen (comparison analysis in docs/architecture/)
  - Microsoft Dataverse Web API documentation
  - C# SDK patterns and naming conventions

  ***

  **Migration Note:** If upgrading from pre-release versions, review breaking changes section above and update imports to use direct exports instead of namespaces.

### Minor Changes

- Add Fluent API Enhancements for improved developer experience

  **Breaking**: None (all additive)

  **New APIs**:
  1. **Prefer Fluent Builder** - `.prefer().returnRepresentation().formattedValues()`
  2. **ETag Fluent API** - `.ifNoneMatch()`, `.updateOnly()`, `.createOnly()`
  3. **Duplicate Detection** - `.detectDuplicates()` with `DataverseDuplicateError`
  4. **Binding Fluent API** - `.bind()`, `.associate()`, `.disassociate()`, `.bindMany()`
  5. **URL Validation** - Automatic validation with `.skipUrlValidation()` escape hatch

  **New Error Types**:
  - `DataverseDuplicateError` - Specialized error for 412 responses with duplicate details
  - `DataverseUrlError` - Client-side URL validation errors

  **Examples**:

  ```typescript
  // Prefer fluent builder
  await client
    .api("/accounts")
    .prefer()
    .returnRepresentation()
    .formattedValues()
    .post({ name: "Contoso" });

  // ETag convenience methods
  await client
    .api("/accounts(guid)")
    .updateOnly(etag) // Optimistic concurrency
    .patch({ name: "Updated" });

  await client
    .api("/accounts(guid)")
    .createOnly() // Prevent overwrite during upsert
    .patch({ name: "New Account" });

  // Duplicate detection with specialized error
  try {
    await client.api("/accounts").detectDuplicates().post({ name: "Contoso" });
  } catch (error) {
    if (error instanceof DataverseDuplicateError) {
      console.log("Duplicates found:", error.duplicates);
    }
  }

  // Binding fluent API
  await client
    .api("/contacts")
    .bind("parentcustomerid_account", "accounts", "parent-guid")
    .post({ firstname: "John" });

  await client
    .api("/accounts(guid)")
    .associate("contact_customer_accounts", "contacts", "contact-guid");
  ```
