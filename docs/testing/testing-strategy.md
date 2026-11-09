# Testing Strategy

## Goals

- Validate request construction, headers, query options, and Prefer behaviors.
- Validate resiliency policies (retry, throttling, concurrency).
- Validate batch formatting and parsing correctness.
- Validate strict metadata typing (compile-time) and runtime metadata operations.
- Validate typed actions/functions/messages execution paths and return values.
- Validate the browser packages under a strict Content-Security-Policy.

## Test layers

### 1) Unit and contract tests (fast, deterministic)

Every package has a Vitest suite (`pnpm test`). Tests that cross the HTTP boundary use a real
`DataverseClient` with the recording fake fetch of the private
[`@mohsinonxrm/dataverse-sdk-testing`](../../packages/dataverse-sdk-testing/README.md) package, and
assert on the method, URL, headers and body bytes that reach `fetch` (see
[Contract tests](#contract-tests-fake-fetch)). Some core and metadata tests use MSW.

- request builder URL/query/header generation
- Prefer helpers produce correct header values (typed)
- middleware pipeline order and behavior
- retries on 429 for every method, and on 502/503/504 for idempotent requests; Retry-After parsing
  and `maxRetryAfterMs`
- concurrency limiter behavior and adaptation to `x-ms-dop-hint` (when provided by the mock response)
- batch body is multipart/mixed and parsed correctly; batches split at 1000 requests and keep
  change set boundaries

Core's suite enforces a coverage gate (85% statements, functions and lines, 80% branches).

### 2) Compile-time type tests

The actions, functions, messages and metadata packages run `tsd` (`test:types`, part of their
`test` script).

- invalid metadata payloads don't compile; the `*Create` types are discriminated on `@odata.type`
- the generated constructors and `<Name>Response` types (the #300 return contract)

### 3) Browser smoke tests

`pnpm test:browser` bundles the browser packages with Vite and runs them in Chromium under a
strict Content-Security-Policy ([browser-tests](../../packages/dataverse-sdk-browser-tests)).

### 4) Integration tests (gated)

`pnpm test:integration` runs live tests against a real Dataverse org, only when the `DATAVERSE_*`
variables are set ([integration-tests](../../packages/dataverse-sdk-integration-tests/README.md)
lists what they cover).

## Test gating

- Unit, contract and type tests run on every PR, on Node 22, 24 and 26; browser tests run on
  every PR too.
- Integration tests run nightly and on manual workflow dispatch
  (`.github/workflows/integration-tests.yml`).

## Contract tests (fake fetch)

Package tests that cross the HTTP boundary must use a real `DataverseClient` together with the recording fake fetch from the private `@mohsinonxrm/dataverse-sdk-testing` package (`packages/dataverse-sdk-testing`). Assert on the method, URL, headers and body bytes that reach `fetch`. Don't mock `client.api()` or other SDK surfaces. Known bugs are pinned with `it.fails("#NN: …")`, and the PR that fixes the issue flips them to `it`.
