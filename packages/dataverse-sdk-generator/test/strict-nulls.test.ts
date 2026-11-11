/**
 * #305: `strictNulls` types operation responses exactly as the CSDL declares them. Every complex
 * type an operation returns (directly, nested, or as a base type) gets a `<Name>Output` interface
 * whose properties are all there, `T | null` unless `Nullable="false"`; a return the CSDL leaves
 * nullable adds `| null`. Without the option the output is what it was; parameters never change.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import type { MetadataService } from "../src/metadata-service.js";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "strict-nulls");
const CONTEXT = "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#x";

/**
 * `Detail` is returned (nested in `InfoResponse`) and also taken as a parameter by `AInfo`.
 * `DetailBase` is only reachable as a base type, `Unused` not at all, and `ItemOutput` is a
 * complex type whose name the Output interface of `Item` would otherwise take.
 */
const EDMX = `<?xml version="1.0" encoding="utf-8"?>
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
        <Property Name="Tags" Type="Collection(Edm.String)" Nullable="false" />
        <Property Name="Detail" Type="mscrm.Detail" />
        <Property Name="Details" Type="Collection(mscrm.Detail)" />
        <Property Name="Record" Type="mscrm.account" />
        <Property Name="Mode" Type="mscrm.Mode" />
      </ComplexType>
      <ComplexType Name="DetailBase">
        <Property Name="Code" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="Detail" BaseType="mscrm.DetailBase">
        <Property Name="Note" Type="Edm.String" />
        <Property Name="Weight" Type="Edm.Decimal" Nullable="false" />
        <Property Name="Parent" Type="mscrm.Detail" />
      </ComplexType>
      <ComplexType Name="Item">
        <Property Name="Label" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="ItemOutput">
        <Property Name="Value" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="Unused">
        <Property Name="Value" Type="Edm.String" />
      </ComplexType>
      <EnumType Name="Mode">
        <Member Name="First" Value="1" />
        <Member Name="Second" Value="2" />
      </EnumType>
      <Function Name="FInfo"><ReturnType Type="mscrm.InfoResponse" Nullable="false" /></Function>
      <Function Name="FMaybeInfo"><ReturnType Type="mscrm.InfoResponse" /></Function>
      <Function Name="FString"><ReturnType Type="Edm.String" Nullable="false" /></Function>
      <Function Name="FMaybeString"><ReturnType Type="Edm.String" /></Function>
      <Function Name="FMaybeEnum"><ReturnType Type="mscrm.Mode" /></Function>
      <Function Name="FStrings"><ReturnType Type="Collection(Edm.String)" Nullable="false" /></Function>
      <Function Name="FMaybeStrings"><ReturnType Type="Collection(Edm.String)" /></Function>
      <Function Name="FItems"><ReturnType Type="Collection(mscrm.Item)" Nullable="false" /></Function>
      <Function Name="FAccount"><ReturnType Type="mscrm.account" /></Function>
      <Function Name="FAccounts"><ReturnType Type="Collection(mscrm.account)" /></Function>
      <Action Name="AInfo">
        <Parameter Name="Filter" Type="mscrm.Detail" Nullable="false" />
        <Parameter Name="Extra" Type="mscrm.Unused" />
        <ReturnType Type="mscrm.InfoResponse" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const metadataService = {
  getEdmxMetadata: () => Promise.resolve(EDMX),
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
  isolatedModules: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  skipLibCheck: true,
  types: [],
};

interface Generated {
  root: string;
  /** Every generated file, by path relative to the output root. */
  files: Map<string, string>;
  /** Diagnostics of a `strict` compile of the whole output. */
  diagnostics: string[];
}

let workRoot = "";
const outputs: Record<"unset" | "off" | "on", Generated> = {} as never;

async function generate(name: string, strictNulls: boolean | undefined): Promise<Generated> {
  const root = path.join(workRoot, name);
  const config: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account"],
    output: { outputRoot: path.join(root, "ts") },
    ...(strictNulls === undefined ? {} : { strictNulls }),
  };
  const model = new SchemaModel(metadataService, config);
  await model.generate();
  await new TypescriptGenerator(model, config).generate();

  const entries = await fs.readdir(path.join(root, "ts"), { withFileTypes: true, recursive: true });
  const paths = entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
  const files = new Map<string, string>();
  for (const file of paths.sort()) {
    // Keys with "/" and lines ending "\n" on every OS
    const key = path.relative(path.join(root, "ts"), file).split(path.sep).join("/");
    files.set(key, (await fs.readFile(file, "utf-8")).replace(/\r\n/g, "\n"));
  }
  const program = ts.createProgram(paths, {
    ...COMPILER_OPTIONS,
    rootDir: path.join(root, "ts"),
    outDir: path.join(root, "js"),
  });
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  program.emit();
  await fs.writeFile(path.join(root, "js", "package.json"), '{"type":"module"}');
  return { root, files, diagnostics };
}

beforeAll(async () => {
  await fs.mkdir(scratchRoot, { recursive: true });
  workRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  outputs.unset = await generate("unset", undefined);
  outputs.off = await generate("off", false);
  outputs.on = await generate("on", true);
}, 60_000);

afterAll(async () => {
  if (workRoot) await fs.rm(workRoot, { recursive: true, force: true });
});

/** Type-check `snippet`, written next to one output's generated code. */
async function usageDiagnostics(out: Generated, snippet: string): Promise<string[]> {
  const file = path.join(out.root, "ts", "usage-305.ts");
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

const EQUAL = `type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
`;

type Ctor = new (...args: never[]) => Executable<unknown>;
async function load(out: Generated, file: string, name: string): Promise<Ctor> {
  const mod = (await import(pathToFileURL(path.join(out.root, "js", file)).href)) as Record<
    string,
    unknown
  >;
  const ctor = mod[name] as Ctor | undefined;
  if (!ctor) throw new Error(`${name} not exported from ${file}`);
  return ctor;
}

describe("#305: without strictNulls the output is unchanged", () => {
  it("strictNulls: false writes the same files as leaving it out", () => {
    expect([...outputs.off.files.keys()]).toEqual([...outputs.unset.files.keys()]);
    for (const [file, text] of outputs.unset.files) {
      expect(outputs.off.files.get(file), file).toBe(text);
    }
  });

  it("no Output interface, and the complex types and responses are what they were", () => {
    for (const [file, text] of outputs.unset.files) {
      expect(text, file).not.toMatch(/\b(?:InfoResponse|DetailBase|Detail)Output\b|ItemOutput_\d/);
    }
    expect(outputs.unset.files.get("complextypes/InfoResponse.ts"))
      .toBe(`import type { Account } from "../entities/Account.js";
