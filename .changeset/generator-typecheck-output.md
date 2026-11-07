---
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

`dataverse-gen` now runs against a real org, and the code it generates type-checks (#78).

Generator:

- `RetrieveMetadataChanges` is called as the function it is (`GET RetrieveMetadataChanges(Query=@q)`). Before, the generator POSTed to it, Dataverse answered 404, and generation stopped at the first entity.
- `enum.ejs` used the reserved word `enum` as a variable, so rendering any enum threw. Every org has enum types in `$metadata`, so generation never got past that point.
- Types written with the schema alias (`mscrm.contact`, which is how `$metadata` refers to its own types) are resolved. Navigation properties, option sets, complex types, enums and operation parameters get their generated type, with an import; an entity that isn't generated (or an abstract one such as `crmbaseentity`) becomes `IEntity`.
- Entity interfaces and files are named after the table's schema name (`Account` in `entities/Account.ts`, with `AccountMetadata`), as the README and the CLI's own output already said. Reserved words (`import`, `package`) are made safe.
- Option labels become valid, unique enum member names (`Financial Services` becomes `FinancialServices`).
- Entity metadata now matches `EntityMetadata`: `attributeTypes` maps each column to its OData type, and the details go in `attributes`.
- Actions and functions return their result type directly: the complex type or entity for structured results, the response's `value` for primitives and collections. The `<Name>Response` wrapper interfaces (`{ result }`) are gone; they also clashed with the complex types of the same name in the root `index.ts`. (Since #300, `<Class>Response` is exported again as the type of the value itself, not a wrapper.)
- `metadata.ts` and the root `index.ts` honour `output.fileSuffix`; an empty folder gets an `export {}` index.
- With no `entities` list, only tables are generated (abstract types and types without an entity set are skipped).
- Comments and string literals are escaped, so labels with `*/` or quotes can't break the output.

Entities runtime:

- `ActionBase` and `FunctionBase` implement core's `Executable`, and `toRequestInformation()` returns core's `RequestInformation`, so generated operations can be passed to `client.execute()` without a cast. The package now depends on `@mohsinonxrm/dataverse-sdk-core` and re-exports `Executable` and `RequestInformation`. A hand-written subclass whose `toRequestInformation()` returned `method: string` must now return an `HttpMethod` (annotate the return type as `RequestInformation`).
- `AttributeMetadata` has optional `odataType`, `isRequired`, `sourceType` and `isMultiSelect`; `NavigationMetadata` has optional `fullName`, `isPolymorphic` and `targets`.
