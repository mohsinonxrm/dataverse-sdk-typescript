/**
 * #547: an execution's `timeoutMs` (`execute()`, and the bulk helpers) is timed on the client's
 * clock (`DataverseClientOptions.clock`), like core's own `timeoutMs`, so a fake clock times it
 * in tests and the deadline sent to the retry middleware is on the same clock as its waits.
 *
 * No `vi.useFakeTimers()` here: that would also fake `Date.now()` and `setTimeout`, and hide an
 * execution that times itself on real time.
 */
import { describe, expect, it } from "vitest";
import {
  batchResponse,
  createTestClient,
  fakeClock,
  jsonResponse,
  slowResponse,
  throttled,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseNetworkError, DataverseThrottleError } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, createMultiple, type BulkTable } from "../src/index.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
const CREATE = "/accounts/Microsoft.Dynamics.CRM.CreateMultiple";
const GUID = "00000000-0000-0000-0000-000000000001";

/** A client on a fake clock, retrying 429s however long their Retry-After. */
function setup() {
  const clock = fakeClock(1_000_000);
  const { client, fake } = createTestClient({
    clock,
    retry: { maxRetries: 3, maxRetryAfterMs: Number.POSITIVE_INFINITY, jitter: false },
    concurrency: { adaptiveFromDopHint: false },
  });
  return { client, fake, clock };
}

/** Track whether `p` has settled, and with what. */
function track(p: Promise<unknown>) {
  const state: { settled: boolean; value?: unknown } = { settled: false };
  p.then(
    (value: unknown) => Object.assign(state, { settled: true, value }),
    (value: unknown) => Object.assign(state, { settled: true, value })
  );
  return state;
}

const batch = (client: ReturnType<typeof setup>["client"]) =>
  new BatchRequestBuilder(client).addRequest("a", "GET", "accounts");

describe("#547: an execution's timeoutMs runs on the client's clock", () => {
  it("execute() times out when the fake clock passes timeoutMs", async () => {
    const { client, fake, clock } = setup();
    fake.on(
      "POST",
      "/$batch",
      slowResponse(() => batchResponse([{ status: 200, body: { value: [] } }]), 10_000, clock)
    );
    const state = track(batch(client).execute({ timeoutMs: 1_000 }));

    await clock.advance(999);
    expect(state.settled).toBe(false);
    await clock.advance(1);
    expect(state.settled).toBe(true);
    expect(state.value).toBeInstanceOf(DataverseNetworkError);
    expect((state.value as DataverseNetworkError).name).toBe("RequestTimeout");
  });

  it("execute() sends its deadline on the client's clock: a Retry-After past it fails at once", async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", () => throttled(2), 1);
    // timeoutMs 1 s, Retry-After 2 s: the retry middleware (on the client's clock) sees the wait
    // would end after the deadline, without the clock moving.
    await expect(batch(client).execute({ timeoutMs: 1_000 })).rejects.toBeInstanceOf(
      DataverseThrottleError
    );
    expect(fake.requests).toHaveLength(1);
  });

  it("createMultiple() times out when the fake clock passes timeoutMs", async () => {
    const { client, fake, clock } = setup();
    fake.on(
      "POST",
      CREATE,
      slowResponse(() => jsonResponse({ Ids: [GUID] }), 10_000, clock)
    );
    const state = track(
      createMultiple(client, ACCOUNT, [{ name: "a" }], { strategy: "bulk", timeoutMs: 1_000 })
    );

    await clock.advance(999);
    expect(state.settled).toBe(false);
    await clock.advance(1);
    expect(state.settled).toBe(true);
    // A timed-out bulk operation rejects (it doesn't fail its records one by one)
    expect(state.value).toBeInstanceOf(DataverseNetworkError);
    expect((state.value as DataverseNetworkError).name).toBe("RequestTimeout");
  });
});
