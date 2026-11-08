import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider, Logger, TelemetryClient } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";
const throttled = () => new Response(null, { status: 429, headers: { "retry-after": "0" } });

function setup(
  respond: () => Response | Promise<Response>,
  options: Partial<DataverseClientOptions> = {}
) {
  const calls: Headers[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      calls.push(new Headers(init?.headers));
      return Promise.resolve(respond());
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 3, baseDelayMs: 1, maxDelayMs: 2 },
    ...options,
  });
  return { client, calls };
}

const noRetry = () => new MiddlewareRequestOptions([{ type: "retry", maxRetries: 0 }]);

describe("#16: per-request middleware options reach the middleware", () => {
  it("retry maxRetries: 0 returns the first 429 through send()", async () => {
    const { client, calls } = setup(throttled);
    const res = await client.send({
      method: "GET",
      url: "WhoAmI",
      headers: {},
      middlewareOptions: noRetry(),
    });
    expect(res.status).toBe(429);
    expect(calls).toHaveLength(1);
  });

  it("works through builder terminals and execute()", async () => {
    const a = setup(throttled);
    await a.client
      .api("WhoAmI")
      .get({ middlewareOptions: noRetry() })
      .catch(() => undefined);
    expect(a.calls).toHaveLength(1);

    const b = setup(throttled);
    await b.client
      .execute(
        {
          toRequestInformation: (base: string) => ({
            method: "GET",
            url: `${base}/WhoAmI`,
            headers: {},
          }),
          parseResponse: () => Promise.resolve(undefined),
        },
        { middlewareOptions: noRetry() }
      )
      .catch(() => undefined);
    expect(b.calls).toHaveLength(1);
  });

  it("a per-request maxRetries can also raise the client's setting", async () => {
    const { client, calls } = setup(throttled, {
      retry: { maxRetries: 0, baseDelayMs: 1, maxDelayMs: 2 },
    });
    const res = await client.send({
      method: "GET",
      url: "WhoAmI",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([
        { type: "retry", maxRetries: 2, baseDelayMs: 1 },
      ]),
    });
    expect(res.status).toBe(429);
    expect(calls).toHaveLength(3);
  });

  it("an undefined per-request field doesn't erase the client setting", async () => {
    const { client, calls } = setup(throttled, {
      retry: { maxRetries: 1, baseDelayMs: 1, maxDelayMs: 2 },
    });
    await client.send({
      method: "GET",
      url: "WhoAmI",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([
        { type: "retry", retryableStatusCodes: [429] },
      ]),
    });
    expect(calls).toHaveLength(2);
  });

  it("telemetry disable sends no diagnostic headers and tracks nothing; customProperties are tracked", async () => {
    const tracked: Array<Record<string, string> | undefined> = [];
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackException: () => undefined,
      startDependency: () => ({
        end: (data) => {
          tracked.push(data.properties);
        },
      }),
    };
    const { client, calls } = setup(() => new Response(null, { status: 204 }), { telemetry });
    await client.send({
      method: "GET",
      url: "a",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([{ type: "telemetry", disable: true }]),
    });
    expect(calls[0]?.get("x-ms-correlation-id")).toBeNull();
    expect(calls[0]?.get("x-ms-sdk-version")).toBeNull();
    expect(tracked).toHaveLength(0);

    await client.send({
      method: "GET",
      url: "b",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([
        { type: "telemetry", customProperties: { feature: "grid", page: 2 } },
      ]),
    });
    expect(tracked[0]).toMatchObject({ feature: "grid", page: "2" });
  });

  it("logging disable keeps the request out of the logger", async () => {
    const lines: string[] = [];
    const logger: Logger = {
      debug: (m) => lines.push(m),
      info: (m) => lines.push(m),
      warn: (m) => lines.push(m),
      error: (m) => lines.push(m),
    };
    const { client } = setup(() => new Response(null, { status: 204 }), { logger });
    await client.send({
      method: "GET",
      url: "quiet",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([{ type: "logging", disable: true }]),
    });
    expect(lines.filter((l) => l.includes("quiet"))).toEqual([]);
    await client.send({ method: "GET", url: "loud", headers: {} });
    expect(lines.some((l) => l.includes("loud"))).toBe(true);
  });

  it("concurrency bypass lets a request skip the queue", async () => {
    let releaseFirst: (r: Response) => void = () => undefined;
    let n = 0;
    const { client, calls } = setup(
      () => {
        n++;
        return n === 1
          ? new Promise<Response>((resolve) => {
              releaseFirst = resolve;
            })
          : new Response(null, { status: 204 });
      },
      { concurrency: { maxConcurrentRequests: 1, min: 1 } }
    );
    const first = client.send({ method: "GET", url: "slow", headers: {} });
    await new Promise((r) => setTimeout(r, 5));
    const bypass = await client.send({
      method: "GET",
      url: "fast",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([{ type: "concurrency", bypass: true }]),
    });
    expect(bypass.status).toBe(204);
    expect(calls).toHaveLength(2);
    releaseFirst(new Response(null, { status: 204 }));
    await first;
  });
});
