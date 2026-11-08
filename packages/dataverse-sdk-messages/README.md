# @mohsinonxrm/dataverse-sdk-messages

Organization Service messages for Dataverse, providing typed request/response pairs that map to Web API actions, functions, CRUD requests and `$batch`.

This package is the SDK's **.NET compatibility layer**, with
[`@mohsinonxrm/dataverse-sdk-xrm`](../dataverse-sdk-xrm): `<Name>Request` / `<Name>Response`
classes with the .NET SDK's names, so code written against `IOrganizationService` ports line by
line. Each message sends the same request as the action or function class of the same name
(`WinOpportunityRequest` and `WinOpportunityAction`), through the same `DataverseClient`. New code
should use the main path: those classes from `@mohsinonxrm/dataverse-sdk-actions` and
`@mohsinonxrm/dataverse-sdk-functions`, run with `client.execute()`, and `client.api()` for CRUD.
The [.NET mapping](../../docs/mapping/message-to-webapi.md#0-from-the-net-sdk-to-the-main-path)
gives the main-path equivalent of each .NET call.

## Features

- ✅ **<!-- count:messages -->1,281<!-- /count --> typed messages** - The Organization Service messages of the platform, Sales and Customer Service, from the Web API's actions and functions
- ✅ **CRUD and batch messages** - `CreateRequest`, `RetrieveRequest`, `UpdateRequest`, `DeleteRequest`, `AssociateRequest`, `DisassociateRequest`, `RetrieveMultipleRequest`, `ExecuteMultipleRequest` and `ExecuteTransactionRequest`
- ✅ **Direct exports** - All message classes exported directly (e.g., `ExecuteWorkflowRequest`, `WhoAmIRequest`)
- ✅ **Request/response pairs** - Full type safety for all message parameters and returns
- ✅ **Web API mapping** - Each message sends the same request as the Web API action (`POST`) or function (`GET`) of the same name
- ✅ **Generic OrganizationRequest** - Escape hatch for custom actions
- ✅ **Executable interface** - All messages implement `Executable<TResponse>` for direct execution

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-messages @mohsinonxrm/dataverse-sdk-xrm
```

## Overview

This package provides <!-- count:messages -->1,281<!-- /count --> typed message classes, one for each Web API action and function, and the hand-written [CRUD and batch messages](#crud-and-batch-messages). Each message:

- Extends `OrganizationRequest` base class
- Implements `Executable<TResponse>` interface
- Provides `toRequestInformation()` for HTTP request construction
- Provides `parseResponse()` for type-safe response parsing

Messages execute via `OrganizationService.execute()` from `@mohsinonxrm/dataverse-sdk-xrm` or directly via `DataverseClient.execute()`.

## What this package covers

A message for each Web API action and function of the **platform** (Dataverse and the Power
Platform solutions every environment has) and of the two core Dynamics 365 apps of a plain trial,
**Sales** and **Customer Service**: the same operations as `@mohsinonxrm/dataverse-sdk-actions`
and `@mohsinonxrm/dataverse-sdk-functions` (but the `$filter` query functions such as `LastXDays`).
They are chosen by the solution each operation comes from, not by what the org the SDK was
generated from has installed: the
[solution table](../../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt)
lists every solution and whether its operations are in.

Not in the package: the messages of Contact Center (Omnichannel, unified routing, voice,
`CCaaS_*`), Field Service, Project Operations, Universal Resource Scheduling, Customer Insights -
Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process
Mining, and your own custom APIs. Generate typed classes for those from your org with
`dataverse-gen` (see
[Generate the rest with dataverse-gen](../../docs/getting-started.md#generate-the-rest-with-dataverse-gen)),
or send one with the generic [`OrganizationRequest`](#generic-organizationrequest).

## Message Categories

The package has <!-- count:messages -->1,281<!-- /count --> typed messages: a `<Name>Request` /
`<Name>Response` pair for each Web API **action** and **function** of the platform, Sales and
Customer Service (see [What this package covers](#what-this-package-covers)). This list is generated
from the package source (`pnpm --filter generate-sdk-types docs`);
[supported-messages.md](../../docs/mapping/supported-messages.md) has more.

- A function's message sends the function's `GET`, with its parameters as parameter aliases:
  `WhoAmIRequest`, `RetrieveEntityRequest`, `RetrieveMetadataChangesRequest`. A function
  declared for several tables has one message per table: `RetrievePrincipalAccess_systemuserRequest`
  and `RetrievePrincipalAccess_teamRequest` for the .NET `RetrievePrincipalAccessRequest`.
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

- `new GrantAccessRequest({ Target, PrincipalAccess? })` (`POST /GrantAccess`): Share a record with a user or team.
- `new RevokeAccessRequest({ Target, Revokee })` (`POST /RevokeAccess`): Stop sharing a record.
- `new MergeRequest({ Target, Subordinate, UpdateContent?, PerformParentingChecks })` (`POST /Merge`): Merge duplicate records.
- `new ExecuteWorkflowRequest(workflowId, { EntityId, InputArguments? })` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record.
- `new WinOpportunityRequest({ OpportunityClose, Caller?, Status })` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityRequest({ Caller?, OpportunityClose, Status })` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new QualifyLeadRequest(leadId, { CreateAccount, CreateContact, CreateOpportunity, OpportunityCurrencyId?, OpportunityCustomerId?, SourceCampaignId?, Status, ProcessInstanceId?, LeadQualificationV2Param? })` (`POST /leads({leadId})/Microsoft.Dynamics.CRM.QualifyLead`): Qualify a lead.
- `new ConvertQuoteToSalesOrderRequest({ QuoteId, ColumnSet?, QuoteCloseDate?, QuoteCloseStatus?, QuoteCloseSubject?, QuoteCloseDescription?, ProcessInstanceId? })` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new CalculatePriceRequest({ Target, ParentId? })` (`POST /CalculatePrice`): Recalculate a quote, order or invoice.
- `new CloseIncidentRequest({ IncidentResolution, Status })` (`POST /CloseIncident`): Resolve a case.
- `new ExportSolutionRequest({ SolutionName, Managed, TargetVersion?, ExportAutoNumberingSettings?, ExportCalendarSettings?, ExportCustomizationSettings?, ExportEmailTrackingSettings?, ExportGeneralSettings?, ExportMarketingSettings?, ExportOutlookSynchronizationSettings?, ExportRelationshipRoles?, ExportIsvConfig?, ExportSales?, ExportExternalApplications?, ExportComponentsParams? })` (`POST /ExportSolution`): Export a solution.
- `new ImportSolutionRequest({ OverwriteUnmanagedCustomizations, PublishWorkflows, CustomizationFile, ImportJobId, ConvertToManaged?, SkipProductUpdateDependencies?, HoldingSolution?, SkipQueueRibbonJob?, LayerDesiredOrder?, AsyncRibbonProcessing?, ComponentParameters?, IsTemplateMode?, TemplateSuffix?, SolutionParameters?, TemplateDisplayNamePrefix?, StageAndUpgrade?, SchemaUpdatesOnly? })` (`POST /ImportSolution`): Import a solution.
- `new PublishXmlRequest({ ParameterXml })` (`POST /PublishXml`): Publish the named customizations.
- `new PublishAllXmlRequest()` (`POST /PublishAllXml`): Publish all customizations.

<!-- /operations -->

## Quick Start

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// Execute workflow message
const request = new ExecuteWorkflowRequest(workflowId, { EntityId: recordId });

const response = await service.execute(request);
console.log("Async Operation ID:", response.result?.asyncoperationid);
```

## Results

A message's `result` is the value the action of the same name returns, with the same type,
exported as `<Name>Result` (#300). A message without a return type has no `result`.

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

`<Name>Response.fromResponse(data)` reads `result` from a parsed response body (`undefined` for a
204), for example the body of a `$batch` step. Unlike the `Results` of the generic
`OrganizationRequest`, `result` keeps the annotations, as the action's value does.

A function's message reads its value the same way: `(await service.execute(new WhoAmIRequest())).result.UserId`.

## CRUD and batch messages

Create, Retrieve, Update, Delete, Associate, Disassociate and RetrieveMultiple aren't Web API
actions or functions but HTTP requests on entity sets, and ExecuteMultiple and ExecuteTransaction
are `$batch` requests. These messages are written by hand (`src/handwritten`). A record is a
reference from `createEntityReference`; a new record is the Web API payload, with `@odata.type`
naming the table. Each response has `result`, and the .NET property of the same value.

| Request                                                              | Sends                                            | Response                                |
| -------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------- |
| `new CreateRequest({ Target, EntitySetName? })`                      | `POST /{set}`                                    | `id`: the new record's id               |
| `new RetrieveRequest({ Target, ColumnSet? })`                        | `GET /{set}({id})?$select=…`                     | `Entity`: the record                    |
| `new UpdateRequest({ Target, Attributes, ETag? })`                   | `PATCH /{set}({id})`, `If-Match` (never creates) |                                         |
| `new DeleteRequest({ Target, ETag? })`                               | `DELETE /{set}({id})`                            |                                         |
| `new AssociateRequest({ Target, Relationship, RelatedEntities })`    | `POST …/{Relationship}/$ref` per record          |                                         |
| `new DisassociateRequest({ Target, Relationship, RelatedEntities })` | `DELETE …/{Relationship}({id})/$ref` per record  |                                         |
| `new RetrieveMultipleRequest({ Query, EntitySetName? })`             | `GET /{set}?fetchXml=…`                          | `EntityCollection`: one page of records |
| `new ExecuteMultipleRequest({ Requests, Settings? })`                | `POST /$batch`, one part per request             | `Responses`, `IsFaulted`                |
| `new ExecuteTransactionRequest({ Requests })`                        | `POST /$batch`, one change set (all or nothing)  | `Responses`                             |

```typescript
import {
  CreateRequest,
  DeleteRequest,
  ExecuteMultipleRequest,
  ExecuteTransactionRequest,
  RetrieveRequest,
  UpdateRequest,
  WhoAmIRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";

const { id } = await service.execute(
  new CreateRequest({
    Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
  })
);
const account = createEntityReference("account", id);
const { Entity } = await service.execute(
  new RetrieveRequest({ Target: account, ColumnSet: ["name"] })
);
await service.execute(
  new UpdateRequest({
    Target: account,
    Attributes: { name: "Fabrikam" },
    ETag: Entity["@odata.etag"],
  })
);

// Several requests in one round trip; a failure is an item with a Fault, not a rejection
const multiple = await service.execute(
  new ExecuteMultipleRequest({
    Requests: [new WhoAmIRequest(), new DeleteRequest({ Target: account })],
    Settings: { ContinueOnError: true },
  })
);
console.log(
  multiple.IsFaulted,
  multiple.Responses.map((item) => item.Fault?.message)
);

// All or nothing: a failure rolls back and rejects with that request's error
const { Responses } = await service.execute(
  new ExecuteTransactionRequest({
    Requests: [
      new CreateRequest({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "A" },
      }),
      new CreateRequest({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "B" },
      }),
    ],
  })
);
const [first, second] = Responses; // CreateResponse, CreateResponse
```

- `ExecuteMultipleRequest` takes 1 to 1,000 requests: messages, or the classes of the actions and
  functions packages. Without `Settings.ContinueOnError`, Dataverse stops at the first failure and
  the requests after it have no item; `Settings.ReturnResponses: false` keeps only the failures.
- `ExecuteTransactionRequest` can't hold a `GET` (a function, Retrieve or RetrieveMultiple): a
  `$batch` change set can't.
- An Associate or Disassociate of several records is one change set too, so neither it nor
  ExecuteMultiple / ExecuteTransaction can go inside ExecuteMultiple or ExecuteTransaction.
- `RetrieveMultipleRequest` sends its FetchXML in the URL (up to 32,768 characters); use
  `client.api(entitySet).fetchXml()` for a longer query.
- For more than 1,000 requests, or change sets mixed with single requests, use
  `BatchRequestBuilder` from `@mohsinonxrm/dataverse-sdk-batch`.

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
import { waitForAsyncOperation } from "@mohsinonxrm/dataverse-sdk-core";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExecuteWorkflowRequest(workflowId, { EntityId: recordId, InputArguments: {} });

const response = await service.execute(request);
console.log("Async Operation ID:", response.result?.asyncoperationid);
// Wait for the workflow to finish
const job = await waitForAsyncOperation(client, response.result);
```

