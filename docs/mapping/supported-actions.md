# Supported Actions Reference

> **Package**: `@mohsinonxrm/dataverse-sdk-actions`
>
> **Coverage**: <!-- count:actions -->1,360<!-- /count --> typed Web API actions, generated from a Dataverse `$metadata`. The lists below are generated from the package source by `pnpm --filter generate-sdk-types docs`, so every class, constructor and route shown exists.

---

## Overview

Actions are **POST operations** that can change data. Each action is a class whose constructor
takes the action's parameters **positionally, in `$metadata` order**. Run it with
`client.execute(action)`; it resolves to the typed response.

- A bound action takes the record id (or, for a collection-bound action on any table, the entity
  set name) as its first argument.
- A parameter that `$metadata` doesn't mark `Nullable="false"` is optional: at the end of the list
  it can be left out, elsewhere it accepts `undefined`, and either way it isn't sent.
- Entity-typed parameters take an `EntityReference` (`createEntityReference(table, id)`) or an
  entity payload with column values, `@odata.type` and `<lookup>@odata.bind` values.
- An operation declared with several bindings has one class per binding, `<Name>_<table>Action`
  (for example `AddItemCampaign_listAction`).
- The package also covers solution-specific actions (`msdyn_*`, `msdynmkt_*`, `CCaaS_*`, …) that
  were installed in the org it was generated from. They only work in an org with the same solution.

---

## Usage

### Typed action (recommended)

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

await client.execute(
  new WinOpportunityAction(
    {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: "Deal closed",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    },
    undefined, // Caller
    3 // Status: Won
  )
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

- `new CreateMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`): Create records of one table in one request; returns `{ Ids }`.
- `new UpdateMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`): Update records of one table in one request.
- `new UpsertMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`): Create or update records of one table in one request.
- `new DeleteMultipleAction(entitySetName, targets)` (`POST /{entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`): Delete elastic-table records in one request.
- `new BulkDeleteAction(querySet, jobName, sendEmailNotification, toRecipients, cCRecipients, recurrencePattern, startDateTime, sourceImportId?, runNow?)` (`POST /BulkDelete`): Start an asynchronous bulk delete job for a query.

<!-- /operations -->

### Workflows and data

<!-- operations:actions
ExecuteWorkflow: Run an on-demand workflow on a record; returns the `asyncoperation`.
Merge: Merge a subordinate record into a target (account, contact, lead or incident).
ExportToExcel: Export a view's rows as an .xlsx file (base64); not in `$metadata`, generated from a supplemental definition.
-->

- `new ExecuteWorkflowAction(workflowId, entityId, inputArguments?)` (`POST /workflows({workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`): Run an on-demand workflow on a record; returns the `asyncoperation`.
- `new MergeAction(target, subordinate, updateContent, performParentingChecks)` (`POST /Merge`): Merge a subordinate record into a target (account, contact, lead or incident).
- `new ExportToExcelAction(view, fetchXml, layoutXml, queryApi, queryParameters)` (`POST /ExportToExcel`): Export a view's rows as an .xlsx file (base64); not in `$metadata`, generated from a supplemental definition.

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

- `new InitializeFileBlocksUploadAction(target, fileName, fileAttributeName)` (`POST /InitializeFileBlocksUpload`): Start a chunked upload to a file column; returns `{ FileContinuationToken }`.
- `new UploadBlockAction(blockId, blockData, fileContinuationToken)` (`POST /UploadBlock`): Upload one block (base64 `blockData`, base64 `blockId`).
- `new CommitFileBlocksUploadAction(fileName, mimeType, blockList, fileContinuationToken)` (`POST /CommitFileBlocksUpload`): Commit the uploaded blocks, in order, as the file.
- `new InitializeFileBlocksDownloadAction(target, fileAttributeName, dataSource?)` (`POST /InitializeFileBlocksDownload`): Start a chunked download of a file column.
- `new DownloadBlockAction(offset, blockLength, fileContinuationToken)` (`POST /DownloadBlock`): Download one block.
- `new InitializeAnnotationBlocksUploadAction(target)` (`POST /InitializeAnnotationBlocksUpload`): Start a chunked upload to a note.
- `new CommitAnnotationBlocksUploadAction(target, blockList, fileContinuationToken)` (`POST /CommitAnnotationBlocksUpload`): Commit a note's blocks.
- `new InitializeAttachmentBlocksUploadAction(target)` (`POST /InitializeAttachmentBlocksUpload`): Start a chunked upload to an email attachment.
- `new CommitAttachmentBlocksUploadAction(target, blockList, fileContinuationToken)` (`POST /CommitAttachmentBlocksUpload`): Commit an attachment's blocks.

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

