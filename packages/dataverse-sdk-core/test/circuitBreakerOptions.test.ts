/**
 * #476: CircuitBreakerMiddleware's failure-ratio mode, breakDurationMs as a function, isolate(),
 * retryAfterMs on DataverseCircuitOpenError, the injectable clock and the
 * `dataverse.circuit.state` telemetry event. Time comes from `now`; no fake timers.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  CircuitBreakerMiddleware,
  DataverseCircuitOpenError,
  DataverseInvalidRequestError,
  TelemetryEvents,
  type CircuitBreakDurationInfo,
  type CircuitBreakerOptions,
  type CircuitStateChange,
} from "../src/index.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import type {
  FetchProvider,
  MiddlewareContext,
  RequestInformation,
  TelemetryClient,
} from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const request: RequestInformation = { method: "GET", url: `${BASE_URL}/accounts`, headers: {} };

interface TrackedEvent {
  name: string;
  props: Record<string, string>;
  measurements: Record<string, number>;
}

/** A breaker on a clock the test moves, with a context whose telemetry records events. */
function setup(options: CircuitBreakerOptions = {}) {
  let clock = 1_000_000;
  const events: TrackedEvent[] = [];
  const changes: CircuitStateChange[] = [];
  const telemetry: TelemetryClient = {
    trackEvent: (name, props = {}, measurements = {}) => events.push({ name, props, measurements }),
    trackException: () => undefined,
    startDependency: () => ({ end: () => undefined }),
  };
  const breaker = new CircuitBreakerMiddleware({
    now: () => clock,
    onStateChange: (change) => changes.push(change),
    ...options,
  });
  let sent = 0;
  const ctx = (extra: Partial<MiddlewareContext> = {}): MiddlewareContext => ({
    telemetry,
    correlationId: "corr-1",
    ...extra,
  });
  /** Send one request answered with `status`; returns the status, or the error it threw. */
  const send = (status: number, extra: Partial<MiddlewareContext> = {}) =>
    breaker
      .execute(request, ctx(extra), () => {
        sent++;
        return Promise.resolve(new Response(null, { status }));
      })
      .then(
        (res) => res.status,
        (e: unknown) => e
      );
  /** Send each status in turn. */
  const sendAll = async (statuses: number[]) => {
    for (const s of statuses) await send(s);
  };
  return {
    breaker,
    events: () => events.filter((e) => e.name === TelemetryEvents.circuitState),
    changes,
    send,
    sendAll,
    sent: () => sent,
    advance: (ms: number) => {
      clock += ms;
    },
  };
}

const F = 503;
const S = 204;

