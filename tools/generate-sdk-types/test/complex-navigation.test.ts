/**
 * #231: the CSDL parser ignored `NavigationProperty` on complex types, so `PrincipalAccess.Principal`
 * was missing and `GrantAccess` couldn't be typed without a cast. Navigation properties are now
 * parsed and generated, typed like entity-typed action parameters (a reference or a payload), in
 * the actions, functions and messages packages.
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
import { copyMessagesHandWritten, typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="principal" BaseType="mscrm.crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="team" BaseType="mscrm.principal">
        <Key><PropertyRef Name="teamid" /></Key>
        <Property Name="teamid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="email" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
        <Property Name="subject" Type="Edm.String" />
      </EntityType>
      <EnumType Name="AccessRights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="ReadAccess" Value="1" />
        <Member Name="WriteAccess" Value="2" />
      </EnumType>
      <ComplexType Name="PrincipalAccess">
        <NavigationProperty Name="Principal" Type="mscrm.crmbaseentity" Nullable="false" />
        <Property Name="AccessMask" Type="mscrm.AccessRights" />
      </ComplexType>
      <ComplexType Name="EntityCollection">
        <NavigationProperty Name="Items" Type="Collection(mscrm.crmbaseentity)" />
      </ComplexType>
      <ComplexType Name="SendEmailsResponse">
        <NavigationProperty Name="Emails" Type="Collection(mscrm.email)" />
        <NavigationProperty Name="Owner" Type="mscrm.principal" />
      </ComplexType>
      <Action Name="GrantAccess">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="PrincipalAccess" Type="mscrm.PrincipalAccess" Nullable="false" />
      </Action>
      <Function Name="RetrieveSharedPrincipals">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="Collection(mscrm.PrincipalAccess)" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="teams" EntityType="Microsoft.Dynamics.CRM.team" />
        <EntitySet Name="emails" EntityType="Microsoft.Dynamics.CRM.email" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-complex-navigation-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  await copyMessagesHandWritten(join(dir, "messages"));
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

const read = (path: string): Promise<string> => readFile(join(dir, path), "utf8");

describe("navigation properties of complex types (#231)", () => {
  it("parses them, with Nullable", () => {
    const access = parseEdmx(EDMX).complexTypes.find((t) => t.name === "PrincipalAccess");
    expect(access?.navigationProperties).toEqual([
      expect.objectContaining({ name: "Principal", type: "mscrm.crmbaseentity", nullable: false }),
    ]);
  });

  it("generates them like entity-typed parameters, with the one EntityReference (#295)", async () => {
    const actions = await read("actions/types/PrincipalAccess.ts");
    expect(actions).toContain("  Principal: EntityReference | AnyEntityPayload;\n");
    expect(actions).toContain(
      "import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';"
    );
    expect(actions).toContain("import type { AnyEntityPayload } from './EntityPayload.js';");
    expect(await read("functions/types/PrincipalAccess.ts")).toBe(actions);
    expect(await read("messages/types/PrincipalAccess.ts")).toBe(actions);
    expect(await read("actions/types/EntityCollection.ts")).toContain(
      "  Items?: Record<string, unknown>[];\n"
    );
    const response = await read("actions/types/SendEmailsResponse.ts");
    expect(response).toContain("  Emails?: (EntityReference | EntityPayload<email>)[];\n");
    expect(response).toContain("  Owner?: EntityReference;\n");
    expect(response).toContain("import type { email } from './email.js';");
  });

  it("GrantAccess type-checks with a Principal, and not without one", async () => {
    const errors = await typecheck(
      dir,
      "use-principal-access.ts",
      `import { AccessRights, GrantAccessAction, createEntityReference, type WebApiEntityReference } from "./actions/index.js";
import { GrantAccessRequest, createEntityReference as messageReference } from "./messages/index.js";
import type { PrincipalAccess } from "./functions/types/index.js";
const target = createEntityReference("account", "a1");
export const a = new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: createEntityReference("team", "t1"), AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess } });
const team: WebApiEntityReference = { "@odata.type": "Microsoft.Dynamics.CRM.team", teamid: "t1" };
export const b = new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: team, AccessMask: AccessRights.ReadAccess } });
export const c = new GrantAccessRequest({ Target: messageReference("account", "a1"), PrincipalAccess: { Principal: messageReference("team", "t1") } });
export const d: PrincipalAccess = { Principal: { "@odata.type": "Microsoft.Dynamics.CRM.team", teamid: "t1" } };
// @ts-expect-error Principal is Nullable="false"
export const e = new GrantAccessAction({ Target: target, PrincipalAccess: { AccessMask: AccessRights.ReadAccess } });
// @ts-expect-error a hand-written { logicalName, id } is not a principal (#251)
export const f = new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: { "@odata.type": "Microsoft.Dynamics.CRM.team", logicalName: "team", id: "t1" } } });
`
    );
    expect(errors).toEqual([]);
  });

  it("the functions package gets the payload types its complex types use", async () => {
    expect(await read("functions/types/EntityPayload.ts")).toContain(
      "export interface AnyEntityPayload {"
    );
    expect(await read("functions/index.ts")).toContain(
      "export type { AnyEntityPayload, EntityPayload } from './types/EntityPayload.js';"
    );
  });
});
