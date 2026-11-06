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

The SDK includes **1,356+ typed messages** organized into the following categories:

### Platform Messages

**Identity & Security:**

- `RetrievePrincipalAccessRequest/Response` - Get access rights
- `GrantAccessRequest/Response` - Grant access to record
- `RevokeAccessRequest/Response` - Revoke access to record

**Entity Operations:**

- `AssignRequest/Response` - Assign record ownership
- `SetStateRequest/Response` - Set state and status
- `MergeRequest/Response` - Merge duplicate records

**Metadata:**

- `RetrieveMetadataChangesRequest/Response` - Get metadata delta
- `CreateEntityRequest/Response` - Create custom entity
- `CreateAttributeRequest/Response` - Create column

### Business Messages

**Sales Module:**

- `WinOpportunityRequest/Response` - Close opportunity as won
- `LoseOpportunityRequest/Response` - Close opportunity as lost
- `QualifyLeadRequest/Response` - Qualify lead to opportunity
- `ConvertQuoteToSalesOrderRequest/Response` - Convert quote
- `CalculatePriceRequest/Response` - Calculate pricing

**Customer Service Module:**

- `CloseIncidentRequest/Response` - Close case
- `ExecuteWorkflowRequest/Response` - Run workflow
- `ApplyRoutingRuleRequest/Response` - Apply routing rules

**Solution Management:**

- `ExportSolutionRequest/Response` - Export solution
- `ImportSolutionRequest/Response` - Import solution
- `PublishXmlRequest/Response` - Publish metadata
- `PublishAllXmlRequest/Response` - Publish all changes

**Field Service (msdyn\_\*):**

- Work order management messages
- Resource scheduling messages
- Booking operation messages

**Marketing (msdynmkt\_\*):**

- Campaign operation messages
- Consent management messages

### Complete Message Reference

For a complete list of all 1,356+ messages with descriptions, see [docs/mapping/supported-messages.md](../../docs/mapping/supported-messages.md).

## Quick Start

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// Execute workflow message
const request = new ExecuteWorkflowRequest(
  workflowId, // Workflow GUID
  recordId, // Entity record GUID
  {} // Input arguments (optional)
);

const response = await service.execute(request);
console.log("Async Operation ID:", response.result.asyncoperationid);
```

## Common Messages

### Assign

Assigns a record to a user or team.

**Maps to:** Assign action (POST)

```typescript
import { AssignRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new AssignRequest(
  createEntityReference("account", accountId),
  createEntityReference("systemuser", userId)
);

await service.execute(request);
```

**Constructor:**

- `target: EntityReference` - The record to assign
- `assignee: EntityReference` - The user or team to assign the record to

---

### SetState

Sets the state and status of a record.

**Maps to:** PATCH with statecode/statuscode

```typescript
import { SetStateRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

// Deactivate an account
const request = new SetStateRequest(
  createEntityReference("account", accountId),
  1, // State: Inactive
  2 // Status: Inactive
);

await service.execute(request);
```

**Constructor:**

- `entityMoniker: EntityReference` - The record to update
- `state: number` - The state code value (e.g., 0 = Active, 1 = Inactive)
- `status: number` - The status code value

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
  3 // Status: Won
);

await service.execute(request);
```

**Constructor:**

- `opportunityClose: opportunityclose` - The opportunity close record
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
  subordinateAccountId, // Subordinate (merge & deactivate)
  {
    // Update content
    name: "Merged Company Name",
    revenue: 1000000,
  },
  false // PerformParentingChecks
);

await service.execute(request);
```

**Constructor:**

- `target: EntityReference` - The master record (will remain after merge)
- `subordinateId: string` - GUID of the subordinate record (will be deactivated/deleted)
- `updateContent: Record<string, unknown>` - Updates to apply to the master record
- `performParentingChecks: boolean` - Whether to perform parenting checks

---

### ExportSolution

Exports a solution from the environment.

**Maps to:** ExportSolution action (POST, unbound)

```typescript
import { ExportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExportSolutionRequest(
  "MySolution", // Solution name
  false, // Managed
  false, // ExportAutoNumberingSettings
  false, // ExportCalendarSettings
  false, // ExportCustomizationSettings
  false, // ExportEmailTrackingSettings
  false, // ExportGeneralSettings
  false, // ExportMarketingSettings
  false, // ExportOutlookSynchronizationSettings
  false, // ExportRelationshipRoles
  false, // ExportIsvConfig
  false, // ExportSales
  false // ExportExternalApplications
);

const response = await service.execute(request);

// Decode base64 to file
const solutionFile = Buffer.from(response.exportSolutionFile, "base64");
fs.writeFileSync("solution.zip", solutionFile);
```

**Response:**

- `exportSolutionFile: string` - Base64-encoded solution file (zip)

---

### ImportSolution

Imports a solution into the environment.

**Maps to:** ImportSolution action (POST, unbound)

```typescript
import { ImportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const solutionBytes = fs.readFileSync("solution.zip");

const request = new ImportSolutionRequest(
  solutionBytes.toString("base64"), // CustomizationFile
  true, // PublishWorkflows
  false, // OverwriteUnmanagedCustomizations
  false, // SkipProductUpdateDependencies
  false, // HoldingSolution
  false // ConvertToManaged
);

const response = await service.execute(request);
console.log("Import Job ID:", response.importJobId);
```

**Response:**

- `importJobId: string` - GUID of the import job

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
- `options?: { boundTo?: { entitySetName: string; id: string } }` - Bind the action to a record

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

```typescript
interface EntityReference {
  logicalName: string; // e.g., 'account', 'contact'
  id: string; // GUID
  name?: string; // Optional display name
}
```

---

## Utilities

### createEntityReference

Helper to create entity references.

```typescript
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const accountRef = createEntityReference("account", accountId);
// { logicalName: 'account', id: '...' }
```

---

## License

GNU AGPL v3.0
