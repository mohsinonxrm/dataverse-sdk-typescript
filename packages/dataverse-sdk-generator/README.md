# @mohsinonxrm/dataverse-sdk-generator

Code generator for Dataverse entities, actions, and functions. Generates strongly-typed TypeScript code from `$metadata` CSDL.

## 📦 Installation

```bash
# As a dev dependency
pnpm add -D @mohsinonxrm/dataverse-sdk-generator

# Or install globally
pnpm add -g @mohsinonxrm/dataverse-sdk-generator
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
- **auth**: MSAL authentication configuration

### 3. Generate Code

```bash
# With authentication flow (future implementation)
pnpm dataverse-gen generate

# With manual access token
pnpm dataverse-gen generate --token "eyJ0eXAi..."
```

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
  --token <token>      Access token (if not using auth flow)
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

  /** MSAL authentication (future feature) */
  auth?: {
    tenantId: string;
    clientId: string;
    flow: "deviceCode" | "clientSecret" | "interactive";
    clientSecret?: string;
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

### Entity Interface

```typescript
// generated/entities/Account.ts
import type { IEntity, EntityMetadata } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

export interface Account extends IEntity {
  logicalName: "account";

  /** accountid */
  accountid?: string;

  /** name */
  name?: string | null;

  /** creditlimit */
  creditlimit?: number | null;

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
    creditlimit: "Edm.Money",
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

### Enum Type

```typescript
// generated/enums/AccountStateCode.ts
export const enum AccountStateCode {
  Active = 0,
  Inactive = 1,
}
```

### Action Class

```typescript
// generated/actions/WinOpportunityAction.ts
import { ActionBase } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

export class WinOpportunityAction extends ActionBase<void> {
  constructor(
    public OpportunityClose: any,
    public Status: number
  ) {
    super();
  }

  toRequestInformation(baseUrl: string) {
    return {
      method: "POST" as const,
      url: `${baseUrl}/WinOpportunity`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        OpportunityClose: this.OpportunityClose,
        Status: this.Status,
      },
    };
  }

  async parseResponse(response: Response): Promise<void> {
    // 204 No Content
    return;
  }
}
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

---

## 🧪 Integration with SDK

Generated types work seamlessly with the core SDK:

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { Account, Contact } from "./generated/index.js";

// Setup client
const tokenProvider = new MsalNodeTokenProvider({/* ... */});
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

1. **Apply Configuration**: Filters entities based on `.dataverse-gen.json`
2. **Resolve Dependencies**: Includes entities referenced by navigation properties
3. **Build Initial Model**: Creates PropertyType, NavigationPropertyType structures from CSDL

### Phase 3: Enrich with RetrieveMetadataChanges

For each entity, the generator calls `RetrieveMetadataChanges` to fetch detailed metadata:

```typescript
// Query structure per Scott's pattern
{
  Query: {
    Criteria: { Conditions: [{ PropertyName: 'LogicalName', Value: 'account' }] },
    Properties: { PropertyNames: ['Attributes', 'SchemaName', 'EntitySetName', 'Keys'] },
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
  - Example: `Account_IndustryCode` enum for `account.industrycode`
  - Sorted by value, localized label extraction

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
   - `Edm.String` → `string`
   - `Edm.Int32` → `number`
   - `Edm.Guid` → `string`
   - Lookup attributes → navigation property

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
    Account_IndustryCode.ts # Local option set enum
    StateCode.ts            # Global option set enum
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

### Entity File Example

```typescript
// Account.ts (generated)
export interface Account extends IEntity {
  logicalName: "account";

  /** Account Name */
  name?: string;

  /** Annual Revenue */
  revenue?: number; // Calculated

  /** Industry */
  industrycode?: Account_IndustryCode; // Local enum

  /** Primary Contact (polymorphic: account, contact) */
  primarycontactid?: any;
}

export const AccountMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.account",
  logicalName: "account",
  collectionName: "accounts",
  primaryIdAttribute: "accountid",
  primaryNameAttribute: "name",
  attributeTypes: {
    accountid: { logicalName: "accountid", schemaName: "AccountId", type: "Edm.Guid" },
    name: { logicalName: "name", schemaName: "Name", type: "Edm.String", isRequired: true },
    revenue: {
      logicalName: "revenue",
      schemaName: "Revenue",
      type: "Edm.Decimal",
      sourceType: "calculated",
    },
    industrycode: {
      logicalName: "industrycode",
      schemaName: "IndustryCode",
      type: "Edm.Int32",
      enumType: "Account_IndustryCode",
    },
  },
  navigation: {
    primarycontactid: {
      name: "primarycontactid",
      targetType: "account,contact",
      isPolymorphic: true,
      targets: ["account", "contact"],
      isCollection: false,
      relationshipName: "contact_customer_accounts",
    },
  },
};
```

### Metadata File Example

```typescript
// metadata.ts (generated)
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
  return Entities[schemaName as keyof typeof Entities];
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
- ⏳ MSAL authentication flows (device code, client credentials)
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
