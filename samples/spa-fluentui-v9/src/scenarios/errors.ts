/**
 * Error scenarios: each one makes the SDK throw a different typed error. Each `#region` is shown
 * on the page as the code that runs.
 */
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import type { FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { Sdk } from "../sdk/createSdk";

// #region odata-error
export async function invalidFilter(
  { client }: Sdk,
  input: { filter: string },
  signal: AbortSignal
) {
  // Dataverse answers 400 with an OData error body: DataverseODataError carries its
  // status, code, message, innerError, and the request and correlation ids.
  return client.api("accounts").select("name").filter(input.filter).top(1).get({ signal });
}
// #endregion

// #region not-found
export async function missingRecord({ client }: Sdk, input: { id: string }, signal: AbortSignal) {
  return client.api(`accounts(${input.id})`).select("name").get({ signal });
}
// #endregion

// #region throttle
/** A fetch that answers the first request with 429, the way Dataverse signals a service protection limit. */
function throttleFirstRequest(retryAfterSeconds: number, inner: FetchProvider): FetchProvider {
  let throttled = false;
  return {
    fetch(input, init) {
      if (throttled) return inner.fetch(input, init);
      throttled = true;
      const body = {
        error: {
          code: "0x80072322",
          message: "Number of requests exceeded the limit of 6000 over time window of 300 seconds.",
        },
      };
      return Promise.resolve(
        new Response(JSON.stringify(body), {
          status: 429,
          headers: { "content-type": "application/json", "retry-after": String(retryAfterSeconds) },
        })
      );
    },
  };
}

export async function throttled(
  sdk: Sdk,
  input: { retryAfterSeconds: number },
  signal: AbortSignal
) {
  const client = sdk.createClient({
    fetchProvider: throttleFirstRequest(input.retryAfterSeconds, sdk.fetchProvider),
    // A Retry-After up to this long is waited out and retried; a longer one throws
    // DataverseThrottleError with retryAfterMs, so the app decides what to do.
    retry: { maxRetryAfterMs: 5_000 },
  });
  return client.api("WhoAmI").get({ signal });
}
// #endregion

// #region network
export async function offline(sdk: Sdk, signal: AbortSignal) {
  // fetch() rejecting (offline, DNS, CORS) becomes DataverseNetworkError ("ConnectionFailed").
  // A GET is retried first, like after a 503 (POST isn't). The retries are short here so the
  // error shows at once; retry: { retryNetworkErrors: false } turns them off.
  const client = sdk.createClient({
    fetchProvider: { fetch: () => Promise.reject(new TypeError("Failed to fetch")) },
    retry: { maxRetries: 2, baseDelayMs: 200 },
  });
  return client.api("WhoAmI").get({ signal });
}
// #endregion

// #region timeout
export async function timeout({ client }: Sdk, input: { timeoutMs: number }, signal: AbortSignal) {
  // timeoutMs limits the whole request, retries included: DataverseNetworkError ("RequestTimeout").
  return client.api("accounts").select("name").get({ signal, timeoutMs: input.timeoutMs });
}
// #endregion

// #region abort
export async function aborted({ client }: Sdk, signal: AbortSignal) {
  const controller = new AbortController();
  signal.addEventListener("abort", () => controller.abort());
  setTimeout(() => controller.abort(), 20);
  // Aborting rejects with DataverseAbortError (its name is "AbortError").
  return client.api("accounts").select("name").get({ signal: controller.signal });
}
// #endregion

// #region foreign-origin
export async function foreignOrigin({ client }: Sdk, signal: AbortSignal) {
  // The bearer token is only sent to the client's own origin. A request for another origin
  // throws DataverseInvalidRequestError before anything is sent (onForeignOrigin: "throw").
  return client.api("https://example.com/api/data/v9.2/WhoAmI").get({ signal });
}
// #endregion

// #region batch-error
export async function failedChangeset({ client }: Sdk) {
  const batch = new BatchRequestBuilder(client);
  batch.beginChangeset();
  batch.addRequest("create", "POST", "accounts", undefined, {
    name: "Rolled back with its change set",
  });
  // If-Match: * makes this an update that fails with 404 instead of creating the record.
  batch.addRequest(
    "update",
    "PATCH",
    `accounts(${crypto.randomUUID()})`,
    { "If-Match": "*" },
    { name: "Missing" }
  );
  batch.endChangeset();
  // Without continueOnError, a failed request throws DataverseBatchError with the full result.
  return batch.execute();
}
// #endregion
