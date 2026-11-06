/**
 * #96: generated operations take one options object keyed by the CSDL parameter names, instead of
 * positional arguments in CSDL order (`RetrieveEntityFunction(EntityFilters, LogicalName,
 * MetadataId, …)` made swapping LogicalName and MetadataId a silent bug). Required properties
 * follow `Nullable="false"`, undefined ones are left out of the request, the record or entity set
 * of a bound operation is the first argument, and `parseResponse` reads 200 and 204 responses.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { REQUEST_BODY_SOURCE } from "../src/utils/operation-parameters.js";
import * as prettier from "prettier";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const PACKAGES = fileURLToPath(new URL("../../../packages/", import.meta.url));
const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
const GUID = "00000000-0000-0000-0000-000000000001";

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
      </EntityType>
      <EnumType Name="LayerDesiredOrderType">
        <Member Name="Base" Value="0" />
        <Member Name="Top" Value="1" />
      </EnumType>
      <EnumType Name="EntityFilters" IsFlags="true">
        <Member Name="Entity" Value="1" />
        <Member Name="Attributes" Value="2" />
      </EnumType>
      <ComplexType Name="StageSolutionResults">
        <Property Name="StageSolutionUploadId" Type="Edm.Guid" />
      </ComplexType>
      <ComplexType Name="StageSolutionResponse">
        <Property Name="StageSolutionResults" Type="mscrm.StageSolutionResults" />
      </ComplexType>
      <Action Name="ImportSolution">
        <Parameter Name="OverwriteUnmanagedCustomizations" Type="Edm.Boolean" Nullable="false" />
        <Parameter Name="PublishWorkflows" Type="Edm.Boolean" Nullable="false" />
        <Parameter Name="CustomizationFile" Type="Edm.Binary" Nullable="false" />
        <Parameter Name="ImportJobId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="ConvertToManaged" Type="Edm.Boolean" />
        <Parameter Name="LayerDesiredOrder" Type="mscrm.LayerDesiredOrderType" />
        <Parameter Name="TemplateSuffix" Type="Edm.String" />
      </Action>
      <Action Name="StageSolution">
        <Parameter Name="CustomizationFile" Type="Edm.Binary" Nullable="false" />
        <ReturnType Type="mscrm.StageSolutionResponse" Nullable="false" />
      </Action>
      <Action Name="AddToQueue" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="SourceQueueId" Type="Edm.Guid" />
      </Action>
      <Action Name="Recalculate" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
      </Action>
      <Action Name="PublishAll" />
      <Action Name="Configure">
        <Parameter Name="MessageName" Type="Edm.String" />
        <Parameter Name="Verbose" Type="Edm.Boolean" />
      </Action>
      <Function Name="RetrieveEntity">
        <Parameter Name="EntityFilters" Type="mscrm.EntityFilters" Nullable="false" />
        <Parameter Name="LogicalName" Type="Edm.String" />
        <Parameter Name="MetadataId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="RetrieveAsIfPublished" Type="Edm.Boolean" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Function>
      <Function Name="GetDefaults">
        <Parameter Name="Top" Type="Edm.Int32" />
        <ReturnType Type="Edm.String" />
      </Function>
      <Function Name="CalculateRollup" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="FieldName" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Function>
      <Function Name="WhoAmI">
        <ReturnType Type="Edm.String" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

interface Request {
  toRequestInformation(baseUrl: string): { url: string; body?: unknown; method: string };
  parseResponse(response: Response): Promise<unknown>;
}
type Ctor = new (...args: unknown[]) => Request & { Parameters?: unknown; parameters?: unknown };

let out: string;
const read = (path: string) => readFile(join(out, path), "utf8");
const load = async (path: string, name: string): Promise<Ctor> => {
  const mod = (await import(join(out, path))) as Record<string, Ctor | undefined>;
  const value = mod[name];
  if (!value) throw new Error(`${path} doesn't export ${name}`);
  return value;
};
const json = (value: unknown) =>
  new Response(JSON.stringify(value), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
const noContent = () => new Response(null, { status: 204 });

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  out = await mkdtemp(join(OUT_ROOT, ".gen-96-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(out, target, "types"), false, target);
  }
  await generateActions(csdl, join(out, "actions"), false);
  await generateFunctions(csdl, join(out, "functions"), false);
  await generateMessages(csdl, join(out, "messages"), false);
  // The hand-written base classes the generated messages extend (read, not modified)
  for (const file of ["OrganizationRequest.ts", "types.ts"]) {
    await writeFile(
      join(out, "messages", file),
      await readFile(join(PACKAGES, "dataverse-sdk-messages", "src", file))
    );
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(out, { recursive: true, force: true });
});

describe("#96: options-object constructors", () => {
  it("declares a <Class>Parameters interface keyed by the CSDL names, required per Nullable", async () => {
    const code = await read("actions/ImportSolutionAction.ts");
    expect(code).toContain("export interface ImportSolutionActionParameters {");
    expect(code).toContain("  OverwriteUnmanagedCustomizations: boolean;");
    expect(code).toContain("  ImportJobId: string;");
    expect(code).toContain("  ConvertToManaged?: boolean;");
    expect(code).toContain("  LayerDesiredOrder?: LayerDesiredOrderType;");
    expect(code).toContain(
      "constructor(\n    public readonly parameters: ImportSolutionActionParameters,\n  ) {}"
    );
    const fn = await read("functions/RetrieveEntityFunction.ts");
    expect(fn).toContain("export interface RetrieveEntityFunctionParameters {");
    expect(fn).toContain("  LogicalName?: string;");
    expect(fn).toContain("  MetadataId: string;");
    const message = await read("messages/ImportSolutionMessage.ts");
    expect(message).toContain("export interface ImportSolutionRequestParameters {");
    expect(message).toContain(
      "declare readonly Parameters: Readonly<ImportSolutionRequestParameters>;"
    );
  });

  it("an action body has the given properties, by CSDL name, and no undefined ones", async () => {
    const Action = await load("actions/ImportSolutionAction.ts", "ImportSolutionAction");
    const action = new Action({
      CustomizationFile: "UEsDBA==",
      ImportJobId: GUID,
      OverwriteUnmanagedCustomizations: true,
      PublishWorkflows: false,
      TemplateSuffix: undefined,
      LayerDesiredOrder: 1,
    });
    const info = action.toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/ImportSolution`);
    // toStrictEqual: an undefined property would fail it; enums go as member names (#232)
    expect(info.body).toStrictEqual({
      OverwriteUnmanagedCustomizations: true,
      PublishWorkflows: false,
      CustomizationFile: "UEsDBA==",
      ImportJobId: GUID,
      LayerDesiredOrder: "Top",
    });
    expect(Object.keys(info.body as object)).not.toContain("TemplateSuffix");
    expect(action.parameters).toMatchObject({ ImportJobId: GUID });
  });

  it("a message keeps the parameters in Parameters and sends the same body", async () => {
    const Request = await load("messages/ImportSolutionMessage.ts", "ImportSolutionRequest");
    const given = {
      CustomizationFile: "UEsDBA==",
      ImportJobId: GUID,
      OverwriteUnmanagedCustomizations: false,
      PublishWorkflows: true,
      ConvertToManaged: undefined,
    };
    const request = new Request(given) as Request & {
      Parameters: Record<string, unknown>;
      messageName: string;
    };
    expect(request.messageName).toBe("ImportSolution");
    expect(request.Parameters).toEqual(given);
    // A copy: changing the caller's object later doesn't change the request
    given.ImportJobId = "changed";
    expect(request.Parameters.ImportJobId).toBe(GUID);
    expect(request.toRequestInformation(BASE).body).toStrictEqual({
      OverwriteUnmanagedCustomizations: false,
      PublishWorkflows: true,
      CustomizationFile: "UEsDBA==",
      ImportJobId: GUID,
    });
  });

  it("a MessageName parameter is a property, so it follows Nullable and leaves messageName alone", async () => {
    const code = await read("messages/ConfigureMessage.ts");
    expect(code).toContain("  MessageName?: string;");
    const Request = await load("messages/ConfigureMessage.ts", "ConfigureRequest");
    const request = new Request({ MessageName: "Create" }) as Request & { messageName: string };
    expect(request.messageName).toBe("Configure");
    expect(request.toRequestInformation(BASE).body).toStrictEqual({ MessageName: "Create" });
    expect(new Request().toRequestInformation(BASE).body).toStrictEqual({});
  });

  it("a bound operation takes the record id first, then the parameters", async () => {
    const Action = await load("actions/AddToQueueAction.ts", "AddToQueueAction");
    const target = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: GUID };
    const info = new Action(GUID, { Target: target }).toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/accounts(${GUID})/Microsoft.Dynamics.CRM.AddToQueue`);
    expect(info.body).toStrictEqual({ Target: target });
    expect(await read("actions/AddToQueueAction.ts")).toContain(
      " * The first argument is the id of the account record to call it on."
    );
    const Request = await load("messages/AddToQueueMessage.ts", "AddToQueueRequest");
    expect(new Request(GUID, { Target: target }).toRequestInformation(BASE).body).toStrictEqual({
      Target: target,
    });
    const Fn = await load("functions/CalculateRollupFunction.ts", "CalculateRollupFunction");
    expect(
      decodeURIComponent(new Fn(GUID, { FieldName: "revenue" }).toRequestInformation(BASE).url)
    ).toBe(
      `${BASE}/accounts(${GUID})/Microsoft.Dynamics.CRM.CalculateRollup(FieldName=@p1)?@p1='revenue'`
    );
  });

  it("a function leaves undefined parameters out of the URL aliases", async () => {
    const Fn = await load("functions/RetrieveEntityFunction.ts", "RetrieveEntityFunction");
    const url = new Fn({
      EntityFilters: "Attributes",
      LogicalName: undefined,
      MetadataId: GUID,
      RetrieveAsIfPublished: false,
    }).toRequestInformation(BASE).url;
    expect(decodeURIComponent(url)).toBe(
      `${BASE}/RetrieveEntity(EntityFilters=@p1,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'Attributes'&@p3=${GUID}&@p4=false`
    );
  });

  it("an operation with only optional parameters can be called without arguments", async () => {
    const Fn = await load("functions/GetDefaultsFunction.ts", "GetDefaultsFunction");
    expect(new Fn().toRequestInformation(BASE).url).toBe(`${BASE}/GetDefaults`);
    expect(new Fn({ Top: 5 }).toRequestInformation(BASE).url).toBe(
      `${BASE}/GetDefaults(Top=@p1)?%40p1=5`
    );
    expect(await read("functions/GetDefaultsFunction.ts")).toContain(
      "public readonly parameters: GetDefaultsFunctionParameters = {},"
    );
  });

  it("an operation without parameters has no parameters interface or argument", async () => {
    const publishAll = await read("actions/PublishAllAction.ts");
    expect(publishAll).not.toContain("Parameters");
    expect(publishAll).not.toContain("constructor");
    expect(await read("functions/WhoAmIFunction.ts")).not.toContain("constructor");
    const recalculate = await read("actions/RecalculateAction.ts");
    expect(recalculate).toContain("constructor(\n    public readonly accountId: string,\n  ) {}");
    expect(recalculate).not.toContain("requestBody");
  });

  it("parseResponse returns the JSON body for 200 and an empty result for 204", async () => {
    const Stage = await load("actions/StageSolutionAction.ts", "StageSolutionAction");
    const stage = new Stage({ CustomizationFile: "UEsDBA==" });
    const results = { StageSolutionResults: { StageSolutionUploadId: GUID } };
    expect(await stage.parseResponse(json(results))).toEqual(results);
    expect(await stage.parseResponse(noContent())).toEqual({});
    const Import = await load("actions/ImportSolutionAction.ts", "ImportSolutionAction");
    const imp = new Import({
      CustomizationFile: "x",
      ImportJobId: GUID,
      OverwriteUnmanagedCustomizations: true,
      PublishWorkflows: true,
    });
    expect(await imp.parseResponse(noContent())).toEqual({});
    expect(await imp.parseResponse(json({ ok: true }))).toEqual({ ok: true });
    const Fn = await load("functions/WhoAmIFunction.ts", "WhoAmIFunction");
    expect(await new Fn().parseResponse(json({ value: "me" }))).toEqual({ value: "me" });
    const Request = await load("messages/StageSolutionMessage.ts", "StageSolutionRequest");
    const request = new Request({ CustomizationFile: "UEsDBA==" });
    expect(await request.parseResponse(json(results))).toMatchObject({ result: results });
    expect(await request.parseResponse(noContent())).toMatchObject({ result: {} });
  });

  it("each index exports the parameters interfaces", async () => {
    expect(await read("actions/index.ts")).toContain(
      "export { ImportSolutionAction, type ImportSolutionActionParameters, type ImportSolutionResponse } from './ImportSolutionAction.js';"
    );
    expect(await read("actions/index.ts")).toContain(
      "export { PublishAllAction, type PublishAllResponse } from './PublishAllAction.js';"
    );
    expect(await read("functions/index.ts")).toContain(
      "export { RetrieveEntityFunction, type RetrieveEntityFunctionParameters, type RetrieveEntityResponse } from './RetrieveEntityFunction.js';"
    );
    expect(await read("messages/index.ts")).toContain(
      "export { ImportSolutionRequest, type ImportSolutionRequestParameters, ImportSolutionResponse } from './ImportSolutionMessage.js';"
    );
  });

  it("required properties are required, optional ones optional, and positional calls don't compile", async () => {
    const ok = await typecheck(
      join(out, "functions"),
      "usage-96-ok.ts",
      `import { RetrieveEntityFunction, GetDefaultsFunction, WhoAmIFunction, CalculateRollupFunction, EntityFilters } from "./index.js";
import type { RetrieveEntityFunctionParameters } from "./index.js";
const parameters: RetrieveEntityFunctionParameters = {
  EntityFilters: EntityFilters.Entity,
  MetadataId: "${GUID}",
  RetrieveAsIfPublished: false,
};
new RetrieveEntityFunction(parameters);
new RetrieveEntityFunction({ ...parameters, LogicalName: "account" });
new GetDefaultsFunction();
new WhoAmIFunction();
new CalculateRollupFunction("${GUID}", { FieldName: "revenue" });
`
    );
    expect(ok).toEqual([]);
    const bad = await typecheck(
      join(out, "functions"),
      "usage-96-bad.ts",
      `import { RetrieveEntityFunction, CalculateRollupFunction } from "./index.js";
new RetrieveEntityFunction({ EntityFilters: "Entity", RetrieveAsIfPublished: false });
new RetrieveEntityFunction({ EntityFilters: "Entity", MetadataId: "x", RetrieveAsIfPublished: false, LogicalNam: "a" });
new RetrieveEntityFunction("Entity", "account", "${GUID}", false);
new CalculateRollupFunction({ FieldName: "revenue" });
`
    );
    const lines = bad.join("\n");
    for (const line of [2, 3, 4, 5])
      expect(lines).toMatch(new RegExp(`usage-96-bad\\.ts\\(${String(line)}\\)`));
  }, 60_000);
});

/**
 * The committed packages were ported to options objects by a script, not regenerated (the live
 * org's $metadata has drifted from the snapshot they came from). These operations, cut from a live
 * $metadata into `fixtures/operations-metadata.xml`, must regenerate to the committed files byte for
 * byte (after prettier, as committed).
 */
