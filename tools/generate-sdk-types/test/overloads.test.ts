/**
 * #75: operations with the same name but different bindings each get their own class
 * (`<Name>_<binding>`, as #202 does for the entities generator) instead of overwriting each other
 * in one file per name. The unbound overload keeps the plain name; a name with no unbound overload
 * keeps it as a deprecated alias of the overload it exported before. ExportToExcel, which
 * `$metadata` leaves out, comes from the supplemental definition.
 */
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { operationNames } from "../src/utils/overloads.js";
import { withSupplementalMetadata } from "../src/supplemental/supplemental-metadata.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const MESSAGES_SRC = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-messages/src", import.meta.url)
);

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="systemuser" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="team" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="teamid" /></Key>
        <Property Name="teamid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="savedquery" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="savedqueryid" /></Key>
        <Property Name="savedqueryid" Type="Edm.Guid" />
      </EntityType>
      <ComplexType Name="InputArgumentCollection">
        <Property Name="Arguments" Type="mscrm.InputArgument" />
      </ComplexType>
      <ComplexType Name="InputArgument">
        <Property Name="Count" Type="Edm.Int32" />
      </ComplexType>
      <EnumType Name="AccessRights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="ReadAccess" Value="1" />
      </EnumType>
      <Function Name="RetrievePrincipalAccess" IsBound="true">
        <Parameter Name="entity" Type="mscrm.systemuser" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="mscrm.AccessRights" Nullable="false" />
      </Function>
      <Function Name="RetrievePrincipalAccess" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="mscrm.AccessRights" Nullable="false" />
      </Function>
      <Function Name="RetrieveUnpublishedMultiple" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.savedquery)" Nullable="false" />
        <ReturnType Type="Collection(mscrm.savedquery)" Nullable="false" />
      </Function>
      <Function Name="RetrieveUnpublishedMultiple" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.team)" Nullable="false" />
        <ReturnType Type="Collection(mscrm.team)" Nullable="false" />
      </Function>
      <Action Name="ShareRecord">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
      </Action>
      <Action Name="ShareRecord" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
        <EntitySet Name="teams" EntityType="Microsoft.Dynamics.CRM.team" />
        <EntitySet Name="savedqueries" EntityType="Microsoft.Dynamics.CRM.savedquery" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;
