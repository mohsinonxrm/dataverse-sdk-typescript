/**
 * #342: the Web API's query functions (`LastXDays`, `In`, `Under`, …) were generated as
 * `Executable` classes, which send `GET /LastXDays(...)`: Dataverse answers 404, because it runs a
 * query function only inside `$filter`. They are now `queryFunctions` helpers that return the
 * `$filter` expression, each value an OData literal of its `$metadata` type.
 */
import { readFileSync } from "node:fs";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import {
  checkQueryFunctions,
  isQueryFunction,
  queryFunctionKey,
} from "../src/generators/query-functions-generator.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const METADATA = fileURLToPath(new URL("../metadata/", import.meta.url));

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <Function Name="LastXDays">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="PropertyValue" Type="Edm.Int64" Nullable="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Function Name="In">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="PropertyValues" Type="Collection(Edm.String)" Nullable="false" Unicode="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Function Name="Under">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="PropertyValue" Type="Edm.String" Nullable="false" Unicode="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Function Name="EqualUserId">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Function Name="InFiscalPeriodAndYear">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="PropertyValue1" Type="Edm.Int64" Nullable="false" />
        <Parameter Name="PropertyValue2" Type="Edm.Int64" Nullable="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <!-- Not query functions: no PropertyName, bound, or not Edm.Boolean -->
      <Function Name="ValidateQuery">
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
      <Function Name="BoundCheck" IsBound="true">
        <Parameter Name="entity" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
      <Function Name="CountRows">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.Int32" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

type Helper = (parameters: Record<string, unknown>) => string;

