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
   - All Web API actions (bound and unbound)
4. **Typed Functions** → `packages/dataverse-sdk-functions/src/`
   - All Web API functions (bound and unbound)

## Regenerating the packages (no org needed)

The actions, functions and messages packages are generated from the committed snapshot
[`metadata/dataverse-metadata.xml`](metadata/README.md) (#293):

```bash
pnpm --filter generate-sdk-types regen
```

It purges and rewrites the three packages' `src/`, formats them, and updates the generated docs
(operation lists and `<!-- count:… -->` blocks). CI runs it and fails on any diff, so change the
generator and commit the regenerated packages together. [`metadata/README.md`](metadata/README.md)
says which org the snapshot came from and how to refresh it (`pnpm --filter generate-sdk-types
snapshot`, the only step that needs an org).

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
`AZURE_CLIENT_SECRET`, and the output paths `METADATA_OUTPUT_PATH`, `MESSAGES_OUTPUT_PATH`,
`ACTIONS_OUTPUT_PATH` and `FUNCTIONS_OUTPUT_PATH` (defaults: the packages below, relative to this
directory).

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
    index.ts
    OrganizationRequest.ts, types.ts    # hand-written, not generated
    EntityReference.ts                  # references with the CSDL primary keys (generated)

  dataverse-sdk-actions/src/            # flat: one file per action
    CreateMultipleAction.ts
    ExecuteWorkflowAction.ts
    ...
    types/                              # complex types, entity types, enums, EntityReference.ts, EntityPayload.ts
    index.ts

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
- **CI**: `.github/workflows/generate-metadata-types.yml` (manual) regenerates the metadata types
  and opens a PR for review.

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
