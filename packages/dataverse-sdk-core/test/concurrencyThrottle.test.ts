/**
 * #477: the concurrency limit halves on Dataverse's concurrent-requests 429 (0x80072326) and comes
 * back with the DOP hint; the concurrency queue can be bounded.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConcurrencyMiddleware } from "../src/middleware/ConcurrencyMiddleware.js";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  BulkheadMiddleware,
  DataverseBulkheadRejectedError,
  DataverseInvalidRequestError,
  DataverseQueueFullError,
  TelemetryEvents,
} from "../src/index.js";
import type {
  MiddlewareContext,
  RequestInformation,
  TelemetryClient,
} from "../src/abstractions/http.js";
import type { ConcurrencyOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

const request = (): RequestInformation => ({
  method: "GET",
  url: `${BASE_URL}/api/data/v9.2/accounts`,
  headers: {},
});

const throttled = (code: string, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify({ error: { code, message: "Throttled" } }), {
    status: 429,
    headers: { "content-type": "application/json", ...headers },
  });

/** Dataverse's 429 for too many concurrent requests. */
const concurrent429 = (headers: Record<string, string> = {}) => throttled("0x80072326", headers);

const ok = (headers: Record<string, string> = {}) => new Response(null, { status: 204, headers });

function middleware(concurrency: ConcurrencyOptions = {}) {
  const events: Array<{ props?: Record<string, string>; measurements?: Record<string, number> }> =
    [];
  const telemetry: TelemetryClient = {
    trackEvent: (name, props, measurements) => {
      if (name === TelemetryEvents.concurrencyLimit) events.push({ props, measurements });
    },
    trackException: () => undefined,
    startDependency: () => ({ end: () => undefined }),
  };
  const mw = new ConcurrencyMiddleware({ baseUrl: BASE_URL, concurrency, telemetry });
  const ctx = (): MiddlewareContext => ({ correlationId: "corr" });
  /** Send one request through the middleware; `fetch` answers with `res`. */
  const send = (res: Response | (() => Promise<Response>)) =>
    mw.execute(request(), ctx(), () => (res instanceof Response ? Promise.resolve(res) : res()));
  return { mw, send, events };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("#477: reduceOnThrottle", () => {
  it("halves the limit on 0x80072326, never below min", async () => {
    const { mw, send, events } = middleware();
    expect(mw.limit).toBe(8);
    const limits: number[] = [];
    for (let i = 0; i < 4; i++) {
      await send(concurrent429());
      limits.push(mw.limit);
    }
    expect(limits).toEqual([4, 2, 2, 2]);
    expect(events).toEqual([
      {
        props: { "correlation.id": "corr", "concurrency.reason": "throttle" },
        measurements: { "concurrency.limit": 4, "concurrency.previous_limit": 8 },
      },
      {
        props: { "correlation.id": "corr", "concurrency.reason": "throttle" },
        measurements: { "concurrency.limit": 2, "concurrency.previous_limit": 4 },
      },
    ]);
  });

  it("respects a custom min", async () => {
    const { mw, send } = middleware({ maxConcurrentRequests: 10, min: 3, max: 10 });
    await send(concurrent429());
    expect(mw.limit).toBe(5);
    await send(concurrent429());
    expect(mw.limit).toBe(3);
  });

  it("leaves the caller's 429 readable", async () => {
    const { send } = middleware();
    const res = await send(concurrent429());
    expect(await res.json()).toMatchObject({ error: { code: "0x80072326" } });
  });

  it("the other service-protection 429s leave the limit alone", async () => {
    const { mw, send } = middleware();
    await send(throttled("0x80072322"));
    await send(throttled("0x80072321"));
    await send(new Response("busy", { status: 429 }));
    expect(mw.limit).toBe(8);
  });

  it("a burst of these 429s halves the limit once", async () => {
    const { mw, send } = middleware();
    const releases: Array<() => void> = [];
    const pending = Array.from({ length: 4 }, () =>
      send(
        () =>
          new Promise<Response>((resolve) => {
            releases.push(() => {
              resolve(concurrent429());
            });
          })
      )
    );
    await vi.waitFor(() => {
      expect(releases).toHaveLength(4);
    });
    for (const release of releases) release();
    await Promise.all(pending);
    expect(mw.limit).toBe(4);
    // A request sent after the halving may halve it again.
    await send(concurrent429());
    expect(mw.limit).toBe(2);
  });

  it("the DOP hint raises it again once the 429's Retry-After has passed", async () => {
    const { mw, send, events } = middleware();
    await send(concurrent429({ "retry-after": "2", "x-ms-dop-hint": "8" }));
    expect(mw.limit).toBe(4);
    // Within the Retry-After, a hint doesn't raise it...
    await send(ok({ "x-ms-dop-hint": "8" }));
    expect(mw.limit).toBe(4);
    // ...but may lower it.
    await send(ok({ "x-ms-dop-hint": "3" }));
    expect(mw.limit).toBe(3);
    vi.advanceTimersByTime(2000);
    await send(ok({ "x-ms-dop-hint": "8" }));
    expect(mw.limit).toBe(8);
    expect(events.map((e) => e.props?.["concurrency.reason"])).toEqual([
      "throttle",
      "dop_hint",
      "dop_hint",
    ]);
    expect(events[2]?.measurements).toEqual({
      "concurrency.limit": 8,
      "concurrency.previous_limit": 3,
      dop_hint: 8,
    });
  });

  it("without Retry-After, the next hint raises it at once", async () => {
    const { mw, send } = middleware();
    await send(concurrent429());
    expect(mw.limit).toBe(4);
    await send(ok({ "x-ms-dop-hint": "8" }));
    expect(mw.limit).toBe(8);
  });

  it("without a readable hint, each success raises it by 1 back to where it was", async () => {
    const { mw, send, events } = middleware({ adaptiveFromDopHint: false });
    await send(concurrent429({ "retry-after": "1" }));
    expect(mw.limit).toBe(4);
    await send(ok());
    expect(mw.limit).toBe(4);
    vi.advanceTimersByTime(1000);
    const limits: number[] = [];
    for (let i = 0; i < 6; i++) {
      await send(ok({ "x-ms-dop-hint": "16" })); // ignored: adaptiveFromDopHint is false
      limits.push(mw.limit);
    }
    expect(limits).toEqual([5, 6, 7, 8, 8, 8]);
    expect(events.slice(1).map((e) => e.props?.["concurrency.reason"])).toEqual([
      "recovery",
      "recovery",
      "recovery",
      "recovery",
    ]);
  });

  it("reduceOnThrottle: false keeps the limit, and the hint works as before", async () => {
    const { mw, send, events } = middleware({ reduceOnThrottle: false });
    await send(concurrent429({ "retry-after": "5" }));
    expect(mw.limit).toBe(8);
    await send(concurrent429({ "x-ms-dop-hint": "4" }));
    expect(mw.limit).toBe(4);
    await send(ok({ "x-ms-dop-hint": "12" }));
    expect(mw.limit).toBe(12);
    expect(events.map((e) => e.props?.["concurrency.reason"])).toEqual(["dop_hint", "dop_hint"]);
  });

  it("is on by default through the client", async () => {
    let n = 0;
    const seen: number[] = [];
    let inFlight = 0;
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { maxRetries: 0 },
      fetchProvider: {
        fetch: async () => {
          inFlight++;
          seen.push(inFlight);
          await new Promise((r) => setTimeout(r, 5));
          inFlight--;
          return n++ === 0 ? concurrent429({ "retry-after": "60" }) : ok();
        },
      },
    });
    await client.send({ method: "GET", url: "WhoAmI", headers: {} });
    await Promise.all(Array.from({ length: 12 }, () => client.api("accounts").get()));
    // Halved from 8 to 4, and held there for the Retry-After (Date is frozen).
    expect(Math.max(...seen)).toBe(4);
  });
});

