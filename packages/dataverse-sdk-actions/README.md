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

Constructors take the action's parameters positionally, in `$metadata` order. Run an action with
`client.execute(action)`.

### ExecuteWorkflow

Starts an on-demand workflow for a record.

**Maps to:** `POST /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow` (bound action)

```typescript
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const job = await client.execute(
  new ExecuteWorkflowAction(
    workflowId, // the workflow (binding)
    accountId // EntityId: the record to run it on; InputArguments is optional
  )
);
console.log("Async Operation ID:", job.asyncoperationid);
```

### WinOpportunity

Closes an opportunity as won.

**Maps to:** `POST /WinOpportunity` (unbound action)

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

await client.execute(
  new WinOpportunityAction(
    {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Won - Contoso Deal",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 100000,
    },
    undefined, // Caller
    3 // Status: Won
  )
);
```

## Action Categories

The package has <!-- count:actions -->1,360<!-- /count --> typed actions, including solution-specific ones
(`msdyn_*`, `msdynmkt_*`, `CCaaS_*`, …) for the solutions installed in the org it was generated
from. This list is generated from the package source (`pnpm --filter generate-sdk-types docs`);
[supported-actions.md](../../docs/mapping/supported-actions.md) has more. There is no `Assign` or
`SetState` action: assign by updating `ownerid@odata.bind`, and change state by updating
`statecode` and `statuscode`.

<!-- operations:actions
CreateMultiple: Create records of one table in one request.
UpdateMultiple: Update records of one table in one request.
UpsertMultiple: Create or update records of one table in one request.
DeleteMultiple: Delete elastic-table records in one request.
ExecuteWorkflow: Run an on-demand workflow on a record.
Merge: Merge two records (account, contact, lead or incident).
ExportSolution: Export a solution.
ImportSolution: Import a solution.
PublishXml: Publish the named customizations.
PublishAllXml: Publish all customizations.
WinOpportunity: Close an opportunity as won.
LoseOpportunity: Close an opportunity as lost.
GenerateQuoteFromOpportunity: Create a quote from an opportunity.
GenerateSalesOrderFromOpportunity: Create an order from an opportunity.
ConvertQuoteToSalesOrder: Create an order from a quote.
ConvertSalesOrderToInvoice: Create an invoice from an order.
CalculatePrice: Recalculate a quote, order or invoice.
CloseIncident: Resolve a case.
msdyn_BookRequirementGroup: Book a requirement group (Field Service).
msdyn_CancelBookings: Cancel bookings (Field Service).
InitializeFileBlocksUpload: Start a chunked upload to a file column.
UploadBlock: Upload one block.
CommitFileBlocksUpload: Commit the blocks as the file.
InitializeFileBlocksDownload: Start a chunked download.
DownloadBlock: Download one block.
ExportToExcel: Export a view as an .xlsx file.
-->

- `new CreateMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`): Create records of one table in one request.
- `new UpdateMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`): Update records of one table in one request.
- `new UpsertMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`): Create or update records of one table in one request.
- `new DeleteMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`): Delete elastic-table records in one request.
- `new ExecuteWorkflowAction(workflowId, entityId, inputArguments?)` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record.
- `new MergeAction(target, subordinate, updateContent, performParentingChecks)` (`POST /Merge`): Merge two records (account, contact, lead or incident).
- `new ExportSolutionAction(solutionName, managed, targetVersion?, exportAutoNumberingSettings?, exportCalendarSettings?, exportCustomizationSettings?, exportEmailTrackingSettings?, exportGeneralSettings?, exportMarketingSettings?, exportOutlookSynchronizationSettings?, exportRelationshipRoles?, exportIsvConfig?, exportSales?, exportExternalApplications?, exportComponentsParams?)` (`POST /ExportSolution`): Export a solution.
- `new ImportSolutionAction(overwriteUnmanagedCustomizations, publishWorkflows, customizationFile, importJobId, convertToManaged?, skipProductUpdateDependencies?, holdingSolution?, skipQueueRibbonJob?, layerDesiredOrder?, asyncRibbonProcessing?, componentParameters?, isTemplateMode?, templateSuffix?, solutionParameters?, templateDisplayNamePrefix?, stageAndUpgrade?, schemaUpdatesOnly?)` (`POST /ImportSolution`): Import a solution.
- `new PublishXmlAction(parameterXml)` (`POST /PublishXml`): Publish the named customizations.
- `new PublishAllXmlAction()` (`POST /PublishAllXml`): Publish all customizations.
- `new WinOpportunityAction(opportunityClose, caller, status)` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityAction(caller, opportunityClose, status)` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new GenerateQuoteFromOpportunityAction(opportunityId, columnSet?, processInstanceId?)` (`POST /GenerateQuoteFromOpportunity`): Create a quote from an opportunity.
- `new GenerateSalesOrderFromOpportunityAction(opportunityId, columnSet?)` (`POST /GenerateSalesOrderFromOpportunity`): Create an order from an opportunity.
- `new ConvertQuoteToSalesOrderAction(quoteId, columnSet?, quoteCloseDate?, quoteCloseStatus?, quoteCloseSubject?, quoteCloseDescription?, processInstanceId?)` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new ConvertSalesOrderToInvoiceAction(salesOrderId, columnSet?, processInstanceId?)` (`POST /ConvertSalesOrderToInvoice`): Create an invoice from an order.
- `new CalculatePriceAction(target, parentId?)` (`POST /CalculatePrice`): Recalculate a quote, order or invoice.
- `new CloseIncidentAction(incidentResolution, status)` (`POST /CloseIncident`): Resolve a case.
- `new msdyn_BookRequirementGroupAction(msdyn_requirementgroupId, start, duration, bookingResources)` (`POST /msdyn_requirementgroups({msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`): Book a requirement group (Field Service).
- `new msdyn_CancelBookingsAction(bookingIds?, defaultBookingDetail?, bookingCancelContext?, considerAppointments?)` (`POST /msdyn_CancelBookings`): Cancel bookings (Field Service).
- `new InitializeFileBlocksUploadAction(target, fileName, fileAttributeName)` (`POST /InitializeFileBlocksUpload`): Start a chunked upload to a file column.
- `new UploadBlockAction(blockId, blockData, fileContinuationToken)` (`POST /UploadBlock`): Upload one block.
- `new CommitFileBlocksUploadAction(fileName, mimeType, blockList, fileContinuationToken)` (`POST /CommitFileBlocksUpload`): Commit the blocks as the file.
- `new InitializeFileBlocksDownloadAction(target, fileAttributeName, dataSource?)` (`POST /InitializeFileBlocksDownload`): Start a chunked download.
- `new DownloadBlockAction(offset, blockLength, fileContinuationToken)` (`POST /DownloadBlock`): Download one block.
- `new ExportToExcelAction(view, fetchXml, layoutXml, queryApi, queryParameters)` (`POST /ExportToExcel`): Export a view as an .xlsx file.

