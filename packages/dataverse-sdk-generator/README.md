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
- **functions**: Array of function names to generate (empty = all, without the query functions; see [Query functions](#query-functions))
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

<!-- no-check -->

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  createEntityReference,
  formatEntityForWrite,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type Account, AccountMetadata } from "./generated/entities/Account.js";
import { EntityMetadataCache } from "./generated/metadata.js";

const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });

// Type-safe entity creation. Lookups take an EntityReference.
const account: Account = {
  name: "Contoso",
  creditlimit: 50000,
  primarycontactid: createEntityReference("contact", contactId),
};

// formatEntityForWrite adds @odata.type and turns the lookup into
// "primarycontactid@odata.bind": "/contacts(<id>)"
const accountId = await client
  .api(`/${AccountMetadata.collectionName}`)
  .createAndGetId(
    formatEntityForWrite(account, AccountMetadata, { metadataCache: EntityMetadataCache })
  );

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
  --strict-nulls       Type operation responses exactly as $metadata declares them
                       (the same as "strictNulls": true; see Strict nulls)
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

  /** Type operation responses exactly as $metadata declares them (default: false; see Strict nulls) */
  strictNulls?: boolean;

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

"All entities" means every table: an entity type that derives from `crmbaseentity`, isn't
abstract and has an entity set. The metadata sets (`EntityDefinitions`,
`GlobalOptionSetDefinitions`, `ManagedPropertyDefinitions`) are left out, and a table that
`RetrieveMetadataChanges` returns nothing for is skipped with a warning. References to an entity
that isn't generated are typed `IEntity`.

An entity type gets the columns and navigation properties of its base types: the activity tables
(`email`, `task`, …) derive from `activitypointer`, and `$metadata` declares `subject`,
`regardingobjectid` and the other activity columns only there.

### Filtering Actions & Functions

```json
{
  "actions": ["WinOpportunity", "ExecuteWorkflow"],
  "functions": ["WhoAmI", "RetrieveVersion"]
}
```

### Query functions

The Web API's query functions (`LastXDays`, `Between`, `In`, `Under`, `EqualUserId`, …) are
declared as functions in `$metadata`, but Dataverse runs them only inside `$filter`, so dataverse-gen
doesn't generate them, even when `functions` lists them (the CLI prints a warning for each listed
one). Use `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions` instead:

```typescript
import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

await client
  .api("accounts")
  .filter(queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }))
  .get();
```

A function is treated as a query function when it is unbound, returns `Edm.Boolean`, takes
`PropertyName` (`Edm.String`) first, and has no `_` in its name. Custom APIs always have a publisher
prefix (`contoso_IsVip`), so they are generated.

### Strict nulls

`"strictNulls": true` in the configuration file, `--strict-nulls` on `generate`, or
`strictNulls: true` in the config passed to `generateCode()` types operation responses exactly as
`$metadata` declares them. It's off by default, and without it the output is the same as before.

By default a complex type's properties are all optional, and `T | null` unless the CSDL declares
them `Nullable="false"`, so reading one means handling both `undefined` and `null`. The Web API
sends every property of a returned complex type, though, with `null` for an output that wasn't set.
With strict nulls, each complex type an operation returns (directly, nested in another one, or as
a base type) also gets a `<Name>Output` interface with that exact shape, and `<Class>Response` uses
it:

<!-- no-check -->

```typescript
// $metadata
// <ComplexType Name="contoso_AssessResponse">
//   <Property Name="Score" Type="Edm.Int32" Nullable="false" />
//   <Property Name="Reason" Type="Edm.String" />
//   <Property Name="Detail" Type="mscrm.contoso_AssessDetail" />
// </ComplexType>

// Default
export interface contoso_AssessResponse {
  Score?: number;
  Reason?: string | null;
  Detail?: contoso_AssessDetail | null;
}
export interface contoso_AssessFunctionResponse extends contoso_AssessResponse {
  "@odata.context"?: string;
}

// strictNulls: contoso_AssessResponse stays as it is, and the response uses the Output interface
export interface contoso_AssessResponseOutput {
  Score: number; // Nullable="false"
  Reason: string | null; // an output that wasn't set is null
  Detail: contoso_AssessDetailOutput | null; // nested complex types get an Output interface too
}
export interface contoso_AssessFunctionResponse extends contoso_AssessResponseOutput {
  "@odata.context"?: string;
}
```

