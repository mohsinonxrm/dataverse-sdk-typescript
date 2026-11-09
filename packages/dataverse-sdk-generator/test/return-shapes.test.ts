/**
 * #300: dataverse-gen and the in-repo generator (tools/generate-sdk-types) agree on what every
 * kind of operation returns. `client.execute()` resolves the value, not the OData envelope: a
 * primitive or a collection is the `value` of the body, a complex type or an entity is the body
 * itself (with its annotations), and an operation without a return type resolves `undefined`.
 *
 * The EDMX and the expectations are the same as in
 * tools/generate-sdk-types/test/return-shapes.test.ts.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import type { MetadataService } from "../src/metadata-service.js";
import { NO_CONTENT_OPERATIONS } from "../src/no-content-operations.js";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "return-shapes");
const CONTEXT = "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata";
const ACCOUNT_ID = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

/** One return type: the response the Web API sends, and the value execute() resolves. */
interface ReturnCase {
  name: string;
  returnType: string;
  body: Record<string, unknown>;
  value: unknown;
  /** The value for a 204 No Content, for the kinds Dataverse answers 204 for. */
  noContent?: unknown;
}

const account = {
  "@odata.etag": 'W/"1"',
  accountid: ACCOUNT_ID,
  name: "Contoso",
};

const CASES: ReturnCase[] = [
  { name: "String", returnType: "Edm.String", body: { value: "hello" }, value: "hello" },
  { name: "Int32", returnType: "Edm.Int32", body: { value: 42 }, value: 42 },
  { name: "Boolean", returnType: "Edm.Boolean", body: { value: false }, value: false },
  { name: "Guid", returnType: "Edm.Guid", body: { value: ACCOUNT_ID }, value: ACCOUNT_ID },
  { name: "Enum", returnType: "mscrm.Mode", body: { value: "Second" }, value: "Second" },
  {
    name: "Strings",
    returnType: "Collection(Edm.String)",
    body: { value: ["a", "b"] },
    value: ["a", "b"],
  },
  {
    name: "Items",
    returnType: "Collection(mscrm.Item)",
    body: { value: [{ Label: "x" }] },
    value: [{ Label: "x" }],
  },
  {
    name: "Info",
    returnType: "mscrm.InfoResponse",
    body: { Label: "n", Count: 1 },
    value: {
      "@odata.context": `${CONTEXT}#Microsoft.Dynamics.CRM.InfoResponse`,
      Label: "n",
      Count: 1,
    },
  },
  {
    name: "Account",
    returnType: "mscrm.account",
    body: account,
    value: { "@odata.context": `${CONTEXT}#accounts/$entity`, ...account },
    noContent: null,
  },
  {
    name: "Record",
    returnType: "mscrm.crmbaseentity",
    body: { "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account },
    value: {
      "@odata.context": `${CONTEXT}#accounts/$entity`,
      "@odata.type": "#Microsoft.Dynamics.CRM.account",
      ...account,
    },
    noContent: null,
  },
  {
    name: "Accounts",
    returnType: "Collection(mscrm.account)",
    body: { value: [account] },
    value: [account],
    noContent: [],
  },
  {
    name: "Records",
    returnType: "Collection(mscrm.crmbaseentity)",
    body: { value: [{ "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account }] },
    value: [{ "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account }],
    noContent: [],
  },
];

/** The body the Web API sends: a wrapped value, or the value itself, with @odata.context. */
function responseBody(c: ReturnCase): Record<string, unknown> {
  if ("value" in c.body) return { "@odata.context": `${CONTEXT}#x`, ...c.body };
  return c.value as Record<string, unknown>;
}

/** Every case as a function `F<name>` and an action `A<name>`, plus `APing` with no return. */
const RETURNS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" />
      </EntityType>
      <ComplexType Name="InfoResponse">
        <Property Name="Label" Type="Edm.String" />
        <Property Name="Count" Type="Edm.Int32" Nullable="false" />
      </ComplexType>
      <ComplexType Name="Item">
        <Property Name="Label" Type="Edm.String" />
      </ComplexType>
      <EnumType Name="Mode">
        <Member Name="First" Value="1" />
        <Member Name="Second" Value="2" />
      </EnumType>
${CASES.map(
  (c) => `      <Function Name="F${c.name}">
        <ReturnType Type="${c.returnType}" Nullable="false" />
      </Function>
      <Action Name="A${c.name}">
        <ReturnType Type="${c.returnType}" Nullable="false" />
      </Action>`
).join("\n")}
      <Action Name="APing" />
      <Action Name="UpsertMultiple">
        <ReturnType Type="mscrm.InfoResponse" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const metadataService = {
  getEdmxMetadata: () => Promise.resolve(RETURNS_EDMX),
  getEntityMetadata: () =>
    Promise.resolve({
      EntityMetadata: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          EntitySetName: "accounts",
          PrimaryIdAttribute: "accountid",
          PrimaryNameAttribute: "name",
          Keys: [],
          Attributes: [
            {
              LogicalName: "accountid",
              SchemaName: "AccountId",
              AttributeType: "Uniqueidentifier",
            },
            { LogicalName: "name", SchemaName: "Name", AttributeType: "String" },
          ],
        },
      ],
    }),
} as unknown as MetadataService;

const COMPILER_OPTIONS: ts.CompilerOptions = {
  strict: true,
  target: ts.ScriptTarget.ES2022,
  lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  verbatimModuleSyntax: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  skipLibCheck: true,
  types: [],
};

let outputRoot = "";
let diagnostics: string[] = [];

type Ctor = new () => Executable<unknown>;
async function load(file: string, name: string): Promise<Record<string, unknown> & { ctor: Ctor }> {
  const mod = (await import(pathToFileURL(path.join(outputRoot, "js", file)).href)) as Record<
    string,
    unknown
  >;
  const ctor = mod[name] as Ctor | undefined;
  if (!ctor) throw new Error(`${name} not exported from ${file}`);
  return { ...mod, ctor };
}

beforeAll(async () => {
  await fs.mkdir(scratchRoot, { recursive: true });
  outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  const config: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account"],
    actions: [...CASES.map((c) => `A${c.name}`), "APing", "UpsertMultiple"],
    functions: CASES.map((c) => `F${c.name}`),
    output: { outputRoot: path.join(outputRoot, "ts") },
  };
  const model = new SchemaModel(metadataService, config);
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
    ...COMPILER_OPTIONS,
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

/** Type-check `snippet`, written next to the generated code. */
async function usageDiagnostics(name: string, snippet: string): Promise<string[]> {
  const file = path.join(outputRoot, "ts", name);
  await fs.writeFile(file, snippet, "utf-8");
  try {
    const program = ts.createProgram([file], { ...COMPILER_OPTIONS, noEmit: true });
    return ts.getPreEmitDiagnostics(program).map((d) => {
      const at =
        d.file && d.start !== undefined
          ? d.file.getLineAndCharacterOfPosition(d.start).line + 1
          : 0;
      return `${path.basename(d.file?.fileName ?? "")}(${String(at)}): ${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`;
    });
  } finally {
    await fs.rm(file, { force: true });
  }
}

describe("#300: execute() resolves the returned value", () => {
  it("the generated code type-checks", () => {
    expect(diagnostics).toEqual([]);
  });

  it.each(CASES)("$returnType: functions and actions", async (c) => {
    const { ctor: Fn } = await load(`functions/F${c.name}Function.js`, `F${c.name}Function`);
    const { ctor: Act } = await load(`actions/A${c.name}Action.js`, `A${c.name}Action`);
    for (const [method, op] of [
      ["GET", new Fn()],
      ["POST", new Act()],
    ] as const) {
      const { client, fake } = createTestClient();
      fake.on(method, new RegExp(c.name), () => jsonResponse(responseBody(c)));
      expect(await client.execute(op)).toEqual(c.value);
      if ("noContent" in c) {
        const empty = createTestClient();
        empty.fake.on(method, new RegExp(c.name), () => noContent());
        expect(await empty.client.execute(op)).toEqual(c.noContent);
      }
    }
  });

  it("an operation without a return type resolves undefined", async () => {
    const { ctor: Ping } = await load("actions/APingAction.js", "APingAction");
    const { client, fake } = createTestClient();
    fake.on("POST", /APing/, () => noContent());
    expect(await client.execute(new Ping())).toBeUndefined();
  });
});

describe("#300: the response types say what is returned", () => {
  const EQUAL = `type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
`;

  it("each kind has its exact type, the same for functions and actions", async () => {
    const snippet = `${EQUAL}import type * as G from "./index.js";
export const checks: true[] = [
  {} as Equal<G.FStringFunctionResponse, string>,
  {} as Equal<G.FInt32FunctionResponse, number>,
  {} as Equal<G.FBooleanFunctionResponse, boolean>,
  {} as Equal<G.FGuidFunctionResponse, string>,
  {} as Equal<G.FEnumFunctionResponse, string>,
  {} as Equal<G.FStringsFunctionResponse, string[]>,
  {} as Equal<G.FItemsFunctionResponse, G.Item[]>,
  {} as Equal<G.FInfoFunctionResponse["Count"], number | undefined>,
  {} as Equal<G.FInfoFunctionResponse["@odata.context"], string | undefined>,
  {} as Equal<Extract<G.FAccountFunctionResponse, null>, null>,
  {} as Equal<NonNullable<G.FAccountFunctionResponse>["@odata.etag"], string | undefined>,
  {} as Equal<NonNullable<G.FAccountFunctionResponse>["name"], G.Account["name"]>,
  {} as Equal<NonNullable<G.FRecordFunctionResponse>["@odata.type"], string | undefined>,
  {} as Equal<G.FAccountsFunctionResponse[number]["@odata.etag"], string | undefined>,
  {} as Equal<G.FAccountsFunctionResponse[number]["name"], G.Account["name"]>,
  {} as Equal<G.FRecordsFunctionResponse[number]["@odata.type"], string | undefined>,
${CASES.map((c) => `  {} as Equal<G.A${c.name}ActionResponse, G.F${c.name}FunctionResponse>,`).join("\n")}
  {} as Equal<Awaited<ReturnType<G.APingAction["parseResponse"]>>, void>,
];
`;
    expect(await usageDiagnostics("usage-300-types.ts", snippet)).toEqual([]);
  });

  it("nothing is wrapped in value any more", async () => {
    const snippet = `import type * as G from "./index.js";
declare const s: G.FStringFunctionResponse;
declare const many: G.FAccountsFunctionResponse;
export const a = s.value;
export const b = many.value;
`;
    const errors = (await usageDiagnostics("usage-300-bad.ts", snippet)).join("\n");
    expect(errors).toMatch(/usage-300-bad\.ts\(4\)/);
    expect(errors).toMatch(/usage-300-bad\.ts\(5\)/);
  });
});

describe("NO_CONTENT_OPERATIONS: Dataverse answers 204 although the CSDL declares a return", () => {
  // The listed operation returns mscrm.InfoResponse, as the Info case does
  const info = CASES.find((c) => c.name === "Info");
  if (!info) throw new Error("no Info case");

  it("UpsertMultiple resolves null for a 204, and still reads a body", async () => {
    const { ctor: Act } = await load("actions/UpsertMultipleAction.js", "UpsertMultipleAction");
    const empty = createTestClient();
    empty.fake.on("POST", /UpsertMultiple/, () => noContent());
    expect(await empty.client.execute(new Act())).toBeNull();
    const { client, fake } = createTestClient();
    fake.on("POST", /UpsertMultiple/, () => jsonResponse(responseBody(info)));
    expect(await client.execute(new Act())).toEqual(info.value);
  });

  it("the value is typed <Type> | null, and the doc comment says why", async () => {
    const snippet = `type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
import type * as G from "./index.js";
export const checks: true[] = [
  {} as Equal<Extract<G.UpsertMultipleActionResponse, null>, null>,
  {} as Equal<
    NonNullable<G.UpsertMultipleActionResponse>["@odata.context"],
    string | undefined
  >,
  {} as Equal<NonNullable<G.UpsertMultipleActionResponse>["Count"], number | undefined>,
  // Only the listed operation: the same return type elsewhere isn't nullable
  {} as Equal<Extract<G.AInfoActionResponse, null>, never>,
];
`;
    expect(await usageDiagnostics("usage-no-content-types.ts", snippet)).toEqual([]);
    const source = await fs.readFile(
      path.join(outputRoot, "ts", "actions", "UpsertMultipleAction.ts"),
      "utf-8"
    );
    expect(source).toContain(NO_CONTENT_OPERATIONS.UpsertMultiple.docs);
    expect(source).toContain("if (response.status === 204) return null;");
  });
});
