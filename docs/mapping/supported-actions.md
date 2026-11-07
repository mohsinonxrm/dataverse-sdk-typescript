# Supported Actions Reference

> **Package**: `@mohsinonxrm/dataverse-sdk-actions`
>
> **Coverage**: <!-- count:actions -->1,072<!-- /count --> typed Web API actions of the platform, Sales and Customer Service, generated from a Dataverse `$metadata`. The lists below are generated from the package source by `pnpm --filter generate-sdk-types docs`, so every class, constructor and route shown exists.

---

## Overview

Actions are **POST operations** that can change data. Each action is a class whose constructor
takes **one object with the action's parameters, by their `$metadata` names**
(`new ImportSolutionAction({ CustomizationFile, ImportJobId, OverwriteUnmanagedCustomizations: true, PublishWorkflows: false })`);
its type is exported as `<Class>Parameters`. Run it with `client.execute(action)`; it resolves to
the typed response.

- A bound action takes the record id (or, for a collection-bound action on any table, the entity
  set name) as its first argument, before the parameters object.
- A parameter that `$metadata` marks `Nullable="false"` is required. Any other is optional: leave
  it out, or set it to `undefined`, and it isn't sent. An action with only optional parameters can
  be constructed without arguments.
- Entity-typed parameters take an `EntityReference` (`createEntityReference(table, id)`) or an
  entity payload with column values, `@odata.type` and `<lookup>@odata.bind` values.
- An operation declared with several bindings has one class per binding, `<Name>_<table>Action`
  (for example `AddItemCampaign_listAction`).
- The package holds the actions of the platform and of the Sales and Customer Service solutions,
  chosen by solution (the [solution table](../../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt) lists them). Some are `msdyn_*` actions of those
  solutions, which work only in an org that has the solution. The actions of Contact Center
  (`CCaaS_*`), Field Service, Customer Insights - Journeys (`msdynmkt_*`) and the other apps, and
  your own custom APIs, aren't in it: generate them with [dataverse-gen](../getting-started.md#generate-the-rest-with-dataverse-gen).

---

## Usage

### Typed action (recommended)

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

await client.execute(
  new WinOpportunityAction({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Deal closed",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    },
    Status: 3,
  })
);
```

### Raw Web API

```typescript
await client.api("WinOpportunity").post({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Deal closed",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  },
  Status: 3,
});
```

### Message classes

The same operations are available as `<Name>Request` classes in
`@mohsinonxrm/dataverse-sdk-messages`, with the same constructor arguments; see
[supported-messages.md](./supported-messages.md).

---

## Action Categories

Each line shows the constructor (`?` marks an optional argument) and the request it sends.

### Bulk operations

<!-- operations:actions
CreateMultiple: Create records of one table in one request; returns `{ Ids }`.
UpdateMultiple: Update records of one table in one request.
UpsertMultiple: Create or update records of one table in one request.
DeleteMultiple: Delete elastic-table records in one request.
BulkDelete: Start an asynchronous bulk delete job for a query.
-->

- `new CreateMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`): Create records of one table in one request; returns `{ Ids }`.
- `new UpdateMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`): Update records of one table in one request.
- `new UpsertMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`): Create or update records of one table in one request.
- `new DeleteMultipleAction(entitySetName, { Targets })` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`): Delete elastic-table records in one request.
- `new BulkDeleteAction({ QuerySet?, JobName, SendEmailNotification, ToRecipients, CCRecipients, RecurrencePattern, StartDateTime, SourceImportId?, RunNow?, Options? })` (`POST /BulkDelete`): Start an asynchronous bulk delete job for a query.

<!-- /operations -->

### Workflows and data

<!-- operations:actions
ExecuteWorkflow: Run an on-demand workflow on a record; returns the `asyncoperation`.
Merge: Merge a subordinate record into a target (account, contact, lead or incident).
ExportToExcel: Export a view's rows as an .xlsx file (base64); not in `$metadata`, generated from a supplemental definition.
-->

- `new ExecuteWorkflowAction(workflowId, { EntityId, InputArguments? })` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record; returns the `asyncoperation`.
- `new MergeAction({ Target, Subordinate, UpdateContent?, PerformParentingChecks })` (`POST /Merge`): Merge a subordinate record into a target (account, contact, lead or incident).
- `new ExportToExcelAction({ View, FetchXml, LayoutXml, QueryApi, QueryParameters })` (`POST /ExportToExcel`): Export a view's rows as an .xlsx file (base64); not in `$metadata`, generated from a supplemental definition.

<!-- /operations -->

### Files

Unbound actions; the record is the `Target` parameter, not the route.

