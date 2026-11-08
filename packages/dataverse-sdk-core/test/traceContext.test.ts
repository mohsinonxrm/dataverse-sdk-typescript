/**
 * #97: a request attempt's dependency is started before the attempt, can be the active context
 * while it runs (`DependencyHandle.run`), and its W3C trace context goes to Dataverse, and only
 * there, unless `diagnosticHeaders` turns it off.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type {
  DependencyHandle,
  DependencyTelemetry,
  FetchProvider,
  Logger,
  TelemetryClient,
} from "../src/abstractions/http.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

/**
 * The "active span" of the fake telemetry client below, like a context manager would keep it.
 * A plain variable is enough: each test runs one request at a time.
 */
const active = {
  current: undefined as string | undefined,
  getStore(): string | undefined {
    return this.current;
  },
  async run<T>(id: string, fn: () => Promise<T>): Promise<T> {
    const previous = this.current;
    this.current = id;
    try {
      return await fn();
    } finally {
      this.current = previous;
    }
  },
};

interface Started {
  name: string;
  data: DependencyTelemetry;
  /** The active span when the dependency was started: the parent it would get. */
  parent: string | undefined;
  id: string;
  ended?: DependencyTelemetry;
}

/** A telemetry client that hands out a new span id per dependency, like a tracer would. */
function tracingTelemetry(
  overrides: Partial<Pick<DependencyHandle, "headers" | "run">> & { tracestate?: string } = {}
) {
  const started: Started[] = [];
  let n = 0;
  const telemetry: TelemetryClient = {
    trackEvent: () => undefined,
    trackException: () => undefined,
    startDependency: (name, data) => {
      n++;
      const id = n.toString(16).padStart(16, "0");
      const entry: Started = { name, data, parent: active.getStore(), id };
      started.push(entry);
      return {
        headers:
          "headers" in overrides
            ? overrides.headers
            : {
                traceparent: `00-${"a".repeat(32)}-${id}-01`,
                ...(overrides.tracestate ? { tracestate: overrides.tracestate } : {}),
              },
        run: "run" in overrides ? overrides.run : (fn) => active.run(id, fn),
        end: (d) => {
          entry.ended = d;
        },
      };
    },
  };
  return { telemetry, started };
}

interface Sent {
  url: string;
  headers: Record<string, string>;
  /** The active span while fetch ran. */
  activeSpan: string | undefined;
}

