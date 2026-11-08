# @mohsinonxrm/dataverse-sdk-testing (internal)

This package is a private test harness for the SDK packages, and is **not published**.

Write tests against a **real `DataverseClient`**, and assert on what actually reaches `fetch`. Don't mock `client.api()`, `client.send()` or other SDK surfaces. Mocking those boundaries is how batch, xrm and files shipped broken while their unit tests passed (#39).

```ts
import {
  createTestClient,
  jsonResponse,
  createdResponse,
  batchResponse,
} from "@mohsinonxrm/dataverse-sdk-testing";

const { client, fake, tokenProvider } = createTestClient(); // retries off, silent logger
fake.on("POST", "/accounts", () => createdResponse("accounts", id));
await client.api("accounts").post({ name: "Contoso" });

const sent = fake.last();
sent.method; // "POST"
sent.path; // "/accounts" (relative to the Web API root)
sent.headers; // lower-cased; duplicates joined as fetch sends them
sent.bodyText; // exact bytes on the wire, decoded
```

## What it provides

| Helper                                                                    | Purpose                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createTestClient(options?, fakeOptions?)`                                | A real client wired to a fake fetch and a fake token provider                                                                                                                                                                                                               |
| `createFakeFetch()`                                                       | A recording `FetchProvider`. Routes are matched by method and path; later routes win; `times` limits how often a route answers; unmatched requests throw. Like fetch, it rejects with an `AbortError` as soon as the signal aborts, even while a responder is still running |
| `jsonResponse`, `noContent`, `createdResponse`, `odataError`, `throttled` | Responses that carry the headers a live org sends (`x-ms-service-request-id`, `req_id`, `x-ms-dop-hint`, rate-limit headers). `createdResponse(set, id, apiUrl?)` takes the Web API root for a client that doesn't use the default one                                      |
| `batchResponse([...], { status?, boundary?, headers? })`                  | A Dataverse-format `multipart/mixed` `$batch` response, including change sets. Pass `status` for a stop-on-error `$batch`, which Dataverse answers with the failing request's status                                                                                        |

## Known bugs: `it.fails`

A contract test that pins a known bug uses `it.fails("#NN: …")` and names its issue. When the fix lands, that test starts passing, so `it.fails` reports it as a failure. Change it to `it` in the fixing PR. Never delete or skip these tests.

Core's own contract tests live in `test/core.contract.test.ts` in this package, because core can't depend on this package without a cycle.
