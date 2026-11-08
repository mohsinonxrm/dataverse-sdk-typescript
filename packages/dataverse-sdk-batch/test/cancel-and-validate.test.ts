/**
 * #379: `execute()` can be cancelled and timed out (`signal`, `timeoutMs`, `attemptTimeoutMs`,
 * `correlationId`), and `addRequest()` rejects parts Dataverse can't run or that would corrupt the
 * multipart body.
 */
import { describe, it, expect } from "vitest";
import {
  batchResponse,
  createFakeFetch,
  createTestClient,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseAbortError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  type FetchProvider,
} from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, DataverseBatchError } from "../src/index.js";

/** A fetch that never answers, but rejects like fetch when its signal aborts. */
function hangingFetch(): FetchProvider & { calls: number } {
  const provider = {
    calls: 0,
    fetch(_input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      provider.calls++;
      return new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;
        const abort = (): void => {
          reject(
            signal?.reason instanceof Error
              ? signal.reason
              : new DOMException("The operation was aborted.", "AbortError")
          );
        };
        if (signal?.aborted) abort();
        else signal?.addEventListener("abort", abort, { once: true });
      });
    },
  };
  return provider;
}

/**
 * A client whose fetch is `fake` (answering every `$batch` with one 200 part), wrapped by `wrap`.
 */
function setup(wrap: (fake: FakeFetch) => FetchProvider = (fake) => fake.fetchProvider) {
  const fake = createFakeFetch();
  fake.on("POST", "/$batch", () => batchResponse([{ status: 200, body: { value: [] } }]));
  const { client } = createTestClient({ fetchProvider: wrap(fake) });
  return { fake, builder: new BatchRequestBuilder(client) };
}

/** Three GETs, sent as three `$batch` requests with `batchSize: 1`. */
function threeGets(builder: BatchRequestBuilder): BatchRequestBuilder {
  return builder
    .addRequest("a", "GET", "accounts")
    .addRequest("b", "GET", "contacts")
    .addRequest("c", "GET", "leads");
}

async function rejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  throw new Error("expected a rejection");
}

describe("execute(): cancellation and timeouts (#379)", () => {
  it("rejects with DataverseAbortError and sends nothing when the signal is already aborted", async () => {
    const { fake, builder } = setup();
    threeGets(builder);
    const controller = new AbortController();
    controller.abort();
    const err = await rejection(builder.execute({ signal: controller.signal, batchSize: 1 }));
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(0);
  });

  it("stops before the next $batch when the signal aborts mid-split", async () => {
    const controller = new AbortController();
    const { fake, builder } = setup((f) => ({
      async fetch(input, init) {
        const res = await f.fetchProvider.fetch(input, init);
        // The first $batch has been answered; abort before the second is sent.
        controller.abort();
        return res;
      },
    }));
    threeGets(builder);
    const err = await rejection(builder.execute({ signal: controller.signal, batchSize: 1 }));
    expect(fake.requests).toHaveLength(1);
    expect(err).toBeInstanceOf(DataverseBatchError);
    const batchErr = err as DataverseBatchError;
    expect(batchErr.message).toMatch(/^Stopped before batch 2 of 3 after 1 ran/);
    expect(batchErr.cause).toBeInstanceOf(DataverseAbortError);
    expect(batchErr.result?.results.map((r) => [r.id, r.status])).toEqual([["a", 200]]);
    expect(batchErr.result?.skippedRequestIds).toEqual(["b", "c"]);
  });

  it("aborts the $batch in flight", async () => {
    const hanging = hangingFetch();
    const { builder } = setup(() => hanging);
    builder.addRequest("a", "GET", "accounts");
    const controller = new AbortController();
    const pending = rejection(builder.execute({ signal: controller.signal }));
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(hanging.calls).toBe(1);
    controller.abort();
    expect(await pending).toBeInstanceOf(DataverseAbortError);
  });

  it("times out with timeoutMs", async () => {
    const hanging = hangingFetch();
    const { builder } = setup(() => hanging);
    builder.addRequest("a", "GET", "accounts");
    const err = await rejection(builder.execute({ timeoutMs: 30 }));
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout" });
  });

  it("applies timeoutMs to the whole execution, not to each $batch", async () => {
    // Each $batch takes 80ms, well within timeoutMs; all five together don't.
    const { fake, builder } = setup((f) => ({
      async fetch(input, init) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return f.fetchProvider.fetch(input, init);
      },
    }));
    for (const id of ["a", "b", "c", "d", "e"]) builder.addRequest(id, "GET", "accounts");
    const err = await rejection(builder.execute({ timeoutMs: 250, batchSize: 1 }));
    const timeout = err instanceof DataverseBatchError ? err.cause : err;
    expect(timeout).toBeInstanceOf(DataverseNetworkError);
    expect(timeout).toMatchObject({ name: "RequestTimeout" });
    expect(fake.requests.length).toBeLessThan(5);
  });

  it("limits each attempt with attemptTimeoutMs", async () => {
    const hanging = hangingFetch();
    const { builder } = setup(() => hanging);
    builder.addRequest("a", "GET", "accounts");
    const err = await rejection(builder.execute({ attemptTimeoutMs: 30 }));
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout" });
  });

  it("sends correlationId with every $batch of a split batch", async () => {
    const { fake, builder } = setup();
    threeGets(builder);
    await builder.execute({ batchSize: 1, correlationId: "corr-379" });
    expect(fake.requests).toHaveLength(3);
    for (const r of fake.requests) expect(r.headers["x-ms-correlation-id"]).toBe("corr-379");
  });

  it("runs normally with a signal that never aborts", async () => {
    const { fake, builder } = setup();
    threeGets(builder);
    const result = await builder.execute({
      signal: new AbortController().signal,
      timeoutMs: 10_000,
      batchSize: 1,
    });
    expect(result.success).toBe(true);
    expect(fake.requests).toHaveLength(3);
  });
});

