# @mohsinonxrm/dataverse-sdk-messages

Organization Service messages for Dataverse, providing typed request/response pairs that map to Web API actions and functions.

## Features

- ✅ **1,356+ typed messages** - Complete coverage of all Dataverse Organization Service messages
- ✅ **Direct exports** - All message classes exported directly (e.g., `ExecuteWorkflowRequest`, `WinOpportunityRequest`)
- ✅ **Request/response pairs** - Full type safety for all message parameters and returns
- ✅ **Web API mapping** - Messages map to corresponding Web API actions, functions, or HTTP operations
- ✅ **Generic OrganizationRequest** - Escape hatch for custom actions
- ✅ **Executable interface** - All messages implement `Executable<TResponse>` for direct execution

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-messages @mohsinonxrm/dataverse-sdk-xrm
```

## Overview

This package provides 1,356+ typed message classes that wrap Web API actions and functions. Each message:

- Extends `OrganizationRequest` base class
- Implements `Executable<TResponse>` interface
- Provides `toRequestInformation()` for HTTP request construction
- Provides `parseResponse()` for type-safe response parsing

Messages execute via `OrganizationService.execute()` from `@mohsinonxrm/dataverse-sdk-xrm` or directly via `DataverseClient.execute()`.

## Message Categories

The package has <!-- count:messages -->1,360<!-- /count --> typed messages: a `<Name>Request` /
`<Name>Response` pair for each Web API **action** in the `$metadata` it was generated from,
including solution-specific ones (`msdyn_*`, `msdynmkt_*`, `CCaaS_*`, …). This list is generated
from the package source (`pnpm --filter generate-sdk-types docs`);
[supported-messages.md](../../docs/mapping/supported-messages.md) has more.

- Functions (GET) aren't messages: `WhoAmI`, `RetrievePrincipalAccess` and
  `RetrieveMetadataChanges` are in `@mohsinonxrm/dataverse-sdk-functions`.
- There is no AssignRequest or SetStateRequest (.NET names): they aren't Web API actions. Assign by updating
  `ownerid@odata.bind`, and change state by updating `statecode` and `statuscode`.
- Tables and columns are created with `@mohsinonxrm/dataverse-sdk-metadata`, not with
  the .NET CreateEntityRequest / CreateAttributeRequest.

<!-- operations:messages
GrantAccess: Share a record with a user or team.
RevokeAccess: Stop sharing a record.
Merge: Merge duplicate records.
ExecuteWorkflow: Run an on-demand workflow on a record.
WinOpportunity: Close an opportunity as won.
LoseOpportunity: Close an opportunity as lost.
QualifyLead: Qualify a lead.
ConvertQuoteToSalesOrder: Create an order from a quote.
CalculatePrice: Recalculate a quote, order or invoice.
CloseIncident: Resolve a case.
ExportSolution: Export a solution.
ImportSolution: Import a solution.
PublishXml: Publish the named customizations.
PublishAllXml: Publish all customizations.
-->

- `new GrantAccessRequest(target, principalAccess?)` (`POST /GrantAccess`): Share a record with a user or team.
- `new RevokeAccessRequest(target, revokee)` (`POST /RevokeAccess`): Stop sharing a record.
- `new MergeRequest(target, subordinate, updateContent, performParentingChecks)` (`POST /Merge`): Merge duplicate records.
- `new ExecuteWorkflowRequest(workflowId, entityId, inputArguments?)` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record.
- `new WinOpportunityRequest(opportunityClose, caller, status)` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityRequest(caller, opportunityClose, status)` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new QualifyLeadRequest(leadId, createAccount, createContact, createOpportunity, opportunityCurrencyId, opportunityCustomerId, sourceCampaignId, status, processInstanceId?, leadQualificationV2Param?)` (`POST /leads({leadId})/Microsoft.Dynamics.CRM.QualifyLead`): Qualify a lead.
- `new ConvertQuoteToSalesOrderRequest(quoteId, columnSet?, quoteCloseDate?, quoteCloseStatus?, quoteCloseSubject?, quoteCloseDescription?, processInstanceId?)` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new CalculatePriceRequest(target, parentId?)` (`POST /CalculatePrice`): Recalculate a quote, order or invoice.
- `new CloseIncidentRequest(incidentResolution, status)` (`POST /CloseIncident`): Resolve a case.
- `new ExportSolutionRequest(solutionName, managed, targetVersion?, exportAutoNumberingSettings?, exportCalendarSettings?, exportCustomizationSettings?, exportEmailTrackingSettings?, exportGeneralSettings?, exportMarketingSettings?, exportOutlookSynchronizationSettings?, exportRelationshipRoles?, exportIsvConfig?, exportSales?, exportExternalApplications?, exportComponentsParams?)` (`POST /ExportSolution`): Export a solution.
- `new ImportSolutionRequest(overwriteUnmanagedCustomizations, publishWorkflows, customizationFile, importJobId, convertToManaged?, skipProductUpdateDependencies?, holdingSolution?, skipQueueRibbonJob?, layerDesiredOrder?, asyncRibbonProcessing?, componentParameters?, isTemplateMode?, templateSuffix?, solutionParameters?, templateDisplayNamePrefix?, stageAndUpgrade?, schemaUpdatesOnly?)` (`POST /ImportSolution`): Import a solution.
- `new PublishXmlRequest(parameterXml)` (`POST /PublishXml`): Publish the named customizations.
- `new PublishAllXmlRequest()` (`POST /PublishAllXml`): Publish all customizations.

