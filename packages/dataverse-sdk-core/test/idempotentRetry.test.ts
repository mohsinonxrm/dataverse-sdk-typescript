import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import type { RetryOptions } from "../src/abstractions/options.js";
import type { FetchProvider, HttpMethod } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";

/** Answers `status` once, then 204, and counts calls. */
async function attempts(
  method: HttpMethod,
  status: number,
  opts: {
    headers?: Record<string, string>;
    retry?: Partial<RetryOptions>;
    perRequest?: MiddlewareRequestOptions;
  } = {}
): Promise<number> {
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: () => {
      calls++;
      return Promise.resolve(
        calls === 1
          ? new Response(null, { status, headers: status === 429 ? { "retry-after": "0" } : {} })
          : new Response(null, { status: 204 })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 2, baseDelayMs: 1, maxDelayMs: 2, ...opts.retry },
  });
  await client.send({
    method,
    url: "accounts",
    headers: opts.headers ?? {},
    body: method === "POST" || method === "PATCH" || method === "PUT" ? { name: "x" } : undefined,
    middlewareOptions: opts.perRequest,
  });
  return calls;
}

describe("#12: retries never replay non-idempotent requests after a server error", () => {
  it.each([502, 503, 504])("POST is not retried after %i", async (status) => {
    expect(await attempts("POST", status)).toBe(1);
  });

  it("PATCH without If-Match is not retried after 503", async () => {
    expect(await attempts("PATCH", 503)).toBe(1);
  });

  it.each(["GET", "PUT", "DELETE"] as const)("%s is retried after 503", async (method) => {
    expect(await attempts(method, 503)).toBe(2);
  });

  it("PATCH with If-Match is retried after 503", async () => {
    expect(await attempts("PATCH", 503, { headers: { "If-Match": 'W/"1"' } })).toBe(2);
  });

  it("POST is retried after 429, because a throttled request was never applied", async () => {
    expect(await attempts("POST", 429)).toBe(2);
  });

  it("retryNonIdempotent opts back in, at client level or per request", async () => {
    expect(await attempts("POST", 504, { retry: { retryNonIdempotent: true } })).toBe(2);
    expect(
      await attempts("POST", 504, {
        perRequest: new MiddlewareRequestOptions([{ type: "retry", retryNonIdempotent: true }]),
      })
    ).toBe(2);
  });
});
