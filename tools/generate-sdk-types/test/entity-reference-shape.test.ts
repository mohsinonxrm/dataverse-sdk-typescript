/**
 * #251: in a request body only the enumerable properties of an `EntityReference` are sent, so a
 * hand-written `{ "@odata.type", logicalName, id }` literal that type-checked as one sent the wrong
 * shape. Action and message references are branded (only `createEntityReference` makes one), the
 * payload types reject `logicalName`, and `WebApiEntityReference` types the JSON written by hand.
 *
 * #295: there is one `EntityReference`, in entities-runtime. The generated packages import and
 * re-export it, so a reference from any package's `createEntityReference` is accepted by all of
 * them, function parameters included.
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
        <Property Name="name" Type="Edm.String" />
      </EntityType>
      <EntityType Name="systemuser" BaseType="mscrm.principal">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="queue" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="queueid" /></Key>
        <Property Name="queueid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="opportunityclose" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
        <Property Name="subject" Type="Edm.String" />
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
      </Action>
      <Action Name="AddPrincipalToQueue" IsBound="true">
        <Parameter Name="entity" Type="mscrm.queue" Nullable="false" />
        <Parameter Name="Principal" Type="mscrm.principal" Nullable="false" />
      </Action>
      <Function Name="InitializeFrom">
        <Parameter Name="EntityMoniker" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="TargetEntityName" Type="Edm.String" Nullable="false" Unicode="false" />
        <ReturnType Type="mscrm.crmbaseentity" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
        <EntitySet Name="queues" EntityType="Microsoft.Dynamics.CRM.queue" />
        <EntitySet Name="opportunitycloses" EntityType="Microsoft.Dynamics.CRM.opportunityclose" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-entity-reference-shape-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  // The hand-written files of the messages package that the generator keeps.
  await copyMessagesHandWritten(join(dir, "messages"));
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

const HEADER = `import { AddPrincipalToQueueAction, MergeAction, WinOpportunityAction, createEntityReference, type EntityReference, type WebApiEntityReference } from "./actions/index.js";
import { MergeRequest, createEntityReference as messageReference, type WebApiEntityReference as MessageWebApiReference } from "./messages/index.js";
import { InitializeFromFunction } from "./functions/index.js";
const wrong = { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" };
`;

describe("entity reference shape (#251)", () => {
  it("a hand-written reference in the Web API shape compiles without a cast", async () => {
    const errors = await typecheck(
      dir,
      "use-web-api-reference.ts",
      `${HEADER}
const target: WebApiEntityReference = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" };
export const merge = new MergeAction({ Target: target, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
const messageTarget: MessageWebApiReference = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" };
export const mergeRequest = new MergeRequest({ Target: messageTarget, Subordinate: messageReference("account", "a2"), PerformParentingChecks: false });
export const win = new WinOpportunityAction({ OpportunityClose: { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose", subject: "Won" }, Status: 3 });
export const add = new AddPrincipalToQueueAction("q1", { Principal: createEntityReference("systemuser", "u1") });
export const unused = wrong;
`
    );
    expect(errors).toEqual([]);
  });

  it("a hand-written { logicalName, id } literal doesn't type-check as an action parameter", async () => {
    const errors = await typecheck(
      dir,
      "use-wrong-action-reference.ts",
      `${HEADER}
// @ts-expect-error a variable: neither an EntityReference nor a payload
export const a = new MergeAction({ Target: wrong, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error an inline literal, as a crmbaseentity parameter
export const b = new MergeAction({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" }, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error as a table parameter
export const c = new WinOpportunityAction({ OpportunityClose: { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose", logicalName: "opportunityclose", id: "o1" }, Status: 3 });
// @ts-expect-error as a principal parameter, which takes only an EntityReference
export const d = new AddPrincipalToQueueAction("q1", { Principal: { "@odata.type": "Microsoft.Dynamics.CRM.systemuser", logicalName: "systemuser", id: "u1" } });
// @ts-expect-error only createEntityReference makes an EntityReference
export const e: EntityReference = wrong;
// @ts-expect-error the JSON shape has no logicalName or id
export const f: WebApiEntityReference = wrong;
`
    );
    expect(errors).toEqual([]);
  });

  it("a hand-written { logicalName, id } literal doesn't type-check as a message parameter", async () => {
    const errors = await typecheck(
      dir,
      "use-wrong-message-reference.ts",
      `${HEADER}
// @ts-expect-error neither an EntityReference nor a payload
export const a = new MergeRequest({ Target: wrong, Subordinate: messageReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error UpdateContent is a payload, and logicalName isn't a column
export const b = new MergeRequest({ Target: messageReference("account", "a1"), Subordinate: messageReference("account", "a2"), UpdateContent: wrong, PerformParentingChecks: false });
`
    );
    expect(errors).toEqual([]);
  });

  it("a function parameter takes the same EntityReference, from any package (#295)", async () => {
    const errors = await typecheck(
      dir,
      "use-function-reference.ts",
      `${HEADER}
export const init = new InitializeFromFunction({ EntityMoniker: messageReference("account", "a1"), TargetEntityName: "contact" });
export const fromActions = new InitializeFromFunction({ EntityMoniker: createEntityReference("account", "a1"), TargetEntityName: "contact" });
// @ts-expect-error a hand-written literal isn't an EntityReference here either
export const literal = new InitializeFromFunction({ EntityMoniker: { ...wrong, entitySetName: "accounts" }, TargetEntityName: "contact" });
`
    );
    expect(errors).toEqual([]);
  });

  it("references from the actions and messages packages are interchangeable (#295)", async () => {
    const errors = await typecheck(
      dir,
      "use-mixed-references.ts",
      `${HEADER}
const fromMessages: EntityReference = messageReference("account", "a1");
export const merge = new MergeAction({ Target: fromMessages, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
export const request = new MergeRequest({ Target: createEntityReference("account", "a1"), Subordinate: fromMessages, PerformParentingChecks: false });
const json: MessageWebApiReference = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" };
export const fromJson: WebApiEntityReference = json;
`
    );
    expect(errors).toEqual([]);
  });

  it("no package generates its own EntityReference (#295)", async () => {
    for (const file of [
      "actions/types/EntityReference.ts",
      "functions/types/EntityReference.ts",
      "messages/EntityReference.ts",
    ]) {
      await expect(readFile(join(dir, file), "utf8"), file).rejects.toThrow();
    }
  });
});
