import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Response from AddItemCampaign action
 */
export interface AddItemCampaignResponse {
  value: campaignitem;
}

/**
 * AddItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesliterature)
 */
export class AddItemCampaignAction implements Executable<AddItemCampaignResponse> {
  constructor(
    public readonly salesliteratureId: string,
    public readonly campaign: campaign
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesliteratures(${this.salesliteratureId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

    const body: Record<string, unknown> = {
      Campaign: this.campaign,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddItemCampaignResponse> {
    const data = await response.json();
    return data as AddItemCampaignResponse;
  }
}
