/**
 * UpsertMultiple answers 204 No Content although the CSDL declares `mscrm.UpsertMultipleResponse`
 * ("The `UpsertMultiple` action returns `204 NoContent`. The `UpsertMultipleResponse` complex type
 * isn't returned.", https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).
 * The message's `result` is `null` for the 204, as the action's value is, and a body is still
 * read if one ever comes.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import { UpsertMultipleRequest, UpsertMultipleResponse } from "../src/index.js";

const PATH = "/accounts/Microsoft.Dynamics.CRM.UpsertMultiple";
const targets = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "One" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Two" },
];

describe("UpsertMultipleRequest response", () => {
  it("result is null for Dataverse's 204 No Content", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", PATH, () => noContent());

    const response = await client.execute(
      new UpsertMultipleRequest("accounts", { Targets: targets })
    );

    expect(response).toBeInstanceOf(UpsertMultipleResponse);
    expect(response.messageName).toBe("UpsertMultiple");
    expect(response.result).toBeNull();
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Targets: targets });
  });

  it("still reads a body if one comes", async () => {
    const { client, fake } = createTestClient();
    const body = {
      "@odata.context": "$metadata#Microsoft.Dynamics.CRM.UpsertMultipleResponse",
      Results: [{ ResponseName: "Upsert" }],
    };
    fake.on("POST", PATH, () => jsonResponse(body));

    const response = await client.execute(
      new UpsertMultipleRequest("accounts", { Targets: targets })
    );

    expect(response.result).toEqual(body);
  });

  it("fromResponse(undefined), as for a 204 batch step, is a null result", () => {
    expect(UpsertMultipleResponse.fromResponse(undefined).result).toBeNull();
  });
});
