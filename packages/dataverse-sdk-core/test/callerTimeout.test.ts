/**
 * #282: a caller's `AbortSignal.timeout()` rejects with the same SDK error as the client's own
 * `timeoutMs` (`DataverseNetworkError` named `RequestTimeout`), with the request's correlation id
 * and the `TimeoutError` as `cause`, whether it fires during fetch, a retry wait or the wait for a
 * concurrency slot. A plain abort is still a `DataverseAbortError`.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import { DataverseAbortError, DataverseNetworkError } from "../src/errors/NamedErrors.js";

const ORG = "https://contoso.crm.dynamics.com";

type Step = "hang" | "hang-plain-abort" | Response;

/**
 * A fake fetch that answers `steps` in order (the last one repeats). `"hang"` waits for the signal
 * and rejects with its reason, as fetch does; `"hang-plain-abort"` rejects with a plain
 * `AbortError` instead, as some fetch polyfills do.
 */
function setup(steps: Step[], options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<Record<string, string>> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    fetchProvider: {
      fetch: (_input, init) => {
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
        sent.push(headers);
        const signal = init?.signal ?? undefined;
        const step = steps[Math.min(sent.length - 1, steps.length - 1)];
        if (step instanceof Response) return Promise.resolve(step.clone());
        return new Promise<Response>((_resolve, reject) => {
          const onAbort = () => {
            reject(
              step === "hang"
                ? (signal?.reason as Error)
                : new DOMException("The operation was aborted.", "AbortError")
            );
          };
          if (signal?.aborted) onAbort();
          else signal?.addEventListener("abort", onAbort);
        });
      },
    },
    retry: { maxRetries: 0 },
    ...options,
  });
  return { client, sent };
}

const caught = (p: Promise<unknown>) =>
  p.then(
    () => undefined,
    (e: unknown) => e
  );

function expectCallerTimeout(
  err: unknown,
  correlationId: string | undefined,
  causeName = "TimeoutError"
) {
  expect(err).toBeInstanceOf(DataverseNetworkError);
  const e = err as DataverseNetworkError;
  expect(e.name).toBe("RequestTimeout");
  expect(e.message).toBe("Request timed out");
  expect(e.correlationId).toBe(correlationId);
  expect(e.correlationId).toMatch(/^[0-9a-f-]{36}$/);
  expect(e.cause).toBeInstanceOf(DOMException);
  expect((e.cause as DOMException).name).toBe(causeName);
}

describe("#282: a caller's AbortSignal.timeout() is a RequestTimeout", () => {
  it("while fetch is in flight", async () => {
    const { client, sent } = setup(["hang"]);
    const err = await caught(client.api("WhoAmI").get({ signal: AbortSignal.timeout(30) }));
    expectCallerTimeout(err, sent[0]?.["x-ms-correlation-id"]);
  });

  it("when the fetch provider rejects with a plain AbortError", async () => {
    const { client, sent } = setup(["hang-plain-abort"]);
    const err = await caught(client.api("WhoAmI").get({ signal: AbortSignal.timeout(30) }));
    expectCallerTimeout(err, sent[0]?.["x-ms-correlation-id"], "AbortError");
  });

  it("during a retry wait", async () => {
    const { client, sent } = setup([new Response(null, { status: 503 })], {
      retry: { maxRetries: 3, baseDelayMs: 5000, jitter: false },
    });
    const err = await caught(client.api("WhoAmI").get({ signal: AbortSignal.timeout(50) }));
    expect(sent).toHaveLength(1);
    expectCallerTimeout(err, sent[0]?.["x-ms-correlation-id"]);
  });

  it("while waiting for a concurrency slot", async () => {
    const { client, sent } = setup(["hang"], {
      concurrency: { maxConcurrentRequests: 1, min: 1, max: 1, adaptiveFromDopHint: false },
    });
    const blocker = new AbortController();
    const first = caught(client.api("WhoAmI").get({ signal: blocker.signal }));
    const err = await caught(
      client.api("WhoAmI").get({ signal: AbortSignal.timeout(50), correlationId: "c-282" })
    );
    // The second request never reached fetch: it timed out in the queue.
    expect(sent).toHaveLength(1);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout", correlationId: "c-282" });
    expect((err as DataverseNetworkError).cause).toMatchObject({ name: "TimeoutError" });
    blocker.abort();
    expect(await first).toBeInstanceOf(DataverseAbortError);
  });

  it("when the signal has already timed out", async () => {
    const signal = AbortSignal.timeout(1);
    await new Promise((r) => setTimeout(r, 20));
    const { client, sent } = setup(["hang"]);
    const err = await caught(client.api("WhoAmI").get({ signal }));
    expect(sent).toHaveLength(0);
    expect(err).toMatchObject({ name: "RequestTimeout" });
    expect(err).toBeInstanceOf(DataverseNetworkError);
  });

  it("a plain abort is still a DataverseAbortError", async () => {
    const { client } = setup(["hang"]);
    const controller = new AbortController();
    const pending = caught(client.api("WhoAmI").get({ signal: controller.signal }));
    controller.abort();
    const err = await pending;
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(err).toMatchObject({ name: "AbortError" });
  });

  it("the client's own timeoutMs still reports its duration", async () => {
    const { client } = setup(["hang"]);
    const err = await caught(
      client.api("WhoAmI").get({ timeoutMs: 30, signal: AbortSignal.timeout(10_000) })
    );
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout", message: "Request timed out after 30ms" });
  });
});