<!-- /operations -->

### Merge

Merges two entity records (subordinate into target).

**Maps to:** `POST /Merge` (unbound action)  
**Supported entities:** account, contact, lead, incident

**Example:**

```typescript
import { MergeAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new MergeAction(
  createEntityReference("account", "target-account-guid"), // Keep this record
  createEntityReference("account", "subordinate-account-guid"), // Merge & deactivate this
  // UpdateContent: column values to set on the target (or undefined)
  { "@odata.type": "Microsoft.Dynamics.CRM.account", description: "Merged" },
  false // PerformParentingChecks
);

await client.execute(action);
```

### Entity References

Entity-typed parameters (`Target`, `Subordinate`, `EntityMoniker`, …) take an `EntityReference`.
Create one with `createEntityReference(logicalName, id)`. In a request body it is the Web API shape,
`@odata.type` plus the table's primary key:

```typescript
JSON.stringify(createEntityReference("account", id)); // {"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"<id>"}
JSON.stringify(createEntityReference("email", id)); // {"@odata.type":"Microsoft.Dynamics.CRM.email","activityid":"<id>"}
```

The primary keys and entity sets come from the CSDL the package was generated from. For a table
it doesn't know (a custom table created later), pass them:
`createEntityReference("new_project", id, { primaryIdAttribute: "new_projectid", entitySetName: "new_projects" })`.

`logicalName`, `id` and `entitySetName` are on the reference but not enumerable, so they aren't
sent. Only `createEntityReference` makes an `EntityReference`: a hand-written
`{ "@odata.type", logicalName, id }` doesn't type-check, because it would send `logicalName` and
`id`, which the Web API rejects. To write the reference by hand, use the JSON shape,
`WebApiEntityReference`:

```typescript
import type { WebApiEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const target: WebApiEntityReference = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: id,
};
```

### Entity Payloads

An entity-typed parameter also takes the record itself, with column values: in a request body the
Web API reads it as an entity, and a reference is the same shape with only the primary key.