- `new WinOpportunityAction(opportunityClose, caller, status)` (`POST /WinOpportunity`): Close an opportunity as won.
- `new LoseOpportunityAction(caller, opportunityClose, status)` (`POST /LoseOpportunity`): Close an opportunity as lost.
- `new QualifyLeadAction(leadId, createAccount, createContact, createOpportunity, opportunityCurrencyId, opportunityCustomerId, sourceCampaignId, status, processInstanceId?, leadQualificationV2Param?)` (`POST /leads({leadId})/Microsoft.Dynamics.CRM.QualifyLead`): Qualify a lead into an account, contact and/or opportunity.
- `new WinQuoteAction(quoteClose, status)` (`POST /WinQuote`): Close a quote as won.
- `new CloseQuoteAction(quoteClose, status)` (`POST /CloseQuote`): Close a quote.
- `new GetQuoteProductsFromOpportunityAction(quoteId, opportunity)` (`POST /quotes({quoteId})/Microsoft.Dynamics.CRM.GetQuoteProductsFromOpportunity`): Copy an opportunity's products to a quote.
- `new ConvertQuoteToSalesOrderAction(quoteId, columnSet?, quoteCloseDate?, quoteCloseStatus?, quoteCloseSubject?, quoteCloseDescription?, processInstanceId?)` (`POST /ConvertQuoteToSalesOrder`): Create an order from a quote.
- `new FulfillSalesOrderAction(orderClose, status)` (`POST /salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder`): Fulfill an order.
- `new ConvertSalesOrderToInvoiceAction(salesOrderId, columnSet?, processInstanceId?)` (`POST /ConvertSalesOrderToInvoice`): Create an invoice from an order.
- `new AddItemCampaign_listAction(listId, campaign)` (`POST /lists({listId})/Microsoft.Dynamics.CRM.AddItemCampaign`): Add a marketing list to a campaign (one class per binding; see `AddItemCampaign_campaignAction`, …).

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

- `new CloseIncidentAction(incidentResolution, status)` (`POST /CloseIncident`): Resolve a case with an `incidentresolution`.
- `new AddToQueueAction(queueId, target, sourceQueue?, queueItemProperties?)` (`POST /queues({queueId})/Microsoft.Dynamics.CRM.AddToQueue`): Move a record into a queue.
- `new RemoveFromQueueAction(queueitemId)` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.RemoveFromQueue`): Remove a queue item.
- `new PickFromQueueAction(queueitemId, systemUser, removeQueueItem)` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`): Assign a queue item to a user.
- `new ReleaseToQueueAction(queueitemId)` (`POST /queueitems({queueitemId})/Microsoft.Dynamics.CRM.ReleaseToQueue`): Release a queue item back to its queue.
- `new RouteToAction(target, queueItem?)` (`POST /RouteTo`): Route a queue item with routing rules.
- `new AddPrincipalToQueueAction(queueId, principal)` (`POST /queues({queueId})/Microsoft.Dynamics.CRM.AddPrincipalToQueue`): Add a user or team to a queue.

<!-- /operations -->

### Security and teams

<!-- operations:actions
GrantAccess: Share a record with a user or team.
ModifyAccess: Change the access a user or team has to a shared record.
RevokeAccess: Stop sharing a record with a user or team.
AddMembersTeam: Add users to a team.
RemoveMembersTeam: Remove users from a team.
-->