<!-- no-check -->

```typescript
const result = await client.execute(new contoso_AssessFunction());
result.Score.toFixed(0); // number
result.Reason?.trim(); // string | null: check for null, there's no undefined
```

The same option applies to the other kinds of return, where the CSDL says whether a value can be
null:

| Return in `$metadata`                                 | Default                     | `strictNulls`                                           |
| ----------------------------------------------------- | --------------------------- | ------------------------------------------------------- |
| complex type, `Nullable="false"` (all of Dataverse's) | `extends <ComplexType>`     | `extends <ComplexType>Output`                           |
| complex type without `Nullable="false"`               | `extends <ComplexType>`     | `(<ComplexType>Output & { … }) \| null` (204 is `null`) |
| primitive or enum without `Nullable="false"`          | `string`, `number`, …       | `string \| null`, … (204 is `null`)                     |
| collection without `Nullable="false"`                 | `string[]`, `<Complex>[]`   | `Array<string \| null>`: the items can be null          |
| entity, or a collection of entities                   | `<Entity> \| null`, records | the same                                                |

Every return in Dataverse's `$metadata` is `Nullable="false"`, so in practice the option changes
complex responses; the other rows matter for a CSDL that leaves returns nullable.

Parameters don't change: they keep the `<ComplexType>` interfaces, whose properties are optional,
so a caller sends only what it sets. Strict nulls is about values you read; an input you build
doesn't have to spell out every property as `null`. An Output name that's already taken (a
complex type called `<Name>Output`) gets a suffix (`<Name>Output_2`).

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
├── internal/
│   └── actionBody.ts   # bodyValue(): enum names and entities in action bodies (not exported)
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

<!-- no-check -->

```typescript
// generated/entities/Account.ts
import type {
  EntityMetadata,
  EntityReference,
  IEntity,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { account_industrycode } from "../enums/account_industrycode.js";
import type { Contact } from "./Contact.js";

/**
 * Account entity
 * Logical Name: account
 * Entity Set: accounts
 */
export interface Account extends IEntity {
  /** accountid */
  accountid?: string | null;

  /** Type the company or business name. */
  name?: string | null;

  /** Select the account's primary industry. */
  industrycode?: account_industrycode | null;

  /** _primarycontactid_value */
  _primarycontactid_value?: string | null;

  /** Navigation: account_primary_contact */
  primarycontactid?: Contact | EntityReference;
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
      requiredLevel: "ApplicationRequired",
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

A single-valued navigation property is the related record when you read it (with `$expand`) or
an `EntityReference` when you write it. A target table that isn't generated (or is abstract,
such as `ownerid`'s `principal`) is typed as `IEntity`. Interfaces have no `logicalName`: the Web
API rejects unknown properties, and the metadata already names the table.

Date-and-time columns (`Edm.DateTimeOffset`) are `string`: the Web API returns ISO 8601 strings
(`"2024-05-01T10:00:00Z"`), and nothing converts them. Use `new Date(account.createdon)` when you
need a `Date`. Operation parameters take a `string` or a `Date`.

When the `entity` table is generated, its metadata const is `EntityMetadata`, so `Entity.ts` and
`metadata.ts` import the runtime type as `RuntimeEntityMetadata`.

### Enum Type

<!-- no-check -->

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

<!-- no-check -->

```typescript
// generated/actions/WinOpportunityAction.ts
import {
  ActionBase,
  type EntityReference,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { OpportunityClose } from "../entities/OpportunityClose.js";
import { bodyValue } from "../internal/actionBody.js";

/** Parameters of the WinOpportunity action, by their CSDL names. */
export interface WinOpportunityActionParameters {
  OpportunityClose: OpportunityClose | EntityReference;
  Status: number;
}

export class WinOpportunityAction extends ActionBase<void> {
  constructor(public readonly parameters: WinOpportunityActionParameters) {
    super();
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // The parameters by their CSDL names; an undefined one isn't sent. Enum values are sent as
    // member names, and entities with their lookups as @odata.bind (bodyValue).
    const body: Record<string, unknown> = {};
    if (this.parameters.OpportunityClose !== undefined)
      body["OpportunityClose"] = bodyValue(this.parameters.OpportunityClose, "opportunityclose");
    if (this.parameters.Status !== undefined) body["Status"] = this.parameters.Status;

    return {
      method: "POST",
      url: `${baseUrl}/WinOpportunity`,
      headers: { "content-type": "application/json", accept: "application/json" },
      body,
    };
  }

  parseResponse(_response: Response): Promise<void> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}

await client.execute(
  new WinOpportunityAction({
    OpportunityClose: {
      subject: "Won",
      opportunityid: createEntityReference("opportunity", opportunityId),
    },
    Status: 3,
  })
);
// Body: { "OpportunityClose": { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
//   "subject": "Won", "opportunityid@odata.bind": "/opportunities(<id>)" }, "Status": 3 }
```

The request body is what the Web API reads, as the classes in `@mohsinonxrm/dataverse-sdk-actions`
send it. Parameters that can hold an enum or an entity go through `bodyValue()`, from the generated
`internal/actionBody.ts`:

- an enum value is sent as its member name: `AccessRights.ReadAccess | AccessRights.WriteAccess`
  becomes `"ReadAccess, WriteAccess"` (the Web API rejects a number), also inside complex types
  such as `GrantAccess`'s `PrincipalAccess.AccessMask`;
- an entity parameter takes an `EntityReference` or a record. A reference is sent as `@odata.type`
  and its primary key. A record of a generated table goes through `formatEntityForWrite()`
  (`@odata.type`, and a lookup set with an `EntityReference` becomes
  `<navigation property>@odata.bind`); a record of another table keeps its properties, with
  references turned into binds the same way. A complex type's navigation property, such as
  `PrincipalAccess.Principal`, is sent the same way.

The constructor takes one object with the operation's parameters, keyed by their CSDL names and
typed as `<Class>Parameters`, as the classes in `@mohsinonxrm/dataverse-sdk-actions` do. A
parameter that `$metadata` marks `Nullable="false"` is required; any other is optional, may be
`null`, and isn't sent when it's left out or `undefined`. An operation with only optional parameters
can be constructed without arguments; one without parameters has no constructor arguments at all.

`ActionBase` and `FunctionBase` implement core's `Executable`, so generated operations go straight
to `client.execute()`.

#### Return values

`client.execute()` resolves the value the operation returns, never the OData envelope, and each
operation with a return type exports its type as `<Class>Response`. The values and types are the
same as the classes in `@mohsinonxrm/dataverse-sdk-actions` and `@mohsinonxrm/dataverse-sdk-functions`
resolve for the same operation (#300):

| Return type in `$metadata`               | Web API response                                          | `<Class>Response`                                                             |
| ---------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| none                                     | `204 No Content`                                          | none: `execute()` resolves `undefined` (`void`)                               |
| primitive (`Edm.String`, `Edm.Int32`, …) | `{ "@odata.context", "value": … }`                        | the value: `string`, `number`, `boolean`                                      |
| enum                                     | `{ "@odata.context", "value": "Member" }`                 | `string`: the member name (`"A, B"` for flags)                                |
| collection (`Collection(…)`)             | `{ "@odata.context", "value": [ … ] }`, or 204 when unset | the array, `[]` for a 204; entity records add `@odata.etag` and `@odata.type` |
| complex type                             | the properties, with `@odata.context`                     | `interface … extends <ComplexType> { "@odata.context"?: string }`             |
| entity (or `crmbaseentity`)              | the record, with its annotations, or 204 when unset       | `(<Entity> & { "@odata.context"?, "@odata.etag"?, "@odata.type"? }) \| null`  |

Dataverse answers `204 No Content` for an entity or entity-collection output that a custom API
didn't set, although `$metadata` declares the return `Nullable="false"`: that's `null` for an
entity and `[]` for a collection. A complex output that wasn't set is still a 200, with the
properties `null`.

<!-- no-check -->

```typescript
import { WhoAmIFunction } from "./generated/functions/WhoAmIFunction.js";

const whoAmI = await client.execute(new WhoAmIFunction()); // WhoAmIFunctionResponse
console.log(whoAmI.UserId);

const score = await client.execute(new contoso_GetScoreFunction(accountId, { Rights: 1 })); // number
const job = await client.execute(new contoso_StartJobAction(accountId)); // (Account & …) | null
if (job) console.log(job.accountid, job["@odata.etag"]);
```

### Function Class

Function parameters are sent as parameter aliases (`Name(Param=@p1)?@p1=<literal>`), and each
value is written as the OData literal for its type by `formatParameterAlias()` from
`@mohsinonxrm/dataverse-sdk-entities-runtime`:

- strings are quoted, with `'` doubled: `'O''Brien'`;
- GUIDs, numbers and booleans are written bare; `Date` values become ISO strings (`Edm.Date` takes
  only the date part);
- enum values become enum literals: `Microsoft.Dynamics.CRM.EntityFilters'1'`;
- collections and complex values are written as JSON, with the enum values in them as member
  names (`{"Rights":"ReadAccess, WriteAccess"}`: Dataverse reads an enum in JSON only by name),
  through `parameterValue()` from the generated `internal/functionParameters.ts`; an entity
  reference is written as `{"@odata.id":"accounts(<id>)"}`.

Nullable parameters are optional; a parameter left out or `undefined` is left out of the call.

```typescript
// generated/functions/RetrieveUserPrivilegeByPrivilegeNameFunction.ts (bound to systemuser)
export interface RetrieveUserPrivilegeByPrivilegeNameFunctionParameters {
  PrivilegeName: string;
  ExcludeTeamBasic?: boolean | null;
}

export class RetrieveUserPrivilegeByPrivilegeNameFunction extends FunctionBase<RetrieveUserPrivilegeByPrivilegeNameResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserPrivilegeByPrivilegeNameFunctionParameters
  ) {
    super();
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const aliases: string[] = [];
    const values = new URLSearchParams();
    if (this.parameters.PrivilegeName !== undefined) {
      aliases.push("PrivilegeName=@p1");
      values.append(
        "@p1",
        formatParameterAlias(this.parameters.PrivilegeName, "Edm.String", "PrimitiveType")
      );
    }
    // ...
    const query = values.toString();
    return {
      method: "GET",
      url: `${baseUrl}/systemusers(${formatParameterAlias(this.systemuserId, "Edm.Guid")})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(${aliases.join(",")})${query ? `?${query}` : ""}`,
      headers: { accept: "application/json" },
    };
  }
  // ...
}

const result = await client.execute(
  new RetrieveUserPrivilegeByPrivilegeNameFunction(userId, { PrivilegeName: "prvReadAccount" })
);
```

### Bound Actions and Functions

A bound operation is called on what it is bound to, `/<entity set>(<id>)/Microsoft.Dynamics.CRM.<Name>`
for one record or `/<entity set>/Microsoft.Dynamics.CRM.<Name>` for a collection:

The binding is a separate first argument, before the parameters object, because it goes in the
URL and not in the request:

| Bound to                                   | First constructor parameter                    |
| ------------------------------------------ | ---------------------------------------------- |
| one record of a table (`mscrm.systemuser`) | `<table>Id: string` (`systemuserId`)           |
| a table's collection                       | none (the entity set is known)                 |
| an abstract type (`mscrm.crmbaseentity`)   | `target: EntityReference` with `entitySetName` |
| a collection of an abstract type           | `entitySetName: string`                        |

An operation bound to several tables (`RetrieveUnpublished` is bound to about twenty) gets one
class per binding, named after the table: `RetrieveUnpublished_savedqueryFunction`,
`RetrieveUnpublished_systemformFunction`, and so on.

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

<!-- no-check -->

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, Prefer } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { formatEntityForWrite } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type Account, AccountMetadata } from "./generated/index.js";

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
  baseUrl: "https://org.crm.dynamics.com",
  tokenProvider,
});

