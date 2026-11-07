# Generator Implementation Summary

## Status

The generators are implemented, and their output is committed: 1,356 actions, 229 functions,
1,356 messages and the metadata types. `test/generators.test.ts` runs the real parser and
generators on small EDMX fixtures, and each generated package's `typecheck` compiles the committed
output. Fixes to the generators are applied to the committed files with a script, not by a full
regeneration (see README, Maintenance Notes).

## What Was Built

### 1. EDMX Parser (`src/parsers/edmx-parser.ts`)

**Functionality:**

- Parses Dataverse `$metadata` XML (EDMX/CSDL format)
- Extracts EntityTypes, ComplexTypes, EnumTypes, Actions, Functions
- Handles multiple Schema elements
- Identifies bound vs unbound operations
- Extracts properties, navigation properties, parameters

**Key Implementation Details:**

```typescript
parseEdmx(xmlContent: string): CsdlSchema
parseEntityTypes(schema): CsdlEntityType[]
parseComplexTypes(schema): CsdlComplexType[]
parseEnumTypes(schema): CsdlEnumType[]
parseActions(schema): CsdlAction[]        // Handles binding detection
parseFunctions(schema): CsdlFunction[]    // Handles binding detection
```

**Technology:**

- `fast-xml-parser` v5.x with `isArray` configuration

---

### 2. Metadata Generator (`src/generators/metadata-generator.ts`)

**Functionality:**

