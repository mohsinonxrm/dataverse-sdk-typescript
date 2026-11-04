# Issue index

| File | Priority | Title |
|---|---|---|
| 00-tracking.md | (filed last, links all) | Tracking: SDK fixes needed for FetchXML Studio on Azure Static Web Apps (browser SPA) |
| 01-core-validateurl-query-string.md | P0 | core: validateUrl counts the whole query string as one 260-character "segment", so FetchXML, long $select and nextLink paging throw DataverseUrlError |
| 02-core-raw-request-bodies.md | P0 | core: FetchRequestAdapter JSON.stringify()s every body, so string, Blob and ArrayBuffer bodies such as a multipart $batch cannot be sent |
| 03-batch-builder-unusable.md | P0 | batch: BatchRequestBuilder cannot run a batch against Dataverse (wrong transport, a JSON.parse of a multipart response, and parts without Content-ID dropped) |
| 04-core-response-headers-and-204.md | P0 | core: request builder hides the Response, so create() can't return the new id (OData-EntityId), ETags are unreachable, and get() on 204 throws SyntaxError |
| 05-core-retry-non-idempotent.md | P0 | core: RetryMiddleware resends POST/PATCH/DELETE after 502/503/504, so actions such as ExecuteWorkflow, Close*, BulkDelete and create can run twice |
| 06-core-retry-controls.md | P0 | core: retry controls don't work as documented (per-request middlewareOptions ignored, Retry-After not capped by maxDelayMs, jitter never applied, network errors not retried) |
| 07-core-telemetry-headers-cors.md | P0 | core: every request carries x-ms-sdk-version / x-ms-correlation-id / x-ms-feature-usage (forcing CORS preflights); the correlation id is per client, not per request; SDK version is hard-coded to 0.1.0 |
| 08-auth-msal-browser-interaction.md | P0 | auth-msal-browser: no_account isn't treated as interaction required; interactive requests drop account/loginHint; concurrent getToken() calls open several popups; active account isn't set; silently uses accounts[0] |
| 09-auth-msal-browser-peer-dependency.md | P1 | auth-msal-browser: make @azure/msal-browser a peerDependency and support the current major (v4+); today v3 is bundled as a regular dependency |
| 10-xrm-organizationservice-broken.md | P1 | xrm: OrganizationService create, retrieve, retrieveMultiple and update throw TypeError against the real builder, and Prefer/If-Match/MSCRMCallerID headers are silently dropped |
| 11-core-fetchxml-api.md | P1 | core: add first-class FetchXML query support (paging cookie, morerecords, total count, formatted values, long-query fallback) |
| 12-core-error-model.md | P1 | core: error model gaps: requestId read from headers Dataverse doesn't send, correlationId never set, two unrelated DataverseError classes, raw DOMException on abort, no typed innererror |
| 13-core-bindmany-new-function.md | P1 | core: bindMany() loads the batch package with new Function("return import(...)"), which fails in bundlers and browsers and requires CSP 'unsafe-eval' |
| 14-core-default-logger-noise.md | P2 | core: without a logger, every request writes console.debug output in production |
| 15-core-builder-ergonomics.md | P2 | core: builder ergonomics and doc mismatches (prefer() breaks chaining, getAll({ maxPages }) ignored, expand() options object documented but not supported) |
| 16-telemetry-adapters-throw.md | P1 | appinsights, otel: telemetry adapters are stubs whose methods throw "not implemented", so passing one as telemetry makes every request fail |
| 17-test-infrastructure.md | P1 | tests: suites mock the broken boundaries and run only in Node; add fake-fetch contract tests and a browser environment |
| 18-core-query-encoding.md | P2 | core: query strings are re-serialized with URLSearchParams ('+' for spaces, %24 for '$', %27 for quotes); verify against Dataverse and use encodeURIComponent semantics |
| 19-functions-string-escaping.md | P0 | functions (generator): Edm.String parameters are wrapped in '…' without doubling embedded quotes, so any FetchXML with single-quoted attributes produces an invalid literal |
| 20-functions-enum-parameters.md | P1 | functions (generator): enum parameters are serialized as numbers or quoted names instead of Microsoft.Dynamics.CRM.Enum'Member', and enum values aren't exported at runtime |
| 21-functions-guid-datetime-nullable.md | P1 | functions (generator): Edm.Guid and Edm.DateTimeOffset parameters are quoted, and optional (Nullable) parameters can't be omitted |
| 22-generator-collection-bound-urls.md | P1 | actions, messages, functions (generator): collection-bound operations are emitted as unbound URLs (ValidateSavedQuery, CreateMultiple, UpdateMultiple, …) |
| 23-messages-response-parsing.md | P1 | messages (generator): response parsers read data.value for complex-type and entity returns, so results are always undefined (QueryExpressionToFetchXml, ExecuteWorkflow, …); the response type references itself |
| 24-generator-entity-return-typing.md | P2 | actions, functions (generator): entity-returning operations are typed as { value: T }, but the payload is the entity itself |
| 25-generator-entityreference-shape.md | P1 | actions, functions (generator): createEntityReference() produces { id, logicalName } bodies that the Web API rejects; function @odata.id uses heuristic pluralization |
| 26-generator-nullable-and-discriminators.md | P1 | generator: CSDL Nullable default is inverted (all complex-type properties become required), and abstract parameter types (QueryBase) get no @odata.type discriminator |
| 27-generator-missing-operations-overloads.md | P2 | generator: ExportToExcel isn't generated, and operation overloads with different bindings overwrite each other (one file per name) |
| 28-messages-naive-pluralization.md | P2 | messages (generator): bound message URLs use naive `${name}s` pluralization (opportunitys, campaignactivitys, businessprocesss) |
| 29-per-org-generator-function-template.md | P2 | dataverse-sdk-generator: function.ejs serializes parameters with String() (strings unquoted, no enum/Guid/complex handling, bound functions not supported) |
| 30-metadata-retrievemetadatachanges-post.md | P1 | metadata: retrieveMetadataChanges() sends POST, but RetrieveMetadataChanges is a Web API function (GET) |
| 31-metadata-feature-gaps.md | P1 | metadata: support typed attribute casts with $expand, LabelLanguages, an entity-set-name lookup and cache, and escaped key values |
| 32-discovery-v2-sovereign.md | P1 | discovery: hard-coded commercial scope, v2.0 response type mismatch, State filter type mismatch, no pipeline or typed errors, unescaped filters |
| 33-files-browser-and-errors.md | P2 | files: unguarded Buffer.isBuffer throws in browsers, HTTP errors are ignored during upload, the Initialize Target shape is wrong, and the package doesn't build |

**Totals:** 9 P0, 16 P1, 8 P2 (33 issues), plus the tracking issue.

The repro scripts in `repro/` import from `/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/*/dist`. To run them elsewhere, change the `SDK` constant in `repro/harness.mjs` and the import paths in `repro/gen/*.mjs`, then build the SDK (`pnpm install && pnpm build`).
