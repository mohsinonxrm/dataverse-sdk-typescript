---
"@mohsinonxrm/dataverse-sdk-core": minor
---

**Behaviour change:** retries no longer replay non-idempotent requests after 502, 503 or 504 (#12). A gateway error can arrive after Dataverse has already applied the request, so retrying a create, an action, a `$batch` or an unconditional PATCH could apply it twice. These requests are retried after a server error:

- GET, HEAD, OPTIONS, PUT and DELETE;
- PATCH that carries `If-Match`.

A **429 is still retried for every method**, because Dataverse rejects a throttled request before doing any work. To restore the old behaviour, set `retry: { retryNonIdempotent: true }` on the client, or `{ type: "retry", retryNonIdempotent: true }` per request.