describe("#477: concurrency.maxQueue", () => {
  /** A middleware with one slot; returns a way to finish the request holding it. */
  async function oneSlotBusy(maxQueue?: number) {
    const { mw } = middleware({ maxConcurrentRequests: 1, maxQueue });
    let finish: () => void = () => undefined;
    const first = mw.execute(
      request(),
      {},
      () =>
        new Promise<Response>((resolve) => {
          finish = () => {
            resolve(ok());
          };
        })
    );
    await Promise.resolve();
    const send = () => mw.execute(request(), {}, () => Promise.resolve(ok()));
    return {
      first,
      finish: () => {
        finish();
      },
      send,
    };
  }

  it("refuses a request beyond it with DataverseQueueFullError", async () => {
    const { first, finish, send } = await oneSlotBusy(1);
    const queued = send();
    const refused = send();
    await expect(refused).rejects.toBeInstanceOf(DataverseQueueFullError);
    await expect(refused).rejects.toMatchObject({
      name: "DataverseQueueFullError",
      queue: "concurrency",
      maxQueue: 1,
      queued: 1,
      inFlight: 1,
      limit: 1,
      message: "Concurrency queue is full: 1 in flight (limit 1) and 1 waiting (maxQueue 1)",
    });
    finish();
    await Promise.all([first, queued]);
    // Room again.
    await send();
  });

  it("0 refuses every request over the limit", async () => {
    const { first, finish, send } = await oneSlotBusy(0);
    await expect(send()).rejects.toMatchObject({ queue: "concurrency", maxQueue: 0, queued: 0 });
    finish();
    await first;
  });

  it("is unbounded by default", async () => {
    const { first, finish, send } = await oneSlotBusy();
    const queued = Array.from({ length: 50 }, () => send());
    finish();
    await Promise.all([first, ...queued]);
  });

  it.each([-1, 1.5, Number.NaN])("rejects maxQueue %s", (maxQueue) => {
    expect(
      () => new ConcurrencyMiddleware({ baseUrl: BASE_URL, concurrency: { maxQueue } })
    ).toThrow(DataverseInvalidRequestError);
  });

  it("reaches the caller of a client unchanged, and isn't retried", async () => {
    let calls = 0;
    let finish: () => void = () => undefined;
    const client = new DataverseClient({
      baseUrl: BASE_URL,
      concurrency: { maxConcurrentRequests: 1, min: 1, maxQueue: 0 },
      fetchProvider: {
        fetch: () => {
          calls++;
          return new Promise<Response>((resolve) => {
            finish = () => {
              resolve(ok());
            };
          });
        },
      },
    });
    const first = client.api("accounts").get();
    await vi.waitFor(() => {
      expect(calls).toBe(1);
    });
    const err: unknown = await client
      .api("contacts")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseQueueFullError);
    expect(err).toMatchObject({ queue: "concurrency" });
    expect((err as DataverseQueueFullError).correlationId).toBeTypeOf("string");
    expect(calls).toBe(1);
    finish();
    await first;
  });

  it("the bulkhead's rejection is a DataverseQueueFullError too", async () => {
    const bulkhead = new BulkheadMiddleware({ limits: { read: 1 }, maxQueue: 0 });
    let finish: () => void = () => undefined;
    const first = bulkhead.execute(
      request(),
      {},
      () =>
        new Promise<Response>((resolve) => {
          finish = () => {
            resolve(ok());
          };
        })
    );
    const err: unknown = await bulkhead
      .execute(request(), {}, () => Promise.resolve(ok()))
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseBulkheadRejectedError);
    expect(err).toBeInstanceOf(DataverseQueueFullError);
    expect(err).toMatchObject({
      name: "DataverseBulkheadRejectedError",
      queue: "bulkhead",
      category: "read",
      maxQueue: 0,
      queued: 0,
      inFlight: 1,
      limit: 1,
    });
    finish();
    await first;
  });
});
