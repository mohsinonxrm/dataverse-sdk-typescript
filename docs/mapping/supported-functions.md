# Supported Functions Reference

Complete reference of all **229 typed Web API functions** available in `@mohsinonxrm/dataverse-sdk-functions`.

Functions are **read-only operations** that execute via HTTP GET and should not have side effects.

## Usage Patterns

### Using Typed Functions (Recommended)

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction, InitializeFromFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const client = new DataverseClient({ baseUrl, tokenProvider });

// Execute WhoAmI
const whoAmI = new WhoAmIFunction();
const userInfo = await client.execute(whoAmI);
console.log("User ID:", userInfo.UserId);

// Execute InitializeFrom
const initFunc = new InitializeFromFunction("account", accountId, "contact");
const prepopulatedContact = await client.execute(initFunc);
```

### Using Raw API

```typescript
// WhoAmI via raw API
const userInfo = await client.api("/WhoAmI").get();

// InitializeFrom via raw API. The builder has no method for parameter aliases, so they go in
// the path's query string (the builder adds its own query options, such as $select, to it).
const p1 = encodeURIComponent(JSON.stringify({ "@odata.id": `accounts(${accountId})` }));
const contact = await client
  .api(
    "/InitializeFrom(EntityMoniker=@p1,TargetEntityName=@p2,TargetFieldType=@p3)" +
      `?@p1=${p1}&@p2='contact'&@p3=Microsoft.Dynamics.CRM.TargetFieldType'ValidForCreate'`
  )
  .get();
```

## Platform Functions (Available in All Environments)

### Identity & Context

| Function                              | Description                  | Response                                     |
| ------------------------------------- | ---------------------------- | -------------------------------------------- |
| `WhoAmIFunction`                      | Get current user information | `{ UserId, BusinessUnitId, OrganizationId }` |
| `RetrieveCurrentOrganizationFunction` | Get organization details     | Organization entity                          |
| `RetrieveVersionFunction`             | Get Dataverse version        | `{ Version }`                                |
| `RetrieveOrganizationInfoFunction`    | Get org info for discovery   | Organization metadata                        |

**Example:**

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmI = new WhoAmIFunction();
const { UserId, BusinessUnitId, OrganizationId } = await client.execute(whoAmI);
```

### Entity Operations

| Function                                 | Description                 | Parameters                           |
| ---------------------------------------- | --------------------------- | ------------------------------------ |
| `InitializeFromFunction`                 | Create record from template | sourceEntity, sourceId, targetEntity |
| `CalculateRollupFieldFunction`           | Calculate rollup value      | entity, id, fieldName                |
| `RetrieveRecordChangeHistoryFunction`    | Get audit history           | entity, id                           |
| `RetrieveAttributeChangeHistoryFunction` | Get attribute audit history | entity, id, attribute                |

**Example:**

```typescript
import { InitializeFromFunction } from "@mohsinonxrm/dataverse-sdk-functions";

// Create contact from account template
const init = new InitializeFromFunction("account", accountId, "contact");
const prepopulated = await client.execute(init);
// Use prepopulated values to create contact
await client.api("contacts").post(prepopulated);
```

### Security & Access

| Function                                       | Description               | Response             |
| ---------------------------------------------- | ------------------------- | -------------------- |
| `RetrievePrincipalAccessFunction`              | Get user access to record | `{ AccessRights }`   |
| `RetrieveSharedPrincipalsAndAccessFunction`    | Get sharing details       | Array of principals  |
| `RetrieveUserPrivilegesFunction`               | Get user privileges       | Array of privileges  |
| `RetrieveTeamPrivilegesFunction`               | Get team privileges       | Array of privileges  |
| `RetrieveUserQueuesFunction`                   | Get user's queues         | Array of queues      |
| `RetrievePrincipalAttributePrivilegesFunction` | Get field-level security  | Attribute privileges |

**Example:**

```typescript
import { RetrievePrincipalAccessFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const accessFunc = new RetrievePrincipalAccessFunction("account", accountId);
const access = await client.execute(accessFunc);
console.log("Access Rights:", access.AccessRights); // e.g., "ReadAccess,WriteAccess"
```

### Metadata Functions

