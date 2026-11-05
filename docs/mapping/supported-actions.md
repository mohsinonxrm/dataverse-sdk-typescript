# Supported Actions Reference

> **Status**: Complete coverage - 1,356 typed Web API actions
>
> **Package**: `@mohsinonxrm/dataverse-sdk-actions`
>
> **Last Updated**: 2026-02-08 (the count was checked against the generated package on 2026-11-05)

---

## Overview

Actions are **POST-based operations** that may have side effects on data. This package provides 1,356 typed action classes generated from CSDL metadata.

### Coverage Summary

- **Total Actions**: 1,356 typed action classes
- **Generation Source**: Dataverse v9.2 CSDL metadata (Sales + Customer Service installed)
- **Solution Dependencies**: Includes actions from msdyn*\*, msdynmkt*\_, CCaaS\_\_ modules

---

## Usage Patterns

### Typed Action Approach (Recommended)

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Execute via client
const action = new WinOpportunityAction({
  OpportunityClose: {
    subject: "Deal Closed",
    opportunityid: opportunityId,
  },
  Status: -1,
});

const response = await client.execute(action);
```

### Raw API Approach

```typescript
// Same operation via raw API
const response = await client.api("/WinOpportunity").post({
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Deal Closed",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  },
  Status: -1,
});
```

### Via OrganizationService (Alternative)

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// Using OrganizationService facade
const request = new WinOpportunityRequest({
  OpportunityClose: {
    subject: "Deal Closed",
    opportunityid: opportunityId,
  },
  Status: -1,
});

const response = await orgService.execute(request);
```

---

## Action Categories

### Platform Actions (Core Business Operations)

**Bulk Operations** (Standard Tables):

- `CreateMultipleAction` - Batch create records (returns `{ Ids: string[] }`)
- `UpdateMultipleAction` - Batch update records (204 No Content)
- `UpsertMultipleAction` - Batch upsert records (204 No Content)

**Bulk Operations** (Elastic Tables Only):

- `DeleteMultipleAction` - Batch delete for elastic tables (204 No Content)

**Workflow Operations**:

- `ExecuteWorkflowAction` - Trigger workflow execution (bound to workflow entity)

**Data Operations**:

- `MergeAction` - Merge duplicate records (supports account, contact, lead, incident)

**File Operations**:

- `InitializeFileBlocksUploadAction` - Start chunked file upload
- `UploadBlockAction` - Upload file chunk
- `CommitFileBlocksUploadAction` - Finalize file upload

---

### Sales Module Actions

**Opportunity Management**:

- `WinOpportunityAction` - Close opportunity as won
- `LoseOpportunityAction` - Close opportunity as lost
- `CalculateActualValueOpportunityAction` - Recalculate opportunity value

**Lead Management**:

- `QualifyLeadAction` - Convert lead to account/contact/opportunity
- `DisqualifyLeadAction` - Mark lead as disqualified

**Quote Management**:

- `WinQuoteAction` - Mark quote as won
- `CloseQuoteAction` - Close quote
- `GetQuoteProductsFromOpportunityAction` - Copy products from opportunity

**Order Management**:

- `FulfillSalesOrderAction` - Mark sales order as fulfilled
- `ConvertSalesOrderToInvoiceAction` - Generate invoice from order

**Forecasting**:

- `RetrieveForecastColumnsAction` - Get forecast column definitions
- `CommitForecastAction` - Commit forecast data

**Relationship Intelligence**:

- `msdyn_GetRelationshipByGUIDAction` - Retrieve relationship by GUID
- `msdyn_UpdateRelationshipAction` - Update relationship data

---

### Customer Service Module Actions

**Case Management**:

- `CloseIncidentAction` - Close case with resolution
- `ReopenIncidentAction` - Reopen closed case
- `EscalateIncidentAction` - Escalate case

**Routing**:

- `ApplyRoutingRuleAction` - Apply routing rule to case
- `OverrideCreatedOnOrCreatedByAction` - Override system fields

