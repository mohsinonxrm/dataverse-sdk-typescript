# @mohsinonxrm/dataverse-sdk-actions

Typed Web API actions for Dataverse. Actions are operations with side effects that execute via HTTP POST.

## Features

- ✅ **<!-- count:actions -->1,556<!-- /count --> typed actions** - Complete CSDL-generated coverage of all Dataverse Web API actions
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

const action = new CreateMultipleAction("accounts", { Targets: accounts });
const response = await client.execute(action);
console.log("Created IDs:", response.Ids); // Array of 100 GUIDs
```

## Business Actions

A constructor takes one object with the action's parameters, by their `$metadata` names, typed
as `<Class>Parameters` (`ExecuteWorkflowActionParameters`). A bound action takes the record id
first. Run an action with `client.execute(action)`.

### ExecuteWorkflow

Starts an on-demand workflow for a record.

**Maps to:** `POST /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow` (bound action)

```typescript
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const job = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: accountId }));
console.log("Async Operation ID:", job?.asyncoperationid); // null if the Web API answered 204
```

### WinOpportunity

Closes an opportunity as won.

**Maps to:** `POST /WinOpportunity` (unbound action)

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

await client.execute(
  new WinOpportunityAction({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Won - Contoso Deal",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 100000,
    },
    Status: 3,
  })
);
```

## Return Values

`client.execute()` resolves the value the action returns, not the OData envelope around it.
Each class's `<Name>Response` type is exactly that value (#300), and the message of the same name
has the same value as its `result`:

| Return type in `$metadata`                       | Web API response                                          | Value                                                       |
| ------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| none                                             | `204 No Content`                                          | `undefined` (`<Name>Response` is `void`)                    |
| primitive or enum (`Edm.Boolean`, …)             | `{ "@odata.context", "value": … }`                        | the value (an enum is its member name)                      |
| collection (`Collection(mscrm.role)`, …)         | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array, each record with `@odata.etag`; `[]` for a 204   |
| complex type (`mscrm.WhoAmIResponse`)            | the properties, with `@odata.context`                     | the body, with `@odata.context`                             |
| entity (`mscrm.asyncoperation`, `crmbaseentity`) | the record, with its annotations, or 204 when unset       | the record (`@odata.etag`, `@odata.type`); `null` for a 204 |

Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set,
although `$metadata` declares the return `Nullable="false"`, so an entity return is
`<Entity> | null`. `@odata.type` says which table a `crmbaseentity` record is.

```typescript
await client.execute(new PublishAllXmlAction()); // undefined

const emails = await client.execute(
  new InstantiateTemplateAction({
    TemplateId: templateId,
    ObjectType: "account",
    ObjectId: accountId,
  })
);
console.log(emails.length, emails[0]?.subject); // email records, not { value }
```

## Action Categories

The package has <!-- count:actions -->1,556<!-- /count --> typed actions, including solution-specific ones
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