import type { Mode } from "../enums/Mode.js";
import type { Detail } from "./Detail.js";

/**
 * InfoResponse complex type
 */
export interface InfoResponse {
  Count?: number;
  Detail?: Detail | null;
  Details?: Detail[] | null;
  Label?: string | null;
  Mode?: Mode | null;
  Record?: Account | null;
  Tags?: string[];
}
`);
    expect(outputs.unset.files.get("functions/FMaybeInfoFunction.ts")).toContain(
      "export interface FMaybeInfoFunctionResponse extends InfoResponse {"
    );
    expect(outputs.unset.files.get("functions/FMaybeStringFunction.ts")).toContain(
      "export type FMaybeStringFunctionResponse = string;"
    );
  });

  it("the default types are the loose ones", async () => {
    const snippet = `${EQUAL}import type * as G from "./index.js";
export const checks: true[] = [
  {} as Equal<G.FInfoFunctionResponse["Label"], string | null | undefined>,
  {} as Equal<G.FInfoFunctionResponse["Count"], number | undefined>,
  {} as Equal<G.FMaybeInfoFunctionResponse["Label"], string | null | undefined>,
  {} as Equal<G.FMaybeStringFunctionResponse, string>,
  {} as Equal<G.FMaybeStringsFunctionResponse, string[]>,
  {} as Equal<G.FItemsFunctionResponse, G.Item[]>,
  {} as Equal<Extract<G.FAccountFunctionResponse, null>, null>,
];
`;
    expect(await usageDiagnostics(outputs.unset, snippet)).toEqual([]);
  });

  it("type-checks under strict", () => {
    expect(outputs.unset.diagnostics).toEqual([]);
  });
});

describe("#305: with strictNulls", () => {
  it("type-checks under strict", () => {
    expect(outputs.on.diagnostics).toEqual([]);
  });

  it("each returned complex type gets an Output interface next to the one parameters take", () => {
    expect(outputs.on.files.get("complextypes/Detail.ts"))
      .toBe(`import type { DetailBase, DetailBaseOutput } from "./DetailBase.js";

/**
 * Detail complex type
 */
export interface Detail extends DetailBase {
  Note?: string | null;
  Parent?: Detail | null;
  Weight?: number;
}

/**
 * Detail as an operation returns it (strictNulls): every property is there,
 * and is \`null\` unless the CSDL declares it \`Nullable="false"\`. Parameters take Detail.
 */
export interface DetailOutput extends DetailBaseOutput {
  Note: string | null;
  Parent: DetailOutput | null;
  Weight: number;
}
`);
    // Not returned: no Output interface
    expect(outputs.on.files.get("complextypes/Unused.ts")).toBe(
      outputs.unset.files.get("complextypes/Unused.ts")
    );
    // A name that is taken (the complex type ItemOutput) gets a suffix
    expect(outputs.on.files.get("complextypes/Item.ts")).toContain(
      "export interface ItemOutput_2 {"
    );
    expect(outputs.on.files.get("complextypes/ItemOutput.ts")).toBe(
      outputs.unset.files.get("complextypes/ItemOutput.ts")
    );
  });

  it('a nullable property is T | null, a Nullable="false" one is T, and every one is there', async () => {
    const snippet = `${EQUAL}import type * as G from "./index.js";
