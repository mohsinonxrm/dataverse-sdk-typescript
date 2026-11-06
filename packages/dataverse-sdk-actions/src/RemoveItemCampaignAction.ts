import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignitem } from "./types/index.js";

/**
 * Response from RemoveItemCampaign action
 */
export interface RemoveItemCampaignResponse {
  // No content returned
}

/**
 * Parameters of the RemoveItemCampaign action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveItemCampaignActionParameters {
  CampaignItem: EntityReference | EntityPayload<campaignitem>;
}

/**
 * RemoveItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaign)
 *
 * The first argument is the id of the campaign record to call it on.
 */
export class RemoveItemCampaignAction implements Executable<RemoveItemCampaignResponse> {
  constructor(
    public readonly campaignId: string,
    public readonly parameters: RemoveItemCampaignActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.RemoveItemCampaign`;

    const body = requestBody({
      CampaignItem: this.parameters.CampaignItem,
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

  async parseResponse(response: Response): Promise<RemoveItemCampaignResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveItemCampaignResponse;
    return (await response.json()) as RemoveItemCampaignResponse;
  }
}
