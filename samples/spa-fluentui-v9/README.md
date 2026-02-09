# spa-fluentui-v9: Comprehensive SDK Feature Showcase

A comprehensive reference implementation demonstrating **all capabilities** of the @mohsinonxrm/dataverse-sdk-typescript packages in a modern React 18 SPA with Fluent UI v9.

## 🎯 Purpose

This sample serves as:

- **Complete SDK reference**: Demonstrates all 16 packages and 15 capability areas
- **Production patterns**: Shows error handling, resilience, type safety, and observability
- **Learning resource**: Side-by-side API comparisons with copy-able code snippets
- **Decision guidance**: When to use which approach (Raw API vs Typed vs OrgService vs Messages)

## 📦 SDK Packages Demonstrated

### Core Infrastructure

- `@mohsinonxrm/dataverse-sdk-core` - Client, request builder, middleware pipeline
- `@mohsinonxrm/dataverse-sdk-auth-msal-browser` - MSAL browser authentication

### Data Operations

- `@mohsinonxrm/dataverse-sdk-xrm` - OrganizationService (C#-familiar CRUD)
- `@mohsinonxrm/dataverse-sdk-batch` - $batch operations with changesets
- `@mohsinonxrm/dataverse-sdk-actions` - Typed actions (1200+ including bulk operations)
- `@mohsinonxrm/dataverse-sdk-functions` - Typed functions (150+)
- `@mohsinonxrm/dataverse-sdk-messages` - SDK messages (1000+)

### Specialized Operations

- `@mohsinonxrm/dataverse-sdk-metadata` - Entity/attribute metadata management
- `@mohsinonxrm/dataverse-sdk-files` - Chunked file upload/download
- `@mohsinonxrm/dataverse-sdk-discovery` - Global discovery service

### Optional Enhancements

- `@mohsinonxrm/dataverse-sdk-appinsights` - Application Insights telemetry
- `@mohsinonxrm/dataverse-sdk-otel` - OpenTelemetry integration

## 🗺️ Feature Map

### Data Operations

- **[CRUD Operations](/crud)**: Three API approaches (Raw, Typed, OrgService) with side-by-side comparison
- **[Advanced Querying](/querying)**: OData filtering, sorting, pagination, FetchXML
- **[Bulk Operations](/bulk)**: CreateMultiple, UpdateMultiple, UpsertMultiple (100s of records)
- **[Batch Operations](/batch)**: $batch with changesets, dependencies, partial failures
- **[Relationships](/relationships)**: Associate, disassociate, bind helpers

### Metadata Management

- **[Metadata Explorer](/metadata)**: Entity/attribute CRUD, option sets, relationships, delta queries

### File Operations

- **[File Operations](/files)**: Chunked upload/download with progress tracking

### DevOps & Automation

- **[Discovery Service](/discovery)**: Organization listing and region filtering
- **[Actions & Functions](/actions-functions)**: Typed action/function execution
- **[Messages](/messages)**: SDK messages for platform and business operations

### Observability & Resilience

- **[Observability](/observability)**: Retry middleware, concurrency control, telemetry

### Reference & Learning

- **[Type Safety](/type-safety)**: Compile-time type checking demonstrations
- **[API Comparison](/api-reference)**: When to use which API approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Dataverse environment (trial or production)
- Azure AD app registration

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Authentication

Edit `src/config.ts`:

```typescript
export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: "http://localhost:3000",
  },
};

export const dataverseConfig = {
  baseUrl: "https://yourorg.crm.dynamics.com",
};
```

### 3. Run Development Server

```bash
pnpm run dev
```

Navigate to http://localhost:3000

### 4. Login

Click "Login" button → Authenticate with Azure AD → Explore scenarios

## 📚 Scenario Guide

### Beginner: Start Here

1. **[CRUD Operations](/crud)** - Understand three API approaches
2. **[Advanced Querying](/querying)** - Learn OData query capabilities
3. **[Relationships](/relationships)** - Work with entity relationships

### Intermediate: High-Throughput Operations

4. **[Bulk Operations](/bulk)** - Process 100s of records efficiently
5. **[Batch Operations](/batch)** - Transactional operations with changesets
6. **[File Operations](/files)** - Upload/download large files with progress

### Advanced: Metadata & Automation

7. **[Metadata Explorer](/metadata)** - Manage entity definitions and schema
8. **[Actions & Functions](/actions-functions)** - Execute business processes
9. **[Messages](/messages)** - Solution management and platform operations

### Enterprise: Multi-Org & Observability

10. **[Discovery Service](/discovery)** - Multi-org scenarios
11. **[Observability](/observability)** - Monitor resilience and performance

### Reference: Best Practices

12. **[Type Safety](/type-safety)** - Leverage TypeScript type system
13. **[API Comparison](/api-reference)** - Choose the right API

## 🛠️ Architecture

### State Management

- **React Context** for shared SDK instances (DataverseClient, OrganizationService)
- **Local state** (useState) for page-specific data
- Simple and easy to follow

### Error Handling

- **Type-aware error display** for all Dataverse error types:
  - `DataverseODataError` - OData protocol errors
  - `DataverseThrottleError` - 429 throttling with retry countdown
  - `DataverseBatchError` - Batch partial failures
  - `DataverseInvalidRequestError` - Client-side validation
- **Visual retry demonstrations** with exponential backoff

### Component Structure

```
src/
├── components/          # Shared components
│   ├── layout/         # Header, Sidebar, Breadcrumbs
│   ├── demo/           # CodeComparison, ProgressTracker
│   ├── errors/         # ErrorDisplay, type-specific cards
│   └── forms/          # EntityPicker, RecordPicker
├── context/            # DataverseContext provider
├── pages/              # Scenario pages (13 total)
│   ├── CrudOperations/
│   ├── BulkOperations/
│   ├── BatchOperations/
│   └── [...]
└── config.ts           # MSAL and Dataverse configuration
```

## 📖 Learning Paths

### Path 1: API Comparison

**Goal**: Understand when to use which API

1. Visit [CRUD Operations](/crud)
2. Compare three approaches side-by-side:
   - `client.api()` raw - Full control, verbose
   - `client.api<T>()` typed - Type safety, fluent
   - `orgService.create()` - C#-familiar, concise
3. Check [API Comparison Reference](/api-reference) for decision matrix

### Path 2: High Performance

**Goal**: Process large datasets efficiently

1. [Bulk Operations](/bulk) - CreateMultiple for throughput
2. [Batch Operations](/batch) - Changesets for transactions
3. Decision: Bulk for speed, Batch for atomicity
4. [Observability](/observability) - Monitor concurrency and retries

### Path 3: Metadata Management

**Goal**: Build dynamic applications

1. [Metadata Explorer](/metadata) - Browse entity schema
2. Create custom entity with attributes
3. Manage option sets and relationships
4. Use [Type Safety](/type-safety) to leverage strict types

### Path 4: File Handling

**Goal**: Work with file columns

1. [File Operations](/files) - Upload large files
2. Watch chunked upload (4MB chunks)
3. Track progress in real-time
4. Download and delete files

## 🔍 Code Examples

### Example 1: Create Account (Three Ways)

```typescript
// Approach 1: Raw API
const account = await client.api("/accounts").post({ name: "Contoso Ltd", revenue: 1000000 });

// Approach 2: Typed API
const typedAccount = await client
  .api<Account>("/accounts")
  .post({ name: "Contoso Ltd", revenue: 1000000 });

// Approach 3: OrgService
const id = await orgService.create("accounts", {
  name: "Contoso Ltd",
  revenue: 1000000,
});
```

### Example 2: Bulk Create 100 Accounts

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = Array.from({ length: 100 }, (_, i) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: `Account ${i + 1}`,
  revenue: Math.random() * 1000000,
}));

