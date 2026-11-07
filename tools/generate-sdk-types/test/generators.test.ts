/**
 * #41: the code generator had no tests. These run the real parser and generators on a tiny
 * $metadata document and check the output for the fixes in #22 (function string literals),
 * #23 (lower-case content-type for actions and messages).
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { generateEntityTables } from "../src/generators/references-generator.js";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    expect(fn).toContain("formatParameterAlias(this.parameters.FetchXml, 'Edm.String')");
    expect(fn).toContain("formatParameterAlias(this.parameters.Count, 'Edm.Int32')");
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
    expect(action).toContain("  Query: TypedQueryBase;");
    expect(await read("actions/ValidateAction.ts")).toContain(
      "  Activities: TypedActivitypointer[];"
    );
    expect(await read("functions/RollupFunction.ts")).toContain("  Query: TypedQueryBase;");
    expect(await read("messages/QueryExpressionToFetchXmlMessage.ts")).toContain(
      "  Query: TypedQueryBase;"
    );
  });

  it("the QueryExpression from the issue compiles without casts", async () => {
    const errors = await typecheck(
      join(out, "actions"),
      "usage-ok.ts",
      `import { QueryExpressionToFetchXmlAction } from "./QueryExpressionToFetchXmlAction.js";
import { ValidateAction } from "./ValidateAction.js";
new QueryExpressionToFetchXmlAction({
  Query: {
    "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
    EntityName: "account",
    ColumnSet: { AllColumns: true },
  },
});
new QueryExpressionToFetchXmlAction({
  Query: { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression", Query: "<fetch/>" },
});
new ValidateAction({
  Activities: [{ "@odata.type": "Microsoft.Dynamics.CRM.email", subject: "Hi" }],
});
`
    );
    expect(errors).toEqual([]);
  });

  it("a base-typed parameter without @odata.type, or with an abstract one, doesn't compile", async () => {
    const missing = await typecheck(
      join(out, "actions"),
      "usage-missing.ts",
      `import { QueryExpressionToFetchXmlAction } from "./QueryExpressionToFetchXmlAction.js";
new QueryExpressionToFetchXmlAction({ Query: { EntityName: "account", ColumnSet: { AllColumns: true } } });
`
    );
    expect(missing.join("\n")).toMatch(/usage-missing\.ts\(2\)/);
    const abstract = await typecheck(
      join(out, "actions"),
      "usage-abstract.ts",
      `import { ValidateAction } from "./ValidateAction.js";
new ValidateAction({
  Activities: [{ "@odata.type": "Microsoft.Dynamics.CRM.activitypointer", subject: "Hi" }],
});
`
    );
    expect(abstract.join("\n")).toMatch(/usage-abstract\.ts\(3\)/);
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
    const info = new Action({ FetchXml: "<fetch/>", QueryType: 0 }).toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`);
    expect(info.body).toEqual({ FetchXml: "<fetch/>", QueryType: 0 });
  });

  it("a Collection(crmbaseentity) action takes the entity set as its first argument", async () => {
    const code = await read("actions/CreateMultipleAction.ts");
    expect(code).toContain("public readonly entitySetName: string,");
    const Action = await load<Op>("actions/CreateMultipleAction.ts", "CreateMultipleAction");
    const targets = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" }];
    const info = new Action("accounts", { Targets: targets }).toRequestInformation(BASE);
    expect(info.url).toBe(`${BASE}/accounts/Microsoft.Dynamics.CRM.CreateMultiple`);
    expect(info.body).toEqual({ Targets: targets });
  });

  it("a collection-bound function is called on its entity set with parameter aliases", async () => {
    const Fn = await load<Op>(
      "functions/RetrieveFilteredFormsFunction.ts",
      "RetrieveFilteredFormsFunction"
    );
    const url = new Fn({ EntityLogicalName: "account", FormType: 2 }).toRequestInformation(
      BASE
    ).url;
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
    const body = /const body = requestBody\(\{[\s\S]*?\}\);/.exec(code)?.[0] ?? "";
    expect(body).toContain("Targets: this.Parameters.Targets,");
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
    expect(
      decoded(
        new RetrieveEntity({
          EntityFilters: 3,
          LogicalName: "account",
          MetadataId: GUID,
          RetrieveAsIfPublished: false,
        })
      )
    ).toBe(
      `${BASE}/RetrieveEntity(EntityFilters=@p1,LogicalName=@p2,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'3'&@p2='account'&@p3=${GUID}&@p4=false`
    );
    expect(
      decoded(
        new RetrieveEntity({
          EntityFilters: "Attributes",
          LogicalName: "account",
          MetadataId: GUID,
          RetrieveAsIfPublished: false,
        })
      )
    ).toContain("@p1=Microsoft.Dynamics.CRM.EntityFilters'Attributes'");
  });

  it("a DateTimeOffset is bare and also takes a Date (#68)", async () => {
    const LocalTime = await load("LocalTimeFromUtcTimeFunction");
    expect(
      decoded(new LocalTime({ TimeZoneCode: 85, UtcTime: new Date("2026-01-01T00:00:00Z") }))
    ).toContain("@p2=2026-01-01T00:00:00.000Z");
    expect(decoded(new LocalTime({ TimeZoneCode: 85, UtcTime: "2026-01-01T00:00:00Z" }))).toContain(
      "@p2=2026-01-01T00:00:00Z"
    );
  });

  it("nullable parameters are optional properties, left out of the URL when undefined (#68, #96)", async () => {
    const entity = await read("functions/RetrieveEntityFunction.ts");
    expect(entity).toContain("export interface RetrieveEntityFunctionParameters {");
    expect(entity).toContain("  EntityFilters: EntityFilters | keyof typeof EntityFilters;");
    expect(entity).toContain("  LogicalName?: string;");
    expect(entity).toContain("  MetadataId: string;");
    expect(entity).toContain(
      "constructor(\n    public readonly parameters: RetrieveEntityFunctionParameters,\n  ) {}"
    );
    const changes = await read("functions/GetChangesFunction.ts");
    expect(changes).toContain("  Stamp: string;");
    expect(changes).toContain("  AppModuleId?: string;");
    expect(changes).toContain("  Filters?: EntityFilters | keyof typeof EntityFilters;");
    const GetChanges = await load("GetChangesFunction");
    expect(decoded(new GetChanges({ Stamp: "s1" }))).toBe(`${BASE}/GetChanges(Stamp=@p1)?@p1='s1'`);
    expect(decoded(new GetChanges({ Stamp: "s1", AppModuleId: undefined }))).toBe(
      `${BASE}/GetChanges(Stamp=@p1)?@p1='s1'`
    );
    const RetrieveEntity = await load("RetrieveEntityFunction");
    const url = decoded(
      new RetrieveEntity({ EntityFilters: 1, MetadataId: GUID, RetrieveAsIfPublished: true })
    );
    expect(url).toBe(
      `${BASE}/RetrieveEntity(EntityFilters=@p1,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'1'&@p3=${GUID}&@p4=true`
    );
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
new RetrieveEntityFunction({
  EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
  LogicalName: "account",
  MetadataId: "${GUID}",
  RetrieveAsIfPublished: false,
});
new RetrieveEntityFunction({ EntityFilters: "Entity", MetadataId: "${GUID}", RetrieveAsIfPublished: false });
new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: new Date() });
new GetChangesFunction({ Stamp: "s1" });
`
    );
    expect(ok).toEqual([]);
    const bad = await typecheck(
      join(out, "functions"),
      "usage-bad.ts",
      `import { RetrieveEntityFunction } from "./index.js";
new RetrieveEntityFunction({ EntityFilters: "Bogus", MetadataId: "${GUID}", RetrieveAsIfPublished: false });
`
    );
    expect(bad.join("\n")).toMatch(/usage-bad\.ts\(2\)/);
  });
});

/**
 * #72: an entity reference is the Web API shape (`@odata.type` + primary key) in a body and
 * `{"@odata.id": "<set>(<id>)"}` in a function parameter, with keys and sets from the CSDL.
 */