let dir: string;
let files: string[];
let index: string;
let q: Record<string, Helper>;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-query-functions-"));
  await generateFunctions(parseEdmx(EDMX), dir, false);
  files = await readdir(dir);
  index = await readFile(join(dir, "index.ts"), "utf8");
  // An empty object when the file is missing, so that each test fails on its own
  q = files.includes("queryFunctions.ts")
    ? (
        (await import(join(dir, "queryFunctions.ts"))) as {
          queryFunctions: Record<string, Helper>;
        }
      ).queryFunctions
    : {};
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("query functions are $filter helpers, not classes (#342)", () => {
  it("generates no Executable class or Response type for a query function", () => {
    for (const name of ["LastXDays", "In", "Under", "EqualUserId", "InFiscalPeriodAndYear"]) {
      expect(files).not.toContain(`${name}Function.ts`);
      expect(index).not.toMatch(new RegExp(`\\b${name}(Function|Response)\\b`));
    }
    // The other functions keep their classes, a boolean return included
    for (const name of ["ValidateQuery", "BoundCheck", "CountRows"]) {
      expect(files).toContain(`${name}Function.ts`);
    }
    expect(index).toMatch(/export \{ queryFunctions \} from ["']\.\/queryFunctions\.js["']/);
    // One helper per query function, in name order
    expect(Object.keys(q)).toEqual([
      "equalUserId",
      "in",
      "inFiscalPeriodAndYear",
      "lastXDays",
      "under",
    ]);
  });

  it("writes the exact expression, every value an OData literal of its type", () => {
    expect(q.lastXDays({ PropertyName: "createdon", PropertyValue: 7 })).toBe(
      "Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=7)"
    );
    expect(q.equalUserId({ PropertyName: "ownerid" })).toBe(
      "Microsoft.Dynamics.CRM.EqualUserId(PropertyName='ownerid')"
    );
    expect(
      q.inFiscalPeriodAndYear({
        PropertyName: "createdon",
        PropertyValue1: 3,
        PropertyValue2: 2024,
      })
    ).toBe(
      "Microsoft.Dynamics.CRM.InFiscalPeriodAndYear(PropertyName='createdon',PropertyValue1=3,PropertyValue2=2024)"
    );
    // A GUID in an Edm.String parameter is a quoted string, as the Web API documents Under
    expect(
      q.under({ PropertyName: "accountid", PropertyValue: "00000000-0000-0000-0000-00000000000a" })
    ).toBe(
      "Microsoft.Dynamics.CRM.Under(PropertyName='accountid',PropertyValue='00000000-0000-0000-0000-00000000000a')"
    );
  });

  it("escapes tricky literals: quotes doubled in strings, JSON in collections", () => {
    // A quote can't end the literal and add a condition
    expect(q.under({ PropertyName: "name", PropertyValue: "x') or (1 eq 1" })).toBe(
      "Microsoft.Dynamics.CRM.Under(PropertyName='name',PropertyValue='x'') or (1 eq 1')"
    );
    expect(q.equalUserId({ PropertyName: "own'er" })).toBe(
      "Microsoft.Dynamics.CRM.EqualUserId(PropertyName='own''er')"
    );
    // Collection(Edm.String) is a JSON array: " and \ escaped, ' as it is
    expect(
      q.in({ PropertyName: "name", PropertyValues: [`O'Brien`, `say "hi"`, "a\\b", "Ünï"] })
    ).toBe(
      `Microsoft.Dynamics.CRM.In(PropertyName='name',PropertyValues=["O'Brien","say \\"hi\\"","a\\\\b","Ünï"])`
    );
    expect(q.in({ PropertyName: "name", PropertyValues: [] })).toBe(
      "Microsoft.Dynamics.CRM.In(PropertyName='name',PropertyValues=[])"
    );
    // An Int64 takes a bigint in full; a fraction or NaN throws instead of making a bad URL
    expect(q.lastXDays({ PropertyName: "createdon", PropertyValue: 9007199254740993n })).toBe(
      "Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=9007199254740993)"
    );
    expect(() => q.lastXDays({ PropertyName: "createdon", PropertyValue: 1.5 })).toThrow(
      /safe integer/
    );
    expect(() => q.lastXDays({ PropertyName: "createdon", PropertyValue: Number.NaN })).toThrow(
      /safe integer/
    );
  });

  it("throws when a required parameter is missing or null", () => {
    expect(() => q.lastXDays({ PropertyName: "createdon" })).toThrow(
      expect.objectContaining({
        name: "MissingParameter",
        message: "Missing required parameter: PropertyValue (LastXDays)",
      })
    );
    expect(() => q.equalUserId({ PropertyName: null })).toThrow(/PropertyName \(EqualUserId\)/);
  });

  it("types the parameters from the CSDL: PropertyName is required", async () => {
    const errors = await typecheck(
      dir,
      "usage.ts",
      [
        `import { queryFunctions } from "./queryFunctions.js";`,
        `const ok: string = queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 });`,
        `const values = ["a", "b"] as const;`,
        `queryFunctions.in({ PropertyName: "name", PropertyValues: values });`,
        `queryFunctions.lastXDays({ PropertyValue: 7 });`,
        `queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: "7" });`,
        `queryFunctions.in({ PropertyName: "name", PropertyValues: "a" });`,
        `queryFunctions.equalUserId();`,
        `void ok;`,
      ].join("\n")
    );
    expect(errors.map((e) => e.replace(/^[^(]*\((\d+)\)[\s\S]*$/, "$1"))).toEqual([
      "5",
      "6",
      "7",
      "8",
    ]);
  });
});

describe("detecting query functions (#342)", () => {
  const snapshot = parseEdmx(readFileSync(join(METADATA, "dataverse-metadata.xml"), "utf8"));
  const solutions = JSON.parse(
    readFileSync(join(METADATA, "operation-solutions.json"), "utf8")
  ) as Record<string, string[]>;
  const queryFunctions = snapshot.functions.filter(isQueryFunction);

  it("finds the 71 query functions of the snapshot: exactly the operations with no SDK message", () => {
    const names = queryFunctions.map((f) => f.name).sort();
    expect(names).toHaveLength(71);
    expect(new Set(names).size).toBe(71);
    const noMessage = Object.entries(solutions).flatMap(([n, s]) => (s.length === 0 ? [n] : []));
    expect(names).toEqual(noMessage.sort());
    expect(names).toEqual(expect.arrayContaining(["Above", "Between", "EqualUserId", "In"]));
    expect(names).toEqual(expect.arrayContaining(["InFiscalYear", "LastXDays", "Today", "Under"]));
    expect(() => {
      checkQueryFunctions(snapshot.functions, solutions);
    }).not.toThrow();
  });

  it("every function that returns a value of its own is a query function, and takes only Edm values", () => {
    // The CSDL's only Edm.* returns are the query functions' Edm.Boolean
    const edmReturns = snapshot.functions.filter((f) => f.returnType?.startsWith("Edm."));
    expect(edmReturns.filter((f) => !isQueryFunction(f)).map((f) => f.name)).toEqual([]);
    for (const fn of queryFunctions) {
      for (const p of fn.parameters) expect(p.type).toMatch(/^(Collection\()?Edm\.\w+\)?$/);
    }
    // camelCase keys never collide
    expect(new Set(queryFunctions.map((f) => queryFunctionKey(f.name))).size).toBe(71);
  });

  it("fails regen when the shape and the recorded solutions disagree", () => {
    expect(() => {
      checkQueryFunctions(snapshot.functions, { ...solutions, LastXDays: ["System"] });
    }).toThrow(/Shaped like a query function, but with an SDK message: LastXDays/);
    expect(() => {
      checkQueryFunctions(snapshot.functions, { ...solutions, WhoAmI: [] });
    }).toThrow(/No SDK message, but not a query function: WhoAmI/);
  });

  it("the functions README lists every helper of the committed package, once", () => {
    const root = fileURLToPath(
      new URL("../../../packages/dataverse-sdk-functions/", import.meta.url)
    );
    const source = readFileSync(join(root, "src", "queryFunctions.ts"), "utf8");
    const helpers = [...source.matchAll(/^ {2}(\w+): \(parameters/gm)].map((m) => m[1]);
    expect(helpers.sort()).toEqual(queryFunctions.map((f) => queryFunctionKey(f.name)).sort());
    const readme = readFileSync(join(root, "README.md"), "utf8");
    const section = readme.slice(readme.indexOf("### Query functions in `$filter`"));
    const table = section.slice(
      section.indexOf("| Group"),
      section.indexOf("\n\n", section.indexOf("| Group"))
    );
    const listed = [...table.matchAll(/`(\w+)`/g)].map((m) => m[1]);
    expect(listed.sort()).toEqual(helpers.sort());
  });
});
