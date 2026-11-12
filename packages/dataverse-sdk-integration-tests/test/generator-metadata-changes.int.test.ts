/**
 * Live test for incremental generation that reads only the tables whose metadata changed (#429):
 * the stamp file keeps each table's metadata and the run's `ServerVersionStamp`, and the next run
 * asks RetrieveMetadataChanges for the changes since then (`ClientVersionStamp`,
 * `DeletedMetadataFilters`) instead of reading every table.
 *
 * A temporary table (`new_sdkitmc<run>`, which the sweeper lists) is generated with task, which no
 * other live test changes. Then: a run over unchanged metadata makes no per-table request; a new
 * column on the table reads that table again, never task; a deleted column and then the deleted
 * table are handled. Every request is counted by wrapping `fetch` while the generator runs.
 *
 * New metadata reaches `$metadata` and the org's servers' metadata caches over several seconds to
 * minutes, so each step retries its run until the change shows (`eventually()`). The table is
 * deleted in `afterAll` if the last test didn't delete it.
 */
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { Metadata, MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient, runId } from "./env.js";
import { generateLive, generateLiveInto, removeGenerated, typecheck } from "./generated.js";

// A table create takes 30 to 70 seconds, a delete up to two minutes; $metadata catches up later.
const SLOW = 600_000;
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const table = `new_sdkitmc${tag}`;
const description = `Created by SDK integration run ${runId}; safe to delete.`;
const selection = { entities: [table, "task"] };
const STAMP = ".dataverse-gen-stamp.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retry `fn` until it resolves, for up to `ms`. An error `retryIf` rejects is thrown at once. */
async function eventually<T>(
  fn: () => Promise<T>,
  ms = 300_000,
  retryIf: (err: unknown) => boolean = () => true
): Promise<T> {
  const deadline = Date.now() + ms;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (Date.now() > deadline || !retryIf(err)) throw err;
      await sleep(10_000);
    }
  }
}

/** Dataverse refused the request (400 or 404): nothing changed, so it is safe to send again. */
const refused = (err: unknown): boolean =>
  err instanceof DataverseODataError && (err.status === 400 || err.status === 404);

/** What one generator run asked Dataverse. */
interface Run {
  /** The tables read with a per-table RetrieveMetadataChanges request. */
  perTable: string[];
  /** The number of RetrieveMetadataChanges requests with a ClientVersionStamp. */
  changes: number;
  unchangedTables: string[];
  fetchedTables: string[];
  warnings: string[];
}

/** The logical names a per-table RetrieveMetadataChanges URL asks for. */
function tablesOf(url: string): string[] {
  const query = new URL(url).searchParams.get("@q") ?? "{}";
  const parsed = JSON.parse(query) as {
    Criteria?: { Conditions?: Array<{ Value?: { Value?: string } }> };
  };
  return (parsed.Criteria?.Conditions ?? []).map((c) => c.Value?.Value ?? "?");
}

/** Run the incremental generator into `dir`, counting its metadata requests. */
async function generate(dir: string): Promise<Run> {
  const urls: string[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    urls.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    return realFetch(input, init);
  };
  try {
    const result = await generateLiveInto(dir, selection, { incremental: true });
    const metadataRequests = urls.filter((u) => u.includes("/RetrieveMetadataChanges("));
    return {
      perTable: metadataRequests
        .filter((u) => !u.includes("ClientVersionStamp="))
        .flatMap((u) => tablesOf(u)),
      changes: metadataRequests.filter((u) => u.includes("ClientVersionStamp=")).length,
      ...result,
    };
  } finally {
    globalThis.fetch = realFetch;
  }
}

interface Stamp {
  metadata?: { versionStamp: string };
  tables: Partial<
    Record<string, { files: string[]; metadata?: { Attributes?: Array<{ LogicalName?: string }> } }>
  >;
}

async function stampOf(dir: string): Promise<Stamp> {
  return JSON.parse(await readFile(path.join(dir, STAMP), "utf-8")) as Stamp;
}

/** The column logical names the stamp keeps for the table. */
async function keptColumns(dir: string): Promise<string[]> {
  const kept = (await stampOf(dir)).tables[table]?.metadata?.Attributes ?? [];
  return kept.map((a) => a.LogicalName ?? "");
}

/** The generated entity file of the table. */
async function tableFile(dir: string): Promise<string> {
  const file = (await stampOf(dir)).tables[table]?.files[0];
  if (!file) throw new Error(`${table} wasn't generated`);
  return readFile(path.join(dir, file), "utf-8");
}

let tableId: string | undefined;
let dir = "";
/** Every table any run read with a per-table request after the first full read. */
const readAgain = new Set<string>();