describe("#72: entity references", () => {
  const REFS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="opportunity" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="opportunityid" /></Key>
        <Property Name="opportunityid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="activitypointer" BaseType="mscrm.crmbaseentity" Abstract="true">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="email" BaseType="mscrm.activitypointer">
        <Property Name="sender" Type="Edm.String" />
      </EntityType>
      <Action Name="Merge">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="Subordinate" Type="mscrm.crmbaseentity" Nullable="false" />
      </Action>
      <Function Name="InitializeFrom">
        <Parameter Name="EntityMoniker" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="TargetEntityName" Type="Edm.String" Nullable="false" />
        <ReturnType Type="mscrm.crmbaseentity" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="opportunities" EntityType="Microsoft.Dynamics.CRM.opportunity" />
        <EntitySet Name="activitypointers" EntityType="Microsoft.Dynamics.CRM.activitypointer" />
        <EntitySet Name="emails" EntityType="Microsoft.Dynamics.CRM.email" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
  let out: string;
  interface TablesModule {
    ENTITY_SETS: string;
    PRIMARY_KEYS: Record<string, string>;
  }
  type Op = new (...args: unknown[]) => {
    toRequestInformation(baseUrl: string): { url: string; body?: unknown };
  };
  const load = async <T>(path: string): Promise<T> => {
    const mod: unknown = await import(join(out, path));
    return mod as T;
  };

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(OUT_ROOT, ".gen-72-"));
    const csdl = parseEdmx(REFS_EDMX);
    await generateActions(csdl, join(out, "actions"), false);
    await generateFunctions(csdl, join(out, "functions"), false);
    await generateEntityTables(csdl, join(out, "references"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("parses entity keys", () => {
    const csdl = parseEdmx(REFS_EDMX);
    expect(csdl.entityTypes.find((t) => t.name === "account")?.key).toEqual(["accountid"]);
    expect(csdl.entityTypes.find((t) => t.name === "email")?.key).toEqual([]);
  });

  it("the entity tables hold the CSDL's entity sets and the keys that aren't <name>id", async () => {
    const tables = await load<TablesModule>("references/entity-tables.ts");
    expect(tables.ENTITY_SETS.split(",")).toEqual([
      "account",
      "activitypointer",
      "email",
      "opportunity:opportunities",
    ]);
    // An activity inherits activitypointer's key
    expect(tables.PRIMARY_KEYS).toEqual({ activitypointer: "activityid", email: "activityid" });
  });

  it("the packages import the one EntityReference from entities-runtime and write no copy (#295)", async () => {
    for (const [pkg, op] of [
      ["actions", "MergeAction"],
      ["functions", "InitializeFromFunction"],
    ] as const) {
      await expect(readFile(join(out, pkg, "types", "EntityReference.ts"))).rejects.toThrow();
      expect(await readFile(join(out, pkg, `${op}.ts`), "utf8")).toContain(
        "import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';"
      );
      expect(await readFile(join(out, pkg, "index.ts"), "utf8")).toContain(
        "export { type EntityReference, type EntityReferenceOptions, type WebApiEntityReference, createEntityReference, getEntitySetNameFromReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';"
      );
    }
  });

  it("an action body carries the reference in the Web API shape", async () => {
    const { MergeAction } = await load<{ MergeAction: Op }>("actions/MergeAction.ts");
    const info = new MergeAction({
      Target: createEntityReference("account", "a1"),
      Subordinate: createEntityReference("account", "a2"),
    }).toRequestInformation(BASE);
    expect(JSON.parse(JSON.stringify(info.body))).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" },
      Subordinate: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a2" },
    });
  });

  it("a function parameter is @odata.id from the reference's entity set; an unknown set throws", async () => {
    const { InitializeFromFunction } = await load<{ InitializeFromFunction: Op }>(
      "functions/InitializeFromFunction.ts"
    );
    const url = new InitializeFromFunction({
      EntityMoniker: createEntityReference("opportunity", "o1"),
      TargetEntityName: "account",
    }).toRequestInformation(BASE).url;
    expect(decodeURIComponent(url)).toContain('@p1={"@odata.id":"opportunities(o1)"}');
    const unknown = new InitializeFromFunction({
      EntityMoniker: createEntityReference("new_thing", "n1"),
      TargetEntityName: "x",
    });
    expect(() => unknown.toRequestInformation(BASE)).toThrow(/needs an entitySetName/);
  });
});

