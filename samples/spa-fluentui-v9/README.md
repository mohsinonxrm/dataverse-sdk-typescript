# spa-fluentui-v9

A React 18 + Fluent UI v9 single-page app that signs in with MSAL and walks through the
`@mohsinonxrm/dataverse-sdk-*` packages one scenario at a time: CRUD, querying, bulk and batch
operations, relationships, metadata, files, actions, messages, discovery, observability and type
safety. Each scenario page runs the call against your Dataverse environment and shows the code
next to the result.

It is a private sample (not published to npm) and is built against the packages in this
workspace. It compiles with `strict` TypeScript and contains no `any`.

## What it uses

Packages the code imports today:

| Package                                        | Used for                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `@mohsinonxrm/dataverse-sdk-core`              | `DataverseClient`, the request builder (`client.api(...)`), paging types              |
| `@mohsinonxrm/dataverse-sdk-auth-msal-browser` | `initializeMsal`, `authorityFor`, `scopesForEnvironment`, `createMsalBrowserProvider` |
| `@mohsinonxrm/dataverse-sdk-xrm`               | `OrganizationService` (create, associate, disassociate)                               |
| `@mohsinonxrm/dataverse-sdk-batch`             | `BatchRequestBuilder` on the Batch page                                               |
| `@mohsinonxrm/dataverse-sdk-discovery`         | `DiscoveryClient` on the Discovery page                                               |

## Known gaps

- **Typed packages are not wired in yet.** `dataverse-sdk-actions`, `-functions`, `-messages`,
  `-metadata` and `-files` are dependencies of the sample but nothing imports them. The Bulk,
  Actions & Functions, Messages, Metadata and Files pages call the Web API endpoints directly
  through `client.api(...)` (for example `/CreateMultiple`, `/WhoAmI`, `/InitializeFileBlocksUpload`).
- **The Observability page is simulated.** Its retry, backoff and concurrency demos use timers and
  `Math.random`; they do not run the SDK's middleware.
- **FetchXML and `$expand`** on the Querying page are built by hand (a `?fetchXml=` query string and a
  string `$expand`). They will move to `client.fetchXml(...)` and nested `expand()` options once
  those SDK changes are released.
- **Not audited** for accessibility (WCAG) or responsive layout.
- **The Files page** builds the entity set name by appending `s` to the entity name, which works for
  `annotation`, `account` and `contact` but not for names such as `opportunity` (`opportunities`).

## Run it

You need Node.js 22 or later, pnpm 9, a Dataverse environment, and a Microsoft Entra app
registration.

1. **Register an app** in Microsoft Entra ID: platform "Single-page application", redirect URI
   `http://localhost:3000`, and the delegated permission `Dynamics CRM / user_impersonation`.
2. **Install** from the repository root:

   ```bash
   pnpm install
   pnpm build        # builds the SDK packages the sample imports
   ```

3. **Configure** the sample. It reads `VITE_*` variables from `.env`:

   ```bash
   cd samples/spa-fluentui-v9
   cp .env.example .env
   ```

   | Variable                  | Meaning                                                         |
   | ------------------------- | --------------------------------------------------------------- |
   | `VITE_AZURE_CLIENT_ID`    | Application (client) id of the app registration                 |
   | `VITE_AZURE_TENANT_ID`    | Directory (tenant) id; defaults to `organizations` when unset   |
   | `VITE_AZURE_REDIRECT_URI` | Redirect URI; defaults to `http://localhost:3000`               |
   | `VITE_DATAVERSE_URL`      | Environment URL, for example `https://yourorg.crm.dynamics.com` |

4. **Start** the dev server and sign in:

   ```bash
   pnpm dev          # http://localhost:3000
   ```

Other scripts: `pnpm build` (type-check, then `vite build`), `pnpm typecheck`, `pnpm lint`,
`pnpm preview`.

## Pages

