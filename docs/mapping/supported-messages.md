# Supported Messages Reference

> **Status**: Complete coverage - 1,356 typed Organization Service messages
>
> **Package**: `@mohsinonxrm/dataverse-sdk-messages`
>
> **Last Updated**: 2025-01-01

---

## Overview

Messages are **request/response pairs** that follow the **OrganizationService** pattern familiar from C# SDK. This package provides 1,356 typed message classes that map to Web API actions, functions, and HTTP operations.

### Coverage Summary

- **Total Messages**: 1,356 typed request/response pairs
- **Generation Source**: Dataverse v9.2 CSDL metadata (Sales + Customer Service installed)
- **Import Pattern**: Direct named exports (e.g., `import { WhoAmIRequest } from '@mohsinonxrm/dataverse-sdk-messages'`)
- **Web API Mapping**: Messages map to actions (POST), functions (GET), or HTTP CRUD operations

---

## Usage Patterns

### OrganizationService Pattern (C#-Familiar)

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WhoAmIRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const orgService = new OrganizationService(client);

// Execute platform message
const request = new WhoAmIRequest();
const response = await orgService.execute(request);

console.log(`User ID: ${response.UserId}`);
console.log(`Org ID: ${response.OrganizationId}`);
console.log(`Business Unit: ${response.BusinessUnitId}`);
```

### Business Logic Message

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new WinOpportunityRequest({
  OpportunityClose: {
    subject: "Deal Closed - Q4 2024",
    opportunityid: opportunityId,
    actualrevenue: 150000,
    actualend: new Date(),
  },
  Status: -1, // Won
});

const response = await orgService.execute(request);
// Response is empty (void) for WinOpportunity
```

### Generic OrganizationRequest

For messages not yet typed or custom messages:

```typescript
import { OrganizationRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new OrganizationRequest("CustomAction", {
  Target: { entityLogicalName: "account", id: accountId },
  Parameter1: "value",
});

const response = await orgService.execute(request);
```

---

## Message Categories

The 1,356 messages are organized by functional area below. All messages are imported directly using named exports.

### Platform Messages (Core Operations)

Core platform operations available in all Dataverse environments.

#### Identity & Security

**User Identity**:

- `WhoAmIRequest/Response` - Get current user context (maps to WhoAmI function)

**Record Ownership**:

- `AssignRequest` - Assign record to user/team (maps to Assign action)
- `GrantAccessRequest` - Grant access to principal (maps to GrantAccess action)
- `ModifyAccessRequest` - Modify access rights (maps to ModifyAccess action)
- `RevokeAccessRequest` - Revoke access from principal (maps to RevokeAccess action)
- `RetrievePrincipalAccessRequest/Response` - Get access rights (maps to RetrievePrincipalAccess function)

**Privilege Checks**:

- `RetrievePrivilegeSetRequest/Response` - Get privilege set
- `CheckPrivilegeRequest/Response` - Validate privilege

#### Record State Management

**State Transitions**:

- `SetStateRequest` - Change state/status (maps to SetState action)
- `CloseIncidentRequest` - Close case with resolution (maps to CloseIncident action)
- `CloseQuoteRequest` - Close quote (maps to CloseQuote action)
- `CancelSalesOrderRequest` - Cancel sales order (maps to CancelSalesOrder action)

**Activation**:

- `SetBusinessSystemUserRequest` - Enable/disable user (maps to SetBusinessSystemUser action)

#### Relationship Operations

**Associate/Disassociate**:

- `AssociateRequest` - Create N:N relationship (maps to POST collection navigation)
- `DisassociateRequest` - Remove N:N relationship (maps to DELETE collection navigation)

#### Data Export

**Export**:

- `ExportToExcelRequest/Response` - Export to Excel (maps to ExportToExcel action)
- `ExportSolutionRequest/Response` - Export solution (maps to ExportSolution action)

#### Metadata Operations

**Metadata Changes**:

- `RetrieveMetadataChangesRequest/Response` - Incremental metadata sync (maps to RetrieveMetadataChanges function)
- `RetrieveEntityRequest/Response` - Get entity definition (maps to EntityDefinitions HTTP GET)
- `RetrieveAttributeRequest/Response` - Get attribute definition (maps to HTTP GET)

