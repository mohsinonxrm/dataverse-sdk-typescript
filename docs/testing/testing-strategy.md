# Testing Strategy (v1)

## Goals

- Validate request construction, headers, query options, and Prefer behaviors.
- Validate resiliency policies (retry, throttling, concurrency).
- Validate batch formatting and parsing correctness.
- Validate strict metadata typing (compile-time) and runtime metadata operations.
- Validate typed actions/functions execution paths.

## Test layers

### 1) Unit tests (fast, deterministic)

Use vitest.

- request builder URL/query/header generation
- Prefer helpers produce correct header values (typed)
- middleware pipeline order and behavior
- retry backoff calculation and Retry-After parsing
- concurrency limiter behavior and adaptation to `x-ms-dop-hint` (when provided by mock response)

### 2) Contract tests (HTTP shape correctness)

Use MSW (browser-like) or a small fetch mock server.

- ensure retries happen on 429 / >=502 and honor Retry-After
- ensure batch body is multipart/mixed and parsed correctly
- ensure batch splits at <=1000 requests and preserves change set boundaries

### 3) Compile-time type tests (metadata strictness)

Use `tsd` (or `expectType` style).

- invalid metadata payload should not compile
- Read vs Create/Update split correctness:
  - write type must not accept read-only/internal-use fields
  - derived metadata types require correct discriminator and required fields

Metadata entity type model and derived types are explicitly documented.

### 4) Integration tests (optional, gated)

Run only when env vars present.

- WhoAmI typed function (GET) returns expected response shape
- ExecuteWorkflow typed action (POST) returns asyncoperation
- create/update attribute definition via metadata endpoints using documented patterns
- RetrieveMetadataChanges typed call

## Test gating

- Unit/contract/type tests run on every PR.
- Integration tests run on:
  - manual workflow dispatch
  - nightly schedule
  - release candidate pipeline
