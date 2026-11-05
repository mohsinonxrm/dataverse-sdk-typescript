# @mohsinonxrm/dataverse-sdk-generator

Code generator for Dataverse entities, actions, and functions. Generates strongly-typed TypeScript code from `$metadata` CSDL.

## 📦 Installation

```bash
# As a dev dependency
pnpm add -D @mohsinonxrm/dataverse-sdk-generator

# Or install globally
pnpm add -g @mohsinonxrm/dataverse-sdk-generator
```

Generated code imports its base types from `@mohsinonxrm/dataverse-sdk-entities-runtime`, so add
that package (and `@mohsinonxrm/dataverse-sdk-core` for the client) to your app's dependencies:

```bash
pnpm add @mohsinonxrm/dataverse-sdk-entities-runtime @mohsinonxrm/dataverse-sdk-core
```

## 🚀 Quick Start

### 1. Initialize Configuration

```bash
pnpm dataverse-gen init
```

This creates `.dataverse-gen.json` in your project root:

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "apiVersion": "v9.2",
  "entities": ["account", "contact"],
  "actions": [],
  "functions": [],
  "output": {
    "outputRoot": "./generated",
    "generateIndex": true,
    "fileSuffix": ""
  },
  "auth": {
    "tenantId": "your-tenant-id",
    "clientId": "your-client-id",
    "flow": "deviceCode"
  }
}
```

### 2. Configure Your Settings

Edit `.dataverse-gen.json`:

- **environmentUrl**: Your Dataverse environment URL
- **entities**: Array of entity logical names to generate (empty = all)
- **actions**: Array of action names to generate (empty = all)
- **functions**: Array of function names to generate (empty = all)
- **auth**: how the generator signs in to read metadata (see [Authentication](#-authentication))

### 3. Generate Code

```bash
# Sign in with the configured auth flow
pnpm dataverse-gen generate

# Or pass an access token for the environment yourself
pnpm dataverse-gen generate --token "eyJ0eXAi..."
```

---

## 🔐 Authentication

`generate` gets a token for `<environmentUrl>/.default` through
`@mohsinonxrm/dataverse-sdk-auth-msal-node`. The token is acquired once per run, before generation
starts, and `--token` takes precedence over `auth`.

| `auth.flow`                                    | Client application                                 | Use it for                                                     |
| ---------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `"deviceCode"`                                 | public client (enable "Allow public client flows") | a developer signing in; the code is shown in the terminal      |
| `"clientCredentials"` (alias `"clientSecret"`) | confidential client with a client secret           | CI and scripts; the app must be an application user in the org |

Settings left out of `auth` are read from the environment, so the config file can be committed
without them:

| Setting             | Environment variable      |
| ------------------- | ------------------------- |
| `auth.tenantId`     | `DATAVERSE_TENANT_ID`     |
| `auth.clientId`     | `DATAVERSE_CLIENT_ID`     |
| `auth.clientSecret` | `DATAVERSE_CLIENT_SECRET` |

Keep the client secret in the environment variable rather than in the file (`validate` warns
when the file has one). For a sovereign cloud, set `auth.authority`
(e.g. `"https://login.microsoftonline.us/<tenant-id>"`).

```json
{
  "environmentUrl": "https://yourorg.crm.dynamics.com",
  "entities": ["account", "contact"],
  "auth": { "flow": "clientCredentials" }
}
```

```bash
DATAVERSE_TENANT_ID=... DATAVERSE_CLIENT_ID=... DATAVERSE_CLIENT_SECRET=... pnpm dataverse-gen generate
```

With device code, the CLI prints the sign-in instructions
("To sign in, use a web browser to open the page https://login.microsoft.com/device and enter the
code ...") and continues once you have signed in. `"interactive"` is not supported; use
`"deviceCode"`.

### 4. Use Generated Types

```typescript
import { Account, AccountMetadata } from "./generated/entities/Account.js";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const client = new DataverseClient({/* ... */});

// Type-safe entity creation
const account: Account = {
  logicalName: "account",
  name: "Contoso",
  creditlimit: 50000,
};

await client.api("/accounts").post(account);

