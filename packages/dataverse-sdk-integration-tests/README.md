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

Each record a run creates has a name that starts with `sdk-it-…` (the run's id) or `sdk-int ` and contains the run's id, and is deleted in `afterAll`; anything a cancelled run leaves behind is removed by the sweeper (see [Sweeping leftovers](#sweeping-leftovers)). `it.fails("#NN: …")` pins a bug that reproduces live, and the PR that fixes the issue flips it to `it`.

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

A failed test is **not retried**. Most tests create records, and a retry would create them again: in the 2.0.1 release run a test that created an account timed out while the org was slow, its retry created a second account with the same name, both tests then found two records instead of one, and the first account was never deleted (#496). Instead, each test gets 120 s (`testTimeout` and `hookTimeout` in `vitest.config.ts`), enough for the org's slow moments, and:

- A test that creates records and then looks them up by name creates them in `beforeAll` (hooks aren't retried) or names them uniquely for the attempt, so it finds exactly its own records.
- Every created id is kept in a list and deleted in `afterAll`, never only the last one.
- Only a read-only or idempotent test may opt into a retry, with `it(name, { retry: 1 }, fn)`. `test/flaky-reporter.ts` lists any test that passed only on its retry and, on GitHub Actions, adds a "Flaky live test (passed on retry)" warning to the run. A test that keeps showing up there needs fixing, not more retries.

### Sweeping leftovers

A run that is cancelled or times out can leave records behind. `scripts/sweep.mjs` finds them, using the same `DATAVERSE_*` variables and the built SDK:

```bash
node packages/dataverse-sdk-integration-tests/scripts/sweep.mjs            # dry run: lists what it would delete
node packages/dataverse-sdk-integration-tests/scripts/sweep.mjs --delete   # deletes it
```

It only touches records whose name starts with a prefix the live tests or the samples use (`sdk-it-`, `sdk-int `, `sdk-sample-`) **and** that were created more than 2 hours ago, so it never touches a run in progress: accounts and opportunities (`name`), contacts (`lastname`), leads (`subject`), teams (`name`), `msdyn_richtextfiles` (`msdyn_name`) and unmanaged solutions (`friendlyname`). Test tables (`new_sdkit…`) and global choices (`new_sdkitgc…`) are listed, never deleted: a choice has no creation date, so a run in progress can't be told apart, and deleting a table takes its data and relationships with it. Delete those by hand after checking no run is in progress. The nightly Integration Tests workflow runs the sweeper with `--delete` as its last step, also when the tests failed.
