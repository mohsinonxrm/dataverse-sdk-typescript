/**
 * The documentation's main-path examples, run against the live org (#108).
 *
 * Every TypeScript block in the files below that has `<!-- live -->` on a line before its fence
 * (invisible on GitHub) is taken from the Markdown as it is written, compiled with TypeScript and
 * run here; nothing is copied by hand, so an example can't drift from what is tested.
 *
 * - **Setup:** a block runs as the body of an async function. The names the docs assume without
 *   declaring them are passed in: `client` (a DataverseClient on the org), `tokenProvider`,
 *   `baseUrl`, and a fresh record for each record id the block refers to (`accountId`,
 *   `contactId`, `opportunityId`, `leadId`, …, see FIXTURES). A block that declares a name itself
 *   (the quick start builds its own `client`) keeps its own. The placeholders of the setup blocks
 *   are replaced with this org (see PLACEHOLDERS), and `./generated/…` imports get code that
 *   `dataverse-gen` generates from the org for account and contact.
 * - **Checks:** the block must run to the end without throwing and without writing to
 *   `console.error` (how the examples report a failed record or a rolled-back change set), and
 *   every DataverseClient it builds must answer WhoAmI. The console is captured, not printed.
 * - **Cleanup:** every create that reaches the org during the block (`OData-EntityId`,
 *   `return=representation`, `CreateMultiple`, the parts of a `$batch`, `QualifyLead`) is
 *   recorded by a fetch wrapper, and afterwards each record created since the block started is
 *   deleted, with the block's fixtures. Fixture names start with this run's id.
 *
 * Blocks that need a person (device code, a browser), Azure resources, a workflow or a column the
 * org doesn't have, or that are deliberately partial, aren't marked. The first describe checks,
 * without an org, that every marked block is found, compiles, type-checks with the bindings below
 * and imports only packages this package depends on.
 */
import { readFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DataverseClient, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import {
  compileBlock,
  type CreatedRecord,
  type DocBlock,
  extractLiveBlocks,
  recordsCreatedBy,
  runBlock,
  typecheckBlocks,
  withCapturedConsole,
} from "./docs-examples.js";
import { live, liveClient, orgUrl, runId } from "./env.js";
import { compileToJs, generateLive, importGenerated, removeGenerated } from "./generated.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(packageRoot, "../..");

/** The Markdown files whose `<!-- live -->` blocks run, and how many each has. */
const FILES: Record<string, number> = {
  "README.md": 13,
  "docs/getting-started.md": 23,
};

const blocks: DocBlock[] = Object.keys(FILES).flatMap((file) =>
  extractLiveBlocks(readFileSync(path.join(repoRoot, file), "utf-8"), file)
);

/** A record each of these names gets when a block refers to it without declaring it. */
const FIXTURES: Record<string, { set: string; body: (name: string) => Record<string, unknown> }> = {
  accountId: { set: "accounts", body: (name) => ({ name }) },
  existingId: { set: "accounts", body: (name) => ({ name }) },
  id: { set: "accounts", body: (name) => ({ name }) },
  contactId: { set: "contacts", body: (name) => ({ lastname: name }) },
  opportunityId: { set: "opportunities", body: (name) => ({ name }) },
  leadId: {
    set: "leads",
    body: (name) => ({ subject: name, firstname: "Docs", lastname: name, companyname: name }),
  },
};

/** The bindings, as the type-check sees them. */
const DECLARATIONS = [
  '/// <reference types="node" />',
  'declare const client: import("@mohsinonxrm/dataverse-sdk-core").DataverseClient;',
  'declare const tokenProvider: import("@mohsinonxrm/dataverse-sdk-core").AccessTokenProvider;',
  "declare const baseUrl: string;",
  ...Object.keys(FIXTURES).map((name) => `declare const ${name}: string;`),
  "",
].join("\n");

/** The setup blocks' placeholders, and what replaces them. */
function placeholders(org: string, tenantId: string, clientId: string): Array<[string, string]> {
  return [
    ["https://yourorg.crm.dynamics.com", org],
    ["https://YOUR_ORG.crm.dynamics.com", org],
    ["YOUR_TENANT_ID", tenantId],
    ["YOUR_CLIENT_ID", clientId],
    // The secret stays in the environment: only the variable's name changes.
    ["process.env.AZURE_CLIENT_ID", "process.env.DATAVERSE_CLIENT_ID"],
    ["process.env.AZURE_TENANT_ID", "process.env.DATAVERSE_TENANT_ID"],
    ["process.env.AZURE_CLIENT_SECRET", "process.env.DATAVERSE_CLIENT_SECRET"],
    ["process.env.CLIENT_SECRET", "process.env.DATAVERSE_CLIENT_SECRET"],
  ];
}

const where = (block: DocBlock): string => `${block.file}:${String(block.line)}`;
const GENERATED = "./generated/";

describe("docs examples: the marked blocks", () => {
  it("the extractor finds marked TypeScript blocks and rejects stray markers", () => {
    const md = [
      "# Title",
      "## Setup",
      "<!-- live -->",
      "",
      "```typescript",
      "const a = 1;",
      "```",
      "",
      "```typescript",
      "const notMarked = 2;",
      "```",
      "### Next",
      "<!-- live -->",
      "```ts",
      "const b = 2;",
      "",
      "console.log(b);",
      "```",
    ].join("\n");
    expect(extractLiveBlocks(md, "x.md")).toEqual([
      { file: "x.md", line: 5, heading: "Title › Setup", code: "const a = 1;" },
      {
        file: "x.md",
        line: 14,
        heading: "Title › Setup › Next",
        code: "const b = 2;\n\nconsole.log(b);",
      },
    ]);
    expect(() => extractLiveBlocks("<!-- live -->\n\nSome text\n", "x.md")).toThrow(
      "x.md:1: <!-- live --> isn't followed by a code block"
    );
    expect(() => extractLiveBlocks("<!-- live -->\n```bash\nls\n```\n", "x.md")).toThrow(
      "only typescript blocks run"
    );
    expect(() =>
      extractLiveBlocks("<!-- no-check -->\n<!-- live -->\n```ts\nx\n```\n", "x.md")
    ).toThrow("both live and no-check");
    expect(() => extractLiveBlocks("<!-- live -->\n```ts\nx\n", "x.md")).toThrow("unclosed");
  });

  it("compiles a block to a function body and lists its imports, declarations and free names", () => {
    const compiled = compileBlock(
      {
        file: "x.md",
        line: 1,
        heading: "",
        code: [
          'import { odata } from "@mohsinonxrm/dataverse-sdk-core";',
          'import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";',
          "const { a, b: [c] } = { a: 1, b: [accountId] };",
          "for await (const row of client.api(odata.eq('x', 1)).iterate()) console.log(row.id);",
          "function helper(): void {}",
          "let unused: DataverseClient | undefined;",
        ].join("\n"),
      },
      [["'x'", "'y'"]]
    );
    expect(compiled.requires).toEqual(["@mohsinonxrm/dataverse-sdk-core"]);
    expect(compiled.declared).toEqual(["a", "c", "helper", "unused"]);
    expect(compiled.referenced).toContain("accountId");
    expect(compiled.referenced).toContain("client");
    expect(compiled.referenced).not.toContain("id");
    expect(compiled.js).toContain("'y'");
    expect(() => compileBlock({ file: "x.md", line: 1, heading: "", code: "const = ;" })).toThrow(
      "x.md:1: doesn't compile"
    );
  });

  it("runs a block with its bindings and records what a create returns", async () => {
    const compiled = compileBlock({
      file: "x.md",
      line: 1,
      heading: "",
      code: 'import { join } from "node:path";\nconst out = join(base, await Promise.resolve("b"));',
    });
    const values = await runBlock(compiled, new Map([["node:path", path.posix]]), {
      base: "a",
      out: "ignored: declared by the block",
    });
    expect(values).toEqual({ out: "a/b" });

    const api = "https://org.example/api/data/v9.2";
    const guid = "00000000-0000-0000-0000-00000000000a";
    const created = await recordsCreatedBy(
      `${api}/accounts`,
      new Response(null, { status: 204, headers: { "OData-EntityId": `${api}/accounts(${guid})` } })
    );
    expect(created).toEqual([{ set: "accounts", id: guid }]);
    const many = await recordsCreatedBy(
      `${api}/accounts/Microsoft.Dynamics.CRM.CreateMultiple`,
      Response.json({ Ids: [guid] })
    );
    expect(many).toEqual([{ set: "accounts", id: guid }]);
    const batchBody = [
      "--batchresponse_1",
      "Content-Type: multipart/mixed; boundary=changesetresponse_2",
      "",
      "--changesetresponse_2",
      "Content-Type: application/http",
      "",
      "HTTP/1.1 204 No Content",
      `OData-EntityId: ${api}/contacts(${guid})`,
      "",
      "--changesetresponse_2",
      "Content-Type: application/http",
      "",
      "HTTP/1.1 201 Created",
      "Content-Type: application/json; odata.metadata=minimal",
      "",
      `{"@odata.context":"${api}/$metadata#accounts/$entity","accountid":"${guid}"}`,
      "--changesetresponse_2--",
      "--batchresponse_1--",
    ].join("\r\n");
    const batch = await recordsCreatedBy(
      `${api}/$batch`,
      new Response(batchBody, {
        status: 200,
        headers: { "Content-Type": "multipart/mixed; boundary=batchresponse_1" },
      })
    );
    expect(batch).toEqual([
      { set: "contacts", id: guid },
      {
        set: "accounts",
        entity: { "@odata.context": `${api}/$metadata#accounts/$entity`, accountid: guid },
      },
    ]);
    const qualified = await recordsCreatedBy(
      `${api}/leads(${guid})/Microsoft.Dynamics.CRM.QualifyLead`,
      Response.json({
        value: [{ "@odata.type": "#Microsoft.Dynamics.CRM.account", accountid: guid }],
      })
    );
    expect(qualified).toEqual([{ logicalName: "account", id: guid }]);
  });

  it("finds every marked block", () => {
    for (const [file, count] of Object.entries(FILES)) {
      expect(blocks.filter((b) => b.file === file).length, file).toBe(count);
    }
  });

  it.each(blocks.map((b) => [where(b), b] as const))(
    "%s compiles, with no placeholder left, and imports only this package's dependencies",
    (_name, block) => {
      const compiled = compileBlock(block, placeholders("https://org.example", "tenant", "app"));
      expect(compiled.js).not.toMatch(/yourorg|YOUR_|AZURE_/i);
      const pkg = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf-8")) as {
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };
      const deps = new Set([...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]);
      for (const specifier of compiled.requires) {
        if (specifier.startsWith(GENERATED)) continue;
        const name = specifier.startsWith("@")
          ? specifier.split("/").slice(0, 2).join("/")
          : (specifier.split("/")[0] ?? "");
        expect(deps.has(name) || specifier.startsWith("node:"), specifier).toBe(true);
      }
    }
  );

  it("runs the README's resilience and telemetry blocks offline (they build clients only)", async () => {
    const tokenProvider = { getToken: () => Promise.resolve("token") };
    for (const [heading, name] of [
      ["Resilience middleware", "resilient"],
      ["Telemetry and trace context", "traced"],
    ] as const) {
      const block = blocks.find((b) => b.file === "README.md" && b.heading.endsWith(heading));
      expect(block, heading).toBeDefined();
      if (!block) continue;
      const compiled = compileBlock(block);
      const values = await withCapturedConsole(async () =>
        runBlock(compiled, await loadModules(compiled.requires), {
          client: undefined,
          baseUrl: "https://org.example",
          tokenProvider,
        })
      );
      expect(values[name], heading).toBeInstanceOf(DataverseClient);
    }
  });

  it("type-checks with the bindings the live run passes (blocks importing ./generated aside)", () => {
    const checked = blocks.filter((b) => !b.code.includes(`"${GENERATED}`));
    const wrong: DocBlock = {
      file: "x.md",
      line: 1,
      heading: "",
      code: "const n: number = accountId;",
    };
    expect(typecheckBlocks([...checked, wrong], packageRoot, DECLARATIONS)).toEqual([
      "x.md:2 Type 'string' is not assignable to type 'number'.",
    ]);
  }, 120_000);
});