**Entitlements**:

- `RenewEntitlementAction` - Renew entitlement
- `ValidateEntitlementAction` - Check entitlement validity

**Knowledge Base**:

- `DecrementKnowledgeArticleViewCountAction` - Decrement view count
- `IncrementKnowledgeArticleViewCountAction` - Increment view count

**Omnichannel (CCaaS)**:

- `CCaaS_AuthorizeCallAction` - Authorize call operation
- `CCaaS_GetAvailableAgentsAction` - Get available agents
- `CCaaS_TransferSessionAction` - Transfer conversation session

---

### Field Service Module Actions

**Work Order Management**:

- `msdyn_BookRequirementGroupAction` - Book resource requirement group
- `msdyn_CreateWorkOrderAction` - Create work order programmatically

**Resource Scheduling**:

- `msdyn_SearchResourceAvailabilityAction` - Find available resources
- `msdyn_ApplyWorkTemplateAction` - Apply template to work order

**Inventory Management**:

- `msdyn_InventoryAdjustmentAction` - Adjust inventory levels
- `msdyn_TransferInventoryAction` - Transfer inventory between warehouses

**Time Entry**:

- `msdyn_SubmitTimeEntryAction` - Submit time entry for approval
- `msdyn_ApproveTimeEntryAction` - Approve time entry

**IoT Integration**:

- `msdyn_RegisterIoTDeviceAction` - Register IoT device
- `msdyn_UnregisterIoTDeviceAction` - Unregister IoT device

---

### Marketing Module Actions

**Email Marketing**:

- `msdynmkt_SendEmailAction` - Send marketing email
- `msdynmkt_PreviewEmailAction` - Preview email content

**Journey Orchestration**:

- `msdynmkt_StartCustomerJourneyAction` - Initiate customer journey
- `msdynmkt_StopCustomerJourneyAction` - Stop customer journey

**Segment Management**:

- `msdynmkt_RefreshSegmentAction` - Refresh dynamic segment
- `msdynmkt_ExportSegmentMembersAction` - Export segment to file

**Event Management**:

- `msdynmkt_RegisterEventAttendeeAction` - Register attendee
- `msdynmkt_CancelEventRegistrationAction` - Cancel registration

**Real-Time Marketing**:

- `msdynmkt_TriggerRealtimeWorkflowAction` - Execute real-time workflow
- `msdynmkt_TrackWebActivityAction` - Track website interaction

---

### Project Operations Module Actions

**Project Management**:

- `msdyn_CreateProjectTaskAction` - Create project task
- `msdyn_UpdateProjectStatusAction` - Update project status

**Resource Allocation**:

- `msdyn_AllocateResourceAction` - Allocate resource to project
- `msdyn_DeallocateResourceAction` - Remove resource allocation

**Expense Management**:

- `msdyn_SubmitExpenseAction` - Submit expense for approval
- `msdyn_ApproveExpenseAction` - Approve expense

---

## Solution Dependencies

### Core Platform

- All actions available in base Dataverse installation

### Sales Module (msdyn_SalesApp)

- Opportunity, Lead, Quote, Order, Forecast actions
- Relationship intelligence actions

### Customer Service Module (msdyn_CustomerService)

- Case, Routing, Entitlement, Knowledge actions
- Omnichannel (CCaaS\_\*) actions

### Field Service Module (msdyn_FieldService)

- Work Order, Scheduling, Inventory, Time Entry, IoT actions

### Marketing Module (MicrosoftDynamics_MarketingApp)

- Email, Journey, Segment, Event actions (msdynmkt\_\*)

### Project Operations (msdyn_ProjectService)

- Project, Resource, Expense actions

---

## Advanced Usage

### Bulk Operations Decision Matrix

