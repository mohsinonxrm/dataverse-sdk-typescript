# @mohsinonxrm/dataverse-sdk-actions

Typed Web API actions for Dataverse. Actions are operations with side effects that execute via HTTP POST.

## Features

- ✅ **1,356 typed actions** - Complete CSDL-generated coverage of all Dataverse Web API actions
- ✅ **Business operations** - ExecuteWorkflow, WinOpportunity, Merge, and hundreds more
- ✅ **Bulk operations** - CreateMultiple, UpdateMultiple, UpsertMultiple, DeleteMultiple
- ✅ **File operations** - Chunked upload/download with InitializeFileBlocksUpload, UploadBlock, CommitFileBlocksUpload
- ✅ **Solution operations** - Import, export, publish with ExportSolution, ImportSolution, PublishXml
- ✅ **Service-specific operations** - Sales, Customer Service, Field Service, Marketing modules
- ✅ **Type-safe** - Full TypeScript typing for request and response

## Installation

```bash
npm install @mohsinonxrm/dataverse-sdk-actions @mohsinonxrm/dataverse-sdk-core
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  // ... auth configuration
});

// Create 100 accounts in one request
const accounts = Array.from({ length: 100 }, (_, i) => ({
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: `Account ${i + 1}`,
  creditlimit: 50000,
}));

const action = new CreateMultipleAction("accounts", accounts);
const response = await client.execute(action);
console.log("Created IDs:", response.Ids); // Array of 100 GUIDs
```

## Business Actions

### ExecuteWorkflow

Starts a workflow for a specific entity record.

**Maps to:** `POST /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow` (bound action)

**Example:**

```typescript
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new ExecuteWorkflowAction(
  "workflow-guid", // WorkflowId
  "account-guid" // EntityId (record to execute workflow on)
);

const response = await client.execute(action);
console.log("Async Operation ID:", response.Id);
```

### WinOpportunity

Marks an opportunity as won.

**Maps to:** `POST /WinOpportunity` (unbound action)

**Example:**

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const opportunityClose = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won - Contoso Deal",
  "opportunityid@odata.bind": "/opportunities(opportunity-guid)",
  actualrevenue: 100000,
};