**Solution Publishing**:

- `PublishXmlRequest` - Publish components (maps to PublishXml action)
- `PublishAllXmlRequest` - Publish all customizations (maps to PublishAllXml action)

---

### Business Module Messages (Sales, Service, Marketing, etc.)

Business-specific operations organized by module.

#### Sales Module Messages

**Opportunity Management**:

- `WinOpportunityRequest` - Close opportunity as won (maps to WinOpportunity action)
- `LoseOpportunityRequest` - Close opportunity as lost (maps to LoseOpportunity action)
- `CalculateActualValueOpportunityRequest/Response` - Recalculate value (maps to action)

**Lead Management**:

- `QualifyLeadRequest/Response` - Convert lead (maps to QualifyLead action)
- `DisqualifyLeadRequest` - Disqualify lead (maps to DisqualifyLead action)

**Quote Management**:

- `WinQuoteRequest` - Mark quote as won (maps to WinQuote action)
- `GetQuoteProductsFromOpportunityRequest` - Copy products (maps to action)

**Order Management**:

- `FulfillSalesOrderRequest` - Fulfill order (maps to FulfillSalesOrder action)
- `ConvertSalesOrderToInvoiceRequest/Response` - Generate invoice (maps to action)

**Forecasting**:

- `RetrieveForecastColumnsRequest/Response` - Get forecast columns
- `CommitForecastRequest` - Commit forecast data

#### Customer Service Module Messages

**Case Management**:

- `CloseIncidentRequest` - Close case with resolution (maps to CloseIncident action)
- `ReopenIncidentRequest` - Reopen case (maps to ReopenIncident action)
- `EscalateIncidentRequest` - Escalate case (maps to EscalateIncident action)

**Routing**:

- `ApplyRoutingRuleRequest` - Apply routing rule (maps to ApplyRoutingRule action)

**Entitlements**:

- `RenewEntitlementRequest/Response` - Renew entitlement (maps to RenewEntitlement action)
- `ValidateEntitlementRequest/Response` - Check validity (maps to ValidateEntitlement function)

**Knowledge Base**:

- `IncrementKnowledgeArticleViewCountRequest` - Increment views (maps to action)
- `DecrementKnowledgeArticleViewCountRequest` - Decrement views (maps to action)

#### Field Service Module Messages (msdyn\_\*)

**Work Order Management**:

- `msdyn_BookRequirementGroupRequest/Response` - Book resource group
- `msdyn_CreateWorkOrderRequest/Response` - Create work order

**Resource Scheduling**:

- `msdyn_SearchResourceAvailabilityRequest/Response` - Find available resources
- `msdyn_ApplyWorkTemplateRequest` - Apply template

**Inventory Management**:

- `msdyn_InventoryAdjustmentRequest` - Adjust inventory
- `msdyn_TransferInventoryRequest` - Transfer inventory

**Time Entry**:

- `msdyn_SubmitTimeEntryRequest` - Submit for approval
- `msdyn_ApproveTimeEntryRequest` - Approve time entry

**IoT Integration**:

- `msdyn_RegisterIoTDeviceRequest/Response` - Register device
- `msdyn_UnregisterIoTDeviceRequest` - Unregister device

#### Marketing Module Messages (msdynmkt\_\*)

**Email Marketing**:

- `msdynmkt_SendEmailRequest` - Send marketing email
- `msdynmkt_PreviewEmailRequest/Response` - Preview email

**Journey Orchestration**:

- `msdynmkt_StartCustomerJourneyRequest` - Start journey
- `msdynmkt_StopCustomerJourneyRequest` - Stop journey

**Segment Management**:

- `msdynmkt_RefreshSegmentRequest` - Refresh dynamic segment
- `msdynmkt_ExportSegmentMembersRequest/Response` - Export segment

**Event Management**:

- `msdynmkt_RegisterEventAttendeeRequest` - Register attendee
- `msdynmkt_CancelEventRegistrationRequest` - Cancel registration

