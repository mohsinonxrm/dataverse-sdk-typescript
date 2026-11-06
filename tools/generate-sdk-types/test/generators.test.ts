/**
 * #41: the code generator had no tests. These run the real parser and generators on a tiny
 * $metadata document and check the output for the fixes in #22 (function string literals),
 * #23 (lower-case content-type for actions and messages).
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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

/** #69: operations bound to an entity collection are called on the entity set. */
describe("#69: collection-bound operations", () => {
  const BOUND_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="savedquery" BaseType="mscrm.crmbaseentity" />
      <EntityType Name="systemform" BaseType="mscrm.crmbaseentity" />
      <EntityType Name="nosetentity" BaseType="mscrm.crmbaseentity" />
      <ComplexType Name="CreateMultipleResponse">
        <Property Name="Ids" Type="Collection(Edm.Guid)" Nullable="false" />
      </ComplexType>
      <Action Name="CreateMultiple" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.crmbaseentity)" Nullable="false" />
        <Parameter Name="Targets" Type="Collection(mscrm.crmbaseentity)" Nullable="false" />
        <ReturnType Type="mscrm.CreateMultipleResponse" Nullable="false" />
      </Action>
      <Action Name="ValidateSavedQuery" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.savedquery)" Nullable="false" />
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" />
        <Parameter Name="QueryType" Type="Edm.Int32" Nullable="false" />
      </Action>
      <Action Name="Orphan" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.nosetentity)" Nullable="false" />
      </Action>
      <Function Name="RetrieveFilteredForms" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.systemform)" Nullable="false" />
        <Parameter Name="EntityLogicalName" Type="Edm.String" Nullable="false" />
        <Parameter Name="FormType" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Collection(mscrm.systemform)" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="savedqueries" EntityType="Microsoft.Dynamics.CRM.savedquery" />
        <EntitySet Name="systemforms" EntityType="Microsoft.Dynamics.CRM.systemform" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
  let out: string;
  const read = (path: string) => readFile(join(out, path), "utf8");
  // The generated operation classes import only types, so vitest can load them directly
  const load = async <T>(path: string, name: string): Promise<T> => {
    const mod = (await import(join(out, path))) as Record<string, T | undefined>;
    const value = mod[name];
    if (value === undefined) throw new Error(`${path} doesn't export ${name}`);
    return value;
  };
  type Op = new (...args: unknown[]) => {
    toRequestInformation(baseUrl: string): { url: string; body?: unknown };
  };

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(tmpdir(), "gen-69-"));
    const csdl = parseEdmx(BOUND_EDMX);
    await generateActions(csdl, join(out, "actions"), false);
    await generateFunctions(csdl, join(out, "functions"), false);
    await generateMessages(csdl, join(out, "messages"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("an action bound to a concrete collection posts to its entity set", async () => {
    const Action = await load<Op>(
      "actions/ValidateSavedQueryAction.ts",
      "ValidateSavedQueryAction"
    );
    const info = new Action("<fetch/>", 0).toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`);
    expect(info.body).toEqual({ FetchXml: "<fetch/>", QueryType: 0 });
  });

  it("a Collection(crmbaseentity) action takes the entity set as its first argument", async () => {
    const code = await read("actions/CreateMultipleAction.ts");
    expect(code).toContain("public readonly entitySetName: string,");
    const Action = await load<Op>("actions/CreateMultipleAction.ts", "CreateMultipleAction");
    const targets = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" }];
    const info = new Action("accounts", targets).toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/accounts/Microsoft.Dynamics.CRM.CreateMultiple`);
    expect(info.body).toEqual({ Targets: targets });
  });

  it("a collection-bound function is called on its entity set with parameter aliases", async () => {
    const Fn = await load<Op>(
      "functions/RetrieveFilteredFormsFunction.ts",
      "RetrieveFilteredFormsFunction"
    );
    const url = new Fn("account", 2).toRequestInformation(BASE).url;
    expect(url).toBe(
      `${BASE}/systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms(EntityLogicalName=@p1,FormType=@p2)?%40p1=%27account%27&%40p2=2`
    );
  });

  it("messages use the same URLs and keep the entity set out of the request body", async () => {
    expect(await read("messages/ValidateSavedQueryMessage.ts")).toContain(
      "const url = `${baseUrl}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`;"
    );
    const code = await read("messages/CreateMultipleMessage.ts");
    expect(code).toContain("public entitySetName: string,");
    expect(code).toContain(
      "const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`;"
    );
    const body = /const body: Record<string, unknown> = \{[\s\S]*?\};/.exec(code)?.[0] ?? "";
    expect(body).toContain("Targets: this.targets,");
    expect(body).not.toContain("entitySetName");
  });

  it("an entity set missing from the CSDL falls back to <type>s with a warning", async () => {
    const code = await read("actions/OrphanAction.ts");
    expect(code).toContain("// WARNING: Entity set not found in metadata");
    expect(code).toContain("`${baseUrl}/nosetentitys/Microsoft.Dynamics.CRM.Orphan`");
  });
});

