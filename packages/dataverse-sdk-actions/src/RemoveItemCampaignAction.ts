import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignitem } from "./types/index.js";

/**
 * Response from the RemoveItemCampaign action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveItemCampaignResponse = void;

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
    const url = `${baseUrl}/campaigns(${odataLiteral.guid(this.campaignId)})/Microsoft.Dynamics.CRM.RemoveItemCampaign`;

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

  parseResponse(_response: Response): Promise<RemoveItemCampaignResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
