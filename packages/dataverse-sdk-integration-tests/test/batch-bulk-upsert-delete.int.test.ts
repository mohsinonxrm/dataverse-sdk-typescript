/**
 * #434 live: upsertMultiple() and deleteMultiple() on account, a standard table. account has no
 * alternate key, so the records are named by primary keys generated here (`accounts(<id>)`):
 * the first upsert creates them, the second updates them. deleteMultiple() with "auto" falls
 * back to `$batch` DELETEs (DeleteMultiple is for elastic tables only). Every id is tracked and
 * deleted in afterAll, whatever the test got to.
 */
import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { deleteMultiple, upsertMultiple, type BulkTable } from "@mohsinonxrm/dataverse-sdk-batch";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
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

async function read(id: string): Promise<{ name: string; description: string | null } | null> {
  const { client } = liveClient();
  try {
    return await client
      .api(`accounts(${id})`)
      .select("name", "description")
      .get<{ name: string; description: string | null }>();
  } catch (err) {
    if (err instanceof DataverseODataError && err.status === 404) return null;
    throw err;
  }
}

describe.skipIf(!live)("live: upsertMultiple() / deleteMultiple() (#434)", () => {
  it("upsert creates, upsert again updates, deleteMultiple (auto: $batch) deletes", async () => {
    const { client } = liveClient();
    const ids = [randomUUID(), randomUUID()];
    accounts.push(...ids);
    const names = ids.map((_, i) => `${runId} upsert ${String(i + 1)}`);

    // 1. Neither row exists: UpsertMultiple ("auto" picks it for account) creates them.
    const created = await upsertMultiple(
      client,
      ACCOUNT,
      ids.map((accountid, i) => ({ "@odata.id": `accounts(${accountid})`, name: names[i] })),
      { strategy: "auto" }
    );
    expect(created).toMatchObject({ strategy: "bulk", success: true, succeeded: 2, requests: 1 });
    expect(created.results.map((r) => r.id)).toEqual(ids);
    expect((await Promise.all(ids.map(read))).map((r) => r?.name)).toEqual(names);

    // 2. Both exist now: the same rows are updated, by primary key column this time.
    const updated = await upsertMultiple(
      client,
      ACCOUNT,
      ids.map((accountid) => ({ accountid, description: `${runId} upserted again` })),
      { strategy: "auto" }
    );
    expect(updated).toMatchObject({ strategy: "bulk", success: true, succeeded: 2 });
    const rows = await Promise.all(ids.map(read));
    expect(rows.map((r) => r?.name)).toEqual(names);
    expect(rows.map((r) => r?.description)).toEqual(ids.map(() => `${runId} upserted again`));

    // 3. account isn't elastic: "auto" deletes with $batch, one DELETE per record.
    const deleted = await deleteMultiple(client, ACCOUNT, ids);
    expect(deleted).toMatchObject({ strategy: "batch", success: true, succeeded: 2, requests: 1 });
    expect(deleted.results.map((r) => r.id)).toEqual(ids);
    expect(await Promise.all(ids.map(read))).toEqual([null, null]);

    // 4. Deleting them again: each row fails on its own with 404; nothing is thrown.
    const again = await deleteMultiple(client, ACCOUNT, ids);
    expect(again.results.map((r) => r.status)).toEqual(["failed", "failed"]);
    expect(again.results[0].error).toMatchObject({ status: 404 });
  });
});
