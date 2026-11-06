import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivityitem } from "./types/index.js";

/**
 * Response from RemoveItemCampaignActivity action
 */
export interface RemoveItemCampaignActivityResponse {
  // No content returned
}

/**
 * RemoveItemCampaignActivity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignactivity)
 */
export class RemoveItemCampaignActivityAction implements Executable<RemoveItemCampaignActivityResponse> {
  constructor(
    public readonly campaignactivityId: string,
    public readonly campaignActivityItem: EntityReference | EntityPayload<campaignactivityitem>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.RemoveItemCampaignActivity`;

    const body: Record<string, unknown> = {
      CampaignActivityItem: this.campaignActivityItem,
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

  async parseResponse(response: Response): Promise<RemoveItemCampaignActivityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