describe('#476: mode: "ratio"', () => {
  const ratio = { mode: "ratio", failureRatio: 0.5, minimumThroughput: 4 } as const;

  it("doesn't open below minimumThroughput, and opens once it is reached", async () => {
    const t = setup(ratio);
    await t.sendAll([F, F, F]);
    expect(t.breaker.state).toBe("closed");
    await t.send(F);
    expect(t.breaker.state).toBe("open");
    expect(await t.send(S)).toBeInstanceOf(DataverseCircuitOpenError);
    expect(t.sent()).toBe(4);
  });

  it("opens at exactly failureRatio, and not below it", async () => {
    const at = setup(ratio);
    await at.sendAll([S, S, F, F]);
    expect(at.breaker.state).toBe("open");

    const below = setup(ratio);
    await below.sendAll([S, S, S, F]);
    expect(below.breaker.state).toBe("closed");
  });

  it("failures need not be in a row; failureThreshold doesn't apply", async () => {
    const t = setup({ ...ratio, minimumThroughput: 6, failureThreshold: 2 });
    await t.sendAll([F, S, F, S, F, S]);
    expect(t.breaker.state).toBe("closed");
    await t.send(F);
    expect(t.breaker.state).toBe("open");
    expect(t.breaker.consecutiveFailures).toBe(1);
  });

  it("only a failure opens it: a success that reaches minimumThroughput doesn't", async () => {
    const t = setup({ ...ratio, failureRatio: 0.25 });
    await t.sendAll([F, F, F, S]);
    expect(t.breaker.state).toBe("closed");
    await t.send(F);
    expect(t.breaker.state).toBe("open");
  });

  it("outcomes older than samplingDurationMs drop out of the window", async () => {
    const t = setup({ ...ratio, samplingDurationMs: 1000 });
    await t.sendAll([F, F, F]);
    t.advance(999);
    await t.send(F); // all four within 1000 ms
    expect(t.breaker.state).toBe("open");

    const expired = setup({ ...ratio, samplingDurationMs: 1000 });
    await expired.sendAll([F, F, F]);
    expired.advance(1000);
    await expired.send(F); // the first three have left the window
    expect(expired.breaker.state).toBe("closed");
    await expired.sendAll([F, F]);
    expect(expired.breaker.state).toBe("closed");
    await expired.send(F);
    expect(expired.breaker.state).toBe("open");
  });

  it("neutral outcomes (429, other 4xx) count neither way", async () => {
    const t = setup({ ...ratio, failureRatio: 1, minimumThroughput: 2 });
    await t.sendAll([F, 429, 404, 400]);
    expect(t.breaker.state).toBe("closed");
    await t.send(F); // 2 of 2: the 4xx didn't dilute the ratio or count as throughput
    expect(t.breaker.state).toBe("open");

    const throughput = setup(ratio);
    await throughput.sendAll([F, 429, 429, 429, 429, F, F]);
    expect(throughput.breaker.state).toBe("closed");
  });

  it("uses 0.5, 10 and 30 s by default", async () => {
    const t = setup({ mode: "ratio" });
    await t.sendAll([S, S, S, S, S, F, F, F, F]);
    expect(t.breaker.state).toBe("closed");
    await t.send(F); // 5 of 10
    expect(t.breaker.state).toBe("open");

    const window = setup({ mode: "ratio" });
    await window.sendAll([F, F, F, F, F]);
    window.advance(30_000);
    await window.sendAll([F, F, F, F, F]);
    expect(window.breaker.state).toBe("closed");
  });

  it("probes like the consecutive mode, and starts with an empty window once closed", async () => {
    const t = setup({ ...ratio, breakDurationMs: 1000 });
    await t.sendAll([F, F, F, F]);
    t.advance(1000);
    expect(t.breaker.state).toBe("half-open");
    expect(await t.send(S)).toBe(S);
    expect(t.breaker.state).toBe("closed");
    await t.sendAll([F, F, F]);
    expect(t.breaker.state).toBe("closed");
  });

  it("a failed probe opens it again", async () => {
    const t = setup({ ...ratio, breakDurationMs: 1000 });
    await t.sendAll([F, F, F, F]);
    t.advance(1000);
    expect(await t.send(F)).toBe(F);
    expect(t.breaker.state).toBe("open");
    expect(t.changes.map((c) => c.to)).toEqual(["open", "half-open", "open"]);
  });

  it.each<[CircuitBreakerOptions]>([
    [{ mode: "sliding" as "ratio" }],
    [{ failureRatio: 1.5 }],
    [{ failureRatio: -0.1 }],
    [{ failureRatio: Number.NaN }],
    [{ minimumThroughput: 0 }],
    [{ minimumThroughput: 2.5 }],
    [{ samplingDurationMs: 0 }],
    [{ samplingDurationMs: Number.POSITIVE_INFINITY }],
    [{ breakDurationMs: -5 }],
  ])("refuses %j", (options) => {
    expect(() => new CircuitBreakerMiddleware(options)).toThrow(DataverseInvalidRequestError);
  });
});

describe("#476: breakDurationMs as a function", () => {
  it("gets the failures and the opens since the circuit last closed", async () => {
    const calls: CircuitBreakDurationInfo[] = [];
    const t = setup({
      failureThreshold: 2,
      breakDurationMs: (info) => {
        calls.push(info);
        return 1000 * info.consecutiveOpens;
      },
    });
    await t.sendAll([F, F]);
    expect(calls).toEqual([{ failures: 2, consecutiveOpens: 1 }]);
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 1000 });

    t.advance(1000);
    await t.send(F); // the probe fails
    expect(calls[1]).toEqual({ failures: 3, consecutiveOpens: 2 });
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 2000 });

    t.advance(2000);
    expect(await t.send(S)).toBe(S); // the probe succeeds and closes it
    await t.sendAll([F, F]);
    expect(calls[2]).toEqual({ failures: 2, consecutiveOpens: 1 });
  });

  it("gets the window's failures in ratio mode", async () => {
    const calls: CircuitBreakDurationInfo[] = [];
    const t = setup({
      mode: "ratio",
      minimumThroughput: 4,
      breakDurationMs: (info) => {
        calls.push(info);
        return 500;
      },
    });
    await t.sendAll([S, F, S, S, F, F]);
    expect(calls).toEqual([{ failures: 3, consecutiveOpens: 1 }]);
  });

  it.each([
    [
      "throws",
      () => {
        throw new Error("boom");
      },
    ],
    ["returns a negative number", () => -1],
    ["returns NaN", () => Number.NaN],
  ])("falls back to 30 s when it %s", async (_label, fn) => {
    const warnings: string[] = [];
    const t = setup({ failureThreshold: 1, breakDurationMs: fn });
    await t.send(F, {
      logger: {
        debug: () => undefined,
        info: () => undefined,
        warn: (m) => warnings.push(m),
        error: () => undefined,
      },
    });
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 30_000 });
    expect(warnings.some((w) => w.includes("breakDurationMs"))).toBe(true);
  });
});

