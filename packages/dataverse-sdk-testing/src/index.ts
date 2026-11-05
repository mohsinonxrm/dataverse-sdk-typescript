/**
 * Internal contract-test harness for the Dataverse SDK packages.
 *
 * Tests should exercise a real `DataverseClient` and assert on what actually reaches
 * `fetch` (method, URL, headers, body bytes) instead of mocking `client.api()` or other
 * SDK surfaces. Mocking the SDK's own boundaries is how the batch, xrm and files
 * integrations shipped broken while their unit tests passed (see issue #39).
 *
 * @example
 * ```ts
 * const { client, fake } = createTestClient();
 * fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "…" }));
 * await client.api("WhoAmI").get();
 * expect(fake.last().headers["authorization"]).toBe("Bearer test-token");
 * ```
 */
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  AccessTokenProvider,
  DataverseClientOptions,
  FetchProvider,
} from "@mohsinonxrm/dataverse-sdk-core";

/** Default org used by test clients. */
export const TEST_ORG_URL = "https://contoso.crm.dynamics.com";
/** Default Web API root used by test clients. */
export const TEST_API_URL = `${TEST_ORG_URL}/api/data/v9.2`;
/** Token returned by the default fake token provider. */
export const TEST_TOKEN = "test-token";

/** A request as it reached `fetch`. Header names are lower-cased. */
export interface RecordedRequest {
  method: string;
  url: string;
  /** Path relative to the Web API root, e.g. `/accounts(…)` or `/$batch`. */
  path: string;
  /** Lower-cased header names. Duplicate names are joined with `, ` as `fetch` would send them. */
  headers: Partial<Record<string, string>>;
  /** The raw `init.body` that was passed to `fetch`, unchanged. */
  rawBody: unknown;
  /** The body decoded as UTF-8 text (`undefined` when there is no body). */
  bodyText: string | undefined;
  /** The body bytes (`undefined` when there is no body). */
  bodyBytes: Uint8Array | undefined;
}

/** Returns a response for a request, or `undefined` to fall through to the next route. */
export type Responder = (
  request: RecordedRequest
) => Response | undefined | Promise<Response | undefined>;

interface Route {
  method: string;
  match: (path: string) => boolean;
  respond: Responder;
  times: number;
}

export interface FakeFetch {
  /** Pass this as `DataverseClientOptions.fetchProvider`. */
  readonly fetchProvider: FetchProvider;
  /** Every request that reached `fetch`, in order. */
  readonly requests: RecordedRequest[];
  /**
   * Register a route. `path` is matched against the path relative to the Web API root,
   * with the query string removed. Use a RegExp for anything else.
   * Routes registered later take precedence. `times` limits how often a route answers
   * (default unlimited), which makes sequences such as "429, then 200" easy to express.
   */
  on(method: string, path: string | RegExp, respond: Responder, times?: number): FakeFetch;
  /** The most recent request. Throws if there were none. */
  last(): RecordedRequest;
  /** Forget recorded requests (routes are kept). */
  reset(): void;
}

export interface FakeFetchOptions {
  /** Web API root used to compute `RecordedRequest.path`. Defaults to {@link TEST_API_URL}. */
  apiUrl?: string;
  /**
   * What to do when no route matches. Defaults to throwing, so unexpected requests fail the
   * test loudly.
   */
  onUnhandled?: "throw" | ((request: RecordedRequest) => Response);
}

