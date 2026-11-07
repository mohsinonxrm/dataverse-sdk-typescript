---
"@mohsinonxrm/dataverse-sdk-generator": major
---

**Breaking.** dataverse-gen types `Edm.DateTimeOffset` as `string`, sends action bodies the way the Web API reads them, and generates inherited columns (#360, #361).

- `Edm.DateTimeOffset` is `string` wherever a value is read: entity columns, complex types and operation returns. The Web API sends ISO 8601 strings and nothing converted them, so a `Date`-typed `createdon.getTime()` compiled and threw. Action and function parameters take `string | Date`.
- Action request bodies go through a generated `internal/actionBody.ts`, as the in-repo actions do: enum values are sent as member names (`"ReadAccess, WriteAccess"`; a number got a 400), and an entity parameter is sent as an entity. A reference from `createEntityReference()` is `@odata.type` and its primary key, and a record's lookups set with an `EntityReference` become `<navigation property>@odata.bind`. Entity parameters of actions are typed `<Entity> | EntityReference`.
- Enum values inside a function's complex or collection parameter are sent as member names in the JSON parameter alias (`?@p1={"Rights":"ReadAccess"}`), through a generated `internal/functionParameters.ts` (#358). An enum parameter itself is still an enum literal.
- Complex types have their navigation properties, typed `<Entity> | EntityReference`, so `PrincipalAccess` has `Principal`.
- An entity type gets the properties and navigation properties of its base types, up to `crmbaseentity`: the activity tables (`email`, `task`, …) leave out the `activitypointer` columns in `$metadata`, so `subject`, `regardingobjectid` and the others were missing. A derived type without its own key uses its base type's.
- With no `entities` list, only types that derive from `crmbaseentity` are tables (`EntityDefinitions`, `GlobalOptionSetDefinitions` and `ManagedPropertyDefinitions` are not), and a table RetrieveMetadataChanges returns nothing for is skipped with a warning instead of failing the run.
- `dataverse-gen --version` prints the package's version, not `1.0.0`.
- Generating the `entity` table compiles: the runtime `EntityMetadata` type is imported as `RuntimeEntityMetadata` where the table's `EntityMetadata` const would clash with it.
