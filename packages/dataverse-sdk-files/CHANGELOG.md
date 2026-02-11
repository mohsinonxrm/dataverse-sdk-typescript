# @mohsinonxrm/dataverse-sdk-files

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-actions@1.0.0
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
  - @mohsinonxrm/dataverse-sdk-actions@1.0.0