/**
 * Delete the table. Only a 204 or several 404s in a row count as gone: right after a create, a
 * server whose cache is behind answers 404 for a table that still exists.
 */
async function deleteTable(): Promise<boolean> {
  const { client } = liveClient();
  let notFound = 0;
  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      await client.api(`/EntityDefinitions(${String(tableId)})`).delete<undefined>();
      return true;
    } catch (err) {
      notFound = (err as { status?: number }).status === 404 ? notFound + 1 : 0;
      if (notFound >= 3) return true;
    }
    await sleep(10_000);
  }
  return false;
}

afterAll(async () => {
  if (!live) return;
  await removeGenerated();
  if (tableId && !(await deleteTable())) {
    throw new Error(`Could not delete the temporary table ${table}; delete it by hand.`);
  }
}, SLOW);

describe.skipIf(!live)("live: incremental generation reads only changed tables (#429)", () => {
  const metadata = () => new MetadataClient(liveClient().client);

  it(
    "a second run over unchanged metadata makes no per-table metadata request",
    async () => {
      tableId = await metadata().createEntityDefinition(
        Metadata.entity(table, {
          displayName: `SDK metadata changes ${tag}`,
          displayCollectionName: `SDK metadata changes ${tag}`,
          description,
          primaryName: Metadata.primaryName("new_Name", { displayName: "Name", maxLength: 100 }),
          attributes: [Metadata.string("new_Code", { displayName: "Code", maxLength: 20 })],
        })
      );
      expect(tableId).toMatch(GUID);

      // Until $metadata has the table and the run keeps its metadata
      dir = await generateLive({ entities: ["task"] });
      await eventually(async () => {
        await generate(dir);
        expect(await keptColumns(dir)).toContain("new_code");
        expect((await stampOf(dir)).metadata?.versionStamp).toMatch(/\S/);
      });

      // The new table may still settle for a moment: a run that reads it again is retried
      const unchanged = await eventually(async () => {
        const run = await generate(dir);
        expect(run.perTable).toEqual([]);
        return run;
      }, 180_000);
      expect(unchanged.changes).toBe(1);
      expect(unchanged.fetchedTables).toEqual([]);
      expect([...unchanged.unchangedTables].sort()).toEqual([table, "task"].sort());
      expect(unchanged.warnings).toEqual([]);
      expect(await tableFile(dir)).toContain("new_code");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  it(
    "a new column reads that table again, and not the other",
    async () => {
      if (!tableId || !dir) throw new Error("The table wasn't created.");
      // Only a refusal is retried: after any other error the column may exist
      const columnId = await eventually(
        () =>
          metadata().createAttributeDefinition(
            table,
            Metadata.string("new_Added", { displayName: "Added", maxLength: 40 })
          ),
        120_000,
        refused
      );
      expect(columnId).toMatch(GUID);

      await eventually(async () => {
        const run = await generate(dir);
        for (const name of run.perTable) readAgain.add(name);
        expect(run.warnings).toEqual([]);
        expect(await keptColumns(dir)).toContain("new_added");
        expect(await tableFile(dir)).toContain("new_added");
      });
      expect([...readAgain]).toEqual([table]);
    },
    SLOW
  );

  it(
    "a deleted column is dropped from the kept metadata and the generated table",
    async () => {
      if (!tableId || !dir) throw new Error("The table wasn't created.");
      await eventually(() => metadata().deleteAttributeDefinition(table, "new_added"), 120_000);

      await eventually(async () => {
        const run = await generate(dir);
        for (const name of run.perTable) readAgain.add(name);
        expect(await keptColumns(dir)).not.toContain("new_added");
        expect(await tableFile(dir)).not.toContain("new_added");
      });
      expect(await keptColumns(dir)).toContain("new_code");
      expect(readAgain.has("task")).toBe(false);
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  it(
    "a deleted table is no longer generated, and nothing is read",
    async () => {
      if (!tableId || !dir) throw new Error("The table wasn't created.");
      const file = (await stampOf(dir)).tables[table]?.files[0] ?? "";
      expect(await deleteTable()).toBe(true);
      tableId = undefined;

      // While $metadata still has the table, it is read again, which fails ("not a Dataverse
      // entity"): retried until $metadata catches up
      const run = await eventually(async () => {
        const result = await generate(dir);
        expect(Object.keys((await stampOf(dir)).tables)).toEqual(["task"]);
        return result;
      });
      for (const name of run.perTable) readAgain.add(name);
      // task's metadata is kept (its files are regenerated: the set of generated tables changed)
      expect(run.perTable).toEqual([]);
      expect(run.changes).toBe(1);
      await expect(readFile(path.join(dir, file), "utf-8")).rejects.toThrow();
      expect(readAgain.has("task")).toBe(false);
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );
});
