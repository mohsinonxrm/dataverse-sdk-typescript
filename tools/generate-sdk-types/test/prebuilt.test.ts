/**
 * #304: the prebuilt actions, functions and messages packages hold the platform, Sales and
 * Customer Service operations only, chosen by solution membership. The snapshot records each
 * operation's solutions (`operation-solutions.json`), `prebuilt-solutions.json` says which
 * solutions are prebuilt, and `regen` generates only the operations of those solutions (and the
 * types they reach). Everything else (Contact Center, Field Service, Customer Insights - Journeys,
 * …) is left to dataverse-gen.
 */
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { generateFromCsdl } from "../src/index.js";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import {
  checkPrebuiltFilter,
  isPrebuilt,
  type PrebuiltFilter,
  type PrebuiltSolutions,
  reachableTypes,
  renderSolutionBlocks,
  renderSolutionTable,
  selectPrebuilt,
} from "../src/prebuilt.js";
import {
  type OperationSolutions,
  operationSolutionsFrom,
  serializeOperationSolutions,
  type SolutionData,
} from "../src/solutions.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const METADATA = fileURLToPath(new URL("../metadata/", import.meta.url));
const ROOT = fileURLToPath(new URL("../../../", import.meta.url));

/**
 * - `WhoAmI`: platform (`System`);
 * - `CCaaS_GetAgents`: Contact Center only, with a response type and an enum nothing else uses;
 * - `msdyn_Shared`: in a Contact Center and a Sales solution (multi-solution: prebuilt);
 * - `msdyn_JourneyOnly`: in a Contact Center and a Journeys solution (multi-solution: not);
 * - `LastXDays`: a query function with no solution (platform);
 * - `RetrieveTotal`: overloaded, Sales; its parameter is a polymorphic base type.
 */
const EDMX = `<?xml version="1.0" encoding="utf-8"?><edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
<EntityType Name="crmbaseentity" Abstract="true" />
<EntityType Name="account" BaseType="mscrm.crmbaseentity"><Key><PropertyRef Name="accountid" /></Key><Property Name="accountid" Type="Edm.Guid" /></EntityType>
<EntityType Name="msdyn_ocliveworkitem" BaseType="mscrm.crmbaseentity"><Key><PropertyRef Name="activityid" /></Key><Property Name="activityid" Type="Edm.Guid" /></EntityType>
<ComplexType Name="WhoAmIResponse"><Property Name="UserId" Type="Edm.Guid" Nullable="false" /></ComplexType>
<ComplexType Name="CCaaS_GetAgentsResponse"><Property Name="Agents" Type="Collection(mscrm.CCaaS_Agent)" /></ComplexType>
<ComplexType Name="CCaaS_Agent"><Property Name="Presence" Type="mscrm.CCaaS_Presence" /></ComplexType>
<ComplexType Name="QueryBase" Abstract="true"><Property Name="EntityName" Type="Edm.String" /></ComplexType>
<ComplexType Name="QueryExpression" BaseType="mscrm.QueryBase"><Property Name="Operator" Type="mscrm.ConditionOperator" /></ComplexType>
<ComplexType Name="FetchExpression" BaseType="mscrm.QueryBase"><Property Name="Query" Type="Edm.String" /></ComplexType>
<EnumType Name="CCaaS_Presence"><Member Name="Available" Value="0" /><Member Name="Busy" Value="1" /></EnumType>
<EnumType Name="ConditionOperator"><Member Name="Equal" Value="0" /></EnumType>
<EnumType Name="Unused"><Member Name="A" Value="0" /></EnumType>
<Function Name="WhoAmI"><ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" /></Function>
<Function Name="CCaaS_GetAgents"><Parameter Name="ApiVersion" Type="Edm.String" Nullable="false" /><ReturnType Type="mscrm.CCaaS_GetAgentsResponse" Nullable="false" /></Function>
<Function Name="LastXDays"><Parameter Name="PropertyName" Type="Edm.String" Nullable="false" /><Parameter Name="PropertyValue" Type="Edm.Int32" Nullable="false" /><ReturnType Type="Edm.Boolean" Nullable="false" /></Function>
<Function Name="RetrieveTotal" IsBound="true"><Parameter Name="entity" Type="mscrm.account" Nullable="false" /><Parameter Name="Query" Type="mscrm.QueryBase" Nullable="false" /><ReturnType Type="Edm.Int32" /></Function>
<Function Name="RetrieveTotal" IsBound="true"><Parameter Name="entity" Type="mscrm.msdyn_ocliveworkitem" Nullable="false" /><ReturnType Type="Edm.Int32" /></Function>
<Action Name="msdyn_Shared"><Parameter Name="Target" Type="mscrm.account" Nullable="false" /></Action>
<Action Name="msdyn_JourneyOnly"><Parameter Name="Target" Type="mscrm.msdyn_ocliveworkitem" Nullable="false" /></Action>
<EntityContainer Name="System"><EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" /><EntitySet Name="msdyn_ocliveworkitems" EntityType="Microsoft.Dynamics.CRM.msdyn_ocliveworkitem" /></EntityContainer>
</Schema></edmx:DataServices></edmx:Edmx>`;

