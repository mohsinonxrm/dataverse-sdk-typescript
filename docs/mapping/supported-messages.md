# Supported Messages Reference

> **Package**: `@mohsinonxrm/dataverse-sdk-messages`
>
> **Coverage**: <!-- count:messages -->1,281<!-- /count --> typed messages, one per Web API action and function of the platform, Sales and Customer Service, plus the CRUD, ExecuteMultiple and ExecuteTransaction messages. The lists below are generated from the package source by `pnpm --filter generate-sdk-types docs`, so every class, constructor and route shown exists.

---

## Overview

Each Web API **action** and **function** has a `<Name>Request` / `<Name>Response` pair, for code
written in the style of the .NET SDK's `OrganizationRequest` classes. A request takes the same
arguments as the matching class in `@mohsinonxrm/dataverse-sdk-actions` or
`@mohsinonxrm/dataverse-sdk-functions` (the record id of a bound operation, then one object with
the parameters by their `$metadata` names, as in .NET's
`new MergeRequest { Target = …, SubordinateId = … }`), keeps them in `request.Parameters`, and
sends the same request: a `POST` for an action, a `GET` with parameter aliases for a function.
`response.result` is the value the operation returns.
Run it with `client.execute(request)`, or with `OrganizationService.execute` from
`@mohsinonxrm/dataverse-sdk-xrm`.

- **Function-backed messages.** `WhoAmIRequest`, `RetrieveEntityRequest`,
  `RetrieveUserPrivilegesRequest` and the other GET functions are messages too (#344). The
  `$filter` query functions (`LastXDays`, …) aren't: use `queryFunctions` from the functions
  package.
- **CRUD and batch messages.** `CreateRequest`, `RetrieveRequest`, `UpdateRequest`,
  `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and `RetrieveMultipleRequest` send the
  Web API's HTTP request on the entity set; `ExecuteMultipleRequest` and
  `ExecuteTransactionRequest` send a `$batch` ([below](#crud-and-batch-messages)). There is no
  AssignRequest or SetStateRequest (.NET names): assign by updating `ownerid@odata.bind`, and change
  state by updating `statecode` / `statuscode`.
- An operation declared with several bindings has one pair per binding,
  `<Name>_<table>Request` (for example `AddItemCampaign_listRequest`, or
  `RetrievePrincipalAccess_systemuserRequest` for the .NET `RetrievePrincipalAccessRequest`).

## Usage

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WinOpportunityRequest, WinOpportunityResponse } from "@mohsinonxrm/dataverse-sdk-messages";

const orgService = new OrganizationService(client);

await orgService.execute<WinOpportunityResponse>(
  new WinOpportunityRequest({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Deal closed",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 150000,
    },
    Status: 3,
  })
);
```

A response that returns an entity or a complex type has it in `result`
(`ExecuteWorkflowResponse.result?.asyncoperationid`).

```typescript
import { RetrieveEntityRequest, WhoAmIRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// GET /WhoAmI
const { result: me } = await orgService.execute(new WhoAmIRequest());
console.log(me.UserId);

// GET /RetrieveEntity(EntityFilters=@p1,LogicalName=@p2,…)?@p1=…
const { result } = await orgService.execute(
  new RetrieveEntityRequest({
    EntityFilters: "Entity",
    LogicalName: "account",
    MetadataId: "00000000-0000-0000-0000-000000000000",
    RetrieveAsIfPublished: false,
  })
);
console.log(result.EntityMetadata.EntitySetName);
```

### Generic `OrganizationRequest`

For a custom API, or an action the package doesn't have:

```typescript
import { OrganizationRequest, OrganizationResponse } from "@mohsinonxrm/dataverse-sdk-messages";

// POST /new_CustomAction. Values are sent as given, so an entity parameter uses the Web API shape.
const response = await orgService.execute<OrganizationResponse>(
  new OrganizationRequest("new_CustomAction", {
    Account: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: accountId },
    Parameter1: "value",
  })
);
console.log(response.Results);

// POST /accounts(<id>)/Microsoft.Dynamics.CRM.new_BoundAction
await orgService.execute(
  new OrganizationRequest(
    "new_BoundAction",
    { Parameter1: "value" },
    {
      boundTo: { entitySetName: "accounts", id: accountId },
    }
  )
);
```

---

## Message Categories

Each line shows the constructor (`?` marks an argument you can leave out) and the request it sends.

### Platform

<!-- operations:messages
CreateMultiple: Create records of one table in one request.
UpdateMultiple: Update records of one table in one request.
UpsertMultiple: Create or update records of one table in one request.
ExecuteWorkflow: Run an on-demand workflow on a record; `result` is the `asyncoperation`.
Merge: Merge a subordinate record into a target.
BulkDelete: Start an asynchronous bulk delete job.
ExportToExcel: Export a view's rows as an .xlsx file (base64).
-->

- `new CreateMultipleRequest(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`): Create records of one table in one request.
- `new UpdateMultipleRequest(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`): Update records of one table in one request.
- `new UpsertMultipleRequest(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`): Create or update records of one table in one request.
- `new ExecuteWorkflowRequest(workflowId, { EntityId, InputArguments? })` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record; `result` is the `asyncoperation`.
- `new MergeRequest({ Target, Subordinate, UpdateContent?, PerformParentingChecks })` (`POST /Merge`): Merge a subordinate record into a target.
- `new BulkDeleteRequest({ QuerySet?, JobName, SendEmailNotification, ToRecipients, CCRecipients, RecurrencePattern, StartDateTime, SourceImportId?, RunNow?, Options? })` (`POST /BulkDelete`): Start an asynchronous bulk delete job.
- `new ExportToExcelRequest({ View, FetchXml, LayoutXml, QueryApi, QueryParameters })` (`POST /ExportToExcel`): Export a view's rows as an .xlsx file (base64).