| Function                              | Description         | Use Case                 |
| ------------------------------------- | ------------------- | ------------------------ |
| `RetrieveMetadataChangesFunction`     | Get metadata delta  | Track schema changes     |
| `RetrieveEntityFunction`              | Get entity metadata | Single entity details    |
| `RetrieveAllEntitiesFunction`         | Get all entities    | Full schema discovery    |
| `GetValidReferencedEntitiesFunction`  | Get lookup targets  | Relationship eligibility |
| `GetValidReferencingEntitiesFunction` | Get lookup sources  | Relationship eligibility |
| `GetValidManyToManyFunction`          | Get N:N candidates  | Relationship creation    |

**Example:**

```typescript
import { RetrieveMetadataChangesFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const metadataFunc = new RetrieveMetadataChangesFunction({
  Query: {
    Criteria: {
      FilterOperator: "And",
      Conditions: [{ PropertyName: "LogicalName", ConditionOperator: "Equals", Value: "account" }],
    },
    Properties: { AllProperties: false, PropertyNames: ["DisplayName", "Attributes"] },
  },
  ClientVersionStamp: previousVersionStamp, // null for first call
});

const { EntityMetadata, ServerVersionStamp } = await client.execute(metadataFunc);
// Store ServerVersionStamp for next call to get only changes
```

## Query Helper Functions

### Fiscal Period Operators

| Function                        | Description        | Use in $filter                                            |
| ------------------------------- | ------------------ | --------------------------------------------------------- |
| `InFiscalPeriodFunction`        | In fiscal period   | `createdon/InFiscalPeriod(@p1)?@p1=2`                     |
| `InFiscalYearFunction`          | In fiscal year     | `createdon/InFiscalYear(@p1)?@p1=2024`                    |
| `InFiscalPeriodAndYearFunction` | In period and year | `createdon/InFiscalPeriodAndYear(@p1,@p2)?@p1=2&@p2=2024` |
| `LastFiscalPeriodFunction`      | Last fiscal period | `createdon/LastFiscalPeriod()`                            |
| `LastFiscalYearFunction`        | Last fiscal year   | `createdon/LastFiscalYear()`                              |
| `NextFiscalPeriodFunction`      | Next fiscal period | `createdon/NextFiscalPeriod()`                            |
| `ThisFiscalPeriodFunction`      | This fiscal period | `createdon/ThisFiscalPeriod()`                            |
| `ThisFiscalYearFunction`        | This fiscal year   | `createdon/ThisFiscalYear()`                              |

These are primarily used in `$filter` expressions for queries, not as standalone function calls.

### Date Range Operators

| Function                 | Description       | Use in $filter                         |
| ------------------------ | ----------------- | -------------------------------------- |
| `TodayFunction`          | Today             | `createdon/Today()`                    |
| `TomorrowFunction`       | Tomorrow          | `createdon/Tomorrow()`                 |
| `YesterdayFunction`      | Yesterday         | `createdon/Yesterday()`                |
| `ThisWeekFunction`       | This week         | `createdon/ThisWeek()`                 |
| `ThisMonthFunction`      | This month        | `createdon/ThisMonth()`                |
| `ThisYearFunction`       | This year         | `createdon/ThisYear()`                 |
| `Last7DaysFunction`      | Last 7 days       | `createdon/Last7Days()`                |
| `LastWeekFunction`       | Last week         | `createdon/LastWeek()`                 |
| `LastMonthFunction`      | Last month        | `createdon/LastMonth()`                |
| `LastXDaysFunction`      | Last X days       | `createdon/LastXDays(@p1)?@p1=30`      |
| `LastXHoursFunction`     | Last X hours      | `createdon/LastXHours(@p1)?@p1=24`     |
| `OlderThanXDaysFunction` | Older than X days | `createdon/OlderThanXDays(@p1)?@p1=90` |

### Conditional Operators

