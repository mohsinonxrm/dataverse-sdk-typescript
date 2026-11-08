# @mohsinonxrm/dataverse-sdk-appinsights

## 2.0.0-beta.1

### Major Changes

- ff655da: **Breaking.** Telemetry events and W3C trace context (#97).

  - **`TelemetryClient.trackDependency` is replaced by `startDependency(name, data)`** (core). The SDK calls it before each request attempt and calls `end(data)` on the `DependencyHandle` it returns once the attempt is done, with `durationMs`, `success` and `resultCode`. The handle can carry `headers` (`traceparent`, `tracestate`), which the SDK sends with the attempt, and `run(fn)`, which makes the dependency the active span while the attempt runs. A custom client moves its `trackDependency` body into `end` (see the 2.0 migration guide). Each retry and each resend after a 401 is its own dependency, started in the caller's context.
  - **Trace context goes to Dataverse.** Only a valid `traceparent` and its `tracestate` are sent, only to origins that may receive the access token (`baseUrl` and `allowedTokenOrigins`), and `diagnosticHeaders: false` or the new `diagnosticHeaders: { traceContext: false }` turns it off.
  - **Events.** `trackEvent` now receives `dataverse.throttle` (each 429, with the limit hit, `Retry-After` and `x-ms-dop-hint`), `dataverse.retry` (before each retry wait), `dataverse.concurrency.wait` (a request waited for a slot) and `dataverse.concurrency.limit` (`x-ms-dop-hint` changed the limit). The names are exported as `TelemetryEvents`. A request with telemetry turned off sends none.
  - **`DataverseClient.trackEvent(name, props, measurements)`** sends an event to the client's telemetry, guarded like the SDK's own calls. The batch package uses it to report `dataverse.batch` for each `$batch` (requests, succeeded, failed, duration, status, correlation id); `execute()` now generates the `$batch` correlation id itself when you don't pass one.
  - **otel and appinsights:** `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` implement `startDependency`: the CLIENT span starts with the active context, is active while the attempt runs (so `fetch` auto-instrumentation spans are its children), carries `http.request.resend_count` on retries, and its context is injected with the registered propagator, so the request carries its `traceparent`. `trackDependency` is removed from both.

### Minor Changes

- ff655da: Browser entry point (#158): `@mohsinonxrm/dataverse-sdk-appinsights/browser` exports `ApplicationInsightsBrowserTelemetryClient`, built on the app's own `ApplicationInsights` instance from `@microsoft/applicationinsights-web` (a new optional peer dependency, `^3.0.0`). Each request attempt is one `Fetch` dependency (`trackDependencyData`) with the URL as core redacted it, the correlation id and the Node adapter's `success` rule; events and exceptions go to `trackEvent` and `trackException`, with URLs redacted. `propagateTraceContext: true` sends a W3C `traceparent` naming the dependency (off by default because of the CORS preflight). The entry imports nothing from Node.js, OpenTelemetry or `@azure/monitor-opentelemetry`; the bundle-size check enforces it. The main entry point is unchanged.

### Patch Changes

- f363a6f: README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

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

- fd963bc: **Install change:** the OpenTelemetry and Azure Monitor packages are now **peer dependencies** of the telemetry adapters (#159). The app installs them, and the adapters use the app's copies.

  Before, they were regular dependencies. The adapter could then get its own `@opentelemetry/api` next to the app's. With two copies the adapter's spans could go to a no-op tracer instead of the app's provider. For example, with an app on `@opentelemetry/api` 1.8, the old adapter got its own 1.10 copy and recorded no dependency span. Installing the Application Insights adapter also always installed the whole Azure Monitor distro, about 190 packages.

  - **otel:** `@opentelemetry/api` `^1.9.0` is a peer.
  - **appinsights:** `@opentelemetry/api` `^1.9.0` and `@opentelemetry/api-logs` `^0.221.0` are peers. `@azure/monitor-opentelemetry` `^1.20.1` and `@opentelemetry/resources` `^2.0.0` are **optional** peers: only the `connectionString` (and `cloudRoleName`) setup needs them. The adapter imports them only if they are installed, so an app that calls `useAzureMonitor()` itself, or uses another OpenTelemetry setup, can leave them out. Passing `connectionString` without the distro throws a `DataverseInvalidRequestError` that names the package to install.
  - Both `package.json` files list `types` first in `exports`, with `default` instead of `import`, so TypeScript always resolves the types.

  **Migration:** add the packages to your app if it doesn't list them already:

  ```bash
  # otel
  npm install @opentelemetry/api
  # appinsights
  npm install @opentelemetry/api @opentelemetry/api-logs @azure/monitor-opentelemetry
  ```

  An app on a version outside these ranges now gets a peer-dependency error from npm when it installs, instead of a silent second copy.

### Minor Changes

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- f6d4f8a: Implement the telemetry adapters (#14). In 1.0.0 every method of `OpenTelemetryClient` and `ApplicationInsightsTelemetryClient` threw "not implemented", so passing either one as `telemetry` made **every Dataverse request fail**, even on a 200 response. Both now work, and no method ever throws: each catches its own errors, so telemetry can't change the outcome of a request.

  - **otel:** `trackDependency` records an OpenTelemetry `CLIENT` span per request with `http.request.method`, `url.full`, `server.address`, `server.port`, `http.response.status_code`, `dataverse.correlation_id` and the SDK's other properties under `dataverse.*`; failed calls get status `ERROR` and `error.type`. `trackException` records a `dataverse.exception` span with the exception event, and `trackEvent` adds an event to the active span (or records a short span). The config is now optional: `tracer`, a new `tracerProvider`, or the global provider by default. Set `service.name` on your OpenTelemetry SDK.
  - **appinsights:** built on the Azure Monitor OpenTelemetry distro. Dependencies are spans (Application Insights `dependencies`), events are log records with `microsoft.custom_event.name` (`customEvents`) and exceptions are log records with `exception.*` attributes (`exceptions`). Call `useAzureMonitor()` in your app and use `new ApplicationInsightsTelemetryClient()`, or pass `connectionString` (now optional) and the adapter calls `useAzureMonitor()` once per process, with `cloudRoleName` as `service.name`. New options: `tracer`, `tracerProvider`, `logger`, `loggerProvider`. New dependencies: `@opentelemetry/api`, `@opentelemetry/api-logs`, `@opentelemetry/resources`.
  - **Privacy:** URLs are redacted before they are recorded: query parameter values become `REDACTED` (names such as `$filter` are kept), quoted literals in the path (alternate keys) become `'REDACTED'`, and user info and fragments are dropped. This also applies to URLs inside property values and exception messages.
  - **Docs:** the READMEs now use the real option name, `telemetry` (not `telemetryClient`), the real config-object constructors, and an OTLP exporter example instead of the deprecated Jaeger exporter.

### Patch Changes

- 5e1125c: `ApplicationInsightsTelemetryClient` warns when a client passes a `connectionString` different from the one Azure Monitor was already started with in the process (#384). Its telemetry still goes to the first resource; before, that happened silently. The warning is a `WARN` log record through the client's `logger` or `loggerProvider`, or else a single `console.warn` per process, and never includes either connection string.
- 40ed643: Raise the minimum versions of runtime dependencies to current releases within the same major version: `@azure/monitor-opentelemetry` ^1.20.1, `@azure/msal-browser` ^3.30.0, `@azure/msal-node` ^2.16.3, and `chalk`/`commander`/`ora` for the generator CLI. Installs then resolve to releases without known high or critical advisories. The MSAL and Azure Monitor packages later became peer dependencies (#24, #85, #159), and these versions are the lowest their peer ranges accept.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 1ec85eb: Packaging fixes (#364):

  - appinsights: CommonJS apps can `require()` the package. It used top-level `await` to load its optional peers, which fails with `ERR_REQUIRE_ASYNC_MODULE`. `@azure/monitor-opentelemetry` and `@opentelemetry/resources` are now loaded on first use, only on the `connectionString` path, so an app that doesn't pass a connection string never loads the Azure Monitor distro.
  - auth-azure-identity: `@mohsinonxrm/dataverse-sdk-core` is a regular dependency, as in the other auth packages, instead of an exact-version peer dependency. As a peer it would have made every later minor release of the SDK a major one.

- 5e1125c: Dependency spans follow the OpenTelemetry HTTP client conventions and the app's URL redaction (#384):

  - `server.address` is the host name without the port (`org.example.com`, not `org.example.com:8443`); the port is in `server.port`.
  - `url.full` and the exception's `dataverse.request.url` are recorded as the SDK passes them, already redacted with the client's `redactUrl` option, so a custom `redactUrl` (for example one that keeps `$top`) takes effect. URLs inside exception messages, stack traces and other property values are still redacted by the adapter.
  - A call with a response fails when its status is 4xx or 5xx, whatever `success` says, so a `304 Not Modified` is not an error; a call without a response fails when `success` is `false`.

  The READMEs now explain that the dependency span is recorded after the call, so it is never the active span: the adapters send no `traceparent`, and HTTP auto-instrumentation spans are its siblings, not its children.

- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [c262ad7]
- Updated dependencies [f900b0c]
- Updated dependencies [9d1e26d]
- Updated dependencies [78e7716]
- Updated dependencies [a32fd68]
- Updated dependencies [b1f2738]
- Updated dependencies [eb27877]
- Updated dependencies [afb5242]
- Updated dependencies [60ccef3]
- Updated dependencies [7096f24]
- Updated dependencies [08efbd7]
- Updated dependencies [6b0dc00]
- Updated dependencies [4c62fee]
- Updated dependencies [1848068]
- Updated dependencies [c3337f8]
- Updated dependencies [63ee065]
- Updated dependencies [39b3917]
- Updated dependencies [bf38170]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [652ad75]
- Updated dependencies [329c0b0]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-core@1.0.0

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

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @mohsinonxrm/dataverse-sdk-core@1.0.0