describe("#476: isolate(), reset() and close()", () => {
  it("isolate() holds the circuit open, with no probe, until reset()", async () => {
    const t = setup({ breakDurationMs: 1000 });
    t.breaker.isolate();
    expect(t.breaker.state).toBe("open");
    expect(t.breaker.isolated).toBe(true);
    const err = await t.send(S);
    expect(err).toBeInstanceOf(DataverseCircuitOpenError);
    expect((err as DataverseCircuitOpenError).retryAfterMs).toBeUndefined();
    expect((err as Error).message).toContain("isolate()");

    t.advance(60_000);
    expect(t.breaker.state).toBe("open");
    expect(await t.send(S)).toBeInstanceOf(DataverseCircuitOpenError);
    expect(t.sent()).toBe(0);

    t.breaker.reset();
    expect(t.breaker.state).toBe("closed");
    expect(t.breaker.isolated).toBe(false);
    expect(await t.send(S)).toBe(S);
    expect(t.changes.map((c) => [c.from, c.to])).toEqual([
      ["closed", "open"],
      ["open", "closed"],
    ]);
  });

  it("close() is the same as reset()", async () => {
    const t = setup({ failureThreshold: 1 });
    t.breaker.isolate();
    t.breaker.close();
    expect(t.breaker.state).toBe("closed");
    await t.send(F);
    expect(t.breaker.state).toBe("open");
    t.breaker.close();
    expect(await t.send(S)).toBe(S);
  });

  it("isolating an open circuit keeps it open past its break duration", async () => {
    const t = setup({ failureThreshold: 1, breakDurationMs: 1000 });
    await t.send(F);
    t.breaker.isolate();
    t.advance(5000);
    expect(t.breaker.state).toBe("open");
    expect(await t.send(S)).toMatchObject({ retryAfterMs: undefined });
    expect(t.changes.map((c) => c.to)).toEqual(["open"]);
  });

  it("a probe in flight when isolate() is called doesn't close it", async () => {
    let release: (r: Response) => void = () => undefined;
    const t = setup({ failureThreshold: 1, breakDurationMs: 1000 });
    await t.send(F);
    t.advance(1000);
    const probe = t.breaker.execute(
      request,
      {},
      () =>
        new Promise<Response>((resolve) => {
          release = resolve;
        })
    );
    t.breaker.isolate();
    release(new Response(null, { status: 204 }));
    await probe;
    expect(t.breaker.state).toBe("open");
    expect(t.breaker.isolated).toBe(true);
  });
});

describe("#476: retryAfterMs on DataverseCircuitOpenError", () => {
  it("is the time until half-open while open", async () => {
    const t = setup({ failureThreshold: 1, breakDurationMs: 1000 });
    await t.send(F);
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 1000 });
    t.advance(300);
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 700 });
    t.advance(699);
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 1 });
  });

  it("while a probe is in flight, is the rest of its hold; after that the next request probes", async () => {
    let release: (r: Response) => void = () => undefined;
    const t = setup({ failureThreshold: 1, breakDurationMs: 1000 });
    await t.send(F);
    t.advance(1000);
    const probe = t.breaker.execute(
      request,
      {},
      () =>
        new Promise<Response>((resolve) => {
          release = resolve;
        })
    );
    expect(t.breaker.state).toBe("half-open");
    t.advance(200);
    expect(await t.send(S)).toMatchObject({ retryAfterMs: 800 });
    t.advance(800);
    // The first probe is still out after a whole break duration: this request probes too.
    expect(await t.send(S)).toBe(S);
    expect(t.breaker.state).toBe("closed");
    // The replaced probe's late result counts like any other request's in the closed circuit.
    release(new Response(null, { status: 503 }));
    await probe;
    expect(t.breaker.state).toBe("open"); // failureThreshold 1
  });
});

describe("#476: the injectable clock", () => {
  it("drives the break duration, the window and state, with no timers", async () => {
    const t = setup({ failureThreshold: 1, breakDurationMs: 10_000 });
    await t.send(F);
    expect(t.breaker.state).toBe("open");
    t.advance(9_999);
    expect(t.breaker.state).toBe("open");
    t.advance(1);
    expect(t.breaker.state).toBe("half-open");
  });

  it("defaults to Date.now()", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1, breakDurationMs: 0 });
    await breaker.execute(request, {}, () => Promise.resolve(new Response(null, { status: 503 })));
    expect(breaker.state).toBe("half-open");
  });
});

