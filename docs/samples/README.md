# Samples

All samples use:

- Node 22+
- TypeScript
- If UI: React 18 + Fluent UI v9

Each sample has its own README with setup steps. Run them from the sample folder with `pnpm start`
(the SPA uses `pnpm dev`).

## Samples list

### 1) spa-fluentui-v9

- a page per SDK area, each with the code its **Run** button calls, the result (or a card for the
  error thrown) and every request sent, recorded by a middleware in the SDK pipeline
- queries (`select`, `filter`, `expand`, paging, FetchXML, `$apply`, views), CRUD with
  `ifMatch("*")`, optimistic concurrency (412), impersonation and `Prefer` headers
- `$batch` (change sets, `continueOnError`, split batches), `OrganizationService`, typed
  actions, functions and messages
- metadata browser, file and image columns (`FileColumnClient`), discovery and environment
  switching, telemetry and logging hooks
- **demo mode** (no org needed: the SDK runs against an in-browser fake of Dataverse) and MSAL
  sign-in, which is loaded only when you sign in with Microsoft; lazy-loaded scenario pages
- the **Explorer** page: any raw Web API request or any typed action, function or message, with
  its SDK code (three styles for a typed operation), a preview of the request, and the response;
  sample queries and a history
- also the SDK's public explorer site on Azure Static Web Apps (see [site.md](../site.md)):
  visitors sign in with their own environment and app registration, or use demo mode
- Playwright tests in demo mode (`pnpm --filter spa-fluentui-v9-sample test:e2e`), under the
  site's Content-Security-Policy and with an axe check, run in CI

### 2) node-cli-devicecode

- MSAL node device code auth, with organization discovery
- WhoAmI typed function call
- basic CRUD

### 3) daemon-clientcredentials

- client credentials auth
- bulk operations with `CreateMultipleAction` and `UpdateMultipleAction` (one request per call;
  the sample sends `BATCH_SIZE` records at a time and does not split larger sets itself)
- individual deletes through `OrganizationService`

### 4) metadata-ops

- create entities, attributes, a 1:N relationship and a global choice, both through `client.api()` and `MetadataClient`
- query metadata, delete it in the right order

### 5) actions-functions

- typed actions and functions run with `client.execute(...)`
- CreateMultiple, UpdateMultiple, UpsertMultiple, ExecuteWorkflow, WinOpportunity, Merge and the chunked file upload actions

### 6) batch-ops

- `$batch` with `BatchRequestBuilder`: independent requests and changesets
- Content-ID references (`$<id>`) inside a changeset
- `continueOnError`; batches over 1000 requests (or `batchSize`) are split automatically
- a speed comparison with individual calls and `CreateMultiple`

### 7) messages-sales-cs

- `OrganizationService.execute()` with typed messages (ExecuteWorkflow, WinOpportunity, Merge, ExportSolution, PublishXml)
- the generic `OrganizationRequest`
- ownership and state changes with `orgService.update()`

## Environment variables

The Node samples read these from a `.env` file (copy `.env.example`):

- `DATAVERSE_URL` (e.g. https://org.crm.dynamics.com)
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET` (all except the device code sample, which is a public client)

The SPA sample reads `VITE_AZURE_CLIENT_ID`, `VITE_AZURE_TENANT_ID`, `VITE_AZURE_REDIRECT_URI` and
`VITE_DATAVERSE_URL`, and needs a redirect URI registered on its app registration.

The `dataverse-gen` tool reads the org URL from `environmentUrl` in `.dataverse-gen.json`, and
its own `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET` (see the
generator README).
