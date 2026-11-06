/**
 * #41: the code generator had no tests. These run the real parser and generators on a tiny
 * $metadata document and check the output for the fixes in #22 (function string literals),
 * #23 (lower-case content-type for actions and messages).
 */
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { typecheck } from "./typecheck.js";

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <Action Name="SendGreeting">
        <Parameter Name="Message" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Action>
      <Function Name="ValidateQuery">
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" />
        <Parameter Name="Count" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(tmpdir(), "gen-test-"));
  const csdl = parseEdmx(EDMX);
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("generate-sdk-types", () => {
  it("parses actions and functions from $metadata", () => {
    const csdl = parseEdmx(EDMX);
    expect(csdl.actions.map((a) => a.name)).toEqual(["SendGreeting"]);
    expect(csdl.functions.map((f) => f.name)).toEqual(["ValidateQuery"]);
    expect(csdl.functions[0]?.parameters.map((p) => `${p.name}:${p.type}`)).toEqual([
      "FetchXml:Edm.String",
      "Count:Edm.Int32",
    ]);
  });

  it("#23: generated actions and messages declare a lower-case content-type", async () => {
    const action = await readFile(join(dir, "actions", "SendGreetingAction.ts"), "utf8");
    const message = await readFile(join(dir, "messages", "SendGreetingMessage.ts"), "utf8");
    for (const code of [action, message]) {
      expect(code).toMatch(/["']content-type["']:\s*["']application\/json["']/);
      expect(code).not.toContain("Content-Type");
    }
  });

  it("#22: generated functions format every scalar alias with formatAliasValue", async () => {
    const fn = await readFile(join(dir, "functions", "ValidateQueryFunction.ts"), "utf8");
    expect(fn).toMatch(/import \{ formatAliasValue \} from ["']\.\/internal\/odataLiteral\.js["']/);
    expect(fn).toMatch(/formatAliasValue\(this\.fetchXml\)/);
    expect(fn).toMatch(/formatAliasValue\(this\.count\)/);
  });

  it("#22: the emitted formatAliasValue doubles embedded quotes", async () => {
    const mod = (await import(join(dir, "functions", "internal", "odataLiteral.ts"))) as {
      formatAliasValue: (v: unknown) => string;
    };
    expect(mod.formatAliasValue("O'Brien's")).toBe("'O''Brien''s'");
    expect(mod.formatAliasValue(5)).toBe("5");
    expect(mod.formatAliasValue(true)).toBe("true");
  });
});

/** #73: CSDL Nullable defaults and `@odata.type` for parameters declared with a base type. */
describe("#73: nullable properties and base-typed parameters", () => {
  const POLY_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="activitypointer" BaseType="mscrm.crmbaseentity" Abstract="true">
        <Property Name="subject" Type="Edm.String" />
      </EntityType>
      <EntityType Name="email" BaseType="mscrm.activitypointer">
        <Property Name="sender" Type="Edm.String" />
      </EntityType>
      <ComplexType Name="QueryBase" />
      <ComplexType Name="ColumnSet">
        <Property Name="AllColumns" Type="Edm.Boolean" />
        <Property Name="Columns" Type="Collection(Edm.String)" />
      </ComplexType>
      <ComplexType Name="QueryExpression" BaseType="mscrm.QueryBase">
        <Property Name="EntityName" Type="Edm.String" />
        <Property Name="ColumnSet" Type="mscrm.ColumnSet" />
        <Property Name="Distinct" Type="Edm.Boolean" />
      </ComplexType>
      <ComplexType Name="FetchExpression" BaseType="mscrm.QueryBase">
        <Property Name="Query" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="StringCollection">
        <Property Name="Items" Type="Collection(Edm.String)" Nullable="false" />
      </ComplexType>
      <ComplexType Name="QueryExpressionToFetchXmlResponse">
        <Property Name="FetchXml" Type="Edm.String" />
      </ComplexType>
      <Action Name="QueryExpressionToFetchXml">
        <Parameter Name="Query" Type="mscrm.QueryBase" Nullable="false" />
        <ReturnType Type="mscrm.QueryExpressionToFetchXmlResponse" Nullable="false" />
      </Action>
      <Action Name="Validate">
        <Parameter Name="Activities" Type="Collection(mscrm.activitypointer)" Nullable="false" />
      </Action>
      <Function Name="Rollup">
        <Parameter Name="Query" Type="mscrm.QueryBase" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  let out: string;
  const read = (path: string) => readFile(join(out, path), "utf8");

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(tmpdir(), "gen-73-"));
    const csdl = parseEdmx(POLY_EDMX);
    for (const target of ["actions", "functions", "messages"]) {
      await generateComplexTypes(csdl, join(out, target, "types"));
    }
    await generateActions(csdl, join(out, "actions"), false);
    await generateFunctions(csdl, join(out, "functions"), false);
    await generateMessages(csdl, join(out, "messages"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("parses Abstract and leaves an absent Nullable undefined", () => {
    const csdl = parseEdmx(POLY_EDMX);
    expect(csdl.entityTypes.find((t) => t.name === "activitypointer")?.abstract).toBe(true);
    expect(csdl.entityTypes.find((t) => t.name === "email")?.abstract).toBe(false);
    const columnSet = csdl.complexTypes.find((t) => t.name === "ColumnSet");
    expect(columnSet?.properties.map((p) => p.nullable)).toEqual([undefined, undefined]);
  });

  it("a property without Nullable is optional; Nullable=false stays required", async () => {
    const columnSet = await read("actions/types/ColumnSet.ts");
    expect(columnSet).toContain("AllColumns?: boolean;");
    expect(columnSet).toContain("Columns?: string[];");
    expect(await read("actions/types/StringCollection.ts")).toContain("Items: string[];");
    expect(await read("actions/types/email.ts")).toContain("sender?: string;");
  });

  it("derived types extend their generated base type", async () => {
    const query = await read("actions/types/QueryExpression.ts");
    expect(query).toContain("import type { QueryBase } from './QueryBase.js';");
    expect(query).toContain("export interface QueryExpression extends QueryBase {");
    expect(await read("actions/types/email.ts")).toContain(
      "export interface email extends activitypointer {"
    );
    // crmbaseentity isn't generated, so activitypointer has no base
    expect(await read("actions/types/activitypointer.ts")).toContain(
      "export interface activitypointer {"
    );
  });

  it("a base type gets a Typed<Base> union of its concrete types, exported from the index", async () => {
    const base = await read("actions/types/QueryBase.ts");
    expect(base).toContain("export type TypedQueryBase =");
    expect(base).toContain(
      '| (FetchExpression & { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression" })'
    );
    expect(base).toContain(
      '| (QueryExpression & { "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression" })'
    );
    // QueryBase has no properties and activitypointer is abstract: neither is a member
    expect(base).not.toContain('"Microsoft.Dynamics.CRM.QueryBase"');
    const pointer = await read("actions/types/activitypointer.ts");
    expect(pointer).toContain('| (email & { "@odata.type": "Microsoft.Dynamics.CRM.email" })');
    expect(pointer).not.toContain('"Microsoft.Dynamics.CRM.activitypointer"');
    const index = await read("actions/types/index.ts");
    expect(index).toContain("export type { QueryBase, TypedQueryBase } from './QueryBase.js';");
    expect(index).toContain("export type { QueryExpression } from './QueryExpression.js';");
  });

  it("base-typed parameters take the Typed<Base> union in actions, functions and messages", async () => {
    const action = await read("actions/QueryExpressionToFetchXmlAction.ts");
    expect(action).toContain("import type { TypedQueryBase } from './types/index.js';");
    expect(action).toContain("public readonly query: TypedQueryBase,");
    expect(await read("actions/ValidateAction.ts")).toContain(
      "public readonly activities: TypedActivitypointer[],"
    );
    expect(await read("functions/RollupFunction.ts")).toContain(
      "public readonly query: TypedQueryBase,"
    );
    expect(await read("messages/QueryExpressionToFetchXmlMessage.ts")).toContain(
      "public query: TypedQueryBase,"
    );
  });

  it("the QueryExpression from the issue compiles without casts", async () => {
    const errors = await typecheck(
      join(out, "actions"),
      "usage-ok.ts",
      `import { QueryExpressionToFetchXmlAction } from "./QueryExpressionToFetchXmlAction.js";
import { ValidateAction } from "./ValidateAction.js";
new QueryExpressionToFetchXmlAction({
  "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
  EntityName: "account",
  ColumnSet: { AllColumns: true },
});
new QueryExpressionToFetchXmlAction({
  "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression",
  Query: "<fetch/>",
});
new ValidateAction([{ "@odata.type": "Microsoft.Dynamics.CRM.email", subject: "Hi" }]);
`
    );
    expect(errors).toEqual([]);
  });

  it("a base-typed parameter without @odata.type, or with an abstract one, doesn't compile", async () => {
    const missing = await typecheck(
      join(out, "actions"),
      "usage-missing.ts",
      `import { QueryExpressionToFetchXmlAction } from "./QueryExpressionToFetchXmlAction.js";
new QueryExpressionToFetchXmlAction({ EntityName: "account", ColumnSet: { AllColumns: true } });
`
    );
    expect(missing.join("\n")).toMatch(/usage-missing\.ts\(2\)/);
    const abstract = await typecheck(
      join(out, "actions"),
      "usage-abstract.ts",
      `import { ValidateAction } from "./ValidateAction.js";
new ValidateAction([{ "@odata.type": "Microsoft.Dynamics.CRM.activitypointer", subject: "Hi" }]);
`
    );
    expect(abstract.join("\n")).toMatch(/usage-abstract\.ts\(2\)/);
  });
});
