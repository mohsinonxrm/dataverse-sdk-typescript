/**
 * #46: `timeoutMs` limits the whole request (attempts, retry waits and the wait for a concurrency
 * slot), `attemptTimeoutMs` limits one attempt, and no listener is left behind on the caller's
 * signal.
 */
import { afterEach, describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import { DataverseAbortError, DataverseNetworkError } from "../src/errors/NamedErrors.js";
import { linkSignals, startDeadline } from "../src/utils/signals.js";
import { sleep } from "../src/utils/sleep.js";

const ORG = "https://contoso.crm.dynamics.com";

type Responder = (signal: AbortSignal | undefined, n: number) => Promise<Response> | Response;

function makeClient(respond: Responder, options: Partial<DataverseClientOptions> = {}) {
  let n = 0;
  const client = new DataverseClient({
    baseUrl: ORG,
    fetchProvider: {
      fetch: (_input, init) => {
        n++;
        if (init?.signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
        return Promise.resolve(respond(init?.signal ?? undefined, n));
      },
    },
    ...options,
  });
  return { client, calls: () => n };
}

/** A fetch that never answers until its signal aborts. */
const hang: Responder = (signal) =>
  new Promise((_resolve, reject) => {
    signal?.addEventListener("abort", () => {
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

/** Count the abort listeners currently attached to `signal` through add/removeEventListener. */
function trackListeners(signal: AbortSignal): () => number {
  const live = new Set<unknown>();
  const add = signal.addEventListener.bind(signal);
  const remove = signal.removeEventListener.bind(signal);
  signal.addEventListener = (type: string, listener: unknown, options?: unknown) => {
    if (type === "abort") live.add(listener);
    add(type, listener as EventListener, options as AddEventListenerOptions);
  };
  signal.removeEventListener = (type: string, listener: unknown, options?: unknown) => {
    if (type === "abort") live.delete(listener);
    remove(type, listener as EventListener, options as EventListenerOptions);
  };
  return () => live.size;
}

const ok = () => new Response("{}", { headers: { "content-type": "application/json" } });

async function timed<T>(p: Promise<T>): Promise<{ ms: number; result: unknown }> {
  const start = Date.now();
  const result = await p.catch((e: unknown) => e);
  return { ms: Date.now() - start, result };
}

describe("#46: timeoutMs covers the whole request", () => {
  it("a server that keeps answering 503 fails at the deadline, not after every retry", async () => {
    const { client, calls } = makeClient(() => new Response(null, { status: 503 }), {
      retry: { maxRetries: 3, baseDelayMs: 200, jitter: false },
    });
    const { ms, result } = await timed(client.api("WhoAmI").get({ timeoutMs: 300 }));
    expect(result).toBeInstanceOf(DataverseNetworkError);
    expect(result).toMatchObject({
      name: "RequestTimeout",
      message: "Request timed out after 300ms",
    });
    expect(ms).toBeLessThan(500); // the retries alone would take 200 + 400 + 800 ms
    expect(calls()).toBe(2); // the second wait (400 ms) was cut short
  });

  it("a 429 with a Retry-After longer than the deadline fails at the deadline", async () => {
    const { client } = makeClient(
      () => new Response(null, { status: 429, headers: { "retry-after": "1" } }),
      { retry: { maxRetries: 6 } }
    );
    const { ms, result } = await timed(client.api("WhoAmI").get({ timeoutMs: 200 }));
    expect(result).toMatchObject({ name: "RequestTimeout" });
    expect(ms).toBeLessThan(600);
  });

  it("the wait for a concurrency slot counts too, and leaves the queue", async () => {
    let release: () => void = () => undefined;
    const { client, calls } = makeClient(
      (_signal, n) =>
        n === 1
          ? new Promise<Response>((resolve) => {
              release = () => {
                resolve(ok());
              };
            })
          : ok(),
      {
        concurrency: { maxConcurrentRequests: 1, min: 1, max: 1, adaptiveFromDopHint: false },
        retry: { maxRetries: 0 },
      }
    );
    const first = client.api("first").get();
    await new Promise((r) => setTimeout(r, 5));
    const { ms, result } = await timed(client.api("second").get({ timeoutMs: 50 }));
    expect(result).toMatchObject({ name: "RequestTimeout" });
    expect(ms).toBeLessThan(300);
    release();
    await first;
    // The timed-out request left the queue: the slot went back without sending it.
    await client.api("third").get();
    expect(calls()).toBe(2);
  });

  it("a caller's abort during a retry wait is an abort, not a timeout", async () => {
    const controller = new AbortController();
    const { client } = makeClient(() => new Response(null, { status: 503 }), {
      retry: { maxRetries: 3, baseDelayMs: 1000, jitter: false },
    });
    setTimeout(() => {
      controller.abort();
    }, 30);
    const { ms, result } = await timed(
      client.api("WhoAmI").get({ timeoutMs: 5000, signal: controller.signal })
    );
    expect(result).toBeInstanceOf(DataverseAbortError);
    expect(ms).toBeLessThan(500);
  });

  it("a request that answers in time is unaffected, and the timer is cleared", async () => {
    const { client } = makeClient(() => ok());
    await expect(client.api("WhoAmI").get({ timeoutMs: 1000 })).resolves.toEqual({});
  });
});

describe("#46: attemptTimeoutMs limits one attempt", () => {
  it("a hanging attempt times out and is not retried", async () => {
    const { client, calls } = makeClient(hang, {
      retry: { maxRetries: 3, retryNetworkErrors: true, baseDelayMs: 1 },
    });
    const { ms, result } = await timed(client.api("WhoAmI").get({ attemptTimeoutMs: 50 }));
    expect(result).toMatchObject({
      name: "RequestTimeout",
      message: "Request timed out after 50ms",
    });
    expect(ms).toBeLessThan(300);
    expect(calls()).toBe(1);
  });

  it("works with execute() and RequestOptions too", async () => {
    const { client } = makeClient(hang);
    const exec = {
      toRequestInformation: (base: string) => ({
        method: "GET" as const,
        url: `${base}/WhoAmI`,
        headers: {},
      }),
      parseResponse: () => Promise.resolve(1),
    };
    await expect(client.execute(exec, { attemptTimeoutMs: 20 })).rejects.toMatchObject({
      name: "RequestTimeout",
    });
  });
});

const realAny = (AbortSignal as unknown as { any?: unknown }).any;
const setAny = (value: unknown) => {
  Object.defineProperty(AbortSignal, "any", { value, configurable: true, writable: true });
};
afterEach(() => {
  setAny(realAny);
});

describe("#46: no listeners left on a shared signal", () => {
  async function run(): Promise<number> {
    const shared = new AbortController();
    const listeners = trackListeners(shared.signal);
    const { client } = makeClient(
      (_signal, n) => (n % 10 === 1 ? new Response(null, { status: 503 }) : ok()),
      {
        retry: { maxRetries: 1, baseDelayMs: 1, jitter: false },
      }
    );
    for (let i = 0; i < 1000; i++) {
      await client
        .api("WhoAmI")
        .get({ signal: shared.signal, timeoutMs: 1000, attemptTimeoutMs: 1000 });
    }
    // One in ten of those was retried, so its retry wait listened to the signal too.
    for (let i = 0; i < 100; i++) {
      await client.api("WhoAmI").get({ signal: shared.signal });
    }
    return listeners();
  }

  it("with AbortSignal.any", async () => {
    expect(await run()).toBe(0);
  });

  it("without AbortSignal.any (older browsers)", async () => {
    setAny(undefined);
    expect(await run()).toBe(0);
  });
});

describe("signal helpers", () => {
  it("linkSignals returns a lone or already-aborted source as is", () => {
    const a = new AbortController();
    expect(linkSignals(undefined).signal).toBeUndefined();
    expect(linkSignals(a.signal, undefined).signal).toBe(a.signal);
    const b = new AbortController();
    b.abort();
    expect(linkSignals(a.signal, b.signal).signal).toBe(b.signal);
  });

  it("the fallback link aborts with the source's reason and detaches", () => {
    setAny(undefined);
    const a = new AbortController();
    const b = new AbortController();
    const listeners = trackListeners(a.signal);
    const linked = linkSignals(a.signal, b.signal);
    expect(listeners()).toBe(1);
    const reason = new Error("stop");
    b.abort(reason);
    expect(linked.signal?.aborted).toBe(true);
    expect(linked.signal?.reason).toBe(reason);
    expect(listeners()).toBe(0);
  });

  it("a deadline reports expiry and aborts with a TimeoutError", async () => {
    const d = startDeadline(10);
    expect(d.expired).toBe(false);
    await new Promise((r) => setTimeout(r, 30));
    expect(d.expired).toBe(true);
    expect((d.signal.reason as DOMException).name).toBe("TimeoutError");
    d.dispose();
  });

  it("sleep rejects at once on an aborted signal and removes its listener when done", async () => {
    const c = new AbortController();
    const listeners = trackListeners(c.signal);
    await sleep(5, c.signal);
    expect(listeners()).toBe(0);
    c.abort();
    await expect(sleep(0, c.signal)).rejects.toMatchObject({ name: "AbortError" });
  });
});
