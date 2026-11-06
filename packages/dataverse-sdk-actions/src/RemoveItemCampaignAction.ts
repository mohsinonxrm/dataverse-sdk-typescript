import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
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
    public readonly campaignItem: EntityReference | EntityPayload<campaignitem>
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveItemCampaignResponse> {
    // No return value (204 No Content)
    return {};
  }
}