- `new GrantAccessAction(target, principalAccess?)` (`POST /GrantAccess`): Share a record with a user or team.
- `new ModifyAccessAction(target, principalAccess?)` (`POST /ModifyAccess`): Change the access a user or team has to a shared record.
- `new RevokeAccessAction(target, revokee)` (`POST /RevokeAccess`): Stop sharing a record with a user or team.
- `new AddMembersTeamAction(teamId, members)` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`): Add users to a team.
- `new RemoveMembersTeamAction(teamId, members)` (`POST /teams({teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`): Remove users from a team.

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

- `new ImportSolutionAction(overwriteUnmanagedCustomizations, publishWorkflows, customizationFile, importJobId, convertToManaged?, skipProductUpdateDependencies?, holdingSolution?, skipQueueRibbonJob?, layerDesiredOrder?, asyncRibbonProcessing?, componentParameters?, isTemplateMode?, templateSuffix?, solutionParameters?, templateDisplayNamePrefix?, stageAndUpgrade?, schemaUpdatesOnly?)` (`POST /ImportSolution`): Import a solution file (base64).
- `new ExportSolutionAction(solutionName, managed, targetVersion?, exportAutoNumberingSettings?, exportCalendarSettings?, exportCustomizationSettings?, exportEmailTrackingSettings?, exportGeneralSettings?, exportMarketingSettings?, exportOutlookSynchronizationSettings?, exportRelationshipRoles?, exportIsvConfig?, exportSales?, exportExternalApplications?, exportComponentsParams?)` (`POST /ExportSolution`): Export a solution; returns `{ ExportSolutionFile }` (base64).
- `new PublishXmlAction(parameterXml)` (`POST /PublishXml`): Publish the customizations named in `parameterXml`.
- `new PublishAllXmlAction()` (`POST /PublishAllXml`): Publish all customizations.
- `new AddSolutionComponentAction(componentId, componentType, solutionUniqueName, addRequiredComponents, doNotIncludeSubcomponents?, includedComponentSettingsValues?)` (`POST /AddSolutionComponent`): Add a component to an unmanaged solution.
- `new RemoveSolutionComponentAction(solutionComponent, componentType, solutionUniqueName)` (`POST /RemoveSolutionComponent`): Remove a component from an unmanaged solution.
- `new CloneAsPatchAction(parentSolutionUniqueName, displayName, versionNumber)` (`POST /CloneAsPatch`): Create a patch of a solution.
- `new CloneAsSolutionAction(parentSolutionUniqueName, displayName, versionNumber)` (`POST /CloneAsSolution`): Roll patches into a new solution version.
- `new StageAndUpgradeAction(overwriteUnmanagedCustomizations, publishWorkflows, customizationFile, importJobId, convertToManaged?, skipProductUpdateDependencies?, skipQueueRibbonJob?, asyncRibbonProcessing?, componentParameters?, solutionParameters?, layerDesiredOrder?, schemaUpdatesOnly?)` (`POST /StageAndUpgrade`): Import a solution upgrade and apply it.
- `new DeleteAndPromoteAction(uniqueName)` (`POST /DeleteAndPromote`): Replace a managed solution with its staged upgrade.

<!-- /operations -->

### Email

<!-- operations:actions
SendEmail: Send an email activity.
SendEmailFromTemplate: Create and send an email from a template.
-->

- `new SendEmailAction(emailId, issueSend, trackingToken?)` (`POST /emails({emailId})/Microsoft.Dynamics.CRM.SendEmail`): Send an email activity.
- `new SendEmailFromTemplateAction(templateId, regarding, target)` (`POST /SendEmailFromTemplate`): Create and send an email from a template.

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

const { Ids } = await client.execute(
  new CreateMultipleAction(
    "accounts",
    names.map((name) => ({ "@odata.type": "Microsoft.Dynamics.CRM.account", name }))
  )
);
console.log(`Created ${String(Ids.length)} accounts`);
```

## Chunked file upload

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
    "contract.pdf", // FileName
    "new_contract" // FileAttributeName: the file column
  )
);

const blockSize = 4 * 1024 * 1024;
const blockIds: string[] = [];
for (let offset = 0, n = 0; offset < file.length; offset += blockSize, n++) {
  const blockId = btoa(String(n).padStart(6, "0"));
  blockIds.push(blockId);
  await client.execute(
    new UploadBlockAction(
      blockId,
      Buffer.from(file.subarray(offset, offset + blockSize)).toString("base64"),
      FileContinuationToken
    )
  );
}

await client.execute(
  new CommitFileBlocksUploadAction(
    "contract.pdf",
    "application/pdf",
    blockIds,
    FileContinuationToken
  )
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