describe("#476: dataverse.circuit.state telemetry", () => {
  it("reports open, half-open and closed, with the reason", async () => {
    const t = setup({ failureThreshold: 2, breakDurationMs: 1000 });
    await t.sendAll([F, F]);
    t.advance(1000);
    await t.send(F); // failed probe
    t.advance(1000);
    await t.send(S); // probe succeeds
    expect(
      t
        .events()
        .map((e) => [
          e.props["circuit.previous_state"],
          e.props["circuit.state"],
          e.props["circuit.reason"],
        ])
    ).toEqual([
      ["closed", "open", "failure_threshold"],
      ["open", "half-open", "break_elapsed"],
      ["half-open", "open", "probe_failed"],
      ["open", "half-open", "break_elapsed"],
      ["half-open", "closed", "probe_succeeded"],
    ]);
    const [opened] = t.events();
    expect(opened.props).toEqual({
      "correlation.id": "corr-1",
      "circuit.state": "open",
      "circuit.previous_state": "closed",
      "circuit.reason": "failure_threshold",
      "circuit.mode": "consecutive",
    });
    expect(opened.measurements).toEqual({ "circuit.failures": 2, "circuit.break_ms": 1000 });
  });

  it("reports the ratio, with the window's throughput", async () => {
    const t = setup({ mode: "ratio", minimumThroughput: 4 });
    await t.sendAll([S, F, F, F]);
    const [opened] = t.events();
    expect(opened.props).toMatchObject({
      "circuit.state": "open",
      "circuit.reason": "failure_ratio",
      "circuit.mode": "ratio",
    });
    expect(opened.measurements).toEqual({
      "circuit.failures": 3,
      "circuit.throughput": 4,
      "circuit.break_ms": 30_000,
    });
  });

  it("reports isolate() and reset() through the last request's telemetry", async () => {
    const t = setup();
    await t.send(S);
    t.breaker.isolate();
    t.breaker.isolate(); // already isolated: nothing new
    t.breaker.reset();
    t.breaker.reset(); // already closed: nothing new
    expect(t.events().map((e) => [e.props["circuit.state"], e.props["circuit.reason"]])).toEqual([
      ["isolated", "isolate"],
      ["closed", "reset"],
    ]);
    expect(t.events()[0]?.props["correlation.id"]).toBe("");
    expect(t.events()[1]?.props["circuit.previous_state"]).toBe("isolated");
  });

  it("isolating an open circuit is reported, though onStateChange sees no change", async () => {
    const t = setup({ failureThreshold: 1 });
    await t.send(F);
    t.breaker.isolate();
    expect(t.events().map((e) => e.props["circuit.state"])).toEqual(["open", "isolated"]);
    expect(t.changes.map((c) => c.to)).toEqual(["open"]);
  });

  it("a request with telemetry turned off sends none", async () => {
    const t = setup({ failureThreshold: 1 });
    await t.send(F, {
      middlewareOptions: new MiddlewareRequestOptions([{ type: "telemetry", disable: true }]),
    });
    expect(t.breaker.state).toBe("open");
    expect(t.events()).toEqual([]);
  });

  it("goes to the client's telemetry, with the request's correlation id", async () => {
    const events: TrackedEvent[] = [];
    const telemetry: TelemetryClient = {
      trackEvent: (name, props = {}, measurements = {}) =>
        events.push({ name, props, measurements }),
      trackException: () => undefined,
      startDependency: () => ({ end: () => undefined }),
    };
    const fetchProvider: FetchProvider = {
      fetch: () => Promise.resolve(new Response("{}", { status: 503 })),
    };
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider,
      telemetry,
      retry: { maxRetries: 0 },
      middleware: { append: [new CircuitBreakerMiddleware({ failureThreshold: 1 })] },
    });
    await client
      .send({ method: "GET", url: "accounts", headers: {}, correlationId: "abc" })
      .catch(() => undefined);
    const circuit = events.filter((e) => e.name === "dataverse.circuit.state");
    expect(circuit).toHaveLength(1);
    expect(circuit[0]?.props).toMatchObject({ "correlation.id": "abc", "circuit.state": "open" });
  });

  it("a telemetry client that throws doesn't change what the request sees", async () => {
    const breaker = new CircuitBreakerMiddleware({ failureThreshold: 1 });
    const telemetry: TelemetryClient = {
      trackEvent: () => {
        throw new Error("telemetry down");
      },
      trackException: () => undefined,
      startDependency: () => ({ end: () => undefined }),
    };
    const res = await breaker.execute(request, { telemetry }, () =>
      Promise.resolve(new Response(null, { status: 503 }))
    );
    expect(res.status).toBe(503);
    expect(breaker.state).toBe("open");
  });
});
