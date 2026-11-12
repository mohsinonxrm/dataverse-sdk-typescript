# @mohsinonxrm/dataverse-sdk-generator

Code generator for Dataverse entities, actions, and functions. Generates strongly-typed TypeScript code from `$metadata` CSDL.

`dataverse-gen` is the typed part of the SDK's main path for your own org: interfaces for your
tables with their create and update types, a [typed client](#typed-client) over `client.api()`,
and action and function classes for your custom APIs and the apps the prebuilt
`@mohsinonxrm/dataverse-sdk-actions` and `-functions` packages leave out, run with
`client.execute()` like the prebuilt ones. It replaces the .NET SDK's early-bound class
generators (`CrmSvcUtil`, `pac modelbuilder`).

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
import { type AccountCreate, AccountMetadata } from "./generated/entities/Account.js";
import { EntityMetadataCache } from "./generated/metadata.js";

const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });

// Type-safe entity creation: only the columns a create accepts. Lookups take an EntityReference.
const account: AccountCreate = {
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

### `eject`

Copy the built-in EJS templates into a directory (default `./dataverse-gen-templates`) to
customize them; see [Custom templates](#custom-templates).

```bash
dataverse-gen eject [dir] [options]

Options:
  --force  Overwrite templates that are already in the directory
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

    /** Regenerate only the tables whose metadata changed (default: false; see Incremental generation) */
    incremental?: boolean;
  };

  /** A directory of custom EJS templates (see Custom templates) */
  templates?: string;

  /** Type operation responses exactly as $metadata declares them (default: false; see Strict nulls) */
  strictNulls?: boolean;

  /** Typed Xrm form contexts for model-driven form scripts (default: false; see Form contexts) */
  formContext?: boolean;

  /** Form context types per main and quick create form, from FormXml (default: false; see Form layouts) */
  formLayouts?: boolean;

  /** Typed request builders per entity set: createTypedClient() (default: false; see Typed client) */
  typedClient?: boolean;

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

### Incremental generation

`"output": { "incremental": true }` regenerates only the tables whose metadata changed. A stamp
file in the output folder, `.dataverse-gen-stamp.json`, records a hash of each table's schema model
(its columns, lookups, constraints, labels, …) and of the enums and complex types it uses, a hash of
the settings every table depends on (the options, the templates and the names of the generated
tables), and the files the run wrote. On the
next run, a table whose hash is unchanged and whose files are still there is skipped: its
`entities/<Entity>.ts` (and `forms/<Entity>Form.ts`) keep their content and timestamps, which
keeps watchers, incremental builds and diffs quiet. The CLI prints the tables it kept;
`generateCode()` returns them as `unchangedTables`.

- A change of options, templates, generator version, or of which tables are generated regenerates
  every table.
- A change to an enum (a choice) or a complex type regenerates only the tables that use it. One
  that no generated table uses, such as a global choice added to or removed from the org, doesn't
  regenerate any table.
- The files that aren't per table (enums, actions, functions, complex types, `metadata.ts`,
  indexes) are written on every run.
- Files the previous run wrote that this one doesn't (a table removed from `entities`, an enum that
  is gone) are deleted. Only files listed in the stamp are touched.
- Only the tables that changed are read. The stamp also keeps each table's metadata (as
  RetrieveMetadataChanges returned it, without its `null` properties) and the `ServerVersionStamp`
  of the run. The next run reads `$metadata`, then sends one RetrieveMetadataChanges request with
  that version stamp (`ClientVersionStamp`, and `DeletedMetadataFilters` for deleted tables and
  columns) and reads again only the tables it says changed, or whose table or column was deleted.
  A run over unchanged metadata makes no per-table request. The docs don't say that
  RetrieveMetadataChanges lists the tables that use a global choice whose options changed, so when
  a kept table uses a global choice, the run also reads the option values of the org's global
  choices (one `GlobalOptionSetDefinitions` request) and reads again the tables whose global
  choices have other values now. A deleted table is gone from
  `$metadata` too, so it isn't generated and its files are deleted. The CLI prints the tables it
  read and why, such as `contact: changed: new_added` or `contact: deleted: new_code`;
  `generateCode()` returns them as `fetchedTables` and `fetchReasons`.
- Right after a change, the request that reads a table again can reach a Dataverse server whose
  metadata cache is behind and get the table as it was. The run checks each table it read again
  against what RetrieveMetadataChanges listed: the columns and options it listed are there, the
  deleted columns are gone, and the global choices have their new values. (A changed property of
  a column that was already there, such as its maximum length, isn't checked.) When one doesn't
  show the change yet, the run generates it as returned, keeps the previous run's version stamp
  (so the next run is told about the change again and reads the table again), and a warning says
  so.
- Every table is read again when there is nothing to reuse: no stamp (or one from before this
  feature), another generator version, another `environmentUrl` or `apiVersion`, or a version
  stamp Dataverse no longer has (the `ExpiredVersionStamp` error, after 90 days by default or
  after maintenance). If the changes request fails otherwise, every table is read again and a
  warning says why.
- The stamp file grows with the metadata it keeps: with the number of tables and columns
  generated, most with `"entities": []` (every table).
- To regenerate and read everything, delete the stamp file.

### Custom templates

`"templates": "./dataverse-gen-templates"` points at a directory of EJS templates. A template there
replaces the built-in one of the same name; the others stay built-in, so the directory needs only
the ones you change. `dataverse-gen eject` copies all of them there to start from:

| Template           | Renders                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `entity.ejs`       | `entities/<Entity>.ts`: the interface, create/update types, metadata |
| `enum.ejs`         | `enums/<OptionSet>.ts`                                               |
| `action.ejs`       | `actions/<Name>Action.ts`                                            |
| `function.ejs`     | `functions/<Name>Function.ts`                                        |
| `complextype.ejs`  | `complextypes/<Name>.ts`                                             |
| `metadata.ejs`     | `metadata.ts`                                                        |
| `form.ejs`         | `forms/<Entity>Form.ts` (with `formContext`)                         |
| `form-layouts.ejs` | `forms/<Entity>Forms.ts` (with `formLayouts`)                        |

A template gets the same data as the built-in one (the schema model object, such as `entity` or
`enumType`, the type names, and helpers such as `formatType()`, `propertyKey()`, `doc()` and
`literal()`); start from the ejected copy to see what's available. Type helpers record the imports
they need, so a template never writes import lines. The data a template gets can change between
versions of the generator: re-eject after an upgrade and compare. With incremental generation, a
template change regenerates every table.

### Typed client

`"typedClient": true` generates `client.ts` with `createTypedClient(client)`: one typed request
builder per generated table, keyed by entity set name, in the style of the Graph (Kiota) SDKs. The
builders are entities-runtime's `EntitySetClient`, a thin layer over core's request builder, typed
by the table's interface, its create and update types, a union of its columns (`AccountColumn`)
for `select`, and its navigation properties (`AccountNavigation`) for `expand`. See
[ADR 0009](../../docs/adr/0009-typed-request-builders.md) for the design.

<!-- no-check -->

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient } from "./generated/client.js";

const typed = createTypedClient(new DataverseClient({ baseUrl, tokenProvider }));

const id = await typed.accounts.create({
  name: "Contoso",
  primarycontactid: createEntityReference("contact", contactId), // sent as @odata.bind
});
const account = await typed.accounts.byId(id).get({ select: ["name", "creditlimit"] });
account.creditlimit; // number | null | undefined
account.description; // error: not selected

// expand: the related record (or null), or an array of them, typed by the related table
const withContacts = await typed.accounts.byId(id).get({
  select: ["name"],
  expand: {
    primarycontactid: { select: ["fullname"] },
    contact_customer_accounts: {
      select: ["fullname", "emailaddress1"],
      filter: "statecode eq 0",
      expand: { owninguser: { select: ["fullname"] } }, // not with orderBy / top
    },
  },
});
withContacts.primarycontactid?.fullname; // string | null | undefined
withContacts.contact_customer_accounts[0].owninguser?.fullname;

const active = await typed.accounts.list({
  select: ["name"],
  filter: "statecode eq 0",
  orderBy: ["name asc"],
  top: 50, // or maxItems; without either, list() follows every @odata.nextLink
});
await typed.accounts.byId(id).update({ creditlimit: 5000, primarycontactid: null }); // If-Match: *
await typed.accounts.byId({ accountnumber: "A-1" }).delete({ etag }); // alternate key, concurrency

typed.accounts.byId(id).get({ select: ["nmae"] }); // error: not a column of account
typed.accounts.create({ createdon: "…" }); // error: not in AccountCreate
const count = await typed.accounts.query().count().top(0).get(); // core's builder for the rest
```

| Method                                                                 | Request                                                          |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `typed.<set>.byId(key).get({ select, expand })`                        | `GET <set>(<key>)`: the record (`Account`); 404 rejects          |
| `typed.<set>.list({ select, expand, filter, orderBy, top, maxItems })` | `GET <set>`, every page unless `top` / `maxItems` stops it       |
| `typed.<set>.create(entity)`                                           | `POST <set>` with `formatEntityForWrite()`; resolves the new id  |
| `typed.<set>.byId(key).update(entity, { etag })`                       | `PATCH` with `If-Match: *` (or the etag): never creates a record |
| `typed.<set>.byId(key).delete({ etag })`                               | `DELETE`, with `If-Match` for an etag                            |
| `typed.<set>.query()` / `.byId(key).request()`                         | core's `DataverseRequestBuilder` for the set or the record       |

A literal `select` narrows the record to the selected columns (and its annotations, such as
`@odata.etag` and formatted values); without `select`, the record is the table's interface.
`expand` takes an object, one key per navigation property with `true` or its options (`select`,
`expand`, and on a collection `filter`, `orderBy` and `top`), checked against the related table
and against what Dataverse accepts: `orderBy` / `top` not with a nested `expand` or inside
another expansion (0x80060888), and no nested `expand` inside a many-to-many collection
(`ManyToManyNavigation`, a navigation property that is its own partner);
or, as before, an array of names, with inline options written in OData syntax
(`["primarycontactid($select=fullname)"]`, not checked inside the parentheses). Each expanded
property is added to the record: a lookup as the related record or `null`, a collection as an
array. A polymorphic lookup that the table's interface shows as one property (`parentcustomerid`)
is expanded by the Web API's property for each target (`parentcustomerid_account`,
`parentcustomerid_contact`). The requests are what core's `expand(name, options)` sends.

Related records, upsert, bound operations and paging:

<!-- no-check -->

```typescript
// Navigation: a collection lists, iterates and pages; a lookup gets (null when empty)
const contacts = await typed.accounts
  .byId(id)
  .nav("contact_customer_accounts")
  .list({ select: ["fullname"], filter: "statecode eq 0" });
const primary = await typed.accounts
  .byId(id)
  .nav("primarycontactid")
  .get({ select: ["fullname"] });

// Associate / disassociate (a collection: $ref; a lookup: @odata.bind / DELETE $ref)
await typed.accounts.byId(id).associate("contact_customer_accounts", contactId);
await typed.accounts.byId(id).associate("contact_customer_accounts", [c1, c2], {
  executor: createBindManyExecutor(), // optional, from @mohsinonxrm/dataverse-sdk-batch: one $batch
});
await typed.accounts.byId(id).disassociate("contact_customer_accounts", contactId);
await typed.accounts.byId(id).associate("primarycontactid", contactId);
await typed.accounts.byId(id).disassociate("primarycontactid");

// Upsert by id or alternate key; mode: "createOnly" (If-None-Match: *) or "updateOnly"
const accountId = await typed.accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" });

// Bound actions and functions, from the generated classes
const result = await typed.accounts.byId(id).actions.contoso_Recalculate({ Mode: "full" });
const count = await typed.accounts.functions.contoso_CountActive({ State: 0 });

// Paging: lazily, or one page at a time
for await (const account of typed.accounts.iterate({ select: ["name"], pageSize: 500 })) {
  // …
}
const page = await typed.accounts.listPage({ select: ["name"], pageSize: 50, count: true });
const next = await typed.accounts.listPage({
  select: ["name"],
  pageSize: 50,
  nextLink: page.nextLink, // the query is in the link; the other options type the result
});
```

| Method                                                              | Request                                                                                                   |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `typed.<set>.byId(key).nav(name)`                                   | a client for `<set>(<key>)/<name>`: `list`/`iterate`/`listPage` or `get`                                  |
| `.nav(collection).associate(target \| targets, { executor })`       | `POST <name>/$ref` (core's `associate()`), or core's `bindMany()` for several                             |
| `.nav(collection).disassociate(target)`                             | `DELETE <name>(<id>)/$ref` (core's `disassociate()`)                                                      |
| `.nav(lookup).set(target)` / `.clear()`                             | `PATCH` with `<name>@odata.bind` and `If-Match: *` / `DELETE <name>/$ref`                                 |
| `typed.<set>.byId(key).associate(name, …)` / `.disassociate(name…)` | the same, by navigation property name                                                                     |
| `typed.<set>.upsert(key, entity, { mode })`                         | `PATCH <set>(<key>)` without `If-Match`; resolves the id (by alternate key, from `return=representation`) |
| `typed.<set>.byId(id).actions.<name>(parameters)` / `.functions`    | the generated class for the record, through `client.execute()`                                            |
| `typed.<set>.actions.<name>(parameters)` / `.functions`             | the generated class bound to the entity set                                                               |
| `typed.<set>.iterate(options)`                                      | core's `iterate()`: every page as it's read; `pageSize` sends `odata.maxpagesize`                         |
| `typed.<set>.listPage(options)`                                     | one page (`GET`), `{ records, nextLink, count }`; `nextLink` in the options gets the next                 |

A target is an id or alternate key of the related table (its entity set comes from the generated
metadata) or an `EntityReference`. `upsert()` takes the columns valid in both a create and an
update. `client.ts` has an `<Entity>Operations` object for each table with actions or functions
bound to it (to a record of it, or to its entity set) among the generated ones; their methods take
the parameters and then the request options, or only the options when there are no parameters. A
bound operation's class binds by id, so a record reached by alternate key can't call one. `nav()`
and the paging methods narrow by `select` and `expand` as `get()` and `list()` do.

`key` is a GUID or an alternate key object. Every method takes core's request options
(`signal`, `headers`, `prefer`, `timeoutMs`, …) last. `client.ts` imports every generated table's
metadata, so in all-tables mode it's large; it's off by default.

### Form contexts

`"formContext": true` generates `forms/<Entity>Form.ts` for each table, for model-driven form
scripts written in TypeScript: the table's columns typed with their `@types/xrm` attribute and
control types, by logical name, and a form context whose `getAttribute()` and `getControl()` take
those names. Install `@types/xrm` in the project that compiles the scripts (it's an optional peer
dependency of the generator); the files reference it with `/// <reference types="xrm" />`.

<!-- no-check -->

```typescript
// generated/forms/AccountForm.ts
/// <reference types="xrm" />

import type { account_industrycode } from "../enums/account_industrycode.js";

export interface AccountAttributes {
  name: Xrm.Attributes.StringAttribute;
  industrycode: Xrm.Attributes.OptionSetAttribute<account_industrycode>;
  creditlimit: Xrm.Attributes.NumberAttribute;
  createdon: Xrm.Attributes.DateAttribute;
  primarycontactid: Xrm.Attributes.LookupAttribute;
  // ...
}

export interface AccountControls {
  name: Xrm.Controls.StringControl;
  industrycode: Xrm.Controls.OptionSetControl;
  primarycontactid: Xrm.Controls.LookupControl;
  // ...
}

export type AccountFormContext = Omit<Xrm.FormContext, "getAttribute" | "getControl"> & {
  getAttribute<K extends keyof AccountAttributes>(name: K): AccountAttributes[K] | null;
  getControl<K extends keyof AccountControls>(name: K): AccountControls[K] | null;
  // also header_<name> and header_process_<name> controls, and the delegate overloads
};
```

<!-- no-check -->

```typescript
import type { AccountFormContext } from "./generated/forms/AccountForm.js";
import { account_industrycode } from "./generated/enums/account_industrycode.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const form = executionContext.getFormContext() as AccountFormContext;
  const industry = form.getAttribute("industrycode"); // OptionSetAttribute<account_industrycode> | null
  if (industry?.getValue() === account_industrycode.Accounting) {
    form.getControl("primarycontactid")?.addPreSearch(filterContacts); // LookupControl
  }
  form.getAttribute("industrycode")?.setValue(7); // error unless 7 is an option
  form.getAttribute("nmae"); // error: not a column of account
}
```

| Column type                            | Attribute                             | Control                       |
| -------------------------------------- | ------------------------------------- | ----------------------------- |
| Text, multiline text                   | `StringAttribute`                     | `StringControl`               |
| Whole number, decimal, float, currency | `NumberAttribute`                     | `NumberControl`               |
| Date and time                          | `DateAttribute`                       | `DateControl`                 |
| Yes/no                                 | `BooleanAttribute`                    | `StandardControl`             |
| Choice, status, status reason          | `OptionSetAttribute<enum>`            | `OptionSetControl`            |
| Choices                                | `MultiSelectOptionSetAttribute<enum>` | `MultiSelectOptionSetControl` |
| Lookup, customer, owner                | `LookupAttribute`                     | `LookupControl`               |

A choice column whose option set the generator didn't make an enum for (a global option set) is
`OptionSetAttribute<number>`. A lookup is keyed by its logical name (`contoso_parentaccountid`),
as forms name it, not by its navigation property. Primary keys, the read-only name columns beside a
lookup, and other virtual, file and image columns aren't included. The types cover every column of
the table, not one form's layout: a column that isn't on the form returns `null`, as in
`@types/xrm`, and a control placed twice (`name1`) isn't typed; for that, see Form layouts.

### Form layouts

`"formLayouts": true` generates types per form, from each table's active main and quick create
forms (their `systemform` records and FormXml): `forms/<Entity>Forms.ts` with, for each form,
`<Entity><Kind>_<Form>Attributes`, `…Controls`, `…Tabs` and `…FormContext` (`AccountMain_Account`,
`AccountMain_SalesInsights`, `AccountQuickCreate_AccountQuickCreate`; `_2` when a name is taken).
It turns `formContext` on too: the per-form types build on the table-wide ones. Generating reads
one more query per table (`systemforms`), so the signed-in user or app needs read access to forms.

<!-- no-check -->

```typescript
// generated/forms/AccountForms.ts
/// <reference types="xrm" />

import type { AccountAttributes, AccountControls } from "./AccountForm.js";
import type { FormLayoutUi } from "./form-layout.js";

export interface AccountMain_AccountAttributes {
  name: AccountAttributes["name"];
  primarycontactid: AccountAttributes["primarycontactid"];
  ownerid: AccountAttributes["ownerid"]; // in the header
  // ...
}

export interface AccountMain_AccountControls {
  name: AccountControls["name"];
  name1: AccountControls["name"]; // the column's second control
  header_ownerid: AccountControls["ownerid"];
  Contacts: Xrm.Controls.GridControl; // a subgrid
  WebResource_map: Xrm.Controls.IframeControl;
  // ...
}

export interface AccountMain_AccountTabs {
  SUMMARY_TAB: "ACCOUNT_INFORMATION" | "CONTACTS"; // the tab's sections
  // ...
}

export type AccountMain_AccountFormContext = Omit<
  Xrm.FormContext,
  "getAttribute" | "getControl" | "ui"
> & {
  getAttribute<K extends keyof AccountMain_AccountAttributes>(
    name: K
  ): AccountMain_AccountAttributes[K];
  getAttribute<K extends keyof AccountAttributes>(name: K): AccountAttributes[K] | null;
  getControl<K extends keyof AccountMain_AccountControls>(name: K): AccountMain_AccountControls[K];
  // also header_process_<column> controls (| null), and the delegate overloads
  ui: FormLayoutUi<AccountMain_AccountTabs>; // tabs.get(name), tab.sections.get(name)
};
```

<!-- no-check -->

```typescript
import type { AccountMain_AccountFormContext } from "./generated/forms/AccountForms.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const form = executionContext.getFormContext() as AccountMain_AccountFormContext;
  form.getAttribute("name").getValue(); // StringAttribute: on the form, so not null
  form.getControl("name1").setVisible(false);
  form.getControl("Contacts").refresh(); // GridControl
  form.ui.tabs.get("SUMMARY_TAB").sections.get("ACCOUNT_INFORMATION").setVisible(true);
  form.getAttribute("statecode")?.getValue(); // a column not on this form: | null
  form.getControl("footer_statecode"); // error: not a control getControl() reaches
  form.ui.tabs.get("DETAILS"); // error: not a tab of this form
}
```

- **Names.** A control is keyed by its `id` in the FormXml, which is its Client API name: the
  column's logical name, `<column>1`, `<column>2`, … for a column placed again, `header_<column>`
  in the header; a subgrid, web resource, IFRAME or quick view form by the name it was given.
  Footer controls aren't included (`getControl()` doesn't reach them), nor tabs and sections
  without a name.
- **Types.** A column the table-wide types have is typed as there (`AccountAttributes["name"]`, so
  a choice keeps its enum). A party list column (`to`, `requiredattendees`) is a
  `LookupAttribute` / `LookupControl`; a file or image column, which `@types/xrm` has no type for,
  is an `Attribute` / `StandardControl`. A subgrid is a `GridControl`, a web resource or IFRAME an
  `IframeControl`, a quick view form a `QuickFormControl`, the timeline a `TimelineWall`, any
  other control a `Control`.
- **Not null.** What's on the form is returned without `| null`. Another column of the table
  (one only in the business process flow, say) is still there as `| null`, and so is a business
  process flow control, `header_process_<column>`. Regenerate after changing a form; with
  incremental generation, a changed form regenerates its table's files.

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
├── forms/              # with "formContext": true (or "formLayouts": true)
│   ├── AccountForm.ts
│   ├── AccountForms.ts # with "formLayouts": true
│   ├── form-layout.ts  # with "formLayouts": true (helper types, not exported)
│   └── index.ts
├── client.ts           # with "typedClient": true
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

### Create and Update Types

Next to the interface, each table gets `<Entity>Create` and `<Entity>Update`: the columns
Dataverse accepts in a create and in an update, from the `IsValidForCreate` and
`IsValidForUpdate` metadata of each column. Read-only and server-set columns (`createdon`,
`versionnumber`, a calculated `fullname`, a lookup's `_<name>_value`) are left out of both, and a
column valid for only one is in that one: the primary key can be set on create but never changed,
and `statecode` is usually set by an update only.

A lookup is keyed by the navigation property it's bound through and takes an `EntityReference`:
`primarycontactid`, a custom lookup's `contoso_ParentAccountId` (named after its schema name), or
a polymorphic lookup's `parentcustomerid` and `ownerid`. `formatEntityForWrite()` sends it as
`<navigation property>@odata.bind` (for a polymorphic lookup, the navigation property for the
reference's table). `null` clears a column or a lookup.

<!-- no-check -->

```typescript
// generated/entities/Account.ts (continued)
export type AccountCreate = {
  /** accountid */
  accountid?: string | null;

  /** Type the company or business name. */
  name?: string | null;

  /** Select the account's primary industry. */
  industrycode?: account_industrycode | null;

  /** Lookup primarycontactid (contact): a reference, sent as primarycontactid@odata.bind */
  primarycontactid?: EntityReference | null;
  // ...
};

export type AccountUpdate = {
  name?: string | null;
  statecode?: account_statecode | null;
  primarycontactid?: EntityReference | null;
  // ... (no accountid, createdon, ...)
};
```

<!-- no-check -->

```typescript
const account: AccountCreate = {
  name: "Contoso",
  primarycontactid: createEntityReference("contact", contactId),
  // createdon: "…", // error: not in AccountCreate
};
const id = await client
  .api("accounts")
  .createAndGetId(
    formatEntityForWrite(account, AccountMetadata, { metadataCache: EntityMetadataCache })
  );

const change: AccountUpdate = { statecode: account_statecode.Inactive, primarycontactid: null };
await client
  .api(`accounts(${id})`)
  .patch(formatEntityForWrite(change, AccountMetadata, { metadataCache: EntityMetadataCache }));
```

They're type aliases, not interfaces, so they can be passed where a `Partial<IEntity>` is taken
(`formatEntityForWrite()`), yet still reject a column they don't have. Required columns
(`RequiredLevel` ApplicationRequired) are optional in `<Entity>Create` too: the Web API doesn't
enforce them, only forms do. A table with no writable column gets `Record<string, never>`.
`<Entity>Create` or `<Entity>Update` takes a `_2` suffix when another generated type already has
the name.

### Validation Rules

The metadata const of each table carries the column constraints `RetrieveMetadataChanges`
returns, for the runtime's opt-in `validateEntity()`:

<!-- no-check -->

```typescript
// generated/entities/Account.ts (AccountMetadata)
  attributes: {
    name: {
      // ...
      isRequired: true,
      requiredLevel: "ApplicationRequired",
      maxLength: 160,
    },
    numberofemployees: { /* ... */ minValue: 0, maxValue: 1000000000 },
    industrycode: { /* ... */ optionValues: [1, 2, 3 /* … */] },
    createdon: { /* ... */ isValidForCreate: false, isValidForUpdate: false },
    creditlimit: { /* ... */ precision: "currency" },
    entityimage: { /* ... */ maxSizeInKB: 10240 },
    statuscode: { /* ... */ optionValues: [1, 2], optionStates: {"1":0,"2":1} },
  },
  navigation: {
    primarycontactid: {
      // ...
      lookupAttribute: "primarycontactid", // the lookup column this navigation property writes
      // isRequired / requiredLevel / isValidForCreate: false / isValidForUpdate: false, as for a column
    },
  },
```

- `maxLength` (text), `minValue` / `maxValue` (numbers) and `optionValues` (choice and choices
  columns, global option sets included) when the column has them;
- `precision` for decimal and currency columns: the column's `Precision`, or, for a currency
  column whose `PrecisionSource` is the organization's pricing precision or the record currency's
  precision, `"pricing"` or `"currency"` (`validateEntity()` takes those numbers as options);
  floating point columns get none;
- `maxSizeInKB` for file and image columns;
- `optionStates` for the status reason column: the state each status reason belongs to;
- nothing for dates: a date-only column is the one whose `odataType` is `Edm.Date`, and every
  date column takes Dataverse's range, 1753-01-01 to 9999-12-31, so `validateEntity()` knows both;
- `isValidForCreate: false` / `isValidForUpdate: false` only when false;
- a lookup's `RequiredLevel` and valid-for flags on its navigation property, next to
  `lookupAttribute`.

Nothing checks them unless you call `validateEntity()`:

<!-- no-check -->

```typescript
import { validateEntity } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

const issues = validateEntity(account, AccountMetadata); // mode: "create" by default
const updateIssues = validateEntity(change, AccountMetadata, { mode: "update" });
// [{ property: "name", code: "maxLength", message: "name is 200 characters long; …" }, …]
```

See the [entities-runtime README](../dataverse-sdk-entities-runtime/README.md#validation-validateentityentity-metadata-options)
for the checks.

### Enum Type

<!-- no-check -->

```typescript
// generated/enums/account_industrycode.ts
export const account_industrycode = {
  Accounting: 1,
  AgricultureAndNonPetrolNaturalResourceExtraction: 2,
  // ...
} as const;

export type account_industrycode = (typeof account_industrycode)[keyof typeof account_industrycode];

// generated/enums/contoso_Priority.ts (an EnumType of $metadata)
export const contoso_Priority = {
  /** 0 */
  Low: "Low",
  /** 1 */
  High: "High",
} as const;

export type contoso_Priority = (typeof contoso_Priority)[keyof typeof contoso_Priority];

// generated/enums/AccessRights.ts (IsFlags="true")
export const AccessRights = {
  None: 0,
  ReadAccess: 1,
  WriteAccess: 2,
  // ...
} as const;

export type AccessRights = number;
```

An enum is a const object and a type of the same name, not a TypeScript `enum` (#479), so the
generated code compiles with `erasableSyntaxOnly` and runs under Node's type stripping.
`account_industrycode.Accounting` and `x: account_industrycode` work as with an enum, and the type
takes the plain value too (`1`, `"High"`); only an enum's reverse mapping
(`account_industrycode[1]`) is gone.

- A choice's option set has its numbers, which Dataverse stores. So does a `$metadata` enum that a
  choice column uses as its (global) option set.
- An `EnumType` of `$metadata` has its member names, which the Web API reads and writes: an action
  body or a function parameter sends `contoso_Priority.High` as it is, and a returned value is
  typed with the enum. Each member's comment gives its number.
- A flags enum (`IsFlags="true"`, such as `AccessRights`) keeps its numbers, typed `number`, so
  members combine with `|`; actions and functions send the value as member names.

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
  public readonly parameters: WinOpportunityActionParameters;

  constructor(parameters: WinOpportunityActionParameters) {
    super();
    this.parameters = parameters;
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
send it. Parameters that can hold a flags enum or an entity go through `bodyValue()`, from the
generated `internal/actionBody.ts`:

- an enum value is sent as its member name (the Web API rejects a number). Other enums' values are
  their member names already; a flags value is turned into them:
  `AccessRights.ReadAccess | AccessRights.WriteAccess` becomes `"ReadAccess, WriteAccess"`, also
  inside complex types such as `GrantAccess`'s `PrincipalAccess.AccessMask`;
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
| enum                                     | `{ "@odata.context", "value": "Member" }`                 | the enum (its member names); `string` for flags (`"A, B"`)                    |
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
- enum values become enum literals: `Microsoft.Dynamics.CRM.EntityFilters'1'`,
  `Microsoft.Dynamics.CRM.contoso_Priority'High'`;
- collections and complex values are written as JSON, with the flags enum values in them as member
  names (`{"Rights":"ReadAccess, WriteAccess"}`: Dataverse reads an enum in JSON only by name),
  through `parameterValue()` from the generated `internal/functionParameters.ts`; an entity
  reference is written as `{"@odata.id":"accounts(<id>)"}`.

Nullable parameters are optional; a parameter left out or `undefined` is left out of the call.

<!-- no-check -->

```typescript
// generated/functions/RetrieveUserPrivilegeByPrivilegeNameFunction.ts (bound to systemuser)
export interface RetrieveUserPrivilegeByPrivilegeNameFunctionParameters {
  PrivilegeName: string;
  ExcludeTeamBasic?: boolean | null;
}

export class RetrieveUserPrivilegeByPrivilegeNameFunction extends FunctionBase<RetrieveUserPrivilegeByPrivilegeNameResponse> {
  public readonly systemuserId: string;
  public readonly parameters: RetrieveUserPrivilegeByPrivilegeNameFunctionParameters;

  constructor(
    systemuserId: string,
    parameters: RetrieveUserPrivilegeByPrivilegeNameFunctionParameters
  ) {
    super();
    this.systemuserId = systemuserId;
    this.parameters = parameters;
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
`generateCode()` resolves `{ warnings, unchangedTables }`; `ejectTemplates(dir, { force })` copies
the built-in templates, as `dataverse-gen eject` does.

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
- ✅ Create/Update types (`<Entity>Create`, `<Entity>Update`: writable columns only)
- ✅ Custom templates (`"templates"`, `dataverse-gen eject`)
- ✅ Incremental generation (`"output": { "incremental": true }`: only changed tables are rewritten, and only changed tables' metadata is read)
- ✅ Validation rules (column constraints in the metadata, for `validateEntity()`)
- ✅ Xrm.FormContext types (`"formContext": true`, per table; `"formLayouts": true`, per form)
- ✅ Typed request builders per entity set (`"typedClient": true`: `createTypedClient()`, #312)

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