// Use metadata
console.log(AccountMetadata.collectionName); // "accounts"
console.log(AccountMetadata.primaryIdAttribute); // "accountid"
```

---

## 📖 CLI Commands

### `init`

Initialize a new `.dataverse-gen.json` configuration file.

```bash
dataverse-gen init
```

### `generate`

Generate TypeScript code from $metadata.

```bash
dataverse-gen generate [options]

Options:
  -c, --config <path>  Path to configuration file (default: ".dataverse-gen.json")
  --token <token>      Access token to use instead of the configured auth flow
```

### `validate`

Validate your configuration file.

```bash
dataverse-gen validate [options]

Options:
  -c, --config <path>  Path to configuration file (default: ".dataverse-gen.json")
```

---

## 🔧 Configuration Reference

### Full Configuration Schema

```typescript
interface DataverseGenConfig {
  /** Dataverse environment URL */
  environmentUrl: string;

  /** API version (default: "v9.2") */
  apiVersion?: string;

  /** Entity logical names to generate (empty = all) */
  entities?: string[];

  /** Action names to generate (empty = all) */
  actions?: string[];

  /** Function names to generate (empty = all) */
  functions?: string[];

  /** Output configuration */
  output?: {
    /** Output directory (default: "./generated") */
    outputRoot?: string;

    /** Generate index barrel exports (default: true) */
    generateIndex?: boolean;

    /** File suffix (e.g., ".generated" → Account.generated.ts) */
    fileSuffix?: string;
  };

  /** How `generate` signs in (see Authentication) */
  auth?: {
    flow: "deviceCode" | "clientCredentials" | "clientSecret";
    tenantId?: string; // default: DATAVERSE_TENANT_ID
    clientId?: string; // default: DATAVERSE_CLIENT_ID
    clientSecret?: string; // default: DATAVERSE_CLIENT_SECRET
    authority?: string; // default: https://login.microsoftonline.com/<tenantId>
  };
}
```

### Filtering Entities

Generate only specific entities:

```json
{
  "entities": ["account", "contact", "opportunity", "lead"]
}
```

Generate all entities (leave empty or omit):

```json
{
  "entities": []
}
```

### Filtering Actions & Functions

```json
{
  "actions": ["WinOpportunity", "ExecuteWorkflow"],
  "functions": ["WhoAmI", "RetrieveVersion"]
}
```

---

## 📂 Generated Output Structure

```
generated/
├── entities/
│   ├── Account.ts
│   ├── Contact.ts
│   └── index.ts
├── enums/
│   ├── AccountStateCode.ts
│   ├── AccountStatusCode.ts
│   └── index.ts
├── actions/
│   ├── WinOpportunityAction.ts
│   ├── ExecuteWorkflowAction.ts
│   └── index.ts
├── functions/
│   ├── WhoAmIFunction.ts
│   └── index.ts
├── complextypes/
│   ├── AuditDetail.ts
│   └── index.ts
├── metadata.ts
└── index.ts
```

---

## 🎯 Generated Code Examples

Entity interfaces and files are named after the table's schema name (`Account`). Option-set
enums keep the option set's name (`account_industrycode`). Everything a file references is
imported, and the output type-checks under `strict`, `verbatimModuleSyntax` and `NodeNext`
(the package's tests generate code from a fixture and run the TypeScript compiler on it).

### Entity Interface

```typescript
// generated/entities/Account.ts
import type { EntityMetadata, IEntity } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { account_industrycode } from "../enums/account_industrycode.js";
import type { Contact } from "./Contact.js";

/**
 * Account entity
 * Logical Name: account
 * Entity Set: accounts
 */
export interface Account extends IEntity {
  logicalName: "account";

  /** accountid */
  accountid?: string | null;

  /** Type the company or business name. */
  name?: string | null;

  /** Select the account's primary industry. */
  industrycode?: account_industrycode | null;

  /** _primarycontactid_value */
  _primarycontactid_value?: string | null;

  /** Navigation: account_primary_contact */
  primarycontactid?: Contact;
}

