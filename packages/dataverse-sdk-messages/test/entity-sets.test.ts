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
        url = new (value as RequestClass)("id-1").toRequestInformation(TEST_API_URL).url;
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
    expect(path(new CalculateActualValueOpportunityRequest("o1"))).toBe(
      "/opportunities(o1)/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity"
    );
    expect(path(new GetRunMapRequest("b1", { runId: "r1" }))).toBe(
      "/businessprocesses(b1)/Microsoft.Dynamics.CRM.GetRunMap"
    );
    expect(path(new (DistributeCampaignActivityRequest as unknown as RequestClass)("c1"))).toMatch(
      /^\/campaignactivities\(c1\)\/Microsoft\.Dynamics\.CRM\.DistributeCampaignActivity$/
    );
    expect(path(new (RemoveItemCampaignActivityRequest as unknown as RequestClass)("c1"))).toMatch(
      /^\/campaignactivities\(c1\)\/Microsoft\.Dynamics\.CRM\.RemoveItemCampaignActivity$/
    );
  });

  it("reaches fetch at the right URL through a DataverseClient", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/opportunities(o1)/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity",
      () => jsonResponse({ Value: 1250 })
    );
    const response = await client.execute(new CalculateActualValueOpportunityRequest("o1"));
    expect(fake.last().method).toBe("POST");
    expect(response.result.Value).toBe(1250);
  });
});
