# Dataverse SDK TypeScript - Complete Usage Patterns

> **Purpose**: Comprehensive guide showing ALL ways to interact with Dataverse using this SDK:
> the main path first, then the .NET compatibility layer

## Table of Contents

1. [One Main Path, Plus a .NET Compatibility Layer](#one-main-path-plus-a-net-compatibility-layer)
2. [CRUD Operations](#crud-operations)
3. [Actions](#actions)
4. [Functions](#functions)
5. [Messages](#messages)
6. [Metadata Operations](#metadata-operations)
7. [Architecture Decision Summary](#architecture-decision-summary)

---

## One Main Path, Plus a .NET Compatibility Layer

Every call goes through one `DataverseClient` and its middleware pipeline. The documented way to
use it, the **main path**, is:

### 1. `client.api()`: queries and CRUD

- **Direct** OData/Web API access, with **fluent** query building
- Paging (`iterate()`, `getAll()`), ETags, change tracking (`trackChanges()`), FetchXML
- With `dataverse-gen`, the **typed client** (`createTypedClient(client)`) wraps it per table, with
  your columns and payload types checked at compile time

### 2. Typed operations: `client.execute(new <Name>Action(…))`

- A class for each Web API action and function of the platform, Sales and Customer Service, in
  `@mohsinonxrm/dataverse-sdk-actions` and `@mohsinonxrm/dataverse-sdk-functions`; `dataverse-gen`
  writes the same classes for custom APIs and other apps' operations
- Each implements `Executable<T>`: `client.execute()` resolves its typed result
- `queryFunctions` writes the `$filter` query functions (`LastXDays`, `Under`, …)

### The .NET compatibility layer: `OrganizationService` and messages

- **C#-familiar** API surface: `service.create/retrieve/update/delete/execute`, and the
  `<Name>Request` / `<Name>Response` messages of `@mohsinonxrm/dataverse-sdk-messages`
- For developers porting code from the **Dataverse .NET SDK**: the same names, so
  `IOrganizationService` code ports line by line
- Built on the main path: each method is a `client.api()` call, and each message sends the same
  request as the action or function of the same name, through the same client
- New code should use the main path; the
  [.NET mapping](./mapping/message-to-webapi.md#0-from-the-net-sdk-to-the-main-path) gives the
  main-path equivalent of each .NET call

---

## CRUD Operations

### 1. Late-Bound with `client.api()` (HTTP-First)

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, Prefer } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

interface Account {
  accountid: string;
  name: string;
  telephone1?: string;
  revenue?: number;
}

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientSecret: process.env.CLIENT_SECRET!,
  },
});

const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider: new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: ["https://org.crm.dynamics.com/.default"],
  }),
});

// ========== CREATE ==========
const createResponse = await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation())
  .post<Account>({
    name: "Contoso Ltd",
    telephone1: "555-1234",
    revenue: 1000000,
  });

const accountId = createResponse.accountid;
console.log(`Created account: ${accountId}`);

// Without return=representation, createAndGetId() reads the id from OData-EntityId
const otherId = await client.api("/accounts").createAndGetId({ name: "Fabrikam" });

// With return=representation the 201 has no OData-EntityId: name the primary key to read it
const thirdId = await client
  .api("/accounts")
  .createAndGetId(
    { name: "Northwind" },
    { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" }
  );

// ========== RETRIEVE ==========
// expand() takes strings; nested query options go inline in OData syntax
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "telephone1", "revenue", "createdon")
  .expand("primarycontactid($select=fullname,emailaddress1)")
  .get<Account & { primarycontactid?: { fullname: string } }>();

console.log(`Account: ${account.name}, Revenue: ${account.revenue}`);

// ========== UPDATE ==========
await client.api(`/accounts(${accountId})`).patch({
  telephone1: "555-9999",
  revenue: 2000000,
});

console.log("Account updated");

// ========== DELETE ==========
await client.api(`/accounts(${accountId})`).delete();

console.log("Account deleted");

// ========== RETRIEVE MULTIPLE ==========
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .filter("revenue gt 500000")
  .orderBy("revenue desc")
  .top(10)
  .get<{ value: Account[] }>();

console.log(`Found ${accounts.value.length} accounts`);

