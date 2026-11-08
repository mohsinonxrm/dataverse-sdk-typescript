/**
 * #97: throttling, retries, concurrency waits and limit changes reach `TelemetryClient.trackEvent`
 * (batch executions are covered in the batch package).
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { MiddlewareRequestOptions, TelemetryEvents } from "../src/index.js";
import type { FetchProvider, Logger, TelemetryClient } from "../src/abstractions/http.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;

interface TrackedEvent {
  name: string;
  props: Record<string, string> | undefined;
  measurements: Record<string, number> | undefined;
}

function recordingTelemetry() {
  const events: TrackedEvent[] = [];
  const telemetry: TelemetryClient = {
    trackEvent: (name, props, measurements) => events.push({ name, props, measurements }),
    trackException: () => undefined,
    startDependency: () => ({ end: () => undefined }),
  };
  return { telemetry, events };
}

type Responder = (n: number) => Response | Promise<Response>;

function setup(respond: Responder, options: Partial<DataverseClientOptions> = {}) {
  let n = 0;
  const fetchProvider: FetchProvider = { fetch: () => Promise.resolve(respond(n++)) };
  return new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { baseDelayMs: 1, maxDelayMs: 1, jitter: false },
    ...options,
  });
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

const throttled = (code: string) =>
  json({ error: { code, message: "Number of requests exceeded the limit" } }, 429, {
    "retry-after": "0",
    "x-ms-dop-hint": "4",
  });

describe("#97: throttle and retry events", () => {
  it("a 429 with Retry-After: a throttle event naming the limit, then a retry event", async () => {
    const t = recordingTelemetry();
    const client = setup((n) => (n === 0 ? throttled("0x80072322") : json({})), {
      telemetry: t.telemetry,
      concurrency: { adaptiveFromDopHint: false },
    });
    await client.api("accounts").filter("name eq 'secret'").get({ correlationId: "corr-1" });

    expect(t.events.map((e) => e.name)).toEqual([TelemetryEvents.throttle, TelemetryEvents.retry]);
    const [throttle, retry] = t.events;
    expect(throttle).toEqual({
      name: "dataverse.throttle",
      props: {
        "correlation.id": "corr-1",
        "request.method": "GET",
        "request.url": `${API}/accounts?…`,
        "error.code": "0x80072322",
        "throttle.limit": "requests",
      },
      measurements: { "retry.attempt": 0, "retry.after_ms": 0, dop_hint: 4 },
    });
    expect(retry).toEqual({
      name: "dataverse.retry",
      props: {
        "correlation.id": "corr-1",
        "request.method": "GET",
        "request.url": `${API}/accounts?…`,
        "retry.reason": "status",
      },
      measurements: {
        "retry.attempt": 1,
        "retry.max": 6,
        "retry.delay_ms": 0,
        "retry.after_ms": 0,
        status: 429,
      },
    });
  });

  it("names the execution-time and concurrent-request limits; leaves out an unknown one", async () => {
    const limits: Array<string | undefined> = [];
    for (const code of ["0x80072321", "0x80072326", "0x80040220"]) {
      const t = recordingTelemetry();
      const client = setup((n) => (n === 0 ? throttled(code) : json({})), {
        telemetry: t.telemetry,
      });
      await client.api("WhoAmI").get();
      limits.push(t.events[0]?.props?.["throttle.limit"]);
    }
    expect(limits).toEqual(["execution_time", "concurrent_requests", undefined]);
  });

  it("a 429 the caller gets back still reads the same body", async () => {
    const t = recordingTelemetry();
    const client = setup(() => throttled("0x80072322"), {
      telemetry: t.telemetry,
      retry: { maxRetries: 0 },
    });
    const res = await client.send({ method: "GET", url: "WhoAmI", headers: {} });
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({ error: { code: "0x80072322" } });
    expect(t.events.map((e) => e.name)).toEqual([
      "dataverse.throttle",
      "dataverse.concurrency.limit",
    ]);
  });

  it("a network error retry says so", async () => {
    const t = recordingTelemetry();
    let n = 0;
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider: {
        fetch: () =>
          n++ === 0 ? Promise.reject(new TypeError("reset")) : Promise.resolve(json({})),
      },
      telemetry: t.telemetry,
      retry: { baseDelayMs: 1, maxDelayMs: 1, jitter: false },
    });
    await client.api("WhoAmI").get();
    expect(t.events).toHaveLength(1);
    expect(t.events[0]?.props).toMatchObject({
      "retry.reason": "network_error",
      "error.type": "ConnectionFailed",
    });
    expect(t.events[0]?.measurements).toMatchObject({ status: 0, "retry.attempt": 1 });
  });

  it("a request with telemetry turned off sends no events", async () => {
    const t = recordingTelemetry();
    const client = setup((n) => (n === 0 ? throttled("0x80072322") : json({})), {
      telemetry: t.telemetry,
    });
    await client.send({
      method: "GET",
      url: "WhoAmI",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([{ type: "telemetry", disable: true }]),
    });
    expect(t.events).toEqual([]);
  });

  it("a trackEvent that throws doesn't fail the request", async () => {
    const warnings: string[] = [];
    const logger: Logger = {
      debug: () => undefined,
      info: () => undefined,
      warn: (m) => warnings.push(m),
      error: () => undefined,
    };
    const telemetry: TelemetryClient = {
      trackEvent: () => {
        throw new Error("exporter down");
      },
      trackException: () => undefined,
      startDependency: () => ({ end: () => undefined }),
    };
    const client = setup((n) => (n === 0 ? throttled("0x80072322") : json({ ok: 1 })), {
      telemetry,
      logger,
      concurrency: { adaptiveFromDopHint: false },
    });
    await expect(client.api("WhoAmI").get()).resolves.toEqual({ ok: 1 });
    expect(warnings.filter((w) => w === "Telemetry trackEvent threw; ignoring")).toHaveLength(2);
  });
});

describe("#97: concurrency events", () => {
  it("a request that waits for a slot reports the wait", async () => {
    const t = recordingTelemetry();
    let releaseFirst: (() => void) | undefined;
    const client = setup(
      (n) =>
        n === 0
          ? new Promise<Response>((resolve) => {
              releaseFirst = () => {
                resolve(json({}));
              };
            })
          : json({}),
      { telemetry: t.telemetry, concurrency: { maxConcurrentRequests: 1 } }
    );
    const first = client.api("WhoAmI").get();
    const second = client.api("accounts").get({ correlationId: "corr-2" });
    await new Promise((r) => setTimeout(r, 20));
    releaseFirst?.();
    await Promise.all([first, second]);

    const waits = t.events.filter((e) => e.name === TelemetryEvents.concurrencyWait);
    expect(waits).toHaveLength(1);
    expect(waits[0]?.props).toEqual({
      "correlation.id": "corr-2",
      "request.method": "GET",
      "request.url": `${API}/accounts`,
    });
    expect(waits[0]?.measurements).toMatchObject({
      "concurrency.limit": 1,
      "concurrency.queued": 1,
    });
    expect(waits[0]?.measurements?.wait_ms).toBeGreaterThanOrEqual(10);
  });

  it("a request that gets a slot at once reports nothing", async () => {
    const t = recordingTelemetry();
    const client = setup(() => json({}), { telemetry: t.telemetry });
    await client.api("WhoAmI").get();
    expect(t.events).toEqual([]);
  });

  it("an x-ms-dop-hint that changes the limit is reported once", async () => {
    const t = recordingTelemetry();
    const client = setup(() => json({}, 200, { "x-ms-dop-hint": "4" }), {
      telemetry: t.telemetry,
    });
    await client.api("WhoAmI").get({ correlationId: "corr-3" });
    await client.api("WhoAmI").get();
    expect(t.events).toEqual([
      {
        name: "dataverse.concurrency.limit",
        props: { "correlation.id": "corr-3" },
        measurements: { "concurrency.limit": 4, "concurrency.previous_limit": 8, dop_hint: 4 },
      },
    ]);
  });
});

describe("#97: DataverseClient.trackEvent", () => {
  it("forwards to the client's telemetry, and does nothing without one", () => {
    const t = recordingTelemetry();
    setup(() => json({}), { telemetry: t.telemetry }).trackEvent("app.event", { a: "1" }, { n: 2 });
    expect(t.events).toEqual([{ name: "app.event", props: { a: "1" }, measurements: { n: 2 } }]);
    expect(() => {
      setup(() => json({})).trackEvent("app.event");
    }).not.toThrow();
  });

  it("never throws", () => {
    const telemetry: TelemetryClient = {
      trackEvent: () => {
        throw new Error("exporter down");
      },
      trackException: () => undefined,
      startDependency: () => ({ end: () => undefined }),
    };
    expect(() => {
      setup(() => json({}), { telemetry }).trackEvent("x");
    }).not.toThrow();
  });
});
