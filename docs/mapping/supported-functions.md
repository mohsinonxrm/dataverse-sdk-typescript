# Supported Functions Reference

> **Package**: `@mohsinonxrm/dataverse-sdk-functions`
>
> **Coverage**: <!-- count:functions -->281<!-- /count --> typed Web API functions, generated from a Dataverse `$metadata`. The lists below are generated from the package source by `pnpm --filter generate-sdk-types docs`, so every class, constructor and route shown exists.

Functions are **GET operations** without side effects. Each function is a class whose constructor
takes the parameters **positionally, in `$metadata` order**. Run it with `client.execute(fn)`.
Parameters go in parameter aliases (`WhoAmI()`, `RetrieveTotalRecordCount(EntityNames=@p1)?@p1=…`),
formatted for their EDM type; an argument left `undefined` is left out.

## Usage

```typescript
import {
  InitializeFromFunction,
  WhoAmIFunction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-functions";

const { UserId, BusinessUnitId } = await client.execute(new WhoAmIFunction());

// A new contact pre-filled from an account, as the mapping on the account-contact relationship says
const contact = await client.execute(
  new InitializeFromFunction(
    createEntityReference("account", accountId), // EntityMoniker
    undefined, // SkipParentalRelationshipMapping
    "contact", // TargetEntityName
    "ValidForCreate" // TargetFieldType
  )
);
```

The same call through the raw API:

```typescript
const me = await client.api("WhoAmI()").get<{ UserId: string }>();
```

Bound functions take the record id first, and an operation declared with several bindings has one
class per binding (`RetrievePrincipalAccess_systemuserFunction`, `RetrievePrincipalAccess_teamFunction`).

## Platform functions

Each line shows the constructor (`?` marks an argument you can leave out) and the request it sends.

### Identity and organization

<!-- operations:functions
WhoAmI: The calling user, business unit and organization.
RetrieveVersion: The Dataverse version.
RetrieveCurrentOrganization: Details of the current organization.
RetrieveOrganizationInfo: The organization's solutions and settings.
RetrieveDeploymentLicenseType: The deployment's license type.
-->

- `new WhoAmIFunction()` (`GET /WhoAmI`): The calling user, business unit and organization.
- `new RetrieveVersionFunction()` (`GET /RetrieveVersion`): The Dataverse version.
- `new RetrieveCurrentOrganizationFunction({ AccessType })` (`GET /RetrieveCurrentOrganization`): Details of the current organization.
- `new RetrieveOrganizationInfoFunction()` (`GET /RetrieveOrganizationInfo`): The organization's solutions and settings.
- `new RetrieveDeploymentLicenseTypeFunction()` (`GET /RetrieveDeploymentLicenseType`): The deployment's license type.

<!-- /operations -->

### Records

<!-- operations:functions
InitializeFrom: A new record pre-filled from an existing one, by the relationship mapping.
RetrieveTotalRecordCount: Approximate row counts for tables.
CalculateRollupField: Recalculate a rollup column now.
RetrieveDuplicates: Records that duplicate a given record.
CalculateTotalTimeIncident: Total time spent on a case.
-->

- `new InitializeFromFunction({ EntityMoniker, SkipParentalRelationshipMapping?, TargetEntityName, TargetFieldType, RetrieveConsumableRecord? })` (`GET /InitializeFrom`): A new record pre-filled from an existing one, by the relationship mapping.
- `new RetrieveTotalRecordCountFunction({ EntityNames })` (`GET /RetrieveTotalRecordCount`): Approximate row counts for tables.
- `new CalculateRollupFieldFunction({ Target, FieldName })` (`GET /CalculateRollupField`): Recalculate a rollup column now.
- `new RetrieveDuplicatesFunction({ BusinessEntity, MatchingEntityName, PagingInfo? })` (`GET /RetrieveDuplicates`): Records that duplicate a given record.
- `new CalculateTotalTimeIncidentFunction(incidentId)` (`GET /incidents({incidentId})/Microsoft.Dynamics.CRM.CalculateTotalTimeIncident`): Total time spent on a case.