const read = (path: string): Promise<string> => readFile(join(dir, path), "utf8");

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-overloads-test-"));
  const csdl = withSupplementalMetadata(parseEdmx(EDMX));
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  const { copyFile } = await import("node:fs/promises");
  for (const file of ["OrganizationRequest.ts", "types.ts"]) {
    await copyFile(join(MESSAGES_SRC, file), join(dir, "messages", file));
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("operation overloads (#75)", () => {
  it("writes one class per binding instead of overwriting one file per name", async () => {
    const files = await readdir(join(dir, "functions"));
    expect(files).toEqual(
      expect.arrayContaining([
        "RetrievePrincipalAccess_systemuserFunction.ts",
        "RetrievePrincipalAccess_teamFunction.ts",
        "RetrievePrincipalAccessFunction.ts",
        "RetrieveUnpublishedMultiple_savedquery_collectionFunction.ts",
        "RetrieveUnpublishedMultiple_team_collectionFunction.ts",
      ])
    );
    expect(await read("functions/RetrievePrincipalAccess_systemuserFunction.ts")).toContain(
      "/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess"
    );
    expect(await read("functions/RetrievePrincipalAccess_teamFunction.ts")).toContain(
      "/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess"
    );
  });

  it("keeps the unbound overload under the plain name", async () => {
    const files = await readdir(join(dir, "actions"));
    expect(files).toEqual(
      expect.arrayContaining(["ShareRecordAction.ts", "ShareRecord_teamAction.ts"])
    );
    const unbound = await read("actions/ShareRecordAction.ts");
    expect(unbound).toContain("export class ShareRecordAction");
    expect(unbound).toContain("const url = `${baseUrl}/ShareRecord`;");
    expect(unbound).not.toContain("@deprecated");
    expect(await read("messages/ShareRecord_teamMessage.ts")).toContain(
      "export class ShareRecord_teamRequest"
    );
  });

  it("keeps a name with no unbound overload as a deprecated alias of its last binding", async () => {
    const alias = await read("functions/RetrievePrincipalAccessFunction.ts");
    expect(alias).toContain("@deprecated Use `RetrievePrincipalAccess_teamFunction`");
    expect(alias).toContain(
      "export const RetrievePrincipalAccessFunction = RetrievePrincipalAccess_teamFunction;"
    );
    const index = await read("functions/index.ts");
    for (const stem of [
      "RetrievePrincipalAccess",
      "RetrievePrincipalAccess_systemuser",
      "RetrievePrincipalAccess_team",
    ]) {
      expect(index).toContain(
        `export { ${stem}Function, type ${stem}Response } from './${stem}Function.js';`
      );
    }
  });

  it("compiles every overload and the aliases", async () => {
    const errors = await typecheck(
      dir,
      "use-overloads.ts",
      `import * as f from "./functions/index.js";
import * as a from "./actions/index.js";
import * as m from "./messages/index.js";
const target = f.createEntityReference("account", "a1", { entitySetName: "accounts" });
export const byUser = new f.RetrievePrincipalAccess_systemuserFunction("u1", target);
export const byTeam = new f.RetrievePrincipalAccess_teamFunction("t1", target);
export const old: f.RetrievePrincipalAccessFunction = new f.RetrievePrincipalAccessFunction("t1", target);
export const views = new f.RetrieveUnpublishedMultiple_savedquery_collectionFunction();
export const share = new a.ShareRecordAction(a.createEntityReference("account", "a1"));
export const shareTeam = new m.ShareRecord_teamRequest("t1", m.createEntityReference("account", "a1"));
`
    );
    expect(errors).toEqual([]);
  });

  it("warns instead of overwriting when two definitions get the same name", () => {
    const op = {
      name: "Twice",
      namespace: "Microsoft.Dynamics.CRM",
      isBound: true,
      bindingParameter: { name: "entity", type: "mscrm.team" },
      parameters: [],
    };
    const warnings: string[] = [];
    const { stems } = operationNames([op, { ...op }], (w) => warnings.push(w));
    expect([...stems.values()]).toEqual(["Twice_team", "Twice_team_2"]);
    expect(warnings).toHaveLength(1);
  });
});

describe("supplemental ExportToExcel (#75)", () => {
  it("generates ExportToExcelAction and ExportToExcelRequest with the five required parameters", async () => {
    const action = await read("actions/ExportToExcelAction.ts");
    expect(action).toContain("export class ExportToExcelAction");
    expect(action).toContain("public readonly view: EntityReference | AnyEntityPayload,");
    expect(action).toContain("public readonly queryParameters: InputArgumentCollection");
    expect(action).toContain("ExcelFile: string;");
    expect(await read("messages/ExportToExcelMessage.ts")).toContain(
      "export class ExportToExcelRequest"
    );
    const errors = await typecheck(
      dir,
      "use-export.ts",
      `import { ExportToExcelAction, createEntityReference } from "./actions/index.js";
export const x = new ExportToExcelAction(
  createEntityReference("savedquery", "v1"), "<fetch/>", "<grid/>", "", {}
);
`
    );
    expect(errors).toEqual([]);
  });

  it("an org's own definition wins over the supplemental one", () => {
    const csdl = parseEdmx(EDMX);
    const own = {
      ...csdl,
      actions: [
        {
          name: "ExportToExcel",
          namespace: "Microsoft.Dynamics.CRM",
          isBound: false,
          parameters: [],
        },
      ],
    };
    const merged = withSupplementalMetadata(own);
    expect(merged.actions.filter((a) => a.name === "ExportToExcel")).toHaveLength(1);
    expect(merged.actions[0]?.parameters).toEqual([]);
    expect(withSupplementalMetadata(csdl).actions.map((a) => a.name)).toContain("ExportToExcel");
  });
});