- `new CreateMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`): Create records of one table in one request.
- `new UpdateMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`): Update records of one table in one request.
- `new UpsertMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`): Create or update records of one table in one request.
- `new DeleteMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`): Delete elastic-table records in one request.
- `new ExecuteWorkflowAction(workflowId, { EntityId, InputArguments? })` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record.
- `new MergeAction({ Target, Subordinate, UpdateContent?, PerformParentingChecks })` (`POST /Merge`): Merge two records (account, contact, lead or incident).
- `new ExportSolutionAction({ SolutionName, Managed, TargetVersion?, ExportAutoNumberingSettings?, ExportCalendarSettings?, ExportCustomizationSettings?, ExportEmailTrackingSettings?, ExportGeneralSettings?, ExportMarketingSettings?, ExportOutlookSynchronizationSettings?, ExportRelationshipRoles?, ExportIsvConfig?, ExportSales?, ExportExternalApplications?, ExportComponentsParams? })` (`POST /ExportSolution`): Export a solution.
- `new ImportSolutionAction({ OverwriteUnmanagedCustomizations, PublishWorkflows, CustomizationFile, ImportJobId, ConvertToManaged?, SkipProductUpdateDependencies?, HoldingSolution?, SkipQueueRibbonJob?, LayerDesiredOrder?, AsyncRibbonProcessing?, ComponentParameters?, IsTemplateMode?, TemplateSuffix?, SolutionParameters?, TemplateDisplayNamePrefix?, StageAndUpgrade?, SchemaUpdatesOnly? })` (`POST /ImportSolution`): Import a solution.
- `new PublishXmlAction({ ParameterXml })` (`POST /PublishXml`): Publish the named customizations.
- `new PublishAllXmlAction()` (`POST /PublishAllXml`): Publish all customizations.
- `new WinOpportunityAction({ OpportunityClose, Caller?, Status })` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityAction({ Caller?, OpportunityClose, Status })` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new GenerateQuoteFromOpportunityAction({ OpportunityId, ColumnSet?, ProcessInstanceId? })` (`POST /GenerateQuoteFromOpportunity`): Create a quote from an opportunity.
- `new GenerateSalesOrderFromOpportunityAction({ OpportunityId, ColumnSet? })` (`POST /GenerateSalesOrderFromOpportunity`): Create an order from an opportunity.
- `new ConvertQuoteToSalesOrderAction({ QuoteId, ColumnSet?, QuoteCloseDate?, QuoteCloseStatus?, QuoteCloseSubject?, QuoteCloseDescription?, ProcessInstanceId? })` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new ConvertSalesOrderToInvoiceAction({ SalesOrderId, ColumnSet?, ProcessInstanceId? })` (`POST /ConvertSalesOrderToInvoice`): Create an invoice from an order.
- `new CalculatePriceAction({ Target, ParentId? })` (`POST /CalculatePrice`): Recalculate a quote, order or invoice.
- `new CloseIncidentAction({ IncidentResolution, Status })` (`POST /CloseIncident`): Resolve a case.
- `new msdyn_BookRequirementGroupAction(msdyn_requirementgroupId, { Start, Duration, BookingResources })` (`POST /msdyn_requirementgroups({msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`): Book a requirement group (Field Service).
- `new msdyn_CancelBookingsAction({ BookingIds?, DefaultBookingDetail?, BookingCancelContext?, ConsiderAppointments? })` (`POST /msdyn_CancelBookings`): Cancel bookings (Field Service).
- `new InitializeFileBlocksUploadAction({ Target, FileName, FileAttributeName })` (`POST /InitializeFileBlocksUpload`): Start a chunked upload to a file column.
- `new UploadBlockAction({ BlockId, BlockData, FileContinuationToken })` (`POST /UploadBlock`): Upload one block.
- `new CommitFileBlocksUploadAction({ FileName, MimeType, BlockList, FileContinuationToken })` (`POST /CommitFileBlocksUpload`): Commit the blocks as the file.
- `new InitializeFileBlocksDownloadAction({ Target, FileAttributeName, DataSource? })` (`POST /InitializeFileBlocksDownload`): Start a chunked download.
- `new DownloadBlockAction({ Offset, BlockLength, FileContinuationToken })` (`POST /DownloadBlock`): Download one block.
- `new ExportToExcelAction({ View, FetchXml, LayoutXml, QueryApi, QueryParameters })` (`POST /ExportToExcel`): Export a view as an .xlsx file.

<!-- /operations -->

### Merge

Merges two entity records (subordinate into target).

**Maps to:** `POST /Merge` (unbound action)  
**Supported entities:** account, contact, lead, incident

**Example:**

```typescript
import { MergeAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new MergeAction({
  Target: createEntityReference("account", "target-account-guid"),
  Subordinate: createEntityReference("account", "subordinate-account-guid"),
  UpdateContent: { "@odata.type": "Microsoft.Dynamics.CRM.account", description: "Merged" },
  PerformParentingChecks: false,
});

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

`EntityReference`, `createEntityReference`, `getEntitySetNameFromReference` and
`WebApiEntityReference` are the SDK's one set, defined in
`@mohsinonxrm/dataverse-sdk-entities-runtime` and re-exported here (and by the functions,
messages and xrm packages), so a reference from any of them works with any of them.

The primary keys and entity sets come from the `$metadata` snapshot the SDK is generated from.
For a table it doesn't know (a custom table created later), pass them:
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
  new WinOpportunityAction({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Won",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    },
    Status: 3,
  })
);
```

Parameters that `$metadata` marks `Nullable="false"` are required; the others are optional
(`new ExecuteWorkflowAction(workflowId, { EntityId })` leaves out `InputArguments`). A parameter
that is left out or `undefined` isn't sent in the request body.

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
    Query: {
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      EntityName: "account",
      Criteria: {
        FilterOperator: LogicalOperator.Or, // sent as "Or"
        Conditions: [{ AttributeName: "name", Operator: ConditionOperator.NotNull }], // "NotNull"
      },
    },
  })
);
```

A flags value such as `AccessRights.ReadAccess | AccessRights.WriteAccess` is sent as
`"ReadAccess, WriteAccess"`. An entity member of a complex type, such as
`PrincipalAccess.Principal`, takes a reference or a payload, like an entity-typed parameter:

```typescript
await client.execute(
  new GrantAccessAction({
    Target: createEntityReference("account", accountId),
    PrincipalAccess: {
      Principal: createEntityReference("team", teamId),
      AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess, // "ReadAccess, WriteAccess"
    },
  })
);
```

A a member name passed as a string is sent as it is. The enums are
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

const action = new CreateMultipleAction("accounts", { Targets: accounts });
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

const action = new UpdateMultipleAction("accounts", { Targets: updates });
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

const action = new UpsertMultipleAction("accounts", { Targets: records });
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

const action = new DeleteMultipleAction("accounts", { Targets: targets });
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
    Query: {
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      EntityName: "account",
      ColumnSet: { Columns: ["name"] },
    },
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

- `new InitializeFileBlocksUploadAction({ Target, FileName, FileAttributeName })` (`POST /InitializeFileBlocksUpload`): Start the upload; returns `{ FileContinuationToken }`.
- `new UploadBlockAction({ BlockId, BlockData, FileContinuationToken })` (`POST /UploadBlock`): Upload one block (`blockId` and `blockData` are base64).
- `new CommitFileBlocksUploadAction({ FileName, MimeType, BlockList, FileContinuationToken })` (`POST /CommitFileBlocksUpload`): Commit the blocks, in order, as the file.

<!-- /operations -->

```typescript
import {
  CommitFileBlocksUploadAction,
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

const { FileContinuationToken } = await client.execute(
  new InitializeFileBlocksUploadAction({
    Target: createEntityReference("account", accountId),
    FileName: "logo.png",
    FileAttributeName: "new_logo",
  })
);

const blockId = btoa("000000");
await client.execute(
  new UploadBlockAction({
    BlockId: blockId,
    BlockData: Buffer.from(bytes).toString("base64"),
    FileContinuationToken: FileContinuationToken,
  })
);

await client.execute(
  new CommitFileBlocksUploadAction({
    FileName: "logo.png",
    MimeType: "image/png",
    BlockList: [blockId],
    FileContinuationToken: FileContinuationToken,
  })
);
```

## Overloads (one class per binding)

When `$metadata` declares an operation several times with different bindings, each binding has its
own class: `<Name>_<table>Action`, with `_collection` for a collection binding. An unbound
overload keeps the plain name. A name with no unbound overload has no plain-name class, so you
pick the binding: there is `AddItemCampaign_listAction` and `AddItemCampaign_campaignAction`, but
no `AddItemCampaign` class without a table.

```typescript
import {
  AddItemCampaign_listAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

// POST /lists(<listId>)/Microsoft.Dynamics.CRM.AddItemCampaign
await client.execute(
  new AddItemCampaign_listAction(listId, {
    Campaign: createEntityReference("campaign", campaignId),
  })
);
```

## Export to Excel

`ExportToExcel` isn't in `$metadata`, but Dataverse runs it; the generator adds it from a
supplemental definition. All five parameters are required. `ExcelFile` is the .xlsx file, base64.

```typescript
import { ExportToExcelAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

const { ExcelFile } = await client.execute(
  new ExportToExcelAction({
    View: createEntityReference("savedquery", viewId),
    FetchXml: fetchXml,
    LayoutXml: layoutXml,
    QueryApi: "",
    QueryParameters: { Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } },
  })
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
const action = new CreateMultipleAction("accounts", { Targets: accounts });

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
