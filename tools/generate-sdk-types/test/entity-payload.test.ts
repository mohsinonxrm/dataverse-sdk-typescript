/**
 * #74: entity-typed action and message parameters take an entity payload (columns, `@odata.type`,
 * `<lookup>@odata.bind`) or a reference, and parameters without Nullable="false" can be left out
 * at the end, so callers need no `as any`. The messages package's references use the CSDL
 * primary key like the actions package's (it sent `id`, which the Web API rejects).
 */
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
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
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" />
      </EntityType>
      <EntityType Name="activitypointer" BaseType="mscrm.crmbaseentity" Abstract="true">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
        <Property Name="subject" Type="Edm.String" />
      </EntityType>
      <EntityType Name="email" BaseType="mscrm.activitypointer" />
      <EntityType Name="systemuser" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="team" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="teamid" /></Key>
        <Property Name="teamid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="opportunityclose" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
        <Property Name="subject" Type="Edm.String" />
        <Property Name="actualrevenue" Type="Edm.Decimal" />
        <Property Name="_opportunityid_value" Type="Edm.Guid" />
      </EntityType>
      <Action Name="Merge">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="Subordinate" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="UpdateContent" Type="mscrm.crmbaseentity" />
        <Parameter Name="PerformParentingChecks" Type="Edm.Boolean" Nullable="false" />
      </Action>
      <Action Name="WinOpportunity">
        <Parameter Name="OpportunityClose" Type="mscrm.opportunityclose" Nullable="false" />
        <Parameter Name="Status" Type="Edm.Int32" Nullable="false" />
        <Parameter Name="Caller" Type="Edm.String" Unicode="false" />
      </Action>
      <Action Name="AddMembersTeam" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Members" Type="Collection(mscrm.systemuser)" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="emails" EntityType="Microsoft.Dynamics.CRM.email" />
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
        <EntitySet Name="teams" EntityType="Microsoft.Dynamics.CRM.team" />
        <EntitySet Name="opportunitycloses" EntityType="Microsoft.Dynamics.CRM.opportunityclose" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-entity-payload-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  // The hand-written files of the messages package that the generator keeps.
  for (const file of ["OrganizationRequest.ts", "types.ts"]) {
    await copyFile(join(MESSAGES_SRC, file), join(dir, "messages", file));
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

const read = (path: string): Promise<string> => readFile(join(dir, path), "utf8");

describe("entity payload parameters (#74)", () => {
  it("types crmbaseentity, table and table-collection parameters as payloads or references", async () => {
    const merge = await read("actions/MergeAction.ts");
    expect(merge).toContain("  Target: EntityReference | AnyEntityPayload;");
    expect(merge).toContain("  UpdateContent?: EntityReference | AnyEntityPayload;");
    expect(await read("actions/WinOpportunityAction.ts")).toContain(
      "  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;"
    );
    expect(await read("actions/AddMembersTeamAction.ts")).toContain(
      "  Members: (EntityReference | EntityPayload<systemuser>)[];"
    );
    expect(await read("messages/MergeMessage.ts")).toContain(
      "  UpdateContent?: EntityReference | AnyEntityPayload;"
    );
  });

  it("compiles payload literals and omitted optional properties without casts", async () => {
    const errors = await typecheck(
      dir,
      "use-payloads.ts",
      `import { MergeAction, WinOpportunityAction, AddMembersTeamAction, createEntityReference } from "./actions/index.js";
import { MergeRequest, WinOpportunityRequest, createEntityReference as ref } from "./messages/index.js";
const update = { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Merged" };
export const merge = new MergeAction({ Target: createEntityReference("account", "a1"), Subordinate: createEntityReference("account", "a2"), UpdateContent: update, PerformParentingChecks: false });
export const mergeRequest = new MergeRequest({ Target: ref("account", "a1"), Subordinate: ref("account", "a2"), UpdateContent: update, PerformParentingChecks: false });
const close = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won",
  "opportunityid@odata.bind": "/opportunities(o1)",
};
export const win = new WinOpportunityAction({ OpportunityClose: close, Status: 3 });
export const winRequest = new WinOpportunityRequest({ OpportunityClose: close, Status: 3 });
export const members = new AddMembersTeamAction("t1", { Members: [createEntityReference("systemuser", "u1")] });
// @ts-expect-error a crmbaseentity payload must name its table
export const untyped = new MergeAction({ Target: createEntityReference("account", "a1"), Subordinate: createEntityReference("account", "a2"), UpdateContent: { name: "x" }, PerformParentingChecks: false });
// @ts-expect-error a lookup is bound with a string
export const badBind = new WinOpportunityAction({ OpportunityClose: { "opportunityid@odata.bind": 1 }, Status: 3 });
`
    );
    expect(errors).toEqual([]);
  });
});
