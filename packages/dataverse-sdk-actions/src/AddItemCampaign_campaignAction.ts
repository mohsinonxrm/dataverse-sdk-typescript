import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Response from AddItemCampaign action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface AddItemCampaign_campaignResponse extends campaignitem {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * AddItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaign)
 */
export class AddItemCampaign_campaignAction implements Executable<AddItemCampaign_campaignResponse> {
  constructor(
    public readonly campaignId: string,
    public readonly campaign: EntityReference | EntityPayload<campaign>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

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

  async parseResponse(response: Response): Promise<AddItemCampaign_campaignResponse> {
    const data = await response.json();
    return data as AddItemCampaign_campaignResponse;
  }
}