const action = new WinOpportunityAction(opportunityClose, 3); // Status: 3 (Won)
await client.execute(action);
```

## Action Categories

The SDK includes **1,356 typed actions** organized into the following categories:

### Platform Actions (Core Operations)

**Entity Operations:**

- `CreateMultipleAction` - Bulk create records
- `UpdateMultipleAction` - Bulk update records
- `UpsertMultipleAction` - Bulk upsert records
- `DeleteMultipleAction` - Bulk delete records (elastic tables only)

**Business Logic:**

- `ExecuteWorkflowAction` - Execute workflow on a record
- `MergeAction` - Merge two records (account, contact, lead, incident)
- `AssignAction` - Assign record to user/team
- `SetStateAction` - Set state and status

**Solution Management:**

- `ExportSolutionAction` - Export solution
- `ImportSolutionAction` - Import solution
- `PublishXmlAction` - Publish metadata changes
- `PublishAllXmlAction` - Publish all metadata changes

### Sales Module Actions (CRM)

**Opportunity Management:**

- `WinOpportunityAction` - Close opportunity as won
- `LoseOpportunityAction` - Close opportunity as lost
- `GenerateQuoteFromOpportunityAction` - Create quote from opportunity
- `GenerateSalesOrderFromOpportunityAction` - Create sales order from opportunity
- `GenerateInvoiceFromOpportunityAction` - Create invoice from opportunity

**Quote & Order Processing:**

- `ConvertQuoteToSalesOrderAction` - Convert quote to sales order
- `ConvertSalesOrderToInvoiceAction` - Convert sales order to invoice
- `CalculatePriceAction` - Calculate product pricing

### Customer Service Module Actions

**Case Management:**

- `CloseIncidentAction` - Close case
- `ApplyRoutingRuleAction` - Apply routing rules

**Knowledge Base:**

- `FullTextSearchKnowledgeArticleAction` - Search knowledge articles
- `CreateKnowledgeArticleVersionAction` - Create article version

### Field Service Module Actions (msdyn\_\*)

**Resource Scheduling:**

- `msdyn_BookRequirementGroupAction` - Book requirement group
- `msdyn_SearchResourceAvailabilityAction` - Find available resources
- `msdyn_CancelBookingsAction` - Cancel bookings

**Work Order Management:**

- `msdyn_CreateWorkOrderAction` - Create work order
- `msdyn_CascadeCrewBookingsAction` - Cascade crew bookings

### Marketing Module Actions (msdynmkt\_\*)

**Campaign & Consent:**

- `msdynmkt_checkconsentAction` - Check consent status
- `msdynmkt_consentsubmissionAction` - Submit consent

### File & Image Operations

**Chunked Upload:**

- `InitializeFileBlocksUploadAction` - Start upload session
- `UploadBlockAction` - Upload chunk
- `CommitFileBlocksUploadAction` - Finalize upload

**Chunked Download:**

- `InitializeFileBlocksDownloadAction` - Start download session
- `DownloadBlockAction` - Download chunk

### Complete Action Reference

For a complete list of all 1,356 actions with descriptions and examples, see [docs/mapping/supported-actions.md](../../docs/mapping/supported-actions.md).

### Merge

Merges two entity records (subordinate into target).

**Maps to:** `POST /Merge` (unbound action)  
**Supported entities:** account, contact, lead, incident

**Example:**

```typescript
import { MergeAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new MergeAction(
  { logicalName: "account", id: "target-account-guid" }, // Keep this record
  "subordinate-account-guid", // Merge & deactivate this
  { name: "Merged Company Name" }, // Update target with these values
  false // PerformParentingChecks
);

await client.execute(action);
```

## Bulk Operations

Bulk operations provide a simpler alternative to `$batch` for common scenarios.

### When to Use Bulk Operations vs $batch

**Use Bulk Operations when:**

- Single entity type, single operation type (all creates OR all updates)
- 100-1000 records (standard tables) or up to 100 (elastic tables)
- Want simple API with minimal setup
- Need immediate response

**Use $batch when:**

- Mixed operation types (creates + updates + deletes)
- Cross-entity operations with references (create account → create contacts)
- Need transactional semantics across different entities
- Want to bundle unrelated operations to reduce HTTP requests
- Need Content-ID references

See `@mohsinonxrm/dataverse-sdk-batch` for $batch support.

### CreateMultiple

Creates multiple records in a single request.

**Maps to:** `POST /CreateMultiple` (unbound action)

**Example:**

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso", creditlimit: 50000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Fabrikam", creditlimit: 75000 },
];

const action = new CreateMultipleAction("accounts", accounts);
const response = await client.execute(action);
console.log("Created IDs:", response.Ids); // ['id1', 'id2']
```

**With Optimistic Concurrency:**

```typescript
const action = new CreateMultipleAction("accounts", accounts, "IfRowVersionMatches");
```

### UpdateMultiple

Updates multiple records in a single request.

**Maps to:** `POST /UpdateMultiple` (unbound action)

**Example:**

```typescript
import { UpdateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const updates = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1", creditlimit: 100000 },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id2", creditlimit: 125000 },
];

const action = new UpdateMultipleAction("accounts", updates);
await client.execute(action); // 204 No Content
```

### UpsertMultiple

Creates or updates multiple records in a single request.

**Maps to:** `POST /UpsertMultiple` (unbound action)

**Example:**

```typescript
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const records = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1", name: "Updated" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "New Account" }, // Will be created
];

const action = new UpsertMultipleAction("accounts", records);
await client.execute(action); // 204 No Content
```

### DeleteMultiple

Deletes multiple records in a single request.

**⚠️ IMPORTANT:** Only supported for **elastic tables**, not standard tables.

**Maps to:** `POST /DeleteMultiple` (unbound action)

**Example:**

```typescript
import { DeleteMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const targets = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id2" },
];

const action = new DeleteMultipleAction("accounts", targets);
await client.execute(action); // Only works for elastic tables
```

### @odata.type Requirement

All bulk operations **require** `@odata.type` annotation on all targets:

```typescript
// ✅ Correct
const account = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: "Contoso",
};

// ❌ Will throw error
const account = {
  name: "Contoso", // Missing @odata.type
};
```

## File Operations

Actions for chunked file/image column upload. See `@mohsinonxrm/dataverse-sdk-files` for higher-level FileColumnClient.

### InitializeFileBlocksUpload

Initializes a chunked file upload session.

**Maps to:** `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.InitializeFileBlocksUpload` (bound action)

**Example:**

```typescript
import { InitializeFileBlocksUploadAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new InitializeFileBlocksUploadAction(
  "accounts", // entitySetName
  "account-guid", // recordId
  "new_logo", // fileAttributeName
  "logo.png" // fileName
);

const response = await client.execute(action);
const uploadToken = response.FileContinuationToken;
```

### UploadBlock

Uploads a single block (chunk) of a file.

**Maps to:** `POST /UploadBlock` (unbound action)

**Example:**

```typescript
import { UploadBlockAction } from "@mohsinonxrm/dataverse-sdk-actions";

const blockId = btoa("0"); // Base64-encoded block ID
const blockData = btoa(chunkData); // Base64-encoded chunk data

const action = new UploadBlockAction(uploadToken, blockId, blockData);
await client.execute(action);
```

### CommitFileBlocksUpload

Finalizes a chunked file upload.

**Maps to:** `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.CommitFileBlocksUpload` (bound action)

**Example:**

```typescript
import { CommitFileBlocksUploadAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new CommitFileBlocksUploadAction(
  "accounts",
  "account-guid",
  "new_logo",
  ["AAAAAA==", "AQAAAA==", "AgAAAA=="], // blockList in order
  uploadToken,
  "logo.png",
  "image/png" // Optional MIME type
);

await client.execute(action);
```

## Architecture

### Actions vs Functions

- **Actions** (this package):
  - HTTP method: `POST`
  - Side effects: **Yes** - actions can modify data
  - Parameters: Passed in request body
  - Use for: Business operations, bulk operations, file uploads

- **Functions** (`@mohsinonxrm/dataverse-sdk-functions`):
  - HTTP method: `GET`
  - Side effects: **No** - functions should be read-only
  - Parameters: Passed as query string with parameter aliases
  - Use for: Queries, calculations, retrieving information

### Action Execution Flow

```typescript
// 1. Create action instance
const action = new CreateMultipleAction("accounts", accounts);

// 2. Action converts to RequestInformation
const requestInfo = action.toRequestInformation(baseUrl);
// => { method: 'POST', url: '.../ CreateMultiple', body: {...} }

// 3. Client executes the request
const response = await client.execute(action);

// 4. Action parses the response
// Returns typed response (e.g., CreateMultipleResponse)
```

## Extending with Custom Actions

```typescript
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

interface CustomActionResponse {
  Result: string;
}

class CustomAction implements Executable<CustomActionResponse> {
  constructor(public readonly param: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "POST",
      url: `${baseUrl}/CustomAction`,
      headers: { "Content-Type": "application/json" },
      body: { Param: this.param },
    };
  }

  async parseResponse(response: Response): Promise<CustomActionResponse> {
    const data = await response.json();
    return { Result: data.Result };
  }
}
```

## License

This project is licensed under the GNU AGPL v3.0 License - see LICENSE file for details.
