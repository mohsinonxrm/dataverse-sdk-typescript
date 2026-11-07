/**
 * #333: the package roots exported only the enums of `types/`, so callers couldn't name the complex
 * and entity types their own parameters use (`opportunityclose`, `ComplexLookupAttributeMetadata`).
 * Now each root re-exports them, type-only. A complex type named like an operation's response
 * (`<Operation>Response`) isn't re-exported: the root's name is the operation's response. Any
 * other collision is an error.
 */
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import {
  exportedNames,
  exportedTypeNames,
  generateComplexTypes,
  rootTypeExports,
} from "../src/generators/complex-types-generator.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const PACKAGES = fileURLToPath(new URL("../../../packages", import.meta.url));
const MESSAGES_SRC = join(PACKAGES, "dataverse-sdk-messages", "src");

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EnumType Name="ImeMode">
        <Member Name="Auto" Value="0" />
        <Member Name="Active" Value="2" />
      </EnumType>
      <ComplexType Name="Label">
        <Property Name="Text" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="QueryBase" Abstract="true">
        <Property Name="EntityName" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="FetchExpression" BaseType="mscrm.QueryBase">
        <Property Name="Query" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="Solution">
        <Property Name="UniqueName" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="ShareResponse">
        <Property Name="Shared" Type="Edm.Boolean" />
        <Property Name="Count" Type="Edm.Int32" />
      </ComplexType>
      <ComplexType Name="CountResponse">
        <Property Name="Count" Type="Edm.Int32" />
        <Property Name="Total" Type="Edm.Int32" />
      </ComplexType>
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="opportunityclose" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
        <Property Name="subject" Type="Edm.String" />
      </EntityType>
      <EntityType Name="solution" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="solutionid" /></Key>
        <Property Name="solutionid" Type="Edm.Guid" />
      </EntityType>
      <Action Name="Share">
        <Parameter Name="Close" Type="mscrm.opportunityclose" Nullable="false" />
        <Parameter Name="Title" Type="mscrm.Label" />
        <Parameter Name="Mode" Type="mscrm.ImeMode" />
        <ReturnType Type="mscrm.ShareResponse" Nullable="false" />
      </Action>
      <Function Name="Count">
        <Parameter Name="Query" Type="mscrm.QueryBase" Nullable="false" />
        <ReturnType Type="mscrm.CountResponse" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="opportunitycloses" EntityType="Microsoft.Dynamics.CRM.opportunityclose" />
        <EntitySet Name="solutions" EntityType="Microsoft.Dynamics.CRM.solution" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-root-type-exports-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  for (const file of ["OrganizationRequest.ts", "types.ts"]) {
    await copyFile(join(MESSAGES_SRC, file), join(dir, "messages", file));
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

const read = (path: string): Promise<string> => readFile(join(dir, path), "utf8");

/** Every name an index exports, in order, with duplicates (`exportedNames` is a set). */
function allExportedNames(code: string): string[] {
  return [...code.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)].flatMap((m) =>
    m[1]
      .split(",")
      .map((part) => part.trim().replace(/^type\s+/, ""))
      .filter(Boolean)
      .map((part) => part.split(/\s+as\s+/).pop() ?? part)
  );
}

/**
 * The names of the `export type { … } from "<from>"` statements of an index (any module when
 * `from` is left out).
 */