| Scenario                     | Recommended Approach     | Notes                 |
| ---------------------------- | ------------------------ | --------------------- |
| Create <100 records          | `CreateMultipleAction`   | Returns all new IDs   |
| Create 100-1000 records      | `$batch` with changesets | Better error handling |
| Update <100 records          | `UpdateMultipleAction`   | Fast, atomic          |
| Update >100 records          | `$batch` with changesets | Split into batches    |
| Upsert operations            | `UpsertMultipleAction`   | Standard tables only  |
| Delete elastic table records | `DeleteMultipleAction`   | Elastic tables only   |

### Concurrency Behavior

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const action = new CreateMultipleAction({
  Targets: accounts.map((a) => ({
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: a.name,
  })),
  // Concurrency options:
  // - Default: IfVersionMatches (optimistic concurrency)
  // - AlwaysOverwrite: Ignore version conflicts
  ConcurrencyBehavior: "IfVersionMatches",
});

const result = await client.execute(action);
console.log(`Created ${result.Ids.length} accounts`);
```

### File Upload with Progress

```typescript
import {
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  CommitFileBlocksUploadAction,
} from "@mohsinonxrm/dataverse-sdk-actions";

// 1. Initialize upload
const init = await client.execute(
  new InitializeFileBlocksUploadAction({
    Target: {
      "@odata.type": "Microsoft.Dynamics.CRM.annotation",
      annotationid: annotationId,
    },
    FileAttributeName: "documentbody",
    FileName: "large-file.pdf",
  })
);

// 2. Upload chunks (4MB recommended)
const chunkSize = 4 * 1024 * 1024;
for (let offset = 0; offset < fileBuffer.length; offset += chunkSize) {
  const chunk = fileBuffer.slice(offset, offset + chunkSize);
  await client.execute(
    new UploadBlockAction({
      FileContinuationToken: init.FileContinuationToken,
      BlockId: btoa(offset.toString()),
      BlockData: chunk.toString("base64"),
    })
  );
  console.log(`Uploaded ${Math.min(offset + chunkSize, fileBuffer.length)} / ${fileBuffer.length}`);
}

// 3. Commit upload
await client.execute(
  new CommitFileBlocksUploadAction({
    FileContinuationToken: init.FileContinuationToken,
    FileName: "large-file.pdf",
    MimeType: "application/pdf",
  })
);
```

---

## Action vs Function vs Message

| Feature          | Actions                        | Functions                    | Messages              |
| ---------------- | ------------------------------ | ---------------------------- | --------------------- |
| **HTTP Method**  | POST                           | GET                          | POST (via execute)    |
| **Side Effects** | Yes (write, modify, execute)   | No (read-only)               | Yes (write, modify)   |
| **Caching**      | Not cacheable                  | Cacheable                    | Not cacheable         |
| **When to Use**  | Business logic, data changes   | Calculations, queries        | C#-familiar pattern   |
| **Examples**     | WinOpportunity, CreateMultiple | WhoAmI, CalculateRollupField | WinOpportunityRequest |

---

## Performance Considerations

### Use Actions When:

- Executing business logic (WinOpportunity, QualifyLead)
- Uploading/downloading files with progress tracking
- Creating/updating <100 records (bulk operations)
- Triggering workflows or processes

### Use `$batch` Instead When:

- Creating/updating >100 records
- Need fine-grained error handling per operation
- Want transactional guarantees (changesets)
- Performing mixed operations (create + update + delete)

### Use Standard CRUD When:

- Single record create/update/delete
- Simple operations without business logic
- Maximum performance (no action overhead)

---

## Additional Resources

- [Master Supported Operations](./supported-operations.md) - Complete SDK operation reference
- [Supported Functions](./supported-functions.md) - Read-only function reference
- [Supported Messages](./supported-messages.md) - OrganizationService message reference
- [Bulk Operations Guide](../../packages/dataverse-sdk-actions/README.md#bulk-operations) - Decision matrix and examples
- [File Operations Guide](../../packages/dataverse-sdk-files/README.md) - Chunked upload/download patterns