describe("#96: the committed packages", () => {
  const FILES = {
    actions: [
      "ImportSolutionAction",
      "CreateMultipleAction",
      "MergeAction",
      "ExecuteWorkflowAction",
    ],
    functions: [
      "RetrieveEntityFunction",
      "WhoAmIFunction",
      "RetrievePrincipalAccess_teamFunction",
      "RetrievePrincipalAccess_systemuserFunction",
    ],
    messages: [
      "ImportSolutionMessage",
      "CreateMultipleMessage",
      "MergeMessage",
      "ExecuteWorkflowMessage",
    ],
  };
  let live: string;

  beforeAll(async () => {
    live = await mkdtemp(join(OUT_ROOT, ".gen-96-live-"));
    const xml = await readFile(
      new URL("./fixtures/operations-metadata.xml", import.meta.url),
      "utf8"
    );
    const csdl = parseEdmx(xml);
    await generateActions(csdl, join(live, "actions"), false);
    await generateFunctions(csdl, join(live, "functions"), false);
    await generateMessages(csdl, join(live, "messages"), false);
  });

  afterAll(async () => {
    await rm(live, { recursive: true, force: true });
  });

  it.each(Object.entries(FILES).flatMap(([pkg, names]) => names.map((name) => [pkg, name])))(
    "%s/%s.ts is what the generator writes",
    async (pkg, name) => {
      const committedPath = join(PACKAGES, `dataverse-sdk-${pkg}`, "src", `${name}.ts`);
      const options = await prettier.resolveConfig(committedPath);
      const raw = await readFile(join(live, pkg, `${name}.ts`), "utf8");
      const generated = await prettier.format(raw, { ...options, filepath: committedPath });
      expect(generated).toBe(await readFile(committedPath, "utf8"));
    }
  );

  it("ship the requestBody helper exactly as the generator writes it", async () => {
    for (const pkg of ["actions", "messages"]) {
      const committed = await readFile(
        join(PACKAGES, `dataverse-sdk-${pkg}`, "src", "internal", "requestBody.ts"),
        "utf8"
      );
      expect(committed, pkg).toBe(REQUEST_BODY_SOURCE);
    }
  });
});