<!-- operations:actions
InitializeFileBlocksUpload: Start a chunked upload to a file column; returns `{ FileContinuationToken }`.
UploadBlock: Upload one block (base64 `blockData`, base64 `blockId`).
CommitFileBlocksUpload: Commit the uploaded blocks, in order, as the file.
InitializeFileBlocksDownload: Start a chunked download of a file column.
DownloadBlock: Download one block.
InitializeAnnotationBlocksUpload: Start a chunked upload to a note.
CommitAnnotationBlocksUpload: Commit a note's blocks.
InitializeAttachmentBlocksUpload: Start a chunked upload to an email attachment.
CommitAttachmentBlocksUpload: Commit an attachment's blocks.
-->

- `new InitializeFileBlocksUploadAction({ Target, FileName, FileAttributeName })` (`POST /InitializeFileBlocksUpload`): Start a chunked upload to a file column; returns `{ FileContinuationToken }`.
- `new UploadBlockAction({ BlockId, BlockData, FileContinuationToken })` (`POST /UploadBlock`): Upload one block (base64 `blockData`, base64 `blockId`).
- `new CommitFileBlocksUploadAction({ FileName, MimeType, BlockList, FileContinuationToken })` (`POST /CommitFileBlocksUpload`): Commit the uploaded blocks, in order, as the file.
- `new InitializeFileBlocksDownloadAction({ Target, FileAttributeName, DataSource? })` (`POST /InitializeFileBlocksDownload`): Start a chunked download of a file column.
- `new DownloadBlockAction({ Offset, BlockLength, FileContinuationToken })` (`POST /DownloadBlock`): Download one block.
- `new InitializeAnnotationBlocksUploadAction({ Target })` (`POST /InitializeAnnotationBlocksUpload`): Start a chunked upload to a note.
- `new CommitAnnotationBlocksUploadAction({ Target, BlockList, FileContinuationToken })` (`POST /CommitAnnotationBlocksUpload`): Commit a note's blocks.
- `new InitializeAttachmentBlocksUploadAction({ Target })` (`POST /InitializeAttachmentBlocksUpload`): Start a chunked upload to an email attachment.
- `new CommitAttachmentBlocksUploadAction({ Target, BlockList, FileContinuationToken })` (`POST /CommitAttachmentBlocksUpload`): Commit an attachment's blocks.

<!-- /operations -->

### Sales

<!-- operations:actions
WinOpportunity: Close an opportunity as won.
LoseOpportunity: Close an opportunity as lost.
QualifyLead: Qualify a lead into an account, contact and/or opportunity.
WinQuote: Close a quote as won.
CloseQuote: Close a quote.
GetQuoteProductsFromOpportunity: Copy an opportunity's products to a quote.
ConvertQuoteToSalesOrder: Create an order from a quote.
FulfillSalesOrder: Fulfill an order.
ConvertSalesOrderToInvoice: Create an invoice from an order.
AddItemCampaign_list: Add a marketing list to a campaign (one class per binding; see `AddItemCampaign_campaignAction`, …).
-->

- `new WinOpportunityAction({ OpportunityClose, Caller?, Status })` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityAction({ Caller?, OpportunityClose, Status })` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new QualifyLeadAction(leadId, { CreateAccount, CreateContact, CreateOpportunity, OpportunityCurrencyId?, OpportunityCustomerId?, SourceCampaignId?, Status, ProcessInstanceId?, LeadQualificationV2Param? })` (`POST /leads({leadId})/Microsoft.Dynamics.CRM.QualifyLead`): Qualify a lead into an account, contact and/or opportunity.
- `new WinQuoteAction({ QuoteClose, Status })` (`POST /WinQuote`): Close a quote as won.
- `new CloseQuoteAction({ QuoteClose, Status })` (`POST /CloseQuote`): Close a quote.
- `new GetQuoteProductsFromOpportunityAction(quoteId, { Opportunity })` (`POST /quotes({quoteId})/Microsoft.Dynamics.CRM.GetQuoteProductsFromOpportunity`): Copy an opportunity's products to a quote.
- `new ConvertQuoteToSalesOrderAction({ QuoteId, ColumnSet?, QuoteCloseDate?, QuoteCloseStatus?, QuoteCloseSubject?, QuoteCloseDescription?, ProcessInstanceId? })` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new FulfillSalesOrderAction({ OrderClose, Status })` (`POST /salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder`): Fulfill an order.
- `new ConvertSalesOrderToInvoiceAction({ SalesOrderId, ColumnSet?, ProcessInstanceId? })` (`POST /ConvertSalesOrderToInvoice`): Create an invoice from an order.
- `new AddItemCampaign_listAction(listId, { Campaign })` (`POST /lists({listId})/Microsoft.Dynamics.CRM.AddItemCampaign`): Add a marketing list to a campaign (one class per binding; see `AddItemCampaign_campaignAction`, …).

<!-- /operations -->

### Service and queues

<!-- operations:actions
CloseIncident: Resolve a case with an `incidentresolution`.
AddToQueue: Move a record into a queue.
RemoveFromQueue: Remove a queue item.
PickFromQueue: Assign a queue item to a user.
ReleaseToQueue: Release a queue item back to its queue.
RouteTo: Route a queue item with routing rules.
AddPrincipalToQueue: Add a user or team to a queue.
-->

- `new CloseIncidentAction({ IncidentResolution, Status })` (`POST /CloseIncident`): Resolve a case with an `incidentresolution`.
- `new AddToQueueAction(queueId, { Target, SourceQueue?, QueueItemProperties? })` (`POST /queues({queueId})/Microsoft.Dynamics.CRM.AddToQueue`): Move a record into a queue.
- `new RemoveFromQueueAction(queueitemId)` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.RemoveFromQueue`): Remove a queue item.
- `new PickFromQueueAction(queueitemId, { SystemUser, RemoveQueueItem })` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`): Assign a queue item to a user.
- `new ReleaseToQueueAction(queueitemId)` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.ReleaseToQueue`): Release a queue item back to its queue.
- `new RouteToAction({ Target, QueueItem? })` (`POST /RouteTo`): Route a queue item with routing rules.
- `new AddPrincipalToQueueAction(queueId, { Principal })` (`POST /queues({queueId})/Microsoft.Dynamics.CRM.AddPrincipalToQueue`): Add a user or team to a queue.

