/**
 * #41: the code generator had no tests. These run the real parser and generators on a tiny
 * $metadata document and check the output for the fixes in #22 (function string literals),
 * #23 (lower-case content-type for actions and messages).
 */
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { typecheck } from "./typecheck.js";

/**
 * Generated output goes inside this package (and is removed afterwards), not the OS temp dir, so
 * the emitted functions helper's runtime import of @mohsinonxrm/dataverse-sdk-core resolves when a
 * test loads generated code.
 */
const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));

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
  dir = await mkdtemp(join(OUT_ROOT, ".gen-test-"));
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

  it("#22: generated functions format every scalar alias with formatParameterAlias", async () => {
    const fn = await readFile(join(dir, "functions", "ValidateQueryFunction.ts"), "utf8");
    expect(fn).toMatch(
      /import \{ formatParameterAlias \} from ["']\.\/internal\/odataLiteral\.js["']/
    );
    expect(fn).toContain("formatParameterAlias(this.fetchXml, 'Edm.String')");
    expect(fn).toContain("formatParameterAlias(this.count, 'Edm.Int32')");
  });

  it("#22: the emitted formatParameterAlias doubles embedded quotes", async () => {
    const mod = (await import(join(dir, "functions", "internal", "odataLiteral.ts"))) as {
      formatParameterAlias: (v: unknown, type: string) => string;
    };
    expect(mod.formatParameterAlias("O'Brien's", "Edm.String")).toBe("'O''Brien''s'");
    expect(mod.formatParameterAlias(5, "Edm.Int32")).toBe("5");
    expect(mod.formatParameterAlias(true, "Edm.Boolean")).toBe("true");
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
    out = await mkdtemp(join(OUT_ROOT, ".gen-73-"));
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
    toRequestBody?: () => Record<string, unknown>;
  };

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(OUT_ROOT, ".gen-69-"));
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
    const body = /toRequestBody\(\)[\s\S]*?\n {2}\}/.exec(code)?.[0] ?? "";
    expect(body).toContain("Targets: this.targets,");
    expect(body).not.toContain("entitySetName");
  });

  it("an entity set missing from the CSDL falls back to <type>s with a warning", async () => {
    const code = await read("actions/OrphanAction.ts");
    expect(code).toContain("// WARNING: Entity set not found in metadata");
    expect(code).toContain("`${baseUrl}/nosetentitys/Microsoft.Dynamics.CRM.Orphan`");
  });
});

/**
 * #67, #68: function parameters are written as the OData literal of their type (enums as
 * `Microsoft.Dynamics.CRM.<Enum>'<value>'`, GUIDs and date-times bare), enums are exported as
 * values, and parameters the CSDL leaves nullable may be left out.
 */