// ========== PAGING ==========
// Single page (default). getPage() types the body as { value, "@odata.nextLink"? }.
// Dataverse pages with the odata.maxpagesize preference ($top limits the total instead).
const page1 = await client
  .api("/accounts")
  .select("name")
  .preferRaw("odata.maxpagesize=5")
  .getPage<Account>();

// Get next page
if (page1["@odata.nextLink"]) {
  const page2 = await client.api(page1["@odata.nextLink"]).getPage<Account>();
}

// Iterate all pages
for await (const account of client.api("/accounts").select("name").iterate<Account>()) {
  console.log(account.name);
}

// Get all (bounded)
const allAccounts = await client
  .api("/accounts")
  .select("name")
  .getAll({ maxPages: 10, maxItems: 100 });
```

### 2. Late-Bound with `OrganizationService` (.NET compatibility layer)

```typescript
import { OrganizationService, createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";

const service = new OrganizationService(client);

// ========== CREATE ==========
const accountId = await service.create("accounts", {
  name: "Contoso Ltd",
  telephone1: "555-1234",
  revenue: 1000000,
});

console.log(`Created account: ${accountId}`);

// With returnRepresentation
const newAccount = await service.create(
  "accounts",
  {
    name: "Adventure Works",
  },
  {
    returnRepresentation: true,
    select: ["accountid", "name", "createdon"],
  }
);

// ========== RETRIEVE ==========
const account = await service.retrieve("accounts", accountId, {
  select: ["name", "telephone1", "revenue"],
  expand: [
    {
      navigationProperty: "primarycontactid",
      select: ["fullname", "emailaddress1"],
    },
  ],
});

console.log(`Account: ${account.name}`);

// ========== UPDATE ==========
// Sends If-Match: * so, like the C# Update, it never creates a missing record (404 instead).
await service.update("accounts", accountId, {
  telephone1: "555-9999",
  revenue: 2000000,
});

// With optimistic concurrency
await service.update(
  "accounts",
  accountId,
  {
    revenue: 3000000,
  },
  {
    etag: account["@odata.etag"],
  }
);

// With returnRepresentation
const updated = await service.update(
  "accounts",
  accountId,
  {
    name: "Updated Name",
  },
  {
    returnRepresentation: true,
    select: ["name", "modifiedon"],
  }
);

// ========== DELETE ==========
await service.delete("accounts", accountId);

// Or, with optimistic concurrency (rejects with 412 if the record changed since it was read)
await service.delete("accounts", otherAccountId, {
  etag: otherAccount["@odata.etag"],
});

// ========== RETRIEVE MULTIPLE ==========
const result = await service.retrieveMultiple("accounts", {
  select: ["name", "revenue"],
  filter: "revenue gt 500000",
  orderBy: "revenue desc",
  top: 10,
  count: true,
});

console.log(`Found ${result.value.length} of ${result["@odata.count"]} total`);

// ========== ASSOCIATE ==========
// References come from createEntityReference(logicalName, id), with the logical name ("contact").
await service.associate("accounts", accountId, "contact_customer_accounts", [
  createEntityReference("contact", contactId1),
  createEntityReference("contact", contactId2),
]);

// ========== DISASSOCIATE ==========
await service.disassociate("accounts", accountId, "contact_customer_accounts", contactId1);
```

### 3. Early-Bound (Generated Types)

With `"typedClient": true` in `.dataverse-gen.json`, the generated `createTypedClient()` is the
main path for your tables: a request builder per entity set whose columns and payloads are checked
against the table.

```typescript
import { createTypedClient } from "./generated/client.js";

const typed = createTypedClient(client);

const newId = await typed.accounts.create({ name: "Typed Account", creditlimit: 1000 });
const typedAccount = await typed.accounts.byId(newId).get({ select: ["name", "creditlimit"] });
const page = await typed.accounts.list({ select: ["name"], filter: "statecode eq 0", top: 10 });
await typed.accounts.byId(newId).update({ creditlimit: 2000 });
await typed.accounts.byId(newId).delete();
console.log(typedAccount.name, page.length);
```

The generated interfaces also work with `client.api()` and `OrganizationService`:

```typescript
// Assuming you've generated types using @mohsinonxrm/dataverse-sdk-generator
import type { Account, Contact } from "./generated/entities";

// ========== With client.api() ==========
const accounts = await client
  .api("/accounts")
  .select("name", "revenue")
  .get<{ value: Account[] }>();

// ========== With OrganizationService ==========
const accountTyped = await service.retrieve<Account>("accounts", accountId, {
  select: ["name", "revenue", "telephone1"],
});

// The columns the generated interface declares have their types. Any other property is
// `unknown` (IEntity has `[key: string]: unknown`), so it must be checked before use.
console.log(accountTyped.name); // ✅ Type-safe
const other = accountTyped.new_undeclared; // unknown

// With returnRepresentation: true, create() resolves the record as T. The entity argument is
// not checked against T.
const created = await service.create<Account>(
  "accounts",
  { name: "Typed Account", revenue: 1000000 },
  { returnRepresentation: true, select: ["accountid", "name"] }
);
console.log(created.accountid);

// Without a type argument, records are EntityRecords: every column is `unknown` until narrowed
const late = await service.retrieve("accounts", accountId, { select: ["name"] });
const name = typeof late.name === "string" ? late.name : "(no name)";
```

---

## Actions

Actions are **POST** operations that may have side effects. They return results.

### 1. Using Typed Action Classes with `client.execute()`

```typescript
import {
  WinOpportunityAction,
  type WinOpportunityActionParameters,
} from "@mohsinonxrm/dataverse-sdk-actions";

// ========== Win Opportunity (Unbound Action) ==========
// An entity parameter takes the table's columns, its @odata.type, and lookups as @odata.bind
const opportunityClose: WinOpportunityActionParameters["OpportunityClose"] = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won the deal!",
  "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
  actualrevenue: 50000,
  actualend: new Date().toISOString(),
};