#### Project Operations Messages (msdyn\_\*)

**Project Management**:

- `msdyn_CreateProjectTaskRequest/Response` - Create task
- `msdyn_UpdateProjectStatusRequest` - Update status

**Resource Allocation**:

- `msdyn_AllocateResourceRequest` - Allocate resource
- `msdyn_DeallocateResourceRequest` - Remove allocation

**Expense Management**:

- `msdyn_SubmitExpenseRequest` - Submit for approval
- `msdyn_ApproveExpenseRequest` - Approve expense

---

## Web API Mapping

Messages map to different Web API patterns depending on the operation:

### Messages → Actions (POST)

Business logic messages map to actions:

```typescript
// WinOpportunityRequest → POST /WinOpportunity
const request = new WinOpportunityRequest({ ... });
await orgService.execute(request);

// Equivalent raw API:
await client.api('/WinOpportunity').post({ ... });
```

### Messages → Functions (GET)

Read-only messages map to functions:

```typescript
// WhoAmIRequest → GET /WhoAmI()
const request = new WhoAmIRequest();
const response = await orgService.execute(request);

// Equivalent raw API:
const response = await client.api("/WhoAmI()").get();
```

### Messages → HTTP CRUD

CRUD messages map to standard HTTP operations:

```typescript
// CreateRequest → POST /accounts
// UpdateRequest → PATCH /accounts(id)
// DeleteRequest → DELETE /accounts(id)
// RetrieveRequest → GET /accounts(id)

// These are handled by OrganizationService.create/update/delete/retrieve
```

---

## OptionSet Ergonomics

Messages accept both `number` and `{ Value: number }` for OptionSet fields:

```typescript
import { SetStateRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// Both patterns work:
const request1 = new SetStateRequest({
  EntityMoniker: { entityLogicalName: "account", id: accountId },
  State: 1, // Simple number
  Status: -1,
});

const request2 = new SetStateRequest({
  EntityMoniker: { entityLogicalName: "account", id: accountId },
  State: { Value: 1 }, // OptionSetValue object
  Status: { Value: -1 },
});

// SDK normalizes both to Web API format
```

---

## Advanced Patterns

### Batch Execute Messages

Combine multiple messages in a single batch:

```typescript
import { BatchBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import { AssignRequest, SetStateRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const batch = new BatchBuilder(client);

// Begin changeset for transactional execution
batch.beginChangeSet();

// Add multiple message executions
batch.addRequest(
  new AssignRequest({
    Target: { entityLogicalName: "account", id: accountId },
    Assignee: { entityLogicalName: "systemuser", id: newOwnerId },
  })
);

batch.addRequest(
  new SetStateRequest({
    EntityMoniker: { entityLogicalName: "account", id: accountId },
    State: 0,
    Status: 1,
  })
);

batch.endChangeSet();

// Execute all messages atomically
const results = await batch.execute();
```

### Metadata Operations

Retrieve metadata changes incrementally:

```typescript
import {
  RetrieveMetadataChangesRequest,
  RetrieveMetadataChangesResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";

const request = new RetrieveMetadataChangesRequest({
  Query: {
    Criteria: {
      FilterOperator: "And",
      Conditions: [
        {
          PropertyName: "SchemaName",
          ConditionOperator: "Equals",
          Value: "Account",
        },
      ],
    },
    Properties: {
      AllProperties: false,
      PropertyNames: ["Attributes", "DisplayName", "SchemaName"],
    },
  },
  ClientVersionStamp: previousVersionStamp, // from last sync
});

const response = await orgService.execute(request);

console.log(`Server version: ${response.ServerVersionStamp}`);
console.log(`Deleted metadata: ${response.DeletedMetadata.length}`);
console.log(`Entity metadata: ${response.EntityMetadata.length}`);

// Store ServerVersionStamp for next incremental sync
```

### Workflow Execution

Trigger on-demand workflow:

