/**
 * #469: a custom `shouldRetry` picks the statuses to retry, but the idempotency guard (and the
 * multipart `$batch` 429 guard) still apply unless `retryNonIdempotent: true`.
 *
 * #471: with `timeoutMs`, a retry whose wait (`Retry-After` or backoff) would end after the
 * deadline is not started: the response comes back at once, so a 429 becomes
 * `DataverseThrottleError` with `retryAfterMs` instead of a `RequestTimeout` at the deadline.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import { TelemetryEvents } from "../src/telemetry/events.js";
import { DataverseThrottleError } from "../src/errors/DataverseThrottleError.js";
import { DataverseNetworkError } from "../src/errors/NamedErrors.js";
import type { FetchProvider, HttpMethod, TelemetryClient } from "../src/abstractions/http.js";
import type { RetryInfo, RetryOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const BOUNDARY = "batchresponse_1";

type Step = (() => Response) | Error;

/** A client whose fetch plays `steps` in order (the last one repeats), recording retries. */
function setup(steps: Step[], retry: RetryOptions = {}) {
  let calls = 0;
  const retries: RetryInfo[] = [];
  const events: string[] = [];
  const telemetry: TelemetryClient = {
    trackEvent: (name) => events.push(name),
    trackException: () => undefined,
    startDependency: () => ({ end: () => undefined }),
  };
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const step = steps[Math.min(calls, steps.length - 1)];
      calls++;
      if (init?.signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      if (step instanceof Error) return Promise.reject(step);
      return Promise.resolve(step());
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    telemetry,
    concurrency: { adaptiveFromDopHint: false },
    retry: {
      baseDelayMs: 1,
      maxDelayMs: 2,
      jitter: false,
      onRetry: (info) => retries.push(info),
      ...retry,
    },
  });
  const retryEvents = () => events.filter((e) => e === TelemetryEvents.retry).length;
  return { client, calls: () => calls, retries, retryEvents };
}

const status =
  (code: number, headers: Record<string, string> = {}) =>
  () =>
    new Response(
      code === 204
        ? null
        : JSON.stringify({ error: { code: "0x0", message: `HTTP ${String(code)}` } }),
      { status: code, headers: { "content-type": "application/json", ...headers } }
    );

const multipart429 = () =>
  new Response(
    `--${BOUNDARY}\r\nContent-Type: application/http\r\n\r\nHTTP/1.1 204 No Content\r\n\r\n\r\n--${BOUNDARY}--\r\n`,
    {
      status: 429,
      headers: { "content-type": `multipart/mixed; boundary=${BOUNDARY}`, "retry-after": "0" },
    }
  );

function send(client: DataverseClient, method: HttpMethod, extra: object = {}) {
  return client.send({
    method,
    url: "accounts",
    headers: {},
    body: method === "POST" || method === "PATCH" ? { name: "x" } : undefined,
    ...extra,
  });
}

const serverErrors = (s: number) => s >= 500;
/** Every failed status, and network errors (status 0). */
const anyFailure = (s: number) => s === 0 || s >= 400;

