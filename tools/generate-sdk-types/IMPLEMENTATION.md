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
export class WinOpportunityAction implements Executable<WinOpportunityResponse> {
  constructor(
    public readonly opportunityClose: opportunityclose,
    public readonly caller: string,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Builds POST request with body
  }

  async parseResponse(response: Response): Promise<WinOpportunityResponse> {
    // Parses JSON response
  }
}
```

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
    // Parses JSON response
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

### Nullable Handling

- In CSDL a property without the `Nullable` facet is nullable (the default is `true`). Complex-type
  and entity-type interface properties are optional (`?`) unless the CSDL says `Nullable="false"`.
- The response interfaces of actions and functions keep the properties of a complex return type
  required: Dataverse always includes them (as `null` when empty).
- Function parameters without `Nullable="false"` are optional: `?` when every later parameter is
  optional too, otherwise `T | undefined` in place. An `undefined` parameter is left out of the URL.
  Action and message parameters are still all required.

### Function parameter literals

Generated functions write each parameter alias with `formatParameterAlias(value, odataType, kind)`
from `src/internal/odataLiteral.ts`. It behaves exactly like the one in
`@mohsinonxrm/dataverse-sdk-entities-runtime` (#77), and the functions package tests it with the
same cases. Strings are quoted with `'` doubled. GUIDs and DateTimeOffsets are bare (a `Date` is
accepted). Enums are written as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, and enum parameters also
take a member name. The enums are exported as values from `types/index.ts` and from the functions
package root.

### Base types and `@odata.type`

- A complex or entity type with a generated `BaseType` extends it (`interface QueryExpression extends QueryBase`).
- A type that other types derive from also gets a `Typed<Name>` union of its concrete types (not
  `Abstract`, and not empty), each with a required `"@odata.type"` literal, for example
  `TypedQueryBase = (FetchExpression & { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression" }) | …`.
- Operation parameters declared with such a type (`QueryExpressionToFetchXml(Query: QueryBase)`)
  use the union, so the value must say which derived type it is. Dataverse rejects a `QueryBase`
  without `@odata.type` (HTTP 400, "The property 'EntityName' does not exist on type
  'Microsoft.Dynamics.CRM.QueryBase'").

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
- [x] `generate-metadata-types.yml` (manual workflow; opens a PR)

### Open

- [ ] Check the `$metadata` snapshot (or its hash and the org version) into the repo, so generation
      is reproducible and reviewable (#75)
- [ ] Regenerate all packages from one current `$metadata` and review the breaking diff
      (constructor parameter order, added and removed operations)
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
