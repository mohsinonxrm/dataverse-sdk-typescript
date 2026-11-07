# @mohsinonxrm/dataverse-sdk-integration-tests (internal)

These are live integration tests that run against a real Dataverse org. This package is private and **not published**. It's not part of `pnpm test`.

## What it covers

- **Basics:** WhoAmI, `RetrieveVersion()`, the response headers the SDK relies on (`x-ms-service-request-id`, `x-ms-dop-hint`), and `$metadata` as XML.
- **CRUD:** a create → read → update → delete round trip on `accounts`.
- **Query encoding and URL length:** a `$filter` with spaces, sent `+`-encoded (#52), and a 2,000+ character `$filter` (#10).
- **`$batch`:** a hand-built batch that records Dataverse's real response format (#55, #56), and `BatchRequestBuilder` itself (#54).
- **Metadata:** entity definitions, `retrieveMetadataChanges` (#62) and `canBeReferenced` (#63).
- **The other areas, one file each** (`test/<area>.int.test.ts`): core (paging, FetchXML, impersonation, timeouts, duplicate detection, OData literals, `createAndGetId`, the 401 refresh, errors), `OrganizationService`, files, discovery, MSAL Node, entities-runtime, the generated actions, functions and messages (parameters, entity references and payloads, return values, overloads, collection-bound operations, enum bodies) and `dataverse-gen`.

Each record a run creates has a unique `sdk-it-…` name and is deleted in `afterAll`. `it.fails("#NN: …")` pins a bug that reproduces live, and the PR that fixes the issue flips it to `it`.

## Running

Set these variables. The app registration must be added to the org as an **application user** with a security role. Use a **dev or sandbox** org, never production.

| Variable                  | Example                            |
| ------------------------- | ---------------------------------- |
| `DATAVERSE_URL`           | `https://yourorg.crm.dynamics.com` |
| `DATAVERSE_TENANT_ID`     | Entra tenant id                    |
| `DATAVERSE_CLIENT_ID`     | App registration (client) id       |
| `DATAVERSE_CLIENT_SECRET` | Client secret                      |

```bash
pnpm build
pnpm test:integration
```

When the variables aren't set, the tests are skipped. Set `DATAVERSE_INTEGRATION_REQUIRED=1` to fail instead; CI does this.

Behind an HTTP proxy, Node's `fetch` ignores `HTTPS_PROXY` unless you run with `NODE_USE_ENV_PROXY=1` (Node 22.21+ / 24+).

In CI, `.github/workflows/integration-tests.yml` runs nightly and on demand, using the repository secrets with the same names.