describe("#469: shouldRetry keeps the idempotency guard", () => {
  it("a POST answered 502 is not retried with shouldRetry: s => s >= 500", async () => {
    const t = setup([status(502), status(204)], { shouldRetry: serverErrors });
    expect((await send(t.client, "POST")).status).toBe(502);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
    expect(t.retryEvents()).toBe(0);
  });

  it("the same POST is retried with retryNonIdempotent: true", async () => {
    const t = setup([status(502), status(204)], {
      shouldRetry: serverErrors,
      retryNonIdempotent: true,
    });
    expect((await send(t.client, "POST")).status).toBe(204);
    expect(t.calls()).toBe(2);
    expect(t.retries).toHaveLength(1);
  });

  it("a GET, and a PATCH with If-Match, are still retried", async () => {
    const get = setup([status(502), status(204)], { shouldRetry: serverErrors });
    expect((await send(get.client, "GET")).status).toBe(204);
    expect(get.calls()).toBe(2);

    const patch = setup([status(500), status(204)], { shouldRetry: serverErrors });
    const res = await send(patch.client, "PATCH", { headers: { "if-match": "*" } });
    expect(res.status).toBe(204);
    expect(patch.calls()).toBe(2);
  });

  it("a per-request shouldRetry keeps the guard too", async () => {
    const t = setup([status(503), status(204)]);
    const middlewareOptions = new MiddlewareRequestOptions([
      { type: "retry", shouldRetry: anyFailure },
    ]);
    expect((await send(t.client, "POST", { middlewareOptions })).status).toBe(503);
    expect(t.calls()).toBe(1);
  });

  it("shouldRetry still decides which statuses are retried", async () => {
    const t = setup([status(503), status(204)], { shouldRetry: (s) => s === 500 });
    expect((await send(t.client, "GET")).status).toBe(503);
    expect(t.calls()).toBe(1);
  });

  it("a JSON 429 on a POST is still retried", async () => {
    const t = setup([status(429, { "retry-after": "0" }), status(204)], {
      shouldRetry: anyFailure,
    });
    expect((await send(t.client, "POST")).status).toBe(204);
    expect(t.calls()).toBe(2);
  });

  it("a POST $batch with a multipart 429 is handed back, unless retryNonIdempotent", async () => {
    const sendBatch = (client: DataverseClient) =>
      client.send({ method: "POST", url: "$batch", headers: {}, body: "--batch_1--" });

    const guarded = setup([multipart429, status(204)], { shouldRetry: anyFailure });
    const res = await sendBatch(guarded.client);
    expect(res.status).toBe(429);
    expect(await res.text()).toContain("HTTP/1.1 204 No Content");
    expect(guarded.calls()).toBe(1);

    const opted = setup([multipart429, status(204)], {
      shouldRetry: anyFailure,
      retryNonIdempotent: true,
    });
    expect((await sendBatch(opted.client)).status).toBe(204);
    expect(opted.calls()).toBe(2);
  });

  it("a POST after a dropped connection is retried only with retryNonIdempotent", async () => {
    const failed = () => new TypeError("fetch failed");
    const guarded = setup([failed(), status(204)], { shouldRetry: anyFailure });
    await expect(send(guarded.client, "POST")).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(guarded.calls()).toBe(1);

    const opted = setup([failed(), status(204)], {
      shouldRetry: anyFailure,
      retryNonIdempotent: true,
    });
    expect((await send(opted.client, "POST")).status).toBe(204);
    expect(opted.calls()).toBe(2);

    const get = setup([failed(), status(204)], { shouldRetry: anyFailure });
    expect((await send(get.client, "GET")).status).toBe(204);
    expect(get.calls()).toBe(2);
  });
});