/** #70: message responses read entity and complex returns from the body, not from `value`. */
describe("#70: message response parsing", () => {
  const RESPONSES_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="asyncoperation" BaseType="mscrm.crmbaseentity">
        <Property Name="asyncoperationid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="workflow" BaseType="mscrm.crmbaseentity">
        <Property Name="workflowid" Type="Edm.Guid" />
      </EntityType>
      <ComplexType Name="QueryExpressionToFetchXmlResponse">
        <Property Name="FetchXml" Type="Edm.String" />
      </ComplexType>
      <Action Name="QueryExpressionToFetchXml">
        <Parameter Name="Query" Type="Edm.String" Nullable="false" />
        <ReturnType Type="mscrm.QueryExpressionToFetchXmlResponse" Nullable="false" />
      </Action>
      <Action Name="ExecuteWorkflow" IsBound="true">
        <Parameter Name="entity" Type="mscrm.workflow" Nullable="false" />
        <Parameter Name="EntityId" Type="Edm.Guid" Nullable="false" />
        <ReturnType Type="mscrm.asyncoperation" Nullable="false" />
      </Action>
      <Action Name="Dequeue">
        <Parameter Name="QueueItemId" Type="Edm.Guid" Nullable="false" />
        <ReturnType Type="mscrm.crmbaseentity" Nullable="false" />
      </Action>
      <Action Name="InstantiateTemplate">
        <Parameter Name="TemplateId" Type="Edm.Guid" Nullable="false" />
        <ReturnType Type="Collection(mscrm.crmbaseentity)" Nullable="false" />
      </Action>
      <Action Name="CountThings">
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Action>
      <Action Name="Ping" />
      <EntityContainer Name="System">
        <EntitySet Name="workflows" EntityType="Microsoft.Dynamics.CRM.workflow" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  // The hand-written base classes the generated messages extend (read, not modified)
  const MESSAGES_SRC = new URL("../../../packages/dataverse-sdk-messages/src/", import.meta.url);
  let out: string;
  const read = (path: string) => readFile(join(out, path), "utf8");
  interface ResponseClass {
    fromResponse(data: unknown): { result: unknown };
  }
  const response = async (file: string, name: string) => {
    const mod = (await import(join(out, "messages", file))) as Record<
      string,
      ResponseClass | undefined
    >;
    const cls = mod[name];
    if (!cls) throw new Error(`${file} doesn't export ${name}`);
    return cls;
  };
  const body = (value: Record<string, unknown>) =>
    new Response(JSON.stringify(value), { headers: { "content-type": "application/json" } });

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(tmpdir(), "gen-70-"));
    const csdl = parseEdmx(RESPONSES_EDMX);
    await generateComplexTypes(csdl, join(out, "messages", "types"));
    await generateMessages(csdl, join(out, "messages"), false);
    for (const file of ["OrganizationRequest.ts", "types.ts"]) {
      await writeFile(join(out, "messages", file), await readFile(new URL(file, MESSAGES_SRC)));
    }
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("a complex-type return is the body itself, imported under an alias", async () => {
    const code = await read("messages/QueryExpressionToFetchXmlMessage.ts");
    expect(code).toContain(
      "QueryExpressionToFetchXmlResponse as QueryExpressionToFetchXmlResponseData"
    );
    expect(code).toContain("public result: QueryExpressionToFetchXmlResponseData");
    const Response_ = await response(
      "QueryExpressionToFetchXmlMessage.ts",
      "QueryExpressionToFetchXmlResponse"
    );
    const res = Response_.fromResponse({
      "@odata.context":
        "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.QueryExpressionToFetchXmlResponse",
      FetchXml: "<fetch/>",
    });
    expect(res.result).toEqual({ FetchXml: "<fetch/>" });
  });

  it("an entity return is the entity without its @odata annotations", async () => {
    expect(await read("messages/ExecuteWorkflowMessage.ts")).toContain(
      "public result: asyncoperation"
    );
    const Response_ = await response("ExecuteWorkflowMessage.ts", "ExecuteWorkflowResponse");
    const res = Response_.fromResponse({
      "@odata.context": "$metadata#asyncoperations/$entity",
      "@odata.etag": 'W/"1"',
      asyncoperationid: "aaa",
    });
    expect(res.result).toEqual({ asyncoperationid: "aaa" });
  });

  it("a crmbaseentity return is a record, not an EntityReference", async () => {
    const code = await read("messages/DequeueMessage.ts");
    expect(code).toContain("public result: Record<string, unknown>");
    expect(code).not.toContain("EntityReference");
    const Response_ = await response("DequeueMessage.ts", "DequeueResponse");
    expect(Response_.fromResponse({ "@odata.context": "x", emailid: "e1" }).result).toEqual({
      emailid: "e1",
    });
  });

  it("collection and primitive returns are read from value", async () => {
    expect(await read("messages/InstantiateTemplateMessage.ts")).toContain(
      "public result: Record<string, unknown>[]"
    );
    const many = await response("InstantiateTemplateMessage.ts", "InstantiateTemplateResponse");
    expect(many.fromResponse({ value: [{ subject: "s" }] }).result).toEqual([{ subject: "s" }]);
    const count = await response("CountThingsMessage.ts", "CountThingsResponse");
    expect(count.fromResponse({ "@odata.context": "x", value: 3 }).result).toBe(3);
  });

  it("parseResponse goes through fromResponse; a message without a return has no result", async () => {
    const mod = (await import(join(out, "messages", "ExecuteWorkflowMessage.ts"))) as {
      ExecuteWorkflowRequest: new (...args: string[]) => {
        parseResponse(r: Response): Promise<{ result: unknown }>;
      };
    };
    const req = new mod.ExecuteWorkflowRequest("w1", "e1");
    expect((await req.parseResponse(body({ asyncoperationid: "aaa" }))).result).toEqual({
      asyncoperationid: "aaa",
    });
    expect(await read("messages/PingMessage.ts")).not.toContain("result");
  });

  it("generated messages have no toRequestBody()", async () => {
    for (const file of ["QueryExpressionToFetchXmlMessage.ts", "ExecuteWorkflowMessage.ts"]) {
      expect(await read(`messages/${file}`)).not.toContain("toRequestBody");
    }
  });
});

