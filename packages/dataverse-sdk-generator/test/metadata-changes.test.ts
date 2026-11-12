/**
 * #429: incremental generation reads only the tables whose metadata changed. The stamp file keeps
 * each table's metadata and the run's `ServerVersionStamp`; the next run asks RetrieveMetadataChanges
 * for the changes since then (`ClientVersionStamp`, `DeletedMetadataFilters`) in one request, and
 * reads again only the tables that changed, or whose table or column was deleted. An expired
 * version stamp (0x80044352) reads every table again.
 */
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type {
  EntityMetadataDetail,
  MetadataService,
  RetrieveMetadataChangesResponse,
} from "../src/metadata-service.js";
import { MetadataService as RealMetadataService } from "../src/metadata-service.js";
import { metadataSource } from "../src/incremental.js";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { listTsFiles, scratchFolders, typecheck } from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("metadata-changes");
afterAll(scratch.cleanup);

const STAMP = ".dataverse-gen-stamp.json";
const MARKER = "// kept from the previous run\n";

/** A fixed id for a table (`t`) or a column (`c`) of the fixture. */
function idOf(kind: "t" | "c", name: string): string {
  const hex = createHash("sha256").update(name).digest("hex");
  return `${kind === "t" ? "11111111" : "22222222"}-0000-4000-8000-${hex.slice(0, 12)}`;
}

/** The fixture's tables with MetadataIds (and the nulls Dataverse sends for what wasn't asked). */
function orgTables(): Record<string, EntityMetadataDetail> {
  const tables: Record<string, EntityMetadataDetail> = {};
  for (const [name, response] of Object.entries(structuredClone(WRITE_ENTITY_METADATA))) {
    const table = response.EntityMetadata?.[0];
    if (!table) continue;
    table.MetadataId = idOf("t", name);
    for (const attribute of table.Attributes ?? []) {
      attribute.MetadataId = idOf("c", `${name}.${attribute.LogicalName ?? ""}`);
      Object.assign(attribute, { IsCustomAttribute: null, HasChanged: null });
    }
    Object.assign(table, { HasChanged: null, IconVectorName: null });
    tables[name] = table;
  }
  return tables;
}

/** A fake org: its `$metadata`, its tables, and what changed since the last version stamp. */
interface Org {
  edmx: string;
  tables: Record<string, EntityMetadataDetail>;
  /** The current version: the stamps are `<version>!stamp`. */
  version: number;
  /** Tables that changed since the last stamp. */
  changed: string[];
  /** MetadataIds deleted since the last stamp. */
  deleted: string[];
  /** Answer the changes request with ExpiredVersionStamp. */
  expired?: boolean;
  /** Fail the changes request. */
  fail?: boolean;
  /** Return no version stamps. */
  noStamps?: boolean;
}

function newOrg(): Org {
  return { edmx: WRITE_EDMX, tables: orgTables(), version: 1, changed: [], deleted: [] };
}

/** What a run asked the fake org. */
interface Calls {
  tables: string[];
  changes: Array<{ stamp: string; names: readonly string[] | undefined }>;
}