```typescript
import {
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExecuteWorkflowRequest({
  EntityId: accountId, // Record to run workflow against
  WorkflowId: workflowId, // Workflow definition ID
});

const response = await orgService.execute(request);

console.log(`Async operation ID: ${response.Id}`);

// Poll async operation for completion
const asyncOp = await orgService.retrieve("asyncoperation", response.Id, {
  select: ["statecode", "statuscode", "message"],
});
```

---

## Message vs Action vs Function

| Feature         | Messages                             | Actions                 | Functions                 |
| --------------- | ------------------------------------ | ----------------------- | ------------------------- |
| **Pattern**     | OrganizationService (C#-familiar)    | Direct action execution | Direct function execution |
| **HTTP**        | POST /api/data/v9.2/ExecuteAction    | POST /actionname        | GET /functionname()       |
| **When to Use** | C# background, CRUD + business logic | Business logic only     | Read-only queries         |
| **Typed**       | Request/Response pairs               | Action classes          | Function classes          |
| **Examples**    | WinOpportunityRequest                | WinOpportunityAction    | WhoAmIFunction            |

### Choosing the Right Approach

**Use Messages When**:

- Coming from C# SDK background
- Need `OrganizationService` pattern (create/retrieve/update/delete)
- Combining CRUD + execute in same codebase
- Want consistent request/response pattern

**Use Actions/Functions When**:

- Prefer HTTP-first approach
- Only executing business logic (not CRUD)
- Want cleaner syntax for single operations
- Building new TypeScript-first applications

**Use Raw API When**:

- Need maximum performance (no abstraction overhead)
- Working with dynamic/unknown entities
- Building low-level infrastructure

---

## Solution Dependencies

### Platform Messages (No Dependencies)

All platform messages available in base Dataverse:

- WhoAmI, Assign, SetState, Associate, Disassociate
- GrantAccess, RevokeAccess, ModifyAccess
- PublishXml, PublishAllXml, ExportSolution

### Sales Module (msdyn_SalesApp)

- WinOpportunity, LoseOpportunity, CalculateActualValueOpportunity
- QualifyLead, DisqualifyLead
- WinQuote, FulfillSalesOrder, ConvertSalesOrderToInvoice

### Customer Service Module (msdyn_CustomerService)

- CloseIncident, ReopenIncident, EscalateIncident
- ApplyRoutingRule, RenewEntitlement, ValidateEntitlement

### Field Service Module (msdyn_FieldService)

- msdyn_BookRequirementGroup, msdyn_CreateWorkOrder
- msdyn_SearchResourceAvailability, msdyn_ApplyWorkTemplate
- msdyn_InventoryAdjustment, msdyn_TransferInventory

### Marketing Module (MicrosoftDynamics_MarketingApp)

- msdynmkt_SendEmail, msdynmkt_PreviewEmail
- msdynmkt_StartCustomerJourney, msdynmkt_StopCustomerJourney
- msdynmkt_RefreshSegment, msdynmkt_ExportSegmentMembers

### Project Operations (msdyn_ProjectService)

- msdyn_CreateProjectTask, msdyn_UpdateProjectStatus
- msdyn_AllocateResource, msdyn_DeallocateResource
- msdyn_SubmitExpense, msdyn_ApproveExpense

---

## Performance Considerations

### Use Messages When:

- You need `OrganizationService` CRUD pattern (create/retrieve/update/delete)
- Coming from C# SDK and want familiar patterns
- Building tools/utilities that mirror C# SDK behavior

### Use Actions/Functions Instead When:

- Only executing business logic (not CRUD)
- Prefer HTTP-first approach
- Want lighter syntax (no Request/Response wrapping)

### Use Raw API Instead When:

- Maximum performance required (no abstraction)
- Dynamic entity operations
- Building low-level infrastructure

---

## Additional Resources

- [Master Supported Operations](./supported-operations.md) - Complete SDK operation reference
- [Supported Actions](./supported-actions.md) - Action reference with bulk operations
- [Supported Functions](./supported-functions.md) - Read-only function reference
- [Message to Web API Mapping](./message-to-webapi.md) - Detailed HTTP mapping guide
- [OrganizationService Guide](../../packages/dataverse-sdk-xrm/README.md) - CRUD + execute patterns
