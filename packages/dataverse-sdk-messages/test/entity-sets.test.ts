/**
 * #76: bound messages built the entity set as `${type}s` (opportunitys, campaignactivitys,
 * businessprocesss). They now use the CSDL entity set, like the actions package.
 */
import { describe, expect, it } from "vitest";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as messages from "../src/index.js";
import {
  CalculateActualValueOpportunityRequest,
  DistributeCampaignActivityRequest,
  GetRunMapRequest,
  RemoveItemCampaignActivityRequest,
} from "../src/index.js";

type RequestClass = new (...args: string[]) => {
  toRequestInformation(baseUrl: string): { url: string };
};

const O1 = "00000000-0000-0000-0000-0000000000a1";
const B1 = "00000000-0000-0000-0000-0000000000b1";
const C1 = "00000000-0000-0000-0000-0000000000c1";

describe("#76: message entity sets", () => {
  it("no generated message URL is a naive plural (…ys( or …sss()", () => {
    const naive: string[] = [];
    for (const [name, value] of Object.entries(messages)) {
      if (
        !name.endsWith("Request") ||
        typeof value !== "function" ||
        name === "OrganizationRequest"
      ) {
        continue;
      }
      let url: string;
      try {
        url = new (value as RequestClass)(
          "00000000-0000-0000-0000-000000000001"
        ).toRequestInformation(TEST_API_URL).url;
      } catch {
        continue;
      }
      if (/(?:ys|sss)\(/.test(url)) naive.push(`${name}: ${url.slice(TEST_API_URL.length)}`);
    }
    expect(naive).toEqual([]);
  });

  it("the four messages that were wrong use the CSDL entity sets", () => {
    const path = (r: { toRequestInformation(b: string): { url: string } }) =>
      r.toRequestInformation(TEST_API_URL).url.slice(TEST_API_URL.length);
    expect(path(new CalculateActualValueOpportunityRequest(O1))).toBe(
      `/opportunities(${O1})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`
    );
    expect(path(new GetRunMapRequest(B1, { runId: "r1" }))).toBe(
      `/businessprocesses(${B1})/Microsoft.Dynamics.CRM.GetRunMap`
    );
    expect(path(new (DistributeCampaignActivityRequest as unknown as RequestClass)(C1))).toMatch(
      /^\/campaignactivities\(0{8}-0{4}-0{4}-0{4}-0{10}c1\)\/Microsoft\.Dynamics\.CRM\.DistributeCampaignActivity$/
    );
    expect(path(new (RemoveItemCampaignActivityRequest as unknown as RequestClass)(C1))).toMatch(
      /^\/campaignactivities\(0{8}-0{4}-0{4}-0{4}-0{10}c1\)\/Microsoft\.Dynamics\.CRM\.RemoveItemCampaignActivity$/
    );
  });

  it("reaches fetch at the right URL through a DataverseClient", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      `/opportunities(${O1})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`,
      () => jsonResponse({ Value: 1250 })
    );
    const response = await client.execute(new CalculateActualValueOpportunityRequest(`{${O1}}`));
    expect(fake.last().method).toBe("POST");
    expect(response.result.Value).toBe(1250);
  });
});
