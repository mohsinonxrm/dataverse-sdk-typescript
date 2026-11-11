/**
 * #475: ChaosMiddleware's `enabled` switch (and the one-time warning without it), its telemetry
 * (`dataverse.chaos.injected`, the dependency's `chaos.injected`), and the latency and hang faults.
 * #478: ChaosPresets, the Clock, and `client.describePipeline()`.
 */
import { describe, expect, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  buildDefaultMiddleware,
  ChaosMiddleware,
  ChaosPresets,
  DataverseAbortError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  MiddlewareRequestOptions,
  systemClock,
  TelemetryEvents,
  type ChaosFault,
  type ChaosOptions,
  type Clock,
} from "../src/index.js";
import { CHAOS_ENABLED_WARNING } from "../src/middleware/ChaosMiddleware.js";
import type {
  DependencyTelemetry,
  FetchProvider,
  Logger,
  MiddlewareContext,
  RequestInformation,
  TelemetryClient,
} from "../src/abstractions/http.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

function recordingLogger() {
  const warnings: Array<[string, unknown]> = [];
  const noop = (): void => undefined;
  const logger: Logger = {
    debug: noop,
    info: noop,
    error: noop,
    warn: (message, meta) => warnings.push([message, meta]),
  };
  return { logger, warnings };
}

function recordingTelemetry() {
  const events: Array<{
    name: string;
    props?: Record<string, string>;
    m?: Record<string, number>;
  }> = [];
  const dependencies: DependencyTelemetry[] = [];
  const exceptions: Array<Record<string, string> | undefined> = [];
  const telemetry: TelemetryClient = {
    trackEvent: (name, props, m) => events.push({ name, props, m }),
    trackException: (_e, props) => exceptions.push(props),
    startDependency: () => ({ end: (data) => dependencies.push(data) }),
  };
  return { telemetry, events, dependencies, exceptions };
}

/** A clock whose sleeps resolve at once, recording how long they were asked to wait. */
function instantClock() {
  const sleeps: Array<{ ms: number; signal: AbortSignal | undefined }> = [];
  const clock: Clock = {
    now: () => 0,
    sleep: (ms, signal) => {
      sleeps.push({ ms, signal });
      return Promise.resolve();
    },
  };
  return { clock, sleeps };
}

