import {
  DataverseInvalidRequestError,
  MiddlewareRequestOptions,
  parseODataError,
  type RequestAdapter,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/** The largest block `UploadBlock` accepts: Dataverse rejects bigger ones. */
export const MAX_CHUNK_SIZE = 4 * 1024 * 1024;

/**
 * Send a request and return the response, or throw the parsed error for a non-2xx response
 * (`DataverseODataError`, or `DataverseThrottleError` for 429), with `status`, `code` and the
 * response details (#61).
 */
export async function sendChecked(
  adapter: RequestAdapter,
  request: RequestInformation,
  signal?: AbortSignal,
  timeoutMs?: number
): Promise<Response> {
  const res = await adapter.send({
    ...request,
    ...(signal ? { signal } : {}),
    ...(timeoutMs === undefined ? {} : { attemptTimeoutMs: timeoutMs }),
  });
  if (!res.ok) throw await parseODataError(res);
  return res;
}

/**
 * Retry options for one `UploadBlock` request. Sending a block again with the same block id
 * replaces it, so a block is safe to retry after a 5xx, which the client otherwise does only for
 * idempotent methods. After a dropped connection it is retried when the client sets
 * `retry.retryNetworkErrors: true`. The number of retries is still the client's.
 */
export function blockRetryOptions(): MiddlewareRequestOptions {
  return new MiddlewareRequestOptions([{ type: "retry", retryNonIdempotent: true }]);
}

/** Check `chunkSize` before anything is sent. */
export function checkChunkSize(chunkSize: number): number {
  if (!Number.isInteger(chunkSize) || chunkSize < 1 || chunkSize > MAX_CHUNK_SIZE) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chunkSize",
      `must be a whole number of bytes from 1 to ${String(MAX_CHUNK_SIZE)} (4 MB)`
    );
  }
  return chunkSize;
}
