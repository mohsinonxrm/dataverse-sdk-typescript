# Test Matrix

What each package's tests check. Live checks are in
[integration-tests](../../packages/dataverse-sdk-integration-tests/README.md), one file per area.

## dataverse-sdk-core

Unit and contract:

- builds URLs for relative and absolute paths
- query options serialization (`encodeURIComponent` encoding)
- Prefer header composition
- retries on 429 for every method, on 502/503/504 for idempotent requests; honors Retry-After
  up to `maxRetryAfterMs`
- concurrency limiter adapts to `x-ms-dop-hint` when present

Acceptance:

- coverage gate: 85% statements, functions and lines, 80% branches
- deterministic retry timing tests (mocked clock)

## dataverse-sdk-batch

Contract:

- multipart body correctness
- parse responses preserving part order
- auto-split >1000 requests into multiple batches
- change set atomic grouping preserved

## dataverse-sdk-actions, -functions, -messages

Unit:

- POST (actions, messages) or GET with parameter aliases (functions), and the route of bound,
  collection-bound and unbound operations
- parameters objects, entity references and payloads, enum bodies
- return values: the value itself, never the OData envelope (#300)

Type tests (`tsd`): constructors and `<Name>Response` types.

Integration: the generated operations against a live org.

## dataverse-sdk-metadata

Type tests (`tsd`):

- invalid write payloads don't compile

Unit:

- create, update and retrieve requests, ids from `OData-EntityId`

Integration:

- entity definitions, `retrieveMetadataChanges`, `canBeReferenced`

## dataverse-sdk-discovery

Unit:

- parses the Global Discovery Service v2.0 payload, in every cloud (Commercial, GCC, GCC High,
  DoD, China), with the token scope of that cloud