<!-- /operations -->

### Security and teams

<!-- operations:messages
GrantAccess: Share a record with a user or team.
ModifyAccess: Change shared access.
RevokeAccess: Stop sharing a record.
AddMembersTeam: Add users to a team.
RemoveMembersTeam: Remove users from a team.
-->

- `new GrantAccessRequest({ Target, PrincipalAccess? })` (`POST /GrantAccess`): Share a record with a user or team.
- `new ModifyAccessRequest({ Target, PrincipalAccess? })` (`POST /ModifyAccess`): Change shared access.
- `new RevokeAccessRequest({ Target, Revokee })` (`POST /RevokeAccess`): Stop sharing a record.
- `new AddMembersTeamRequest(teamId, { Members })` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`): Add users to a team.
- `new RemoveMembersTeamRequest(teamId, { Members })` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`): Remove users from a team.

<!-- /operations -->

### Solutions and customization

<!-- operations:messages
ImportSolution: Import a solution file (base64).
ExportSolution: Export a solution; `result.ExportSolutionFile` is the file (base64).
PublishXml: Publish the customizations named in `parameterXml`.
PublishAllXml: Publish all customizations.
AddSolutionComponent: Add a component to an unmanaged solution.
-->

- `new ImportSolutionRequest({ OverwriteUnmanagedCustomizations, PublishWorkflows, CustomizationFile, ImportJobId, ConvertToManaged?, SkipProductUpdateDependencies?, HoldingSolution?, SkipQueueRibbonJob?, LayerDesiredOrder?, AsyncRibbonProcessing?, ComponentParameters?, IsTemplateMode?, TemplateSuffix?, SolutionParameters?, TemplateDisplayNamePrefix?, StageAndUpgrade?, SchemaUpdatesOnly? })` (`POST /ImportSolution`): Import a solution file (base64).
- `new ExportSolutionRequest({ SolutionName, Managed, TargetVersion?, ExportAutoNumberingSettings?, ExportCalendarSettings?, ExportCustomizationSettings?, ExportEmailTrackingSettings?, ExportGeneralSettings?, ExportMarketingSettings?, ExportOutlookSynchronizationSettings?, ExportRelationshipRoles?, ExportIsvConfig?, ExportSales?, ExportExternalApplications?, ExportComponentsParams? })` (`POST /ExportSolution`): Export a solution; `result.ExportSolutionFile` is the file (base64).
- `new PublishXmlRequest({ ParameterXml })` (`POST /PublishXml`): Publish the customizations named in `parameterXml`.
- `new PublishAllXmlRequest()` (`POST /PublishAllXml`): Publish all customizations.
- `new AddSolutionComponentRequest({ ComponentId, ComponentType, SolutionUniqueName, AddRequiredComponents, DoNotIncludeSubcomponents?, IncludedComponentSettingsValues? })` (`POST /AddSolutionComponent`): Add a component to an unmanaged solution.

<!-- /operations -->

### Sales

<!-- operations:messages
WinOpportunity: Close an opportunity as won.
LoseOpportunity: Close an opportunity as lost.
QualifyLead: Qualify a lead.
WinQuote: Close a quote as won.
ConvertQuoteToSalesOrder: Create an order from a quote.
ConvertSalesOrderToInvoice: Create an invoice from an order.
-->

