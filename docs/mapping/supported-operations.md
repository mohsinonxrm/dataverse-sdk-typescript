# Supported Operations - Complete Reference

This document provides a complete reference of all **<!-- count:operations -->2,353<!-- /count --> typed operations** available in the Dataverse TypeScript SDK.

## Overview

The SDK provides comprehensive coverage of Dataverse Web API operations through three complementary packages:

| Package                                  | Count                                       | Description                            | HTTP Method |
| ---------------------------------------- | ------------------------------------------- | -------------------------------------- | ----------- |
| **@mohsinonxrm/dataverse-sdk-functions** | <!-- count:functions -->209<!-- /count -->  | Read-only operations (query, retrieve) | GET         |
| **@mohsinonxrm/dataverse-sdk-actions**   | <!-- count:actions -->1,072<!-- /count -->  | Operations with side effects           | POST        |
| **@mohsinonxrm/dataverse-sdk-messages**  | <!-- count:messages -->1,072<!-- /count --> | Organization Service message pattern   | POST        |

**Total Coverage:** <!-- count:operations -->2,353<!-- /count --> typed operations

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
import { PublishAllXmlRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// CRUD operations
const accountId = await service.create("accounts", { name: "Contoso" });
const account = await service.retrieve("accounts", accountId, { select: ["name"] });

// Message execution (messages are Web API actions; WhoAmI is a function, WhoAmIFunction)
await service.execute(new PublishAllXmlRequest());
```

## Operation Categories

### Platform Operations (All Solutions)

**Functions (Read-Only):**

- Identity & context (WhoAmI, RetrieveCurrentOrganization)
- Security & access (RetrievePrincipalAccess\_<table>, RetrieveUserPrivileges)
- Metadata operations (RetrieveMetadataChanges, RetrieveEntity)
- Query helpers (fiscal periods, date ranges, conditional operators)

**Actions (Modify Data):**

- Bulk operations (CreateMultiple, UpdateMultiple, UpsertMultiple)
- Merge (assign and change state are record updates, not actions)
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

**Marketing lists and campaigns** (part of Sales, not Customer Insights - Journeys):

- AddMemberList, AddListMembersList, CopyMembersList, QualifyMemberList
- CopyCampaign, DistributeCampaignActivity

## What the Packages Cover

The three packages hold the operations of the **platform** (Dataverse and the Power Platform
solutions every environment has) and of **Sales** and **Customer Service**, the two core
Dynamics 365 apps of a plain trial. They are chosen by the solution each operation comes from, not
by what the org the SDK is generated from has installed; the [solution table](../../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt) lists every solution
and whether its operations are in.

| Operations                                                                      | In the packages | Works in                              |
| ------------------------------------------------------------------------------- | --------------- | ------------------------------------- |
| Platform (no prefix, and `msdyn_*` / `msft_*` platform solutions)               | yes             | every Dataverse environment           |
| Sales and Customer Service (`WinOpportunity`, `CloseIncident`, their `msdyn_*`) | yes             | an org with Sales or Customer Service |
| Contact Center: Omnichannel, unified routing, voice (`CCaaS_*`, `msdyn_*`)      | no              | generate with dataverse-gen           |
| Field Service, Project Operations, Universal Resource Scheduling (`msdyn_*`)    | no              | generate with dataverse-gen           |
| Customer Insights - Journeys (`msdynmkt_*`), Customer Voice                     | no              | generate with dataverse-gen           |
| Connected Customer Service (IoT), Power Pages (`adx_*`), Process Mining         | no              | generate with dataverse-gen           |
| Your custom APIs and custom process actions                                     | no              | generate with dataverse-gen           |

To call one of the others, generate typed classes for it from your org with [dataverse-gen](../getting-started.md#generate-the-rest-with-dataverse-gen).

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
const action = new CreateMultipleAction("accounts", { Targets: accounts });
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
const action = new WinOpportunityAction({ OpportunityClose: opportunityClose, Status: 3 });
await client.execute(action);
```

**Using Typed Message:**

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new WinOpportunityRequest({ OpportunityClose: opportunityClose, Status: 3 });
await service.execute(request);
```

### Querying Data

**Using Raw API:**

```typescript
const accounts = await client
  .api("accounts")
  .select("name", "revenue")
  .filter("revenue gt 1000000")
  .orderBy("revenue desc")
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

- [Supported Functions (<!-- count:functions -->209<!-- /count -->)](./supported-functions.md) - Complete list of all GET operations
- [Supported Actions (<!-- count:actions -->1,072<!-- /count -->)](./supported-actions.md) - Complete list of all POST operations
- [Supported Messages (<!-- count:messages -->1,072<!-- /count -->)](./supported-messages.md) - Complete list of all Organization Service messages

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
- Prefer message-based architecture (`<Name>Request` / `<Name>Response`, parameters in
  `request.Parameters`)

### Use Raw API When:

- Maximum flexibility needed
- Custom or unsupported operations
- Prefer direct HTTP control
- Building custom abstractions

## Performance Considerations

- **Bulk operations** are faster than individual creates/updates for 100+ records
- **$batch** is better for mixed operations (creates + updates + deletes)
- **Functions** are cacheable (GET) while actions are not (POST)
- **Messages** send the same request as the matching action

## Related Documentation

- [ADR 0001: Architecture](../adr/0001-architecture.md)
- [ADR 0003: Actions & Functions](../adr/0003-actions-functions.md)
- [ADR 0004: Messages](../adr/0004-messages.md)
- [ADR 0006: Bulk Operations](../adr/0006-bulk-operations.md)