// --- Live -------------------------------------------------------------------------------------

const SLOW = 300_000;
const originalFetch = globalThis.fetch;
/** Where the fetch wrapper records the creates of the block that is running. */
let recording: CreatedRecord[] | undefined;

const recordingFetch: typeof fetch = async (input, init) => {
  const response = await originalFetch(input, init);
  const request = input instanceof Request ? input : undefined;
  const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (recording && method === "POST" && response.ok && url.startsWith(`${orgUrl}/api/data/`)) {
    recording.push(...(await recordsCreatedBy(url, response)));
  }
  return response;
};

let generatedDir: Promise<string> | undefined;
/** Generate account and contact with the typed client, once, for the `./generated/…` imports. */
function generated(): Promise<string> {
  generatedDir ??= (async () => {
    const dir = await generateLive({ entities: ["account", "contact"], typedClient: true });
    await compileToJs(dir);
    return dir;
  })();
  return generatedDir;
}

async function loadModules(specifiers: readonly string[]): Promise<Map<string, unknown>> {
  const modules = new Map<string, unknown>();
  for (const specifier of specifiers) {
    modules.set(
      specifier,
      specifier.startsWith(GENERATED)
        ? await importGenerated(await generated(), specifier.slice(GENERATED.length))
        : ((await import(/* @vite-ignore */ specifier)) as unknown)
    );
  }
  return modules;
}

const entitySets = new Map<string, string>();
const primaryKeys = new Map<string, string>();