- A parameter of one table (`WinOpportunity`'s `OpportunityClose`) is
  `EntityReference | EntityPayload<opportunityclose>`: any of its columns, `@odata.type`, and lookups
  set with `<navigation property>@odata.bind`.
- A parameter of any table (`crmbaseentity`, such as `Merge`'s `UpdateContent`) is
  `EntityReference | AnyEntityPayload`, and `@odata.type` names the table.

```typescript
await client.execute(
  new WinOpportunityAction(
    {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Won",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    },
    undefined, // Caller
    3 // Status: Won
  )
);
```

Parameters that `$metadata` doesn't mark `Nullable="false"` are optional: at the end of the
argument list they can be left out (`new ExecuteWorkflowAction(workflowId, entityId)`), and
elsewhere they accept `undefined`. Either way they are left out of the request body.

### Enum Values

The Web API reads an enum value in a request body only as a string: a member name, or for a flags
enum a list such as `"ReadAccess, WriteAccess"`. It rejects a number with 400. The generated enums
are numeric, so you can combine flags with `|`, and the actions send member names. This applies to
enum parameters and to enums inside complex-type parameters (`PrincipalAccess.AccessMask`, the
operators of a `QueryExpression`):

```typescript
import {
  ConditionOperator,
  LogicalOperator,
  QueryExpressionToFetchXmlAction,
} from "@mohsinonxrm/dataverse-sdk-actions";

const { FetchXml } = await client.execute(
  new QueryExpressionToFetchXmlAction({
    "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
    EntityName: "account",
    Criteria: {
      FilterOperator: LogicalOperator.Or, // sent as "Or"
      Conditions: [{ AttributeName: "name", Operator: ConditionOperator.NotNull }], // "NotNull"
    },
  })
);
```

A flags value such as `AccessRights.ReadAccess | AccessRights.WriteAccess` is sent as
`"ReadAccess, WriteAccess"`, and a member name passed as a string is sent as it is. The enums are
exported from the package root, as in the functions package.

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

The constructor takes only the entity set and the targets. For optimistic concurrency on updates,
use `UpdateMultipleAction` with each target's `@odata.etag`, or single-record updates with
`If-Match`.

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

### @odata.type on targets

Give every target its `@odata.type`, as the Web API bulk samples do. The SDK doesn't check it: the
targets are sent as given, so a target without it gets Dataverse's error, not a client-side one.

```typescript
const account = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  name: "Contoso",
};
```

### Parameters Declared with a Base Type

Some parameters are declared with a base type, for example `QueryExpressionToFetchXml(Query: QueryBase)`.
The value must be one of the derived types, and `@odata.type` says which one: without it Dataverse
answers 400. These parameters are typed as a `Typed<Base>` union (here `TypedQueryBase`), so the
compiler requires the `@odata.type`:

```typescript
import { QueryExpressionToFetchXmlAction } from "@mohsinonxrm/dataverse-sdk-actions";

const { FetchXml } = await client.execute(
  new QueryExpressionToFetchXmlAction({
    "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
    EntityName: "account",
    ColumnSet: { Columns: ["name"] },
  })
);
```

Complex-type properties are optional unless the CSDL marks them `Nullable="false"`, so you only set
the ones you need.

## File Operations

Actions for a chunked upload to a file or image column. They are **unbound**: the record is the
`Target` parameter, not the route. `@mohsinonxrm/dataverse-sdk-files` wraps them.

<!-- operations:actions
InitializeFileBlocksUpload: Start the upload; returns `{ FileContinuationToken }`.
UploadBlock: Upload one block (`blockId` and `blockData` are base64).
CommitFileBlocksUpload: Commit the blocks, in order, as the file.
-->

- `new InitializeFileBlocksUploadAction(target, fileName, fileAttributeName)` (`POST /InitializeFileBlocksUpload`): Start the upload; returns `{ FileContinuationToken }`.
- `new UploadBlockAction(blockId, blockData, fileContinuationToken)` (`POST /UploadBlock`): Upload one block (`blockId` and `blockData` are base64).
- `new CommitFileBlocksUploadAction(fileName, mimeType, blockList, fileContinuationToken)` (`POST /CommitFileBlocksUpload`): Commit the blocks, in order, as the file.

<!-- /operations -->

```typescript
import {
  CommitFileBlocksUploadAction,
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

const { FileContinuationToken } = await client.execute(
  new InitializeFileBlocksUploadAction(
    createEntityReference("account", accountId), // Target
    "logo.png", // FileName
    "new_logo" // FileAttributeName
  )
);

const blockId = btoa("000000");
await client.execute(
  new UploadBlockAction(blockId, Buffer.from(bytes).toString("base64"), FileContinuationToken)
);

await client.execute(
  new CommitFileBlocksUploadAction("logo.png", "image/png", [blockId], FileContinuationToken)
);
```

## Overloads (one class per binding)

When `$metadata` declares an operation several times with different bindings, each binding has its
own class: `<Name>_<table>Action`, with `_collection` for a collection binding. An unbound
overload keeps the plain name. A name with no unbound overload is still exported under the plain
name, as a `@deprecated` alias of the binding it exported before.

```typescript
import {
  AddItemCampaign_listAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

// POST /lists(<listId>)/Microsoft.Dynamics.CRM.AddItemCampaign
await client.execute(
  new AddItemCampaign_listAction(listId, createEntityReference("campaign", campaignId))
);
```

## Export to Excel

`ExportToExcel` isn't in `$metadata`, but Dataverse runs it; the generator adds it from a
supplemental definition. All five parameters are required. `ExcelFile` is the .xlsx file, base64.

```typescript
import { ExportToExcelAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const { ExcelFile } = await client.execute(
  new ExportToExcelAction(
    createEntityReference("savedquery", viewId), // or "userquery"
    fetchXml,
    layoutXml,
    "", // QueryApi
    { Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } } // no query parameters ({} is rejected)
  )
);
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
      headers: { "content-type": "application/json" },
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