const winAction = new WinOpportunityAction({
  OpportunityClose: opportunityClose,
  Status: 3,
});

await client.execute(winAction);
console.log("Opportunity marked as won");

// ========== CreateCustomerRelationships (Special Metadata Action) ==========
// Lookup is a ComplexLookupAttributeMetadata and each relationship a
// ComplexOneToManyRelationshipMetadata; MetadataClient.createCustomerRelationship() wraps this action
import { CreateCustomerRelationshipsAction } from "@mohsinonxrm/dataverse-sdk-actions";

const createCustAction = new CreateCustomerRelationshipsAction({
  Lookup: {
    SchemaName: "new_CustomerId",
    DisplayName: { LocalizedLabels: [{ Label: "Customer", LanguageCode: 1033 }] },
  },
  OneToManyRelationships: [
    {
      SchemaName: "new_account_custom",
      ReferencedEntity: "account",
      ReferencingEntity: "new_customentity",
    },
    {
      SchemaName: "new_contact_custom",
      ReferencedEntity: "contact",
      ReferencingEntity: "new_customentity",
    },
  ],
  SolutionUniqueName: "MySolution",
});

const response = await client.execute(createCustAction);
console.log(`Created relationships with IDs: ${response.RelationshipIds.join(", ")}`);
```

### 2. Using HTTP-First with `client.api()`

```typescript
// ========== Win Opportunity (Raw HTTP POST) ==========
const winResponse = await client.api("/WinOpportunity").post({
  OpportunityClose: {
    subject: "Won the deal!",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    actualrevenue: 50000,
    actualend: new Date().toISOString(),
  },
  Status: 3,
});

// ========== Bound Actions ==========
// ExecuteWorkflow is bound to workflow entity; it returns the asyncoperation it started
const executeResponse = await client
  .api(`/workflows(${workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`)
  .post<{ asyncoperationid: string }>({
    EntityId: recordId,
  });

console.log(`Async operation ID: ${executeResponse.asyncoperationid}`);
```

### 3. Using OrganizationService.execute() with Typed Executables (.NET compatibility layer)

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { WinOpportunityAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const service = new OrganizationService(client);

// ========== Execute Function ==========
const whoAmI = await service.execute(new WhoAmIFunction());
console.log(`User ID: ${whoAmI.UserId}`);

// ========== Execute Action ==========
const winAction = new WinOpportunityAction({
  OpportunityClose: opportunityClose,
  Status: 3,
});
await service.execute(winAction);

// ========== Execute Message ==========
const workflowRequest = new ExecuteWorkflowRequest(workflowId, {
  EntityId: recordId,
  InputArguments: {},
});
const workflowResponse = await service.execute(workflowRequest);
console.log(`Async operation: ${workflowResponse.result?.asyncoperationid}`);

// NOTE: service.execute() works with ANY Executable<T> class:
// ✅ Actions from @mohsinonxrm/dataverse-sdk-actions
// ✅ Functions from @mohsinonxrm/dataverse-sdk-functions
// ✅ Messages from @mohsinonxrm/dataverse-sdk-messages
```