<!-- /operations -->

### Security and access

<!-- operations:functions
RetrievePrincipalAccess_systemuser: The access rights a user has to a record.
RetrievePrincipalAccess_team: The access rights a team has to a record.
RetrieveUserPrivileges: A user's privileges.
-->

- `new RetrievePrincipalAccess_systemuserFunction(systemuserId, { Target })` (`GET /systemusers({systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`): The access rights a user has to a record.
- `new RetrievePrincipalAccess_teamFunction(teamId, { Target })` (`GET /teams({teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`): The access rights a team has to a record.
- `new RetrieveUserPrivilegesFunction(systemuserId)` (`GET /systemusers({systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivileges`): A user's privileges.

<!-- /operations -->

### Metadata

<!-- operations:functions
RetrieveMetadataChanges: Metadata matching a query, and what changed since a version stamp.
RetrieveAllEntities: All table definitions.
RetrieveEntity: One table definition.
GetValidReferencedEntities: Tables that can be the primary table of a 1:N relationship.
GetValidReferencingEntities: Tables that can be the related table of a 1:N relationship.
RetrieveFilteredForms: The forms a user can see for a table.
IsComponentCustomizable: Whether a solution component can be customized.
-->

- `new RetrieveMetadataChangesFunction({ Query?, DeletedMetadataFilters?, ClientVersionStamp?, AppModuleId?, RetrieveAllSettings? })` (`GET /RetrieveMetadataChanges`): Metadata matching a query, and what changed since a version stamp.
- `new RetrieveAllEntitiesFunction({ EntityFilters, RetrieveAsIfPublished })` (`GET /RetrieveAllEntities`): All table definitions.
- `new RetrieveEntityFunction({ EntityFilters, LogicalName?, MetadataId, RetrieveAsIfPublished })` (`GET /RetrieveEntity`): One table definition.
- `new GetValidReferencedEntitiesFunction({ ReferencingEntityName? })` (`GET /GetValidReferencedEntities`): Tables that can be the primary table of a 1:N relationship.
- `new GetValidReferencingEntitiesFunction({ ReferencedEntityName? })` (`GET /GetValidReferencingEntities`): Tables that can be the related table of a 1:N relationship.
- `new RetrieveFilteredFormsFunction({ EntityLogicalName, FormType, User })` (`GET /systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms`): The forms a user can see for a table.
- `new IsComponentCustomizableFunction({ ComponentId, ComponentType })` (`GET /IsComponentCustomizable`): Whether a solution component can be customized.

<!-- /operations -->

### Solutions

<!-- operations:functions
RetrieveDependentComponents: Components that depend on a component.
RetrieveRequiredComponents: Components a component needs.
RetrieveMissingDependencies: Components a solution needs that the org lacks.
RetrieveAppComponents: The components of an app.
RetrieveUnpublished_savedquery: The unpublished version of a view (one class per binding).
-->

- `new RetrieveDependentComponentsFunction({ ObjectId, ComponentType })` (`GET /RetrieveDependentComponents`): Components that depend on a component.
- `new RetrieveRequiredComponentsFunction({ ObjectId, ComponentType })` (`GET /RetrieveRequiredComponents`): Components a component needs.
- `new RetrieveMissingDependenciesFunction({ SolutionUniqueName })` (`GET /RetrieveMissingDependencies`): Components a solution needs that the org lacks.
- `new RetrieveAppComponentsFunction({ AppModuleId })` (`GET /RetrieveAppComponents`): The components of an app.
- `new RetrieveUnpublished_savedqueryFunction(savedqueryId)` (`GET /savedqueries({savedqueryId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`): The unpublished version of a view (one class per binding).

<!-- /operations -->

### Time, languages and queries