export const AccountMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.account",
  logicalName: "account",
  collectionName: "accounts",
  primaryIdAttribute: "accountid",
  primaryNameAttribute: "name",
  attributeTypes: {
    accountid: "Edm.Guid",
    name: "Edm.String",
    industrycode: "Edm.Int32",
    _primarycontactid_value: "Edm.Guid",
  },
  attributes: {
    name: {
      logicalName: "name",
      schemaName: "Name",
      attributeType: "String",
      typescriptType: "string",
      odataType: "Edm.String",
      isRequired: true,
    },
    industrycode: {
      logicalName: "industrycode",
      schemaName: "IndustryCode",
      attributeType: "Picklist",
      typescriptType: "account_industrycode",
      odataType: "Edm.Int32",
      optionSetType: "account_industrycode",
    },
    // ...
  },
  navigation: {
    primarycontactid: {
      name: "primarycontactid",
      targetType: "contact",
      isCollection: false,
      relationshipName: "account_primary_contact",
    },
  },
};
```

A navigation property whose target table isn't generated (or is abstract, such as `ownerid`'s
`principal`) is typed as `IEntity`.

### Enum Type

```typescript
// generated/enums/account_industrycode.ts
export const enum account_industrycode {
  Accounting = 1,
  AgricultureAndNonPetrolNaturalResourceExtraction = 2,
  // ...
}
```

Option labels become PascalCase identifiers; a label that isn't usable (empty, or a duplicate)
falls back to `Value<n>` or gets the value appended.

### Action Class

```typescript
// generated/actions/WinOpportunityAction.ts
import {
  ActionBase,
  type IEntity,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";

export class WinOpportunityAction extends ActionBase<void> {
  constructor(
    public OpportunityClose: IEntity,
    public Caller: string | null,
    public Status: number
  ) {
    super();
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "POST",
      url: `${baseUrl}/WinOpportunity`,
      headers: { "content-type": "application/json", accept: "application/json" },
      body: {
        OpportunityClose: this.OpportunityClose,
        Caller: this.Caller,
        Status: this.Status,
      },
    };
  }

  async parseResponse(_response: Response): Promise<void> {
    // 204 No Content
  }
}
```

`ActionBase` and `FunctionBase` implement core's `Executable`, so generated operations go straight
to `client.execute()`. An operation that returns a complex type or an entity resolves to that
type; one that returns a primitive or a collection resolves to the `value` of the response:

```typescript
import { WhoAmIFunction } from "./generated/functions/WhoAmIFunction.js";

const whoAmI = await client.execute(new WhoAmIFunction()); // WhoAmIResponse
console.log(whoAmI.UserId);
```

---

## 🔌 Programmatic Usage

Use the generator programmatically in your Node.js scripts:

```typescript
import { generateCode } from "@mohsinonxrm/dataverse-sdk-generator";

const config = {
  environmentUrl: "https://org.crm.dynamics.com",
  apiVersion: "v9.2",
  entities: ["account", "contact", "opportunity"],
  actions: ["WinOpportunity", "ExecuteWorkflow"],
  functions: ["WhoAmI"],
  output: {
    outputRoot: "./src/generated",
    generateIndex: true,
  },
};

const accessToken = "your-access-token";

await generateCode(config, accessToken);

console.log("✓ Code generation complete!");
```

Without an access token, `generateCode(config)` signs in with `config.auth`, as the CLI does.
`createCliTokenProvider(config)` returns the token provider for those settings.

---

## 🧪 Integration with SDK

Generated types work seamlessly with the core SDK:

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { Account, Contact } from "./generated/index.js";

// Setup client
const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientSecret: process.env.CLIENT_SECRET!,
  },
});
const tokenProvider = new MsalNodeTokenProvider(cca, {
  flow: "clientCredentials",
  scopes: ["https://org.crm.dynamics.com/.default"],
});
const client = new DataverseClient({
  baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  tokenProvider,
});

// Type-safe CRUD operations
const account: Account = {
  logicalName: "account",
  name: "Contoso",
  creditlimit: 100000,
};

const createResponse = await client
  .api("/accounts")
  .header("Prefer", "return=representation")
  .post(account);

const createdAccount = createResponse as Account;
console.log("Created:", createdAccount.accountid);

// Type-safe queries
const accounts = await client
  .api("/accounts")
  .select(["name", "creditlimit"])
  .filter("creditlimit gt 50000")
  .get<Account[]>();

console.log(`Found ${accounts.value.length} accounts`);
```

---

## 🏗️ Architecture

The generator follows Scott Durow's proven three-phase pipeline architecture from [dataverse-gen](https://github.com/scottdurow/dataverse-gen):

### Phase 1: Load EDMX

