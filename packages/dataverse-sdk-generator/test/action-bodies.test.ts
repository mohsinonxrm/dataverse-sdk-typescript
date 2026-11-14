/**
 * #361: what generated code reads and sends.
 *
 * - `Edm.DateTimeOffset` is `string` wherever a value is read (entity columns, complex types,
 *   returns): the Web API sends ISO 8601 strings and nothing turns them into Dates. A parameter
 *   takes `string | Date`.
 * - Action bodies are sent the way the in-repo actions send them (#232, #74): enum values as member
 *   names, an entity parameter as an entity (a reference as `@odata.type` and its key, a record with
 *   its lookups as `@odata.bind`).
 * - Complex types have their navigation properties (`PrincipalAccess.Principal`, #231).
 *
 * The test generates code from the fixture, type-checks and compiles it, then runs the generated
 * actions through a real DataverseClient with a recording fake fetch.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "action-bodies");

const ACCOUNT_ID = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const TEAM_ID = "11111111-2222-3333-4444-555555555555";
const OPPORTUNITY_ID = "22222222-3333-4444-5555-666666666666";
const TASK_ID = "33333333-4444-5555-6666-777777777777";

let outputRoot = "";
let diagnostics: string[] = [];

type Ctor = new (...args: unknown[]) => Executable<unknown>;
async function load(file: string, name: string): Promise<Ctor> {
  const mod = (await import(pathToFileURL(path.join(outputRoot, "js", file)).href)) as Partial<
    Record<string, Ctor>
  >;
  const ctor = mod[name];
  if (!ctor) throw new Error(`${name} not exported from ${file}`);
  return ctor;
}

const read = (file: string) => fs.readFile(path.join(outputRoot, "ts", file), "utf-8");

beforeAll(async () => {
  await fs.mkdir(scratchRoot, { recursive: true });
  outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  const config: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account", "contact", "opportunityclose"],
    actions: [
      "GrantAccess",
      "WinOpportunity",
      "CalculatePrice",
      "contoso_Schedule",
      "contoso_NextRun",
    ],
    functions: ["contoso_Search", "contoso_FindByRights"],
    output: { outputRoot: path.join(outputRoot, "ts") },
  };
  const model = new SchemaModel(createFixtureMetadataService(), config);
  await model.generate();
  await new TypescriptGenerator(model, config).generate();

  const entries = await fs.readdir(path.join(outputRoot, "ts"), {
    withFileTypes: true,
    recursive: true,
  });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
  const program = ts.createProgram(files, {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    verbatimModuleSyntax: true,
    isolatedModules: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    erasableSyntaxOnly: true,
    skipLibCheck: true,
    types: [],
    rootDir: path.join(outputRoot, "ts"),
    outDir: path.join(outputRoot, "js"),
  });
  diagnostics = ts
    .getPreEmitDiagnostics(program)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  program.emit();
  await fs.writeFile(path.join(outputRoot, "js", "package.json"), '{"type":"module"}');
}, 60_000);

afterAll(async () => {
  if (outputRoot) await fs.rm(outputRoot, { recursive: true, force: true });
});

describe("#361: generated code type-checks", () => {
  it("under strict settings", () => {
    expect(diagnostics).toEqual([]);
  });
});

describe("#361: Edm.DateTimeOffset", () => {
  it("is a string where a value is read: entity columns, complex types and returns", async () => {
    expect(await read("entities/Account.ts")).toContain("  createdon?: string | null;");
    expect(await read("complextypes/ScheduleResponse.ts")).toContain("  ScheduledOn?: string;");
    expect(await read("actions/contoso_NextRunAction.ts")).toContain(
      "export type contoso_NextRunActionResponse = string;"
    );
  });

  it("is a string or a Date where a parameter takes one", async () => {
    const schedule = await read("actions/contoso_ScheduleAction.ts");
    expect(schedule).toContain("  When: string | Date;");
    expect(schedule).toContain("  Retries?: (string | Date)[] | null;");
    expect(await read("functions/contoso_SearchFunction.ts")).toContain(
      "  Since?: string | Date | null;"
    );
  });
});

describe("#361: action request bodies", () => {
  it("GrantAccess sends AccessMask by name and the Principal reference as an entity", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /GrantAccess/, () => noContent());
    const GrantAccess = await load("actions/GrantAccessAction.js", "GrantAccessAction");

    await client.execute(
      new GrantAccess({
        Target: createEntityReference("account", ACCOUNT_ID),
        PrincipalAccess: {
          Principal: createEntityReference("team", TEAM_ID),
          AccessMask: 1 | 2,
        },
      })
    );
    // A reference is @odata.type and the table's primary key, as the in-repo GrantAccess sends it
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: ACCOUNT_ID },
      PrincipalAccess: {
        Principal: { "@odata.type": "Microsoft.Dynamics.CRM.team", ownerid: TEAM_ID },
        AccessMask: "ReadAccess, WriteAccess",
      },
    });
  });

  it("WinOpportunity sends the OpportunityClose record with its lookup as @odata.bind", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /WinOpportunity/, () => noContent());
    const Win = await load("actions/WinOpportunityAction.js", "WinOpportunityAction");

    await client.execute(
      new Win({
        OpportunityClose: {
          subject: "Won",
          opportunityid: createEntityReference("opportunity", OPPORTUNITY_ID),
        },
        Status: 3,
      })
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      OpportunityClose: {
        "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
        subject: "Won",
        "opportunityid@odata.bind": `/opportunities(${OPPORTUNITY_ID})`,
      },
      Status: 3,
    });
  });

  it("a record of a table that isn't generated has its references turned into binds too", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /CalculatePrice/, () => noContent());
    const CalculatePrice = await load("actions/CalculatePriceAction.js", "CalculatePriceAction");

    await client.execute(
      new CalculatePrice({
        Target: {
          "@odata.type": "Microsoft.Dynamics.CRM.task",
          subject: "Call",
          regardingobjectid_account: createEntityReference("account", ACCOUNT_ID),
        },
      })
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: {
        "@odata.type": "Microsoft.Dynamics.CRM.task",
        subject: "Call",
        "regardingobjectid_account@odata.bind": `/accounts(${ACCOUNT_ID})`,
      },
    });

    // A reference written by hand is sent as it is
    await client.execute(
      new CalculatePrice({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.quote", quoteid: ACCOUNT_ID },
      })
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.quote", quoteid: ACCOUNT_ID },
    });
  });

  it("dates, flags enums and collections of entities", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /contoso_Schedule/, () =>
      jsonResponse({ ScheduledOn: "2024-05-01T10:00:00Z" })
    );
    const Schedule = await load("actions/contoso_ScheduleAction.js", "contoso_ScheduleAction");

    const result = await client.execute(
      new Schedule({
        When: new Date("2024-05-01T10:00:00Z"),
        Retries: ["2024-05-02T10:00:00Z"],
        Rights: 2,
        Tasks: [createEntityReference("task", TASK_ID)],
      })
    );
    expect(result).toEqual({ ScheduledOn: "2024-05-01T10:00:00Z" });
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      When: "2024-05-01T10:00:00.000Z",
      Retries: ["2024-05-02T10:00:00Z"],
      Rights: "WriteAccess",
      Tasks: [{ "@odata.type": "Microsoft.Dynamics.CRM.task", activityid: TASK_ID }],
    });

    // A member name is sent as it is, and an undefined parameter isn't sent
    await client.execute(new Schedule({ When: "2024-05-01T10:00:00Z", Rights: "ReadAccess" }));
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      When: "2024-05-01T10:00:00Z",
      Rights: "ReadAccess",
    });
  });

  it("entity parameters take a reference or a record", async () => {
    const win = await read("actions/WinOpportunityAction.ts");
    expect(win).toContain("  OpportunityClose: OpportunityClose | EntityReference;");
    expect(win).toContain(
      'body["OpportunityClose"] = bodyValue(this.parameters.OpportunityClose, "opportunityclose");'
    );
    expect(win).toContain('body["Status"] = this.parameters.Status;');
    expect(await read("actions/contoso_ScheduleAction.ts")).toContain(
      "  Tasks?: Array<IEntity | EntityReference> | null;"
    );
  });
});

describe("#358: enum values in complex and collection function parameters", () => {
  it("are sent as member names in the JSON parameter alias; an enum parameter stays an enum literal", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_FindByRights/, () => jsonResponse({ value: 1 }));
    const Find = await load(
      "functions/contoso_FindByRightsFunction.js",
      "contoso_FindByRightsFunction"
    );

    await client.execute(
      new Find({ Filter: { Name: "x", Rights: 1 | 2 }, RightsList: [1, 2], Rights: 2 })
    );
    const query = new URL(fake.last().url).searchParams;
    expect(JSON.parse(query.get("@p1") ?? "")).toEqual({
      Name: "x",
      Rights: "ReadAccess, WriteAccess",
    });
    expect(JSON.parse(query.get("@p2") ?? "")).toEqual(["ReadAccess", "WriteAccess"]);
    expect(query.get("@p3")).toBe("Microsoft.Dynamics.CRM.AccessRights'2'");
  });
});

describe("#361: navigation properties of complex types", () => {
  it("are generated, set with a reference or a record", async () => {
    const principalAccess = await read("complextypes/PrincipalAccess.ts");
    expect(principalAccess).toContain("  AccessMask?: AccessRights | null;");
    expect(principalAccess).toContain("  Principal?: IEntity | EntityReference;");
    expect(await read("complextypes/ScheduleResponse.ts")).toContain(
      "  Tasks?: Array<IEntity | EntityReference> | null;"
    );
  });
});
