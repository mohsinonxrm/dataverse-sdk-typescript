# spa-fluentui-v9

A React 18 single-page app, built with [Fluent UI React v9](https://react.fluentui.dev/) and
following Fluent 2, that runs the `@mohsinonxrm/dataverse-sdk-*` packages in the browser. It is
also the SDK's public **explorer site**, https://dataverse-sdk.mohsinonxrm.com, hosted on Azure
Static Web Apps (see [Hosting](#hosting)).

The **Explorer** page (`/explorer`) works like an API explorer: build a raw Web API request, or
pick one of the more than 2,300 typed actions, functions and messages and fill in its parameters; it shows
the SDK code for it, a preview of the request the SDK will send, and after **Run** the response,
its headers and every request sent.

Every scenario page runs real SDK calls and shows, for each scenario:

1. what it demonstrates, its inputs and a **Run** button;
2. **Code**: the exact code the Run button calls. It is read from the scenario module's own source
   (`src/scenarios/*.ts`, between `// #region` and `// #endregion`), so it can't drift from what
   runs;
3. **Result**: the value returned, or a card for the error thrown, laid out for its class;
4. **Requests**: every request the scenario sent, with method, URL, status, timing, headers and
   bodies, recorded by a middleware appended to the SDK pipeline (`middleware: { append: [...] }`).

It is a private sample (not published to npm), built against the packages in this workspace, and
compiles with `strict` TypeScript and no `any`.

## Run it

You need Node.js 22 or later and pnpm 9. From the repository root:

```bash
pnpm install
pnpm build                                  # the SDK packages the sample imports
pnpm --filter spa-fluentui-v9-sample dev    # http://localhost:3000
```

### Demo mode (no org needed)

Choose **Explore with demo data** on the sign-in page. The SDK clients are real; only their `fetch`
is replaced by an in-browser fake of a small Dataverse environment (`src/demo/`), so every request
still goes through the SDK pipeline and the inspector. Data lives in memory and resets on reload.
**Switch environment** in the account menu opens the environment picker against the demo's fake
Global Discovery Service (three environments, one disabled).

### Your own environment

1. **Register an app** in Microsoft Entra ID: platform "Single-page application", redirect URI
   `http://localhost:3000` (the site's URL when you use the hosted site), and the delegated
   permission `Dynamics CRM / user_impersonation`. No client secret. On the hosted site you can
   skip this and use the site's default app registration, which the form fills in.
2. **Sign in with Microsoft** on the sign-in page with the app registration's application
   (client) id and, optionally, the tenant and the environment URL (for example
   `https://yourorg.crm.dynamics.com`). They are kept in `localStorage` for the next visit; none
   of them is a secret. If your tenant lets only admins consent, the page links the admin consent
   URL for the client id.
3. **Pick an environment.** With an environment URL, the app opens in it. Without one, sign-in
   asks for the Global Discovery Service scope
   (`https://globaldisco.crm.dynamics.com/user_impersonation`, the same Dynamics CRM permission),
   and the environment picker lists your environments with `DiscoveryClient`
   (`src/auth/environments.ts`): name, URL, region, version and state, with a filter box when
   there are more than five. You can type a URL there instead. The app then runs exactly as if you
   had typed that URL. **Switch environment** in the account menu brings the picker back without
   signing out. The last environment of each account is remembered in `localStorage` and listed
   first; a reload keeps the tab's environment.

Write scenarios create, change and delete records in the environment in use.

The form's defaults can come from a `.env` file (`cp .env.example .env`):

| Variable                  | Meaning                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `VITE_AZURE_CLIENT_ID`    | Application (client) id of the app registration                 |
| `VITE_AZURE_TENANT_ID`    | Directory (tenant) id; defaults to `organizations`              |
| `VITE_AZURE_REDIRECT_URI` | Redirect URI; defaults to the page's origin                     |
| `VITE_DATAVERSE_URL`      | Environment URL, for example `https://yourorg.crm.dynamics.com` |

MSAL is loaded only when you sign in with Microsoft, so demo mode never downloads it. The site's
Content-Security-Policy allows public-cloud environments (`*.dynamics.com`) only, which covers the
Commercial Global Discovery Service (`globaldisco.crm.dynamics.com`) the picker asks. Sovereign
clouds aren't listed by it; they also need their hosts added to the CSP and `validateSettings()`.

## Pages

Scenarios that write create their own records and delete them afterwards, except on the CRUD
page, where each step is a separate scenario.

### Overview

- **Overview** (`/`): `WhoAmI` through `client.api()` and through the typed `WhoAmIFunction`, and
  how the app configures `DataverseClient` (logger, telemetry, retry hook, inspector middleware).

### Explorer

- **Explorer** (`/explorer`), in three panels:
  - **Samples** (queries, writes, concurrency, impersonation, metadata, functions, actions,
    messages and errors, each with its method), **Operations** (the catalog of one package:
    search, then pick) and **History** (what this browser ran, kept in `localStorage`).
  - **Request**: method, URL, body and headers for a raw request, or the constructor arguments
    and parameters of a typed operation (text, numbers, `true`/`false`, or JSON; a record
    reference can be `{ "logicalName": "account", "id": "…" }`). **Preview** shows the request
    as the SDK builds it, sent to a `fetch` that sends nothing. **Edit as a raw request** opens a
    typed operation's request in the request bar.
  - **Response**: the result (or the typed error), the response headers, the **SDK code** and
    the requests sent. A typed operation's code comes in three styles: `client.execute()`,
    `OrganizationService.execute()` and the `client.api()` chain of its request.

  The code shown is what **Run** runs: a raw request becomes a `client.api()` chain
  (`$select` → `select()`, `Prefer` → `preferRaw()`, `CallerObjectId` →
  `impersonateByObjectId()`, …) that is both run and printed (`src/explorer/rawRequest.ts`,
  `codegen.ts`). Links open a sample or an operation: `/explorer?sample=top-accounts`,
  `/explorer?op=functions/WhoAmI`, `/explorer?method=GET&url=accounts%3F%24top%3D3`.

  The operation catalog is read from the actions, functions and messages packages' source at
  build time (`src/explorer/catalog/parse.ts`, run by the Vite plugin in `vite.config.ts`), one
  chunk per package (about 40 KB gzipped each), loaded when you open that package's list. Each
  package is loaded whole (55 to 90 KB gzipped) only when you pick one of its operations; the
  scenario pages keep importing only the classes they use.

### Data

- **Queries** (`/data/queries`):
  - `select`, a `filter` built with the escaping `odata.*` helpers, `expand(nav, { select })`,
    `orderBy`, `top` and `count`, with formatted values;
  - expanding a collection with its own `select`, `orderBy` and `top`;
  - paging with `prefer().maxPageSize()`, `iterate()` (stopping early) and `getAll({ maxPages })`;
  - `client.fetchXml()` with `parsePagingCookie()` and `buildPagedFetchXml()` for page 2;
  - `apply()` (`$apply`): filter, group by city and count on the server;
  - listing system views, and running one with `client.savedQuery()`.
- **Create, read, update, delete** (`/data/crud`): `createAndGetId()`, `get()` with formatted
  values, `ifMatch("*").patch()` (update only, never upsert), and `delete()` behind a confirmation
  dialog.
- **Optimistic concurrency** (`/data/concurrency`): a stale `ifMatch(etag)` update refused with
  412, and a read-modify-write loop that retries on 412.
- **Impersonation** (`/data/impersonation`): list users, then `impersonateByObjectId()`
  (`CallerObjectId`) for `WhoAmI` and a create, showing `createdby` and `createdonbehalfby`.
- **Prefer headers** (`/data/prefer`): `returnRepresentation()` on a create (201 with the record),
  `maxPageSize()` and `allAnnotations()`, with `Preference-Applied` in the inspector.

### Operations

- **$batch** (`/operations/batch`): a change set where a contact refers to its account by
  Content-ID; `continueOnError` returning the failure in `result.errors`; and a large batch split
  by `batchSize` into several `$batch` requests.
- **OrganizationService** (`/operations/xrm`): `create`, `update`, `associate`, `retrieve` with
  expand, `retrieveMultiple`, `setState` and `delete`; `whoAmI()` and `execute()` with a typed
  function.
- **Actions, functions and messages** (`/operations/messages`): `RetrieveVersionFunction` and
  `RetrieveTotalRecordCountFunction` through `client.execute()`; `InitializeFromFunction` with
  `createEntityReference()`, whose template then creates a contact; `CanManyToManyAction` from the
  actions package, `CanBeReferencedRequest` from the messages package through
  `OrganizationService.execute()`, and a generic `OrganizationRequest` for any action or custom API.

### Metadata

- **Metadata browser** (`/metadata`): `MetadataClient.getEntityDefinitions()` with a searchable
  list of tables; `getAttributeDefinitions()` for a table's columns; and typed casts:
  `PicklistAttributeMetadata` with `OptionSet` options, `StringAttributeMetadata` with `MaxLength`,
  `LookupAttributeMetadata` with `Targets`.

### Files

- **Files and images** (`/files`): `FileColumnClient.upload()` in blocks with a progress bar (a
  chosen file, or a generated sample image on the account's `entityimage`, its profile picture),
  `download()` as a `Blob` with an image preview, and `delete()` behind a confirmation dialog.

### Environments

- **Environments** (`/environments`): `DiscoveryClient.listOrganizations()` with a region filter
  and `toEnvironment()`; a connection test (`WhoAmI` and `RetrieveVersion`) against the chosen
  environment; and **Use**, which switches every scenario to it.

### Diagnostics

- **Telemetry and logging** (`/diagnostics/telemetry`): the `logger`, `telemetry` and
  `retry.onRetry` hooks every client is created with, feeding a live log you can filter by source
  and level; a scenario that produces a retry, dependencies and a failure.

- **Error handling** (`/diagnostics/errors`): one scenario per error class:
  - `DataverseODataError` for a 400 and a 404;
  - `DataverseThrottleError`, from a 429 whose `Retry-After` is longer than `maxRetryAfterMs` (a
    short one is retried);
  - `DataverseNetworkError`, for an offline `fetch` and for `timeoutMs`;
  - `DataverseAbortError`;
  - `DataverseInvalidRequestError`, for a foreign origin, refused before anything is sent;
  - `DataverseBatchError`, for a change set that fails and is rolled back;
  - and an `ErrorBoundary` catching a render error.

### Docs

- **Documentation** (`/docs`): links to the guides, the operation lists and each package's API
  reference (its API Extractor report) in the repository, and a "Try it" link into the explorer
  for every sample. The docs aren't copied into the site, so there is one copy to keep current.

## Hosting

The site is deployed to Azure Static Web Apps by
[`.github/workflows/site.yml`](../../.github/workflows/site.yml) on every push to `main`, and by
hand. [`public/staticwebapp.config.json`](./public/staticwebapp.config.json) sets the response
headers (a strict Content-Security-Policy: scripts from the site only, requests to
`*.dynamics.com` and Microsoft sign-in only, no framing; HSTS) and the SPA fallback to
`index.html`. The e2e tests serve the build with those same headers.

The maintainer's one-time setup (the Static Web App, the deployment token secret, the optional
default app registration and its redirect URIs) is in [docs/site.md](../../docs/site.md).

## Design

- **Shell:** `FluentProvider` with `webLightTheme` or `webDarkTheme`; the header's toggle switches
  them and remembers the choice in `localStorage`. The header shows the environment, a Demo badge in
  demo mode, and the signed-in user with **Switch environment** and **Sign out**.
- **Environment picker:** a `Card` like the sign-in page, a `CompoundButton` per environment, a
  `SearchBox` filter, a `role="status"` count of what the filter shows, and `MessageBar` /
  `ErrorCard` for the empty and error states.
- **Navigation:** `NavDrawer`, grouped by scenario area. It is inline on wide screens and an overlay
  below 64em, opened from the header.
- **Styling:** `makeStyles` and Fluent `tokens` only.
- **Components:** `Card` per scenario, `Field` and inputs, `MessageBar` for results and errors,
  `Toast` for copy and destructive actions, `Skeleton` and `Spinner` while loading, `Dialog` before
  destructive runs, `Badge` for methods and HTTP status.
- **Accessibility:** a skip link, one `h1` per page and `h2` per scenario, labelled fields, focus
  moved to the page after navigation, and an `aria-live` summary of each run.
- **Code splitting:** the sign-in page, the environment picker, the shell, MSAL, demo mode and
  every page are separate chunks, loaded with `React.lazy` when first needed.

## Layout

```
src/
├── auth/         # AuthProvider; MSAL sign-in (msalSession.ts, loaded on demand); environment discovery
├── components/   # Scenario (the page pattern), CodeBlock, RequestInspector, ErrorCard, ErrorBoundary
├── demo/         # Demo mode: an in-browser fake of the Web API and the Global Discovery Service
├── explorer/     # The explorer: catalog, raw requests, code generation, preview, samples, history
├── lib/          # Snippet extraction, error classification, safe storage
├── pages/        # One lazily loaded page per route
├── scenarios/    # The code each scenario runs; its #regions are what the Code panels show
├── sdk/          # Client setup, the inspector middleware, the activity log
├── shell/        # Header, navigation, sign-in page, environment picker
├── theme/        # Light and dark theme
└── routes.ts     # Every page, its group and its lazy import
```

## Scripts

| Script           | What it does                                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`       | Vite dev server on port 3000                                                                                                                                    |
| `pnpm build`     | Type-check, then `vite build`                                                                                                                                   |
| `pnpm typecheck` | Type-check the app and the tests                                                                                                                                |
| `pnpm lint`      | ESLint with type-aware rules                                                                                                                                    |
| `pnpm test`      | Unit tests: the scenarios against the SDK's recording fake fetch and against demo mode, and the explorer's catalog, code generation, preview and samples        |
| `pnpm test:e2e`  | Browser tests: builds the app once, serves it with the site's headers (CSP included) and drives it in Chromium with Playwright, in demo mode, with an axe check |

`pnpm test:e2e` uses the Chromium installed with Playwright (`pnpm exec playwright install chromium`);
set `PLAYWRIGHT_CHROMIUM_PATH` to use another one.

## Troubleshooting

- **Sign-in fails or loops:** the redirect URI in the app registration must match
  `VITE_AZURE_REDIRECT_URI` (or the page's origin) exactly.
- **"Need admin approval":** your tenant lets only admins consent; an admin opens the admin
  consent link on the sign-in page once.
- **Calls fail with 401 or 403:** the environment URL must be the environment you consented
  `user_impersonation` for, and your user needs a security role in it.
- **The picker finds no environments, or fails:** the Global Discovery Service lists only
  environments where your account has a Dataverse license and a security role. If your tenant
  restricts user consent, an admin grants consent for the app once (the picker links it). You can
  still type an environment URL on the picker.
- **Build errors about missing SDK exports:** run `pnpm build` at the repository root first.

## License

Part of `@mohsinonxrm/dataverse-sdk-typescript`, licensed under GNU AGPL v3.0. See
[LICENSE](../../LICENSE).