---

## Functions

Functions are **GET** operations with no side effects. They query data.

### 1. Using Typed Function Classes with `client.execute()`

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

// ========== WhoAmI Function ==========
const whoAmiFn = new WhoAmIFunction();
const whoAmIResponse = await client.execute(whoAmiFn);

console.log(`User ID: ${whoAmIResponse.UserId}`);
console.log(`Business Unit ID: ${whoAmIResponse.BusinessUnitId}`);
console.log(`Organization ID: ${whoAmIResponse.OrganizationId}`);
```

### 2. Using HTTP-First with `client.api()`

```typescript
// ========== WhoAmI (Raw HTTP GET) ==========
const whoAmI = await client.api("/WhoAmI").get<{ UserId: string }>();

console.log(`User ID: ${whoAmI.UserId}`);

// ========== Functions with Parameters (OData parameter aliases) ==========
// The builder has no method for parameter aliases: put them in the path's query string.
// The builder's own query options ($select, ...) are added to it.
const result = await client
  .api("/GetValidReferencingEntities(ReferencedEntityName=@p1)?@p1='account'")
  .get<{ EntityNames: string[] }>();

// Note: Functions use GET with parameter aliases following Microsoft OData guidance
```

---

## Messages

Messages are the **.NET compatibility layer** for operations: OrganizationService-style
`<Name>Request` / `<Name>Response` classes with the .NET names, for code ported from the .NET SDK.
Each sends the same request as the action or function of the same name; on the main path, use
that action or function class instead.

### Messages Package Overview

The `@mohsinonxrm/dataverse-sdk-messages` package contains <!-- count:messages -->1,281<!-- /count --> generated request/response classes:

- ✅ **All messages implement Executable<T>** - All <!-- count:messages -->1,281<!-- /count --> message classes can be executed directly
- ✅ **OrganizationService.execute() works** - Executes any message that implements Executable<T> interface
- ✅ **DataverseClient.execute() works** - Also executes any Executable<T> message
- ✅ **Direct exports only** - Import message classes directly (e.g., `import { ExecuteWorkflowRequest } from '@mohsinonxrm/dataverse-sdk-messages'`)

### Usage Pattern

```typescript
// ========== Import message classes directly ==========
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// ========== Execute via OrganizationService ==========
const service = new OrganizationService(client);

// ExecuteWorkflow message
const workflowRequest = new ExecuteWorkflowRequest(workflowId, {
  EntityId: recordId,
  InputArguments: {},
});
const workflowResponse = await service.execute(workflowRequest);
console.log(`Async operation: ${workflowResponse.result?.asyncoperationid}`);

// Assign and SetState aren't Web API messages: they are record updates, so use the helpers
await service.assign("account", accountId, userId); // PATCH ownerid@odata.bind
await service.setState("account", accountId, 1, 2); // PATCH statecode / statuscode

// ========== Execute via DataverseClient ==========
// Messages also work directly with client.execute()
const response = await client.execute(workflowRequest);
```

### Available Message Examples

All messages are exported directly (no namespaces required):

```typescript
// WhoAmI is a Web API function, so it lives in the functions package
import { WhoAmIFunction, type WhoAmIResponse } from "@mohsinonxrm/dataverse-sdk-functions";