const action = new CreateMultipleAction({ Targets: accounts });
const result = await client.execute(action);

console.log(`Created ${result.Ids.length} accounts`);
```

### Example 3: Batch with Changeset

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

batch.beginChangeset();
batch.addRequest("create-account", "POST", "/accounts", undefined, {
  name: "Parent Account",
});
batch.addRequest("create-contact", "POST", "/contacts", ["create-account"], {
  firstname: "John",
  lastname: "Doe",
  "parentcustomerid_account@odata.bind": "/accounts($1)",
});
batch.endChangeset();

const result = await batch.execute({ continueOnError: true });
```

### Example 4: Chunked File Upload

```typescript
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

const fileClient = new FileColumnClient(client);

await fileClient.upload("contacts", contactId, "entityimage", fileBlob, {
  chunkSize: 4 * 1024 * 1024, // 4MB chunks
  onProgress: (progress) => {
    console.log(`Progress: ${progress.percentage}%`);
    console.log(`Chunk ${progress.currentChunk}/${progress.totalChunks}`);
  },
});
```

## 🧪 Error Handling Examples

### Handle Throttling (429)

```typescript
try {
  await client.api("/accounts").top(5000).get(); // May trigger throttling
} catch (error) {
  if (error instanceof DataverseThrottleError) {
    console.log(`Throttled. Retry after ${error.retryAfter} seconds`);
    // SDK will auto-retry with exponential backoff
  }
}
```

