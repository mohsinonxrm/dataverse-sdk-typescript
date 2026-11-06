/**
 * #75 / #286: AddItemCampaign is bound to campaign, list, product and salesliterature, and has no
 * unbound overload. Each binding has its own request class; there is no plain-name
 * `AddItemCampaignRequest`, which read as one class for every binding when it was only the
 * salesliterature one.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as messages from "../src/index.js";

describe("#286: message overloads", () => {
  it("AddItemCampaign has a request per binding and no plain-name request", () => {
    const names = Object.keys(messages);
    expect(names.filter((n) => /^AddItemCampaign(_|Request$|Response$)/.test(n))).toEqual([
      "AddItemCampaign_campaignRequest",
      "AddItemCampaign_campaignResponse",
      "AddItemCampaign_listRequest",
      "AddItemCampaign_listResponse",
      "AddItemCampaign_productRequest",
      "AddItemCampaign_productResponse",
      "AddItemCampaign_salesliteratureRequest",
      "AddItemCampaign_salesliteratureResponse",
    ]);
    expect(names).not.toContain("AddItemCampaignRequest");
    expect(names).not.toContain("AddItemCampaignResponse");
  });

  it("each AddItemCampaign request posts to its own entity set", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /AddItemCampaign/, () => jsonResponse({ CampaignItemId: "i1" }));
    const campaign = messages.createEntityReference("campaign", "c1");

    await client.execute(new messages.AddItemCampaign_listRequest("l1", { Campaign: campaign }));
    expect(fake.last().path).toBe("/lists(l1)/Microsoft.Dynamics.CRM.AddItemCampaign");

    await client.execute(
      new messages.AddItemCampaign_salesliteratureRequest("s1", { Campaign: campaign })
    );
    expect(fake.last().path).toBe("/salesliteratures(s1)/Microsoft.Dynamics.CRM.AddItemCampaign");
  });
});