describe("#471: a wait that ends after the deadline is not started", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  /** Settle `p` while letting at most `ms` of fake time pass. */
  async function within<T>(p: Promise<T>, ms: number) {
    let settled = false;
    let value: unknown;
    p.then(
      (v) => {
        settled = true;
        value = v;
      },
      (e: unknown) => {
        settled = true;
        value = e;
      }
    );
    await vi.advanceTimersByTimeAsync(ms);
    return { settled, value };
  }

  const get = (client: DataverseClient, timeoutMs: number) =>
    client.api("accounts").get({ timeoutMs });

  it("timeoutMs: 10_000 and a 429 with Retry-After: 60 rejects at once with the throttle error", async () => {
    const t = setup([status(429, { "retry-after": "60" }), status(204)], {
      maxRetryAfterMs: Number.POSITIVE_INFINITY, // so only the deadline stops the wait
    });
    const { settled, value } = await within(get(t.client, 10_000), 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseThrottleError);
    expect((value as DataverseThrottleError).retryAfterMs).toBe(60_000);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
    expect(t.retryEvents()).toBe(0);
  });

  it("the same with the default maxRetryAfterMs (30 s) and a Retry-After: 20 under it", async () => {
    // maxRetryAfterMs defaults to maxDelayMs; 30 s lets a 20 s Retry-After through to the deadline.
    const t = setup([status(429, { "retry-after": "20" }), status(204)], { maxDelayMs: 30_000 });
    const { settled, value } = await within(get(t.client, 10_000), 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseThrottleError);
    expect((value as DataverseThrottleError).retryAfterMs).toBe(20_000);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });

  it("a Retry-After: 2 within the deadline is waited out and retried as before", async () => {
    const t = setup([status(429, { "retry-after": "2" }), status(204)], { maxDelayMs: 30_000 });
    const pending = send(t.client, "GET", { timeoutMs: 10_000 });
    expect((await within(pending, 1_999)).settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect((await pending).status).toBe(204);
    expect(t.calls()).toBe(2);
    expect(t.retries).toHaveLength(1);
    expect(t.retries[0]).toMatchObject({ delayMs: 2000, retryAfterMs: 2000 });
    expect(t.retryEvents()).toBe(1);
  });

  it("a later Retry-After that no longer fits stops there", async () => {
    const t = setup([status(429, { "retry-after": "6" })], { maxDelayMs: 30_000 });
    const pending = get(t.client, 10_000).catch((e: unknown) => e);
    await vi.advanceTimersByTimeAsync(6_000);
    const err = await pending;
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect(t.calls()).toBe(2); // the first wait (6 s) fits; the second would end at 12 s
    expect(t.retries).toHaveLength(1);
    expect(t.retryEvents()).toBe(1);
  });

  it("a 5xx backoff past the deadline returns the response instead of sleeping", async () => {
    const t = setup([status(503), status(204)], { baseDelayMs: 20_000, maxDelayMs: 60_000 });
    const { settled, value } = await within(send(t.client, "GET", { timeoutMs: 10_000 }), 50);
    expect(settled).toBe(true);
    expect((value as Response).status).toBe(503);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });

  it("a network-error backoff past the deadline throws the network error", async () => {
    const t = setup([new TypeError("fetch failed"), status(204)], {
      baseDelayMs: 20_000,
      maxDelayMs: 60_000,
    });
    const { settled, value } = await within(send(t.client, "GET", { timeoutMs: 10_000 }), 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseNetworkError);
    expect((value as Error).name).toBe("ConnectionFailed");
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });

  it("a caller's own deadline (RequestInformation.deadline) stops the wait too (#487)", async () => {
    const t = setup([status(429, { "retry-after": "20" }), status(204)], { maxDelayMs: 30_000 });
    const pending = send(t.client, "GET", { deadline: Date.now() + 10_000 });
    const { settled, value } = await within(pending, 50);
    expect(settled).toBe(true);
    expect((value as Response).status).toBe(429);
    expect(t.calls()).toBe(1);
    expect(t.retries).toEqual([]);
  });

  it("with both timeoutMs and deadline, the earlier one counts (#487)", async () => {
    const byDeadline = setup([status(429, { "retry-after": "5" }), status(204)], {
      maxDelayMs: 30_000,
    });
    const first = send(byDeadline.client, "GET", {
      timeoutMs: 10_000,
      deadline: Date.now() + 2_000,
    });
    expect(((await within(first, 50)).value as Response).status).toBe(429);
    expect(byDeadline.calls()).toBe(1);

    const byTimeout = setup([status(429, { "retry-after": "5" }), status(204)], {
      maxDelayMs: 30_000,
    });
    const second = send(byTimeout.client, "GET", {
      timeoutMs: 2_000,
      deadline: Date.now() + 10_000,
    });
    expect(((await within(second, 50)).value as Response).status).toBe(429);
    expect(byTimeout.calls()).toBe(1);

    const fits = setup([status(429, { "retry-after": "5" }), status(204)], { maxDelayMs: 30_000 });
    const retried = send(fits.client, "GET", { timeoutMs: 10_000, deadline: Date.now() + 8_000 });
    await vi.advanceTimersByTimeAsync(5_000);
    expect((await retried).status).toBe(204);
    expect(fits.calls()).toBe(2);
  });

  it("without timeoutMs the wait is unchanged", async () => {
    const t = setup([status(429, { "retry-after": "20" }), status(204)], { maxDelayMs: 30_000 });
    const pending = send(t.client, "GET");
    await vi.advanceTimersByTimeAsync(20_000);
    expect((await pending).status).toBe(204);
    expect(t.calls()).toBe(2);
  });
});