/** #76: bound messages use the CSDL entity set, not `${type}s` (opportunitys, businessprocesss). */
describe("#76: message entity sets", () => {
  const SETS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="opportunity" />
      <EntityType Name="businessprocess" />
      <EntityType Name="nosetentity" />
      <Action Name="CalculateActualValueOpportunity" IsBound="true">
        <Parameter Name="entity" Type="mscrm.opportunity" Nullable="false" />
      </Action>
      <Action Name="GetRunMap" IsBound="true">
        <Parameter Name="entity" Type="mscrm.businessprocess" Nullable="false" />
      </Action>
      <Action Name="Orphan" IsBound="true">
        <Parameter Name="entity" Type="mscrm.nosetentity" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="opportunities" EntityType="Microsoft.Dynamics.CRM.opportunity" />
        <EntitySet Name="businessprocesses" EntityType="Microsoft.Dynamics.CRM.businessprocess" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  let out: string;
  const read = (path: string) => readFile(join(out, "messages", path), "utf8");

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(tmpdir(), "gen-76-"));
    await generateMessages(parseEdmx(SETS_EDMX), join(out, "messages"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("uses the entity set from the CSDL", async () => {
    expect(await read("CalculateActualValueOpportunityMessage.ts")).toContain(
      "`${baseUrl}/opportunities(${this.opportunityId})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`"
    );
    expect(await read("GetRunMapMessage.ts")).toContain(
      "`${baseUrl}/businessprocesses(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`"
    );
  });

  it("falls back to <type>s with a warning, like actions, only without an entity set", async () => {
    const code = await read("OrphanMessage.ts");
    expect(code).toContain("// WARNING: Entity set not found in metadata");
    expect(code).toContain("`${baseUrl}/nosetentitys(${this.nosetentityId})/");
  });
});