describe("addRequest(): validation (#379)", () => {
  const builder = (): BatchRequestBuilder => setup().builder;

  it("rejects a GET inside a changeset, whatever its case", () => {
    const b = builder().beginChangeset();
    expect(() => b.addRequest("g", "GET", "accounts")).toThrow(DataverseInvalidRequestError);
    expect(() => b.addRequest("g", "get", "accounts")).toThrow(/GET inside a changeset/);
    expect(b.getTotalRequestCount()).toBe(0);
    // The id wasn't taken by the rejected request.
    b.addRequest("g", "POST", "accounts", undefined, { name: "A" });
    expect(b.getTotalRequestCount()).toBe(1);
  });

  it("still accepts a GET outside a changeset", () => {
    expect(() => builder().addRequest("g", "GET", "accounts")).not.toThrow();
  });

  it("rejects CR or LF in a header value", () => {
    const b = builder();
    for (const value of ["a\r\nX-Injected: 1", "a\nb", "a\rb"]) {
      expect(() => b.addRequest("h", "GET", "accounts", { Prefer: value })).toThrow(
        DataverseInvalidRequestError
      );
    }
    expect(() => b.addRequest("h", "GET", "accounts", { Prefer: "a\r\nX-Injected: 1" })).toThrow(
      /line break .* "Prefer" header/
    );
    expect(b.getTotalRequestCount()).toBe(0);
  });

  it("rejects an invalid header name", () => {
    const b = builder();
    expect(() => b.addRequest("h", "GET", "accounts", { "X-A\r\nX-B": "1" })).toThrow(
      DataverseInvalidRequestError
    );
    expect(() => b.addRequest("h", "GET", "accounts", { "X-A: b": "1" })).toThrow(
      /invalid header name/
    );
  });

  it("rejects line breaks in the URL and an invalid method", () => {
    const b = builder();
    expect(() => b.addRequest("u", "GET", "accounts HTTP/1.1\r\n\r\nDELETE accounts(1)")).toThrow(
      DataverseInvalidRequestError
    );
    expect(() => b.addRequest("m", "GET accounts", "accounts")).toThrow(/invalid method/);
    expect(() => b.addRequest("m", "", "accounts")).toThrow(/invalid method/);
  });

  it("accepts ordinary headers", () => {
    const b = builder();
    b.addRequest(
      "ok",
      "PATCH",
      "accounts(1)",
      { "If-Match": 'W/"123"', Prefer: "return=representation" },
      {}
    );
    expect(b.getTotalRequestCount()).toBe(1);
  });

  it("rejects a $<id> URL outside a changeset", () => {
    const b = builder();
    b.beginChangeset().addRequest("acct", "POST", "accounts", undefined, { name: "A" });
    b.endChangeset();
    expect(() => b.addRequest("x", "PATCH", "$acct", undefined, { name: "B" })).toThrow(
      DataverseInvalidRequestError
    );
    expect(() => b.addRequest("m", "GET", "$metadata")).toThrow(/isn't in a changeset/);
    // The same path written with a leading "/" is an ordinary URL.
    expect(() => b.addRequest("m", "GET", "/$metadata")).not.toThrow();
  });

  it("rejects a $<id> URL that isn't an earlier request of the changeset", () => {
    const b = builder();
    b.beginChangeset().addRequest("acct", "POST", "accounts", undefined, { name: "A" });
    expect(() => b.addRequest("x", "PATCH", "$other", undefined, {})).toThrow(
      /doesn't refer to an earlier request/
    );
    expect(() => b.addRequest("y", "PATCH", "$acct", undefined, {})).not.toThrow();
    expect(() =>
      b.addRequest("z", "POST", "$acct/contact_customer_accounts", undefined, { lastname: "D" })
    ).not.toThrow();
  });
});
