# Supported Messages Reference

> **Package**: `@mohsinonxrm/dataverse-sdk-messages`
>
> **Coverage**: <!-- count:messages -->1,360<!-- /count --> typed messages, one per Web API action in the `$metadata` the package was generated from. The lists below are generated from the package source by `pnpm --filter generate-sdk-types docs`, so every class, constructor and route shown exists.

---

## Overview

Each Web API **action** has a `<Name>Request` / `<Name>Response` pair, for code written in the
style of the .NET SDK's `OrganizationRequest` classes. A request takes the same positional
arguments as the matching class in `@mohsinonxrm/dataverse-sdk-actions` and sends the same `POST`.
Run it with `client.execute(request)`, or with `OrganizationService.execute` from
`@mohsinonxrm/dataverse-sdk-xrm`.

- **Functions aren't messages.** Read-only operations such as `WhoAmI` are GET functions: use
  `WhoAmIFunction` from `@mohsinonxrm/dataverse-sdk-functions`.
- **CRUD isn't a message.** Create, retrieve, update, delete, associate and disassociate are HTTP
  requests on entity sets: use `client.api("accounts")…` or `OrganizationService.create/retrieve/
update/delete`. There is no CreateRequest, AssignRequest or SetStateRequest (.NET names): assign by
  updating `ownerid@odata.bind`, and change state by updating `statecode` / `statuscode`.
- An operation declared with several bindings has one pair per binding,
  `<Name>_<table>Request` (for example `AddItemCampaign_listRequest`).

## Usage

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WinOpportunityRequest, WinOpportunityResponse } from "@mohsinonxrm/dataverse-sdk-messages";

const orgService = new OrganizationService(client);

await orgService.execute<WinOpportunityResponse>(
  new WinOpportunityRequest(
    {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Deal closed",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 150000,
    },
    undefined, // Caller
    3 // Status: Won
  )
);
```

A response that returns an entity or a complex type has it in `result`
(`ExecuteWorkflowResponse.result.asyncoperationid`).

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
- `new BulkDeleteRequest({ QuerySet?, JobName, SendEmailNotification, ToRecipients, CCRecipients, RecurrencePattern, StartDateTime, SourceImportId?, RunNow? })` (`POST /BulkDelete`): Start an asynchronous bulk delete job.
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

Solution-specific messages (`msdyn_*`, `msdynmkt_*`, `CCaaS_*`, …) are included for the solutions
installed in the org the package was generated from, and only work in an org that has them.

---

## Web API mapping

| You want                         | Use                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------- |
| A Web API action (POST)          | `<Name>Request` here, or `<Name>Action` in the actions package                |
| A Web API function (GET)         | `<Name>Function` in the functions package                                     |
| Create, retrieve, update, delete | `client.api(...)` or `OrganizationService` (`@mohsinonxrm/dataverse-sdk-xrm`) |
| Several operations in one call   | `$batch` (`@mohsinonxrm/dataverse-sdk-batch`)                                 |

## Choice (option set) values

Option-set parameters and columns are plain numbers (`3`), as the Web API sends them. Metadata
enums are member names; see `@mohsinonxrm/dataverse-sdk-metadata`.

## Waiting for an asynchronous job

`ExecuteWorkflow`, `BulkDelete` and asynchronous imports return or create an `asyncoperation`. Its
`statuscode` is 0 (waiting for resources), 10 (waiting), 20 (in progress) or 21 (pausing) while it
runs, and 30 (succeeded), 31 (failed) or 32 (canceled) once it ends, so poll until it is 30 or more:

```typescript
const { result } = await orgService.execute<ExecuteWorkflowResponse>(
  new ExecuteWorkflowRequest(workflowId, recordId)
);
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