- Generates TypeScript interfaces for Dataverse metadata API types
- Filters types by namespace and naming patterns
- Handles inheritance via `extends`
- Marks nullable properties with `?`
- Includes navigation properties as optional references
- Emits enums as string-valued const objects plus a union type
  (`export const OwnershipTypes = { UserOwned: "UserOwned", … } as const`), because the Web API
  reads and writes enum members only by name and rejects numbers (#66, #209). Each member's JSDoc
  keeps its numeric value.
- Applies `TYPE_OVERRIDES` for what CSDL can't express: `@odata.type` on `MetadataBase`, `Label`
  and `LocalizedLabel`, a required `Label`/`LanguageCode` on `LocalizedLabel`, and a nullable
  `Label.UserLocalizedLabel`.
- Writes the hand-written files in `src/generators/metadata-helpers.ts` verbatim: the
  `RelationshipMetadataBase` and `OptionSetMetadataBase` bases (with their `RelationshipType`,
  `SecurityTypes` and `OptionSetType` enums), the action parameter shapes, and the create and
  update payloads (`*AttributeMetadataCreate`, the `AttributeMetadataCreateTypes` union
  discriminated on `@odata.type`, and the table, relationship and option set types). Edit them
  there: `test/metadata-generator.test.ts` fails when they and the committed package differ.

**Filtering Rules:**

- Namespace: `Microsoft.Dynamics.CRM`
- EntityTypes: ends with "Metadata" OR is Label/LocalizedLabel/OptionMetadata
- ComplexTypes: ends with "Metadata" OR contains "Label"/"Option"

**Output:**

- Individual `.ts` files per type
- `index.ts` with exports
- Location: `packages/dataverse-sdk-metadata/src/types/`

---

### 3. Messages Generator (`src/generators/messages-generator.ts`)

**Functionality:**

- Generates a Request/Response class pair for every Web API action (functions are not messages)
- Extends the hand-written `OrganizationRequest`/`OrganizationResponse`
- Exports the classes directly (ADR-0004); there are no `CrmSdkMessages`/`XrmSdkMessages`
  namespaces and no message mapping table

**Output:**

- `packages/dataverse-sdk-messages/src/{ActionName}Message.ts` (flat)
- `index.ts` with alphabetical exports

---

### 4. Actions Generator (`src/generators/actions-generator.ts`)

**Functionality:**

- Generates one file per Web API action
- Implements `Executable<TResponse>` pattern
- Handles bound vs unbound actions (affects URL construction)
- Builds request body from parameters (POST)
- Generates type-safe response interfaces

**Generated Class Structure:**

```typescript
/** Parameters of the WinOpportunity action, by their CSDL names. */
export interface WinOpportunityActionParameters {
  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;
  Caller?: string;
  Status: number;
}

export class WinOpportunityAction implements Executable<WinOpportunityResponse> {
  constructor(public readonly parameters: WinOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // POST with requestBody({ OpportunityClose: …, Caller: …, Status: … }): undefined ones left out
  }

  parseResponse(_response: Response): Promise<WinOpportunityResponse> {
    // WinOpportunity returns nothing: WinOpportunityResponse is void
  }
}
```

The constructor takes one `<Class>Parameters` object keyed by the CSDL parameter names, required
per `Nullable="false"` (#96). A bound action takes the record id (or, for
`Collection(mscrm.crmbaseentity)`, the entity set) as a separate first argument. The shared code
is in `src/utils/operation-parameters.ts`.

**Output:**

- `packages/dataverse-sdk-actions/src/{ActionName}Action.ts`
- `index.ts` with alphabetical exports

---

### 5. Functions Generator (`src/generators/functions-generator.ts`)

**Functionality:**

- Generates one file per Web API function
- Implements `Executable<TResponse>` pattern
- Handles bound vs unbound functions
- Builds query parameters (GET, not POST)
- Generates type-safe response interfaces

**Generated Class Structure:**

```typescript
export class WhoAmIFunction implements Executable<WhoAmIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "GET",
      url: `${baseUrl}/WhoAmI`,
      headers: { Accept: "application/json" },
    };
  }

  async parseResponse(response: Response): Promise<WhoAmIResponse> {
    // The body is the complex value, with its @odata.context
  }
}
```

**Output:**

- `packages/dataverse-sdk-functions/src/{FunctionName}Function.ts`
- `index.ts` with alphabetical exports

---

## Build Verification

```bash
pnpm --filter generate-sdk-types build   # the tool
pnpm --filter generate-sdk-types test    # parser and generator tests
pnpm typecheck                           # includes the committed generated packages
```

---

## Architecture Decisions

### Two-Tier Type System

1. **SDK Internal Types** (this tool generates):
   - Metadata API types
   - SDK Messages (Request/Response)
   - Typed Actions (Executable classes)
   - Typed Functions (Executable classes)

2. **Business Entity Types** (consumer tool):
   - Account, Contact, custom entities
   - Generated by `@mohsinonxrm/dataverse-sdk-generator` (separate package)

### Flat Structure Rationale

Actions and functions use **one file per operation** (flat structure):

- ✅ Generation-friendly (no categorization logic needed)
- ✅ Alphabetical ordering (easy to find)
- ✅ Simple imports (`import { WinOpportunityAction } from '@mohsinonxrm/dataverse-sdk-actions'`)
- ❌ No folder nesting (business/, bulk/, files/) - too complex for generation

### Binding Parameter Detection

For bound operations (actions/functions):

- **First parameter** = binding parameter
- Affects URL construction: `/{entity-set}({id})/Microsoft.Dynamics.CRM.{operation}`
- Remaining parameters go to body (actions) or query (functions)

---

## Implementation Details

### CSDL Type Mapping

```typescript
// typescript-writer.ts
csdlTypeToTs(csdlType: string): string {
  if (csdlType.startsWith('Edm.')) {
    return csdlTypeMap[csdlType] || 'unknown';
  }
  if (csdlType.startsWith('Collection(')) {
    const innerType = csdlType.slice(11, -1);
    return `${csdlTypeToTs(innerType)}[]`;
  }
  // Complex type reference
  return csdlType.split('.').pop() || 'unknown';
}
```

### Return values (#300)

`src/utils/operation-return.ts` declares `<Name>Response` (`<Name>Result` in a message) and writes
`parseResponse` for every action, function and message, so all three agree; dataverse-gen
(`packages/dataverse-sdk-generator`, `operationReturn()` in `typescript-generator.ts`) writes the
same. `execute()` resolves the value the operation returns, not the OData envelope:

| Return type                 | Web API response                                          | `<Name>Response`                                                            |
| --------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| none                        | `204 No Content`                                          | `void`                                                                      |
| primitive or enum           | `{ "@odata.context", "value": … }`                        | the value (`string` for an enum: its member name)                           |
| collection                  | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array (`[]` for a 204); entity records add `@odata.etag`, `@odata.type` |
| complex type                | the properties, with `@odata.context`                     | an interface with the properties and `@odata.context`                       |
| entity (or `crmbaseentity`) | the record, with its annotations, or 204 when unset       | `(<entity> & { annotations }) \| null`                                      |

Dataverse answers 204 for an entity or entity-collection output that wasn't set, although the CSDL
says `Nullable="false"` (checked live with a custom API whose outputs weren't set); a complex output
that wasn't set is a 200 with the properties `null`. A message's `result` is the action's value, and
`<Name>Response.fromResponse(data)` reads it from a parsed body (`undefined` for a 204).

### Nullable Handling

- In CSDL a property without the `Nullable` facet is nullable (the default is `true`). Complex-type
  and entity-type interface properties are optional (`?`) unless the CSDL says `Nullable="false"`.
- The response interfaces of actions and functions keep the properties of a complex return type
  required: Dataverse always includes them (as `null` when empty).
- Function parameters without `Nullable="false"` are optional: `?` when every later parameter is
  optional too, otherwise `T | undefined` in place. An `undefined` parameter is left out of the URL.
- Action and message parameters follow the same rule (#74); `JSON.stringify` leaves an
  `undefined` one out of the body. A message parameter named `MessageName` stays required, because
  it shadows `OrganizationRequest.messageName`.

### Entity-typed parameters

Action and message body parameters of an entity type take an entity payload or a reference
(`src/utils/entity-payload.ts`, #74). The Web API reads them as entities: a reference is the same
shape with only the primary key.

- `crmbaseentity` (any table, such as `Merge`'s `UpdateContent`): `EntityReference | AnyEntityPayload`.
- A table (`WinOpportunity`'s `OpportunityClose`): `EntityReference | EntityPayload<opportunityclose>`,
  its columns plus `@odata.type` and `<lookup>@odata.bind`.
- A collection of a table: `(EntityReference | EntityPayload<table>)[]`.
- `principal` and the other abstract system types stay `EntityReference`.

`types/EntityPayload.ts` is generated into both packages.

### One EntityReference (#295)

The SDK has one `EntityReference`, with `createEntityReference`, `getEntitySetNameFromReference`,
`EntityReferenceOptions` and `WebApiEntityReference`. They are hand-written in
`@mohsinonxrm/dataverse-sdk-entities-runtime` (`src/entity-reference.ts`), which depends only on
core, so actions, functions, messages and xrm can all depend on it without a cycle. The generated
files import the type from there (`ENTITY_REFERENCE_IMPORT` in `src/utils/entity-reference.ts`), and
each generated `index.ts` re-exports the set (`ENTITY_REFERENCE_EXPORT`), so
`import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions"` keeps working and gives
the same function as every other package. No package gets its own `EntityReference.ts`.

What the generator still owns is the data: the `references` target writes
`entities-runtime/src/generated/entity-tables.ts` (`entityTablesSource`), the entity set of every
table and the primary keys that aren't `<name>id`, so a reference sends the table's primary key
(activities: `activityid`), not `id`.

`EntityReference` carries a type-only brand (`declare const entityReferenceBrand: unique symbol`),
so only `createEntityReference` makes one, and the payload types declare `logicalName?: never` and
`entitySetName?: never` (#251). A hand-written `{ "@odata.type", logicalName, id }` would send
`logicalName` and `id`, so it doesn't type-check as any entity parameter, a function parameter
included. `WebApiEntityReference` is the JSON shape, for a reference written by hand.

### Navigation properties of complex types

Complex types can have `NavigationProperty` members, such as `PrincipalAccess.Principal` (#231). The
parser reads them, with `Nullable`, and `generateComplexTypes` writes them after the properties. In a
request body their value is an entity, so they are typed like entity-typed action parameters:

- `crmbaseentity`: `EntityReference | AnyEntityPayload`;
- a table: `EntityReference | EntityPayload<table>`, or an array of that for a collection;
- `Collection(crmbaseentity)`: `Record<string, unknown>[]`;
- `principal` and the other abstract system types: `EntityReference`.

A member is required only with `Nullable="false"`. `EntityReference` is imported from
entities-runtime in every package (#295). The functions package now also gets
`types/EntityPayload.ts`.

### Enum values in bodies

The Web API reads an enum value in a JSON body only as a string, and answers 400 to a number
("Cannot read the value '1' as a quoted JSON string value", #232). The generated enums stay numeric,
because the functions combine flags with `|`. Instead, `src/utils/enum-body.ts` writes
`internal/enumBody.ts` into the actions and messages packages. It has two tables taken from the CSDL:

- the members of each enum a body can hold, and whether it is a flags enum;
- for each complex type an action parameter can reach that holds an enum, which properties are
  enums or such complex types.

A complex type is in the second table when it holds an enum itself, through an inherited or nested
property, or through a derived type. Recursive types resolve to a fixed point.

Each body parameter whose type (or collection item type) is in a table is written as
`enumBody(this.x, "<Type>")`. `enumBody` copies the objects and arrays it changes, picks a derived
type by the value's `@odata.type`, and writes:

- a member name;
- for a flags enum, the names of its bits joined with `, `;
- or, when no member matches, the number as a string, which Dataverse also reads.

### Function parameter literals

Generated functions write each parameter alias with `formatParameterAlias(value, odataType, kind)`
from `src/internal/odataLiteral.ts`. That file only calls `odataLiteral.parameter()` in
`@mohsinonxrm/dataverse-sdk-core`, the one OData literal serializer, which `formatParameterAlias` in
`@mohsinonxrm/dataverse-sdk-entities-runtime` (#77) calls too (#254). The generator writes it from
`ODATA_LITERAL_SOURCE`, and `test/odata-literal-source.test.ts` checks that it matches the committed
file. Strings are quoted with `'` doubled. GUIDs and DateTimeOffsets are bare (a `Date` is
accepted). Enums are written as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and enum parameters also
take a member name. The enums are exported as values from `types/index.ts` and from each package
root; the complex and entity types are type-only exports of both (#333).

### Base types and `@odata.type`

- A complex or entity type with a generated `BaseType` extends it (`interface QueryExpression extends QueryBase`).
- A type that other types derive from also gets a `Typed<Name>` union of its concrete types (not
  `Abstract`, and not empty), each with a required `"@odata.type"` literal, for example
  `TypedQueryBase = (FetchExpression & { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression" }) | …`.
- Operation parameters declared with such a type (`QueryExpressionToFetchXml(Query: QueryBase)`)
  use the union, so the value must say which derived type it is. Dataverse rejects a `QueryBase`
  without `@odata.type` (HTTP 400, "The property 'EntityName' does not exist on type
  'Microsoft.Dynamics.CRM.QueryBase'").

### Overloads and supplemental operations (#75)

- `src/utils/overloads.ts`: an operation name declared with several bindings gets a class per
  binding, `<Name>_<table>` (`_collection` for a collection binding), as `packages/dataverse-sdk-generator`
  does (#202). An unbound overload keeps the plain name. A name with no unbound overload has no
  plain-name class at all (#286): the caller picks the binding, so `RetrievePrincipalAccessFunction`
  doesn't exist and `RetrievePrincipalAccess_teamFunction` and its siblings do. A definition that
  still collides gets `_2`, `_3`, … and a warning, so nothing is overwritten silently.
- `src/supplemental/supplemental-metadata.ts`: operations Dataverse runs but leaves out of
  `$metadata` (`ExportToExcel`), as EDMX. `generateTargets` merges them into the CSDL for the
  actions, functions and messages targets; an org's own definition of the same name wins.

### Namespace Filtering

All generators filter to `Microsoft.Dynamics.CRM` namespace:

```typescript
const filtered = csdl.actions.filter((a) => a.namespace === "Microsoft.Dynamics.CRM");
```

This excludes internal/system operations not meant for SDK use.

---

## Usage

### Generate All Types

```bash
# From repo root
pnpm sdk:generate
```

Runs all generators sequentially:

1. Fetches `$metadata` from Dataverse (client credentials auth)
2. Parses EDMX/CSDL
3. Generates metadata types
4. Generates messages
5. Generates actions
6. Generates functions

### Generate Specific Types

```bash
pnpm sdk:generate:metadata   # Metadata types only
pnpm sdk:generate:messages   # SDK messages only
pnpm sdk:generate:actions    # Web API actions only
pnpm sdk:generate:functions  # Web API functions only
```

### Dry Run

```bash
pnpm sdk:generate --dry-run
```

Shows what would be generated without writing files.

---

## Next Steps

### Done

- [x] Run the generator against a real v9.2 `$metadata` (the dev org)
- [x] Commit the generated types (1,356 actions, 229 functions, 1,356 messages, metadata types)
- [x] Compile check of the generated code (each package's `typecheck`)
- [x] Parser/generator tests (`test/generators.test.ts`, on small EDMX fixtures)
- [x] Snapshot refresh instead of a live-metadata workflow: `generate-metadata-types.yml` was removed (#314); refresh `metadata/` and run `regen`

### Open

- [ ] Check the `$metadata` snapshot (or its hash and the org version) into the repo, so generation
      is reproducible and reviewable (#75)
- [ ] Regenerate all packages from one current `$metadata` and review the diff (added and
      removed operations, and parameters added or made required)
- [ ] Monitor for CSDL schema changes

---

## References

- [README.md](./README.md) - User-facing documentation
- [ADR 0001: Architecture](../../docs/adr/0001-architecture.md)
- [ADR 0003: Actions and Functions](../../docs/adr/0003-actions-functions.md)
- [ADR 0004: Messages](../../docs/adr/0004-messages.md)

---

## Components

- EDMX parser, and metadata, messages, actions, functions and complex-types generators
- CLI (Commander), configuration (Zod + `.env`), authentication (Azure Identity)
- TypeScript utilities (`csdlTypeToTs`, name conversion) and file writer utilities
