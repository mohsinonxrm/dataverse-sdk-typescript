import type {
  FetchProvider,
  MiddlewareContext,
  RequestAdapter,
  RequestInformation,
} from "../abstractions/http.js";
import { buildUrl } from "../utils/url.js";
import { DataverseNetworkError } from "../errors/NamedErrors.js";

export class FetchRequestAdapter implements RequestAdapter {
  constructor(private fetchProvider: FetchProvider) {}

  async send(request: RequestInformation, _ctx?: MiddlewareContext): Promise<Response> {
    const url = buildUrl(request);
    let timedOut = false;
    const controller = request.timeoutMs ? new AbortController() : undefined;
    const timeout = request.timeoutMs
      ? setTimeout(() => {
          timedOut = true;
          controller?.abort();
        }, request.timeoutMs)
      : undefined;

    const signal = mergeSignals(request.signal, controller?.signal);

    const init: RequestInit = {
      method: request.method,
      headers: request.headers,
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      signal,
    };

    try {
      return await this.fetchProvider.fetch(url, init);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- timedOut is set in the setTimeout callback before abort fires
      if (timedOut) {
        throw DataverseNetworkError.timeout(request.timeoutMs ?? 0);
      }
      throw err;
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }
}

function mergeSignals(a?: AbortSignal, b?: AbortSignal): AbortSignal | undefined {
  if (!a) return b;
  if (!b) return a;
  if (a.aborted) return a;
  if (b.aborted) return b;
  const controller = new AbortController();
  const onAbort = () => {
    controller.abort();
  };
  a.addEventListener("abort", onAbort, { once: true });
  b.addEventListener("abort", onAbort, { once: true });
  return controller.signal;
}
