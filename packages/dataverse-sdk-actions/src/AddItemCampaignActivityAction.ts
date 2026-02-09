import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { campaignactivity } from "./types/index.js";

/**
 * Response from AddItemCampaignActivity action
 */
export interface AddItemCampaignActivityResponse {
  CampaignActivityItemId: string;
}

/**
 * AddItemCampaignActivity action
 *
 * Unbound action
 */
export class AddItemCampaignActivityAction implements Executable<AddItemCampaignActivityResponse> {
  constructor(
    public readonly campaignActivity: campaignactivity,
    public readonly item: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddItemCampaignActivity`;

    const body: Record<string, unknown> = {
      CampaignActivity: this.campaignActivity,
      Item: this.item,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddItemCampaignActivityResponse> {
    const data = await response.json();
    return data as AddItemCampaignActivityResponse;
  }
}
