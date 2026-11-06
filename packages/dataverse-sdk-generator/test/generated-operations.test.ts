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
      new Search("O'Brien & Sons", `{${OWNER_ID}}`, new Date("2024-05-01T10:00:00Z"), "2024-05-01")
    );

    expect(decoded(fake.last().url)).toBe(
      "https://contoso.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.contoso_Search" +
        "(Term=@p1,OwnerId=@p2,Since=@p3,Day=@p4)" +
        `?@p1='O''Brien & Sons'&@p2=${OWNER_ID}&@p3=2024-05-01T10:00:00.000Z&@p4=2024-05-01`
    );
    // The value is URL-encoded, so & and ' cannot end the parameter early.
    expect(fake.last().url).toContain("%40p1=%27O%27%27Brien+%26+Sons%27");
  });

  it("leaves out trailing optional parameters that are not given", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_Search/, () => jsonResponse({ value: [] }));
    const Search = await load("functions/contoso_SearchFunction.js", "contoso_SearchFunction");

    await client.execute(new Search("x", OWNER_ID));
    expect(decoded(fake.last().url)).toMatch(
      /contoso_Search\(Term=@p1,OwnerId=@p2\)\?@p1='x'&@p2=1111/
    );
  });

  it("writes enum parameters as enum literals and collections as JSON", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveCurrentOrganization/, () => jsonResponse({ UserId: OWNER_ID }));
    const Fn = await load(
      "functions/RetrieveCurrentOrganizationFunction.js",
      "RetrieveCurrentOrganizationFunction"
    );

    await client.execute(new Fn(1, ["account", "contact"]));
    expect(decoded(fake.last().url)).toBe(
      "https://contoso.crm.dynamics.com/api/data/v9.2/RetrieveCurrentOrganization(AccessType=@p1,Names=@p2)" +
        `?@p1=Microsoft.Dynamics.CRM.AccessRights'1'&@p2=["account","contact"]`
    );
  });

  it("calls a function bound to one record on that record", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_GetScore/, () => jsonResponse({ value: 7 }));
    const Fn = await load("functions/contoso_GetScoreFunction.js", "contoso_GetScoreFunction");

    const score = await client.execute(new Fn(ACCOUNT_ID, 2));
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
        {
          Distinct: true,
        }
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
    await client.execute(new Rollup(["it's"]));
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

    await client.execute(new Flag("duplicate"));
    expect(fake.last().path).toBe("/contacts/Microsoft.Dynamics.CRM.contoso_Flag");
    expect(fake.last().bodyText).toBe('{"Reason":"duplicate"}');

    await client.execute(new Flag());
    expect(fake.last().bodyText).toBe("{}");

    await client.execute(new Recalculate(ACCOUNT_ID, 3));
    expect(fake.last().path).toBe(
      `/accounts(${ACCOUNT_ID})/Microsoft.Dynamics.CRM.contoso_Recalculate`
    );
    expect(fake.last().bodyText).toBe('{"Mode":3}');
  });
});
