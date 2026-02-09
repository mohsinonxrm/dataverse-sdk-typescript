# spa-fluentui-v9: Comprehensive SDK Feature Showcase

> **Purpose**: This document provides the complete implementation plan for transforming the spa-fluentui-v9 sample from a basic CRUD demo into a comprehensive reference implementation showcasing all dataverse-sdk-typescript capabilities.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Page Structure](#page-structure)
4. [Component Hierarchy](#component-hierarchy)
5. [Implementation Phases](#implementation-phases)
6. [Scenario Details](#scenario-details)
7. [State Management](#state-management)
8. [Error Handling](#error-handling)
9. [Routing](#routing)
10. [Testing Approach](#testing-approach)

---

## Overview

### Goals

Transform spa-fluentui-v9 into a comprehensive SDK showcase demonstrating:

- **15 distinct capability areas** across **16 SDK packages**
- **Production-ready patterns** for real-world applications
- **Side-by-side comparisons** of different API approaches
- **Error handling and resilience** features
- **Type safety** demonstrations

### Non-Goals

- User authentication enhancements (tabled)
- Sample data provisioning automation (tabled)
- Progressive complexity layers (tabled - we'll keep focused demonstrations)

---

## Architecture Decisions

### State Management: React Context

**Decision**: Use React Context for shared SDK instances, local state for page-specific data.

**Rationale**:

- Simple, built-in React feature
- Avoids prop drilling without external dependencies
- Easy to understand for sample/reference purposes
- Aligns with "keep things simple" directive

**Implementation**:

```typescript
// src/context/DataverseContext.tsx
interface DataverseContextValue {
  client: DataverseClient;
  orgService: OrganizationService;
  baseUrl: string;
}

const DataverseContext = createContext<DataverseContextValue | null>(null);

export function useDataverse() {
  const context = useContext(DataverseContext);
  if (!context) throw new Error("useDataverse must be used within DataverseProvider");
  return context;
}
```

### Error Handling: Showcase Pattern

**Decision**: Per-page try/catch with typed error handling + visual retry demonstrations.

**Rationale**:

- Shows SDK error types in action
- Demonstrates error recovery patterns
- Visual feedback for SDK resilience features
- Educational value for developers

**Implementation**:

```typescript
// Error Display Component
function ErrorDisplay({ error }: { error: unknown }) {
  if (error instanceof DataverseODataError) {
    return <ODataErrorCard error={error} />;
  }
  if (error instanceof DataverseThrottleError) {
    return <ThrottleErrorCard error={error} showRetryCountdown />;
  }
  if (error instanceof DataverseBatchError) {
    return <BatchErrorCard error={error} showPartialResults />;
  }
  // ... handle other error types
}
```

### Component Design: Composition

**Decision**: Small, focused components composed into pages.

**Structure**:

- **Pages**: Container components managing page state
- **Feature Components**: Reusable demonstrations (CodeComparison, ProgressTracker)
- **Shared Components**: Generic UI (ErrorDisplay, LoadingState)

---

## Page Structure

### Data Operations Category

#### 1. CRUD Operations (`/crud`)

**Purpose**: Demonstrate three approaches to CRUD operations

**Tabs**:

1. **Raw API**: `client.api('/accounts').select(...).get()`
2. **Typed API**: Using typed request builders
3. **OrgService**: C#-familiar `orgService.create()`, `retrieve()`, etc.

**Features**:

- Side-by-side code comparison
- Identical operations with different APIs
- Query builder demonstration
- Optimistic concurrency
- Impersonation

**Code Example**:

```typescript
// Tab 1: Raw API
const account = await client
  .api("/accounts(00000000-0000-0000-0000-000000000001)")
  .select(["name", "revenue"])
  .expand(["primarycontactid"])
  .get<Account>();

// Tab 2: Typed API (same result)
const typedAccount = await client
  .api<Account>("/accounts(00000000-0000-0000-0000-000000000001)")
  .select(["name", "revenue"])
  .expand([
    {
      navigationProperty: "primarycontactid",
      select: ["fullname", "emailaddress1"],
    },
  ])
  .get();

// Tab 3: OrgService (same result)
const orgAccount = await orgService.retrieve<Account>(
  "accounts",
  "00000000-0000-0000-0000-000000000001",
  {
    select: ["name", "revenue"],
    expand: [
      {
        navigationProperty: "primarycontactid",
        select: ["fullname", "emailaddress1"],
      },
    ],
  }
);
```

**Components**:

- `CrudComparison.tsx` - Side-by-side tabs
- `QueryBuilderDemo.tsx` - Interactive query construction
- `OptimisticConcurrencyDemo.tsx` - If-Match header demonstration

---

#### 2. Advanced Querying (`/querying`)

**Purpose**: Showcase OData query capabilities

**Sections**:

1. **Filtering**: Complex filters with operators
2. **Sorting & Paging**: OrderBy, top, skip
3. **Expanding**: Nested expands with filters
4. **Searching**: Full-text search
5. **Aggregation**: Apply with groupby/aggregate
6. **FetchXML**: `retrieveMultipleWithFetchXml`

**Features**:

- Query string visualization
- Result count tracking
- Pagination demonstration (`getPage()`, `iterate()`, `getAll()`)
- FetchXML builder

**Code Example**:

```typescript
// Complex query with multiple features
const results = await client
  .api("/accounts")
  .select(["name", "revenue", "createdon"])
  .filter("revenue gt 1000000 and statecode eq 0")
  .orderBy(["revenue desc", "name"])
  .expand([
    {
      navigationProperty: "primarycontactid",
      select: ["fullname"],
      filter: "statecode eq 0",
    },
  ])
  .top(25)
  .count(true)
  .get<Account>();

console.log(`Found ${results["@odata.count"]} total records`);
```

**Components**:

- `FilterBuilder.tsx` - Interactive filter construction
- `PaginationDemo.tsx` - Demonstrate all pagination methods
- `FetchXmlEditor.tsx` - FetchXML input with syntax highlighting

---

#### 3. Bulk Operations (`/bulk`)

**Purpose**: Demonstrate bulk actions for high-throughput scenarios

**Operations**:

1. **CreateMultiple**: Create 100+ records
2. **UpdateMultiple**: Update 100+ records
3. **UpsertMultiple**: Upsert 100+ records
4. **DeleteMultiple**: Delete (elastic tables only)

**Features**:

- Progress tracking (records processed)
- Performance metrics (records/second)
- Error handling (partial failures)
- Decision matrix: Bulk vs Batch
- ConcurrencyBehavior parameter demo

**Code Example**:

```typescript
// CreateMultiple demo
const accounts = Array.from({ length: 100 }, (_, i) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: `Bulk Account ${i + 1}`,
  revenue: Math.floor(Math.random() * 1000000),
}));

const action = new CreateMultipleAction({
  Targets: accounts,
  ConcurrencyBehavior: 0, // Default
});

const result = await client.execute(action);
console.log(`Created ${result.Ids.length} accounts`);
```

**Components**:

- `BulkProgressTracker.tsx` - Real-time progress visualization
- `BulkVsBatchMatrix.tsx` - Decision guidance table
- `BulkOperationConfig.tsx` - Parameter configuration UI

---

#### 4. Batch Operations (`/batch`)

**Purpose**: Demonstrate $batch for transactional operations

**Features**:

1. **Simple Batch**: Multiple independent requests
2. **Changesets**: Transactional groups
3. **Dependencies**: Content-ID references
4. **Auto-Splitting**: Handle >1000 requests
5. **Partial Failures**: Continue-on-error

**Interactive Builder**:

- Drag-and-drop request ordering
- Visual changeset boundaries
- Dependency graph visualization
- Execute button with progress

**Code Example**:

```typescript
const batch = new BatchRequestBuilder(client);

// Independent GET requests
batch.addRequest("get-accounts", "GET", "/accounts?$top=5");
batch.addRequest("get-contacts", "GET", "/contacts?$top=5");

// Transactional changeset
batch.beginChangeset();
batch.addRequest("create-account", "POST", "/accounts", undefined, {
  name: "Contoso Ltd",
});
batch.addRequest("create-contact", "POST", "/contacts", ["create-account"], {
  firstname: "John",
  lastname: "Doe",
  "parentcustomerid_account@odata.bind": "/accounts($1)", // Reference to account
});
batch.endChangeset();

const result = await batch.execute({
  continueOnError: true,
});

console.log(`Success: ${result.successCount}, Failed: ${result.failureCount}`);
```

**Components**:

- `BatchBuilder.tsx` - Interactive batch construction
- `ChangesetVisualizer.tsx` - Visual changeset boundaries
- `BatchResultsViewer.tsx` - Per-request results/errors
- `DependencyGraph.tsx` - Content-ID dependency visualization

---

#### 5. Relationship Operations (`/relationships`)

**Purpose**: Demonstrate entity relationship management

**Operations**:

1. **Associate**: Link records (N:N, 1:N)
2. **Disassociate**: Unlink records
3. **Bind**: Single-valued navigation (create with lookup)
4. **BindMany**: Batch associate multiple

**Features**:

- Visual relationship picker
- Relationship type identification (1:N vs N:N)
- Navigation property reference
- Batch binding demo

**Code Example**:

```typescript
// Associate contact to account (1:N)
await orgService.associate(
  "accounts",
  accountId,
  "contact_customer_accounts", // relationship name
  "contacts",
  contactId
);

// Disassociate (N:N example)
await orgService.disassociate("systemusers", userId, "teammembership_association", teamId);

// Create with binding
const payload = {
  firstname: "Jane",
  lastname: "Smith",
  ...client.bind("parentcustomerid_account", "accounts", accountId),
};
await client.api("/contacts").post(payload);
```

**Components**:

- `RelationshipPicker.tsx` - Select entities and relationships
- `AssociationVisualizer.tsx` - Show linked records
- `BindingDemo.tsx` - Demonstrate bind() helper

---

### Metadata Operations Category

#### 6. Metadata Explorer (`/metadata`)

**Purpose**: Demonstrate metadata API capabilities

**Sections**:

1. **Entities**: Browse, create, update, delete entities
2. **Attributes**: Attribute CRUD with type-specific builders
3. **Relationships**: 1:N and N:N relationship management
4. **Option Sets**: Global and local option sets
5. **Delta Queries**: RetrieveMetadataChanges

**Features**:

- Metadata tree browser
- Create entity wizard
- Attribute type selector
- Option set value manager
- Type safety demonstration (Read vs Create/Update types)

**Code Example**:

```typescript
// Create custom entity
const entityMetadata: EntityMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  LogicalName: "new_customentity",
  DisplayName: {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
        Label: "Custom Entity",
        LanguageCode: 1033,
      },
    ],
  },
  DisplayCollectionName: {
    /* ... */
  },
  OwnershipType: 1, // UserOwned
  HasActivities: true,
  HasNotes: true,
};

const entityId = await metadataClient.createEntity(entityMetadata);

// Create string attribute
const attributeMetadata: StringAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  AttributeType: 0, // String
  LogicalName: "new_description",
  SchemaName: "new_Description",
  DisplayName: {
    /* ... */
  },
  RequiredLevel: { Value: 0 }, // None
  MaxLength: 500,
  FormatName: { Value: "Text" },
};

await metadataClient.createAttribute("new_customentity", attributeMetadata);
```

**Components**:

- `MetadataBrowser.tsx` - Tree view of entities/attributes
- `EntityWizard.tsx` - Step-by-step entity creation
- `AttributeBuilder.tsx` - Type-specific attribute forms
- `OptionSetManager.tsx` - Add/remove/reorder options
- `TypeSafetyDemo.tsx` - Show compile-time type checking

---

### File Operations Category

#### 7. File Operations (`/files`)

**Purpose**: Demonstrate file column upload/download

**Features**:

1. **Upload**: Chunked upload with progress
2. **Download**: Download with save-as
3. **Delete**: Remove file from column
4. **Profile Picture**: Demo with contact entityimage

**Upload Flow**:

- File picker
- Chunk size configuration (default 4MB)
- Real-time progress bar
- Chunk-by-chunk tracking
- Success confirmation with download link

**Code Example**:

```typescript
const fileClient = new FileColumnClient(client);

// Upload with progress tracking
await fileClient.upload("contacts", contactId, "entityimage", fileBlob, {
  chunkSize: 4 * 1024 * 1024, // 4MB
  onProgress: (progress) => {
    console.log(`Uploaded ${progress.loaded} / ${progress.total} bytes`);
    console.log(`Chunk ${progress.currentChunk} / ${progress.totalChunks}`);
    setUploadProgress(progress.percentage);
  },
});

// Download
const blob = await fileClient.download("contacts", contactId, "entityimage");
const url = URL.createObjectURL(blob);
// Trigger download
```

**Components**:

- `FileUploader.tsx` - File picker with drag-and-drop
- `UploadProgress.tsx` - Chunk-by-chunk progress visualization
- `FileDownloader.tsx` - Download with save-as dialog
- `ProfilePictureDemo.tsx` - Contact image upload/preview

---

### DevOps Category

#### 8. Discovery Service (`/discovery`)

**Purpose**: Demonstrate organization discovery

**Features**:

1. **List Organizations**: All accessible orgs
2. **Filter by Region**: NA, EMEA, APAC
3. **Org Details**: Endpoints, version, geo
4. **Interactive Selection**: Select org and connect

**Code Example**:

```typescript
const discoveryClient = new GlobalDiscoveryClient({
  tokenProvider: msalTokenProvider,
});

// List all organizations
const orgs = await discoveryClient.listOrganizations();

orgs.forEach((org) => {
  console.log(`${org.FriendlyName} (${org.UniqueName})`);
  console.log(`  Region: ${org.Geo}`);
  console.log(`  Web API: ${org.Endpoints.WebApiUrl}`);
  console.log(`  Version: ${org.Version}`);
});

// Filter by region
const naOrgs = await discoveryClient.filterByRegion("NA");

// Get specific org
const org = await discoveryClient.getOrganization("contoso");
```

**Components**:

- `OrganizationList.tsx` - Searchable/filterable list
- `OrganizationCard.tsx` - Org details card
- `RegionFilter.tsx` - Region selector
- `ConnectionTester.tsx` - Test connectivity to selected org

---

#### 9. Actions & Functions (`/actions-functions`)

**Purpose**: Demonstrate typed actions and functions

**Sections**:

1. **Functions**: GET, no side effects (WhoAmI)
2. **Actions**: POST, may have side effects (ExecuteWorkflow, WinOpportunity, Merge)
3. **Bulk Actions**: CreateMultiple, UpdateMultiple, UpsertMultiple
4. **File Actions**: File upload/download actions

**Features**:

- Action/function picker
- Parameter builder
- Request/response display
- Side-by-side: action vs orgService.execute()

**Code Example**:

```typescript
// Function (GET)
const whoAmI = new WhoAmIFunction();
const result = await client.execute(whoAmI);
console.log(`User ID: ${result.UserId}`);

// Action (POST)
const executeWorkflow = new ExecuteWorkflowAction({
  WorkflowId: workflowId,
  EntityId: recordId,
});
const response = await client.execute(executeWorkflow);
console.log(`Async operation ID: ${response.AsyncOperationId}`);

// Business action
const winOpp = new WinOpportunityAction({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Won!",
    actualrevenue: 50000,
    actualend: new Date().toISOString(),
  },
  Status: -1, // Won
});
await client.execute(winOpp);
```

**Components**:

- `ActionFunctionPicker.tsx` - Browse/search actions and functions
- `ParameterBuilder.tsx` - Dynamic form for parameters
- `RequestViewer.tsx` - Show generated HTTP request
- `ResponseViewer.tsx` - Formatted response display

---

#### 10. Messages (`/messages`)

**Purpose**: Demonstrate SDK messages (XrmSdkMessages, CrmSdkMessages)

**Message Categories**:

1. **Platform Messages**: WhoAmI, Assign, SetState
2. **Business Messages**: ExecuteWorkflow, WinOpportunity, Merge
3. **Solution Messages**: ExportSolution, ImportSolution, PublishXml

**Features**:

- Message catalog with search
- Parameter documentation
- Execute via orgService.execute()
- Response parsing

**Code Example**:

```typescript
// XrmSdkMessages
const assignRequest = new AssignRequest({
  Target: {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: accountId,
  },
  Assignee: {
    "@odata.type": "Microsoft.Dynamics.CRM.systemuser",
    systemuserid: userId,
  },
});
await orgService.execute(assignRequest);

// CrmSdkMessages
const exportRequest = new ExportSolutionRequest({
  SolutionName: "MySolution",
  Managed: false,
  ExportAutoNumberingSettings: true,
  ExportCalendarSettings: true,
});
const response = await orgService.execute(exportRequest);
const solutionZip = response.ExportSolutionFile; // Base64
```

**Components**:

- `MessageCatalog.tsx` - Searchable message list
- `MessageExecutor.tsx` - Execute message with parameters
- `SolutionManager.tsx` - Import/export solution workflow

---

### Observability Category

#### 11. Observability & Resilience (`/observability`)

**Purpose**: Demonstrate SDK resilience and telemetry features

**Sections**:

1. **Retry Middleware**: Trigger 429/5xx and watch retry
2. **Concurrency Control**: Adaptive concurrency from x-ms-dop-hint
3. **Telemetry**: Request metrics and custom events
4. **Error Recovery**: Exponential backoff visualization

**Interactive Demos**:

- **Retry Simulator**: Button to trigger 429, watch countdown
- **Concurrency Monitor**: Real-time semaphore state
- **Telemetry Dashboard**: Request count, avg duration, errors
- **Backoff Visualizer**: Animated retry delays

**Code Example**:

```typescript
// Trigger retry (simulated 429)
try {
  await client.api("/accounts").get(); // Will trigger 429 in demo mode
} catch (error) {
  if (error instanceof DataverseThrottleError) {
    console.log(`Retry after ${error.retryAfter} seconds`);
    // SDK will auto-retry with exponential backoff
  }
}

// Monitor concurrency
const telemetry = client.getTelemetry(); // Custom method for demo
console.log(`Current concurrent requests: ${telemetry.concurrentRequests}`);
console.log(`Max concurrency: ${telemetry.maxConcurrency}`);
console.log(`Adaptive hint: ${telemetry.dopHint}`);
```

**Components**:

- `RetryVisualizer.tsx` - Countdown timer and retry attempts
- `ConcurrencyMonitor.tsx` - Semaphore state visualization
- `TelemetryDashboard.tsx` - Request metrics charts
- `BackoffAnimator.tsx` - Exponential backoff timeline

---

### Reference Category

#### 12. Type Safety Demo (`/type-safety`)

**Purpose**: Demonstrate compile-time type safety

**Sections**:

1. **Metadata Types**: Read vs Create/Update splits
2. **Discriminated Unions**: @odata.type enforcement
3. **EntityReference**: Type-safe entity references
4. **OptionSet**: number vs { Value: number }

**Features**:

- Side-by-side valid/invalid code
- Compiler errors displayed
- Type inference examples
- Generic constraints

**Code Example**:

```typescript
// ✅ Valid: Read type
const entity: AccountRead = await client.api("/accounts(id)").get();
entity.accountid; // OK
entity.createdon; // OK

// ❌ Invalid: Cannot assign read-only fields on create
const create: AccountCreate = {
  accountid: "...", // ❌ Compile error: read-only
  createdon: new Date(), // ❌ Compile error: system field
  name: "Test", // ✅ OK
};

// ✅ Valid: Discriminated union
const target: Target = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: "...",
};

// ✅ Valid: OptionSet normalization
const statuscode: number = 1;
const optionSet: OptionSetValue = { Value: 1 };
// SDK accepts both and normalizes
```

**Components**:

- `TypeComparisonTable.tsx` - Valid vs invalid code side-by-side
- `CompilerErrorDisplay.tsx` - Show TypeScript errors
- `TypeInferenceDemo.tsx` - Demonstrate type inference

---

#### 13. API Comparison Reference (`/api-reference`)

**Purpose**: Side-by-side comparison of all API approaches

**Comparison Matrix**:

| Operation        | client.api() Raw     | client.api() Typed        | orgService  | Message                |
| ---------------- | -------------------- | ------------------------- | ----------- | ---------------------- |
| Create           | POST /accounts       | api<Account>().post()     | create()    | -                      |
| Retrieve         | GET /accounts(id)    | api<Account>(id).get()    | retrieve()  | -                      |
| Update           | PATCH /accounts(id)  | api<Account>(id).patch()  | update()    | -                      |
| Delete           | DELETE /accounts(id) | api<Account>(id).delete() | delete()    | -                      |
| Associate        | POST relationship    | -                         | associate() | -                      |
| Assign           | POST Assign action   | -                         | assign()    | AssignRequest          |
| Execute Workflow | POST ExecuteWorkflow | ExecuteWorkflowAction     | -           | ExecuteWorkflowRequest |

**Features**:

- Interactive table
- Copy code snippets
- Performance notes
- When to use which approach

**Components**:

- `ApiComparisonTable.tsx` - Sortable/filterable comparison
- `CodeSnippetCopier.tsx` - Copy to clipboard
- `PerformanceNotes.tsx` - Guidance on API selection

---

## Component Hierarchy

### Shared Components (`src/components/`)

```
components/
├── layout/
│   ├── Header.tsx                 # Navigation menu with scenario groups
│   ├── Sidebar.tsx                # Collapsible side navigation
│   ├── Breadcrumbs.tsx            # Page navigation trail
│   └── Layout.tsx                 # Main layout wrapper
│
├── demo/
│   ├── CodeComparison.tsx         # Side-by-side code/result display
│   ├── CodeSnippet.tsx            # Syntax-highlighted code block
│   ├── ResultViewer.tsx           # Formatted JSON result display
│   ├── ProgressTracker.tsx        # Generic progress visualization
│   └── LoadingState.tsx           # Loading skeleton/spinner
│
├── errors/
│   ├── ErrorDisplay.tsx           # Type-aware error renderer
│   ├── ODataErrorCard.tsx         # DataverseODataError display
│   ├── ThrottleErrorCard.tsx      # DataverseThrottleError with countdown
│   ├── BatchErrorCard.tsx         # DataverseBatchError with partial results
│   └── ErrorBoundary.tsx          # React error boundary
│
├── telemetry/
│   ├── TelemetryDashboard.tsx     # Request metrics charts
│   ├── RequestTimeline.tsx        # Request history timeline
│   └── MetricsCard.tsx            # Individual metric display
│
└── forms/
    ├── EntityPicker.tsx           # Select entity type
    ├── RecordPicker.tsx           # Select specific record
    ├── AttributePicker.tsx        # Select attributes
    └── RelationshipPicker.tsx     # Select relationship
```

### Page-Specific Components

Each page has its own `/components` subfolder:

```
pages/
├── CrudOperations/
│   ├── index.tsx
│   └── components/
│       ├── RawApiTab.tsx
│       ├── TypedApiTab.tsx
│       ├── OrgServiceTab.tsx
│       └── QueryBuilderDemo.tsx
│
├── BulkOperations/
│   ├── index.tsx
│   └── components/
│       ├── BulkProgressTracker.tsx
│       ├── BulkVsBatchMatrix.tsx
│       └── BulkOperationConfig.tsx
│
├── BatchOperations/
│   ├── index.tsx
│   └── components/
│       ├── BatchBuilder.tsx
│       ├── ChangesetVisualizer.tsx
│       ├── BatchResultsViewer.tsx
│       └── DependencyGraph.tsx
│
└── [other pages...]
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Goal**: Setup core infrastructure and shared components

**Tasks**:

1. Create `DataverseContext` with client/orgService instances
2. Implement shared components:
   - `ErrorDisplay` with all error types
   - `CodeComparison` for side-by-side demos
   - `ProgressTracker` generic component
   - `LoadingState` skeleton
3. Update routing in `App.tsx`
4. Create `Header` with navigation menu
5. Setup page templates for all 13 pages

**Deliverables**:

- ✅ Context provider wrapping App
- ✅ Shared components library
- ✅ Navigation structure
- ✅ Empty page scaffolds

---

### Phase 2: CRUD & Querying (Week 1-2)

**Goal**: Implement data operation pages

**Tasks**:

1. **CrudOperations** page:
   - Three tabs (Raw, Typed, OrgService)
   - Side-by-side comparison
   - Query builder demo
   - Optimistic concurrency example
2. **AdvancedQuerying** page:
   - Filter builder
   - Pagination demo (get, getPage, iterate, getAll)
   - Expand with nested filters
   - FetchXML support

**Deliverables**:

- ✅ CRUD comparison working
- ✅ Query builder functional
- ✅ Pagination demos
- ✅ FetchXML examples

---

### Phase 3: Bulk & Batch (Week 2)

**Goal**: Implement high-throughput operations

**Tasks**:

1. **BulkOperations** page:
   - CreateMultiple with progress
   - UpdateMultiple demo
   - UpsertMultiple demo
   - Bulk vs Batch decision matrix
2. **BatchOperations** page:
   - Interactive batch builder
   - Changeset visualization
   - Dependency graph
   - Partial failure handling

**Deliverables**:

- ✅ Bulk operations with progress tracking
- ✅ Batch builder working
- ✅ Changeset demos
- ✅ Error handling for partial failures

---

### Phase 4: Relationships & Metadata (Week 2-3)

**Goal**: Implement entity management features

**Tasks**:

1. **RelationshipOperations** page:
   - Associate/disassociate demos
   - Bind helper examples
   - Relationship type identification
2. **MetadataExplorer** page:
   - Entity browser tree
   - Entity create wizard
   - Attribute CRUD
   - Option set management
   - Type safety demonstrations

**Deliverables**:

- ✅ Relationship operations working
- ✅ Metadata browser functional
- ✅ Entity/attribute CRUD
- ✅ Type safety examples

---

### Phase 5: Files & Actions (Week 3)

**Goal**: Implement file operations and action execution

**Tasks**:

1. **FileOperations** page:
   - File upload with chunking
   - Progress tracking (chunk-by-chunk)
   - Download functionality
   - Profile picture demo
2. **ActionsFunctions** page:
   - Action picker
   - Function picker
   - Parameter builder
   - Request/response viewer

**Deliverables**:

- ✅ File upload/download working
- ✅ Chunk progress visualization
- ✅ Action/function execution
- ✅ Parameter builders

---

### Phase 6: Messages & DevOps (Week 3-4)

**Goal**: Implement advanced features

**Tasks**:

1. **Messages** page:
   - Message catalog
   - Execute messages
   - Solution import/export
2. **Discovery** page:
   - Organization listing
   - Region filtering
   - Connection testing

**Deliverables**:

- ✅ Message execution working
- ✅ Solution management
- ✅ Discovery service functional

---

### Phase 7: Observability (Week 4)

**Goal**: Implement resilience and telemetry demos

**Tasks**:

1. **Observability** page:
   - Retry visualizer
   - Concurrency monitor
   - Telemetry dashboard
   - Backoff animator
2. Add telemetry hooks to all pages

**Deliverables**:

- ✅ Retry demos working
- ✅ Concurrency visualization
- ✅ Telemetry collection
- ✅ Error recovery flows

---

### Phase 8: Reference & Polish (Week 4)

**Goal**: Add reference pages and polish UI

**Tasks**:

1. **TypeSafety** page
2. **ApiReference** page
3. Polish all pages:
   - Consistent styling
   - Loading states
   - Error handling
   - Documentation
4. README updates
5. Code comments

**Deliverables**:

- ✅ All pages complete
- ✅ Consistent UI
- ✅ Documentation complete
- ✅ Production-ready sample

---

## Scenario Details

### Scenario 1: CRUD Operations

**Packages**: `dataverse-sdk-core`, `dataverse-sdk-xrm`
**Demonstrates**: Three API approaches, query building, headers, concurrency

### Scenario 2: Advanced Querying

**Packages**: `dataverse-sdk-core`, `dataverse-sdk-xrm`
**Demonstrates**: OData capabilities, FetchXML, pagination patterns

### Scenario 3: Bulk Operations

**Packages**: `dataverse-sdk-actions`
**Demonstrates**: CreateMultiple, UpdateMultiple, UpsertMultiple, high throughput

### Scenario 4: Batch Operations

**Packages**: `dataverse-sdk-batch`
**Demonstrates**: Changesets, dependencies, partial failures, auto-splitting

### Scenario 5: Relationship Operations

**Packages**: `dataverse-sdk-core`, `dataverse-sdk-xrm`
**Demonstrates**: Associate, disassociate, bind helper, navigation properties

### Scenario 6: Metadata Management

**Packages**: `dataverse-sdk-metadata`
**Demonstrates**: Entity/attribute CRUD, option sets, relationships, delta queries

### Scenario 7: File Operations

**Packages**: `dataverse-sdk-files`
**Demonstrates**: Chunked upload/download, progress tracking, file columns

### Scenario 8: Actions & Functions

**Packages**: `dataverse-sdk-actions`, `dataverse-sdk-functions`
**Demonstrates**: Typed actions/functions, parameters, execution

### Scenario 9: Messages

**Packages**: `dataverse-sdk-messages`, `dataverse-sdk-xrm`
**Demonstrates**: SDK messages, solution management, platform operations

### Scenario 10: Discovery

**Packages**: `dataverse-sdk-discovery`
**Demonstrates**: Organization listing, region filtering, multi-org scenarios

### Scenario 11: Observability

**Packages**: `dataverse-sdk-core`
**Demonstrates**: Retry middleware, concurrency control, telemetry, resilience

### Scenario 12: Type Safety

**Packages**: `dataverse-sdk-metadata`, `dataverse-sdk-core`
**Demonstrates**: TypeScript type safety, compile-time checks, type inference

### Scenario 13: API Comparison

**Packages**: All
**Demonstrates**: When to use which API, performance characteristics

---

## State Management

### Context Structure

```typescript
// src/context/DataverseContext.tsx
interface DataverseContextValue {
  client: DataverseClient;
  orgService: OrganizationService;
  metadataClient: MetadataClient;
  fileClient: FileColumnClient;
  discoveryClient: GlobalDiscoveryClient;
  baseUrl: string;
  apiVersion: string;
}
```

### Usage Pattern

```typescript
// In any page component
function MyPage() {
  const { client, orgService } = useDataverse();
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const result = await client.api('/accounts').top(10).get<Account>();
      setData(result.value);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <ErrorDisplay error={error} />}
      {loading && <LoadingState />}
      {/* ... */}
    </>
  );
}
```

---

## Error Handling

### Error Type Hierarchy

```typescript
DataverseError (base)
├── DataverseODataError         // 400, 401, 403, 404, etc.
├── DataverseThrottleError      // 429 with Retry-After
├── DataverseBatchError         // Batch partial failures
└── DataverseInvalidRequestError // Client-side validation
```

### Display Components

```typescript
// ErrorDisplay.tsx - Type-aware routing
function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  if (error instanceof DataverseThrottleError) {
    return <ThrottleErrorCard error={error} onRetry={onRetry} />;
  }
  if (error instanceof DataverseODataError) {
    return <ODataErrorCard error={error} />;
  }
  if (error instanceof DataverseBatchError) {
    return <BatchErrorCard error={error} />;
  }
  return <GenericErrorCard error={error} />;
}

// ThrottleErrorCard.tsx - Retry countdown
function ThrottleErrorCard({ error, onRetry }: Props) {
  const [countdown, setCountdown] = useState(error.retryAfter);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MessageBar intent="warning">
      <MessageBarTitle>Request Throttled (429)</MessageBarTitle>
      <MessageBarBody>
        <Text>Retry after: {countdown} seconds</Text>
        <ProgressBar value={(error.retryAfter - countdown) / error.retryAfter * 100} />
        <Button onClick={onRetry} disabled={countdown > 0}>
          Retry Now
        </Button>
      </MessageBarBody>
    </MessageBar>
  );
}
```

### Retry Pattern

```typescript
// Automatic retry (built into SDK)
const result = await client.api("/accounts").get(); // SDK auto-retries 429/5xx

// Manual retry with exponential backoff (for demo)
async function retryWithBackoff<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (error instanceof DataverseThrottleError) {
        const delay = error.retryAfter * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        const delay = Math.min(1000 * Math.pow(2, i), 30000); // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError!;
}
```

---

## Routing

### Route Structure

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Dashboard />} />

  {/* Data Operations */}
  <Route path="/crud" element={<CrudOperations />} />
  <Route path="/querying" element={<AdvancedQuerying />} />
  <Route path="/bulk" element={<BulkOperations />} />
  <Route path="/batch" element={<BatchOperations />} />
  <Route path="/relationships" element={<RelationshipOperations />} />

  {/* Metadata */}
  <Route path="/metadata" element={<MetadataExplorer />} />

  {/* Files */}
  <Route path="/files" element={<FileOperations />} />

  {/* DevOps */}
  <Route path="/discovery" element={<Discovery />} />
  <Route path="/actions-functions" element={<ActionsFunctions />} />
  <Route path="/messages" element={<Messages />} />

  {/* Observability */}
  <Route path="/observability" element={<Observability />} />

  {/* Reference */}
  <Route path="/type-safety" element={<TypeSafety />} />
  <Route path="/api-reference" element={<ApiReference />} />
</Routes>
```

### Navigation Menu

```typescript
const navigationGroups = [
  {
    title: "Data Operations",
    items: [
      { label: "CRUD Operations", path: "/crud" },
      { label: "Advanced Querying", path: "/querying" },
      { label: "Bulk Operations", path: "/bulk" },
      { label: "Batch Operations", path: "/batch" },
      { label: "Relationships", path: "/relationships" },
    ],
  },
  {
    title: "Metadata",
    items: [{ label: "Metadata Explorer", path: "/metadata" }],
  },
  {
    title: "Files",
    items: [{ label: "File Operations", path: "/files" }],
  },
  {
    title: "DevOps",
    items: [
      { label: "Discovery Service", path: "/discovery" },
      { label: "Actions & Functions", path: "/actions-functions" },
      { label: "Messages", path: "/messages" },
    ],
  },
  {
    title: "Observability",
    items: [{ label: "Resilience & Telemetry", path: "/observability" }],
  },
  {
    title: "Reference",
    items: [
      { label: "Type Safety", path: "/type-safety" },
      { label: "API Comparison", path: "/api-reference" },
    ],
  },
];
```

---

## Testing Approach

### Manual Testing Checklist

**Per Page**:

- [ ] All features functional
- [ ] Error states display correctly
- [ ] Loading states show
- [ ] Success messages clear
- [ ] Code examples accurate
- [ ] Copy-to-clipboard works
- [ ] Navigation works

**Cross-Page**:

- [ ] Context shared correctly
- [ ] No memory leaks
- [ ] Consistent styling
- [ ] Responsive on mobile
- [ ] Accessible (keyboard nav)

### Test Scenarios

**CRUD**:

- Create account → verify in Dataverse
- Update with optimistic concurrency → handle 412
- Delete → verify removed

**Bulk**:

- CreateMultiple 100 records → verify count
- UpdateMultiple → verify changes
- Track progress accurately

**Batch**:

- Execute batch with changeset → verify transaction
- Trigger partial failure → verify continue-on-error
- Dependency references work

**Files**:

- Upload >10MB file → verify chunking
- Track progress → verify accuracy
- Download → verify file integrity

**Metadata**:

- Create entity → verify in solution
- Add attribute → verify on form
- Delete → verify removal

**Discovery**:

- List orgs → verify against portal
- Filter by region → verify results

**Observability**:

- Trigger 429 → verify retry countdown
- Monitor concurrency → verify semaphore

---

## Success Criteria

### Functional

- ✅ All 13 pages implemented and working
- ✅ All 16 SDK packages demonstrated
- ✅ Error handling for all error types
- ✅ Progress tracking for long operations
- ✅ Type safety examples compile

### Educational

- ✅ Clear code examples for each pattern
- ✅ Side-by-side API comparisons
- ✅ When-to-use guidance
- ✅ Copy-able code snippets

### Quality

- ✅ Consistent UI/UX
- ✅ Accessible (WCAG AA)
- ✅ Responsive design
- ✅ No console errors
- ✅ Production-ready code

### Documentation

- ✅ README updated
- ✅ Inline code comments
- ✅ JSDoc for components
- ✅ Architecture documented

---

## Conclusion

This implementation plan provides a comprehensive roadmap for transforming spa-fluentui-v9 into a world-class SDK reference sample. By following this plan, developers will have:

1. **Complete SDK coverage**: All packages, all features
2. **Multiple learning paths**: Raw API, Typed API, OrgService, Messages
3. **Production patterns**: Error handling, resilience, type safety
4. **Interactive demos**: Hands-on examples with real data
5. **Decision guidance**: When to use which approach

The result will be the definitive reference implementation for dataverse-sdk-typescript.
