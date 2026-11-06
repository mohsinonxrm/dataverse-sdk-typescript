# @mohsinonxrm/dataverse-sdk-functions

Typed Web API functions for Dataverse. Functions are read-only operations that execute via HTTP GET and should not have side effects.

## Features

- ✅ **229 typed functions** - Complete CSDL-generated coverage of all Dataverse Web API functions
- ✅ **Parameter aliases** - Proper query string parameter handling per Microsoft guidance
- ✅ **Type-safe responses** - Full TypeScript typing for request and response
- ✅ **Common operations** - WhoAmI, InitializeFrom, CalculateRollupField, RetrieveMetadataChanges, and more
- ✅ **Query helpers** - Fiscal period, date range, and conditional operator functions
- ✅ **Security & access** - Privilege, role, and permission retrieval functions
- ✅ **Metadata operations** - Entity, attribute, and relationship metadata functions

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

## Function Categories

The SDK includes **229 typed functions** organized into the following categories:

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

- `RetrievePrincipalAccessFunction` - Get user access rights to a record
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

### Service-Specific Functions

**Customer Service (CCaaS):**

- `CCaaS_GetAgentsFunction` - Get available agents
- `CCaaS_GetPresenceFunction` - Get agent presence status

**Sales & Marketing:**

- `msdyn_*` functions for Dynamics 365 Sales operations

**Field Service:**

- Resource scheduling and availability functions

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
import { InitializeFromFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const initFunc = new InitializeFromFunction(
  "account", // Source entity
  sourceId, // Source record ID
  "contact" // Target entity
);

const response = await client.execute(initFunc);
// response contains pre-populated contact values from account
```

#### RetrieveMetadataChanges

Retrieves metadata changes since a specific version.

**Maps to:** `GET /RetrieveMetadataChanges(...)`

**Example:**

```typescript
import { RetrieveMetadataChangesFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const metadataFunc = new RetrieveMetadataChangesFunction({
  Query: {/* EntityQueryExpression */},
  ClientVersionStamp: previousVersionStamp,
});

const response = await client.execute(metadataFunc);
```

## Parameter Values

Each parameter is sent as the OData literal of its CSDL type:

| Type                       | You pass                                                                                   | Sent as                                   |
| -------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `Edm.String`               | `"O'Brien"`                                                                                | `'O''Brien'` (quoted, every `'` doubled)  |
| `Edm.Guid`                 | `"00000000-0000-0000-0000-000000000000"`                                                   | unquoted                                  |
| `Edm.DateTimeOffset`       | an ISO string or a `Date`                                                                  | unquoted, e.g. `2026-01-01T00:00:00.000Z` |
| numbers, `Edm.Boolean`     | `85`, `false`                                                                              | `85`, `false`                             |
| enum                       | a value (`EntityFilters.Entity \| EntityFilters.Attributes`) or a member name (`"Entity"`) | `Microsoft.Dynamics.CRM.EntityFilters'3'` |
| complex types, collections | an object or array                                                                         | JSON                                      |

The enums are exported from the package root:

```typescript
import { EntityFilters, RetrieveEntityFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const { EntityMetadata } = await client.execute(
  new RetrieveEntityFunction(
    EntityFilters.Entity | EntityFilters.Attributes,
    "account", // LogicalName
    "00000000-0000-0000-0000-000000000000", // MetadataId (required by the CSDL; empty when you pass LogicalName)
    false // RetrieveAsIfPublished
  )
);
```

Parameters that the CSDL doesn't mark `Nullable="false"` are optional. They are left out of the
URL when `undefined`. A trailing one can be omitted (`new RetrieveMetadataChangesFunction()`). One
followed by a required parameter stays in its position and takes `undefined`.

## Complete Function Reference

For a complete list of all 229 functions with descriptions and examples, see [docs/mapping/supported-functions.md](../../docs/mapping/supported-functions.md).

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
// Raw function call with parameter aliases
const result = await client
  .api("/CustomFunction(Name=@Name,Count=@Count)")
  .query({ "@Name": "value", "@Count": 5 })
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
