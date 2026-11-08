/**
 * #310 live: createMultiple() and updateMultiple() on account (a standard table that supports
 * CreateMultiple and UpdateMultiple), with CreateMultiple / UpdateMultiple and with `$batch`, and
 * per-record results. Creates accounts, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { createMultiple, updateMultiple, type BulkTable } from "@mohsinonxrm/dataverse-sdk-batch";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
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

/** Remembers the ids of the records a result created, for cleanup. */
function track(results: Array<{ status: string; id?: string }>): void {
  for (const r of results) if (r.status === "succeeded" && r.id) accounts.push(r.id);
}

async function readNames(
  ids: string[]
): Promise<Array<{ name: string; description: string | null }>> {
  const { client } = liveClient();
  return Promise.all(
    ids.map((id) =>
      client
        .api(`accounts(${id})`)
        .select("name", "description")
        .get<{ name: string; description: string | null }>()
    )
  );
}

describe.skipIf(!live)("live: createMultiple() / updateMultiple() (#310)", () => {
  it("CreateMultiple in chunks returns every id in input order; UpdateMultiple updates them", async () => {
    const { client } = liveClient();
    const names = [1, 2, 3, 4, 5].map((n) => `${runId} bulk ${String(n)}`);

    const created = await createMultiple(
      client,
      ACCOUNT,
      names.map((name) => ({ name })),
      { batchSize: 2 }
    );
    track(created.results);

    expect(created).toMatchObject({
      strategy: "bulk",
      success: true,
      succeeded: 5,
      requests: 3,
    });
    const ids = created.results.map((r) => r.id ?? "");
    expect(ids.every((id) => /^[0-9a-f-]{36}$/i.test(id))).toBe(true);
    expect((await readNames(ids)).map((r) => r.name)).toEqual(names);

    const updated = await updateMultiple(
      client,
      ACCOUNT,
      ids.map((accountid, i) => ({ accountid, description: `bulk update ${String(i)}` })),
      { batchSize: 3 }
    );
    expect(updated).toMatchObject({ success: true, succeeded: 5, requests: 2 });
    expect(updated.results.map((r) => r.id)).toEqual(ids);
    expect((await readNames(ids)).map((r) => r.description)).toEqual(
      ids.map((_, i) => `bulk update ${String(i)}`)
    );
  });

  it("a failed UpdateMultiple chunk fails all its records (standard table: rolled back); the next is skipped", async () => {
    const { client } = liveClient();
    const created = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3].map((n) => ({ name: `${runId} bulk rollback ${String(n)}` }))
    );
    track(created.results);
    const [a, b, c] = created.results.map((r) => r.id ?? "");

    const result = await updateMultiple(
      client,
      ACCOUNT,
      [
        { accountid: a, description: "rolled back" },
        { accountid: MISSING, description: "no such row" },
        { accountid: b, description: "never sent" },
        { accountid: c, description: "never sent" },
      ],
      { batchSize: 2 }
    );

    expect(result.results.map((r) => r.status)).toEqual(["failed", "failed", "skipped", "skipped"]);
    expect(result).toMatchObject({ success: false, failed: 2, skipped: 2, stoppedEarly: true });
    expect(result.results[0].error).toBe(result.results[1].error);
    expect(result.results[0].error).toBeInstanceOf(DataverseODataError);
    expect((result.results[0].error as DataverseODataError).status).toBeGreaterThanOrEqual(400);
    // Rolled back: a wasn't updated either.
    expect((await readNames([a])).map((r) => r.description)).toEqual([null]);
  });

  it('strategy "batch": one $batch per chunk, and records succeed or fail one by one', async () => {
    const { client } = liveClient();
    const created = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3].map((n) => ({ name: `${runId} bulk batch ${String(n)}` })),
      { strategy: "batch", batchSize: 2 }
    );
    track(created.results);
    expect(created).toMatchObject({ strategy: "batch", success: true, succeeded: 3, requests: 2 });
    const ids = created.results.map((r) => r.id ?? "");
    expect(ids.every((id) => /^[0-9a-f-]{36}$/i.test(id))).toBe(true);

    const updated = await updateMultiple(
      client,
      ACCOUNT,
      [
        { accountid: ids[0], description: "batch update" },
        { accountid: MISSING, description: "no such row" },
        { accountid: ids[2], description: "batch update" },
      ],
      { strategy: "batch" }
    );
    expect(updated.results.map((r) => r.status)).toEqual(["succeeded", "failed", "succeeded"]);
    expect(updated.results[1].error).toMatchObject({ status: 404 });
    // If-Match: * kept the PATCH from creating the missing row.
    expect(accounts).not.toContain(MISSING);
    expect((await readNames([ids[0], ids[2]])).map((r) => r.description)).toEqual([
      "batch update",
      "batch update",
    ]);
  });
});