// Type-safe CRUD operations
const account: Account = {
  name: "Contoso",
  creditlimit: 100000,
};

const createdAccount = await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation())
  .post<Account>(formatEntityForWrite(account, AccountMetadata));

console.log("Created:", createdAccount.accountid);

// Type-safe queries
const accounts = await client
  .api("/accounts")
  .select("name", "creditlimit")
  .filter("creditlimit gt 50000")
  .get<{ value: Account[] }>();

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
   With no `entities` list, every table is generated: types that derive from `crmbaseentity`
   (abstract types, types without an entity set and the metadata types such as `EntityMetadata`
   are skipped).
2. **Build Initial Model**: Creates PropertyType, NavigationPropertyType structures from CSDL.
   Entities that are referenced but not generated aren't pulled in; references to them are typed
   as `IEntity`.

### Phase 3: Enrich with RetrieveMetadataChanges

For each entity, the generator calls the `RetrieveMetadataChanges` function
(`GET RetrieveMetadataChanges(Query=@q)?@q={...}`) to fetch detailed metadata:

<!-- no-check -->

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
  - `RequiredLevel.Value` is the member name the Web API sends (`"ApplicationRequired"`, …)
  - `ApplicationRequired` (business-required) → `isRequired: true`
  - Any level other than `None` → `requiredLevel` (`SystemRequired`, `ApplicationRequired` or `Recommended`)