function setup(chaos: ChaosOptions, options: Partial<DataverseClientOptions> = {}) {
  const sent: string[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input) => {
      sent.push(input instanceof Request ? input.url : input.toString());
      return Promise.resolve(
        new Response(JSON.stringify({ value: [] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const { logger, warnings } = recordingLogger();
  const middleware = new ChaosMiddleware(chaos);
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    logger,
    retry: { maxRetries: 0 },
    middleware: { append: [middleware] },
    ...options,
  });
  return { client, sent, warnings, middleware };
}

const always = (fault: ChaosFault): ChaosOptions => ({ percentage: 100, faults: [fault] });

function request(init: Partial<RequestInformation> = {}): RequestInformation {
  return { method: "GET", url: `${BASE_URL}/api/data/v9.2/accounts`, headers: {}, ...init };
}

const ok = () => Promise.resolve(new Response("{}", { status: 200 }));

describe("#475: enabled", () => {
  it("false: every request is sent, a per-request fault included, and nothing is logged", async () => {
    const { client, sent, warnings } = setup({ ...always({ status: 503 }), enabled: false });
    await client.api("accounts").get();
    await client.api("accounts").get({
      middlewareOptions: new MiddlewareRequestOptions([{ type: "chaos", fault: { status: 500 } }]),
    });
    expect(sent).toHaveLength(2);
    expect(warnings).toEqual([]);
  });

  it("true: faults are injected, with no warning", async () => {
    const { client, sent, warnings } = setup({ ...always({ status: 503 }), enabled: true });
    await expect(client.api("accounts").get()).rejects.toBeInstanceOf(DataverseODataError);
    expect(sent).toHaveLength(0);
    expect(warnings).toEqual([]);
  });

  it("a function: asked for each attempt with the request; only `true` turns chaos on", async () => {
    const seen: string[] = [];
    let on: unknown = true;
    const { client, sent, warnings } = setup({
      ...always({ status: 503 }),
      enabled: (r) => {
        seen.push(r.url);
        return on as boolean;
      },
    });
    await expect(client.api("accounts").get()).rejects.toBeInstanceOf(DataverseODataError);
    on = false;
    await client.api("accounts").get();
    on = "yes"; // truthy but not true: off
    await client.api("accounts").get();
    expect(seen).toHaveLength(3);
    expect(seen[0]).toContain("/accounts");
    expect(sent).toHaveLength(2);
    expect(warnings).toEqual([]);
  });

  it("a function that throws: no fault for that request, and a warning", async () => {
    const { client, sent, warnings } = setup({
      ...always({ status: 503 }),
      enabled: () => {
        throw new RangeError("flag service down");
      },
    });
    await client.api("accounts").get();
    expect(sent).toHaveLength(1);
    expect(warnings).toEqual([
      ["ChaosMiddleware `enabled` threw; no fault for this request", { error: "RangeError" }],
    ]);
  });

  it("not set: chaos stays on (2.0 behaviour) and a warning is logged once", async () => {
    const { client, warnings } = setup(always({ status: 503 }));
    for (let i = 0; i < 3; i++) {
      await expect(client.api("accounts").get()).rejects.toBeInstanceOf(DataverseODataError);
    }
    expect(warnings).toEqual([[CHAOS_ENABLED_WARNING, undefined]]);
    expect(CHAOS_ENABLED_WARNING).toContain("set `enabled` explicitly");
    expect(CHAOS_ENABLED_WARNING).toContain("in 3.0 it will default to off");
  });

  it("refuses an `enabled` that is neither a boolean nor a function", () => {
    expect(() => new ChaosMiddleware({ enabled: "yes" as never })).toThrow(
      DataverseInvalidRequestError
    );
  });
});

describe("#475: telemetry", () => {
  it("an injected status: a dataverse.chaos.injected event, and the dependency is tagged", async () => {
    const t = recordingTelemetry();
    const { client } = setup(
      { ...always({ status: 503 }), enabled: true },
      { telemetry: t.telemetry }
    );
    await expect(client.api("accounts").get({ correlationId: "corr-1" })).rejects.toBeInstanceOf(
      DataverseODataError
    );

    expect(t.events).toEqual([
      {
        name: TelemetryEvents.chaosInjected,
        props: { "chaos.fault": "status", "request.method": "GET", "correlation.id": "corr-1" },
        m: { "retry.attempt": 0, status: 503 },
      },
    ]);
    expect(TelemetryEvents.chaosInjected).toBe("dataverse.chaos.injected");
    expect(t.dependencies).toHaveLength(1);
    expect(t.dependencies[0]?.resultCode).toBe("503");
    expect(t.dependencies[0]?.properties).toMatchObject({
      "chaos.injected": "true",
      "chaos.fault": "status",
    });
  });

  it("a real attempt is not tagged; a retried chaos attempt tags only its own dependency", async () => {
    const t = recordingTelemetry();
    const { client } = setup(
      {
        enabled: true,
        script: (_r, { attempt }) => (attempt === 0 ? { status: 503 } : undefined),
      },
      { telemetry: t.telemetry, retry: { maxRetries: 1, baseDelayMs: 1, jitter: false } }
    );
    await client.api("accounts").get();
    expect(t.dependencies).toHaveLength(2);
    expect(t.dependencies[0]?.properties?.["chaos.injected"]).toBe("true");
    expect(t.dependencies[1]?.properties).not.toHaveProperty("chaos.injected");
    expect(t.dependencies[1]?.resultCode).toBe("200");
  });

  it("a network fault: the event has error.type, the exception and dependency are tagged", async () => {
    const t = recordingTelemetry();
    const { client } = setup(
      { ...always({ status: "network" }), enabled: true },
      { telemetry: t.telemetry }
    );
    await expect(client.api("accounts").get()).rejects.toBeInstanceOf(DataverseNetworkError);
    expect(t.events[0]?.props).toMatchObject({
      "chaos.fault": "network",
      "error.type": "ConnectionFailed",
    });
    expect(t.events[0]?.m).toEqual({ "retry.attempt": 0 });
    expect(t.dependencies[0]?.properties).toMatchObject({
      "chaos.injected": "true",
      "chaos.fault": "network",
      "error.type": "ConnectionFailed",
    });
    expect(t.exceptions[0]).toMatchObject({ "chaos.injected": "true", "chaos.fault": "network" });
  });

  it("an injected 429: the throttle event is tagged too", async () => {
    const t = recordingTelemetry();
    const { client } = setup(
      { enabled: true, percentage: 100, faults: ChaosPresets.serviceProtection() },
      { telemetry: t.telemetry }
    );
    await client
      .api("accounts")
      .get()
      .catch(() => undefined);
    const throttle = t.events.find((e) => e.name === TelemetryEvents.throttle);
    expect(throttle?.props).toMatchObject({ "chaos.injected": "true", "chaos.fault": "status" });
  });

  it("a latency fault: the event carries the delay, the real response's dependency is tagged", async () => {
    const t = recordingTelemetry();
    const { clock } = instantClock();
    const { client, sent } = setup(
      { ...always({ status: "latency", delayMs: 250 }), enabled: true, clock },
      { telemetry: t.telemetry }
    );
    await client.api("accounts").get();
    expect(sent).toHaveLength(1);
    expect(t.events[0]?.m).toEqual({ "retry.attempt": 0, "chaos.delay_ms": 250 });
    expect(t.dependencies[0]).toMatchObject({
      resultCode: "200",
      properties: { "chaos.injected": "true", "chaos.fault": "latency" },
    });
  });

  it("no event with telemetry off for the request, or without a telemetry client", async () => {
    const t = recordingTelemetry();
    const { client } = setup(
      { ...always({ status: 503 }), enabled: true },
      { telemetry: t.telemetry }
    );
    await client
      .api("accounts")
      .get({
        middlewareOptions: new MiddlewareRequestOptions([{ type: "telemetry", disable: true }]),
      })
      .catch(() => undefined);
    expect(t.events).toEqual([]);

    const plain = setup({ ...always({ status: 503 }), enabled: true });
    await expect(plain.client.api("accounts").get()).rejects.toBeInstanceOf(DataverseODataError);
  });

  it("works on its own, without the telemetry middleware: sets ctx.chaos and uses ctx.telemetry", async () => {
    const t = recordingTelemetry();
    const chaos = new ChaosMiddleware({ ...always({ status: 502 }), enabled: true });
    const ctx: MiddlewareContext = { telemetry: t.telemetry, correlationId: "c" };
    const res = await chaos.execute(request(), ctx, ok);
    expect(res.status).toBe(502);
    expect(ctx.chaos).toEqual({ fault: "status", status: 502 });
    expect(t.events[0]?.name).toBe("dataverse.chaos.injected");
  });
});

describe("#475: latency", () => {
  it("waits delayMs on the clock with the request's signal, then sends the request", async () => {
    const { clock, sleeps } = instantClock();
    const { client, sent } = setup({
      ...always({ status: "latency", delayMs: 1500 }),
      enabled: true,
      clock,
    });
    const controller = new AbortController();
    await client.api("accounts").get({ signal: controller.signal });
    expect(sent).toHaveLength(1);
    expect(sleeps).toHaveLength(1);
    expect(sleeps[0]?.ms).toBe(1500);
    expect(sleeps[0]?.signal).toBeDefined();
  });

  it("is abort-aware: the caller's abort ends the wait at once", async () => {
    const { client, sent } = setup({
      ...always({ status: "latency", delayMs: 60_000 }),
      enabled: true,
    });
    const controller = new AbortController();
    const pending = client.api("accounts").get({ signal: controller.signal });
    setTimeout(() => {
      controller.abort();
    }, 5);
    const started = Date.now();
    await expect(pending).rejects.toBeInstanceOf(DataverseAbortError);
    expect(Date.now() - started).toBeLessThan(5_000);
    expect(sent).toHaveLength(0);
  });

  it("timeoutMs ends the wait with RequestTimeout", async () => {
    const { client, sent } = setup({
      ...always({ status: "latency", delayMs: 60_000 }),
      enabled: true,
    });
    const err = await client
      .api("accounts")
      .get({ timeoutMs: 20 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
    expect(sent).toHaveLength(0);
  });

  it("a delay of attemptTimeoutMs or more fails the attempt as timed out after attemptTimeoutMs", async () => {
    const { clock, sleeps } = instantClock();
    const { client, sent } = setup({
      ...always({ status: "latency", delayMs: 5000 }),
      enabled: true,
      clock,
    });
    const err = await client
      .api("accounts")
      .get({ attemptTimeoutMs: 1000 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
    expect(sleeps.map((s) => s.ms)).toEqual([1000]);
    expect(sent).toHaveLength(0);
  });

  it("delayMs before a status or network fault: a slow failure", async () => {
    const { clock, sleeps } = instantClock();
    const { client } = setup({
      ...always({ status: 503, delayMs: 300 }),
      enabled: true,
      clock,
    });
    await expect(client.api("accounts").get()).rejects.toMatchObject({ status: 503 });
    expect(sleeps.map((s) => s.ms)).toEqual([300]);
  });

  it("works with vitest's fake timers through the default clock", async () => {
    vi.useFakeTimers();
    try {
      const { client, sent } = setup({
        ...always({ status: "latency", delayMs: 10_000 }),
        enabled: true,
      });
      const pending = client.api("accounts").get();
      await vi.advanceTimersByTimeAsync(9_999);
      expect(sent).toHaveLength(0);
      await vi.advanceTimersByTimeAsync(1);
      await pending;
      expect(sent).toHaveLength(1);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("#475: hang", () => {
  it("never answers until timeoutMs passes: RequestTimeout, and nothing is sent", async () => {
    const { client, sent } = setup({ ...always({ status: "hang" }), enabled: true });
    const err = await client
      .api("accounts")
      .get({ timeoutMs: 20 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
    expect(sent).toHaveLength(0);
  });

  it("ends when the caller aborts", async () => {
    const { client } = setup({ ...always({ status: "hang" }), enabled: true });
    const controller = new AbortController();
    const pending = client.api("accounts").get({ signal: controller.signal });
    setTimeout(() => {
      controller.abort();
    }, 5);
    await expect(pending).rejects.toBeInstanceOf(DataverseAbortError);
  });

  it("fails the attempt as timed out when attemptTimeoutMs passes (on the clock)", async () => {
    const { clock, sleeps } = instantClock();
    const { client, sent } = setup({ ...always({ status: "hang" }), enabled: true, clock });
    const err = await client
      .api("accounts")
      .get({ attemptTimeoutMs: 750 })
      .catch((e: unknown) => e);
    expect((err as Error).name).toBe("RequestTimeout");
    expect(sleeps.map((s) => s.ms)).toEqual([750]);
    expect(sent).toHaveLength(0);
  });

  it("with no signal or time limit, warns that it never ends (and stays pending)", async () => {
    const { logger, warnings } = recordingLogger();
    const chaos = new ChaosMiddleware({ ...always({ status: "hang" }), enabled: true });
    let settled = false;
    void chaos.execute(request(), { logger }, ok).finally(() => {
      settled = true;
    });
    await new Promise((r) => setTimeout(r, 10));
    expect(settled).toBe(false);
    expect(warnings[0]?.[0]).toContain("never ends");
  });

  it("an already-aborted request is rejected as aborted", async () => {
    const chaos = new ChaosMiddleware({ ...always({ status: "hang" }), enabled: true });
    const controller = new AbortController();
    controller.abort();
    await expect(
      chaos.execute(request({ signal: controller.signal }), {}, ok)
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("#475: validation of the new faults", () => {
  it.each<[string, ChaosFault]>([
    ["latency without delayMs", { status: "latency" }],
    ["a negative delayMs", { status: "latency", delayMs: -1 }],
    ["an infinite delayMs", { status: 503, delayMs: Number.POSITIVE_INFINITY }],
    ["an unknown kind", { status: "slow" as never }],
  ])("refuses %s", (_name, fault) => {
    expect(() => new ChaosMiddleware({ enabled: true, faults: [fault] })).toThrow(
      DataverseInvalidRequestError
    );
  });

  it("accepts latency (with delayMs 0 too) and hang", () => {
    expect(
      () =>
        new ChaosMiddleware({
          enabled: true,
          faults: [
            { status: "latency", delayMs: 0 },
            { status: "hang" },
            { status: 429, delayMs: 5 },
          ],
        })
    ).not.toThrow();
  });
});

describe("#478: ChaosPresets", () => {
  async function respond(fault: ChaosFault): Promise<Response> {
    const chaos = new ChaosMiddleware({ enabled: true, percentage: 100, faults: [fault] });
    return chaos.execute(request(), {}, ok);
  }

  it("serviceProtection(): the three service-protection 429s, with Retry-After and the error body", async () => {
    const faults = ChaosPresets.serviceProtection();
    expect(faults).toHaveLength(3);
    const seen = [];
    for (const fault of faults) {
      const res = await respond(fault);
      seen.push({
        status: res.status,
        retryAfter: res.headers.get("retry-after"),
        contentType: res.headers.get("content-type"),
        body: (await res.json()) as unknown,
      });
    }
    const contentType = "application/json; odata.metadata=minimal";
    expect(seen).toEqual([
      {
        status: 429,
        retryAfter: "1",
        contentType,
        body: {
          error: {
            code: "0x80072322",
            message:
              "Number of requests exceeded the limit of 6000 over time window of 300 seconds.",
          },
        },
      },
      {
        status: 429,
        retryAfter: "1",
        contentType,
        body: {
          error: {
            code: "0x80072321",
            message:
              "Combined execution time of incoming requests exceeded limit of 1,200,000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.",
          },
        },
      },
      {
        status: 429,
        retryAfter: "1",
        contentType,
        body: {
          error: {
            code: "0x80072326",
            message: "Number of concurrent requests exceeded the limit of 52.",
          },
        },
      },
    ]);
  });

  it("serviceProtection({ retryAfterSeconds }) sets each Retry-After", async () => {
    for (const fault of ChaosPresets.serviceProtection({ retryAfterSeconds: 7 })) {
      expect((await respond(fault)).headers.get("retry-after")).toBe("7");
    }
  });

  it("a service-protection 429 reaches the app as a DataverseThrottleError with its code", async () => {
    const { client } = setup({
      enabled: true,
      percentage: 100,
      faults: ChaosPresets.serviceProtection().slice(2),
    });
    await expect(client.api("accounts").get()).rejects.toMatchObject({
      name: "DataverseThrottleError",
      status: 429,
      code: "0x80072326",
    });
  });

  it("gatewayOutage(): 502, 503 and 504", async () => {
    const statuses = [];
    for (const fault of ChaosPresets.gatewayOutage()) statuses.push((await respond(fault)).status);
    expect(statuses).toEqual([502, 503, 504]);
  });

  it("flakyNetwork(): a dropped connection (ConnectionFailed, caused by TypeError: fetch failed)", async () => {
    const [fault] = ChaosPresets.flakyNetwork();
    expect(fault).toEqual({ status: "network" });
    const err = await respond(fault).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("ConnectionFailed");
    expect((err as Error).cause).toBeInstanceOf(TypeError);
    expect(((err as Error).cause as Error).message).toBe("fetch failed");
  });

  it("slowOrg(): latency, 2 s by default", () => {
    expect(ChaosPresets.slowOrg()).toEqual([{ status: "latency", delayMs: 2000 }]);
    expect(ChaosPresets.slowOrg({ delayMs: 50 })).toEqual([{ status: "latency", delayMs: 50 }]);
  });

  it("returns new objects each call", () => {
    expect(ChaosPresets.gatewayOutage()).not.toBe(ChaosPresets.gatewayOutage());
    const a = ChaosPresets.serviceProtection();
    const b = ChaosPresets.serviceProtection();
    expect(a[0]?.body).not.toBe(b[0]?.body);
  });
});

describe("#478: systemClock and describePipeline()", () => {
  it("systemClock reads Date.now() and sleeps abort-aware", async () => {
    const before = Date.now();
    expect(systemClock.now()).toBeGreaterThanOrEqual(before);
    const controller = new AbortController();
    const pending = systemClock.sleep(60_000, controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    await expect(systemClock.sleep(0)).resolves.toBeUndefined();
  });

  it("describePipeline() lists the middleware names, outermost first", () => {
    const { client } = setup({ enabled: false });
    const names = client.describePipeline();
    expect(names[0]).toBe("ODataHeadersMiddleware");
    expect(names).toContain("RetryMiddleware");
    expect(names.indexOf("TelemetryMiddleware")).toBeLessThan(names.indexOf("ChaosMiddleware"));
    expect(names.at(-1)).toBe("ChaosMiddleware");
    expect(names).toEqual([
      ...buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name),
      "ChaosMiddleware",
    ]);
  });
});