- `new WinOpportunityRequest({ OpportunityClose, Caller?, Status })` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityRequest({ Caller?, OpportunityClose, Status })` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new QualifyLeadRequest(leadId, { CreateAccount, CreateContact, CreateOpportunity, OpportunityCurrencyId?, OpportunityCustomerId?, SourceCampaignId?, Status, ProcessInstanceId?, LeadQualificationV2Param? })` (`POST /leads({leadId})/Microsoft.Dynamics.CRM.QualifyLead`): Qualify a lead.
- `new WinQuoteRequest({ QuoteClose, Status })` (`POST /WinQuote`): Close a quote as won.
- `new ConvertQuoteToSalesOrderRequest({ QuoteId, ColumnSet?, QuoteCloseDate?, QuoteCloseStatus?, QuoteCloseSubject?, QuoteCloseDescription?, ProcessInstanceId? })` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new ConvertSalesOrderToInvoiceRequest({ SalesOrderId, ColumnSet?, ProcessInstanceId? })` (`POST /ConvertSalesOrderToInvoice`): Create an invoice from an order.

<!-- /operations -->

### Service and queues

<!-- operations:messages
CloseIncident: Resolve a case with an `incidentresolution`.
AddToQueue: Move a record into a queue.
PickFromQueue: Assign a queue item to a user.
RouteTo: Route a queue item with routing rules.
-->

- `new CloseIncidentRequest({ IncidentResolution, Status })` (`POST /CloseIncident`): Resolve a case with an `incidentresolution`.
- `new AddToQueueRequest(queueId, { Target, SourceQueue?, QueueItemProperties? })` (`POST /queues({queueId})/Microsoft.Dynamics.CRM.AddToQueue`): Move a record into a queue.
- `new PickFromQueueRequest(queueitemId, { SystemUser, RemoveQueueItem })` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`): Assign a queue item to a user.
- `new RouteToRequest({ Target, QueueItem? })` (`POST /RouteTo`): Route a queue item with routing rules.

<!-- /operations -->

### Functions (GET)

<!-- operations:messages
WhoAmI: The calling user, business unit and organization.
RetrieveEntity: Read a table definition.
RetrieveUserPrivileges: The privileges of a user.
RetrievePrincipalAccess_systemuser: The access rights a user has on a record.
RetrieveVersion: The Dataverse version.
-->

- `new WhoAmIRequest()` (`GET /WhoAmI`): The calling user, business unit and organization.
- `new RetrieveEntityRequest({ EntityFilters, LogicalName?, MetadataId, RetrieveAsIfPublished })` (`GET /RetrieveEntity`): Read a table definition.
- `new RetrieveUserPrivilegesRequest(systemuserId)` (`GET /systemusers({systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivileges`): The privileges of a user.
- `new RetrievePrincipalAccess_systemuserRequest(systemuserId, { Target })` (`GET /systemusers({systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`): The access rights a user has on a record.
- `new RetrieveVersionRequest()` (`GET /RetrieveVersion`): The Dataverse version.

<!-- /operations -->