### Handle Batch Partial Failures

```typescript
try {
  const result = await batch.execute({ continueOnError: true });

  if (!result.allSucceeded) {
    console.log(`${result.successCount} succeeded, ${result.failureCount} failed`);

    // Process partial results
    result.responses.forEach((response, requestId) => {
      console.log(`${requestId}: Success`);
    });

    result.errors.forEach((error, requestId) => {
      console.error(`${requestId}: ${error.status} - ${error.message}`);
    });
  }
} catch (error) {
  if (error instanceof DataverseBatchError) {
    // Handle batch-level error
  }
}
```

## 🎨 UI Components

### Shared Components

- **CodeComparison**: Side-by-side code and result display
- **ErrorDisplay**: Type-aware error rendering
- **ProgressTracker**: Visual progress for bulk/batch/file operations
- **LoadingState**: Skeleton loaders
- **EntityPicker**: Select entity types
- **RecordPicker**: Select specific records

### Error Cards

- **ODataErrorCard**: Display OData protocol errors
- **ThrottleErrorCard**: Show retry countdown
- **BatchErrorCard**: Display partial failures with details

## 📊 Feature Checklist

### Data Operations

- [ ] CRUD with three API approaches
- [ ] Advanced OData querying
- [ ] FetchXML support
- [ ] Pagination (get, getPage, iterate, getAll)
- [ ] Bulk operations (CreateMultiple, UpdateMultiple, UpsertMultiple)
- [ ] Batch operations with changesets
- [ ] Relationship management (associate, disassociate, bind)
- [ ] Optimistic concurrency
- [ ] Impersonation

### Metadata

- [ ] Entity CRUD
- [ ] Attribute CRUD
- [ ] Option set management
- [ ] Relationship management (1:N, N:N)
- [ ] RetrieveMetadataChanges (delta queries)
- [ ] Type safety (Read vs Create/Update types)

### Files

- [ ] Chunked upload with progress
- [ ] Chunked download
- [ ] File deletion
- [ ] Image column support

### Actions & Functions

- [ ] Typed action execution
- [ ] Typed function execution
- [ ] Business actions (ExecuteWorkflow, WinOpportunity, Merge)
- [ ] Bulk actions

### Messages

- [ ] Platform messages (WhoAmI, Assign, SetState)
- [ ] Business messages (ExecuteWorkflow, WinOpportunity)
- [ ] Solution messages (Export, Import, Publish)

### Discovery

- [ ] List organizations
- [ ] Filter by region
- [ ] Organization details

### Observability

- [ ] Retry visualization
- [ ] Concurrency monitoring
- [ ] Telemetry dashboard
- [ ] Error recovery flows

### Reference

- [ ] Type safety demonstrations
- [ ] API comparison matrix
- [ ] When-to-use guidance

## 🤝 Contributing

This sample is part of the dataverse-sdk-typescript monorepo. See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

GNU AGPL v3.0 - See [LICENSE](../../LICENSE) for details.

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Detailed architecture and implementation guide
- [SDK Documentation](../../docs/) - Complete SDK documentation
- [API Reference](https://mohsinonxrm.github.io/dataverse-sdk-typescript/) - Auto-generated API docs

## 🐛 Troubleshooting

### Login Issues

- Ensure Azure AD app registration has correct redirect URI
- Check `clientId` and `authority` in `src/config.ts`
- Verify user has access to Dataverse environment

### API Errors

- Check `baseUrl` points to correct Dataverse environment
- Ensure user has required security roles
- Review error details in ErrorDisplay component

### Build Errors

- Run `pnpm install` to ensure dependencies are installed
- Clear `node_modules` and reinstall if needed
- Ensure Node.js 18+ is installed

## 🎓 Next Steps

1. **Explore scenarios** - Navigate through all 13 pages
2. **Copy code snippets** - Use examples in your own projects
3. **Read implementation plan** - Understand architecture decisions
4. **Extend the sample** - Add your own scenarios
5. **Share feedback** - Open issues for improvements

---

**Built with ❤️ using dataverse-sdk-typescript**

3. **React hooks work beautifully with SDK** - `useEffect` for data loading, `useState` for state management
4. **TypeScript enables confident refactoring** - catch errors at compile time
5. **Vite provides fast development** - instant HMR, optimized builds

This sample serves as a **template** for building production Dataverse SPAs. Clone it, customize it, and ship it!

## License

This sample is part of `@mohsinonxrm/dataverse-sdk-typescript` and is licensed under GNU AGPL v3.0.
