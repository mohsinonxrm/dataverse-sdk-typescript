# Migrating to 2.0

Every package moves from 1.0.x to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0: files uploads, OrganizationService CRUD, generated functions, metadata creates and `$batch`. If your code worked around those bugs, the workaround may now get in the way. This page lists the changes you may have to act on, grouped by package. Each package's `CHANGELOG.md` has the full list.

## Install

- **Node 22 or later.** Node 18 and 20 are end of life, and CI tests on Node 22, 24 and 26.
- **New peer dependencies.** Install these next to the SDK packages that use them:

  | Package                                        | Install                                                                            |
  | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
  | `@mohsinonxrm/dataverse-sdk-auth-msal-browser` | `@azure/msal-browser` (3.x, 4.x or 5.x)                                            |
  | `@mohsinonxrm/dataverse-sdk-auth-msal-node`    | `@azure/msal-node`                                                                 |
  | `@mohsinonxrm/dataverse-sdk-otel`              | `@opentelemetry/api`                                                               |
  | `@mohsinonxrm/dataverse-sdk-appinsights`       | `@azure/monitor-opentelemetry` and the OpenTelemetry packages listed in its README |

## core

- **Nothing is logged by default.** Pass `logger: new ConsoleLogger()` to see request logs. URLs in logs and telemetry are redacted unless you set `logging: { fullUrls: true }` or your own `redactUrl`.
- **Retries.**
  - A 429 or 503 whose `Retry-After` is longer than `retry.maxRetryAfterMs` (default 30 s) is returned at once instead of being waited out. A 429 throws `DataverseThrottleError` with `retryAfterMs`. Set `maxRetryAfterMs: Infinity` for the old behaviour.
  - POST, and PATCH without `If-Match`, are no longer replayed after a 502, 503 or 504, because Dataverse may already have applied them. A 429 is still retried for every method.
  - A `$batch` answered with a 429 and a multipart body is handed back instead of replayed.
- **`timeoutMs` is a deadline for the whole request**, including every retry wait and the wait for a concurrency slot. Use the new `attemptTimeoutMs` for a per-attempt limit.
- **Errors.**
  - Every SDK error extends `DataverseError`.
  - Failed `fetch` calls throw `DataverseNetworkError` instead of `TypeError`.
  - Aborts throw `DataverseAbortError`, whose `name` is still `"AbortError"`.
  - `statusCode` is removed: read `status`.
  - With `.detectDuplicates()`, only error `0x80040333` is a `DataverseDuplicateError`. Any other 412, such as a stale `If-Match`, is a plain `DataverseODataError`.
- **Removed options.** Passing any of these is now a type error.
  - `retry.delay`: use `baseDelayMs`.
  - `retry.useExponentialBackoff`: it had no effect, because backoff is always exponential.
  - `circuitBreaker` and `bulkhead`, with their `CircuitBreakerOptions` and `BulkheadOptions` types: they had no effect. Circuit breaker and bulkhead middleware are planned in [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100).
- **Auth.**
  - A token is fetched for every attempt, and a 401 triggers one token refresh and one retry.
  - The token is only attached to requests for the client's own origin.
  - Non-HTTPS base URLs are rejected, except `localhost`.
- **Default middleware order:** ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging. A request waiting to be retried no longer holds a concurrency slot. If you replace the pipeline with the `middleware` option, keep this order.
- **Query encoding.** Query options are encoded like `encodeURIComponent`: spaces become `%20`, not `+`. A query string you put in the path yourself is left as written.
- **`expand()`.** Calls add up instead of replacing each other, and `expand(nav, { select, filter, orderBy, top, expand })` takes options.

## auth-msal-browser

A configured `account` object no longer overrides MSAL's active account. Pass `account: () => x` to pin one account.

## batch

- **`execute({ continueOnError: true })` no longer throws** when a request fails. It returns the result, with `success: false` and the failures in `errors`. Without `continueOnError`, `DataverseBatchError` now carries `result`.
- **Large batches are split** automatically to stay within Dataverse's limit.

## files

- `new FileColumnClient(client)` takes a `DataverseClient`. The constructor that takes an adapter has no invalid default base URL any more.
- `upload()` accepts a `Blob`, `ArrayBuffer`, typed array or `Buffer`, and doesn't need `Buffer` in browsers.
- `download()` returns a `Blob`.
- `delete()` sends `DELETE`.
- Every failed step rejects with a typed error.

## otel

`serviceName` is removed from `OpenTelemetryConfig`: it was ignored. `service.name` is a resource attribute, so set it on your OpenTelemetry SDK (`new NodeSDK({ serviceName })` or `OTEL_SERVICE_NAME`).

## metadata

- **Enums are string member names**, for example `OwnershipTypes.UserOwned === "UserOwned"`, because the Web API rejects numbers in metadata bodies. Replace numeric comparisons such as `OwnershipType === 1` with the enum member.
- **New create types.** `*AttributeMetadataCreate` types, discriminated on `@odata.type`, model what a create needs.
- **Ids come from the response header.** `create*` methods return the new `MetadataId` from `OData-EntityId`, and creates and updates take `{ solutionUniqueName }`.
- **Escaping and validation.** Key values are escaped, and invalid `MetadataId` keys or `DeletedMetadataFilters` values throw `DataverseInvalidRequestError`.

## xrm

- `create()`, `retrieve()`, `retrieveMultiple()` and `update()` now work: in 1.0 they threw `TypeError`.
- `assign()`, `setState()` and the `EntityReference`s of `associate()` take logical names. The entity set is read from metadata instead of being guessed as a plural.
- Record ids must be GUIDs. A malformed id throws `DataverseInvalidRequestError` before any request is sent.

## discovery

`OrganizationDetail` matches the Global Discovery Service v2.0 response: flat `Url` and `ApiUrl`, and an integer `State`. `Endpoints`, `Geo` and `OrganizationEndpoints` are removed.

## actions, functions, messages

These packages are generated by `tools/generate-sdk-types`.

- **Bulk operations take the entity set first.** `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple` and `DeleteMultiple` now take it as their first argument, for example `new CreateMultipleAction("accounts", targets)`.
- **Collection-bound and bound operations call their bound URL.**
- **Entity references** from `createEntityReference(logicalName, id, options?)` have the Web API shape (`{ "@odata.type", <primary key> }`). The third argument is now an options object.
- **Function parameters** are sent as OData literals: strings are quoted with `'` doubled, enums are `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and GUIDs and dates are bare. Nullable parameters are optional.
- **Return types.**
  - Operations that return one entity are typed as that entity: use `res.asyncoperationid`, not `res.value`.
  - Message responses read entity and complex-type returns from the body.
- **Removed:** `toRequestBody()`, which nothing called.

## generator (dataverse-gen) and entities-runtime

- **`generate` works against a real org.** It signs in with the configured `auth` (`deviceCode` or `clientCredentials`), or uses `--token`.
- **Generated code type-checks under strict settings.** Entity names follow the schema name, for example `Account`.
- **Overloads.** Operations with the same name but different bindings each get their own class.
- **Function parameters** use `formatParameterAlias` from entities-runtime.
- **`IEntity.logicalName` is optional.** `formatEntityForWrite()` drops it and binds lookups (`EntityReference` → `@odata.bind`).
