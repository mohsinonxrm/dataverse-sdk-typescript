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

- Web API: **WhoAmI function** (GET `/WhoAmI`) returns `WhoAmIResponse`.
- Typed: `WhoAmIFunction` from `@mohsinonxrm/dataverse-sdk-functions`. Functions aren't messages,
  so the messages package has no WhoAmI request (the .NET `WhoAmIRequest` maps to the function).

### 2.2 ExecuteWorkflow

- Web API: **ExecuteWorkflow action** (bound to `workflow`) returns `asyncoperation`.
- Messages: `ExecuteWorkflowRequest` → `ExecuteWorkflowResponse.result?.asyncoperationid` (the record, or `null` for a 204).
- Actions: `ExecuteWorkflowAction`.

### 2.3 WinOpportunity (Sales)

- Web API: `POST /WinOpportunity`.
- Messages: `WinOpportunityRequest` → `WinOpportunityResponse`. Actions: `WinOpportunityAction`.

### 2.4 Assign and SetState (Platform)

- Web API: there is **no Assign or SetState action**. Both are updates of the record
  (`PATCH /{entitySet}({id})`): assign with `"ownerid@odata.bind": "/systemusers(<id>)"`, change
  state with `statecode` and `statuscode`. The .NET `AssignRequest` and `SetStateRequest` have no
  class here; use `client.api(...).patch(...)` or `OrganizationService.update`.

### 2.5 Merge (Business)

- Web API: **Merge action** (POST, unbound) with Target, Subordinate, UpdateContent and
  PerformParentingChecks. Tables: account, contact, lead and incident.
- Messages: `MergeRequest` → `MergeResponse`. Actions: `MergeAction`.

### 2.6 ExportSolution and ImportSolution (ALM)

- Messages: `ExportSolutionRequest` → `ExportSolutionResponse.result.ExportSolutionFile` (base64);
  `ImportSolutionRequest` → `ImportSolutionResponse`.

### 2.7 PublishXml and PublishAllXml (ALM)

- Messages: `PublishXmlRequest`, `PublishAllXmlRequest`.

---

## 3. Mapping table

| .NET message    | This SDK                         | Web API endpoint                                          | Method |
| --------------- | -------------------------------- | --------------------------------------------------------- | ------ |
| WhoAmI          | `WhoAmIFunction` (functions)     | `/WhoAmI`                                                 | GET    |
| Assign          | update `ownerid@odata.bind`      | `/{entitySet}({id})`                                      | PATCH  |
| SetState        | update `statecode`, `statuscode` | `/{entitySet}({id})`                                      | PATCH  |
| ExecuteWorkflow | `ExecuteWorkflowRequest`         | `/workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow` | POST   |
| WinOpportunity  | `WinOpportunityRequest`          | `/WinOpportunity`                                         | POST   |
| Merge           | `MergeRequest`                   | `/Merge`                                                  | POST   |
| ExportSolution  | `ExportSolutionRequest`          | `/ExportSolution`                                         | POST   |
| ImportSolution  | `ImportSolutionRequest`          | `/ImportSolution`                                         | POST   |
| PublishXml      | `PublishXmlRequest`              | `/PublishXml`                                             | POST   |
| PublishAllXml   | `PublishAllXmlRequest`           | `/PublishAllXml`                                          | POST   |

---

## 4. Fallback for operations without a typed class

- Use `client.api()` to call the endpoint directly.
- Or use `new OrganizationRequest("OperationName", parameters)` from the messages package (POST
  actions only).

---

## 5. Usage Examples

### 5.1 WhoAmI

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const { UserId, BusinessUnitId } = await client.execute(new WhoAmIFunction());
```

### 5.2 Assign (an update)

```typescript
await client.api(`accounts(${accountId})`).patch({
  "ownerid@odata.bind": `/systemusers(${newOwnerId})`,
});
```

### 5.3 ExecuteWorkflow (bound)

```typescript
import {
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";

const response = await service.execute<ExecuteWorkflowResponse>(
  new ExecuteWorkflowRequest(workflowId, { EntityId: recordId }) // InputArguments is optional
);
console.log("Async Operation ID:", response.result?.asyncoperationid);
```

### 5.4 Generic OrganizationRequest

```typescript
import { OrganizationRequest, OrganizationResponse } from "@mohsinonxrm/dataverse-sdk-messages";

// POST /new_CustomAction with the parameters as the JSON body
const response = await service.execute<OrganizationResponse>(
  new OrganizationRequest("new_CustomAction", { InputParameter: "value" })
);
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
