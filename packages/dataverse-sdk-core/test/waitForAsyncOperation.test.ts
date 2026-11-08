/**
 * #318: waitForAsyncOperation() polls asyncoperations(<id>) until the system job completes.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

// Record each wait between reads, and wait only 1 ms so the tests are fast.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", async (importOriginal) => {
  const real = await importOriginal<typeof import("../src/utils/sleep.js")>();
  return {
    sleep: (ms: number, signal?: AbortSignal) => {
      waits.push(ms);
      return real.sleep(1, signal);
    },
  };
});

import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  AsyncOperationStatusCode,
  DataverseAbortError,
  DataverseAsyncOperationError,
  DataverseInvalidRequestError,
  DataverseODataError,
  waitForAsyncOperation,
  type AsyncOperation,
} from "../src/index.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const JOB = "4c1a7c3e-1f2b-4d5e-8a9b-0c1d2e3f4a5b";

const inProgress = { statecode: 2, statuscode: 20 };
const succeeded = { statecode: 3, statuscode: 30, completedon: "2026-11-07T10:00:00Z" };

/** A client whose fetch answers each read of the job with the next state (the last repeats). */
function setup(states: Array<Partial<AsyncOperation> | Response>) {
  const urls: string[] = [];
  const headers: Array<Record<string, string>> = [];
  const fetchProvider: FetchProvider = {
    fetch: (input, init) => {
      urls.push(input instanceof Request ? input.url : input.toString());
      headers.push(init?.headers as Record<string, string>);
      const state = states[Math.min(urls.length - 1, states.length - 1)];
      if (state instanceof Response) return Promise.resolve(state.clone());
      return Promise.resolve(
        new Response(JSON.stringify({ asyncoperationid: JOB, ...state }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 0 },
  });
  return { client, urls, headers };
}

afterEach(() => {
  waits.length = 0;
});

describe("#318: waitForAsyncOperation", () => {
  it("reads the job until it succeeds, and resolves with it", async () => {
    const { client, urls } = setup([inProgress, inProgress, succeeded]);
    const seen: number[] = [];
    const job = await waitForAsyncOperation(client, JOB, {
      onProgress: (op) => seen.push(op.statuscode),
    });
    expect(job).toMatchObject({ asyncoperationid: JOB, statuscode: 30 });
    expect(job.completedon).toBe("2026-11-07T10:00:00Z");
    expect(seen).toEqual([20, 20, 30]);
    expect(urls).toHaveLength(3);
    const url = new URL(urls[0] ?? "");
    expect(url.pathname).toBe(`/api/data/v9.2/asyncoperations(${JOB})`);
    expect(url.searchParams.get("$select")?.split(",")).toEqual(
      expect.arrayContaining([
        "statecode",
        "statuscode",
        "message",
        "friendlymessage",
        "completedon",
      ])
    );
  });

  it("waits intervalMs, then backoff times longer each time, up to maxIntervalMs", async () => {
    const { client } = setup([
      inProgress,
      inProgress,
      inProgress,
      inProgress,
      inProgress,
      succeeded,
    ]);
    await waitForAsyncOperation(client, JOB, { intervalMs: 100, backoff: 2, maxIntervalMs: 500 });
    expect(waits).toEqual([100, 200, 400, 500, 500]);
  });

  it("uses 2 s, x1.5, up to 30 s by default; the first read is immediate", async () => {
    const { client } = setup([...Array<typeof inProgress>(10).fill(inProgress), succeeded]);
    await waitForAsyncOperation(client, JOB);
    expect(waits).toEqual([2000, 3000, 4500, 6750, 10125, 15187.5, 22781.25, 30000, 30000, 30000]);
  });

  it("returns at once for a job that already succeeded", async () => {
    const { client, urls } = setup([succeeded]);
    await waitForAsyncOperation(client, JOB);
    expect(urls).toHaveLength(1);
    expect(waits).toEqual([]);
  });

  it("rejects with reason 'failed', the friendly message and the hex error code", async () => {
    const { client } = setup([
      inProgress,
      {
        statecode: 3,
        statuscode: 31,
        message: "System.Exception: details",
        friendlymessage: "The job failed.",
        errorcode: -2147220891,
      },
    ]);
    const err = await waitForAsyncOperation(client, JOB).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseAsyncOperationError);
    expect(err).toMatchObject({
      name: "AsyncOperationFailed",
      reason: "failed",
      asyncOperationId: JOB,
      message: "The job failed.",
      code: "0x80040265",
      operation: { statuscode: 31, message: "System.Exception: details" },
    });
  });

  it("falls back to message, then a generic text, when there is no friendly message", async () => {
    const a = setup([{ statecode: 3, statuscode: 31, message: "Raw message" }]);
    await expect(waitForAsyncOperation(a.client, JOB)).rejects.toThrow("Raw message");
    const b = setup([{ statecode: 3, statuscode: 31 }]);
    await expect(waitForAsyncOperation(b.client, JOB)).rejects.toThrow(`System job ${JOB} failed`);
  });

  it("rejects with reason 'canceled' for a canceled job", async () => {
    const { client } = setup([{ statecode: 3, statuscode: 32 }]);
    const err = await waitForAsyncOperation(client, JOB).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseAsyncOperationError);
    expect(err).toMatchObject({ name: "AsyncOperationCanceled", reason: "canceled" });
    expect((err as DataverseAsyncOperationError).code).toBeUndefined();
  });

  it("treats a completed job with an unknown status as failed", async () => {
    const { client } = setup([{ statecode: 3, statuscode: 99 }]);
    await expect(waitForAsyncOperation(client, JOB)).rejects.toMatchObject({ reason: "failed" });
  });

  it("keeps waiting while the job is suspended", async () => {
    const { client, urls } = setup([{ statecode: 1, statuscode: 10 }, succeeded]);
    await waitForAsyncOperation(client, JOB);
    expect(urls).toHaveLength(2);
  });

  it("rejects with reason 'timeout' and the last state when timeoutMs passes", async () => {
    const { client } = setup([inProgress]);
    const err = await waitForAsyncOperation(client, JOB, { timeoutMs: 30 }).catch(
      (e: unknown) => e
    );
    expect(err).toBeInstanceOf(DataverseAsyncOperationError);
    expect(err).toMatchObject({
      name: "AsyncOperationTimeout",
      reason: "timeout",
      operation: { statuscode: 20 },
    });
  });

  it("rejects with DataverseAbortError when the signal aborts", async () => {
    const { client, urls } = setup([inProgress]);
    const controller = new AbortController();
    const err = await waitForAsyncOperation(client, JOB, {
      signal: controller.signal,
      onProgress: () => {
        if (urls.length === 2) controller.abort();
      },
    }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(urls).toHaveLength(2);
  });

  it("rejects at once for a signal that is already aborted, and reads nothing", async () => {
    const { client, urls } = setup([succeeded]);
    const err = await waitForAsyncOperation(client, JOB, { signal: AbortSignal.abort() }).catch(
      (e: unknown) => e
    );
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(urls).toHaveLength(0);
  });

  it("passes on the error of a read, e.g. 404 for a job that doesn't exist", async () => {
    const { client } = setup([
      new Response(JSON.stringify({ error: { code: "0x80040217", message: "Not found" } }), {
        status: 404,
        headers: { "content-type": "application/json" },
      }),
    ]);
    const err = await waitForAsyncOperation(client, JOB).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 404 });
  });

  it("ignores an error thrown by onProgress", async () => {
    const { client } = setup([inProgress, succeeded]);
    const job = await waitForAsyncOperation(client, JOB, {
      onProgress: () => {
        throw new Error("boom");
      },
    });
    expect(job.statuscode).toBe(AsyncOperationStatusCode.Succeeded);
  });

  it.each([
    ["an asyncoperation record", { asyncoperationid: JOB }],
    ["an …Async action response", { AsyncOperationId: JOB }],
    ["a BulkDelete response", { JobId: JOB }],
    ["a braced, upper-case GUID", `{${JOB.toUpperCase()}}`],
  ])("takes %s", async (_label, ref) => {
    const { client, urls } = setup([succeeded]);
    await waitForAsyncOperation(client, ref);
    expect(urls[0]).toContain(`asyncoperations(${JOB})`);
  });

  it.each([
    ["null (an action that answered 204)", null],
    ["a response without an id", {}],
    ["an empty string", ""],
    ["something that isn't a GUID", "accounts(1)"],
  ])("refuses %s before sending anything", async (_label, ref) => {
    const { client, urls } = setup([succeeded]);
    await expect(waitForAsyncOperation(client, ref)).rejects.toBeInstanceOf(
      DataverseInvalidRequestError
    );
    expect(urls).toHaveLength(0);
  });

  it.each([
    [{ intervalMs: 0 }],
    [{ maxIntervalMs: -1 }],
    [{ backoff: 0.5 }],
    [{ timeoutMs: Number.NaN }],
  ])("refuses the options %j", async (options) => {
    const { client } = setup([succeeded]);
    await expect(waitForAsyncOperation(client, JOB, options)).rejects.toMatchObject({
      name: "InvalidParameter",
    });
  });

  it("adds extra columns and request options to every read", async () => {
    const { client, urls, headers } = setup([inProgress, succeeded]);
    const job = await waitForAsyncOperation(client, JOB, {
      select: ["data", "statecode"],
      requestOptions: { headers: { "x-custom": "1" } },
    });
    expect(job.asyncoperationid).toBe(JOB);
    for (const url of urls) {
      const columns = new URL(url).searchParams.get("$select")?.split(",") ?? [];
      expect(columns).toContain("data");
      expect(columns.filter((c) => c === "statecode")).toHaveLength(1);
    }
    expect(headers.every((h) => h["x-custom"] === "1")).toBe(true);
  });
});