function setup(
  statuses: number[],
  options: Partial<DataverseClientOptions> = {}
): { client: DataverseClient; sent: Sent[] } {
  const sent: Sent[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      const headers: Record<string, string> = {};
      new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      sent.push({ url, headers, activeSpan: active.getStore() });
      const status = statuses[sent.length - 1] ?? 200;
      return Promise.resolve(
        new Response(status === 204 ? null : "{}", {
          status,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { baseDelayMs: 1, maxDelayMs: 1, jitter: false },
    ...options,
  });
  return { client, sent };
}

describe("#97: trace context reaches Dataverse", () => {
  it("each attempt sends the traceparent of its own dependency", async () => {
    const t = tracingTelemetry({ tracestate: "vendor=1" });
    const { client, sent } = setup([503, 200], { telemetry: t.telemetry });
    await client.api("WhoAmI").get();

    expect(sent).toHaveLength(2);
    expect(t.started).toHaveLength(2);
    expect(sent.map((s) => s.headers.traceparent)).toEqual(
      t.started.map((d) => `00-${"a".repeat(32)}-${d.id}-01`)
    );
    expect(sent.map((s) => s.headers.tracestate)).toEqual(["vendor=1", "vendor=1"]);
    expect(t.started.map((d) => d.data.properties?.["retry.attempt"])).toEqual(["0", "1"]);
    expect(t.started.map((d) => d.ended?.resultCode)).toEqual(["503", "200"]);
  });

  it("the dependency is active while its attempt runs", async () => {
    const t = tracingTelemetry();
    const { client, sent } = setup([200], { telemetry: t.telemetry });
    await client.api("WhoAmI").get();
    expect(sent[0]?.activeSpan).toBe(t.started[0]?.id);
  });

  it("retries and the resend after a 401 start in the caller's context, not in an earlier attempt's", async () => {
    const t = tracingTelemetry();
    const { client, sent } = setup([429, 401, 200], { telemetry: t.telemetry });
    await active.run("app-span", () => client.api("WhoAmI").get());

    expect(sent).toHaveLength(3);
    expect(t.started.map((d) => d.parent)).toEqual(["app-span", "app-span", "app-span"]);
    // Three dependencies, three distinct parent ids sent.
    expect(new Set(sent.map((s) => s.headers.traceparent)).size).toBe(3);
  });

  it("replaces a traceparent the request set, and drops a tracestate the dependency doesn't have", async () => {
    const t = tracingTelemetry();
    const { client, sent } = setup([200], { telemetry: t.telemetry });
    await client.send({
      method: "GET",
      url: "WhoAmI",
      headers: { traceparent: `00-${"b".repeat(32)}-${"c".repeat(16)}-01`, tracestate: "old=1" },
    });
    expect(sent[0]?.headers.traceparent).toBe(`00-${"a".repeat(32)}-${t.started[0]?.id}-01`);
    expect(sent[0]?.headers.tracestate).toBeUndefined();
  });

  it("is not sent to an origin that may not receive the token", async () => {
    const t = tracingTelemetry();
    const { client, sent } = setup([200, 200], {
      telemetry: t.telemetry,
      onForeignOrigin: "strip",
    });
    await client.send({ method: "GET", url: "https://evil.example.com/x", headers: {} });
    expect(sent[0]?.headers.traceparent).toBeUndefined();
    expect(sent[0]?.headers.authorization).toBeUndefined();
    // The dependency is still tracked.
    expect(t.started).toHaveLength(1);
  });

  it("goes to an origin listed in allowedTokenOrigins", async () => {
    const t = tracingTelemetry();
    const { client, sent } = setup([200], {
      telemetry: t.telemetry,
      allowedTokenOrigins: ["https://other.crm.dynamics.com"],
    });
    await client.send({
      method: "GET",
      url: "https://other.crm.dynamics.com/api/data/v9.2/WhoAmI",
      headers: {},
    });
    expect(sent[0]?.headers.traceparent).toMatch(/^00-a{32}-[0-9a-f]{16}-01$/);
  });

  it("diagnosticHeaders turns it off, as a whole or on its own; tracking goes on", async () => {
    for (const diagnosticHeaders of [false, { traceContext: false }] as const) {
      const t = tracingTelemetry({ tracestate: "vendor=1" });
      const { client, sent } = setup([200], { telemetry: t.telemetry, diagnosticHeaders });
      await client.api("WhoAmI").get();
      expect(sent[0]?.headers.traceparent).toBeUndefined();
      expect(sent[0]?.headers.tracestate).toBeUndefined();
      expect(t.started[0]?.ended?.resultCode).toBe("200");
    }
  });

  it("sends only a valid traceparent and tracestate, never other headers", async () => {
    const cases: Array<Record<string, string> | undefined> = [
      undefined,
      {},
      { traceparent: "not-a-traceparent" },
      { traceparent: `00-${"0".repeat(32)}-${"1".repeat(16)}-01` },
      { traceparent: `ff-${"a".repeat(32)}-${"1".repeat(16)}-01` },
      { traceparent: `00-${"a".repeat(32)}-${"1".repeat(16)}-01\r\nx-evil: 1` },
    ];
    for (const headers of cases) {
      const t = tracingTelemetry({ headers });
      const { client, sent } = setup([200], { telemetry: t.telemetry });
      await client.api("WhoAmI").get();
      expect(sent[0]?.headers.traceparent).toBeUndefined();
    }

    const t = tracingTelemetry({
      headers: {
        TraceParent: `00-${"a".repeat(32)}-${"1".repeat(16)}-01`,
        tracestate: "a=1\nb=2",
        baggage: "user=jane",
        authorization: "Bearer stolen",
      },
    });
    const { client, sent } = setup([200], { telemetry: t.telemetry });
    await client.api("WhoAmI").get();
    expect(sent[0]?.headers.traceparent).toBe(`00-${"a".repeat(32)}-${"1".repeat(16)}-01`);
    expect(sent[0]?.headers.tracestate).toBeUndefined();
    expect(sent[0]?.headers.baggage).toBeUndefined();
    expect(sent[0]?.headers.authorization).toBe("Bearer t");
  });
});

describe("#97: a misbehaving dependency handle never breaks the request", () => {
  const logger = () => {
    const warnings: string[] = [];
    const l: Logger = {
      debug: () => undefined,
      info: () => undefined,
      warn: (m) => warnings.push(m),
      error: () => undefined,
    };
    return { l, warnings };
  };

  it("a run that throws before calling the attempt: the attempt still runs once", async () => {
    const t = tracingTelemetry({
      run: () => {
        throw new Error("context manager broken");
      },
    });
    const { l, warnings } = logger();
    const { client, sent } = setup([200], { telemetry: t.telemetry, logger: l });
    await expect(client.api("WhoAmI").get()).resolves.toEqual({});
    expect(sent).toHaveLength(1);
    expect(warnings).toContain("Telemetry dependency run threw; ignoring");
  });

  it("a run that never calls the attempt, or calls it twice: it runs once", async () => {
    for (const run of [
      () => Promise.resolve(undefined),
      async <T>(fn: () => Promise<T>) => {
        await fn();
        return fn();
      },
    ]) {
      const t = tracingTelemetry({ run: run as DependencyHandle["run"] });
      const { client, sent } = setup([200], { telemetry: t.telemetry });
      await expect(client.api("WhoAmI").get()).resolves.toEqual({});
      expect(sent).toHaveLength(1);
    }
  });

  it("the attempt's own error passes through run unchanged", async () => {
    const t = tracingTelemetry();
    const fetchProvider: FetchProvider = { fetch: () => Promise.reject(new TypeError("down")) };
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      fetchProvider,
      telemetry: t.telemetry,
      retry: { maxRetries: 0 },
    });
    await expect(client.api("WhoAmI").get()).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(t.started[0]?.ended).toMatchObject({
      success: false,
      properties: { "error.type": "ConnectionFailed" },
    });
  });

  it("a startDependency that throws: the request goes out without trace context", async () => {
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackException: () => undefined,
      startDependency: () => {
        throw new Error("exporter down");
      },
    };
    const { l, warnings } = logger();
    const { client, sent } = setup([200], { telemetry, logger: l });
    await expect(client.api("WhoAmI").get()).resolves.toEqual({});
    expect(sent[0]?.headers.traceparent).toBeUndefined();
    expect(warnings).toEqual(["Telemetry startDependency threw; ignoring"]);
  });

  it("end is called once per attempt", async () => {
    let ends = 0;
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackException: () => undefined,
      startDependency: () => ({
        end: () => {
          ends++;
        },
      }),
    };
    const { client } = setup([503, 200], { telemetry });
    await client.api("WhoAmI").get();
    expect(ends).toBe(2);
  });
});
