# Message ↔ Web API Mapping Guide (v1)

This document explains how **Organization Service messages** (SDK.Messages) map to **Dataverse Web API** operations:

- **CRUD** via HTTP verbs (GET/POST/PATCH/DELETE)
- **Actions** via HTTP POST (side effects)
- **Functions** via HTTP GET (no side effects)
- Some platform operations exist only in one surface area (message-only or Web API-only), but Dataverse generally exposes most named messages as actions/functions in `$metadata`.

> **SDK principle**
>
> - If you use **OrgService + Messages**, responses match the documented Message Response contracts.
> - If you use **client.execute(Action/Function request)**, responses match the Web API action/function return types.
> - If you use **client.api(...)**, you are calling raw HTTP endpoints (escape hatch).

---

## 1. Mapping rules

### 1.1 CRUD messages

These map to RESTful HTTP operations (Dataverse implements CRUD with HTTP verbs; internally these correspond to platform messages).

- Create → `POST /{entitySetName}`
- Retrieve → `GET /{entitySetName}({id})`
- Update → `PATCH /{entitySetName}({id})`
- Delete → `DELETE /{entitySetName}({id})`

### 1.2 Actions

Actions are operations with side effects and are invoked with `POST`.
They can be **unbound** (`POST /ActionName`) or **bound** (`POST /entitySet(id)/Microsoft.Dynamics.CRM.ActionName`).

### 1.3 Functions

Functions have no side effects and are invoked with `GET`.  
Microsoft recommends using **parameter aliases** for function parameters to avoid URL constraints and encoding issues.

### 1.4 Batch messages

- ExecuteMultipleRequest ↔ `$batch` (up to 1000 requests)
- ExecuteTransactionRequest ↔ `$batch` change sets (transactional group)

---

## 2. Minimal v1 mapping table (initial set)

### 2.1 WhoAmI

- Web API: **WhoAmI function** (GET) returns `WhoAmIResponse`
- Messages: `WhoAmIRequest` → `WhoAmIResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)
- Typed function wrapper: `dataverse-sdk-functions` provides `WhoAmIFunction` (client-side executable)

### 2.2 ExecuteWorkflow

- Web API: **ExecuteWorkflow action** (bound to `workflow`) returns `asyncoperation`
- Messages: `ExecuteWorkflowRequest` → `ExecuteWorkflowResponse.result.asyncoperationid` (import from `@mohsinonxrm/dataverse-sdk-messages`)
- Typed action wrapper: `dataverse-sdk-actions` provides `ExecuteWorkflowAction` (client-side executable)

### 2.3 WinOpportunity (Sales)

Opportunity supports **WinOpportunity action** and maps to `WinOpportunityRequest`.

- Web API: `POST /WinOpportunity` with parameters
- Messages: `WinOpportunityRequest` → `WinOpportunityResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)
- Typed action wrapper: `dataverse-sdk-actions` provides `WinOpportunityAction` (v1 minimal)

### 2.4 Assign (Platform)

- Web API: **Assign action** (POST) with Target and Assignee
- Messages: `AssignRequest` → `AssignResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)

### 2.5 SetState (Platform)

- Web API: PATCH on entity with `statecode` and `statuscode`
- Messages: `SetStateRequest` → `SetStateResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)

### 2.6 Merge (Business)

- Web API: **Merge action** (POST, unbound) with Target, Subordinate, UpdateContent, PerformParentingChecks
- Messages: `MergeRequest` → `MergeResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)
- Supported entities: account, contact, lead, incident

### 2.7 ExportSolution (ALM)

- Web API: **ExportSolution action** (POST, unbound)
- Messages: `ExportSolutionRequest` → `ExportSolutionResponse.ExportSolutionFile` (base64) (import from `@mohsinonxrm/dataverse-sdk-messages`)

### 2.8 ImportSolution (ALM)

- Web API: **ImportSolution action** (POST, unbound)
- Messages: `ImportSolutionRequest` → `ImportSolutionResponse.ImportJobId` (import from `@mohsinonxrm/dataverse-sdk-messages`)

### 2.9 PublishXml (ALM)

- Web API: **PublishXml action** (POST, unbound) with ParameterXml
- Messages: `PublishXmlRequest` → `PublishXmlResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)