// Workflow and process messages
import {
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";

// Sales messages
import { WinOpportunityRequest, WinOpportunityResponse } from "@mohsinonxrm/dataverse-sdk-messages";
import {
  LoseOpportunityRequest,
  LoseOpportunityResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { QualifyLeadRequest, QualifyLeadResponse } from "@mohsinonxrm/dataverse-sdk-messages";

// Solution messages
import { ExportSolutionRequest, ExportSolutionResponse } from "@mohsinonxrm/dataverse-sdk-messages";
import { ImportSolutionRequest, ImportSolutionResponse } from "@mohsinonxrm/dataverse-sdk-messages";
import { PublishXmlRequest, PublishXmlResponse } from "@mohsinonxrm/dataverse-sdk-messages";
```

### How Message Execution Works

All message classes implement the `Executable<TResponse>` interface from `@mohsinonxrm/dataverse-sdk-core`:

```typescript
export interface Executable<T> {
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<T>;
}
```

Each message class encapsulates:

1. **Request construction** - `toRequestInformation()` builds the HTTP request (method, URL, body, headers)
2. **Response parsing** - `parseResponse()` transforms the HTTP response into a typed result

**OrganizationService.execute() implementation:**

<!-- no-check -->

```typescript
// FROM: packages/dataverse-sdk-xrm/src/OrganizationService.ts (OrganizationService.execute)
// T comes from the request, so `await service.execute(new WhoAmIFunction())` is a WhoAmIResponse
async execute<T>(request: Executable<T>, options?: OperationOptions): Promise<T> {
  // The type rules out anything else, but JavaScript callers can still pass one
  if (this.isExecutable<T>(request)) {
    return await this.client.execute(request, signalOptions(options));
  }

  throw new Error(
    "Request must implement Executable<T> interface with toRequestInformation() and parseResponse() methods. " +
    "Use generated classes from @mohsinonxrm/dataverse-sdk-messages, @mohsinonxrm/dataverse-sdk-actions, or @mohsinonxrm/dataverse-sdk-functions."
  );
}
```

**No routing table needed** - each message class knows how to construct its own HTTP request and parse its response.

---

## Metadata Operations

Metadata operations interact with Dataverse schema (entities, attributes, relationships).

### 1. Using MetadataClient (Typed Wrapper)

```typescript
import { MetadataClient, AttributeRequiredLevel } from "@mohsinonxrm/dataverse-sdk-metadata";
import type {
  EntityMetadataCreate,
  StringAttributeMetadataCreate,
} from "@mohsinonxrm/dataverse-sdk-metadata";

const metadataClient = new MetadataClient(client);

// ========== CREATE ENTITY ==========
const entityDef: EntityMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_Project",
  DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
  DisplayCollectionName: { LocalizedLabels: [{ Label: "Projects", LanguageCode: 1033 }] },
  OwnershipType: "UserOwned",
  IsActivity: false,
  HasActivities: true,
  HasNotes: true,
  // The primary name column first (required), then any other columns
  Attributes: [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Name",
      DisplayName: { LocalizedLabels: [{ Label: "Name", LanguageCode: 1033 }] },
      RequiredLevel: { Value: "ApplicationRequired" },
      MaxLength: 100,
      IsPrimaryName: true,
    },
  ],
};

const entityMetadataId = await metadataClient.createEntityDefinition(entityDef);
console.log(`Created entity: ${entityMetadataId}`);

// ========== CREATE ATTRIBUTE ==========
const attrDef: StringAttributeMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_Name",
  DisplayName: { LocalizedLabels: [{ Label: "Name", LanguageCode: 1033 }] },
  RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
  MaxLength: 100,
  FormatName: { Value: "Text" },
};

await metadataClient.createAttributeDefinition("new_project", attrDef);
console.log("Attribute created");

// ========== CREATE 1:N RELATIONSHIP ==========
import type { OneToManyRelationshipMetadataCreate } from "@mohsinonxrm/dataverse-sdk-metadata";

const relationshipDef: OneToManyRelationshipMetadataCreate = {
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_project_milestones",
  ReferencedEntity: "new_project",
  ReferencedAttribute: "new_projectid",
  ReferencingEntity: "new_milestone",
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_ProjectId",
    DisplayName: { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] },
    RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
  },
};

await metadataClient.createOneToManyRelationship(relationshipDef);
console.log("Relationship created");

// ========== RETRIEVE ENTITY DEFINITIONS ==========
const entities = await metadataClient.getEntityDefinitions({
  select: ["LogicalName", "DisplayName", "SchemaName"],
  filter: "IsCustomEntity eq true",
});

console.log(`Found ${entities.length} custom entities`);

// ========== RETRIEVE METADATA CHANGES ==========
import {
  LogicalOperator,
  MetadataConditionOperator,
  type EntityQueryExpression,
} from "@mohsinonxrm/dataverse-sdk-metadata";

