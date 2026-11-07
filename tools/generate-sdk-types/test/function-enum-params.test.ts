/**
 * #358: a complex or collection function parameter is JSON in a parameter alias, and Dataverse
 * reads an enum member in it only by name (as in action bodies, #232). The generated functions
 * wrote it with `JSON.stringify`, so `ConditionOperator: MetadataConditionOperator.Equals` went
 * out as `0` and `TimeCodes: [TimeCode.Available]` as `[0]`. They now pass it through the
 * functions package's own `internal/enumBody.ts`, then `formatParameterAlias`.
 */
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { typecheck } from "./typecheck.js";

/** Inside this package, so the generated code's import of dataverse-sdk-core resolves. */
const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EnumType Name="LogicalOperator">
        <Member Name="And" Value="0" />
        <Member Name="Or" Value="1" />
      </EnumType>
      <EnumType Name="MetadataConditionOperator">
        <Member Name="Equals" Value="0" />
        <Member Name="NotEquals" Value="1" />
      </EnumType>
      <EnumType Name="TimeCode">
        <Member Name="Available" Value="0" />
        <Member Name="Busy" Value="1" />
      </EnumType>
      <EnumType Name="EntityFilters" IsFlags="true">
        <Member Name="Entity" Value="1" />
        <Member Name="Attributes" Value="2" />
      </EnumType>
      <EnumType Name="ActionOnly">
        <Member Name="A" Value="0" />
      </EnumType>
      <ComplexType Name="Object">
        <Property Name="Type" Type="Edm.String" Nullable="false" />
        <Property Name="Value" Type="Edm.String" Nullable="false" />
      </ComplexType>
      <ComplexType Name="MetadataConditionExpression">
        <Property Name="ConditionOperator" Type="mscrm.MetadataConditionOperator" />
        <Property Name="PropertyName" Type="Edm.String" />
        <Property Name="Value" Type="mscrm.Object" />
      </ComplexType>
      <ComplexType Name="MetadataFilterExpression">
        <Property Name="Conditions" Type="Collection(mscrm.MetadataConditionExpression)" />
        <Property Name="FilterOperator" Type="mscrm.LogicalOperator" />
        <Property Name="Filters" Type="Collection(mscrm.MetadataFilterExpression)" />
      </ComplexType>
      <ComplexType Name="EntityQueryExpression">
        <Property Name="Criteria" Type="mscrm.MetadataFilterExpression" />
      </ComplexType>
      <ComplexType Name="PagingInfo">
        <Property Name="Count" Type="Edm.Int32" />
      </ComplexType>
      <ComplexType Name="ActionOnlyHolder">
        <Property Name="Value" Type="mscrm.ActionOnly" />
      </ComplexType>
      <ComplexType Name="QueryScheduleResponse">
        <Property Name="Ok" Type="Edm.Boolean" />
      </ComplexType>
      <Function Name="RetrieveMetadataChanges">
        <Parameter Name="Query" Type="mscrm.EntityQueryExpression" />
        <Parameter Name="EntityFilters" Type="mscrm.EntityFilters" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
      <Function Name="QuerySchedule">
        <Parameter Name="ResourceId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="TimeCodes" Type="Collection(mscrm.TimeCode)" Nullable="false" />
        <ReturnType Type="mscrm.QueryScheduleResponse" Nullable="false" />
      </Function>
      <Function Name="Page">
        <Parameter Name="PagingInfo" Type="mscrm.PagingInfo" Nullable="false" />
        <Parameter Name="Names" Type="Collection(Edm.String)" Nullable="false" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
      <Action Name="UsesActionOnly">
        <Parameter Name="Holder" Type="mscrm.ActionOnlyHolder" Nullable="false" />
      </Action>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
const GUID = "00000000-0000-0000-0000-000000000001";

let out: string;
const read = (path: string): Promise<string> => readFile(join(out, path), "utf8");
type Fn = new (...args: unknown[]) => { toRequestInformation(baseUrl: string): { url: string } };
async function load(name: string): Promise<Fn> {
  const mod = (await import(join(out, `${name}.ts`))) as Record<string, Fn | undefined>;
  const value = mod[name];
  if (!value) throw new Error(`${name} isn't exported`);
  return value;
}
/** The decoded parameter-alias values of a function's URL. */
function aliases(fn: InstanceType<Fn>): Record<string, string | null> {
  const params = new URL(fn.toRequestInformation(BASE).url).searchParams;
  return Object.fromEntries([...params.keys()].map((k) => [k, params.get(k)]));
}

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  out = await mkdtemp(join(OUT_ROOT, ".gen-358-"));
  const csdl = parseEdmx(EDMX);
  await generateComplexTypes(csdl, join(out, "types"));
  await generateFunctions(csdl, out, false);
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(out, { recursive: true, force: true });
});

