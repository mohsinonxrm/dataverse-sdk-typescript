# batch: BatchRequestBuilder cannot run a batch against Dataverse (wrong transport, a JSON.parse of a multipart response, and parts without Content-ID dropped)
<!-- labels: bug,P0,pkg:batch,fetchxml-studio -->

## Summary

`BatchRequestBuilder.execute()` fails at every stage against a real `$batch` exchange:

1. **Transport.**
   - It calls `client.api("/$batch").post(batchBody, headers)`. The second argument of `post()` is
     `RequestOptions`, not headers, so the multipart `Content-Type` and `Prefer` are dropped.
   - The request goes out as `content-type: application/json` with a JSON-quoted body (see the
     raw-body issue).
2. **Response.** `builder.post()` `JSON.parse`s the response text. A multipart response throws
   `SyntaxError`. The code then expects a `Response` object (`response.headers`, `response.text()`),
   which `post()` never returns.
3. **Decoding.** `decodeBatchResponse()` keeps only parts with a `Content-ID`. Dataverse returns no
   Content-ID for operations outside a changeset, so their results are silently dropped.
4. **Encoding.**
   - Operations outside a changeset get no `Content-ID`.
   - Changeset Content-IDs are renumbered `1..n` *per changeset*. The caller's ids are lost and
     collide across changesets, so results can't be matched back to requests.
5. **Semantics.**
   - `continueOnError: true` still throws `DataverseBatchError` when any operation fails.
   - There is no way to tell "the batch stopped early" (fewer responses than requests) from "all
     ran".
   - Batches over 1000 requests throw "split manually", although the README describes
     auto-splitting.

## Why FetchXML Studio needs this

Bulk delete, activate and deactivate, close records and run workflow go through `$batch` (#61,
#143, #149, #264 in FetchXML Studio). FetchXML Studio relies on this contract: one result per
operation, in order, **and** a detectable early stop when `odata.continue-on-error` isn't set, so
that it can redo the remaining records one by one.

## Repro

Two DELETEs and the response shape Dataverse returns (no changeset; second record missing):

```js
const b = new BatchRequestBuilder(client);
b.addRequest('d1', 'DELETE', 'accounts(00000000-0000-0000-0000-000000000001)');
b.addRequest('d2', 'DELETE', 'accounts(00000000-0000-0000-0000-000000000002)');
await b.execute();
```

Actual output (`repro/batch.mjs`):

```
## B1. BatchRequestBuilder.execute(): what is sent, and what happens with the response
 { url: 'https://org.crm.dynamics.com/api/data/v9.2/$batch',
   contentType: 'application/json; charset=utf-8',
   bodyFirstChars: '"\"--batch_1793762643148_xsprnx96k5m\\r\\nCo"',
   outcome: 'THREW SyntaxError: No number after minus sign in JSON at position 1 (line 1 column 2)' }

## B2. decodeBatchResponse() on a real-shaped response (no Content-ID outside changesets)
 { partsInResponse: 2, decoded: 0 }

## B3. encodeBatchRequest(): Content-ID on non-changeset parts; changeset ids renumbered
 [ 'GET /api/data/v9.2/WhoAmI HTTP/1.1',          <- no Content-ID
   'Content-ID: 1', 'POST /api/data/v9.2/accounts HTTP/1.1',   <- caller id "a"
   'Content-ID: 1', 'POST /api/data/v9.2/accounts HTTP/1.1' ]  <- caller id "b", collides
```

## Root cause

- `packages/dataverse-sdk-batch/src/BatchRequestBuilder.ts:277`: headers are passed as
  `RequestOptions`, and the code expects a `Response`.
- `packages/dataverse-sdk-core/src/pipeline/FetchRequestAdapter.ts:24`: the body is JSON-stringified.
- `packages/dataverse-sdk-batch/src/decoding.ts:192, 204`: `if (contentId)` drops parts without a
  Content-ID.
- `packages/dataverse-sdk-batch/src/encoding.ts:39-41, 87`: Content-ID is written only inside
  changesets, renumbered from 1.
- `packages/dataverse-sdk-batch/src/BatchRequestBuilder.ts:350-366`: throws even with
  `continueOnError`.
- `packages/dataverse-sdk-batch/src/BatchRequestBuilder.ts:302-310`: no auto-split.
- The unit tests mock `client.api().post()` to return a `Response`-like object, which hides all of
  this.

## Proposed fix

1. Send through `client.send()` with a raw string body (needs the raw-body fix). Set
   `content-type: multipart/mixed; boundary=…` explicitly and read the raw `Response`.
2. Decode parts **positionally**: the response parts come in request order, and changeset parts
   carry Content-ID. Return `results: Array<{ requestId, status, statusText, headers, body }>` in
   request order, plus the existing map keyed by the caller's id.
3. Keep caller ids: map caller id to Content-ID, and make Content-IDs unique across the whole
   batch. Support `$<content-id>` references inside a changeset.
4. `continueOnError` returns results without throwing. Without it, return a result whose
   `stoppedEarly: true` / `completed < total` is explicit (or throw a typed error that carries the
   partial results).
5. Auto-split over 1000 operations, or remove the claim from the README and docs.
6. Replace the mocked-builder tests with tests that run the real client against a fake `fetch`
   and recorded Dataverse multipart responses: 204, 404 `0x80040217` mid-batch, a 429 part,
   stopped early, a changeset rollback, CRLF and LF variants.

## Acceptance criteria

- [ ] The repro returns two results, `204` and `404` (with the parsed error body), in order.
- [ ] A batch that Dataverse stops after the first failure reports `completed: 1, total: 2`
      without losing the first result.
- [ ] Caller ids are preserved; mixed non-changeset and changeset batches decode completely.
- [ ] Recorded-response tests as listed in the proposed fix.

## Workaround in FetchXML Studio until fixed

FetchXML Studio ships its own multipart encoder and decoder (`batchCodec.ts`) behind its gateway.

---
_Generated by [Claude Code](https://claude.ai/code)_