function fakeService(org: Org, calls: Calls): MetadataService {
  const stamp = () => (org.noStamps ? undefined : `${String(org.version)}!stamp`);
  const service: Pick<
    MetadataService,
    "getEdmxMetadata" | "getEntityMetadata" | "getMetadataChanges"
  > = {
    getEdmxMetadata: () => Promise.resolve(org.edmx),
    getEntityMetadata: (logicalName) => {
      calls.tables.push(logicalName);
      const table = logicalName in org.tables ? org.tables[logicalName] : undefined;
      return Promise.resolve({
        EntityMetadata: table ? [structuredClone(table)] : [],
        ServerVersionStamp: stamp(),
      });
    },
    getMetadataChanges: (clientVersionStamp, logicalNames) => {
      calls.changes.push({ stamp: clientVersionStamp, names: logicalNames });
      if (org.fail) return Promise.reject(new Error("Failed to retrieve metadata changes: 400"));
      if (org.expired) return Promise.resolve(undefined);
      const response: RetrieveMetadataChangesResponse = {
        // Only what changed: the table with a changed column
        EntityMetadata: org.changed.map((name) => ({
          LogicalName: name,
          MetadataId: idOf("t", name),
          Attributes: (name in org.tables ? (org.tables[name].Attributes ?? []) : []).slice(0, 1),
        })),
        DeletedMetadata: {
          Count: org.deleted.length > 0 ? 1 : 0,
          IsReadOnly: false,
          Keys: org.deleted.length > 0 ? ["Attribute"] : [],
          Values: org.deleted.length > 0 ? [org.deleted] : [],
        },
        ServerVersionStamp: stamp(),
      };
      return Promise.resolve(response);
    },
  };
  return service as MetadataService;
}

/** Generate from the org into `outputRoot`, then move the org to its next version. */
async function run(
  outputRoot: string,
  org: Org,
  config: Partial<DataverseGenConfig> = {}
): Promise<{ generator: TypescriptGenerator; model: SchemaModel; calls: Calls }> {
  const full: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account", "contact", "systemuser"],
    ...config,
    output: { outputRoot, incremental: true, ...config.output },
  };
  const calls: Calls = { tables: [], changes: [] };
  const model = new SchemaModel(fakeService(org, calls), full);
  await model.generate();
  const generator = new TypescriptGenerator(model, full);
  await generator.generate();
  org.version++;
  org.changed = [];
  org.deleted = [];
  return { generator, model, calls };
}

interface StampFile {
  metadata?: { source: string; versionStamp: string; skipped: string[] };
  tables: Record<string, { metadata?: EntityMetadataDetail }>;
}

async function stampOf(dir: string): Promise<StampFile> {
  return JSON.parse(await fs.readFile(path.join(dir, STAMP), "utf-8")) as StampFile;
}

async function mark(dir: string, ...files: string[]): Promise<void> {
  for (const file of files) {
    const full = path.join(dir, file);
    await fs.writeFile(full, MARKER + (await fs.readFile(full, "utf-8")), "utf-8");
  }
}

async function isKept(dir: string, file: string): Promise<boolean> {
  return (await fs.readFile(path.join(dir, file), "utf-8")).startsWith(MARKER);
}

async function exists(file: string): Promise<boolean> {
  return fs.access(file).then(
    () => true,
    () => false
  );
}

const TABLE_FILES = ["entities/Account.ts", "entities/Contact.ts", "entities/SystemUser.ts"];