const OPERATION_SOLUTIONS: OperationSolutions = {
  CCaaS_GetAgents: ["msdyn_OmnichannelCCaaSAPI"],
  LastXDays: [],
  RetrieveTotal: ["msdynce_Sales"],
  WhoAmI: ["System"],
  msdyn_JourneyOnly: ["DynamicsMKT_Consent", "msdyn_OmnichannelCCaaSAPI"],
  msdyn_Shared: ["msdyn_OmnichannelCCaaSAPI", "msdynce_Sales"],
};

const PREBUILT: PrebuiltSolutions = {
  solutions: {
    System: { app: "Platform", prebuilt: true },
    msdynce_Sales: { app: "Sales", prebuilt: true },
    msdyn_OmnichannelCCaaSAPI: { app: "Contact Center", prebuilt: false },
    DynamicsMKT_Consent: { app: "Customer Insights - Journeys", prebuilt: false, note: "a | b" },
  },
};

const FILTER: PrebuiltFilter = { operationSolutions: OPERATION_SOLUTIONS, prebuilt: PREBUILT };

describe("isPrebuilt (#304)", () => {
  it("keeps an operation with no solution or with a prebuilt one", () => {
    expect(isPrebuilt([], PREBUILT)).toBe(true);
    expect(isPrebuilt(["System"], PREBUILT)).toBe(true);
    expect(isPrebuilt(["msdyn_OmnichannelCCaaSAPI", "msdynce_Sales"], PREBUILT)).toBe(true);
    expect(isPrebuilt(["msdyn_OmnichannelCCaaSAPI"], PREBUILT)).toBe(false);
    expect(isPrebuilt(["DynamicsMKT_Consent", "msdyn_OmnichannelCCaaSAPI"], PREBUILT)).toBe(false);
  });
});