<!-- /operations -->

## Quick Start

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// Execute workflow message
const request = new ExecuteWorkflowRequest(
  workflowId, // Workflow GUID
  recordId // Entity record GUID; InputArguments is optional
);

const response = await service.execute(request);
console.log("Async Operation ID:", response.result.asyncoperationid);
```

## Common Messages

### Assign and SetState

These aren't Web API actions, so there are no message classes for them. Update the record:

```typescript
// Assign
await client.api(`accounts(${accountId})`).patch({
  "ownerid@odata.bind": `/systemusers(${userId})`,
});

// Deactivate
await client.api(`accounts(${accountId})`).patch({ statecode: 1, statuscode: 2 });
```

---

### ExecuteWorkflow

Executes a workflow against an entity record.

**Maps to:** ExecuteWorkflow action (bound to workflow)

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExecuteWorkflowRequest(
  workflowId, // Workflow GUID
  recordId, // Entity record GUID
  {} // Input arguments (optional)
);

const response = await service.execute(request);
console.log("Async Operation ID:", response.result.asyncoperationid);
// Poll asyncoperation entity to check workflow status
```

**Constructor:**

- `workflowId: string` - GUID of the workflow to execute
- `entityId: string` - GUID of the entity record to run the workflow against
- `inputArguments: InputArgumentCollection` - Optional input arguments

**Response:**

- `result: asyncoperation` - The async operation record (system job)

---

### WinOpportunity

Marks an opportunity as won.

**Maps to:** WinOpportunity action (POST, unbound)

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const opportunityClose = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won the deal!",
  "opportunityid@odata.bind": `/opportunities(${oppId})`,
  actualrevenue: 50000,
  actualend: new Date().toISOString(),
};

const request = new WinOpportunityRequest(
  opportunityClose,
  undefined, // Caller
  3 // Status: Won
);

