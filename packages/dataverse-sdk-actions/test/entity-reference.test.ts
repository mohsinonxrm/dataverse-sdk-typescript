/**
 * #72: an entity-typed action parameter must be the entity shape with its primary key,
 * `{"@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…"}` (activities use
 * `activityid`). createEntityReference produced `{ "@odata.type", id, logicalName }`, which the Web
 * API rejects: `id` and `logicalName` are not properties of the entity type.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  GrantAccessAction,
  MergeAction,
  createEntityReference,
  getEntitySetNameFromReference,
} from "../src/index.js";

describe("#72: action entity references", () => {
  it("GrantAccess Target is the account shape", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/GrantAccess", () => noContent());

    await client.execute(
      new GrantAccessAction({ Target: createEntityReference("account", "a1"), PrincipalAccess: {} })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" },
      PrincipalAccess: {},
    });
  });

  it("an email reference uses activityid", () => {
    expect(JSON.stringify(createEntityReference("email", "e1"))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.email","activityid":"e1"}'
    );
  });

  it("Merge sends both references in the Web API shape", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/Merge", () => noContent());
    const target = createEntityReference("account", "a1");

    await client.execute(
      new MergeAction({
        Target: target,
        Subordinate: createEntityReference("account", "a2"),
        UpdateContent: target,
        PerformParentingChecks: false,
      })
    );

    const body = JSON.parse(fake.last().bodyText ?? "") as Record<string, unknown>;
    expect(body.Target).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountid: "a1",
    });
    expect(body.Subordinate).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountid: "a2",
    });
  });

  it("the entity set comes from the CSDL; an unknown table needs one", () => {
    expect(getEntitySetNameFromReference(createEntityReference("opportunity", "o1"))).toBe(
      "opportunities"
    );
    expect(() =>
      getEntitySetNameFromReference(createEntityReference("new_unknowntable", "n1"))
    ).toThrow(/entity set of 'new_unknowntable' is unknown/);
    const custom = createEntityReference("new_unknowntable", "n1", {
      entitySetName: "new_unknowntables",
      primaryIdAttribute: "new_unknowntableid",
    });
    expect(getEntitySetNameFromReference(custom)).toBe("new_unknowntables");
    expect(custom).toMatchObject({ logicalName: "new_unknowntable", id: "n1" });
  });
});
