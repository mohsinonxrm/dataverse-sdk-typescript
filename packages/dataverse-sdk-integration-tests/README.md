# @mohsinonxrm/dataverse-sdk-integration-tests (internal)

These are live integration tests that run against a real Dataverse org. This package is private and **not published**. It's not part of `pnpm test`.

## What it covers

- **Basics:** WhoAmI, `RetrieveVersion()`, the response headers the SDK relies on (`x-ms-service-request-id`, `x-ms-dop-hint`), and `$metadata` as XML.
- **CRUD:** a create → read → update → delete round trip on `accounts`.
- **Query encoding and URL length:** a `$filter` with spaces, sent `+`-encoded (#52), and a 2,000+ character `$filter` (#10).
- **`$batch`:** a hand-built batch that records Dataverse's real response format (#55, #56), and `BatchRequestBuilder` itself (#54).
- **Metadata:** entity definitions, `retrieveMetadataChanges` (#62) and `canBeReferenced` (#63).
- **The other areas, one file each** (`test/<area>.int.test.ts`): core (paging, FetchXML, impersonation, timeouts, duplicate detection, OData literals, `createAndGetId`, the 401 refresh, errors), `OrganizationService`, files, discovery, MSAL Node, entities-runtime, the generated actions, functions and messages (parameters, entity references and payloads, return values, overloads, collection-bound operations, enum bodies) and `dataverse-gen`.

- **The documentation's examples** (`test/docs-examples.int.test.ts`): see below.

Each record a run creates has a unique `sdk-it-…` name and is deleted in `afterAll`. `it.fails("#NN: …")` pins a bug that reproduces live, and the PR that fixes the issue flips it to `it`.

## Documentation examples

A TypeScript block in the root `README.md` or `docs/getting-started.md` with `<!-- live -->` on a
line before its fence (invisible on GitHub) runs against the org, exactly as the Markdown has it:

````markdown
<!-- live -->

```typescript
const { UserId } = await client.execute(new WhoAmIFunction());
```
````

`test/docs-examples.int.test.ts` extracts the marked blocks, compiles each with TypeScript and runs
it as the body of an async function:

- The names the docs use without declaring them are passed in: `client`, `tokenProvider`,
  `baseUrl`, and a new record for each record id the block refers to (`accountId`, `contactId`,
  `existingId`, `id`, `opportunityId`, `leadId`). A block that declares one of them keeps its own.
- The placeholders of the setup blocks (`https://yourorg.crm.dynamics.com`, `YOUR_ORG`,
  `YOUR_TENANT_ID`, `YOUR_CLIENT_ID`, `process.env.AZURE_CLIENT_SECRET`, …) become this org and
  the `DATAVERSE_*` variables. `./generated/…` imports get code `dataverse-gen` generates for
  account and contact.
- The block must finish without throwing or writing to `console.error`, and every
  `DataverseClient` it builds must answer WhoAmI. The console is captured, not printed.
- Every record the block creates (`OData-EntityId`, `return=representation`, `CreateMultiple`,
  `$batch` parts, `QualifyLead`) is recorded by a fetch wrapper and deleted afterwards, with the
  block's own records.

Without an org, the same file still checks that every marked block is found, compiles, imports
only this package's dependencies and type-checks with those bindings. When you mark or unmark a
block, update the count in `FILES`. Leave a block unmarked when it needs a person (device code, a
browser), Azure resources, a workflow or a column the org doesn't have, or is deliberately partial.

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