- **Alternate Keys Support**:
  - Extracts `Keys[]` from metadata
  - Maps to `EntityKeyType` with `DisplayName`, `KeyAttributes[]`

### Type Generation

1. **Resolve Types**: Maps Dataverse types to TypeScript types
   - `Edm.String`, `Edm.Guid`, `Edm.Binary`, `Edm.Date` → `string`
   - `Edm.Int32`, `Edm.Int64`, `Edm.Decimal`, `Edm.Double` → `number`
   - `Edm.Boolean` → `boolean`, `Edm.DateTimeOffset` → `string` (`string | Date` for an
     operation parameter)
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
  internal/
    actionBody.ts           # bodyValue() for action request bodies
  metadata.ts               # Entities constant, EntityMetadataCache
  index.ts                  # Root barrel export
```

### Entity File Example: rollup columns and polymorphic lookups

<!-- no-check -->

```typescript
// Contact.ts (generated)
export interface Contact extends IEntity {
  /** Total Spend */
  contoso_totalspend?: number | null; // Rollup

  /** Navigation: contact_customer_accounts (polymorphic: account, contact) */
  parentcustomerid?: Account | Contact | EntityReference;
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
lookup's targets that are all generated give a union type; otherwise it's `IEntity`. To set it,
pass a reference to any target: `formatEntityForWrite()` binds through the navigation property
for that table (`parentcustomerid_account@odata.bind` for an account).

### Metadata File Example

<!-- no-check -->

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

✅ shipped; ⏳ planned, tracked in [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100).

- ✅ Three-phase pipeline (Load → Filter → Enrich)
- ✅ RetrieveMetadataChanges enrichment
- ✅ Local option set enums
- ✅ Polymorphic lookup consolidation
- ✅ Calculated/rollup field annotations
- ✅ Alternate keys read into the schema model (`EntityType.Keys`); the generated files don't use them yet
- ✅ MSAL authentication flows (device code, client credentials)
- ⏳ Create/Update type splitting (exclude read-only fields)
- ⏳ Custom template support (eject command)
- ⏳ Incremental generation (only changed entities)
- ⏳ Validation rules generation
- ⏳ Xrm.FormContext types (for model-driven apps)

---

## 🙏 Acknowledgments

Portions of this package are adapted from
[scottdurow/dataverse-gen](https://github.com/scottdurow/dataverse-gen) (Copyright (c) 2020 Scott
Durow, MIT License). The MIT copyright and permission notice is in
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md), which ships with the package, and each adapted
file has a header pointing to it. The adapted parts are:

