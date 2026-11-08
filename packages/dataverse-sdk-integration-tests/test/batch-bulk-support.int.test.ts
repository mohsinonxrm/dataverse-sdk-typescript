/**
 * #346 live: getBulkOperationSupport() on account (a standard table with CreateMultiple and
 * UpdateMultiple) and on an elastic table when the org has one, its cache, and createMultiple()
 * with strategy "auto". Read-only, except one account it creates and deletes.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseClient, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { createMultiple, getBulkOperationSupport } from "@mohsinonxrm/dataverse-sdk-batch";
import { live, liveClient, orgUrl, runId } from "./env.js";

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

/** A new live client (so its cache is empty) that counts the requests it sends. */
function countingClient(): { client: DataverseClient; requests: () => number } {
  const { tokenProvider } = liveClient();
  let requests = 0;
  const noop = (): void => undefined;
  const client = new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider,
    logger: { debug: noop, info: noop, warn: noop, error: noop },
    fetchProvider: {
      fetch: (input, init) => {
        requests++;
        return fetch(input, init);
      },
    },
  });
  return { client, requests: () => requests };
}

describe.skipIf(!live)("live: getBulkOperationSupport() (#346)", () => {
  it("account supports CreateMultiple, UpdateMultiple and UpsertMultiple, not DeleteMultiple", async () => {
    const { client } = countingClient();
    expect(await getBulkOperationSupport(client, "account")).toEqual({
      logicalName: "account",
      elastic: false,
      createMultiple: true,
      updateMultiple: true,
      upsertMultiple: true,
      deleteMultiple: false,
    });
  });

  it("caches the answer per client; refresh reads it again", async () => {
    const { client, requests } = countingClient();
    await getBulkOperationSupport(client, "account");
    expect(requests()).toBe(2);
    await getBulkOperationSupport(client, "account");
    expect(requests()).toBe(2);
    await getBulkOperationSupport(client, "account", { refresh: true });
    expect(requests()).toBe(4);
  });

  it("an elastic table supports all four messages", async (ctx) => {
    const { client } = liveClient();
    const { value } = await client
      .api("EntityDefinitions")
      .select("LogicalName", "TableType")
      .get<{ value: Array<{ LogicalName: string; TableType?: string }> }>();
    const elastic = value.find((t) => t.TableType === "Elastic");
    if (!elastic) {
      ctx.skip(); // the org has no elastic table
      return;
    }
    expect(await getBulkOperationSupport(client, elastic.LogicalName)).toEqual({
      logicalName: elastic.LogicalName,
      elastic: true,
      createMultiple: true,
      updateMultiple: true,
      upsertMultiple: true,
      deleteMultiple: true,
    });
  });

  it("a table that doesn't exist rejects with the lookup's error", async () => {
    const { client } = liveClient();
    const err = await getBulkOperationSupport(client, "sdk_it_no_such_table").catch(
      (e: unknown) => e
    );
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBeGreaterThanOrEqual(400);
  });

  it('createMultiple() with strategy "auto" picks CreateMultiple for account', async () => {
    const { client } = liveClient();
    const result = await createMultiple(
      client,
      { logicalName: "account", entitySetName: "accounts" },
      [{ name: `${runId} bulk auto` }],
      { strategy: "auto" }
    );
    for (const r of result.results) if (r.id) accounts.push(r.id);
    expect(result).toMatchObject({ strategy: "bulk", success: true, succeeded: 1 });
  });
});
