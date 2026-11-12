# .NET SDK and Message ↔ Web API Mapping Guide

This document maps code written for the .NET SDK (`IOrganizationService` and the
`Microsoft.Xrm.Sdk.Messages` / `Microsoft.Crm.Sdk.Messages` requests) to this SDK, and explains
how **Organization Service messages** map to **Dataverse Web API** operations:

- **CRUD** via HTTP verbs (GET/POST/PATCH/DELETE)
- **Actions** via HTTP POST (side effects)
- **Functions** via HTTP GET (no side effects)
- Some platform operations exist only in one surface area (message-only or Web API-only), but Dataverse generally exposes most named messages as actions/functions in `$metadata`.

> **SDK principle**
>
> - The **main path** is `client.api(...)` for queries and CRUD, and
>   `client.execute(new <Name>Action(…) | new <Name>Function(…))` for operations; their results are
>   the Web API's own shapes.
> - **`OrganizationService` + messages** (`@mohsinonxrm/dataverse-sdk-xrm`,
>   `@mohsinonxrm/dataverse-sdk-messages`) are a compatibility layer with the .NET names: responses
>   follow the documented message response contracts (`<Name>Response.result`). They send the same
>   requests as the main path, through the same client.

---

## 0. From the .NET SDK to the main path

Each row is the same request three ways: the .NET SDK call, its compatibility-layer twin (`org` is
an `OrganizationService`), and the main-path call this SDK documents (`client` is the
`DataverseClient`). Port with the middle column if you want the .NET shapes, then move to the right
column call by call; both can be used side by side.

| .NET SDK                                                    | Compatibility layer (xrm, messages)                         | Main path (core, actions, functions)                                                   |
| ----------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `service.Create(entity)`                                    | `org.create("accounts", record)`, `new CreateRequest(…)`    | `client.api("accounts").createAndGetId(record)`                                        |
| `service.Retrieve(name, id, new ColumnSet(…))`              | `org.retrieve("accounts", id, { select })`                  | ``client.api(`accounts(${id})`).select(…).get()``                                      |
| `RetrieveRequest` with `RelatedEntitiesQuery`               | `org.retrieve(…, { expand })`                               | `.expand("primarycontactid", { select: […] })`                                         |
| `service.RetrieveMultiple(QueryExpression)`                 | `org.retrieveMultiple("accounts", { filter, top })`         | `client.api("accounts").filter(…).getAll()` or `.iterate()`                            |
| `service.RetrieveMultiple(FetchExpression)`                 | `new RetrieveMultipleRequest({ Query })`                    | `client.fetchXml("accounts", xml)`                                                     |
| `service.Update(entity)`                                    | `org.update("accounts", id, changes)`                       | ``client.api(`accounts(${id})`).ifMatch("*").patch(changes)``                          |
| `UpsertRequest`                                             | `new UpsertRequest({ Target, Key })`                        | ``client.api(`accounts(${odataKey({ accountnumber: "A-1" })})`).patch(record)``        |
| `service.Delete(name, id)`                                  | `org.delete("accounts", id)`                                | ``client.api(`accounts(${id})`).delete()``                                             |
| `service.Associate(…)` / `Disassociate(…)`                  | `org.associate(…)` / `org.disassociate(…)`                  | ``client.api(`accounts(${id})/contact_customer_accounts/$ref`).post(…)`` / `.delete()` |
| `AssignRequest` (.NET only)                                 | `org.assign("account", id, userId)`                         | ``.patch({ "ownerid@odata.bind": `/systemusers(${userId})` })``                        |
| `SetStateRequest` (.NET only)                               | `org.setState("account", id, 1, 2)`                         | `.patch({ statecode: 1, statuscode: 2 })`                                              |
| `service.Execute(new WinOpportunityRequest { … })`          | `org.execute(new WinOpportunityRequest({ … }))`             | `client.execute(new WinOpportunityAction({ … }))`                                      |
| `service.Execute(new WhoAmIRequest())`                      | `org.execute(new WhoAmIRequest())`, `org.whoAmI()`          | `client.execute(new WhoAmIFunction())`                                                 |
| `service.Execute(new OrganizationRequest("new_MyApi"))`     | `org.execute(new OrganizationRequest("new_MyApi", { … }))`  | a class from `dataverse-gen`, or `client.api("new_MyApi").post({ … })`                 |
| `ExecuteMultipleRequest`                                    | `new ExecuteMultipleRequest({ Requests, Settings })`        | `BatchRequestBuilder` with `execute({ continueOnError: true })`                        |
| `ExecuteTransactionRequest`                                 | `new ExecuteTransactionRequest({ Requests })`               | `BatchRequestBuilder` with `beginChangeset()` / `endChangeset()`                       |
| `CreateMultipleRequest`, `UpdateMultipleRequest`            | `new CreateMultipleRequest("accounts", { Targets })`        | `createMultiple()` / `updateMultiple()`, or `CreateMultipleAction`                     |
| `CreateEntityRequest`, `CreateAttributeRequest` (.NET only) | (none)                                                      | `MetadataClient` with the `Metadata` builders                                          |
| `RetrieveEntityRequest`, `RetrieveMetadataChangesRequest`   | `new RetrieveEntityRequest({ … })`                          | `MetadataClient`, or `RetrieveMetadataChangesFunction`                                 |
| `RetrieveEntityChangesRequest` (.NET only)                  | (none)                                                      | `client.api("accounts").trackChanges()`, `client.changesSince(deltaLink)`              |
| `RetrievePrincipalAccessRequest`                            | `new RetrievePrincipalAccessRequest({ Principal, Target })` | `RetrievePrincipalAccess_systemuserFunction` (one per binding)                         |
| `RetrieveUserPrivilegeByPrivilegeNameRequest`               | `new CheckPrivilegeRequest({ UserId, PrivilegeName })`      | `RetrieveUserPrivilegeByPrivilegeNameFunction`                                         |
| Early-bound classes (`CrmSvcUtil`, `pac modelbuilder`)      | `org.retrieve<Account>(…)` with generated interfaces        | `dataverse-gen` types and `createTypedClient(client)`                                  |
| `CallerId` / `CallerAADObjectId`                            | `{ impersonateUserId }` option (by `systemuserid`)          | `.impersonate(systemUserId)` / `.impersonateByObjectId(objectId)`                      |
| `OrganizationServiceFault` (`FaultException`)               | `DataverseODataError` (and its subclasses)                  | the same: every call rejects with the core error types                                 |

