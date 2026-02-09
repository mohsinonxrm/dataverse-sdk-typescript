import type {
  FetchProvider,
  MiddlewareContext,
  RequestAdapter,
  RequestInformation,
} from "../abstractions/http.js";
import { buildUrl } from "../utils/url.js";

export class FetchRequestAdapter implements RequestAdapter {
  constructor(private fetchProvider: FetchProvider) {}

  async send(request: RequestInformation, _ctx?: MiddlewareContext): Promise<Response> {
    const url = buildUrl(request);
    const controller = request.timeoutMs ? new AbortController() : undefined;
    const timeout = request.timeoutMs
      ? setTimeout(() => controller?.abort(), request.timeoutMs)
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
