/**
 * Live test for incremental generation that reads only the tables whose metadata changed (#429):
 * the stamp file keeps each table's metadata and the run's `ServerVersionStamp`, and the next run
 * asks RetrieveMetadataChanges for the changes since then (`ClientVersionStamp`,
 * `DeletedMetadataFilters`) instead of reading every table.
 *
 * A temporary table (`new_sdkitmc<run>`, which the sweeper lists) is generated with task. Then: a
 * run over unchanged metadata makes no per-table request; a new column on the table reads that
 * table again; task is read again only when RetrieveMetadataChanges lists it as changed (the dev
 * org does list task's `scheduledend` and `subject` as changed between runs, though no test
 * changes them), never for another reason; a column bound to a temporary global
 * choice (`new_sdkitmcgc<run>`, also listed by the sweeper) gets the option added to that choice;
 * a deleted column and then the deleted table are handled. Every request is counted by wrapping
 * `fetch` while the generator runs.
 *
 * New metadata reaches `$metadata` and the org's servers' metadata caches over several seconds to
 * minutes, so each step retries its run until the change shows (`eventually()`). The table and
 * the global choice are deleted in `afterAll` if the tests didn't delete them.
 */
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataService } from "@mohsinonxrm/dataverse-sdk-generator";
import { Metadata, MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient, orgUrl, runId } from "./env.js";
import { generateLive, generateLiveInto, removeGenerated, typecheck } from "./generated.js";

// A table create takes 30 to 70 seconds, a delete up to two minutes; $metadata catches up later.
const SLOW = 600_000;
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const table = `new_sdkitmc${tag}`;
const globalChoice = `new_sdkitmcgc${tag}`;
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
  /** Why each table was read again (#429). */
  fetchReasons: Record<string, string>;
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
let globalChoiceId: string | undefined;
let dir = "";
/**
 * Every table any run read with a per-table request after the first full read, with why each run
 * read it again (the generator's `fetchReasons`). The live run's log and the failure messages show
 * them, since only the org can say what RetrieveMetadataChanges listed.
 */
const readAgain = new Map<string, string[]>();

/** Record what a run read again, and log it. */
function noteRun(step: string, run: Run): void {
  for (const name of run.perTable) {
    const reasons = readAgain.get(name) ?? [];
    reasons.push(`${step}: ${run.fetchReasons[name] ?? "?"}`);
    readAgain.set(name, reasons);
  }
  console.log(
    `[#429 ${step}] read again: ${JSON.stringify(run.fetchReasons)}; ` +
      `warnings: ${JSON.stringify(run.warnings)}`
  );
}

/** The tables read again so far and why, for failure messages. */
const reads = (): string => JSON.stringify(Object.fromEntries(readAgain));

/**
 * The reads of a table other than the test table for a reason other than RetrieveMetadataChanges
 * listing it as changed: a table the test doesn't change may change in the org, but it must not be
 * read again because of a stale stamp, a global choice or a deletion that isn't its own.
 */
const unexplained = (): string[] =>
  [...readAgain].flatMap(([name, reasons]) =>
    name === table
      ? []
      : reasons.filter((r) => !/: changed(:|$)/.test(r)).map((r) => `${name} (${r})`)
  );

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
  const failures: string[] = [];
  if (tableId && !(await deleteTable())) failures.push(`the table ${table}`);
  // The global choice last: Dataverse refuses to delete it while a column uses it
  if (globalChoiceId) {
    const id = globalChoiceId;
    try {
      await eventually(
        () => liveClient().client.api(`/GlobalOptionSetDefinitions(${id})`).delete<undefined>(),
        180_000
      );
    } catch {
      failures.push(`the global choice ${globalChoice}`);
    }
  }
  if (failures.length > 0) {
    throw new Error(`Could not delete ${failures.join(", ")}; delete them by hand.`);
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
        noteRun("new column", run);
        expect(run.warnings).toEqual([]);
        expect(await keptColumns(dir)).toContain("new_added");
        expect(await tableFile(dir)).toContain("new_added");
      });
      expect(readAgain.get(table) ?? [], reads()).toContainEqual(
        expect.stringMatching(/changed: .*new_added/)
      );
      expect(unexplained(), reads()).toEqual([]);
    },
    SLOW
  );

  it(
    "an option added to a global choice reads the table using it again",
    async () => {
      if (!tableId || !dir) throw new Error("The table wasn't created.");
      const md = metadata();
      globalChoiceId = await md.createGlobalOptionSet(
        Metadata.globalOptionSet(globalChoice, {
          displayName: `SDK metadata changes ${tag}`,
          description,
          options: [
            { value: 100000, label: "Red" },
            { value: 100001, label: "Blue" },
          ],
        })
      );
      expect(globalChoiceId).toMatch(GUID);
      const choiceId = globalChoiceId;
      await eventually(
        () =>
          md.createAttributeDefinition(
            table,
            Metadata.picklist("new_Color", { displayName: "Color", globalOptionSetId: choiceId })
          ),
        180_000,
        refused
      );

      // Until the column is generated, then until a run reads nothing again
      await eventually(async () => {
        const run = await generate(dir);
        noteRun("global choice column", run);
        expect(await tableFile(dir)).toMatch(/new_color[\s\S]*optionValues: \[100000, ?100001\]/);
      });
      await eventually(async () => {
        expect((await generate(dir)).perTable).toEqual([]);
      }, 180_000);

      // What RetrieveMetadataChanges itself reports for a global choice change (logged: the docs
      // don't say, and the generator compares the global choices' options either way)
      const { tokenProvider } = liveClient();
      const service = new MetadataService(
        { environmentUrl: orgUrl },
        await tokenProvider.getToken()
      );
      const before = (await stampOf(dir)).metadata?.versionStamp ?? "";

      await eventually(
        () =>
          md.insertOptionValue({
            OptionSetName: globalChoice,
            Value: 100002,
            Label: { LocalizedLabels: [{ Label: "Green", LanguageCode: 1033 }] },
          }),
        120_000,
        refused
      );

      await eventually(async () => {
        const run = await generate(dir);
        noteRun("global choice option", run);
        expect(run.warnings).toEqual([]);
        expect(await tableFile(dir)).toMatch(/optionValues: \[100000, ?100001, ?100002\]/);
      });
      expect(unexplained(), reads()).toEqual([]);

      const changes = await service.getMetadataChanges(before, [table]);
      console.info(
        `RetrieveMetadataChanges after an option was added to a global choice: ${
          changes?.EntityMetadata?.some((e) => e.LogicalName === table)
            ? "lists the table that uses it"
            : "doesn't list the table that uses it"
        }`
      );
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
        noteRun("deleted column", run);
        expect(await keptColumns(dir)).not.toContain("new_added");
        expect(await tableFile(dir)).not.toContain("new_added");
      });
      expect(await keptColumns(dir)).toContain("new_code");
      expect(unexplained(), reads()).toEqual([]);
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
      noteRun("deleted table", run);
      // task's metadata is kept (its files are regenerated: the set of generated tables changed)
      expect(run.perTable).toEqual([]);
      expect(run.changes).toBe(1);
      await expect(readFile(path.join(dir, file), "utf-8")).rejects.toThrow();
      expect(unexplained(), reads()).toEqual([]);
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );
});
