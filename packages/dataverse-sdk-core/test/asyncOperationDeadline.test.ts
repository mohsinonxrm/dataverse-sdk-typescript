/**
 * #498: `waitForAsyncOperation({ timeoutMs })` gives each read the wait's deadline, so a read
 * throttled with a `Retry-After` longer than the time left rejects at once with
 * `DataverseThrottleError` instead of waiting for the timeout. `RequestOptions.deadline` (on the
 * builder and `client.execute()`) carries a caller's own deadline the same way.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseThrottleError } from "../src/errors/DataverseThrottleError.js";
import { waitForAsyncOperation } from "../src/asyncoperation/waitForAsyncOperation.js";
import type { FetchProvider } from "../src/abstractions/http.js";
import type { Executable } from "../src/abstractions/executable.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const JOB = "4c1a7c3e-1f2b-4d5e-8a9b-0c1d2e3f4a5b";

const throttled = (seconds: number) =>
  new Response(
    JSON.stringify({ error: { code: "0x80072322", message: "Number of requests exceeded" } }),
    {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": String(seconds) },
    }
  );

const job = (statuscode: number) =>
  new Response(
    JSON.stringify({ asyncoperationid: JOB, statecode: statuscode >= 30 ? 3 : 2, statuscode }),
    { status: 200, headers: { "content-type": "application/json" } }
  );

/** A client whose fetch plays `steps` in order (the last one repeats). */
function setup(steps: Array<() => Response>) {
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const step = steps[Math.min(calls, steps.length - 1)];
      calls++;
      if (init?.signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      return Promise.resolve(step());
    },
  };
  // A Retry-After of 60 s is within maxRetryAfterMs, so only the deadline can stop the wait.
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetryAfterMs: 120_000 },
  });
  return { client, calls: () => calls };
}

describe("#498: waitForAsyncOperation's reads carry its deadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("timeoutMs 10 s and a read answered 429 Retry-After 60: rejects at once with DataverseThrottleError", async () => {
    const t = setup([() => throttled(60), () => job(30)]);
    const err: unknown = await waitForAsyncOperation(t.client, JOB, { timeoutMs: 10_000 }).catch(
      (e: unknown) => e
    );
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(60_000);
    expect(t.calls()).toBe(1);
  });

  it("a later read gets only the time left", async () => {
    // First read: in progress. The 2 s wait leaves 8 s, so a 9 s Retry-After no longer fits.
    const t = setup([() => job(20), () => throttled(9), () => job(30)]);
    const pending = waitForAsyncOperation(t.client, JOB, { timeoutMs: 10_000, intervalMs: 2000 });
    const settled = pending.catch((e: unknown) => e);
    await vi.advanceTimersByTimeAsync(2000);
    const err = await settled;
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(2);
  });

  it("a Retry-After that fits the time left is still waited out", async () => {
    const t = setup([() => throttled(2), () => job(30)]);
    const pending = waitForAsyncOperation(t.client, JOB, { timeoutMs: 10_000 });
    await vi.advanceTimersByTimeAsync(2000);
    await expect(pending).resolves.toMatchObject({ statuscode: 30 });
    expect(t.calls()).toBe(2);
  });

  it("an earlier deadline in requestOptions counts", async () => {
    const t = setup([() => throttled(5), () => job(30)]);
    const err: unknown = await waitForAsyncOperation(t.client, JOB, {
      timeoutMs: 60_000,
      requestOptions: { deadline: Date.now() + 3000 },
    }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(1);
  });
});

describe("#498: RequestOptions.deadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("on a builder terminal, stops a retry wait that would end after it", async () => {
    const t = setup([() => throttled(20), () => job(30)]);
    const err: unknown = await t.client
      .api("WhoAmI")
      .get({ deadline: Date.now() + 10_000 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(1);
  });

  it("through client.execute()", async () => {
    const t = setup([() => throttled(20), () => job(30)]);
    const request: Executable<unknown> = {
      toRequestInformation: (baseUrl) => ({ method: "GET", url: `${baseUrl}/WhoAmI`, headers: {} }),
      parseResponse: (res) => res.json(),
    };
    const err: unknown = await t.client
      .execute(request, { deadline: Date.now() + 10_000 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(1);
  });

  it("a wait that fits is still retried", async () => {
    const t = setup([() => throttled(2), () => job(30)]);
    const pending = t.client.api("WhoAmI").get({ deadline: Date.now() + 10_000 });
    await vi.advanceTimersByTimeAsync(2000);
    await expect(pending).resolves.toMatchObject({ statuscode: 30 });
    expect(t.calls()).toBe(2);
  });
});