describe("incremental generation: only changed tables are read (#429)", () => {
  it("a second run over unchanged metadata makes no per-table metadata request", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    const first = await run(dir, org);
    expect(first.calls.tables).toEqual(["account", "contact", "systemuser"]);
    expect(first.calls.changes).toEqual([]);
    expect(first.model.FetchedTables).toEqual(["account", "contact", "systemuser"]);

    const stamp = await stampOf(dir);
    expect(stamp.metadata).toEqual({
      source: "https://contoso.crm.dynamics.com/api/data/v9.2",
      versionStamp: "1!stamp",
      skipped: [],
    });
    expect(stamp.tables.account.metadata?.MetadataId).toBe(idOf("t", "account"));
    // What Dataverse sent as null isn't kept
    expect(JSON.stringify(stamp.tables)).not.toContain("null");

    await mark(dir, ...TABLE_FILES);
    const second = await run(dir, org);
    expect(second.calls.tables).toEqual([]);
    expect(second.calls.changes).toEqual([
      { stamp: "1!stamp", names: ["account", "contact", "systemuser"] },
    ]);
    expect(second.generator.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    for (const file of TABLE_FILES) expect(await isKept(dir, file)).toBe(true);
    expect(second.model.Warnings).toEqual([]);
    // The next run asks for the changes since this one
    expect((await stampOf(dir)).metadata?.versionStamp).toBe("2!stamp");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("generates the same code from the kept metadata as from Dataverse", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    // A setting changes: every table is generated again, from the kept metadata
    const again = await run(dir, org, { formContext: true, typedClient: true });
    expect(again.calls.tables).toEqual([]);
    expect(again.generator.unchangedTables).toEqual([]);

    const fresh = await scratch.create();
    await run(fresh, newOrg(), {
      formContext: true,
      typedClient: true,
      output: { outputRoot: fresh, incremental: false },
    });
    const files = (await listTsFiles(fresh)).map((f) => path.relative(fresh, f)).sort();
    expect((await listTsFiles(dir)).map((f) => path.relative(dir, f)).sort()).toEqual(files);
    for (const file of files) {
      expect(await fs.readFile(path.join(dir, file), "utf-8"), file).toBe(
        await fs.readFile(path.join(fresh, file), "utf-8")
      );
    }
  });

  it("reads again only a table that changed", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    await mark(dir, ...TABLE_FILES);

    const lastname = org.tables.contact.Attributes?.find((a) => a.LogicalName === "lastname");
    if (lastname) lastname.MaxLength = 99;
    org.changed = ["contact"];
    const second = await run(dir, org);
    expect(second.calls.tables).toEqual(["contact"]);
    expect(second.model.FetchedTables).toEqual(["contact"]);
    expect(second.generator.unchangedTables).toEqual(["account", "systemuser"]);
    expect(await isKept(dir, "entities/Contact.ts")).toBe(false);
    expect(await fs.readFile(path.join(dir, "entities/Contact.ts"), "utf-8")).toContain(
      "maxLength: 99"
    );

    // The new metadata is kept: the run after reads nothing and keeps contact
    await mark(dir, "entities/Contact.ts");
    const third = await run(dir, org);
    expect(third.calls.tables).toEqual([]);
    expect(third.generator.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    expect(await isKept(dir, "entities/Contact.ts")).toBe(true);
  });

  it("reads again a table whose column was deleted", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    expect(await fs.readFile(path.join(dir, "entities/Contact.ts"), "utf-8")).toContain(
      "firstname"
    );

    org.edmx = org.edmx.replace(/\s*<Property Name="firstname"[^>]*\/>/, "");
    org.tables.contact.Attributes = org.tables.contact.Attributes?.filter(
      (a) => a.LogicalName !== "firstname"
    );
    // A deletion isn't a change: only DeletedMetadata has it, with ids that aren't ours too
    org.deleted = [idOf("c", "contact.firstname").toUpperCase(), idOf("c", "lead.firstname")];
    const second = await run(dir, org);
    expect(second.calls.tables).toEqual(["contact"]);
    expect(second.generator.unchangedTables).toEqual(["account", "systemuser"]);
    expect(await fs.readFile(path.join(dir, "entities/Contact.ts"), "utf-8")).not.toContain(
      "firstname"
    );
    const kept = (await stampOf(dir)).tables.contact.metadata?.Attributes ?? [];
    expect(kept.map((a) => a.LogicalName)).not.toContain("firstname");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("drops a deleted table without reading anything", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    expect(await exists(path.join(dir, "entities/SystemUser.ts"))).toBe(true);

    org.edmx = org.edmx
      .replace(/\s*<EntityType Name="systemuser"[\s\S]*?<\/EntityType>/, "")
      .replace(/\s*<EntitySet Name="systemusers"[^>]*\/>/, "");
    delete org.tables.systemuser;
    org.deleted = [idOf("t", "systemuser")];
    const second = await run(dir, org);
    expect(second.calls.tables).toEqual([]);
    expect(second.calls.changes[0]?.names).toEqual(["account", "contact"]);
    expect(await exists(path.join(dir, "entities/SystemUser.ts"))).toBe(false);
    expect(Object.keys((await stampOf(dir)).tables).sort()).toEqual(["account", "contact"]);
    expect(await typecheck(dir)).toEqual([]);
  });

  it("a deleted table still in $metadata is read again, and fails like an unknown one", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    delete org.tables.systemuser;
    org.deleted = [idOf("t", "systemuser")];
    await expect(run(dir, org)).rejects.toThrow(/systemuser is not a Dataverse entity/);
  });

  it("reads every table again when the version stamp has expired (0x80044352)", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    org.expired = true;
    const second = await run(dir, org);
    expect(second.calls.changes).toHaveLength(1);
    expect(second.calls.tables).toEqual(["account", "contact", "systemuser"]);
    expect(second.model.Warnings).toEqual([]);
    // Unchanged metadata: the files are still kept
    expect(second.generator.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    expect((await stampOf(dir)).metadata?.versionStamp).toBe("2!stamp");
  });

  it("reads every table again, with a warning, when asking for the changes fails", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    org.fail = true;
    const second = await run(dir, org);
    expect(second.calls.tables).toEqual(["account", "contact", "systemuser"]);
    expect(second.model.Warnings).toEqual([
      expect.stringMatching(/^Incremental: couldn't ask Dataverse what changed/),
    ]);
  });

  it("doesn't reuse metadata from another org, or without a version stamp", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org);
    const other = await run(dir, org, { environmentUrl: "https://fabrikam.crm.dynamics.com/" });
    expect(other.calls.changes).toEqual([]);
    expect(other.calls.tables).toEqual(["account", "contact", "systemuser"]);
    expect((await stampOf(dir)).metadata?.source).toBe(
      "https://fabrikam.crm.dynamics.com/api/data/v9.2"
    );

    const noStamps = await scratch.create();
    const unstamped = { ...newOrg(), noStamps: true };
    await run(noStamps, unstamped);
    const stamp = await stampOf(noStamps);
    expect(stamp.metadata).toBeUndefined();
    expect(stamp.tables.account.metadata).toBeUndefined();
    const again = await run(noStamps, unstamped);
    expect(again.calls.changes).toEqual([]);
    expect(again.calls.tables).toEqual(["account", "contact", "systemuser"]);
  });

  it("reads a table that is new to the selection, and keeps the others", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    await run(dir, org, { entities: ["account", "contact"] });
    const second = await run(dir, org);
    expect(second.calls.changes[0]?.names).toEqual(["account", "contact"]);
    expect(second.calls.tables).toEqual(["systemuser"]);
  });

  it("all tables: an entity type without table metadata isn't asked about again", async () => {
    const dir = await scratch.create();
    const org = newOrg();
    const systemuser = org.tables.systemuser;
    delete org.tables.systemuser;
    const first = await run(dir, org, { entities: [] });
    expect(first.calls.tables).toEqual(["account", "contact", "systemuser"]);
    expect(first.model.SkippedTables).toEqual(["systemuser"]);
    expect((await stampOf(dir)).metadata?.skipped).toEqual(["systemuser"]);

    const second = await run(dir, org, { entities: [] });
    expect(second.calls.tables).toEqual([]);
    expect(second.calls.changes[0]?.names).toEqual(["account", "contact", "systemuser"]);
    expect(second.model.Warnings).toEqual([expect.stringMatching(/^Not generated: systemuser\./)]);

    // It becomes a table: the change says so, and it's read and generated
    org.tables.systemuser = systemuser;
    org.changed = ["systemuser"];
    const third = await run(dir, org, { entities: [] });
    expect(third.calls.tables).toEqual(["systemuser"]);
    expect(await exists(path.join(dir, "entities/SystemUser.ts"))).toBe(true);
  });
});

