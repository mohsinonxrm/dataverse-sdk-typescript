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
   - `CrmSdkMessages.*` and `XrmSdkMessages.*`
3. **Typed Actions** → `packages/dataverse-sdk-actions/src/`
   - All Web API actions (bound and unbound)
4. **Typed Functions** → `packages/dataverse-sdk-functions/src/`
   - All Web API functions (bound and unbound)

## Prerequisites

1. **Dataverse v9.2 environment** with Sales + Customer Service installed
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
  -h, --help            Display help

Targets:
  metadata              Generate metadata API types
  messages              Generate SDK messages (CrmSdkMessages, XrmSdkMessages)
  actions               Generate typed Web API actions
  functions             Generate typed Web API functions

Examples:
  generate-sdk-types                    # Generate all
  generate-sdk-types metadata actions   # Generate metadata + actions only
  generate-sdk-types --dry-run          # Preview without writing
```

## Output Structure

```
packages/
  dataverse-sdk-metadata/src/types/
    EntityMetadata.ts
    AttributeMetadata.ts
    RelationshipMetadata.ts
    ...

  dataverse-sdk-messages/src/
    crm/
      ExecuteWorkflowRequest.ts
      WinOpportunityRequest.ts
      ...
    xrm/
      WhoAmIRequest.ts
      AssignRequest.ts
      ...

  dataverse-sdk-actions/src/
    CalculateRollupFieldAction.ts
    CreateMultipleAction.ts
    ExecuteWorkflowAction.ts
    MergeAction.ts
    WinOpportunityAction.ts
    ...

  dataverse-sdk-functions/src/
    WhoAmIFunction.ts
    ...
```

## Architecture

```
src/
  cli.ts                  # Commander CLI entry point
  index.ts                # Programmatic API
  config.ts               # Configuration schema (Zod)

  generators/
    metadata-generator.ts  # Generate metadata types
    messages-generator.ts  # Generate SDK messages
    actions-generator.ts   # Generate typed actions
    functions-generator.ts # Generate typed functions

  parsers/
    edmx-parser.ts        # Parse CSDL XML from $metadata
    csdl-types.ts         # TypeScript types for CSDL structure

  templates/
    metadata/             # EJS templates for metadata types
    messages/             # EJS templates for message request/response
    actions/              # EJS templates for actions
    functions/            # EJS templates for functions

  utils/
    typescript-writer.ts  # TS code generation helpers
    file-writer.ts        # Write files to package directories
```

## Development

```bash
# Build the tool
pnpm build

# Run directly (after building)
node dist/cli.js --help
```

## Maintenance Notes

- **Source of truth**: Dataverse v9.2 `$metadata` with Sales + Customer Service
- **Run frequency**: When Microsoft updates Web API schema or adds new actions/functions
- **Git workflow**: Generated files should be committed to repo
- **Versioning**: When regenerating, review diffs carefully for breaking changes

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
