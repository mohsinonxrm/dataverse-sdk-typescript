/**
 * #487: `execute({ timeoutMs })` (and `createMultiple()` / `updateMultiple()` with `timeoutMs`)
 * send their deadline with each request, so the retry middleware doesn't start a `Retry-After` or
 * backoff wait that would end after it (#471): a 429 rejects at once with `DataverseThrottleError`
 * instead of a `RequestTimeout` when `timeoutMs` passes.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  batchResponse,
  createTestClient,
  jsonResponse,
  throttled,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseThrottleError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  BatchRequestBuilder,
  DataverseBatchError,
  createMultiple,
  type BulkTable,
} from "../src/index.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
const CREATE = "/accounts/Microsoft.Dynamics.CRM.CreateMultiple";
const GUID = "00000000-0000-0000-0000-000000000001";

/** A client that retries, waiting out any `Retry-After` unless the deadline stops it. */
function setup() {
  const { client, fake } = createTestClient({
    retry: { maxRetries: 3, maxRetryAfterMs: Number.POSITIVE_INFINITY, jitter: false },
    concurrency: { adaptiveFromDopHint: false },
  });
  return { client, fake };
}

const ok = () => batchResponse([{ status: 200, body: { value: [] } }]);

/** Settle `p` while letting at most `ms` of fake time pass. */
async function within(p: Promise<unknown>, ms: number) {
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

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe("execute({ timeoutMs }) gives the retry middleware its deadline (#487)", () => {
  it("timeoutMs: 10_000 and a 429 with Retry-After: 60 rejects at once with the throttle error", async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", ok);
    fake.on("POST", "/$batch", () => throttled(60), 1);
    const builder = new BatchRequestBuilder(client).addRequest("a", "GET", "accounts");

    const { settled, value } = await within(builder.execute({ timeoutMs: 10_000 }), 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseThrottleError);
    expect((value as DataverseThrottleError).retryAfterMs).toBe(60_000);
    expect(fake.requests).toHaveLength(1);
  });

  it("a Retry-After: 2 within the deadline is still waited out and retried", async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", ok);
    fake.on("POST", "/$batch", () => throttled(2), 1);
    const builder = new BatchRequestBuilder(client).addRequest("a", "GET", "accounts");

    const pending = builder.execute({ timeoutMs: 10_000 });
    expect((await within(pending, 1_999)).settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    const result = await pending;
    expect(result.success).toBe(true);
    expect(fake.requests).toHaveLength(2);
  });

  it("the deadline is the whole execution's: a later batch gets only the time left", async () => {
    const { client, fake } = setup();
    // The first $batch takes 8 s; the second is throttled for 5 s, which fits a 10 s timeout on
    // its own but not the 2 s left of the execution's.
    fake.on("POST", "/$batch", () => throttled(5));
    fake.on(
      "POST",
      "/$batch",
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 8_000));
        return ok();
      },
      1
    );
    const builder = new BatchRequestBuilder(client)
      .addRequest("a", "GET", "accounts")
      .addRequest("b", "GET", "contacts");

    const pending = builder.execute({ timeoutMs: 10_000, batchSize: 1 });
    const { settled, value } = await within(pending, 8_050);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseBatchError);
    const err = value as DataverseBatchError;
    expect(err.cause).toBeInstanceOf(DataverseThrottleError);
    expect(err.result?.results.map((r) => [r.id, r.status])).toEqual([["a", 200]]);
    expect(fake.requests).toHaveLength(2);
  });

  it("without timeoutMs the Retry-After is waited out as before", async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", ok);
    fake.on("POST", "/$batch", () => throttled(60), 1);
    const builder = new BatchRequestBuilder(client).addRequest("a", "GET", "accounts");

    const pending = builder.execute();
    expect((await within(pending, 59_000)).settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1_000);
    expect((await pending).success).toBe(true);
    expect(fake.requests).toHaveLength(2);
  });
});

describe("createMultiple({ timeoutMs }) gives the retry middleware its deadline (#487)", () => {
  it('strategy: "bulk": a 429 with Retry-After: 60 fails the chunk at once', async () => {
    const { client, fake } = setup();
    fake.on("POST", CREATE, () => jsonResponse({ Ids: [GUID] }));
    fake.on("POST", CREATE, () => throttled(60), 1);

    const op = createMultiple(client, ACCOUNT, [{ name: "a" }], {
      strategy: "bulk",
      timeoutMs: 10_000,
    });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    const result = value as Awaited<typeof op>;
    expect(result.results[0]?.status).toBe("failed");
    expect(result.results[0]?.error).toBeInstanceOf(DataverseThrottleError);
    expect(fake.requests).toHaveLength(1);
  });

  it('strategy: "batch": the $batch it sends gets the operation\'s deadline', async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", () => throttled(60), 1);

    const op = createMultiple(client, ACCOUNT, [{ name: "a" }], {
      strategy: "batch",
      timeoutMs: 10_000,
    });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    const result = value as Awaited<typeof op>;
    expect(result.results[0]?.error).toBeInstanceOf(DataverseThrottleError);
    expect(fake.requests).toHaveLength(1);
  });

  it('strategy: "auto": the support lookup gets the deadline too', async () => {
    const { client, fake } = setup();
    fake.on("GET", /^\/(EntityDefinitions|sdkmessagefilters)/, () => throttled(60));

    const op = createMultiple(client, ACCOUNT, [{ name: "a" }], {
      strategy: "auto",
      timeoutMs: 10_000,
    });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseThrottleError);
  });
});
