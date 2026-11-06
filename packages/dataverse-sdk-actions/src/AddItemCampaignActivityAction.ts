import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivity } from "./types/index.js";

/**
 * Response from AddItemCampaignActivity action
 */
export interface AddItemCampaignActivityResponse {
  CampaignActivityItemId: string;
}

/**
 * Parameters of the AddItemCampaignActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaignActivityActionParameters {
  CampaignActivity: EntityReference | EntityPayload<campaignactivity>;
  Item: EntityReference | AnyEntityPayload;
}

/**
 * AddItemCampaignActivity action
 *
 * Unbound action
 */
export class AddItemCampaignActivityAction implements Executable<AddItemCampaignActivityResponse> {
  constructor(public readonly parameters: AddItemCampaignActivityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddItemCampaignActivity`;

    const body = requestBody({
      CampaignActivity: this.parameters.CampaignActivity,
      Item: this.parameters.Item,
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

  async parseResponse(response: Response): Promise<AddItemCampaignActivityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddItemCampaignActivityResponse;
  }
}