type R = G.FInfoFunctionResponse;
type Required<T> = { [K in keyof T]-?: T[K] };
export const checks: true[] = [
  {} as Equal<R["Label"], string | null>,
  {} as Equal<R["Count"], number>,
  {} as Equal<R["Tags"], string[]>,
  {} as Equal<R["Detail"], G.DetailOutput | null>,
  {} as Equal<R["Details"], G.DetailOutput[] | null>,
  {} as Equal<R["Record"], G.Account | null>,
  {} as Equal<R["Mode"], G.Mode | null>,
  {} as Equal<R["@odata.context"], string | undefined>,
  {} as Equal<Omit<R, "@odata.context">, Required<Omit<R, "@odata.context">>>,
  {} as Equal<Extract<R, null>, never>,
  {} as Equal<G.DetailOutput["Code"], string | null>,
  {} as Equal<G.DetailOutput["Weight"], number>,
  {} as Equal<G.DetailOutput["Parent"], G.DetailOutput | null>,
  {} as Equal<G.AInfoActionResponse, G.FInfoFunctionResponse>,
];
`;
    expect(await usageDiagnostics(outputs.on, snippet)).toEqual([]);
  });

  it('a return the CSDL leaves nullable is | null; Nullable="false" and entity returns stay as they were', async () => {
    const snippet = `${EQUAL}import type * as G from "./index.js";
export const checks: true[] = [
  {} as Equal<Extract<G.FMaybeInfoFunctionResponse, null>, null>,
  {} as Equal<NonNullable<G.FMaybeInfoFunctionResponse>["Count"], number>,
  {} as Equal<NonNullable<G.FMaybeInfoFunctionResponse>["Label"], string | null>,
  {} as Equal<G.FStringFunctionResponse, string>,
  {} as Equal<G.FMaybeStringFunctionResponse, string | null>,
  {} as Equal<G.FMaybeEnumFunctionResponse, G.Mode | null>,
  {} as Equal<G.FStringsFunctionResponse, string[]>,
  {} as Equal<G.FMaybeStringsFunctionResponse, Array<string | null>>,
  {} as Equal<G.FItemsFunctionResponse, G.ItemOutput_2[]>,
  {} as Equal<Extract<G.FAccountFunctionResponse, null>, null>,
  {} as Equal<NonNullable<G.FAccountFunctionResponse>["name"], G.Account["name"]>,
  {} as Equal<G.FAccountsFunctionResponse[number]["name"], G.Account["name"]>,
];
`;
    expect(await usageDiagnostics(outputs.on, snippet)).toEqual([]);
  });

  it("entity returns are the same as without the option", () => {
    for (const file of ["functions/FAccountFunction.ts", "functions/FAccountsFunction.ts"]) {
      expect(outputs.on.files.get(file), file).toBe(outputs.unset.files.get(file));
    }
  });

  it("parameters keep the interfaces with optional properties", async () => {
    expect(outputs.on.files.get("actions/AInfoAction.ts")).toContain(
      "export interface AInfoActionParameters {\n  Filter: Detail;\n  Extra?: Unused | null;\n}"
    );
    const snippet = `${EQUAL}import type * as G from "./index.js";
import { AInfoAction } from "./actions/index.js";
export const checks: true[] = [
  {} as Equal<G.AInfoActionParameters["Filter"], G.Detail>,
  {} as Equal<G.Detail["Note"], string | null | undefined>,
];
// A caller sets only what it needs
export const op = new AInfoAction({ Filter: { Note: "n" } });
`;
    expect(await usageDiagnostics(outputs.on, snippet)).toEqual([]);
  });

  it("the values match the types at runtime", async () => {
    const info = {
      Label: null,
      Count: 0,
      Tags: [],
      Detail: null,
      Details: null,
      Record: null,
      Mode: null,
    };
    const FInfo = await load(outputs.on, "functions/FInfoFunction.js", "FInfoFunction");
    const first = createTestClient();
    first.fake.on("GET", /FInfo/, () => jsonResponse({ "@odata.context": CONTEXT, ...info }));
    expect(await first.client.execute(new FInfo())).toEqual({ "@odata.context": CONTEXT, ...info });

    const FMaybeInfo = await load(
      outputs.on,
      "functions/FMaybeInfoFunction.js",
      "FMaybeInfoFunction"
    );
    const empty = createTestClient();
    empty.fake.on("GET", /FMaybeInfo/, () => noContent());
    expect(await empty.client.execute(new FMaybeInfo())).toBeNull();

    const FMaybeString = await load(
      outputs.on,
      "functions/FMaybeStringFunction.js",
      "FMaybeStringFunction"
    );
    for (const response of [
      () => jsonResponse({ "@odata.context": CONTEXT, value: null }),
      () => noContent(),
    ]) {
      const { client, fake } = createTestClient();
      fake.on("GET", /FMaybeString/, response);
      expect(await client.execute(new FMaybeString())).toBeNull();
    }
  });
});