/** #71: an operation that returns one entity is typed as the entity, not `{ value: T }`. */
describe("#71: entity return types", () => {
  const RETURNS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="asyncoperation" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="asyncoperationid" /></Key>
        <Property Name="asyncoperationid" Type="Edm.Guid" />
      </EntityType>
      <Action Name="ExecuteWorkflow">
        <Parameter Name="EntityId" Type="Edm.Guid" Nullable="false" />
        <ReturnType Type="mscrm.asyncoperation" Nullable="false" />
      </Action>
      <Action Name="ListOperations">
        <ReturnType Type="Collection(mscrm.asyncoperation)" Nullable="false" />
      </Action>
      <Function Name="GetPreferredSolution">
        <ReturnType Type="mscrm.crmbaseentity" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="asyncoperations" EntityType="Microsoft.Dynamics.CRM.asyncoperation" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  let out: string;
  const read = (path: string) => readFile(join(out, path), "utf8");

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    out = await mkdtemp(join(OUT_ROOT, ".gen-71-"));
    const csdl = parseEdmx(RETURNS_EDMX);
    for (const target of ["actions", "functions"]) {
      await generateComplexTypes(csdl, join(out, target, "types"));
    }
    await generateActions(csdl, join(out, "actions"), false);
    await generateFunctions(csdl, join(out, "functions"), false);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await rm(out, { recursive: true, force: true });
  });

  it("a single entity return is the entity; a collection is the array of records (#300)", async () => {
    const action = await read("actions/ExecuteWorkflowAction.ts");
    expect(action).toMatch(/export type ExecuteWorkflowResponse =\s*\|?\s*\(asyncoperation & \{/);
    expect(action).not.toContain("value: asyncoperation");
    expect(await read("actions/ListOperationsAction.ts")).toMatch(
      /export type ListOperationsResponse = Array<\s*asyncoperation & \{/
    );
  });

  it("a crmbaseentity return is a record with the annotations", async () => {
    const fn = await read("functions/GetPreferredSolutionFunction.ts");
    expect(fn).toContain("[column: string]: unknown");
    expect(fn).not.toContain("EntityReference");
  });

  it("res.asyncoperationid type-checks and res.value doesn't", async () => {
    const ok = await typecheck(
      join(out, "actions"),
      "usage-71-ok.ts",
      `import type { ExecuteWorkflowResponse } from "./ExecuteWorkflowAction.js";
declare const res: ExecuteWorkflowResponse;
export const id: string | undefined = res?.asyncoperationid;
`
    );
    expect(ok).toEqual([]);
    const bad = await typecheck(
      join(out, "actions"),
      "usage-71-bad.ts",
      `import type { ExecuteWorkflowResponse } from "./ExecuteWorkflowAction.js";
declare const res: ExecuteWorkflowResponse;
export const v = res.value;
`
    );
    expect(bad.join("\n")).toMatch(/usage-71-bad\.ts\(3\)/);
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
    // In this package: a bound message imports core at runtime for its record id (#386)
    out = await mkdtemp(join(OUT_ROOT, ".gen-70-"));
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

  it("a complex-type return is the body itself, as the action returns it (#300)", async () => {
    const code = await read("messages/QueryExpressionToFetchXmlMessage.ts");
    expect(code).toContain("export interface QueryExpressionToFetchXmlResult {");
    expect(code).toContain("public result: QueryExpressionToFetchXmlResult");
    const Response_ = await response(
      "QueryExpressionToFetchXmlMessage.ts",
      "QueryExpressionToFetchXmlResponse"
    );
    const data = {
      "@odata.context":
        "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.QueryExpressionToFetchXmlResponse",
      FetchXml: "<fetch/>",
    };
    expect(Response_.fromResponse(data).result).toEqual(data);
  });

  it("an entity return is the record with its annotations (#300)", async () => {
    expect(await read("messages/ExecuteWorkflowMessage.ts")).toContain(
      "public result: ExecuteWorkflowResult"
    );
    const Response_ = await response("ExecuteWorkflowMessage.ts", "ExecuteWorkflowResponse");
    const data = {
      "@odata.context": "$metadata#asyncoperations/$entity",
      "@odata.etag": 'W/"1"',
      asyncoperationid: "aaa",
    };
    expect(Response_.fromResponse(data).result).toEqual(data);
    expect(Response_.fromResponse(undefined).result).toBeNull();
  });

  it("a crmbaseentity return is a record, not an EntityReference", async () => {
    const code = await read("messages/DequeueMessage.ts");
    expect(code).toContain("[column: string]: unknown");
    expect(code).not.toContain("EntityReference");
    const Response_ = await response("DequeueMessage.ts", "DequeueResponse");
    expect(Response_.fromResponse({ "@odata.context": "x", emailid: "e1" }).result).toEqual({
      "@odata.context": "x",
      emailid: "e1",
    });
  });

  it("collection and primitive returns are read from value", async () => {
    expect(await read("messages/InstantiateTemplateMessage.ts")).toContain(
      "public result: InstantiateTemplateResult"
    );
    const many = await response("InstantiateTemplateMessage.ts", "InstantiateTemplateResponse");
    expect(many.fromResponse({ value: [{ subject: "s" }] }).result).toEqual([{ subject: "s" }]);
    expect(many.fromResponse(undefined).result).toEqual([]);
    const count = await response("CountThingsMessage.ts", "CountThingsResponse");
    expect(count.fromResponse({ "@odata.context": "x", value: 3 }).result).toBe(3);
  });

  it("parseResponse goes through fromResponse; a message without a return has no result", async () => {
    const mod = (await import(join(out, "messages", "ExecuteWorkflowMessage.ts"))) as {
      ExecuteWorkflowRequest: new (
        id: string,
        parameters: { EntityId: string }
      ) => {
        parseResponse(r: Response): Promise<{ result: unknown }>;
      };
    };
    const req = new mod.ExecuteWorkflowRequest("w1", { EntityId: "e1" });
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
      "`${baseUrl}/opportunities(${odataLiteral.guid(this.opportunityId)})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`"
    );
    expect(await read("GetRunMapMessage.ts")).toContain(
      "`${baseUrl}/businessprocesses(${odataLiteral.guid(this.businessprocessId)})/Microsoft.Dynamics.CRM.GetRunMap`"
    );
  });

  it("falls back to <type>s with a warning, like actions, only without an entity set", async () => {
    const code = await read("OrphanMessage.ts");
    expect(code).toContain("// WARNING: Entity set not found in metadata");
    expect(code).toContain("`${baseUrl}/nosetentitys(${odataLiteral.guid(this.nosetentityId)})/");
  });
});