**Constructor:** `new ExecuteWorkflowRequest(workflowId, parameters)`

- `workflowId: string` - GUID of the workflow to execute (the record the action is bound to)
- `parameters.EntityId: string` - GUID of the entity record to run the workflow against
- `parameters.InputArguments?: InputArgumentCollection` - Optional input arguments

**Response:**

- `result: ExecuteWorkflowResult` - The async operation record (system job), with its annotations, or `null` if the Web API answered 204

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

const request = new WinOpportunityRequest({ OpportunityClose: opportunityClose, Status: 3 });

await service.execute(request);
```

**Constructor:** `new WinOpportunityRequest(parameters)`

- `OpportunityClose: EntityReference | EntityPayload<opportunityclose>` - The opportunity close
  activity, with `"opportunityid@odata.bind"`
- `Caller?: string` - Optional
- `Status: number` - The status code for won opportunities

---

### Merge

Merges two entity records.

**Maps to:** Merge action (POST, unbound)  
**Supported entities:** account, contact, lead, incident

```typescript
import { MergeRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new MergeRequest({
  Target: createEntityReference("account", masterAccountId),
  Subordinate: createEntityReference("account", subordinateAccountId),
  UpdateContent: {
    // UpdateContent: column values to set on the target
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: "Merged Company Name",
    revenue: 1000000,
  },
  PerformParentingChecks: false,
});

await service.execute(request);
```

**Constructor:** `new MergeRequest(parameters)`

- `Target: EntityReference | AnyEntityPayload` - The master record (will remain after merge)
- `Subordinate: EntityReference | AnyEntityPayload` - The subordinate record (will be deactivated)
- `UpdateContent?: EntityReference | AnyEntityPayload` - Column values to set on the master
  record, with `@odata.type` naming the table
- `PerformParentingChecks: boolean` - Whether to perform parenting checks

---

### ExportSolution

Exports a solution from the environment.

**Maps to:** ExportSolution action (POST, unbound)

```typescript
import { writeFileSync } from "node:fs";
import { ExportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// SolutionName and Managed are required; TargetVersion and the Export* settings are optional
const request = new ExportSolutionRequest({ SolutionName: "MySolution", Managed: false });

const response = await service.execute(request);

// Decode base64 to file
const solutionFile = Buffer.from(response.result.ExportSolutionFile ?? "", "base64");
writeFileSync("solution.zip", solutionFile);
```

**Response:**

- `result.ExportSolutionFile: string` - Base64-encoded solution file (zip)

---

### ImportSolution

Imports a solution into the environment.

**Maps to:** ImportSolution action (POST, unbound)

```typescript
import { readFileSync } from "node:fs";
import { ImportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const solutionBytes = readFileSync("solution.zip");

const importJobId = crypto.randomUUID();
const request = new ImportSolutionRequest({
  OverwriteUnmanagedCustomizations: false,
  PublishWorkflows: true,
  CustomizationFile: solutionBytes.toString("base64"),
  ImportJobId: importJobId,
});

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

const request = new PublishXmlRequest({ ParameterXml: parameterXml });
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
overload keeps the plain name. A name with no unbound overload has no plain-name class, so you
pick the binding: there is `AddItemCampaign_listRequest` and `AddItemCampaign_campaignRequest`,
but no `AddItemCampaign` request without a table.

```typescript
import {
  AddItemCampaign_listRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";

await service.execute(
  new AddItemCampaign_listRequest(listId, {
    Campaign: createEntityReference("campaign", campaignId),
  })
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

Functions (GET) are not supported by `OrganizationRequest`: use the function's typed message
(`WhoAmIRequest`), the typed classes from `@mohsinonxrm/dataverse-sdk-functions`, or
`client.api("my_Function(...)").get()` for a custom function.

---

## Message-to-Web API Mapping

| Message         | Web API Endpoint                                        | HTTP Method | Type           |
| --------------- | ------------------------------------------------------- | ----------- | -------------- |
| Assign          | /{entitySet}({id}) (`ownerid@odata.bind`)               | PATCH       | Update         |
| SetState        | /{entitySet}({id}) (`statecode`, `statuscode`)          | PATCH       | Update         |
| ExecuteWorkflow | /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow | POST        | Action (bound) |
| WinOpportunity  | /WinOpportunity                                         | POST        | Action         |
| Merge           | /Merge                                                  | POST        | Action         |
| ExportSolution  | /ExportSolution                                         | POST        | Action         |
| ImportSolution  | /ImportSolution                                         | POST        | Action         |
| PublishXml      | /PublishXml                                             | POST        | Action         |
| PublishAllXml   | /PublishAllXml                                          | POST        | Action         |
| WhoAmI          | /WhoAmI                                                 | GET         | Function       |
| Create          | /{entitySet}                                            | POST        | CRUD           |
| Retrieve        | /{entitySet}({id})                                      | GET         | CRUD           |
| ExecuteMultiple | /$batch                                                 | POST        | Batch          |

See [docs/mapping/message-to-webapi.md](../../docs/mapping/message-to-webapi.md) for complete mapping details.

---

## EntityReference Type

A reference to one record. Its enumerable properties are the Web API shape, `@odata.type` and
the table's primary key (`{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`;
activities use `activityid`). `logicalName`, `id`, `name` and `entitySetName` are kept on it but
not sent.

It is the SDK's one `EntityReference`, defined in `@mohsinonxrm/dataverse-sdk-entities-runtime`
and re-exported here, as the actions, functions and xrm packages do. A reference from any of their
`createEntityReference`s is accepted by every one of them.

Only `createEntityReference` makes an `EntityReference`. A hand-written
`{ "@odata.type", logicalName, id }` doesn't type-check, because it would send `logicalName` and
`id`, which the Web API rejects. To write the reference by hand, use `WebApiEntityReference`, the
JSON shape: `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: id }`.

### Entity Payloads

An entity-typed parameter also takes the record itself, with column values:

- a parameter of one table (`WinOpportunity`'s `OpportunityClose`) is
  `EntityReference | EntityPayload<opportunityclose>`: its columns, `@odata.type`, and lookups set
  with `<navigation property>@odata.bind`;
- a parameter of any table (`crmbaseentity`, such as `Merge`'s `UpdateContent`) is
  `EntityReference | AnyEntityPayload`, and `@odata.type` names the table.

Parameters that `$metadata` marks `Nullable="false"` are required; the others are optional
(`new ExecuteWorkflowRequest(workflowId, { EntityId })` leaves out `InputArguments`). A parameter
that is left out or `undefined` isn't sent.

### Enum Values

The Web API reads an enum value in a request body only as a string, such as `"ReadAccess"` or
`"ReadAccess, WriteAccess"` for a flags enum, and rejects a number. The generated enums are
numeric, so you can combine flags with `|`, and the messages send member names. This covers enum
parameters and enums inside complex types, such as `PrincipalAccess.AccessMask` and the operators
of a `QueryExpression`. The enums are exported from the package root.

An entity member of a complex type, such as `PrincipalAccess.Principal`, takes a reference or a
payload, like an entity-typed parameter:
`new GrantAccessRequest({ Target: createEntityReference("account", id), PrincipalAccess: { Principal: createEntityReference("team", teamId), AccessMask: AccessRights.ReadAccess } })`.

---

## Utilities

### createEntityReference

Helper to create entity references (the same function every package exports).

```typescript
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const accountRef = createEntityReference("account", accountId);
// JSON: {"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"<id>"}
const named = createEntityReference("contact", contactId, { name: "John Doe" }); // kept, not sent
// A table the SDK's $metadata snapshot doesn't know:
createEntityReference("new_project", id, {
  primaryIdAttribute: "new_projectid",
  entitySetName: "new_projects",
});
```

---

## License

GNU AGPL v3.0
