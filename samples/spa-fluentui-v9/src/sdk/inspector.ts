/**
 * The request inspector: a middleware appended to the SDK pipeline with
 * `middleware: { append: [...] }`. Appended middleware runs last, right before `fetch`, so it
 * sees every attempt (retries included) with the final URL and headers.
 */
import type {
  FetchProvider,
  Middleware,
  RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

export interface Exchange {
  id: number;
  method: string;
  url: string;
  /** Response status; absent when no response arrived (network error, abort). */
  status?: number;
  durationMs?: number;
  /** 1 for the first attempt, 2 for the first retry, and so on. */
  attempt: number;
  requestHeaders: Record<string, string>;
  requestBody?: string;
  responseHeaders?: Record<string, string>;
  responseBody?: string;
  /** Why no response arrived. */
  error?: string;
  /** Which client sent it, when it isn't the main `DataverseClient`. */
  via?: string;
}

export type ExchangeListener = (exchange: Exchange) => void;

const BODY_PREVIEW = 4000;
let nextId = 1;

/** The URL `fetch` receives: `request.url` plus `request.query`, encoded the way the SDK does. */
export function finalUrl(request: RequestInformation): string {
  const entries = Object.entries(request.query ?? {}).filter(
    (e): e is [string, string | number | boolean] => e[1] !== undefined && e[1] !== null
  );
  if (entries.length === 0) return request.url;
  const encode = (text: string) =>
    encodeURIComponent(text).replace(/%(?:24|2C|2F|3A|40|3D)/gi, decodeURIComponent);
  const query = entries.map(([name, value]) => `${encode(name)}=${encode(String(value))}`);
  return `${request.url}${request.url.includes("?") ? "&" : "?"}${query.join("&")}`;
}

function redactHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    out[name] = name.toLowerCase() === "authorization" ? "Bearer (hidden)" : value;
  }
  return out;
}

function preview(text: string): string {
  return text.length > BODY_PREVIEW
    ? `${text.slice(0, BODY_PREVIEW)}\n… (${text.length} characters)`
    : text;
}

function bodyPreview(body: unknown): string | undefined {
  if (body === undefined || body === null) return undefined;
  if (typeof body === "string") return preview(body);
  if (body instanceof Blob) return `(binary, ${body.size} bytes)`;
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
    return `(binary, ${body.byteLength} bytes)`;
  }
  try {
    return preview(JSON.stringify(body, null, 2));
  } catch {
    return "(body)";
  }
}

function isTextual(contentType: string | null): boolean {
  return !!contentType && /json|text|multipart|xml/i.test(contentType);
}

async function readResponse(res: Response, exchange: Exchange, notify: ExchangeListener) {
  const type = res.headers.get("content-type");
  if (res.status === 204 || !isTextual(type)) return;
  try {
    const text = await res.clone().text();
    if (!text) return;
    let body = text;
    if (/json/i.test(type ?? "")) {
      try {
        body = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // Not JSON after all: show it as text.
      }
    }
    notify({ ...exchange, responseBody: preview(body) });
  } catch {
    // The body was cancelled or already read: show the exchange without it.
  }
}

function headersOf(res: Response): Record<string, string> {
  const out: Record<string, string> = {};
  res.headers.forEach((value, name) => {
    out[name] = value;
  });
  return out;
}

export function createInspectorMiddleware(notify: ExchangeListener): Middleware {
  return {
    name: "RequestInspector",
    async execute(request, ctx, next) {
      const base: Exchange = {
        id: nextId++,
        method: request.method,
        url: finalUrl(request),
        attempt: (ctx.attempt ?? 0) + 1,
        requestHeaders: redactHeaders(request.headers),
        requestBody: bodyPreview(request.body),
      };
      notify(base);
      const started = performance.now();
      try {
        const res = await next(request, ctx);
        const done: Exchange = {
          ...base,
          status: res.status,
          durationMs: Math.round(performance.now() - started),
          responseHeaders: headersOf(res),
        };
        notify(done);
        void readResponse(res, done, notify);
        return res;
      } catch (error) {
        notify({
          ...base,
          durationMs: Math.round(performance.now() - started),
          error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        });
        throw error;
      }
    },
  };
}

/**
 * The same recording for a client that takes a `fetchProvider` but no middleware, such as
 * `DiscoveryClient`: wraps `fetch` itself.
 */
export function createInspectingFetch(
  notify: ExchangeListener,
  via: string,
  inner?: FetchProvider
): FetchProvider {
  return {
    async fetch(input, init) {
      const url = input instanceof Request ? input.url : String(input);
      const headers: Record<string, string> = {};
      new Headers(init?.headers).forEach((value, name) => {
        headers[name] = value;
      });
      const base: Exchange = {
        id: nextId++,
        method: init?.method ?? "GET",
        url,
        attempt: 1,
        requestHeaders: redactHeaders(headers),
        requestBody: bodyPreview(init?.body),
        via,
      };
      notify(base);
      const started = performance.now();
      try {
        const res = await (inner ? inner.fetch(input, init) : globalThis.fetch(input, init));
        const done = {
          ...base,
          status: res.status,
          durationMs: Math.round(performance.now() - started),
          responseHeaders: headersOf(res),
        };
        notify(done);
        void readResponse(res, done, notify);
        return res;
      } catch (error) {
        notify({
          ...base,
          durationMs: Math.round(performance.now() - started),
          error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        });
        throw error;
      }
    },
  };
}
