import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivityitem } from "./types/index.js";

/**
 * Response from RemoveItemCampaignActivity action
 */
export interface RemoveItemCampaignActivityResponse {
  // No content returned
}

/**
 * Parameters of the RemoveItemCampaignActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveItemCampaignActivityActionParameters {
  CampaignActivityItem: EntityReference | EntityPayload<campaignactivityitem>;
}

/**
 * RemoveItemCampaignActivity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignactivity)
 *
 * The first argument is the id of the campaignactivity record to call it on.
 */
export class RemoveItemCampaignActivityAction implements Executable<RemoveItemCampaignActivityResponse> {
  constructor(
    public readonly campaignactivityId: string,
    public readonly parameters: RemoveItemCampaignActivityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.RemoveItemCampaignActivity`;

    const body = requestBody({
      CampaignActivityItem: this.parameters.CampaignActivityItem,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveItemCampaignActivityResponse;
    return (await response.json()) as RemoveItemCampaignActivityResponse;
  }
}
