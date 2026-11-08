/**
 * UpsertMultiple answers 204 No Content although the CSDL declares `mscrm.UpsertMultipleResponse`
 * ("The `UpsertMultiple` action returns `204 NoContent`. The `UpsertMultipleResponse` complex type
 * isn't returned.", https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).
 * Reading the empty body as JSON threw "Unexpected end of JSON input" although the records were
 * written; `execute()` now resolves `null`, and still reads a body if one ever comes.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import { UpsertMultipleAction } from "../src/index.js";

const PATH = "/accounts/Microsoft.Dynamics.CRM.UpsertMultiple";
const targets = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "One" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Two" },
];

describe("UpsertMultipleAction response", () => {
  it("resolves null for Dataverse's 204 No Content", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", PATH, () => noContent());

    const result = await client.execute(new UpsertMultipleAction("accounts", { Targets: targets }));

    expect(result).toBeNull();
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Targets: targets });
  });

  it("still reads a body if one comes", async () => {
    const { client, fake } = createTestClient();
    const body = {
      "@odata.context": "$metadata#Microsoft.Dynamics.CRM.UpsertMultipleResponse",
      Results: [{ ResponseName: "Upsert" }],
    };
    fake.on("POST", PATH, () => jsonResponse(body));

    const result = await client.execute(new UpsertMultipleAction("accounts", { Targets: targets }));

    expect(result).toEqual(body);
  });
});
