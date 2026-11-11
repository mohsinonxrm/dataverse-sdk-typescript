/**
 * #77: generated functions serialize their parameters as OData literals and bound operations use
 * the binding in the URL. The test generates code from the fixture, type-checks and compiles it,
 * then runs the generated classes through a real DataverseClient with a recording fake fetch.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "generated-operations");

const ACCOUNT_ID = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const OWNER_ID = "11111111-2222-3333-4444-555555555555";

let outputRoot = "";
let diagnostics: string[] = [];

// A generated operation class, loaded from the compiled output.
type Ctor = new (...args: unknown[]) => Executable<unknown>;
async function load(file: string, name: string): Promise<Ctor> {
  const mod = (await import(pathToFileURL(path.join(outputRoot, "js", file)).href)) as Partial<
    Record<string, Ctor>
  >;
  const ctor = mod[name];
  if (!ctor) throw new Error(`${name} not exported from ${file}`);
  return ctor;
}

beforeAll(async () => {
  await fs.mkdir(scratchRoot, { recursive: true });
  outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  const config: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account", "contact"],
    actions: ["contoso_Flag", "contoso_Recalculate", "ExportSolution"],
    functions: [
      "contoso_Search",
      "contoso_GetScore",
      "RetrieveUnpublished",
      "contoso_Touch",
      "RetrieveCurrentOrganization",
      "RetrieveTotalRecordCount",
      "WhoAmI",
    ],
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
    skipLibCheck: true,
    types: [],
    rootDir: path.join(outputRoot, "ts"),
    outDir: path.join(outputRoot, "js"),
  });
  diagnostics = ts
    .getPreEmitDiagnostics(program)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  program.emit();
  // The emitted ESM needs a package.json saying so.
  await fs.writeFile(path.join(outputRoot, "js", "package.json"), '{"type":"module"}');
}, 60_000);

afterAll(async () => {
  if (outputRoot) await fs.rm(outputRoot, { recursive: true, force: true });
});

function decoded(url: string): string {
  return decodeURIComponent(url.replace(/\+/g, " "));
}

describe("generated functions and bound operations (#77)", () => {
  it("type-check", () => {
    expect(diagnostics).toEqual([]);
  });

  it("serializes strings, GUIDs, dates and dates-with-time as OData literals", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_Search/, () => jsonResponse({ value: [] }));
    const Search = await load("functions/contoso_SearchFunction.js", "contoso_SearchFunction");

    await client.execute(
      new Search({
        Term: "O'Brien & Sons",
        OwnerId: `{${OWNER_ID}}`,
        Since: new Date("2024-05-01T10:00:00Z"),
        Day: "2024-05-01",
      })
    );

    expect(decoded(fake.last().url)).toBe(
      "https://contoso.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.contoso_Search" +
        "(Term=@p1,OwnerId=@p2,Since=@p3,Day=@p4)" +
        `?@p1='O''Brien & Sons'&@p2=${OWNER_ID}&@p3=2024-05-01T10:00:00.000Z&@p4=2024-05-01`
    );
    // The value is URL-encoded, so & and ' cannot end the parameter early.
    expect(fake.last().url).toContain("%40p1=%27O%27%27Brien+%26+Sons%27");
  });

  it("leaves out optional parameters that are not given or undefined (#96)", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_Search/, () => jsonResponse({ value: [] }));
    const Search = await load("functions/contoso_SearchFunction.js", "contoso_SearchFunction");

    await client.execute(new Search({ Term: "x", OwnerId: OWNER_ID }));
    expect(decoded(fake.last().url)).toMatch(
      /contoso_Search\(Term=@p1,OwnerId=@p2\)\?@p1='x'&@p2=1111/
    );
    await client.execute(
      new Search({ Term: "x", OwnerId: OWNER_ID, Since: undefined, Day: "2024-05-01" })
    );
    expect(decoded(fake.last().url)).toMatch(
      /contoso_Search\(Term=@p1,OwnerId=@p2,Day=@p4\)\?@p1='x'&@p2=1111.*&@p4=2024-05-01$/
    );
  });

  it("writes enum parameters as enum literals and collections as JSON", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveCurrentOrganization/, () => jsonResponse({ UserId: OWNER_ID }));
    const Fn = await load(
      "functions/RetrieveCurrentOrganizationFunction.js",
      "RetrieveCurrentOrganizationFunction"
    );

    await client.execute(new Fn({ AccessType: 1, Names: ["account", "contact"] }));
    expect(decoded(fake.last().url)).toBe(
      "https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveCurrentOrganization(AccessType=@p1,Names=@p2)" +
        `?@p1=Microsoft.Dynamics.CRM.AccessRights'1'&@p2=["account","contact"]`
    );
  });

  it("calls a function bound to one record on that record", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_GetScore/, () => jsonResponse({ value: 7 }));
    const Fn = await load("functions/contoso_GetScoreFunction.js", "contoso_GetScoreFunction");

    const score = await client.execute(new Fn(ACCOUNT_ID, { Rights: 2 }));
    expect(score).toBe(7);
    expect(decoded(fake.last().url)).toBe(
      `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.contoso_GetScore(Rights=@p1)` +
        "?@p1=Microsoft.Dynamics.CRM.AccessRights'2'"
    );
  });

  it("gives each overload of a bound function its own class", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveUnpublished/, () => jsonResponse({}));
    const ForAccount = await load(
      "functions/RetrieveUnpublished_accountFunction.js",
      "RetrieveUnpublished_accountFunction"
    );
    const ForContact = await load(
      "functions/RetrieveUnpublished_contactFunction.js",
      "RetrieveUnpublished_contactFunction"
    );

    await client.execute(new ForAccount(ACCOUNT_ID));
    expect(fake.last().path).toBe(
      `/accounts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.RetrieveUnpublished()`
    );
    await client.execute(new ForContact(ACCOUNT_ID));
    expect(fake.last().path).toBe(
      `/contacts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.RetrieveUnpublished()`
    );
  });

  it("binds to a reference when the bound type has no entity set, and sends entity references as @odata.id", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_Touch/, () => jsonResponse({ value: true }));
    const Touch = await load("functions/contoso_TouchFunction.js", "contoso_TouchFunction");

    await client.execute(
      new Touch(
        { logicalName: "account", id: ACCOUNT_ID, entitySetName: "accounts" },
        { Paging: { Distinct: true } }
      )
    );
    expect(decoded(fake.last().url)).toBe(
      `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.contoso_Touch(Paging=@p1)` +
        '?@p1={"Distinct":true}'
    );

    const Rollup = await load(
      "functions/RetrieveTotalRecordCountFunction.js",
      "RetrieveTotalRecordCountFunction"
    );
    fake.on("GET", /RetrieveTotalRecordCount/, () => jsonResponse({}));
    await client.execute(new Rollup({ EntityNames: ["it's"] }));
    expect(decoded(fake.last().url)).toContain(`?@p1=["it's"]`);

    expect(() =>
      new Touch({ logicalName: "account", id: ACCOUNT_ID }).toRequestInformation("https://x")
    ).toThrow(/needs an entitySetName/);
  });

  it("calls a function with no parameters with empty parentheses", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/WhoAmI()", () => jsonResponse({ UserId: OWNER_ID }));
    const WhoAmI = await load("functions/WhoAmIFunction.js", "WhoAmIFunction");
    const result = (await client.execute(new WhoAmI())) as { UserId: string };
    expect(result.UserId).toBe(OWNER_ID);
  });

  it("posts actions bound to a collection or a record to the bound URL", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /contoso_Flag/, () => noContent());
    fake.on("POST", /contoso_Recalculate/, () => jsonResponse({ accountid: ACCOUNT_ID }));
    const Flag = await load("actions/contoso_FlagAction.js", "contoso_FlagAction");
    const Recalculate = await load(
      "actions/contoso_RecalculateAction.js",
      "contoso_RecalculateAction"
    );

    await client.execute(new Flag({ Reason: "duplicate" }));
    expect(fake.last().path).toBe("/contacts/Microsoft.Dynamics.CRM.contoso_Flag");
    expect(fake.last().bodyText).toBe('{"Reason":"duplicate"}');

    // Only optional parameters: the object can be left out, and undefined isn't sent (#96)
    await client.execute(new Flag());
    expect(fake.last().bodyText).toBe("{}");
    await client.execute(new Flag({ Reason: undefined }));
    expect(fake.last().bodyText).toBe("{}");
    await client.execute(new Flag({ Reason: null }));
    expect(fake.last().bodyText).toBe('{"Reason":null}');

    await client.execute(new Recalculate(ACCOUNT_ID, { Mode: 3 }));
    expect(fake.last().path).toBe(
      `/accounts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.contoso_Recalculate`
    );
    expect(fake.last().bodyText).toBe('{"Mode":3}');
  });
});

/** Type-check `snippet`, written next to the generated code, with the same strict settings. */
async function usageDiagnostics(name: string, snippet: string): Promise<string[]> {
  const file = path.join(outputRoot, "ts", name);
  await fs.writeFile(file, snippet, "utf-8");
  try {
    const program = ts.createProgram([file], {
      strict: true,
      noEmit: true,
      target: ts.ScriptTarget.ES2022,
      lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      skipLibCheck: true,
      types: [],
    });
    return ts.getPreEmitDiagnostics(program).map((d) => {
      const at =
        d.file && d.start !== undefined
          ? d.file.getLineAndCharacterOfPosition(d.start).line + 1
          : 0;
      const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
      return `${path.basename(d.file?.fileName ?? "")}(${String(at)}): ${message}`;
    });
  } finally {
    await fs.rm(file, { force: true });
  }
}