The package holds the messages of the platform and of the Sales and Customer Service solutions,
chosen by solution (the [solution table](../../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt) lists them). The `msdyn_*` messages among them work only in
an org that has their solution. Contact Center (`CCaaS_*`), Field Service, Customer Insights -
Journeys (`msdynmkt_*`) and the other apps' messages, and your own custom APIs, aren't in it:
generate them with [dataverse-gen](../getting-started.md#generate-the-rest-with-dataverse-gen), or send one with the generic `OrganizationRequest`.

---

## CRUD and batch messages

These aren't Web API actions or functions, so they are written by hand (in
`packages/dataverse-sdk-messages/src/handwritten`) rather than generated. A record is a reference
from `createEntityReference` (its table, id, and the entity set of a table the SDK's `$metadata`
snapshot doesn't know); a new record is the Web API payload, with `@odata.type` naming the table.

| Message                                                              | Web API request                                            | `response`                           |
| -------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------ |
| `new CreateRequest({ Target, EntitySetName? })`                      | `POST /{set}`                                              | `id` (also `result`): the new id     |
| `new RetrieveRequest({ Target, ColumnSet? })`                        | `GET /{set}({id})?$select=…`                               | `Entity` (also `result`): the record |
| `new UpdateRequest({ Target, Attributes, ETag? })`                   | `PATCH /{set}({id})` with `If-Match` (never creates)       |                                      |
| `new DeleteRequest({ Target, ETag? })`                               | `DELETE /{set}({id})`                                      |                                      |
| `new AssociateRequest({ Target, Relationship, RelatedEntities })`    | `POST /{set}({id})/{Relationship}/$ref` per record         |                                      |
| `new DisassociateRequest({ Target, Relationship, RelatedEntities })` | `DELETE /{set}({id})/{Relationship}({id})/$ref` per record |                                      |
| `new RetrieveMultipleRequest({ Query, EntitySetName? })`             | `GET /{set}?fetchXml=…` (`Query` is FetchXML)              | `EntityCollection` (also `result`)   |
| `new ExecuteMultipleRequest({ Requests, Settings? })`                | `POST /$batch`, one part per request                       | `Responses`, `IsFaulted`             |
| `new ExecuteTransactionRequest({ Requests })`                        | `POST /$batch`, one change set                             | `Responses`                          |

- An Associate or Disassociate of several records is one `$batch` change set, so the records are
  linked (or unlinked) together or not at all, as in .NET.
- `ExecuteMultipleRequest` takes 1 to 1,000 requests: any message, or a class of the actions and
  functions packages. Each runs on its own, in order. A request that fails doesn't reject: its item
  has a `Fault` (the error executing it alone rejects with), and `IsFaulted` is `true`. Without
  `Settings.ContinueOnError` Dataverse stops at the first failure and the requests after it have no
  item; `Settings.ReturnResponses: false` keeps only the failures.
- `ExecuteTransactionRequest` runs its requests in one transaction: when one fails, nothing is
  changed and `execute()` rejects with that request's error. A change set can't hold a `GET`, so
  use `ExecuteMultipleRequest` for functions, `RetrieveRequest` and `RetrieveMultipleRequest`.
- Neither can hold another `$batch` (an ExecuteMultiple, an ExecuteTransaction, or an Associate of
  several records).

```typescript
import {
  CreateRequest,
  DeleteRequest,
  ExecuteMultipleRequest,
  RetrieveRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";

const { id } = await orgService.execute(
  new CreateRequest({
    Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
  })
);
const account = createEntityReference("account", id);
const { Entity } = await orgService.execute(
  new RetrieveRequest({ Target: account, ColumnSet: ["name"] })
);

const batch = await orgService.execute(
  new ExecuteMultipleRequest({
    Requests: [
      new CreateRequest({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "A" },
      }),
      new DeleteRequest({ Target: account }),
    ],
    Settings: { ContinueOnError: true },
  })
);
for (const item of batch.Responses) {
  if (item.Fault) console.error(`request ${String(item.RequestIndex)}: ${item.Fault.message}`);
}
```

---

## Web API mapping

| You want                         | Use                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------- |
| A Web API action (POST)          | `<Name>Request` here, or `<Name>Action` in the actions package                  |
| A Web API function (GET)         | `<Name>Request` here, or `<Name>Function` in the functions package              |
| Create, retrieve, update, delete | `CreateRequest`… here, `client.api(...)`, or `OrganizationService` (xrm)        |
| Several operations in one call   | `ExecuteMultipleRequest` here, or `$batch` (`@mohsinonxrm/dataverse-sdk-batch`) |

## Choice (option set) values

Option-set parameters and columns are plain numbers (`3`), as the Web API sends them. Metadata
enums are member names; see `@mohsinonxrm/dataverse-sdk-metadata`.

## Waiting for an asynchronous job

`ExecuteWorkflow`, `BulkDelete` and asynchronous imports return or create an `asyncoperation`. Its
`statuscode` is 0 (waiting for resources), 10 (waiting), 20 (in progress) or 21 (pausing) while it
runs, and 30 (succeeded), 31 (failed) or 32 (canceled) once it ends, so poll until it is 30 or more
(a `waitForAsyncOperation()` helper is planned in
[#318](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/318)):

```typescript
const { result } = await orgService.execute<ExecuteWorkflowResponse>(
  new ExecuteWorkflowRequest(workflowId, { EntityId: recordId })
);
// The asyncoperation record, or null if the Web API answered 204 No Content
if (!result) throw new Error("ExecuteWorkflow returned no system job");
let job: { statuscode: number };
do {
  await new Promise((r) => setTimeout(r, 2000));
  job = await client
    .api(`asyncoperations(${String(result.asyncoperationid)})`)
    .select("statuscode")
    .get<{ statuscode: number }>();
} while (job.statuscode < 30);
```

## Additional Resources

- [Use Web API actions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/use-web-api-actions)
- [supported-actions.md](./supported-actions.md), [supported-functions.md](./supported-functions.md)
- [message-to-webapi.md](./message-to-webapi.md)