| Route                      | Page                | What it shows                                                                   |
| -------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `/login`                   | Login               | MSAL redirect sign-in                                                           |
| `/dashboard`               | Dashboard           | Account statistics and recent accounts                                          |
| `/accounts`                | Account list        | Search and list accounts                                                        |
| `/accounts/new`            | Create account      | Form that creates an account                                                    |
| `/accounts/:id`            | Account detail      | View, edit and delete one account                                               |
| `/scenarios/crud`          | CRUD Operations     | Raw, typed and `OrganizationService` create, side by side                       |
| `/scenarios/querying`      | Advanced Querying   | `$filter`, paging (`get`, `getPage`, `iterate`, `getAll`), `$expand`, FetchXML  |
| `/scenarios/bulk`          | Bulk Operations     | `CreateMultiple`, `UpdateMultiple`, `UpsertMultiple`                            |
| `/scenarios/batch`         | Batch Operations    | `BatchRequestBuilder` with a changeset and `continueOnError`                    |
| `/scenarios/relationships` | Relationships       | Associate, disassociate, bind on create, retrieve related                       |
| `/scenarios/metadata`      | Metadata Explorer   | Create an entity and attributes, `RetrieveMetadataChanges`                      |
| `/scenarios/files`         | File Operations     | Chunked upload, download                                                        |
| `/scenarios/actions`       | Actions & Functions | `WhoAmI`, `RetrieveVersion`, `WinOpportunity`, `ExecuteWorkflow`, `GrantAccess` |
| `/scenarios/messages`      | Messages            | `Assign`, `SetState`, `Merge`, solution export and import                       |
| `/scenarios/discovery`     | Discovery           | `DiscoveryClient.listOrganizations()`                                           |
| `/scenarios/observability` | Observability       | Simulated retry and concurrency demos (see Known gaps)                          |
| `/scenarios/typesafety`    | Type Safety         | Read, create and update type examples                                           |
| `/scenarios/reference`     | API Reference       | When to use the raw API, typed calls or `OrganizationService`                   |

## Layout

```
src/
├── components/
│   ├── Header.tsx        # Navigation bar
│   ├── demo/             # CodeComparison, ProgressTracker, LoadingState
│   └── errors/           # ErrorDisplay (one generic error panel)
├── context/              # DataverseContext: client, orgService, tokenProvider
├── hooks/                # useTheme
├── pages/                # One folder per scenario, plus the account pages
├── types/                # Account types and small shared types (JsonObject, ProgressState)
├── config.ts             # MSAL configuration and Dataverse URL, from VITE_* variables
└── main.tsx              # MSAL initialisation and rendering
```

`DataverseProvider` creates one `DataverseClient` and one `OrganizationService` per signed-in
account and shares them, with the MSAL token provider, through `useDataverse()`. The account list,
detail, create and dashboard pages still build their own client.

## Code examples

These match what the pages run.

### Three ways to create an account

```typescript
// Raw request builder
const created = await client.api("/accounts").post({ name: "Contoso Ltd", revenue: 1000000 });

// Typed response
const account = await client.api("/accounts").post<Account>({ name: "Contoso Ltd" });

// OrganizationService
const id = await orgService.create<string>("accounts", { name: "Contoso Ltd" });
```

### Batch with a changeset

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

batch.beginChangeset();
batch.addRequest("1", "POST", "/accounts", undefined, { name: "Parent Account" });
batch.addRequest("2", "POST", "/contacts", undefined, {
  firstname: "John",
  lastname: "Doe",
  "parentcustomerid_account@odata.bind": "$1", // refers to the first request in the changeset
});
batch.endChangeset();
batch.addRequest("3", "GET", "/accounts?$select=name&$top=5");

const result = await batch.execute({ continueOnError: true });
console.log(result.success, result.successfulRequests, result.failedRequests);
```

`execute()` throws a `DataverseBatchError` when any request fails; its `requestErrors` map has
the failed responses by request id.

### Discovery

```typescript
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";

const discovery = new DiscoveryClient(tokenProvider); // from useDataverse()
const organizations = await discovery.listOrganizations();
```

### Associate and disassociate

```typescript
// The account owns the collection-valued contact_customer_accounts property.
await orgService.associate("accounts", accountId, "contact_customer_accounts", [
  { logicalName: "contact", id: contactId },
]);
await orgService.disassociate("accounts", accountId, "contact_customer_accounts", contactId);
```

### Paging

```typescript
const builder = client.api("/accounts").select("name").orderBy("name").top(5);

const page = await builder.getPage<Account>(); // page.value, page["@odata.nextLink"]
for await (const account of builder.iterate<Account>()) {
  // every item, following @odata.nextLink
}
const first10 = await builder.getAll<Account>({ maxItems: 10 });
```

## Troubleshooting

- **Sign-in fails or loops:** check that the redirect URI in the app registration matches
  `VITE_AZURE_REDIRECT_URI` exactly, and that `VITE_AZURE_CLIENT_ID` and `VITE_AZURE_TENANT_ID` are set.
- **Calls fail with 401 or 403:** `VITE_DATAVERSE_URL` must be the environment you were granted
  `user_impersonation` for, and your user needs a security role in it.
- **Pages show "Initializing Dataverse SDK...":** you are not signed in yet, or `VITE_DATAVERSE_URL` is empty.
- **Build errors about missing SDK exports:** run `pnpm build` at the repository root first.

## More

- [Design record](./docs/IMPLEMENTATION_PLAN.md): the plan the sample was built from (not a status report)
- [SDK documentation](../../docs/)
- [Contributing](../../CONTRIBUTING.md)
- [CHANGELOG](./CHANGELOG.md): generated by Changesets

## License

Part of `@mohsinonxrm/dataverse-sdk-typescript`, licensed under GNU AGPL v3.0. See [LICENSE](../../LICENSE).