describe("options-object constructors, as in the in-repo generator (#96)", () => {
  const read = (file: string) => fs.readFile(path.join(outputRoot, "ts", file), "utf-8");

  it("declares a <Class>Parameters interface keyed by the CSDL names, required per Nullable", async () => {
    const search = await read("functions/contoso_SearchFunction.ts");
    expect(search).toContain("export interface contoso_SearchFunctionParameters {");
    expect(search).toContain("  Term: string;");
    expect(search).toContain("  OwnerId: string;");
    expect(search).toMatch(/ {2}Since\?: .+ \| null;/);
    // A declared field, not a parameter property, which erasableSyntaxOnly rejects (#479)
    expect(search).toContain("  public readonly parameters: contoso_SearchFunctionParameters;");
    expect(search).toContain("    parameters: contoso_SearchFunctionParameters,");
    expect(search).toContain("    this.parameters = parameters;");
    expect(search).not.toMatch(/constructor\([^)]*public readonly/);
    const recalculate = await read("actions/contoso_RecalculateAction.ts");
    expect(recalculate).toContain("  public readonly accountId: string;");
    expect(recalculate).toContain("    accountId: string,");
    expect(recalculate).toContain(
      " * The first argument is the id of the account record to call it on."
    );
    expect(await read("actions/contoso_FlagAction.ts")).toContain(
      "    parameters: contoso_FlagActionParameters = {},"
    );
    const whoAmI = await read("functions/WhoAmIFunction.ts");
    expect(whoAmI).not.toContain("constructor(");
    expect(whoAmI).not.toContain("Parameters {");
  });

  it("parseResponse returns the record for 200 and null for 204 (#300)", async () => {
    const Recalculate = await load(
      "actions/contoso_RecalculateAction.js",
      "contoso_RecalculateAction"
    );
    const action = new Recalculate(ACCOUNT_ID, { Mode: 1 });
    expect(await action.parseResponse(noContent())).toBeNull();
    expect(await action.parseResponse(jsonResponse({ accountid: ACCOUNT_ID }))).toEqual({
      accountid: ACCOUNT_ID,
    });
  });

  it("required properties are required, unknown ones and positional calls don't compile", async () => {
    const ok = await usageDiagnostics(
      "usage-96-ok.ts",
      `import { contoso_SearchFunction, contoso_GetScoreFunction, WhoAmIFunction } from "./functions/index.js";
import { contoso_FlagAction, contoso_RecalculateAction } from "./actions/index.js";
export const a = new contoso_SearchFunction({ Term: "x", OwnerId: "${OWNER_ID}", Day: null });
export const b = new contoso_GetScoreFunction("${ACCOUNT_ID}", { Rights: 1 });
export const c = new WhoAmIFunction();
export const d = new contoso_FlagAction();
export const e = new contoso_RecalculateAction("${ACCOUNT_ID}", { Mode: 3 });
`
    );
    expect(ok).toEqual([]);
    const bad = await usageDiagnostics(
      "usage-96-bad.ts",
      `import { contoso_SearchFunction } from "./functions/index.js";
import { contoso_RecalculateAction } from "./actions/index.js";
export const a = new contoso_SearchFunction({ Term: "x" });
export const b = new contoso_SearchFunction({ Term: "x", OwnerId: "${OWNER_ID}", Sinc: "2024" });
export const c = new contoso_SearchFunction("x", "${OWNER_ID}");
export const d = new contoso_RecalculateAction({ Mode: 3 });
`
    );
    const lines = bad.join("\n");
    for (const line of [3, 4, 5, 6]) expect(lines).toContain(`usage-96-bad.ts(${String(line)})`);
  }, 60_000);
});
