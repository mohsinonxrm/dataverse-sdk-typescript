---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`createAndGetId()` no longer hangs, and works with `Prefer: return=representation` (#289).

- **No hang.** It released the response body with `await res.body?.cancel()`. When middleware (such as a logger that reads bodies) had tee'd the body, that cancel never settled, so the call never returned. The body is now released without waiting, as #241 did in metadata.
- **`return=representation`.** Such a create is answered `201 Created` with the record in the body and no `OData-EntityId` or `Location` header. New `primaryIdAttribute` option (`CreateAndGetIdOptions`, which extends `RequestOptions`): `createAndGetId(body, { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" })` reads the id from the body. The headers win when both are present. Without the option, such a create rejects with `DataverseInvalidRequestError`, and the message says to pass `primaryIdAttribute`. The name matches `entityIdFromBatchResponse(part, { primaryIdAttribute })` in the batch package.
- `entityIdFromResponse()` throws a `DataverseInvalidRequestError` whose message explains that a `return=representation` response has the id in its body. Before, it was a `MissingParameter` error.