describe("metadataSource (#429)", () => {
  it("drops any number of trailing slashes and ignores case", () => {
    const source = (environmentUrl: string, apiVersion?: DataverseGenConfig["apiVersion"]) =>
      metadataSource({ environmentUrl, apiVersion });
    const expected = "https://contoso.crm.dynamics.com/api/data/v9.2";
    expect(source("https://contoso.crm.dynamics.com")).toBe(expected);
    expect(source("https://contoso.crm.dynamics.com/")).toBe(expected);
    expect(source("https://Contoso.crm.dynamics.com///")).toBe(expected);
    expect(source("https://contoso.crm.dynamics.com/", "v9.1")).toBe(
      "https://contoso.crm.dynamics.com/api/data/v9.1"
    );
    expect(source("///")).toBe("/api/data/v9.2");
    // Linear on long input
    expect(source(`https://contoso.crm.dynamics.com${"/".repeat(100_000)}x`)).toMatch(
      /x\/api\/data/
    );
  });
});

describe("MetadataService.getMetadataChanges (#429)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function service(response: () => Response) {
    const urls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => {
        urls.push(url);
        return Promise.resolve(response());
      })
    );
    const svc = new RealMetadataService({ environmentUrl: "https://contoso.crm.dynamics.com/" });
    svc.sleep = () => Promise.resolve();
    return { svc, urls };
  }

  const ok = () =>
    new Response(JSON.stringify({ EntityMetadata: [], ServerVersionStamp: "2!stamp" }), {
      status: 200,
    });

  it("sends the version stamp, the deleted-metadata filters and the tables", async () => {
    const { svc, urls } = service(ok);
    await expect(
      svc.getMetadataChanges("74812162!10/09/2022 22:10:22", ["account", "contact"])
    ).resolves.toEqual({ EntityMetadata: [], ServerVersionStamp: "2!stamp" });
    const url = new URL(urls[0] ?? "");
    expect(url.pathname).toBe(
      "/api/data/v9.2/RetrieveMetadataChanges(Query=@q,ClientVersionStamp=@s,DeletedMetadataFilters=@d)"
    );
    expect(url.searchParams.get("@s")).toBe("'74812162!10/09/2022 22:10:22'");
    expect(url.searchParams.get("@d")).toBe(
      "Microsoft.Dynamics.CRM.DeletedMetadataFilters'Default,Attribute'"
    );
    const query = JSON.parse(url.searchParams.get("@q") ?? "") as {
      Criteria: { FilterOperator: string; Conditions: Array<{ Value: { Value: string } }> };
      AttributeQuery: { Properties: { PropertyNames: string[] } };
    };
    expect(query.Criteria.FilterOperator).toBe("Or");
    expect(query.Criteria.Conditions.map((c) => c.Value.Value)).toEqual(["account", "contact"]);
    expect(query.AttributeQuery.Properties.PropertyNames).toContain("OptionSet");
  });

  it("asks about every table when it would name too many, and escapes quotes in the stamp", async () => {
    const { svc, urls } = service(ok);
    const names = Array.from({ length: 51 }, (_, i) => `new_table${String(i)}`);
    await svc.getMetadataChanges("1!it's", names);
    const url = new URL(urls[0] ?? "");
    expect(url.searchParams.get("@s")).toBe("'1!it''s'");
    expect(JSON.parse(url.searchParams.get("@q") ?? "")).not.toHaveProperty("Criteria");
  });

  it("returns undefined for an expired version stamp, and throws other errors", async () => {
    const expired = service(
      () =>
        new Response(
          JSON.stringify({ error: { code: "0x80044352", message: "ExpiredVersionStamp" } }),
          { status: 400 }
        )
    );
    await expect(expired.svc.getMetadataChanges("1!stamp", ["account"])).resolves.toBeUndefined();
    vi.unstubAllGlobals();

    const refused = service(() => new Response("bad query", { status: 400 }));
    await expect(refused.svc.getMetadataChanges("1!stamp")).rejects.toThrow(
      /metadata changes: 400[\s\S]*bad query/
    );
  });
});