/** Create a recording fake `fetch`. */
export function createFakeFetch(options: FakeFetchOptions = {}): FakeFetch {
  const apiUrl = trimTrailingSlashes(options.apiUrl ?? TEST_API_URL);
  const routes: Route[] = [];
  const requests: RecordedRequest[] = [];

  const fake: FakeFetch = {
    requests,
    fetchProvider: {
      fetch: async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        if (init?.signal?.aborted) {
          throw new DOMException("The operation was aborted.", "AbortError");
        }
        const recorded = await record(input, init, apiUrl);
        requests.push(recorded);
        const pathOnly = recorded.path.split("?")[0] ?? recorded.path;
        // Later routes take precedence.
        for (const route of [...routes].reverse()) {
          if (route.times <= 0) continue;
          if (route.method !== "*" && route.method !== recorded.method) continue;
          if (!route.match(pathOnly)) continue;
          const res = await route.respond(recorded);
          if (res) {
            route.times--;
            return res;
          }
        }
        if (typeof options.onUnhandled === "function") return options.onUnhandled(recorded);
        throw new Error(`Unhandled fake fetch request: ${recorded.method} ${recorded.url}`);
      },
    },
    on(method, path, respond, times = Number.POSITIVE_INFINITY) {
      const match =
        typeof path === "string" ? (p: string) => p === path : (p: string) => path.test(p);
      routes.push({ method: method.toUpperCase(), match, respond, times });
      return fake;
    },
    last() {
      const r = requests.at(-1);
      if (!r) throw new Error("No requests were recorded");
      return r;
    },
    reset() {
      requests.length = 0;
    },
  };
  return fake;
}

/** Remove trailing `/` characters in linear time (a `/\/+$/` regex is quadratic on long runs of `/`). */
function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) end--;
  return value.slice(0, end);
}

async function record(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  apiUrl: string
): Promise<RecordedRequest> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
  const headers: Partial<Record<string, string>> = {};
  // `new Headers()` combines duplicate names the same way fetch does on the wire.
  new Headers(init?.headers).forEach((value, key) => {
    headers[key] = value;
  });
  const rawBody = init?.body ?? undefined;
  const bodyBytes = await toBytes(rawBody);
  return {
    method,
    url,
    path: url.startsWith(apiUrl) ? url.slice(apiUrl.length) || "/" : url,
    headers,
    rawBody,
    bodyBytes,
    bodyText: bodyBytes ? new TextDecoder().decode(bodyBytes) : undefined,
  };
}

async function toBytes(body: unknown): Promise<Uint8Array | undefined> {
  if (body === undefined || body === null) return undefined;
  if (typeof body === "string") return new TextEncoder().encode(body);
  if (body instanceof ArrayBuffer) return new Uint8Array(body);
  if (ArrayBuffer.isView(body)) {
    return new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
  }
  if (typeof Blob !== "undefined" && body instanceof Blob) {
    return new Uint8Array(await body.arrayBuffer());
  }
  // FormData, URLSearchParams, streams: let Response serialise them.
  return new Uint8Array(await new Response(body as BodyInit).arrayBuffer());
}

// ───────────────────────────── response builders ─────────────────────────────

/** Headers Dataverse sends on every Web API response (values from a live org). */
export function dataverseHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "odata-version": "4.0",
    "x-ms-service-request-id": "989ceedc-cfb9-49b4-9630-c1e8ab9fcf43",
    req_id: "989ceedc-cfb9-49b4-9630-c1e8ab9fcf43",
    "x-ms-dop-hint": "64",
    "x-ms-ratelimit-burst-remaining-xrm-requests": "7999",
    "x-ms-ratelimit-time-remaining-xrm-requests": "1,200.00",
    ...extra,
  };
}

/** A JSON response with Dataverse's standard headers. */
export function jsonResponse(
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {}
): Response {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: dataverseHeaders({
      "content-type": "application/json; odata.metadata=minimal",
      ...init.headers,
    }),
  });
}

/** A `204 No Content` response, e.g. a create without `return=representation`. */
export function noContent(headers: Record<string, string> = {}): Response {
  return new Response(null, { status: 204, headers: dataverseHeaders(headers) });
}

/** The response Dataverse sends for a create: 204 with `OData-EntityId`. */
export function createdResponse(entitySetName: string, id: string): Response {
  return noContent({ "odata-entityid": `${TEST_API_URL}/${entitySetName}(${id})` });
}

/** A Dataverse OData error response. */
export function odataError(
  status: number,
  code: string,
  message: string,
  headers: Record<string, string> = {}
): Response {
  return jsonResponse({ error: { code, message } }, { status, headers });
}

/** A 429 service-protection response. */
export function throttled(retryAfterSeconds: number): Response {
  return odataError(
    429,
    "0x80072322",
    "Number of requests exceeded the limit of 6000 over time window of 300 seconds.",
    { "retry-after": String(retryAfterSeconds) }
  );
}