<!-- /operations -->

### Security and teams

<!-- operations:actions
GrantAccess: Share a record with a user or team.
ModifyAccess: Change the access a user or team has to a shared record.
RevokeAccess: Stop sharing a record with a user or team.
AddMembersTeam: Add users to a team.
RemoveMembersTeam: Remove users from a team.
-->

- `new GrantAccessAction({ Target, PrincipalAccess? })` (`POST /GrantAccess`): Share a record with a user or team.
- `new ModifyAccessAction({ Target, PrincipalAccess? })` (`POST /ModifyAccess`): Change the access a user or team has to a shared record.
- `new RevokeAccessAction({ Target, Revokee })` (`POST /RevokeAccess`): Stop sharing a record with a user or team.
- `new AddMembersTeamAction(teamId, { Members })` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`): Add users to a team.
- `new RemoveMembersTeamAction(teamId, { Members })` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`): Remove users from a team.

<!-- /operations -->

### Solutions and customization

<!-- operations:actions
ImportSolution: Import a solution file (base64).
ExportSolution: Export a solution; returns `{ ExportSolutionFile }` (base64).
PublishXml: Publish the customizations named in `parameterXml`.
PublishAllXml: Publish all customizations.
AddSolutionComponent: Add a component to an unmanaged solution.
RemoveSolutionComponent: Remove a component from an unmanaged solution.
CloneAsPatch: Create a patch of a solution.
CloneAsSolution: Roll patches into a new solution version.
StageAndUpgrade: Import a solution upgrade and apply it.
DeleteAndPromote: Replace a managed solution with its staged upgrade.
-->

- `new ImportSolutionAction({ OverwriteUnmanagedCustomizations, PublishWorkflows, CustomizationFile, ImportJobId, ConvertToManaged?, SkipProductUpdateDependencies?, HoldingSolution?, SkipQueueRibbonJob?, LayerDesiredOrder?, AsyncRibbonProcessing?, ComponentParameters?, IsTemplateMode?, TemplateSuffix?, SolutionParameters?, TemplateDisplayNamePrefix?, StageAndUpgrade?, SchemaUpdatesOnly? })` (`POST /ImportSolution`): Import a solution file (base64).
- `new ExportSolutionAction({ SolutionName, Managed, TargetVersion?, ExportAutoNumberingSettings?, ExportCalendarSettings?, ExportCustomizationSettings?, ExportEmailTrackingSettings?, ExportGeneralSettings?, ExportMarketingSettings?, ExportOutlookSynchronizationSettings?, ExportRelationshipRoles?, ExportIsvConfig?, ExportSales?, ExportExternalApplications?, ExportComponentsParams? })` (`POST /ExportSolution`): Export a solution; returns `{ ExportSolutionFile }` (base64).
- `new PublishXmlAction({ ParameterXml })` (`POST /PublishXml`): Publish the customizations named in `parameterXml`.
- `new PublishAllXmlAction()` (`POST /PublishAllXml`): Publish all customizations.
- `new AddSolutionComponentAction({ ComponentId, ComponentType, SolutionUniqueName, AddRequiredComponents, DoNotIncludeSubcomponents?, IncludedComponentSettingsValues? })` (`POST /AddSolutionComponent`): Add a component to an unmanaged solution.
- `new RemoveSolutionComponentAction({ SolutionComponent, ComponentType, SolutionUniqueName })` (`POST /RemoveSolutionComponent`): Remove a component from an unmanaged solution.
- `new CloneAsPatchAction({ ParentSolutionUniqueName, DisplayName, VersionNumber })` (`POST /CloneAsPatch`): Create a patch of a solution.
- `new CloneAsSolutionAction({ ParentSolutionUniqueName, DisplayName, VersionNumber })` (`POST /CloneAsSolution`): Roll patches into a new solution version.
- `new StageAndUpgradeAction({ OverwriteUnmanagedCustomizations, PublishWorkflows, CustomizationFile, ImportJobId, ConvertToManaged?, SkipProductUpdateDependencies?, SkipQueueRibbonJob?, AsyncRibbonProcessing?, ComponentParameters?, SolutionParameters?, LayerDesiredOrder?, SchemaUpdatesOnly? })` (`POST /StageAndUpgrade`): Import a solution upgrade and apply it.
- `new DeleteAndPromoteAction({ UniqueName })` (`POST /DeleteAndPromote`): Replace a managed solution with its staged upgrade.

