/**
 * #232: the Web API reads an enum value in a JSON body only as a string, and answers 400 to a
 * number ("Cannot read the value '1' as a quoted JSON string value"). The generated actions and
 * messages pass each body parameter that can hold an enum through `internal/enumBody.ts`, whose
 * tables come from the CSDL: flags enums, recursive and derived complex types, collections.
 */
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
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
      <EnumType Name="AccessRights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="ReadAccess" Value="1" />
        <Member Name="WriteAccess" Value="2" />
        <Member Name="ShareAccess" Value="262144" />
      </EnumType>
      <EnumType Name="LogicalOperator">
        <Member Name="And" Value="0" />
        <Member Name="Or" Value="1" />
      </EnumType>
      <EnumType Name="ResponseOnly">
        <Member Name="A" Value="0" />
      </EnumType>
      <ComplexType Name="PrincipalAccess">
        <Property Name="AccessMask" Type="mscrm.AccessRights" />
      </ComplexType>
      <ComplexType Name="QueryBase" />
      <ComplexType Name="QueryExpression" BaseType="mscrm.QueryBase">
        <Property Name="EntityName" Type="Edm.String" />
        <Property Name="Criteria" Type="mscrm.FilterExpression" />
        <Property Name="SubQueryExpression" Type="mscrm.QueryExpression" />
      </ComplexType>
      <ComplexType Name="FetchExpression" BaseType="mscrm.QueryBase">
        <Property Name="Query" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="FilterExpression">
        <Property Name="FilterOperator" Type="mscrm.LogicalOperator" />
        <Property Name="Filters" Type="Collection(mscrm.FilterExpression)" />
      </ComplexType>
      <ComplexType Name="SomeResponse">
        <Property Name="Value" Type="mscrm.ResponseOnly" />
      </ComplexType>
      <Action Name="GrantAccess">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="PrincipalAccess" Type="mscrm.PrincipalAccess" Nullable="false" />
      </Action>
      <Action Name="GenerateSharedLink">
        <Parameter Name="SharedRights" Type="mscrm.AccessRights" Nullable="false" />
      </Action>
      <Action Name="RunQueries">
        <Parameter Name="Query" Type="mscrm.QueryBase" Nullable="false" />
        <Parameter Name="QuerySet" Type="Collection(mscrm.QueryExpression)" />
      </Action>
      <Action Name="Echo">
        <Parameter Name="Text" Type="Edm.String" Nullable="false" />
        <ReturnType Type="mscrm.SomeResponse" />
      </Action>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-enum-body-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
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

type EnumBody = (value: unknown, type: string) => unknown;
async function enumBodyOf(target: "actions" | "messages"): Promise<EnumBody> {
  const url = pathToFileURL(join(dir, target, "internal", "enumBody.ts")).href;
  return ((await import(url)) as { enumBody: EnumBody }).enumBody;
}

describe("enum values in bodies (#232)", () => {
  it("parses IsFlags", () => {
    const csdl = parseEdmx(EDMX);
    expect(csdl.enumTypes.find((e) => e.name === "AccessRights")?.isFlags).toBe(true);
    expect(csdl.enumTypes.find((e) => e.name === "LogicalOperator")?.isFlags).toBe(false);
  });

  it("passes the parameters that can hold an enum through enumBody", async () => {
    expect(await read("actions/GrantAccessAction.ts")).toContain(
      'PrincipalAccess: enumBody(this.principalAccess, "PrincipalAccess"),'
    );
    expect(await read("actions/GenerateSharedLinkAction.ts")).toContain(
      'SharedRights: enumBody(this.sharedRights, "AccessRights"),'
    );
    const run = await read("actions/RunQueriesAction.ts");
    expect(run).toContain('Query: enumBody(this.query, "QueryBase"),');
    expect(run).toContain('QuerySet: enumBody(this.querySet, "QueryExpression"),');
    expect(await read("messages/RunQueriesMessage.ts")).toContain(
      'QuerySet: enumBody(this.querySet, "QueryExpression"),'
    );
    expect(await read("actions/EchoAction.ts")).not.toContain("enumBody");
  });

  it("lists only what a body can reach", async () => {
    const source = await read("actions/internal/enumBody.ts");
    expect(source).toContain("QueryBase: {}");
    expect(source).not.toContain("ResponseOnly");
    expect(source).not.toContain("SomeResponse");
    expect(source).not.toContain("FetchExpression");
    expect(await read("messages/internal/enumBody.ts")).toBe(source);
  });

  it("writes member names: flags, nested, derived, recursive and in collections", async () => {
    const enumBody = await enumBodyOf("actions");
    expect(enumBody({ AccessMask: 262145 }, "PrincipalAccess")).toEqual({
      AccessMask: "ReadAccess, ShareAccess",
    });
    expect(enumBody(0, "AccessRights")).toBe("None");
    expect(enumBody(2, "AccessRights")).toBe("WriteAccess");
    expect(enumBody(4, "AccessRights")).toBe("4");
    expect(enumBody("ReadAccess", "AccessRights")).toBe("ReadAccess");
    expect(enumBody(5, "LogicalOperator")).toBe("5");
    const query = {
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      Criteria: { FilterOperator: 1, Filters: [{ FilterOperator: 0 }] },
      SubQueryExpression: { Criteria: { FilterOperator: 1 } },
    };
    expect(enumBody(query, "QueryBase")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      Criteria: { FilterOperator: "Or", Filters: [{ FilterOperator: "And" }] },
      SubQueryExpression: { Criteria: { FilterOperator: "Or" } },
    });
    expect(query.Criteria.FilterOperator).toBe(1);
    expect(enumBody([{ Criteria: { FilterOperator: 0 } }], "QueryExpression")).toEqual([
      { Criteria: { FilterOperator: "And" } },
    ]);
    const fetch = { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression", Query: "<fetch />" };
    expect(enumBody(fetch, "QueryBase")).toBe(fetch);
    expect(enumBody(undefined, "PrincipalAccess")).toBeUndefined();
  });

  it("the generated code compiles, with the enums exported from the package roots", async () => {
    const errors = await typecheck(
      dir,
      "use-enums.ts",
      `import { AccessRights, GrantAccessAction, GenerateSharedLinkAction, createEntityReference } from "./actions/index.js";
import { AccessRights as MessageAccessRights, GrantAccessRequest } from "./messages/index.js";
export const a = new GrantAccessAction(createEntityReference("account", "a1"), { AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess });
export const b = new GenerateSharedLinkAction(AccessRights.ReadAccess);
export const c = new GrantAccessRequest({ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" }, { AccessMask: MessageAccessRights.ReadAccess });
`
    );
    expect(errors).toEqual([]);
  });
});
