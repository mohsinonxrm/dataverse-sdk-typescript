# Samples

All samples use:

- Node 18+
- TypeScript
- If UI: React 18 + Fluent UI v9

## Samples list

### 1) spa-fluentui-v9

- MSAL browser auth
- list Accounts with paging
- demonstrate retry errors and user-friendly UX
- demonstrate Prefer helpers

### 2) node-cli-devicecode

- MSAL node device code auth
- WhoAmI typed function call
- basic CRUD

### 3) daemon-clientcredentials

- client credentials auth
- batch create/update with autosplit; cap 1000

### 4) metadata-ops

- create/update columns using typed payloads matching docs
- RetrieveMetadataChanges typed call

### 5) actions-functions

- ExecuteWorkflow typed action call
- WinOpportunity typed action call (Sales)

## Environment variables

- `DATAVERSE_URL` (e.g. https://org.crm.dynamics.com)
- `TENANT_ID`
- `CLIENT_ID`
- `CLIENT_SECRET` (daemon + generator workflows)
- SPA sample requires redirect URI + MSAL config.