await service.execute(request);
```

**Constructor:**

- `opportunityClose: EntityReference | EntityPayload<opportunityclose>` - The opportunity close
  activity, with `"opportunityid@odata.bind"`
- `caller: string | undefined` - Optional
- `status: number` - The status code for won opportunities

---

### Merge

Merges two entity records.

**Maps to:** Merge action (POST, unbound)  
**Supported entities:** account, contact, lead, incident

```typescript
import { MergeRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new MergeRequest(
  createEntityReference("account", masterAccountId), // Target (keep)
  createEntityReference("account", subordinateAccountId), // Subordinate (merge & deactivate)
  {
    // UpdateContent: column values to set on the target
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: "Merged Company Name",
    revenue: 1000000,
  },
  false // PerformParentingChecks
);

await service.execute(request);
```

**Constructor:**

- `target: EntityReference | AnyEntityPayload` - The master record (will remain after merge)
- `subordinate: EntityReference | AnyEntityPayload` - The subordinate record (will be deactivated)
- `updateContent: EntityReference | AnyEntityPayload | undefined` - Column values to set on the
  master record, with `@odata.type` naming the table
- `performParentingChecks: boolean` - Whether to perform parenting checks

---

### ExportSolution

Exports a solution from the environment.

**Maps to:** ExportSolution action (POST, unbound)

```typescript
import { ExportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// SolutionName and Managed are required; TargetVersion and the Export* settings are optional
const request = new ExportSolutionRequest("MySolution", false);

const response = await service.execute(request);

// Decode base64 to file
const solutionFile = Buffer.from(response.result.ExportSolutionFile ?? "", "base64");
fs.writeFileSync("solution.zip", solutionFile);
```

**Response:**

- `result.ExportSolutionFile: string` - Base64-encoded solution file (zip)

---

### ImportSolution

Imports a solution into the environment.

**Maps to:** ImportSolution action (POST, unbound)

```typescript
import { ImportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const solutionBytes = fs.readFileSync("solution.zip");

const importJobId = crypto.randomUUID();
const request = new ImportSolutionRequest(
  false, // OverwriteUnmanagedCustomizations
  true, // PublishWorkflows
  solutionBytes.toString("base64"), // CustomizationFile
  importJobId // ImportJobId; the other parameters are optional
);

// ImportSolution returns no content. Follow the import with the importjob record.
await service.execute(request);
```

**Response:**

- No content. `ImportJobId` is an input: the id to give the importjob record.

---

### PublishXml

Publishes specific customizations.

**Maps to:** PublishXml action (POST, unbound)

```typescript
import { PublishXmlRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const parameterXml = `<importexportxml>
  <entities>
    <entity>account</entity>
    <entity>contact</entity>
  </entities>
</importexportxml>`;

const request = new PublishXmlRequest(parameterXml);
await service.execute(request);
```

---

### PublishAllXml

Publishes all customizations.

**Maps to:** PublishAllXml action (POST, unbound)

```typescript
import { PublishAllXmlRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new PublishAllXmlRequest();
await service.execute(request);
```

---

## Overloads (one class per binding)

When `$metadata` declares an operation several times with different bindings, each binding has its
own class: `<Name>_<table>Request` / `<Name>_<table>Response`, with `_collection` for a collection binding. An unbound
overload keeps the plain name. A name with no unbound overload is still exported under the plain
name, as a `@deprecated` alias of the binding it exported before.

```typescript
import {
  AddItemCampaign_listRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";

await service.execute(
  new AddItemCampaign_listRequest(listId, createEntityReference("campaign", campaignId))
);
```

`ExportToExcelRequest` is generated too, from a supplemental definition (`$metadata` leaves it out);
see the actions package README.

## Generic OrganizationRequest

For custom actions, custom APIs, or messages not yet implemented, use the generic `OrganizationRequest`.
It runs as a Web API action: `POST /{messageName}` with `Parameters` as the JSON body, or
`POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}` when bound to a record.

```typescript
import { OrganizationRequest, OrganizationResponse } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new OrganizationRequest("my_CustomAction");
request.Parameters["StringParameter"] = "value";
request.Parameters["IntParameter"] = 42;
// Values are sent as given, so an entity parameter uses the Web API shape
request.Parameters["EntityParameter"] = {
  "@odata.type": "Microsoft.Dynamics.CRM.account",
  accountid: accountId,
};

const response = await service.execute<OrganizationResponse>(request);
console.log("Results:", response.Results);

// Bound to a record
await service.execute(
  new OrganizationRequest(
    "my_BoundAction",
    {},
    { boundTo: { entitySetName: "accounts", id: accountId } }
  )
);
```

**Constructor:**

- `messageName: string` - The name of the action/custom API
- `parameters?: Record<string, unknown>` - The parameters for the action (default `{}`)
- `options?: OrganizationRequestOptions` (`{ boundTo?: { entitySetName: string; id: string } }`, exported from the package root) - Bind the action to a record

**Properties:**

- `Parameters: Record<string, unknown>` - The parameters for the action

**Response:**

- `Results: Record<string, unknown>` - The response's properties, without the `@odata.*` annotations (empty for `204 No Content`)

Functions (GET) are not supported by `OrganizationRequest`: use the typed classes from
`@mohsinonxrm/dataverse-sdk-functions`, or `client.api("my_Function(...)").get()`.

---

## Message-to-Web API Mapping

| Message         | Web API Endpoint                                        | HTTP Method | Type           |
| --------------- | ------------------------------------------------------- | ----------- | -------------- |
| Assign          | /Assign                                                 | POST        | Action         |
| SetState        | /{entitySet}({id})                                      | PATCH       | HTTP           |
| ExecuteWorkflow | /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow | POST        | Action (bound) |
| WinOpportunity  | /WinOpportunity                                         | POST        | Action         |
| Merge           | /Merge                                                  | POST        | Action         |
| ExportSolution  | /ExportSolution                                         | POST        | Action         |
| ImportSolution  | /ImportSolution                                         | POST        | Action         |
| PublishXml      | /PublishXml                                             | POST        | Action         |
| PublishAllXml   | /PublishAllXml                                          | POST        | Action         |

See [docs/mapping/message-to-webapi.md](../../docs/mapping/message-to-webapi.md) for complete mapping details.

---

## EntityReference Type

A reference to one record. Its enumerable properties are the Web API shape, `@odata.type` and
the table's primary key (`{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`;
activities use `activityid`). `logicalName`, `id`, `name` and `entitySetName` are kept on it but
not sent.

### Entity Payloads

An entity-typed parameter also takes the record itself, with column values:

- a parameter of one table (`WinOpportunity`'s `OpportunityClose`) is
  `EntityReference | EntityPayload<opportunityclose>`: its columns, `@odata.type`, and lookups set
  with `<navigation property>@odata.bind`;
- a parameter of any table (`crmbaseentity`, such as `Merge`'s `UpdateContent`) is
  `EntityReference | AnyEntityPayload`, and `@odata.type` names the table.

Parameters that `$metadata` doesn't mark `Nullable="false"` are optional: at the end of the
argument list they can be left out (`new ExecuteWorkflowRequest(workflowId, entityId)`), and
elsewhere they accept `undefined`.

---

## Utilities

### createEntityReference

Helper to create entity references.

```typescript
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const accountRef = createEntityReference("account", accountId);
// JSON: {"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"<id>"}
const named = createEntityReference("contact", contactId, "John Doe"); // name is kept, not sent
// A table the generated CSDL doesn't know:
createEntityReference("new_project", id, { primaryIdAttribute: "new_projectid" });
```

---

## License

GNU AGPL v3.0
