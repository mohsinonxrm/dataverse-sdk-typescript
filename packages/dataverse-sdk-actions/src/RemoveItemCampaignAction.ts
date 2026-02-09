import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignitem } from "./types/index.js";

/**
 * Response from RemoveItemCampaign action
 */
export interface RemoveItemCampaignResponse {
  // No content returned
}

/**
 * RemoveItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaign)
 */
export class RemoveItemCampaignAction implements Executable<RemoveItemCampaignResponse> {
  constructor(
    public readonly campaignId: string,
    public readonly campaignItem: campaignitem
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.RemoveItemCampaign`;

    const body: Record<string, unknown> = {
      CampaignItem: this.campaignItem,
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

  async parseResponse(response: Response): Promise<RemoveItemCampaignResponse> {
    // No return value (204 No Content)
    return {};
  }
}