- the three-phase pipeline (load `$metadata`, filter, enrich) and the `SchemaModel` /
  `TypescriptGenerator` / `MetadataService` design;
- per-entity `RetrieveMetadataChanges` calls with an `AttributeQuery`;
- polymorphic lookup consolidation;
- local option set enum generation;
- structural property types for action and function parameters;
- code-safe navigation names;
- the `.dataverse-gen.json` configuration and the `init` / `generate` commands;
- the EJS templates' entity metadata, enum and parameter metadata shapes.

Key differences from scottdurow/dataverse-gen:

- **ESM-only** (no CommonJS output)
- **Integrates with `@mohsinonxrm/dataverse-sdk-*`** packages (HTTP-first + OrganizationService)
- **TypeScript-first** (no JavaScript transpilation output)
- **Simplified configuration** (JSON-based, no prompts)
- **AGPL v3 license** for this package; the adapted portions keep their MIT notice

---

## 📜 License

GNU AGPL v3.0 — see [LICENSE](../../LICENSE)

---

## 🤝 Related Packages

- **[@mohsinonxrm/dataverse-sdk-entities-runtime](../dataverse-sdk-entities-runtime)** — Runtime base classes
- **[@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core)** — Core SDK client
- **[@mohsinonxrm/dataverse-sdk-metadata](../dataverse-sdk-metadata)** — Metadata operations
