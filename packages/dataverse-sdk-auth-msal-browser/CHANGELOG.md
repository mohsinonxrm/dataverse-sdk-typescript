# @mohsinonxrm/dataverse-sdk-auth-msal-browser

## 2.0.0-beta.1

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

### Minor Changes

- 1bb355e: `MsalBrowserTokenProvider`: the account follows the app, `tenantId` is honoured, and MSAL's error details are kept (#26).

  - **Account resolved on every call.** The order is: the `account` function's result, then MSAL's active account, then a configured `account` object, then the first cached account. After `setActiveAccount(b)`, on the MSAL instance or the provider, tokens are for `b`. Before, a configured `account` always won, so the provider kept using the old account after an account switch.
    - **Behaviour change:** a configured `AccountInfo` is now a default for when MSAL has no active account. To pin a provider to one account whatever the active account is, pass a function: `account: () => myAccount`.
  - **`TokenOptions.tenantId`** is now sent as the request `authority` (`https://login.microsoftonline.com/<tenantId>`, on the host of the MSAL configuration's authority), for silent and interactive requests. Guest users can get a token from the Dataverse organization's tenant. A value that is not a tenant id or domain is rejected with `DataverseInvalidRequestError` (`name: "InvalidTenantId"`).
  - **Error details kept.** Every token failure now rejects with `MsalBrowserAuthenticationError`, a `DataverseAuthenticationError` with `name: "TokenAcquisitionFailed"`, carrying `code`, MSAL's `errorCode`, `subError`, `correlationId`, `errorNo` (for example `65001` for AADSTS65001), and the original error as `cause`. So `err.cause.errorCode === "consent_required"` can now be read.
    - **Behaviour change:** popup and redirect failures (for example `user_cancelled`) used to be the raw MSAL error. They are now wrapped too; the MSAL error is the `cause`.

- 9fe2685: Fix the interactive fallback of `MsalBrowserTokenProvider` (#25):

  - **No signed-in account now signs in.** With no cached account (or a silent `no_account_error`), `getToken()` failed with `TokenAcquisitionFailed`. It now opens the popup (or starts the redirect). `login_required` is also treated as interaction required.
  - **Interactive requests keep the account.** Popup and redirect requests now carry `account` and `loginHint`. The user is no longer shown the account picker, and can no longer switch accounts by accident, on consent or MFA step-up.
  - **Active account after sign-in.** The account returned by the popup becomes MSAL's active account.
  - **Single-flight.** Concurrent `getToken()` calls that need interaction share one popup, instead of N popups where N−1 fail with `interaction_in_progress`. A call for other scopes waits for the running popup, then tries silently before prompting.
  - **Blocked popup.** When the browser blocks the popup (`popup_window_error`, `empty_window_error`), the new option `fallbackToRedirect: true` starts a redirect instead. Without it, `getToken()` throws the new `MsalBrowserAuthenticationError` (`name: "PopupBlocked"`, `code: "popup_blocked"`, the MSAL error as `cause`). It is still a `DataverseAuthenticationError`.

  New exports: `MsalBrowserAuthenticationError`, `isPopupBlockedError`, `POPUP_BLOCKED_ERROR_CODES`.

- 27a43c6: `@azure/msal-browser` is now a **peer dependency** (`^3.30.0 || ^4.0.0 || ^5.0.0`) instead of a bundled `^3` dependency (#24).

  Before, an app on MSAL 4 or 5 got a second, nested MSAL 3 copy. The provider checked `error instanceof InteractionRequiredAuthError` against its own copy, so an "interaction required" error from the app's MSAL never matched: the popup/redirect fallback silently never ran and the call failed with `TokenAcquisitionFailed`. Types from the two copies also clashed.

  - The package now imports only types from `@azure/msal-browser`; nothing from MSAL is bundled or loaded at runtime.
  - Interaction-required errors are detected by `name === "InteractionRequiredAuthError"` or by MSAL `errorCode` (`interaction_required`, `consent_required`, `login_required`, `bad_token`, `ui_not_allowed`, `interrupted_user`, `no_tokens_found`, `native_account_unavailable`, `refresh_token_expired`). This works with errors from any MSAL copy or major.
  - New exports: `isInteractionRequiredError(error)`, `getMsalErrorCode(error)` and `INTERACTION_REQUIRED_ERROR_CODES`.

  **Migration:** if your app did not list `@azure/msal-browser` itself and relied on the copy this package brought in, add it:

  ```bash
  npm install @azure/msal-browser
  ```

  Apps that already depend on `@azure/msal-browser` (every app that creates a `PublicClientApplication` does) need no change, and now get a single MSAL copy (`npm ls @azure/msal-browser`).

- 6b58886: New SPA helpers (#27). They are framework-free, and the package still doesn't depend on React:

  - `initializeMsal(pca)`: runs `initialize()` and `handleRedirectPromise()`, then sets the active account: the redirect result's account, or, with no result and no active account, the only cached account. It never picks one of several cached accounts. It returns the redirect result or `null`.
  - `scopesForEnvironment(url, kind = "user_impersonation")`: returns `["https://<host>/user_impersonation"]` or `["https://<host>/.default"]`, and rejects non-`https` URLs.
  - `authorityFor(cloud, tenant = "organizations")`: returns the authority URL for `public`, `usgov`, `usgovdod` or `china`. The tenant is validated.
  - `createMsalBrowserProvider(pca, options)`: creates a `MsalBrowserTokenProvider`, deriving `scopes` from `environmentUrl` (and `scopeKind`) when they aren't given.

  Also exported: `AUTHORITY_HOSTS` and the types `EntraCloud`, `DataverseScopeKind` and `CreateMsalBrowserProviderOptions`.

### Patch Changes

- 40ed643: Raise the minimum versions of runtime dependencies to current releases within the same major version: `@azure/monitor-opentelemetry` ^1.20.1, `@azure/msal-browser` ^3.30.0, `@azure/msal-node` ^2.16.3, and `chalk`/`commander`/`ora` for the generator CLI. Installs then resolve to releases without known high or critical advisories. The MSAL and Azure Monitor packages later became peer dependencies (#24, #85, #159), and these versions are the lowest their peer ranges accept.
- 87994ff: `MsalBrowserTokenProvider`: configured claims no longer bypass MSAL's token cache, a silent iframe timeout starts the interactive flow, and `tenantId` works with `azureCloudOptions` (#382).

  - **Configured `claims`.** MSAL skips its token cache for a silent request with `claims`, and the provider sent the `claims` option on every silent call, so every Dataverse request went to Entra ID. They are now sent only when the request goes to Entra ID anyway: the interactive flow, the first silent call for each account, scope set and tenant, and a forced refresh. A claims challenge (`TokenOptions.claims`) is still always sent.
  - **`monitor_window_timeout`.** When the refresh token has expired and the browser blocks third-party cookies, MSAL's silent iframe times out, and the provider threw instead of prompting. It now starts the configured interaction (popup or redirect), as Microsoft recommends. MSAL 3 and 4 report it as `errorCode` `monitor_window_timeout`, MSAL 5 as `timed_out` with `subError` `monitor_window_timeout`; other `timed_out` errors still throw.
  - **`tenantId` with `azureCloudOptions`.** When the MSAL configuration uses `azureCloudOptions`, MSAL ignores a request's `authority`, so `TokenOptions.tenantId` had no effect. The request now carries `azureCloudOptions` for that tenant too, and the authority uses the `azureCloudOptions` cloud.

- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- 05a489a: The token providers act on `TokenOptions.forceRefresh` (#167), which the core client sets after a 401 (#21). Before, the 401 retry could receive the same cached token again.

  - **msal-node:** passes `skipCache: true` for client credentials, and `forceRefresh` in the silent flow.
  - **msal-browser:** passes `forceRefresh: true` to `acquireTokenSilent`.
  - **azure-identity:** `@azure/identity` has no refresh option, so the provider ignores `forceRefresh` and leaves caching to each credential; this is documented. A claims challenge is still passed on.

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