describe("selectPrebuilt (#304)", () => {
  const csdl = parseEdmx(EDMX);
  const selection = selectPrebuilt(csdl, FILTER);

  it("keeps the platform, Sales and no-solution operations, and leaves out the others", () => {
    expect(selection.included).toEqual(["LastXDays", "RetrieveTotal", "WhoAmI", "msdyn_Shared"]);
    expect(selection.excluded).toEqual(["CCaaS_GetAgents", "msdyn_JourneyOnly"]);
    // Both overloads of a kept name stay
    expect(selection.csdl.functions.filter((f) => f.name === "RetrieveTotal")).toHaveLength(2);
    expect(selection.csdl.actions.map((a) => a.name)).toEqual(["msdyn_Shared"]);
  });

  it("drops the types only excluded operations reach, and keeps derived types of a kept base", () => {
    const complex = selection.csdl.complexTypes.map((t) => t.name).sort();
    expect(complex).toEqual(["FetchExpression", "QueryBase", "QueryExpression", "WhoAmIResponse"]);
    // ConditionOperator through QueryExpression, a type derived from the parameter's QueryBase
    expect(selection.csdl.enumTypes.map((t) => t.name)).toEqual(["ConditionOperator"]);
    // msdyn_ocliveworkitem: the binding of a kept RetrieveTotal overload
    expect(selection.csdl.entityTypes.map((t) => t.name).sort()).toEqual([
      "account",
      "crmbaseentity",
      "msdyn_ocliveworkitem",
    ]);
    // The entity sets are the whole snapshot's
    expect(selection.csdl.entityContainer).toEqual(csdl.entityContainer);
  });

  it("follows Complex* names to the types the generators use instead", () => {
    const xml = EDMX.replace(
      `<Function Name="WhoAmI">`,
      `<ComplexType Name="ComplexEntityMetadata"><Property Name="X" Type="Edm.String" /></ComplexType><EntityType Name="EntityMetadata"><Property Name="Y" Type="mscrm.ConditionOperator" /></EntityType><Action Name="CreateEntity"><Parameter Name="Entity" Type="mscrm.ComplexEntityMetadata" /></Action><Function Name="WhoAmI">`
    );
    const reached = reachableTypes(parseEdmx(xml), parseEdmx(xml).actions);
    expect([...reached].sort()).toEqual(
      expect.arrayContaining(["ComplexEntityMetadata", "ConditionOperator", "EntityMetadata"])
    );
  });

  it("refuses an operation with no recorded solutions, unless it's a platform one", () => {
    const { LastXDays: _, ...withoutLastXDays } = OPERATION_SOLUTIONS;
    const filter = { ...FILTER, operationSolutions: withoutLastXDays };
    expect(() => selectPrebuilt(csdl, filter)).toThrow(/no solutions recorded for LastXDays/);
    expect(selectPrebuilt(csdl, { ...filter, platform: ["LastXDays"] }).included).toContain(
      "LastXDays"
    );
  });

  it("refuses an unclassified solution and a classified solution no operation names", () => {
    const names = Object.keys(OPERATION_SOLUTIONS);
    const { DynamicsMKT_Consent: _, ...rest } = PREBUILT.solutions;
    expect(() => checkPrebuiltFilter({ ...FILTER, prebuilt: { solutions: rest } }, names)).toThrow(
      /classify DynamicsMKT_Consent/
    );
    const extra = { ...PREBUILT.solutions, msdyn_Gone: { app: "Sales", prebuilt: true } };
    expect(() => checkPrebuiltFilter({ ...FILTER, prebuilt: { solutions: extra } }, names)).toThrow(
      /no operation is in msdyn_Gone/
    );
  });
});

/** Every file under `dir` with its content, by path relative to `dir`. */
async function tree(dir: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const entry of await readdir(dir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const path = join(entry.parentPath, entry.name);
    out[relative(dir, path)] = await readFile(path, "utf8");
  }
  return out;
}

const dirs: string[] = [];
async function generate(filter?: PrebuiltFilter): Promise<Record<string, string>> {
  const dir = await mkdtemp(join(OUT_ROOT, ".gen-prebuilt-"));
  dirs.push(dir);
  const out = (kind: string) => ({ enabled: true, outputPath: join(dir, kind) });
  await generateFromCsdl(
    EDMX,
    { actions: out("actions"), functions: out("functions"), messages: out("messages") },
    ["actions", "functions", "messages"],
    { purge: true, prebuilt: filter }
  );
  return tree(dir);
}

beforeAll(() => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
});

