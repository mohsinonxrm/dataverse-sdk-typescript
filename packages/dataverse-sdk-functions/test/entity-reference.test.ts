/**
 * #72: an entity-typed function parameter is sent as `{"@odata.id": "<entity set>(<id>)"}`, with the
 * entity set from the CSDL instead of guessed by pluralization. A reference whose set can't be
 * resolved throws instead of sending `{"@odata.id":"s(…)"}`.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  InitializeFromFunction,
  RetrievePrincipalAccess_organizationFunction,
  createEntityReference,
} from "../src/index.js";

const ORG = "11111111-1111-1111-1111-111111111111";

function aliases(url: string): Record<string, string | null> {
  const params = new URL(url).searchParams;
  return Object.fromEntries([...params.keys()].map((k) => [k, params.get(k)]));
}

describe("#72: function entity references", () => {
  it("RetrievePrincipalAccess Target is @odata.id with the CSDL entity set", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrievePrincipalAccess/, () => jsonResponse({ AccessRights: "ReadAccess" }));

    await client.execute(
      new RetrievePrincipalAccess_organizationFunction(ORG, {
        Target: createEntityReference("accountleads", "l1"),
      })
    );

    expect(aliases(fake.last().url)).toEqual({
      "@p1": '{"@odata.id":"accountleadscollection(l1)"}',
    });
  });

  it("InitializeFrom EntityMoniker uses the reference's own entity set when given", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /InitializeFrom/, () => jsonResponse({}));

    await client.execute(
      new InitializeFromFunction({
        EntityMoniker: createEntityReference("new_project", "p1", {
          entitySetName: "new_projectset",
        }),
        TargetEntityName: "contact",
        TargetFieldType: "ValidForCreate",
      })
    );

    expect(aliases(fake.last().url)["@p1"]).toBe('{"@odata.id":"new_projectset(p1)"}');
  });

  it("a reference whose entity set can't be resolved throws before any request", async () => {
    const { client, fake } = createTestClient();
    const fn = new InitializeFromFunction({
      EntityMoniker: createEntityReference("new_project", "p1"),
      TargetEntityName: "contact",
      TargetFieldType: "ValidForCreate",
    });

    await expect(client.execute(fn)).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });
});