<!-- operations:functions
LocalTimeFromUtcTime: Convert UTC to a time zone's local time.
UtcTimeFromLocalTime: Convert a time zone's local time to UTC.
GetTimeZoneCodeByLocalizedName: The time zone code for a localized name.
GetAllTimeZonesWithDisplayName: All time zones with their display names.
ExpandCalendar: The time blocks of a calendar in a range.
RetrieveAvailableLanguages: Languages that can be provisioned.
RetrieveProvisionedLanguages: Provisioned languages.
FetchXmlToQueryExpression: Convert FetchXML to a `QueryExpression`.
ValidateFetchXmlExpression: Validate a FetchXML query.
FormatAddress: Format an address for a country.
IsValidStateTransition: Whether a record can move to a state and status.
-->

- `new LocalTimeFromUtcTimeFunction({ TimeZoneCode, UtcTime })` (`GET /LocalTimeFromUtcTime`): Convert UTC to a time zone's local time.
- `new UtcTimeFromLocalTimeFunction({ TimeZoneCode, LocalTime })` (`GET /resourcegroups/Microsoft.Dynamics.CRM.UtcTimeFromLocalTime`): Convert a time zone's local time to UTC.
- `new GetTimeZoneCodeByLocalizedNameFunction({ LocalizedStandardName, LocaleId })` (`GET /GetTimeZoneCodeByLocalizedName`): The time zone code for a localized name.
- `new GetAllTimeZonesWithDisplayNameFunction({ LocaleId })` (`GET /timezonedefinitions/Microsoft.Dynamics.CRM.GetAllTimeZonesWithDisplayName`): All time zones with their display names.
- `new ExpandCalendarFunction(calendarId, { Start, End })` (`GET /calendars({calendarId})/Microsoft.Dynamics.CRM.ExpandCalendar`): The time blocks of a calendar in a range.
- `new RetrieveAvailableLanguagesFunction()` (`GET /RetrieveAvailableLanguages`): Languages that can be provisioned.
- `new RetrieveProvisionedLanguagesFunction()` (`GET /RetrieveProvisionedLanguages`): Provisioned languages.
- `new FetchXmlToQueryExpressionFunction({ FetchXml })` (`GET /FetchXmlToQueryExpression`): Convert FetchXML to a `QueryExpression`.
- `new ValidateFetchXmlExpressionFunction({ FetchXml })` (`GET /ValidateFetchXmlExpression`): Validate a FetchXML query.
- `new FormatAddressFunction({ Line1, City, StateOrProvince, PostalCode, Country })` (`GET /FormatAddress`): Format an address for a country.
- `new IsValidStateTransitionFunction({ Entity, NewState, NewStatus })` (`GET /IsValidStateTransition`): Whether a record can move to a state and status.

<!-- /operations -->

### Sales and knowledge

<!-- operations:functions
GetDefaultPriceLevel: The default price list for a user.
SearchByKeywordsKbArticle: Knowledge articles matching keywords.
-->

- `new GetDefaultPriceLevelFunction({ EntityName })` (`GET /pricelevels/Microsoft.Dynamics.CRM.GetDefaultPriceLevel`): The default price list for a user.
- `new SearchByKeywordsKbArticleFunction({ SearchText, Subject, UseInflection })` (`GET /kbarticles/Microsoft.Dynamics.CRM.SearchByKeywordsKbArticle`): Knowledge articles matching keywords.

<!-- /operations -->

## Query functions in `$filter`

The package also has classes for the query functions (`LastXDaysFunction`, `InFiscalYearFunction`,
`UnderFunction`, `EqualUserIdFunction`, …), because `$metadata` declares them as functions. Dataverse
only accepts them inside `$filter`, written with the column as `PropertyName`:

```typescript
const recent = await client
  .api("accounts")
  .filter("Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=30)")
  .get();
```

See [Query functions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/reference/queryfunctions)
for the list. Calling one of these classes with `client.execute` fails, as it does for any client.

## Related documentation

- [Use Web API functions](https://learn.microsoft.com/power-apps/developer/data-platform/webapi/use-web-api-functions)
- [supported-actions.md](./supported-actions.md), [supported-messages.md](./supported-messages.md)