const query: EntityQueryExpression = {
  Criteria: {
    FilterOperator: LogicalOperator.And,
    Conditions: [
      {
        PropertyName: "SchemaName",
        ConditionOperator: MetadataConditionOperator.Equals,
        Value: { Type: "System.String", Value: "new_Project" },
      },
    ],
  },
  Properties: {
    PropertyNames: ["Attributes", "OneToManyRelationships"],
  },
};

// Positional: (query, clientVersionStamp?, deletedMetadataFilters?)
const first = await metadataClient.retrieveMetadataChanges(query);
const changes = await metadataClient.retrieveMetadataChanges(
  query,
  first.ServerVersionStamp,
  "Default"
);

console.log("Metadata changes retrieved", changes.ServerVersionStamp);
```

### 2. Using HTTP-First with `client.api()`

```typescript
// ========== CREATE ENTITY (Raw HTTP POST) ==========
// Dataverse answers 204 with the new MetadataId in OData-EntityId; createAndGetId() reads it
const entityMetadataId = await client.api("/EntityDefinitions").createAndGetId({
  "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
  SchemaName: "new_Project",
  DisplayName: {
    LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
  },
  OwnershipType: "UserOwned",
  HasActivities: true,
});

// ========== CREATE ATTRIBUTE (Raw HTTP POST) ==========
await client.api("/EntityDefinitions(LogicalName='new_project')/Attributes").post({
  "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
  SchemaName: "new_Name",
  DisplayName: {
    LocalizedLabels: [{ Label: "Name", LanguageCode: 1033 }],
  },
  RequiredLevel: { Value: "ApplicationRequired" },
  MaxLength: 100,
  FormatName: { Value: "Text" },
});

// ========== QUERY ENTITY DEFINITIONS (Raw HTTP GET) ==========
const entities = await client
  .api("/EntityDefinitions")
  .select("LogicalName", "DisplayName")
  .filter("IsCustomEntity eq true")
  .get<{ value: Array<{ LogicalName: string }> }>();

console.log(`Found ${entities.value.length} entities`);

// ========== CREATE 1:N RELATIONSHIP (Raw HTTP POST) ==========
await client.api("/RelationshipDefinitions").post({
  "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
  SchemaName: "new_project_milestones",
  ReferencedEntity: "new_project",
  ReferencedAttribute: "new_projectid",
  ReferencingEntity: "new_milestone",
  Lookup: {
    "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    SchemaName: "new_ProjectId",
    DisplayName: {
      LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: "ApplicationRequired" },
  },
});
```

---

## Architecture Decision Summary

### When to Use Each Approach

#### Use `client.api()` (main path) for:

- ✅ Queries and CRUD: `$select`, `$filter`, `$expand`, paging, ETags, associate (`$ref`)
- ✅ Change tracking, FetchXML and saved views
- ✅ Direct HTTP control (custom headers, impersonation, `Prefer`)
- ✅ With `dataverse-gen`'s typed client, the same requests with your columns checked at compile time

#### Use `client.execute(typedAction/Function)` (main path) for:

- ✅ Dataverse's named operations: **actions** and **functions**
- ✅ **Type safety** and IDE autocomplete for their parameters and results
- ✅ Examples: Business operations (WinOpportunity, ExecuteWorkflow, ExportSolution)
- ✅ Custom APIs and other apps' operations, generated with `dataverse-gen`

#### Use `OrganizationService` and messages (.NET compatibility layer) when:

- ✅ You're porting code from the **.NET Dataverse SDK** and want the .NET names first
- ✅ You want `<Name>Response` objects shaped like the .NET message responses
- ✅ Examples: migrations, C# developer onboarding; move to the main path call by call

#### Use `MetadataClient` when:

- ✅ You're working with **metadata**
- ✅ You want typed metadata operations
- ✅ Building schema management tools
- ✅ Examples: ALM tools, schema generators, admin utilities

---

## Key Architectural Patterns

### 1. **Executable Interface**

All typed actions/functions implement `Executable<T>`:

```typescript
export interface Executable<T> {
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<T>;
}
```

This allows:

- **Type-safe** execution via `client.execute()`
- **Consistent** pattern across actions/functions
- **Separation** of concerns (request building vs execution)

### 2. **Middleware Pipeline**

HTTP-first and typed executables **both** use the same pipeline:

```
User Code
   ↓
