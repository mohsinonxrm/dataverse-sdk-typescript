# Test Matrix (v1)

## dataverse-sdk-core

Unit:

- builds URLs for relative and absolute paths
- query options serialization
- Prefer header composition
  Contract:
- retries on 429, >=502; honor Retry-After
- concurrency limiter adapts to x-ms-dop-hint when present

Acceptance:

- 95%+ unit coverage on core modules
- deterministic retry timing tests (mocked clock)

## dataverse-sdk-batch

Contract:

- multipart body correctness
- parse responses preserving part order
- auto-split >1000 requests into multiple batches
- change set atomic grouping preserved

Acceptance:

- can execute 10-op batch + 2 changesets in contract tests
- split behavior verified

## dataverse-sdk-actions

Unit:

- correct POST method and endpoint composition
  Integration:
- ExecuteWorkflow works when enabled in test env

Acceptance:

- all minimal v1 actions have unit coverage

## dataverse-sdk-functions

Unit:

- correct GET method and alias parameter behavior
  Integration:
- WhoAmI works when enabled in test env

## dataverse-sdk-metadata

Type tests:

- invalid write payloads don’t compile
  Unit:
- builders return correct discriminated types
  Integration:
- create/update attribute patterns match doc and succeed
- RetrieveMetadataChanges typed call succeeds

## dataverse-sdk-messages

Unit:

- message mapping to action/function/CRUD is correct
- generic OrganizationRequest passes parameters through correctly

## dataverse-sdk-discovery

Unit:

- parses discovery payload and returns normalized org URLs
  Docs reference global discovery purpose and commercial endpoint.
