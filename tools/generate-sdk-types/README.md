# Generate SDK Types Tool

**Internal maintainer tool** for generating TypeScript types for the SDK from Dataverse `$metadata`.

## ⚠️ Important

This tool is **NOT** for end users. This is for SDK maintainers only.

**End users** should use `@mohsinonxrm/dataverse-sdk-generator` to generate their own business entity types (Account, Contact, etc.).

## What This Generates

This tool generates the **SDK's internal types**:

1. **Metadata API Types** → `packages/dataverse-sdk-metadata/src/types/`
   - `EntityMetadata`, `AttributeMetadata`, `RelationshipMetadata`, etc.
2. **SDK Messages** → `packages/dataverse-sdk-messages/src/`
   - One `<Name>Message.ts` per Web API action, exporting `<Name>Request` and `<Name>Response`
     (direct exports, no `CrmSdkMessages`/`XrmSdkMessages` namespaces; see ADR-0004)
3. **Typed Actions** → `packages/dataverse-sdk-actions/src/`
   - The Web API actions (bound and unbound) of the platform, Sales and Customer Service
4. **Typed Functions** → `packages/dataverse-sdk-functions/src/`
   - The Web API functions (bound and unbound) of the platform, Sales and Customer Service
   - The query functions (`LastXDays`, `In`, `Under`, …) as `queryFunctions.ts`: Dataverse runs
     them only inside `$filter`, so each is a helper that returns the expression, not a class
     (#342). `isQueryFunction` in `src/generators/query-functions-generator.ts` recognises them by
     their shape (unbound, returns `Edm.Boolean`, first parameter `PropertyName`), and `regen`
     checks that they are exactly the operations with no SDK message.
5. **Entity tables** → `packages/dataverse-sdk-entities-runtime/src/generated/entity-tables.ts`
   - The entity set and primary key of every table, which `createEntityReference` reads. The
     SDK has one `EntityReference`, hand-written in entities-runtime; the generated actions,
     functions and messages import it from there and re-export it (#295).

The actions, functions and messages are chosen by the solution each operation comes from (#304):
`metadata/operation-solutions.json` records them, and `metadata/prebuilt-solutions.json` says
which solutions are prebuilt. The [solution table](metadata/README.md#which-operations-are-prebuilt)
lists them. The other apps' operations are left to `dataverse-gen`.

### What each package root exports

Each generated `index.ts` exports the operation classes with their `<Name>Parameters`,
`<Name>Response` (and, in messages, `<Name>Result`) types, `EntityReference` and the other
entities-runtime re-exports, `EntityPayload` and `AnyEntityPayload`, the enums as values, and
(#333) the complex and entity types under `types/` (with their `Typed<Name>` unions) as a
type-only `export type { … }` list, so they add no runtime code:

```ts
import type {
  ComplexLookupAttributeMetadata,
  opportunityclose,
} from "@mohsinonxrm/dataverse-sdk-actions";
```

**Names that collide.** Dataverse declares a complex type `<Operation>Response` for an operation
with several output parameters, and the package root already exports the operation's own
`<Operation>Response`: the type `execute()` resolves, with its `@odata.context` (in messages, the
response class, whose `result` is `<Operation>Result`). That one stays, and the complex type of
the same name isn't re-exported (683 of them in actions and messages, 103 in functions, in the 2026-11-06
snapshot). No other name may collide: `rootTypeExports` throws on any other, and
`test/root-type-exports.test.ts` checks the committed packages, so a new snapshot can't shadow a
type quietly. A type whose name an operation package doesn't use is exported from it under its
CSDL name, so a complex type named for another package's operation (functions exports the complex
type `AddToQueueResponse`; actions exports the `AddToQueue` action's response) has the CSDL shape.

## Regenerating the packages (no org needed)

Everything above is generated from the committed snapshot
[`metadata/dataverse-metadata.xml`](metadata/README.md) (#293, #295):

```bash
pnpm --filter generate-sdk-types regen
```

It purges and rewrites the actions, functions and messages packages' `src/`, the metadata
package's `src/types/` and entities-runtime's `src/generated/`, formats them, and updates the
generated docs (operation lists and `<!-- count:… -->` blocks). CI runs it and fails on any diff, so change the
generator and commit the regenerated packages together. [`metadata/README.md`](metadata/README.md)
says which org the snapshot came from and how to refresh it (`pnpm --filter generate-sdk-types
snapshot`, the only step that needs an org; it also records the operations' solutions).

## Prerequisites (live `$metadata` only)

1. **Dataverse v9.2 environment** with the Dynamics 365 apps listed in
   [`metadata/README.md`](metadata/README.md)
2. **Azure AD app registration** with client credentials
3. **API permissions**: `user_impersonation` or appropriate access

## Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Configure your `.env`:

   ```bash
   DATAVERSE_URL=https://your-org.crm.dynamics.com
   AZURE_CLIENT_ID=your-client-id
   AZURE_TENANT_ID=your-tenant-id
   AZURE_CLIENT_SECRET=your-client-secret
   ```

   `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET` (the integration
   tests' names) work too.

3. Install dependencies (from repo root):
   ```bash
   pnpm install
   ```

## Usage

### Generate All SDK Types

From repo root:

```bash
pnpm sdk:generate
```

Or from this directory:

```bash
pnpm run generate
```

### Generate Specific Types

```bash
# Just metadata types
pnpm sdk:generate:metadata

# Just messages
pnpm sdk:generate:messages

# Just actions
pnpm sdk:generate:actions

# Just functions
pnpm sdk:generate:functions
```

### CLI Options

```bash
generate-sdk-types [options] [targets...]

Options:
  -c, --config <path>   Path to config file (default: sdk-gen.config.json)
  --url <url>           Dataverse URL (overrides .env)
  --dry-run             Preview what would be generated without writing files
  --save-csdl [path]    Also save the fetched $metadata, in snapshot form (default: ./dataverse-metadata.xml)
  --from-csdl <path>    Generate from a saved CSDL file instead of the live $metadata (no network)
  --csdl-only           With --save-csdl: only fetch and save, generate nothing
  --purge               Delete the existing output before generating
  -h, --help            Display help

Targets:
  metadata              Generate metadata API types
  references            Generate the entity sets and primary keys of createEntityReference
  messages              Generate SDK messages (<Name>Request / <Name>Response)
  actions               Generate typed Web API actions
  functions             Generate typed Web API functions

Examples:
  generate-sdk-types                    # Generate all
  generate-sdk-types metadata actions   # Generate metadata + actions only
  generate-sdk-types --dry-run          # Preview without writing
  generate-sdk-types actions --save-csdl  # Generate actions and keep the $metadata used
  generate-sdk-types --from-csdl metadata/dataverse-metadata.xml actions  # Offline
```

Without a config file the tool reads `DATAVERSE_URL`, `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and
`AZURE_CLIENT_SECRET`, and the output paths `METADATA_OUTPUT_PATH`, `REFERENCES_OUTPUT_PATH`,
`MESSAGES_OUTPUT_PATH`, `ACTIONS_OUTPUT_PATH` and `FUNCTIONS_OUTPUT_PATH` (defaults: the packages
below, relative to this directory).

## Output Structure

```
packages/
  dataverse-sdk-metadata/src/types/
    EntityMetadata.ts
    AttributeMetadata.ts
    RelationshipMetadata.ts
    ...

  dataverse-sdk-messages/src/          # flat: one file per action
    ExecuteWorkflowMessage.ts           # ExecuteWorkflowRequest + ExecuteWorkflowResponse
    WinOpportunityMessage.ts
    ...
    types/                              # complex types, entity types and enums from the CSDL
    index.ts                            # also re-exports EntityReference and the types/ types
    OrganizationRequest.ts, types.ts    # hand-written, not generated

  dataverse-sdk-actions/src/            # flat: one file per action
    CreateMultipleAction.ts
    ExecuteWorkflowAction.ts
    ...
    types/                              # complex types, entity types, enums, EntityPayload.ts
    index.ts                            # also re-exports EntityReference and the types/ types

  dataverse-sdk-entities-runtime/src/   # hand-written, except:
    generated/entity-tables.ts          # entity sets and primary keys for createEntityReference

  dataverse-sdk-functions/src/          # flat: one file per function
    WhoAmIFunction.ts
    ...
    internal/odataLiteral.ts            # parameter-alias literal helper (not exported)
    types/
    index.ts
```

The generated `.ts` files are committed, formatted with prettier (`.prettierignore` skips them, so
format with `prettier --ignore-path /dev/null`), and excluded from lint.

## Architecture

```
src/
  cli.ts                  # Commander CLI entry point
  regen-cli.ts            # `regen`: the three packages and the docs from the snapshot
  docs-cli.ts             # `docs`: the generated docs only
  snapshot.ts             # The snapshot form of $metadata (sorted, one element per line)
  index.ts                # Programmatic API
  config.ts               # Configuration schema (Zod)

  generators/
    metadata-generator.ts  # Generate metadata types
    messages-generator.ts  # Generate SDK messages
    actions-generator.ts   # Generate typed actions
    functions-generator.ts # Generate typed functions
    query-functions-generator.ts # The query functions as $filter helpers (#342)

  parsers/
    edmx-parser.ts        # Parse CSDL XML from $metadata
    canonical.ts          # Sort the parsed schema, so the output doesn't depend on fetch order
    csdl-types.ts         # TypeScript types for CSDL structure

  generators/complex-types-generator.ts  # types/ folder of messages, actions and functions

  utils/
    typescript-writer.ts  # CSDL-to-TypeScript type mapping, entity set lookup
    file-writer.ts        # Write files to package directories

test/
  generators.test.ts      # runs the real parser and generators on small EDMX fixtures
```

The generators build the code as strings; there are no templates (the `ejs` dependency is unused).

## Development

```bash
# Build the tool
pnpm build

# Run directly (after building)
node dist/cli.js --help
```

## Maintenance Notes

- **Source of truth**: the committed snapshot, `metadata/dataverse-metadata.xml` (#293). The
  output depends only on it: the generator sorts the parsed schema (`src/parsers/canonical.ts`),
  writes no timestamps, and `regen` formats with the repository's prettier config, so
  regenerating twice gives identical files.
- **Run frequency**: refresh the snapshot when Microsoft updates the Web API schema or adds
  actions and functions; run `regen` whenever the generator changes.
- **Git workflow**: generated files are committed, and CI checks they match `regen`'s output.
- **Versioning**: a refreshed snapshot adds and removes operations and parameters. Review the
  diff for breaking changes and list removed operations in the PR and the changeset.
- **Docs**: `regen` also updates the docs. To update only them, run
  `pnpm --filter generate-sdk-types build && pnpm --filter generate-sdk-types docs`. It rewrites the
  operation lists (`<!-- operations:… -->` blocks) and counts (`<!-- count:actions -->…<!-- /count -->`)
  in the packages' READMEs and `docs/mapping/*` from the package source;
  `test/operation-docs.test.ts` fails while one is stale or a doc names a class no package exports.
- **CI**: the `regen` drift check covers every generated file, the metadata types and the entity
  tables included (#295). To pick up changes from a live org, refresh the snapshot
  (`metadata/README.md`) and run `regen`; nothing regenerates from a live `$metadata` directly.

## Troubleshooting

**"Authentication failed"**

- Verify client credentials in `.env`
- Ensure app has API permissions

**"$metadata fetch failed"**

- Check `DATAVERSE_URL` is correct
- Ensure environment is accessible

**"No actions/functions found"**

- Verify Sales + Customer Service are installed in environment
- Check `$metadata` URL: `{DATAVERSE_URL}/api/data/v9.2/$metadata`

## Related

- **Consumer generator**: `packages/dataverse-sdk-generator` (for end users)
- **ADR**: `docs/adr/0002-typed-metadata.md`
- **Mapping docs**: `docs/mapping/supported-actions.md`, `docs/mapping/supported-functions.md`
