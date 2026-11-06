# Samples

All samples use:

- Node 22+
- TypeScript
- If UI: React 18 + Fluent UI v9

Each sample has its own README with setup steps. Run them from the sample folder with `pnpm start`
(the SPA uses `pnpm dev`).

## Samples list

### 1) spa-fluentui-v9

- MSAL browser auth
- CRUD, relationships (`associate` / `disassociate`), `$batch`, file upload and download
  (`FileColumnClient`), FetchXML (`client.fetchXml()`), discovery
- paging, error display and `Prefer` helpers

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

The `dataverse-gen` tool reads its own `DATAVERSE_URL`, `DATAVERSE_TENANT_ID`,
`DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET` (see the generator README).