afterAll(async () => {
  vi.restoreAllMocks();
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

describe("generateFromCsdl with the prebuilt filter (#304)", () => {
  it("writes only the prebuilt operations and the types they use", async () => {
    const files = await generate(FILTER);
    const names = Object.keys(files);
    expect(names).toContain("functions/WhoAmIFunction.ts");
    expect(names).toContain("functions/LastXDaysFunction.ts");
    expect(names).toContain("actions/msdyn_SharedAction.ts");
    expect(names).toContain("messages/msdyn_SharedMessage.ts");
    // Supplemental operations are platform
    expect(names).toContain("actions/ExportToExcelAction.ts");
    expect(names.filter((n) => /CCaaS|JourneyOnly/.test(n))).toEqual([]);
    expect(names).not.toContain("functions/types/CCaaS_Presence.ts");
    expect(names).not.toContain("functions/types/Unused.ts");
    expect(names).toContain("functions/types/ConditionOperator.ts");
    expect(files["functions/index.ts"]).not.toMatch(/CCaaS_|Unused/);
    expect(files["functions/index.ts"]).toMatch(/\bConditionOperator\b/);
  });

  it("writes every operation without it, and the same files from any key order", async () => {
    const all = Object.keys(await generate());
    expect(all).toContain("functions/CCaaS_GetAgentsFunction.ts");
    expect(all).toContain("functions/types/CCaaS_Presence.ts");
    const reversed: OperationSolutions = Object.fromEntries(
      Object.entries(OPERATION_SOLUTIONS).reverse()
    );
    expect(await generate({ ...FILTER, operationSolutions: reversed })).toEqual(
      await generate(FILTER)
    );
  });
});

describe("operationSolutionsFrom (#304)", () => {
  const managed = (id: string, uniquename: string, publisher = "MicrosoftCorporation") => ({
    solutionid: id,
    uniquename,
    ismanaged: true,
    publisherid: { uniquename: publisher },
  });
  const data: SolutionData = {
    customApiComponentType: 10038,
    solutions: [
      managed("s-system", "System"),
      managed("s-sales", "msdynce_SalesPatch201904"),
      managed("s-cc", "msdyn_OmnichannelCCaaSAPI", "microsoftdynamics"),
      managed("s-wf", "msdynce_Marketing"),
      managed("s-isv", "contoso_Isv", "contoso"),
      { solutionid: "s-default", uniquename: "Default", ismanaged: false, publisherid: null },
      { solutionid: "s-own", uniquename: "MyOrgSolution", ismanaged: false },
    ],
    requests: [
      // The Web API name is the request's, not the message's (WinOpportunity -> Win)
      { name: "WinOpportunity", sdkmessageid: "m-win" },
      { name: "CCaaS_GetAgents", sdkmessageid: "m-cc" },
      { name: "CopyCampaign", sdkmessageid: "m-wf" },
      { name: "new_OrgApi", sdkmessageid: "m-org" },
      { name: "Bare", sdkmessageid: "m-bare" },
    ],
    customApis: [
      { customapiid: "c-cc", _sdkmessageid_value: "m-cc" },
      { customapiid: "c-org", _sdkmessageid_value: "m-org" },
    ],
    workflows: [{ workflowid: "w-wf", _sdkmessageid_value: "m-wf" }],
    components: [
      { objectid: "m-win", componenttype: 201, _solutionid_value: "s-system" },
      { objectid: "m-win", componenttype: 201, _solutionid_value: "s-sales" },
      { objectid: "m-win", componenttype: 201, _solutionid_value: "s-default" },
      { objectid: "c-cc", componenttype: 10038, _solutionid_value: "s-cc" },
      { objectid: "c-cc", componenttype: 10038, _solutionid_value: "s-isv" },
      { objectid: "w-wf", componenttype: 29, _solutionid_value: "s-wf" },
      { objectid: "c-org", componenttype: 10038, _solutionid_value: "s-own" },
    ],
  };

  it("joins requests, messages, custom APIs and workflows to Microsoft-managed solutions", () => {
    expect(
      operationSolutionsFrom(data, ["winopportunity", "CCaaS_GetAgents", "CopyCampaign", "Bare"])
    ).toEqual({
      Bare: [],
      CCaaS_GetAgents: ["msdyn_OmnichannelCCaaSAPI"],
      CopyCampaign: ["msdynce_Marketing"],
      winopportunity: ["System", "msdynce_SalesPatch201904"],
    });
    // A query function has no SDK message at all
    expect(operationSolutionsFrom(data, ["LastXDays"])).toEqual({ LastXDays: [] });
  });

  it("refuses an operation only org-specific solutions name", () => {
    expect(() => operationSolutionsFrom(data, ["new_OrgApi"])).toThrow(
      /only in org-specific solutions: new_OrgApi/
    );
  });

  it("serializes sorted, whatever the input order", () => {
    const text = serializeOperationSolutions({ b: ["y"], a: [] });
    expect(text).toBe(`{\n  "a": [],\n  "b": [\n    "y"\n  ]\n}\n`);
  });
});

describe("renderSolutionTable (#304)", () => {
  it("lists every solution with its app, operation count and decision, prebuilt first", () => {
    const table = renderSolutionTable(FILTER).split("\n");
    expect(table.slice(2)).toEqual([
      "| _(none: built into the Web API)_ | Platform | 1 | yes | |",
      "| `System` | Platform | 1 | yes | |",
      "| `msdynce_Sales` | Sales | 2 | yes | |",
      "| `msdyn_OmnichannelCCaaSAPI` | Contact Center | 3 | no | |",
      "| `DynamicsMKT_Consent` | Customer Insights - Journeys | 1 | no | a \\| b |",
    ]);
    expect(renderSolutionBlocks("x\n<!-- solutions -->\nold\n<!-- /solutions -->\n", FILTER)).toBe(
      `x\n<!-- solutions -->\n\n${renderSolutionTable(FILTER)}\n\n<!-- /solutions -->\n`
    );
  });
});

describe("the committed solution data (#304)", () => {
  const xml = readFileSync(join(METADATA, "dataverse-metadata.xml"), "utf8");
  const text = readFileSync(join(METADATA, "operation-solutions.json"), "utf8");
  const operationSolutions = JSON.parse(text) as OperationSolutions;
  const prebuilt = JSON.parse(
    readFileSync(join(METADATA, "prebuilt-solutions.json"), "utf8")
  ) as PrebuiltSolutions;
  const csdl = parseEdmx(xml);
  const names = new Set([...csdl.actions, ...csdl.functions].map((op) => op.name));

  it("records the solutions of exactly the snapshot's operations, sorted", () => {
    expect(Object.keys(operationSolutions).sort()).toEqual([...names].sort());
    expect(JSON.parse(serializeOperationSolutions(operationSolutions))).toEqual(operationSolutions);
    expect(Object.keys(operationSolutions)).toEqual(Object.keys(operationSolutions).sort());
    for (const list of Object.values(operationSolutions)) expect(list).toEqual([...list].sort());
  });

  it("names no org: only Microsoft-managed solutions, no ids, no unmanaged solutions", () => {
    expect(text).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const solutions = new Set(Object.values(operationSolutions).flat());
    for (const unmanaged of ["Default", "Active", "Basic"]) expect(solutions).not.toContain(unmanaged);
    // Every name is classified, so each was reviewed as a Microsoft solution
    checkPrebuiltFilter({ operationSolutions, prebuilt, platform: ["ExportToExcel"] }, names);
  });

  it("puts WinOpportunity and CloseIncident in, and Contact Center and Journeys out", () => {
    const filter = { operationSolutions, prebuilt, platform: ["ExportToExcel"] };
    const { included, excluded } = selectPrebuilt(csdl, filter);
    for (const op of ["WhoAmI", "WinOpportunity", "CloseIncident", "QualifyLead", "LastXDays"]) {
      expect(included).toContain(op);
    }
    for (const op of ["CCaaS_GetAgents", "msdynmkt_checkconsent", "msdyn_BookRequirementGroup"]) {
      expect(excluded).toContain(op);
    }
  });

  it("has the solution table in metadata/README.md up to date", async () => {
    const path = join(METADATA, "README.md");
    const readme = readFileSync(path, "utf8");
    expect(readme).toContain("<!-- solutions -->");
    // As regen writes it: rendered, then formatted
    const rendered = await prettier.format(
      renderSolutionBlocks(readme, { operationSolutions, prebuilt }),
      { ...(await prettier.resolveConfig(path)), filepath: path }
    );
    expect(rendered).toBe(readme);
  });

  it("is what the committed packages hold", () => {
    const { excluded } = selectPrebuilt(csdl, {
      operationSolutions,
      prebuilt,
      platform: ["ExportToExcel"],
    });
    const src = (pkg: string, file: string) =>
      join(ROOT, "packages", `dataverse-sdk-${pkg}`, "src", file);
    expect(existsSync(src("actions", "WinOpportunityAction.ts"))).toBe(true);
    expect(existsSync(src("functions", "WhoAmIFunction.ts"))).toBe(true);
    for (const op of excluded) {
      expect(existsSync(src("actions", `${op}Action.ts`))).toBe(false);
      expect(existsSync(src("functions", `${op}Function.ts`))).toBe(false);
      expect(existsSync(src("messages", `${op}Message.ts`))).toBe(false);
    }
  });
});