describe("enum values inside JSON function parameters (#358)", () => {
  it("passes complex and collection parameters that can hold an enum through enumBody", async () => {
    const changes = await read("RetrieveMetadataChangesFunction.ts");
    expect(changes).toContain("import { enumBody } from './internal/enumBody.js';");
    expect(changes).toContain(
      `formatParameterAlias(enumBody(this.parameters.Query, "EntityQueryExpression"), 'mscrm.EntityQueryExpression', 'ComplexType')`
    );
    // A bare enum parameter stays an OData enum literal
    expect(changes).toContain(
      "formatParameterAlias(this.parameters.EntityFilters, 'mscrm.EntityFilters', 'EnumerationType')"
    );
    expect(await read("QueryScheduleFunction.ts")).toContain(
      `formatParameterAlias(enumBody(this.parameters.TimeCodes, "TimeCode"), 'Collection(mscrm.TimeCode)', 'Collection')`
    );
    const page = await read("PageFunction.ts");
    expect(page).not.toContain("enumBody");
    expect(page).not.toContain("JSON.stringify");
    expect(page).toContain(
      "formatParameterAlias(this.parameters.PagingInfo, 'mscrm.PagingInfo', 'ComplexType')"
    );
  });

  it("lists only what a function's JSON parameter can reach", async () => {
    const source = await read("internal/enumBody.ts");
    expect(source).toContain("Enum values in JSON function parameters.");
    expect(source).toContain("MetadataFilterExpression: {");
    expect(source).toContain("TimeCode: [false,");
    // EntityFilters is only a bare enum parameter (an enum literal), ActionOnly only in an action
    expect(source).not.toContain("EntityFilters");
    expect(source).not.toContain("ActionOnly");
    expect(source).not.toContain("PagingInfo");
  });

  it("the @p value holds member names", async () => {
    const RetrieveMetadataChanges = await load("RetrieveMetadataChangesFunction");
    const query = {
      Criteria: {
        FilterOperator: 1,
        Conditions: [
          { PropertyName: "LogicalName", ConditionOperator: 0, Value: { Type: "System.String", Value: "account" } },
        ],
        Filters: [{ FilterOperator: 0, Conditions: [{ ConditionOperator: 1 }] }],
      },
    };
    const fn = new RetrieveMetadataChanges({ Query: query, EntityFilters: 3 });
    expect(fn.toRequestInformation(BASE).url).toContain(
      "/RetrieveMetadataChanges(Query=@p1,EntityFilters=@p2)?"
    );
    const values = aliases(fn);
    expect(JSON.parse(values["@p1"] ?? "")).toEqual({
      Criteria: {
        FilterOperator: "Or",
        Conditions: [
          {
            PropertyName: "LogicalName",
            ConditionOperator: "Equals",
            Value: { Type: "System.String", Value: "account" },
          },
        ],
        Filters: [{ FilterOperator: "And", Conditions: [{ ConditionOperator: "NotEquals" }] }],
      },
    });
    expect(values["@p2"]).toBe("Microsoft.Dynamics.CRM.EntityFilters'3'");
    // The caller's value isn't changed
    expect(query.Criteria.FilterOperator).toBe(1);

    const QuerySchedule = await load("QueryScheduleFunction");
    expect(aliases(new QuerySchedule({ ResourceId: GUID, TimeCodes: [0, 1] }))).toEqual({
      "@p1": GUID,
      "@p2": '["Available","Busy"]',
    });

    const Page = await load("PageFunction");
    expect(aliases(new Page({ PagingInfo: { Count: 5 }, Names: ["a'b"] }))).toEqual({
      "@p1": '{"Count":5}',
      "@p2": `["a'b"]`,
    });
  });

  it("the generated code compiles", async () => {
    const errors = await typecheck(
      out,
      "use-enums.ts",
      `import { LogicalOperator, MetadataConditionOperator, QueryScheduleFunction, RetrieveMetadataChangesFunction, TimeCode } from "./index.js";
export const a = new RetrieveMetadataChangesFunction({ Query: { Criteria: { FilterOperator: LogicalOperator.And, Conditions: [{ ConditionOperator: MetadataConditionOperator.Equals, PropertyName: "LogicalName", Value: { Type: "System.String", Value: "account" } }] } } });
export const b = new QueryScheduleFunction({ ResourceId: "${GUID}", TimeCodes: [TimeCode.Available] });
`
    );
    expect(errors).toEqual([]);
  });
});