| Function                  | Description                  | Use in $filter                                  |
| ------------------------- | ---------------------------- | ----------------------------------------------- |
| `BetweenFunction`         | Between two values           | `revenue/Between(@p1,@p2)?@p1=1000&@p2=5000`    |
| `NotBetweenFunction`      | Not between values           | `revenue/NotBetween(@p1,@p2)?@p1=1000&@p2=5000` |
| `ContainsFunction`        | Contains value               | `name/Contains(@p1)?@p1='Contoso'`              |
| `UnderFunction`           | In hierarchy under           | `accountid/Under(@p1)?@p1=<guid>`               |
| `UnderOrEqualFunction`    | In or under hierarchy        | `accountid/UnderOrEqual(@p1)?@p1=<guid>`        |
| `AboveFunction`           | In hierarchy above           | `accountid/Above(@p1)?@p1=<guid>`               |
| `EqualUserIdFunction`     | Equals current user          | `ownerid/EqualUserId()`                         |
| `EqualBusinessIdFunction` | Equals current business unit | `owningbusinessunit/EqualBusinessId()`          |

## Service-Specific Functions

### Customer Service (CCaaS)

| Function                                       | Description          | Use Case              |
| ---------------------------------------------- | -------------------- | --------------------- |
| `CCaaS_GetAgentsFunction`                      | Get available agents | Agent routing         |
| `CCaaS_GetPresenceFunction`                    | Get agent presence   | Availability checking |
| `CCaaS_GetAgentsForConsultAndTransferFunction` | Get consult targets  | Transfer operations   |

**Requires:** Omnichannel for Customer Service

### Sales & Marketing

| Function                                   | Description                    |
| ------------------------------------------ | ------------------------------ |
| `msdyn_GetSwarmParticipantDetailsFunction` | Get swarm participants         |
| `msdyn_SelectNotToExceedFunction`          | Calculate select not-to-exceed |

**Requires:** Dynamics 365 Sales

### Utility Functions

| Function                                 | Description                 | Response                 |
| ---------------------------------------- | --------------------------- | ------------------------ |
| `ExpandCalendarFunction`                 | Expand calendar to dates    | Array of date/time slots |
| `QueryScheduleFunction`                  | Query schedule availability | Available time slots     |
| `LocalTimeFromUtcTimeFunction`           | Convert UTC to local        | Local date/time          |
| `UtcTimeFromLocalTimeFunction`           | Convert local to UTC        | UTC date/time            |
| `FormatAddressFunction`                  | Format address string       | Formatted address        |
| `GetAllTimeZonesWithDisplayNameFunction` | Get time zones              | Time zone list           |

## Search Functions

| Function                                 | Description            | Use Case       |
| ---------------------------------------- | ---------------------- | -------------- |
| `SearchFunction`                         | Search across entities | Global search  |
| `SearchByKeywordsKbArticleFunction`      | Search KB by keywords  | Knowledge base |
| `SearchByTitleKbArticleFunction`         | Search KB by title     | Knowledge base |
| `FullTextSearchKnowledgeArticleFunction` | Full-text KB search    | Knowledge base |

## Advanced Platform Functions

### Deployment & Licensing

| Function                                 | Description                  |
| ---------------------------------------- | ---------------------------- |
| `RetrieveLicenseInfoFunction`            | Get license information      |
| `RetrieveDeploymentLicenseTypeFunction`  | Get deployment license       |
| `RetrieveAvailableLanguagesFunction`     | Get available languages      |
| `RetrieveInstalledLanguagePacksFunction` | Get installed language packs |

### Solution & Component Management

| Function                                | Description                    |
| --------------------------------------- | ------------------------------ |
| `RetrieveDependenciesForDeleteFunction` | Get delete dependencies        |
| `RetrieveDependentComponentsFunction`   | Get dependent components       |
| `RetrieveRequiredComponentsFunction`    | Get required components        |
| `RetrieveMissingComponentsFunction`     | Get missing components         |
| `RetrieveUnpublishedFunction`           | Get unpublished customizations |

## Complete Function List

For a searchable list of all 229 functions, use the TypeScript exports:

```typescript
import * as Functions from "@mohsinonxrm/dataverse-sdk-functions";

// List all available functions
Object.keys(Functions)
  .filter((key) => key.endsWith("Function"))
  .forEach((func) => console.log(func));
```

## Related Documentation

- [Supported Actions](./supported-actions.md) - POST operations with side effects
- [Supported Messages](./supported-messages.md) - Organization Service message pattern
- [Supported Operations](./supported-operations.md) - Complete SDK reference
- [ADR 0003: Actions & Functions](../adr/0003-actions-functions.md)