client.execute() OR client.api()
   ↓
Pipeline (ODataHeaders → Retry → Concurrency → Auth → Telemetry → Logging)
   ↓
FetchRequestAdapter
   ↓
Dataverse Web API
```

### 3. **OrganizationService Facade**

OrganizationService is built **on top of** HTTP primitives:

<!-- no-check -->

```typescript
// FROM: packages/dataverse-sdk-xrm/src/OrganizationService.ts (OrganizationService.create)
const builder = this.client.api(`/${entitySetName}`);
// Prefer return=representation and $select, duplicate detection, impersonation, headers, signal
const requestOptions = this.applyWriteOptions(builder, options);

if (options?.returnRepresentation) {
  const created = await builder.post<T | undefined>(entity, requestOptions);
  return created ?? ({} as T);
}

return builder.createAndGetId(entity, requestOptions);
```

It's a **convenience layer**, not a separate execution path.

### 4. **Complex\* Types Exception**

Metadata types use `ComplexLookupAttributeMetadata` and `ComplexOneToManyRelationshipMetadata` **only** for customer lookup scenarios (CreateCustomerRelationships action). Regular metadata operations use non-Complex types (EntityMetadata, AttributeMetadata, OneToManyRelationshipMetadata).

---

## Summary Table

| Operation        | Main path: `client.api()`                                                 | Main path: typed operation (`client.execute()`)   | Compatibility layer: OrganizationService           | Best For            |
| ---------------- | ------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------- | ------------------- |
| **Create**       | `client.api('/accounts').post({...})`, or `typed.accounts.create({...})`  | N/A                                               | `service.create('accounts', {...})`                | Standard CRUD       |
| **Retrieve**     | `client.api('/accounts(id)').get()`, or `typed.accounts.byId(id).get()`   | N/A                                               | `service.retrieve('accounts', id)`                 | Standard CRUD       |
| **Update**       | `client.api('/accounts(id)').patch({...})`                                | N/A                                               | `service.update('accounts', id, {...})`            | Standard CRUD       |
| **Delete**       | `client.api('/accounts(id)').delete()`                                    | N/A                                               | `service.delete('accounts', id)`                   | Standard CRUD       |
| **Query**        | `client.api('/accounts').filter(...).get()`, or `typed.accounts.list()`   | N/A                                               | `service.retrieveMultiple('accounts', {...})`      | Queries             |
| **Actions**      | `client.api('/WinOpportunity').post({...})`                               | `client.execute(new WinOpportunityAction(...))`   | `service.execute(new WinOpportunityAction(...))`   | Business operations |
| **Functions**    | `client.api('/WhoAmI').get()`                                             | `client.execute(new WhoAmIFunction())`            | `service.execute(new WhoAmIFunction())`            | Read operations     |
| **Messages**     | N/A: use the action or function of the same name                          | `client.execute(new ExecuteWorkflowRequest(...))` | `service.execute(new ExecuteWorkflowRequest(...))` | Ported .NET code    |
| **Metadata**     | `client.api('/EntityDefinitions').post({...})`                            | Use MetadataClient                                | N/A                                                | Schema management   |
| **Associate**    | `client.api('/accounts(id)/contact_customer_accounts/$ref').post({...})`  | N/A                                               | `service.associate(...)`                           | Relationships       |
| **Disassociate** | `client.api('/accounts(id)/contact_customer_accounts(id)/$ref').delete()` | N/A                                               | `service.disassociate(...)`                        | Relationships       |

---

## Conclusion

The SDK has **one main path** and a **.NET compatibility layer** on top of it:

1. **`client.api()`** (and the generated typed client) - queries and CRUD
2. **Typed operations** (`client.execute(new <Name>Action(…))`) - actions and functions, prebuilt or generated
3. **OrganizationService and messages** - the .NET names, for code ported from the .NET SDK

**Recommendation**:

- Use **`client.api()`** for queries and CRUD, through `createTypedClient()` when you generate types
- Use **typed actions and functions** for Dataverse's named operations
- Use **`MetadataClient`** for schema changes
- Use **OrganizationService and messages** to port .NET code; move to the main path call by call

All of them use the **same underlying pipeline** for auth, retry, concurrency, and telemetry.
