---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

`dataverse-gen generate` signs in with the configured `auth` (#81). Before, a config with `auth` (which `init` writes) stopped with "Authentication not implemented yet. Please provide --token manually."

- `auth.flow: "deviceCode"` signs in with a `PublicClientApplication` and prints the device code instructions. `"clientCredentials"` (or `"clientSecret"`) uses a `ConfidentialClientApplication` with a client secret. Both go through `MsalNodeTokenProvider` from `@mohsinonxrm/dataverse-sdk-auth-msal-node`, for the `<environmentUrl>/.default` scope.
- The token is acquired once per run, and `--token` still takes precedence.
- `tenantId`, `clientId` and `clientSecret` fall back to `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET`, so the config file can be committed without them. `auth.authority` sets the authority for sovereign clouds.
- `"interactive"` is rejected with a pointer to `"deviceCode"`. With neither `auth` nor `--token`, `generate` says so instead of calling Dataverse unauthenticated.
- `validate` checks the auth settings, and warns when the client secret is in the file.
- `generateCode(config)` signs in the same way when no access token is passed. `createCliTokenProvider()`, `acquireCliToken()` and `dataverseScope()` are exported.
- The generator now depends on `@mohsinonxrm/dataverse-sdk-auth-msal-node` and `@azure/msal-node`.