/** The entity set and id of a recorded create. */
async function resolve(record: CreatedRecord): Promise<{ set: string; id: string }> {
  const { client } = liveClient();
  if ("logicalName" in record) {
    let set = entitySets.get(record.logicalName);
    if (!set) {
      ({ EntitySetName: set } = await client
        .api(`EntityDefinitions(LogicalName='${record.logicalName}')`)
        .select("EntitySetName")
        .get<{ EntitySetName: string }>());
      entitySets.set(record.logicalName, set);
    }
    return { set, id: record.id };
  }
  if ("entity" in record) {
    let key = primaryKeys.get(record.set);
    if (!key) {
      const { value } = await client
        .api("EntityDefinitions")
        .select("PrimaryIdAttribute")
        .filter(`EntitySetName eq '${record.set}'`)
        .get<{ value: Array<{ PrimaryIdAttribute: string }> }>();
      key = value[0]?.PrimaryIdAttribute ?? "";
      primaryKeys.set(record.set, key);
    }
    const id = record.entity[key];
    if (typeof id !== "string") throw new Error(`${record.set}: the created record has no ${key}`);
    return { set: record.set, id };
  }
  return record;
}

/**
 * Delete the records, newest first. A record created before `since` isn't one the block made
 * (an update can return an OData-EntityId too), so it is left alone. Resolves to what failed.
 */
async function cleanUp(records: readonly CreatedRecord[], since: number): Promise<string[]> {
  const { client } = liveClient();
  const problems: string[] = [];
  const done = new Set<string>();
  for (const record of [...records].reverse()) {
    let key = "";
    try {
      const { set, id } = await resolve(record);
      key = `${set}(${id.toLowerCase()})`;
      if (done.has(key)) continue;
      done.add(key);
      const row = await client.api(key).select("createdon").get<{ createdon?: string | null }>();
      if (!row.createdon || Date.parse(row.createdon) < since) continue;
      await client.api(key).delete();
    } catch (err) {
      if (err instanceof DataverseODataError && err.status === 404) continue;
      problems.push(
        `${key || JSON.stringify(record)}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  return problems;
}

describe.skipIf(!live)("live: the documentation's examples", () => {
  let docsClient: DataverseClient;
  let changeTracking = false;

  beforeAll(async () => {
    const { client, tokenProvider } = liveClient();
    const noop = (): void => undefined;
    docsClient = new DataverseClient({
      baseUrl: orgUrl,
      tokenProvider,
      fetchProvider: { fetch: recordingFetch },
      logger: { debug: noop, info: noop, warn: noop, error: noop },
    });
    const meta = await client
      .api("EntityDefinitions(LogicalName='account')")
      .select("ChangeTrackingEnabled")
      .get<{ ChangeTrackingEnabled: boolean }>();
    changeTracking = meta.ChangeTrackingEnabled;
  });

  afterAll(async () => {
    globalThis.fetch = originalFetch;
    recording = undefined;
    await removeGenerated();
  });

  for (const block of blocks) {
    it(`${where(block)} ${block.heading}`, { timeout: SLOW }, async (ctx) => {
      if (block.code.includes(".trackChanges") && !changeTracking) {
        ctx.skip("change tracking is off for the account table in this org");
      }
      const { client, tokenProvider } = liveClient();
      const compiled = compileBlock(
        block,
        placeholders(
          orgUrl,
          process.env.DATAVERSE_TENANT_ID ?? "",
          process.env.DATAVERSE_CLIENT_ID ?? ""
        )
      );
      const since = Date.now() - 5 * 60_000;
      const records: CreatedRecord[] = [];
      let failure: Error | undefined;
      try {
        const bindings: Record<string, unknown> = {
          client: docsClient,
          tokenProvider,
          baseUrl: orgUrl,
        };
        for (const [name, fixture] of Object.entries(FIXTURES)) {
          if (!compiled.referenced.has(name) || compiled.declared.includes(name)) continue;
          const id = await client
            .api(fixture.set)
            .createAndGetId(fixture.body(`${runId} docs ${where(block)} ${name}`));
          records.push({ set: fixture.set, id });
          bindings[name] = id;
        }
        const modules = await loadModules(compiled.requires);

        const errors = await withCapturedConsole(async (capture) => {
          recording = records;
          globalThis.fetch = recordingFetch;
          try {
            const values = await runBlock(compiled, modules, bindings);
            // Every client the example built (the quick start's, the resilient one, …) works.
            for (const [name, value] of Object.entries(values)) {
              if (!(value instanceof DataverseClient) || value === docsClient) continue;
              const { UserId } = await value.execute(new WhoAmIFunction());
              expect(UserId, `WhoAmI through the example's ${name}`).toMatch(/^[0-9a-f-]{36}$/i);
            }
          } finally {
            globalThis.fetch = originalFetch;
            recording = undefined;
          }
          return capture.errors;
        });
        expect(errors, "the example wrote to console.error").toEqual([]);
      } catch (err) {
        failure = err instanceof Error ? err : new Error("The example threw", { cause: err });
      }
      const problems = await cleanUp(records, since);
      if (failure !== undefined) {
        throw failure;
      }
      expect(problems, "cleanup").toEqual([]);
    });
  }
});