### 2.10 PublishAllXml (ALM)

- Web API: **PublishAllXml action** (POST, unbound)
- Messages: `PublishAllXmlRequest` → `PublishAllXmlResponse` (import from `@mohsinonxrm/dataverse-sdk-messages`)

---

## 3. Complete v1 Message Mapping Table

| Message Request Class  | Web API Endpoint                                        | HTTP Method | Binding           | Type     |
| ---------------------- | ------------------------------------------------------- | ----------- | ----------------- | -------- |
| WhoAmIRequest          | /WhoAmI                                                 | GET         | Unbound           | Platform |
| AssignRequest          | /Assign                                                 | POST        | Unbound           | Platform |
| SetStateRequest        | /{entitySet}({id})                                      | PATCH       | N/A               | Platform |
| ExecuteWorkflowRequest | /workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow | POST        | Bound to workflow | Business |
| WinOpportunityRequest  | /WinOpportunity                                         | POST        | Unbound           | Business |
| MergeRequest           | /Merge                                                  | POST        | Unbound           | Business |
| ExportSolutionRequest  | /ExportSolution                                         | POST        | Unbound           | ALM      |
| ImportSolutionRequest  | /ImportSolution                                         | POST        | Unbound           | ALM      |
| PublishXmlRequest      | /PublishXml                                             | POST        | Unbound           | ALM      |
| PublishAllXmlRequest   | /PublishAllXml                                          | POST        | Unbound           | ALM      |

**Note:** All messages are imported directly: `import { WhoAmIRequest } from '@mohsinonxrm/dataverse-sdk-messages'`

---

## 4. Fallback rule for unsupported typed operations

If an action/function is not typed in v1:

- Use raw `client.api()` to call the endpoint directly (escape hatch).
- Or use `OrganizationRequest("OperationName")` with parameters from the messages package.

---

## 5. Usage Examples

### 5.1 WhoAmI Function

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WhoAmIRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new WhoAmIRequest();
const response = await service.execute(request);

console.log("User ID:", response.UserId);
console.log("Business Unit ID:", response.BusinessUnitId);
```

### 5.2 Assign Action

```typescript
import { AssignRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new AssignRequest(
  createEntityReference("account", accountId),
  createEntityReference("systemuser", newOwnerId)
);
await service.execute(request);
```

### 5.3 ExecuteWorkflow Action (bound)

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new ExecuteWorkflowRequest(workflowId, recordId, {});
const response = await service.execute(request);

console.log("Async Operation ID:", response.Id);
```

### 5.4 Generic OrganizationRequest

```typescript
import { OrganizationRequest, OrganizationResponse } from "@mohsinonxrm/dataverse-sdk-messages";

// POST /CustomAction with the parameters as the JSON body
const request = new OrganizationRequest("CustomAction", {
  InputParameter: "value",
});
const response = await service.execute<OrganizationResponse>(request);
console.log("Results:", response.Results); // response properties, without @odata.* annotations

// Bound: POST /accounts({id})/Microsoft.Dynamics.CRM.new_BoundAction
await service.execute(
  new OrganizationRequest("new_BoundAction", {}, { boundTo: { entitySetName: "accounts", id } })
);
```

---

## 6. Docs expectations (what we publish)

For each operation we document:

- .NET message name (if applicable)
- Web API action/function name and binding (bound/unbound)
- Request/response shape
- Examples using:
  - `service.execute(message)`
  - `client.execute(action|function request)` (Phase 7)
  - raw `client.api(...)` (escape hatch)