1. **Fetch $metadata**: Retrieves CSDL XML from `/api/data/v9.2/$metadata`
2. **Parse CSDL**: Converts XML to JSON using `xml-js`
3. **Extract Schema**: Parses EntityTypes, EnumTypes, Actions, Functions, ComplexTypes from CSDL

### Phase 2: Filter

1. **Apply Configuration**: Filters entities, actions and functions based on `.dataverse-gen.json`.
   With no `entities` list, every table is generated (abstract types such as `crmbaseentity` and
   types without an entity set are skipped).
2. **Build Initial Model**: Creates PropertyType, NavigationPropertyType structures from CSDL.
   Entities that are referenced but not generated aren't pulled in; references to them are typed
   as `IEntity`.

### Phase 3: Enrich with RetrieveMetadataChanges

For each entity, the generator calls the `RetrieveMetadataChanges` function
(`GET RetrieveMetadataChanges(Query=@q)?@q={...}`) to fetch detailed metadata:

```typescript
// The Query parameter (an EntityQueryExpression)
{
  Query: {
    Criteria: {
      Conditions: [{ PropertyName: 'LogicalName', ConditionOperator: 'Equals', Value: { Value: 'account', Type: 'System.String' } }],
      FilterOperator: 'And',
    },
    Properties: { PropertyNames: ['Attributes', 'SchemaName', 'EntitySetName', 'Keys', 'PrimaryIdAttribute', 'PrimaryNameAttribute'] },
    AttributeQuery: {
      Properties: {
        PropertyNames: [
          'SchemaName', 'LogicalName', 'OptionSet', 'RequiredLevel',
          'AttributeType', 'SourceType', 'Targets', 'DisplayName', 'Description',
          // ... 20+ properties
        ]
      }
    }
  }
}
```

This enrichment enables:

- **Local Option Set Enums**: Non-global option sets generate entity-specific enums
  - Example: `account_industrycode` enum for `account.industrycode`, and the property is typed with it
  - Sorted by value, localized label extraction
  - Multi-select columns stay `string` (the Web API sends them as `"1,2"`); global option sets stay `number`

- **Polymorphic Lookup Consolidation**: Merges navigation properties
  - CSDL: `customerid_account`, `customerid_contact` (separate)
  - Generated: `customerid` with `Targets: ['account', 'contact']`
  - Metadata includes `isPolymorphic: true`

- **Calculated/Rollup Field Annotations**:
  - `SourceType: 1` → `// Calculated` comment
  - `SourceType: 2` → `// Rollup` comment
  - Metadata includes `sourceType: 'calculated' | 'rollup'`

- **Required Field Detection**:
  - `RequiredLevel.Value === 2` → `IsRequired: true`
  - Enables validation and better IntelliSense

- **Alternate Keys Support**:
  - Extracts `Keys[]` from metadata
  - Maps to `EntityKeyType` with `DisplayName`, `KeyAttributes[]`

### Type Generation

1. **Resolve Types**: Maps Dataverse types to TypeScript types
   - `Edm.String`, `Edm.Guid`, `Edm.Binary`, `Edm.Date` → `string`
   - `Edm.Int32`, `Edm.Int64`, `Edm.Decimal`, `Edm.Double` → `number`
   - `Edm.Boolean` → `boolean`, `Edm.DateTimeOffset` → `Date`
   - `mscrm.*` entity, complex and enum types → the generated type (imported), or `IEntity` for an
     entity that isn't generated
   - Lookup attributes → `_<name>_value` (`string`) plus a navigation property

2. **Generate Code**: Renders EJS templates
   - `entity.ejs` → Entity interface + runtime metadata
   - `enum.ejs` → Option set enums
   - `action.ejs` → Action classes with `parameterTypes` metadata
   - `function.ejs` → Function classes with parameter aliases
   - `metadata.ejs` → Global metadata cache and `Entities` constant

3. **Write Output**: Creates folder structure and barrel exports

---

## 🎯 Generated Code Structure

```
generated/
  entities/
    Account.ts              # Interface + AccountMetadata
    Contact.ts
    index.ts                # Barrel export
  enums/
    account_industrycode.ts # Local option set enum
    AccessRights.ts         # Enum type from $metadata
    index.ts
  actions/
    WinOpportunityAction.ts # Action class with parameterTypes
    index.ts
  functions/
    WhoAmIFunction.ts       # Function class with parameterTypes
    index.ts
  complextypes/
    WhoAmIResponse.ts
    index.ts
  metadata.ts               # Entities constant, EntityMetadataCache
  index.ts                  # Root barrel export
```

