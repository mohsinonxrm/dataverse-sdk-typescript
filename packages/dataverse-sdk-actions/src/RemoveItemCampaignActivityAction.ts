import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivityitem } from "./types/index.js";

/**
 * Response from the RemoveItemCampaignActivity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveItemCampaignActivityResponse = void;

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
    const url = `${baseUrl}/campaignactivities(${odataLiteral.guid(this.campaignactivityId)})/Microsoft.Dynamics.CRM.RemoveItemCampaignActivity`;

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

  parseResponse(_response: Response): Promise<RemoveItemCampaignActivityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