/** One part of a `$batch` response. */
export interface BatchResponsePart {
  status: number;
  statusText?: string;
  headers?: Record<string, string>;
  /** Objects are JSON-encoded; strings are sent as-is. */
  body?: unknown;
  /** Only parts inside a change set carry a Content-ID. */
  contentId?: string;
}

/** A change set inside a `$batch` response. */
export interface BatchResponseChangeset {
  changeset: BatchResponsePart[];
}

const STATUS_TEXT: Partial<Record<number, string>> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  404: "Not Found",
  412: "Precondition Failed",
  429: "Too Many Requests",
};

/**
 * Build a `multipart/mixed` `$batch` response in the format Dataverse returns
 * (CRLF line endings, `application/http` parts, nested change sets).
 */
export function batchResponse(
  items: Array<BatchResponsePart | BatchResponseChangeset>,
  boundary = "batchresponse_00000000-0000-0000-0000-000000000001"
): Response {
  const CRLF = "\r\n";
  const encodePart = (p: BatchResponsePart): string => {
    const head = [
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      ...(p.contentId ? [`Content-ID: ${p.contentId}`] : []),
    ];
    const body =
      p.body === undefined ? "" : typeof p.body === "string" ? p.body : JSON.stringify(p.body);
    const headers = {
      "OData-Version": "4.0",
      ...(p.body !== undefined && typeof p.body !== "string"
        ? { "Content-Type": "application/json; odata.metadata=minimal" }
        : {}),
      ...p.headers,
    };
    const statusText = p.statusText ?? STATUS_TEXT[p.status] ?? "";
    return [
      ...head,
      "",
      `HTTP/1.1 ${String(p.status)} ${statusText}`,
      ...Object.entries(headers).map(([k, v]) => `${k}: ${v}`),
      "",
      body,
    ].join(CRLF);
  };

  let out = "";
  let n = 0;
  for (const item of items) {
    out += `--${boundary}${CRLF}`;
    if ("changeset" in item) {
      n++;
      const cs = `changesetresponse_00000000-0000-0000-0000-${String(n).padStart(12, "0")}`;
      out += `Content-Type: multipart/mixed; boundary=${cs}${CRLF}${CRLF}`;
      for (const part of item.changeset) out += `--${cs}${CRLF}${encodePart(part)}${CRLF}`;
      out += `--${cs}--${CRLF}`;
    } else {
      out += `${encodePart(item)}${CRLF}`;
    }
  }
  out += `--${boundary}--${CRLF}`;
  return new Response(out, {
    status: 200,
    headers: dataverseHeaders({ "content-type": `multipart/mixed; boundary=${boundary}` }),
  });
}

// ───────────────────────────── test client ─────────────────────────────

/** A token provider that records the scopes it was asked for. */
export function fakeTokenProvider(token = TEST_TOKEN): AccessTokenProvider & {
  calls: Array<string | string[] | undefined>;
} {
  const calls: Array<string | string[] | undefined> = [];
  return {
    calls,
    getToken(scopes?: string | string[]) {
      calls.push(scopes);
      return Promise.resolve(token);
    },
  };
}

export interface TestClient {
  client: DataverseClient;
  fake: FakeFetch;
  tokenProvider: ReturnType<typeof fakeTokenProvider>;
}

/**
 * A real `DataverseClient` wired to a recording fake `fetch` and a fake token provider.
 * Retries are off and logging is silent by default, so tests are fast and quiet; pass
 * `options` to override either.
 */
export function createTestClient(
  options: Partial<DataverseClientOptions> = {},
  fakeOptions: FakeFetchOptions = {}
): TestClient {
  const fake = createFakeFetch(fakeOptions);
  const tokenProvider = fakeTokenProvider();
  const noop = (): void => undefined;
  const silent = { debug: noop, info: noop, warn: noop, error: noop };
  const client = new DataverseClient({
    baseUrl: TEST_ORG_URL,
    tokenProvider,
    fetchProvider: fake.fetchProvider,
    retry: { maxRetries: 0 },
    logger: silent,
    ...options,
  });
  return { client, fake, tokenProvider };
}
