/**
 * #74: entity-typed message parameters take an entity payload, and references use the Web API
 * shape. Merge's UpdateContent was typed `EntityReference`, WinOpportunity's OpportunityClose was
 * the read shape (no `@odata.bind`), and createEntityReference sent `id` and `logicalName`, which
 * the Web API rejects ("The property 'id' does not exist on type 'Microsoft.Dynamics.CRM.lead'").
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  ExecuteWorkflowRequest,
  MergeRequest,
  WinOpportunityRequest,
  createEntityReference,
  type AnyEntityPayload,
  type EntityReferenceOptions,
} from "../src/index.js";

describe("#74: message entity payloads", () => {
  it("createEntityReference sends @odata.type and the primary key only", () => {
    const lead = createEntityReference("lead", "l1", { name: "Contoso lead" });
    expect(JSON.parse(JSON.stringify(lead))).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.lead",
      leadid: "l1",
    });
    expect(lead.id).toBe("l1");
    expect(lead.logicalName).toBe("lead");
    expect(lead.name).toBe("Contoso lead");
    const options: EntityReferenceOptions = { primaryIdAttribute: "new_widgetid" };
    expect(JSON.stringify(createEntityReference("new_widget", "w1", options))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.new_widget","new_widgetid":"w1"}'
    );
    expect(JSON.stringify(createEntityReference("email", "e1"))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.email","activityid":"e1"}'
    );
  });

  it("Merge sends the references and the UpdateContent payload in the Web API shape", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/Merge", () => noContent());
    const updateContent: AnyEntityPayload = {
      "@odata.type": "Microsoft.Dynamics.CRM.lead",
      subject: "Merged",
    };

    await client.execute(
      new MergeRequest({
        Target: createEntityReference("lead", "l1"),
        Subordinate: createEntityReference("lead", "l2"),
        UpdateContent: updateContent,
        PerformParentingChecks: false,
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.lead", leadid: "l1" },
      Subordinate: { "@odata.type": "Microsoft.Dynamics.CRM.lead", leadid: "l2" },
      UpdateContent: { "@odata.type": "Microsoft.Dynamics.CRM.lead", subject: "Merged" },
      PerformParentingChecks: false,
    });
  });

  it("WinOpportunity takes an opportunityclose with an @odata.bind lookup", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/WinOpportunity", () => noContent());

    await client.execute(
      new WinOpportunityRequest({
        OpportunityClose: {
          "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
          subject: "Won",
          "opportunityid@odata.bind": "/opportunities(o1)",
        },
        Status: 3,
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      OpportunityClose: {
        "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
        subject: "Won",
        "opportunityid@odata.bind": "/opportunities(o1)",
      },
      Status: 3,
    });
  });

  it("a trailing parameter without Nullable=false can be left out", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/workflows(00000000-0000-0000-0000-0000000000f1)/Microsoft.Dynamics.CRM.ExecuteWorkflow",
      () => jsonResponse({ asyncoperationid: "j1" })
    );

    await client.execute(
      new ExecuteWorkflowRequest("00000000-0000-0000-0000-0000000000f1", { EntityId: "a1" })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ EntityId: "a1" });
  });
});