<!-- /operations -->

### Email

<!-- operations:actions
SendEmail: Send an email activity.
SendEmailFromTemplate: Create and send an email from a template.
-->

- `new SendEmailAction(emailId, { IssueSend, TrackingToken? })` (`POST /emails({emailId})/Microsoft.Dynamics.CRM.SendEmail`): Send an email activity.
- `new SendEmailFromTemplateAction({ TemplateId, Regarding, Target })` (`POST /SendEmailFromTemplate`): Create and send an email from a template.

<!-- /operations -->

---

## Bulk operations or `$batch`

Bulk actions are faster than `$batch` for many records of one table, and they are the
recommendation for up to 1,000 standard-table records (100 for elastic tables) per request; see
[bulk-vs-batch.md](./bulk-vs-batch.md) and ADR-0006. Use `$batch` for mixed operations, several
tables, or a change set that must succeed or fail as a whole.

| Scenario                                | Recommended                                   |
| --------------------------------------- | --------------------------------------------- |
| Create up to 1,000 records of one table | `CreateMultipleAction` (split larger sets)    |
| Update up to 1,000 records of one table | `UpdateMultipleAction`                        |
| Upsert records                          | `UpsertMultipleAction`                        |
| Delete elastic-table records            | `DeleteMultipleAction`                        |
| Different operations or tables at once  | `$batch` (`@mohsinonxrm/dataverse-sdk-batch`) |
| All-or-nothing across operations        | `$batch` change set                           |

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const names = ["Contoso", "Fabrikam", "Northwind"];
const { Ids } = await client.execute(
  new CreateMultipleAction("accounts", {
    Targets: names.map((name) => ({ "@odata.type": "Microsoft.Dynamics.CRM.account", name })),
  })
);
console.log(`Created ${String(Ids.length)} accounts`);
```

## Chunked file upload

```typescript
import { readFile } from "node:fs/promises";
import {
  CommitFileBlocksUploadAction,
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

const file = await readFile("contract.pdf"); // a Buffer

const { FileContinuationToken } = await client.execute(
  new InitializeFileBlocksUploadAction({
    Target: createEntityReference("account", accountId),
    FileName: "contract.pdf",
    FileAttributeName: "new_contract",
  })
);

const blockSize = 4 * 1024 * 1024;
const blockIds: string[] = [];
for (let offset = 0, n = 0; offset < file.length; offset += blockSize, n++) {
  const blockId = btoa(String(n).padStart(6, "0"));
  blockIds.push(blockId);
  await client.execute(
    new UploadBlockAction({
      BlockId: blockId,
      BlockData: file.subarray(offset, offset + blockSize).toString("base64"),
      FileContinuationToken: FileContinuationToken,
    })
  );
}

await client.execute(
  new CommitFileBlocksUploadAction({
    FileName: "contract.pdf",
    MimeType: "application/pdf",
    BlockList: blockIds,
    FileContinuationToken: FileContinuationToken,
  })
);
```

`@mohsinonxrm/dataverse-sdk-files` wraps these steps.

---

## Actions, functions and messages

|                  | Actions                  | Functions            | Messages                     |
| ---------------- | ------------------------ | -------------------- | ---------------------------- |
| **HTTP method**  | POST                     | GET                  | POST                         |
| **Changes data** | Can                      | No                   | Can                          |
| **Class**        | `<Name>Action`           | `<Name>Function`     | `<Name>Request` / `Response` |
| **Run with**     | `client.execute(action)` | `client.execute(fn)` | `client.execute(request)`    |
| **Example**      | `WinOpportunityAction`   | `WhoAmIFunction`     | `WinOpportunityRequest`      |

## Additional Resources

- [Use Web API actions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/use-web-api-actions)
- [Web API action reference](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/reference/actions)
- [supported-functions.md](./supported-functions.md), [supported-messages.md](./supported-messages.md)
