# @mohsinonxrm/dataverse-sdk-functions

Typed Web API functions for Dataverse. Functions are read-only operations that execute via HTTP GET and should not have side effects.

## Features

- ✅ **<!-- count:functions -->280<!-- /count --> typed functions** - The Web API functions of the platform, Sales and Customer Service, generated from `$metadata`
- ✅ **Parameter aliases** - Proper query string parameter handling per Microsoft guidance
- ✅ **Type-safe responses** - Full TypeScript typing for request and response
- ✅ **Common operations** - WhoAmI, InitializeFrom, CalculateRollupField, RetrieveMetadataChanges, and more
- ✅ **Query helpers** - Fiscal period, date range, and conditional operator functions
- ✅ **Security & access** - Privilege, role, and permission retrieval functions
- ✅ **Metadata operations** - Entity, attribute, and relationship metadata functions

## What this package covers

The functions of the **platform** (Dataverse and the Power Platform solutions every environment
has, including the Web API's query functions such as `LastXDays`) and of the two core Dynamics
365 apps of a plain trial, **Sales** and **Customer Service**. They are chosen by the solution
each function comes from, not by what the org the SDK was generated from has installed: the
[solution table](../../tools/generate-sdk-types/metadata/README.md#which-operations-are-prebuilt)
lists every solution and whether its operations are in.

Not in the package: the functions of Contact Center (Omnichannel, unified routing, voice,
`CCaaS_*`), Field Service, Project Operations, Universal Resource Scheduling, Customer Insights -
Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process
Mining, and your own custom API functions. Generate those from your org with `dataverse-gen`: see
[Generate the rest with dataverse-gen](../../docs/getting-started.md#generate-the-rest-with-dataverse-gen).

## Installation

```bash
npm install @mohsinonxrm/dataverse-sdk-functions @mohsinonxrm/dataverse-sdk-core
```

## Quick Start

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  // ... auth configuration
});

// Execute WhoAmI function
const whoAmI = new WhoAmIFunction();
const response = await client.execute(whoAmI);

console.log("User ID:", response.UserId);
console.log("Business Unit:", response.BusinessUnitId);
console.log("Organization:", response.OrganizationId);
```

## Return Values

`client.execute()` resolves the value the function returns, not the OData envelope around it.
Each class's `<Name>Response` type is exactly that value (#300):

| Return type in `$metadata`                       | Web API response                                          | Value                                                       |
| ------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| none                                             | `204 No Content`                                          | `undefined` (`<Name>Response` is `void`)                    |
| primitive or enum (`Edm.Boolean`, …)             | `{ "@odata.context", "value": … }`                        | the value (an enum is its member name)                      |
| collection (`Collection(mscrm.role)`, …)         | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array, each record with `@odata.etag`; `[]` for a 204   |
| complex type (`mscrm.WhoAmIResponse`)            | the properties, with `@odata.context`                     | the body, with `@odata.context`                             |
| entity (`mscrm.asyncoperation`, `crmbaseentity`) | the record, with its annotations, or 204 when unset       | the record (`@odata.etag`, `@odata.type`); `null` for a 204 |

Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set,
although `$metadata` declares the return `Nullable="false"`, so an entity return is
`<Entity> | null`. `@odata.type` says which table a `crmbaseentity` record is.

```typescript
const roles = await client.execute(new RetrieveAadUserRolesFunction({ DirectoryObjectId: id }));
console.log(roles.map((r) => r.name)); // role records, not { value }

const solution = await client.execute(new GetPreferredSolutionFunction());
console.log(solution?.uniquename, solution?.["@odata.etag"]);
```

## Function Categories

The SDK includes **<!-- count:functions -->280<!-- /count --> typed functions** organized into the following categories:

### Platform Functions (Core Operations)

**Identity & Context:**

- `WhoAmIFunction` - Get current user information
- `RetrieveCurrentOrganizationFunction` - Get organization details
- `RetrieveVersionFunction` - Get Dataverse version

**Entity Operations:**

- `InitializeFromFunction` - Create record from existing record
- `CalculateRollupFieldFunction` - Calculate rollup field value
- `RetrieveMetadataChangesFunction` - Get metadata changes since timestamp

**Security & Access:**

- `RetrievePrincipalAccess_systemuserFunction`, `RetrievePrincipalAccess_teamFunction` - Get a
  user's or a team's access rights to a record (one class per binding, and no plain-name class:
  see [Overloads](#overloads-one-class-per-binding))
- `RetrieveSharedPrincipalsAndAccessFunction` - Get sharing information
- `RetrieveUserPrivilegesFunction` - Get user privileges
- `RetrieveTeamPrivilegesFunction` - Get team privileges

### Metadata Functions

- `RetrieveEntityFunction` - Get entity metadata
- `RetrieveAllEntitiesFunction` - Get all entity metadata
- `RetrieveAttributeChangeHistoryFunction` - Get attribute audit history
- `RetrieveRecordChangeHistoryFunction` - Get record audit history
- `GetValidReferencedEntitiesFunction` - Get valid lookup targets
- `GetValidReferencingEntitiesFunction` - Get valid lookup sources

### Query Helper Functions

**Fiscal Period:**

- `InFiscalPeriodFunction`, `InFiscalYearFunction`
- `LastFiscalPeriodFunction`, `LastFiscalYearFunction`
- `NextFiscalPeriodFunction`, `NextFiscalYearFunction`
- `ThisFiscalPeriodFunction`, `ThisFiscalYearFunction`

**Date Ranges:**

- `Last7DaysFunction`, `Next7DaysFunction`
- `LastMonthFunction`, `NextMonthFunction`
- `LastWeekFunction`, `NextWeekFunction`
- `ThisMonthFunction`, `ThisWeekFunction`, `ThisYearFunction`
- `TodayFunction`, `TomorrowFunction`, `YesterdayFunction`

**Conditional Operators:**

- `BetweenFunction`, `NotBetweenFunction`
- `ContainsFunction`, `DoesNotContainValuesFunction`
- `UnderFunction`, `UnderOrEqualFunction`, `NotUnderFunction`
- `EqualUserIdFunction`, `EqualBusinessIdFunction`

### Sales and Customer Service Functions

- `CalculateTotalTimeIncidentFunction` - Total time spent on a case
- `GetDefaultPriceLevelFunction` - The default price list for a product
- `GetQuantityDecimal_quoteFunction` (and `GetQuantityDecimal_opportunityFunction`,
  `GetQuantityDecimal_salesorderFunction`, `GetQuantityDecimal_invoiceFunction`) - The decimal
  precision of a product's quantity
- `msdyn_*` functions of the Sales and Customer Service solutions

Contact Center (`CCaaS_*`), Field Service and the other apps' functions aren't in this package:
see [What this package covers](#what-this-package-covers).

### Common Functions

#### WhoAmI

Retrieves information about the currently authenticated user.

**Maps to:** `GET /WhoAmI`

**Example:**

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = new WhoAmIFunction();
const response = await client.execute(whoAmI);

console.log("Current User:", {
  userId: response.UserId,
  businessUnitId: response.BusinessUnitId,
  organizationId: response.OrganizationId,
});
```

**Response:**

```typescript
interface WhoAmIResponse {
  "@odata.context"?: string;
  UserId: string; // GUID of the current user
  BusinessUnitId: string; // GUID of the user's business unit
  OrganizationId: string; // GUID of the organization
}
```

#### InitializeFrom

Creates a new record with pre-populated values from an existing record.

**Maps to:** `GET /InitializeFrom(...)`

**Example:**

```typescript
import {
  InitializeFromFunction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-functions";

const contact = await client.execute(
  new InitializeFromFunction({
    EntityMoniker: createEntityReference("account", sourceId),
    TargetEntityName: "contact",
    TargetFieldType: "ValidForCreate",
  })
);
// contact holds the values the account-contact mapping copies
```

#### RetrieveMetadataChanges

Retrieves metadata changes since a specific version.

**Maps to:** `GET /RetrieveMetadataChanges(...)`

**Example:**

```typescript
import { RetrieveMetadataChangesFunction } from "@mohsinonxrm/dataverse-sdk-functions";

// The first call returns the metadata the query matches, and a version stamp
const first = await client.execute(new RetrieveMetadataChangesFunction({ Query: {} }));

// Later calls with that stamp return only what changed since
const { EntityMetadata, ServerVersionStamp } = await client.execute(
  new RetrieveMetadataChangesFunction({ Query: {}, ClientVersionStamp: first.ServerVersionStamp })
);
```

## Overloads (one class per binding)

When `$metadata` declares an operation several times with different bindings, each binding has its
own class: `<Name>_<table>Function`, with `_collection` for a collection binding. An unbound
overload keeps the plain name. A name with no unbound overload has no plain-name class, so you
pick the binding: there is `RetrievePrincipalAccess_systemuserFunction`,
`RetrievePrincipalAccess_teamFunction` and `RetrievePrincipalAccess_organizationFunction`, but no
`RetrievePrincipalAccess` class without a table.

```typescript
import {
  RetrievePrincipalAccess_systemuserFunction,
  RetrievePrincipalAccess_teamFunction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-functions";

const target = createEntityReference("account", accountId);
// GET /systemusers(<userId>)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)
const { AccessRights } = await client.execute(
  new RetrievePrincipalAccess_systemuserFunction(userId, { Target: target })
);
await client.execute(new RetrievePrincipalAccess_teamFunction(teamId, { Target: target }));
```

`createEntityReference` and `EntityReference` are the SDK's one set, from
`@mohsinonxrm/dataverse-sdk-entities-runtime`, re-exported here as by the actions, messages and
xrm packages: a reference from any of them works here. Only `createEntityReference` makes one; a
hand-written `{ logicalName, id }` doesn't type-check. For a table the SDK's `$metadata` snapshot
doesn't know, pass its set: `createEntityReference("new_project", id, { entitySetName: "new_projects" })`.

## Parameter Values

Each parameter is sent as the OData literal of its CSDL type:

| Type                       | You pass                                                                                   | Sent as                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `Edm.String`               | `"O'Brien"`                                                                                | `'O''Brien'` (quoted, every `'` doubled)                                       |
| `Edm.Guid`                 | `"00000000-0000-0000-0000-000000000000"`                                                   | unquoted                                                                       |
| `Edm.DateTimeOffset`       | an ISO string or a `Date`                                                                  | unquoted, e.g. `2026-01-01T00:00:00.000Z`                                      |
| numbers, `Edm.Boolean`     | `85`, `false`                                                                              | `85`, `false`                                                                  |
| enum                       | a value (`EntityFilters.Entity \| EntityFilters.Attributes`) or a member name (`"Entity"`) | `Microsoft.Dynamics.CRM.EntityFilters'3'`                                      |
| complex types, collections | an object or array                                                                         | JSON                                                                           |
| entity reference           | `createEntityReference("account", id)`                                                     | `{"@odata.id":"accounts(<id>)"}` (entity set from the CSDL; throws if unknown) |

The enums are exported from the package root:

```typescript
import { EntityFilters, RetrieveEntityFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const { EntityMetadata } = await client.execute(
  new RetrieveEntityFunction({
    EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
    LogicalName: "account",
    MetadataId: "00000000-0000-0000-0000-000000000000",
    RetrieveAsIfPublished: false,
  })
);
```

Parameters that the CSDL doesn't mark `Nullable="false"` are optional. They are left out of the
URL when `undefined`. A trailing one can be omitted (`new RetrieveMetadataChangesFunction()`). One
followed by a required parameter stays in its position and takes `undefined`.

## Complete Function Reference

For a complete list of all <!-- count:functions -->280<!-- /count --> functions with descriptions and examples, see [docs/mapping/supported-functions.md](../../docs/mapping/supported-functions.md).

## Architecture

### Functions vs Actions

- **Functions** (this package):
  - HTTP method: `GET`
  - Side effects: **No** - functions should be read-only
  - Parameters: Passed as query string with parameter aliases, each written as the OData literal
    of its type (see [Parameter Values](#parameter-values)).
  - Use for: Queries, calculations, retrieving information

- **Actions** (`@mohsinonxrm/dataverse-sdk-actions`):
  - HTTP method: `POST`
  - Side effects: **Yes** - actions can modify data
  - Parameters: Passed in request body
  - Use for: Business operations, bulk operations, file uploads

### Function Execution Flow

```typescript
// 1. Create function instance
const whoAmI = new WhoAmIFunction();

// 2. Function converts to RequestInformation
const requestInfo = whoAmI.toRequestInformation(baseUrl);
// => { method: 'GET', url: 'https://.../WhoAmI', headers: {} }

// 3. Client executes the request
const response = await client.execute(whoAmI);

// 4. Function parses the response
// Returns typed WhoAmIResponse
```

## Extending with Custom Functions

You can call custom or unsupported functions using the raw API:

```typescript
// Raw function call with the parameter aliases in the URL (the request builder has no
// parameter-alias method; encode string literals yourself)
const result = await client
  .api(`new_CustomFunction(Name=@p1,Count=@p2)?@p1=${encodeURIComponent("'value'")}&@p2=5`)
  .get();
```

Or create a typed wrapper:

```typescript
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

interface CustomFunctionResponse {
  Result: string;
}

class CustomFunction implements Executable<CustomFunctionResponse> {
  constructor(public readonly param1: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "GET",
      url: `${baseUrl}/CustomFunction(Param1=@Param1)`,
      headers: {},
      query: {
        "@Param1": this.param1,
      },
    };
  }

  async parseResponse(response: Response): Promise<CustomFunctionResponse> {
    const data = await response.json();
    return { Result: data.Result };
  }
}

// Usage
const customFunc = new CustomFunction("test");
const response = await client.execute(customFunc);
```

## License

This project is licensed under the GNU AGPL v3.0 License - see LICENSE file for details.
