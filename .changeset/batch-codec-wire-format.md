---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

The batch encoder writes what Dataverse accepts, and the decoder keeps every response (#55, #56).

- **Encoder.** A part without a body now ends its headers with a blank line (without it Dataverse rejected the whole batch with 400 `0x80060888`). A part with a body gets `Content-Type: application/json; type=entry` unless the request sets a content type (without it Dataverse answered 400 `0x80048d19`). Requests and changesets are sent in the order they were added, instead of all requests first.
- **Content-IDs.** Inside a changeset each request's own id is its `Content-ID`, so ids no longer collide across changesets and a later request can refer to an earlier one as `$<id>`. Changeset ids may only contain letters, digits, `.`, `_`, `~` and `-`. `dependsOn` is now checked: every id must be an earlier request of the same changeset.
- **URLs.** `BatchRequestBuilder` resolves relative URLs (`accounts`, `/accounts`) against the client's Web API root, and leaves `$<id>` references alone.
- **Decoder.** `decodeBatchResponse()` returns every operation response in order, including the ones outside a changeset that have no `Content-ID` (they were all dropped). It parses header names and media types case-insensitively, accepts quoted boundaries, LF-only line endings and trailing whitespace on boundary lines, lower-cases header names and never trims bodies (`bodyText` keeps the exact text).
- **Results.** Responses are keyed by the id passed to `addRequest()` (they were keyed by Content-ID). `BatchExecutionResult` gains `results` (in request order), `skippedRequestIds` and `stoppedEarly`. `BatchResponseStep.headers` names are lower-cased, and `bodyText` is new.
- **Exports.** `encodeBatchRequest`, `decodeBatchResponse`, `generateBoundary`, `generateChangesetBoundary`, `extractBoundary`, `JSON_PART_CONTENT_TYPE` and the `BatchItem`, `BatchChangeset`, `BatchResponsePart` and `EncodeBatchOptions` types. `BatchRequestBuilder.encode(boundary)` returns the body `execute()` sends.
