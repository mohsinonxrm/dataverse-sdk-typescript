import type {
  FetchProvider,
  MiddlewareContext,
  RequestAdapter,
  RequestInformation,
} from "../abstractions/http.js";
import { buildUrl } from "../utils/url.js";
import { DataverseNetworkError } from "../errors/NamedErrors.js";
import { isStreamBody, toFetchBody } from "../utils/body.js";
import { linkSignals } from "../utils/signals.js";

export class FetchRequestAdapter implements RequestAdapter {
  constructor(private fetchProvider: FetchProvider) {}

  /**
   * Send one attempt with `fetch`. `attemptTimeoutMs` limits this attempt. `DataverseClient.send()`
   * turns `timeoutMs` into a deadline for the whole request (retries and waits included) and
   * passes that as `signal`; when the adapter is used on its own, `timeoutMs` limits the attempt.
   */
  async send(request: RequestInformation, _ctx?: MiddlewareContext): Promise<Response> {
    const url = buildUrl(request);
    const attemptMs = request.attemptTimeoutMs ?? request.timeoutMs;
    let timedOut = false;
    const controller = attemptMs ? new AbortController() : undefined;
    const timeout = attemptMs
      ? setTimeout(() => {
          timedOut = true;
          controller?.abort();
        }, attemptMs)
      : undefined;

    const linked = linkSignals(request.signal, controller?.signal);

    const init: RequestInit & { duplex?: "half" } = {
      method: request.method,
      headers: request.headers,
      // Plain objects and arrays become JSON; strings, binary, Blob, FormData and streams go as-is.
      body: toFetchBody(request.body),
      signal: linked.signal,
    };
    // Streaming request bodies require half-duplex in fetch implementations that support them.
    if (isStreamBody(request.body)) init.duplex = "half";

    try {
      return await this.fetchProvider.fetch(url, init);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- timedOut is set in the setTimeout callback before abort fires
      if (timedOut && !request.signal?.aborted) {
        throw DataverseNetworkError.timeout(attemptMs ?? 0);
      }
      // A caller's abort (or an error the fetch provider already typed) passes through as is.
      if (request.signal?.aborted || !(err instanceof TypeError)) throw err;
      // fetch rejects with a TypeError ("Failed to fetch", "fetch failed") when the request never
      // got a response: DNS, TLS, a dropped connection, or a CORS rejection in a browser.
      throw DataverseNetworkError.connectionFailed(err.message, err);
    } finally {
      if (timeout) clearTimeout(timeout);
      linked.dispose();
    }
  }
}
