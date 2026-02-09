# Supported Operations - Complete Reference

This document provides a complete reference of all **2,941 typed operations** available in the Dataverse TypeScript SDK.

## Overview

The SDK provides comprehensive coverage of Dataverse Web API operations through three complementary packages:

| Package                                  | Count | Description                            | HTTP Method |
| ---------------------------------------- | ----- | -------------------------------------- | ----------- |
| **@mohsinonxrm/dataverse-sdk-functions** | 229   | Read-only operations (query, retrieve) | GET         |
| **@mohsinonxrm/dataverse-sdk-actions**   | 1,356 | Operations with side effects           | POST        |
| **@mohsinonxrm/dataverse-sdk-messages**  | 1,356 | Organization Service message pattern   | Varies      |

**Total Coverage:** 2,941 typed operations

## Two Front Doors

The SDK offers **two ways** to interact with Dataverse, providing flexibility for different developer backgrounds:

### 1. HTTP/OData Fluent API (Modern JavaScript/TypeScript)

Direct Web API operations using a chainable request builder:

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const client = new DataverseClient({ baseUrl, tokenProvider });

// Raw API call
const accounts = await client
  .api("accounts")
  .select("name", "revenue")
  .filter("revenue gt 1000000")
  .top(10)
  .get();

// Typed function execution
const whoAmI = new WhoAmIFunction();
const userInfo = await client.execute(whoAmI);
```

### 2. OrganizationService Facade (C#-Familiar)

Familiar patterns for developers coming from .NET SDK:

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WhoAmIRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// CRUD operations
const accountId = await service.create("accounts", { name: "Contoso" });
const account = await service.retrieve("accounts", accountId, { select: ["name"] });

// Message execution
const whoAmIRequest = new WhoAmIRequest();
const response = await service.execute(whoAmIRequest);
```

## Operation Categories

### Platform Operations (All Solutions)

**Functions (Read-Only):**

- Identity & context (WhoAmI, RetrieveCurrentOrganization)
- Security & access (RetrievePrincipalAccess, RetrieveUserPrivileges)
- Metadata operations (RetrieveMetadataChanges, RetrieveEntity)
- Query helpers (fiscal periods, date ranges, conditional operators)

**Actions (Modify Data):**

- Bulk operations (CreateMultiple, UpdateMultiple, UpsertMultiple)
- Entity operations (Assign, SetState, Merge)
- Solution management (ExportSolution, ImportSolution, PublishXml)
- File operations (InitializeFileBlocksUpload, UploadBlock, CommitFileBlocksUpload)

### Sales Module

**Opportunity Management:**

- WinOpportunity, LoseOpportunity
- QualifyLead
- GenerateQuoteFromOpportunity
- GenerateSalesOrderFromOpportunity

**Quote & Order Processing:**

- ConvertQuoteToSalesOrder
- ConvertSalesOrderToInvoice
- CalculatePrice

### Customer Service Module

**Case Management:**

- CloseIncident
- ApplyRoutingRule

**Knowledge Base:**

- FullTextSearchKnowledgeArticle
- CreateKnowledgeArticleVersion

### Field Service Module (msdyn\_\*)

**Resource Scheduling:**

- msdyn_BookRequirementGroup
- msdyn_SearchResourceAvailability
- msdyn_CancelBookings

**Work Orders:**

- msdyn_CreateWorkOrder
- msdyn_CascadeCrewBookings

### Marketing Module (msdynmkt\_\*)

**Campaign & Consent:**

- msdynmkt_checkconsentbatch
- msdynmkt_consentsubmission

## Solution Dependencies

Many operations require specific Dynamics 365 applications to be installed:

| Prefix       | Solution Required      | Description                                      |
| ------------ | ---------------------- | ------------------------------------------------ |
| `msdyn_*`    | Dynamics 365 (varies)  | Field Service, Project Service Automation, Sales |
| `msdynmkt_*` | Dynamics 365 Marketing | Marketing automation                             |
| `CCaaS_*`    | Customer Service       | Omnichannel for Customer Service                 |
| `adx_*`      | Power Pages            | Portal operations                                |

**Note:** Platform operations (no prefix) are available in all Dataverse environments.

## Usage Examples by Scenario

### Creating Records

**Using Raw API:**

```typescript
const result = await client.api("accounts").post({ name: "Contoso", revenue: 5000000 });
```

**Using OrganizationService:**

```typescript
const accountId = await service.create("accounts", {
  name: "Contoso",
  revenue: 5000000,
});
```

**Using Bulk Action:**

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Fabrikam" },
];
const action = new CreateMultipleAction("accounts", accounts);
const response = await client.execute(action);
// response.Ids: ['id1', 'id2']
```

### Executing Business Logic

**Using Typed Function:**

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = new WhoAmIFunction();
const userInfo = await client.execute(whoAmI);
console.log("User ID:", userInfo.UserId);
```

**Using Typed Action:**

```typescript
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";

const opportunityClose = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won!",
  "opportunityid@odata.bind": `/opportunities(${oppId})`,
  actualrevenue: 100000,
};
const action = new WinOpportunityAction(opportunityClose, 3);
await client.execute(action);
```

**Using Typed Message:**

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new WinOpportunityRequest({
  OpportunityClose: opportunityClose,
  Status: 3,
});
await service.execute(request);
```

### Querying Data

**Using Raw API:**

```typescript
const accounts = await client
  .api("accounts")
  .select("name", "revenue")
  .filter("revenue gt 1000000")
  .orderby("revenue desc")
  .top(10)
  .get();
```

**Using OrganizationService:**

```typescript
const accounts = await service.retrieveMultiple("accounts", {
  select: ["name", "revenue"],
  filter: "revenue gt 1000000",
  orderBy: ["revenue desc"],
  top: 10,
});
```

## Detailed References

- [Supported Functions (229)](./supported-functions.md) - Complete list of all GET operations
- [Supported Actions (1,356)](./supported-actions.md) - Complete list of all POST operations
- [Supported Messages (1,356)](./supported-messages.md) - Complete list of all Organization Service messages

## When to Use Each Approach

### Use Functions When:

- Reading data (no modifications)
- Calling platform utilities (WhoAmI, metadata queries)
- Need parameter aliases for complex queries
- Prefer GET semantics

### Use Actions When:

- Creating, updating, or deleting data
- Executing business logic with side effects
- Need bulk operations
- Working with files/images

### Use Messages When:

- Migrating from .NET SDK
- Team familiar with Organization Service patterns
- Need namespace organization (CrmSdk vs XrmSdk)
- Prefer message-based architecture

### Use Raw API When:

- Maximum flexibility needed
- Custom or unsupported operations
- Prefer direct HTTP control
- Building custom abstractions

## Performance Considerations

- **Bulk operations** are faster than individual creates/updates for 100+ records
- **$batch** is better for mixed operations (creates + updates + deletes)
- **Functions** are cacheable (GET) while actions are not (POST)
- **Messages** have slight overhead due to abstraction layer

## Related Documentation

- [ADR 0001: Architecture](../adr/0001-architecture.md)
- [ADR 0003: Actions & Functions](../adr/0003-actions-functions.md)
- [ADR 0004: Messages](../adr/0004-messages.md)
- [ADR 0006: Bulk Operations](../adr/0006-bulk-operations.md)
