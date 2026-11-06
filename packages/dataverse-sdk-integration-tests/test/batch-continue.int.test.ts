/**
 * #57 live: continueOnError returns the result, a failure without it throws with the whole
 * result, and batches over `batchSize` are split into several `$batch` requests.
 * Creates accounts, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseClient, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, DataverseBatchError } from "@mohsinonxrm/dataverse-sdk-batch";
import { idFromEntityId, live, liveClient, orgUrl, runId } from "./env.js";

const MISSING = "00000000-0000-0000-0000-000000000001";
const accounts: string[] = [];

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of accounts) {
    await client
      .api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

/** A live client that counts the `$batch` requests it sends. */
function countingClient(): { client: DataverseClient; batches: () => number } {
  const { tokenProvider } = liveClient();
  let batches = 0;
  const noop = (): void => undefined;
  const client = new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider,
    logger: { debug: noop, info: noop, warn: noop, error: noop },
    fetchProvider: {
      fetch: (input, init) => {
        if (String(input instanceof Request ? input.url : input).endsWith("/$batch")) batches++;
        return fetch(input, init);
      },
    },
  });
  return { client, batches: () => batches };
}

describe.skipIf(!live)("live: batch continueOnError and auto-split (#57)", () => {
  it("continueOnError: a failed request doesn't stop the batch, and execute() returns", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("missing", "DELETE", `accounts(${MISSING})`);
    batch.addRequest("who", "GET", "WhoAmI");
    batch.beginChangeset();
    batch.addRequest("acct", "POST", "accounts", undefined, { name: `${runId} batch-int coe` });
    batch.endChangeset();

    const result = await batch.execute({ continueOnError: true });
    const acct = result.responses.get("acct");
    if (acct?.status === 204) accounts.push(idFromEntityId(acct.headers["odata-entityid"] ?? null));

    expect(result.success).toBe(false);
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["missing", 404],
      ["who", 200],
      ["acct", 204],
    ]);
    expect(result.stoppedEarly).toBe(false);
    const err = result.errors.get("missing");
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 404, code: "0x80040217" });
  });

  it("without continueOnError: throws DataverseBatchError with the whole result", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("who", "GET", "WhoAmI");
    batch.addRequest("missing", "DELETE", `accounts(${MISSING})`);
    batch.addRequest("never", "GET", "WhoAmI");
    const err = (await batch.execute().catch((e: unknown) => e)) as DataverseBatchError;
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect(err.result?.results.map((r) => [r.id, r.status])).toEqual([
      ["who", 200],
      ["missing", 404],
    ]);
    expect(err.result?.skippedRequestIds).toEqual(["never"]);
    expect(err.result?.stoppedEarly).toBe(true);
  });

  it("auto-split: 5 requests with batchSize 2 go as 3 $batch requests, results in order", async () => {
    const { client, batches } = countingClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("w1", "GET", "WhoAmI");
    batch.beginChangeset();
    batch.addRequest("c1", "POST", "accounts", undefined, { name: `${runId} batch-int split 1` });
    batch.addRequest("c2", "POST", "accounts", undefined, { name: `${runId} batch-int split 2` });
    batch.endChangeset();
    batch.addRequest("w2", "GET", "WhoAmI");
    batch.addRequest("w3", "GET", "WhoAmI");

    const result = await batch.execute({ batchSize: 2 });
    for (const id of ["c1", "c2"]) {
      const r = result.responses.get(id);
      if (r?.status === 204) accounts.push(idFromEntityId(r.headers["odata-entityid"] ?? null));
    }

    // [w1] then the changeset [c1, c2] (kept whole) then [w2, w3].
    expect(batches()).toBe(3);
    expect(result.success).toBe(true);
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["w1", 200],
      ["c1", 204],
      ["c2", 204],
      ["w2", 200],
      ["w3", 200],
    ]);
  });

  it("auto-split without continueOnError: the batches after a failure are not sent", async () => {
    const { client, batches } = countingClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("w1", "GET", "WhoAmI");
    batch.addRequest("missing", "DELETE", `accounts(${MISSING})`);
    batch.addRequest("w2", "GET", "WhoAmI");
    const err = (await batch
      .execute({ batchSize: 1 })
      .catch((e: unknown) => e)) as DataverseBatchError;
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect(batches()).toBe(2);
    expect(err.result?.skippedRequestIds).toEqual(["w2"]);
    expect(err.result?.results.map((r) => r.id)).toEqual(["w1", "missing"]);
  });
});