describe("#67, #68: function parameter literals", () => {
  const PARAMS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EnumType Name="EntityFilters" IsFlags="true">
        <Member Name="Default" Value="1" />
        <Member Name="Entity" Value="1" />
        <Member Name="Attributes" Value="2" />
        <Member Name="Privileges" Value="4" />
      </EnumType>
      <Function Name="RetrieveEntity">
        <Parameter Name="EntityFilters" Type="mscrm.EntityFilters" Nullable="false" />
        <Parameter Name="LogicalName" Type="Edm.String" />
        <Parameter Name="MetadataId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="RetrieveAsIfPublished" Type="Edm.Boolean" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Function>
      <Function Name="LocalTimeFromUtcTime">
        <Parameter Name="TimeZoneCode" Type="Edm.Int32" Nullable="false" />
        <Parameter Name="UtcTime" Type="Edm.DateTimeOffset" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Function>
      <Function Name="GetChanges">
        <Parameter Name="Stamp" Type="Edm.String" Nullable="false" />
        <Parameter Name="AppModuleId" Type="Edm.Guid" />
        <Parameter Name="Filters" Type="mscrm.EntityFilters" />
        <ReturnType Type="Edm.String" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
  const GUID = "00000000-0000-0000-0000-000000000000";
  let out: string;
  const read = (path: string) => readFile(join(out, path), "utf8");
  type Fn = new (...args: unknown[]) => { toRequestInformation(baseUrl: string): { url: string } };
  const load = async (name: string): Promise<Fn> => {
    const mod = (await import(join(out, "functions", `${name}.ts`))) as Record<
      string,
      Fn | undefined
    >;
    const value = mod[name];
    if (!value) throw new Error(`${name} isn't exported`);
    return value;
  };
  /** The URL as Dataverse decodes it. */
  const decoded = (fn: InstanceType<Fn>) =>
    decodeURIComponent(fn.toRequestInformation(BASE).url.replace(/\+/g, " "));

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(OUT_ROOT, ".gen-6768-"));
    const csdl = parseEdmx(PARAMS_EDMX);
    await generateComplexTypes(csdl, join(out, "functions", "types"));
    await generateFunctions(csdl, join(out, "functions"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("an enum is an enum literal; a GUID is bare (#67, #68)", async () => {
    const RetrieveEntity = await load("RetrieveEntityFunction");
    expect(decoded(new RetrieveEntity(3, "account", GUID, false))).toBe(
      `${BASE}/RetrieveEntity(EntityFilters=@p1,LogicalName=@p2,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'3'&@p2='account'&@p3=${GUID}&@p4=false`
    );
    expect(decoded(new RetrieveEntity("Attributes", "account", GUID, false))).toContain(
      "@p1=Microsoft.Dynamics.CRM.EntityFilters'Attributes'"
    );
  });

  it("a DateTimeOffset is bare and also takes a Date (#68)", async () => {
    const LocalTime = await load("LocalTimeFromUtcTimeFunction");
    expect(decoded(new LocalTime(85, new Date("2026-01-01T00:00:00Z")))).toContain(
      "@p2=2026-01-01T00:00:00.000Z"
    );
    expect(decoded(new LocalTime(85, "2026-01-01T00:00:00Z"))).toContain(
      "@p2=2026-01-01T00:00:00Z"
    );
  });

  it("nullable parameters are optional when trailing, and accept undefined otherwise (#68)", async () => {
    const entity = await read("functions/RetrieveEntityFunction.ts");
    expect(entity).toContain(
      "public readonly entityFilters: EntityFilters | keyof typeof EntityFilters,"
    );
    expect(entity).toContain("public readonly logicalName: string | undefined,");
    expect(entity).toContain("public readonly metadataId: string,");
    const changes = await read("functions/GetChangesFunction.ts");
    expect(changes).toContain("public readonly stamp: string,");
    expect(changes).toContain("public readonly appModuleId?: string,");
    expect(changes).toContain(
      "public readonly filters?: EntityFilters | keyof typeof EntityFilters,"
    );
    const GetChanges = await load("GetChangesFunction");
    expect(decoded(new GetChanges("s1"))).toBe(`${BASE}/GetChanges(Stamp=@p1)?@p1='s1'`);
    const RetrieveEntity = await load("RetrieveEntityFunction");
    expect(decoded(new RetrieveEntity(1, undefined, GUID, true))).not.toContain("LogicalName");
  });

  it("enums are exported as values, from the types index and the package index (#67)", async () => {
    expect(await read("functions/types/index.ts")).toContain(
      "export { EntityFilters } from './EntityFilters.js';"
    );
    expect(await read("functions/index.ts")).toContain(
      "export { EntityFilters } from './types/index.js';"
    );
  });

  it("the enum values, member names and Date compile; an unknown member doesn't", async () => {
    const ok = await typecheck(
      join(out, "functions"),
      "usage-ok.ts",
      `import { EntityFilters, RetrieveEntityFunction, LocalTimeFromUtcTimeFunction, GetChangesFunction } from "./index.js";
new RetrieveEntityFunction(EntityFilters.Entity | EntityFilters.Attributes, "account", "${GUID}", false);
new RetrieveEntityFunction("Entity", undefined, "${GUID}", false);
new LocalTimeFromUtcTimeFunction(85, new Date());
new GetChangesFunction("s1");
`
    );
    expect(ok).toEqual([]);
    const bad = await typecheck(
      join(out, "functions"),
      "usage-bad.ts",
      `import { RetrieveEntityFunction } from "./index.js";
new RetrieveEntityFunction("Bogus", "account", "${GUID}", false);
`
    );
    expect(bad.join("\n")).toMatch(/usage-bad\.ts\(2\)/);
  });
});