### Entity File Example: rollup columns and polymorphic lookups

```typescript
// Contact.ts (generated)
export interface Contact extends IEntity {
  logicalName: "contact";

  /** Total Spend */
  contoso_totalspend?: number | null; // Rollup

  /** Navigation: contact_customer_accounts (polymorphic: account, contact) */
  parentcustomerid?: Account | Contact;
}

export const ContactMetadata: EntityMetadata = {
  // ...
  attributeTypes: { contoso_totalspend: "Edm.Decimal" /* ... */ },
  attributes: {
    contoso_totalspend: {
      logicalName: "contoso_totalspend",
      schemaName: "contoso_TotalSpend",
      attributeType: "Money",
      typescriptType: "number",
      odataType: "Edm.Decimal",
      sourceType: "rollup",
    },
  },
  navigation: {
    parentcustomerid: {
      name: "parentcustomerid",
      fullName: "parentcustomerid",
      targetType: "account",
      isPolymorphic: true,
      targets: ["account", "contact"],
      isCollection: false,
      relationshipName: "contact_customer_accounts",
    },
  },
};
```

`attributeTypes` maps each column to its OData type; `attributes` has the details. A polymorphic
lookup's targets that are all generated give a union type; otherwise it's `IEntity`.

### Metadata File Example

```typescript
// metadata.ts (generated)
import type { EntityMetadata } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { AccountMetadata } from "./entities/Account.js";
import { ContactMetadata } from "./entities/Contact.js";
import { OpportunityMetadata } from "./entities/Opportunity.js";

export const Entities = {
  Account: "account",
  Contact: "contact",
  Opportunity: "opportunity",
} as const;

export const EntityMetadataCache: Record<string, EntityMetadata> = {
  account: AccountMetadata,
  contact: ContactMetadata,
  opportunity: OpportunityMetadata,
};

export function getEntityMetadata(logicalName: string): EntityMetadata | undefined {
  return EntityMetadataCache[logicalName];
}

export function getLogicalName(schemaName: string): string | undefined {
  return (Entities as Record<string, string>)[schemaName];
}
```

---

## 🔮 Future Enhancements

- ✅ Three-phase pipeline (Load → Filter → Enrich)
- ✅ RetrieveMetadataChanges enrichment
- ✅ Local option set enums
- ✅ Polymorphic lookup consolidation
- ✅ Calculated/rollup field annotations
- ✅ Alternate keys support
- ✅ MSAL authentication flows (device code, client credentials)
- ⏳ Create/Update type splitting (exclude read-only fields)
- ⏳ Custom template support (eject command)
- ⏳ Incremental generation (only changed entities)
- ⏳ Validation rules generation
- ⏳ Xrm.FormContext types (for model-driven apps)

---

## 🙏 Acknowledgments

This implementation is heavily inspired by [scottdurow/dataverse-gen](https://github.com/scottdurow/dataverse-gen). We adapted Scott's proven patterns:

- Three-phase pipeline architecture (Load → Filter → Enrich)
- Per-entity `RetrieveMetadataChanges` calls with `AttributeQuery`
- Polymorphic lookup consolidation logic
- Local option set enum generation strategy
- Structural property type determination for actions/functions
- Reserved keyword handling and code-safe naming

Key differences from scottdurow/dataverse-gen:

- **ESM-only** (no CommonJS output)
- **Integrates with `@mohsinonxrm/dataverse-sdk-*`** packages (HTTP-first + OrganizationService)
- **TypeScript-first** (no JavaScript transpilation output)
- **Simplified configuration** (JSON-based, no prompts)
- **AGPL v3 license** (vs MIT)

---

## 📜 License

GNU AGPL v3.0 — see [LICENSE](../../LICENSE)

---

## 🤝 Related Packages

- **[@mohsinonxrm/dataverse-sdk-entities-runtime](../dataverse-sdk-entities-runtime)** — Runtime base classes
- **[@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core)** — Core SDK client
- **[@mohsinonxrm/dataverse-sdk-metadata](../dataverse-sdk-metadata)** — Metadata operations
