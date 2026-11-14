/**
 * #478: fake-fetch equivalents of the chaos presets, and the fake clock.
 */
import { describe, expect, it } from "vitest";
import {
  ChaosMiddleware,
  ChaosPresets,
  DataverseNetworkError,
  DataverseThrottleError,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  SERVICE_PROTECTION_ERRORS,
  TEST_API_URL,
  connectionReset,
  createTestClient,
  fakeClock,
  gatewayError,
  jsonResponse,
  serviceProtectionError,
  slowResponse,
  throttled,
} from "../src/index.js";

describe("service-protection, gateway and network responders", () => {
  it.each([
    ["requests", "0x80072322"],
    ["execution_time", "0x80072321"],
    ["concurrent_requests", "0x80072326"],
  ] as const)("serviceProtectionError(%s): 429, Retry-After and code %s", async (limit, code) => {
    const res = serviceProtectionError(limit, 3);
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("3");
    expect(res.headers.get("content-type")).toBe("application/json; odata.metadata=minimal");
    expect(await res.json()).toEqual({
      error: { code, message: SERVICE_PROTECTION_ERRORS[limit].message },
    });
  });

  it("matches core's ChaosPresets.serviceProtection() bodies, in the same order", () => {
    const bodies = ChaosPresets.serviceProtection().map((f) => f.body);
    expect(bodies).toEqual(
      (["requests", "execution_time", "concurrent_requests"] as const).map((l) => ({
        error: SERVICE_PROTECTION_ERRORS[l],
      }))
    );
  });

  it("throttled() is still the number-of-requests 429", async () => {
    const res = throttled(2);
    expect(res.headers.get("retry-after")).toBe("2");
    expect(await res.json()).toMatchObject({ error: { code: "0x80072322" } });
  });

  it("gatewayError(): 502, 503 (default) and 504", () => {
    expect([gatewayError(502), gatewayError(), gatewayError(504)].map((r) => r.status)).toEqual([
      502, 503, 504,
    ]);
  });

  it("a 429 from the fake fetch reaches the app as DataverseThrottleError", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => serviceProtectionError("execution_time"));
    const err = await client
      .api("accounts")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(err).toMatchObject({ status: 429, code: "0x80072321" });
  });

  it("connectionReset() fails the request like a dropped connection", async () => {
    expect(() => connectionReset()).toThrow(TypeError);
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", connectionReset);
    const err = await client
      .api("accounts")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("ConnectionFailed");
  });
});

describe("fakeClock", () => {
  it("resolves sleeps only when advanced past their end, in order, with now() at each end", async () => {
    const clock = fakeClock(1000);
    const order: Array<[string, number]> = [];
    void clock.sleep(300).then(() => order.push(["b", clock.now()]));
    void clock.sleep(100).then(() => order.push(["a", clock.now()]));
    expect(clock.pending).toBe(2);
    await clock.advance(99);
    expect(order).toEqual([]);
    await clock.advance(250);
    expect(order).toEqual([
      ["a", 1100],
      ["b", 1300],
    ]);
    expect(clock.now()).toBe(1349);
    expect(clock.pending).toBe(0);
  });

  it("rejects at once when the signal aborts, and when it was already aborted", async () => {
    const clock = fakeClock();
    const controller = new AbortController();
    const pending = clock.sleep(1000, controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(clock.pending).toBe(0);
    await expect(clock.sleep(1, controller.signal)).rejects.toMatchObject({ name: "AbortError" });
    const timedOut = AbortSignal.abort(new DOMException("late", "TimeoutError"));
    await expect(clock.sleep(1, timedOut)).rejects.toMatchObject({ name: "TimeoutError" });
  });

  it("times ChaosMiddleware's latency fault: the request goes out only once the clock passes delayMs", async () => {
    const clock = fakeClock();
    const chaos = new ChaosMiddleware({
      enabled: true,
      percentage: 100,
      faults: ChaosPresets.slowOrg({ delayMs: 5000 }),
      clock,
    });
    const { client, fake } = createTestClient({ middleware: { append: [chaos] } });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    const pending = client.api("WhoAmI").get();
    await clock.advance(4999);
    expect(fake.requests).toHaveLength(0);
    await clock.advance(1);
    await expect(pending).resolves.toEqual({ UserId: "u" });
    expect(fake.requests).toHaveLength(1);
  });

  it("slowResponse() answers after ms on the clock", async () => {
    const clock = fakeClock();
    const { client, fake } = createTestClient();
    fake.on(
      "GET",
      "/WhoAmI",
      slowResponse(() => jsonResponse({ UserId: "u" }), 800, clock)
    );
    let done = false;
    const pending = client
      .api("WhoAmI")
      .get()
      .then(() => (done = true));
    await clock.advance(799);
    expect(done).toBe(false);
    await clock.advance(1);
    await pending;
    expect(done).toBe(true);
    expect(fake.last().url).toBe(`${TEST_API_URL}/WhoAmI`);
  });
});