function typeOnlyTypesExports(code: string, from = "./types/index.js"): string[] {
  return [...code.matchAll(/export type \{([^}]*)\} from ["']([^"']+)["'];/g)]
    .filter((m) => from === "*" || m[2] === from)
    .flatMap((m) =>
      m[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
}

describe("rootTypeExports (#333)", () => {
  it("re-exports the type names type-only, leaving out the operations' responses", () => {
    const code =
      "export { ShareAction, type ShareActionParameters, type ShareResponse } from './ShareAction.js';\n";
    const out = rootTypeExports(
      ["Label", "ShareResponse", "opportunityclose"],
      code,
      new Set(["ShareResponse"])
    );
    expect(out).toContain("export type { Label, opportunityclose } from './types/index.js';");
    expect(out).not.toContain("export {");
  });

  it("throws on a collision with any other root export", () => {
    for (const taken of [
      "export { ShareAction } from './ShareAction.js';\n",
      "export { type ShareActionParameters } from './ShareAction.js';\n",
      "export { type EntityReference, createEntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';\n",
      "export type { AnyEntityPayload, EntityPayload } from './types/EntityPayload.js';\n",
      "export { ImeMode } from './types/index.js';\n",
      "export { CountRequest, CountResponse, type CountResult } from './CountMessage.js';\n",
    ]) {
      const name = [...exportedNames(taken)][0] ?? "";
      expect(() => rootTypeExports([name], taken, new Set(["ShareResponse"])), name).toThrow(
        /has the name of another export of the package root/
      );
    }
  });

  it("writes nothing when every name is taken", () => {
    expect(rootTypeExports([], "", new Set())).toBe("");
  });

  it("lists the complex and entity types and their Typed unions, not the enums", () => {
    expect(exportedTypeNames(parseEdmx(EDMX))).toEqual([
      "CountResponse",
      "FetchExpression",
      "Label",
      "opportunityclose",
      "QueryBase",
      "TypedQueryBase",
      "ShareResponse",
      "solution",
      "Solution",
    ]);
  });
});

describe("generated package roots export the types (#333)", () => {
  it("each index re-exports the complex and entity types type-only, and no name twice", async () => {
    const expected: Record<string, string[]> = {
      // The action's ShareResponse shadows the complex type of the same name
      actions: ["CountResponse", "FetchExpression", "Label", "opportunityclose", "QueryBase"],
      // The function's CountResponse shadows the complex type of the same name
      functions: ["FetchExpression", "Label", "opportunityclose", "QueryBase", "TypedQueryBase"],
      messages: ["CountResponse", "FetchExpression", "Label", "opportunityclose", "QueryBase"],
    };
    for (const pkg of ["actions", "functions", "messages"]) {
      const index = await read(`${pkg}/index.ts`);
      const types = typeOnlyTypesExports(index);
      expect(types, pkg).toEqual(expect.arrayContaining(expected[pkg] ?? []));
      expect(types, pkg).toEqual(expect.arrayContaining(["solution", "Solution"]));
      // The enum stays a value export
      expect(types, pkg).not.toContain("ImeMode");
      const names = allExportedNames(index);
      expect(names.length, pkg).toBe(new Set(names).size);
    }
    expect(typeOnlyTypesExports(await read("actions/index.ts"))).not.toContain("ShareResponse");
    expect(typeOnlyTypesExports(await read("functions/index.ts"))).not.toContain("CountResponse");
  });

  it("the types compile from the root, and the root's <Operation>Response is the operation's", async () => {
    const errors = await typecheck(
      dir,
      "use-root-types.ts",
      `import type { Label, opportunityclose, solution, Solution, TypedQueryBase, ShareResponse, CountResponse as ActionsCountResponse } from "./actions/index.js";
import type { CountResponse, FetchExpression } from "./functions/index.js";
import type { Label as MessageLabel, opportunityclose as MessageClose } from "./messages/index.js";
import { ImeMode, ShareAction, type EntityPayload } from "./actions/index.js";
const close: EntityPayload<opportunityclose> = { subject: "Won", "opportunityid@odata.bind": "/opportunities(o1)" };
export const activity: opportunityclose = { subject: "Won" };
const label: Label = { Text: "x" };
export const share = new ShareAction({ Close: close, Title: label, Mode: ImeMode.Active });
export const query: TypedQueryBase = { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression", Query: "<fetch/>" };
export const fetch: FetchExpression = { Query: "<fetch/>" };
export const record: solution = { solutionid: "s1" };
export const value: Solution = { UniqueName: "s" };
export const messageTypes: [MessageLabel, MessageClose] = [label, { subject: "Won" }];
// The operations' responses carry @odata.context; the complex types of the same name don't
export const shared: ShareResponse = { "@odata.context": "c", Shared: true, Count: 1 };
export const count: CountResponse = { "@odata.context": "c", Count: 1, Total: 2 };
// actions has no Count function: its CountResponse is the complex type
// @ts-expect-error the complex type has no @odata.context
export const csdlCount: ActionsCountResponse = { "@odata.context": "c", Count: 1 };
`
    );
    expect(errors).toEqual([]);
  });

  it("the type exports are type-only: a type isn't a value", async () => {
    const errors = await typecheck(
      dir,
      "use-root-type-as-value.ts",
      `import { Label } from "./actions/index.js";
export const x = Label;
`
    );
    expect(errors.join("\n")).toMatch(/only refers to a type|cannot be used as a value/);
  });
});

describe("the committed packages (#333)", () => {
  for (const pkg of ["actions", "functions", "messages"]) {
    it(`@mohsinonxrm/dataverse-sdk-${pkg} exports every type of types/ from its root, type-only`, async () => {
      const src = join(PACKAGES, `dataverse-sdk-${pkg}`, "src");
      const index = await readFile(join(src, "index.ts"), "utf8");
      const typesIndex = await readFile(join(src, "types", "index.ts"), "utf8");

      // No name is exported twice
      const names = allExportedNames(index);
      expect(names.length).toBe(new Set(names).size);

      // Every type-only name of types/ is re-exported type-only, or is an operation's response
      const reexported = new Set(typeOnlyTypesExports(index));
      expect(reexported.size).toBeGreaterThan(0);
      const typeNames = typeOnlyTypesExports(typesIndex, "*");
      const responses = new Set(
        [...index.matchAll(/from "\.\/(\w+)(?:Action|Function|Message)\.js";/g)].map(
          (m) => `${m[1]}Response`
        )
      );
      const missing = typeNames.filter((t) => !reexported.has(t) && !responses.has(t));
      expect(missing).toEqual([]);
      // The shadowed ones are exactly the operations' responses, which the root exports
      for (const t of typeNames.filter((n) => !reexported.has(n))) {
        expect(names).toContain(t);
        expect(t).toMatch(/Response$/);
      }

      // The issue's examples
      expect(reexported).toContain("opportunityclose");
      expect(reexported).toContain("ComplexLookupAttributeMetadata");
      // The value exports from types/ are the enums only
      const valueExports = [
        ...index.matchAll(/export \{([^}]*)\} from "\.\/types\/index\.js";/g),
      ].flatMap((m) => m[1].split(",").map((s) => s.trim()));
      for (const name of valueExports.filter(Boolean)) {
        expect(typesIndex).toContain(`export { ${name} } from`);
      }
    });
  }
});