Things that differ from .NET on every path:

- **Entity set names, not logical names**, in URLs and CRUD methods (`"accounts"`, not
  `"account"`); `org.getEntitySetName("account")` looks one up.
- **Records are JSON**, not `Entity` objects: columns by logical name, lookups written as
  `"<navigation property>@odata.bind": "/<entity set>(<id>)"` (or an `EntityReference` from
  `createEntityReference()` in typed payloads), choices as numbers, money as numbers.
- **No `$skip`**: page with `@odata.nextLink` (`iterate()`, `getAll()`), or FetchXML paging cookies.

The same call on each path, for comparison:

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const opportunityClose = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  subject: "Won",
};

// Main path: the typed action; it resolves the action's result (none for WinOpportunity)
await client.execute(new WinOpportunityAction({ OpportunityClose: opportunityClose, Status: 3 }));

// Compatibility layer: the message, through OrganizationService; it resolves WinOpportunityResponse
const org = new OrganizationService(client);
await org.execute(new WinOpportunityRequest({ OpportunityClose: opportunityClose, Status: 3 }));

// Escape hatch: the raw request
await client.api("WinOpportunity").post({ OpportunityClose: opportunityClose, Status: 3 });
```

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

The messages package has both
([#344](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/344)):
`ExecuteMultipleRequest` sends its requests as the parts of one `$batch` (with
`Prefer: odata.continue-on-error` for `Settings.ContinueOnError`), and `ExecuteTransactionRequest`
as one change set. For anything else (mixing change sets and single requests, more than 1000
requests split into several `$batch` calls) use `BatchRequestBuilder` from
`@mohsinonxrm/dataverse-sdk-batch`.

### 1.5 CRUD messages

Create, Retrieve, Update, Delete, Associate, Disassociate and RetrieveMultiple are HTTP requests on
entity sets rather than actions or functions. The messages package has them as `CreateRequest`,
`RetrieveRequest`, `UpdateRequest`, `DeleteRequest`, `AssociateRequest`, `DisassociateRequest` and
`RetrieveMultipleRequest` (a FetchXML query): see
[supported-messages.md](./supported-messages.md#crud-and-batch-messages).

Upsert is `PATCH /{entitySetName}({key})` without `If-Match` (with it, the PATCH is an Update that
never creates). The key is the id or an alternate key (`accounts(accountnumber='A-1')`). The Web
API answers `204` for both outcomes, so `UpsertRequest` sends `Prefer: return=representation` with
`$select` of the primary key and reads `201 Created` / `200 OK` as the .NET
`UpsertResponse.RecordCreated`.

---

## 2. Common messages

### 2.1 WhoAmI

- Web API: **WhoAmI function** (GET `/WhoAmI`) returns `WhoAmIResponse`.
- Messages: `WhoAmIRequest` → `WhoAmIResponse.result.UserId` (#344: functions have messages too).
  Functions: `WhoAmIFunction` from `@mohsinonxrm/dataverse-sdk-functions`.

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

| .NET message              | Compatibility layer              | Main path                                       | Web API endpoint                                                                                    | Method |
| ------------------------- | -------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| WhoAmI                    | `WhoAmIRequest`                  | `WhoAmIFunction`                                | `/WhoAmI`                                                                                           | GET    |
| Create                    | `CreateRequest`                  | `client.api(entitySet).createAndGetId(…)`       | `/{entitySet}`                                                                                      | POST   |
| Retrieve                  | `RetrieveRequest`                | ``client.api(`{entitySet}({id})`).get()``       | `/{entitySet}({id})`                                                                                | GET    |
| Update                    | `UpdateRequest`                  | `.ifMatch("*").patch(…)`                        | `/{entitySet}({id})`                                                                                | PATCH  |
| Delete                    | `DeleteRequest`                  | `.delete()`                                     | `/{entitySet}({id})`                                                                                | DELETE |
| Upsert                    | `UpsertRequest`                  | `.patch(…)` without `If-Match`                  | `/{entitySet}({id or alternate key})`                                                               | PATCH  |
| Associate                 | `AssociateRequest`               | ``client.api(`…/{relationship}/$ref`).post(…)`` | `/{entitySet}({id})/{relationship}/$ref`                                                            | POST   |
| ExecuteMultiple           | `ExecuteMultipleRequest`         | `BatchRequestBuilder`                           | `/$batch`                                                                                           | POST   |
| Assign                    | `org.assign(…)`                  | update `ownerid@odata.bind`                     | `/{entitySet}({id})`                                                                                | PATCH  |
| SetState                  | `org.setState(…)`                | update `statecode`, `statuscode`                | `/{entitySet}({id})`                                                                                | PATCH  |
| RetrievePrincipalAccess   | `RetrievePrincipalAccessRequest` | `RetrievePrincipalAccess_systemuserFunction`    | `/systemusers({id})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)`                     | GET    |
| CheckPrivilege (SDK only) | `CheckPrivilegeRequest`          | `RetrieveUserPrivilegeByPrivilegeNameFunction`  | `/systemusers({id})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1)` | GET    |
| ExecuteWorkflow           | `ExecuteWorkflowRequest`         | `ExecuteWorkflowAction`                         | `/workflows({id})/Microsoft.Dynamics.CRM.ExecuteWorkflow`                                           | POST   |
| WinOpportunity            | `WinOpportunityRequest`          | `WinOpportunityAction`                          | `/WinOpportunity`                                                                                   | POST   |
| Merge                     | `MergeRequest`                   | `MergeAction`                                   | `/Merge`                                                                                            | POST   |
| ExportSolution            | `ExportSolutionRequest`          | `ExportSolutionAction`                          | `/ExportSolution`                                                                                   | POST   |
| ImportSolution            | `ImportSolutionRequest`          | `ImportSolutionAction`                          | `/ImportSolution`                                                                                   | POST   |
| PublishXml                | `PublishXmlRequest`              | `PublishXmlAction`                              | `/PublishXml`                                                                                       | POST   |
| PublishAllXml             | `PublishAllXmlRequest`           | `PublishAllXmlAction`                           | `/PublishAllXml`                                                                                    | POST   |

---

## 4. Fallback for operations without a typed class

- Generate a typed class with `dataverse-gen` (custom APIs and other apps' operations): see
  [Generate the rest with dataverse-gen](../getting-started.md#generate-the-rest-with-dataverse-gen).
- Use `client.api()` to call the endpoint directly.
- In the compatibility layer, `new OrganizationRequest("OperationName", parameters)` from the
  messages package (POST actions only; the functions of the platform, Sales and Customer Service
  have typed messages).

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

Main path: the action resolves the `asyncoperation` it started, which `waitForAsyncOperation()`
polls until the job ends.

```typescript
import { waitForAsyncOperation } from "@mohsinonxrm/dataverse-sdk-core";
import { ExecuteWorkflowAction } from "@mohsinonxrm/dataverse-sdk-actions";

const job = await client.execute(new ExecuteWorkflowAction(workflowId, { EntityId: recordId }));
const done = await waitForAsyncOperation(client, job);
console.log("Job finished:", done.statuscode);
```

Compatibility layer:

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// execute() infers the response type (ExecuteWorkflowResponse) from the request
const response = await service.execute(
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
  - `client.execute(action|function request)` (the main path)
  - `service.execute(message)` (the .NET compatibility layer)
  - raw `client.api(...)` (escape hatch)
